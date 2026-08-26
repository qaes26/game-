import React from 'react';
import { ArrowRight, Clock, Star, TrendingUp, AlertCircle, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import lettersData from '../../data/letters.json';
import { soundManager } from '../../services/audio/SoundManager';

export const ParentDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    childName,
    stars,
    coins,
    trainingTimeMinutes,
    letterProgress,
    attemptsLog
  } = useGame();

  const totalAttempts = attemptsLog.length;
  const highConfidenceAttempts = attemptsLog.filter(a => a.status === 'high_confidence').length;
  const successRate = totalAttempts > 0 ? Math.round((highConfidenceAttempts / totalAttempts) * 100) : 85;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-3xl border-2 border-purple-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>لَوْحَةُ مُتَابَعَةِ الأَهْل</span>
              <span className="text-xl">👨‍👩‍👦</span>
            </h1>
            <p className="text-xs text-slate-500 font-bold">
              تَقْرِيرُ تَقَدُّمِ الطِّفْلِ: {childName}
            </p>
          </div>
        </div>

        <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1.5 rounded-full border border-purple-300">
          مَسَارُ التَّدْرِيبِ المَنْزِلِي 🏡
        </span>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="game-card p-5 border-2 border-sky-200 bg-white">
          <div className="flex items-center justify-between text-sky-600 mb-2">
            <span className="text-xs font-black">وَقْتُ التَّدْرِيب</span>
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {trainingTimeMinutes} <span className="text-sm font-bold text-slate-500">دقيقة</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">تَمَّ التَّدَرُّبُ خِلَالَ هَذَا الأُسْبُوع</p>
        </div>

        <div className="game-card p-5 border-2 border-emerald-200 bg-white">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-black">نِسْبَةُ النَّجَاحِ فِي النُّطْق</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            %{successRate}
          </div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">تَقَدُّمٌ مُمْتَازٌ وَمُسْتَمِر 🌟</p>
        </div>

        <div className="game-card p-5 border-2 border-amber-200 bg-white">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs font-black">النُّجُومُ المُكْتَسَبَة</span>
            <Star className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {stars} <span className="text-sm font-bold text-slate-500">نجمة</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">مُكَافَآتُ الإِنْجَازِ فِي الأَلْعَاب</p>
        </div>

        <div className="game-card p-5 border-2 border-purple-200 bg-white">
          <div className="flex items-center justify-between text-purple-600 mb-2">
            <span className="text-xs font-black">عَدَدُ المَحَاوَلَات</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {totalAttempts} <span className="text-sm font-bold text-slate-500">محاولة</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">تَسْجِيلَاتٌ وَأَنْشِطَةٌ صَوْتِيَّة</p>
        </div>
      </div>

      {/* Letters Progress Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-800">
          تَفَاصِيلُ إِتْقَانِ الحُرُوفِ المُسْتَهْدَفَة:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lettersData.slice(0, 4).map(l => {
            const prog = letterProgress[l.id] || { recognition: 0, sound: 0, syllables: 0, words: 0, sentences: 0, overall: 0 };
            return (
              <div key={l.id} className="p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-lg">
                      {l.character}
                    </span>
                    <span className="font-black text-slate-800 text-sm">حَرْفُ {l.nameAr}</span>
                  </div>
                  <span className="font-black text-xs text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    %{prog.overall} إتقان
                  </span>
                </div>

                {/* Sub-skill Bars */}
                <div className="space-y-1.5 text-xs font-bold text-slate-600">
                  <div className="flex justify-between">
                    <span>التعرف والتمييز:</span>
                    <span>%{prog.recognition}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: `${prog.recognition}%` }} />
                  </div>

                  <div className="flex justify-between">
                    <span>صوت الحرف والمقاطع:</span>
                    <span>%{prog.sound}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${prog.sound}%` }} />
                  </div>

                  <div className="flex justify-between">
                    <span>الكلمات والجمل:</span>
                    <span>%{prog.words}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${prog.words}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Focus Points */}
      <div className="bg-amber-50 rounded-3xl p-5 border-2 border-amber-300 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-black text-amber-900 text-sm">نِقَاطُ التَّرْكِيزِ المُقْتَرَحَةُ لِلأَهْل:</h4>
          <p className="text-xs text-amber-800 font-medium leading-relaxed">
            يُوصَى بِتَكْرَارِ تَدْرِيبَاتِ حَرَكَةِ الضَّمَّة (بُ) وَمَدِّ اليَاءِ (بِي)، وَاسْتِخْدَامِ قِسْمِ "مِرْآةِ لُولُو" لِمُشَاهَدَةِ إِغْلاقِ الشَّفَتَيْنِ عِنْدَ نُطْقِ كَلِمَةِ "حَبْل".
          </p>
        </div>
      </div>

    </div>
  );
};
