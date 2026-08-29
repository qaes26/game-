import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { ARABIC_LETTERS } from '../../data/letters';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../mascot/LumiMascot';

export const LumiMirror: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins } = useGame();
  const [selectedLetter, setSelectedLetter] = useState(ARABIC_LETTERS[1]); // Baa
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [mouthState, setMouthState] = useState<'closed' | 'open' | 'smiling'>('closed');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
        console.warn('Camera access denied or unavailable:', err);
        alert('يرجى منح إذن الكاميرا لتشغيل المرآة التفاعلية.');
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

  const triggerMouthDemo = () => {
    audioManager.speak(selectedLetter.char);
    setMouthState('closed');
    setTimeout(() => setMouthState('open'), 300);
    setTimeout(() => setMouthState('smiling'), 700);
    setTimeout(() => setMouthState('closed'), 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-emerald-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800 border-2 border-emerald-200 hover:bg-emerald-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🪞 مِرْآةُ لُومِي لِتَعْلِيمِ حَرَكَةِ الفَم</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              شَاهِدْ حَرَكَةَ الشَّفَتَيْنِ وَاللِّسَانِ بَصَرِيًّا وَقَلِّدْهَا أَمَامَ المِرْآة!
            </p>
          </div>
        </div>

        <button
          onClick={toggleCamera}
          className={`game-btn px-4 py-2 rounded-2xl font-black text-xs md:text-sm border-2 transition-all ${
            cameraActive ? 'bg-rose-500 text-white border-rose-600' : 'bg-emerald-500 text-white border-emerald-600'
          }`}
        >
          {cameraActive ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          <span>{cameraActive ? 'إِغْلاقُ المِرْآة' : 'فَتْحُ المِرْآة 📷'}</span>
        </button>
      </div>

      {/* Main Mirror Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Animated Mouth Guide */}
        <div className="game-card p-6 border-4 border-sky-300 bg-white flex flex-col items-center justify-between text-center space-y-4">
          <span className="bg-sky-100 text-sky-800 font-black text-xs px-3 py-1 rounded-full">
            حَرَكَةُ الفَمِ لِحَرْفِ: {selectedLetter.nameAr} ({selectedLetter.char})
          </span>

          <div className="relative w-48 h-48 bg-amber-50 rounded-full border-4 border-amber-300 flex items-center justify-center shadow-inner overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-36 h-36">
              <ellipse cx="50" cy="50" rx="36" ry="24" fill="#f43f5e" />
              {mouthState === 'closed' ? (
                <path d="M 20 50 Q 50 54 80 50" stroke="#be123c" strokeWidth="4" fill="none" strokeLinecap="round" />
              ) : (
                <>
                  <ellipse cx="50" cy="50" rx="26" ry="16" fill="#881337" />
                  <rect x="35" y="38" width="30" height="6" rx="2" fill="#ffffff" />
                  <rect x="38" y="56" width="24" height="5" rx="2" fill="#ffffff" />
                  <path d="M 38 56 Q 50 48 62 56 Z" fill="#fb7185" />
                </>
              )}
            </svg>
          </div>

          <div className="space-y-1">
            <h4 className="font-black text-slate-900 text-base">{selectedLetter.mouthGuide.lipPosition}</h4>
            <p className="text-xs text-slate-600 font-bold">{selectedLetter.mouthGuide.tip}</p>
          </div>

          <button
            onClick={triggerMouthDemo}
            className="game-btn px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-bold text-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>حَرِّكِ الفَمَ وَاسْتَمِعْ 👄</span>
          </button>
        </div>

        {/* Live Camera View */}
        <div className="game-card p-6 border-4 border-emerald-300 bg-white flex flex-col items-center justify-between text-center space-y-4">
          <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full">
            مِرْآتُكَ التَّفَاعُلِيَّة 🪞
          </span>

          <div className="relative w-full h-56 bg-slate-950 rounded-3xl border-4 border-white shadow-card-pop overflow-hidden flex items-center justify-center">
            {cameraActive ? (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
            ) : (
              <div className="text-center p-6 space-y-2 text-white">
                <span className="text-5xl block">🪞</span>
                <p className="text-xs font-bold">افْتَحِ الكَامِيرَا لِمُشَاهَدَةِ نَفْسِكَ وَتَقْلِيدِ الحَرَكَة مَحَلِّيًّا بِأَمَان!</p>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              audioManager.playVictory();
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

      {/* Choose Any Letter */}
      <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 space-y-3">
        <h3 className="font-black text-slate-800 text-sm">اخْتَرْ أَيَّ حَرْفٍ لِتَعَلُّمِ مَخْرَجِهِ:</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {ARABIC_LETTERS.map(l => (
            <button
              key={l.id}
              onClick={() => {
                setSelectedLetter(l);
                audioManager.playClick();
                audioManager.speak(l.char);
              }}
              className={`min-w-[48px] h-12 rounded-xl font-black text-xl border-2 transition-all flex items-center justify-center ${
                selectedLetter.id === l.id
                  ? 'bg-sky-500 text-white border-white shadow-md scale-105'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-sky-50'
              }`}
            >
              {l.char}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};
