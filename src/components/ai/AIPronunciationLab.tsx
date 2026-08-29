/**
 * ============================================================================
 * 🌟 LUMI AI PRONUNCIATION LAB & SPEECH THERAPY ENGINE (UNIFIED MASTER FILE)
 * ============================================================================
 * 
 * هذا الملف يجمع كل متطلبات مختبر النطق بالذكاء الاصطناعي في ملف برمجي واحد مستقل:
 * 1. قاعدة بيانات الحروف العربية الـ 28 مع دليل مخارج الفم والمقاطع الصوتية والكلمات.
 * 2. محرك التخليق والمؤثرات الصوتية الذاتي (Web Audio API & Web Speech Synthesis).
 * 3. محرك المعالجة اللغوية الطبيعية للنص العربي (تجريد التشكيل، مرادفات المخارج، خوارزمية Levenshtein).
 * 4. محرك التقاط وتحليل تيار الميكروفون المباشر (Web Speech API & Audio Frequency Visualizer).
 * 5. شخصية "لومي" المرشدة التفاعلية الذكية وشريط التوجيه الصوتي.
 * 6. واجهة المستخدم التفاعلية المتكاملة لمختبر النطق والتحديات ونظام المكافآت.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Mic,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Brain,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Bot,
  Star,
  Award,
  RefreshCw,
  Zap,
  Smile,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { calculateArabicSimilarity, speechAnalyzer } from '../../services/speech/SpeechAnalyzer';
import { ARABIC_LETTERS } from '../../data/letters';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../mascot/LumiMascot';
// ============================================================================
// 5. شخصية لومي وشريط الإرشاد المدمج (LUMI GUIDE BANNER)
// ============================================================================

// ============================================================================
// 6. واجهة المستخدم التفاعلية الشاملة لمختبر النطق (AI PRONUNCIATION LAB UI)
// ============================================================================

export interface AIPronunciationLabProps {
  onBack?: () => void;
  childName?: string;
  onReward?: (stars: number, coins: number) => void;
}

export const AIPronunciationLab: React.FC<AIPronunciationLabProps> = ({
  onBack = () => {},
  childName = 'البَطَل',
  onReward
}) => {
  const { stars, addStars, addCoins, triggerCelebration, selectedLetterId } = useGame();
  
  const letterData = ARABIC_LETTERS.find(l => l.id === selectedLetterId) || ARABIC_LETTERS[1];
  const activeChar = letterData.char;
  const matchingWords = letterData.words.map(w => ({ id: w.id, word: w.word, char: activeChar, meaning: w.meaning, emoji: w.emoji, phonemes: w.letters }));
  const wordList = matchingWords;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [recognizedSpeech, setRecognizedSpeech] = useState<string>('');
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [aiStatus, setAiStatus] = useState<'idle' | 'success' | 'retry' | 'evaluating'>('idle');
  const [aiMessage, setAiMessage] = useState<string>('');
  const [soundFeedbackTip, setSoundFeedbackTip] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const currentChallenge = wordList[currentIndex % wordList.length];

  useEffect(() => {
    speechAnalyzer.stopListening();
    setIsRecording(false);
    setRecognizedSpeech('');
    setAiScore(null);
    setAiStatus('idle');
    setAiMessage('');
    setSoundFeedbackTip('');
    setErrorMsg('');
  }, [currentIndex, selectedLetterId]);

  useEffect(() => {
    return () => {
      speechAnalyzer.stopListening();
      audioManager.stop();
    };
  }, []);

  const handlePlayModel = () => {
    audioManager.stop();
    audioManager.speak(currentChallenge.word);
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      speechAnalyzer.stopListening();
      setIsRecording(false);
      setMicVolume(0);
    } else {
      if (!speechAnalyzer.isSupported()) {
        setErrorMsg('المُتَصَفِّحُ لَا يَدْعَمُ تَمْيِيزَ الصَّوْت. يُرْجَى اسْتِخْدَامُ متصفح Chrome أو Edge.');
        return;
      }

      audioManager.stop();
      audioManager.playClick();
      setIsRecording(true);
      setErrorMsg('');
      setRecognizedSpeech('');
      setAiStatus('evaluating');
      setAiScore(null);
      setAiMessage('جَارٍ الاسْتِمَاعُ لِصَوْتِكَ.. انْطِقِ الكَلِمَةَ الآن! 🎙️');
      setSoundFeedbackTip('');

      speechAnalyzer.startListening(
        currentChallenge.word,
        (result) => {
          setIsRecording(false);
          const similarity = calculateArabicSimilarity(currentChallenge.word, result.recognizedText);
          const isMatch = result.status === 'high_confidence' || similarity >= 0.75;
          handleAIResult(result.recognizedText, isMatch, Math.round(similarity * 100));
        },
        (vol) => setMicVolume(vol),
        (err) => {
          setIsRecording(false);
          console.warn('Speech error:', err);
          handleAIResult('', false, 0, err);
        }
      );
    }
  };

  const handleAIResult = (spokenText: string, isCorrectMatch?: boolean, customScore?: number, errType?: string) => {
    setIsRecording(false);
    setMicVolume(0);

    const cleanSpoken = (spokenText || '').trim();
    setRecognizedSpeech(cleanSpoken);

    if (!cleanSpoken) {
      setAiStatus('retry');
      setAiScore(0);
      let errorTitle = 'لم أسمعك جيداً!';
      let errorMessage = `لَمْ نَسْتَطِعْ سَمَاعَ صَوْتِكَ يَا ${childName}! اضْغَطِ المَيْكْرُوفُونَ وَانْطِقْ بِصَوْتٍ أَعْلَى قَرِيبًا مِنَ الجِهَاز.`;
      
      if (errType === 'not-allowed') {
        errorTitle = 'الميكروفون مغلق!';
        errorMessage = 'الرَّجَاءُ السَّمَاحُ لِلْمُتَصَفِّحِ بِاسْتِخْدَامِ المَيْكْرُوفُونِ مِنْ إِعْدَادَاتِ المُتَصَفِّح (اضغط على القفل بجانب الرابط).';
      } else if (errType === 'network') {
        errorTitle = 'لا يوجد اتصال!';
        errorMessage = 'يُرْجَى التَّأَكُّدُ مِنِ اتِّصَالِكَ بِالإنْتَرْنِت لِيَعْمَلَ التَّعَرُّفُ عَلَى الصَّوْت.';
      } else if (errType === 'browser-blocked') {
        errorTitle = 'المتصفح غير مدعوم بالكامل!';
        errorMessage = 'يبدو أنك تستخدم متصفحاً (مثل Brave) يقوم بحظر خدمات التعرف على الصوت لحماية الخصوصية. يرجى استخدام Google Chrome لتتمكن من النطق.';
      }

      setAiMessage(errorMessage);
      setSoundFeedbackTip(errType ? errorTitle : `انْطِقْ كَلِمَةَ (${currentChallenge.word}) بِوُضُوح`);

      audioManager.playClick();
      if (!errType || errType === 'no-speech') {
        audioManager.speak(`لَمْ أَسْمَعْ صَوْتَكَ يَا بَطَل! اضْغَطْ وَتَحَدَّثْ بِصَوْتٍ عَالٍ!`);
      }
      return;
    }

    const similarity = customScore !== undefined ? customScore : Math.round(calculateArabicSimilarity(currentChallenge.word, cleanSpoken) * 100);
    const isSuccess = isCorrectMatch !== undefined ? isCorrectMatch : similarity >= 75;
    setAiScore(similarity);

    if (isSuccess) {
      setAiStatus('success');
      const cheer = `بَطَل! نُطْقُكَ صَحِيحٌ جِدًّا يَا ${childName} 🌟 (دِقَّة: ${similarity}%)`;
      setAiMessage(cheer);
      setSoundFeedbackTip('أَحْسَنْتَ صَوْتُ الحُرُوفِ وَالمَخَارِجِ كَانَ نَقِيًّا جِدًّا ✨');

      triggerCelebration();
      

      addStars(2);
      addCoins(10);
      if (onReward) onReward(2, 10);

      audioManager.speak(`بَطَل! نُطْقُكَ صَحِيحٌ جِدًّا يَا ${childName}`);
    } else {
      setAiStatus('retry');
      const retryText = `حَاوِلْ مَرَّةً ثَانِيَةً يَا بَطَل! 💪 (نَطَقْتَ: [${cleanSpoken}] — المَطْلُوب: [${currentChallenge.word}])`;
      setAiMessage(retryText);
      setSoundFeedbackTip(`انْتَبِهْ لِمَخْرَجِ حَرْفِ (${currentChallenge.char}) وَأَعِدِ النُّطْق`);

      audioManager.playClick();
      audioManager.speak(`حَاوِلْ مَرَّةً ثَانِيَةً يَا بَطَل! اسْتَمِعْ لِلنَّمُوذَجِ الصَّحِيحِ وَانْطِقْ مَعِي`);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] via-[#091438] to-[#040817] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-x-hidden font-arabic pb-20">
      
      {/* خلفية الضوء والجماليات */}
      <div className="absolute -top-28 -right-28 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* الهيدر العلوي */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-3.5 sm:p-4 rounded-3xl border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.25)]">
        <button
          onClick={() => {
            audioManager.playClick();
            onBack();
          }}
          className="p-2.5 rounded-2xl bg-[#132252] border border-cyan-400/50 text-cyan-300 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-1.5 font-black text-xs"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرَّئِيسِيَّة</span>
        </button>

        <div className="text-center sm:text-right">
          <h1 className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-white flex items-center gap-1.5 justify-center sm:justify-start">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span>مُخْتَبَرُ النُّطْقِ بِالذَّكَاءِ الاصْطِنَاعِيّ</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          </h1>
          <p className="text-[11px] text-cyan-200 font-bold hidden sm:block">
            انْطِقِ الكَلِمَةَ وَالذَّكَاءُ الاصْطِنَاعِيُّ يُقَيِّمُ صَوْتَكَ وَيُصَحِّحُ لَك!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-xl border border-amber-400/50 text-xs font-black">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1 bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-xl border border-cyan-400/50 text-xs font-black">
            <Brain className="w-3.5 h-3.5" />
            <span>LUMI AI ⚡</span>
          </div>
        </div>
      </header>

      {/* الاستوديو التفاعلي الرئيسي */}
      <main className="relative z-10 max-w-3xl mx-auto w-full my-auto space-y-4 py-3">
        
        {/* شريط المرشد السحري لومي */}
        <LumiMascot
          message={`أَهْلًا يَا ${childName} فِي مُخْتَبَرِ الذَّكَاءِ الاصْطِنَاعِيّ! اسْتَمِعْ لِلنَّمُوذَجِ الصَّحِيح، ثُمَّ اضْغَطْ زِرَّ المَيْكْرُوفُونِ الكَبِيرَ وَانْطِقْ لِيُقَيِّمَكَ الذَّكَاءُ الاصْطِنَاعِيّ!`}
          state={aiStatus === 'idle' ? 'idle' : aiStatus === 'success' ? 'success' : 'listening'}
          size="md"
        />

        {errorMsg && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {errorMsg}
          </div>
        )}

        {/* بطاقة التحدي والكلمة */}
        <div className="bg-[#0b1638]/95 backdrop-blur-xl rounded-3xl p-5 md:p-6 border-2 border-cyan-400/60 shadow-[0_0_35px_rgba(6,182,212,0.2)] text-center space-y-4">
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <button
              onClick={() => {
                audioManager.playClick();
                setCurrentIndex((prev) => (prev - 1 + wordList.length) % wordList.length);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 flex items-center gap-1 active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السَّابِق</span>
            </button>

            <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/40 text-xs font-black">
              تَحَدِّي {currentIndex + 1} مِنْ {wordList.length}
            </span>

            <button
              onClick={() => {
                audioManager.playClick();
                setCurrentIndex((prev) => (prev + 1) % wordList.length);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 flex items-center gap-1 active:scale-95 transition-all"
            >
              <span>التَّالِي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* عرض الكلمة والرمز التعبيري */}
          <div className="space-y-2">
            <div className="text-6xl sm:text-7xl animate-float drop-shadow-lg">
              {currentChallenge.emoji}
            </div>

            <div className="flex items-center justify-center gap-3">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white tracking-wider">
                {currentChallenge.word}
              </h2>

              <button
                onClick={handlePlayModel}
                className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border-2 border-amber-400/60 hover:bg-amber-500/30 hover:scale-110 active:scale-90 transition-all shadow-glow-yellow"
                title="اسْتَمِعْ لِلنَّمُوذَجِ الصَّحِيح"
              >
                <Volume2 className="w-6 h-6 animate-pulse" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-cyan-200 font-extrabold">
              {currentChallenge.meaning}
            </p>
          </div>

          {/* التقطيع الصوتي */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400 font-bold">المَقَاطِعُ الصَّوْتِيَّة:</span>
            {currentChallenge.phonemes.map((ph, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-blue-900/60 border border-cyan-400/50 text-cyan-200 font-black text-xs shadow-inner"
              >
                {ph}
              </span>
            ))}
          </div>

          {/* زر الميكروفون الذكي */}
          <div className="py-3 flex flex-col items-center justify-center gap-2">
            <button
              onClick={handleToggleRecord}
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-white border-4 transition-all transform duration-300 active:scale-95 shadow-2xl ${
                isRecording
                  ? 'bg-gradient-to-tr from-rose-600 via-red-500 to-pink-500 border-white shadow-[0_0_50px_rgba(244,63,94,0.6)] animate-pulse scale-110'
                  : 'bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 border-white hover:scale-108 shadow-[0_0_35px_rgba(6,182,212,0.4)]'
              }`}
            >
              {isRecording && (
                <div
                  className="absolute inset-0 rounded-full border-4 border-rose-400 animate-ping opacity-75 pointer-events-none"
                  style={{ animationDuration: '1.2s' }}
                />
              )}

              <Mic className={`w-10 h-10 sm:w-12 sm:h-12 ${isRecording ? 'animate-bounce' : ''}`} />

              <span className="text-[10px] font-black mt-0.5">
                {isRecording ? 'أَنْصِتُ لَك...' : 'انْقُرْ وَانْطِقْ'}
              </span>
            </button>

            <span className="text-xs text-cyan-300 font-bold">
              {isRecording
                ? '🔴 جَارٍ التَّسْجِيل.. انْطِقِ الكَلِمَةَ بِوُضُوح'
                : 'اضْغَطِ المَيْكْرُوفُونَ لِتَبْدَأَ التَّحَدِّي'}
            </span>

          </div>

          {/* لوحة النتائج الفورية والتقييم */}
          {aiStatus !== 'idle' && (
            <div
              className={`p-4 rounded-2xl border-2 transition-all duration-500 text-right space-y-2 ${
                aiStatus === 'success'
                  ? 'bg-emerald-950/80 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                  : aiStatus === 'retry'
                  ? 'bg-amber-950/80 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                  : 'bg-blue-950/80 border-cyan-400 animate-pulse'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {aiStatus === 'success' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                  {aiStatus === 'retry' && <AlertCircle className="w-6 h-6 text-amber-400" />}
                  {aiStatus === 'evaluating' && <Brain className="w-6 h-6 text-cyan-400 animate-spin" />}
                  <span className="font-black text-sm text-white">
                    {aiStatus === 'success' ? 'تَقْيِيمُ الذَّكَاءِ الاصْطِنَاعِيّ: بَطَل! ✅' : aiStatus === 'retry' ? 'تَقْيِيمُ الذَّكَاءِ الاصْطِنَاعِيّ: حَاوِلْ مَرَّةً أُخْرَى 💡' : 'جَارٍ التَّحْلِيل...'}
                  </span>
                </div>

                {aiScore !== null && (
                  <span className="bg-white/20 text-white font-black text-xs px-3 py-1 rounded-full border border-white/30">
                    دِقَّةُ النُّطْق: {aiScore}%
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-extrabold text-white leading-relaxed">
                {aiMessage}
              </p>

              {soundFeedbackTip && (
                <div className="bg-black/30 p-2.5 rounded-xl text-xs text-amber-200 font-bold border border-white/10 flex items-center justify-between">
                  <span>💡 {soundFeedbackTip}</span>
                  <button
                    onClick={handlePlayModel}
                    className="text-xs text-cyan-300 font-black underline hover:text-white"
                  >
                    أَعِدِ الاسْتِمَاع 🔊
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </main>

      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-[11px] text-slate-500 font-bold pt-2">
        <span>LUMI — مُخْتَبَرُ النُّطْقِ وَالتَّصْحِيحِ الذَّكِيّ المَوْحَّد (AI SPEECH LAB)</span>
      </footer>

    </div>
  );
};
export default AIPronunciationLab;
