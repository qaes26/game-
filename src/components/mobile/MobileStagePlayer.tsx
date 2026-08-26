import React, { useState, useEffect } from 'react';
import { ArrowRight, Volume2, Mic, Sparkles, Star, Crown, Play, CheckCircle2, RotateCcw, Award, Rocket } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../lumi/LumiMascot';
import { InteractiveLetter3D } from '../3d/InteractiveLetter3D';
import { AnimatedArticulationTeacher } from '../articulation/AnimatedArticulationTeacher';

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
  const [selectedAnswer, setSelectedAnswer] = useState<any>(null);

  // Stage Specific States
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [hasSpoken, setHasSpoken] = useState<boolean>(false);
  const [selectedHarakat, setSelectedHarakat] = useState<number>(0);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(0);
  const [builtWords, setBuiltWords] = useState<string[]>([]);
  const [isChestOpen, setIsChestOpen] = useState<boolean>(false);

  // Initialize stage speech and reset
  useEffect(() => {
    setIsCompleted(false);
    setShowEpicTransition(false);
    setSelectedAnswer(null);
    setIsRecording(false);
    setHasSpoken(false);
    setBuiltWords([]);
    setIsChestOpen(false);

    const introPrompt = `المَرْحَلَةُ ${stageNumber} يَا ${childName}: ${stageDef.titleAr}.. ${stageDef.objectiveAr}`;
    setFeedbackText(introPrompt);

    const timer = setTimeout(() => {
      audioManager.speak(introPrompt);
    }, 300);

    return () => clearTimeout(timer);
  }, [stageNumber, letterId, childName]);

  // Success handler
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

    const cheer =
      customCheer ||
      `أَحْسَنْتَ يَا ${childName}! إِجَابَةٌ مَلَكِيَّةٌ رَائِعَة!`;
    setFeedbackText(cheer);
    audioManager.speak(cheer);

    addStars(1);
    addCoins(10);
    updateLetterStage(currentLetter.id, stageNumber, true);

    if (stageNumber === 8) {
      triggerVictoryCelebration();
    } else {
      // Trigger Epic Stage Transition Animation!
      setTimeout(() => {
        setShowEpicTransition(true);
        audioManager.speak(`مَبْرُوك يَا ${childName}! فُتِحَتْ لَكَ المَرْحَلَةُ ${stageNumber + 1}! هَيَّا نَنْطَلِق!`);
      }, 1200);
    }
  };

  // Failure / Retry handler
  const handleRetry = () => {
    audioManager.playClick();
    const retryCheer = `حَاوِلْ مَرَّةً أُخْرَى يَا ${childName}.. أَنْتَ قَرِيبٌ جِدًّا!`;
    setFeedbackText(retryCheer);
    audioManager.speak(retryCheer);
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] via-[#091230] to-[#040711] text-white pb-16 select-none relative overflow-x-hidden flex flex-col justify-between">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-[#070e24]/90 backdrop-blur-xl border-b border-amber-400/30 px-4 py-3 shadow-md">
        <div className="max-w-md mx-auto flex items-center justify-between">
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

          <div className="flex items-center gap-2">
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
      <main className="max-w-md mx-auto w-full px-4 py-3 space-y-4 my-auto">
        
        {/* Lumi Active Companion */}
        <div className="flex justify-center">
          <LumiMascot
            message={feedbackText}
            emotion={isCompleted ? 'cheering' : isRecording ? 'listening' : 'happy'}
            size="sm"
          />
        </div>

        {/* Stage Content Card */}
        <div className="bg-[#0c173b]/95 backdrop-blur-xl rounded-3xl p-5 border-2 border-amber-400/70 shadow-[0_0_35px_rgba(245,158,11,0.3)] space-y-4 text-center">
          
          {/* ========================================================================= */}
          {/* STAGE 1: LETTER DISCOVERY & 3D CRYSTAL */}
          {/* ========================================================================= */}
          {stageNumber === 1 && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <InteractiveLetter3D char={currentLetter.char} color="#f59e0b" size={130} />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-amber-300">
                  حَرْفُ {currentLetter.nameAr} ({currentLetter.char})
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  اضْغَطْ لِسَمَاعِ صَوْتِ الحَرْفِ يَا {childName}!
                </p>
              </div>

              <button
                onClick={() => audioManager.speak(`حَرْفُ ${currentLetter.nameAr}.. ${currentLetter.char}`)}
                className="w-full py-3 bg-[#182a5c] hover:bg-[#203777] text-amber-300 rounded-2xl font-black text-sm border border-amber-400/50 flex items-center justify-center gap-2 active:scale-95 shadow-md"
              >
                <Volume2 className="w-4 h-4 text-amber-400" />
                <span>اسْتَمِعْ لِصَوْتِ الحَرْف 🔊</span>
              </button>

              <div className="pt-2">
                <p className="text-xs text-white font-bold mb-2">
                  أَيْنَ هُوَ حَرْفُ ({currentLetter.char}) يَا {childName}؟
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    currentLetter.char,
                    ARABIC_LETTERS[(currentLetter.order + 3) % 28].char,
                    ARABIC_LETTERS[(currentLetter.order + 7) % 28].char
                  ]
                    .sort()
                    .map((char, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          if (char === currentLetter.char) {
                            handleSuccess(`أَحْسَنْتَ يَا ${childName}! اخْتَرْتَ حَرْفَ ${currentLetter.nameAr} بِتَفَوُّق!`);
                          } else {
                            handleRetry();
                          }
                        }}
                        disabled={isCompleted}
                        className={`py-4 rounded-2xl text-2xl font-black border-2 transition-all active:scale-90 shadow-md ${
                          isCompleted && char === currentLetter.char
                            ? 'bg-emerald-600 border-white text-white shadow-glow-green scale-105'
                            : 'bg-[#152554] border-blue-900 text-white hover:border-amber-400'
                        }`}
                      >
                        {char}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 2: VOICE ECHO & ARTICULATION TEACHER VIDEO */}
          {/* ========================================================================= */}
          {stageNumber === 2 && (
            <div className="space-y-4 text-right">
              <AnimatedArticulationTeacher
                letter={currentLetter}
                onSuccess={() => {
                  handleSuccess(`أَحْسَنْتَ يَا ${childName}! نُطْقٌ صَوْتِيٌّ نَقِيٌّ وَمُمْتَاز!`);
                }}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 3: SHORT VOWELS (FAT-HA, DAMMA, KASRA) */}
          {/* ========================================================================= */}
          {stageNumber === 3 && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-amber-300">
                الحَرَكَاتُ الثَّلَاثُ لِحَرْفِ {currentLetter.nameAr}
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { char: `${currentLetter.char}َ`, name: 'فَتْحَة', sound: `${currentLetter.char}َ` },
                  { char: `${currentLetter.char}ُ`, name: 'ضَمَّة', sound: `${currentLetter.char}ُ` },
                  { char: `${currentLetter.char}ِ`, name: 'كَسْرَة', sound: `${currentLetter.char}ِ` }
                ].map((vowel, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedHarakat(idx);
                      audioManager.speak(vowel.sound);
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all active:scale-90 shadow-md ${
                      selectedHarakat === idx
                        ? 'bg-gradient-to-b from-[#1d3570] to-[#122452] border-amber-400 shadow-glow-yellow scale-105'
                        : 'bg-[#122046] border-blue-900 text-slate-300'
                    }`}
                  >
                    <span className="text-3xl font-black text-amber-300">{vowel.char}</span>
                    <span className="text-[11px] font-bold">{vowel.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleSuccess(`مُمْتَاز يَا ${childName}! أَتْقَنْتَ حَرَكَاتِ حَرْفِ ${currentLetter.nameAr}!`)}
                disabled={isCompleted}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 rounded-2xl font-black text-sm border border-white shadow-glow-yellow active:scale-95"
              >
                <span>أَتْقَنْتُ الحَرَكَاتِ يَا لُومِي! ⭐</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 4: LONG VOWELS & SYLLABLES */}
          {/* ========================================================================= */}
          {stageNumber === 4 && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-cyan-300">
                المُدُودُ الطَّوِيلَة 🌊
              </h3>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { char: `${currentLetter.char}َا`, name: 'مَدّ بِالأَلِف' },
                  { char: `${currentLetter.char}ُو`, name: 'مَدّ بِالوَاو' },
                  { char: `${currentLetter.char}ِي`, name: 'مَدّ بِاليَاء' }
                ].map((syl, idx) => (
                  <button
                    key={idx}
                    onClick={() => audioManager.speak(syl.char)}
                    className="p-3 rounded-2xl bg-[#12224d] border-2 border-cyan-400/60 hover:border-cyan-300 flex flex-col items-center justify-center gap-1 active:scale-90 shadow-md"
                  >
                    <span className="text-3xl font-black text-cyan-200">{syl.char}</span>
                    <span className="text-[10px] text-cyan-300 font-bold">{syl.name}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleSuccess(`رَائِعٌ يَا ${childName}! أَتْقَنْتَ المُدُودَ الطَّوِيلَة!`)}
                disabled={isCompleted}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-2xl font-black text-sm border border-white shadow-glow-cyan active:scale-95"
              >
                <span>تَأْكِيدُ إِتْقَانِ المُدُود 🌊</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 5: WORD TREASURE */}
          {/* ========================================================================= */}
          {stageNumber === 5 && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-amber-300">
                كَنْزُ كَلِمَاتِ حَرْفِ {currentLetter.nameAr} 📖
              </h3>

              <div className="grid grid-cols-2 gap-2.5">
                {currentLetter.words.slice(0, 4).map((w, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedWordIndex(idx);
                      audioManager.speak(w.word);
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all active:scale-90 shadow-md ${
                      selectedWordIndex === idx
                        ? 'bg-[#1a2f66] border-amber-400 shadow-glow-yellow'
                        : 'bg-[#111f44] border-blue-900'
                    }`}
                  >
                    <span className="text-4xl">{w.emoji}</span>
                    <span className="text-lg font-black text-white">{w.word}</span>
                    <span className="text-[10px] text-cyan-300 font-bold">{w.meaning}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => handleSuccess(`عَمَلٌ مُمْتَازٌ يَا ${childName}! تَعَلَّمْتَ كَلِمَاتِ حَرْفِ ${currentLetter.nameAr}!`)}
                disabled={isCompleted}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 rounded-2xl font-black text-sm border border-white shadow-glow-yellow active:scale-95"
              >
                <span>أَتْقَنْتُ الكَلِمَاتِ يَا لُومِي! 🌟</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 6: SOUND POSITION RADAR */}
          {/* ========================================================================= */}
          {stageNumber === 6 && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-cyan-300">
                أَيْنَ يَقَعُ صَوْتُ الحَرْفِ يَا {childName}؟ 🎯
              </h3>

              <div className="p-4 rounded-2xl bg-[#101e44] border border-blue-800 space-y-1">
                <span className="text-5xl">{currentLetter.words[0]?.emoji || '🚪'}</span>
                <p className="text-2xl font-black text-amber-300">
                  {currentLetter.words[0]?.word || 'بَاب'}
                </p>
                <p className="text-xs text-slate-300 font-bold">
                  فِي أَيِّ مَوْضِعٍ يَظْهَرُ حَرْفُ ({currentLetter.char})؟
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'start', label: 'أَوَّل الكَلِمَة', isCorrect: true },
                  { id: 'middle', label: 'وَسَط الكَلِمَة', isCorrect: false },
                  { id: 'end', label: 'آخِر الكَلِمَة', isCorrect: false }
                ].map((pos) => (
                  <button
                    key={pos.id}
                    onClick={() => {
                      if (pos.isCorrect) {
                        handleSuccess(`عَبْقَرِيٌّ يَا ${childName}! مَوْضِعُ الحَرْفِ صَحِيحٌ مِئَةً بِالمِئَة!`);
                      } else {
                        handleRetry();
                      }
                    }}
                    disabled={isCompleted}
                    className="py-3 px-1 rounded-2xl bg-[#152554] hover:bg-[#1f377d] border-2 border-blue-900 text-xs font-black text-white active:scale-90 shadow-md"
                  >
                    {pos.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 7: MAGICAL SENTENCE BUILDER */}
          {/* ========================================================================= */}
          {stageNumber === 7 && (
            <div className="space-y-4">
              <h3 className="text-xl font-black text-amber-300">
                صَانِعُ الجُمَلِ السَّاحِرَةِ يَا {childName} 💬
              </h3>

              <div className="p-3.5 rounded-2xl bg-[#101e44] border border-blue-800 min-h-[55px] flex items-center justify-center gap-2 text-base font-black text-amber-200">
                {builtWords.length > 0 ? (
                  builtWords.join(' ')
                ) : (
                  <span className="text-xs text-slate-400 font-bold">اضْغَطِ الكَلِمَاتِ بِالتَّرْتِيبِ الصَّحِيح!</span>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                {['هَذَا', 'بَابُ', 'البَيْتِ'].map((w, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.speak(w);
                      const next = [...builtWords, w];
                      setBuiltWords(next);
                      if (next.length === 3) {
                        audioManager.speak('هَذَا بَابُ البَيْتِ');
                        handleSuccess(`عَمَلٌ رَائِعٌ جِدًّا يَا ${childName}! رَكَّبْتَ الجُمْلَةَ كَامِلَة!`);
                      }
                    }}
                    disabled={isCompleted || builtWords.includes(w)}
                    className={`px-4 py-2.5 rounded-2xl font-black text-sm border-2 transition-all active:scale-90 shadow-md ${
                      builtWords.includes(w)
                        ? 'bg-slate-800 border-slate-700 text-slate-500 opacity-50'
                        : 'bg-[#182a5c] border-amber-400/60 text-white hover:border-amber-300'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>

              {builtWords.length > 0 && !isCompleted && (
                <button
                  onClick={() => setBuiltWords([])}
                  className="text-xs text-rose-300 font-black inline-flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>إِعَادَةُ التَّرْتِيب</span>
                </button>
              )}
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 8: GRAND FINALE CHEST & CORONATION */}
          {/* ========================================================================= */}
          {stageNumber === 8 && (
            <div className="space-y-4">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-5xl border-3 border-white shadow-glow-yellow animate-bounce-slow">
                {isChestOpen ? '👑' : '🎁'}
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-amber-300">
                  تَتْوِيجُ {childName} بَطَلًا لِحَرْفِ {currentLetter.nameAr} 👑
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  {isChestOpen ? `مَبْرُوك يَا ${childName}! أَتْمَمْتَ كَافَّةَ المَرَاحِلِ بِنَجَاح!` : `افْتَحْ صُنْدُوقَ الكَنْزِ يَا ${childName} لِتَتْوِيجِكَ!`}
                </p>
              </div>

              {!isChestOpen ? (
                <button
                  onClick={() => {
                    setIsChestOpen(true);
                    handleSuccess(`أَلْفُ مَبْرُوك يَا ${childName}! أَنْتَ بَطَلُ حَرْفِ ${currentLetter.nameAr} المَلَكِيّ! 👑`);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-lg border-2 border-white shadow-glow-yellow active:scale-95 flex items-center justify-center gap-2"
                >
                  <Crown className="w-5 h-5 fill-slate-950" />
                  <span>افْتَحْ صُنْدُوقَ الكَنْزِ الأَسْطُورِيّ! 🎁</span>
                </button>
              ) : (
                <div className="p-3 bg-[#111f48] rounded-2xl border border-amber-400/50 flex items-center justify-center gap-2 text-amber-300 text-sm font-black animate-pop">
                  <Award className="w-5 h-5" />
                  <span>تَاجُ الإِتْقَانِ المَلَكِيّ لِـ {childName} 👑 +3 نُجُوم</span>
                </div>
              )}
            </div>
          )}

          {/* Direct Next Button */}
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
      {/* EPIC STAGE PROGRESSION TRANSITION MODAL (تقدم المراحل بأنيميشن رهيب!) */}
      {/* ========================================================================= */}
      {showEpicTransition && (
        <div className="fixed inset-0 z-50 bg-[#050814]/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-sm w-full bg-gradient-to-b from-[#132252] via-[#0d183d] to-[#08102a] rounded-3xl p-6 border-3 border-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.5)] text-center space-y-5 animate-pop">
            
            {/* Glowing Aura Rings */}
            <div className="absolute -top-16 inset-x-0 mx-auto w-32 h-32 bg-amber-400/30 rounded-full blur-2xl pointer-events-none" />

            {/* Floating 3D Rocket Lumi */}
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
                تَقَدُّمٌ رَائِعٌ يَا {childName}! ✨
              </h3>
              <p className="text-xs text-cyan-200 font-bold">
                أَتْمَمْتَ المَرْحَلَةَ {stageNumber} بِنَجَاح، وَانْتَقَلْتَ لِلْمَرْحَلَةِ التَّالِيَة!
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

    </div>
  );
};
