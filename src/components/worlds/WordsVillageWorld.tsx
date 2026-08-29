import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, DoorOpen, Check } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

import { ARABIC_LETTERS } from '../../data/letters';

export const WordsVillageWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration, selectedLetterId } = useGame();

  const letterData = ARABIC_LETTERS.find(l => l.id === selectedLetterId) || ARABIC_LETTERS[1];
  
  const villageLocations = letterData.words.slice(0, 4).map(w => ({
    id: w.id,
    word: w.word,
    name: w.meaning,
    emoji: w.emoji,
    unlockedDesc: `اِكْتَشَفْنَا كَلِمَةَ ${w.word}!`
  }));

  const [unlockedLocations, setUnlockedLocations] = useState<string[]>([]);

  const handleUnlockLocation = (loc: typeof villageLocations[0]) => {
    audioManager.playClick();
    audioManager.speak(loc.word);

    if (!unlockedLocations.includes(loc.id)) {
      const newUnlocked = [...unlockedLocations, loc.id];
      setUnlockedLocations(newUnlocked);
      addStars(1);
      addCoins(5);

      if (newUnlocked.length === villageLocations.length) {
        triggerVictoryCelebration();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-amber-300 shadow-card-pop">
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
              <span>🏘️ قَرْيَةُ الكَلِمَاتِ التَّفَاعُلِيَّة</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              انْطِقْ كَلِمَاتِ القَرْيَةِ لِفَتْحِ الأَبْوَابِ وَتَحْرِيكِ عَنَاصِرِ المَكَان!
            </p>
          </div>
        </div>

        <div className="bg-amber-100 text-amber-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-amber-300">
          🔑 أَمَاكِنٌ مَفْتُوحَة: {unlockedLocations.length} / 4
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`أَهْلًا بِكَ يَا ${childName || 'البَطَل'} فِي قَرْيَةِ الكَلِمَات! انْقُرْ عَلَى مَنَازِلِ وَأَمَاكِنِ القَرْيَةِ لِتَسْتَمِعَ لِلكَلِمَةِ وَتَفْتَحَ أَبْوَابَهَا السِّحْرِيَّة!` }
        shortHint="انْقُرْ عَلَى المَكَان"
        autoSpeak={true}
        emotion="happy"
      />

      {/* Village Scene Canvas */}
      <div className="relative w-full min-h-[460px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-amber-100 via-orange-100 to-amber-200 p-6 flex flex-col justify-between">
        
        {/* Village Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {villageLocations.map((loc) => {
            const isUnlocked = unlockedLocations.includes(loc.id);
            return (
              <div
                key={loc.id}
                onClick={() => handleUnlockLocation(loc)}
                className={`game-card p-5 border-4 cursor-pointer flex flex-col items-center justify-between text-center transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-white border-amber-400 shadow-glow-yellow scale-105'
                    : 'bg-white/80 border-slate-300 hover:border-amber-400 hover:scale-105'
                }`}
              >
                <span className="text-5xl my-2 animate-float">
                  {loc.emoji}
                </span>

                <h4 className="font-black text-slate-900 text-base">
                  {loc.name}
                </h4>

                <span className="text-3xl font-black text-rose-600 my-1">
                  ({loc.word})
                </span>

                <p className="text-xs text-slate-600 font-bold mt-1">
                  {isUnlocked ? loc.unlockedDesc : 'اضْغَطْ لِفَتْحِ المَعْلَم 🔓'}
                </p>

                <div className="mt-2 w-full pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-xs font-bold text-amber-800">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>اسْتَمِعْ لِلكَلِمَة</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
