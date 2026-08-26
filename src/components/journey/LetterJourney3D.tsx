import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, Lock, CheckCircle2, Trophy, Play, Star, Award } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS, StageDefinition } from '../../engine/CurriculumEngine';
import { aiChallengeEngine, GeneratedChallenge } from '../../engine/AIChallengeEngine';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../lumi/LumiMascot';

interface LetterJourney3DProps {
  letterId: string;
  onBackToAlphabet: () => void;
  onSelectAnotherLetter: (id: string) => void;
}

export const LetterJourney3D: React.FC<LetterJourney3DProps> = ({
  letterId,
  onBackToAlphabet,
  onSelectAnotherLetter
}) => {
  const { childName, letterProgressMap, updateLetterStage, addStars, addCoins, triggerVictoryCelebration } = useGame();

  const letter: LetterData = ARABIC_LETTERS.find(l => l.id === letterId) || ARABIC_LETTERS[1]; // default 'ب'
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

  const [activeStageNum, setActiveStageNum] = useState<number>(progress.currentStage || 1);
  const [currentChallenge, setCurrentChallenge] = useState<GeneratedChallenge | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [stageAttempts, setStageAttempts] = useState<{ total: number; success: number }>({ total: 0, success: 0 });

  // Initialize or generate challenge when stage changes
  React.useEffect(() => {
    const ch = aiChallengeEngine.generateStageChallenge(
      letter.id,
      activeStageNum,
      {
        letterId: letter.id,
        stageNumber: activeStageNum,
        attemptsCount: stageAttempts.total,
        successfulAttempts: stageAttempts.success,
        recentMistakes: [],
        averageConfidence: 0.9
      },
      childName
    );
    setCurrentChallenge(ch);
    setFeedbackMessage(null);
  }, [activeStageNum, letter.id, childName]);

  const activeStageDef = STAGE_CURRICULUM_DEFINITIONS.find(s => s.stageNumber === activeStageNum) || STAGE_CURRICULUM_DEFINITIONS[0];

  // Stage unlocking logic: Stage 1 unlocked. Stages 2..8 unlocked only if previous completed
  const isStageUnlocked = (stageNum: number) => {
    if (stageNum === 1) return true;
    const stageKeys = ['discovery', 'sound', 'vowels', 'syllables', 'words', 'soundPosition', 'sentences', 'finalChallenge'];
    const prevKey = stageKeys[stageNum - 2];
    return (progress as any)[prevKey] === true || progress.currentStage >= stageNum;
  };

  const handleSelectStage = (stgNum: number) => {
    if (!isStageUnlocked(stgNum)) {
      audioManager.playClick();
      audioManager.speak(`هَذِهِ المَرْحَلَةُ مُغْلَقَةٌ حَتَّى تُتِمَّ المَرْحَلَةَ السَّابِقَةَ يَا ${childName}!`);
      return;
    }
    audioManager.playClick();
    setActiveStageNum(stgNum);
  };

  const handleOptionChoice = (option: { id: string; text: string; isCorrect: boolean }) => {
    setStageAttempts(prev => ({
      total: prev.total + 1,
      success: prev.success + (option.isCorrect ? 1 : 0)
    }));

    if (option.isCorrect) {
      audioManager.playVictory();
      setFeedbackMessage(currentChallenge?.encouragingFeedbackAr || `أَحْسَنْتَ يَا ${childName}!`);
      addStars(1);
      addCoins(5);

      // Mastery evaluation
      const evaluation = aiChallengeEngine.evaluateMastery(stageAttempts.total + 1, stageAttempts.success + 1);
      
      setTimeout(() => {
        setFeedbackMessage(null);
        updateLetterStage(letter.id, activeStageNum, true);

        if (activeStageNum < 8) {
          setActiveStageNum(prev => prev + 1);
        } else {
          triggerVictoryCelebration();
          audioManager.speak(`مُبَارَكٌ يَا ${childName}! أَنْتَ الآنَ بَطَلُ حَرْفِ ${letter.nameAr}!`);
        }
      }, 1400);
    } else {
      audioManager.playClick();
      setFeedbackMessage(`لِنُجَرِّبْ مَرَّةً أُخْرَى يَا ${childName}.. أَنْتَ قَرِيبٌ جِدًّا!`);
      setTimeout(() => setFeedbackMessage(null), 1500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f172a]/95 backdrop-blur-md p-4 md:p-6 rounded-3xl border-2 border-indigo-500/30 shadow-2xl text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToAlphabet();
            }}
            className="p-3 rounded-2xl bg-[#1e293b] border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all shadow-sm active:scale-95"
            title="العودة لمرصد الحروف"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 text-white flex items-center justify-center text-4xl font-black border-2 border-cyan-300 shadow-glow-cyan">
              {letter.char}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white">
                رِحْلَةُ حَرْفِ {letter.nameAr} ({letter.char})
              </h1>
              <p className="text-xs md:text-sm text-cyan-300 font-bold">
                المرحلة {activeStageNum} من 8 • نسبة إتقان الحرف %{progress.masteryPercentage}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            audioManager.playClick();
            audioManager.speak(letter.char);
          }}
          className="px-4 py-2 bg-indigo-900/80 hover:bg-indigo-800 text-cyan-300 rounded-xl font-bold text-xs md:text-sm border border-indigo-500/50 flex items-center gap-1.5 shadow-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>اسْتَمِعْ لِلحَرْف</span>
        </button>
      </div>

      {/* 3D Physical Stage Progression Path */}
      <div className="bg-[#0f172a]/90 backdrop-blur-md p-4 rounded-3xl border-2 border-indigo-500/30 shadow-xl overflow-x-auto">
        <div className="flex items-center justify-between min-w-[760px] gap-2">
          {STAGE_CURRICULUM_DEFINITIONS.map((stg, idx) => {
            const isCompleted = (progress as any)[['discovery', 'sound', 'vowels', 'syllables', 'words', 'soundPosition', 'sentences', 'finalChallenge'][idx]];
            const isUnlocked = isStageUnlocked(stg.stageNumber);
            const isActive = activeStageNum === stg.stageNumber;

            return (
              <div key={stg.stageNumber} className="flex-1 flex items-center">
                <button
                  onClick={() => handleSelectStage(stg.stageNumber)}
                  className={`w-full flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-b from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-glow-cyan scale-105'
                      : isCompleted
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/60 hover:bg-emerald-900/80'
                      : isUnlocked
                      ? 'bg-[#1e293b] text-slate-300 border-slate-700 hover:border-cyan-500/50'
                      : 'bg-[#0b0f19] text-slate-600 border-slate-800 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span className="text-xl">
                    {isCompleted ? '⭐' : !isUnlocked ? '🔒' : '📍'}
                  </span>

                  <span className="text-[11px] font-black whitespace-nowrap">
                    {stg.stageNumber}. {stg.titleAr}
                  </span>

                  <span className="text-[9px] text-slate-400 font-medium">
                    {stg.landmark3D}
                  </span>
                </button>

                {idx < STAGE_CURRICULUM_DEFINITIONS.length - 1 && (
                  <div className={`h-1 w-3 mx-1 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Game Canvas & Adaptive Challenge */}
      <div className="relative bg-[#0f172a]/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border-2 border-cyan-500/30 shadow-2xl min-h-[460px] flex flex-col justify-between overflow-hidden text-white">
        
        {/* Feedback Popup */}
        {feedbackMessage && (
          <div className="absolute inset-0 bg-[#064e3b]/95 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white text-center p-6 space-y-3 animate-pop">
            <span className="text-6xl animate-bounce">🌟✨</span>
            <h3 className="text-2xl md:text-3xl font-black">{feedbackMessage}</h3>
          </div>
        )}

        {/* Stage Objective & LUMI Companion */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="bg-cyan-950 text-cyan-300 font-black text-xs px-3 py-1 rounded-full border border-cyan-500/40">
              المرحلة {activeStageNum}: {activeStageDef.titleAr} ({activeStageDef.landmark3D})
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-2">
              {activeStageDef.objectiveAr}
            </h2>
          </div>

          <LumiMascot
            message={currentChallenge?.hintAr || `هَيَّا نَسْتَكْشِفْ هَذِهِ المَرْحَلَةَ يَا ${childName}!`}
            emotion="happy"
            size="sm"
          />
        </div>

        {/* Challenge Interactive Body */}
        {currentChallenge && (
          <div className="py-8 space-y-6 text-center max-w-xl mx-auto w-full">
            <div className="bg-[#1e293b]/80 p-6 rounded-3xl border border-indigo-500/40 space-y-4 shadow-inner">
              <span className="text-5xl block animate-float">
                {currentChallenge.targetItem === letter.char ? letter.words[0]?.emoji || '🌟' : '🎯'}
              </span>

              <h3 className="text-2xl md:text-3xl font-black text-amber-300">
                {currentChallenge.promptAr}
              </h3>

              <button
                onClick={() => audioManager.speak(currentChallenge.audioKey)}
                className="px-5 py-2 bg-cyan-900/80 hover:bg-cyan-800 text-cyan-200 rounded-xl font-bold text-xs border border-cyan-500/50 flex items-center justify-center gap-1.5 mx-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلصَّوْت</span>
              </button>
            </div>

            {/* Answer Choices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {currentChallenge.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionChoice(opt)}
                  className="p-4 bg-[#1e293b] hover:bg-cyan-600 hover:text-white text-slate-100 rounded-2xl font-black text-lg md:text-xl border-2 border-slate-700 hover:border-cyan-300 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {opt.icon && <span>{opt.icon}</span>}
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Mastery Info */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-bold">
          <span>نَمُوذَجُ الإِتْقَان: تَحَدٍّ تَكَيُّفِيٌّ بِالذَّكَاءِ الاصْطِنَاعِيّ 🧠</span>
          <span className="text-cyan-400">عَتَبَةُ الإِتْقَان: %80</span>
        </div>

      </div>

    </div>
  );
};
