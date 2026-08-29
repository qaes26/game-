import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

import { ARABIC_LETTERS } from '../../data/letters';

export const ValleyOfLettersWorld: React.FC<{
  onBack: () => void;
  onSelectLetter?: (letterId: string) => void;
}> = ({ onBack, onSelectLetter }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration, selectedLetterId } = useGame();

  const letterData = ARABIC_LETTERS.find(l => l.id === selectedLetterId) || ARABIC_LETTERS[1];
  
  const allSyllables = [
    ...letterData.syllables.short.map(s => s.syl),
    ...letterData.syllables.long.map(s => s.syl)
  ];

  const lettersInValley = [
    { id: '1', char: allSyllables[0] || letterData.char, x: 20, y: 35, color: 'text-amber-500' },
    { id: '2', char: allSyllables[1] || letterData.char, x: 45, y: 25, color: 'text-sky-500' },
    { id: '3', char: allSyllables[2] || letterData.char, x: 70, y: 35, color: 'text-emerald-500' },
    { id: '4', char: allSyllables[3] || letterData.char, x: 30, y: 65, color: 'text-rose-500' },
    { id: '5', char: allSyllables[4] || letterData.char, x: 55, y: 55, color: 'text-purple-500' },
    { id: '6', char: allSyllables[5] || letterData.char, x: 80, y: 65, color: 'text-cyan-500' }
  ];

  const [foundLetters, setFoundLetters] = useState<string[]>([]);

  const handleSpotLetter = (char: string, letterId: string) => {
    audioManager.playBloom();
    audioManager.speak(char);

    if (!foundLetters.includes(char)) {
      const newFound = [...foundLetters, char];
      setFoundLetters(newFound);
      addStars(1);
      addCoins(5);

      if (newFound.length === lettersInValley.length) {
        triggerVictoryCelebration();
        audioManager.speak(`مُمْتَازٌ يَا ${childName || 'البَطَل'}! اكْتَشَفْتَ جَمِيعَ حُرُوفِ الوَادِي السَّاحِر!`);
      }
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
              <span>🏞️ وَادِي الحُرُوفِ السَّاحِر</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              ابْحَثْ عَنِ الحُرُوفِ الطَّافِيَةِ فِي الوَادِي وَانْقُرْ عَلَيْهَا لِسَمَاعِ صَوْتِهَا!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-2xl border-2 border-emerald-300">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span className="font-black text-emerald-900 text-sm">{foundLetters.length} / {lettersInValley.length}</span>
        </div>
      </div>

      {/* Lumi Guide Banner */}
      <LumiGuideBanner
        message={`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'} فِي وَادِي الحُرُوفِ السَّاحِر! انْقُرْ عَلَى الأَحْجَارِ الطَّافِيَةِ لِتَسْتَمِعَ لِصَوْتِ الحُرُوفِ وَتَجْعَلَ الوَادِيَ يُزْهِر!` }
        shortHint="انْقُرْ عَلَى الحُرُوف"
        autoSpeak={true}
        emotion="happy"
      />

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
        {Array.from({ length: foundLetters.length * 3 }).map((_, i) => (
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

        {/* Local letter selection removed as per global letter feature */}
      </div>

    </div>
  );
};
