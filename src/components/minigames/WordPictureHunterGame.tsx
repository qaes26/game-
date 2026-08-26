import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

export const WordPictureHunterGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();

  const challenges = [
    {
      targetWord: 'بَطَّة',
      options: [
        { id: 1, name: 'بَطَّة', emoji: '🦆', isCorrect: true },
        { id: 2, name: 'سَيَّارَة', emoji: '🚗', isCorrect: false },
        { id: 3, name: 'تُفَّاحَة', emoji: '🍎', isCorrect: false },
        { id: 4, name: 'قَلَم', emoji: '✏️', isCorrect: false }
      ]
    },
    {
      targetWord: 'بَاب',
      options: [
        { id: 1, name: 'شَمْس', emoji: '☀️', isCorrect: false },
        { id: 2, name: 'بَاب', emoji: '🚪', isCorrect: true },
        { id: 3, name: 'مَوْز', emoji: '🍌', isCorrect: false },
        { id: 4, name: 'كُرَة', emoji: '⚽', isCorrect: false }
      ]
    },
    {
      targetWord: 'بَيْت',
      options: [
        { id: 1, name: 'عِنَب', emoji: '🍇', isCorrect: false },
        { id: 2, name: 'كِتَاب', emoji: '📖', isCorrect: false },
        { id: 3, name: 'بَيْت', emoji: '🏠', isCorrect: true },
        { id: 4, name: 'نَجْمَة', emoji: '⭐', isCorrect: false }
      ]
    }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentQ = challenges[currentIdx];

  const handlePickOption = (isCorrect: boolean, wordName: string) => {
    if (isCorrect) {
      soundManager.playSuccess();
      soundManager.speak(`صحيح! ${wordName}`);
      addStars(1);
      addCoins(5);

      setTimeout(() => {
        if (currentIdx < challenges.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setCompleted(true);
          triggerCelebration();
        }
      }, 1000);
    } else {
      soundManager.playEncouragement();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6">
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-pink-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ صَيْدِ الكَلِمَة</h2>
            <p className="text-xs text-slate-500 font-bold">
              اسْتَمِعْ لِلكَلِمَةِ وَاخْتَرْ الصُّورَةَ المُنَاسِبَة!
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

      <div className="bg-gradient-to-b from-pink-100 to-rose-50 p-6 md:p-8 rounded-3xl border-4 border-white shadow-card-pop text-center space-y-6">
        {!completed ? (
          <>
            <div className="space-y-2">
              <span className="text-xs font-black text-rose-700 bg-rose-200 px-3 py-1 rounded-full">
                السؤال {currentIdx + 1} من {challenges.length}
              </span>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
                أَيْنَ صُورَةُ: <span className="text-rose-600">({currentQ.targetWord})</span>؟
              </h3>
              <button
                onClick={() => soundManager.speak(currentQ.targetWord)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-200 text-rose-900 rounded-full font-bold text-xs hover:bg-rose-300"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلكَلِمَة</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {currentQ.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handlePickOption(opt.isCorrect, opt.name)}
                  className="game-card p-6 flex flex-col items-center justify-center gap-3 border-3 border-pink-300 hover:border-pink-500 hover:scale-105 active:scale-95 transition-all bg-white"
                >
                  <span className="text-5xl md:text-6xl">{opt.emoji}</span>
                  <span className="font-black text-sm text-slate-800">{opt.name}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="py-6 space-y-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl font-black text-slate-800">
              صَيَّادُ كَلِمَاتٍ مَاهِرٌ جِدًّا!
            </h3>
            <button
              onClick={() => {
                setCurrentIdx(0);
                setCompleted(false);
              }}
              className="game-btn px-6 py-3 bg-rose-500 text-white rounded-2xl font-black text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>الْعَبْ ثَانِيَةً 🎯</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
