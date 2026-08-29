import React, { useState } from 'react';
import { Map, BookOpen, Sparkles, Compass, Gamepad2, Star, Volume2, User, Users, Smartphone, Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { ARABIC_LETTERS } from '../../data/letters';
import { LumiGuideBanner } from '../common/LumiGuideBanner';
import { ChildProfileModal } from '../common/ChildProfileModal';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { MandatoryLetterPickerModal } from '../common/MandatoryLetterPickerModal';

interface ChildKingdomHubProps {
  onNavigate: (section: 'stages' | 'letters' | 'worlds' | 'games' | 'ai_lab') => void;
}

export const ChildKingdomHub: React.FC<ChildKingdomHubProps> = ({ onNavigate }) => {
  const { childName, stars, coins, selectedLetterId, setSelectedLetterId } = useGame();
  const [isLetterPickerOpen, setIsLetterPickerOpen] = useState<boolean>(false);
  const [pendingTargetSection, setPendingTargetSection] = useState<'stages' | 'letters' | 'worlds' | 'games' | 'ai_lab' | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

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
      voiceText: `طَرِيقُ المَرَاحِلِ السِّحْرِيّ يَا ${childName || 'البَطَل'}.. اخْتَرْ حَرْفَكَ لِتَبْدَأَ المَرَاحِلَ الثَّمَانِيَة!`,
      requiresLetterPick: false
    },
    {
      id: 'ai_lab' as const,
      title: 'مُخْتَبَرُ النُّطْقِ بِالذَّكَاءِ الاصْطِنَاعِيّ',
      subtitle: 'انْطِقْ وَدَعِ الذَّكَاءَ الاصْطِنَاعِيَّ يُقَيِّمْكَ وَيُصَحِّح',
      icon: '🤖',
      badge: 'تَقْيِيمٌ وَتَصْحِيحٌ ذَكِيّ ⚡',
      bgGradient: 'from-[#0f766e] via-[#0d9488] to-[#14b8a6]',
      borderColor: 'border-teal-300',
      glowColor: 'shadow-[0_0_35px_rgba(20,184,166,0.5)]',
      voiceText: `مُخْتَبَرُ النُّطْقِ بِالذَّكَاءِ الاصْطِنَاعِيّ يَا ${childName || 'البَطَل'}.. انْطِقِ الكَلِمَةَ لِيُقَيِّمَكَ الذَّكَاءُ الاصْطِنَاعِيُّ فَوْرًا!`,
      requiresLetterPick: false
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
      voiceText: `مَرْصَدُ الحُرُوفِ الكَامِلَةِ يَا ${childName || 'البَطَل'}.. ثَمَانِيَةٌ وَعِشْرُونَ حَرْفًا عَرَبِيًّا!`,
      requiresLetterPick: false
    },
    {
      id: 'worlds' as const,
      title: 'العَوَالِمُ الثَّلاثَةُ السَّاحِرَة',
      subtitle: 'وَادِي الحُرُوف، غَابَةُ المَقَاطِع، قَرْيَةُ الكَلِمَات',
      icon: '🌍',
      badge: '3 عَوَالِمَ بَصَرِيَّة 🏞️',
      bgGradient: 'from-[#3b0764] via-[#6b21a8] to-[#9333ea]',
      borderColor: 'border-purple-400',
      glowColor: 'shadow-[0_0_35px_rgba(147,51,234,0.4)]',
      voiceText: `العَوَالِمُ الثَّلاثَةُ السَّاحِرَةُ يَا ${childName || 'البَطَل'}.. وَادِي الحُرُوفِ وَغَابَةُ المَقَاطِعِ وَقَرْيَةُ الكَلِمَات!`,
      requiresLetterPick: false
    },
    {
      id: 'games' as const,
      title: 'قَلْعَةُ الأَلْعَابِ الثَّلاث',
      subtitle: 'فَقَاعَاتُ الحُرُوف، قِطَارُ المَقَاطِع، صَيْدُ الكَلِمَات',
      icon: '🎮',
      badge: '3 أَلْعَابٍ مُشَوِّقَة 🎯',
      bgGradient: 'from-[#7c2d12] via-[#c2410c] to-[#f97316]',
      borderColor: 'border-amber-400',
      glowColor: 'shadow-[0_0_35px_rgba(249,115,22,0.4)]',
      voiceText: `قَلْعَةُ الأَلْعَابِ الثَّلاثِ يَا ${childName || 'البَطَل'}.. أَلْعَابٌ مُمْتِعَةٌ لِصَيْدِ الحُرُوفِ وَالمَقَاطِعِ وَالكَلِمَات!`,
      requiresLetterPick: false
    }
  ];

  const handleTileClick = (sec: typeof hubSections[0]) => {
    audioManager.playPortal();
    audioManager.speak(sec.voiceText);
    onNavigate(sec.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] via-[#091230] to-[#040711] text-white p-3 sm:p-5 select-none flex flex-col justify-between font-arabic overflow-x-hidden">
      
      {/* Top Header Navigation & Child Profile Bar - Mobile Optimized */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between gap-2 bg-[#0a122e]/95 backdrop-blur-xl p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-amber-400/50 shadow-lg">
        
        {/* Child Profile Button */}
        <button
          onClick={() => {
            audioManager.playClick();
            setIsProfileModalOpen(true);
          }}
          className="flex items-center gap-2 sm:gap-3 text-right hover:bg-white/10 p-1 sm:p-1.5 rounded-2xl transition-all active:scale-95 group"
          title="تبديل الطفل أو إضافة بطل جديد"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-xl sm:text-2xl flex items-center justify-center border-2 border-white shadow-glow-yellow group-hover:scale-105 transition-transform flex-shrink-0">
            👑
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-xs sm:text-base text-white">
                {childName ? `البَطَل ${childName}` : 'اخْتَرِ البَطَل'}
              </span>
              <span className="text-xs text-amber-300">🔄</span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-cyan-300 font-bold block">
              أَبْطَالُ هَذَا الهَاتِف 📱
            </span>
          </div>
        </button>

        {/* Selected Letter Quick Switcher & Stats */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Active Target Letter Static Badge */}
          <div
            className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-2.5 sm:px-3 py-1.5 rounded-xl sm:rounded-2xl border border-white font-black text-xs sm:text-sm shadow-glow-yellow"
            title="الحرف الحالي"
          >
            <span className="hidden xs:inline text-[11px]">الحَرْف:</span>
            <span className="text-sm sm:text-base font-black">({currentLetter.char})</span>
          </div>

          <PWAInstallButton />

          <div className="flex items-center gap-1 bg-amber-500/20 px-2 sm:px-3 py-1.5 rounded-xl sm:rounded-2xl border border-amber-400/60 text-xs sm:text-sm font-black text-amber-300 shadow-sm">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-300 text-amber-300 animate-spin-slow" />
            <span>{stars}</span>
          </div>

          <div className="flex items-center gap-1 bg-yellow-500/20 px-2 sm:px-2.5 py-1.5 rounded-xl sm:rounded-2xl border border-yellow-400/50 text-xs sm:text-sm font-black text-yellow-300">
            <span>🪙</span>
            <span>{coins}</span>
          </div>
        </div>

      </header>

      {/* Main Grid: Big Interactive Square Tiles for Kids & Phone Layout */}
      <main className="max-w-4xl mx-auto w-full my-auto py-3 sm:py-5 space-y-4 sm:space-y-6">
        
        {/* Lumi Voice Guide Banner */}
        <LumiGuideBanner
          message={`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'}! أَنَا لُومِي.. اخْتَرْ طَرِيقَ المَرَاحِلِ لِتَتَدَرَّبَ، أَوْ مَرْصَدَ الحُرُوفِ لِتَسْتَكْشِف، أَوْ مُخْتَبَرَ اللِّسَانِ لِتُشَاهِدَ النُّطْق!`}
          shortHint="اخْتَرْ أَيَّ قِسْمٍ لِنَبْدَأ"
          autoSpeak={true}
          emotion="happy"
        />

        {/* Large Square Cards Grid - Mobile Friendly & Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {hubSections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => handleTileClick(sec)}
              className={`group relative p-5 sm:p-6 rounded-3xl border-3 ${sec.borderColor} bg-gradient-to-br ${sec.bgGradient} ${sec.glowColor} text-right flex flex-col justify-between min-h-[160px] sm:min-h-[190px] md:min-h-[210px] aspect-auto sm:aspect-square lg:aspect-auto transition-all duration-300 hover:scale-[1.03] active:scale-95 overflow-hidden shadow-2xl ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Card Ambient Glow Highlight */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

              {/* Top Row: Big Square Emoji & Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform duration-300 drop-shadow-md">
                  {sec.icon}
                </span>
                <span className="bg-black/40 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-black px-3 py-1 rounded-full border border-white/30 shadow-inner">
                  {sec.badge}
                </span>
              </div>

              {/* Bottom Row: Large Title & Subtitle */}
              <div className="relative z-10 pt-3 sm:pt-4 space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-yellow-200 transition-colors drop-shadow-sm">
                  {sec.title}
                </h3>
                <p className="text-xs text-white/85 font-bold leading-relaxed">
                  {sec.subtitle}
                </p>
              </div>

              {/* Hover / Touch Action Indicator */}
              <div className="relative z-10 pt-2 flex items-center justify-between text-xs font-black text-yellow-300 opacity-95 group-hover:opacity-100">
                <span>انْقُرْ لِلبَدْء 🚀</span>
                <span className="group-hover:-translate-x-1.5 transition-transform">⬅️</span>
              </div>
            </button>
          ))}
        </div>

      </main>

      {/* Footer Branding */}
      <footer className="max-w-4xl mx-auto w-full text-center text-[10px] sm:text-[11px] text-slate-500 font-bold pt-2">
        <span>LUMI — مَمْلَكَةُ الأَصْوَاتِ وَمَخَارِجِ الحُرُوف</span>
      </footer>

      {/* Multi-Child Profile Switcher Modal */}
      <ChildProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </div>
  );
};
