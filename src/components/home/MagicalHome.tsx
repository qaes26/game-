import React from 'react';
import { Play, Sparkles, Compass, Star, Coins, Flame, ArrowLeft } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';

interface MagicalHomeProps {
  onOpenMap: () => void;
  onOpenAlphabet: () => void;
  onOpenMirror: () => void;
  onSelectLetter: (id: string) => void;
}

export const MagicalHome: React.FC<MagicalHomeProps> = ({
  onOpenMap,
  onOpenAlphabet,
  onOpenMirror,
  onSelectLetter
}) => {
  const { childName, stars, coins, streak } = useGame();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 select-none">
      
      {/* Hero Welcome Realm */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-3xl p-6 md:p-8 text-white shadow-card-pop border-4 border-white">
        
        {/* Floating background glowing dust */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/20 rounded-full blur-2xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-yellow-300/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs md:text-sm font-black border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>مَرْحَبًا بِكَ يَا بَطَل فِي مَدِينَةِ الأَصْوَاتِ السَّاحِرَة!</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">
              مَدِينَةُ الأَصْوَاتِ 🏰✨
            </h1>
            
            <p className="text-sky-100 text-sm md:text-lg max-w-xl leading-relaxed font-bold">
              تَعَلَّمْ نُطْقَ وَتَمْيِيزَ جَمِيعِ الحُرُوفِ العَرَبِيَّةِ فِي مُغَامَرَةٍ تَعْلِيمِيَّةٍ بَصَرِيَّةٍ مُمْتِعَة!
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  audioManager.playPortal();
                  onOpenMap();
                }}
                className="game-btn px-6 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-yellow hover:scale-105 transition-transform"
              >
                <Compass className="w-6 h-6" />
                <span>خَرِيطَةُ العَوَالِمِ (8 عَوَالِم) 🗺️</span>
              </button>

              <button
                onClick={() => {
                  audioManager.playClick();
                  onOpenAlphabet();
                }}
                className="game-btn px-5 py-3.5 bg-white text-sky-900 rounded-2xl font-black text-sm md:text-base border-2 border-white hover:bg-sky-50 shadow-md"
              >
                <span>غُرْفَةُ الحُرُوفِ (28 حَرْفًا) 🔤</span>
              </button>
            </div>
          </div>

          {/* LUMI Mascot Companion */}
          <div className="flex-shrink-0">
            <LumiMascot
              message="أَهْلًا يَا بَطَل! هَيَّا نَبْدَأُ رِحْلَةَ حَرْفِ البَاءِ (ب) أَوْ اخْتَرْ أَيَّ حَرْفٍ تُحِبُّه!"
              emotion="happy"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Featured Quest Spotlight: Letter Baa Vertical Slice */}
      <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 rounded-3xl p-6 md:p-8 border-4 border-rose-300 shadow-card-pop flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center text-6xl font-black border-4 border-white shadow-glow-pink animate-wiggle">
            ب
          </div>
          <div className="space-y-1">
            <span className="inline-block bg-rose-500 text-white text-xs font-black px-3 py-0.5 rounded-full">
              مُغَامَرَةُ الحَرْفِ الرَّئِيسِيَّة
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
              رِحْلَةُ حَرْفِ البَاءِ (ب) 🦆
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-bold max-w-lg">
              8 مَرَاحِلَ مُتَدَرِّجَة: اكْتِشَافُ الحَرْف، الصَّوْت، الحَرَكَات، المَقَاطِع، الكَلِمَات، مَوْقِعُ الصَّوْت، الجُمَل، وَالتَّحَدِّي النِّهَائِي!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            audioManager.playPortal();
            onSelectLetter('baa');
          }}
          className="game-btn px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-pink hover:scale-105 whitespace-nowrap"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>ابْدَأ رِحْلَةَ حَرْفِ ب 🚀</span>
        </button>
      </div>

      {/* Quick Access World Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: '🌿 وادي الحروف', desc: 'اسْتَكْشِف الحُرُوفَ فِي الوَادِي الأَخْضَر', action: onOpenMap, color: 'border-emerald-300 bg-emerald-50' },
          { title: '🌲 غابة المقاطع', desc: 'أَشْجَارٌ تَنْمُو بِنُطْقِ الحَرَكَاتِ وَالمُدُود', action: onOpenMap, color: 'border-green-300 bg-green-50' },
          { title: '🏘️ قرية الكلمات', desc: 'قَرْيَةٌ سِحْرِيَّةٌ لِتَرْكِيبِ الكَلِمَات', action: onOpenMap, color: 'border-amber-300 bg-amber-50' }
        ].map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              audioManager.playClick();
              item.action();
            }}
            className={`game-card p-5 border-3 ${item.color} cursor-pointer hover:scale-105 transition-all flex flex-col justify-between`}
          >
            <div>
              <h4 className="text-lg font-black text-slate-900 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-600 font-bold">{item.desc}</p>
            </div>
            <span className="text-xs font-black text-sky-600 mt-3 flex items-center gap-1">
              <span>ادخل الآن</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};
