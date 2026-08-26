import React from 'react';
import { ArrowRight, Volume2, Sparkles, Star, Crown } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../lumi/LumiMascot';

interface CleanLetterSelectProps {
  onSelectLetter: (letterId: string) => void;
  onBackToMenu: () => void;
}

export const CleanLetterSelect: React.FC<CleanLetterSelectProps> = ({
  onSelectLetter,
  onBackToMenu
}) => {
  const { childName, letterProgressMap } = useGame();

  const handleLetterClick = (letter: LetterData) => {
    audioManager.playPortal();
    audioManager.speak(letter.char);
    onSelectLetter(letter.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060a17] via-[#0a1435] to-[#060a17] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border-3 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToMenu();
            }}
            className="p-3 rounded-2xl bg-[#132252] border-2 border-amber-400/50 text-amber-300 hover:bg-amber-950/50 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-1.5 font-black text-xs"
            title="العودة للقائمة الرئيسية"
          >
            <ArrowRight className="w-5 h-5" />
            <span>الرَّئِيسِيَّة</span>
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-white flex items-center gap-2">
              <span>مَرْصَدُ الحُرُوفِ المَلَكِيّ (28 حَرْفًا)</span>
              <span>👑</span>
            </h1>
            <p className="text-xs text-cyan-200 font-bold">
              اخْتَرْ أَيَّ حَرْفٍ لِتَبْدَأَ رِحْلَتَهُ بِصَوْتِ الفَتَاةِ الفَصِيح!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-4 py-2 rounded-2xl border-2 border-white text-xs font-black shadow-glow-yellow">
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>جَمِيعُ الحُرُوفِ مَفْتُوحَة 🔓</span>
        </div>
      </header>

      {/* Main Grid Area: Clean, Spacious, Highly Legible */}
      <main className="relative z-10 max-w-6xl mx-auto w-full my-6 space-y-4">
        
        {/* Mascot Prompt */}
        <div className="flex justify-center">
          <LumiMascot
            message={`اضْغَطْ عَلَى أَيِّ حَرْفٍ يَا ${childName || 'البَطَل'} لِتَسْتَمِعَ لِصَوْتِهِ المَلَكِيِّ النَّقِيّ!`}
            emotion="happy"
            size="sm"
          />
        </div>

        {/* 28 Arabic Letters in Exact Order */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3.5 md:gap-4">
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
                className={`relative p-4 rounded-3xl border-3 flex flex-col items-center justify-between min-h-[185px] cursor-pointer transition-all duration-300 select-none bg-[#0a1435]/95 backdrop-blur-md hover:-translate-y-2 active:scale-95 shadow-xl group ${
                  isMastered
                    ? 'border-amber-400 bg-gradient-to-b from-amber-950/60 to-[#0a1435] shadow-[0_0_25px_rgba(245,158,11,0.4)]'
                    : isInProgress
                    ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/60 to-[#0a1435] shadow-glow-cyan'
                    : 'border-blue-900/60 hover:border-amber-400/80 hover:bg-[#132252]/90 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                }`}
              >
                {/* Order Badge & Sound Play */}
                <div className="w-full flex items-center justify-between text-xs">
                  <span className="w-7 h-7 rounded-full bg-[#132252] text-amber-300 font-black text-xs flex items-center justify-center border-2 border-amber-400/50 shadow-sm">
                    {letter.order}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audioManager.speak(letter.char);
                    }}
                    className="p-1.5 rounded-xl text-amber-300 hover:text-white hover:bg-amber-500/40 border border-amber-400/30 transition-colors shadow-sm"
                    title="اسْتَمِعْ لِصَوْتِ الحَرْف"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Big Royal Arabic Letter */}
                <div className="my-1">
                  <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-amber-200 via-yellow-300 to-white group-hover:scale-115 transition-transform duration-300 inline-block drop-shadow-[0_4px_10px_rgba(245,158,11,0.5)]">
                    {letter.char}
                  </span>
                </div>

                {/* Letter Name & Example */}
                <div className="w-full text-center space-y-1">
                  <div className="text-xs font-black text-white group-hover:text-amber-200 transition-colors">
                    حَرْفُ {letter.nameAr}
                  </div>

                  <div className="text-[11px] text-cyan-200 font-bold flex items-center justify-center gap-1">
                    <span>{letter.words[0]?.emoji}</span>
                    <span>{letter.words[0]?.word}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#132252] h-2 rounded-full overflow-hidden mt-1 border border-blue-900">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isMastered ? 'bg-amber-400 shadow-glow-yellow' : 'bg-cyan-400'
                      }`}
                      style={{ width: `${progress.masteryPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-black text-amber-200/80 pt-0.5">
                    <span>المرحلة {progress.currentStage}/8</span>
                    <span>%{progress.masteryPercentage}</span>
                  </div>
                </div>

                {/* Mastered Badge */}
                {isMastered && (
                  <div className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 rounded-full flex items-center justify-center border-2 border-white shadow-glow-yellow text-base animate-bounce-slow">
                    👑
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-xs text-amber-200/70 font-bold py-2">
        <span>LUMI — جَمِيعُ الحُرُوفِ العَرَبِيَّةِ مُتَاحَةٌ بِصَوْتِ الفَتَاةِ النَّقِيّ ✨</span>
      </footer>

    </div>
  );
};
