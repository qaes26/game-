import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, Mic, Activity } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../lumi/LumiMascot';

export const EchoMountainsWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerVictoryCelebration } = useGame();

  const echoQuestions = [
    { target: 'بَ', options: ['بَ', 'بِ', 'بُ'], audio: 'بَ', hint: 'صوت الباء بالفتحة' },
    { target: 'بُو', options: ['بَا', 'بُو', 'بِي'], audio: 'بُو', hint: 'صوت الباء بالضمة الطويلة' },
    { target: 'بَاب', options: ['بَاب', 'نَاب', 'تَاب'], audio: 'بَاب', hint: 'كلمة تبدأ وتختم بالباء' }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [echoWaveActive, setEchoWaveActive] = useState<boolean>(false);

  const currentQ = echoQuestions[currentIdx];

  const handlePlayEcho = () => {
    setEchoWaveActive(true);
    audioManager.speak(currentQ.audio, 0.8, () => setEchoWaveActive(false));
  };

  const handleAnswer = (choice: string) => {
    if (choice === currentQ.target) {
      audioManager.playVictory();
      addStars(1);
      addCoins(5);

      setTimeout(() => {
        if (currentIdx < echoQuestions.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          triggerVictoryCelebration();
        }
      }, 1000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-indigo-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-800 border-2 border-indigo-200 hover:bg-indigo-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🏔️ جِبَالُ الصَّدَى السِّحْرِيَّة</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              اسْتَمِعْ لِصَدَى الصَّوْتِ المُنْبَعِثِ مِنَ الكَهْفِ وَحَدِّدِ الحَرْفَ المُنَاسِب!
            </p>
          </div>
        </div>

        <button
          onClick={handlePlayEcho}
          className="game-btn px-4 py-2 bg-indigo-600 text-white rounded-2xl font-black text-xs md:text-sm shadow-md"
        >
          <Volume2 className="w-4 h-4" />
          <span>إِطْلاقُ صَدَى الكَهْف 🔊</span>
        </button>
      </div>

      {/* Echo Cave Canvas */}
      <div className="relative w-full min-h-[440px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-950 p-6 flex flex-col justify-between text-white">
        
        {/* Visual Echo Wave Ripple Indicator */}
        <div className="relative z-10 text-center space-y-6">
          <div className="text-6xl animate-float">⛰️</div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border-2 border-white/20 max-w-lg mx-auto space-y-4">
            <h3 className="text-xl font-black text-indigo-200">
              {currentQ.hint}
            </h3>

            {/* Glowing Waveform */}
            <div className="flex items-center justify-center gap-2 h-16">
              {[0.3, 0.8, 1, 0.6, 0.9, 0.4, 0.7].map((h, i) => (
                <div
                  key={i}
                  className={`w-3 rounded-full transition-all duration-300 ${
                    echoWaveActive ? 'bg-amber-400 scale-y-125 speech-bar' : 'bg-indigo-400 opacity-50'
                  }`}
                  style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="game-btn p-4 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-2xl font-black text-2xl border-2 border-white/40 active:scale-95 transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Mascot */}
        <div className="mt-4 flex justify-end">
          <LumiMascot
            message="كُهُوفُ الصَّدَى تُسَاعِدُكَ عَلَى التَّمْيِيزِ بَيْنَ الأَصْوَاتِ بِوُضُوح!"
            emotion="listening"
            size="md"
          />
        </div>

      </div>

    </div>
  );
};
