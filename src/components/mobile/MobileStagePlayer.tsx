import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Volume2,
  Mic,
  Sparkles,
  Star,
  Crown,
  Play,
  CheckCircle2,
  RotateCcw,
  Award,
  Rocket,
  Layers,
  HelpCircle,
  Trophy,
  Smile,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { stripTashkeel } from '../../audio/audioManifest';
import { LumiGuideBanner } from '../common/LumiGuideBanner';
import { InteractiveLetter3D } from '../3d/InteractiveLetter3D';
import { ChildFriendlyMouthGuide } from '../articulation/ChildFriendlyMouthGuide';
import { StagesGuideModal } from '../common/StagesGuideModal';

interface MobileStagePlayerProps {
  letterId: string;
  stageNumber: number;
  onBackToMap: () => void;
  onCompleteStageAndNext: (nextStageNum: number) => void;
}

export const MobileStagePlayer: React.FC<MobileStagePlayerProps> = ({
  letterId,
  stageNumber,
  onBackToMap,
  onCompleteStageAndNext
}) => {
  const {
    childName,
    updateLetterStage,
    addStars,
    addCoins,
    triggerVictoryCelebration
  } = useGame();

  const currentLetter: LetterData =
    ARABIC_LETTERS.find((l) => l.id === letterId) || ARABIC_LETTERS[1];

  const stageDef =
    STAGE_CURRICULUM_DEFINITIONS.find((s) => s.stageNumber === stageNumber) ||
    STAGE_CURRICULUM_DEFINITIONS[0];

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showEpicTransition, setShowEpicTransition] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  // ===== Stage 1: Sound Discovery States =====
  const [stage1Popped, setStage1Popped] = useState<number[]>([]);

  // ===== Stage 3: Short Vowels Quiz States =====
  const [targetVowelIdx, setTargetVowelIdx] = useState<number>(0);
  const [selectedVowelIdx, setSelectedVowelIdx] = useState<number | null>(null);

  // ===== Stage 4: Long Madd Train States =====
  const [selectedMaddIdx, setSelectedMaddIdx] = useState<number | null>(null);

  // ===== Stage 5: Word Hunt States =====
  const [targetWordIdx, setTargetWordIdx] = useState<number>(0);
  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);

  // ===== Stage 6: Position Train States =====
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  // ===== Stage 7: Word Builder Puzzle States =====
  const [puzzlePlacedChars, setPuzzlePlacedChars] = useState<string[]>([]);

  // ===== Stage 8: Grand Finale 3-Question Quest =====
  const [finaleStep, setFinaleStep] = useState<number>(1);
  const [isChestOpened, setIsChestOpened] = useState<boolean>(false);

  // Get pedagogical stage prompt
  const getStageInstruction = (stage: number, char: string, nameAr: string) => {
    switch (stage) {
      case 1:
        return `المَرْحَلَةُ 1: البَذْرَةُ المُضِيئَة! اسْتَمِعْ لِصَوْتِ حَرْفِ (${char}ْ) ثُمَّ ازْرَعْ بُذُورَ النُّورِ يَا ${childName || 'البَطَل'}!`;
      case 2:
        return `المَرْحَلَةُ 2: قَطَرَاتُ الصَّوْت! انْطِقْ حَرْفَ (${char}) بِشَكْلٍ صَحِيح لِتَسْقِيَ البَذْرَة!`;
      case 3:
        return `المَرْحَلَةُ 3: بَرَاعِمُ النَّغَمَات! اسْتَمِعْ لِلصَّوْتِ لِتَتَفَتَّحَ البَرَاعِم!`;
      case 4:
        return `المَرْحَلَةُ 4: غُصُونٌ تَمْتَدّ! اسْتَمِعْ لِلْمَدِّ الطَّوِيلِ وَاسْحَبِ الغُصْن!`;
      case 5:
        return `المَرْحَلَةُ 5: ثِمَارُ الكَلِمَات! أَيْنَ الثَّمَرَةُ الَّتِي تَبْدَأُ بِحَرْفِ (${char})؟`;
      case 6:
        return `المَرْحَلَةُ 6: النَّحْلَةُ البَاحِثَة! أَيْنَ يَقِفُ حَرْفُ (${char}) فِي الكَلِمَة؟ (أَوَّل، وَسَط، آخِر)`;
      case 7:
        return `المَرْحَلَةُ 7: غَابَةُ الحِكَايَات! رَتِّبِ الأَوْرَاقَ المُرْشِدَةَ لِبِنَاءِ الكَلِمَة!`;
      case 8:
        return `المَرْحَلَةُ 8: الشَّجَرَةُ المُتَوَهِّجَة! أَجِبْ لِتُضِيءَ الشَّجَرَةُ بِالكَامِل! 🌳`;
      default:
        return `المَرْحَلَةُ ${stage}: هَيَّا نَزْرَعْ مَعًا يَا ${childName || 'البَطَل'}!`;
    }
  };

  // Reset stage states on stageNumber or letterId change
  useEffect(() => {
    setIsCompleted(false);
    setShowEpicTransition(false);
    setStage1Popped([]);
    setTargetVowelIdx(Math.floor(Math.random() * 3));
    setSelectedVowelIdx(null);
    setSelectedMaddIdx(null);
    setTargetWordIdx(0);
    setSelectedWordIdx(null);
    setSelectedPosition(null);
    setPuzzlePlacedChars([]);
    setFinaleStep(1);
    setIsChestOpened(false);

    const prompt = getStageInstruction(stageNumber, currentLetter.char, currentLetter.nameAr);
    setFeedbackText(prompt);
  }, [stageNumber, letterId, childName]);

  // General Success Handler
  const handleSuccess = (customCheer?: string) => {
    audioManager.playVictory();
    setIsCompleted(true);

    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#38bdf8', '#fbbf24', '#10b981', '#ec4899']
      });
    } catch {}

    const cheer = customCheer || `أَحْسَنْتَ يَا ${childName || 'البَطَل'}! إِجَابَةٌ مَلَكِيَّةٌ رَائِعَة! 🌟`;
    setFeedbackText(cheer);
    // LumiGuideBanner will automatically speak the updated feedbackText

    addStars(1);
    addCoins(10);
    updateLetterStage(currentLetter.id, stageNumber, true);

    if (stageNumber === 8) {
      triggerVictoryCelebration();
    } else {
      setTimeout(() => {
        setShowEpicTransition(true);
        audioManager.speak(`مَبْرُوك يَا ${childName || 'البَطَل'}! فُتِحَتْ لَكَ المَرْحَلَةُ ${stageNumber + 1}! هَيَّا نَنْطَلِق! 🚀`);
      }, 1400);
    }
  };

  // General Retry Handler
  const handleRetry = () => {
    audioManager.playClick();
    const retryCheer = `حَاوِلْ مَرَّةً أُخْرَى يَا ${childName || 'البَطَل'}.. أَنْتَ قَرِيبٌ جِدًّا! 💪`;
    setFeedbackText(retryCheer);
    // LumiGuideBanner will automatically speak the updated feedbackText
  };

  // Next Stage navigation
  const handleNext = () => {
    audioManager.playPortal();
    setShowEpicTransition(false);
    if (stageNumber < 8) {
      onCompleteStageAndNext(stageNumber + 1);
    } else {
      onBackToMap();
    }
  };

  // Short vowels definitions for current letter
  const vowels = [
    { char: `${currentLetter.char}َ`, name: 'فَتْحَة', sound: `${currentLetter.char}َ`, emoji: '👄', mouthTip: 'افْتَحْ فَمَك' },
    { char: `${currentLetter.char}ُ`, name: 'ضَمَّة', sound: `${currentLetter.char}ُ`, emoji: '⭕', mouthTip: 'ضُمَّ شَفَتَيْك' },
    { char: `${currentLetter.char}ِ`, name: 'كَسْرَة', sound: `${currentLetter.char}ِ`, emoji: '😊', mouthTip: 'ابْتَسِمْ بِاتِّسَاع' }
  ];

  // Long madd definitions for current letter
  const maddList = [
    { char: `${currentLetter.char}َا`, name: 'مَدّ بِالأَلِف', sound: `${currentLetter.char}َا`, desc: 'صَوْتٌ طَوِيلٌ مَفْتُوح 🌊' },
    { char: `${currentLetter.char}ُو`, name: 'مَدّ بِالوَاو', sound: `${currentLetter.char}ُو`, desc: 'صَوْتٌ طَوِيلٌ مَضْمُوم 🚀' },
    { char: `${currentLetter.char}ِي`, name: 'مَدّ بِاليَاء', sound: `${currentLetter.char}ِي`, desc: 'صَوْتٌ طَوِيلٌ مُبْتَسِم 🎵' }
  ];

  // Current sample word for stages 6 and 7 (with diacritics stripped for character array)
  const sampleWordObj = currentLetter.words[0] || { word: `${currentLetter.char}َاب`, emoji: '🚪', meaning: 'بَابُ المَنْزِل' };
  const sampleWordLetters = stripTashkeel(sampleWordObj.word).split('').filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] via-[#091230] to-[#040711] text-white pb-16 select-none relative overflow-x-hidden flex flex-col justify-between font-arabic">
      
      {/* Background Ambience Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#070e24]/90 backdrop-blur-xl border-b border-amber-400/30 px-4 py-3 shadow-md">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToMap();
            }}
            className="p-2.5 rounded-2xl bg-[#111e47] border border-amber-400/50 text-amber-300 hover:text-white transition-all shadow-md active:scale-90 flex items-center gap-1.5 text-xs font-black"
          >
            <ArrowRight className="w-4 h-4" />
            <span>خَرِيطَةُ المَرَاحِل</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                audioManager.playClick();
                setIsGuideModalOpen(true);
              }}
              className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 active:scale-95 transition-all flex items-center gap-1 text-xs font-black shadow-sm"
              title="دليل شَرْحِ المَرْحَلَة"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">شَرْحُ المَرْحَلَة</span>
            </button>
            <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-400 to-yellow-300 px-3 py-1 rounded-full border border-white shadow-sm">
              المَرْحَلَةُ {stageNumber} مِنْ 8
            </span>
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-lg flex items-center justify-center border border-white shadow-glow-yellow">
              {currentLetter.char}
            </span>
          </div>
        </div>
      </header>

      {/* Center Stage Arena */}
      <main className="max-w-xl mx-auto w-full px-4 py-3 space-y-3.5 my-auto">
        
        {/* Lumi Voice Guide Banner */}
        <LumiGuideBanner
          message={feedbackText}
          shortHint={`المَرْحَلَةُ ${stageNumber} مِنْ 8`}
          autoSpeak={true}
          emotion={isCompleted ? 'cheering' : 'happy'}
          size="sm"
        />

        {/* Quick Stage Goal & Audio Narrator Bar */}
        <div className="flex items-center justify-between bg-[#0a1330]/90 px-3.5 py-2 rounded-2xl border border-blue-900/60 shadow-sm text-xs">
          <span className="font-bold text-amber-300 flex items-center gap-1.5 truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">{stageDef.titleAr}</span>
          </span>
          <button
            onClick={() => {
              audioManager.playClick();
              audioManager.speak(`stage_${stageNumber}_explain`);
            }}
            className="px-2.5 py-1 rounded-xl bg-[#162754] hover:bg-[#1d3572] text-amber-300 text-[11px] font-black border border-amber-400/40 flex items-center gap-1 active:scale-95 shadow-sm transition-all flex-shrink-0"
          >
            <Volume2 className="w-3 h-3" />
            <span>اسْتَمِعْ لِلشَّرْح 🔊</span>
          </button>
        </div>

        {/* Main Stage Interactive Card */}
        <div className="bg-[#0c173b]/95 backdrop-blur-xl rounded-3xl p-5 border-2 border-amber-400/70 shadow-[0_0_35px_rgba(245,158,11,0.3)] space-y-4 text-center">
          
            {/* ========================================================================= */}
            {/* STAGE 1: SOUND DISCOVERY (البذرة المضيئة) */}
            {/* ========================================================================= */}
            {stageNumber === 1 && (
              <div className="space-y-4">
                <div className="flex justify-center">
                  <div className="relative">
                    <InteractiveLetter3D char={currentLetter.char} color="#f59e0b" size={120} />
                    <span className="absolute -bottom-2 -right-2 text-4xl animate-bounce">🌱</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-amber-300">
                    بَذْرَةُ حَرْفِ {currentLetter.nameAr}: ({currentLetter.char}ْ) 🌱
                  </h3>
                  <p className="text-xs text-cyan-200 font-bold">
                    اسْتَمِعْ لِلصَّوْتِ الصَّافِي ثُمَّ ازْرَعْ بُذُورَ النُّورِ يَا {childName || 'البَطَل'}!
                  </p>
                </div>

                <button
                  onClick={() => {
                    audioManager.speak(`صَوْتُ بَذْرَةِ ${currentLetter.nameAr} هُوَ: ${currentLetter.char}ْ.. ${currentLetter.char}ْ!`);
                  }}
                  className="w-full py-3 bg-[#182a5c] hover:bg-[#203777] text-amber-300 rounded-2xl font-black text-xs border border-amber-400/50 flex items-center justify-center gap-2 active:scale-95 shadow-md"
                >
                  <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>اسْتَمِعْ لِصَوْتِ البَذْرَةِ ({currentLetter.char}ْ) 🔊</span>
                </button>

                <div className="pt-2 space-y-2">
                  <p className="text-xs text-white font-extrabold">
                    🎯 ازْرَعْ كَافَّةَ بُذُورِ حَرْفِ ({currentLetter.char}):
                  </p>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { char: currentLetter.char, isTarget: true },
                      { char: ARABIC_LETTERS[((currentLetter.order || 1) + 4) % 28]?.char || 'س', isTarget: false },
                      { char: currentLetter.char, isTarget: true }
                    ].map((bubble, idx) => {
                      const isPopped = stage1Popped.includes(idx);
                      return (
                        <button
                          key={idx}
                          onClick={() => {
                            if (bubble.isTarget) {
                              audioManager.playPortal();
                              audioManager.speak(bubble.char);
                              const next = [...stage1Popped, idx];
                              setStage1Popped(next);
                              if (next.length >= 2) {
                                handleSuccess(`أَحْسَنْتَ يَا ${childName || 'البَطَل'}! زَرَعْتَ بُذُورَ (${currentLetter.char}) بِنَجَاح!`);
                              }
                            } else {
                              handleRetry();
                            }
                          }}
                          disabled={isPopped || isCompleted}
                          className={`py-4 rounded-full text-2xl font-black border-4 transition-all active:scale-90 shadow-glow-yellow ${
                            isPopped
                              ? 'bg-gradient-to-tr from-emerald-600 to-green-400 border-emerald-300 text-white scale-95 opacity-80'
                              : 'bg-gradient-to-tr from-amber-600 to-yellow-400 border-amber-200 text-slate-950 hover:border-white hover:scale-105'
                          }`}
                        >
                          <span>{isPopped ? '🌱' : bubble.char}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

          {/* ========================================================================= */}
          {/* STAGE 2: WATER DROPS / MOUTH GUIDE (قطرات الصوت) */}
          {/* ========================================================================= */}
          {stageNumber === 2 && (
            <div className="space-y-4">
              <div className="bg-cyan-950/40 p-4 rounded-3xl border border-cyan-500/30 relative overflow-hidden">
                <div className="absolute top-2 left-2 text-2xl animate-pulse">💧</div>
                <div className="absolute top-4 right-4 text-xl animate-pulse delay-150">💧</div>
                <ChildFriendlyMouthGuide
                  letter={currentLetter}
                  onSuccess={() => {
                    handleSuccess(`بَطَلٌ حَقِيقِيّ يَا ${childName || 'البَطَل'}! سَقَيْتَ البَذْرَةَ بِنُطْقِ حَرْفِ (${currentLetter.char})! 💧🌱`);
                  }}
                />
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 3: BUDS OF VOWELS (براعم النغمات) */}
          {/* ========================================================================= */}
          {stageNumber === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-amber-300">
                  بَرَاعِمُ حَرْفِ {currentLetter.nameAr} 🌿
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  اسْتَمِعْ لِكُلِّ بَرْعَم، ثُمَّ اخْتَرْ حَرَكَةَ النُّمُوِّ الصَّحِيحَة!
                </p>
              </div>

              {/* 3 Short Vowel Buds */}
              <div className="grid grid-cols-3 gap-2.5">
                {vowels.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedVowelIdx(idx);
                      audioManager.speak(`${v.char}.. ${v.name}`);
                    }}
                    className={`p-3 rounded-t-full rounded-b-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-md ${
                      selectedVowelIdx === idx
                        ? 'bg-gradient-to-b from-emerald-600 to-green-900 border-amber-400 shadow-glow-green scale-105'
                        : 'bg-gradient-to-b from-[#101e44] to-[#09112a] border-green-900 text-slate-300 hover:border-green-400/60'
                    }`}
                  >
                    <span className="text-2xl">{selectedVowelIdx === idx ? '🌸' : '🌿'}</span>
                    <span className="text-3xl font-black text-amber-300">{v.char}</span>
                    <span className="text-[11px] font-black text-white">{v.name}</span>
                  </button>
                ))}
              </div>

              {/* Interactive Listening Challenge */}
              <div className="p-3.5 bg-[#0e1b42] rounded-2xl border border-cyan-400/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-cyan-200">
                  <span>🎯 تَحَدِّي الحَرَكَةِ المَسْمُوعَة:</span>
                  <button
                    onClick={() => audioManager.speak(vowels[targetVowelIdx].sound)}
                    className="text-amber-300 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>أَعِدِ الاسْتِمَاع</span>
                  </button>
                </div>

                <p className="text-xs text-white font-bold">
                  أَيْنَ هُوَ صَوْتُ: ({vowels[targetVowelIdx].name})؟
                </p>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {vowels.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === targetVowelIdx) {
                          handleSuccess(`عَبْقَرِيٌّ يَا ${childName || 'البَطَل'}! مَيَّزْتَ صَوْتَ (${v.name}) بِدِقَّة!`);
                        } else {
                          handleRetry();
                        }
                      }}
                      disabled={isCompleted}
                      className="py-2.5 rounded-xl bg-[#172c63] hover:bg-emerald-600 border border-blue-800 text-base font-black text-white active:scale-95 transition-colors"
                    >
                      {v.char}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 4: LONG MADD BRANCHES (غصون تمتد) */}
          {/* ========================================================================= */}
          {stageNumber === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-green-400">
                  غُصُونُ المُدُودِ تَمْتَدّ 🎋
                </h3>
                <p className="text-xs text-slate-200 font-bold">
                  الصَّوْتُ الطَّوِيلُ يَمُدُّ الغُصْنَ عَالِيًا كَالنَّسِيم!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {maddList.map((madd, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedMaddIdx(idx);
                      audioManager.speak(madd.char);
                    }}
                    className={`p-3 rounded-xl border-2 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-md ${
                      selectedMaddIdx === idx
                        ? 'bg-gradient-to-b from-green-700 to-green-950 border-amber-400 shadow-glow-green scale-105 h-32'
                        : 'bg-[#101d42] border-green-900 text-slate-300 hover:border-green-400/60 h-24'
                    }`}
                  >
                    <span className="text-3xl font-black text-amber-300">{madd.char}</span>
                    <span className="text-[11px] font-black text-white">{madd.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  handleSuccess(`رَائِعٌ جِدًّا يَا ${childName || 'البَطَل'}! مَدَدْتَ غُصُونَ الشَّجَرَةِ عَالِيًا! 🎋`);
                }}
                disabled={isCompleted}
                className="w-full py-3.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl font-black text-sm border border-white shadow-glow-green active:scale-95"
              >
                <span>طَالَتْ غُصُونُ المُدُودِ! 🎋</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 5: ILLUSTRATED WORD HUNT (ثمار الكلمات) */}
          {/* ========================================================================= */}
          {stageNumber === 5 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-rose-400">
                  قَطْفُ ثِمَارِ كَلِمَاتِ {currentLetter.nameAr} 🍎
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  انْقُرْ عَلَى الثِّمَارِ لِسَمَاعِهَا وَاقْطِفِ الثَّمَرَةَ الصَّحِيحَة!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {currentLetter.words.slice(0, 4).map((w, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedWordIdx(idx);
                      audioManager.speak(w.word);
                    }}
                    className={`p-3.5 rounded-[2.5rem] rounded-tr-lg border-2 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90 shadow-md ${
                      selectedWordIdx === idx
                        ? 'bg-gradient-to-b from-rose-600 to-red-800 border-amber-400 shadow-[0_0_20px_rgba(225,29,72,0.5)] scale-105'
                        : 'bg-gradient-to-tr from-rose-950 to-red-900 border-rose-800 hover:border-rose-400/60'
                    }`}
                  >
                    <span className="text-4xl animate-bounce-slow">{w.emoji}</span>
                    <span className="text-lg font-black text-white">{w.word}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  handleSuccess(`عَمَلٌ مُمْتَازٌ يَا ${childName || 'البَطَل'}! قَطَفْتَ ثِمَارَ حَرْفِ ${currentLetter.nameAr}! 🍎`);
                }}
                disabled={isCompleted}
                className="w-full py-3.5 bg-gradient-to-r from-rose-500 to-red-500 text-white rounded-2xl font-black text-sm border border-white shadow-[0_0_15px_rgba(225,29,72,0.6)] active:scale-95"
              >
                <span>قَطَفْتُ الثِّمَارَ يَا لُومِي! 🍎</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 6: LETTER POSITION BEE (النحلة الباحثة) */}
          {/* ========================================================================= */}
          {stageNumber === 6 && (() => {
            const cleanWord = stripTashkeel(sampleWordObj.word);
            const cleanChar = stripTashkeel(currentLetter.char);
            const isFirst = cleanWord.startsWith(cleanChar);
            const isLast = cleanWord.endsWith(cleanChar);
            const correctPos: 'first' | 'middle' | 'last' = isFirst ? 'first' : isLast ? 'last' : 'middle';
            
            const positionsList = [
              { id: 'first' as const, label: 'الزَّهْرَةُ الأُولَى 🌸', isCorrect: correctPos === 'first', desc: `يَقِفُ فِي بَدَايَةِ (${sampleWordObj.word})` },
              { id: 'middle' as const, label: 'الزَّهْرَةُ الوُسْطَى 🌸', isCorrect: correctPos === 'middle', desc: `يَقِفُ فِي وَسَطِ (${sampleWordObj.word})` },
              { id: 'last' as const, label: 'الزَّهْرَةُ الأَخِيرَة 🌸', isCorrect: correctPos === 'last', desc: `يَقِفُ فِي نِهَايَةِ (${sampleWordObj.word})` }
            ];

            return (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-yellow-300">
                    النَّحْلَةُ البَاحِثَةُ عَنِ الحَرْف 🐝
                  </h3>
                  <p className="text-xs text-slate-200 font-bold">
                    أَيْنَ يَقِفُ حَرْفُ ({currentLetter.char}) فِي كَلِمَةِ ({sampleWordObj.word})؟ ساعد النحلة!
                  </p>
                </div>

                <div className="p-4 rounded-3xl bg-[#1e293b]/60 border-2 border-yellow-500/40 space-y-2 relative overflow-hidden">
                  <span className="absolute top-2 left-2 text-2xl animate-bounce">🐝</span>
                  <span className="text-5xl">{sampleWordObj.emoji}</span>
                  <p className="text-3xl font-black text-amber-300 tracking-wider">
                    {sampleWordObj.word}
                  </p>
                </div>

                {/* 3 Position Flowers */}
                <div className="grid grid-cols-3 gap-2">
                  {positionsList.map((pos) => (
                    <button
                      key={pos.id}
                      onClick={() => {
                        setSelectedPosition(pos.id);
                        if (pos.isCorrect) {
                          handleSuccess(`عَبْقَرِيٌّ يَا ${childName || 'البَطَل'}! وَجَدَتِ النَّحْلَةُ الحَرْفَ فِي ${pos.label.split(' ')[0]} الكَلِمَة!`);
                        } else {
                          handleRetry();
                        }
                      }}
                      disabled={isCompleted}
                      className={`py-4 px-1 rounded-full border-4 text-[10px] font-black active:scale-95 transition-all shadow-md flex flex-col items-center justify-center gap-1 ${
                        selectedPosition === pos.id && pos.isCorrect
                          ? 'bg-gradient-to-tr from-pink-500 to-rose-400 border-white text-white'
                          : 'bg-[#2d1b36] border-pink-900 text-pink-200 hover:border-pink-500'
                      }`}
                    >
                      <span className="text-xl">🌸</span>
                      {pos.label.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* STAGE 7: WORD BUILDER PUZZLE (تجميع أوراق الغابة) */}
          {/* ========================================================================= */}
          {stageNumber === 7 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-emerald-400">
                  تَرْتِيبُ غَابَةِ الحِكَايَات 🌲
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  رَتِّبِ الأَوْرَاقَ لِبِنَاءِ كَلِمَةِ: ({sampleWordObj.word})
                </p>
              </div>

              {/* Puzzle Display Slots (Clickable to remove/undo) */}
              <div className="p-3.5 rounded-3xl bg-green-950/40 border-2 border-dashed border-emerald-500/50 min-h-[70px] flex items-center justify-center gap-3 text-2xl font-black text-amber-300">
                {sampleWordLetters.map((_, idx) => {
                  const placedChar = puzzlePlacedChars[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (placedChar && !isCompleted) {
                          audioManager.playPop();
                          const next = puzzlePlacedChars.filter((_, i) => i !== idx);
                          setPuzzlePlacedChars(next);
                        }
                      }}
                      className={`w-12 h-12 rounded-t-full rounded-bl-full rounded-br-sm border-2 flex items-center justify-center shadow-inner transition-all ${
                        placedChar ? 'bg-gradient-to-tr from-emerald-500 to-green-400 border-white text-white active:scale-90' : 'bg-emerald-950/50 border-emerald-800 text-transparent'
                      }`}
                      title={placedChar ? 'انقر للإزالة' : ''}
                    >
                      {placedChar || '_'}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Blocks */}
              <div className="space-y-2">
                <p className="text-xs text-slate-300 font-bold">انْقُرِ الأَوْرَاقَ بِالتَّرْتِيبِ الصَّحِيح:</p>
                <div className="flex items-center justify-center gap-3">
                  {sampleWordLetters.map((ch, idx) => {
                    const countPlacedOfThisChar = puzzlePlacedChars.filter(c => c === ch).length;
                    const totalOfThisChar = sampleWordLetters.filter(c => c === ch).length;
                    const isAllOfCharPlaced = countPlacedOfThisChar >= totalOfThisChar;
                    const isCurrentSlotFilled = puzzlePlacedChars.length > idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (puzzlePlacedChars.length >= sampleWordLetters.length) return;
                          audioManager.speak(ch);
                          const next = [...puzzlePlacedChars, ch];
                          setPuzzlePlacedChars(next);

                          // Check if spelling matches word so far
                          const expectedChar = sampleWordLetters[next.length - 1];
                          if (ch !== expectedChar) {
                            audioManager.playEncouragement();
                            setTimeout(() => {
                              setPuzzlePlacedChars([]);
                            }, 700);
                            return;
                          }

                          if (next.length === sampleWordLetters.length) {
                            audioManager.speak(sampleWordObj.word);
                            handleSuccess(`عَمَلٌ أُسْطُورِيٌّ يَا ${childName || 'البَطَل'}! بَنَيْتَ كَلِمَةَ (${sampleWordObj.word}) كَامِلَة!`);
                          }
                        }}
                        disabled={isCurrentSlotFilled || isCompleted}
                        className={`w-14 h-14 rounded-t-full rounded-bl-full rounded-br-sm font-black text-2xl border-2 transition-all active:scale-90 shadow-md ${
                          isCurrentSlotFilled
                            ? 'bg-slate-800 border-slate-700 text-slate-500 scale-95 opacity-50'
                            : 'bg-gradient-to-tr from-emerald-500 to-green-400 text-white border-white shadow-glow-green hover:scale-105'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>

                {puzzlePlacedChars.length > 0 && !isCompleted && (
                  <button
                    onClick={() => setPuzzlePlacedChars([])}
                    className="text-xs text-rose-300 font-black inline-flex items-center gap-1 pt-1 hover:text-rose-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إِعَادَةُ البِنَاء</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 8: GLOWING TREE FINALE (الشجرة المتوهجة) */}
          {/* ========================================================================= */}
          {stageNumber === 8 && (
            <div className="space-y-4">
              <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center text-7xl transition-all duration-1000 ${
                isChestOpened 
                  ? 'bg-gradient-to-tr from-emerald-400 via-green-300 to-amber-300 shadow-[0_0_50px_rgba(52,211,153,0.8)] border-4 border-white animate-pulse' 
                  : 'bg-emerald-950 border-2 border-emerald-900 shadow-inner'
              }`}>
                {isChestOpened ? '🌳' : '🌲'}
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-emerald-400">
                  اكْتِمَالُ شَجَرَةِ حَرْفِ {currentLetter.nameAr}! 🌳
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  {isChestOpened
                    ? `مَبْرُوك يَا ${childName || 'البَطَل'}! أَتْمَمْتَ كَافَّةَ المَرَاحِلِ وَأَنَرْتَ الغَابَة!`
                    : `أَنِرِ الشَّجَرَةَ بِالكَامِلِ يَا ${childName || 'البَطَل'} لِتُتَوَّجَ بِالإِتْقَان!`}
                </p>
              </div>

              {!isChestOpened ? (
                <button
                  onClick={() => {
                    setIsChestOpened(true);
                    addStars(2); // +2 stars bonus on top of 1 from handleSuccess = 3 stars total
                    addCoins(15);
                    handleSuccess(`أَلْفُ مَبْرُوك يَا ${childName || 'البَطَل'}! أَنْتَ رَسْمِيًّا بَطَلُ شَجَرَةِ ${currentLetter.nameAr} المُتَوَهِّجَة! 🌟`);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-emerald-400 via-green-400 to-emerald-500 text-slate-950 rounded-2xl font-black text-base border-2 border-white shadow-glow-green active:scale-95 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-5 h-5 fill-slate-950" />
                  <span>أَنِرِ الشَّجَرَةَ الأَسْطُورِيَّة! 🌟</span>
                </button>
              ) : (
                <div className="p-3.5 bg-emerald-950 rounded-2xl border border-emerald-400 flex items-center justify-center gap-2 text-emerald-300 text-sm font-black animate-pop shadow-glow-green">
                  <Award className="w-5 h-5" />
                  <span>نُورُ الإِتْقَانِ المُتَوَهِّج لِـ {childName || 'البَطَل'} 🌟 (+3 نُجُوم ذَهَبِيَّة)</span>
                </div>
              )}
            </div>
          )}

          {/* Direct Next Button when completed */}
          {isCompleted && !showEpicTransition && (
            <div className="pt-3 border-t border-blue-900/60 animate-pop">
              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base border-2 border-white shadow-glow-yellow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5 fill-slate-950" />
                <span>{stageNumber < 8 ? 'المَرْحَلَةُ التَّالِيَة 🚀' : 'الرُّجُوعُ لِخَرِيطَةِ المَرَاحِل 🗺️'}</span>
              </button>
            </div>
          )}

        </div>

      </main>

      {/* ========================================================================= */}
      {/* EPIC STAGE PROGRESSION MODAL */}
      {/* ========================================================================= */}
      {showEpicTransition && (
        <div className="fixed inset-0 z-50 bg-[#050814]/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-sm w-full bg-gradient-to-b from-[#132252] via-[#0d183d] to-[#08102a] rounded-3xl p-6 border-3 border-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.5)] text-center space-y-5 animate-pop">
            
            {/* Floating 3D Rocket */}
            <div className="relative">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-cyan-400 p-1 border-4 border-white shadow-glow-yellow animate-bounce flex items-center justify-center text-5xl">
                🚀
              </div>
              <span className="absolute -bottom-2 inset-x-0 mx-auto w-max bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full border border-white shadow">
                المَرْحَلَةُ {stageNumber + 1} انْفَتَحَتْ! 🔓
              </span>
            </div>

            <div className="space-y-1.5 pt-2">
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-white">
                تَقَدُّمٌ رَائِعٌ يَا {childName || 'البَطَل'}! ✨
              </h3>
              <p className="text-xs text-cyan-200 font-bold">
                أَتْمَمْتَ المَرْحَلَةَ {stageNumber} بِنَجَاح، وَانْتَقَلْتَ لِلْمَرْحَلَةِ {stageNumber + 1}!
              </p>
            </div>

            {/* Stars & Coins Award Banner */}
            <div className="flex items-center justify-center gap-3 bg-[#0a1330] p-3 rounded-2xl border border-amber-400/40 shadow-inner">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                <Star className="w-4 h-4 fill-amber-300 animate-spin-slow" />
                <span>+1 نَجْمَة ذَهَبِيَّة</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black text-yellow-300">
                <span>🪙</span>
                <span>+10 كُوَيْنْز</span>
              </div>
            </div>

            {/* Next Stage Action Button */}
            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-lg border-2 border-white shadow-glow-yellow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5 fill-slate-950" />
              <span>انْطَلِقْ لِلْمَرْحَلَةِ {stageNumber + 1}! 🚀</span>
            </button>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-[11px] text-amber-200/70 font-bold py-1">
        <span>LUMI — رِحْلَةُ حَرْفِ {currentLetter.nameAr} • المَرْحَلَة {stageNumber}</span>
      </footer>

      {/* Stages 8-Step Comprehensive Curriculum Guide Modal */}
      <StagesGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onSelectStage={(num) => onCompleteStageAndNext(num)}
        initialStage={stageNumber}
      />

    </div>
  );
};
