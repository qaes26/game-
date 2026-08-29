import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const STAGES_DIR = path.join(__dirname, '..', 'public', 'audio', 'stages');
if (!fs.existsSync(STAGES_DIR)) {
  fs.mkdirSync(STAGES_DIR, { recursive: true });
}

const stageExplanations = [
  {
    file: 'stage_1_explain.mp3',
    text: 'المَرْحَلَةُ الأُولَى: اكْتِشَافُ صَوْتِ الحَرْفِ الصَّافِي. فِي هَذِهِ المَرْحَلَة، اسْتَمِعْ لِصَوْتِ الحَرْفِ الصَّافِي، ثُمَّ اضْغَطْ وَاصْطَدْ فُقَّاعَاتِ الحَرْفِ الصَّحِيحَةِ لِتَجْمَعَ النُّجُوم!'
  },
  {
    file: 'stage_2_explain.mp3',
    text: 'المَرْحَلَةُ الثَّانِيَة: مَعْمَلُ الفَمِ وَمَخْرَجُ الحَرْف. تَعَلَّمْ مَخْرَجَ الحَرْفِ وَكَيْفَ يَتَحَرَّكُ اللِّسَانُ وَالشَّفَتَانِ بِـ 3 خُطُوَاتٍ مَرِحَةٍ لِنُطْقٍ سَلِيم!'
  },
  {
    file: 'stage_3_explain.mp3',
    text: 'المَرْحَلَةُ الثَّالِثَة: الحَرَكَاتُ السَّحْرِيَّةُ الثَّلاث. تَعَرَّفْ عَلَى الحَرَكَاتِ القَصِيرَة: الفَتْحَةُ وَالضَّمَّةُ وَالكَسْرَةُ وَاخْتَرِ الصَّوْتَ المَطْلُوب!'
  },
  {
    file: 'stage_4_explain.mp3',
    text: 'المَرْحَلَةُ الرَّابِعَة: قِطَارُ المُدُودِ الطَّوِيلَة. انْطَلِقْ مَعَ قِطَارِ المُدُود: مَدُّ الأَلِفِ وَمَدُّ الوَاوِ وَمَدُّ اليَاءِ وَمَيِّزِ الصَّوْتَ الطَّوِيل!'
  },
  {
    file: 'stage_5_explain.mp3',
    text: 'المَرْحَلَةُ الخَامِسَة: صَيْدُ الكَلِمَاتِ المُصَوَّرَة. اسْتَمِعْ لِلْكَلِمَةِ جَيِّدًا وَاخْتَرِ الصُّورَةَ المُرْتَبِطَةَ بِصَوْتِ الحَرْفِ لِتَفْتَحَ الصُّنْدُوقَ السِّحْرِيّ!'
  },
  {
    file: 'stage_6_explain.mp3',
    text: 'المَرْحَلَةُ السَّادِسَة: قِطَارُ مَوَاضِعِ الحَرْف. حَدِّدْ أَيْنَ يَسْكُنُ الحَرْفُ فِي الكَلِمَة: فِي أَوَّلِ الكَلِمَةِ، أَمْ فِي وَسَطِهَا، أَمْ فِي آخِرِهَا!'
  },
  {
    file: 'stage_7_explain.mp3',
    text: 'المَرْحَلَةُ السَّابِعَة: بِنَاءُ الكَلِمَاتِ السَّاحِر. رَتِّبْ قِطَعَ الحُرُوفِ لِبِنَاءِ الكَلِمَةِ كَامِلَةً بِالتَّرْتِيبِ الهِجَائِيِّ الصَّحِيحِ وَانْطِقْهَا!'
  },
  {
    file: 'stage_8_explain.mp3',
    text: 'المَرْحَلَةُ الثَّامِنَة: التَّحَدِّي النِّهَائِيُّ وَالتَّتْوِيجُ المَلَكِيّ. أَجِبْ عَنْ تَحَدِّيَاتِ البَوَّابَةِ السِّحْرِيَّةِ لِتَفْتَحَ الكَنْزَ وَتَتَوَّجَ بَطَلَ الحَرْفِ المَلَكِيّ!'
  }
];

async function generateAll() {
  console.log('🎙️ Generating 8 Stage Explanation Neural Audio Files (Pure Saudi Female)...');
  const tts = new MsEdgeTTS();
  await tts.setMetadata('ar-SA-ZariyahNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  for (const item of stageExplanations) {
    const dest = path.join(STAGES_DIR, item.file);
    try {
      console.log(`Generating: ${item.file} -> "${item.text.slice(0, 30)}..."`);
      const { audioStream } = tts.toStream(item.text, { pitch: '+0Hz', rate: '-4%' });
      const chunks = [];
      await new Promise((resolve, reject) => {
        audioStream.on('data', chunk => chunks.push(Buffer.from(chunk)));
        audioStream.on('end', resolve);
        audioStream.on('error', reject);
      });
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync(dest, buffer);
      console.log(`✅ Saved ${item.file} (${buffer.length} bytes)`);
    } catch (err) {
      console.error(`❌ Failed ${item.file}:`, err);
    }
  }
  console.log('🎉 Done generating all 8 stage explanation audio files!');
}

generateAll();
