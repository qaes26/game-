import React from 'react';
import { Play, Sparkles, Trophy, Compass, Star, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { LoulouMascot } from '../mascot/LoulouMascot';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import lettersData from '../../data/letters.json';

interface CityMapHomeProps {
  onSelectLetter: (letterId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const CityMapHome: React.FC<CityMapHomeProps> = ({
  onSelectLetter,
  onNavigateTab
}) => {
  const { childName, stars, coins, level, letterProgress } = useGame();

  const zones = [
    {
      id: 'village',
      name: 'قرية الحروف',
      desc: 'تعلم أشكال وأصوات الحروف العربية',
      icon: '🔤',
      color: 'from-amber-400 to-orange-500',
      borderColor: 'border-amber-300',
      unlocked: true,
      badge: 'المرحلة 1',
      action: () => onNavigateTab('letters')
    },
    {
      id: 'forest',
      name: 'غابة المقاطع',
      desc: 'تدرب على الحركات والمدود القصيرة والطويلة',
      icon: '🌲',
      color: 'from-emerald-400 to-green-600',
      borderColor: 'border-emerald-300',
      unlocked: true,
      badge: 'المرحلة 2',
      action: () => onSelectLetter('baa')
    },
    {
      id: 'street',
      name: 'شارع الكلمات',
      desc: 'اكتشف الكلمات في أول ووسط وآخر الكلمة',
      icon: '🛣️',
      color: 'from-sky-400 to-blue-600',
      borderColor: 'border-sky-300',
      unlocked: true,
      badge: 'المرحلة 3',
      action: () => onSelectLetter('baa')
    },
    {
      id: 'city',
      name: 'مدينة الجمل',
      desc: 'ركّب جملاً مفيدة مع أصدقاء المدينة',
      icon: '🏙️',
      color: 'from-indigo-400 to-purple-600',
      borderColor: 'border-indigo-300',
      unlocked: true,
      badge: 'المرحلة 4',
      action: () => onSelectLetter('baa')
    },
    {
      id: 'castle',
      name: 'قلعة التحديات',
      desc: '7 ألعاب ممتعة لصيد الحروف والكلمات',
      icon: '🏰',
      color: 'from-rose-400 to-pink-600',
      borderColor: 'border-rose-300',
      unlocked: true,
      badge: 'ألعاب الأبطال',
      action: () => onNavigateTab('minigames')
    },
    {
      id: 'stars_realm',
      name: 'عالم النجوم',
      desc: 'متجر الأفاتار والملابس والجوائز',
      icon: '✨',
      color: 'from-yellow-400 to-amber-600',
      borderColor: 'border-yellow-300',
      unlocked: true,
      badge: 'المتجر والجوائز',
      action: () => onNavigateTab('avatar')
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 select-none">
      
      {/* Hero Welcome Banner with Mascot Loulou */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 rounded-3xl p-6 md:p-8 text-white shadow-card-pop border-4 border-white">
        {/* Floating background elements */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs md:text-sm font-bold border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>مَرْحَبًا بِكَ فِي عَالَمِ الأَصْوَاتِ السَّاحِرْ!</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">
              مَدِينَةُ الأَصْوَاتِ 🏰
            </h1>
            
            <p className="text-sky-100 text-sm md:text-lg max-w-xl leading-relaxed font-medium">
              تَعَلَّمْ نُطْقَ الحُرُوفِ وَالكَلِمَاتِ مِنْ خِلَالِ أَلْعَابٍ مُمْتِعَةٍ وَتَحَدِّيَاتٍ بَصَرِيَّةٍ وَصَوْتِيَّةٍ رَائِعَة!
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onSelectLetter('baa');
                }}
                className="game-btn px-6 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-yellow hover:scale-105 transition-transform"
              >
                <Play className="w-6 h-6 fill-slate-900" />
                <span>ابْدَأ التَّدْرِيبَ الآن! 🚀</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onNavigateTab('letters');
                }}
                className="game-btn px-5 py-3.5 bg-white/90 text-sky-800 rounded-2xl font-black text-sm md:text-base border-2 border-white hover:bg-white transition-all"
              >
                <Compass className="w-5 h-5 text-sky-600" />
                <span>خَرِيطَةُ الحُرُوفِ 🗺️</span>
              </button>
            </div>
          </div>

          {/* Loulou Mascot Talking */}
          <div className="flex-shrink-0">
            <LoulouMascot
              message="أَهْلًا يَا بَطَل! هَلْ نَبْدَأُ مُغَامَرَةَ حَرْفِ البَاءِ (ب) مَعًا؟"
              emotion="happy"
              size="lg"
              autoSpeak={false}
              onMascotClick={() => onSelectLetter('baa')}
            />
          </div>
        </div>
      </div>

      {/* Interactive World Map Zones */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              مَنَاطِقُ مَدِينَةِ الأَصْوَاتِ
            </h2>
          </div>
          <span className="text-xs md:text-sm text-slate-500 font-bold bg-white px-3 py-1 rounded-full border">
            اضغط على المنطقة لبدء المغامرة
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {zones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => {
                if (zone.unlocked) {
                  soundManager.playClick();
                  zone.action();
                }
              }}
              className={`game-card relative overflow-hidden p-5 border-4 ${zone.borderColor} cursor-pointer group hover:-translate-y-1.5 transition-all duration-300 bg-white/90 backdrop-blur-md`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl md:text-4xl group-hover:scale-125 transition-transform duration-300">
                  {zone.icon}
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border">
                  {zone.badge}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg md:text-xl font-black text-slate-800 group-hover:text-sky-600 transition-colors mb-1">
                {zone.name}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                {zone.desc}
              </p>

              {/* Progress / Status footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>مَفْتُوحَة لِلَّعِب</span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-black text-sky-600 group-hover:translate-x-[-4px] transition-transform">
                  <span>ادخل الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Journey Spotlight: Letter Baa (حرف الباء) */}
      <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 rounded-3xl p-6 border-4 border-rose-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center text-5xl font-black border-4 border-white shadow-md animate-wiggle">
            ب
          </div>
          <div>
            <div className="inline-block bg-rose-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full mb-1">
              رِحْلَةُ الحَرْفِ الحَالِيَّة
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800">
              رِحْلَةُ حَرْفِ البَاءِ (ب) 🦆
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">
              8 مُسْتَوَيَاتٍ تَدْرِيجِيَّة: التَّعَرُّف، الصَّوْت، الحَرَكَات، المَقَاطِع، الكَلِمَات، الجُمَل، وَالتَّحَدِّي النِّهَائِي!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onSelectLetter('baa');
          }}
          className="game-btn px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-black text-sm md:text-base border-2 border-white shadow-glow-pink hover:scale-105 transition-transform whitespace-nowrap"
        >
          <span>مُتَابَعَةُ رِحْلَةِ ب 🌟</span>
        </button>
      </div>

    </div>
  );
};
