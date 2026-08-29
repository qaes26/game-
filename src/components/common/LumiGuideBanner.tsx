import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Sparkles, VolumeX } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';

interface LumiGuideBannerProps {
  message: string;
  shortHint?: string;
  autoSpeak?: boolean;
  emotion?: 'happy' | 'talking' | 'cheering' | 'listening' | 'excited';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LumiGuideBanner: React.FC<LumiGuideBannerProps> = ({
  message,
  shortHint,
  autoSpeak = true,
  emotion = 'happy',
  size = 'md',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);
  const timerRef = useRef<number | null>(null);

  const handleSpeak = () => {
    if (!message) return;
    audioManager.stop();
    setIsPlaying(true);
    
    audioManager.speak(message, 0.85, () => {
      if (isMountedRef.current) {
        setIsPlaying(false);
      }
    });
  };

  useEffect(() => {
    isMountedRef.current = true;

    if (autoSpeak && message) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        if (isMountedRef.current) {
          handleSpeak();
        }
      }, 250);
    }

    return () => {
      isMountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      audioManager.stop();
    };
  }, [message]);

  const canvasSize = size === 'sm' ? 75 : size === 'lg' ? 110 : 90;

  return (
    <div
      className={`relative z-20 w-full max-w-3xl mx-auto bg-gradient-to-r from-[#0d1b46]/95 via-[#10235e]/95 to-[#0b163a]/95 backdrop-blur-xl rounded-3xl p-3 sm:p-4 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.25)] flex items-center justify-between gap-3 sm:gap-4 select-none ${className}`}
      dir="rtl"
    >
      {/* Living Animated Lumi Character */}
      <div
        onClick={handleSpeak}
        className="relative cursor-pointer group flex-shrink-0 transition-transform active:scale-95"
        title="انقر على لومي لسماع الشرح!"
      >
        <div className="relative">
          <LumiMascot
            state={isPlaying ? 'listening' : (emotion === 'happy' ? 'idle' : 'success')}
            size="md"
          />
          {/* Glowing Ring around Lumi */}
          <div
            className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 ${
              isPlaying
                ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-[#0d1b46] animate-pulse opacity-100'
                : 'opacity-0 group-hover:opacity-100 ring-2 ring-amber-300'
            }`}
          />
        </div>

        {/* Lumi Badge */}
        <div className="absolute -bottom-1 inset-x-0 flex justify-center pointer-events-none">
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full border border-white shadow-md flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5 text-amber-950 fill-amber-950" />
            لُومِي
          </span>
        </div>
      </div>

      {/* Guide Speech Text */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] sm:text-xs font-black text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40 inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-amber-300 text-amber-300" />
            مرشدك السحري لومي يشرح لك:
          </span>
          {shortHint && (
            <span className="hidden sm:inline-block text-[10px] text-cyan-300 font-bold">
              • {shortHint}
            </span>
          )}
        </div>
        <p className="text-white font-extrabold text-xs sm:text-sm md:text-base leading-relaxed tracking-wide">
          {message}
        </p>
      </div>

      {/* Audio Button */}
      <button
        onClick={handleSpeak}
        className={`flex-shrink-0 flex flex-col items-center justify-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border-2 font-black transition-all active:scale-90 shadow-md ${
          isPlaying
            ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 border-white shadow-glow-yellow animate-pulse'
            : 'bg-[#152a6b] text-amber-300 border-amber-400/60 hover:bg-[#1e3c99] hover:text-white'
        }`}
        title="استمع لصوت لومي"
      >
        <Volume2 className={`w-5 h-5 sm:w-6 sm:h-6 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span className="text-[10px] sm:text-[11px] font-black whitespace-nowrap">
          {isPlaying ? 'يَتَحَدَّث...' : 'اسْتَمِعْ 🔊'}
        </span>
      </button>
    </div>
  );
};
