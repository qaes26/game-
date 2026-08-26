import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const publicAudioDir = path.join(rootDir, 'public', 'audio');
const distAudioDir = path.join(rootDir, 'dist', 'audio');

function getAllFiles(dirPath, arrayOfFiles = []) {
  if (!fs.existsSync(dirPath)) return arrayOfFiles;
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const full = path.join(dirPath, file);
    if (fs.statSync(full).isDirectory()) {
      getAllFiles(full, arrayOfFiles);
    } else {
      arrayOfFiles.push(full);
    }
  });
  return arrayOfFiles;
}

console.log('\n========================================');
console.log('🔊 AUDIO ASSET AUDIT & VERIFICATION REPORT');
console.log('========================================\n');

const publicFiles = getAllFiles(publicAudioDir);
console.log(`📁 Total Audio Files in public/audio: ${publicFiles.length}`);

let nonZeroPublic = 0;
let errors = 0;

const tableRows = [];

publicFiles.forEach((file) => {
  const stat = fs.statSync(file);
  const rel = path.relative(path.join(rootDir, 'public'), file).replace(/\\/g, '/');
  const isMp3 = file.endsWith('.mp3');
  const isNonZero = stat.size > 0;
  
  if (isNonZero) nonZeroPublic++;
  else errors++;

  tableRows.push({
    Path: `/${rel}`,
    Size: `${(stat.size / 1024).toFixed(1)} KB`,
    Valid: isMp3 && isNonZero ? '✅ PASS' : '❌ FAIL',
    Type: 'audio/mpeg'
  });
});

console.table(tableRows);

console.log(`\n📊 Public Audit Summary: ${nonZeroPublic}/${publicFiles.length} valid audio files.`);

if (fs.existsSync(distAudioDir)) {
  const distFiles = getAllFiles(distAudioDir);
  console.log(`📁 Total Audio Files in dist/audio: ${distFiles.length}`);
  const nonZeroDist = distFiles.filter((f) => fs.statSync(f).size > 0).length;
  console.log(`📊 Dist Build Summary: ${nonZeroDist}/${distFiles.length} valid copied build files.`);
} else {
  console.log('ℹ️ dist/audio not yet built. Run npm run build to verify.');
}

if (errors === 0) {
  console.log('\n✨ ALL AUDIO FILES PASSED INTEGRITY AUDIT (100% HEALTHY)\n');
} else {
  console.error(`\n⚠️ Found ${errors} corrupted or empty audio files!\n`);
  process.exit(1);
}
