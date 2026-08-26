import React, { useState, useEffect } from 'react';
import { Sparkles, Trophy, RotateCcw, Volume2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

export const LetterBubblePopGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();
  const targetLetter = 'ب';
  const [score, setScore] = useState<number>(0);
  const [bubbles, setBubbles] = useState<Array<{ id: number; char: string; x: number; y: number; speed: number; popped: boolean }>>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);

  // Initialize bubbles
  useEffect(() => {
    const chars = ['ب', 'ت', 'ث', 'ن', 'ي', 'م', 'ل', 'ب', 'ب'];
    const initial = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      char: chars[Math.floor(Math.random() * chars.length)],
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      speed: 0.5 + Math.random() * 0.8,
      popped: false
    }));
    setBubbles(initial);
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
      if (score >= 5) {
        triggerCelebration();
        addStars(3);
        addCoins(15);
      }
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, score]);

  // Floating animation loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setBubbles(prev =>
        prev.map(b => {
          if (b.popped) return b;
          let newY = b.y - b.speed;
          if (newY < -10) {
            const chars = ['ب', 'ت', 'ن', 'ي', 'م', 'ب'];
            return {
              ...b,
              y: 100,
              x: 10 + Math.random() * 80,
              char: chars[Math.floor(Math.random() * chars.length)]
            };
          }
          return { ...b, y: newY };
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver]);

  const handlePop = (id: number, char: string) => {
    soundManager.playPop();
    if (char === targetLetter) {
      soundManager.playSuccess();
      setScore(s => s + 1);
      setBubbles(prev =>
        prev.map(b => (b.id === id ? { ...b, popped: true } : b))
      );
      setTimeout(() => {
        setBubbles(prev =>
          prev.map(b =>
            b.id === id
              ? {
                  ...b,
                  popped: false,
                  y: 100,
                  x: 10 + Math.random() * 80,
                  char: Math.random() > 0.4 ? 'ب' : 'ت'
                }
              : b
          )
        );
      }, 600);
    } else {
      soundManager.playEncouragement();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-4">
      
      {/* Game Header */}
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-sky-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🫧</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ صَيْدِ الحَرْف</h2>
            <p className="text-xs text-slate-500 font-bold">
              افْقَعْ فَقَاعَاتِ حَرْفِ ({targetLetter}) فَقَطْ!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-sky-100 text-sky-900 px-3 py-1.5 rounded-xl font-black text-xs md:text-sm">
            ⭐ النِّقَاط: {score}
          </div>
          <div className="bg-rose-100 text-rose-900 px-3 py-1.5 rounded-xl font-black text-xs md:text-sm">
            ⏳ الوَقْت: {timeLeft}ث
          </div>
        </div>
      </div>

      {/* Game Canvas Board */}
      <div className="relative w-full h-[460px] bg-gradient-to-b from-sky-200 via-sky-100 to-indigo-100 rounded-3xl border-4 border-white shadow-card-pop overflow-hidden">
        {/* Floating Clouds Background */}
        <div className="absolute top-4 left-6 text-4xl opacity-40">☁️</div>
        <div className="absolute top-16 right-10 text-5xl opacity-40">☁️</div>

        {!gameOver ? (
          bubbles.map(b => (
            <button
              key={b.id}
              onClick={() => handlePop(b.id, b.char)}
              style={{
                position: 'absolute',
                left: `${b.x}%`,
                top: `${b.y}%`,
                transform: b.popped ? 'scale(1.4)' : 'scale(1)',
                opacity: b.popped ? 0 : 1,
                transition: b.popped ? 'all 0.3s ease-out' : 'none'
              }}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-black text-3xl md:text-4xl border-3 border-white/80 shadow-card-pop active:scale-95 ${
                b.char === targetLetter
                  ? 'bg-gradient-to-tr from-sky-400/80 to-blue-500/90 text-white'
                  : 'bg-gradient-to-tr from-pink-300/80 to-purple-400/90 text-white'
              }`}
            >
              {b.char}
            </button>
          ))
        ) : (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800">
              انْتَهَتِ اللُّعْبَةُ يَا بَطَل!
            </h3>
            <p className="text-base text-slate-600 font-bold">
              لَقَدْ صِدْتَ <span className="text-sky-600 font-black text-xl">{score}</span> فَقَاعَةٍ صَحِيحَة!
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setTimeLeft(30);
                  setScore(0);
                  setGameOver(false);
                }}
                className="game-btn px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>الْعَبْ ثَانِيَةً</span>
              </button>
              <button
                onClick={onBack}
                className="game-btn px-6 py-3 bg-slate-200 text-slate-800 rounded-2xl font-black text-sm"
              >
                <span>العَوْدَةُ لِلأَلْعَاب</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};
