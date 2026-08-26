// AI Challenge Engine: Adaptive challenge generation and mastery evaluation
// Operates strictly inside curriculum boundaries without inventing invalid content.

import { curriculumEngine, StageDefinition } from './CurriculumEngine';
import { LetterData } from '../data/letters';

export interface GeneratedChallenge {
  id: string;
  type: 'matching' | 'listening' | 'vowel_choice' | 'syllable_madd' | 'word_picker' | 'position' | 'sentence_complete' | 'gate_trial';
  promptAr: string;
  targetItem: string;
  audioKey: string;
  options: Array<{ id: string; text: string; icon?: string; isCorrect: boolean }>;
  encouragingFeedbackAr: string;
  hintAr: string;
}

export interface ChildLearningHistory {
  letterId: string;
  stageNumber: number;
  attemptsCount: number;
  successfulAttempts: number;
  recentMistakes: string[];
  averageConfidence: number;
}

class AIChallengeEngine {
  // Generate next adaptive challenge tailored to the child's learning history
  public generateStageChallenge(
    letterId: string,
    stageNumber: number,
    history: ChildLearningHistory,
    childName: string = 'يا بطل'
  ): GeneratedChallenge {
    const content = curriculumEngine.getApprovedContentForStage(letterId, stageNumber);
    const letter = curriculumEngine.getLetter(letterId);
    const timestamp = Date.now().toString();

    switch (stageNumber) {
      case 1: { // Letter Discovery & Recognition
        const distractors = (content as any).distractors || ['ت', 'م', 'ن'];
        const allOpts = [
          { id: 'correct', text: letter.char, isCorrect: true },
          ...distractors.map((d: string, i: number) => ({ id: `dist_${i}`, text: d, isCorrect: false }))
        ].sort(() => Math.random() - 0.5);

        return {
          id: `ch_1_${timestamp}`,
          type: 'matching',
          promptAr: `انْقُرْ عَلَى شَكْلِ حَرْفِ (${letter.nameAr}) يَا ${childName}`,
          targetItem: letter.char,
          audioKey: letter.char,
          options: allOpts,
          encouragingFeedbackAr: `رَائِعٌ يَا ${childName}! هَذَا هُوَ حَرْفُ ${letter.nameAr}!`,
          hintAr: `ابْحَثْ عَنْ شَكْلِ: ${letter.char}`
        };
      }

      case 2: { // Sound Production
        return {
          id: `ch_2_${timestamp}`,
          type: 'listening',
          promptAr: `اسْتَمِعْ لِصَوْتِ الحَرْفِ وَقُلْ مَعَ لُومِي: (${letter.char})`,
          targetItem: letter.char,
          audioKey: letter.char,
          options: [
            { id: 'correct', text: `نَطَقْتُ (${letter.char}) بِنَجَاح!`, isCorrect: true }
          ],
          encouragingFeedbackAr: `صَوْتٌ وَاضِحٌ وَجَمِيلٌ يَا ${childName}!`,
          hintAr: letter.mouthGuide.tip
        };
      }

      case 3: { // Short Vowels (Fatha, Kasra, Damma)
        const vowels = (content as any).vowels;
        // Prioritize recent weaknesses if present
        let targetVowel = vowels[0];
        if (history.recentMistakes.length > 0) {
          const match = vowels.find((v: any) => history.recentMistakes.includes(v.syl));
          if (match) targetVowel = match;
        } else {
          targetVowel = vowels[Math.floor(Math.random() * vowels.length)];
        }

        const options = vowels.map((v: any) => ({
          id: v.id,
          text: v.syl,
          icon: '🎵',
          isCorrect: v.id === targetVowel.id
        })).sort(() => Math.random() - 0.5);

        return {
          id: `ch_3_${timestamp}`,
          type: 'vowel_choice',
          promptAr: `اخْتَرْ: ${targetVowel.nameAr} (${targetVowel.syl})`,
          targetItem: targetVowel.syl,
          audioKey: targetVowel.syl,
          options,
          encouragingFeedbackAr: `مُمْتَازٌ يَا ${childName}! ${targetVowel.tip}`,
          hintAr: targetVowel.tip
        };
      }

      case 4: { // Long Syllables / Madd
        const syllables = (content as any).syllables;
        const targetSyl = syllables[Math.floor(Math.random() * syllables.length)];
        const options = syllables.map((s: any) => ({
          id: s.id,
          text: s.syl,
          icon: '🌊',
          isCorrect: s.id === targetSyl.id
        })).sort(() => Math.random() - 0.5);

        return {
          id: `ch_4_${timestamp}`,
          type: 'syllable_madd',
          promptAr: `اخْتَرْ صَوْتَ المَدِّ الطَّوِيل: (${targetSyl.syl})`,
          targetItem: targetSyl.syl,
          audioKey: targetSyl.syl,
          options,
          encouragingFeedbackAr: `مَدٌّ بَطُولِيٌّ يَا ${childName}! مِثْلَ كَلِمَةِ ${targetSyl.example}`,
          hintAr: targetSyl.tip
        };
      }

      case 5: { // Words Positions
        const words = (content as any).words;
        const targetWord = words[Math.floor(Math.random() * words.length)];
        const distractors = letter.words.filter(w => w.id !== targetWord.id).slice(0, 2);
        const options = [
          { id: targetWord.id, text: targetWord.word, icon: targetWord.emoji, isCorrect: true },
          ...distractors.map(d => ({ id: d.id, text: d.word, icon: d.emoji, isCorrect: false }))
        ].sort(() => Math.random() - 0.5);

        return {
          id: `ch_5_${timestamp}`,
          type: 'word_picker',
          promptAr: `اخْتَرْ الكَلِمَةَ الَّتِي تَرَى صُورَتَهَا (${targetWord.emoji})`,
          targetItem: targetWord.word,
          audioKey: targetWord.word,
          options,
          encouragingFeedbackAr: `أَحْسَنْتَ يَا ${childName}! كَلِمَةُ ${targetWord.word} (${targetWord.positionLabel})`,
          hintAr: targetWord.meaning
        };
      }

      case 6: { // Sound Position
        const words = (content as any).words;
        const targetWord = words[0]; // e.g. باب / حبل
        const options = [
          { id: 'start', text: 'فِي أَوَّلِ الكَلِمَة', isCorrect: targetWord.position === 'start' },
          { id: 'middle', text: 'فِي وَسَطِ الكَلِمَة', isCorrect: targetWord.position === 'middle' },
          { id: 'end', text: 'فِي آخِرِ الكَلِمَة', isCorrect: targetWord.position === 'end' }
        ];

        return {
          id: `ch_6_${timestamp}`,
          type: 'position',
          promptAr: `أَيْنَ يَقَعُ حَرْفُ (${letter.char}) فِي كَلِمَةِ: ${targetWord.word}؟`,
          targetItem: targetWord.word,
          audioKey: targetWord.word,
          options,
          encouragingFeedbackAr: `تَحْدِيدٌ دَقِيقٌ جِدًّا لِمَوْقِعِ الصَّوْتِ يَا ${childName}!`,
          hintAr: `انْظُرْ لِمَوْقِعِ الحَرْفِ المُلَوَّنِ فِي ${targetWord.word}`
        };
      }

      case 7: { // Sentences Context
        const sentence = letter.sentences[0];
        const options = sentence.options.map((opt, idx) => ({
          id: `opt_${idx}`,
          text: opt,
          isCorrect: idx === sentence.correctIndex
        }));

        return {
          id: `ch_7_${timestamp}`,
          type: 'sentence_complete',
          promptAr: sentence.missingWordQuestion,
          targetItem: sentence.sentence,
          audioKey: sentence.sentence,
          options,
          encouragingFeedbackAr: `جُمْلَةٌ رَائِعَةٌ وَمُكْتَمِلَةٌ يَا ${childName}!`,
          hintAr: sentence.meaning
        };
      }

      case 8:
      default: { // Adaptive Final Gate Challenge
        return {
          id: `ch_8_${timestamp}`,
          type: 'gate_trial',
          promptAr: `تَحَدِّي بَوَّابَةِ لُومِي الكُبْرَى لِحَرْفِ (${letter.nameAr})!`,
          targetItem: letter.char,
          audioKey: letter.char,
          options: [
            { id: 'opt1', text: `${letter.char} - ${letter.words[0].word}`, icon: letter.words[0].emoji, isCorrect: true },
            { id: 'opt2', text: letter.syllables.short[0].syl, icon: '🌟', isCorrect: false },
            { id: 'opt3', text: letter.syllables.long[0].syl, icon: '👑', isCorrect: false }
          ].sort(() => Math.random() - 0.5),
          encouragingFeedbackAr: `مُبَارَكٌ يَا ${childName}! فُتِحَتْ بَوَّابَةُ الإِتْقَانِ العُظْمَى! 🏆`,
          hintAr: `تَذَكَّرْ جَمِيعَ مَهَارَاتِ حَرْفِ ${letter.nameAr}`
        };
      }
    }
  }

  // Evaluate if child has reached mastery (threshold >= 80% with min attempts)
  public evaluateMastery(
    totalAttempts: number,
    successfulAttempts: number,
    threshold: number = 0.8
  ): { isMastered: boolean; percentage: number; recommendationAr: string } {
    if (totalAttempts < 2) {
      return {
        isMastered: false,
        percentage: Math.round((successfulAttempts / Math.max(1, totalAttempts)) * 100),
        recommendationAr: 'نَحْتَاجُ لِتَجْرِبَةِ تَحَدٍّ إِضَافِيٍّ لِلتَّأَكُّدِ مِنَ الإِتْقَان.'
      };
    }

    const percentage = Math.round((successfulAttempts / totalAttempts) * 100);
    const isMastered = percentage >= threshold * 100;

    return {
      isMastered,
      percentage,
      recommendationAr: isMastered
        ? 'أَتْقَنْتَ هَذِهِ المَرْحَلَةَ بِتَمَيُّز! فُتِحَتِ المَرْحَلَةُ التَّالِيَة.'
        : 'لِنُجَرِّبْ نَشَاطًا آخَرَ لِتَرْسِيخِ المَهَارَة.. أَنْتَ قَرِيبٌ جِدًّا!'
    };
  }
}

export const aiChallengeEngine = new AIChallengeEngine();
