import React, { useState, useEffect } from 'react';
import { ArrowRight, Volume2, Mic, CheckCircle2, Star, Trophy, Sparkles, ChevronLeft, Award } from 'lucide-react';
import lettersData from '../../data/letters.json';
import syllablesData from '../../data/syllables.json';
import wordsData from '../../data/words.json';
import sentencesData from '../../data/sentences.json';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { speechAnalyzer, SpeechAnalysisResult } from '../../services/speech/SpeechAnalyzer';
import { LumiMascot } from '../mascot/LumiMascot';

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

  // Mascot State
  const [lumiState, setLumiState] = useState<'idle' | 'listening' | 'success' | 'retry'>('idle');
  
  useEffect(() => {
    setLumiState('idle');
  }, [activeLevel]);

  // Cleanup microphone on unmount to prevent memory leaks and orphaned listening states
  useEffect(() => {
    return () => {
      speechAnalyzer.stopListening();
    };
  }, []);

  const levelsList = [
    { id: 1, title: 'البذرة المضيئة', icon: '🌱', desc: 'التعرف على شكل الحرف والصور المرتبطة به كبذرة نور!' },
    { id: 2, title: 'قطرات الصوت', icon: '💧', desc: 'نطق صوت الحرف لتسقي به البذرة وتنمو!' },
    { id: 3, title: 'براعم النغمات', icon: '🎵', desc: 'تمييز الحركات القصيرة الثلاث لتفتيح براعم النور!' },
    { id: 4, title: 'غصون تمتد', icon: '🌿', desc: 'المقاطع الممدودة لتمديد غصون شجرة النور!' },
    { id: 5, title: 'ثمار الكلمات', icon: '🍎', desc: 'الكلمات حسب موقع الحرف فيها كأزهار وثمار!' },
    { id: 6, title: 'النحلة الباحثة', icon: '🐝', desc: 'تحدي تحديد موقع الصوت داخل الكلمة مع النحلة المضيئة!' },
    { id: 7, title: 'غابة الحكايات', icon: '📖', desc: 'الجمل والمعاني لتكوين حكايات من الثمار!' },
    { id: 8, title: 'الشجرة المتوهجة', icon: '🌳', desc: 'التحدي النهائي والاحتفال باكتمال شجرة الحرف المضيئة!' }
  ];

  // Speech recording handler
  const handleStartRecording = (targetText: string) => {
    if (!speechAnalyzer.isSupported()) {
      alert('المُتَصَفِّحُ لَا يَدْعَمُ تَمْيِيزَ الصَّوْت. يُرْجَى اسْتِخْدَامُ Chrome أَوْ Edge.');
      return;
    }
    setIsRecording(true);
    setLumiState('listening');
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
          setLumiState('success');
          addStars(1);
          addCoins(5);
          updateLetterLevelProgress(letter.id, activeLevel, result.phoneticScore);
        } else {
          soundManager.playEncouragement();
          setLumiState('retry');
        }
      },
      (vol) => setMicVolume(vol),
      () => {
        setIsRecording(false);
        setLumiState(prev => prev === 'listening' ? 'idle' : prev);
      }
    );
  };

  const handleStopRecording = () => {
    speechAnalyzer.stopListening();
    setIsRecording(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none font-body">
      
      {/* Top Breadcrumb & Letter Title */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--color-lumi-glass)] backdrop-blur-md p-4 rounded-3xl border-2 border-[var(--color-lumi-secondary)]/50 shadow-lg text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToLetters();
            }}
            className="p-2.5 rounded-2xl bg-[var(--color-lumi-base)] border-2 border-[var(--color-lumi-secondary)]/30 text-[var(--color-lumi-neutral)] hover:text-white hover:bg-[var(--color-lumi-secondary)] transition-colors"
            title="العودة لقائمة الحروف"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-lumi-primary)] text-slate-900 flex items-center justify-center text-3xl font-black border-2 border-[var(--color-lumi-secondary)] shadow-[0_0_15px_rgba(252,211,77,0.5)]">
              {letter.character}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-black text-[var(--color-lumi-primary)]">
                مَسَارُ نُورِ حَرْفِ {letter.nameAr}
              </h1>
              <p className="text-xs text-[var(--color-lumi-neutral)] font-bold">
                المرحلة {activeLevel} من 8 • النور المكتمل {progress.overall}%
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
          className="game-btn px-4 py-2 bg-[var(--color-lumi-base)] text-white rounded-xl font-extrabold text-xs md:text-sm border border-[var(--color-lumi-secondary)] hover:bg-[var(--color-lumi-secondary)] transition-colors"
        >
          <Volume2 className="w-4 h-4 text-[var(--color-lumi-primary)]" />
          <span>اسْتَمِعْ لِلحَرْف</span>
        </button>
      </div>

      {/* The Path of Light (مسار النور) */}
      <div className="bg-[var(--color-lumi-glass)] backdrop-blur-md p-4 md:p-6 rounded-3xl border-2 border-[var(--color-lumi-secondary)]/30 shadow-lg overflow-x-auto relative">
        <div className="flex items-center justify-between min-w-[700px] gap-2 relative z-10">
          
          {/* Continuous Glowing Line Background */}
          <div className="absolute top-1/2 left-4 right-4 h-1.5 -translate-y-1/2 bg-[var(--color-lumi-base)] rounded-full z-0 overflow-hidden">
            <div 
              className="h-full bg-[var(--color-lumi-primary)] shadow-[0_0_15px_var(--color-lumi-primary)] transition-all duration-1000 ease-in-out relative" 
              style={{ width: `${(Math.max(1, activeLevel) - 1) * (100 / 7)}%` }}
            >
              <div className="absolute top-0 right-0 bottom-0 w-8 bg-gradient-to-l from-white/50 to-transparent animate-pulse rounded-r-full" />
            </div>
          </div>

          {levelsList.map((lvl, index) => {
            const isUnlocked = progress.currentLevel >= lvl.id;
            const isActive = activeLevel === lvl.id;
            const isCompleted = progress.currentLevel > lvl.id;

            return (
              <div key={lvl.id} className="relative z-10 flex flex-col items-center">
                {isActive && (
                  <div className="absolute -top-12 animate-float-space drop-shadow-[0_0_10px_rgba(252,211,77,0.5)]">
                    <LumiMascot state="idle" size="sm" />
                  </div>
                )}
                
                <button
                  onClick={() => {
                    if (isUnlocked) {
                      soundManager.playClick();
                      setActiveLevel(lvl.id);
                    } else {
                      soundManager.playEncouragement();
                      soundManager.speak('أَنِرْ المَرْحَلَةَ السَّابِقَةَ أَوَّلًا يَا بَطَل!');
                    }
                  }}
                  className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl border-4 transition-all duration-500 ${
                    isActive
                      ? 'bg-[var(--color-lumi-primary)] text-slate-900 border-white shadow-[0_0_20px_#fcd34d] scale-125 z-20'
                      : isCompleted
                      ? 'bg-[var(--color-lumi-accent)] text-white border-[var(--color-lumi-base)] shadow-[0_0_10px_#10b981]'
                      : isUnlocked
                      ? 'bg-[var(--color-lumi-base)] text-[var(--color-lumi-primary)] border-[var(--color-lumi-secondary)] hover:bg-[var(--color-lumi-secondary)]/30'
                      : 'bg-slate-800 text-slate-600 border-slate-700 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {lvl.icon}
                </button>
                <span className={`mt-2 text-[10px] font-black whitespace-nowrap transition-colors ${
                  isActive ? 'text-[var(--color-lumi-primary)] drop-shadow-md' : 'text-[var(--color-lumi-neutral)]'
                }`}>
                  {lvl.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="bg-[var(--color-lumi-base)] rounded-3xl p-6 md:p-8 border-2 border-[var(--color-lumi-secondary)]/50 shadow-2xl min-h-[480px] flex flex-col justify-between text-white relative overflow-hidden">
        
        {/* Background ambient light */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-lumi-secondary)]/10 to-transparent pointer-events-none" />
        
        {/* ========================================================================= */}
        {/* LEVEL 1: Recognition & Shape */}
        {/* ========================================================================= */}
        {activeLevel === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-[var(--color-lumi-glass)] text-[var(--color-lumi-primary)] font-black text-xs px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]">
                  ماذا سأتعلم هنا؟ {levelsList[0].desc}
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {levelsList[0].title}
                </h2>
              </div>
              <LumiMascot
                message={
                  lumiState === 'success' ? "رائع جداً! إجابة صحيحة يا بطل!" :
                  lumiState === 'retry' ? "حاول مرة أخرى يا بطل، أنت قريب جداً!" :
                  `هذا حرفنا الجديد! شكله مميز وجميل.. اضغط عليه لتسمعه!`
                }
                state={lumiState}
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
                className="w-44 h-44 rounded-3xl bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] flex items-center justify-center text-8xl font-black border-4 border-white shadow-[0_0_20px_rgba(252,211,77,0.6)] cursor-pointer active:scale-95 transition-transform animate-float"
                title="اضغط للاستماع"
              >
                {letter.character}
              </div>

              {/* Related Picture Examples */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-[var(--color-lumi-neutral)]">كَلِمَاتٌ تَبْدَأُ بِحَرْفِ {letter.nameAr}:</p>
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
                      className="game-card p-3.5 flex flex-col items-center gap-1 bg-[var(--color-lumi-glass)] border-2 border-[var(--color-lumi-secondary)] hover:border-[var(--color-lumi-primary)] active:scale-95 transition-transform"
                    >
                      <span className="text-3xl">{ex.emoji}</span>
                      <span className="font-black text-sm text-white">{ex.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini Quiz: Choose the correct letter */}
            <div className="bg-[var(--color-lumi-glass)] p-4 rounded-2xl border-2 border-[var(--color-lumi-secondary)] text-center space-y-3">
              <p className="font-extrabold text-white text-base">
                سُؤَالُ الأَبْطَالِ: أَيْنَ حَرْفُ <span className="text-[var(--color-lumi-primary)] text-xl">({letter.character})</span>؟
              </p>
              <div className="flex items-center justify-center gap-3">
                {['ت', letter.character, 'ن', 'ي'].map((char, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (char === letter.character) {
                        soundManager.playSuccess();
                        setLumiState('success');
                        setLevel1Selected(char);
                        addStars(1);
                        addCoins(5);
                        updateLetterLevelProgress(letter.id, 1, 95);
                      } else {
                        soundManager.playEncouragement();
                        setLumiState('retry');
                      }
                    }}
                    className={`w-16 h-16 rounded-2xl font-black text-3xl border-3 transition-all ${
                      level1Selected === char
                        ? 'bg-[var(--color-lumi-accent)] text-white border-white shadow-[0_0_15px_#10b981] scale-110'
                        : 'bg-[var(--color-lumi-base)] text-[var(--color-lumi-primary)] border-[var(--color-lumi-secondary)] hover:border-[var(--color-lumi-primary)] hover:bg-[var(--color-lumi-secondary)] active:scale-95'
                    }`}
                  >
                    {char}
                  </button>
                ))}
              </div>
              {level1Selected && (
                <p className="text-[var(--color-lumi-accent)] font-black text-sm animate-pop">
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
                <span className="bg-[var(--color-lumi-glass)] text-[var(--color-lumi-primary)] font-black text-xs px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]">
                  ماذا سأتعلم هنا؟ {levelsList[1].desc}
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {levelsList[1].title}
                </h2>
              </div>
              <LumiMascot
                message={
                  lumiState === 'listening' ? "أنا أستمع إليك الآن..." :
                  lumiState === 'success' ? "صوتك بطل وواضح جداً!" :
                  lumiState === 'retry' ? "دعنا نجرب مرة أخرى معاً بصوت أقوى!" :
                  `قل معي الصوت.. اضغط على زر الميكروفون وأرني مهارتك!`
                }
                state={lumiState}
                size="sm"
              />
            </div>

            {/* Articulation Tip & Mouth Shape */}
            <div className="bg-[var(--color-lumi-glass)] border-2 border-[var(--color-lumi-secondary)] rounded-2xl p-4 flex items-center gap-4">
              <span className="text-4xl">👄</span>
              <div>
                <h4 className="font-black text-[var(--color-lumi-primary)] text-sm">نَصِيحَةُ لُومِي لِمَخْرَجِ الصَّوْت:</h4>
                <p className="text-xs md:text-sm text-white font-medium mt-0.5">
                  {letter.mouthGuide.tip}
                </p>
              </div>
            </div>

            {/* Sound & Microphone Challenge Area */}
            <div className="flex flex-col items-center justify-center gap-5 py-4">
              <div className="text-center">
                <span className="text-7xl md:text-8xl font-black text-[var(--color-lumi-primary)] drop-shadow-md block mb-2">
                  {letter.character}
                </span>
                <button
                  onClick={() => soundManager.speak(letter.character)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-lumi-secondary)] text-white font-bold text-xs hover:bg-white/20 transition-colors"
                >
                  <Volume2 className="w-4 h-4 text-[var(--color-lumi-primary)]" />
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
                  className={`relative p-6 rounded-full border-4 transition-all duration-300 active:scale-95 ${
                    isRecording
                      ? 'bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] border-white animate-pulse shadow-[0_0_20px_#fcd34d] scale-110'
                      : 'bg-[var(--color-lumi-base)] text-[var(--color-lumi-primary)] border-[var(--color-lumi-secondary)] shadow-lg hover:bg-[var(--color-lumi-secondary)] hover:scale-105'
                  }`}
                >
                  <Mic className="w-10 h-10" />
                </button>

                <span className="font-extrabold text-sm text-white">
                  {isRecording ? '🎙️ لُومِي يَسْتَمِعُ إِلَيْكَ الآن...' : 'اضْغَطْ وَقُلْ: ' + letter.character}
                </span>

                {/* Microphone Level Visualizer Bars */}
                {isRecording && (
                  <div className="flex items-center gap-1.5 h-8">
                    {[0.3, 0.6, 0.9, 0.7, 0.4, 0.8, 0.5].map((h, i) => (
                      <div
                        key={i}
                        className="w-2 bg-[var(--color-lumi-primary)] rounded-full speech-bar"
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
                  <div className={`mt-3 p-4 rounded-2xl border-2 text-center max-w-md bg-[var(--color-lumi-glass)] ${
                    speechResult.status === 'high_confidence'
                      ? 'border-[var(--color-lumi-accent)] text-[var(--color-lumi-accent)]'
                      : 'border-yellow-400 text-yellow-400'
                  }`}>
                    <p className="font-black text-base">{speechResult.feedbackMessage}</p>
                    <p className="text-xs opacity-80 mt-1">
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
                <span className="bg-[var(--color-lumi-glass)] text-[var(--color-lumi-primary)] font-black text-xs px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]">
                  ماذا سأتعلم هنا؟ {levelsList[2].desc}
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {levelsList[2].title}
                </h2>
              </div>
              <LumiMascot
                message={
                  lumiState === 'success' ? "أحسنت التدريب! إيقاعك ممتاز!" :
                  `اضغط على الحركات لنغني معاً: الفتحة، الكسرة، الضمة!`
                }
                state={lumiState}
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
                        ? 'border-[var(--color-lumi-primary)] bg-[var(--color-lumi-glass)] shadow-[0_0_15px_rgba(252,211,77,0.3)] scale-105'
                        : 'border-[var(--color-lumi-secondary)] bg-[var(--color-lumi-base)] hover:border-[var(--color-lumi-primary)]/50'
                    }`}
                  >
                    <span className="text-xs font-black bg-[var(--color-lumi-glass)] text-white px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]/30">
                      {item.nameAr}
                    </span>

                    <span className="text-6xl font-black text-[var(--color-lumi-primary)] my-2">
                      {item.syllable}
                    </span>

                    <p className="text-xs text-[var(--color-lumi-neutral)] font-bold text-center">
                      {item.soundTip}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.speak(item.syllable);
                      }}
                      className="mt-2 p-2 rounded-xl bg-[var(--color-lumi-secondary)] text-white hover:bg-white/20 transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-[var(--color-lumi-primary)]" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quiz: Find the correct haraka */}
            <div className="bg-[var(--color-lumi-glass)] p-4 rounded-2xl border-2 border-[var(--color-lumi-secondary)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-extrabold text-white text-sm">
                  تَحَدِّي الحَرَكَات: اضْغَطْ عَلَى ({syllables.short[selectedHarakatIndex].syllable}) ثُمَّ رَدِّدْ مَعَنَا!
                </p>
              </div>

              <button
                onClick={() => {
                  soundManager.playSuccess();
                  setLumiState('success');
                  addStars(1);
                  addCoins(5);
                  updateLetterLevelProgress(letter.id, 3, 90);
                }}
                className="game-btn px-5 py-2.5 bg-[var(--color-lumi-accent)] text-white rounded-xl font-black text-xs hover:opacity-90 transition-opacity border border-emerald-400"
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
                <span className="bg-[var(--color-lumi-glass)] text-[var(--color-lumi-primary)] font-black text-xs px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]">
                  ماذا سأتعلم هنا؟ {levelsList[3].desc}
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {levelsList[3].title}
                </h2>
              </div>
              <LumiMascot
                message={
                  lumiState === 'success' ? "نَفَسُك طويل وممتاز! تدريب المدود مكتمل!" :
                  `طوّل صوتك مع حروف المد: ا، و، ي!`
                }
                state={lumiState}
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
                        ? 'border-[var(--color-lumi-primary)] bg-[var(--color-lumi-glass)] shadow-[0_0_15px_rgba(252,211,77,0.3)] scale-105'
                        : 'border-[var(--color-lumi-secondary)] bg-[var(--color-lumi-base)] hover:border-[var(--color-lumi-primary)]/50'
                    }`}
                  >
                    <span className="text-xs font-black bg-[var(--color-lumi-glass)] text-white px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]/30">
                      {item.nameAr}
                    </span>

                    <span className="text-6xl font-black text-[var(--color-lumi-primary)] my-2">
                      {item.syllable}
                    </span>

                    <p className="text-xs text-[var(--color-lumi-neutral)] font-bold text-center">
                      مِثَال: {item.example}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.speak(item.syllable);
                      }}
                      className="mt-2 p-2 rounded-xl bg-[var(--color-lumi-secondary)] text-white hover:bg-white/20 transition-colors"
                    >
                      <Volume2 className="w-4 h-4 text-[var(--color-lumi-primary)]" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  soundManager.playSuccess();
                  setLumiState('success');
                  addStars(1);
                  addCoins(5);
                  updateLetterLevelProgress(letter.id, 4, 90);
                }}
                className="game-btn px-6 py-3 bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] rounded-2xl font-black text-sm border-2 border-[var(--color-lumi-primary)]"
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
                <span className="bg-[var(--color-lumi-glass)] text-[var(--color-lumi-primary)] font-black text-xs px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]">
                  ماذا سأتعلم هنا؟ {levelsList[4].desc}
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {levelsList[4].title}
                </h2>
              </div>
              <LumiMascot
                message={
                  lumiState === 'listening' ? "أنا أستمع إليك الآن..." :
                  lumiState === 'success' ? "ممتاز! لقد وجدت مكان الحرف بنجاح!" :
                  lumiState === 'retry' ? "دعنا نجرب نطق الكلمة بوضوح أكبر!" :
                  `ابحث عن مكان الحرف داخل هذه الكلمات الجميلة!`
                }
                state={lumiState}
                size="sm"
              />
            </div>

            {/* Word Explorer Carousel */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-4">
              <div className="game-card p-6 border-4 border-[var(--color-lumi-secondary)] bg-[var(--color-lumi-base)] max-w-md w-full text-center space-y-4">
                <span className="inline-block bg-[var(--color-lumi-glass)] text-white font-black text-xs px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]/30">
                  {words[selectedWordIndex].positionLabel}
                </span>

                <div className="text-6xl my-2">
                  {words[selectedWordIndex].emoji}
                </div>

                <div
                  className="text-4xl md:text-5xl font-black text-[var(--color-lumi-primary)] drop-shadow-md"
                  dangerouslySetInnerHTML={{ __html: words[selectedWordIndex].highlightedWord }}
                />

                <p className="text-xs text-[var(--color-lumi-neutral)] font-bold">
                  {words[selectedWordIndex].meaning}
                </p>

                {/* Letters Breakdown Tag Chips */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  {words[selectedWordIndex].lettersBreakdown.map((ch: string, i: number) => (
                    <span
                      key={i}
                      className={`w-9 h-9 rounded-xl font-black text-base flex items-center justify-center border-2 ${
                        ch === letter.character
                          ? 'bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] border-white shadow-[0_0_10px_#fcd34d]'
                          : 'bg-[var(--color-lumi-glass)] text-white border-[var(--color-lumi-secondary)]'
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
                    className="game-btn px-4 py-2 bg-[var(--color-lumi-secondary)] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-white/20"
                  >
                    <Volume2 className="w-4 h-4 text-[var(--color-lumi-primary)]" />
                    <span>اسْتَمِعْ لِلكَلِمَة</span>
                  </button>

                  <button
                    onClick={() => handleStartRecording(words[selectedWordIndex].word)}
                    className="game-btn px-4 py-2 bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] rounded-xl font-bold text-xs flex items-center gap-1.5 border border-white"
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
                        ? 'bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] border-white shadow-md scale-105 transition-transform'
                        : 'bg-[var(--color-lumi-glass)] text-white border-[var(--color-lumi-secondary)] hover:border-[var(--color-lumi-primary)]/50 transition-colors'
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
                  setLumiState('success');
                  addStars(1);
                  addCoins(5);
                  updateLetterLevelProgress(letter.id, 5, 85);
                }}
                className="game-btn px-6 py-3 bg-[var(--color-lumi-accent)] text-white rounded-2xl font-black text-sm border border-emerald-400"
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
                <span className="bg-[var(--color-lumi-glass)] text-[var(--color-lumi-primary)] font-black text-xs px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]">
                  ماذا سأتعلم هنا؟ {levelsList[5].desc}
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {levelsList[5].title}
                </h2>
              </div>
              <LumiMascot
                message={
                  lumiState === 'success' ? "بطل! إجابة دقيقة جداً!" :
                  lumiState === 'retry' ? "ركز قليلاً.. هل تسمعه في البداية أم النهاية؟" :
                  `هل تستطيع أن تكتشف أين يختبئ الحرف؟ أول؟ وسط؟ أم آخر؟`
                }
                state={lumiState}
                size="sm"
              />
            </div>

            <div className="bg-[var(--color-lumi-glass)] p-6 rounded-3xl border-3 border-[var(--color-lumi-secondary)] text-center space-y-4 max-w-lg mx-auto">
              <span className="text-5xl block">
                {words[positionQuizIndex].emoji}
              </span>

              <h3 className="text-4xl font-black text-[var(--color-lumi-primary)] drop-shadow-md">
                {words[positionQuizIndex].word}
              </h3>

              <button
                onClick={() => soundManager.speak(words[positionQuizIndex].word)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-[var(--color-lumi-secondary)] text-white rounded-full font-bold text-xs hover:bg-white/20 transition-colors"
              >
                <Volume2 className="w-4 h-4 text-[var(--color-lumi-primary)]" />
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
                        setLumiState('success');
                        setSelectedPosition(pos.id);
                        addStars(1);
                        addCoins(5);
                        updateLetterLevelProgress(letter.id, 6, 92);
                      } else {
                        soundManager.playEncouragement();
                        setLumiState('retry');
                      }
                    }}
                    className={`p-3.5 rounded-2xl font-black text-xs md:text-sm border-2 transition-all ${
                      selectedPosition === pos.id
                        ? 'bg-[var(--color-lumi-accent)] text-white border-white shadow-[0_0_15px_#10b981] scale-105'
                        : 'bg-[var(--color-lumi-base)] text-[var(--color-lumi-primary)] border-[var(--color-lumi-secondary)] hover:border-[var(--color-lumi-primary)]/50 active:scale-95'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>

              {selectedPosition && (
                <div className="pt-2">
                  <p className="text-[var(--color-lumi-accent)] font-black text-sm">
                    🌟 بَطَل! إِجَابَةٌ دَقِيقَةٌ جِدًّا!
                  </p>
                  <button
                    onClick={() => {
                      setSelectedPosition(null);
                      setPositionQuizIndex((prev) => (prev + 1) % words.length);
                    }}
                    className="mt-2 px-4 py-1.5 bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] rounded-xl font-bold text-xs"
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
                <span className="bg-[var(--color-lumi-glass)] text-[var(--color-lumi-primary)] font-black text-xs px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]">
                  ماذا سأتعلم هنا؟ {levelsList[6].desc}
                </span>
                <h2 className="text-2xl font-black text-white mt-2">
                  {levelsList[6].title}
                </h2>
              </div>
              <LumiMascot
                message={
                  lumiState === 'listening' ? "أنا أستمع إليك الآن..." :
                  lumiState === 'success' ? "أنت حقاً بطل القراءة!" :
                  lumiState === 'retry' ? "لنجرب مرة أخرى.. أي كلمة تكمل القصة؟" :
                  `هيا نستمع إلى هذه القصة الصغيرة.. ثم أرني مهارتك!`
                }
                state={lumiState}
                size="sm"
              />
            </div>

            {/* Sentence Showcase */}
            <div className="bg-[var(--color-lumi-glass)] p-6 rounded-3xl border-3 border-[var(--color-lumi-secondary)] max-w-xl mx-auto space-y-4 text-center">
              <span className="text-5xl block">{sentences[0].emoji}</span>

              <h3 className="text-3xl md:text-4xl font-black text-[var(--color-lumi-primary)] drop-shadow-md">
                {sentences[0].sentence}
              </h3>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => soundManager.speak(sentences[0].sentence)}
                  className="game-btn px-4 py-2 bg-[var(--color-lumi-secondary)] text-white rounded-xl font-bold text-xs flex items-center gap-1.5 hover:bg-white/20"
                >
                  <Volume2 className="w-4 h-4 text-[var(--color-lumi-primary)]" />
                  <span>اسْتَمِعْ لِلجُمْلَة</span>
                </button>

                <button
                  onClick={() => handleStartRecording(sentences[0].sentence)}
                  className="game-btn px-4 py-2 bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] rounded-xl font-bold text-xs flex items-center gap-1.5 border border-white"
                >
                  <Mic className="w-4 h-4" />
                  <span>كَرِّرِ الجُمْلَة 🎙️</span>
                </button>
              </div>

              {/* Missing Word Quiz */}
              <div className="pt-4 border-t border-[var(--color-lumi-secondary)] text-right space-y-2">
                <p className="font-extrabold text-xs text-white">
                  {sentences[0].missingWordExercise.question}
                </p>
                <div className="flex items-center gap-2">
                  {sentences[0].missingWordExercise.options.map((opt: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === sentences[0].missingWordExercise.correctIndex) {
                          soundManager.playSuccess();
                          setLumiState('success');
                          setSentenceQuizSelected(idx);
                          addStars(2);
                          addCoins(10);
                          updateLetterLevelProgress(letter.id, 7, 90);
                        } else {
                          soundManager.playEncouragement();
                          setLumiState('retry');
                        }
                      }}
                      className={`flex-1 p-2.5 rounded-xl font-black text-xs border-2 ${
                        sentenceQuizSelected === idx
                          ? 'bg-[var(--color-lumi-accent)] text-white border-white shadow-[0_0_15px_#10b981]'
                          : 'bg-[var(--color-lumi-base)] text-[var(--color-lumi-primary)] border-[var(--color-lumi-secondary)] hover:border-[var(--color-lumi-primary)]/50'
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
            <div className="flex justify-center mb-4">
              <span className="bg-[var(--color-lumi-glass)] text-[var(--color-lumi-primary)] font-black text-xs px-3 py-1 rounded-full border border-[var(--color-lumi-secondary)]">
                ماذا سأتعلم هنا؟ {levelsList[7].desc}
              </span>
            </div>
            
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-24 h-24 mx-auto bg-[var(--color-lumi-primary)] rounded-full flex items-center justify-center text-5xl border-4 border-white shadow-[0_0_25px_rgba(252,211,77,0.8)] animate-bounce">
                🏆
              </div>

              <h2 className="text-3xl font-black text-white">
                {levelsList[7].title}
              </h2>

              <p className="text-sm text-[var(--color-lumi-neutral)] font-medium leading-relaxed">
                لَقَدْ أَتْمَمْتَ جَمِيعَ مُسْتَوَيَاتِ الحَرْفِ بِنَجَاحٍ بَاهِرٍ وَتَعَلَّمْتَ الصَّوْتَ وَالحَرَكَاتِ وَالكَلِمَاتِ وَالجُمَل!
              </p>

              <div className="flex justify-center my-2">
                <LumiMascot
                  message={
                    lumiState === 'success' ? "أحسنت صنعاً! الجائزة بانتظارك!" :
                    `مبارك يا بطل! لقد أضأت نجمة هذا الحرف!`
                  }
                  state={lumiState === 'success' ? 'success' : 'success'}
                  size="sm"
                />
              </div>

              {/* Trophy Certificate Card */}
              <div className="bg-[var(--color-lumi-glass)] border-4 border-[var(--color-lumi-primary)] p-6 rounded-3xl shadow-lg text-center space-y-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-lumi-primary)]/10 to-transparent pointer-events-none" />
                
                <span className="relative text-xs font-black text-[var(--color-lumi-base)] bg-[var(--color-lumi-primary)] px-3 py-1 rounded-full border border-white/50">
                  شَهَادَةُ إِتْقَانِ حَرْفِ {letter.nameAr}
                </span>

                <div className="relative text-5xl font-black text-white drop-shadow-md py-2">
                  {letter.character}
                </div>

                <p className="relative font-extrabold text-base text-[var(--color-lumi-primary)]">
                  البَطَلُ المُمَيَّزُ فِي نُطْقِ حَرْفِ {letter.nameAr}
                </p>

                <div className="relative flex items-center justify-center gap-4 text-xs font-black text-white pt-3 border-t border-[var(--color-lumi-secondary)]/50">
                  <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-[var(--color-lumi-primary)] fill-[var(--color-lumi-primary)]"/> +5</span>
                  <span className="flex items-center gap-1">🪙 +30</span>
                  <span className="text-[var(--color-lumi-accent)]">🔓 فَتْحُ التَّالِي</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => {
                    triggerCelebration();
                    setLumiState('success');
                    addStars(5);
                    addCoins(30);
                    updateLetterLevelProgress(letter.id, 8, 100);
                  }}
                  className="game-btn px-6 py-3 bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] rounded-2xl font-black text-sm shadow-[0_0_15px_rgba(252,211,77,0.5)] border-2 border-white"
                >
                  <Sparkles className="w-5 h-5" />
                  <span>اسْتَلِمْ جَائِزَةَ التَّتْوِيج! 🎁</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onLaunchMiniGame('bubble_pop');
                  }}
                  className="game-btn px-5 py-3 bg-[var(--color-lumi-secondary)] text-white rounded-2xl font-black text-sm hover:bg-white/20"
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
