import React, { useState } from 'react';
import { Sparkles, ArrowRight, Volume2, Play, Lock, CheckCircle2 } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../lumi/LumiMascot';

interface LetterObservatory3DProps {
  onSelectLetter: (letterId: string) => void;
  onBackToHome: () => void;
}

export const LetterObservatory3D: React.FC<LetterObservatory3DProps> = ({
  onSelectLetter,
  onBackToHome
}) => {
  const { childName, letterProgressMap } = useGame();
  const [hoveredLetter, setHoveredLetter] = useState<LetterData | null>(null);

  const handleLetterClick = (letter: LetterData) => {
    audioManager.playPortal();
    audioManager.speak(`حَرْفُ ${letter.nameAr} .. ${letter.char}`);
    onSelectLetter(letter.id);
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
              <span>مَرْصَدُ الحُرُوفِ العَرَبِيَّة (28 حَرْفًا)</span>
              <span className="text-2xl">🌌</span>
            </h1>
            <p className="text-xs md:text-sm text-cyan-300 font-bold mt-0.5">
              جَمِيعُ الحُرُوفِ مُتَاحَةٌ بِالتَّرْتِيبِ الهِجَائِيِّ الدَّقِيق • اخْتَرْ أَيَّ حَرْفٍ لِبَدْءِ رِحْلَتِهِ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-4 py-2 rounded-2xl border border-amber-500/40 text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-black">
            اخْتِيَارٌ حُرٌّ كَامِلٌ لِلأَبْطَال 🔓
          </span>
        </div>
      </div>

      {/* Mascot Notice */}
      <div className="bg-[#0f172a]/80 border border-indigo-500/30 rounded-3xl p-4 flex items-center justify-between">
        <LumiMascot
          message={`اخْتَرْ أَيَّ حَرْفٍ تُرِيدُ اسْتِكْشَافَهُ يَا ${childName}.. رِحْلَةُ حَرْفِ البَاءِ (ب) جَاهِزَةٌ بِالكَامِل!`}
          emotion="happy"
          size="sm"
        />
      </div>

      {/* 28 Arabic Letters Grid in EXACT Alphabetical Order */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5 md:gap-4">
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
              onMouseEnter={() => setHoveredLetter(letter)}
              onMouseLeave={() => setHoveredLetter(null)}
              className={`relative p-5 rounded-3xl border-2 flex flex-col items-center justify-between min-h-[190px] cursor-pointer transition-all duration-300 select-none bg-[#0f172a]/90 backdrop-blur-md hover:-translate-y-2 active:scale-95 shadow-lg group ${
                isMastered
                  ? 'border-amber-400/80 bg-gradient-to-b from-amber-950/40 to-[#0f172a] shadow-glow-yellow'
                  : isInProgress
                  ? 'border-cyan-400/80 bg-gradient-to-b from-cyan-950/40 to-[#0f172a] shadow-glow-cyan'
                  : 'border-slate-800 hover:border-cyan-400/50 hover:bg-[#1e293b]/70'
              }`}
            >
              {/* Order Number & Audio Preview */}
              <div className="w-full flex items-center justify-between text-xs">
                <span className="w-6 h-6 rounded-full bg-[#1e293b] text-slate-300 font-black text-[11px] flex items-center justify-center border border-slate-700">
                  {letter.order}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    audioManager.speak(letter.char);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/50 transition-colors"
                  title="استمع لصوت الحرف"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* 3D-styled Arabic Letter */}
              <div className="my-2">
                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 via-indigo-200 to-white group-hover:scale-110 transition-transform duration-300 inline-block drop-shadow-md">
                  {letter.char}
                </span>
              </div>

              {/* Letter Name & Example */}
              <div className="w-full text-center space-y-1">
                <div className="text-xs font-black text-white">
                  {letter.nameAr}
                </div>

                <div className="text-[11px] text-slate-400 font-bold flex items-center justify-center gap-1">
                  <span>{letter.words[0]?.emoji}</span>
                  <span>{letter.words[0]?.word}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden mt-2 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isMastered ? 'bg-amber-400' : 'bg-cyan-500'
                    }`}
                    style={{ width: `${progress.masteryPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-black text-slate-400 pt-0.5">
                  <span>المرحلة {progress.currentStage}/8</span>
                  <span>%{progress.masteryPercentage}</span>
                </div>
              </div>

              {/* Mastered Badge */}
              {isMastered && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center border-2 border-white shadow-md text-sm animate-bounce-slow">
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
