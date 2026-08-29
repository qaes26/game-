const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

walk('src', (f) => {
  if (f.endsWith('.tsx') || f.endsWith('.ts')) {
    let content = fs.readFileSync(f, 'utf8');
    let changed = false;
    
    if (content.includes('import { LumiMascot } from \'../lumi/LumiMascot\'')) {
      content = content.replace(/import { LumiMascot } from '\.\.\/lumi\/LumiMascot'/g, "import { LumiMascot } from '../mascot/LumiMascot'");
      changed = true;
    }
    if (content.includes('import { LumiMascot } from \'../../components/lumi/LumiMascot\'')) {
      content = content.replace(/import { LumiMascot } from '\.\.\/\.\.\/components\/lumi\/LumiMascot'/g, "import { LumiMascot } from '../../components/mascot/LumiMascot'");
      changed = true;
    }
    
    if (changed) fs.writeFileSync(f, content);
  }
});
