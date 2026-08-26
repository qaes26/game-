import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, ArrowRight, Smartphone, Star, CheckCircle2, ShieldCheck, Download, Zap, Target, Palette, Code2, Users } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

interface ProjectIntroCreditsProps {
  onEnterApp: () => void;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const ProjectIntroCredits: React.FC<ProjectIntroCreditsProps> = ({ onEnterApp }) => {
  const [step, setStep] = useState<'goals' | 'design' | 'development' | 'credits'>('goals');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const [installProgress, setInstallProgress] = useState<number>(0);

  const stepLabels: Record<string, string> = {
    goals: '1 / 4 — أَهْدَافُ البَرْنَامَج',
    design: '2 / 4 — التَّصْمِيم',
    development: '3 / 4 — التَّطْوِير',
    credits: '4 / 4 — فَرِيقُ الإِعْدَاد'
  };

  const stepOrder: Array<'goals' | 'design' | 'development' | 'credits'> = ['goals', 'design', 'development', 'credits'];
  const currentIndex = stepOrder.indexOf(step);

  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstalling(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Direct 1-Click Native APK / App Installation Action
  const handleDirectInstallApk = async () => {
    audioManager.playVictory();
    setIsInstalling(true);
    setInstallProgress(25);

    setTimeout(() => setInstallProgress(60), 300);
    setTimeout(async () => {
      setInstallProgress(100);
      if (deferredPrompt) {
        try {
          await deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            setIsInstalled(true);
          }
        } catch {}
      }
      setTimeout(() => setIsInstalling(false), 800);
    }, 600);
  };

  const handleNext = () => {
    audioManager.playClick();
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    audioManager.playClick();
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const teamMembers = [
    { name: 'رنيم حسان العمري', role: 'إعداد وتطوير' },
    { name: 'فاطمة راضي البلاونة', role: 'إعداد وتطوير' },
    { name: 'هبة وليد ابو طبنجة', role: 'إعداد وتطوير' },
    { name: 'جنى عاطف الخوالدة', role: 'إعداد وتطوير' },
    { name: 'ميرا هيثم ذيابات', role: 'إعداد وتطوير' },
    { name: 'ديمة قاسم الكفيري', role: 'إعداد وتطوير' },
    { name: 'طيبة رامي الزعبي', role: 'إعداد وتطوير' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between p-4 md:p-8 select-none overflow-y-auto font-arabic">
      
      {/* Ambient Dark Velvet Lighting */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
        
        {/* Right Side: Direct APK Install Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDirectInstallApk}
            disabled={isInstalling || isInstalled}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm border-2 transition-all shadow-lg active:scale-95 ${
              isInstalled
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : isInstalling
                ? 'bg-amber-500 text-slate-950 border-white animate-pulse'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white border-emerald-400/90 shadow-[0_0_30px_rgba(16,185,129,0.6)] animate-pulse'
            }`}
            title="تثبيت التطبيق كـ APK مباشر على هاتفك المحمول"
          >
            <Smartphone className="w-4 h-4 text-emerald-200" />
            <span>
              {isInstalled
                ? 'تَمَّ التَّثْبِيتُ بِنَجَاح ✓'
                : isInstalling
                ? 'جَارٍ التَّثْبِيت... ⏳'
                : 'تَثْبِيت كَـ APK 📲'}
            </span>
          </button>
        </div>

        {/* Left Side: Step Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-400/30">
            {stepLabels[step]}
          </span>
        </div>

      </header>

      {/* Direct Installation Modal Animation */}
      {isInstalling && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border-3 border-emerald-400 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-[0_0_50px_rgba(16,185,129,0.5)] animate-pop">
            <div className="w-20 h-20 mx-auto rounded-3xl overflow-hidden shadow-glow-yellow border-2 border-white">
              <img src="/icons/lumi_logo.png" alt="LUMI Official Logo" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">جَارٍ بَدْءُ التَّثْبِيتِ المَبَاشِر 📲</h3>
              <p className="text-xs text-cyan-300 font-bold">يَتِمُّ الآنَ إِعْدَادُ حُزْمَةِ التَّطْبِيقِ لِهَاتِفِك...</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-300"
                style={{ width: `${installProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 max-w-3xl mx-auto w-full my-auto py-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* STEP 1: GOALS (أهداف البرنامج) */}
        {/* ========================================================================= */}
        {step === 'goals' && (
          <div className="space-y-6 text-center animate-pop">
            
            {/* Custom High-Res 3D Official LUMI Logo */}
            <div className="relative inline-block group">
              <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.5)] border-3 border-amber-400 transform group-hover:scale-105 transition-transform duration-300 bg-slate-950">
                <img
                  src="/icons/lumi_logo.png"
                  alt="LUMI Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 inset-x-0 flex justify-center pointer-events-none">
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full border border-white shadow-md">
                  ⭐ الشِّعَارُ الرَّسْمِيّ
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2 pt-2">
              <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white">
                مَمْلَكَةُ لُومِي — عَالَمُ الأَصْوَاتِ وَمَخَارِجِ الحُرُوف
              </h1>
              <p className="text-xs md:text-sm text-cyan-300 font-bold max-w-xl mx-auto leading-relaxed">
                مَشْرُوعٌ تَعْلِيمِيٌّ وَعِلاجِيٌّ تَفَاعُلِيٌّ مُتَقَدِّمٌ لِتَصْحِيحِ مَخَارِجِ الحُرُوفِ وَتَشْرِيحِ اللِّسَانِ لِلأَطْفَالِ وَضِعَافِ السَّمْع
              </p>
            </div>

            {/* Goals Card */}
            <div className="bg-[#0a0a0a] border-2 border-amber-400/40 rounded-3xl p-5 md:p-6 text-right space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Target className="w-5 h-5 text-amber-400" />
                <h2 className="text-base md:text-lg font-black text-amber-200">
                  أَهْدَافُ البَرْنَامَج
                </h2>
              </div>

              <div className="space-y-3">
                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🎯</span>
                  <div>
                    <h3 className="text-xs font-black text-amber-300">تَصْحِيحُ مَخَارِجِ الحُرُوف</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">مُسَاعَدَةُ الأَطْفَالِ فِي التَّغَلُّبِ عَلَى صُعُوبَاتِ النُّطْقِ وَتَعْلِيمِهِمْ مَخَارِجَ الحُرُوفِ العَرَبِيَّةِ السَّلِيمَة.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">👅</span>
                  <div>
                    <h3 className="text-xs font-black text-cyan-300">تَشْرِيحُ اللِّسَانِ المُبَسَّط</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">رُؤْيَةُ حَرَكَةِ اللِّسَانِ وَنِقَاطِ اللَّمْسِ المَطْلُوبَةِ لِكُلِّ حَرْف.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🎮</span>
                  <div>
                    <h3 className="text-xs font-black text-emerald-300">مَسَارُ الـ 8 مَرَاحِل</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">تَدَرُّجٌ مِنْ صَوْتِ الحَرْفِ، ثُمَّ الحَرَكَاتِ، المَدِّ، الكَلِمَاتِ، وَالجُمَل.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">📱</span>
                  <div>
                    <h3 className="text-xs font-black text-purple-300">حِفْظٌ مُتَعَدِّدٌ دُونَ إِنْتَرْنِت</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">حِفْظُ تَقَدُّمِ كُلِّ طِفْلٍ عَلَى نَفْسِ الهَاتِفِ دُونَ تَدَاخُلٍ أَوْ قَوَاعِدِ بَيَانَات.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: DESIGN (التصميم) */}
        {/* ========================================================================= */}
        {step === 'design' && (
          <div className="space-y-6 text-center animate-pop">
            
            <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-glow-yellow border-2 border-amber-400">
              <img src="/icons/lumi_logo.png" alt="LUMI Logo" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-black text-amber-200">
                التَّصْمِيم 🎨
              </h2>
              <p className="text-xs text-slate-400 font-bold">
                تَصْمِيمٌ بَصَرِيٌّ مُبْتَكَرٌ مُصَمَّمٌ خِصِّيصًا لِلأَطْفَال
              </p>
            </div>

            <div className="bg-[#0a0a0a] border-2 border-amber-400/40 rounded-3xl p-5 md:p-6 text-right space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Palette className="w-5 h-5 text-pink-400" />
                <h2 className="text-base md:text-lg font-black text-amber-200">
                  مَلامِحُ التَّصْمِيم
                </h2>
              </div>

              <div className="space-y-3">
                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🌌</span>
                  <div>
                    <h3 className="text-xs font-black text-amber-300">عَوَالِمُ ثُلاثِيَّةُ الأَبْعَاد</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">8 عَوَالِمَ خَيَالِيَّةٍ مُتَنَوِّعَةٍ (وَادِي الحُرُوف، غَابَةُ المَقَاطِع، قَرْيَةُ الكَلِمَات، نَهْرُ الجُمَل...) بِتَصَامِيمَ جَذَّابَة.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">👩‍🏫</span>
                  <div>
                    <h3 className="text-xs font-black text-cyan-300">شَخْصِيَّةُ لُومِي المُتَحَرِّكَة</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">مُعَلِّمَةٌ اِفْتِرَاضِيَّةٌ بِصَوْتٍ أُنْثَوِيٍّ نَقِيٍّ 100% تُرَافِقُ الطِّفْلَ خُطْوَةً بِخُطْوَة.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">✨</span>
                  <div>
                    <h3 className="text-xs font-black text-emerald-300">تَأْثِيرَاتٌ بَصَرِيَّة</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">أَلْوَانٌ ذَهَبِيَّةٌ مَلَكِيَّة، تَأْثِيرَاتُ تَوَهُّجٍ وَنُجُومٍ مُتَلأْلِئَةٌ مُصَمَّمَةٌ لِجَذْبِ اِنْتِبَاهِ الأَطْفَال.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">📱</span>
                  <div>
                    <h3 className="text-xs font-black text-purple-300">تَصْمِيمٌ مُتَجَاوِب</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">وَاجِهَةٌ مُتَكَيِّفَةٌ تَعْمَلُ بِسَلاسَةٍ عَلَى الهَاتِفِ وَالحَاسُوبِ وَالتَّابْلِت.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 3: DEVELOPMENT (التطوير) */}
        {/* ========================================================================= */}
        {step === 'development' && (
          <div className="space-y-6 text-center animate-pop">
            
            <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-glow-yellow border-2 border-amber-400">
              <img src="/icons/lumi_logo.png" alt="LUMI Logo" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-black text-amber-200">
                التَّطْوِير 💻
              </h2>
              <p className="text-xs text-slate-400 font-bold">
                تِقْنِيَّاتٌ حَدِيثَةٌ لِتَجْرِبَةٍ تَعْلِيمِيَّةٍ مُتَقَدِّمَة
              </p>
            </div>

            <div className="bg-[#0a0a0a] border-2 border-amber-400/40 rounded-3xl p-5 md:p-6 text-right space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Code2 className="w-5 h-5 text-blue-400" />
                <h2 className="text-base md:text-lg font-black text-amber-200">
                  التِّقْنِيَّاتُ المُسْتَخْدَمَة
                </h2>
              </div>

              <div className="space-y-3">
                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">⚛️</span>
                  <div>
                    <h3 className="text-xs font-black text-amber-300">React + TypeScript + Vite</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">بُنْيَةٌ حَدِيثَةٌ وَسَرِيعَةٌ مَعَ أَمَانِ الأَنْوَاعِ البَرْمَجِيَّة.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🎤</span>
                  <div>
                    <h3 className="text-xs font-black text-cyan-300">مُحَرِّكُ صَوْتٍ أُنْثَوِيٍّ (Edge TTS)</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">صَوْتُ ar-SA-ZariyahNeural السُّعُودِيُّ الأُنْثَوِيُّ 100% بِدُونِ أَيِّ مَفَاتِيحَ أَوِ اشْتِرَاكَات.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🌐</span>
                  <div>
                    <h3 className="text-xs font-black text-emerald-300">تَطْبِيقُ ويب تَقَدُّمِيّ (PWA)</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">قَابِلٌ لِلتَّثْبِيتِ عَلَى الهَاتِفِ كَتَطْبِيقٍ أَصْلِيٍّ يَعْمَلُ بِدُونِ إِنْتَرْنِت.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🚀</span>
                  <div>
                    <h3 className="text-xs font-black text-purple-300">نَشْرٌ عَلَى Netlify</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">نَشْرٌ تِلْقَائِيٌّ مِنْ GitHub مَعَ دَعْمِ الـ CDN العَالَمِيّ.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 4: CREDITS SCREEN (شاشة سوداء لأسماء فريق العمل) */}
        {/* ========================================================================= */}
        {step === 'credits' && (
          <div className="space-y-6 text-center animate-pop">
            
            {/* Logo in Screen 4 */}
            <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-glow-yellow border-2 border-amber-400">
              <img src="/icons/lumi_logo.png" alt="LUMI Logo" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-black text-amber-200">
                فَرِيقُ الإِعْدَادِ وَالتَّطْوِير 👑
              </h2>
              <p className="text-xs text-slate-400 font-bold">
                تَمَّ إِعْدَادُ وَتَصْمِيمُ هَذَا المَشْرُوعِ بِإِشْرَافٍ وَإِبْدَاعٍ مُمَيَّزٍ مِنْ قِبَل:
              </p>
            </div>

            {/* Team Members Royal Cards Grid */}
            <div className="bg-[#0a0a0a] border-2 border-amber-400/50 rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
                {teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-[#141414] to-[#0c0c0c] border border-amber-400/30 hover:border-amber-400 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 font-black text-sm flex items-center justify-center border border-amber-400/40 group-hover:scale-105 transition-transform">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white group-hover:text-amber-200 transition-colors">
                          {member.name}
                        </h3>
                        <span className="text-[10px] text-cyan-300 font-bold block">
                          ⭐ {member.role}
                        </span>
                      </div>
                    </div>

                    <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-70" />
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* Navigation Buttons (Shared across all steps) */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Back Button */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#141414] hover:bg-[#222222] text-slate-300 font-black text-sm rounded-2xl border border-zinc-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السَّابِق</span>
            </button>
          )}

          {/* Next / Enter App Button */}
          {currentIndex < stepOrder.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 rounded-2xl font-black text-base border-2 border-white shadow-glow-yellow active:scale-95 transition-all inline-flex items-center justify-center gap-2"
            >
              <span>التَّالِي</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                audioManager.playVictory();
                onEnterApp();
              }}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 rounded-2xl font-black text-base border-2 border-white shadow-glow-yellow active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>الدُّخُولُ إِلَى التَّطْبِيقِ وَبَدْءُ الرِّحْلَة 🚀</span>
            </button>
          )}
        </div>

      </main>

      {/* Footer Note */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-[10px] text-slate-500 font-bold border-t border-zinc-900 pt-3">
        <span>LUMI — مَمْلَكَةُ الأَصْوَاتِ وَمَخَارِجِ الحُرُوف © جَمِيعُ الحُقُوقِ مَحْفُوظَة</span>
      </footer>

    </div>
  );
};
