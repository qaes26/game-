import React, { useState, useEffect } from 'react';
import { ArrowRight, Volume2, Sparkles, Check, Play, Trophy, Star, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { aiChallengeEngine, GeneratedChallenge } from '../../engine/AIChallengeEngine';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../mascot/LumiMascot';
import { StagesGuideModal } from '../common/StagesGuideModal';

interface CleanStagePlayerProps {
  letterId: string;
  stageNumber: number;
  onBackToOverview: () => void;
  onCompleteStageAndNext: (nextStageNum: number) => void;
}

export const CleanStagePlayer: React.FC<CleanStagePlayerProps> = ({
  letterId,
  stageNumber,
  onBackToOverview,
  onCompleteStageAndNext
}) => {
  const { childName, updateLetterStage, addStars, addCoins, triggerVictoryCelebration } = useGame();

  const letter: LetterData = ARABIC_LETTERS.find(l => l.id === letterId) || ARABIC_LETTERS[1];
  const stageDef = STAGE_CURRICULUM_DEFINITIONS.find(s => s.stageNumber === stageNumber) || STAGE_CURRICULUM_DEFINITIONS[0];

  const [challenge, setChallenge] = useState<GeneratedChallenge | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const ch = aiChallengeEngine.generateStageChallenge(
      letter.id,
      stageNumber,
      {
        letterId: letter.id,
        stageNumber,
        attemptsCount: 1,
        successfulAttempts: 1,
        recentMistakes: [],
        averageConfidence: 0.95
      },
      childName || 'البَطَل'
    );
    setChallenge(ch);
    setSelectedOptionId(null);
    setIsSuccess(false);
    setFeedback(null);
    
    // Auto speak prompt with pure female voice
    if (ch) {
      setTimeout(() => {
        audioManager.speak(ch.promptAr);
      }, 350);
    }
  }, [letter.id, stageNumber, childName]);

  const handleSelectOption = (option: { id: string; text: string; isCorrect: boolean }) => {
    setSelectedOptionId(option.id);

    if (option.isCorrect) {
      audioManager.playVictory();
      setIsSuccess(true);
      
      // Royal Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#38bdf8', '#6366f1', '#10b981']
      });

      const encouragingPhrases = [
        `أَحْسَنْتَ يَا ${childName || 'البَطَل'}! إِجَابَةٌ رَائِعَةٌ جِدًّا!`,
        `مُمْتَازٌ يَا ${childName || 'البَطَل'}! أَنْتَ ذَكِيٌّ وَمُتَفَوِّق!`,
        `عَمَلٌ مَلَكِيٌّ بَاهِرٌ يَا ${childName || 'البَطَل'}!`
      ];
      const randomCheer = encouragingPhrases[Math.floor(Math.random() * encouragingPhrases.length)];

      setFeedback(randomCheer);
      audioManager.speak(randomCheer);
      addStars(1);
      addCoins(10);
      updateLetterStage(letter.id, stageNumber, true);

      if (stageNumber === 8) {
        triggerVictoryCelebration();
      }
    } else {
      audioManager.playClick();
      const retryCheer = `لِنُجَرِّبْ خِيَارًا آخَرَ يَا ${childName || 'البَطَل'}.. أَنْتَ قَرِيبٌ جِدًّا!`;
      setFeedback(retryCheer);
      audioManager.speak(retryCheer);
      setTimeout(() => setFeedback(null), 1800);
    }
  };

  const handleNext = () => {
    audioManager.playPortal();
    if (stageNumber < 8) {
      onCompleteStageAndNext(stageNumber + 1);
    } else {
      onBackToOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060a17] via-[#0a1435] to-[#060a17] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-hidden">
      
      {/* Background Radiance */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border-3 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <button
          onClick={() => {
            audioManager.playClick();
            onBackToOverview();
          }}
          className="p-3 rounded-2xl bg-[#132252] border-2 border-amber-400/50 text-amber-300 hover:bg-amber-950/50 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-2 font-black text-xs"
        >
          <ArrowRight className="w-5 h-5" />
          <span>خُرُوجٌ لِلرِّحْلَة</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioManager.playClick();
              setIsGuideModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-black shadow-sm"
            title="دليل شَرْحِ المَرْحَلَة"
          >
            <span>📖</span>
            <span className="hidden sm:inline">شَرْحُ المَرْحَلَة</span>
          </button>
          <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-400 to-yellow-400 px-3.5 py-1 rounded-full border border-white shadow-sm">
            المرحلة {stageNumber} من 8 • {stageDef.titleAr}
          </span>
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 font-black text-2xl text-slate-950 flex items-center justify-center border-2 border-white shadow-glow-yellow">
            {letter.char}
          </span>
        </div>
      </header>

      {/* Main Single-Activity Focus Arena */}
      <main className="relative z-10 max-w-3xl mx-auto w-full my-auto space-y-6 text-center">
        
        {/* Mascot Hint & Voice */}
        <div className="flex justify-center">
          <LumiMascot
            message={feedback || challenge?.promptAr || 'انْظُرْ جَيِّدًا وَاخْتَرِ الإِجَابَةَ الصَّحِيحَة!'}
            emotion={isSuccess ? 'cheering' : 'happy'}
            size="md"
          />
        </div>

        {/* Big Clean Royal Challenge Card */}
        {challenge && (
          <div className="bg-[#0b1638]/95 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border-3 border-amber-400/80 shadow-[0_0_45px_rgba(245,158,11,0.3)] space-y-6">
            
            {/* Target Display Item */}
            <div className="space-y-3">
              <span className="text-7xl md:text-8xl block animate-bounce-slow">
                {challenge.targetItem === letter.char ? letter.words[0]?.emoji || '👑' : '🎯'}
              </span>

              <h2 className="text-2xl md:text-3xl font-black text-amber-300">
                {challenge.promptAr}
              </h2>

              <button
                onClick={() => audioManager.speak(challenge.audioKey)}
                className="px-6 py-3 bg-[#132252] hover:bg-[#1a2f6e] text-amber-300 rounded-2xl font-black text-sm border-2 border-amber-400/50 inline-flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Volume2 className="w-5 h-5 text-amber-400" />
                <span>اسْتَمِعْ لِلصَّوْتِ المَلَكِيّ 🔊</span>
              </button>
            </div>

            {/* Answer Options Grid: Big, High Contrast, Touch Friendly */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {challenge.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isOptionCorrect = isSelected && opt.isCorrect;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isSuccess}
                    className={`p-6 rounded-3xl border-3 font-black text-2xl md:text-3xl transition-all duration-300 flex flex-col items-center justify-center gap-2 min-h-[130px] active:scale-95 shadow-xl ${
                      isOptionCorrect
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-white shadow-glow-green scale-105 animate-pop'
                        : isSelected && !opt.isCorrect
                        ? 'bg-rose-900/80 text-rose-200 border-rose-500'
                        : 'bg-[#132252] hover:bg-[#1e3578] hover:border-amber-400 text-white border-blue-900/70 hover:scale-105'
                    }`}
                  >
                    {opt.icon && <span className="text-4xl">{opt.icon}</span>}
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Next Stage Button (Visible on Success with Royal Fanfare) */}
            {isSuccess && (
              <div className="pt-6 border-t border-blue-900/60 animate-pop">
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-xl border-2 border-white shadow-glow-yellow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <Crown className="w-6 h-6 fill-slate-950" />
                  <span>{stageNumber < 8 ? 'المَرْحَلَةُ التَّالِيَة 🚀' : 'أَتْمَمْتَ رِحْلَةَ الحَرْفِ بِتَفَوُّقٍ مَلَكِيّ! 👑'}</span>
                </button>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-xs text-amber-200/70 font-bold py-2">
        <span>المرحلة {stageNumber}: {stageDef.landmark3D}</span>
      </footer>

      {/* Stages 8-Step Comprehensive Curriculum Guide Modal */}
      <StagesGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onSelectStage={(num) => onCompleteStageAndNext(num)}
        initialStage={stageNumber}
      />

    </div>
  );
};
