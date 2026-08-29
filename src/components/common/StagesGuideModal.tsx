import React, { useState } from 'react';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { audioManager } from '../../audio/AudioManager';
import { Volume2, Sparkles, Trophy, ChevronRight, ChevronLeft, Play, X, Star } from 'lucide-react';

interface StagesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStage?: (stageNumber: number) => void;
  initialStage?: number;
}

const STAGE_ICONS = ['🔍', '🎙️', '🎵', '🌊', '📖', '🎯', '💬', '👑'];
const STAGE_COLORS = [
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-yellow-500',
  'from-purple-500 to-indigo-500',
  'from-pink-500 to-rose-500',
  'from-orange-500 to-amber-500',
  'from-cyan-500 to-blue-600',
  'from-yellow-400 to-amber-600'
];

export const StagesGuideModal: React.FC<StagesGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectStage,
  initialStage = 1
}) => {
  const [activeStageNum, setActiveStageNum] = useState<number>(initialStage);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentStage = STAGE_CURRICULUM_DEFINITIONS.find((s) => s.stageNumber === activeStageNum) || STAGE_CURRICULUM_DEFINITIONS[0];

  const handleSpeakExplanation = () => {
    audioManager.playClick();
    setIsSpeaking(true);
    audioManager.speak(`stage_${currentStage.stageNumber}_explain`, 0.85, () => {
      setIsSpeaking(false);
    });
  };

  const handlePrev = () => {
    audioManager.playClick();
    if (activeStageNum > 1) {
      setActiveStageNum(activeStageNum - 1);
    }
  };

  const handleNext = () => {
    audioManager.playClick();
    if (activeStageNum < 8) {
      setActiveStageNum(activeStageNum + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-gradient-to-b from-[#0e1b40] via-[#091330] to-[#050a1c] w-full max-w-lg rounded-3xl border-3 border-amber-400/80 shadow-[0_0_60px_rgba(245,158,11,0.4)] text-white overflow-hidden flex flex-col max-h-[90vh] animate-pop">
        
        {/* Header */}
        <div className="p-4 border-b border-amber-400/30 bg-[#070e24]/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <div>
              <h2 className="text-lg font-black text-amber-300">
                دَلِيلُ المَرَاحِلِ التَّعْلِيمِيَّةِ الثَّمَانِيَة
              </h2>
              <p className="text-[11px] text-cyan-200 font-bold">
                تَعَرَّفْ عَلَى خُطُوَاتِ رِحْلَةِ لُومِي السَّاحِرَة
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioManager.playClick();
              audioManager.stop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-black flex items-center justify-center hover:bg-slate-700 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage Number Tabs Pill Carousel */}
        <div className="p-3 bg-[#0a1435]/60 border-b border-blue-900/50 overflow-x-auto scrollbar-none flex gap-2">
          {STAGE_CURRICULUM_DEFINITIONS.map((stg) => {
            const isSelected = stg.stageNumber === activeStageNum;
            return (
              <button
                key={stg.stageNumber}
                onClick={() => {
                  audioManager.playClick();
                  setActiveStageNum(stg.stageNumber);
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 border-white shadow-glow-yellow scale-105'
                    : 'bg-[#122048] text-slate-300 border-blue-900/80 hover:bg-[#182d63]'
                }`}
              >
                <span>{STAGE_ICONS[stg.stageNumber - 1]}</span>
                <span>المرحلة {stg.stageNumber}</span>
              </button>
            );
          })}
        </div>

        {/* Stage Card Content Area */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* Stage Hero Banner */}
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${STAGE_COLORS[activeStageNum - 1]} text-white border border-white/40 shadow-lg flex items-center gap-4`}>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl border border-white/50 shadow-inner flex-shrink-0">
              {STAGE_ICONS[activeStageNum - 1]}
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-black bg-black/30 px-2.5 py-0.5 rounded-full border border-white/30">
                المَرْحَلَةُ {currentStage.stageNumber} مِنْ 8
              </span>
              <h3 className="text-xl font-black leading-tight drop-shadow-md">
                {currentStage.titleAr}
              </h3>
              <p className="text-xs font-bold text-white/90">
                🏛️ {currentStage.landmark3D}
              </p>
            </div>
          </div>

          {/* Voice Narrator Button */}
          <button
            onClick={handleSpeakExplanation}
            className={`w-full py-3 px-4 rounded-2xl font-black text-sm border-2 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md ${
              isSpeaking
                ? 'bg-amber-400 text-slate-950 border-white animate-pulse'
                : 'bg-[#152758] hover:bg-[#1d3575] text-amber-300 border-amber-400/50'
            }`}
          >
            <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span>{isSpeaking ? 'جَارِي شَرْحُ المَرْحَلَة بِصَوْتِ لُومِي... 🔊' : '🔊 اسْتَمِعْ لِشَرْحِ المَرْحَلَةِ كَامِلًا'}</span>
          </button>

          {/* Goal & Description Box */}
          <div className="bg-[#0b1638] p-4 rounded-2xl border border-blue-900/80 space-y-3">
            <div>
              <h4 className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>مَا هُوَ هَدَفُ المَرْحَلَة؟</span>
              </h4>
              <p className="text-sm font-bold text-slate-200 mt-1 leading-relaxed">
                {currentStage.explanationAr}
              </p>
            </div>

            <div className="pt-2 border-t border-blue-900/40">
              <h4 className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                <span>🎮</span>
                <span>كَيْفَ يَلْعَبُ الطِّفْلُ وَيَتَعَلَّم؟</span>
              </h4>
              <p className="text-xs font-bold text-cyan-100/90 mt-1 leading-relaxed">
                {currentStage.howToPlayAr}
              </p>
            </div>
          </div>

          {/* Rewards Pill */}
          <div className="flex items-center justify-between bg-[#08102a] p-3 rounded-2xl border border-amber-500/30">
            <span className="text-xs font-bold text-slate-300">
              جَوَائِزُ إِتْقَانِ المَرْحَلَة:
            </span>
            <div className="flex items-center gap-3 font-black text-xs">
              <span className="text-amber-300 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                +1 نجمة
              </span>
              <span className="text-yellow-300">
                🪙 +10 كوينز
              </span>
              {activeStageNum === 8 && (
                <span className="text-amber-400 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  تاج البطل 👑
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-blue-900/60 bg-[#070e24] flex items-center justify-between gap-2">
          <button
            onClick={handlePrev}
            disabled={activeStageNum === 1}
            className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1 transition-all ${
              activeStageNum === 1
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                : 'bg-[#111e47] border-blue-800 text-slate-200 hover:bg-[#1a2d68] active:scale-95'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>السَّابِقَة</span>
          </button>

          {onSelectStage && (
            <button
              onClick={() => {
                audioManager.playPortal();
                onSelectStage(activeStageNum);
                onClose();
              }}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-xl font-black text-sm border border-white shadow-glow-yellow active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>انْطَلِقْ لِلْمَرْحَلَة {activeStageNum} 🚀</span>
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={activeStageNum === 8}
            className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1 transition-all ${
              activeStageNum === 8
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                : 'bg-[#111e47] border-blue-800 text-slate-200 hover:bg-[#1a2d68] active:scale-95'
            }`}
          >
            <span>التَّالِيَة</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
