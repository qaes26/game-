import React, { useState } from 'react';
import { Play, Sparkles, Trophy, ArrowRight, Volume2 } from 'lucide-react';
import { soundManager } from '../../services/audio/SoundManager';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';
import { LetterBubblePopGame } from './LetterBubblePopGame';
import { SyllableTrainGame } from './SyllableTrainGame';
import { WordBoxBuilderGame } from './WordBoxBuilderGame';
import { WordPictureHunterGame } from './WordPictureHunterGame';
import { SpeechGateGame } from './SpeechGateGame';
import { SoundMemoryGame } from './SoundMemoryGame';
import { LoulouRunnerGame } from './LoulouRunnerGame';

interface MiniGamesHubProps {
  onBackToHome: () => void;
  selectedGameId?: string | null;
}

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  onBackToHome,
  selectedGameId = null
}) => {
  const { childName } = useGame();
  const [activeGame, setActiveGame] = useState<string | null>(selectedGameId);

  const games = [
    {
      id: 'bubble_pop',
      title: 'صَيْدُ الحَرْفِ وَفَرْقَعَةُ الفَقَاعَات 🫧',
      desc: 'افْقَعْ الفَقَاعَاتِ الَّتِي تَحْمِلُ الحَرْفَ المَطْلُوبَ وَاجْمَعِ النُّجُوم!',
      icon: '🫧',
      color: 'from-sky-400 to-blue-500',
      borderColor: 'border-sky-300'
    },
    {
      id: 'syllable_train',
      title: 'قِطَارُ المَقَاطِعِ السَّرِيع 🚂',
      desc: 'رَكِّبْ عَرَبَةَ المَقْطَعِ الصَّحِيحِ لِيَتَحَرَّكَ القِطَارُ السِّحْرِيّ!',
      icon: '🚂',
      color: 'from-emerald-400 to-green-600',
      borderColor: 'border-emerald-300'
    },
    {
      id: 'word_hunter',
      title: 'صَيْدُ الكَلِمَاتِ وَالصُّوَر 🎯',
      desc: 'اخْتَرْ الصُّورَةَ المُنَاسِبَةَ لِلكَلِمَةِ المَنْطُوقَةِ بِمَهَارَة!',
      icon: '🎯',
      color: 'from-amber-400 to-orange-500',
      borderColor: 'border-amber-300'
    }
  ];

  if (activeGame === 'bubble_pop') return <LetterBubblePopGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'syllable_train') return <SyllableTrainGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'word_hunter') return <WordPictureHunterGame onBack={() => setActiveGame(null)} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Bar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToHome();
            }}
            className="p-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            title="العودة للرئيسية"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
              <span>قَلْعَةُ الأَلْعَابِ التَّعْلِيمِيَّة</span>
              <span className="text-2xl">🎮</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-bold">
              3 أَلْعَابٍ بَطُولِيَّةٍ مُمْتِعَة لِتَرْسِيخِ النُّطْقِ وَالأَصْوَاتِ وَالكَلِمَات!
            </p>
          </div>
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`مَرْكَزُ الأَلْعَابِ التَّفَاعُلِيَّةِ يَا ${childName || 'البَطَل'}! اخْتَرْ أَيَّ لُعْبَةٍ تُحِبُّهَا لِتَصِيدَ الفَقَاعَاتِ أَوْ تُسَيِّرَ قِطَارَ المَقَاطِعِ وَتَجْمَعَ النُّجُوم!` }
        shortHint="اخْتَرْ لُعْبَتَكَ المُفَضَّلَة"
        autoSpeak={true}
        emotion="happy"
      />

      {/* Games List Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map(game => (
          <div
            key={game.id}
            onClick={() => {
              soundManager.playClick();
              setActiveGame(game.id);
            }}
            className={`game-card p-6 border-4 ${game.borderColor} cursor-pointer group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[220px] bg-white`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                  {game.icon}
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.playClick();
                      audioManager.speak(game.desc);
                    }}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-sky-600 rounded-xl text-[10px] font-black border border-slate-200 shadow-sm flex items-center gap-1 transition-all active:scale-95"
                    title="اسْتَمِعْ لِشَرْحِ اللُّعْبَة"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>الشَّرْح</span>
                  </button>
                  <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    مَجَّانِيَّة 🌟
                  </span>
                </div>
              </div>

              <h3 className="text-lg md:text-xl font-black text-slate-800 group-hover:text-sky-600 transition-colors mb-1">
                {game.title}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {game.desc}
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-black text-slate-500">
                مُسْتَوَى مُمْتِع
              </span>
              <button className="game-btn px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-black text-xs">
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>الْعَبْ الآن</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
