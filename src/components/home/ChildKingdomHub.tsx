import React, { useState } from 'react';
import { Map, BookOpen, Sparkles, Compass, Gamepad2, Star, Volume2, User, Users, Smartphone, Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { ARABIC_LETTERS } from '../../data/letters';
import { LumiMascot } from '../lumi/LumiMascot';
import { ChildProfileModal } from '../common/ChildProfileModal';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { MandatoryLetterPickerModal } from '../common/MandatoryLetterPickerModal';

interface ChildKingdomHubProps {
  onNavigate: (section: 'stages' | 'letters' | 'mirror' | 'worlds' | 'games') => void;
}

export const ChildKingdomHub: React.FC<ChildKingdomHubProps> = ({ onNavigate }) => {
  const { childName, stars, coins, selectedLetterId, setSelectedLetterId } = useGame();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isLetterPickerOpen, setIsLetterPickerOpen] = useState<boolean>(false);
  const [pendingTargetSection, setPendingTargetSection] = useState<'stages' | 'letters' | 'mirror' | 'worlds' | 'games' | null>(null);

  const currentLetter = ARABIC_LETTERS.find((l) => l.id === selectedLetterId) || ARABIC_LETTERS[1];

  const hubSections = [
    {
      id: 'stages' as const,
      title: 'طَرِيقُ المَرَاحِلِ السِّحْرِيّ',
      subtitle: 'اخْتَرْ حَرْفَكَ وَاجْتَزِ الـ 8 مَرَاحِل',
      icon: '🗺️',
      badge: 'الرِّحْلَةُ الأَسَاسِيَّة ⭐',
      bgGradient: 'from-[#1e3a8a] via-[#1d4ed8] to-[#0ea5e9]',
      borderColor: 'border-cyan-400',
      glowColor: 'shadow-[0_0_35px_rgba(14,165,233,0.4)]',
      voiceText: 'طَرِيقُ المَرَاحِلِ السِّحْرِيّ.. اخْتَرْ حَرْفَكَ لِتَبْدَأَ المَرَاحِلَ الثَّمَانِيَة',
      requiresLetterPick: true
    },
    {
      id: 'letters' as const,
      title: 'مَرْصَدُ الحُرُوفِ الـ 28',
      subtitle: 'اسْتَكْشِفْ كُلَّ الحُرُوفِ وَأَصْوَاتَهَا',
      icon: '🔤',
      badge: '28 حَرْفًا كَامِلًا 📚',
      bgGradient: 'from-[#065f46] via-[#059669] to-[#10b981]',
      borderColor: 'border-emerald-400',
      glowColor: 'shadow-[0_0_35px_rgba(16,185,129,0.4)]',
      voiceText: 'مَرْصَدُ الحُرُوفِ الكَامِلَة.. ثَمَانِيَةٌ وَعِشْرُونَ حَرْفًا عَرَبِيًّا',
      requiresLetterPick: false
    },
    {
      id: 'mirror' as const,
      title: 'مُخْتَبَرُ اللِّسَانِ وَالمِرْآة',
      subtitle: 'شَاهِدْ حَرَكَةَ اللِّسَانِ وَالمَخَارِج',
      icon: '👅',
      badge: 'تَشْرِيحٌ وَاقِعِيٌّ 3D ✨',
      bgGradient: 'from-[#831843] via-[#be185d] to-[#f43f5e]',
      borderColor: 'border-pink-400',
      glowColor: 'shadow-[0_0_35px_rgba(244,63,94,0.4)]',
      voiceText: 'مُخْتَبَرُ اللِّسَانِ وَالمِرْآة.. تَعَلَّمْ كَيْفَ يَتَحَرَّكُ اللِّسَانُ لِنُطْقِ الحَرْف',
      requiresLetterPick: true
    },
    {
      id: 'worlds' as const,
      title: 'عَوَالِمُ الأَصْوَاتِ وَالفَضَاء',
      subtitle: '8 عَوَالِمَ وَكَوَاكِبَ سَاحِرَة',
      icon: '🪐',
      badge: '8 عَوَالِمَ وَكَوَاكِب 🚀',
      bgGradient: 'from-[#3b0764] via-[#6b21a8] to-[#9333ea]',
      borderColor: 'border-purple-400',
      glowColor: 'shadow-[0_0_35px_rgba(147,51,234,0.4)]',
      voiceText: 'خَرِيطَةُ العَوَالِمِ وَالفَضَاء.. ثَمَانِيَةُ عَوَالِمَ كَوْنِيَّةٍ سَاحِرَة',
      requiresLetterPick: false
    },
    {
      id: 'games' as const,
      title: 'مَرْكَزُ الأَلْعَابِ التَّفَاعُلِيَّة',
      subtitle: '7 أَلْعَابٍ لِتَحَدِّيَاتِ النُّطْقِ وَالمَرَح',
      icon: '🎮',
      badge: '7 أَلْعَابٍ مُشَوِّقَة 🎯',
      bgGradient: 'from-[#7c2d12] via-[#c2410c] to-[#f97316]',
      borderColor: 'border-amber-400',
      glowColor: 'shadow-[0_0_35px_rgba(249,115,22,0.4)]',
      voiceText: 'مَرْكَزُ الأَلْعَابِ وَالتَّحَدِّيَات.. سَبْعُ أَلْعَابٍ مُمْتِعَةٍ لِصَيْدِ الحُرُوفِ وَالكَلِمَات',
      requiresLetterPick: false
    }
  ];

  const handleTileClick = (sec: typeof hubSections[0]) => {
    audioManager.playPortal();
    audioManager.speak(sec.voiceText);

    if (sec.requiresLetterPick) {
      setPendingTargetSection(sec.id);
      setIsLetterPickerOpen(true);
    } else {
      onNavigate(sec.id);
    }
  };

  const handleLetterPicked = (letterId: string) => {
    setIsLetterPickerOpen(false);
    if (pendingTargetSection) {
      onNavigate(pendingTargetSection);
      setPendingTargetSection(null);
    } else {
      onNavigate('stages');
    }
  };

  return (
    <div className="min-h-screen bg-[#050814] text-white p-4 md:p-6 select-none flex flex-col justify-between font-arabic">
      
      {/* Top Header Navigation & Child Profile Bar */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between gap-3 bg-[#0a122e]/90 backdrop-blur-xl p-3 md:p-4 rounded-3xl border-2 border-amber-400/50 shadow-lg">
        
        {/* Child Profile Button */}
        <button
          onClick={() => {
            audioManager.playClick();
            setIsProfileModalOpen(true);
          }}
          className="flex items-center gap-3 text-right hover:bg-white/10 p-1.5 rounded-2xl transition-all active:scale-95 group"
          title="تبديل الطفل أو إضافة بطل جديد"
        >
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-2xl flex items-center justify-center border-2 border-white shadow-glow-yellow group-hover:scale-105 transition-transform">
            👑
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-black text-sm md:text-base text-white">
                {childName ? `البَطَل ${childName}` : 'اخْتَرِ البَطَل'}
              </span>
              <span className="text-xs text-amber-300">🔄</span>
            </div>
            <span className="text-[10px] text-cyan-300 font-bold block">
              أَبْطَالُ هَذَا الهَاتِف 📱
            </span>
          </div>
        </button>

        {/* Selected Letter Quick Switcher & Stats */}
        <div className="flex items-center gap-2">
          
          {/* Active Target Letter Badge */}
          <button
            onClick={() => {
              audioManager.playClick();
              setPendingTargetSection('stages');
              setIsLetterPickerOpen(true);
            }}
            className="flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-3 py-1.5 rounded-2xl border border-white font-black text-xs md:text-sm shadow-glow-yellow active:scale-95 transition-all"
            title="انقر لتغيير الحرف الحالي"
          >
            <span>الحَرْف:</span>
            <span className="text-base font-black">({currentLetter.char})</span>
            <span className="text-[10px] opacity-80">🔄</span>
          </button>

          <PWAInstallButton />

          <div className="flex items-center gap-1 bg-amber-500/20 px-3 py-1.5 rounded-2xl border border-amber-400/60 text-xs md:text-sm font-black text-amber-300 shadow-sm">
            <Star className="w-4 h-4 fill-amber-300 text-amber-300 animate-spin-slow" />
            <span>{stars}</span>
          </div>

          <div className="flex items-center gap-1 bg-yellow-500/20 px-2.5 py-1.5 rounded-2xl border border-yellow-400/50 text-xs md:text-sm font-black text-yellow-300">
            <span>🪙</span>
            <span>{coins}</span>
          </div>
        </div>

      </header>

      {/* Main Grid: Big Interactive Square Tiles for Kids */}
      <main className="max-w-4xl mx-auto w-full my-auto py-6 space-y-6">
        
        {/* Kingdom Welcome Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-cyan-500/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-amber-400/50 text-xs md:text-sm font-black text-amber-200 shadow-md">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin-slow" />
            <span>مَمْلَكَةُ لُومِي للأَصْوَات — اخْتَرْ مُغَامَرَتَكَ يَا بَطَل!</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white">
            أَيْنَ تُرِيدُ أَنْ تَلْعَبَ وَتَتَعَلَّمَ الآن؟ 🚀
          </h1>
        </div>

        {/* Large Square Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {hubSections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => handleTileClick(sec)}
              className={`group relative p-5 md:p-6 rounded-3xl border-3 ${sec.borderColor} bg-gradient-to-br ${sec.bgGradient} ${sec.glowColor} text-right flex flex-col justify-between min-h-[170px] md:min-h-[200px] transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden shadow-2xl ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Card Ambient Highlight */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

              {/* Top Row: Big Emoji & Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-4xl md:text-5xl group-hover:scale-125 transition-transform duration-300 drop-shadow-md">
                  {sec.icon}
                </span>
                <span className="bg-black/40 backdrop-blur-md text-white text-[10px] md:text-[11px] font-black px-3 py-1 rounded-full border border-white/30 shadow-inner">
                  {sec.badge}
                </span>
              </div>

              {/* Bottom Row: Title & Subtitle */}
              <div className="relative z-10 pt-4 space-y-1">
                <h3 className="text-lg md:text-xl font-black text-white group-hover:text-yellow-200 transition-colors drop-shadow-sm">
                  {sec.title}
                </h3>
                <p className="text-xs text-white/80 font-bold leading-relaxed">
                  {sec.subtitle}
                </p>
              </div>

              {/* Hover Action Indicator */}
              <div className="relative z-10 pt-2 flex items-center justify-between text-[11px] font-black text-yellow-300 opacity-90 group-hover:opacity-100">
                <span>انْقُرْ لِلبَدْء 🚀</span>
                <span className="group-hover:-translate-x-1 transition-transform">⬅️</span>
              </div>
            </button>
          ))}
        </div>

        {/* Mascot Greeting */}
        <div className="flex justify-center pt-2">
          <LumiMascot
            message={`أَهْلًا بِكَ يَا ${childName}! انْقُرْ عَلَى أَيِّ مُرَبَّعٍ كَبِيرٍ لِنَبْدَأَ اللَّعِبَ وَالنُّطْقَ مَعًا!`}
            emotion="happy"
            size="sm"
          />
        </div>

      </main>

      {/* Footer Branding */}
      <footer className="max-w-4xl mx-auto w-full text-center text-[11px] text-slate-500 font-bold pt-2">
        <span>LUMI — مَمْلَكَةُ الأَصْوَاتِ وَمَخَارِجِ الحُرُوف</span>
      </footer>

      {/* Mandatory Letter Picker Modal */}
      <MandatoryLetterPickerModal
        isOpen={isLetterPickerOpen}
        onClose={() => setIsLetterPickerOpen(false)}
        onSelectLetter={handleLetterPicked}
      />

      {/* Multi-Child Profile Switcher Modal */}
      <ChildProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

    </div>
  );
};
