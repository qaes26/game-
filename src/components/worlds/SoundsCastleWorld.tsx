import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, Shield, Crown } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

import { ARABIC_LETTERS } from '../../data/letters';

export const SoundsCastleWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration, selectedLetterId } = useGame();

  const letterData = ARABIC_LETTERS.find(l => l.id === selectedLetterId) || ARABIC_LETTERS[1];
  
  const shortTarget = letterData.syllables.short[0];
  const longTarget = letterData.syllables.long[0] || letterData.syllables.long[1] || letterData.syllables.short[0];
  const wordTarget = letterData.words[0];
  
  const castleTrials = [
    { title: 'تَحَدِّي صَوْتِ الحَرْف', task: `انْقُرْ عَلَى صَوْتِ: ${shortTarget.syl}`, options: [shortTarget.syl, 'تَ', 'مَ'].sort(() => Math.random() - 0.5), correct: shortTarget.syl },
    { title: 'تَحَدِّي المَقْطَع', task: `اخْتَرْ: ${longTarget.nameAr}`, options: [longTarget.syl, 'بِي', 'تُو'].sort(() => Math.random() - 0.5), correct: longTarget.syl },
    { title: 'تَحَدِّي الكَلِمَة', task: `اخْتَرْ الكَلِمَةَ الَّتِي تَحْتَوِي عَلَى ${letterData.char}`, options: [wordTarget.word, 'شَمْس', 'قَلَم'].sort(() => Math.random() - 0.5), correct: wordTarget.word }
  ];

  const [currentTrialIdx, setCurrentTrialIdx] = useState<number>(0);
  const [clearedCount, setClearedCount] = useState<number>(0);

  const currentT = castleTrials[currentTrialIdx];

  const handleSolve = (ans: string) => {
    if (ans === currentT.correct) {
      audioManager.playVictory();
      setClearedCount(prev => prev + 1);
      addStars(2);
      addCoins(10);

      setTimeout(() => {
        if (currentTrialIdx < castleTrials.length - 1) {
          setCurrentTrialIdx(prev => prev + 1);
        } else {
          triggerVictoryCelebration();
        }
      }, 1200);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-rose-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-rose-50 text-rose-800 border-2 border-rose-200 hover:bg-rose-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🏰 قَلْعَةُ الأَصْوَاتِ الكُبْرَى</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              اجْتَزْ تَحَدِّيَاتِ الحُرُوفِ وَالمَقَاطِعِ وَالكَلِمَاتِ لِتَتَوَّجَ بَطَلَ القَلْعَة!
            </p>
          </div>
        </div>

        <div className="bg-rose-100 text-rose-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-rose-300">
          👑 تَحَدِّيَاتٌ مُنْجَزَة: {clearedCount} / 3
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`أَهْلًا يَا ${childName || 'البَطَل'} فِي قَلْعَةِ الأَصْوَات! أَجِبْ عَنْ تَحَدِّيَاتِ القَلْعَةِ الشُّجَاعَةِ لِتَتَوَّجَ بَطَلَ المَمْلَكَة!` }
        shortHint="حُلَّ تَحَدِّي القَلْعَة"
        autoSpeak={true}
        emotion="cheering"
      />

      {/* Castle Scene */}
      <div className="relative w-full min-h-[440px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-rose-900 via-purple-900 to-slate-900 p-6 flex flex-col justify-between text-white text-center">
        
        <div className="relative z-10 space-y-6 max-w-lg mx-auto">
          <div className="text-6xl animate-bounce">🏰</div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border-2 border-white/20 space-y-4">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full">
              {currentT.title}
            </span>

            <h3 className="text-2xl font-black text-amber-200">
              {currentT.task}
            </h3>

            <div className="grid grid-cols-3 gap-3 pt-3">
              {currentT.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSolve(opt)}
                  className="game-btn p-4 bg-gradient-to-b from-white to-rose-50 text-slate-900 rounded-2xl font-black text-2xl border-2 border-white shadow-lg active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
