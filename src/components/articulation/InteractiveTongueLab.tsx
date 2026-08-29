import React, { useState } from 'react';
import { ArrowRight, Volume2, Sparkles, Star, Crown, CheckCircle2 } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { ARABIC_LETTERS } from '../../data/letters';
import { ChildFriendlyMouthGuide } from './ChildFriendlyMouthGuide';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

interface InteractiveTongueLabProps {
  onBack: () => void;
}

export const InteractiveTongueLab: React.FC<InteractiveTongueLabProps> = ({ onBack }) => {
  const { childName, selectedLetterId, setSelectedLetterId } = useGame();
  
  const currentLetter =
    ARABIC_LETTERS.find((l) => l.id === selectedLetterId) || ARABIC_LETTERS[1];

  const handleSelectLetter = (letterId: string) => {
    audioManager.playClick();
    setSelectedLetterId(letterId);
    const l = ARABIC_LETTERS.find((x) => x.id === letterId);
    if (l) {
      audioManager.speak(`مَخْرَجُ حَرْفِ ${l.nameAr}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060a17] via-[#0a1435] to-[#060a17] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-hidden pb-24">
      
      {/* Background Radiance */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border-3 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        <button
          onClick={() => {
            audioManager.playClick();
            onBack();
          }}
          className="p-3 rounded-2xl bg-[#132252] border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-950/50 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-2 font-black text-xs"
        >
          <ArrowRight className="w-5 h-5" />
          <span>الرُّجُوعُ لِلرِّحْلَة</span>
        </button>

        <div className="text-center sm:text-right">
          <h1 className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-cyan-200 to-white flex items-center gap-2">
            <span>فِيدْيُو وَمُخْتَبَرُ النُّطْقِ المَرْئِيّ 👩‍🏫</span>
          </h1>
          <p className="text-xs text-cyan-200 font-bold hidden sm:block">
            تَعَلَّمْ مَخَارِجَ الحُرُوفِ مَعَ المُعَلِّمَةِ سَارَة وَمِرْآةِ الفَمِ المُتَحَرِّكَة
          </p>
        </div>
      </header>

      {/* Main Content Arena */}
      <main className="relative z-10 max-w-5xl mx-auto w-full my-auto space-y-5 py-4">
        
        {/* Lumi Voice Guide Banner */}
        <LumiGuideBanner
          message={`مُخْتَبَرُ النُّطْقِ وَالمِرْآةِ يَا ${childName || 'البَطَل'}! شَاهِدِ المُعَلِّمَةَ سَارَة كَيْفَ يَتَحَرَّكُ اللِّسَانُ وَالشَّفَتَانِ لِنُطْقِ حَرْفِ (${currentLetter.char})، وَافْتَحِ المِرْآةَ لِتُجَرِّبَ بِنَفْسِك!` }
          shortHint="شَاهِدْ وَقَلِّدِ النُّطْق"
          autoSpeak={true}
          emotion="happy"
        />

        {/* 28 Letters Horizontal Bar */}
        <div className="bg-[#0b1638]/80 backdrop-blur-md p-3 rounded-2xl border border-blue-900">
          <div className="flex items-center justify-between mb-1 px-1 text-xs font-black text-cyan-300">
            <span>اخْتَرِ الحَرْفَ لِمُشَاهَدَةِ فِيدْيُو النُّطْق:</span>
            <span className="text-amber-300 font-extrabold">{currentLetter.nameAr} ({currentLetter.char})</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {ARABIC_LETTERS.map((ltr) => {
              const isSelected = ltr.id === currentLetter.id;
              return (
                <button
                  key={ltr.id}
                  onClick={() => handleSelectLetter(ltr.id)}
                  className={`flex-shrink-0 w-10 h-11 rounded-2xl font-black text-base flex items-center justify-center transition-all active:scale-90 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-600 text-slate-950 border-2 border-white shadow-glow-cyan scale-110'
                      : 'bg-[#101c44] text-white border border-blue-900 hover:border-cyan-400/60'
                  }`}
                >
                  {ltr.char}
                </button>
              );
            })}
          </div>
        </div>

        {/* Kid Friendly Mouth Guide (Simplified) */}
        <ChildFriendlyMouthGuide
          letter={currentLetter}
        />

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-xs text-cyan-200/70 font-bold py-2">
        <span>LUMI — مُخْتَبَرُ النُّطْقِ وَالمِرْآةِ التَّعْلِيمِيَّة</span>
      </footer>

    </div>
  );
};
