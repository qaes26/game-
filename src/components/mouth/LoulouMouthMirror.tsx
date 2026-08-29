import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import lettersData from '../../data/letters.json';
import { soundManager } from '../../services/audio/SoundManager';
import { useGame } from '../../context/GameContext';
import { LoulouMascot } from '../mascot/LoulouMascot';

export const LoulouMouthMirror: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins } = useGame();
  const [selectedLetter, setSelectedLetter] = useState(lettersData[0]);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [mouthAnimationState, setMouthAnimationState] = useState<'closed' | 'open' | 'smiling' | 'pout'>('closed');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Toggle Camera
  const toggleCamera = async () => {
    if (cameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        streamRef.current = stream;
        setCameraActive(true);
      } catch (err) {
        console.warn('Camera error:', err);
        alert('تعذر الوصول للكاميرا، يرجى منح الإذن في المتصفح.');
      }
    }
  };

  // Attach stream whenever cameraActive changes and video element mounts
  useEffect(() => {
    if (cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraActive]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Animate mouth when letter changes or sound plays
  const triggerMouthDemo = () => {
    soundManager.speak(selectedLetter.character);
    setMouthAnimationState('closed');
    setTimeout(() => setMouthAnimationState('open'), 300);
    setTimeout(() => setMouthAnimationState('smiling'), 700);
    setTimeout(() => setMouthAnimationState('closed'), 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-emerald-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>مِرْآةُ لُولُو لِتَعْلِيمِ حَرَكَةِ الفَم</span>
              <span className="text-2xl">🪞</span>
            </h1>
            <p className="text-xs text-slate-500 font-bold">
              شَاهِدْ حَرَكَةَ الشَّفَتَيْنِ وَاللِّسَانِ وَقَلِّدْهَا أَمَامَ المِرْآة!
            </p>
          </div>
        </div>

        <button
          onClick={toggleCamera}
          className={`game-btn px-4 py-2 rounded-xl font-extrabold text-xs md:text-sm border-2 transition-all ${
            cameraActive
              ? 'bg-rose-500 text-white border-rose-600'
              : 'bg-emerald-500 text-white border-emerald-600'
          }`}
        >
          {cameraActive ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          <span>{cameraActive ? 'إِغْلاق المِرْآة' : 'فَتْح المِرْآة 📷'}</span>
        </button>
      </div>

      {/* Main Mirror & Mouth Guide Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Loulou Animated Mouth Guide */}
        <div className="game-card p-6 border-4 border-sky-300 bg-gradient-to-b from-sky-50 to-white flex flex-col items-center justify-between text-center space-y-4">
          <span className="bg-sky-100 text-sky-800 font-black text-xs px-3 py-1 rounded-full border border-sky-300">
            حَرَكَةُ الفَمِ لِحَرْفِ: {selectedLetter.nameAr} ({selectedLetter.character})
          </span>

          {/* Animated Mouth Illustration SVG */}
          <div className="relative w-48 h-48 bg-amber-50 rounded-full border-4 border-amber-300 flex items-center justify-center shadow-inner overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-36 h-36">
              {/* Lips Outline */}
              <ellipse cx="50" cy="50" rx="36" ry="24" fill="#f43f5e" />
              
              {/* Mouth Cavity */}
              {mouthAnimationState === 'closed' ? (
                <path d="M 20 50 Q 50 54 80 50" stroke="#be123c" strokeWidth="4" fill="none" strokeLinecap="round" />
              ) : mouthAnimationState === 'open' ? (
                <ellipse cx="50" cy="50" rx="26" ry="16" fill="#881337" />
              ) : (
                <ellipse cx="50" cy="50" rx="28" ry="12" fill="#881337" />
              )}

              {/* Teeth */}
              {mouthAnimationState !== 'closed' && (
                <>
                  <rect x="35" y="38" width="30" height="6" rx="2" fill="#ffffff" />
                  <rect x="38" y="56" width="24" height="5" rx="2" fill="#ffffff" />
                </>
              )}

              {/* Tongue Position */}
              {mouthAnimationState !== 'closed' && (
                <path d="M 38 56 Q 50 48 62 56 Z" fill="#fb7185" />
              )}
            </svg>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-slate-800 text-base">
              {selectedLetter.mouthGuide.lipPosition}
            </h4>
            <p className="text-xs md:text-sm text-slate-600 font-medium max-w-sm">
              {selectedLetter.mouthGuide.tip}
            </p>
          </div>

          <button
            onClick={triggerMouthDemo}
            className="game-btn px-6 py-2.5 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-bold text-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>حَرِّكِ الفَمَ وَاسْتَمِعْ 👄</span>
          </button>
        </div>

        {/* Right Card: Real Mirror / Camera View */}
        <div className="game-card p-6 border-4 border-emerald-300 bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-between text-center space-y-4">
          <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-300">
            مِرْآتُكَ الشَّخْصِيَّة 🪞
          </span>

          <div className="relative w-full h-56 bg-slate-900 rounded-3xl border-4 border-white shadow-card-pop overflow-hidden flex items-center justify-center">
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="text-center p-6 space-y-2">
                <span className="text-5xl block opacity-80">🪞</span>
                <p className="text-white text-xs font-bold">
                  افْتَحِ الكَامِيرَا لِمُشَاهَدَةِ نَفْسِكَ وَتَقْلِيدِ الحَرَكَة!
                </p>
                <p className="text-slate-400 text-[10px]">
                  (الكَامِيرَا تَعْمَلُ مَحَلِّيًّا بِأَمَانٍ تَامّ دُونَ حِفْظِ أَيِّ فِيدْيُو)
                </p>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                soundManager.playSuccess();
                addStars(1);
                addCoins(5);
              }}
              className="game-btn px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>قَلَّدْتُ الحَرَكَةَ بِنَجَاح! 🌟</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Letter Chooser for Mouth Mirror */}
      <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm space-y-3">
        <h3 className="font-black text-slate-800 text-sm">
          اخْتَرْ حَرْفًا لِتَعَلُّمِ مَخْرَجِهِ وَشَكْلِ فَمِهِ:
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {lettersData.slice(0, 14).map(l => (
            <button
              key={l.id}
              onClick={() => {
                setSelectedLetter(l);
                soundManager.playPop();
                soundManager.speak(l.character);
              }}
              className={`min-w-[48px] h-12 rounded-xl font-black text-xl border-2 transition-all flex items-center justify-center ${
                selectedLetter.id === l.id
                  ? 'bg-sky-500 text-white border-white shadow-md scale-105'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-sky-50'
              }`}
            >
              {l.character}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
