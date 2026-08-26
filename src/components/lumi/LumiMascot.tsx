import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LivingLumiCanvas } from './LivingLumiCanvas';

interface LumiMascotProps {
  message?: string;
  emotion?: 'happy' | 'talking' | 'cheering' | 'listening' | 'excited';
  size?: 'sm' | 'md' | 'lg';
  autoSpeak?: boolean;
  onLumiClick?: () => void;
}

export const LumiMascot: React.FC<LumiMascotProps> = ({
  message = 'مَرْحَبًا! أَنَا لُومِي.. هَيَّا نَسْتَكْشِفُ مَعًا عَالَمَ الأَصْوَاتِ السَّاحِر!',
  emotion = 'happy',
  size = 'md',
  autoSpeak = false,
  onLumiClick
}) => {
  const { childName } = useGame();
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleSpeak = () => {
    if (!message) return;
    setIsSpeaking(true);
    audioManager.speak(message, 0.85, () => setIsSpeaking(false));
  };

  useEffect(() => {
    if (autoSpeak && message) {
      const timer = setTimeout(() => handleSpeak(), 350);
      return () => clearTimeout(timer);
    }
  }, [message, autoSpeak]);

  const canvasPixelSize = size === 'sm' ? 84 : size === 'lg' ? 150 : 115;

  return (
    <div className="flex items-center gap-3 select-none">
      
      {/* 60FPS Living Animated Lumi Character Canvas */}
      <div
        onClick={() => {
          handleSpeak();
          if (onLumiClick) onLumiClick();
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative cursor-pointer group flex-shrink-0 transition-transform duration-300 ${
          isHovered ? 'scale-108' : ''
        }`}
        title="اضغط على لومي للتحدث وسماع الصوت!"
      >
        {/* Living Animated Canvas Character */}
        <LivingLumiCanvas
          isSpeaking={isSpeaking}
          emotion={emotion}
          size={canvasPixelSize}
          interactive={true}
        />

        {/* Lumi Shiny Golden Name Badge */}
        <div className="absolute -bottom-1.5 inset-x-0 flex justify-center pointer-events-none">
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-[11px] px-3 py-0.5 rounded-full border-2 border-white shadow-[0_4px_15px_rgba(0,0,0,0.5)] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-900 fill-amber-900" />
            لُومِي
          </span>
        </div>
      </div>

      {/* Magical Speech Bubble */}
      {message && (
        <div className="relative max-w-sm bg-[#0a1538]/95 backdrop-blur-2xl rounded-3xl p-4 border-2 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.35)] transition-all">
          {/* Bubble Pointer Tail */}
          <div className="absolute top-1/2 -right-3 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-amber-400/80" />
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-6 border-l-[#0a1538]" />

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
