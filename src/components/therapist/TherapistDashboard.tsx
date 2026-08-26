import React, { useState } from 'react';
import { ArrowRight, Save, Lock, Unlock, CheckCircle, FileText, Settings, UserPlus, Sparkles } from 'lucide-react';
import { useGame, TherapistPlan } from '../../context/GameContext';
import lettersData from '../../data/letters.json';
import { soundManager } from '../../services/audio/SoundManager';

export const TherapistDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    childName,
    setChildName,
    age,
    setAge,
    letterProgress,
    unlockLetterManually,
    lockLetterManually,
    therapistPlan,
    setTherapistPlan,
    attemptsLog
  } = useGame();

  const [targetLetters, setTargetLetters] = useState<string[]>(
    therapistPlan?.targetLetters || ['baa', 'meem', 'taa']
  );
  const [focusLevel, setFocusLevel] = useState<number>(therapistPlan?.focusLevel || 2);
  const [notes, setNotes] = useState<string>(
    therapistPlan?.notes || 'التركيز على مخرج صوت حرف الباء مع الحركات القصيرة وتكرار كلمة حبل.'
  );
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const toggleTargetLetter = (id: string) => {
    if (targetLetters.includes(id)) {
      setTargetLetters(targetLetters.filter(l => l !== id));
    } else {
      setTargetLetters([...targetLetters, id]);
    }
  };

  const handleSavePlan = () => {
    const updatedPlan: TherapistPlan = {
      childName,
      targetLetters,
      focusLevel,
      difficulty: 'easy',
      notes,
      updatedAt: Date.now()
    };
    setTherapistPlan(updatedPlan);
    soundManager.playSuccess();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-3xl border-2 border-indigo-200 shadow-sm">
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
            <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>لَوْحَةُ تَحَكُّمِ أَخِصَّائِي التَّخَاطُب</span>
              <span className="text-xl">🩺</span>
            </h1>
            <p className="text-xs text-slate-500 font-bold">
              تَخْصِيصُ الخُطَّةِ العِلاجِيَّةِ وَإِدَارَةُ مَسَارِ التَّدْرِيب
            </p>
          </div>
        </div>

        <button
          onClick={handleSavePlan}
          className="game-btn px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-black text-xs md:text-sm flex items-center gap-1.5 shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>حِفْظُ الخُطَّة 💾</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-800 px-4 py-3 rounded-2xl font-black text-xs text-center animate-pop">
          🌟 تَمَّ حِفْظُ الخُطَّةِ العِلاجِيَّةِ وَتَحْدِيثُ إِعْدَادَاتِ الطِّفْلِ بِنَجَاح!
        </div>
      )}

      {/* Child Profile & Focus Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Profile Card */}
        <div className="game-card p-6 border-2 border-indigo-200 bg-white space-y-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            <span>بَيَانَاتُ الطِّفْلِ وَالمُسْتَوَى</span>
          </h3>

          <div className="space-y-3 text-xs font-bold text-slate-700">
            <div>
              <label className="block mb-1">اسم الطفل:</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full p-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">عمر الطفل (سنوات):</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10) || 6)}
                className="w-full p-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">المستوى التعليمي المستهدف:</label>
              <select
                value={focusLevel}
                onChange={(e) => setFocusLevel(parseInt(e.target.value, 10))}
                className="w-full p-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                <option value={1}>المستوى 1: التعرف على الحرف</option>
                <option value={2}>المستوى 2: صوت الحرف والميكروفون</option>
                <option value={3}>المستوى 3: الحركات القصيرة</option>
                <option value={4}>المستوى 4: المقاطع والمدود</option>
                <option value={5}>المستوى 5: الكلمات ومواقع الحرف</option>
                <option value={6}>المستوى 6: موقع الصوت داخل الكلمة</option>
                <option value={7}>المستوى 7: الجمل والمعاني</option>
                <option value={8}>المستوى 8: التحدي النهائي</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clinical Notes Card */}
        <div className="game-card p-6 border-2 border-indigo-200 bg-white space-y-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span>مُلاحَظَاتُ الأَخِصَّائِي وَتَوْجِيهَاتُ الجَلَسَة</span>
          </h3>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="اكتب التوجيهات والملاحظات السريرية هنا..."
            className="w-full p-3 rounded-2xl border-2 border-slate-200 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none leading-relaxed"
          />
        </div>

      </div>

      {/* Target Letters & Lock/Unlock Overrides */}
      <div className="game-card p-6 border-2 border-slate-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-800">
            تَحْدِيدُ الأَصْوَاتِ المُسْتَهْدَفَةِ وَالتَّحَكُّمُ فِي القَفْلِ وَالفَتْح:
          </h3>
          <span className="text-xs font-bold text-slate-500">
            اضغط على القفل لفتح أو قفل الحرف للطفل يدويًا
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {lettersData.map(l => {
            const prog = letterProgress[l.id];
            const isLocked = prog ? prog.status === 'locked' : !l.defaultUnlocked;
            const isTarget = targetLetters.includes(l.id);

            return (
              <div
                key={l.id}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-between gap-2 text-center transition-all ${
                  isTarget
                    ? 'border-indigo-500 bg-indigo-50/70'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <input
                    type="checkbox"
                    checked={isTarget}
                    onChange={() => toggleTargetLetter(l.id)}
                    title="تحديد كهدف علاجي"
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => {
                      if (isLocked) {
                        unlockLetterManually(l.id);
                      } else {
                        lockLetterManually(l.id);
                      }
                    }}
                    className={`p-1 rounded-lg ${isLocked ? 'text-rose-500 hover:bg-rose-100' : 'text-emerald-600 hover:bg-emerald-100'}`}
                    title={isLocked ? 'فتح الحرف' : 'قفل الحرف'}
                  >
                    {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <span className="text-3xl font-black text-slate-800">{l.character}</span>
                <span className="text-[11px] font-black text-slate-600">{l.nameAr}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Speech Attempts History Table */}
      <div className="game-card p-6 border-2 border-slate-200 bg-white space-y-4">
        <h3 className="text-lg font-black text-slate-800">
          سِجِلُّ مُحَاوَلاتِ النُّطْقِ الأَخِيرَة:
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-black">
                <th className="py-2.5 px-3">الهدف المستهدف</th>
                <th className="py-2.5 px-3">الحرف</th>
                <th className="py-2.5 px-3">النتيجة الآلية</th>
                <th className="py-2.5 px-3">مؤشر الثقة</th>
                <th className="py-2.5 px-3">الوقت</th>
              </tr>
            </thead>
            <tbody>
              {attemptsLog.map(log => (
                <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 font-bold">
                  <td className="py-3 px-3 text-slate-900 font-black text-sm">{log.target}</td>
                  <td className="py-3 px-3 text-indigo-700">{log.letterId}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      log.status === 'high_confidence'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {log.status === 'high_confidence' ? 'نطق متقن 🌟' : 'يحتاج تكرار 🔄'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-extrabold">%{log.score}</td>
                  <td className="py-3 px-3 text-slate-400">{new Date(log.timestamp).toLocaleTimeString('ar-SA')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
