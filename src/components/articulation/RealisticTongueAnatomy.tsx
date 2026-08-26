import React, { useState, useEffect } from 'react';
import { getTongueDataForLetter, TongueArticulationConfig } from '../../data/tongueArticulationData';
import { LetterData } from '../../data/letters';
import { Sparkles, Volume2, Star, CheckCircle } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

interface RealisticTongueAnatomyProps {
  letter: LetterData;
  isAnimating?: boolean;
  showLabels?: boolean;
  showAirflow?: boolean;
  compact?: boolean;
}

export const RealisticTongueAnatomy: React.FC<RealisticTongueAnatomyProps> = ({
  letter,
  isAnimating = false,
  showLabels = true,
  showAirflow = true,
  compact = false,
}) => {
  const [tongueData, setTongueData] = useState<TongueArticulationConfig | null>(null);
  const [animPhase, setAnimPhase] = useState<'rest' | 'contact' | 'release'>('contact');
  const [localAnimating, setLocalAnimating] = useState<boolean>(false);

  useEffect(() => {
    const data = getTongueDataForLetter(letter.id);
    if (data) {
      setTongueData(data);
      setAnimPhase('contact');
    }
  }, [letter.id]);

  // Handle auto-animation or manual trigger
  const effectiveAnimating = isAnimating || localAnimating;

  useEffect(() => {
    if (!effectiveAnimating || !tongueData) return;

    setAnimPhase('rest');
    const t1 = setTimeout(() => setAnimPhase('contact'), 500);
    const t2 = setTimeout(() => setAnimPhase('release'), 1800);
    const t3 = setTimeout(() => {
      setAnimPhase('contact');
      setLocalAnimating(false);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [effectiveAnimating, tongueData]);

  if (!tongueData) return null;

  const isContact = animPhase === 'contact';
  const isRelease = animPhase === 'release';
  const isRest = animPhase === 'rest';

  // Resting tongue position (soft relaxed curve at floor of mouth)
  const restTonguePath = 'M 70 205 C 80 195 105 185 135 175 C 160 168 180 170 190 175 L 192 182 C 180 186 160 188 135 192 C 100 200 80 210 70 205 Z';

  // Current active tongue path
  const currentTonguePath = isRest ? restTonguePath : tongueData.tonguePath;

  // Lip state calculations
  const jawOffset = isContact ? tongueData.jawOpen * 14 : 4;
  const upperLipY = 96 + (isContact ? tongueData.upperLipOffset : 0);
  const lowerLipY = 138 + jawOffset + (isContact ? tongueData.lowerLipOffset : 0);

  const containerHeight = compact ? 'h-60' : 'h-72 md:h-80';

  const handleInteractiveTap = () => {
    setLocalAnimating(true);
    audioManager.speak(`صَوْتُ حَرْفِ ${letter.nameAr}.. ${letter.char}ْ`);
  };

  return (
    <div className={`relative w-full ${containerHeight} flex flex-col items-center justify-center select-none`}>
      
      {/* Interactive Floating Hint for Children */}
      {!compact && (
        <div className="absolute top-1 left-2 z-10 flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-pink-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/40 text-[11px] font-black text-amber-200">
          <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-bounce" />
          <span>المِسِ النَّجْمَةَ الذَّهَبِيَّةَ بِلِسَانِك!</span>
        </div>
      )}

      {/* SVG Sagittal Child-Friendly & Realistic Anatomy Cutaway */}
      <svg
        viewBox="0 0 300 250"
        className="w-full h-full drop-shadow-2xl cursor-pointer"
        style={{ maxWidth: compact ? '270px' : '360px' }}
        onClick={handleInteractiveTap}
      >
        <defs>
          {/* Soft Child Skin Tone */}
          <linearGradient id="childSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffdfba" />
            <stop offset="60%" stopColor="#f8c291" />
            <stop offset="100%" stopColor="#e77f67" />
          </linearGradient>

          {/* Clean Oral Cavity Inside Mouth */}
          <radialGradient id="mouthCavity" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a0e2e" />
            <stop offset="75%" stopColor="#2c0b1d" />
            <stop offset="100%" stopColor="#17030e" />
          </radialGradient>

          {/* Vibrant Healthy Pink Tongue */}
          <linearGradient id="kidTongue" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#ff758c" />
            <stop offset="45%" stopColor="#ff5376" />
            <stop offset="85%" stopColor="#e63963" />
            <stop offset="100%" stopColor="#c2185b" />
          </linearGradient>

          {/* Tongue Highlights */}
          <linearGradient id="tongueShine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff758c" stopOpacity="0" />
          </linearGradient>

          {/* Soft Palate Roof */}
          <linearGradient id="palateRoof" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f6b93b" />
            <stop offset="40%" stopColor="#fda7df" />
            <stop offset="100%" stopColor="#f8a5c2" />
          </linearGradient>

          {/* Magic Star Glow */}
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft Breeze Airflow */}
          <filter id="breezeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== 1. HEAD PROFILE OUTLINE (Clear Child Profile) ===== */}
        <path
          d="M 35 35 C 60 15 165 15 210 30 C 235 45 250 70 252 95 C 255 105 250 110 240 112 C 248 118 252 130 248 145 C 242 165 225 185 215 195 C 195 215 170 225 130 225 L 45 225 C 35 215 30 190 28 140 C 26 90 28 50 35 35 Z"
          fill="url(#childSkin)"
          stroke="#e77f67"
          strokeWidth="3"
        />

        {/* ===== 2. INSIDE MOUTH CAVITY (Clean Deep Space) ===== */}
        <path
          d="M 60 65 C 100 50 165 48 200 65 C 215 72 225 85 222 110 C 220 135 205 160 195 175 C 160 195 110 200 65 190 C 50 170 48 110 60 65 Z"
          fill="url(#mouthCavity)"
          stroke="#d63031"
          strokeWidth="2"
        />

        {/* ===== 3. ROOF OF MOUTH / PALATE (سقف الحلق الأملس) ===== */}
        <path
          d="M 90 65 C 130 52 170 54 205 68 C 212 72 216 78 214 84 L 202 84 C 200 78 195 75 188 73 C 160 66 125 66 102 75 C 96 77 92 82 90 85 Z"
          fill="url(#palateRoof)"
          stroke="#f8a5c2"
          strokeWidth="2"
        />

        {/* Cute Soft Uvula (اللهاة المتدلية) */}
        <ellipse
          cx="88"
          cy={tongueData.softPalateLowered && isContact ? 100 : 88}
          rx="6"
          ry="9"
          fill="#ff7675"
          stroke="#d63031"
          strokeWidth="1.5"
          style={{ transition: 'all 0.5s ease' }}
        />

        {/* ===== 4. BRIGHT WHITE TEETH (الأسنان النظيفة) ===== */}
        {/* Upper Teeth (الأسنان العلوية) */}
        <g>
          <rect x="208" y="72" width="10" height="20" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="219" y="74" width="9" height="18" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
          <rect x="228" y="76" width="8" height="15" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          {/* Shine on main tooth */}
          <rect x="210" y="75" width="3" height="12" rx="1" fill="#e2e8f0" opacity="0.6" />
        </g>

        {/* Lower Teeth (الأسنان السفلية) */}
        <g style={{ transition: 'transform 0.5s ease', transform: `translateY(${jawOffset}px)` }}>
          <rect x="208" y="142" width="10" height="18" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="219" y="140" width="9" height="16" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
          <rect x="228" y="142" width="8" height="14" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="210" y="145" width="3" height="10" rx="1" fill="#e2e8f0" opacity="0.6" />
        </g>

        {/* ===== 5. CUTE EXPRESSIVE LIPS (الشفتان) ===== */}
        {/* Upper Lip */}
        <path
          d={`M 235 ${upperLipY - 4} C 245 ${upperLipY - 12} 258 ${upperLipY - 10} 265 ${upperLipY} C 270 ${upperLipY + 8} 260 ${upperLipY + 12} 248 ${upperLipY + 10} L 235 ${upperLipY + 3} Z`}
          fill="#ff6b81"
          stroke="#c44569"
          strokeWidth="2"
          style={{ transition: 'all 0.5s ease' }}
        />
        {/* Lower Lip */}
        <path
          d={`M 235 ${lowerLipY} L 250 ${lowerLipY - 2} C 262 ${lowerLipY + 2} 268 ${lowerLipY + 12} 260 ${lowerLipY + 18} C 250 ${lowerLipY + 22} 240 ${lowerLipY + 14} 235 ${lowerLipY + 8} Z`}
          fill="#ff4757"
          stroke="#b33939"
          strokeWidth="2"
          style={{ transition: 'all 0.5s ease' }}
        />

        {/* Bilabial closure glow (ب، م) */}
        {tongueData.lipState === 'closed' && isContact && (
          <g>
            <ellipse
              cx="248"
              cy={upperLipY + 6}
              rx="12"
              ry="5"
              fill="#fbbf24"
              opacity="0.8"
              filter="url(#starGlow)"
              className="animate-pulse"
            />
          </g>
        )}

        {/* ===== 6. THE ANIMATED CHILD-FRIENDLY TONGUE (اللسان البطل) ===== */}
        <path
          d={currentTonguePath}
          fill="url(#kidTongue)"
          stroke="#c2185b"
          strokeWidth="3"
          strokeLinejoin="round"
          style={{ transition: 'all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />

        {/* Tongue Highlight / Smooth Shine */}
        <path
          d={currentTonguePath}
          fill="url(#tongueShine)"
          opacity="0.35"
          style={{ transition: 'all 0.65s ease' }}
        />

        {/* Cute Tongue Details (Taste buds / Soft Texture) */}
        {isContact && (
          <g opacity="0.4" style={{ transition: 'all 0.5s ease' }}>
            <circle cx={tongueData.tongueTipX - 10} cy={tongueData.tongueTipY + 6} r="2" fill="#fff" />
            <circle cx={tongueData.tongueTipX - 22} cy={tongueData.tongueTipY + 10} r="2.5" fill="#fff" />
            <circle cx={tongueData.tongueTipX - 35} cy={tongueData.tongueTipY + 14} r="2" fill="#fff" />
          </g>
        )}

        {/* ===== 7. MAGIC TOUCH POINT TARGET (⭐ النجمة السحرية لموضع اللمس) ===== */}
        {isContact && (
          <g className="animate-bounce-slow" filter="url(#starGlow)">
            {/* Glowing ring */}
            <circle
              cx={tongueData.tongueTipX}
              cy={tongueData.tongueTipY}
              r="10"
              fill="#fbbf24"
              opacity="0.3"
            >
              <animate attributeName="r" values="8;13;8" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.2s" repeatCount="indefinite" />
            </circle>
            
            {/* Sparkling Core Star */}
            <circle
              cx={tongueData.tongueTipX}
              cy={tongueData.tongueTipY}
              r="5.5"
              fill="#fef08a"
              stroke="#ca8a04"
              strokeWidth="1.5"
            />
            
            {/* Sparkle cross */}
            <path
              d={`M ${tongueData.tongueTipX - 7} ${tongueData.tongueTipY} L ${tongueData.tongueTipX + 7} ${tongueData.tongueTipY} M ${tongueData.tongueTipX} ${tongueData.tongueTipY - 7} L ${tongueData.tongueTipX} ${tongueData.tongueTipY + 7}`}
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* ===== 8. AIRFLOW MAGIC BREEZE & SOUND WAVES (الهواء والصوت) ===== */}
        {showAirflow && (isContact || isRelease) && (
          <g filter="url(#breezeGlow)">
            {/* Main breath path */}
            <path
              d={tongueData.airflowPath}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeDasharray="8 6"
              strokeLinecap="round"
              opacity="0.85"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="28" dur="1s" repeatCount="indefinite" />
            </path>

            {/* Air Puffs Outside Mouth */}
            <g className="animate-ping" opacity="0.75">
              <circle cx="260" cy="115" r="4" fill="#38bdf8" />
              <circle cx="272" cy="110" r="3" fill="#67e8f9" />
              <circle cx="278" cy="122" r="2.5" fill="#a5f3fc" />
            </g>

            {/* Nasal sound puffs (م، ن) */}
            {tongueData.airflow === 'nasal' && (
              <g className="animate-bounce" opacity="0.8">
                <path
                  d="M 120 120 Q 125 70 140 40"
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <text x="145" y="35" fill="#e9d5ff" fontSize="9" fontWeight="bold">👃 هواء أنفي</text>
              </g>
            )}
          </g>
        )}

        {/* ===== 9. SIMPLE CHILD LABELS (تسميات سهلة وواضحة جداً) ===== */}
        {showLabels && (
          <g className="select-none font-bold" style={{ direction: 'rtl' }}>
            {/* Top Teeth */}
            <text x="228" y="55" fill="#ffffff" fontSize="9" fontWeight="900" filter="url(#starGlow)">
              الأسنان 🦷
            </text>

            {/* Tongue */}
            <text
              x={tongueData.tongueTipX - 20}
              y={tongueData.tongueTipY + 30}
              fill="#ffd1dc"
              fontSize="10"
              fontWeight="900"
            >
              اللِّسَان 👅
            </text>

            {/* Roof */}
            <text x="135" y="42" fill="#fde047" fontSize="9" fontWeight="900">
              سَقْفُ الفَم 🏠
            </text>
          </g>
        )}
      </svg>

      {/* ===== BOTTOM CHILD INSTRUCTIONS CARD ===== */}
      <div className="w-full mt-1.5 flex flex-col items-center gap-1.5 max-w-sm mx-auto px-2">
        
        {/* Big Simple Action Instruction Banner */}
        <div className="w-full bg-[#0d1b45]/90 border-2 border-amber-400/60 rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-2 flex-1 text-right">
            <span className="text-xl">🎯</span>
            <div>
              <span className="text-[11px] font-black text-amber-300 block">
                كَيْفَ أَنْطِقُ حَرْفَ ({letter.char})؟
              </span>
              <p className="text-xs font-black text-white leading-snug">
                {tongueData.tipAr}
              </p>
            </div>
          </div>

          <button
            onClick={handleInteractiveTap}
            className="p-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-md flex-shrink-0 flex items-center gap-1"
            title="حَرِّكِ اللِّسَان"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>نَطْق</span>
          </button>
        </div>

        {/* Visual Badges */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center text-[10px] font-black">
          <span className="bg-purple-950/70 border border-purple-400/40 text-purple-200 px-2.5 py-0.5 rounded-full">
            📍 {tongueData.contactPointAr}
          </span>
          <span className="bg-cyan-950/70 border border-cyan-400/40 text-cyan-200 px-2.5 py-0.5 rounded-full">
            👄 الشَّفَتَان: {letter.mouthGuide?.lipPosition || 'مَفْتُوحَتَان'}
          </span>
        </div>

      </div>

    </div>
  );
};
