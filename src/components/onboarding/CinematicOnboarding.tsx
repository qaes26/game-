import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, Crown, Star, Volume2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';

interface CinematicOnboardingProps {
  onComplete: () => void;
}

export const CinematicOnboarding: React.FC<CinematicOnboardingProps> = ({ onComplete }) => {
  const { childName, setChildName, selectedLetterId, setSelectedLetterId } = useGame();
  const [step, setStep] = useState<'name' | 'choose_letter'>('name');
  const [inputName, setInputName] = useState<string>(''); // Clean empty start

  // Spoken female voice welcome on entry
  useEffect(() => {
    const timer = setTimeout(() => {
      audioManager.speak('مَرْحَبًا يَا بَطَل! اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!', 0.85);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = inputName.trim() || 'البَطَل';
    audioManager.playVictory();
    setChildName(finalName);
    setStep('choose_letter');
    
    setTimeout(() => {
      audioManager.speak(`أَهْلًا يَا ${finalName}! اخْتَرْ حَرْفَكَ السِّحْرِيَّ الَّذِي تُرِيدُ أَنْ نَبْدَأَ بِهِ مُغَامَرَتَنَا!`, 0.85);
    }, 300);
  };

  const handleSelectLetter = (letter: LetterData) => {
    const activeName = childName || inputName.trim() || 'البَطَل';
    audioManager.playPortal();
    setSelectedLetterId(letter.id);
    audioManager.speak(`حَرْفُ ${letter.nameAr}! اخْتِيَارٌ رَائِعٌ يَا ${activeName}! هَيَّا بِنَا نَنْطَلِق!`, 0.85);
    
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#060a17] flex items-center justify-center p-4 select-none overflow-y-auto font-arabic">
      
      {/* Royal Gold & Celestial Atmosphere Lights */}
      <div className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-gradient-to-br from-amber-500/25 to-yellow-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-[450px] h-[450px] bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Floating Sparkle Elements */}
      <div className="absolute top-12 left-16 text-3xl animate-float">✨</div>
      <div className="absolute top-20 right-20 text-4xl animate-float" style={{ animationDelay: '1s' }}>🌟</div>
      <div className="absolute bottom-16 left-24 text-4xl animate-float" style={{ animationDelay: '2s' }}>👑</div>
      <div className="absolute bottom-20 right-24 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>

      <div className="relative z-10 max-w-2xl w-full bg-[#0a1128]/95 backdrop-blur-2xl rounded-3xl p-5 md:p-8 border-3 border-amber-400/70 shadow-[0_0_50px_rgba(245,158,11,0.25)] space-y-5 text-white text-center animate-pop">
        
        {/* ========================================================================= */}
        {/* STEP 1: ENTER CHILD NAME (كتابة الاسم) */}
        {/* ========================================================================= */}
        {step === 'name' && (
          <form onSubmit={handleNameSubmit} className="space-y-6 max-w-md mx-auto">
            
            {/* Royal Gold Badge */}
            <div className="relative inline-block">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1 border-3 border-white shadow-glow-yellow flex items-center justify-center text-5xl animate-bounce-slow">
                👑
              </div>
              <span className="absolute -bottom-2 inset-x-0 mx-auto w-max bg-blue-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full border border-white/60 shadow">
                بَوَّابَةُ الأَبْطَال
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-white drop-shadow-md">
                مَا اسْمُكَ يَا بَطَل؟
              </h2>
              <p className="text-xs md:text-sm text-cyan-200 font-bold leading-relaxed">
                اكْتُبِ اسْمَكَ لِتُنَادِيَكَ لُومِي بِهِ طَوَالَ رِحْلَةِ التَّعَلُّمِ السَّاحِرَة!
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="اكْتُبِ اسْمَكَ هُنَا..."
                className="w-full bg-[#131d3b] border-3 border-amber-400/60 focus:border-yellow-300 rounded-2xl px-5 py-4 text-center text-xl md:text-2xl font-black text-amber-200 placeholder-slate-400 focus:outline-none transition-all shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] focus:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 rounded-2xl font-black text-lg md:text-xl border-2 border-white shadow-glow-yellow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span>مُتَابَعَة — اخْتِيَارُ الحَرْف</span>
              <ArrowLeft className="w-6 h-6" />
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: MANDATORY LETTER SELECTION (واجهة اختيار الحرف مباشرة بعد الاسم) */}
        {/* ========================================================================= */}
        {step === 'choose_letter' && (
          <div className="space-y-4 text-center">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full border border-amber-400/40">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>مَرْحَبًا يَا {childName || inputName}!</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white">
                اخْتَرْ حَرْفَكَ لِبَدْءِ المُغَامَرَة! 🎯
              </h2>
              <p className="text-xs text-cyan-300 font-bold">
                انْقُرْ عَلَى أَيِّ حَرْفٍ لِيَكُونَ بَطَلَ رِحْلَتِكَ وَمَرَاحِلِكَ اليَوْم
              </p>
            </div>

            {/* 28 Arabic Letters Responsive 3D Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 max-h-[55vh] overflow-y-auto pr-1 no-scrollbar p-1">
              {ARABIC_LETTERS.map((letter) => {
                const isSelected = letter.id === selectedLetterId;

                return (
                  <button
                    key={letter.id}
                    onClick={() => handleSelectLetter(letter)}
                    className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[75px] md:min-h-[85px] transition-all duration-200 active:scale-95 relative border-2 ${
                      isSelected
                        ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 border-white shadow-glow-yellow scale-105'
                        : 'bg-[#13224d] hover:bg-[#1c3272] text-white border-blue-800/80 hover:border-amber-400/70 hover:scale-105'
                    }`}
                  >
                    <span className="text-2xl md:text-3xl font-black">
                      {letter.char}
                    </span>

                    <span className={`text-[10px] font-black ${isSelected ? 'text-slate-950' : 'text-cyan-200'}`}>
                      {letter.nameAr}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-400 font-bold pt-1">
              ✨ يُمْكِنُكَ تَغْيِيرُ الحَرْفِ دَائِمًا فِي أَيِّ وَقْتٍ مِنْ دَاخِلِ التَّطْبِيق!
            </p>

          </div>
        )}

      </div>

    </div>
  );
};
