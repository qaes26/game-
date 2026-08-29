import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot, MascotState } from '../mascot/LumiMascot';

export const WordBoxBuilderGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();

  const words = [
    { targetWord: 'بَاب', letters: ['ب', 'ا', 'ب'], emoji: '🚪' },
    { targetWord: 'بَحْر', letters: ['ب', 'ح', 'ر'], emoji: '🌊' },
    { targetWord: 'حَبْل', letters: ['ح', 'ب', 'ل'], emoji: '🪢' },
    { targetWord: 'عِنَب', letters: ['ع', 'ن', 'ب'], emoji: '🍇' }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(() => {
    return [...words[0].letters].sort(() => Math.random() - 0.5);
  });
  const [completed, setCompleted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [mascotState, setMascotState] = useState<MascotState>('idle');

  const currentWord = words[currentIdx];

  const handleSelectLetter = (char: string, index: number) => {
    if (isProcessing || completed) return;

    soundManager.playPop();
    audioManager.speak(char);

    const newPlaced = [...placedLetters, char];
    setPlacedLetters(newPlaced);

    // Remove letter from available
    const newAvail = availableLetters.filter((_, i) => i !== index);
    setAvailableLetters(newAvail);

    // Check if word is completed
    if (newPlaced.length === currentWord.letters.length) {
      setIsProcessing(true);
      const spelled = newPlaced.join('');
      if (spelled === currentWord.letters.join('')) {
        soundManager.playSuccess();
        audioManager.speak(currentWord.targetWord);
        setMascotState('success');
        addStars(1);
        addCoins(5);

        setTimeout(() => {
          if (currentIdx < words.length - 1) {
            const nextIdx = currentIdx + 1;
            setCurrentIdx(nextIdx);
            setPlacedLetters([]);
            setAvailableLetters([...words[nextIdx].letters].sort(() => Math.random() - 0.5));
            setMascotState('idle');
          } else {
            setCompleted(true);
            triggerCelebration();
            addStars(2);
            addCoins(10);
          }
          setIsProcessing(false);
        }, 1500);
      } else {
        soundManager.playEncouragement();
        setMascotState('retry');
        setTimeout(() => {
          setPlacedLetters([]);
          setAvailableLetters([...currentWord.letters].sort(() => Math.random() - 0.5));
          setIsProcessing(false);
          setMascotState('idle');
        }, 1000);
      }
    }
  };

  const handleRemovePlacedLetter = (index: number) => {
    if (isProcessing || completed) return;
    const removedChar = placedLetters[index];
    if (!removedChar) return;

    soundManager.playPop();
    setPlacedLetters(prev => prev.filter((_, i) => i !== index));
    setAvailableLetters(prev => [...prev, removedChar]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6 font-body">
      <div className="flex items-center justify-between bg-[var(--color-lumi-bubble)] backdrop-blur-md p-4 rounded-3xl border-2 border-[var(--color-lumi-wave)]/20 shadow-sm">
        <div className="flex items-center gap-3">
          <LumiMascot state="idle" size="sm" className="hidden sm:flex" />
          <div>
            <h2 className="text-xl font-display font-black text-slate-800">صُنْدُوقُ الكَلِمَات</h2>
            <p className="text-xs text-slate-500 font-bold">
              رَتِّب الحُرُوفَ لِتَكْوِينِ الكَلِمَةِ المُنَاسِبَةِ لِلصُّورَة!
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-[var(--color-lumi-bg)] p-6 md:p-8 rounded-3xl border-4 border-white shadow-xl text-center space-y-8">
        {!completed ? (
          <>
            <div className="flex flex-col items-center gap-4">
              <div className="text-7xl animate-float bg-white/50 w-32 h-32 flex items-center justify-center rounded-3xl shadow-sm border-2 border-[var(--color-lumi-wave)]/10">
                {currentWord.emoji}
              </div>
              {mascotState !== 'idle' && (
                <div className="absolute top-32">
                   <LumiMascot state={mascotState} size="md" />
                </div>
              )}
            </div>

            {/* Word Slots Container (Click placed letters to remove/undo) */}
            <div className="flex items-center justify-center gap-3 dir-rtl">
              {currentWord.letters.map((_, idx) => {
                const char = placedLetters[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => char && handleRemovePlacedLetter(idx)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-4 border-dashed flex items-center justify-center text-4xl font-display font-black shadow-inner transition-all ${
                      char
                        ? 'border-[var(--color-lumi-wave)] text-[var(--color-lumi-wave)] active:scale-90 hover:bg-rose-50'
                        : 'border-[var(--color-lumi-wave)]/20 text-slate-400'
                    }`}
                    title={char ? 'انقر لإرجاع الحرف' : ''}
                  >
                    {char || ''}
                  </button>
                );
              })}
            </div>

            {/* Letter Pickers */}
            <div className="pt-4">
              <p className="text-xs font-bold text-slate-600 mb-3">
                اضْغَطْ عَلَى الحُرُوفِ بِالتَّرْتِيبِ الصَّحِيح (أَوِ انْقُرِ المُرَبَّعَ لِلتَّرَاجُع):
              </p>
              <div className="flex items-center justify-center gap-3 min-h-[72px]">
                {availableLetters.map((char, i) => (
                  <button
                    key={i}
                    disabled={isProcessing}
                    onClick={() => handleSelectLetter(char, i)}
                    className="game-btn w-16 h-16 md:w-18 md:h-18 bg-[var(--color-lumi-wave)] text-white rounded-2xl font-display font-black text-3xl shadow-lg active:scale-95 disabled:opacity-50 hover:bg-purple-600"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center space-y-6 animate-pop-burst">
            <LumiMascot state="success" size="xl" />
            <h3 className="text-3xl md:text-4xl font-display font-black text-[var(--color-lumi-wave)]">
              أَحْسَنْتَ يَا بَطَل!
            </h3>
            <button
              onClick={() => {
                setCurrentIdx(0);
                setPlacedLetters([]);
                setAvailableLetters([...words[0].letters].sort(() => Math.random() - 0.5));
                setCompleted(false);
                setIsProcessing(false);
                setMascotState('idle');
              }}
              className="game-btn px-8 py-4 bg-[var(--color-lumi-spark)] text-white rounded-full font-display font-black text-xl shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <RotateCcw className="w-6 h-6" />
              <span>الْعَبْ مَرَّةً أُخْرَى</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
