import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight, Flag } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

export const LoulouRunnerGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();

  const runnerQuestions = [
    { question: 'أَيُّ كَلِمَةٍ تَبْدَأُ بِحَرْفِ (ب)؟', options: ['بَاب', 'شَمْس', 'قَلَم'], correct: 'بَاب' },
    { question: 'مَا هُوَ صَوْتُ حَرْفِ البَاءِ بِالفَتْحَة؟', options: ['بُ', 'بَ', 'بِ'], correct: 'بَ' },
    { question: 'أَيُّ كَلِمَةٍ فِيهَا حَرْفُ (ب) فِي الآخِر؟', options: ['عِنَب', 'بَحْر', 'حَبْل'], correct: 'عِنَب' },
    { question: 'أَكْمِل: البَطَّةُ تَسْبَحُ فِي .....', options: ['البَحْرِ', 'الكِتَابِ', 'البَابِ'], correct: 'البَحْرِ' }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [loulouPosition, setLoulouPosition] = useState<number>(10);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentQ = runnerQuestions[currentIdx];

  const handleAnswer = (opt: string) => {
    if (opt === currentQ.correct) {
      soundManager.playSuccess();
      const newPos = loulouPosition + 25;
      setLoulouPosition(newPos);
      addStars(1);
      addCoins(5);

      setTimeout(() => {
        if (currentIdx < runnerQuestions.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setCompleted(true);
          triggerCelebration();
          addStars(3);
          addCoins(20);
        }
      }, 800);
    } else {
      soundManager.playEncouragement();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6">
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏃‍♂️</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ سِبَاقِ لُولُو</h2>
            <p className="text-xs text-slate-500 font-bold">
              سَاعِدْ لُولُو فِي الوُصُولِ لِخَطِّ النِّهَايَةِ بِالإِجَابَةِ الصَّحِيحَة!
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

      {/* Runner Track */}
      <div className="bg-gradient-to-b from-sky-300 via-sky-200 to-amber-200 p-6 md:p-8 rounded-3xl border-4 border-white shadow-card-pop relative overflow-hidden min-h-[380px] flex flex-col justify-between">
        
        {/* Track Runway */}
        <div className="relative w-full h-24 bg-amber-400/80 rounded-2xl border-2 border-amber-500 flex items-center px-4 overflow-hidden shadow-inner">
          {/* Finish Line Flag */}
          <div className="absolute left-6 text-4xl flex flex-col items-center">
            <Flag className="w-8 h-8 text-rose-600 fill-rose-500" />
            <span className="text-[10px] font-black bg-white px-1.5 rounded text-slate-800">النهاية</span>
          </div>

          {/* Running Loulou */}
          <div
            className="absolute transition-all duration-700 text-5xl flex items-center gap-1"
            style={{ right: `${loulouPosition}%` }}
          >
            <div className="w-14 h-14 rounded-full bg-sky-400 border-2 border-white shadow-md flex items-center justify-center text-3xl animate-bounce">
              👾
            </div>
            <span className="text-xs font-black bg-white/90 px-2 py-0.5 rounded-full text-slate-800 shadow">
              لولو
            </span>
          </div>
        </div>

        {/* Question Panel */}
        {!completed ? (
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border-2 border-amber-300 text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-black text-slate-900">
              {currentQ.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="game-btn p-4 bg-gradient-to-b from-white to-amber-50 hover:bg-amber-100 text-slate-800 rounded-2xl font-black text-xl border-2 border-amber-300 active:scale-95"
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
              فَازَ لُولُو بِالسِّبَاقِ بِفَضْلِكَ يَا بَطَل!
            </h3>
            <button
              onClick={() => {
                setCurrentIdx(0);
                setLoulouPosition(10);
                setCompleted(false);
              }}
              className="game-btn px-6 py-3 bg-amber-500 text-white rounded-2xl font-black text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>الْعَبْ سِبَاقًا جَدِيدًا 🏃‍♂️</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
