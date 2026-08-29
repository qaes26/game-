/**
 * generate-audio.mjs
 * -------------------
 * Batch-generates the LUMI "non-critical" audio files using the free
 * msedge-tts engine (already a dependency in this project's package.json).
 *
 * INTENTIONALLY EXCLUDED (record these with a real human voice instead):
 *   - /public/audio/letters/*      (the 28 isolated Arabic letters)
 *   - /public/audio/syllables/*    (letter + short vowel combinations)
 * These are the pronunciation-teaching core of the app — isolated-letter
 * articulation is exactly where TTS engines are least reliable in Arabic.
 *
 * INCLUDED (safe for TTS — full-word/sentence context, no isolated-letter
 * articulation accuracy required):
 *   - /public/audio/words/
 *   - /public/audio/sentences/
 *   - /public/audio/stages/
 *   - /public/audio/dialogue/
 *   - /public/audio/names/
 *   - /public/audio/articulation/   (guidance sentences, not the letter sound itself)
 *
 * USAGE:
 *   node generate-audio.mjs
 *
 * Requires: msedge-tts (already in package.json dependencies)
 * Output:   writes real .mp3 files directly into /public/audio/<category>/
 *
 * After running, LISTEN to a sample from each category before shipping —
 * TTS quality varies by phrase length and punctuation. Regenerate any file
 * that sounds off by tweaking its text slightly (e.g. add a comma for a
 * natural pause) and re-running just that entry.
 */

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';
import path from 'path';

const VOICE = 'ar-SA-ZariyahNeural'; // female Saudi Arabic neural voice
const OUTPUT_ROOT = path.join(process.cwd(), 'public', 'audio');

// pitch/rate tuned for clear, natural-paced child-directed speech
const SYNTH_OPTIONS = { pitch: '+0Hz', rate: '-4%' };

/** category => { fileName: arabicText } */
const AUDIO_MANIFEST = {
  words: {
    baab: 'بَاب',
    battah: 'بَطَّة',
    bayt: 'بَيْت',
    bahr: 'بَحْر',
    habl: 'حَبْل',
    hubz: 'خُبْز',
    inab: 'عِنَب',
    kataba: 'كَتَبَ',
    arnab: 'أَرْنَب',
    asad: 'أَسَد',
    faar: 'فَأْر',
    qaraa: 'قَرَأَ',
    tuffah: 'تُفَّاح',
    taaj: 'تَاج',
    kitaab: 'كِتَاب',
    thalab: 'ثَعْلَب',
    thawb: 'ثَوْب',
    muthallath: 'مُثَلَّث',
    bahatha: 'بَحَثَ',
    jamal: 'جَمَل',
    jazar: 'جَزَر',
    shajarah: 'شَجَرَة'
  },

  sentences: {
    baab_bayt: 'هَذَا بَابُ البَيْتِ',
    battah_tasbah: 'البَطَّةُ تَسْبَحُ فِي البَحْرِ',
    arnab_jazar: 'الأَرْنَبُ يَأْكُلُ الجَزَرَ',
    jamal_sahraa: 'الجَمَلُ سَفِينَةُ الصَّحْرَاءِ'
  },

  stages: {
    stage_1: 'المَرْحَلَةُ الأُولَى: تَعَرَّفْ عَلَى الحَرْف',
    stage_2: 'المَرْحَلَةُ الثَّانِيَة: اسْتَمِعْ لِصَوْتِ الحَرْف',
    stage_3: 'المَرْحَلَةُ الثَّالِثَة: الحَرَكَاتُ القَصِيرَة',
    stage_4: 'المَرْحَلَةُ الرَّابِعَة: المَدُودُ الطَّوِيلَة',
    stage_5: 'المَرْحَلَةُ الخَامِسَة: مَخْرَجُ الحَرْفِ وَتَشْرِيحُ اللِّسَان',
    stage_6: 'المَرْحَلَةُ السَّادِسَة: مَوْقِعُ الحَرْفِ فِي الكَلِمَة',
    stage_7: 'المَرْحَلَةُ السَّابِعَة: تَرْكِيبُ الكَلِمَات',
    stage_8: 'المَرْحَلَةُ الثَّامِنَة: الاخْتِبَارُ النِّهَائِيُّ وَالتَّتْوِيج',
    listen_sound: 'اسْتَمِعْ لِصَوْتِ الحَرْفِ يَا بَطَل',
    next_stage: 'مَبْرُوك! فُتِحَتْ لَكَ المَرْحَلَةُ التَّالِيَة.. هَيَّا نَنْطَلِق!'
  },

  dialogue: {
    ask_name: 'مَا اسْمُكَ يَا بَطَل؟ اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!',
    intro_step_1: 'مَرْحَبًا.. أَنَا لُومِي! هَيَّا نَسْتَكْشِفُ مَعًا عَالَمَ الأَصْوَاتِ السَّاحِر!',
    intro_step_2: 'هَذَا العَالَمُ فَقَدَ أَصْوَاتَهُ السَّاحِرَة...',
    intro_step_3: 'هَلْ تُسَاعِدُنِي فِي إِعَادَتِهَا مَعًا؟',
    choose_letter: 'اخْتَرْ حَرْفَكَ السِّحْرِيَّ الَّذِي تُرِيدُ أَنْ تَبْدَأَ بِهِ!',
    letter_choice_cheer: 'اخْتِيَارٌ سِحْرِيٌّ رَائِع! هَيَّا بِنَا نَبْدَأُ المُغَامَرَة!',
    welcome: 'أَهْلًا وَسَهْلًا بِكَ فِي عَالَمِ لُومِي!',
    welcome_child: 'أَهْلًا يَا بَطَل! هَيَّا نُكْمِلُ رِحْلَتَنَا!',
    welcome_talal: 'أَهْلًا يَا طَلَال! هَيَّا نَبْدَأُ رِحْلَتَنَا السَّاحِرَة!',
    welcome_raneem: 'أَهْلًا يَا رَنِيم! هَيَّا نَبْدَأُ رِحْلَتَنَا السَّاحِرَة!',
    cheer_talal: 'أَحْسَنْتَ يَا طَلَال! نُطْقٌ مَلَكِيٌّ رَائِع!',
    cheer_raneem: 'أَحْسَنْتِ يَا رَنِيم! نُطْقٌ مَلَكِيٌّ رَائِع!',
    excellent: 'أَحْسَنْتَ يَا بَطَل! إِجَابَةٌ رَائِعَةٌ وَنُطْقٌ مُمْتَاز!',
    try_again: 'حَاوِلْ مَرَّةً أُخْرَى يَا بَطَل.. أَنْتَ قَرِيبٌ جِدًّا!',
    open_next_stage: 'مَبْرُوك! فُتِحَتْ لَكَ المَرْحَلَةُ التَّالِيَة!',
    complete_previous_first: 'أَكْمِلِ المَرْحَلَةَ السَّابِقَةَ أَوَّلًا لِفَتْحِ هَذِهِ المَرْحَلَة!'
  },

  names: {
    talal: 'طَلَال', raneem: 'رَنِيم', fatima: 'فَاطِمَة', heba: 'هِبَة', jana: 'جَنَى',
    mira: 'مِيرَا', deema: 'دِيمَة', taiba: 'طَيْبَة', mohammed: 'مُحَمَّد', ahmed: 'أَحْمَد',
    sara: 'سَارَة', ali: 'عَلِي', omar: 'عُمَر', youssef: 'يُوسُف', nour: 'نُور',
    maryam: 'مَرْيَم', batal: 'يَا بَطَل', batala: 'يَا بَطَلَة', abdullah: 'عَبْدُاللّٰه',
    abdulrahman: 'عَبْدُالرَّحْمَن', adam: 'آدَم', faisal: 'فَيْصَل', farah: 'فَرَح',
    hamza: 'حَمْزَة', hassan: 'حَسَن', huda: 'هُدَى', hussein: 'حُسَيْن', ibrahim: 'إِبْرَاهِيم',
    joud: 'جُود', karam: 'كَرَم', khaled: 'خَالِد', khalil: 'خَلِيل', layan: 'لَيَان',
    leila: 'لَيْلَى', majd: 'مَجْد', malak: 'مَلَاك', qais: 'قَيْس', rayan: 'رَيَّان',
    reem: 'رِيم', saad: 'سَعْد', salem: 'سَالِم', salma: 'سَلْمَى', tariq: 'طَارِق',
    waseem: 'وَسِيم', wissam: 'وِسَام', yara: 'يَارَا', zaid: 'زَيْد', ziad: 'زِيَاد'
  },

  articulation: {
    tongue_lab_intro: 'مَرْحَبًا بِكَ فِي مَعْمَلِ اللِّسَان.. اكْتَشِفْ كَيْفَ يَتَحَرَّكُ اللِّسَانُ وَالشَّفَتَان!',
    lips_guide_baa: 'أَغْلِقِ الشَّفَتَيْنِ مَعًا بِلُطْفٍ ثُمَّ افْتَحْهُمَا مَعَ إِخْرَاجِ الهَوَاء',
    tongue_guide_baa: 'يَبْقَى اللِّسَانُ مُسْتَرِيحًا فِي قَاعِ الفَمِ عِنْدَ نُطْقِ حَرْفِ البَاء',
    tongue_quiz_success: 'مُمْتَاز! وَضَعْتَ اللِّسَانَ فِي المَوْقِعِ الصَّحِيحِ لِنُطْقِ الحَرْف!'
  }
};

function synthesizeToFile(text, outPath) {
  return new Promise(async (resolve, reject) => {
    try {
      const tts = new MsEdgeTTS();
      await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
      const { audioStream } = tts.toStream(text, SYNTH_OPTIONS);

      const chunks = [];
      audioStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      audioStream.on('end', () => {
        fs.writeFileSync(outPath, Buffer.concat(chunks));
        resolve();
      });
      audioStream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
}

async function run() {
  let total = 0;
  let done = 0;
  let failed = [];

  for (const category of Object.keys(AUDIO_MANIFEST)) total += Object.keys(AUDIO_MANIFEST[category]).length;

  console.log(`\n🎙️  LUMI Audio Generator — ${total} files to generate\n`);

  for (const [category, entries] of Object.entries(AUDIO_MANIFEST)) {
    const dir = path.join(OUTPUT_ROOT, category);
    fs.mkdirSync(dir, { recursive: true });

    for (const [fileName, text] of Object.entries(entries)) {
      const outPath = path.join(dir, `${fileName}.mp3`);
      try {
        await synthesizeToFile(text, outPath);
        done++;
        console.log(`✅ [${done}/${total}] ${category}/${fileName}.mp3`);
      } catch (err) {
        failed.push(`${category}/${fileName}`);
        console.error(`❌ [${category}/${fileName}] failed: ${err?.message || err}`);
      }
      // small delay to be gentle with the free endpoint
      await new Promise((r) => setTimeout(r, 300));
    }
  }

  console.log(`\n🏁 Done. ${done}/${total} succeeded.`);
  if (failed.length) {
    console.log(`⚠️  Failed (${failed.length}), re-run manually or check text:`);
    failed.forEach((f) => console.log(`   - ${f}`));
  }
  console.log('\n📌 Reminder: /public/audio/letters/ and /public/audio/syllables/ are NOT included here — record those with a real human voice for accurate letter articulation.\n');
}

run();
