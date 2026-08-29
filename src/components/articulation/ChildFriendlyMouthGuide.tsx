import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, Play, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LetterData } from '../../data/letters';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';

interface ChildFriendlyMouthGuideProps {
  letter: LetterData;
  onSuccess?: () => void;
  compact?: boolean;
}

export interface KidArticulationGuide {
  title1: string;
  step1: string;
  title2: string;
  step2: string;
  title3: string;
  step3: string;
  funTip: string;
}

export function getKidArticulationGuide(letterId: string, char: string): KidArticulationGuide {
  switch (letterId) {
    case 'baa':
      return {
        title1: '1. شَفَتَانِ مُنْطَبِقَتَان',
        step1: 'أَغْلِقْ شَفَتَيْكَ بِنُعُومَة مِثْلِي',
        title2: '2. اللِّسَانُ مُسْتَرِيح',
        step2: 'اجْعَلْ لِسَانَكَ يَسْتَرِيحُ فِي الأَسْفَل',
        title3: '3. انْطِلَاقُ الصَّوْت',
        step3: 'افْتَحْ شَفَتَيْكَ وَانْطِقْ: بْ',
        funTip: 'مِثْلَ انْفِجَارِ فَقَاعَةِ الصَّابُون: بْ'
      };
    case 'taa':
    case 'taa_heavy':
      return {
        title1: '1. ابْتِسَامَةٌ مَفْتُوحَة',
        step1: 'ابْتَسِمْ وَافْتَحْ فَمَكَ قَلِيلًا',
        title2: '2. اللِّسَانُ خَلْفَ الأَسْنَان',
        step2: 'اجْعَلْ طَرَفَ لِسَانِكَ يَلْمِسُ أَسْنَانَكَ العُلْيَا',
        title3: '3. هَمْسَةُ الصَّوْت',
        step3: 'دَعِ الهَوَاءَ يَهْمِس: تْ.. تْ',
        funTip: 'مِثْلَ دَقَّاتِ السَّاعَة: تِكْ تَوْك'
      };
    case 'thaa':
    case 'zaal':
    case 'zaa_heavy':
      return {
        title1: '1. شَفَتَانِ مُتَبَاعِدَتَان',
        step1: 'افْتَحْ شَفَتَيْكَ بِهُدُوء',
        title2: '2. اللِّسَانُ بَيْنَ الأَسْنَان',
        step2: 'أَخْرِجْ طَرَفَ لِسَانِكَ قَلِيلًا بَيْنَ أَسْنَانِك',
        title3: '3. انْفُخِ الهَوَاء',
        step3: 'انْفُخْ بِلُطْفٍ وَانْطِقْ: ثْ',
        funTip: 'أَخْرِجْ لِسَانَكَ قَلِيلًا كَالثَّعْلَب'
      };
    case 'jeem':
    case 'sheen':
    case 'yaa':
      return {
        title1: '1. ابْتِسَامَةٌ عَرِيضَة',
        step1: 'ابْتَسِمْ بِاتِّسَاعٍ جَمِيل',
        title2: '2. وَسَطُ اللِّسَانِ يَرْتَفِع',
        step2: 'ارْفَعْ وَسَطَ لِسَانِكَ لِسَقْفِ الفَم',
        title3: '3. انْطِقِ الصَّوْت',
        step3: 'انْطِقْ بِوُضُوح: ' + char + 'ْ',
        funTip: 'ارْفَعْ لِسَانَكَ كَالجَبَلِ الصَّغِير'
      };
    case 'seen':
    case 'saad':
    case 'zay':
      return {
        title1: '1. أَسْنَانٌ مُتَقَارِبَة',
        step1: 'أَغْلِقْ أَسْنَانَكَ مَعًا بِابْتِسَامَة',
        title2: '2. اللِّسَانُ خَلْفَ الأَسْنَان',
        step2: 'اجْعَلْ لِسَانَكَ خَلْفَ أَسْنَانِكَ السُّفْلَى',
        title3: '3. صَفِيرُ النَّسِيم',
        step3: 'انْفُخْ صَفِيرًا جَمِيلًا: ' + char + 'ْ',
        funTip: 'اصْنَعْ صَفِيرَ النَّسِيمِ الرَّائِع'
      };
    case 'faa':
      return {
        title1: '1. أَسْنَانٌ عَلَى الشَّفَة',
        step1: 'ضَعْ أَسْنَانَكَ العُلْيَا فَوْقَ شَفَتِكَ السُّفْلَى',
        title2: '2. هَوَاءٌ خَفِيف',
        step2: 'اجْعَلِ اللِّسَانَ مُسْتَرِيحًا',
        title3: '3. صَوْتُ الفَرَاشَة',
        step3: 'انْفُخِ الهَوَاءَ وَانْطِقْ: فْ',
        funTip: 'مِثْلَ جَنَاحِ الفَرَاشَةِ الرَّقِيق'
      };
    case 'waaw':
      return {
        title1: '1. شَفَتَانِ دَائِرِيَّتَان',
        step1: 'ضُمَّ شَفَتَيْكَ كَدَائِرَةٍ صَغِيرَة',
        title2: '2. ارْتِفَاعُ اللِّسَان',
        step2: 'ارْفَعْ خَلْفَ لِسَانِكَ قَلِيلًا',
        title3: '3. انْطِقْ بِدِفْء',
        step3: 'دَعِ الصَّوْتَ يَنْطَلِق: وْ.. وَرْدَة',
        funTip: 'اصْنَعْ دَائِرَةً بِفَمِكَ كَالقَمَر'
      };
    case 'raa':
      return {
        title1: '1. فَمٌ مُبْتَسِم',
        step1: 'ابْتَسِمْ وَافْتَحْ فَمَكَ بِرَاحَة',
        title2: '2. اهْتِزَازُ اللِّسَان',
        step2: 'ارْفَعْ طَرَفَ لِسَانِكَ خَلْفَ الأَسْنَان',
        title3: '3. انْطِلَاقُ الصَّارُوخ',
        step3: 'شَغِّلْ مُحَرِّكَ اللِّسَان: رْرْرْ.. رْ',
        funTip: 'شَغِّلْ مُحَرِّكَ السَّيَّارَةِ بِلِسَانِك: رْرْرْ'
      };
    default:
      return {
        title1: '1. فَتْحُ الفَمِ بِنَقَاء',
        step1: 'افْتَحْ فَمَكَ بِشَكْلٍ مُرِيحٍ وَنَقِيّ',
        title2: '2. مَوْضِعُ اللِّسَان',
        step2: 'ضَعْ لِسَانَكَ فِي المَوْضِعِ الصَّحِيح',
        title3: '3. صَوْتُ الحَرْف',
        step3: 'انْطِقْ بِصَوْتٍ عَالٍ وَوَاضِح: ' + char + 'ْ',
        funTip: 'تَنَفَّسْ بِعُمْقٍ وَانْطِقْ كَالأَبْطَال'
      };
  }
}

export const ChildFriendlyMouthGuide: React.FC<ChildFriendlyMouthGuideProps> = ({
  letter,
  onSuccess,
  compact = false
}) => {
  const { childName, addStars, addCoins } = useGame();
  const guide = getKidArticulationGuide(letter.id, letter.char);

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlayingDemonstration, setIsPlayingDemonstration] = useState<boolean>(false);
  const [hasPracticed, setHasPracticed] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep(1);
    setIsPlayingDemonstration(false);
    setHasPracticed(false);
  }, [letter.id]);

  // Full 3-Step Guided Audio Lesson
  const handlePlayFullDemonstration = () => {
    setIsPlayingDemonstration(true);
    setActiveStep(1);

    const step1Speech = `الخُطْوَةُ الأُولَى يَا ${childName || 'البَطَل'}: ${guide.step1}`;
    audioManager.speak(step1Speech, 0.88, () => {
      setActiveStep(2);
      const step2Speech = `الخُطْوَةُ الثَّانِيَة: ${guide.step2}`;
      audioManager.speak(step2Speech, 0.88, () => {
        setActiveStep(3);
        const step3Speech = `الخُطْوَةُ الثَّالِثَة: ${guide.step3}`;
        audioManager.speak(step3Speech, 0.88, () => {
          setIsPlayingDemonstration(false);
          setHasPracticed(true);
          addStars(1);
          addCoins(5);
          try {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {}
          if (onSuccess) onSuccess();
        });
      });
    });
  };

  const handleStepClick = (stepNum: number) => {
    setActiveStep(stepNum);
    const text = stepNum === 1 ? guide.step1 : stepNum === 2 ? guide.step2 : guide.step3;
    audioManager.speak(text, 0.9);
  };

  const handleSoundTap = () => {
    setActiveStep(3);
    audioManager.speak(`صَوْتُ حَرْفِ ${letter.nameAr}.. ${letter.char}ْ`, 0.85);
  };

  return (
    <div className="bg-[#0b1430]/95 backdrop-blur-xl rounded-3xl p-4 md:p-6 border-2 border-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.25)] space-y-4 text-white select-none font-arabic">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-blue-900/60 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-xl border-2 border-white shadow-glow-yellow">
            سَعْد
          </div>
          <div>
            <h3 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-white">
              دَلِيلُ الصَّدِيقِ سَعْد — نُطْقُ حَرْفِ ({letter.char}) بـ 3 خُطُوَاتٍ مُصَوَّرَة
            </h3>
            <p className="text-xs text-cyan-200 font-bold">
              انْظُرْ كَيْفَ يُحَرِّكُ سَعْدٌ فَمَهُ وَلِسَانَهُ وَقَلِّدْهُ بِبَسَاطَةٍ يَا {childName || 'البَطَل'}
            </p>
          </div>
        </div>

        <button
          onClick={handlePlayFullDemonstration}
          disabled={isPlayingDemonstration}
          className={`px-4 py-2 rounded-2xl font-black text-xs border flex items-center gap-2 active:scale-95 transition-all shadow-md ${
            isPlayingDemonstration
              ? 'bg-rose-600 border-white text-white animate-pulse'
              : 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 border-white shadow-glow-yellow hover:scale-105'
          }`}
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{isPlayingDemonstration ? 'سَعْدٌ يَشْرَحُ الآن...' : 'شَغِّلِ الخُطُوَاتِ الثَّلَاث'}</span>
        </button>
      </div>

      {/* 3 Step Picture Cards Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* ========================================================================= */}
        {/* CARD 1: STEP 1 - BOY LIPS & MOUTH PREPARATION */}
        {/* ========================================================================= */}
        <div
          onClick={() => handleStepClick(1)}
          className={`group rounded-3xl p-4 border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-3 relative active:scale-98 overflow-hidden ${
            activeStep === 1
              ? 'bg-gradient-to-b from-[#18326e] to-[#0f224f] border-amber-400 shadow-glow-yellow scale-102 ring-2 ring-amber-400/40'
              : 'bg-[#0a1538] border-blue-900/80 hover:border-cyan-400/50 text-slate-300'
          }`}
        >
          {/* Step Pill */}
          <div className="w-full flex items-center justify-between">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              الخُطْوَةُ 1
            </span>
            <span className="text-[11px] text-cyan-300 font-bold">شَكْلُ الشَّفَتَيْن</span>
          </div>

          {/* Realistic AI 3D Boy Picture 1 */}
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-lg group-hover:scale-105 transition-transform">
            <img
              src="/assets/articulation/boy_step1_lips.jpg"
              alt="سعد يجهز شفتيه"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-1.5 inset-x-0 text-center">
              <span className="text-[10px] font-black text-amber-200 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-amber-400/30">
                تَهْيِئَةُ الشَّفَتَيْن
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-black text-amber-300">{guide.title1}</h4>
            <p className="text-xs font-bold text-white leading-relaxed">{guide.step1}</p>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-cyan-200 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm border border-cyan-400/30">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>اسْتَمِعْ لِلْخُطْوَة 1</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: STEP 2 - BOY TONGUE & TEETH POSITION */}
        {/* ========================================================================= */}
        <div
          onClick={() => handleStepClick(2)}
          className={`group rounded-3xl p-4 border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-3 relative active:scale-98 overflow-hidden ${
            activeStep === 2
              ? 'bg-gradient-to-b from-[#18326e] to-[#0f224f] border-cyan-400 shadow-glow-cyan scale-102 ring-2 ring-cyan-400/40'
              : 'bg-[#0a1538] border-blue-900/80 hover:border-cyan-400/50 text-slate-300'
          }`}
        >
          {/* Step Pill */}
          <div className="w-full flex items-center justify-between">
            <span className="bg-cyan-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              الخُطْوَةُ 2
            </span>
            <span className="text-[11px] text-amber-300 font-bold">مَوْضِعُ اللِّسَان</span>
          </div>

          {/* Realistic AI 3D Boy Picture 2 */}
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-lg group-hover:scale-105 transition-transform">
            <img
              src="/assets/articulation/boy_step2_tongue.jpg"
              alt="موضع لسان وأسنان سعد"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-1.5 inset-x-0 text-center">
              <span className="text-[10px] font-black text-cyan-200 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-cyan-400/30">
                مَوْضِعُ اللِّسَانِ وَالأَسْنَان
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-black text-cyan-300">{guide.title2}</h4>
            <p className="text-xs font-bold text-white leading-relaxed">{guide.step2}</p>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-cyan-200 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm border border-cyan-400/30">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>اسْتَمِعْ لِلْخُطْوَة 2</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: STEP 3 - BOY JOYFULLY SPEAKING & PRODUCING PURE SOUND */}
        {/* ========================================================================= */}
        <div
          onClick={handleSoundTap}
          className={`group rounded-3xl p-4 border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-3 relative active:scale-98 overflow-hidden ${
            activeStep === 3
              ? 'bg-gradient-to-b from-[#18326e] to-[#0f224f] border-emerald-400 shadow-glow-green scale-102 ring-2 ring-emerald-400/40'
              : 'bg-[#0a1538] border-blue-900/80 hover:border-cyan-400/50 text-slate-300'
          }`}
        >
          {/* Step Pill */}
          <div className="w-full flex items-center justify-between">
            <span className="bg-emerald-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              الخُطْوَةُ 3
            </span>
            <span className="text-[11px] text-emerald-300 font-bold">انْطِلَاقُ الصَّوْت</span>
          </div>

          {/* Realistic AI 3D Boy Picture 3 */}
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-lg group-hover:scale-105 transition-transform">
            <img
              src="/assets/articulation/boy_step3_speak.jpg"
              alt="سعد ينطق الحرف بفرح"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Target Letter Floating Badge */}
            <div className="absolute top-2 right-2 w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-base flex items-center justify-center border-2 border-white shadow-glow-yellow animate-bounce">
              {letter.char}
            </div>

            <div className="absolute bottom-1.5 inset-x-0 text-center">
              <span className="text-[10px] font-black text-emerald-200 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-emerald-400/30">
                صَوْتُ حَرْفِ ({letter.char}ْ)
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-black text-emerald-300">{guide.title3}</h4>
            <p className="text-xs font-bold text-white leading-relaxed">{guide.step3}</p>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md border border-white/40">
            <Volume2 className="w-4 h-4" />
            <span>نُطْقُ الصَّوْتِ ({letter.char}ْ)</span>
          </button>
        </div>

      </div>

      {/* Bottom Child Motivation Card */}
      <div className="bg-[#0e1c45] p-3.5 rounded-2xl border border-cyan-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
        <div className="flex items-center gap-2">
          <div>
            <span className="text-xs font-black text-amber-300 block">
              نَصِيحَةُ سَعْدٍ الذَّهَبِيَّة:
            </span>
            <p className="text-xs text-white font-extrabold">
              {guide.funTip}
            </p>
          </div>
        </div>

        <button
          onClick={handleSoundTap}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-2xl font-black text-xs border border-white shadow-glow-cyan active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Volume2 className="w-4 h-4 fill-slate-950" />
          <span>انْطِقْ مَعَ سَعْد: {letter.char}ْ</span>
        </button>
      </div>

      {/* Completion Button for Stage 2 */}
      <button
        onClick={() => {
          audioManager.playVictory();
          addStars(1);
          addCoins(5);
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch {}
          if (onSuccess) onSuccess();
        }}
        className="w-full py-3.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 rounded-2xl font-black text-sm border-2 border-white shadow-glow-green active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 fill-slate-950" />
        <span>أَتْقَنْتُ مَخْرَجَ حَرْفِ ({letter.char}) يَا لُومِي! 🌟</span>
      </button>

    </div>
  );
};
