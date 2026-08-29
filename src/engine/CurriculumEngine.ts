// Curriculum Engine: Step-by-step Arabic Speech & Language Progression
// Progression: Pure Sound ➔ Short Syllables ➔ Long Madd ➔ Word Construction ➔ Sound Position ➔ Sentences ➔ Final Mastery Gate

import { ARABIC_LETTERS, LetterData } from '../data/letters';

export type StageType =
  | 'sound_production'      // Stage 1: مخرج الحرف الصافي
  | 'short_vowels'          // Stage 2: المقاطع القصيرة (بَ، بِ، بُ)
  | 'long_syllables'        // Stage 3: المقاطع الطويلة (با، بي، بو)
  | 'words_construction'    // Stage 4: تركيب الكلمات (ب + ا + ب = باب)
  | 'words_positions'       // Stage 5: الكلمات في مواضعها
  | 'sound_position'        // Stage 6: موقع الصوت داخل الكلمة
  | 'sentences_context'     // Stage 7: نطق الجمل المفيدة
  | 'integrated_challenge'; // Stage 8: بوابة التحدي الكبرى

export interface StageDefinition {
  stageNumber: number;
  stageType: StageType;
  titleAr: string;
  objectiveAr: string;
  explanationAr: string;
  howToPlayAr: string;
  shortTipAr: string;
  landmark3D: string;
  allowedActivityTypes: Array<
    | 'sound_listening'
    | 'pronunciation'
    | 'vowel_discrimination'
    | 'syllable_construction'
    | 'word_building'
    | 'word_image_match'
    | 'position_identification'
    | 'sentence_completion'
    | 'adaptive_gate_trial'
  >;
}

export const STAGE_CURRICULUM_DEFINITIONS: StageDefinition[] = [
  {
    stageNumber: 1,
    stageType: 'sound_production',
    titleAr: 'البذرة المضيئة',
    objectiveAr: 'التعرف على شكل الحرف والصور المرتبطة به كبذرة نور',
    explanationAr: 'تعال نكتشف بذرة النور الجديدة ونشاهد شكلها الجميل!',
    howToPlayAr: 'اضغط على زر الاستماع لسماع صوت الحرف، ثم انقر على الفقاعات التي تحتوي الحرف المطلوب فقط!',
    shortTipAr: 'اكتشف البذرة المضيئة!',
    landmark3D: 'منصة بذور النور',
    allowedActivityTypes: ['sound_listening', 'pronunciation']
  },
  {
    stageNumber: 2,
    stageType: 'sound_production',
    titleAr: 'قطرات الصوت',
    objectiveAr: 'نطق صوت الحرف لتسقي به البذرة وتنمو',
    explanationAr: 'اسقِ البذرة بصوتك العالي ليسمعها لومي وتكبر!',
    howToPlayAr: 'شاهد حركة الشفتين واللسان التفاعلية، وجرب النطق أمام مرآة لومي السحرية!',
    shortTipAr: 'اسقِ البذرة بصوتك!',
    landmark3D: 'ينبوع الأصوات',
    allowedActivityTypes: ['pronunciation', 'sound_listening']
  },
  {
    stageNumber: 3,
    stageType: 'short_vowels',
    titleAr: 'براعم النغمات',
    objectiveAr: 'تمييز الحركات القصيرة الثلاث لتفتيح براعم النور',
    explanationAr: 'البذرة تكبر بثلاث حركات.. هيا نعزف نغماتها معاً!',
    howToPlayAr: 'استمع للمقطع الصوتي القصير، واختر الحركة المطابقة من بين الحركات الثلاث المعروضة!',
    shortTipAr: 'اعزف نغمات البراعم!',
    landmark3D: 'حديقة البراعم المضيئة',
    allowedActivityTypes: ['vowel_discrimination', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 4,
    stageType: 'long_syllables',
    titleAr: 'غصون تمتد',
    objectiveAr: 'المقاطع الممدودة لتمديد غصون شجرة النور',
    explanationAr: 'اسحب الصوت طويييلاً لتمتد غصون الشجرة الرائعة!',
    howToPlayAr: 'اسمع صوت المد الطويل، وحدد المقطع الصحيح الذي يطيل غصون شجرتنا!',
    shortTipAr: 'مد الصوت لتمتد الغصون!',
    landmark3D: 'غابة الأغصان الطويلة',
    allowedActivityTypes: ['syllable_construction', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 5,
    stageType: 'words_positions',
    titleAr: 'ثمار الكلمات',
    objectiveAr: 'الكلمات حسب موقع الحرف فيها كأزهار وثمار',
    explanationAr: 'الشجرة أثمرت! أين يختبئ حرفنا داخل هذه الثمرة؟',
    howToPlayAr: 'استمع للكلمة التي ينطقها لومي، ثم اختر البطاقة المصورة المطابقة لتجمع الثمار!',
    shortTipAr: 'اجمع ثمار الكلمات!',
    landmark3D: 'بستان ثمار الحروف',
    allowedActivityTypes: ['word_image_match', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 6,
    stageType: 'sound_position',
    titleAr: 'النحلة الباحثة',
    objectiveAr: 'تحدي تحديد موقع الصوت داخل الكلمة مع النحلة المضيئة',
    explanationAr: 'لومي خبّأ الحرف بين الزهور.. ساعد النحلة في العثور عليه!',
    howToPlayAr: 'انظر للكلمة واضغط على مكان الزهرة المناسبة (الأولى، الوسطى، أو الأخيرة) التي يقف فيها الحرف!',
    shortTipAr: 'ساعد النحلة في البحث!',
    landmark3D: 'مروج النحل المضيء',
    allowedActivityTypes: ['position_identification', 'sound_listening']
  },
  {
    stageNumber: 7,
    stageType: 'words_construction',
    titleAr: 'غابة الحكايات',
    objectiveAr: 'الجمل والمعاني لتكوين حكايات من الثمار',
    explanationAr: 'لنجمع ثمارنا المضيئة ونبني بها حكاية صغيرة مفيدة!',
    howToPlayAr: 'اضغط على الحروف بالترتيب الهجائي الصحيح لتبني كلمتك المضيئة، ويمكنك النقر على أي حرف لإلغائه!',
    shortTipAr: 'ابنِ حكاية من الثمار!',
    landmark3D: 'غابة الحكايات السحرية',
    allowedActivityTypes: ['word_building', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 8,
    stageType: 'integrated_challenge',
    titleAr: 'الشجرة المتوهجة',
    objectiveAr: 'التحدي النهائي والاحتفال باكتمال شجرة الحرف المضيئة',
    explanationAr: 'رائع! شجرة حرفنا تضيء الغابة كلها الآن بفضلك!',
    howToPlayAr: 'أجب عن التحديات الممتعة، واحتفل باكتمال الشجرة المتوهجة ونموها الكامل!',
    shortTipAr: 'أنر الغابة بالشجرة المتوهجة!',
    landmark3D: 'مزار الشجرة المتوهجة الكبرى',
    allowedActivityTypes: ['adaptive_gate_trial']
  }
];

class CurriculumEngine {
  public getLetter(letterId: string): LetterData {
    return ARABIC_LETTERS.find(l => l.id === letterId) || ARABIC_LETTERS[1];
  }

  public getAllLetters(): LetterData[] {
    return ARABIC_LETTERS;
  }

  public getStageDefinition(stageNumber: number): StageDefinition {
    return (
      STAGE_CURRICULUM_DEFINITIONS.find(s => s.stageNumber === stageNumber) ||
      STAGE_CURRICULUM_DEFINITIONS[0]
    );
  }

  public getApprovedContentForStage(letterId: string, stageNumber: number) {
    const letter = this.getLetter(letterId);
    const def = this.getStageDefinition(stageNumber);

    switch (def.stageType) {
      case 'sound_production':
        return {
          targetSound: letter.char,
          mouthGuide: letter.mouthGuide
        };
      case 'short_vowels':
        return {
          vowels: letter.syllables.short
        };
      case 'long_syllables':
        return {
          syllables: letter.syllables.long
        };
      case 'words_construction':
      case 'words_positions':
        return {
          words: letter.words
        };
      case 'sound_position':
        return {
          words: letter.words,
          positions: ['أول الكلمة', 'وسط الكلمة', 'آخر الكلمة']
        };
      case 'sentences_context':
        return {
          sentences: letter.sentences
        };
      case 'integrated_challenge':
        return {
          letter,
          vowels: letter.syllables.short,
          syllables: letter.syllables.long,
          words: letter.words,
          sentences: letter.sentences
        };
    }
  }
}

export const curriculumEngine = new CurriculumEngine();
