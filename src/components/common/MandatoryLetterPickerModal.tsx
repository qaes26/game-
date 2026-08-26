import React from 'react';
import { Sparkles, X, Check, Volume2, Star } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';

interface MandatoryLetterPickerModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSelectLetter: (letterId: string) => void;
  title?: string;
  subtitle?: string;
}

export const MandatoryLetterPickerModal: React.FC<MandatoryLetterPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectLetter,
  title = 'اخْتَرْ حَرْفَكَ لِبَدْءِ المُغَامَرَة! 🎯',
  subtitle = 'اخْتَرِ الحَرْفَ الَّذِي تُرِيدُ أَنْ تَتَدَرَّبَ عَلَيْهِ وَتَلْعَبَ بِه'
}) => {
  const { selectedLetterId, setSelectedLetterId, letterProgressMap } = useGame();

  if (!isOpen) return null;

  const handlePickLetter = (letter: LetterData) => {
    audioManager.playPortal();
    audioManager.speak(`حَرْفُ ${letter.nameAr}.. ${letter.char}`);
    setSelectedLetterId(letter.id);
    onSelectLetter(letter.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 select-none font-arabic animate-fadeIn">
      
      <div className="bg-gradient-to-b from-[#0e1b3d] to-[#080e21] border-3 border-amber-400 rounded-3xl max-w-2xl w-full p-4 md:p-6 text-white shadow-[0_0_50px_rgba(245,158,11,0.4)] flex flex-col max-h-[90vh] space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-900/80 pb-3">
          <div className="space-y-0.5 text-right">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-[11px] font-black px-3 py-0.5 rounded-full border border-amber-400/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>خُطْوَةٌ أَسَاسِيَّة — اخْتِيَارُ الحَرْف</span>
            </div>
            <h2 className="text-lg md:text-2xl font-black text-white">
              {title}
            </h2>
            <p className="text-xs text-cyan-300 font-bold">
              {subtitle}
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 border border-white/20 active:scale-90 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 28 Letters Grid (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-1 no-scrollbar space-y-3">
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
            {ARABIC_LETTERS.map((ltr) => {
              const isSelected = ltr.id === selectedLetterId;
              const progress = letterProgressMap[ltr.id];
              const isMastered = progress?.masteryPercentage === 100;

              return (
                <button
                  key={ltr.id}
                  onClick={() => handlePickLetter(ltr)}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[75px] md:min-h-[85px] transition-all duration-200 active:scale-95 relative border-2 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 border-white shadow-glow-yellow scale-105'
                      : 'bg-[#13224d] hover:bg-[#1c3272] text-white border-blue-800/80 hover:border-amber-400/60'
                  }`}
                >
                  {/* Top Character */}
                  <span className="text-2xl md:text-3xl font-black">
                    {ltr.char}
                  </span>

                  {/* Letter Name */}
                  <span className={`text-[10px] font-black ${isSelected ? 'text-slate-950 font-bold' : 'text-cyan-200'}`}>
                    {ltr.nameAr}
                  </span>

                  {/* Mastery Badge */}
                  {isMastered && (
                    <span className="absolute -top-1 -right-1 text-[10px] bg-amber-400 text-slate-950 rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                      👑
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="pt-2 border-t border-blue-900/60 text-center">
          <p className="text-[11px] text-slate-400 font-bold">
            💡 اضْغَطْ عَلَى الحَرْفِ لِيَتِمَّ تَطْبِيقُ كُلِّ التَّدْرِيبَاتِ وَالأَلْعَابِ عَلَيْه!
          </p>
        </div>

      </div>

    </div>
  );
};
