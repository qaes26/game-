import React from 'react';
import { Sparkles, Coins, Flame, Volume2, VolumeX, Eye, Compass, BookOpen, Shield } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';

interface TopBarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  setCurrentTab
}) => {
  const {
    childName,
    stars,
    coins,
    streak,
    isVisualFirst,
    setIsVisualFirst,
    isMuted,
    toggleMute
  } = useGame();

  return (
    <header className="w-full bg-[#0a0f1d]/90 backdrop-blur-xl border-b-2 border-indigo-500/30 sticky top-0 z-40 px-3 py-2.5 md:px-6 md:py-3 shadow-lg select-none text-white">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Side: Child Avatar & Name */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 border-2 border-cyan-300 shadow-glow-cyan flex items-center justify-center text-2xl">
            🧑‍🚀
          </div>
          <div>
            <h2 className="font-black text-white text-sm md:text-base tracking-wide flex items-center gap-1.5">
              {childName}
            </h2>
            <div className="flex items-center gap-1 text-[11px] text-amber-400 font-extrabold">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-bounce-slow" />
              <span>{streak} أَيَّامٍ مُتَتَالِيَة! 🔥</span>
            </div>
          </div>
        </div>

        {/* Center: Stars & Coins */}
        <div className="flex items-center gap-2 md:gap-3 bg-[#1e293b]/90 px-3 py-1.5 rounded-2xl border border-slate-700 shadow-inner">
          <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-xl border border-amber-500/40 font-black text-xs md:text-sm">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{stars}</span>
            <span className="text-[10px] text-amber-200">نجمة</span>
          </div>

          <div className="flex items-center gap-1.5 bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-xl border border-yellow-500/40 font-black text-xs md:text-sm">
            <Coins className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{coins}</span>
            <span className="text-[10px] text-yellow-200">عملة</span>
          </div>
        </div>

        {/* Right Side: Accessibility, Parent Mode & Audio Controls */}
        <div className="flex items-center gap-2">
          {/* Visual-First Mode */}
          <button
            onClick={() => {
              audioManager.playClick();
              setIsVisualFirst(!isVisualFirst);
            }}
            className={`px-3 py-1.5 rounded-2xl font-black text-xs md:text-sm flex items-center gap-1.5 border transition-all ${
              isVisualFirst
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-glow-cyan'
                : 'bg-[#1e293b] text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="الوضع البصري المساند لضعاف السمع"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">الوضع البصري</span>
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={() => toggleMute()}
            className={`p-2 rounded-2xl border transition-all ${
              isMuted
                ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                : 'bg-[#1e293b] text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Parent Mode Link */}
          <button
            onClick={() => {
              audioManager.playClick();
              setCurrentTab('parent');
            }}
            className={`p-2 rounded-2xl border transition-all ${
              currentTab === 'parent'
                ? 'bg-indigo-600 text-white border-indigo-400'
                : 'bg-[#1e293b] text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="بوابة ولي الأمر والمعالج"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-4xl mx-auto mt-3 flex items-center justify-between md:justify-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'hub', label: 'العَالَمُ الرَّئِيسِيّ 🌌' },
          { id: 'map', label: 'خريطة العوالم (8) 🗺️' },
          { id: 'observatory', label: 'مرصد الحروف (28) 🔤' },
          { id: 'mirror', label: 'مرآة لومي 🪞' }
        ].map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioManager.playClick();
                setCurrentTab(tab.id);
              }}
              className={`px-4 py-2 rounded-2xl font-black text-xs md:text-sm transition-all whitespace-nowrap border ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-glow-cyan scale-105'
                  : 'bg-[#1e293b] text-slate-300 border-slate-800 hover:bg-[#334155]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
