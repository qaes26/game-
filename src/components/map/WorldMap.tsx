import React from 'react';
import { ArrowRight, Sparkles, Compass, MapPin, Play } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';

interface WorldMapProps {
  onSelectWorld: (worldId: string) => void;
  onBackToHome: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  onSelectWorld,
  onBackToHome
}) => {
  const worlds = [
    {
      id: 'valley_of_letters',
      name: 'وادي الحروف',
      desc: 'اسْتَكْشِفْ أَشْكَالَ الحُرُوفِ وَتَتَبَّعْ رَسْمَهَا فِي المَرَاعِي الخَضْرَاء',
      icon: '🌿',
      tag: 'العالم 1',
      bgGradient: 'from-emerald-400 via-teal-400 to-green-500',
      borderColor: 'border-emerald-300',
      shadowColor: 'shadow-emerald-200',
      islandEmoji: '🏞️'
    },
    {
      id: 'syllables_forest',
      name: 'غابة المقاطع',
      desc: 'اشْجَارٌ سِحْرِيَّةٌ تَنْمُو بِنُطْقِ الحَرَكَاتِ وَالمُدُود (بَ، بِ، بُ، با، بي، بو)',
      icon: '🌳',
      tag: 'العالم 2',
      bgGradient: 'from-green-500 via-emerald-600 to-teal-700',
      borderColor: 'border-green-300',
      shadowColor: 'shadow-green-200',
      islandEmoji: '🌲'
    },
    {
      id: 'words_village',
      name: 'قرية الكلمات',
      desc: 'بُيُوتٌ وَمَتَاجِرُ تُفْتَحُ أَبْوَابُهَا عِنْدَ تَرْكِيبِ وَنُطْقِ الكَلِمَاتِ الصَّحِيحَة',
      icon: '🏘️',
      tag: 'العالم 3',
      bgGradient: 'from-amber-400 via-orange-400 to-rose-400',
      borderColor: 'border-amber-300',
      shadowColor: 'shadow-amber-200',
      islandEmoji: '🏠'
    }
  ];

  const handleWorldClick = (w: typeof worlds[0]) => {
    audioManager.playPortal();
    audioManager.speak(`مرحبًا بك في ${w.name}`);
    onSelectWorld(w.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-3xl border-3 border-sky-200 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToHome();
            }}
            className="p-3 rounded-2xl bg-sky-50 border-2 border-sky-200 text-sky-800 hover:bg-sky-100 transition-all shadow-sm active:scale-95"
            title="العودة للرئيسية"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
              <span>خَرِيطَةُ عَوَالِمِ مَدِينَةِ الأَصْوَاتِ (8 عَوَالِم)</span>
              <span className="text-2xl">🗺️</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold mt-0.5">
              كُلُّ عَالَمٍ يَمْنَحُكَ تَجْرِبَةً بَصَرِيَّةً وَلُعْبَةً تَفَاعُلِيَّةً فَرِيدَة!
            </p>
          </div>
        </div>
      </div>

      {/* Mascot Notice */}
      <div className="bg-sky-50/90 border-2 border-sky-200 rounded-3xl p-4 flex items-center justify-between">
        <LumiMascot
          message="اخْتَرْ أَيَّ عَالَمٍ تُرِيدُ اسْتِكْشَافَهُ.. انْظُرْ كَيْفَ تَبْدُو مَجَرَّةُ النُّجُومِ وَغَابَةُ المَقَاطِع!"
          emotion="happy"
          size="sm"
        />
      </div>

      {/* 8 Distinct Living Worlds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {worlds.map((world, idx) => (
          <div
            key={world.id}
            onClick={() => handleWorldClick(world)}
            className={`group relative game-card p-6 border-4 ${world.borderColor} cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-95 bg-white flex flex-col justify-between min-h-[280px] overflow-hidden`}
          >
            {/* Ambient Background Glow Banner */}
            <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-r ${world.bgGradient} opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-between px-5 text-white`} />

            {/* Top Island Badge & Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-4xl drop-shadow-md group-hover:scale-125 transition-transform duration-300">
                {world.islandEmoji}
              </span>
              <span className="bg-white/90 text-slate-900 text-[11px] font-black px-3 py-1 rounded-full border shadow-sm">
                {world.tag}
              </span>
            </div>

            {/* Title & Description */}
            <div className="relative z-10 pt-12 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl">{world.icon}</span>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                  {world.name}
                </h3>
              </div>

              <p className="text-xs text-slate-600 font-bold leading-relaxed line-clamp-3">
                {world.desc}
              </p>
            </div>

            {/* Bottom Action Footer */}
            <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                مَفْتُوحٌ لِلاسْتِكْشَاف
              </span>

              <button className="game-btn px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-black text-xs shadow-md">
                <Play className="w-3 h-3 fill-white" />
                <span>ادْخُلِ العَالَم</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
