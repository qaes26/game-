import React from 'react';
import { ArrowRight, Sparkles, Compass, Play, Rocket, Volume2 } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { LumiGuideBanner } from '../common/LumiGuideBanner';
import { useGame } from '../../context/GameContext';

interface WorldMap3DProps {
  onSelectWorld: (worldId: string) => void;
  onBackToHome: () => void;
}

export const WorldMap3D: React.FC<WorldMap3DProps> = ({
  onSelectWorld,
  onBackToHome
}) => {
  const { childName } = useGame();

  const worlds = [
    {
      id: 'valley_of_letters',
      name: 'وادي الحروف والأصوات',
      desc: 'وَادٍ سِحْرِيٌّ ذُو أَحْجَارٍ طَافِيَةٍ وَرُمُوزٍ قَدِيمَةٍ مُضِيئَةٍ لِاسْتِكْشَافِ أَصْوَاتِ وَمَخَارِجِ الحُرُوف',
      tag: 'العَالَم 1 • الحُرُوف',
      bgGradient: 'from-emerald-900/60 via-teal-900/40 to-[#0f172a]',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      shadowColor: 'shadow-emerald-500/20',
      islandEmoji: '🏞️',
      accentColor: 'text-emerald-400'
    },
    {
      id: 'syllables_forest',
      name: 'غابة المقاطع والمدود',
      desc: 'أَشْجَارٌ سِحْرِيَّةٌ مُتَوَهِّجَةٌ تَنْمُو بِنُطْقِ الحَرَكَاتِ وَالمُدُود (بَ، بِ، بُ، بَا، بِي، بُو)',
      tag: 'العَالَم 2 • المَقَاطِع',
      bgGradient: 'from-green-900/60 via-emerald-950/40 to-[#0f172a]',
      borderColor: 'border-green-500/40 hover:border-green-400',
      shadowColor: 'shadow-green-500/20',
      islandEmoji: '🌲',
      accentColor: 'text-green-400'
    },
    {
      id: 'words_village',
      name: 'قرية الكلمات الساحرة',
      desc: 'قَرْيَةٌ سِحْرِيَّةٌ تَفَاعُلِيَّةٌ تُفْتَحُ أَبْوَابُهَا عِنْدَ تَرْكِيبِ وَنُطْقِ الكَلِمَاتِ وَالجُمَل',
      tag: 'العَالَم 3 • الكَلِمَات',
      bgGradient: 'from-amber-900/60 via-orange-950/40 to-[#0f172a]',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      shadowColor: 'shadow-amber-500/20',
      islandEmoji: '🏘️',
      accentColor: 'text-amber-400'
    }
  ];

  const handleWorldClick = (w: typeof worlds[0]) => {
    audioManager.playPortal();
    audioManager.speak(`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'} فِي ${w.name}`);
    onSelectWorld(w.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f172a]/90 backdrop-blur-md p-4 md:p-6 rounded-3xl border-2 border-cyan-500/30 shadow-2xl text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToHome();
            }}
            className="p-3 rounded-2xl bg-[#1e293b] border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all shadow-sm active:scale-95"
            title="العودة للرئيسية"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <span>خَرِيطَةُ العَوَالِمِ الثَّلاثَةِ السَّاحِرَة</span>
              <span className="text-2xl">🗺️</span>
            </h1>
            <p className="text-xs md:text-sm text-cyan-300 font-bold mt-0.5">
              3 عَوَالِمَ بَصَرِيَّةٍ سِحْرِيَّةٍ مُبْتَكَرَةٍ لِتَطْوِيرِ النُّطْقِ وَالمَهَارَات
            </p>
          </div>
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`خَرِيطَةُ العَوَالِمِ وَالفَضَاءِ يَا ${childName || 'البَطَل'}! اخْتَرْ أَيَّ عَالَمٍ كَوْنِيٍّ لِتَبْدَأَ فِيهِ مُغَامَرَةَ الحُرُوفِ أَوِ المَقَاطِعِ أَوِ الجُمَل!` }
        shortHint="اخْتَرْ عَالَمَكَ المُفَضَّل"
        autoSpeak={true}
        emotion="happy"
      />

      {/* 8 Worlds Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {worlds.map((world) => (
          <div
            key={world.id}
            onClick={() => handleWorldClick(world)}
            className={`group relative p-6 rounded-3xl border-2 ${world.borderColor} cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-95 bg-[#0f172a]/95 backdrop-blur-md flex flex-col justify-between min-h-[300px] overflow-hidden`}
          >
            {/* Ambient Background Gradient */}
            <div className={`absolute top-0 inset-x-0 h-28 bg-gradient-to-b ${world.bgGradient} opacity-80 group-hover:opacity-100 transition-opacity`} />

            {/* Island Emoji & World Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-5xl drop-shadow-lg group-hover:scale-125 transition-transform duration-300">
                {world.islandEmoji}
              </span>
              <span className="bg-[#1e293b]/90 text-slate-200 text-[11px] font-black px-3 py-1 rounded-full border border-slate-700 shadow-sm">
                {world.tag}
              </span>
            </div>

            {/* Title & Detailed Purpose Description */}
            <div className="relative z-10 pt-10 space-y-1.5 text-right">
              <div className="flex items-center justify-between gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    audioManager.playClick();
                    audioManager.speak(world.desc);
                  }}
                  className="px-2.5 py-1 bg-[#1e293b]/80 hover:bg-slate-700 text-amber-300 rounded-xl text-[10px] font-black border border-amber-500/30 shadow-sm flex items-center gap-1 transition-all active:scale-95"
                  title="اسْتَمِعْ لِشَرْحِ العَالَم"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>الشَّرْح</span>
                </button>
                <h3 className={`text-xl font-black ${world.accentColor} group-hover:text-white transition-colors`}>
                  {world.name}
                </h3>
              </div>

              <p className="text-xs text-slate-300 font-bold leading-relaxed line-clamp-3">
                {world.desc}
              </p>
            </div>

            {/* Bottom Button */}
            <div className="relative z-10 pt-4 mt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-black text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                مَفْتُوحٌ لِلاسْتِكْشَاف
              </span>

              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-black text-xs shadow-glow-cyan flex items-center gap-1.5">
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
