import React from 'react';
import { Compass, Sparkles, Star, Trophy, ArrowLeft, Play, Flame } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../lumi/LumiMascot';

interface ExplorationHub3DProps {
  onOpenMap: () => void;
  onOpenObservatory: () => void;
  onOpenMirror: () => void;
  onSelectLetter: (id: string) => void;
}

export const ExplorationHub3D: React.FC<ExplorationHub3DProps> = ({
  onOpenMap,
  onOpenObservatory,
  onOpenMirror,
  onSelectLetter
}) => {
  const { childName, stars, coins, streak, letterProgressMap } = useGame();

  // Calculate total mastered letters
  const masteredCount = Object.values(letterProgressMap).filter(
    (p: any) => p.masteryPercentage === 100
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 select-none">
      
      {/* 3D Atmosphere Realm Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#2e1065] rounded-3xl p-6 md:p-8 text-white shadow-2xl border-2 border-indigo-500/40">
        
        {/* Glow Dust */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-[#1e293b]/80 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold border border-indigo-500/30 text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>مَرْحَبًا يَا {childName} فِي عَالَمِ لُومِي السَّاحِر!</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              عَالَمُ الأَصْوَاتِ السَّاحِر 🌌✨
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed font-bold">
              اسْتَكْشِفْ عَالَمَ الحُرُوفِ الثَّمَانِيَةِ وَالعِشْرِينَ بِتَرْتِيبِهَا الهِجَائِيِّ الدَّقِيقِ وَانْطَلِقْ فِي العَوَالِمِ الثَّمَانِيَة!
            </p>

            {/* Main Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  audioManager.playPortal();
                  onOpenMap();
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-black text-sm md:text-base border border-cyan-300/40 shadow-glow-cyan hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Compass className="w-5 h-5" />
                <span>خَرِيطَةُ العَوَالِمِ (8 عَوَالِم) 🗺️</span>
              </button>

              <button
                onClick={() => {
                  audioManager.playClick();
                  onOpenObservatory();
                }}
                className="px-5 py-3.5 bg-[#1e293b] text-white rounded-2xl font-black text-sm md:text-base border border-slate-700 hover:bg-[#334155] shadow-md transition-all flex items-center gap-2"
              >
                <span>مَرْصَدُ الحُرُوفِ (28 حَرْفًا) 🔤</span>
              </button>
            </div>
          </div>

          {/* LUMI Mascot Companion */}
          <div className="flex-shrink-0">
            <LumiMascot
              message={`أَهْلًا يَا ${childName}! هَيَّا نَبْدَأُ رِحْلَةَ حَرْفِ البَاءِ (ب) فِي وادِي الحُرُوف!` }
              emotion="happy"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Featured Quest Spotlight: Letter Baa Vertical Slice */}
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#1e293b] rounded-3xl p-6 md:p-8 border-2 border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-white">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-400 to-indigo-600 text-white flex items-center justify-center text-6xl font-black border-4 border-white/50 shadow-glow-cyan animate-wiggle">
            ب
          </div>
          <div className="space-y-1 text-right">
            <span className="inline-block bg-cyan-500 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full">
              المُغَامَرَةُ الرَّئِيسِيَّةُ المُتَاحَة
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-amber-300">
              رِحْلَةُ حَرْفِ البَاءِ (ب) 🦆
            </h3>
            <p className="text-xs md:text-sm text-slate-300 font-bold max-w-lg">
              8 مَرَاحِلَ مُتَدَرِّجَةٌ تَبْدَأُ بِـ (اكْتِشَافِ الحَرْف) وَتَنْتَهِي بِـ (تَحَدِّي بَوَّابَةِ لُومِي الكُبْرَى)!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            audioManager.playPortal();
            onSelectLetter('baa');
          }}
          className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-slate-950 rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>ابْدَأ رِحْلَةَ حَرْفِ ب 🚀</span>
        </button>
      </div>

      {/* Highlights & Portals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: '🌿 وادي الحروف', desc: 'اسْتَكْشِف الحُرُوفَ فِي الوَادِي السِّحْرِيّ', action: onOpenMap, border: 'border-emerald-500/40 bg-emerald-950/30' },
          { title: '🪞 مرآة لومي البصرية', desc: 'تَعَلَّمْ مَخَارِجَ النُّطْقِ وَحَرَكَةَ الفَم', action: onOpenMirror, border: 'border-teal-500/40 bg-teal-950/30' },
          { title: '🌌 عالم النجوم الفضائي', desc: 'سَفِينَةُ لُومِي وَأَوْسِمَةُ الإِتْقَان', action: onOpenMap, border: 'border-purple-500/40 bg-purple-950/30' }
        ].map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              audioManager.playClick();
              item.action();
            }}
            className={`p-5 rounded-3xl border-2 ${item.border} backdrop-blur-md cursor-pointer hover:scale-105 transition-all flex flex-col justify-between text-white`}
          >
            <div>
              <h4 className="text-lg font-black text-cyan-300 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-300 font-bold leading-relaxed">{item.desc}</p>
            </div>
            <span className="text-xs font-black text-amber-400 mt-3 flex items-center gap-1">
              <span>ادخل الآن</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
