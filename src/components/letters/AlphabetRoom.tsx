import React, { useState } from 'react';
import { Sparkles, Trophy, Volume2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../lumi/LumiMascot';

interface AlphabetRoomProps {
  onSelectLetter: (letterId: string) => void;
  onBackToHome: () => void;
}

export const AlphabetRoom: React.FC<AlphabetRoomProps> = ({
  onSelectLetter,
  onBackToHome
}) => {
  const { letterProgressMap, isVisualFirst } = useGame();
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);

  const handleLetterClick = (letter: LetterData) => {
    audioManager.playClick();
    audioManager.speak(`حرف ${letter.nameAr} .. ${letter.char}`);
    onSelectLetter(letter.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Header */}
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
              <span>غُرْفَةُ الحُرُوفِ العَرَبِيَّةِ (28 حَرْفًا)</span>
              <span className="text-2xl">🔤</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold mt-0.5">
              جَمِيعُ الحُرُوفِ مُتَاحَةٌ دَائِمًا! اخْتَرْ أَيَّ حَرْفٍ لِبَدْءِ رِحْلَتِهِ الخَاصَّة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-2 rounded-2xl border-2 border-amber-300">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span className="text-xs font-black text-amber-900">
            اخْتِيَارٌ حُرٌّ دُونَ أَقْفَال 🔓
          </span>
        </div>
      </div>

      {/* Mascot Notice */}
      <div className="bg-sky-50/90 border-2 border-sky-200 rounded-3xl p-4 flex items-center justify-between">
        <LumiMascot
          message="اخْتَرْ أَيَّ حَرْفٍ تُرِيدُهُ لِتَنْطَلِقَ فِي مَرَاحِلِهِ الثَّمَانِيَةِ المُمْتِعَة!"
          emotion="happy"
          size="sm"
        />
      </div>

      {/* 28 Arabic Letters Grid in EXACT Order */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
        {ARABIC_LETTERS.map((letter) => {
          const progress = letterProgressMap[letter.id] || {
            discovery: false,
            sound: false,
            vowels: false,
            syllables: false,
            words: false,
            soundPosition: false,
            sentences: false,
            finalChallenge: false,
            currentStage: 1,
            masteryPercentage: 0
          };

          const isMastered = progress.masteryPercentage === 100;
          const isInProgress = progress.masteryPercentage > 0 && !isMastered;

          return (
            <div
              key={letter.id}
              onClick={() => handleLetterClick(letter)}
              onMouseEnter={() => setHoveredLetter(letter.id)}
              onMouseLeave={() => setHoveredLetter(null)}
              className={`relative game-card p-4 flex flex-col items-center justify-between min-h-[175px] border-4 cursor-pointer transition-all duration-200 select-none bg-white hover:-translate-y-2 hover:shadow-2xl active:scale-95 ${
                isMastered
                  ? 'border-amber-400 bg-gradient-to-b from-amber-50 to-yellow-50 shadow-glow-yellow'
                  : isInProgress
                  ? 'border-sky-400 bg-gradient-to-b from-sky-50 to-blue-50'
                  : 'border-slate-200 hover:border-sky-300'
              }`}
            >
              {/* Card Top: Order Badge & Audio Preview */}
              <div className="w-full flex items-center justify-between text-xs">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-black text-[11px] flex items-center justify-center border">
                  {letter.order}
                </span>

                {/* Sound preview button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    audioManager.speak(letter.char);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-sky-600 hover:bg-sky-100 transition-colors"
                  title="استمع لصوت الحرف"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Big Arabic Letter Character */}
              <div className="my-2">
                <span className="text-5xl md:text-6xl font-black text-slate-800 transition-transform duration-200 group-hover:scale-110">
                  {letter.char}
                </span>
              </div>

              {/* Letter Name & Example */}
              <div className="w-full text-center space-y-1">
                <div className="text-xs font-black text-slate-800">
                  {letter.nameAr}
                </div>

                <div className="text-[11px] text-slate-500 font-bold flex items-center justify-center gap-1">
                  <span>{letter.words[0]?.emoji}</span>
                  <span>{letter.words[0]?.word}</span>
                </div>

                {/* Progress Ring / Percentage Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2 border">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isMastered ? 'bg-amber-400' : 'bg-sky-500'
                    }`}
                    style={{ width: `${progress.masteryPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-black text-slate-500 pt-0.5">
                  <span>المرحلة {progress.currentStage}/8</span>
                  <span>%{progress.masteryPercentage}</span>
                </div>
              </div>

              {/* Mastered Star Sparkle */}
              {isMastered && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce-slow text-sm">
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
