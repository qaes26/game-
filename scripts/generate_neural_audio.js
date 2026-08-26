// Standard Natural Arabic Letters & Dialogue Audio Generator (100% Offline Static Files)
// Voice: ar-SA-ZariyahNeural (Pure Saudi Female Voice for LUMI)

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');

const dirs = ['letters', 'syllables', 'words', 'sentences', 'dialogue', 'articulation', 'stages', 'names'];
dirs.forEach(d => {
  const fullPath = path.join(AUDIO_DIR, d);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

// 28 Clean Natural Standard Arabic Letter Names
const cleanLetters = [
  { id: 'alif', text: 'أَلِف' },
  { id: 'baa', text: 'بَاء' },
  { id: 'taa', text: 'تَاء' },
  { id: 'thaa', text: 'ثَاء' },
  { id: 'jeem', text: 'جِيم' },
  { id: 'haa', text: 'حَاء' },
  { id: 'khaa', text: 'خَاء' },
  { id: 'daal', text: 'دَال' },
  { id: 'zaal', text: 'ذَال' },
  { id: 'raa', text: 'رَاء' },
  { id: 'zay', text: 'زَاي' },
  { id: 'seen', text: 'سِين' },
  { id: 'sheen', text: 'شِين' },
  { id: 'saad', text: 'صَاد' },
  { id: 'daad', text: 'ضَاد' },
  { id: 'taa_heavy', text: 'طَاء' },
  { id: 'zaa_heavy', text: 'ظَاء' },
  { id: 'ayn', text: 'عَيْن' },
  { id: 'ghayn', text: 'غَيْن' },
  { id: 'faa', text: 'فَاء' },
  { id: 'qaaf', text: 'قَاف' },
  { id: 'kaaf', text: 'كَاف' },
  { id: 'laam', text: 'لاَم' },
  { id: 'meem', text: 'مِيم' },
  { id: 'noon', text: 'نُون' },
  { id: 'haa_soft', text: 'هَاء' },
  { id: 'waaw', text: 'وَاو' },
  { id: 'yaa', text: 'يَاء' }
];

// Popular Arabic Names in Pure Female Voice
const childNames = [
  { id: 'talal', text: 'طَلَال' },
  { id: 'raneem', text: 'رَنِيم' },
  { id: 'fatima', text: 'فَاطِمَة' },
  { id: 'heba', text: 'هِبَة' },
  { id: 'jana', text: 'جَنَى' },
  { id: 'mira', text: 'مِيرَا' },
  { id: 'deema', text: 'دِيمَة' },
  { id: 'taiba', text: 'طِيبَة' },
  { id: 'mohammed', text: 'مُحَمَّد' },
  { id: 'ahmed', text: 'أَحْمَد' },
  { id: 'sara', text: 'سَارَة' },
  { id: 'ali', text: 'عَلِي' },
  { id: 'omar', text: 'عُمَر' },
  { id: 'youssef', text: 'يُوسُف' },
  { id: 'nour', text: 'نُور' },
  { id: 'maryam', text: 'مَرْيَم' },
  { id: 'zaid', text: 'زَيْد' },
  { id: 'khaled', text: 'خَالِد' },
  { id: 'layan', text: 'لَيَان' },
  { id: 'hamza', text: 'حَمْزَة' },
  { id: 'joud', text: 'جُود' },
  { id: 'karam', text: 'كَرَم' },
  { id: 'rayan', text: 'رَيَّان' },
  { id: 'salma', text: 'سَلْمَى' },
  { id: 'adam', text: 'آدَم' },
  { id: 'ibrahim', text: 'إِبْرَاهِيم' },
  { id: 'hassan', text: 'حَسَن' },
  { id: 'hussein', text: 'حُسَيْن' },
  { id: 'yara', text: 'يَارَا' },
  { id: 'leila', text: 'لَيْلَى' },
  { id: 'tariq', text: 'طَارِق' },
  { id: 'waseem', text: 'وَسِيم' },
  { id: 'wissam', text: 'وِسَام' },
  { id: 'abdullah', text: 'عَبْدُ الله' },
  { id: 'abdulrahman', text: 'عَبْدُ الرَّحْمَن' },
  { id: 'malak', text: 'مَلَك' },
  { id: 'reem', text: 'رِيم' },
  { id: 'huda', text: 'هُدَى' },
  { id: 'farah', text: 'فَرَح' },
  { id: 'salem', text: 'سَالِم' },
  { id: 'saad', text: 'سَعْد' },
  { id: 'majd', text: 'مَجْد' },
  { id: 'faisal', text: 'فَيْصَل' },
  { id: 'khalil', text: 'خَلِيل' },
  { id: 'ziad', text: 'زِيَاد' },
  { id: 'amr', text: 'عَمْرو' },
  { id: 'anas', text: 'أَنَس' },
  { id: 'qais', text: 'قَيْس' },
  { id: 'batal', text: 'يَا بَطَل' },
  { id: 'batala', text: 'يَا بَطَلَة' }
];

const staticAudios = [
  // Syllables
  { category: 'syllables', id: 'baa_fatha', text: 'بَ' },
  { category: 'syllables', id: 'baa_kasra', text: 'بِ' },
  { category: 'syllables', id: 'baa_damma', text: 'بُ' },
  { category: 'syllables', id: 'baa_alif', text: 'بَا' },
  { category: 'syllables', id: 'baa_yaa', text: 'بِي' },
  { category: 'syllables', id: 'baa_waw', text: 'بُو' },

  // Words
  { category: 'words', id: 'baab', text: 'بَاب' },
  { category: 'words', id: 'battah', text: 'بَطَّة' },
  { category: 'words', id: 'bayt', text: 'بَيْت' },
  { category: 'words', id: 'bahr', text: 'بَحْر' },
  { category: 'words', id: 'hubz', text: 'خُبْز' },
  { category: 'words', id: 'habl', text: 'حَبْل' },
  { category: 'words', id: 'inab', text: 'عِنَب' },

  // Sentences
  { category: 'sentences', id: 'baab_bayt', text: 'هَذَا بَابُ البَيْتِ' },
  { category: 'sentences', id: 'battah_tasbah', text: 'البَطَّةُ تَسْبَحُ فِي المَاءِ' },

  // Dialogue & Greetings
  { category: 'dialogue', id: 'intro_step_1', text: 'مَرْحَبًا! أَنَا لُومِي.. هَيَّا نَسْتَكْشِفُ مَعًا عَالَمَ الأَصْوَاتِ السَّاحِر!' },
  { category: 'dialogue', id: 'intro_step_2', text: 'هَذَا العَالَمُ فَقَدَ أَصْوَاتَهُ السَّاحِرَة...' },
  { category: 'dialogue', id: 'intro_step_3', text: 'هَلْ تُسَاعِدُنِي فِي إِعَادَتِهَا مَعًا؟' },
  { category: 'dialogue', id: 'ask_name', text: 'مَا اسْمُكَ يَا بَطَل؟ اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!' },
  { category: 'dialogue', id: 'launch_journey', text: 'هَيَّا بِنَا! أَنْتَ عَلَى وَشَكِ عَيْشِ أَجْمَلِ المُغَامَرَات!' },
  { category: 'dialogue', id: 'excellent', text: 'أَحْسَنْتَ! نُطْقٌ مَلَكِيٌّ رَائِعٌ وَمُتَفَوِّق!' },
  { category: 'dialogue', id: 'try_again', text: 'أَنْتَ قَرِيبٌ جِدًّا.. لِنُجَرِّبْ ثَانِيَةً!' },
  { category: 'dialogue', id: 'welcome', text: 'مَرْحَبًا بِكَ فِي مَمْلَكَةِ الأَصْوَات!' },
  { category: 'dialogue', id: 'welcome_child', text: 'مَرْحَبًا يَا بَطَل! هَيَّا نَبْدَأُ رِحْلَتَنَا السَّاحِرَة!' },
  { category: 'dialogue', id: 'welcome_talal', text: 'أَهْلًا يَا طَلَال! هَيَّا نَبْدَأُ رِحْلَتَنَا السَّاحِرَة!' },
  { category: 'dialogue', id: 'welcome_raneem', text: 'أَهْلًا يَا رَنِيم! هَيَّا نَبْدَأُ رِحْلَتَنَا السَّاحِرَة!' },
  { category: 'dialogue', id: 'cheer_talal', text: 'أَحْسَنْتَ يَا طَلَال! نُطْقٌ مَلَكِيٌّ رَائِع!' },
  { category: 'dialogue', id: 'cheer_raneem', text: 'أَحْسَنْتِ يَا رَنِيم! نُطْقٌ مَلَكِيٌّ رَائِع!' },
  { category: 'dialogue', id: 'letter_choice_cheer', text: 'اخْتِيَارٌ سِحْرِيٌّ رَائِع! هَيَّا بِنَا نَبْدَأُ المُغَامَرَة!' },
  { category: 'dialogue', id: 'open_next_stage', text: 'مَبْرُوك! فُتِحَتْ لَكَ المَرْحَلَةُ التَّالِيَة.. هَيَّا نَنْطَلِق!' },
  { category: 'dialogue', id: 'complete_previous_first', text: 'أَكْمِلِ المَرْحَلَةَ السَّابِقَةَ أَوَّلًا لِفَتْحِ هَذِهِ المَرْحَلَة!' },

  // Stages
  { category: 'stages', id: 'stage_1', text: 'المَرْحَلَةُ الأُولَى: مَخْرَجُ وَصَوْتُ الحَرْفِ الصَّافِي!' },
  { category: 'stages', id: 'stage_2', text: 'المَرْحَلَةُ الثَّانِيَة: مُحَاكَاةُ الصَّوْتِ وَتَشْرِيحُ حَرَكَةِ اللِّسَان!' },
  { category: 'stages', id: 'stage_3', text: 'المَرْحَلَةُ الثَّالِثَة: الحَرَكَاتُ القَصِيرَة.. الفَتْحَةُ وَالضَّمَّةُ وَالكَسْرَة!' },
  { category: 'stages', id: 'stage_4', text: 'المَرْحَلَةُ الرَّابِعَة: المُدُودُ الطَّوِيلَةُ وَالمَقَاطِع!' },
  { category: 'stages', id: 'stage_5', text: 'المَرْحَلَةُ الخَامِسَة: اسْتِكْشَافُ وَنُطْقُ الكَلِمَات!' },
  { category: 'stages', id: 'stage_6', text: 'المَرْحَلَةُ السَّادِسَة: مَوْضِعُ الحَرْفِ فِي أَوَّلِ وَوَسَطِ وَآخِرِ الكَلِمَة!' },
  { category: 'stages', id: 'stage_7', text: 'المَرْحَلَةُ السَّابِعَة: نُطْقُ وَبِنَاءُ الجُمَلِ المُفِيدَة!' },
  { category: 'stages', id: 'stage_8', text: 'المَرْحَلَةُ الثَّامِنَة: التَّحَدِّي الخِتَامِيُّ وَالتَّتْوِيجُ المَلَكِيّ!' },
  { category: 'stages', id: 'next_stage', text: 'مُبَارَكٌ يَا بَطَل! فُتِحَتْ لَكَ المَرْحَلَةُ التَّالِيَة.. هَيَّا نَنْطَلِق!' },
  { category: 'stages', id: 'listen_sound', text: 'اسْتَمِعْ لِصَوْتِ الحَرْف!' },

  // Articulation
  { category: 'articulation', id: 'lips_guide_baa', text: 'حَرْفُ البَاءِ يَخْرُجُ بِانْطِبَاقِ الشَّفَتَيْنِ مَعًا ثُمَّ انْفِتَاحِهِمَا بِخُرُوجِ الهَوَاء: بْ!' },
  { category: 'articulation', id: 'tongue_guide_baa', text: 'يَبْقَى اللِّسَانُ مُسْتَرِيحًا فِي قَاعِ الفَمِ عِنْدَ نُطْقِ حَرْفِ البَاء!' },
  { category: 'articulation', id: 'tongue_lab_intro', text: 'مَرْحَبًا بِكَ فِي مُخْتَبَرِ اللِّسَانِ السِّحْرِيّ! شَاهِدْ حَرَكَةَ اللِّسَانِ وَالشَّفَتَيْنِ وَقَلِّدِ الصَّوْت!' },
  { category: 'articulation', id: 'tongue_quiz_success', text: 'مُمْتَازٌ يَا بَطَل! انْطِبَاقُ الشَّفَتَيْنِ هُوَ مَخْرَجُ حَرْفِ البَاء!' }
];

async function generateCleanAudios() {
  console.log('🎙️ Generating Clean Standard Arabic Female Audio Files (ar-SA-ZariyahNeural)...');
  const tts = new MsEdgeTTS();
  await tts.setMetadata('ar-SA-ZariyahNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  // 1. Generate clean 28 letters
  for (const ltr of cleanLetters) {
    const destPath = path.join(AUDIO_DIR, 'letters', `${ltr.id}.mp3`);
    try {
      console.log(`🔤 Letter: ${ltr.text} -> letters/${ltr.id}.mp3`);
      const { audioStream } = tts.toStream(ltr.text, { pitch: '+0Hz', rate: '-8%' });
      const writeStream = fs.createWriteStream(destPath);
      audioStream.pipe(writeStream);
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });
      await new Promise(r => setTimeout(r, 60));
    } catch (err) {
      console.error(`❌ Error on ${ltr.id}:`, err.message);
    }
  }

  // 2. Generate child names
  for (const nameObj of childNames) {
    const destPath = path.join(AUDIO_DIR, 'names', `${nameObj.id}.mp3`);
    try {
      console.log(`👤 Name: ${nameObj.text} -> names/${nameObj.id}.mp3`);
      const { audioStream } = tts.toStream(nameObj.text, { pitch: '+4Hz', rate: '-6%' });
      const writeStream = fs.createWriteStream(destPath);
      audioStream.pipe(writeStream);
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });
      await new Promise(r => setTimeout(r, 60));
    } catch (err) {
      console.error(`❌ Error on ${nameObj.id}:`, err.message);
    }
  }

  // 3. Generate static dialogues
  for (const item of staticAudios) {
    const destPath = path.join(AUDIO_DIR, item.category, `${item.id}.mp3`);
    try {
      console.log(`📢 ${item.category}/${item.id}.mp3`);
      const { audioStream } = tts.toStream(item.text, { pitch: '+2Hz', rate: '-6%' });
      const writeStream = fs.createWriteStream(destPath);
      audioStream.pipe(writeStream);
      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });
      await new Promise(r => setTimeout(r, 60));
    } catch (err) {
      console.error(`❌ Error on ${item.id}:`, err.message);
    }
  }

  console.log('✨ All 100% Offline Female Audio Files Generated Successfully!');
}

generateCleanAudios();
