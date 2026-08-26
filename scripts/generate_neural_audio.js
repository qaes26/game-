// Studio-Grade Microsoft Neural Audio Generator for LUMI (100% Pure Arabic Female Voice)
// Uses Microsoft Edge Neural TTS: ar-SA-ZariyahNeural (Saudi Female)

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AUDIO_DIR = path.join(__dirname, '..', 'public', 'audio');

// Ensure output directories exist
const dirs = ['letters', 'syllables', 'words', 'sentences', 'dialogue', 'articulation', 'stages'];
dirs.forEach(d => {
  const fullPath = path.join(AUDIO_DIR, d);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

const audioItems = [
  // 1. Core Letters (28)
  { category: 'letters', id: 'alif', text: 'أَلِف' },
  { category: 'letters', id: 'baa', text: 'بَاء' },
  { category: 'letters', id: 'taa', text: 'تَاء' },
  { category: 'letters', id: 'thaa', text: 'ثَاء' },
  { category: 'letters', id: 'jeem', text: 'جِيم' },
  { category: 'letters', id: 'haa', text: 'حَاء' },
  { category: 'letters', id: 'khaa', text: 'خَاء' },
  { category: 'letters', id: 'daal', text: 'دَال' },
  { category: 'letters', id: 'zaal', text: 'ذَال' },
  { category: 'letters', id: 'raa', text: 'رَاء' },
  { category: 'letters', id: 'zay', text: 'زَاي' },
  { category: 'letters', id: 'seen', text: 'سِين' },
  { category: 'letters', id: 'sheen', text: 'شِين' },
  { category: 'letters', id: 'saad', text: 'صَاد' },
  { category: 'letters', id: 'daad', text: 'ضَاد' },
  { category: 'letters', id: 'taa_heavy', text: 'طَاء' },
  { category: 'letters', id: 'zaa_heavy', text: 'ظَاء' },
  { category: 'letters', id: 'ayn', text: 'عَيْن' },
  { category: 'letters', id: 'ghayn', text: 'غَيْن' },
  { category: 'letters', id: 'faa', text: 'فَاء' },
  { category: 'letters', id: 'qaaf', text: 'قَاف' },
  { category: 'letters', id: 'kaaf', text: 'كَاف' },
  { category: 'letters', id: 'laam', text: 'لاَم' },
  { category: 'letters', id: 'meem', text: 'مِيم' },
  { category: 'letters', id: 'noon', text: 'نُون' },
  { category: 'letters', id: 'haa_soft', text: 'هَاء' },
  { category: 'letters', id: 'waaw', text: 'وَاو' },
  { category: 'letters', id: 'yaa', text: 'يَاء' },

  // 2. Syllables for Letter Baa
  { category: 'syllables', id: 'baa_fatha', text: 'بَ' },
  { category: 'syllables', id: 'baa_kasra', text: 'بِ' },
  { category: 'syllables', id: 'baa_damma', text: 'بُ' },
  { category: 'syllables', id: 'baa_alif', text: 'بَا' },
  { category: 'syllables', id: 'baa_yaa', text: 'بِي' },
  { category: 'syllables', id: 'baa_waw', text: 'بُو' },

  // 3. Words for Letter Baa
  { category: 'words', id: 'baab', text: 'بَاب' },
  { category: 'words', id: 'battah', text: 'بَطَّة' },
  { category: 'words', id: 'bayt', text: 'بَيْت' },
  { category: 'words', id: 'bahr', text: 'بَحْر' },
  { category: 'words', id: 'hubz', text: 'خُبْز' },
  { category: 'words', id: 'habl', text: 'حَبْل' },
  { category: 'words', id: 'inab', text: 'عِنَب' },

  // 4. Sentences
  { category: 'sentences', id: 'baab_bayt', text: 'هَذَا بَابُ البَيْتِ' },
  { category: 'sentences', id: 'battah_tasbah', text: 'البَطَّةُ تَسْبَحُ فِي المَاءِ' },

  // 5. Intro & Name Prompts (100% Female Voice)
  { category: 'dialogue', id: 'intro_step_1', text: 'مَرْحَبًا.. أَنَا لُومِي! هَيَّا نَسْتَكْشِفُ مَعًا عَالَمَ الأَصْوَاتِ السَّاحِر!' },
  { category: 'dialogue', id: 'intro_step_2', text: 'هَذَا العَالَمُ فَقَدَ أَصْوَاتَهُ السَّاحِرَة...' },
  { category: 'dialogue', id: 'intro_step_3', text: 'هَلْ تُسَاعِدُنِي فِي إِعَادَتِهَا مَعًا؟' },
  { category: 'dialogue', id: 'ask_name', text: 'مَا اسْمُكَ يَا بَطَل؟ اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!' },
  { category: 'dialogue', id: 'welcome_child', text: 'أَهْلًا وَسَهْلًا بِكَ يَا بَطَل! أَنَا سَعِيدَةٌ جِدًّا بِوُجُودِكَ مَعِي! هَلْ أَنْتَ جَاهِزٌ لِلانْطِلاق؟' },
  { category: 'dialogue', id: 'launch_journey', text: 'هَيَّا بِنَا يَا بَطَل! أَنْتَ عَلَى وَشَكِ عَيْشِ أَجْمَلِ المُغَامَرَات!' },
  { category: 'dialogue', id: 'excellent', text: 'أَحْسَنْتَ يَا بَطَل! إِجَابَةٌ مَلَكِيَّةٌ رَائِعَةٌ وَمُتَفَوِّقَة!' },
  { category: 'dialogue', id: 'try_again', text: 'أَنْتَ قَرِيبٌ جِدًّا.. لِنُجَرِّبْ خِيَارًا آخَر!' },
  { category: 'dialogue', id: 'choose_letter', text: 'اخْتَرْ حَرْفَكَ السِّحْرِيَّ الَّذِي تُرِيدُ أَنْ نَبْدَأَ بِهِ مُغَامَرَتَنَا!' },

  // 6. Stages Prompts
  { category: 'stages', id: 'stage_1', text: 'المَرْحَلَةُ الأُولَى: مَخْرَجُ وَصَوْتُ الحَرْفِ الصَّافِي!' },
  { category: 'stages', id: 'stage_2', text: 'المَرْحَلَةُ الثَّانِيَة: مُحَاكَاةُ الصَّوْتِ وَتَشْرِيحُ حَرَكَةِ اللِّسَان!' },
  { category: 'stages', id: 'stage_3', text: 'المَرْحَلَةُ الثَّالِثَة: الحَرَكَاتُ القَصِيرَة.. الفَتْحَةُ وَالضَّمَّةُ وَالكَسْرَة!' },
  { category: 'stages', id: 'stage_4', text: 'المَرْحَلَةُ الرَّابِعَة: المُدُودُ الطَّوِيلَةُ وَالمَقَاطِع!' },
  { category: 'stages', id: 'stage_5', text: 'المَرْحَلَةُ الخَامِسَة: اسْتِكْشَافُ وَنُطْقُ الكَلِمَات!' },
  { category: 'stages', id: 'stage_6', text: 'المَرْحَلَةُ السَّادِسَة: مَوْضِعُ الحَرْفِ فِي أَوَّلِ وَوَسَطِ وَآخِرِ الكَلِمَة!' },
  { category: 'stages', id: 'stage_7', text: 'المَرْحَلَةُ السَّابِعَة: نُطْقُ وَبِنَاءُ الجُمَلِ المُفِيدَة!' },
  { category: 'stages', id: 'stage_8', text: 'المَرْحَلَةُ الثَّامِنَة: التَّحَدِّي الخِتَامِيُّ وَالتَّتْوِيجُ المَلَكِيّ!' },
  { category: 'stages', id: 'next_stage', text: 'مُبَارَكٌ يَا بَطَل! فُتِحَتْ لَكَ المَرْحَلَةُ التَّالِيَة.. هَيَّا نَنْطَلِق!' },
  { category: 'stages', id: 'listen_sound', text: 'اسْتَمِعْ لِصَوْتِ الحَرْفِ يَا بَطَل!' },

  // 7. Articulation & Tongue Training Female Prompts
  { category: 'articulation', id: 'lips_guide_baa', text: 'حَرْفُ البَاءِ يَخْرُجُ بِانْطِبَاقِ الشَّفَتَيْنِ مَعًا ثُمَّ انْفِتَاحِهِمَا بِخُرُوجِ الهَوَاء: بْ!' },
  { category: 'articulation', id: 'tongue_guide_baa', text: 'يَبْقَى اللِّسَانُ مُسْتَرِيحًا فِي قَاعِ الفَمِ عِنْدَ نُطْقِ حَرْفِ البَاء!' },
  { category: 'articulation', id: 'tongue_lab_intro', text: 'مَرْحَبًا بِكَ فِي مُخْتَبَرِ اللِّسَانِ السِّحْرِيّ! شَاهِدْ حَرَكَةَ اللِّسَانِ وَالشَّفَتَيْنِ وَقَلِّدِ الصَّوْت!' },
  { category: 'articulation', id: 'tongue_quiz_success', text: 'مُمْتَازٌ يَا بَطَل! انْطِبَاقُ الشَّفَتَيْنِ هُوَ مَخْرَجُ حَرْفِ البَاء!' }
];

async function generateAllAudio() {
  console.log('🚀 Generating Microsoft Neural Female Audio Files...');
  const tts = new MsEdgeTTS();
  
  // High-Quality Saudi Arabic Female Voice: ar-SA-ZariyahNeural
  await tts.setMetadata('ar-SA-ZariyahNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  for (const item of audioItems) {
    const destPath = path.join(AUDIO_DIR, item.category, `${item.id}.mp3`);
    try {
      console.log(`🎙️ Generating: ${item.text} (${item.category}/${item.id}.mp3)...`);
      const { audioStream } = tts.toStream(item.text, {
        pitch: '+0Hz',
        rate: '-8%'
      });

      const writeStream = fs.createWriteStream(destPath);
      audioStream.pipe(writeStream);

      await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });

      await new Promise(r => setTimeout(r, 100));
    } catch (err) {
      console.error(`❌ Error generating ${item.id}:`, err.message);
    }
  }

  console.log('✨ All Female Audio Files Generated Successfully!');
}

generateAllAudio();
