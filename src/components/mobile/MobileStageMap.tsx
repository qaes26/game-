import React, { useState } from 'react';
import { Sparkles, Star, Lock, Crown, Play, Volume2, Trophy, Compass, ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiGuideBanner } from '../common/LumiGuideBanner';
import { InteractiveLetter3D } from '../3d/InteractiveLetter3D';
import { ChildProfileModal } from '../common/ChildProfileModal';
import { PWAInstallButton } from '../common/PWAInstallButton';

import { StagesGuideModal } from '../common/StagesGuideModal';

interface MobileStageMapProps {
  onStartStage: (letterId: string, stageNum: number) => void;
  onOpenLetterSelect?: () => void;
  onOpenWorlds?: () => void;
  onOpenGames?: () => void;
  onBackToHub?: () => void;
}

export const MobileStageMap: React.FC<MobileStageMapProps> = ({
  onStartStage,
  onOpenLetterSelect,
  onOpenWorlds,
  onOpenGames,
  onBackToHub
}) => {
  const {
    childName,
    setChildName,
    stars,
    coins,
    selectedLetterId,
    setSelectedLetterId,
    letterProgressMap,
    resetProgress
  } = useGame();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  const currentLetter: LetterData =
    ARABIC_LETTERS.find((l) => l.id === selectedLetterId) || ARABIC_LETTERS[1];

  const progress = letterProgressMap[currentLetter.id] || {
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

  const activeStage = progress.currentStage || 1;
  const [selectedStagePreview, setSelectedStagePreview] = useState<number | null>(null);

  const stageKeys = [
    'discovery',
    'sound',
    'vowels',
    'syllables',
    'words',
    'soundPosition',
    'sentences',
    'finalChallenge'
  ];

  const isStageUnlocked = (stageNum: number) => {
    if (stageNum === 1) return true;
    const prevKey = stageKeys[stageNum - 2];
    return (progress as any)[prevKey] === true || progress.currentStage >= stageNum;
  };

  const isStageCompleted = (stageNum: number) => {
    const key = stageKeys[stageNum - 1];
    return (progress as any)[key] === true;
  };

  const handleSelectLetter = (letterId: string) => {
    audioManager.playClick();
    setSelectedLetterId(letterId);
    const l = ARABIC_LETTERS.find((x) => x.id === letterId);
    if (l) {
      audioManager.speak(`حَرْفُ ${l.nameAr}`);
    }
  };

  const handleStageNodeClick = (stageNum: number) => {
    const unlocked = isStageUnlocked(stageNum);
    const stgDef = STAGE_CURRICULUM_DEFINITIONS.find((s) => s.stageNumber === stageNum);

    if (unlocked) {
      audioManager.playPortal();
      if (stgDef) audioManager.speak(stgDef.titleAr);
      setSelectedStagePreview(stageNum);
    } else {
      audioManager.playClick();
      audioManager.speak('يَجِبُ إِنْهَاءُ المَرْحَلَةِ السَّابِقَةِ أَوَّلًا');
    }
  };

  // Stage Node Icon List (Tree of Light Narrative)
  const stageIcons = ['🌱', '💧', '🌿', '🎋', '🍎', '🐝', '🌲', '🌳'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] via-[#091230] to-[#040711] text-white pb-24 select-none relative overflow-x-hidden">
      {/* Radiant Background Ambience */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Mobile Header */}
      <header className="sticky top-0 z-30 bg-[#070e24]/90 backdrop-blur-xl border-b border-amber-400/30 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Left: Home Hub Button */}
          {onBackToHub && (
            <button
              onClick={() => {
                audioManager.playClick();
                onBackToHub();
              }}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-400/40 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-black"
              title="العودة لشاشة المربعات الرئيسية"
            >
              <span>🏠</span>
              <span>الرَّئِيسِيَّة</span>
            </button>
          )}

          {/* Child Profile (Clickable to switch child or add new hero) */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2 text-right p-1 rounded-2xl hover:bg-white/5 transition-all active:scale-95 group"
            title="انقر لتبديل ملف الطفل أو إضافة بطل جديد"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-xl border-2 border-white shadow-glow-yellow group-hover:scale-105 transition-transform">
              👑
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-black text-amber-200 flex items-center gap-1">
                <span>{childName ? `البَطَل ${childName}` : 'اخْتَرِ البَطَل'}</span>
                <span className="text-[10px] text-amber-300/80">🔄</span>
              </h1>
              <p className="text-[10px] text-cyan-300 font-bold">
                تَبْدِيلُ أَبْطَالِ الهَاتِف 📱
              </p>
            </div>
          </button>

          {/* Star & Coin Badges & Stages Guide & PWA Install Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioManager.playClick();
                setIsGuideModalOpen(true);
              }}
              className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/30 to-yellow-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-400/60 active:scale-95 transition-all flex items-center gap-1 text-xs font-black shadow-sm"
              title="دليل شَرْحِ المَرَاحِل الثَّمَانِيَة"
            >
              <span>📖</span>
              <span className="hidden xs:inline">شَرْحُ المَرَاحِل</span>
            </button>
            <PWAInstallButton />
            <div className="flex items-center gap-1 bg-amber-500/20 px-2.5 py-1 rounded-xl border border-amber-400/50 text-xs font-black text-amber-300 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-spin-slow" />
              <span>{stars}</span>
            </div>
            <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-xl border border-yellow-400/40 text-xs font-black text-yellow-300">
              <span>🪙</span>
              <span>{coins}</span>
            </div>
          </div>
        </div>

        {/* 28 Letters Horizontal Slider removed as per global letter feature */}
      </header>

      {/* Main Roadmap Area */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-6">
        
        {/* Letter Hero & 3D Interactive Jewel Card */}
        <div className="bg-gradient-to-br from-[#122252] via-[#0d1a42] to-[#142861] rounded-3xl p-4 border-2 border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.25)] flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-amber-400/40">
              <span>رِحْلَةُ حَرْفِ</span>
              <span className="text-white">{currentLetter.nameAr}</span>
            </div>
            <h2 className="text-xl font-black text-white">
              حَرْفُ ({currentLetter.char}) — {currentLetter.words[0]?.word} {currentLetter.words[0]?.emoji}
            </h2>
            <p className="text-xs text-cyan-200 font-bold">
              إِتْقَانُ المَرَاحِل: %{progress.masteryPercentage}
            </p>

            <button
              onClick={() => audioManager.speak(`حَرْفُ ${currentLetter.nameAr}.. ${currentLetter.char}`)}
              className="mt-2 px-3 py-1.5 bg-[#1a2f6e] hover:bg-[#233e8f] text-amber-300 rounded-xl text-xs font-black border border-amber-400/40 flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>نُطْقُ الحَرْف 🔊</span>
            </button>
          </div>

          {/* 3D Interactive Letter Gem */}
          <div className="w-24 h-24 flex items-center justify-center">
            <InteractiveLetter3D char={currentLetter.char} color="#f59e0b" size={105} />
          </div>
        </div>

        {/* Quick Portal Cards: 8 Worlds & 7 Mini-Games */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              audioManager.playPortal();
              if (onOpenWorlds) onOpenWorlds();
            }}
            className="p-3 rounded-2xl bg-gradient-to-br from-[#1a1c4b] to-[#0f1235] border-2 border-purple-400/60 hover:border-purple-300 text-right space-y-1 shadow-md hover:scale-[1.02] active:scale-95 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-125 transition-transform">🪐</span>
              <span className="text-[9px] font-black bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded-full border border-purple-400/40">
                8 عَوَالِم
              </span>
            </div>
            <h3 className="text-xs font-black text-white group-hover:text-purple-200">
              خَرِيطَةُ العَوَالِمِ وَالفَضَاء
            </h3>
            <p className="text-[10px] text-slate-400 font-bold">
              اسْتَكْشِفِ الكَوَاكِبَ وَالمَجَرَّة 🚀
            </p>
          </button>

          <button
            onClick={() => {
              audioManager.playPortal();
              if (onOpenGames) onOpenGames();
            }}
            className="p-3 rounded-2xl bg-gradient-to-br from-[#0e2a4a] to-[#091b33] border-2 border-cyan-400/60 hover:border-cyan-300 text-right space-y-1 shadow-md hover:scale-[1.02] active:scale-95 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-125 transition-transform">🎮</span>
              <span className="text-[9px] font-black bg-cyan-500/20 text-cyan-200 px-2 py-0.5 rounded-full border border-cyan-400/40">
                7 أَلْعَاب
              </span>
            </div>
            <h3 className="text-xs font-black text-white group-hover:text-cyan-200">
              مَرْكَزُ الأَلْعَابِ التَّفَاعُلِيَّة
            </h3>
            <p className="text-[10px] text-slate-400 font-bold">
              فَقَاعَات، قِطَار، وَسِبَاقَات 🎯
            </p>
          </button>
        </div>
        {/* Lumi Voice Guide */}
        <LumiGuideBanner
          message={`أَهْلًا يَا ${childName || 'البَطَل'}! هُنَا نَزْرَعُ شَجَرَةَ حَرْفِ (${currentLetter.char}).. اجْتَزِ المَرَاحِلَ الثَّمَانِيَةَ لِتُكَبِّرَ البَذْرَةَ وَتُضِيءَ الغَابَة!` }
          shortHint="اضْغَطْ عَلَى البَذْرَةِ لِتَبْدَأ"
          autoSpeak={true}
          emotion="happy"
        />

        {/* Winding 8-Stage Map Path */}
        <div className="relative py-4 px-2">
          
          {/* Connecting SVG Path Behind Stages */}
          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <svg className="w-full h-full max-w-[340px]" viewBox="0 0 340 760" fill="none">
              <path
                d="M 170 40 
                   Q 260 90 260 140 
                   Q 260 190 170 230 
                   Q 80 270 80 320 
                   Q 80 370 170 410 
                   Q 260 450 260 500 
                   Q 260 550 170 590 
                   Q 80 630 80 680 
                   Q 80 730 170 750"
                stroke="rgba(245, 158, 11, 0.35)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="10 8"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* 8 Distinct Sequential Stage Nodes */}
          <div className="relative z-10 space-y-7">
            {STAGE_CURRICULUM_DEFINITIONS.map((stg, index) => {
              const stageNum = stg.stageNumber;
              const isUnlocked = isStageUnlocked(stageNum);
              const isCurrent = activeStage === stageNum;
              const isCompleted = isStageCompleted(stageNum);

              // Zigzag layout alignment: alternating positions
              const alignmentStyles = [
                'justify-center',       // Stage 1 (Center)
                'justify-end pr-4',     // Stage 2 (Right)
                'justify-center',       // Stage 3 (Center)
                'justify-start pl-4',   // Stage 4 (Left)
                'justify-center',       // Stage 5 (Center)
                'justify-end pr-4',     // Stage 6 (Right)
                'justify-center',       // Stage 7 (Center)
                'justify-center'        // Stage 8 (Grand Finale)
              ][index];

              return (
                <div key={stageNum} className={`flex items-center ${alignmentStyles}`}>
                  
                  {/* Stage Station Button */}
                  <div className="relative flex flex-col items-center">
                    
                    {/* Lumi Floating Companion on Active Stage */}
                    {isCurrent && (
                      <div className="absolute -top-12 z-20 animate-bounce flex flex-col items-center pointer-events-none">
                        <span className="bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-white shadow-md mb-1 whitespace-nowrap">
                          لُومِي هُنَا! 🌟
                        </span>
                        <div className="w-8 h-8 rounded-full bg-cyan-400/90 border-2 border-white flex items-center justify-center text-sm shadow-glow-cyan">
                          ✨
                        </div>
                      </div>
                    )}

                    {/* Outer Glowing Ring for Active Node */}
                    {isCurrent && (
                      <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-amber-400/40 via-yellow-300/40 to-cyan-400/40 animate-spin-slow blur-sm pointer-events-none" />
                    )}

                    {/* Main Stage Node Bubble */}
                    <button
                      onClick={() => handleStageNodeClick(stageNum)}
                      className={`relative w-20 h-20 rounded-full font-black flex flex-col items-center justify-center border-4 transition-all duration-300 active:scale-90 shadow-2xl ${
                        isCompleted
                          ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 border-emerald-200 text-white shadow-glow-green scale-100'
                          : isCurrent
                          ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-white text-slate-950 shadow-glow-yellow scale-110 ring-4 ring-amber-400/50'
                          : isUnlocked
                          ? 'bg-gradient-to-tr from-[#1b3269] to-[#12224d] border-blue-400 text-white hover:border-amber-400'
                          : 'bg-[#091124] border-slate-700 text-slate-500 opacity-60'
                      }`}
                    >
                      {/* Icon or Status Indicator */}
                      <span className="text-2xl mb-0.5">
                        {isCompleted ? '👑' : isUnlocked ? stageIcons[index] : '🔒'}
                      </span>

                      {/* Stage Number */}
                      <span className="text-xs font-black">
                        {stageNum}
                      </span>

                      {/* Stars Earned Overlay */}
                      {isCompleted && (
                        <div className="absolute -bottom-2 flex items-center gap-0.5 bg-emerald-950 px-1.5 py-0.5 rounded-full border border-emerald-400">
                          <Star className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                          <Star className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                          <Star className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                        </div>
                      )}
                    </button>

                    {/* Stage Title Pill Below Node */}
                    <div className="mt-2 text-center">
                      <span className={`inline-block px-3 py-1 rounded-xl text-xs font-black border shadow-md ${
                        isCurrent
                          ? 'bg-amber-400 text-slate-950 border-white shadow-glow-yellow'
                          : isCompleted
                          ? 'bg-emerald-900/80 text-emerald-200 border-emerald-400/50'
                          : isUnlocked
                          ? 'bg-[#112048] text-cyan-200 border-blue-900'
                          : 'bg-[#091124] text-slate-500 border-slate-800'
                      }`}>
                        {stg.titleAr}
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </main>

      {/* Stage Launch Preview Sheet Modal */}
      {selectedStagePreview !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4 animate-fade-in">
          {(() => {
            const stgDef = STAGE_CURRICULUM_DEFINITIONS.find((s) => s.stageNumber === selectedStagePreview) || STAGE_CURRICULUM_DEFINITIONS[0];

            return (
              <div className="bg-gradient-to-b from-[#132252] to-[#0a1435] w-full max-w-sm rounded-3xl p-5 border-3 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.4)] text-center space-y-3.5 animate-pop max-h-[92vh] overflow-y-auto">
                
                {/* Header Badge */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-400 to-yellow-300 px-3 py-0.5 rounded-full border border-white shadow-sm">
                    المَرْحَلَةُ {selectedStagePreview} مِنْ 8 🚀
                  </span>
                  <button
                    onClick={() => {
                      audioManager.playClick();
                      audioManager.stop();
                      setSelectedStagePreview(null);
                    }}
                    className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-black flex items-center justify-center hover:bg-slate-700 active:scale-95"
                  >
                    ✕
                  </button>
                </div>

                {/* Stage Hero Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-cyan-400 flex items-center justify-center text-3xl border-2 border-white shadow-glow-yellow">
                  {stageIcons[selectedStagePreview - 1]}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">
                    {stgDef.titleAr}
                  </h3>
                  <p className="text-xs text-cyan-200 font-bold">
                    {stgDef.objectiveAr}
                  </p>
                </div>

                {/* Stage Explanation & Audio Narrator Box */}
                <div className="bg-[#08102a] p-3 rounded-2xl border border-blue-900/80 text-right space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>شَرْحُ المَرْحَلَة:</span>
                    </span>
                    <button
                      onClick={() => {
                        audioManager.playClick();
                        audioManager.speak(stgDef.explanationAr);
                      }}
                      className="px-2.5 py-1 rounded-xl bg-[#172c68] hover:bg-[#1f3b8a] text-amber-300 text-[11px] font-black border border-amber-400/50 flex items-center gap-1 active:scale-95 shadow-sm transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>اسْتَمِعْ 🔊</span>
                    </button>
                  </div>
                  <p className="text-xs font-bold text-slate-200 leading-relaxed">
                    {stgDef.explanationAr}
                  </p>
                  <p className="text-[11px] font-bold text-cyan-200/90 pt-1 border-t border-blue-900/40">
                    🎮 <span className="text-cyan-300">طريقة اللعب:</span> {stgDef.howToPlayAr}
                  </p>
                </div>

                {/* Rewards Preview */}
                <div className="flex items-center justify-center gap-3 bg-[#0a122c] p-2 rounded-2xl border border-blue-900">
                  <div className="flex items-center gap-1 text-xs font-black text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>+1 نجمة</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-black text-yellow-300">
                    <span>🪙</span>
                    <span>+10 كوينز</span>
                  </div>
                </div>

                {/* Launch Stage Button */}
                <button
                  onClick={() => {
                    audioManager.playPortal();
                    const stgNum = selectedStagePreview;
                    setSelectedStagePreview(null);
                    onStartStage(currentLetter.id, stgNum);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base border-2 border-white shadow-glow-yellow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>انْطَلِقْ لِلْمَرْحَلَة! 🚀</span>
                </button>

              </div>
            );
          })()}
        </div>
      )}

      {/* Multi-Child Profile Switcher Modal */}
      <ChildProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Stages 8-Step Comprehensive Curriculum Guide Modal */}
      <StagesGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onSelectStage={(num) => onStartStage(currentLetter.id, num)}
        initialStage={selectedStagePreview || activeStage}
      />

    </div>
  );
};
