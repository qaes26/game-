import React, { useState } from 'react';
import { Play, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { soundManager } from '../../services/audio/SoundManager';
import { LetterBubblePopGame } from './LetterBubblePopGame';
import { SyllableTrainGame } from './SyllableTrainGame';
import { WordBoxBuilderGame } from './WordBoxBuilderGame';
import { WordPictureHunterGame } from './WordPictureHunterGame';
import { SpeechGateGame } from './SpeechGateGame';
import { SoundMemoryGame } from './SoundMemoryGame';
import { LoulouRunnerGame } from './LoulouRunnerGame';
import { LoulouMascot } from '../mascot/LoulouMascot';

interface MiniGamesHubProps {
  onBackToHome: () => void;
  selectedGameId?: string | null;
}

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  onBackToHome,
  selectedGameId = null
}) => {
  const [activeGame, setActiveGame] = useState<string | null>(selectedGameId);

  const games = [
    {
      id: 'bubble_pop',
      title: 'صَيْدُ الحَرْف 🫧',
      desc: 'افْقَعْ الفَقَاعَاتِ الَّتِي تَحْمِلُ الحَرْفَ المَطْلُوب!',
      icon: '🫧',
      color: 'from-sky-400 to-blue-500',
      borderColor: 'border-sky-300'
    },
    {
      id: 'syllable_train',
      title: 'قِطَارُ المَقَاطِع 🚂',
      desc: 'رَكِّبْ عَرَبَةَ المَقْطَعِ الصَّحِيحِ لِيَتَحَرَّكَ القِطَار!',
      icon: '🚂',
      color: 'from-emerald-400 to-green-600',
      borderColor: 'border-emerald-300'
    },
    {
      id: 'word_builder',
      title: 'صُنْدُوقُ الكَلِمَات 📦',
      desc: 'رَتِّبْ الحُرُوفَ لِتَكْوِينِ كَلِمَةِ الصُّورَةِ المَعْرُوضَة!',
      icon: '📦',
      color: 'from-amber-400 to-orange-500',
      borderColor: 'border-amber-300'
    },
    {
      id: 'word_hunter',
      title: 'صَيْدُ الكَلِمَة 🎯',
      desc: 'اخْتَرْ الصُّورَةَ المُنَاسِبَةَ لِلكَلِمَةِ المَنْطُوقَة!',
      icon: '🎯',
      color: 'from-pink-400 to-rose-500',
      borderColor: 'border-pink-300'
    },
    {
      id: 'speech_gate',
      title: 'بَوَّابَةُ النُّطْق 🏰',
      desc: 'قُلْ كَلِمَةَ السِّرِّ بِالمِيكْرُوفُونِ لِفَتْحِ البَوَّابَةِ السِّحْرِيَّة!',
      icon: '🏰',
      color: 'from-purple-500 to-indigo-600',
      borderColor: 'border-purple-300'
    },
    {
      id: 'sound_memory',
      title: 'ذَاكِرَةُ الأَصْوَات 🎴',
      desc: 'اطْلُبْ بَيْنَ الكَلِمَاتِ وَالأَصْوَاتِ وَالصُّوَرِ المُتَطَابِقَة!',
      icon: '🎴',
      color: 'from-teal-400 to-cyan-600',
      borderColor: 'border-teal-300'
    },
    {
      id: 'loulou_runner',
      title: 'سِبَاقُ لُولُو 🏃‍♂️',
      desc: 'سَاعِدْ لُولُو فِي الفَوْزِ بِالسِّبَاقِ بِحَلِّ التَّحَدِّيَاتِ الصَّوْتِيَّة!',
      icon: '🏃‍♂️',
      color: 'from-yellow-400 to-amber-500',
      borderColor: 'border-yellow-300'
    }
  ];

  if (activeGame === 'bubble_pop') return <LetterBubblePopGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'syllable_train') return <SyllableTrainGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'word_builder') return <WordBoxBuilderGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'word_hunter') return <WordPictureHunterGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'speech_gate') return <SpeechGateGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'sound_memory') return <SoundMemoryGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'loulou_runner') return <LoulouRunnerGame onBack={() => setActiveGame(null)} />;

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
              7 أَلْعَابٍ صَغِيرَةٍ مُمْتِعَة لِتَرْسِيخِ النُّطْقِ وَالأَصْوَاتِ وَالكَلِمَات!
            </p>
          </div>
        </div>
      </div>

      {/* Mascot Notice */}
      <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-4 flex items-center justify-between">
        <LoulouMascot
          message="اخْتَرْ اللُّعْبَةَ الَّتِي تُفَضِّلُهَا لِتَرْبَحَ النُّجُومَ وَالعُمْلَات!"
          emotion="happy"
          size="sm"
        />
      </div>

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
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  مَجَّانِيَّة لِلَّعِب 🌟
                </span>
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
