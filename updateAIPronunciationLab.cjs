const fs = require('fs');
const file = 'src/components/ai/AIPronunciationLab.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Remove EmbeddedLumiGuide component definition
const lumiGuideStart = content.indexOf('export const EmbeddedLumiGuide: React.FC<{');
if (lumiGuideStart !== -1) {
    const lumiGuideEnd = content.indexOf('// ============================================================================', lumiGuideStart);
    content = content.substring(0, lumiGuideStart) + content.substring(lumiGuideEnd);
}

// 2. Replace uses of EmbeddedLumiGuide with LumiMascot
content = content.replace(/<EmbeddedLumiGuide\s*\n\s*message={aiMessage}\s*\n\s*shortHint={soundFeedbackTip}\s*\n\s*\/>/g, '<LumiMascot message={aiMessage} state={aiStatus} size="sm" />');

// 3. Replace AI_WORD_BANK with ARABIC_LETTERS dynamically finding the words
content = content.replace(/const matchingWords = AI_WORD_BANK\.filter\(\(w\) => w\.char === initialLetter\);/g, 'const letterData = ARABIC_LETTERS.find(l => l.char === initialLetter) || ARABIC_LETTERS[1];\n  const matchingWords = letterData.words.map(w => ({ id: w.id, word: w.word, char: initialLetter, meaning: w.meaning, emoji: w.emoji, phonemes: w.letters }));');
content = content.replace(/const wordList = matchingWords\.length > 0 \? matchingWords : AI_WORD_BANK;/g, 'const wordList = matchingWords;');

// 4. Update state to useGame
content = content.replace(/const \[stars, setStars\] = useState<number>\(0\);/g, 'const { addStars, addCoins, triggerCelebration } = useGame();');
content = content.replace(/const \[coins, setCoins\] = useState<number>\(0\);/g, '');

content = content.replace(/setStars\(s => s \+ 2\);/g, 'addStars(2);');
content = content.replace(/setCoins\(c => c \+ 10\);/g, 'addCoins(10);');

// 5. Replace standaloneAudio calls with audioManager
content = content.replace(/standaloneAudio\.stop\(\);/g, 'audioManager.stop();');
content = content.replace(/standaloneAudio\.playClick\(\);/g, 'audioManager.playClick();');
content = content.replace(/standaloneAudio\.playVictory\(\);/g, 'triggerCelebration();');
content = content.replace(/standaloneAudio\.speak\((.*?)\);/g, 'audioManager.speak($1);');

// 6. Remove confetti usage since triggerCelebration does it
content = content.replace(/try {\s*confetti\({[\s\S]*?}\);\s*} catch {}/g, '');

// 7. Remove Simulation buttons
const simStart = content.indexOf('{/* أزرار التجربة السريعة (للمطورين) */}');
if (simStart !== -1) {
    const simEnd = content.indexOf('</div>', simStart) + 6;
    content = content.substring(0, simStart) + content.substring(simEnd);
}

fs.writeFileSync(file, content);
