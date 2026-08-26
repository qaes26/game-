import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, Rocket } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../lumi/LumiMascot';

export const SoundsGalaxyWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerVictoryCelebration } = useGame();

  const skillPlanets = [
    { id: 'planet_letters', name: 'كَوْكَبُ الحُرُوف', emoji: '🪐', sound: 'أ ب ت ث', color: 'from-sky-400 to-blue-600' },
    { id: 'planet_syllables', name: 'كَوْكَبُ المَقَاطِع', emoji: '🌕', sound: 'با بو بي', color: 'from-emerald-400 to-teal-600' },
    { id: 'planet_words', name: 'كَوْكَبُ الكَلِمَات', emoji: '🪐', sound: 'باب بيت بطة', color: 'from-amber-400 to-orange-600' },
    { id: 'planet_sentences', name: 'كَوْكَبُ الجُمَل', emoji: '⭐', sound: 'أنا أحب لومي', color: 'from-purple-400 to-pink-600' }
  ];

  const [visitedPlanets, setVisitedPlanets] = useState<string[]>([]);

  const handleVisit = (p: typeof skillPlanets[0]) => {
    audioManager.playPortal();
    audioManager.speak(p.name);
    
    if (!visitedPlanets.includes(p.id)) {
      const newVisited = [...visitedPlanets, p.id];
      setVisitedPlanets(newVisited);
      addStars(2);
      addCoins(10);

      if (newVisited.length === skillPlanets.length) {
        triggerVictoryCelebration();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-indigo-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-800 border-2 border-indigo-200 hover:bg-indigo-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🚀 مَجَرَّةُ الأَصْوَاتِ وَالفَضَاءِ</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              تَنَقَّلْ بِسَفِينَتِكَ بَيْنَ كَوَاكِبِ المَهَارَاتِ وَاصْعَدْ لِعَالَمِ النُّجُوم!
            </p>
          </div>
        </div>

        <div className="bg-indigo-100 text-indigo-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-indigo-300">
          🪐 كَوَاكِبٌ مُكْتَشَفَة: {visitedPlanets.length} / 4
        </div>
      </div>

      {/* Galaxy Space Scene */}
      <div className="relative w-full min-h-[460px] rounded-3xl border-4 border-indigo-400 shadow-2xl overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-950 to-purple-950 p-6 flex flex-col justify-between text-white">
        
        {/* Floating Stars */}
        <div className="absolute top-6 left-8 text-yellow-300 animate-pulse text-2xl">✨</div>
        <div className="absolute bottom-12 left-16 text-yellow-300 animate-pulse text-xl">🌟</div>

        {/* Orbiting Planets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 my-auto">
          {skillPlanets.map((p) => {
            const isVisited = visitedPlanets.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => handleVisit(p)}
                className={`game-card p-5 border-3 cursor-pointer flex flex-col items-center justify-between text-center transition-all duration-300 ${
                  isVisited
                    ? 'bg-indigo-900/90 border-amber-400 shadow-glow-yellow scale-105'
                    : 'bg-white/10 border-white/30 hover:border-indigo-400 hover:scale-105'
                }`}
              >
                <span className="text-5xl my-2 animate-float">
                  {p.emoji}
                </span>

                <h4 className="font-black text-base text-white">
                  {p.name}
                </h4>

                <span className="text-xs text-amber-300 font-bold mt-1">
                  {p.sound}
                </span>

                <div className="mt-3 px-3 py-1 rounded-full bg-white/20 text-[11px] font-black">
                  {isVisited ? 'كَوْكَبٌ مُضِيء ✨' : 'هَيَّا نَزُورُه 🚀'}
                </div>
              </div>
            );
          })}
        </div>

        {/* Mascot */}
        <div className="mt-4 flex justify-end">
          <LumiMascot
            message="سَفِينَتُنَا الفَضَائِيَّةُ تَطِيرُ بِسُرْعَةِ النُّورِ بَيْنَ الكَوَاكِب!"
            emotion="excited"
            size="md"
          />
        </div>

      </div>

    </div>
  );
};
