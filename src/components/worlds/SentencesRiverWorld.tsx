import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Volume2, Check } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

import { ARABIC_LETTERS } from '../../data/letters';

export const SentencesRiverWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration, selectedLetterId } = useGame();

  const letterData = ARABIC_LETTERS.find(l => l.id === selectedLetterId) || ARABIC_LETTERS[1];
  
  const sentenceChallenges = letterData.sentences.map((s, idx) => ({
    id: idx + 1,
    targetSentence: s.sentence,
    words: s.sentence.split(' '),
    emoji: s.emoji
  }));

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [bridgeBuilt, setBridgeBuilt] = useState<boolean>(false);

  const currentQ = sentenceChallenges[currentIdx];

  const [availableWords, setAvailableWords] = useState<string[]>(() => {
    return [...sentenceChallenges[0].words].sort(() => Math.random() - 0.5);
  });

  const handlePickWord = (w: string, index: number) => {
    audioManager.playClick();
    const newPlaced = [...placedWords, w];
    setPlacedWords(newPlaced);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));

    if (newPlaced.length === currentQ.words.length) {
      if (newPlaced.join(' ') === currentQ.words.join(' ')) {
        audioManager.playVictory();
        audioManager.speak(currentQ.targetSentence);
        setBridgeBuilt(true);
        addStars(2);
        addCoins(10);

        setTimeout(() => {
          if (currentIdx < sentenceChallenges.length - 1) {
            const nextIdx = currentIdx + 1;
            setCurrentIdx(nextIdx);
            setPlacedWords([]);
            setAvailableWords([...sentenceChallenges[nextIdx].words].sort(() => Math.random() - 0.5));
            setBridgeBuilt(false);
          } else {
            triggerVictoryCelebration();
          }
        }, 1500);
      } else {
        setTimeout(() => {
          setPlacedWords([]);
          setAvailableWords([...currentQ.words].sort(() => Math.random() - 0.5));
        }, 800);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-sky-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-sky-50 text-sky-800 border-2 border-sky-200 hover:bg-sky-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🌊 نَهْرُ الجُمَلِ البَرَّاقَة</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              رَتِّب الكَلِمَاتِ لِبِنَاءِ الجِسْرِ المُضِيءِ وَعُبُورِ النَّهْر!
            </p>
          </div>
        </div>

        <button
          onClick={() => audioManager.speak(currentQ.targetSentence)}
          className="game-btn px-4 py-2 bg-sky-500 text-white rounded-2xl font-black text-xs md:text-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>اسْتَمِعْ لِلجُمْلَة</span>
        </button>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'} فِي نَهْرِ الجُمَل! رَتِّبِ الكَلِمَاتِ بِالتَّرْتِيبِ الصَّحِيحِ لِيَبْنِيَ لُومِي لَكَ جِسْرًا سِحْرِيًّا لِعُبُورِ النَّهْر!` }
        shortHint="رَتِّبِ الكَلِمَات"
        autoSpeak={true}
        emotion="happy"
      />

      {/* River Scene */}
      <div className="relative w-full min-h-[440px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 p-6 flex flex-col justify-between">
        
        {/* River Waves Animation */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Stepping Stones Bridge */}
        <div className="relative z-10 space-y-6 text-center">
          <div className="text-6xl animate-float">{currentQ.emoji}</div>

          {/* Bridge Construction Line */}
          <div className="flex items-center justify-center gap-3 dir-rtl">
            {currentQ.words.map((_, i) => (
              <div
                key={i}
                className={`w-28 h-16 rounded-2xl border-3 flex items-center justify-center font-black text-lg transition-all ${
                  placedWords[i]
                    ? 'bg-white text-slate-900 border-yellow-400 shadow-glow-yellow scale-105'
                    : 'bg-white/30 border-dashed border-white/70 text-white'
                }`}
              >
                {placedWords[i] || '؟'}
              </div>
            ))}
          </div>

          {/* Available Word Buttons */}
          <div className="pt-4">
            <p className="text-xs font-bold text-sky-100 mb-3">
              اخْتَرْ الكَلِمَاتِ بِالتَّرْتِيبِ الصَّحِيح:
            </p>
            <div className="flex items-center justify-center gap-3">
              {availableWords.map((w, index) => (
                <button
                  key={index}
                  onClick={() => handlePickWord(w, index)}
                  className="game-btn px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-base border-2 border-sky-300 hover:scale-105 active:scale-95 shadow-md transition-all"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
