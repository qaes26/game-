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
    titleAr: 'مخرج وصوت الحرف',
    objectiveAr: 'إتقان نطق مخرج الحرف الصافي مع حركة الشفتين واللسان',
    landmark3D: 'منصة الصدى البلورية',
    allowedActivityTypes: ['pronunciation', 'sound_listening']
  },
  {
    stageNumber: 2,
    stageType: 'short_vowels',
    titleAr: 'المقاطع القصيرة (الحركات)',
    objectiveAr: 'نطق وتمييز المقاطع القصيرة: الفتحة (بَ) والكسرة (بِ) والضمة (بُ)',
    landmark3D: 'برج الحركات المتوهج',
    allowedActivityTypes: ['vowel_discrimination', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 3,
    stageType: 'long_syllables',
    titleAr: 'المقاطع الطويلة (المدود)',
    objectiveAr: 'نطق وتمييز المدود الطويلة: مد الألف (بَا) ومد الياء (بِي) ومد الواو (بُو)',
    landmark3D: 'بوابة غابة المقاطع',
    allowedActivityTypes: ['syllable_construction', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 4,
    stageType: 'words_construction',
    titleAr: 'تركيب الكلمات من المقاطع',
    objectiveAr: 'دمج المقاطع لتكوين كلمات حقيقية ونطقها بطلاقة',
    landmark3D: 'ساحة تركيب الكلمات',
    allowedActivityTypes: ['word_building', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 5,
    stageType: 'words_positions',
    titleAr: 'الكلمات في مواضعها',
    objectiveAr: 'نطق وفهم الكلمات في أول ووسط وآخر الموضع',
    landmark3D: 'معالم قرية الكلمات',
    allowedActivityTypes: ['word_image_match', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 6,
    stageType: 'sound_position',
    titleAr: 'موقع الصوت في الكلمة',
    objectiveAr: 'تحديد موقع الحرف داخل الكلمة سمعيًا وبصريًا',
    landmark3D: 'قمة جبل التمييز',
    allowedActivityTypes: ['position_identification', 'sound_listening']
  },
  {
    stageNumber: 7,
    stageType: 'sentences_context',
    titleAr: 'نطق الجمل المفيدة',
    objectiveAr: 'نطق وتركيب الجمل التامة وفهم معناها واستخدام الكلمات بسلاسة',
    landmark3D: 'شلال الجمل المضيء',
    allowedActivityTypes: ['sentence_completion', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 8,
    stageType: 'integrated_challenge',
    titleAr: 'التحدي النهائي والإتقان',
    objectiveAr: 'بوابة لومي الكبرى لاختبار الإتقان الشامل وتتويج بطل الحرف',
    landmark3D: 'بوابة لومي الكبرى',
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
