import React, { useState } from 'react';
import { Lock, Trophy, Sparkles, Volume2, ArrowRight, CheckCircle2 } from 'lucide-react';
import lettersData from '../../data/letters.json';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { LoulouMascot } from '../mascot/LoulouMascot';

interface LetterSelectionGridProps {
  onSelectLetter: (letterId: string) => void;
  onBackToHome: () => void;
}

export const LetterSelectionGrid: React.FC<LetterSelectionGridProps> = ({
  onSelectLetter,
  onBackToHome
}) => {
  const { letterProgress, isVisualMode } = useGame();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'learning' | 'mastered'>('all');

  const filteredLetters = lettersData.filter((letter) => {
    const progress = letterProgress[letter.id];
    const status = progress ? progress.status : (letter.defaultUnlocked ? 'available' : 'locked');

    if (filter === 'unlocked') return status !== 'locked';
    if (filter === 'learning') return status === 'learning';
    if (filter === 'mastered') return status === 'mastered';
    return true;
  });

  const handleLetterClick = (letter: typeof lettersData[0]) => {
    const progress = letterProgress[letter.id];
    const isLocked = progress ? progress.status === 'locked' : !letter.defaultUnlocked;

    if (isLocked) {
      soundManager.playEncouragement();
      soundManager.speak(`حرف ${letter.nameAr} مقفل حاليًا. أكمل تدريب الحروف السابقة لفتحه!`);
      return;
    }

    soundManager.playClick();
    soundManager.speak(letter.character);
    onSelectLetter(letter.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Header with Back button and Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToHome();
            }}
            className="p-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            title="العودة للرئيسية"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
              <span>اخْتَرْ الحَرْفَ الَّذِي تُرِيدُ تَعَلُّمَهُ</span>
              <span className="text-xl">🔤</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-medium mt-0.5">
              كُلُّ حَرْفٍ يَحْتَوِي عَلَى رِحْلَةٍ تَعْلِيمِيَّةٍ كَامِلَةٍ مِنْ 8 مُسْتَوَيَات!
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border-2 border-slate-200 shadow-sm">
          {[
            { id: 'all', label: 'الكُلّ' },
            { id: 'unlocked', label: 'المَفْتُوحَة 🔓' },
            { id: 'learning', label: 'قَيْد التَّدْرِيب ⏳' },
            { id: 'mastered', label: 'المُكْتَمَلَة 🏆' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                soundManager.playClick();
                setFilter(f.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                filter === f.id
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loulou Guide Message */}
      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 flex items-center justify-between">
        <LoulouMascot
          message="اضْغَطْ عَلَى أَيِّ حَرْفٍ مَفْتُوحٍ لِبَدْءِ رِحْلَتِهِ المُمْتِعَة!"
          emotion="happy"
          size="sm"
          autoSpeak={false}
        />
      </div>

      {/* Letters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
        {filteredLetters.map((letter) => {
          const progress = letterProgress[letter.id] || {
            recognition: 0,
            sound: 0,
            syllables: 0,
            words: 0,
            sentences: 0,
            overall: 0,
            status: letter.defaultUnlocked ? 'available' : 'locked',
            attempts: 0,
            currentLevel: 1
          };

          const isLocked = progress.status === 'locked';
          const isMastered = progress.status === 'mastered';
          const isLearning = progress.status === 'learning';

          return (
            <div
              key={letter.id}
              onClick={() => handleLetterClick(letter)}
              className={`relative game-card p-4 flex flex-col items-center justify-between min-h-[160px] border-4 cursor-pointer transition-all duration-200 select-none ${
                isMastered
                  ? 'border-amber-400 bg-gradient-to-b from-amber-50 to-yellow-50 shadow-glow-yellow'
                  : isLearning
                  ? 'border-sky-400 bg-gradient-to-b from-sky-50 to-blue-50'
                  : isLocked
                  ? 'border-slate-200 bg-slate-100/80 opacity-70 cursor-not-allowed'
                  : 'border-emerald-300 bg-white hover:border-emerald-400'
              } ${!isLocked ? 'hover:-translate-y-1.5 hover:shadow-card-pop active:scale-95' : ''}`}
            >
              {/* Status Badge */}
              <div className="w-full flex items-center justify-between text-xs">
                {isMastered ? (
                  <span className="bg-amber-400 text-slate-900 font-black px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px]">
                    <Trophy className="w-3 h-3" />
                    مُكْتَمَل
                  </span>
                ) : isLearning ? (
                  <span className="bg-sky-500 text-white font-bold px-2 py-0.5 rounded-full text-[10px]">
                    المستوى {progress.currentLevel}/8
                  </span>
                ) : isLocked ? (
                  <span className="bg-slate-300 text-slate-700 font-bold px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    مُقْفَل
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                    مَفْتُوح
                  </span>
                )}

                {/* Audio Preview button */}
                {!isLocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.speak(letter.character);
                    }}
                    className="p-1 rounded-full text-slate-400 hover:text-sky-600 hover:bg-sky-100 transition-colors"
                    title="استمع لصوت الحرف"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Big Arabic Character */}
              <div className="my-2">
                <span className={`text-5xl md:text-6xl font-black transition-transform duration-200 ${
                  isLocked ? 'text-slate-400' : 'text-slate-800'
                }`}>
                  {letter.character}
                </span>
              </div>

              {/* Name & Example */}
              <div className="w-full text-center">
                <div className="text-xs font-black text-slate-700">
                  {letter.nameAr}
                </div>
                <div className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                  <span>{letter.exampleEmoji}</span>
                  <span>{letter.exampleWord}</span>
                </div>

                {/* Progress Mini Bar */}
                {isLearning && (
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress.overall}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Mastered Star Sparkle */}
              {isMastered && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce-slow">
                  ⭐
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};
