import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, ArrowRight, RotateCcw, Volume2, Flower } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { speechAnalyzer } from '../../services/speech/SpeechAnalyzer';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot, MascotState } from '../mascot/LumiMascot';
import { Modal } from '../ui/Modal';

export const SpeechGateGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();
  
  const gateSounds = ['بَ', 'بَا', 'بَاب', 'بَطَّة'];
  const [gateIndex, setGateIndex] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [gateOpen, setGateOpen] = useState<boolean>(false);
  const [micVol, setMicVol] = useState<number>(0);
  const [isAllCompleted, setIsAllCompleted] = useState<boolean>(false);
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  
  // Custom Modal State
  const [modalState, setModalState] = useState<{isOpen: boolean, title: string, message: string, type: 'error'|'info'}>({
    isOpen: false, title: '', message: '', type: 'info'
  });

  const currentSound = gateSounds[gateIndex];

  // Cleanup microphone on unmount
  useEffect(() => {
    return () => {
      speechAnalyzer.stopListening();
    };
  }, []);

  const handleOpenGate = () => {
    if (!speechAnalyzer.isSupported()) {
      setModalState({
        isOpen: true,
        title: 'عذراً يا بطل',
        message: 'المُتَصَفِّحُ لَا يَدْعَمُ تَمْيِيزَ الصَّوْت. يُرْجَى اسْتِخْدَامُ Chrome أَوْ Edge.',
        type: 'error'
      });
      return;
    }
    
    setIsListening(true);
    setMascotState('listening');
    soundManager.playPop();

    // Timeout safety
    const timeoutId = setTimeout(() => {
      speechAnalyzer.stopListening();
      setIsListening(false);
      setMascotState('idle');
      setMicVol(0);
      setModalState({
        isOpen: true,
        title: 'أين صوتك؟',
        message: 'لم أتمكن من سماعك بوضوح، حاول الاقتراب من الميكروفون.',
        type: 'info'
      });
    }, 10000); // 10 seconds max

    speechAnalyzer.startListening(
      currentSound,
      (result) => {
        clearTimeout(timeoutId);
        setIsListening(false);
        setMicVol(0);
        if (result.status === 'high_confidence' || result.status === 'acceptable') {
          soundManager.playGateOpen();
          soundManager.playSuccess();
          setGateOpen(true);
          setMascotState('success');
          addStars(2);
          addCoins(10);
        } else {
          soundManager.playEncouragement();
          setMascotState('retry');
          setTimeout(() => setMascotState('idle'), 2000);
        }
      },
      (vol) => setMicVol(vol),
      () => {
        clearTimeout(timeoutId);
        setIsListening(false);
        setMicVol(0);
        if (mascotState === 'listening') setMascotState('idle');
      }
    );
  };

  // Fallback for devices without microphone or when permission is denied
  const handleListenAndAssist = () => {
    audioManager.speak(currentSound, 0.85, () => {
      soundManager.playGateOpen();
      soundManager.playSuccess();
      setGateOpen(true);
      setMascotState('success');
      addStars(1);
      addCoins(5);
    });
  };

  const handleNextGate = () => {
    setGateOpen(false);
    if (gateIndex < gateSounds.length - 1) {
      setGateIndex(prev => prev + 1);
      setMascotState('idle');
    } else {
      setIsAllCompleted(true);
      triggerCelebration();
      addStars(3);
      addCoins(15);
    }
  };

  const handleRestart = () => {
    setGateIndex(0);
    setGateOpen(false);
    setIsAllCompleted(false);
    setMascotState('idle');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6 font-body">
      
      <Modal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({...prev, isOpen: false}))}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />

      <div className="flex items-center justify-between bg-[var(--color-lumi-glass)] backdrop-blur-md p-4 rounded-3xl border-2 border-[var(--color-lumi-secondary)]/50 shadow-lg text-white">
        <div className="flex items-center gap-3">
          <LumiMascot state="idle" size="sm" className="hidden sm:flex" />
          <div>
            <h2 className="text-xl font-display font-black text-[var(--color-lumi-primary)]">إِيقَاظُ الزَّهْرَةِ المُضِيئَة</h2>
            <p className="text-xs text-[var(--color-lumi-neutral)] font-bold">
              اِسْتَخْدِمْ صَوْتَكَ لِتُوقِظَ زَهْرَةَ الحَرْف!
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[var(--color-lumi-base)] text-[var(--color-lumi-neutral)] hover:bg-[var(--color-lumi-secondary)] hover:text-white transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-[var(--color-lumi-base)] p-8 rounded-3xl border-4 border-[var(--color-lumi-secondary)]/30 shadow-2xl text-white text-center space-y-6 relative overflow-hidden">
        
        {/* Forest Night Elements */}
        <div className="absolute top-4 left-6 text-[var(--color-lumi-primary)] animate-pulse text-xl opacity-60">✨</div>
        <div className="absolute top-20 right-12 text-[var(--color-lumi-accent)] animate-pulse text-sm opacity-60">🌿</div>
        <div className="absolute bottom-10 left-16 text-[var(--color-lumi-secondary)] animate-pulse text-lg opacity-60">✦</div>

        {!isAllCompleted ? (
          <>
            <div className="space-y-3 z-10 relative">
              <span className="text-xs font-black text-[var(--color-lumi-primary)] bg-[var(--color-lumi-primary)]/10 px-4 py-2 rounded-full border border-[var(--color-lumi-primary)]/30">
                الزهرة {gateIndex + 1} من {gateSounds.length}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-black text-slate-300 mt-4">
                الكَلِمَةُ النَّائِمَة:
              </h3>
            </div>

            {/* Forest Scene: Lumi & Flower */}
            <div className="relative w-full max-w-md mx-auto h-72 flex flex-col items-center justify-between p-4 z-10">
              
              {/* Top: The Flower */}
              <div className="relative w-40 h-40 flex items-center justify-center transition-all duration-700">
                
                {/* Flower Glow based on mic volume */}
                {!gateOpen && (
                  <div 
                    className="absolute inset-0 bg-[var(--color-lumi-primary)] rounded-full blur-xl transition-all duration-75"
                    style={{ opacity: isListening ? 0.2 + (micVol * 0.8) : 0, transform: `scale(${1 + micVol})` }}
                  />
                )}

                {/* SVG Flower */}
                <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-xl transition-all duration-700 ${
                  gateOpen ? 'scale-125' : (mascotState === 'listening' ? 'scale-105' : 'scale-100')
                }`}>
                  {gateOpen ? (
                     /* Bloomed Flower */
                    <g className="animate-bloom origin-center">
                      <path d="M50 80 Q 20 60 30 30 Q 50 40 50 50" fill="var(--color-lumi-accent)" opacity="0.8" />
                      <path d="M50 80 Q 80 60 70 30 Q 50 40 50 50" fill="var(--color-lumi-accent)" opacity="0.8" />
                      <circle cx="50" cy="45" r="20" fill="var(--color-lumi-primary)" />
                      {/* Petals */}
                      <path d="M 50 25 Q 65 5 80 25 Q 65 45 50 25" fill="var(--color-lumi-secondary)" />
                      <path d="M 50 25 Q 35 5 20 25 Q 35 45 50 25" fill="var(--color-lumi-secondary)" />
                      <path d="M 30 45 Q 5 45 20 65 Q 40 55 30 45" fill="var(--color-lumi-secondary)" />
                      <path d="M 70 45 Q 95 45 80 65 Q 60 55 70 45" fill="var(--color-lumi-secondary)" />
                    </g>
                  ) : (
                    /* Sleeping Bud */
                    <g className={mascotState === 'retry' ? 'animate-gentle-nod' : 'animate-breathe'}>
                      <path d="M50 80 Q 30 60 40 40 Q 50 50 50 60" fill="#065F46" />
                      <path d="M50 80 Q 70 60 60 40 Q 50 50 50 60" fill="#065F46" />
                      <path d="M 40 40 Q 50 20 60 40 Q 50 60 40 40" fill="#4C1D95" />
                    </g>
                  )}
                </svg>
                
                {/* The Word */}
                <div className={`absolute z-10 font-display font-black transition-all duration-700 ${
                  gateOpen ? 'text-slate-900 text-3xl md:text-4xl -translate-y-2' : 'text-slate-300 text-2xl md:text-3xl'
                }`}>
                  {currentSound}
                </div>
              </div>

              {/* Bottom: Lumi Mascot watching/listening */}
              <div className="relative mt-auto">
                <LumiMascot state={mascotState} size="lg" />
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex flex-col items-center gap-4">
              {!gateOpen ? (
                <>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={handleOpenGate}
                      className={`game-btn px-8 py-4 rounded-full font-display font-black text-xl border-2 border-[var(--color-lumi-base)] shadow-lg flex items-center gap-3 transition-all ${
                        isListening
                          ? 'bg-[var(--color-lumi-primary)] text-slate-900 scale-105 animate-glow-pulse'
                          : 'bg-[var(--color-lumi-secondary)] text-white hover:bg-purple-500'
                      }`}
                    >
                      <Mic className="w-7 h-7" />
                      <span>{isListening ? 'جَارِي الاسْتِمَاع...' : 'أَيْقِظْ بِصَوْتِك'}</span>
                    </button>

                    <button
                      onClick={handleListenAndAssist}
                      className="px-5 py-4 rounded-full bg-[var(--color-lumi-glass)] hover:bg-[var(--color-lumi-secondary)]/30 text-[var(--color-lumi-neutral)] hover:text-white border-2 border-[var(--color-lumi-secondary)]/50 font-black text-sm flex items-center gap-2 transition-all active:scale-95"
                      title="اسْتَمِعْ لِلصَّوْتِ مُسَاعَدَةً"
                    >
                      <Volume2 className="w-5 h-5" />
                      <span>مُسَاعَدَة</span>
                    </button>
                  </div>

                  {/* Optional: Remove the discrete bars and rely entirely on the flower glow. 
                      Since user wanted actual visual use of the state, we used it for the flower glow. 
                      We can leave this empty. */}
                </>
              ) : (
                <button
                  onClick={handleNextGate}
                  className="game-btn px-8 py-4 bg-[var(--color-lumi-accent)] text-white rounded-full font-display font-black text-xl hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>الزَّهْرَةُ التَّالِيَة ⬅️</span>
                </button>
              )}
            </div>
          </>
        ) : (
          /* Victory Completion Screen */
          <div className="py-6 flex flex-col items-center justify-center space-y-6 animate-bloom z-10 relative">
            <LumiMascot state="success" size="xl" />
            <h3 className="text-3xl md:text-4xl font-display font-black text-[var(--color-lumi-primary)] drop-shadow-lg">
              أَحْسَنْتَ يَا بَطَل!
            </h3>
            <p className="text-lg text-[var(--color-lumi-neutral)] font-bold max-w-md">
              بِفَضْلِ صَوْتِك، أَزْهَرَتْ كُلُّ النَّبَاتَاتِ وَعَادَ النُّور!
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={handleRestart}
                className="game-btn px-6 py-3.5 bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] rounded-full font-display font-black text-lg shadow-lg flex items-center gap-2 hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                <span>أَيْقِظْهَا مُجَدَّداً</span>
              </button>
              <button
                onClick={onBack}
                className="game-btn px-6 py-3.5 bg-[var(--color-lumi-glass)] border-2 border-[var(--color-lumi-secondary)] text-white rounded-full font-display font-black text-lg hover:bg-[var(--color-lumi-secondary)] flex items-center gap-2"
              >
                <span>العَوْدَةُ لِلْخَرِيطَة</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
