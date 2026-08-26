import React, { useState, useEffect } from 'react';
import { X, Volume2, Mic, CheckCircle2, Sparkles } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [testText, setTestText] = useState<string>('مَرْحَبًا! هَذَا صَوْتُ لُومِي النَّاطِقُ الفَصِيح.');

  useEffect(() => {
    if (isOpen) {
      const vList = audioManager.getAvailableArabicVoices();
      setVoices(vList);
      if (vList.length > 0 && !selectedVoice) {
        setSelectedVoice(vList[0].name);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestVoice = (vName: string) => {
    audioManager.setSelectedVoice(vName);
    audioManager.speak(testText, 0.85);
  };

  const handleSelect = (vName: string) => {
    setSelectedVoice(vName);
    audioManager.setSelectedVoice(vName);
    audioManager.playClick();
    audioManager.speak('تَمَّ اخْتِيَارُ هَذَا الصَّوْتِ بِنَجَاح!');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#0f172a] border-2 border-indigo-500/40 rounded-3xl max-w-lg w-full p-6 text-white space-y-5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-xl">
              🎙️
            </div>
            <div>
              <h3 className="text-lg font-black text-white">إِعْدَادَاتُ الصَّوْتِ (MICROSOFT NEURAL)</h3>
              <p className="text-xs text-cyan-300 font-bold">اخْتَرْ أَعْلَى وَأَصْفَى صَوْتٍ عَرَبِيٍّ طَبِيعِيّ</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1e293b] text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voices List */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {voices.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs font-bold">
              جَارٍ تَحْمِيلُ أَصْوَاتِ النِّظَامِ وَمَايِكْرُوسُوفْت...
            </div>
          ) : (
            voices.map((v) => {
              const isMicrosoft = v.name.includes('Microsoft') || v.name.includes('Natural');
              const isSelected = selectedVoice === v.name;

              return (
                <div
                  key={v.name}
                  onClick={() => handleSelect(v.name)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-glow-cyan'
                      : 'bg-[#1e293b] border-slate-700 hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div className="text-right space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs md:text-sm">{v.name}</span>
                      {isMicrosoft && (
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
                          مَايِكْرُوسُوفْت نِيُورَال ⭐
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold block">{v.lang}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTestVoice(v.name);
                    }}
                    className="p-2 rounded-xl bg-[#0f172a] hover:bg-cyan-600 text-cyan-300 hover:text-white border border-slate-700 transition-colors"
                    title="تَجْرِبَةُ الصَّوْت"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Test Pronunciation Buttons */}
        <div className="bg-[#1e293b] p-3 rounded-2xl border border-slate-700 space-y-2">
          <span className="text-xs font-black text-slate-300 block text-right">اخْتِبَارُ نُطْقِ الحُرُوفِ وَالمَقَاطِع:</span>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {['بَـ.. بَا', 'بِـ.. بِي', 'بُـ.. بُو', 'بَاب', 'بَطَّة'].map((sample) => (
              <button
                key={sample}
                onClick={() => audioManager.speak(sample)}
                className="px-3 py-1.5 bg-[#0f172a] hover:bg-cyan-600 text-white rounded-xl text-xs font-black border border-slate-600"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-2xl shadow-glow-cyan text-sm"
        >
          حِفْظُ الإِعْدَادَاتِ وَالمُتَابَعَة
        </button>

      </div>
    </div>
  );
};
