import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

export type MascotState = 'idle' | 'listening' | 'success' | 'retry' | 'talking';

interface LumiMascotProps {
  state?: MascotState;
  emotion?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
  autoSpeak?: boolean;
}

export const LumiMascot: React.FC<LumiMascotProps> = ({ 
  state = 'idle', 
  className = '',
  size = 'md',
  message,
  autoSpeak = true
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleSpeak = () => {
    if (!message) return;
    setIsSpeaking(true);
    audioManager.speak(message, 0.85, () => setIsSpeaking(false));
  };

  useEffect(() => {
    if (message && autoSpeak) {
      const timer = setTimeout(() => handleSpeak(), 350);
      return () => clearTimeout(timer);
    }
  }, [message, autoSpeak]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  const getAnimationClass = () => {
    switch (state) {
      case 'idle': return 'animate-breathe';
      case 'listening': return 'animate-glow-pulse';
      case 'success': return 'animate-bloom';
      case 'retry': return 'animate-gentle-nod';
      default: return 'animate-breathe';
    }
  };

  // SVGs are drawn inline using the new Lumi colors
  // Lumi is a cute little sound wave ghost/sprite
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div 
        className={`relative flex items-center justify-center flex-shrink-0 cursor-pointer ${sizeClasses[size]}`}
        onClick={handleSpeak}
      >
      {state === 'listening' && (
        <div className="absolute inset-0 rounded-full border-4 border-[var(--color-lumi-primary)] animate-ping opacity-20" />
      )}
      
      {state === 'success' && (
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 text-[var(--color-lumi-primary)] text-xl animate-ping">✨</div>
          <div className="absolute bottom-0 left-0 text-[var(--color-lumi-primary)] text-2xl animate-pulse">🌟</div>
        </div>
      )}

      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full drop-shadow-xl transition-all duration-300 ${getAnimationClass()}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lumi Body (Light Sprite) */}
        <path
          d="M 50 10 C 25 10 15 35 15 60 C 15 80 25 90 35 85 C 40 82 45 88 50 85 C 55 88 60 82 65 85 C 75 90 85 80 85 60 C 85 35 75 10 50 10 Z"
          fill={state === 'retry' ? 'var(--color-lumi-neutral)' : 'var(--color-lumi-primary)'}
        />
        <path
          d="M 50 15 C 30 15 22 35 22 60 C 22 75 30 82 37 78 C 42 75 46 80 50 78 C 54 80 58 75 63 78 C 70 82 78 75 78 60 C 78 35 70 15 50 15 Z"
          fill="#FFF"
          fillOpacity="0.4"
        />

        {/* Eyes */}
        <circle cx="35" cy="45" r={state === 'success' ? "6" : "5"} fill="#1E293B" />
        <circle cx="65" cy="45" r={state === 'success' ? "6" : "5"} fill="#1E293B" />
        
        {/* Eye highlights */}
        <circle cx="33" cy="43" r="2" fill="white" />
        <circle cx="63" cy="43" r="2" fill="white" />

        {/* Mouth depending on state */}
        {state === 'idle' && (
          <path d="M 45 55 Q 50 60 55 55" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        )}
        {state === 'listening' && (
          <circle cx="50" cy="57" r="4" fill="#1E293B" />
        )}
        {state === 'success' && (
          <path d="M 40 55 Q 50 70 60 55 Z" fill="#1E293B" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
        )}
        {state === 'retry' && (
          <path d="M 45 58 Q 50 55 55 58" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Listening Ear / Hand */}
        {state === 'listening' && (
          <path d="M 85 45 C 95 35 95 65 85 55" stroke="var(--color-lumi-primary)" strokeWidth="4" strokeLinecap="round" fill="none" />
        )}

        {/* Cheeks */}
        {(state === 'success' || state === 'idle') && (
          <>
            <circle cx="25" cy="52" r="4" fill="#F472B6" opacity="0.6" />
            <circle cx="75" cy="52" r="4" fill="#F472B6" opacity="0.6" />
          </>
        )}
      </svg>
      </div>

      {message && (
        <div className="relative max-w-sm bg-[#0a1538]/95 backdrop-blur-2xl rounded-3xl p-4 border-2 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.35)] transition-all z-10">
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-amber-400/80" />
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-[#0a1538]" />

          <div className="flex items-start gap-2.5">
            <p className="text-amber-100 font-extrabold text-xs md:text-sm leading-relaxed flex-1">
              {message}
            </p>

            <button
              onClick={handleSpeak}
              className={`p-2 rounded-2xl bg-[#14265c] text-amber-300 border border-amber-400/50 hover:bg-[#1f3b8c] transition-all flex-shrink-0 active:scale-90 ${
                isSpeaking ? 'animate-pulse bg-amber-400 text-slate-950 shadow-glow-yellow' : ''
              }`}
              title="اسْتَمِعْ لِصَوْتِ لُومِي"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
