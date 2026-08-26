import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, RotateCcw } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../lumi/LumiMascot';

export const SyllablesForestWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerVictoryCelebration } = useGame();
  
  const treeSyllables = [
    { syl: 'بَ', vowel: 'فتحة', name: 'باء مفتوحة' },
    { syl: 'بِ', vowel: 'كسرة', name: 'باء مكسورة' },
    { syl: 'بُ', vowel: 'ضمة', name: 'باء مضمومة' },
    { syl: 'بَا', vowel: 'مد بالألف', name: 'مد الألف' },
    { syl: 'بِي', vowel: 'مد بالياء', name: 'مد الياء' },
    { syl: 'بُو', vowel: 'مد بالواو', name: 'مد الواو' }
  ];

  const [wateredTrees, setWateredTrees] = useState<string[]>([]);

  const handleGrowTree = (syl: string) => {
    audioManager.playBloom();
    audioManager.speak(syl);
    
    if (!wateredTrees.includes(syl)) {
      const newWatered = [...wateredTrees, syl];
      setWateredTrees(newWatered);
      addStars(1);
      addCoins(5);

      if (newWatered.length === treeSyllables.length) {
        triggerVictoryCelebration();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-green-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-green-50 text-green-800 border-2 border-green-200 hover:bg-green-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🌳 غَابَةُ المَقَاطِعِ السِّحْرِيَّة</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              اسْقِ الأَشْجَارَ السِّحْرِيَّةَ بِنُطْقِ المَقَاطِعِ لِتَنْمُوَ وَتُحَلِّقَ الفَرَاشَات!
            </p>
          </div>
        </div>

        <div className="bg-green-100 text-green-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-green-300">
          🦋 أَشْجَارٌ نَامِيَة: {wateredTrees.length} / 6
        </div>
      </div>

      {/* Magical Forest Scene */}
      <div className="relative w-full min-h-[460px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-teal-900 via-emerald-800 to-green-900 p-6 flex flex-col justify-between">
        
        {/* Glowing Forest Fireflies */}
        <div className="absolute top-8 left-12 text-2xl text-yellow-300 animate-pulse">✨</div>
        <div className="absolute top-16 right-20 text-3xl text-emerald-300 animate-pulse">🌟</div>

        {/* Tree Syllables Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 relative z-10">
          {treeSyllables.map((item) => {
            const isGrown = wateredTrees.includes(item.syl);
            return (
              <div
                key={item.syl}
                onClick={() => handleGrowTree(item.syl)}
                className={`game-card p-5 border-4 cursor-pointer flex flex-col items-center justify-between text-center transition-all duration-300 ${
                  isGrown
                    ? 'bg-emerald-100/95 border-amber-400 shadow-glow-yellow scale-105'
                    : 'bg-white/90 border-emerald-400 hover:scale-105 hover:bg-white'
                }`}
              >
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  {item.vowel}
                </span>

                <span className={`text-4xl my-2 ${isGrown ? 'animate-bounce' : ''}`}>
                  {isGrown ? '🌳' : '🌱'}
                </span>

                <span className="text-5xl font-black text-emerald-800">
                  {item.syl}
                </span>

                <div className="flex items-center gap-1 mt-2 text-xs font-bold text-slate-700">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isGrown ? 'نَمَتِ الشَّجَرَة 🦋' : 'انْقُرْ لِتَنْمُو 💧'}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Mascot in Forest */}
        <div className="mt-4 flex justify-end">
          <LumiMascot
            message="كُلَّمَا نَطَقْتَ مَقْطَعًا صَحِيحًا تَكْبُرُ شَجَرَةٌ فِي الغَابَة!"
            emotion="cheering"
            size="md"
          />
        </div>

      </div>

    </div>
  );
};
