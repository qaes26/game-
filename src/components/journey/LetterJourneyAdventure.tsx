import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, Mic, CheckCircle2, Trophy, Star, Award, Play } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../lumi/LumiMascot';

interface LetterJourneyAdventureProps {
  letterId: string;
  onBackToAlphabet: () => void;
  onSelectAnotherLetter: (id: string) => void;
}

export const LetterJourneyAdventure: React.FC<LetterJourneyAdventureProps> = ({
  letterId,
  onBackToAlphabet,
  onSelectAnotherLetter
}) => {
  const { letterProgressMap, updateLetterStage, addStars, addCoins, triggerVictoryCelebration } = useGame();
  
  const letter: LetterData = ARABIC_LETTERS.find(l => l.id === letterId) || ARABIC_LETTERS[1]; // default Baa
  const progress = letterProgressMap[letter.id] || {
    discovery: false,
    sound: false,
    vowels: false,
    syllables: false,
    words: false,
    soundPosition: false,
    sentences: false,
    finalChallenge: false,
    currentStage: 1,
    masteryPercentage: 0
  };

  const [activeStage, setActiveStage] = useState<number>(progress.currentStage || 1);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [environmentReaction, setEnvironmentReaction] = useState<string | null>(null);

  const stagesList = [
    { id: 1, title: 'اكتشف الحرف', icon: '🔤', desc: 'التعرف على شكل الحرف ورسمه' },
    { id: 2, title: 'تعرّف على الصوت', icon: '🎙️', desc: 'نطق الحرف الصافي مع لومي' },
    { id: 3, title: 'الحركات', icon: '🎵', desc: 'الحركات القصيرة: فتحة، كسرة، ضمة' },
    { id: 4, title: 'المقاطع', icon: '🌊', desc: 'المدود الطويلة: بالألف والياء والواو' },
    { id: 5, title: 'الكلمات', icon: '📖', desc: 'الكلمات في أول ووسط وآخر الموضع' },
    { id: 6, title: 'موقع الصوت', icon: '🎯', desc: 'تحديد موضع الحرف داخل الكلمة' },
    { id: 7, title: 'الجمل', icon: '💬', desc: 'فهم وتكرار الجمل المفيدة' },
    { id: 8, title: 'المغامرة النهائية', icon: '🏆', desc: 'بوابة التحدي الكبرى والتتويج' }
  ];

  const handleCompleteStage = (stageNum: number, reactionText: string) => {
    audioManager.playVictory();
    setEnvironmentReaction(reactionText);
    updateLetterStage(letter.id, stageNum, true);
    addStars(1);
    addCoins(5);

    setTimeout(() => {
      setEnvironmentReaction(null);
      if (stageNum < 8) {
        setActiveStage(stageNum + 1);
      } else {
        triggerVictoryCelebration();
      }
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-3xl border-3 border-rose-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToAlphabet();
            }}
            className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-800 hover:bg-rose-100 transition-all shadow-sm active:scale-95"
            title="العودة لغرفة الحروف"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center text-4xl font-black border-2 border-white shadow-md">
              {letter.char}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900">
                {letter.char} — رِحْلَةُ حَرْفِ {letter.nameAr}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-bold">
                المرحلة {activeStage} من 8 • نسبة إتقان الحرف %{progress.masteryPercentage}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Letter Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioManager.playClick();
              audioManager.speak(letter.char);
            }}
            className="game-btn px-4 py-2 bg-rose-100 text-rose-800 rounded-xl font-bold text-xs md:text-sm border border-rose-300"
          >
            <Volume2 className="w-4 h-4 text-rose-600" />
            <span>نُطْقُ الحَرْف</span>
          </button>
        </div>
      </div>

      {/* 8-Stage Interactive Path */}
      <div className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-3xl border-2 border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] gap-2">
          {stagesList.map((stg, idx) => {
            const isCompleted = (progress as any)[['discovery', 'sound', 'vowels', 'syllables', 'words', 'soundPosition', 'sentences', 'finalChallenge'][idx]];
            const isActive = activeStage === stg.id;

            return (
              <div key={stg.id} className="flex-1 flex items-center">
                <button
                  onClick={() => {
                    audioManager.playClick();
                    setActiveStage(stg.id);
                  }}
                  className={`w-full flex flex-col items-center gap-1 p-2.5 rounded-2xl border-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-b from-rose-500 to-pink-600 text-white border-white shadow-card-pop scale-105'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">{isCompleted ? '⭐' : stg.icon}</span>
                  <span className="text-[11px] font-black whitespace-nowrap">
                    {stg.id}. {stg.title}
                  </span>
                </button>

                {idx < stagesList.length - 1 && (
                  <div className={`h-1 w-3 mx-1 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Interactive Game Canvas */}
      <div className="relative bg-white rounded-3xl p-6 md:p-8 border-4 border-rose-300 shadow-card-pop min-h-[460px] flex flex-col justify-between overflow-hidden">
        
        {/* Environmental Reaction Pop */}
        {environmentReaction && (
          <div className="absolute inset-0 bg-emerald-500/90 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white text-center p-6 space-y-3 animate-pop">
            <span className="text-6xl animate-bounce">🌸✨</span>
            <h3 className="text-2xl md:text-3xl font-black">
              {environmentReaction}
            </h3>
          </div>
        )}

        {/* STAGE 1: اكتشف الحرف */}
        {activeStage === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-rose-100 text-rose-800 font-black text-xs px-3 py-1 rounded-full border border-rose-300">
                  المرحلة 1: اكْتَشِف الحَرْف
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  تَعَرَّفْ عَلَى شَكْلِ وَرَسْمِ حَرْفِ ({letter.char})
                </h2>
              </div>
              <LumiMascot
                message={`هَذَا حَرْفُ ${letter.nameAr}! انْقُرْ عَلَيْهِ لِيَنْبِضَ بِالأَلْوَان!`}
                emotion="happy"
                size="sm"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6">
              <button
                onClick={() => {
                  audioManager.playBloom();
                  audioManager.speak(letter.char);
                }}
                className="w-48 h-48 rounded-3xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center text-9xl font-black border-4 border-white shadow-glow-pink active:scale-95 transition-transform animate-float"
              >
                {letter.char}
              </button>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-600">كَلِمَاتٌ تَبْدَأُ بِحَرْفِ {letter.nameAr}:</p>
                <div className="flex items-center gap-3">
                  {letter.words.slice(0, 3).map(w => (
                    <button
                      key={w.id}
                      onClick={() => {
                        audioManager.playClick();
                        audioManager.speak(w.word);
                      }}
                      className="game-card p-4 flex flex-col items-center gap-1 border-2 border-pink-200 hover:border-pink-400 active:scale-95 transition-transform bg-white"
                    >
                      <span className="text-4xl">{w.emoji}</span>
                      <span className="font-black text-sm text-slate-800">{w.word}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(1, `أَزْهَرَتِ الأَزْهَارُ بِاكْتِشَافِ حَرْفِ ${letter.nameAr}!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>أَتْمَمْتُ اسْتِكْشَافَ الحَرْف! 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: تعرّف على الصوت */}
        {activeStage === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1 rounded-full border border-purple-300">
                  المرحلة 2: تَعَرَّفْ عَلَى الصَّوْت
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  نُطْقُ صَوْتِ حَرْفِ {letter.nameAr}
                </h2>
              </div>
              <LumiMascot
                message={`قُلْ مَعِي: (${letter.char}) .. اسْتَمِعْ ثُمَّ جَرِّبِ النُّطْق!`}
                emotion="listening"
                size="sm"
              />
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 flex items-center gap-4">
              <span className="text-4xl">👄</span>
              <div>
                <h4 className="font-black text-amber-900 text-sm">نَصِيحَةُ لُومِي لِمَخْرَجِ الصَّوْت:</h4>
                <p className="text-xs md:text-sm text-amber-800 font-medium">{letter.mouthGuide.tip}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
              <span className="text-8xl font-black text-rose-500">{letter.char}</span>
              <button
                onClick={() => {
                  audioManager.speak(letter.char);
                }}
                className="game-btn px-6 py-3 bg-rose-500 text-white rounded-2xl font-black text-sm"
              >
                <Volume2 className="w-5 h-5" />
                <span>اسْتَمِعْ لِلصَّوْتِ الآن</span>
              </button>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(2, `صَوْتٌ رَائِع! طَارَتِ الفَرَاشَاتُ فِي الوَادِي!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>أَتْقَنْتُ صَوْتَ الحَرْف! 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: الحركات */}
        {activeStage === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-300">
                  المرحلة 3: الحَرَكَاتُ القَصِيرَة
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  الفتحة والكسرة والضمة
                </h2>
              </div>
              <LumiMascot
                message="اسْتَمِعْ لِكُلِّ حَرَكَةٍ وَانْقُرْ عَلَيْهَا لِتَسْمَعَ صَوْتَهَا!"
                emotion="talking"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              {letter.syllables.short.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    audioManager.playBloom();
                    audioManager.speak(s.syl);
                  }}
                  className="game-card p-6 border-4 border-emerald-300 bg-emerald-50 hover:bg-white hover:scale-105 transition-all flex flex-col items-center justify-between min-h-[180px]"
                >
                  <span className="text-xs font-black bg-emerald-200 text-emerald-900 px-3 py-0.5 rounded-full">
                    {s.nameAr}
                  </span>
                  <span className="text-6xl font-black text-emerald-700 my-2">
                    {s.syl}
                  </span>
                  <span className="text-xs font-bold text-slate-600">{s.tip}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(3, `تَفَتَّحَتْ أَزْهَارُ الحَرَكَاتِ القَصِيرَة!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>اكْتَمَلَ تَدْرِيبُ الحَرَكَات 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: المقاطع */}
        {activeStage === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-sky-100 text-sky-800 font-black text-xs px-3 py-1 rounded-full border border-sky-300">
                  المرحلة 4: المَقَاطِعُ وَالمُدُودُ الطَّوِيلَة
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  مَدُّ الأَلِف وَاليَاءِ وَالوَاو
                </h2>
              </div>
              <LumiMascot
                message="مُدَّ الصَّوْتَ طَوِيلًا مَعِي مِثْلَ القِطَار!"
                emotion="cheering"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              {letter.syllables.long.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    audioManager.playBloom();
                    audioManager.speak(s.syl);
                  }}
                  className="game-card p-6 border-4 border-sky-300 bg-sky-50 hover:bg-white hover:scale-105 transition-all flex flex-col items-center justify-between min-h-[180px]"
                >
                  <span className="text-xs font-black bg-sky-200 text-sky-900 px-3 py-0.5 rounded-full">
                    {s.nameAr}
                  </span>
                  <span className="text-6xl font-black text-sky-700 my-2">
                    {s.syl}
                  </span>
                  <span className="text-xs font-bold text-slate-600">مثال: {s.example}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(4, `نَمَتْ أَشْجَارُ غَابَةِ المَقَاطِعِ الطَّوِيلَة!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>اكْتَمَلَ تَدْرِيبُ المَقَاطِع 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 5: الكلمات */}
        {activeStage === 5 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-100 text-amber-800 font-black text-xs px-3 py-1 rounded-full border border-amber-300">
                  المرحلة 5: الكَلِمَاتُ فِي مَوَاقِعِهَا
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  الحرف في أول ووسط وآخر الكلمة
                </h2>
              </div>
              <LumiMascot
                message="انْقُرْ عَلَى كَلِمَاتِ القَرْيَةِ لِتَفْتَحَ أَبْوَابَهَا!"
                emotion="happy"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
              {letter.words.map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    audioManager.playClick();
                    audioManager.speak(w.word);
                  }}
                  className="game-card p-4 border-3 border-amber-300 bg-white hover:scale-105 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    {w.positionLabel}
                  </span>
                  <span className="text-5xl">{w.emoji}</span>
                  <span className="text-2xl font-black text-slate-900">{w.word}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(5, `انْفَتَحَتْ أَبْوَابُ قَرْيَةِ الكَلِمَاتِ بِنَجَاح!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>اكْتَمَلَ تَدْرِيبُ الكَلِمَات 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 6: موقع الصوت */}
        {activeStage === 6 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-indigo-100 text-indigo-800 font-black text-xs px-3 py-1 rounded-full border border-indigo-300">
                  المرحلة 6: مَوْقِعُ الصَّوْت
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  أَيْنَ يَجْلِسُ حَرْفُ ({letter.char})؟
                </h2>
              </div>
              <LumiMascot
                message="حَدِّدْ مَوْقِعَ الحَرْف: فِي الأَوَّل، الوَسَط، أَم الآخِر؟"
                emotion="listening"
                size="sm"
              />
            </div>

            <div className="bg-indigo-50 p-6 rounded-3xl border-3 border-indigo-200 text-center space-y-4 max-w-md mx-auto">
              <span className="text-6xl block">{letter.words[0].emoji}</span>
              <h3 className="text-4xl font-black text-slate-900">{letter.words[0].word}</h3>

              <div className="grid grid-cols-3 gap-3 pt-3">
                {['فِي الأَوَّل', 'فِي الوَسَط', 'فِي الآخِر'].map((pos, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.playVictory();
                      handleCompleteStage(6, `إِجَابَةٌ دَقِيقَةٌ جِدًّا يَا بَطَل!`);
                    }}
                    className="game-btn p-3 bg-white hover:bg-indigo-600 hover:text-white text-slate-900 font-black text-xs md:text-sm rounded-xl border-2 border-indigo-300 active:scale-95"
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 7: الجمل */}
        {activeStage === 7 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1 rounded-full border border-purple-300">
                  المرحلة 7: الجُمَلُ وَالمَعَانِي
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  تَرْكِيبُ الجُمَلِ البَسِيطَة
                </h2>
              </div>
              <LumiMascot
                message="هَيَّا نَقْرَأُ هَذِهِ الجُمْلَةَ المُفِيدَةَ مَعًا!"
                emotion="cheering"
                size="sm"
              />
            </div>

            <div className="bg-purple-50 p-6 rounded-3xl border-3 border-purple-200 max-w-xl mx-auto text-center space-y-4">
              <span className="text-6xl block">{letter.sentences[0].emoji}</span>
              <h3 className="text-3xl font-black text-purple-950">
                {letter.sentences[0].sentence}
              </h3>
              <button
                onClick={() => audioManager.speak(letter.sentences[0].sentence)}
                className="game-btn px-6 py-2.5 bg-purple-600 text-white rounded-2xl font-bold text-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلجُمْلَة</span>
              </button>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(7, `تَشَكَّلَ جِسْرُ نَهْرِ الجُمَلِ البَرَّاقَة!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>اكْتَمَلَ تَدْرِيبُ الجُمَل 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 8: المغامرة النهائية */}
        {activeStage === 8 && (
          <div className="space-y-6 text-center py-6">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-28 h-28 mx-auto bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-6xl border-4 border-white shadow-glow-yellow animate-bounce">
                🏆
              </div>

              <h2 className="text-3xl font-black text-slate-900">
                مُبَارَكْ! أَتْقَنْتَ رِحْلَةَ حَرْفِ {letter.nameAr}!
              </h2>

              <p className="text-sm text-slate-600 font-bold leading-relaxed">
                لَقَدْ أَصْبَحْتَ بَطَلًا حَقِيقِيًّا فِي نُطْقِ وَتَمْيِيزِ حَرْفِ ({letter.char})!
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-100 border-4 border-amber-400 p-6 rounded-3xl shadow-md text-center space-y-3">
                <span className="text-xs font-black text-amber-900 bg-amber-200 px-3 py-1 rounded-full">
                  شَهَادَةُ بَطَلِ حَرْفِ {letter.nameAr}
                </span>

                <div className="text-6xl font-black text-rose-600 my-2">
                  {letter.char}
                </div>

                <div className="flex items-center justify-center gap-4 text-xs font-black text-slate-800 pt-2 border-t border-amber-300">
                  <span>⭐ +5 نُجُوم</span>
                  <span>🪙 +30 عُمْلَة</span>
                  <span>🏆 وِسَامُ الإِتْقَان</span>
                </div>
              </div>

              <button
                onClick={() => {
                  audioManager.playVictory();
                  triggerVictoryCelebration();
                  updateLetterStage(letter.id, 8, true);
                  addStars(5);
                  addCoins(30);
                }}
                className="game-btn px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base shadow-glow-yellow"
              >
                <Sparkles className="w-5 h-5 text-amber-900" />
                <span>احْتَفِلْ بِالإِنْجَازِ وَاسْتَلِمِ الجَائِزَة! 🎁</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
