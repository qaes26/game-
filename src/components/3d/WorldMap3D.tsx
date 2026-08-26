import React from 'react';
import { ArrowRight, Sparkles, Compass, Play, Rocket } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../lumi/LumiMascot';
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
      name: 'وادي الحروف',
      desc: 'وَادٍ سِحْرِيٌّ ذُو أَحْجَارٍ طَافِيَةٍ وَرُمُوزٍ قَدِيمَةٍ مُضِيئَةٍ لِاسْتِكْشَافِ الحُرُوف',
      tag: 'العَالَم 1 • الحُرُوف',
      bgGradient: 'from-emerald-900/60 via-teal-900/40 to-[#0f172a]',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      shadowColor: 'shadow-emerald-500/20',
      islandEmoji: '🏞️',
      accentColor: 'text-emerald-400'
    },
    {
      id: 'syllables_forest',
      name: 'غابة المقاطع',
      desc: 'أَشْجَارٌ سِحْرِيَّةٌ مُتَوَهِّجَةٌ تَنْمُو بِنُطْقِ الحَرَكَاتِ وَالمُدُود (بَ، بِ، بُ، با، بي، بو)',
      tag: 'العَالَم 2 • المَقَاطِع',
      bgGradient: 'from-green-900/60 via-emerald-950/40 to-[#0f172a]',
      borderColor: 'border-green-500/40 hover:border-green-400',
      shadowColor: 'shadow-green-500/20',
      islandEmoji: '🌲',
      accentColor: 'text-green-400'
    },
    {
      id: 'words_village',
      name: 'قرية الكلمات',
      desc: 'قَرْيَةٌ سِحْرِيَّةٌ صَغِيرَةٌ تُفْتَحُ أَبْوَابُهَا عِنْدَ تَرْكِيبِ وَنُطْقِ الكَلِمَات',
      tag: 'العَالَم 3 • الكَلِمَات',
      bgGradient: 'from-amber-900/60 via-orange-950/40 to-[#0f172a]',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      shadowColor: 'shadow-amber-500/20',
      islandEmoji: '🏘️',
      accentColor: 'text-amber-400'
    },
    {
      id: 'sentences_river',
      name: 'نهر الجمل',
      desc: 'نَهْرٌ سِحْرِيٌّ بَرَّاقٌ يَتَشَكَّلُ جِسْرُهُ المُضِيءُ عِنْدَ صِيَاغَةِ الجُمَلِ المُفِيدَة',
      tag: 'العَالَم 4 • الجُمَل',
      bgGradient: 'from-blue-900/60 via-sky-950/40 to-[#0f172a]',
      borderColor: 'border-sky-500/40 hover:border-sky-400',
      shadowColor: 'shadow-sky-500/20',
      islandEmoji: '🌊',
      accentColor: 'text-sky-400'
    },
    {
      id: 'echo_mountains',
      name: 'جبال الصدى',
      desc: 'كُهُوفٌ وَبَلُّورَاتُ صَدًى لِلتَّمْيِيزِ السَّمْعِيِّ وَمُحَاكَاةِ الأَصْوَاتِ بِدِقَّة',
      tag: 'العَالَم 5 • الصَّدَى',
      bgGradient: 'from-purple-900/60 via-indigo-950/40 to-[#0f172a]',
      borderColor: 'border-indigo-500/40 hover:border-indigo-400',
      shadowColor: 'shadow-indigo-500/20',
      islandEmoji: '🏔️',
      accentColor: 'text-indigo-400'
    },
    {
      id: 'sounds_castle',
      name: 'قلعة الأصوات',
      desc: 'قَلْعَةٌ سِحْرِيَّةٌ كُبْرَى تَتَضَمَّنُ قَاعَاتٍ وَبَوَّابَاتِ تَحَدٍّ مُتَقَدِّمَة',
      tag: 'العَالَم 6 • القَلْعَة',
      bgGradient: 'from-rose-900/60 via-pink-950/40 to-[#0f172a]',
      borderColor: 'border-pink-500/40 hover:border-pink-400',
      shadowColor: 'shadow-pink-500/20',
      islandEmoji: '🏰',
      accentColor: 'text-pink-400'
    },
    {
      id: 'sounds_galaxy',
      name: 'مجرة الأصوات',
      desc: 'تَجْرِبَةُ فَضَاءٍ كَامِلَة: كَوَاكِب، سُدُم، نُجُوم، كُوَيْكِبَات، وَسُفُنٌ فَضَائِيَّة',
      tag: 'العَالَم 7 • المَجَرَّة',
      bgGradient: 'from-purple-950/80 via-slate-950 to-[#070b19]',
      borderColor: 'border-purple-500/40 hover:border-purple-400',
      shadowColor: 'shadow-purple-500/20',
      islandEmoji: '🚀',
      accentColor: 'text-purple-400'
    },
    {
      id: 'star_realm',
      name: 'عالم النجوم الفضائي',
      desc: 'عَالَمٌ كَوْنِيٌّ مَفْتُوحٌ لِلاسْتِكْشَافِ الحُرِّ وَسَفِينَةِ لُومِي وَأَوْسِمَةِ الإِتْقَان',
      tag: 'العَالَم 8 • الفَضَاء',
      bgGradient: 'from-amber-950/80 via-slate-950 to-[#070b19]',
      borderColor: 'border-yellow-500/40 hover:border-yellow-400',
      shadowColor: 'shadow-yellow-500/20',
      islandEmoji: '🌌',
      accentColor: 'text-yellow-400'
    }
  ];

  const handleWorldClick = (w: typeof worlds[0]) => {
    audioManager.playPortal();
    audioManager.speak(`مَرْحَبًا بِكَ يَا ${childName} فِي ${w.name}`);
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
              <span>خَرِيطَةُ العَوَالِمِ الثَّمَانِيَة (3D WORLDS)</span>
              <span className="text-2xl">🗺️</span>
            </h1>
            <p className="text-xs md:text-sm text-cyan-300 font-bold mt-0.5">
              كُلُّ عَالَمٍ يُمَثِّلُ بِيئَةً سِحْرِيَّةً فَرِيدَةً بِإِضَاءَتِهَا وَتَحَدِّيَاتِهَا
            </p>
          </div>
        </div>
      </div>

      {/* Mascot Notice */}
      <div className="bg-[#0f172a]/80 border border-indigo-500/30 rounded-3xl p-4 flex items-center justify-between">
        <LumiMascot
          message={`اخْتَرْ أَيَّ عَالَمٍ لِتَسْتَكْشِفَهُ يَا ${childName}! وادِي الحُرُوفِ وَمَجَرَّةُ الفَضَاءِ بِانْتِظَارِك!`}
          emotion="happy"
          size="sm"
        />
      </div>

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
              <h3 className={`text-xl font-black ${world.accentColor} group-hover:text-white transition-colors`}>
                {world.name}
              </h3>

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
