import React, { useEffect, useState } from 'react';
import { audioManager } from '../../audio/AudioManager';
import { Sparkles, ArrowLeft, Volume2, Star } from 'lucide-react';
import { LivingLumiCanvas } from '../lumi/LivingLumiCanvas';

interface CinematicIntroSceneProps {
  onStartJourney: () => void;
}

export const CinematicIntroScene: React.FC<CinematicIntroSceneProps> = ({ onStartJourney }) => {
  const [dialogueStep, setDialogueStep] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const dialogueLines = [
    'مَرْحَبًا.. أَنَا لُومِي! هَيَّا نَسْتَكْشِفُ مَعًا عَوَالِمَ الأَصْوَاتِ السَّاحِرَة!',
    'هَذَا العَالَمُ الأَسْطُورِيُّ فَقَدَ أَصْوَاتَهُ البَرَّاقَة...',
    'هَلْ تُسَاعِدُنِي فِي إِعَادَتِهَا مَعًا لِنَبْدَأَ رِحْلَتَنَا المَلَكِيَّة؟'
  ];

  useEffect(() => {
    setIsSpeaking(true);
    audioManager.speak(dialogueLines[dialogueStep], 0.85, () => setIsSpeaking(false));
  }, [dialogueStep]);

  const handleNextDialogue = () => {
    audioManager.playClick();
    if (dialogueStep < dialogueLines.length - 1) {
      setDialogueStep((prev) => prev + 1);
    } else {
      audioManager.playPortal();
      onStartJourney();
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#050814] overflow-hidden select-none flex flex-col justify-between">
      
      {/* Hyper-Realistic 8K Cinematic Cosmic Observatory Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/lumi/cinematic_portal_bg.jpg"
          alt="Cinematic Observatory Background"
          className="w-full h-full object-cover object-center filter brightness-95 scale-105 animate-pulse-slow"
        />
        {/* Atmosphere Vignette & Lighting Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-[#050814]/70" />
        <div className="absolute inset-0 bg-radial-vignette opacity-55 pointer-events-none" />
      </div>

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-amber-300 rounded-full animate-ping opacity-80" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-cyan-300 rounded-full animate-pulse opacity-90 shadow-glow-cyan" />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce opacity-75" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 p-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#09112a]/90 backdrop-blur-2xl px-5 py-2.5 rounded-full border-2 border-amber-400/50 text-amber-200 text-xs font-black shadow-[0_0_30px_rgba(245,158,11,0.35)]">
          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin-slow" />
          <span>LUMI — مَمْلَكَةُ الأَصْوَاتِ الأَسْطُورِيَّة</span>
        </div>
      </div>

      {/* Center 60FPS Living Animated Lumi Character Hero */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <div
          className="relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
          onClick={() => {
            setIsSpeaking(true);
            audioManager.playVictory();
            audioManager.speak(dialogueLines[dialogueStep], 0.85, () => setIsSpeaking(false));
          }}
          title="انقر على لومي للتحدث!"
        >
          {/* Animated 60FPS Living Mascot Canvas */}
          <LivingLumiCanvas
            isSpeaking={isSpeaking}
            emotion={dialogueStep === 0 ? 'happy' : 'cheering'}
            size={220}
            interactive={true}
          />

          <div className="absolute -bottom-2 inset-x-0 flex justify-center pointer-events-none">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-xs px-4 py-1 rounded-full border-2 border-white shadow-xl flex items-center gap-1.5 animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-amber-950 fill-amber-950" />
              لُومِي (LUMI) 🌟
            </span>
          </div>
        </div>
      </div>

      {/* Cinematic Dialogue Box & Action */}
      <div className="relative z-10 pb-10 px-4 max-w-lg mx-auto w-full text-center space-y-4">
        
        {/* Dialogue Card */}
        <div className="bg-[#091330]/95 backdrop-blur-2xl p-5 md:p-6 rounded-3xl border-3 border-amber-400/90 shadow-[0_0_50px_rgba(245,158,11,0.4)] space-y-3 transform transition-all duration-500 animate-pop">
          <p className="text-lg md:text-xl font-black text-amber-100 leading-relaxed drop-shadow-md">
            {dialogueLines[dialogueStep]}
          </p>

          <div className="flex items-center justify-center gap-1.5 pt-1">
            {dialogueLines.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  dialogueStep === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleNextDialogue}
            className="group relative px-10 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 rounded-2xl font-black text-lg border-2 border-white shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <span>{dialogueStep < dialogueLines.length - 1 ? 'مُتَابَعَة' : 'ابْدَأِ الرِّحْلَة 🚀'}</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
};
