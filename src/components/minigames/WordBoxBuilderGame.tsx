import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

export const WordBoxBuilderGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();

  const words = [
    { targetWord: 'بَاب', letters: ['ب', 'ا', 'ب'], emoji: '🚪' },
    { targetWord: 'بَحْر', letters: ['ب', 'ح', 'ر'], emoji: '🌊' },
    { targetWord: 'حَبْل', letters: ['ح', 'ب', 'ل'], emoji: '🪢' },
    { targetWord: 'عِنَب', letters: ['ع', 'ن', 'ب'], emoji: '🍇' }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(() => {
    return [...words[0].letters].sort(() => Math.random() - 0.5);
  });
  const [completed, setCompleted] = useState<boolean>(false);

  const currentWord = words[currentIdx];

  const handleSelectLetter = (char: string, index: number) => {
    soundManager.playPop();
    const newPlaced = [...placedLetters, char];
    setPlacedLetters(newPlaced);

    // Remove letter from available
    const newAvail = availableLetters.filter((_, i) => i !== index);
    setAvailableLetters(newAvail);

    // Check if word is completed
    if (newPlaced.length === currentWord.letters.length) {
      const spelled = newPlaced.join('');
      if (spelled === currentWord.letters.join('')) {
        soundManager.playSuccess();
        soundManager.speak(currentWord.targetWord);
        addStars(1);
        addCoins(5);

        setTimeout(() => {
          if (currentIdx < words.length - 1) {
            const nextIdx = currentIdx + 1;
            setCurrentIdx(nextIdx);
            setPlacedLetters([]);
            setAvailableLetters([...words[nextIdx].letters].sort(() => Math.random() - 0.5));
          } else {
            setCompleted(true);
            triggerCelebration();
          }
        }, 1200);
      } else {
        soundManager.playEncouragement();
        setTimeout(() => {
          setPlacedLetters([]);
          setAvailableLetters([...currentWord.letters].sort(() => Math.random() - 0.5));
        }, 800);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6">
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">📦</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ صُنْدُوقِ الكَلِمَات</h2>
            <p className="text-xs text-slate-500 font-bold">
              رَتِّب الحُرُوفَ لِتَكْوِينِ الكَلِمَةِ المُنَاسِبَةِ لِلصُّورَة!
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-gradient-to-b from-amber-100 to-yellow-50 p-6 md:p-8 rounded-3xl border-4 border-white shadow-card-pop text-center space-y-6">
        {!completed ? (
          <>
            <div className="text-7xl animate-float">{currentWord.emoji}</div>

            {/* Word Slots Container */}
            <div className="flex items-center justify-center gap-3 dir-rtl">
              {currentWord.letters.map((_, idx) => (
                <div
                  key={idx}
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-4 border-dashed border-amber-300 flex items-center justify-center text-4xl font-black text-slate-800 shadow-inner"
                >
                  {placedLetters[idx] || ''}
                </div>
              ))}
            </div>

            {/* Letter Pickers */}
            <div className="pt-4">
              <p className="text-xs font-bold text-slate-600 mb-3">
                اضْغَطْ عَلَى الحُرُوفِ بِالتَّرْتِيبِ الصَّحِيح:
              </p>
              <div className="flex items-center justify-center gap-3">
                {availableLetters.map((char, i) => (
                  <button
                    key={i}
                    onClick={() => handleSelectLetter(char, i)}
                    className="game-btn w-16 h-16 md:w-18 md:h-18 bg-gradient-to-b from-amber-400 to-orange-500 text-white rounded-2xl font-black text-3xl border-2 border-white shadow-glow-yellow active:scale-95"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="py-6 space-y-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl font-black text-slate-800">
              أَحْسَنْتَ صِنَاعَةَ كُلِّ الكَلِمَاتِ يَا بَطَل!
            </h3>
            <button
              onClick={() => {
                setCurrentIdx(0);
                setPlacedLetters([]);
                setAvailableLetters([...words[0].letters].sort(() => Math.random() - 0.5));
                setCompleted(false);
              }}
              className="game-btn px-6 py-3 bg-amber-500 text-white rounded-2xl font-black text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>الْعَبْ مَرَّةً أُخْرَى 📦</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
