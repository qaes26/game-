import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Volume2, Shield, Compass, BookOpen, Star, Crown, Flame } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';
import { VoiceSettingsModal } from '../common/VoiceSettingsModal';

interface CleanMainMenuProps {
  onGoToLetters: () => void;
  onGoToWorlds: () => void;
  onGoToMirror: () => void;
  onGoToParent: () => void;
  onQuickStartBaa: () => void;
}

export const CleanMainMenu: React.FC<CleanMainMenuProps> = ({
  onGoToLetters,
  onGoToWorlds,
  onGoToMirror,
  onGoToParent,
  onQuickStartBaa
}) => {
  const { childName, stars, coins, streak } = useGame();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060a17] via-[#0a1435] to-[#060a17] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-hidden">
      
      {/* Royal Gold & Celestial Blue Glow Background */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Magic Accents */}
      <div className="absolute top-16 left-12 text-2xl animate-float opacity-80">👑</div>
      <div className="absolute top-28 right-16 text-3xl animate-float opacity-80" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-24 right-20 text-3xl animate-float opacity-80" style={{ animationDelay: '2s' }}>⭐</div>

      {/* Top Header: Child Greeting & Royal Stats */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border-3 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-blue-600 border-3 border-white shadow-glow-yellow flex items-center justify-center text-3xl">
            👑
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-white">
              أَهْلًا يَا {childName || 'البَطَل'}! ✨
            </h1>
            <p className="text-xs text-cyan-200 font-bold">
              مَمْلَكَةُ الأَصْوَاتِ السَّاحِرَةِ بِانْتِظَارِك!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Royal Stars */}
          <div className="flex items-center gap-1.5 bg-amber-500/25 text-amber-300 px-4 py-2 rounded-2xl border-2 border-amber-400 font-black text-xs md:text-sm shadow-glow-yellow">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin-slow" />
            <span>{stars}</span>
            <span className="text-[11px] text-amber-200">نجمة</span>
          </div>

          {/* Neural Voice Switcher */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="p-2.5 rounded-2xl bg-[#132252] border-2 border-amber-400/60 text-amber-300 hover:bg-amber-950/50 transition-all shadow-md flex items-center gap-1.5 text-xs font-black active:scale-95"
            title="صوت الفتاة (Microsoft Neural)"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">صوت الفتاة 🎙️</span>
          </button>

          {/* Parent Mode */}
          <button
            onClick={() => {
              audioManager.playClick();
              onGoToParent();
            }}
            className="p-2.5 rounded-2xl bg-[#132252] border border-blue-500/40 text-blue-200 hover:bg-blue-900/50 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold active:scale-95"
            title="بوابة ولي الأمر والمعالج"
          >
            <Shield className="w-4 h-4 text-blue-300" />
            <span className="hidden sm:inline">ولي الأمر</span>
          </button>
        </div>
      </header>

      {/* Main Center Area: 3 Big Royal Joyful Cards */}
      <main className="relative z-10 max-w-4xl mx-auto w-full my-auto py-8 space-y-6">
        
        {/* Joyful Mascot Speech */}
        <div className="flex justify-center">
          <LumiMascot
            message={`أَهْلًا يَا ${childName || 'البَطَل'}! هَيَّا نَبْدَأُ رِحْلَةَ الحُرُوفِ السَّاحِرَةِ وَنَكْتَشِفُ أَجْمَلَ الأَصْوَاتِ مَعًا!` }
            emotion="happy"
            size="md"
          />
        </div>

        {/* 3 Prominent Royal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          
          {/* Card 1: 28 Letters Journey (Royal Gold & Cyan) */}
          <button
            onClick={() => {
              audioManager.playPortal();
              onGoToLetters();
            }}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#162758] to-[#0b1638] border-3 border-amber-400/80 hover:border-yellow-300 hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] transition-all duration-300 hover:-translate-y-2 text-right flex flex-col justify-between min-h-[270px] active:scale-95 shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-3xl font-black text-slate-950 border-2 border-white shadow-glow-yellow group-hover:scale-110 transition-transform">
              🔤
            </div>

            <div className="space-y-1.5 my-3">
              <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-300 to-yellow-400 px-3 py-0.5 rounded-full border border-white font-black">
                28 حَرْفًا كَامِلَة • مَفْتُوحَة 🔓
              </span>
              <h2 className="text-2xl font-black text-white group-hover:text-amber-200 transition-colors">
                رِحْلَةُ الحُرُوف
              </h2>
              <p className="text-xs text-blue-100 font-bold leading-relaxed">
                اخْتَرْ أَيَّ حَرْفٍ وَتَدَرَّجْ فِي نُطْقِ المَقَاطِعِ وَالكَلِمَاتِ وَالجُمَل!
              </p>
            </div>

            <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs font-black text-amber-300">
              <span>ابْدَأِ الرِّحْلَة</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: 8 Living Worlds */}
          <button
            onClick={() => {
              audioManager.playPortal();
              onGoToWorlds();
            }}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#113a52] to-[#0b1638] border-3 border-cyan-400/80 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all duration-300 hover:-translate-y-2 text-right flex flex-col justify-between min-h-[270px] active:scale-95 shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-400 to-indigo-600 flex items-center justify-center text-3xl font-black text-white border-2 border-white shadow-glow-cyan group-hover:scale-110 transition-transform">
              🗺️
            </div>

            <div className="space-y-1.5 my-3">
              <span className="text-xs font-black text-cyan-950 bg-gradient-to-r from-cyan-300 to-sky-300 px-3 py-0.5 rounded-full border border-white font-black">
                8 عَوَالِمَ مَلَكِيَّة 🏰
              </span>
              <h2 className="text-2xl font-black text-white group-hover:text-cyan-200 transition-colors">
                خَرِيطَةُ العَوَالِم
              </h2>
              <p className="text-xs text-cyan-100 font-bold leading-relaxed">
                اسْتَكْشِفْ وادِي الحُرُوف، غَابَةَ المَقَاطِع، مَجَرَّةَ الفَضَاءِ، وَالمَزِيد!
              </p>
            </div>

            <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs font-black text-cyan-300">
              <span>اسْتَكْشِفِ العَوَالِم</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Mouth & Articulation Mirror */}
          <button
            onClick={() => {
              audioManager.playClick();
              onGoToMirror();
            }}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#2a1752] to-[#0b1638] border-3 border-purple-400/80 hover:border-pink-300 hover:shadow-[0_0_35px_rgba(217,70,239,0.4)] transition-all duration-300 hover:-translate-y-2 text-right flex flex-col justify-between min-h-[270px] active:scale-95 shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-400 via-pink-400 to-rose-600 flex items-center justify-center text-3xl font-black text-white border-2 border-white shadow-glow-pink group-hover:scale-110 transition-transform">
              🪞
            </div>

            <div className="space-y-1.5 my-3">
              <span className="text-xs font-black text-purple-950 bg-gradient-to-r from-purple-300 to-pink-300 px-3 py-0.5 rounded-full border border-white font-black">
                تَدْرِيبٌ بَصَرِيٌّ دَقِيق ✨
              </span>
              <h2 className="text-2xl font-black text-white group-hover:text-pink-200 transition-colors">
                مِرْآةُ لُومِي
              </h2>
              <p className="text-xs text-pink-100 font-bold leading-relaxed">
                شَاهِدْ حَرَكَةَ الشَّفَتَيْنِ وَمَخَارِجَ الأَصْوَاتِ وَقَلِّدْهَا أَمَامَ المِرْآة!
              </p>
            </div>

            <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs font-black text-pink-300">
              <span>افْتَحِ المِرْآة</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-xs text-amber-200/70 font-bold py-2">
        <span>LUMI — رِحْلَةُ الأَصْوَاتِ السَّاحِرَةِ لِلأَطْفَال ✨</span>
      </footer>

      {/* Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />

    </div>
  );
};
