import React, { useState } from 'react';
import { ArrowRight, Volume2, Mic, CheckCircle2, Star, Trophy, Sparkles, ChevronLeft, Award } from 'lucide-react';
import lettersData from '../../data/letters.json';
import syllablesData from '../../data/syllables.json';
import wordsData from '../../data/words.json';
import sentencesData from '../../data/sentences.json';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { speechAnalyzer, SpeechAnalysisResult } from '../../services/speech/SpeechAnalyzer';
import { LoulouMascot } from '../mascot/LoulouMascot';

interface LetterJourneyMapProps {
  letterId: string;
  onBackToLetters: () => void;
  onLaunchMiniGame: (gameId: string) => void;
}

export const LetterJourneyMap: React.FC<LetterJourneyMapProps> = ({
  letterId,
  onBackToLetters,
  onLaunchMiniGame
}) => {
  const {
    letterProgress,
    updateLetterLevelProgress,
    addStars,
    addCoins,
    logAttempt,
    triggerCelebration,
    isVisualMode
  } = useGame();

  const letter = lettersData.find(l => l.id === letterId) || lettersData[0];
  const syllables = (syllablesData as any)[letter.id] || (syllablesData as any)['baa'];
  const words = (wordsData as any)[letter.id] || (wordsData as any)['baa'];
  const sentences = (sentencesData as any)[letter.id] || (sentencesData as any)['baa'];

  const progress = letterProgress[letter.id] || {
    recognition: 0,
    sound: 0,
    syllables: 0,
    words: 0,
    sentences: 0,
    overall: 0,
    status: 'learning',
    attempts: 0,
    currentLevel: 1
  };

  const [activeLevel, setActiveLevel] = useState<number>(progress.currentLevel || 1);
  
  // Interactive Level States
  const [level1Step, setLevel1Step] = useState<number>(0);
  const [level1Selected, setLevel1Selected] = useState<string | null>(null);

  // Level 2 (Sound & Mic)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [speechResult, setSpeechResult] = useState<SpeechAnalysisResult | null>(null);

  // Level 3 (Harakat)
  const [selectedHarakatIndex, setSelectedHarakatIndex] = useState<number>(0);

  // Level 4 (Madd Syllables)
  const [selectedMaddIndex, setSelectedMaddIndex] = useState<number>(0);

  // Level 5 (Words)
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(0);

  // Level 6 (Sound Position Quiz)
  const [positionQuizIndex, setPositionQuizIndex] = useState<number>(0);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  // Level 7 (Sentence Quiz)
  const [sentenceQuizSelected, setSentenceQuizSelected] = useState<number | null>(null);

  const levelsList = [
    { id: 1, title: 'التَّعَرُّف عَلَى الحَرْف', icon: '🔤', desc: 'شكل الحرف والصور المرتبطة' },
    { id: 2, title: 'صَوْتُ الحَرْفِ وَالمِيكْرُوفُون', icon: '🎙️', desc: 'نطق الحرف مع لولو' },
    { id: 3, title: 'الحَرَكَاتُ القَصِيرَة', icon: '🎵', desc: 'الفتحة، الضمة، الكسرة' },
    { id: 4, title: 'المَقَاطِعُ وَالمُدُود', icon: '🌊', desc: 'با، بو، بي' },
    { id: 5, title: 'الكَلِمَاتُ فِي مَوَاقِعِهَا', icon: '📖', desc: 'أول ووسط وآخر الكلمة' },
    { id: 6, title: 'مَوْقِعُ الصَّوْتِ', icon: '🎯', desc: 'تحدي تحديد موضع الحرف' },
    { id: 7, title: 'الجُمَلُ وَالمَعَانِي', icon: '💬', desc: 'تركيب الجمل والقصص' },
    { id: 8, title: 'التَّحَدِّي النِّهَائِي', icon: '🏆', desc: 'تتويج بطل الحرف' }
  ];

  // Speech recording handler
  const handleStartRecording = (targetText: string) => {
    setIsRecording(true);
    setSpeechResult(null);
    soundManager.playPop();

    speechAnalyzer.startListening(
      targetText,
      (result) => {
        setIsRecording(false);
        setSpeechResult(result);
        logAttempt(letter.id, targetText, result.phoneticScore, result.status);

        if (result.status === 'high_confidence' || result.status === 'acceptable') {
          soundManager.playSuccess();
          addStars(1);
          addCoins(5);
          updateLetterLevelProgress(letter.id, activeLevel, result.phoneticScore);
        } else {
          soundManager.playEncouragement();
        }
      },
      (vol) => setMicVolume(vol),
      () => {
        setIsRecording(false);
      }
    );
  };

  const handleStopRecording = () => {
    speechAnalyzer.stopListening();
    setIsRecording(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Breadcrumb & Letter Title */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 rounded-3xl border-2 border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToLetters();
            }}
            className="p-2.5 rounded-2xl bg-slate-100 border-2 border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors"
            title="العودة لقائمة الحروف"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center text-3xl font-black border-2 border-white shadow-sm">
              {letter.character}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-800">
                رِحْلَةُ حَرْفِ {letter.nameAr}
              </h1>
              <p className="text-xs text-slate-500 font-bold">
                المستوى {activeLevel} من 8 • نسبة الإتقان {progress.overall}%
              </p>
            </div>
          </div>
        </div>

        {/* Listen Letter Audio */}
        <button
          onClick={() => {
            soundManager.playClick();
            soundManager.speak(`حرف ${letter.nameAr} .. ${letter.character}`);
          }}
          className="game-btn px-4 py-2 bg-sky-100 text-sky-800 rounded-xl font-extrabold text-xs md:text-sm border border-sky-300 hover:bg-sky-200 transition-colors"
        >
          <Volume2 className="w-4 h-4 text-sky-600" />
          <span>اسْتَمِعْ لِلحَرْف</span>
        </button>
      </div>

      {/* 8-Level Stepper Pathway */}
      <div className="bg-white/80 backdrop-blur-md p-3 md:p-4 rounded-3xl border-2 border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] gap-2">
          {levelsList.map((lvl, index) => {
            const isUnlocked = progress.currentLevel >= lvl.id;
            const isActive = activeLevel === lvl.id;
            return (
              <div key={lvl.id} className="flex-1 flex items-center">
                <button
                  onClick={() => {
                    if (isUnlocked) {
                      soundManager.playClick();
                      setActiveLevel(lvl.id);
                    } else {
                      soundManager.playEncouragement();
                      soundManager.speak('أكمل المستوى السابق أولاً يا بطل!');
                    }
                  }}
                  className={`w-full flex flex-col items-center gap-1 p-2 rounded-2xl border-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-b from-sky-400 to-blue-500 text-white border-white shadow-card-pop scale-105'
                      : isUnlocked
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-slate-100 text-slate-400 border-slate-200 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <span className="text-xl">{lvl.icon}</span>
                  <span className="text-[11px] font-black whitespace-nowrap">
                    {lvl.id}. {lvl.title.split(' ')[0]}
                  </span>
                </button>
                {index < levelsList.length - 1 && (
                  <div className={`h-1 w-3 mx-1 rounded-full ${progress.currentLevel > lvl.id ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border-4 border-sky-300 shadow-card-pop min-h-[480px] flex flex-col justify-between">
        
        {/* ========================================================================= */}
        {/* LEVEL 1: Recognition & Shape */}
        {/* ========================================================================= */}
        {activeLevel === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-sky-100 text-sky-800 font-black text-xs px-3 py-1 rounded-full border border-sky-300">
                  المستوى 1: التَّعَرُّف عَلَى الحَرْف
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  شَاهِدْ وَتَعَرَّفْ عَلَى حَرْفِ {letter.nameAr}
                </h2>
              </div>
              <LoulouMascot
                message={`هَذَا حَرْفُ ${letter.nameAr}! شَكْلُهُ مُمَيَّزٌ وَجَمِيل!`}
                emotion="happy"
                size="sm"
              />
            </div>

            {/* Giant Letter Showcase */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
              <div
                onClick={() => {
                  soundManager.playPop();
                  soundManager.speak(letter.character);
                }}
                className="w-44 h-44 rounded-3xl bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center text-8xl font-black border-4 border-white shadow-glow-pink cursor-pointer active:scale-95 transition-transform animate-float"
                title="اضغط للاستماع"
              >
                {letter.character}
              </div>

              {/* Related Picture Examples */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-600">كَلِمَاتٌ تَبْدَأُ بِحَرْفِ {letter.nameAr}:</p>
                <div className="flex items-center gap-3">
                  {[
                    { emoji: '🦆', name: 'بَطَّة' },
                    { emoji: '🚪', name: 'بَاب' },
                    { emoji: '🌊', name: 'بَحْر' }
                  ].map(ex => (
                    <button
                      key={ex.name}
                      onClick={() => {
                        soundManager.playPop();
                        soundManager.speak(ex.name);
                      }}
                      className="game-card p-3.5 flex flex-col items-center gap-1 border-2 border-pink-200 hover:border-pink-400 active:scale-95 transition-transform"
                    >
                      <span className="text-3xl">{ex.emoji}</span>
                      <span className="font-black text-sm text-slate-800">{ex.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini Quiz: Choose the correct letter */}
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 text-center space-y-3">
              <p className="font-extrabold text-slate-800 text-base">
                سُؤَالُ الأَبْطَالِ: أَيْنَ حَرْفُ <span className="text-rose-600 text-xl">({letter.character})</span>؟
              </p>
              <div className="flex items-center justify-center gap-3">
                {['ت', letter.character, 'ن', 'ي'].map((char, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (char === letter.character) {
                        soundManager.playSuccess();
                        setLevel1Selected(char);
                        addStars(1);
                        addCoins(5);
                        updateLetterLevelProgress(letter.id, 1, 95);
                      } else {
                        soundManager.playEncouragement();
                      }
                    }}
                    className={`w-16 h-16 rounded-2xl font-black text-3xl border-3 transition-all ${
                      level1Selected === char
                        ? 'bg-emerald-500 text-white border-white shadow-glow-green scale-110'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-sky-400 hover:bg-sky-50 active:scale-95'
                    }`}
                  >
                    {char}
                  </button>
                ))}
              </div>
              {level1Selected && (
                <p className="text-emerald-600 font-black text-sm animate-pop">
                  🌟 رَائِعْ جِدًّا! إِجَابَةٌ صَحِيحَةٌ يَا بَطَل!
                </p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 2: Letter Sound & Microphone Practice */}
        {/* ========================================================================= */}
        {activeLevel === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1 rounded-full border border-purple-300">
                  المستوى 2: صَوْتُ الحَرْفِ وَالمِيكْرُوفُون
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  تَدَرَّبْ عَلَى نُطْقِ صَوْتِ {letter.nameAr}
                </h2>
              </div>
              <LoulouMascot
                message={`قُلْ مَعِي: (${letter.character}) .. اضْغَطْ عَلَى زِرِّ المِيكْرُوفُونِ وَتَحَدَّثْ!`}
                emotion="listening"
                size="sm"
              />
            </div>

            {/* Articulation Tip & Mouth Shape */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center gap-4">
              <span className="text-4xl">👄</span>
              <div>
                <h4 className="font-black text-amber-900 text-sm">نَصِيحَةُ لُولُو لِمَخْرَجِ الصَّوْت:</h4>
                <p className="text-xs md:text-sm text-amber-800 font-medium mt-0.5">
                  {letter.mouthGuide.tip}
                </p>
              </div>
            </div>

            {/* Sound & Microphone Challenge Area */}
            <div className="flex flex-col items-center justify-center gap-5 py-4">
              <div className="text-center">
                <span className="text-7xl md:text-8xl font-black text-rose-500 block mb-2">
                  {letter.character}
                </span>
                <button
                  onClick={() => soundManager.speak(letter.character)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-800 font-bold text-xs hover:bg-rose-200 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>اسْتَمِعْ لِلصَّوْتِ أَوَّلًا</span>
                </button>
              </div>

              {/* Record Button with Audio Visualizer */}
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => {
                    if (isRecording) {
                      handleStopRecording();
                    } else {
                      handleStartRecording(letter.character);
                    }
                  }}
                  className={`relative p-6 rounded-full border-4 transition-all duration-300 active:scale-95 shadow-card-pop ${
                    isRecording
                      ? 'bg-rose-500 text-white border-white animate-pulse shadow-glow-pink scale-110'
                      : 'bg-gradient-to-r from-sky-400 to-blue-600 text-white border-white shadow-glow-cyan hover:scale-105'
                  }`}
                >
                  <Mic className="w-10 h-10" />
                </button>

                <span className="font-extrabold text-sm text-slate-700">
                  {isRecording ? '🎙️ لُولُو يَسْتَمِعُ إِلَيْكَ الآن...' : 'اضْغَطْ وَقُلْ: ' + letter.character}
                </span>

                {/* Microphone Level Visualizer Bars */}
                {isRecording && (
                  <div className="flex items-center gap-1.5 h-8">
                    {[0.3, 0.6, 0.9, 0.7, 0.4, 0.8, 0.5].map((h, i) => (
                      <div
                        key={i}
                        className="w-2 bg-sky-500 rounded-full speech-bar"
                        style={{
                          height: `${Math.max(20, (micVolume || h) * 100)}%`,
                          animationDelay: `${i * 0.15}s`
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Analysis Result Feedback */}
                {speechResult && (
                  <div className={`mt-3 p-4 rounded-2xl border-2 text-center max-w-md ${
                    speechResult.status === 'high_confidence'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-yellow-50 border-yellow-300 text-yellow-800'
                  }`}>
                    <p className="font-black text-base">{speechResult.feedbackMessage}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      دِقَّةُ النُّطْق: {speechResult.phoneticScore}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 3: Short Vowels (Harakat) */}
        {/* ========================================================================= */}
        {activeLevel === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-300">
                  المستوى 3: الحَرَكَاتُ القَصِيرَة
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  الفَتْحَة ( َ ) ، الكَسْرَة ( ِ ) ، الضَّمَّة ( ُ )
                </h2>
              </div>
              <LoulouMascot
                message="اسْتَمِعْ لِكُلِّ حَرَكَةٍ وَحَاوِلْ تَقْلِيدَ الصَّوْتِ يَا بَطَل!"
                emotion="talking"
                size="sm"
              />
            </div>

            {/* Short Vowels Carousel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              {syllables.short.map((item: any, idx: number) => {
                const isSelected = selectedHarakatIndex === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedHarakatIndex(idx);
                      soundManager.playPop();
                      soundManager.speak(item.syllable);
                    }}
                    className={`game-card p-6 flex flex-col items-center justify-between min-h-[220px] border-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-50/90 shadow-card-pop scale-105'
                        : 'border-slate-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <span className="text-xs font-black bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                      {item.nameAr}
                    </span>

                    <span className="text-6xl font-black text-emerald-600 my-2">
                      {item.syllable}
                    </span>

                    <p className="text-xs text-slate-600 font-bold text-center">
                      {item.soundTip}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.speak(item.syllable);
                      }}
                      className="mt-2 p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quiz: Find the correct haraka */}
            <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-extrabold text-slate-800 text-sm">
                  تَحَدِّي الحَرَكَات: اضْغَطْ عَلَى ({syllables.short[selectedHarakatIndex].syllable}) ثُمَّ رَدِّدْ مَعَنَا!
                </p>
              </div>

              <button
                onClick={() => {
                  soundManager.playSuccess();
                  addStars(1);
                  addCoins(5);
                  updateLetterLevelProgress(letter.id, 3, 90);
                }}
                className="game-btn px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-black text-xs hover:bg-emerald-600 transition-colors"
              >
                <span>أَحْسَنْتَ التَّدْرِيب! تَأْكِيد 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 4: Syllables & Long Vowels (Madd) */}
        {/* ========================================================================= */}
        {activeLevel === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-sky-100 text-sky-800 font-black text-xs px-3 py-1 rounded-full border border-sky-300">
                  المستوى 4: المَقَاطِعُ وَالمُدُودُ الطَّوِيلَة
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  مَدُّ الأَلِف (بَا) ، مَدُّ اليَاء (بِي) ، مَدُّ الوَاو (بُو)
                </h2>
              </div>
              <LoulouMascot
                message="مُدَّ صَوْتَكَ طَوِيلًا جِدًّا مِثْلَ القِطَار: بَااااا!"
                emotion="cheering"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              {syllables.long.map((item: any, idx: number) => {
                const isSelected = selectedMaddIndex === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedMaddIndex(idx);
                      soundManager.playPop();
                      soundManager.speak(item.syllable);
                    }}
                    className={`game-card p-6 flex flex-col items-center justify-between min-h-[220px] border-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-sky-400 bg-sky-50/90 shadow-card-pop scale-105'
                        : 'border-slate-200 hover:border-sky-300 bg-white'
                    }`}
                  >
                    <span className="text-xs font-black bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                      {item.nameAr}
                    </span>

                    <span className="text-6xl font-black text-sky-600 my-2">
                      {item.syllable}
                    </span>

                    <p className="text-xs text-slate-600 font-bold text-center">
                      مِثَال: {item.example}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.speak(item.syllable);
                      }}
                      className="mt-2 p-2 rounded-xl bg-sky-100 text-sky-800 hover:bg-sky-200 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  soundManager.playSuccess();
                  addStars(1);
                  addCoins(5);
                  updateLetterLevelProgress(letter.id, 4, 88);
                }}
                className="game-btn px-6 py-3 bg-sky-500 text-white rounded-2xl font-black text-sm"
              >
                <span>اكْتَمَلَ تَدْرِيبُ المُدُود 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 5: Words by Position (Start, Middle, End) */}
        {/* ========================================================================= */}
        {activeLevel === 5 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-100 text-amber-800 font-black text-xs px-3 py-1 rounded-full border border-amber-300">
                  المستوى 5: الكَلِمَاتُ فِي مَوَاقِعِهَا
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  كَلِمَاتٌ بِمَوَاقِعِ الحَرْف (أَوَّل، وَسَط، آخِر)
                </h2>
              </div>
              <LoulouMascot
                message="انْظُرْ كَيْفَ يَتَغَيَّرُ مَوْقِعُ الحَرْفِ فِي الكَلِمَة!"
                emotion="happy"
                size="sm"
              />
            </div>

            {/* Word Explorer Carousel */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-4">
              <div className="game-card p-6 border-4 border-amber-300 bg-amber-50/60 max-w-md w-full text-center space-y-4">
                <span className="inline-block bg-amber-400 text-slate-900 font-black text-xs px-3 py-1 rounded-full">
                  {words[selectedWordIndex].positionLabel}
                </span>

                <div className="text-6xl my-2">
                  {words[selectedWordIndex].emoji}
                </div>

                <div
                  className="text-4xl md:text-5xl font-black text-slate-800"
                  dangerouslySetInnerHTML={{ __html: words[selectedWordIndex].highlightedWord }}
                />

                <p className="text-xs text-slate-600 font-bold">
                  {words[selectedWordIndex].meaning}
                </p>

                {/* Letters Breakdown Tag Chips */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  {words[selectedWordIndex].lettersBreakdown.map((ch: string, i: number) => (
                    <span
                      key={i}
                      className={`w-9 h-9 rounded-xl font-black text-base flex items-center justify-center border-2 ${
                        ch === letter.character
                          ? 'bg-rose-500 text-white border-white'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {ch}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => soundManager.speak(words[selectedWordIndex].word)}
                    className="game-btn px-4 py-2 bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>اسْتَمِعْ لِلكَلِمَة</span>
                  </button>

                  <button
                    onClick={() => handleStartRecording(words[selectedWordIndex].word)}
                    className="game-btn px-4 py-2 bg-rose-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                  >
                    <Mic className="w-4 h-4" />
                    <span>انْطِقْ أَنْت</span>
                  </button>
                </div>
              </div>

              {/* Word List Selector */}
              <div className="grid grid-cols-2 gap-2 max-w-xs w-full">
                {words.map((w: any, idx: number) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      setSelectedWordIndex(idx);
                      soundManager.playPop();
                      soundManager.speak(w.word);
                    }}
                    className={`p-3 rounded-2xl font-black text-xs border-2 text-right flex items-center justify-between ${
                      selectedWordIndex === idx
                        ? 'bg-amber-400 text-slate-900 border-white shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{w.word}</span>
                    <span>{w.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  soundManager.playSuccess();
                  addStars(1);
                  addCoins(5);
                  updateLetterLevelProgress(letter.id, 5, 85);
                }}
                className="game-btn px-6 py-3 bg-amber-500 text-white rounded-2xl font-black text-sm"
              >
                <span>مُمْتَاز! اكْتَمَلَ تَدْرِيبُ الكَلِمَات 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 6: Sound Position in Word Quiz */}
        {/* ========================================================================= */}
        {activeLevel === 6 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-indigo-100 text-indigo-800 font-black text-xs px-3 py-1 rounded-full border border-indigo-300">
                  المستوى 6: مَوْقِعُ الصَّوْتِ دَاخِلَ الكَلِمَة
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  أَيْنَ يَجْلِسُ حَرْفُ {letter.nameAr}؟
                </h2>
              </div>
              <LoulouMascot
                message="اسْتَمِعْ لِلكَلِمَةِ وَحَدِّدْ: هَل الحَرْف فِي الأَوَّل، الوَسَط، أَم الآخِر؟"
                emotion="thinking"
                size="sm"
              />
            </div>

            <div className="bg-indigo-50/80 p-6 rounded-3xl border-3 border-indigo-200 text-center space-y-4 max-w-lg mx-auto">
              <span className="text-5xl block">
                {words[positionQuizIndex].emoji}
              </span>

              <h3 className="text-4xl font-black text-indigo-900">
                {words[positionQuizIndex].word}
              </h3>

              <button
                onClick={() => soundManager.speak(words[positionQuizIndex].word)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-200 text-indigo-900 rounded-full font-bold text-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلكَلِمَة</span>
              </button>

              <div className="grid grid-cols-3 gap-3 pt-3">
                {[
                  { id: 'start', label: 'فِي الأَوَّل' },
                  { id: 'middle', label: 'فِي الوَسَط' },
                  { id: 'end', label: 'فِي الآخِر' }
                ].map(pos => (
                  <button
                    key={pos.id}
                    onClick={() => {
                      if (pos.id === words[positionQuizIndex].position) {
                        soundManager.playSuccess();
                        setSelectedPosition(pos.id);
                        addStars(1);
                        addCoins(5);
                        updateLetterLevelProgress(letter.id, 6, 92);
                      } else {
                        soundManager.playEncouragement();
                      }
                    }}
                    className={`p-3.5 rounded-2xl font-black text-xs md:text-sm border-2 transition-all ${
                      selectedPosition === pos.id
                        ? 'bg-emerald-500 text-white border-white shadow-glow-green scale-105'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-400 active:scale-95'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>

              {selectedPosition && (
                <div className="pt-2">
                  <p className="text-emerald-600 font-black text-sm">
                    🌟 بَطَل! إِجَابَةٌ دَقِيقَةٌ جِدًّا!
                  </p>
                  <button
                    onClick={() => {
                      setSelectedPosition(null);
                      setPositionQuizIndex((prev) => (prev + 1) % words.length);
                    }}
                    className="mt-2 px-4 py-1.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                  >
                    السُّؤَالُ التَّالِي ⬅️
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 7: Sentences & Context */}
        {/* ========================================================================= */}
        {activeLevel === 7 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1 rounded-full border border-purple-300">
                  المستوى 7: الجُمَلُ وَالمَعَانِي
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  تَرْكِيبُ وَفَهْمُ الجُمَلِ البَسِيطَة
                </h2>
              </div>
              <LoulouMascot
                message="أَنْتَ الآنَ فِي مُسْتَوَى الجُمَل! هَيَّا نَقْرَأُ مَعًا!"
                emotion="cheering"
                size="sm"
              />
            </div>

            {/* Sentence Showcase */}
            <div className="bg-purple-50 p-6 rounded-3xl border-3 border-purple-200 max-w-xl mx-auto space-y-4 text-center">
              <span className="text-5xl block">{sentences[0].emoji}</span>

              <h3 className="text-3xl md:text-4xl font-black text-purple-950">
                {sentences[0].sentence}
              </h3>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => soundManager.speak(sentences[0].sentence)}
                  className="game-btn px-4 py-2 bg-purple-200 text-purple-900 rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>اسْتَمِعْ لِلجُمْلَة</span>
                </button>

                <button
                  onClick={() => handleStartRecording(sentences[0].sentence)}
                  className="game-btn px-4 py-2 bg-purple-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Mic className="w-4 h-4" />
                  <span>كَرِّرِ الجُمْلَة 🎙️</span>
                </button>
              </div>

              {/* Missing Word Quiz */}
              <div className="pt-4 border-t border-purple-200 text-right space-y-2">
                <p className="font-extrabold text-xs text-slate-700">
                  {sentences[0].missingWordExercise.question}
                </p>
                <div className="flex items-center gap-2">
                  {sentences[0].missingWordExercise.options.map((opt: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === sentences[0].missingWordExercise.correctIndex) {
                          soundManager.playSuccess();
                          setSentenceQuizSelected(idx);
                          addStars(2);
                          addCoins(10);
                          updateLetterLevelProgress(letter.id, 7, 90);
                        } else {
                          soundManager.playEncouragement();
                        }
                      }}
                      className={`flex-1 p-2.5 rounded-xl font-black text-xs border-2 ${
                        sentenceQuizSelected === idx
                          ? 'bg-emerald-500 text-white border-white shadow-md'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-purple-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 8: Final Challenge & Trophy Celebration */}
        {/* ========================================================================= */}
        {activeLevel === 8 && (
          <div className="space-y-6 text-center py-4">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-5xl border-4 border-white shadow-glow-yellow animate-bounce">
                🏆
              </div>

              <h2 className="text-3xl font-black text-slate-800">
                مُبَارَكْ! أَنْتَ بَطَلُ حَرْفِ {letter.nameAr}!
              </h2>

              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                لَقَدْ أَتْمَمْتَ جَمِيعَ مُسْتَوَيَاتِ الحَرْفِ بِنَجَاحٍ بَاهِرٍ وَتَعَلَّمْتَ الصَّوْتَ وَالحَرَكَاتِ وَالكَلِمَاتِ وَالجُمَل!
              </p>

              {/* Trophy Certificate Card */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-100 border-4 border-amber-400 p-6 rounded-3xl shadow-md text-center space-y-3">
                <span className="text-xs font-black text-amber-800 bg-amber-200 px-3 py-1 rounded-full">
                  شَهَادَةُ إِتْقَانِ حَرْفِ {letter.nameAr}
                </span>

                <div className="text-5xl font-black text-rose-500">
                  {letter.character}
                </div>

                <p className="font-extrabold text-base text-slate-800">
                  البَطَلُ المُمَيَّزُ فِي نُطْقِ حَرْفِ {letter.nameAr}
                </p>

                <div className="flex items-center justify-center gap-4 text-xs font-black text-slate-700 pt-2 border-t border-amber-300">
                  <span>⭐ +5 نُجُوم</span>
                  <span>🪙 +30 عُمْلَة</span>
                  <span>🔓 فَتْحُ الحَرْفِ التَّالِي</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => {
                    triggerCelebration();
                    addStars(5);
                    addCoins(30);
                    updateLetterLevelProgress(letter.id, 8, 100);
                  }}
                  className="game-btn px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 rounded-2xl font-black text-sm shadow-glow-yellow"
                >
                  <Sparkles className="w-5 h-5 text-amber-800" />
                  <span>اسْتَلِمْ جَائِزَةَ التَّتْوِيج! 🎁</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onLaunchMiniGame('bubble_pop');
                  }}
                  className="game-btn px-5 py-3 bg-sky-500 text-white rounded-2xl font-black text-sm"
                >
                  <span>العَبْ صَيْدَ الحُرُوف 🎮</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Level Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-6">
          <button
            onClick={() => {
              if (activeLevel > 1) {
                soundManager.playClick();
                setActiveLevel(prev => prev - 1);
              }
            }}
            disabled={activeLevel <= 1}
            className="game-btn px-4 py-2.5 rounded-xl border-2 border-slate-200 font-bold text-xs text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            <span>المستوى السابق</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-500">
              {activeLevel} من 8
            </span>
          </div>

          <button
            onClick={() => {
              if (activeLevel < 8) {
                soundManager.playClick();
                setActiveLevel(prev => prev + 1);
              }
            }}
            disabled={activeLevel >= 8}
            className="game-btn px-5 py-2.5 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-black text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:from-sky-500 hover:to-blue-600"
          >
            <span>المستوى التالي ⬅️</span>
          </button>
        </div>

      </div>

    </div>
  );
};
