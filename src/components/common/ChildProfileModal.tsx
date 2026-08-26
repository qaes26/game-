import React, { useState } from 'react';
import { X, UserPlus, Users, Sparkles, Star, Trophy, Trash2, Check, ArrowRight } from 'lucide-react';
import { useGame, ChildProfile } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';

interface ChildProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChildProfileModal: React.FC<ChildProfileModalProps> = ({ isOpen, onClose }) => {
  const {
    profiles,
    activeProfileId,
    switchProfile,
    createProfile,
    deleteProfile,
    childName
  } = useGame();

  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [newChildName, setNewChildName] = useState<string>('');
  const [newChildAge, setNewChildAge] = useState<number>(6);
  const [newChildAvatarEmoji, setNewChildAvatarEmoji] = useState<string>('👑');

  if (!isOpen) return null;

  const handleSelectProfile = (profileId: string) => {
    const prof = profiles.find(p => p.id === profileId);
    audioManager.playClick();
    switchProfile(profileId);
    if (prof) {
      setTimeout(() => {
        audioManager.speak(`أَهْلًا يَا ${prof.name}! هَيَّا نُكْمِلُ رِحْلَتَنَا السَّاحِرَة!`);
      }, 250);
    }
    onClose();
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newChildName.trim();
    if (!cleanName) return;

    audioManager.playVictory();
    const newId = createProfile(cleanName, newChildAge, newChildAvatarEmoji);
    setTimeout(() => {
      audioManager.speak(`أَهْلًا بِكَ يَا ${cleanName}! مَرْحَبًا بِكَ فِي مَمْلَكَةِ الأَصْوَات!`);
    }, 250);
    setIsCreatingNew(false);
    setNewChildName('');
    onClose();
  };

  const handleDelete = (e: React.MouseEvent, profileId: string, name: string) => {
    e.stopPropagation();
    if (confirm(`هل تريد حذف ملف البطل (${name})؟ لن تتأثر ملفات الأطفال الآخرين.`)) {
      audioManager.playClick();
      deleteProfile(profileId);
    }
  };

  const avatarOptions = [
    { emoji: '👑', label: 'الملك' },
    { emoji: '🦁', label: 'الأسد الشجاع' },
    { emoji: '🚀', label: 'رائد الفضاء' },
    { emoji: '⭐', label: 'نجم الأبطال' },
    { emoji: '🦄', label: 'المهر السحري' },
    { emoji: '🐱', label: 'القط الذكي' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-[#091330] border-2 border-amber-400/80 rounded-3xl max-w-md w-full p-5 md:p-6 text-white space-y-4 shadow-[0_0_50px_rgba(245,158,11,0.35)] relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 flex items-center justify-center text-xl shadow-glow-yellow">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-amber-200">
                أَبْطَالُ هَذَا الهَاتِف 📱
              </h3>
              <p className="text-[11px] text-cyan-300 font-bold">
                حِفْظٌ مُسْتَقِلٌّ لِكُلِّ طِفْلٍ دُونَ تَدَاخُل!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#111f4d] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODE 1: PROFILES LIST */}
        {!isCreatingNew && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1 text-xs font-black text-slate-300">
              <span>اخْتَرِ البَطَلَ الَّذِي يَلْعَبُ الآن:</span>
              <span className="text-amber-400">{profiles.length} أَبْطَال</span>
            </div>

            {/* Profile Cards */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {profiles.map((p) => {
                const isActive = p.id === activeProfileId;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProfile(p.id)}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between relative group ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/25 via-yellow-500/15 to-blue-950/40 border-amber-400 shadow-glow-yellow scale-[1.02]'
                        : 'bg-[#0e1c45] border-blue-900/80 hover:border-amber-400/50 hover:bg-[#132457]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-2xl flex items-center justify-center border-2 border-white shadow-md">
                        {p.avatarEmoji || '👑'}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white">{p.name}</span>
                          {isActive && (
                            <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <Check className="w-3 h-3" />
                              يَلْعَبُ الآن
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold mt-0.5">
                          <span className="flex items-center gap-0.5 text-amber-300">
                            <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                            {p.stars} نَجْمَة
                          </span>
                          <span>•</span>
                          <span>🪙 {p.coins}</span>
                          <span>•</span>
                          <span className="text-slate-400">{p.age} سَنَوَات</span>
                        </div>
                      </div>
                    </div>

                    {/* Delete action (disabled if only 1 profile) */}
                    {profiles.length > 1 && (
                      <button
                        onClick={(e) => handleDelete(e, p.id, p.name)}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-xl text-red-400 hover:bg-red-950/60 hover:text-red-300 transition-all"
                        title="حذف هذا الملف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add New Child Button */}
            <button
              onClick={() => {
                audioManager.playClick();
                setIsCreatingNew(true);
              }}
              className="w-full py-3 rounded-2xl bg-[#14265c] hover:bg-[#1d3782] border-2 border-dashed border-amber-400/60 text-amber-300 font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>إِضَافَةُ طِفْلٍ / بَطَلٍ جَدِيد ➕</span>
            </button>
          </div>
        )}

        {/* MODE 2: CREATE NEW CHILD PROFILE */}
        {isCreatingNew && (
          <form onSubmit={handleCreateSubmit} className="space-y-4 animate-pop">
            <div className="text-center space-y-1">
              <span className="text-xs font-black text-amber-300">
                مَلَفُّ بَطَلٍ جَدِيد 🌟
              </span>
              <p className="text-xs text-slate-300 font-bold">
                سَيَتِمُّ حِفْظُ تَقَدُّمِهِ وَنُجُومِهِ بِشَكْلٍ مُسْتَقِلٍّ كُلِّيًّا!
              </p>
            </div>

            {/* Child Name Input */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-black text-amber-200 block">
                اسْمُ البَطَل:
              </label>
              <input
                type="text"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                placeholder="مَثَلًا: أَحْمَد، سَارَة، يُوسُف..."
                autoFocus
                required
                className="w-full px-4 py-3 bg-[#070e24] border-2 border-amber-400 rounded-2xl text-center text-white font-black text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
              />
            </div>

            {/* Age Selection */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-black text-amber-200 block">
                العُمْر: ({newChildAge} سَنَوَات)
              </label>
              <div className="flex items-center justify-between gap-1.5">
                {[4, 5, 6, 7, 8, 9, 10].map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setNewChildAge(a)}
                    className={`flex-1 py-2 rounded-xl font-black text-xs transition-all ${
                      newChildAge === a
                        ? 'bg-amber-400 text-slate-950 font-extrabold shadow-glow-yellow'
                        : 'bg-[#0f1d47] text-slate-300 border border-blue-900'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji Avatar Selection */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-black text-amber-200 block">
                اخْتَرِ الشَّخْصِيَّة:
              </label>
              <div className="flex items-center justify-center gap-2">
                {avatarOptions.map((opt) => (
                  <button
                    key={opt.emoji}
                    type="button"
                    onClick={() => setNewChildAvatarEmoji(opt.emoji)}
                    className={`w-11 h-11 rounded-2xl text-2xl flex items-center justify-center border-2 transition-all ${
                      newChildAvatarEmoji === opt.emoji
                        ? 'bg-amber-400/30 border-amber-300 scale-110 shadow-glow-yellow'
                        : 'bg-[#070e24] border-blue-900 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {opt.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="flex-1 py-3 rounded-2xl bg-[#0f1d47] text-slate-300 font-black text-xs hover:bg-[#182e6e] transition-colors"
              >
                إِلْغَاء
              </button>

              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-xs shadow-glow-yellow active:scale-95 transition-transform"
              >
                حِفْظُ البَطَلِ وَالانْطِلاق 🚀
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
