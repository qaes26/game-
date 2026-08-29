const fs = require('fs');
const path = require('path');
const glob = require('glob');

const outputFile = path.join(__dirname, 'LUMI_PROJECT_FULL.md');

const header = `# مشروع "لومي" (LUMI) لتعليم النطق والحروف العربية للأطفال 🌟

## نظرة عامة (Overview)
تطبيق "لومي" هو منصة تعليمية وتفاعلية متقدمة تهدف إلى تعليم الأطفال (من 4 إلى 7 سنوات) الحروف العربية، النطق الصحيح، المقاطع الصوتية، وتكوين الجمل. يستخدم التطبيق تقنيات الذكاء الاصطناعي (AI) لتحليل النطق وتقييم أداء الطفل بشكل فوري عبر مساعد النطق الذكي "لومي".

## الميزات الرئيسية (Core Features)
1. **عوالم التعلم التفاعلية**:
   - 🌿 **وادي الحروف**: لتعلم أصوات الحروف ومخارجها.
   - 🌲 **غابة المقاطع**: لتعلم الحركات والمدود (بَ، بِ، بُ...).
   - 🏘️ **قرية الكلمات**: لتركيب الكلمات بشكل تفاعلي.
2. **مختبر النطق بالذكاء الاصطناعي (AI Pronunciation Lab)**:
   - يتيح للطفل الاستماع للنموذج الصحيح.
   - يسجل صوت الطفل ويحلله باستخدام \`Web Speech API\`.
   - يقارن نطق الطفل بالكلمة المستهدفة ويعطي تقييمًا (بطل، حاول مرة أخرى) مع إضاءات بصرية وملاحظات دقيقة.
3. **نظام المكافآت (Rewards)**:
   - يجمع الطفل النجوم والعملات عند إنجاز المهام، مما يعزز التحفيز (Gamification).
4. **مرآة لومي البصرية (Visual Mirror)**:
   - أداة لتدريب الطفل على مخارج الحروف باستخدام الكاميرا.

## البنية التحتية والتقنيات (Tech Stack)
- **إطار العمل**: React 18 + TypeScript + Vite.
- **التصميم**: Tailwind CSS لإنشاء واجهات عصرية، بالإضافة إلى مؤثرات زجاجية (Glassmorphism) وعناصر مرئية جذابة.
- **إدارة الحالة**: \`React Context\` (مثل \`GameContext\`).
- **معالجة الصوت والذكاء الاصطناعي**: نظام \`AudioManager\` مركزي ومحرك \`SpeechAnalyzer\` المستقل.
- **الرسوميات والأنيميشن**: \`Framer Motion\`، \`Lucide React\`، و \`Canvas API\`.

---

# 📂 أكواد المشروع الكاملة (Source Code)
فيما يلي جميع الملفات المصدرية المكونة للمشروع، منظمة لتسهيل القراءة والمراجعة:

`;

fs.writeFileSync(outputFile, header);

// Collect all source files
const files = glob.sync('src/**/*.{ts,tsx,css,json}', { nodir: true });
files.unshift('package.json', 'tailwind.config.js', 'vite.config.ts');

files.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        const ext = path.extname(file).replace('.', '');
        let codeBlockType = ext;
        if (ext === 'tsx' || ext === 'ts') codeBlockType = 'typescript';
        if (ext === 'js' || ext === 'cjs') codeBlockType = 'javascript';
        
        const fileData = `\n## 📄 ملف: \`${file}\`\n\`\`\`${codeBlockType}\n${content}\n\`\`\`\n`;
        fs.appendFileSync(outputFile, fileData);
    } catch (err) {
        console.error(`Could not read file: ${file}`, err);
    }
});

console.log('✅ تم إنشاء ملف LUMI_PROJECT_FULL.md بنجاح، وهو يحتوي على الشرح الكامل وكافة الأكواد.');
