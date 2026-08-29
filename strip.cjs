const fs = require('fs');
const file = 'src/components/ai/AIPronunciationLab.tsx';
let content = fs.readFileSync(file, 'utf8');
const lines = content.split('\n');
const start = 36;
const end = 657;
const newImports = [
  "import { calculateArabicSimilarity, speechAnalyzer } from '../../services/speech/SpeechAnalyzer';",
  "import { ARABIC_LETTERS } from '../../data/letters';",
  "import { audioManager } from '../../audio/AudioManager';",
  "import { useGame } from '../../context/GameContext';",
  "import { LumiMascot } from '../mascot/LumiMascot';"
].join('\n');

lines.splice(start, end - start, newImports);
fs.writeFileSync(file, lines.join('\n'));
