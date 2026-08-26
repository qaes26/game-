import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, MessageCircle } from 'lucide-react';
import { soundManager } from '../../services/audio/SoundManager';
import { useGame } from '../../context/GameContext';

interface LoulouMascotProps {
  message?: string;
  emotion?: 'happy' | 'talking' | 'cheering' | 'listening' | 'thinking';
  size?: 'sm' | 'md' | 'lg';
  autoSpeak?: boolean;
  onMascotClick?: () => void;
}

export const LoulouMascot: React.FC<LoulouMascotProps> = ({
  message = 'أَهْلًا يَا بَطَلْ! هَلْ نَبْدَأُ مُغَامَرَتَنَا فِي مَدِينَةِ الأَصْوَاتِ؟',
  emotion = 'happy',
  size = 'md',
  autoSpeak = false,
  onMascotClick
}) => {
  const { isVisualMode } = useGame();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [blink, setBlink] = useState(false);

  // Automatic blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Speak message when triggered or auto-speak
  const handleSpeak = () => {
    if (!message) return;
    setIsSpeaking(true);
    soundManager.speak(message, 0.85, () => {
      setIsSpeaking(false);
    });
  };

  useEffect(() => {
    if (autoSpeak && message) {
      const timer = setTimeout(() => {
        handleSpeak();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [message, autoSpeak]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 md:w-28 md:h-28',
    lg: 'w-32 h-32 md:w-40 md:h-40'
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Interactive Mascot Avatar */}
      <div
        onClick={() => {
          handleSpeak();
          if (onMascotClick) onMascotClick();
        }}
        className={`relative ${sizeClasses[size]} cursor-pointer group flex-shrink-0 transition-transform duration-200 active:scale-95`}
        title="اضغط على لولو للتحدث"
      >
        {/* Glow halo */}
        <div className={`absolute inset-0 bg-yellow-300/40 rounded-full blur-lg group-hover:blur-xl transition-all ${isSpeaking ? 'animate-pulse scale-110' : ''}`} />

        {/* Loulou Cute Animated Creature SVG */}
        <div className={`relative w-full h-full rounded-full bg-gradient-to-tr from-sky-400 via-sky-300 to-indigo-300 p-1 border-4 border-white shadow-card-pop transition-transform duration-300 ${isSpeaking ? 'animate-bounce' : 'animate-float'}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Cute Ears */}
            <circle cx="26" cy="24" r="14" fill="#38bdf8" stroke="#ffffff" strokeWidth="3" />
            <circle cx="26" cy="24" r="7" fill="#f472b6" />
            <circle cx="74" cy="24" r="14" fill="#38bdf8" stroke="#ffffff" strokeWidth="3" />
            <circle cx="74" cy="24" r="7" fill="#f472b6" />

            {/* Face Body */}
            <ellipse cx="50" cy="54" rx="38" ry="34" fill="#60a5fa" />
            <ellipse cx="50" cy="56" rx="34" ry="30" fill="#bae6fd" />

            {/* Cheeks */}
            <ellipse cx="28" cy="62" rx="6" ry="4" fill="#f472b6" opacity="0.8" />
            <ellipse cx="72" cy="62" rx="6" ry="4" fill="#f472b6" opacity="0.8" />

            {/* Big Expressive Eyes */}
            {blink ? (
              <>
                <path d="M 32 50 Q 40 56 46 50" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 54 50 Q 60 56 68 50" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Left Eye */}
                <ellipse cx="38" cy="48" rx="7" ry="9" fill="#0f172a" />
                <circle cx="36" cy="45" r="3" fill="#ffffff" />
                <circle cx="40" cy="51" r="1.5" fill="#ffffff" />

                {/* Right Eye */}
                <ellipse cx="62" cy="48" rx="7" ry="9" fill="#0f172a" />
                <circle cx="60" cy="45" r="3" fill="#ffffff" />
                <circle cx="64" cy="51" r="1.5" fill="#ffffff" />
              </>
            )}

            {/* Little Cute Nose */}
            <polygon points="50,56 47,59 53,59" fill="#38bdf8" />

            {/* Animated Talking / Smiling Mouth */}
            {isSpeaking || emotion === 'talking' ? (
              <ellipse cx="50" cy="66" rx="7" ry="6" fill="#e11d48" className="animate-pulse">
                <ellipse cx="50" cy="67" rx="4" ry="3" fill="#f43f5e" />
              </ellipse>
            ) : emotion === 'cheering' ? (
              <path d="M 40 63 Q 50 75 60 63 Z" fill="#e11d48" stroke="#be123c" strokeWidth="1" />
            ) : (
              <path d="M 42 63 Q 50 70 58 63" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}

            {/* Little Star Badge on Head */}
            <polygon points="50,22 52,27 57,28 53,31 54,36 50,33 46,36 47,31 43,28 48,27" fill="#fbbf24" stroke="#ffffff" strokeWidth="1" />
          </svg>
        </div>

        {/* Mascot Name Badge */}
        <div className="absolute -bottom-2 inset-x-0 flex justify-center">
          <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-extrabold text-xs px-2.5 py-0.5 rounded-full border-2 border-white shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-100" />
            لُولُو
          </span>
        </div>
      </div>

      {/* Interactive Speech Bubble */}
      {message && (
        <div className={`relative max-w-md bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl p-3.5 md:p-4 border-2 md:border-3 ${isVisualMode ? 'border-sky-500 shadow-glow-cyan' : 'border-sky-300 shadow-card-pop'} transition-all`}>
          {/* Arrow pointing to mascot */}
          <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-sky-300" />
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-6 border-l-white" />

          <div className="flex items-start gap-2.5">
            <p className="text-slate-800 font-bold text-sm md:text-base leading-relaxed flex-1">
              {message}
            </p>

            {/* Audio Replay Button */}
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors flex-shrink-0 ${isSpeaking ? 'animate-pulse bg-sky-300' : ''}`}
              title="استمع إلى لولو"
            >
              <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Visual Mode Subtitle Cue */}
          {isVisualMode && (
            <div className="mt-2 pt-2 border-t border-sky-100 flex items-center justify-between text-xs text-sky-600 font-medium">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5 text-sky-500" />
                وضع المساعدة البصرية نشط
              </span>
              <span className="bg-sky-100 px-2 py-0.5 rounded-full font-bold">بصري 👁️</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
