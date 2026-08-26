import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

export const SyllableTrainGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();
  
  const questions = [
    { target: 'بَ', audioPrompt: 'بَ', options: ['بَ', 'بِ', 'بُ', 'تَ'], correct: 'بَ' },
    { target: 'بَا', audioPrompt: 'بَا', options: ['بُو', 'بَا', 'بِي', 'تَا'], correct: 'بَا' },
    { target: 'بُ', audioPrompt: 'بُ', options: ['بَ', 'بِ', 'بُ', 'مُ'], correct: 'بُ' },
    { target: 'بِي', audioPrompt: 'بِي', options: ['بِي', 'بَا', 'بُو', 'تِي'], correct: 'بِي' }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [trainMoving, setTrainMoving] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentQ = questions[currentIdx];

  const handleSelectWagon = (syl: string) => {
    if (syl === currentQ.correct) {
      soundManager.playTrainWhistle();
      soundManager.playSuccess();
      setTrainMoving(true);
      addStars(1);
      addCoins(5);

      setTimeout(() => {
        setTrainMoving(false);
        if (currentIdx < questions.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setCompleted(true);
          triggerCelebration();
        }
      }, 1500);
    } else {
      soundManager.playEncouragement();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6">
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-emerald-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚂</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ قِطَارِ المَقَاطِع</h2>
            <p className="text-xs text-slate-500 font-bold">
              اخْتَرْ عَرَبَةَ المَقْطَعِ الصَّحِيحِ لِيَتَحَرَّكَ القِطَار!
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

      {/* Train Scene */}
      <div className="bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-100 p-6 md:p-8 rounded-3xl border-4 border-white shadow-card-pop relative overflow-hidden min-h-[380px] flex flex-col justify-between">
        {/* Animated Moving Train */}
        <div className={`flex items-center gap-3 transition-transform duration-1000 ${trainMoving ? 'translate-x-[-120%]' : 'translate-x-0'}`}>
          {/* Locomotive Engine */}
          <div className="w-24 h-20 bg-rose-500 rounded-2xl flex items-center justify-center text-3xl border-3 border-white shadow-md text-white font-black relative">
            🚂
            {trainMoving && (
              <span className="absolute -top-6 right-2 text-2xl animate-bounce">💨</span>
            )}
          </div>

          {/* Connected Syllable Wagon */}
          <div className="w-24 h-20 bg-amber-400 rounded-2xl flex items-center justify-center text-4xl font-black border-3 border-white shadow-md text-slate-900">
            {currentQ.target}
          </div>
        </div>

        {/* Question & Options */}
        {!completed ? (
          <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border-2 border-emerald-300 text-center space-y-3 mt-8">
            <div className="flex items-center justify-center gap-2">
              <span className="font-extrabold text-sm text-slate-800">
                أَيْنَ مَقْطَعُ: <span className="text-rose-600 text-2xl font-black">({currentQ.target})</span>؟
              </span>
              <button
                onClick={() => soundManager.speak(currentQ.audioPrompt)}
                className="p-1.5 rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectWagon(opt)}
                  className="game-btn p-4 bg-gradient-to-b from-white to-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl font-black text-3xl border-3 border-emerald-300 active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl font-black text-slate-800">
              وَصَلَ القِطَارُ إِلَى المَحَطَّةِ بِنَجَاح!
            </h3>
            <button
              onClick={() => {
                setCurrentIdx(0);
                setCompleted(false);
              }}
              className="game-btn px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>الْعَبْ ثَانِيَةً 🚂</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
