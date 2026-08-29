import React, { useState } from 'react';
import { Lock, ShieldAlert, X, ArrowLeft } from 'lucide-react';
import { soundManager } from '../../services/audio/SoundManager';

interface ParentGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: 'parent' | 'therapist') => void;
}

export const ParentGateModal: React.FC<ParentGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(3);
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<'parent' | 'therapist'>('parent');

  React.useEffect(() => {
    if (isOpen) {
      setNum1(Math.floor(Math.random() * 8) + 3);
      setNum2(Math.floor(Math.random() * 8) + 2);
      setAnswer('');
      setError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(answer, 10) === num1 + num2) {
      soundManager.playSuccess();
      onSuccess(selectedRole);
      onClose();
    } else {
      soundManager.playEncouragement();
      setError(true);
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-purple-300 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-700">
            <Lock className="w-6 h-6" />
            <h3 className="text-xl font-black text-slate-800">بَوَّابَةُ الأَهْلِ وَالأَخِصَّائِي</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border">
          <button
            type="button"
            onClick={() => setSelectedRole('parent')}
            className={`flex-1 py-2 rounded-xl font-black text-xs transition-all ${
              selectedRole === 'parent' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            👨‍👩‍👦 لَوْحَةُ الأَهْل
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('therapist')}
            className={`flex-1 py-2 rounded-xl font-black text-xs transition-all ${
              selectedRole === 'therapist' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            🩺 لَوْحَةُ الأَخِصَّائِي
          </button>
        </div>

        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          لِحِمَايَةِ إِعْدَادَاتِ التَّدْرِيب، يُرْجَى حَلُّ المَسْأَلَةِ الرِّيَاضِيَّةِ البَسِيطَة:
        </p>

        {/* Math Security Puzzle */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200 text-center">
            <span className="text-2xl font-black text-purple-900 tracking-wider">
              {num1} + {num2} = ؟
            </span>
          </div>

          <input
            type="number"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setError(false);
            }}
            placeholder="اكتب الناتج هنا..."
            autoFocus
            className="w-full text-center text-xl font-black p-3 rounded-2xl border-2 border-slate-300 focus:border-purple-500 focus:outline-none"
          />

          {error && (
            <p className="text-xs font-bold text-rose-600 text-center">
              الإجابة غير صحيحة، يرجى المحاولة مرة أخرى.
            </p>
          )}

          <button
            type="submit"
            className="game-btn w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black text-sm"
          >
            <span>دُخُولُ اللَّوْحَة ⬅️</span>
          </button>
        </form>

      </div>
    </div>
  );
};
