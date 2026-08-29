import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Sparkles, CheckCircle2, Eye, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LetterData } from '../../data/letters';
import { RealisticTongueAnatomy } from './RealisticTongueAnatomy';
import { ChildFriendlyMouthGuide } from './ChildFriendlyMouthGuide';
import { getTongueDataForLetter } from '../../data/tongueArticulationData';

interface AnimatedArticulationTeacherProps {
  letter: LetterData;
  onSuccess?: () => void;
}

export const AnimatedArticulationTeacher: React.FC<AnimatedArticulationTeacherProps> = ({
  letter,
  onSuccess
}) => {
  const { childName, addStars, addCoins } = useGame();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [lessonStep, setLessonStep] = useState<number>(1); // 1: Prep, 2: Release, 3: Word
  const [mouthShape, setMouthShape] = useState<'closed' | 'open' | 'round' | 'teeth' | 'smile' | 'labiodental'>('smile');
  const [tongueHeight, setTongueHeight] = useState<number>(75);
  const [isVibrating, setIsVibrating] = useState<boolean>(false);
  const [isAirflowVisible, setIsAirflowVisible] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'kid_mouth' | 'front_teacher' | 'xray_anatomy' | 'split_view' | 'interactive_game'>('kid_mouth');
  const [isAnatomyAnimating, setIsAnatomyAnimating] = useState<boolean>(false);

  // Minigame states
  const [gameScore, setGameScore] = useState<number>(0);
  const [poppedBubbles, setPoppedBubbles] = useState<number[]>([]);
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);

  useEffect(() => {
    const shape = letter.mouthGuide?.shape || 'closed_lips';
    if (shape === 'closed_lips') {
      setMouthShape('closed');
      setTongueHeight(75);
    } else if (shape === 'open_throat') {
      setMouthShape('open');
      setTongueHeight(80);
    } else if (shape === 'round_lips') {
      setMouthShape('round');
      setTongueHeight(65);
    } else if (shape === 'smile_teeth' || shape === 'tongue_teeth') {
      setMouthShape('teeth');
      setTongueHeight(35);
    }
    setGameScore(0);
    setPoppedBubbles([]);
    setIsGameCompleted(false);
    setIsAnatomyAnimating(false);
  }, [letter.id]);

  // Play full 3-step animated video lesson with female voice!
  const startVideoLesson = () => {
    setIsPlaying(true);
    setLessonStep(1);
    setIsAirflowVisible(false);
    setIsVibrating(false);
    setIsAnatomyAnimating(false);

    // Use existing tongueData from component scope
    const articulationTip = tongueData?.tipAr || letter.mouthGuide?.tip || 'انْطِبَاقُ الشَّفَتَيْنِ بِنُعُومَة';

    // Step 1: Teacher introduces preparation
    const step1Text = `أَهْلًا يَا ${childName}! تَعَلَّمْ مَعِي كَيْفِيَّةَ نُطْقِ حَرْفِ ${letter.nameAr}.. الخُطْوَةُ الأُولَى: ${articulationTip}`;
    audioManager.speak(step1Text, 0.85, () => {
      // Step 2: Airflow release & Sound
      setLessonStep(2);
      setIsAirflowVisible(true);
      setIsVibrating(true);
      setMouthShape('open');
      setIsAnatomyAnimating(true);

      const step2Text = `الخُطْوَةُ الثَّانِيَة يَا ${childName}: دَعِ الهَوَاءَ يَنْطَلِقْ لِيَخْرُجَ الصَّوْت: ${letter.char}ْ.. ${letter.char}ْ!`;
      audioManager.speak(step2Text, 0.82, () => {
        // Step 3: Example Word
        setLessonStep(3);
        setIsAirflowVisible(false);
        setIsVibrating(false);
        const sampleWord = letter.words[0]?.word || letter.char;
        const step3Text = `الخُطْوَةُ الثَّالِثَة يَا ${childName}: نَنْطِقُ الكَلِمَة: ${sampleWord}! أَنْتَ بَطَلٌ مُتَفَوِّق!`;

        audioManager.speak(step3Text, 0.85, () => {
          setIsPlaying(false);
          setIsAnatomyAnimating(false);
          if (onSuccess) onSuccess();
        });
      });
    });
  };

  // Handle Bubble Game Pop
  const handleBubbleClick = (index: number, soundText: string) => {
    if (poppedBubbles.includes(index)) return;

    audioManager.playPortal();
    audioManager.speak(soundText);
    const nextPopped = [...poppedBubbles, index];
    setPoppedBubbles(nextPopped);
    setGameScore((prev) => prev + 1);

    if (nextPopped.length >= 3) {
      setIsGameCompleted(true);
      audioManager.playVictory();
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
      addStars(1);
      addCoins(10);
      audioManager.speak(`أَحْسَنْتَ يَا ${childName}! صِدْتَ كَافَّةَ فُقَّاعَاتِ حَرْفِ ${letter.nameAr}!`);
      if (onSuccess) onSuccess();
    }
  };

  const soundBubbles = [
    { text: `${letter.char}َ`, label: 'فَتْحَة', emoji: '⭐' },
    { text: `${letter.char}ُ`, label: 'ضَمَّة', emoji: '🌟' },
    { text: `${letter.char}ِ`, label: 'كَسْرَة', emoji: '✨' }
  ];

  // Get tongue data for current letter
  const tongueData = getTongueDataForLetter(letter.id);

  return (
    <div className="bg-[#091230] rounded-3xl p-4 md:p-6 border-3 border-cyan-400/60 shadow-[0_0_40px_rgba(6,182,212,0.25)] space-y-4 text-white select-none">
      
      {/* Top Video Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-blue-900/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-purple-600 flex items-center justify-center text-2xl border-2 border-white shadow-glow-pink">
            👩‍🏫
          </div>
          <div>
            <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-cyan-200 to-white">
              المُعَلِّمَةُ سَارَة — دَلِيلُ تَعْلِيمِ النُّطْقِ السَّلِيم
            </h2>
            <p className="text-[11px] text-cyan-200 font-bold">
              تَدْرِيبٌ بَصَرِيٌّ لِحَرْفِ ({letter.char}) مَعَ {childName} ✨
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#050b1d] p-1 rounded-2xl border border-blue-900/80">
          <button
            onClick={() => setViewMode('kid_mouth')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
              viewMode === 'kid_mouth'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👄 دَلِيلُ الفَم
          </button>

          <button
            onClick={() => setViewMode('xray_anatomy')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
              viewMode === 'xray_anatomy'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔬 تَشْرِيحُ اللِّسَان
          </button>

          <button
            onClick={() => setViewMode('front_teacher')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
              viewMode === 'front_teacher'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👩‍🏫 المُعَلِّمَة
          </button>

          <button
            onClick={() => setViewMode('split_view')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
              viewMode === 'split_view'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3 inline-block ml-1" />
            مُتَزَامِن
          </button>

          <button
            onClick={() => setViewMode('interactive_game')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
              viewMode === 'interactive_game'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎮 لُعْبَة
          </button>
        </div>
      </div>

      {/* ===== 0. KID FRIENDLY MOUTH GUIDE (DEFAULT FOR CHILDREN) ===== */}
      {viewMode === 'kid_mouth' && (
        <ChildFriendlyMouthGuide
          letter={letter}
          onSuccess={onSuccess}
        />
      )}

      {/* Main Video Animation Arena for Other Modes */}
      {viewMode !== 'kid_mouth' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Left / Center Video Stage */}
          <div className="relative md:col-span-8 bg-gradient-to-b from-[#0e1b42] to-[#070e24] rounded-3xl border-2 border-cyan-500/40 p-4 overflow-hidden shadow-inner flex flex-col items-center justify-center min-h-[320px]">
            
            {/* Step Overlay Pill */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#050b1d]/90 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/50 text-[11px] font-black text-cyan-300">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>{lessonStep === 1 ? '1. وَضْعِيَّةُ الشَّفَتَيْن' : lessonStep === 2 ? '2. إِطْلاقُ الهَوَاءِ وَالصَّوْت' : '3. نُطْقُ الكَلِمَة'}</span>
            </div>

            {/* ===== 1. REALISTIC ANATOMY VIEW ===== */}
            {viewMode === 'xray_anatomy' && (
              <RealisticTongueAnatomy
                letter={letter}
                isAnimating={isAnatomyAnimating}
                showLabels={true}
                showAirflow={true}
              />
            )}

          {/* ===== 2. FRONT TEACHER ANIMATION VIEW ===== */}
          {viewMode === 'front_teacher' && (
            <div className="relative w-56 h-56 flex items-center justify-center">
              
              {/* Teacher Head SVG — Enhanced Female Face with Hijab */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                {/* Hijab */}
                <ellipse cx="100" cy="90" rx="68" ry="72" fill="#7c3aed" />
                <path d="M 35 100 Q 20 145 35 180 L 45 185" stroke="#7c3aed" strokeWidth="22" fill="none" strokeLinecap="round" />
                <path d="M 165 100 Q 180 145 165 180 L 155 185" stroke="#7c3aed" strokeWidth="22" fill="none" strokeLinecap="round" />
                {/* Hijab highlight */}
                <path d="M 50 55 Q 100 30 150 55" stroke="#a78bfa" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />

                {/* Face */}
                <ellipse cx="100" cy="108" rx="48" ry="52" fill="#fed7aa" />
                {/* Face shadow */}
                <ellipse cx="100" cy="115" rx="44" ry="45" fill="#fcc98f" opacity="0.3" />

                {/* Blush */}
                <ellipse cx="68" cy="118" rx="9" ry="6" fill="#f43f5e" opacity="0.3" />
                <ellipse cx="132" cy="118" rx="9" ry="6" fill="#f43f5e" opacity="0.3" />

                {/* Eyes */}
                <ellipse cx="76" cy="95" rx="7" ry="9" fill="#0f172a" />
                <circle cx="74" cy="92" r="3" fill="#ffffff" />
                <circle cx="78" cy="96" r="1.5" fill="#ffffff" opacity="0.5" />
                <path d="M 66 83 Q 76 77 86 83" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Eyelashes */}
                <path d="M 68 86 L 66 82" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 84 86 L 86 82" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />

                <ellipse cx="124" cy="95" rx="7" ry="9" fill="#0f172a" />
                <circle cx="122" cy="92" r="3" fill="#ffffff" />
                <circle cx="126" cy="96" r="1.5" fill="#ffffff" opacity="0.5" />
                <path d="M 114 83 Q 124 77 134 83" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 116 86 L 114 82" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 132 86 L 134 82" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />

                {/* Nose */}
                <path d="M 100 100 Q 103 108 97 109" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Dynamic Articulation Mouth — 6 shapes */}
                {mouthShape === 'closed' ? (
                  <g className={isVibrating ? 'animate-wiggle' : ''}>
                    <ellipse cx="100" cy="130" rx="20" ry="6" fill="#e11d48" />
                    <line x1="82" y1="130" x2="118" y2="130" stroke="#881337" strokeWidth="2.5" />
                    {/* Lip shine */}
                    <ellipse cx="100" cy="128" rx="12" ry="2" fill="#f87171" opacity="0.4" />
                  </g>
                ) : mouthShape === 'open' ? (
                  <g className="animate-pulse">
                    <ellipse cx="100" cy="132" rx="18" ry="15" fill="#881337" />
                    {/* Tongue visible */}
                    <ellipse cx="100" cy="138" rx="12" ry="7" fill="#fb7185" />
                    {/* Upper teeth */}
                    <path d="M 86 122 Q 100 126 114 122" fill="#ffffff" />
                    {/* Lower teeth */}
                    <path d="M 88 142 Q 100 138 112 142" fill="#f0f0f0" opacity="0.7" />
                  </g>
                ) : mouthShape === 'round' ? (
                  <g>
                    <circle cx="100" cy="132" r="12" fill="#e11d48" stroke="#881337" strokeWidth="3" />
                    <circle cx="100" cy="132" r="7" fill="#4c0519" />
                    {/* Lip highlight */}
                    <path d="M 92 128 Q 100 126 108 128" stroke="#f87171" strokeWidth="1.5" fill="none" opacity="0.5" />
                  </g>
                ) : mouthShape === 'labiodental' ? (
                  <g>
                    {/* Upper teeth touching lower lip */}
                    <path d="M 85 128 Q 100 132 115 128" fill="#e11d48" />
                    <path d="M 88 128 Q 100 126 112 128" fill="#ffffff" strokeWidth="1" />
                    <ellipse cx="100" cy="135" rx="14" ry="5" fill="#d06080" />
                  </g>
                ) : mouthShape === 'teeth' ? (
                  <g>
                    <path d="M 80 127 Q 100 142 120 127 Z" fill="#e11d48" />
                    <path d="M 85 127 Q 100 133 115 127" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                    {/* Tongue tip */}
                    <circle cx="100" cy="133" r="4" fill="#fb7185" opacity="0.8" />
                  </g>
                ) : (
                  <g>
                    {/* Spread lips (smile) */}
                    <path d="M 78 127 Q 100 140 122 127" fill="none" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
                    <ellipse cx="100" cy="129" rx="18" ry="3" fill="#e11d48" opacity="0.5" />
                  </g>
                )}

                {/* Airflow particles */}
                {isAirflowVisible && (
                  <g className="animate-ping">
                    <circle cx="100" cy="150" r="4" fill="#38bdf8" />
                    <circle cx="86" cy="156" r="3" fill="#38bdf8" />
                    <circle cx="114" cy="156" r="3" fill="#38bdf8" />
                    <path d="M 90 142 Q 100 162 110 142" stroke="#38bdf8" strokeWidth="3" fill="none" />
                  </g>
                )}
              </svg>

              <div className="absolute -bottom-2 -left-2 text-4xl animate-bounce">
                👉
              </div>
            </div>
          )}

          {/* ===== 3. SPLIT VIEW (Anatomy + Teacher together) ===== */}
          {viewMode === 'split_view' && (
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-3 py-2">
              {/* Left — Anatomy */}
              <div className="flex-1 min-w-0 max-w-[200px]">
                <RealisticTongueAnatomy
                  letter={letter}
                  isAnimating={isAnatomyAnimating}
                  showLabels={false}
                  showAirflow={true}
                  compact={true}
                />
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
              <div className="md:hidden h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

              {/* Right — Teacher Face (compact) */}
              <div className="flex-1 min-w-0 max-w-[180px] flex flex-col items-center">
                <svg viewBox="0 0 200 200" className="w-36 h-36 drop-shadow-xl">
                  {/* Compact hijab */}
                  <ellipse cx="100" cy="90" rx="68" ry="72" fill="#7c3aed" />
                  <path d="M 35 100 Q 20 145 35 180" stroke="#7c3aed" strokeWidth="22" fill="none" strokeLinecap="round" />
                  <path d="M 165 100 Q 180 145 165 180" stroke="#7c3aed" strokeWidth="22" fill="none" strokeLinecap="round" />
                  <ellipse cx="100" cy="108" rx="48" ry="52" fill="#fed7aa" />
                  <ellipse cx="68" cy="118" rx="9" ry="6" fill="#f43f5e" opacity="0.3" />
                  <ellipse cx="132" cy="118" rx="9" ry="6" fill="#f43f5e" opacity="0.3" />
                  <ellipse cx="76" cy="95" rx="7" ry="9" fill="#0f172a" />
                  <circle cx="74" cy="92" r="3" fill="#ffffff" />
                  <ellipse cx="124" cy="95" rx="7" ry="9" fill="#0f172a" />
                  <circle cx="122" cy="92" r="3" fill="#ffffff" />
                  <path d="M 100 100 Q 103 108 97 109" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />

                  {/* Dynamic mouth (simplified) */}
                  {mouthShape === 'closed' ? (
                    <g className={isVibrating ? 'animate-wiggle' : ''}>
                      <ellipse cx="100" cy="130" rx="20" ry="6" fill="#e11d48" />
                      <line x1="82" y1="130" x2="118" y2="130" stroke="#881337" strokeWidth="2.5" />
                    </g>
                  ) : mouthShape === 'open' ? (
                    <g className="animate-pulse">
                      <ellipse cx="100" cy="132" rx="18" ry="14" fill="#881337" />
                      <ellipse cx="100" cy="137" rx="12" ry="7" fill="#fb7185" />
                      <path d="M 86 122 Q 100 126 114 122" fill="#ffffff" />
                    </g>
                  ) : mouthShape === 'round' ? (
                    <g>
                      <circle cx="100" cy="132" r="12" fill="#e11d48" stroke="#881337" strokeWidth="3" />
                      <circle cx="100" cy="132" r="6" fill="#4c0519" />
                    </g>
                  ) : (
                    <g>
                      <path d="M 80 127 Q 100 142 120 127 Z" fill="#e11d48" />
                      <path d="M 85 127 Q 100 133 115 127" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                    </g>
                  )}

                  {isAirflowVisible && (
                    <g className="animate-ping">
                      <circle cx="100" cy="150" r="4" fill="#38bdf8" />
                    </g>
                  )}
                </svg>

                <p className="text-[10px] text-cyan-300 font-bold text-center mt-1">
                  المُعَلِّمَةُ سَارَة 👩‍🏫
                </p>
              </div>
            </div>
          )}

          {/* ===== 4. INTERACTIVE BUBBLE GAME ===== */}
          {viewMode === 'interactive_game' && (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 py-2">
              <div className="text-center space-y-1">
                <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-0.5 rounded-full border border-amber-400/40">
                  لُعْبَةُ صَيْدِ أَصْوَاتِ حَرْفِ {letter.nameAr} 🎯
                </span>
                <p className="text-xs text-cyan-200 font-bold">
                  اضْغَطِ الفُقَّاعَاتِ لِتَفْجِيرِهَا وَسَمَاعِ الصَّوْتِ يَا {childName}!
                </p>
              </div>

              {/* Floating Bubbles */}
              <div className="flex items-center justify-center gap-4 pt-2">
                {soundBubbles.map((bubble, idx) => {
                  const isPopped = poppedBubbles.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleBubbleClick(idx, bubble.text)}
                      className={`w-20 h-20 rounded-full font-black text-2xl flex flex-col items-center justify-center border-3 transition-all active:scale-90 relative ${
                        isPopped
                          ? 'bg-emerald-600/80 border-emerald-300 text-white scale-90 opacity-75'
                          : 'bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-500 text-slate-950 border-white shadow-glow-cyan animate-bounce-slow hover:scale-110'
                      }`}
                    >
                      <span>{bubble.emoji}</span>
                      <span className="text-lg font-black">{bubble.text}</span>
                      {isPopped && (
                        <span className="absolute -top-1 -right-1 text-sm">✨</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isGameCompleted && (
                <div className="flex items-center gap-2 bg-emerald-950/80 px-4 py-1.5 rounded-2xl border border-emerald-400 text-xs font-black text-emerald-300 animate-pop">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>عَمَلٌ مَلَكِيٌّ بَاهِرٌ يَا {childName}! 👑</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Instructions Card */}
        <div className="space-y-3 md:col-span-4">
          
          {/* Articulation Details Card */}
          <div className="bg-[#0e1a3d] p-3.5 rounded-2xl border border-blue-800 space-y-2">
            <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <span>تَوْجِيهُ مَخْرَجِ حَرْفِ</span>
              <span className="text-white text-lg">({letter.char})</span>
            </span>
            
            {/* Use tongueData for more accurate tip */}
            <p className="text-xs text-slate-200 font-bold leading-relaxed">
              {tongueData?.tipAr || letter.mouthGuide?.tip || 'انْطِبَاقُ الشَّفَتَيْنِ مَعًا ثُمَّ انْفِتَاحُهُمَا بِخُرُوجِ الهَوَاء: بْ!'}
            </p>

            {/* Articulation place badge */}
            {tongueData && (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[10px] font-black text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded-full border border-purple-400/30">
                  📍 {tongueData.placeNameAr}
                </span>
                <span className="text-[10px] font-black text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-400/30">
                  {tongueData.contactPointAr}
                </span>
              </div>
            )}

            <p className="text-[11px] text-cyan-300 font-bold">
              وَضْعِيَّةُ الشَّفَتَيْن: {letter.mouthGuide?.lipPosition || 'مُغْلَقَتَانِ بِنُعُومَة'}
            </p>
          </div>

          {/* Action Control Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={startVideoLesson}
              disabled={isPlaying}
              className={`w-full py-3.5 rounded-2xl font-black text-sm border-2 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl ${
                isPlaying
                  ? 'bg-rose-600 border-white text-white animate-pulse'
                  : 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 border-white shadow-glow-cyan'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
              <span>{isPlaying ? 'المُعَلِّمَةُ تَشْرَحُ الآن...' : 'شَغِّلْ فِيدْيُو التَّعْلِيم 🎬'}</span>
            </button>

            {/* Trigger anatomy animation button */}
            <button
              onClick={() => {
                setIsAnatomyAnimating(true);
                audioManager.speak(`صَوْتُ حَرْفِ ${letter.nameAr}.. ${letter.char}ْ`, 0.82, () => {
                  setTimeout(() => setIsAnatomyAnimating(false), 800);
                });
              }}
              className="w-full py-2.5 bg-gradient-to-r from-purple-900/60 to-pink-900/60 hover:from-purple-800/60 hover:to-pink-800/60 text-pink-200 rounded-xl font-black text-xs border border-pink-400/30 flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span>شَاهِدْ حَرَكَةَ اللِّسَانِ 🔬</span>
            </button>

            <button
              onClick={() => audioManager.speak(`صَوْتُ حَرْفِ ${letter.nameAr}.. ${letter.char}ْ`)}
              className="w-full py-2.5 bg-[#14234f] hover:bg-[#1c3270] text-cyan-300 rounded-xl font-black text-xs border border-cyan-400/40 flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>نُطْقُ الصَّوْتِ فَقَط 🔊</span>
            </button>
          </div>

        </div>

      </div>
      )}

    </div>
  );
};
