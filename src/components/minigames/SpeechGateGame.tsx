import React, { useState } from 'react';
import { Mic, Lock, Unlock, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { speechAnalyzer } from '../../services/speech/SpeechAnalyzer';

export const SpeechGateGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();
  
  const gateSounds = ['بَ', 'بَا', 'بَاب', 'بَطَّة'];
  const [gateIndex, setGateIndex] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [gateOpen, setGateOpen] = useState<boolean>(false);
  const [micVol, setMicVol] = useState<number>(0);

  const currentSound = gateSounds[gateIndex];

  const handleOpenGate = () => {
    setIsListening(true);
    soundManager.playPop();

    speechAnalyzer.startListening(
      currentSound,
      (result) => {
        setIsListening(false);
        if (result.status === 'high_confidence' || result.status === 'acceptable') {
          soundManager.playGateOpen();
          soundManager.playSuccess();
          setGateOpen(true);
          addStars(2);
          addCoins(10);
        } else {
          soundManager.playEncouragement();
        }
      },
      (vol) => setMicVol(vol),
      () => setIsListening(false)
    );
  };

  const handleNextGate = () => {
    setGateOpen(false);
    if (gateIndex < gateSounds.length - 1) {
      setGateIndex(prev => prev + 1);
    } else {
      triggerCelebration();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6">
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-purple-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏰</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ بَوَّابَةِ النُّطْق</h2>
            <p className="text-xs text-slate-500 font-bold">
              قُلْ كَلِمَةَ السِّرِّ بِصَوْتِكَ لِتَفْتَحَ البَوَّابَةَ السِّحْرِيَّة!
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

      <div className="bg-gradient-to-b from-indigo-900 via-purple-900 to-slate-900 p-8 rounded-3xl border-4 border-purple-400 shadow-card-pop text-white text-center space-y-6 relative overflow-hidden">
        
        {/* Magical Stars Background */}
        <div className="absolute top-4 left-6 text-yellow-300 animate-pulse text-2xl">✨</div>
        <div className="absolute top-10 right-12 text-yellow-300 animate-pulse text-xl">🌟</div>

        <div className="space-y-2">
          <span className="text-xs font-black text-purple-200 bg-purple-800/80 px-3 py-1 rounded-full border border-purple-600">
            البوابة السحرية {gateIndex + 1} من {gateSounds.length}
          </span>
          <h3 className="text-2xl md:text-3xl font-black mt-2">
            كَلِمَةُ السِّرِّ لِفَتْحِ البَوَّابَة:
          </h3>
          <div className="text-5xl md:text-6xl font-black text-amber-300 tracking-wider animate-float">
            ({currentSound})
          </div>
        </div>

        {/* Castle Gate Animation Representation */}
        <div className="relative w-64 h-56 mx-auto bg-slate-800 rounded-t-full border-4 border-amber-400 p-3 shadow-glow-yellow flex items-center justify-center overflow-hidden">
          {/* Left Door */}
          <div
            className={`absolute top-0 left-0 w-1/2 h-full bg-amber-900 border-r-2 border-amber-400 flex items-center justify-end pr-2 transition-transform duration-1000 ${
              gateOpen ? 'translate-x-[-100%]' : 'translate-x-0'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-amber-400 shadow" />
          </div>

          {/* Right Door */}
          <div
            className={`absolute top-0 right-0 w-1/2 h-full bg-amber-900 border-l-2 border-amber-400 flex items-center justify-start pl-2 transition-transform duration-1000 ${
              gateOpen ? 'translate-x-[100%]' : 'translate-x-0'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-amber-400 shadow" />
          </div>

          {/* Treasure Inside when Open */}
          {gateOpen ? (
            <div className="text-6xl animate-bounce">💎</div>
          ) : (
            <div className="text-4xl text-amber-300 z-10">
              <Lock className="w-10 h-10" />
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex flex-col items-center gap-3">
          {!gateOpen ? (
            <>
              <button
                onClick={handleOpenGate}
                className={`game-btn px-8 py-4 rounded-full font-black text-base md:text-lg border-2 border-white shadow-glow-yellow flex items-center gap-2 transition-transform active:scale-95 ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 hover:scale-105'
                }`}
              >
                <Mic className="w-6 h-6" />
                <span>{isListening ? '🎙️ تَحَدَّثْ الآن...' : 'اضْغَطْ وَانْطِقْ: ' + currentSound}</span>
              </button>

              {isListening && (
                <div className="flex items-center gap-1.5 h-6">
                  {[0.4, 0.8, 0.5, 0.9, 0.3].map((h, i) => (
                    <div
                      key={i}
                      className="w-1.5 bg-yellow-400 rounded-full speech-bar"
                      style={{ height: `${Math.max(20, (micVol || h) * 100)}%` }}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            <button
              onClick={handleNextGate}
              className="game-btn px-8 py-4 bg-emerald-500 text-white rounded-2xl font-black text-base shadow-glow-green"
            >
              <Sparkles className="w-5 h-5" />
              <span>فُتِحَتِ البَوَّابَة! انْتَقِل لِلتَّالِيَة ⬅️</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
};
