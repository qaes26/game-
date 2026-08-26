import React from 'react';
import { ArrowRight, Volume2, Play, Lock, CheckCircle2, Star, Sparkles, Crown } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../lumi/LumiMascot';

interface CleanLetterOverviewProps {
  letterId: string;
  onBackToLetterSelect: () => void;
  onStartStage: (stageNum: number) => void;
}

export const CleanLetterOverview: React.FC<CleanLetterOverviewProps> = ({
  letterId,
  onBackToLetterSelect,
  onStartStage
}) => {
  const { childName, letterProgressMap } = useGame();

  const letter: LetterData = ARABIC_LETTERS.find(l => l.id === letterId) || ARABIC_LETTERS[1];
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

  const isStageUnlocked = (stageNum: number) => {
    if (stageNum === 1) return true;
    const stageKeys = ['discovery', 'sound', 'vowels', 'syllables', 'words', 'soundPosition', 'sentences', 'finalChallenge'];
    const prevKey = stageKeys[stageNum - 2];
    return (progress as any)[prevKey] === true || progress.currentStage >= stageNum;
  };

  const activeStage = progress.currentStage || 1;
  const activeStageDef = STAGE_CURRICULUM_DEFINITIONS.find(s => s.stageNumber === activeStage) || STAGE_CURRICULUM_DEFINITIONS[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060a17] via-[#0a1435] to-[#060a17] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-hidden">
      
      {/* Glow Ambience */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border-3 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <button
          onClick={() => {
            audioManager.playClick();
            onBackToLetterSelect();
          }}
          className="p-3 rounded-2xl bg-[#132252] border-2 border-amber-400/50 text-amber-300 hover:bg-amber-950/50 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-2 font-black text-xs"
        >
          <ArrowRight className="w-5 h-5" />
          <span>مَرْصَدُ الحُرُوف</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-300">
            حَرْفُ {letter.nameAr}
          </span>
          <span className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black flex items-center justify-center border-2 border-white shadow-glow-yellow text-sm">
            {letter.order}
          </span>
        </div>
      </header>

      {/* Main Focus Card */}
      <main className="relative z-10 max-w-4xl mx-auto w-full my-auto space-y-6">
        
        {/* Big Letter Hero Card: Royal Gold & Blue */}
        <div className="bg-gradient-to-r from-[#162758] via-[#0f1d47] to-[#162758] rounded-3xl p-6 md:p-8 border-3 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.3)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Big Glowing Royal Letter */}
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 flex items-center justify-center text-8xl font-black border-4 border-white shadow-glow-yellow animate-wiggle">
              {letter.char}
            </div>

            <div className="space-y-2">
              <span className="inline-block bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full border border-white shadow-sm">
                رِحْلَةُ حَرْفِ {letter.nameAr} المَلَكِيَّة 👑
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                حَرْفُ ({letter.char}) — {letter.words[0]?.word} {letter.words[0]?.emoji}
              </h2>
              <p className="text-xs md:text-sm text-cyan-200 font-bold max-w-md">
                المرحلة الحالية: {activeStageDef.stageNumber}. {activeStageDef.titleAr} ({activeStageDef.landmark3D})
              </p>
            </div>
          </div>

          {/* Big Action Button */}
          <div className="flex flex-col gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                audioManager.playPortal();
                onStartStage(activeStage);
              }}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 whitespace-nowrap"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>ابْدَأِ المَرْحَلَةَ {activeStage} 🚀</span>
            </button>

            <button
              onClick={() => audioManager.speak(letter.char)}
              className="px-4 py-2.5 bg-[#132252] hover:bg-[#1a2f6e] text-amber-300 rounded-xl font-black text-xs border-2 border-amber-400/40 flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>اسْتَمِعْ لِصَوْتِ الحَرْف 🔊</span>
            </button>
          </div>
        </div>

        {/* 8-Stage Sequential Roadmap Grid */}
        <div className="bg-[#0b1638]/90 backdrop-blur-md p-6 rounded-3xl border-3 border-blue-900/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>مَرَاحِلُ حَرْفِ {letter.nameAr} (8 مَرَاحِلَ مُتَسَلْسِلَة)</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40">
              إِتْقَانُ الحَرْف: %{progress.masteryPercentage}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STAGE_CURRICULUM_DEFINITIONS.map((stg) => {
              const isUnlocked = isStageUnlocked(stg.stageNumber);
              const isActive = activeStage === stg.stageNumber;
              const isCompleted = (progress as any)[['discovery', 'sound', 'vowels', 'syllables', 'words', 'soundPosition', 'sentences', 'finalChallenge'][stg.stageNumber - 1]];

              return (
                <button
                  key={stg.stageNumber}
                  onClick={() => {
                    if (isUnlocked) {
                      audioManager.playClick();
                      onStartStage(stg.stageNumber);
                    } else {
                      audioManager.playClick();
                      audioManager.speak('أَكْمِلِ المَرْحَلَةَ السَّابِقَةَ أَوَّلًا لِفَتْحِ هَذِهِ المَرْحَلَة!');
                    }
                  }}
                  className={`p-4 rounded-2xl border-2 text-right transition-all flex flex-col justify-between min-h-[115px] ${
                    isActive
                      ? 'bg-gradient-to-b from-[#1c3570] to-[#0f1f47] border-amber-400 shadow-glow-yellow'
                      : isCompleted
                      ? 'bg-emerald-950/70 border-emerald-400/70 text-emerald-200'
                      : isUnlocked
                      ? 'bg-[#132252] border-slate-700 hover:border-amber-400/60 text-slate-200'
                      : 'bg-[#060c1f] border-slate-800 text-slate-600 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black">
                      {stg.stageNumber}. {stg.titleAr}
                    </span>
                    <span>
                      {isCompleted ? '👑' : !isUnlocked ? '🔒' : '📍'}
                    </span>
                  </div>

                  <p className="text-[11px] text-cyan-200/80 font-medium line-clamp-2 mt-1">
                    {stg.objectiveAr}
                  </p>

                  <span className="text-[10px] text-amber-300 font-bold mt-2">
                    {stg.landmark3D}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-xs text-amber-200/70 font-bold py-2">
        <span>LUMI — رِحْلَةُ حَرْفِ {letter.nameAr} • خُطْوَةً بِخُطْوَة</span>
      </footer>

    </div>
  );
};
