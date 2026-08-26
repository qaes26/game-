import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, RotateCcw, CheckCircle2 } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../lumi/LumiMascot';

export const ValleyOfLettersWorld: React.FC<{ onBack: () => void; onSelectLetter: (id: string) => void }> = ({
  onBack,
  onSelectLetter
}) => {
  const { addStars, addCoins, triggerVictoryCelebration } = useGame();
  const [foundLetters, setFoundLetters] = useState<string[]>([]);
  const [bloomingFlowers, setBloomingFlowers] = useState<number>(0);

  const lettersInValley = [
    { char: 'ب', id: 'baa', x: 20, y: 30, color: 'text-rose-600' },
    { char: 'ت', id: 'taa', x: 75, y: 25, color: 'text-emerald-600' },
    { char: 'م', id: 'meem', x: 45, y: 60, color: 'text-amber-600' },
    { char: 'ن', id: 'noon', x: 80, y: 70, color: 'text-sky-600' },
    { char: 'أ', id: 'alif', x: 15, y: 75, color: 'text-purple-600' }
  ];

  const handleSpotLetter = (char: string, id: string) => {
    if (foundLetters.includes(char)) {
      audioManager.speak(char);
      return;
    }

    audioManager.playBloom();
    audioManager.speak(char);
    const newFound = [...foundLetters, char];
    setFoundLetters(newFound);
    setBloomingFlowers(prev => prev + 1);
    addStars(1);
    addCoins(5);

    if (newFound.length === lettersInValley.length) {
      triggerVictoryCelebration();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-emerald-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800 border-2 border-emerald-200 hover:bg-emerald-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🌿 وَادِي الحُرُوفِ الخَضْرَاء</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              ابْحَثْ عَنِ الحُرُوفِ المُخَبَّأَةِ فِي المَرْعَى لِتُزْهِرَ الأَزْهَارُ البَرَّاقَة!
            </p>
          </div>
        </div>

        <div className="bg-emerald-100 text-emerald-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-emerald-300">
          🌸 أَزْهَارٌ مُفَتَّحَة: {bloomingFlowers} / 5
        </div>
      </div>

      {/* Interactive Living Valley Canvas Scene */}
      <div className="relative w-full h-[480px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-sky-300 via-emerald-200 to-green-300">
        
        {/* Animated Clouds & Hills */}
        <div className="absolute top-4 left-10 text-5xl opacity-40 animate-float">☁️</div>
        <div className="absolute top-12 right-20 text-6xl opacity-40 animate-float" style={{ animationDelay: '1.5s' }}>☁️</div>
        
        {/* Green Hills SVG Background */}
        <svg viewBox="0 0 1000 500" className="absolute bottom-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <path d="M 0 350 Q 250 200 500 320 T 1000 280 L 1000 500 L 0 500 Z" fill="#86efac" opacity="0.7" />
          <path d="M 0 390 Q 350 280 700 380 T 1000 360 L 1000 500 L 0 500 Z" fill="#4ade80" />
        </svg>

        {/* Blooming Flowers in Valley */}
        {Array.from({ length: bloomingFlowers * 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl animate-pop pointer-events-none"
            style={{
              bottom: `${15 + (i * 7) % 35}%`,
              left: `${8 + (i * 16) % 85}%`
            }}
          >
            🌸
          </div>
        ))}

        {/* Hidden Interactive Letters */}
        {lettersInValley.map((item) => {
          const isFound = foundLetters.includes(item.char);
          return (
            <button
              key={item.id}
              onClick={() => handleSpotLetter(item.char, item.id)}
              style={{
                position: 'absolute',
                top: `${item.y}%`,
                left: `${item.x}%`
              }}
              className={`w-18 h-18 md:w-20 md:h-20 rounded-3xl font-black text-4xl md:text-5xl border-4 transition-all duration-300 transform active:scale-95 flex items-center justify-center ${
                isFound
                  ? 'bg-white border-yellow-400 shadow-glow-yellow scale-110 ' + item.color
                  : 'bg-white/80 border-emerald-300 hover:scale-110 shadow-lg text-slate-800 animate-wiggle'
              }`}
            >
              {item.char}
              {isFound && (
                <span className="absolute -top-2 -right-2 text-xl">✨</span>
              )}
            </button>
          );
        })}

        {/* Floating Mascot in Valley */}
        <div className="absolute bottom-6 right-6">
          <LumiMascot
            message="انْقُرْ عَلَى الحُرُوفِ لِتَكْتَشِفَ صَوْتَهَا وَتَجْعَلَ الوَادِيَ يُزْهِر!"
            emotion="happy"
            size="md"
          />
        </div>
      </div>

      {/* Action Footer */}
      <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">الحروف المكتشفة:</span>
          {foundLetters.map(ch => (
            <span key={ch} className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black rounded-xl border border-emerald-300">
              {ch}
            </span>
          ))}
        </div>

        <button
          onClick={() => onSelectLetter('baa')}
          className="game-btn px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-black text-xs md:text-sm"
        >
          <span>انْطَلِقْ لِرِحْلَةِ حَرْفِ البَاءِ 🚀</span>
        </button>
      </div>

    </div>
  );
};
