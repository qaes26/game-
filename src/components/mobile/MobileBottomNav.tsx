import React from 'react';
import { Map, BookOpen, Sparkles, Shield, Compass, Gamepad2 } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

export type MobileTab = 'stages' | 'letters' | 'mirror' | 'worlds' | 'games' | 'parent';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab
}) => {
  const tabs = [
    {
      id: 'stages' as MobileTab,
      label: 'المراحل',
      icon: Map,
      voice: 'طَرِيقُ المَرَاحِلِ السِّحْرِيّ'
    },
    {
      id: 'letters' as MobileTab,
      label: 'الحروف',
      icon: BookOpen,
      voice: 'مَرْصَدُ الحُرُوفِ الكَامِلَة'
    },
    {
      id: 'mirror' as MobileTab,
      label: 'المرآة',
      icon: Sparkles,
      voice: 'مُخْتَبَرُ النُّطْقِ وَالمِرْآة'
    },
    {
      id: 'worlds' as MobileTab,
      label: 'العوالم 🪐',
      icon: Compass,
      voice: 'خَرِيطَةُ العَوَالِمِ الثَّمَانِيَة'
    },
    {
      id: 'games' as MobileTab,
      label: 'الألعاب 🎮',
      icon: Gamepad2,
      voice: 'مَرْكَزُ الأَلْعَابِ وَالتَّحَدِّيَات'
    },
    {
      id: 'parent' as MobileTab,
      label: 'المعالج',
      icon: Shield,
      voice: 'بَوَّابَةُ وَلِيِّ الأَمْرِ وَالمُعَالِج'
    }
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    audioManager.playClick();
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
    onSelectTab(tab.id);
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#070e24]/95 backdrop-blur-xl border-t-2 border-amber-400/40 px-2 py-2 pb-safe max-w-lg mx-auto shadow-[0_-10px_35px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-around gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-2xl transition-all duration-200 active:scale-90 flex-1 relative ${
                isActive
                  ? 'text-amber-300 bg-amber-400/15 border border-amber-400/40 shadow-glow-yellow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
              )}

              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'
                }`}
              />

              <span className="text-[10px] font-black mt-0.5 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
