import React, { useState } from 'react';
import { ArrowRight, Sparkles, Trophy, Rocket, Star, Volume2 } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../lumi/LumiMascot';

export const StarRealmSpaceWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { stars, coins, addStars, addCoins, triggerVictoryCelebration } = useGame();
  const [spaceshipFired, setSpaceshipFired] = useState<boolean>(false);

  const starConstellations = [
    { name: 'كَوْكَبَةُ الحُرُوفِ الذَّهَبِيَّة', icon: '✨', starsCount: 10 },
    { name: 'سَدِيمُ الكَلِمَاتِ البَرَّاق', icon: '🌌', starsCount: 20 },
    { name: 'مَجَرَّةُ الأَبْطَالِ الخَالِدَة', icon: '🏆', starsCount: 50 }
  ];

  const handleLaunchSpaceship = () => {
    audioManager.playPortal();
    setSpaceshipFired(true);
    triggerVictoryCelebration();
    addStars(5);
    addCoins(25);
    setTimeout(() => setSpaceshipFired(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-yellow-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-amber-50 text-amber-800 border-2 border-amber-200 hover:bg-amber-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🌌 عَالَمُ النُّجُومِ وَالفَضَاءِ السَّاحِر</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              اسْتَكْشِفْ سَفِينَةَ لُومِي الفَضَائِيَّةَ وَالنَّيْبُولا البَرَّاقَةَ وَانْطَلِقْ لِلنُّجُوم!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 text-amber-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-amber-300 flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{stars} نَجْمَة</span>
          </div>
        </div>
      </div>

      {/* Real Space Environment Canvas */}
      <div className="relative w-full min-h-[500px] rounded-3xl border-4 border-yellow-400 shadow-2xl overflow-hidden bg-gradient-to-b from-purple-950 via-slate-950 to-indigo-950 p-6 flex flex-col justify-between text-white text-center">
        
        {/* Animated Nebulae & Space Dust */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-pink-600/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-600/30 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating Constellation Stars */}
        <div className="absolute top-10 left-16 text-3xl animate-float">🌟</div>
        <div className="absolute top-20 right-24 text-2xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-20 left-32 text-4xl animate-float" style={{ animationDelay: '2s' }}>🪐</div>

        {/* LUMI's Magical Spaceship Centerpiece */}
        <div className="relative z-10 space-y-4 my-auto">
          <div className={`relative inline-block transition-transform duration-1000 ${
            spaceshipFired ? 'translate-y-[-150px] scale-125' : 'animate-float'
          }`}>
            <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 p-2 border-4 border-yellow-300 shadow-glow-yellow flex items-center justify-center text-7xl">
              🛸
            </div>
            {spaceshipFired && (
              <div className="text-4xl animate-bounce">🔥💨</div>
            )}
          </div>

          <h3 className="text-3xl font-black text-yellow-300 tracking-wide drop-shadow-md">
            سَفِينَةُ لُومِي الفَضَائِيَّة
          </h3>

          <p className="text-xs md:text-sm text-slate-300 font-bold max-w-md mx-auto">
            مُسْتَوَى البُطُولَةِ الفَضَائِيَّة! اطْلِقْ سَفِينَتَكَ الآنَ لِتَجْمَعَ مَزِيدًا مِنَ النُّجُوم!
          </p>

          <button
            onClick={handleLaunchSpaceship}
            className="game-btn px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-yellow hover:scale-105 active:scale-95"
          >
            <Rocket className="w-5 h-5" />
            <span>إِطْلاقُ السَّفِينَةِ الفَضَائِيَّة! 🚀</span>
          </button>
        </div>

        {/* Bottom Mascot */}
        <div className="mt-4 flex justify-end">
          <LumiMascot
            message="عَالَمُ النُّجُومِ هُوَ عَالَمُ الأَبْطَال.. أَنْتَ رَائِعٌ جِدًّا يَا بَطَل!"
            emotion="excited"
            size="md"
          />
        </div>

      </div>

    </div>
  );
};
