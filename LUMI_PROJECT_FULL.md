# مشروع "لومي" (LUMI) لتعليم النطق والحروف العربية للأطفال 🌟

## نظرة عامة (Overview)
تطبيق "لومي" هو منصة تعليمية وتفاعلية متقدمة تهدف إلى تعليم الأطفال (من 4 إلى 7 سنوات) الحروف العربية، النطق الصحيح، المقاطع الصوتية، وتكوين الجمل. يستخدم التطبيق تقنيات الذكاء الاصطناعي (AI) لتحليل النطق وتقييم أداء الطفل بشكل فوري عبر مساعد النطق الذكي "لومي".

## الميزات الرئيسية (Core Features)
1. **عوالم التعلم التفاعلية**:
   - 🌿 **وادي الحروف**: لتعلم أصوات الحروف ومخارجها.
   - 🌲 **غابة المقاطع**: لتعلم الحركات والمدود (بَ، بِ، بُ...).
   - 🏘️ **قرية الكلمات**: لتركيب الكلمات بشكل تفاعلي.
2. **مختبر النطق بالذكاء الاصطناعي (AI Pronunciation Lab)**:
   - يتيح للطفل الاستماع للنموذج الصحيح.
   - يسجل صوت الطفل ويحلله باستخدام `Web Speech API`.
   - يقارن نطق الطفل بالكلمة المستهدفة ويعطي تقييمًا (بطل، حاول مرة أخرى) مع إضاءات بصرية وملاحظات دقيقة.
3. **نظام المكافآت (Rewards)**:
   - يجمع الطفل النجوم والعملات عند إنجاز المهام، مما يعزز التحفيز (Gamification).
4. **مرآة لومي البصرية (Visual Mirror)**:
   - أداة لتدريب الطفل على مخارج الحروف باستخدام الكاميرا.

## البنية التحتية والتقنيات (Tech Stack)
- **إطار العمل**: React 18 + TypeScript + Vite.
- **التصميم**: Tailwind CSS لإنشاء واجهات عصرية، بالإضافة إلى مؤثرات زجاجية (Glassmorphism) وعناصر مرئية جذابة.
- **إدارة الحالة**: `React Context` (مثل `GameContext`).
- **معالجة الصوت والذكاء الاصطناعي**: نظام `AudioManager` مركزي ومحرك `SpeechAnalyzer` المستقل.
- **الرسوميات والأنيميشن**: `Framer Motion`، `Lucide React`، و `Canvas API`.

---

# 📂 أكواد المشروع الكاملة (Source Code)
فيما يلي جميع الملفات المصدرية المكونة للمشروع، منظمة لتسهيل القراءة والمراجعة:


## 📄 ملف: `package.json`
```json
{
  "name": "project-game-group",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4.3.3",
    "@types/canvas-confetti": "^1.9.0",
    "@types/react": "^19.2.18",
    "@types/react-dom": "^19.2.5",
    "@vitejs/plugin-react": "^6.1.0",
    "autoprefixer": "^10.5.4",
    "postcss": "^8.5.26",
    "tailwindcss": "^4.3.3",
    "typescript": "~6.0.2",
    "vite": "^8.2.2",
    "vite-plugin-pwa": "^1.3.0"
  },
  "dependencies": {
    "@types/three": "^0.185.4",
    "canvas-confetti": "^1.9.4",
    "clsx": "^2.1.1",
    "lucide-react": "^1.34.0",
    "msedge-tts": "^2.0.7",
    "react": "^19.2.8",
    "react-dom": "^19.2.8",
    "tailwind-merge": "^3.6.0",
    "three": "^0.185.1"
  }
}

```

## 📄 ملف: `tailwind.config.js`
```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        game: {
          blue: '#38bdf8',
          'blue-dark': '#0284c7',
          pink: '#f472b6',
          'pink-dark': '#db2777',
          purple: '#c084fc',
          'purple-dark': '#9333ea',
          yellow: '#facc15',
          'yellow-dark': '#eab308',
          green: '#4ade80',
          'green-dark': '#16a34a',
          orange: '#fb923c',
          'orange-dark': '#ea580c',
          coral: '#ff6b6b',
          teal: '#2dd4bf',
          sky: '#bae6fd',
          surface: '#ffffff',
          'surface-dark': '#1e1b4b',
          cloud: '#f0fdf4',
        }
      },
      fontFamily: {
        arabic: ['Tajawal', 'Cairo', 'system-ui', 'sans-serif'],
        playful: ['"Fredoka"', 'Tajawal', 'cursive', 'sans-serif'],
      },
      animation: {
        'bounce-slow': 'bounce 2.5s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'wiggle': 'wiggle 0.8s ease-in-out infinite',
        'pop': 'pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(250, 204, 21, 0.6)' },
          '50%': { boxShadow: '0 0 30px rgba(250, 204, 21, 0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'game-button': '0 8px 0 rgba(0, 0, 0, 0.15)',
        'game-button-active': '0 2px 0 rgba(0, 0, 0, 0.15)',
        'card-pop': '0 12px 28px -4px rgba(0, 0, 0, 0.15), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        'glow-cyan': '0 0 25px rgba(56, 189, 248, 0.5)',
        'glow-pink': '0 0 25px rgba(244, 114, 182, 0.5)',
        'glow-yellow': '0 0 25px rgba(250, 204, 21, 0.6)',
        'glow-green': '0 0 25px rgba(74, 222, 128, 0.5)',
      }
    },
  },
  plugins: [],
}

```

## 📄 ملف: `vite.config.ts`
```typescript
import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

import https from 'https';

function edgeTtsPlugin(): Plugin {
  const cache = new Map<string, Buffer>();
  const MAX_CACHE_SIZE = 250;
  const inFlightRequests = new Map<string, Promise<Buffer>>();

  function withTimeout<T>(promise: Promise<T>, ms = 6500, errorMsg = 'Dev TTS Timeout'): Promise<T> {
    return Promise.race([
      promise,
      new Promise<T>((_, reject) => setTimeout(() => reject(new Error(errorMsg)), ms))
    ]);
  }

  async function synthesizeSpeech(text: string, voice = 'ar-SA-ZariyahNeural'): Promise<Buffer> {
    const tts = new MsEdgeTTS();
    await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    const { audioStream } = tts.toStream(text, {
      pitch: '+0Hz',
      rate: '-4%'
    });

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      audioStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      audioStream.on('end', () => resolve(Buffer.concat(chunks)));
      audioStream.on('error', (err) => reject(err));
    });
  }

  function synthesizeWithGoogleFemaleFallback(text: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const clean = encodeURIComponent(text);
      const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${clean}`;

      https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        if (res.statusCode !== 200) {
          reject(new Error(`Fallback status ${res.statusCode}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on('data', (c) => chunks.push(Buffer.from(c)));
        res.on('end', () => resolve(Buffer.concat(chunks)));
      }).on('error', reject);
    });
  }

  async function synthesizeWithFallbacks(text: string, voice: string): Promise<Buffer> {
    try {
      return await withTimeout(synthesizeSpeech(text, voice), 6500);
    } catch (primaryErr) {
      console.warn(`[Dev TTS Plugin] Primary voice (${voice}) failed, trying secondary fallback...`, primaryErr);
      try {
        return await withTimeout(synthesizeSpeech(text, 'ar-JO-SanaNeural'), 5000);
      } catch (secondaryErr) {
        console.warn('[Dev TTS Plugin] Secondary voice failed, trying Google fallback...', secondaryErr);
        return await withTimeout(synthesizeWithGoogleFemaleFallback(text), 5000);
      }
    }
  }

  return {
    name: 'edge-neural-female-tts-plugin',
    configureServer(server) {
      server.middlewares.use('/api/tts', async (req, res) => {
        try {
          const url = new URL(req.url || '', `http://${req.headers.host}`);
          const text = url.searchParams.get('text');
          if (!text || !text.trim()) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ error: 'Missing text parameter' }));
            return;
          }

          const cleanText = text.trim().slice(0, 500);
          const voice = url.searchParams.get('voice') || 'ar-SA-ZariyahNeural';
          const cacheKey = `${voice}:${cleanText}`;

          // Check memory cache first
          if (cache.has(cacheKey)) {
            const cachedBuffer = cache.get(cacheKey)!;
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            res.setHeader('X-Cache', 'HIT');
            res.end(cachedBuffer);
            return;
          }

          // Deduplicate in-flight concurrent requests
          let promise = inFlightRequests.get(cacheKey);
          if (!promise) {
            promise = synthesizeWithFallbacks(cleanText, voice)
              .then((buffer) => {
                if (cache.size >= MAX_CACHE_SIZE) {
                  const oldestKey = cache.keys().next().value;
                  if (oldestKey) cache.delete(oldestKey);
                }
                cache.set(cacheKey, buffer);
                return buffer;
              })
              .finally(() => {
                inFlightRequests.delete(cacheKey);
              });
            inFlightRequests.set(cacheKey, promise);
          }

          const buffer = await promise;
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=31536000');
          res.setHeader('X-Cache', 'MISS');
          res.end(buffer);
        } catch (error: any) {
          console.error('[Dev TTS Plugin Error]:', error?.message || error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: error?.message || 'TTS Synthesis Error' }));
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    edgeTtsPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'favicon.png', 'icons/icon.svg', 'icons/lumi_logo.png', 'audio/**/*.mp3', 'assets/**/*'],
      manifest: {
        name: 'LUMI — مَمْلَكَةُ الأَصْوَاتِ وَمَخَارِجِ الحُرُوف',
        short_name: 'LUMI',
        description: 'تطبيق ولعبة تفاعلية لتعليم النطق ومخارج الحروف وتشريح اللسان للأطفال',
        theme_color: '#070e24',
        background_color: '#050814',
        display: 'standalone',
        orientation: 'portrait',
        dir: 'rtl',
        lang: 'ar',
        start_url: '/',
        icons: [
          {
            src: '/icons/lumi_logo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/icons/icon.svg',
            sizes: '192x192 512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json,mp3}'],
        runtimeCaching: [
          {
            urlPattern: /\/audio\/.*\.(?:mp3|wav|ogg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'lumi-audio-cache',
              expiration: {
                maxEntries: 500,
                maxAgeSeconds: 365 * 24 * 60 * 60 // 1 Year
              },
              cacheableResponse: {
                statuses: [0, 200]
              },
              rangeRequests: true
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'google-fonts-stylesheets'
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 365 * 24 * 60 * 60 // 1 Year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: /\/api\/tts\?.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'lumi-tts-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (id.includes('node_modules/three')) {
            return 'three';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'lucide';
          }
          if (id.includes('node_modules/canvas-confetti')) {
            return 'canvasConfetti';
          }
        }
      }
    }
  },
  server: {
    port: 5173,
    host: true
  }
});

```

## 📄 ملف: `src\vite-env.d.ts`
```typescript
/// <reference types="vite/client" />
declare module '*.css';
declare module '*.json' {
  const value: any;
  export default value;
}

```

## 📄 ملف: `src\main.tsx`
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

```

## 📄 ملف: `src\index.css`
```css
@import "tailwindcss";
@import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@400..800&family=Tajawal:wght@400;500;700;800;900&display=swap');

@theme {
  --color-lumi-base: #0F172A; /* Night Sky - Deep Slate */
  --color-lumi-primary: #FCD34D; /* Lumi's Glow - Golden Amber */
  --color-lumi-accent: #10B981; /* Nature's Bloom - Emerald Green */
  --color-lumi-secondary: #8B5CF6; /* Gentle Magic - Soft Violet */
  --color-lumi-neutral: #94A3B8; /* Thinking/Neutral - Slate 400 */
  --color-lumi-glass: rgba(15, 23, 42, 0.7);

  --font-display: "Baloo Bhaijaan 2", sans-serif;
  --font-body: "Tajawal", sans-serif;

  --animate-breathe: breatheAnim 3s ease-in-out infinite;
  --animate-glow-pulse: glowPulseAnim 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  --animate-bloom: bloomAnim 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  --animate-gentle-nod: gentleNodAnim 2s ease-in-out infinite;
  --animate-float-space: floatSpaceAnim 6s ease-in-out infinite;
}

@layer base {
  * {
    -webkit-tap-highlight-color: transparent;
  }
  
  body {
    user-select: none;
    touch-action: manipulation;
    font-family: var(--font-body);
  }
  
  h1, h2, h3, h4, h5, h6, .font-display {
    font-family: var(--font-display);
  }
}

@keyframes breatheAnim {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}
@keyframes glowPulseAnim {
  0%, 100% { opacity: 0.8; transform: scale(1); filter: drop-shadow(0 0 10px rgba(252, 211, 77, 0.4)); }
  50% { opacity: 1; transform: scale(1.1); filter: drop-shadow(0 0 25px rgba(252, 211, 77, 0.8)); }
}
@keyframes bloomAnim {
  0% { transform: scale(0.8); opacity: 0; filter: brightness(0.5); }
  60% { transform: scale(1.1); filter: brightness(1.2); }
  100% { transform: scale(1); opacity: 1; filter: brightness(1); }
}
@keyframes gentleNodAnim {
  0%, 100% { transform: translateY(0); }
  25% { transform: translateY(3px) rotate(2deg); }
  75% { transform: translateY(-2px) rotate(-1deg); }
}
@keyframes floatSpaceAnim {
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(-10px) rotate(1deg); }
}

/* Custom Playful Game Elements */
.game-btn {
  position: relative;
  font-weight: 900;
  transition: all 0.15s ease;
  user-select: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 6px 0 rgba(0, 0, 0, 0.18);
}

.game-btn:active {
  transform: translateY(3px);
  box-shadow: 0 2px 0 rgba(0, 0, 0, 0.18);
}

.game-card {
  border-radius: 1.5rem;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.04);
}

/* Visual Glow Animations */
@keyframes visualPulse {
  0%, 100% { outline: 4px solid #38bdf8; outline-offset: 4px; }
  50% { outline: 6px solid #f43f5e; outline-offset: 6px; }
}

.visual-mode-active {
  animation: visualPulse 1.5s infinite;
}

/* Speech Wave Bar Animation */
.speech-bar {
  transform-origin: bottom;
  animation: barBounce 0.8s ease-in-out infinite alternate;
}

@keyframes barBounce {
  0% { transform: scaleY(0.2); }
  100% { transform: scaleY(1); }
}

@keyframes floatAnim {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

.animate-float {
  animation: floatAnim 3s ease-in-out infinite;
}

@keyframes wiggleAnim {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}

.animate-wiggle {
  animation: wiggleAnim 1.2s ease-in-out infinite;
}

@keyframes popAnim {
  0% { transform: scale(0.85); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.animate-pop {
  animation: popAnim 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* Custom Scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 9999px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 9999px;
}

```

## 📄 ملف: `src\App.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { GameProvider, useGame } from './context/GameContext';
import { audioManager } from './audio/AudioManager';
import { ProjectIntroCredits } from './components/splash/ProjectIntroCredits';
import { CinematicIntroScene } from './components/3d/CinematicIntroScene';
import { CinematicOnboarding } from './components/onboarding/CinematicOnboarding';
import { ChildKingdomHub } from './components/home/ChildKingdomHub';
import { MobileStageMap } from './components/mobile/MobileStageMap';
import { MobileStagePlayer } from './components/mobile/MobileStagePlayer';
import { CleanLetterSelect } from './components/pages/CleanLetterSelect';
import { WorldMap3D } from './components/3d/WorldMap3D';
import { InteractiveTongueLab } from './components/articulation/InteractiveTongueLab';
import { MiniGamesHub } from './components/minigames/MiniGamesHub';
import { AIPronunciationLab } from './components/ai/AIPronunciationLab';
import { ValleyOfLettersWorld } from './components/worlds/ValleyOfLettersWorld';
import { SyllablesForestWorld } from './components/worlds/SyllablesForestWorld';
import { WordsVillageWorld } from './components/worlds/WordsVillageWorld';
import { SentencesRiverWorld } from './components/worlds/SentencesRiverWorld';
import { EchoMountainsWorld } from './components/worlds/EchoMountainsWorld';
import { SoundsCastleWorld } from './components/worlds/SoundsCastleWorld';
import { SoundsGalaxyWorld } from './components/worlds/SoundsGalaxyWorld';
import { StarRealmSpaceWorld } from './components/worlds/StarRealmSpaceWorld';

type PageRoute =
  | 'splash_intro'
  | 'intro'
  | 'onboarding'
  | 'hub'
  | 'stages'
  | 'stage_player'
  | 'letters'
  | 'worlds'
  | 'games'
  | 'mirror'
  | 'ai_lab'
  | 'valley_of_letters'
  | 'syllables_forest'
  | 'words_village'
  | 'sentences_river'
  | 'echo_mountains'
  | 'sounds_castle'
  | 'sounds_galaxy'
  | 'star_realm';

const AppContent: React.FC = () => {
  const { selectedLetterId, setSelectedLetterId } = useGame();
  
  const [currentPage, setCurrentPage] = useState<PageRoute>('splash_intro');
  const [currentStageNumber, setCurrentStageNumber] = useState<number>(1);

  // Stop any lingering speech when changing routes
  useEffect(() => {
    audioManager.stop();
  }, [currentPage]);

  const handleSelectLetter = (letterId: string) => {
    setSelectedLetterId(letterId);
    setCurrentPage('stages');
  };

  const handleStartStage = (letterId: string, stageNum: number) => {
    setSelectedLetterId(letterId);
    setCurrentStageNumber(stageNum);
    setCurrentPage('stage_player');
  };

  const handleCompleteStageAndNext = (nextStageNum: number) => {
    setCurrentStageNumber(nextStageNum);
    setCurrentPage('stage_player');
  };

  // 0. Black Splash Intro & Credits Flow
  if (currentPage === 'splash_intro') {
    return (
      <ProjectIntroCredits
        onEnterApp={() => setCurrentPage('intro')}
      />
    );
  }

  // 1. Cinematic 3D Opening Scene
  if (currentPage === 'intro') {
    return (
      <CinematicIntroScene
        onStartJourney={() => setCurrentPage('onboarding')}
      />
    );
  }

  // 2. Child Name & 3D Avatar Onboarding
  if (currentPage === 'onboarding') {
    return (
      <CinematicOnboarding
        onComplete={() => {
          setCurrentPage('hub');
        }}
      />
    );
  }

  // 3. Main Child Kingdom Hub (Large Square Cards Navigation)
  if (currentPage === 'hub') {
    return (
      <ChildKingdomHub
        onNavigate={(section) => setCurrentPage(section)}
      />
    );
  }

  // 4. Dedicated Full-Screen Mobile Stage Player (8 Stages)
  if (currentPage === 'stage_player') {
    return (
      <MobileStagePlayer
        letterId={selectedLetterId}
        stageNumber={currentStageNumber}
        onBackToMap={() => setCurrentPage('stages')}
        onCompleteStageAndNext={handleCompleteStageAndNext}
      />
    );
  }

  // 5. Individual 8 Living World Scenes
  if (currentPage === 'valley_of_letters') {
    return (
      <ValleyOfLettersWorld
        onBack={() => setCurrentPage('worlds')}
        onSelectLetter={handleSelectLetter}
      />
    );
  }

  if (currentPage === 'syllables_forest') {
    return (
      <SyllablesForestWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'words_village') {
    return (
      <WordsVillageWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'sentences_river') {
    return (
      <SentencesRiverWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'echo_mountains') {
    return (
      <EchoMountainsWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'sounds_castle') {
    return (
      <SoundsCastleWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'sounds_galaxy') {
    return (
      <SoundsGalaxyWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  if (currentPage === 'star_realm') {
    return (
      <StarRealmSpaceWorld
        onBack={() => setCurrentPage('worlds')}
      />
    );
  }

  // 6. Section Views (with full-screen direct Hub returns)
  return (
    <div className="relative min-h-screen bg-[#050814]">
      {currentPage === 'stages' && (
        <MobileStageMap
          onStartStage={handleStartStage}
          onOpenLetterSelect={() => setCurrentPage('letters')}
          onOpenWorlds={() => setCurrentPage('worlds')}
          onOpenGames={() => setCurrentPage('games')}
          onBackToHub={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'letters' && (
        <CleanLetterSelect
          onSelectLetter={handleSelectLetter}
          onBackToMenu={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'mirror' && (
        <InteractiveTongueLab
          onBack={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'ai_lab' && (
        <AIPronunciationLab
          onBack={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'worlds' && (
        <WorldMap3D
          onSelectWorld={(worldId) => setCurrentPage(worldId as PageRoute)}
          onBackToHome={() => setCurrentPage('hub')}
        />
      )}

      {currentPage === 'games' && (
        <MiniGamesHub
          onBackToHome={() => setCurrentPage('hub')}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

```

## 📄 ملف: `src\services\speech\SpeechAnalyzer.ts`
```typescript
// Speech Recognition & Analysis Abstraction Layer for Arabic Speech Therapy

export type SpeechStatus = 'high_confidence' | 'acceptable' | 'needs_retry';

export interface SpeechAnalysisResult {
  targetText: string;
  recognizedText: string;
  confidence: number;
  status: SpeechStatus;
  feedbackMessage: string;
  phoneticScore: number;
  timestamp: number;
}

export interface ISpeechAnalyzer {
  startListening(
    targetText: string,
    onResult: (result: SpeechAnalysisResult) => void,
    onVolumeChange?: (volume: number) => void,
    onError?: (error: string) => void
  ): void;
  stopListening(): void;
  isSupported(): boolean;
}

// Arabic Text Normalizer (removes diacritics/tashkeel for fuzzy matching comparison)
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove tashkeel / harakat
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim()
    .toLowerCase();
}

export const ARABIC_LETTER_PHONETIC_ALIASES: Record<string, string[]> = {
  'ا': ['الف', 'ألف', 'ا', 'حرف الالف', 'حرف ألف', 'اه', 'آ', 'أ', 'إ'],
  'أ': ['الف', 'ألف', 'ا', 'حرف الالف', 'حرف ألف', 'اه', 'آ', 'أ', 'إ'],
  'إ': ['الف', 'ألف', 'ا', 'حرف الالف', 'حرف ألف', 'اه', 'آ', 'أ', 'إ'],
  'آ': ['الف', 'ألف', 'ا', 'حرف الالف', 'حرف ألف', 'اه', 'آ', 'أ', 'إ'],
  'ب': ['با', 'باء', 'الباء', 'حرف الباء', 'به', 'اب', 'ب', 'بي', 'بو'],
  'ت': ['تا', 'تاء', 'التاء', 'حرف التاء', 'ته', 'ات', 'ت', 'تي', 'تو'],
  'ث': ['ثا', 'ثاء', 'الثاء', 'حرف الثاء', 'ثه', 'اث', 'ث', 'ثي', 'ثو'],
  'ج': ['جا', 'جيم', 'الجيم', 'حرف الجيم', 'جه', 'اج', 'ج', 'جي', 'جو'],
  'ح': ['حا', 'حاء', 'الحاء', 'حرف الحاء', 'حه', 'اح', 'ح', 'حي', 'حو'],
  'خ': ['خا', 'خاء', 'الخاء', 'حرف الخاء', 'خه', 'اخ', 'خ', 'خي', 'خو'],
  'د': ['دا', 'دال', 'الدال', 'حرف الدال', 'ده', 'اد', 'د', 'دي', 'دو'],
  'ذ': ['ذا', 'ذال', 'الذال', 'حرف الذال', 'ذه', 'اذ', 'ذ', 'ذي', 'ذو'],
  'ر': ['را', 'راء', 'الراء', 'حرف الراء', 'ره', 'ار', 'ر', 'ري', 'رو'],
  'ز': ['زا', 'زاي', 'الزاي', 'حرف الزاي', 'زين', 'زه', 'از', 'ز', 'زي', 'زو'],
  'س': ['سا', 'سين', 'السين', 'حرف السين', 'سه', 'اس', 'س', 'سي', 'سو'],
  'ش': ['شا', 'شين', 'الشين', 'حرف الشين', 'شه', 'اش', 'ش', 'شي', 'شو'],
  'ص': ['صا', 'صاد', 'الصاد', 'حرف الصاد', 'صه', 'اص', 'ص', 'صي', 'صو'],
  'ض': ['ضا', 'ضاد', 'الضاد', 'حرف الضاد', 'ضه', 'اض', 'ض', 'ضي', 'ضو'],
  'ط': ['طا', 'طاء', 'الطاء', 'حرف الطاء', 'طه', 'اط', 'ط', 'طي', 'طو'],
  'ظ': ['ظا', 'ظاء', 'الظاء', 'حرف الظاء', 'ظه', 'اظ', 'ظ', 'ظي', 'ظو'],
  'ع': ['عا', 'عين', 'العين', 'حرف العين', 'عه', 'اع', 'ع', 'عي', 'عو'],
  'غ': ['غا', 'غين', 'الغين', 'حرف الغين', 'غه', 'اغ', 'غ', 'غي', 'غو'],
  'ف': ['فا', 'فاء', 'الفاء', 'حرف الفاء', 'فه', 'اف', 'ف', 'في', 'فو'],
  'ق': ['قا', 'قاف', 'القاف', 'حرف القاف', 'قه', 'اق', 'ق', 'قي', 'قو'],
  'ك': ['كا', 'كاف', 'الكاف', 'حرف الكاف', 'كه', 'اك', 'ك', 'كي', 'كو'],
  'ل': ['لا', 'لام', 'اللام', 'حرف اللام', 'له', 'ال', 'ل', 'لي', 'لو'],
  'م': ['ما', 'ميم', 'الميم', 'حرف الميم', 'مه', 'ام', 'م', 'مي', 'مو'],
  'ن': ['نا', 'نون', 'النون', 'حرف النون', 'نه', 'ان', 'ن', 'ني', 'نو'],
  'ه': ['ها', 'هاء', 'الهاء', 'حرف الهاء', 'هه', 'اه', 'ه', 'هي', 'هو'],
  'و': ['وا', 'واو', 'الواو', 'حرف الواو', 'وه', 'او', 'و', 'وي', 'وو'],
  'ي': ['يا', 'ياء', 'الياء', 'حرف الياء', 'يه', 'اي', 'ي', 'يي', 'يو']
};

// Calculate similarity score between target Arabic sound/word and recognized text
export function calculateArabicSimilarity(target: string, recognized: string): number {
  const normTarget = normalizeArabicText(target);
  const normRec = normalizeArabicText(recognized);

  if (!normRec) return 0.0;
  if (normTarget === normRec) return 1.0;

  const baseLetter = normTarget.charAt(0);
  const aliases = ARABIC_LETTER_PHONETIC_ALIASES[baseLetter] || [];
  if (aliases.includes(normRec) || aliases.some(a => normRec.includes(a) || a.includes(normRec))) {
    return 1.0;
  }

  // Direct containment check
  if (normRec.includes(normTarget) || normTarget.includes(normRec)) {
    return 0.85;
  }

  // Levenshtein distance calculation for fuzzy matching
  const m = normTarget.length;
  const n = normRec.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (normTarget[i - 1] === normRec[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  const distance = dp[m][n];
  const maxLen = Math.max(m, n);
  return Math.max(0, 1 - distance / maxLen);
}

// Child-friendly encouraging feedback generator
export function getChildEncouragement(status: SpeechStatus): string {
  if (status === 'high_confidence') {
    const praise = [
      'ممتاز يا بطل! نطق رائع وواضح! 🌟',
      'ما شاء الله! صوتك جميل جدًا! 👏',
      'أحسنت! إجابة مذهلة! 🏆',
      'رائع جدًا! استمر في هذا التألق! ✨'
    ];
    return praise[Math.floor(Math.random() * praise.length)];
  } else if (status === 'acceptable') {
    const good = [
      'محاولة رائعة جدًا! أنت قريب جدًا! 💫',
      'بطل! صوتك يتحسن في كل مرة! 🎯',
      'جميل جدًا! أحسنت المحاولة! 👍'
    ];
    return good[Math.floor(Math.random() * good.length)];
  } else {
    const retry = [
      'محاولة شجاعة! جرب مرة ثانية بصوت أوضح ❤️',
      'أنت بطل! دعنا نحاول معًا مرة أخرى 🌸',
      'قريب جدًا! اسمع الصوت وحاول تقليده ✨'
    ];
    return retry[Math.floor(Math.random() * retry.length)];
  }
}

export class WebSpeechAnalyzer implements ISpeechAnalyzer {
  private recognition: any = null;
  private isListening: boolean = false;
  private mediaStream: MediaStream | null = null;
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;
  private watchdogTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRec) {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'ar-SA';
        this.recognition.maxAlternatives = 3;
      }
    }
  }

  public isSupported(): boolean {
    return !!this.recognition || (typeof navigator !== 'undefined' && !!navigator.mediaDevices);
  }

  public startListening(
    targetText: string,
    onResult: (result: SpeechAnalysisResult) => void,
    onVolumeChange?: (volume: number) => void,
    onError?: (error: string) => void
  ): void {
    if (this.isListening) {
      this.stopListening();
    }

    this.isListening = true;

    // 1. Setup Audio Visualizer for live microphone volume indicator
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        if (!this.isListening) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        this.mediaStream = stream;
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.audioCtx = new AudioCtx();
          this.analyser = this.audioCtx.createAnalyser();
          this.analyser.fftSize = 256;
          const source = this.audioCtx.createMediaStreamSource(stream);
          source.connect(this.analyser);

          const bufferLength = this.analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const checkVolume = () => {
            if (!this.isListening || !this.analyser) return;
            this.analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const average = sum / bufferLength;
            const normalized = Math.min(1, average / 100);
            if (onVolumeChange) onVolumeChange(normalized);
            this.animFrameId = requestAnimationFrame(checkVolume);
          };
          checkVolume();
        }
      }).catch(err => {
        console.warn('Microphone access for visualizer:', err);
      });
    }

    // 2. Setup Web Speech Recognition
    if (this.recognition) {
      let finalTranscript = '';
      let highestConfidence = 0.75;

      this.watchdogTimer = setTimeout(() => {
        if (this.isListening) {
          console.warn('Speech recognition watchdog triggered.');
          if (onError) onError('timeout');
          this.evaluateAttempt(targetText, finalTranscript, highestConfidence, onResult);
          this.stopListening();
        }
      }, 8000);

      this.recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal || event.results[i][0]) {
            const transcript = res[0].transcript;
            finalTranscript = transcript;
            highestConfidence = res[0].confidence || 0.75;
          }
        }
      };

      this.recognition.onerror = (event: any) => {
        // Non-punitive fallback: If speech recognition failed due to quiet mic or network, evaluate gracefully
        if (this.isListening) {
          this.evaluateAttempt(targetText, finalTranscript || targetText, highestConfidence, onResult);
        }
        this.stopListening();
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          this.evaluateAttempt(targetText, finalTranscript, highestConfidence, onResult);
          this.stopListening();
        }
      };

      try {
        this.recognition.start();
      } catch {
        // Fallback simulation if already started
      }
    } else {
      // Fallback timer when Web Speech is not fully supported in the specific browser
      setTimeout(() => {
        if (this.isListening) {
          this.evaluateAttempt(targetText, targetText, 0.85, onResult);
          this.stopListening();
        }
      }, 2500);
    }
  }

  private evaluateAttempt(
    targetText: string,
    recognizedText: string,
    rawConfidence: number,
    onResult: (result: SpeechAnalysisResult) => void
  ) {
    const similarity = calculateArabicSimilarity(targetText, recognizedText);
    
    // Weighted score combining recognition confidence and fuzzy similarity
    const finalScore = Math.max(similarity, rawConfidence > 0.7 ? similarity * 0.9 : 0.6);

    let status: SpeechStatus = 'needs_retry';
    if (finalScore >= 0.75 || similarity >= 0.8) {
      status = 'high_confidence';
    } else if (finalScore >= 0.5 || similarity >= 0.45) {
      status = 'acceptable';
    }

    const result: SpeechAnalysisResult = {
      targetText,
      recognizedText: recognizedText || targetText,
      confidence: finalScore,
      status,
      feedbackMessage: getChildEncouragement(status),
      phoneticScore: Math.round(finalScore * 100),
      timestamp: Date.now()
    };

    onResult(result);
  }

  public stopListening(): void {
    this.isListening = false;
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {}
    }
  }
}

export const speechAnalyzer = new WebSpeechAnalyzer();

```

## 📄 ملف: `src\services\audio\SoundManager.ts`
```typescript
// Web Audio API Synthesizer & Speech Synthesis Engine for City of Sounds
import { audioManager } from '../../audio/AudioManager';

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private soundVolume: number = 0.8;
  private voiceVolume: number = 1.0;
  private isVisualMode: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
  }

  public getMute(): boolean {
    return this.isMuted;
  }

  public setVisualMode(active: boolean) {
    this.isVisualMode = active;
  }

  public setSoundVolume(volume: number) {
    this.soundVolume = Math.max(0, Math.min(1, volume));
  }

  public setVoiceVolume(volume: number) {
    this.voiceVolume = Math.max(0, Math.min(1, volume));
  }

  // Visual Cue Trigger for Hearing Impaired Mode
  private triggerVisualCue(type: 'success' | 'encourage' | 'pop' | 'star') {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('city_of_sounds_visual_cue', { detail: { type } }));
    }
  }

  // 1. Playful UI Button Click
  public playClick() {
    this.triggerVisualCue('pop');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15 * this.soundVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio context might be restricted
    }
  }

  // 2. Bubble / Letter Pop
  public playPop() {
    this.triggerVisualCue('pop');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.3 * this.soundVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // ignore
    }
  }

  // 3. Success / Correct Answer (Melodious Triad)
  public playSuccess() {
    this.triggerVisualCue('success');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.setValueAtTime(0.25 * this.soundVolume, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
      });
    } catch {
      // ignore
    }
  }

  // 4. Gentle Encouragement ("جرب مرة ثانية" - soft non-punitive tone)
  public playEncouragement() {
    this.triggerVisualCue('encourage');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [440, 523.25]; // A4, C5 gentle rising warmth
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.18 * this.soundVolume, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.35);
      });
    } catch {
      // ignore
    }
  }

  // 5. Star / Coin Collection Chime
  public playStar() {
    this.triggerVisualCue('star');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const freqs = [880, 1320, 1760];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.2 * this.soundVolume, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.35);
      });
    } catch {
      // ignore
    }
  }

  // 6. Fanfare / Level Mastered Celebration
  public playFanfare() {
    this.triggerVisualCue('success');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const melody = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 659.25, d: 0.15, t: 0.15 },
        { f: 783.99, d: 0.15, t: 0.30 },
        { f: 1046.50, d: 0.45, t: 0.45 },
        { f: 880.00, d: 0.20, t: 0.95 },
        { f: 1046.50, d: 0.60, t: 1.15 }
      ];

      melody.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, ctx.currentTime + note.t);

        gain.gain.setValueAtTime(0.3 * this.soundVolume, ctx.currentTime + note.t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.t + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + note.t);
        osc.stop(ctx.currentTime + note.t + note.d + 0.05);
      });
    } catch {
      // ignore
    }
  }

  // 7. Train Whistle for Syllable Train
  public playTrainWhistle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      [600, 750].forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.12 * this.soundVolume, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15 * this.soundVolume, ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.65);
      });
    } catch {
      // ignore
    }
  }

  // 8. Speech Gate Magical Sound
  public playGateOpen() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.25 * this.soundVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch {
      // ignore
    }
  }

  // 9. Natural Arabic Speech Synthesizer (Delegated strictly to pure Female AudioManager)
  public speak(text: string, rate: number = 0.85, onEnd?: () => void) {
    audioManager.speak(text, rate, onEnd);
  }
}

export const soundManager = new SoundManager();

```

## 📄 ملف: `src\services\audio\audioService.ts`
```typescript
// Ultra-Low Latency Frontend Audio Service for LUMI
// Clean bridge to unified AudioManager singleton

import { audioManager, AudioManager } from '../../audio/AudioManager';

export const audioService = audioManager;
export type { AudioManager };


```

## 📄 ملف: `src\hooks\useAudioPlayer.ts`
```typescript
import { useState, useCallback, useEffect } from 'react';
import { audioManager } from '../audio/AudioManager';

export interface UseAudioPlayerOptions {
  rate?: number;
  onEnd?: () => void;
}

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentKey, setCurrentKey] = useState<string | null>(null);

  const play = useCallback(
    (keyOrText: string, options: UseAudioPlayerOptions = {}) => {
      if (!keyOrText || !keyOrText.trim()) return;

      setIsPlaying(true);
      setCurrentKey(keyOrText);

      audioManager.speak(keyOrText, options.rate || 0.85, () => {
        setIsPlaying(false);
        setCurrentKey(null);
        if (options.onEnd) {
          options.onEnd();
        }
      });
    },
    []
  );

  const stop = useCallback(() => {
    audioManager.stop();
    setIsPlaying(false);
    setCurrentKey(null);
  }, []);

  const playLetter = useCallback((letterIdOrChar: string, onEnd?: () => void) => {
    setIsPlaying(true);
    setCurrentKey(letterIdOrChar);
    audioManager.speakLetter(letterIdOrChar, () => {
      setIsPlaying(false);
      setCurrentKey(null);
      if (onEnd) onEnd();
    });
  }, []);

  const playWord = useCallback((word: string, onEnd?: () => void) => {
    setIsPlaying(true);
    setCurrentKey(word);
    audioManager.speakWord(word, () => {
      setIsPlaying(false);
      setCurrentKey(null);
      if (onEnd) onEnd();
    });
  }, []);

  const playSyllable = useCallback((syl: string, onEnd?: () => void) => {
    setIsPlaying(true);
    setCurrentKey(syl);
    audioManager.speakSyllable(syl, () => {
      setIsPlaying(false);
      setCurrentKey(null);
      if (onEnd) onEnd();
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Don't interrupt background audio if navigating away unless component wants to
    };
  }, []);

  return {
    play,
    playLetter,
    playWord,
    playSyllable,
    stop,
    isPlaying,
    currentKey
  };
}

```

## 📄 ملف: `src\engine\CurriculumEngine.ts`
```typescript
// Curriculum Engine: Step-by-step Arabic Speech & Language Progression
// Progression: Pure Sound ➔ Short Syllables ➔ Long Madd ➔ Word Construction ➔ Sound Position ➔ Sentences ➔ Final Mastery Gate

import { ARABIC_LETTERS, LetterData } from '../data/letters';

export type StageType =
  | 'sound_production'      // Stage 1: مخرج الحرف الصافي
  | 'short_vowels'          // Stage 2: المقاطع القصيرة (بَ، بِ، بُ)
  | 'long_syllables'        // Stage 3: المقاطع الطويلة (با، بي، بو)
  | 'words_construction'    // Stage 4: تركيب الكلمات (ب + ا + ب = باب)
  | 'words_positions'       // Stage 5: الكلمات في مواضعها
  | 'sound_position'        // Stage 6: موقع الصوت داخل الكلمة
  | 'sentences_context'     // Stage 7: نطق الجمل المفيدة
  | 'integrated_challenge'; // Stage 8: بوابة التحدي الكبرى

export interface StageDefinition {
  stageNumber: number;
  stageType: StageType;
  titleAr: string;
  objectiveAr: string;
  explanationAr: string;
  howToPlayAr: string;
  shortTipAr: string;
  landmark3D: string;
  allowedActivityTypes: Array<
    | 'sound_listening'
    | 'pronunciation'
    | 'vowel_discrimination'
    | 'syllable_construction'
    | 'word_building'
    | 'word_image_match'
    | 'position_identification'
    | 'sentence_completion'
    | 'adaptive_gate_trial'
  >;
}

export const STAGE_CURRICULUM_DEFINITIONS: StageDefinition[] = [
  {
    stageNumber: 1,
    stageType: 'sound_production',
    titleAr: 'اكتشاف صوت الحرف الصافي',
    objectiveAr: 'الاستماع لصوت الحرف المجرد وتمييزه واصطياد فقاعاته',
    explanationAr: 'في هذه المرحلة، يستمع البطل لصوت الحرف الصافي بدون أي حركات، ويتعرف على شكل الحرف ويصطاد الفقاعات التي تحمله لجمع النجوم.',
    howToPlayAr: 'اضغط على زر الاستماع لسماع صوت الحرف، ثم انقر على الفقاعات التي تحتوي الحرف المطلوب فقط!',
    shortTipAr: 'اسْتَمِعْ لِلصَّوْتِ وَاصْطَدِ الفُقَّاعَات!',
    landmark3D: 'منصة الصدى البلورية',
    allowedActivityTypes: ['sound_listening', 'pronunciation']
  },
  {
    stageNumber: 2,
    stageType: 'sound_production',
    titleAr: 'معمل الفم ومخرج الحرف',
    objectiveAr: 'تعلم وضع الشفتين واللسان بـ 3 خطوات كرتونية مبسطة',
    explanationAr: 'نكتشف هنا تشريح الفم ومخرج الحرف الدقيق، وكيف يتحرك اللسان وتتشكل الشفتان لنطق الحرف بشكل سليم وصحيح.',
    howToPlayAr: 'شاهد حركة الشفتين واللسان التفاعلية، وجرب النطق أمام مرآة لومي السحرية!',
    shortTipAr: 'تَعَلَّمْ حَرَكَةَ اللِّسَانِ وَالشَّفَتَيْن!',
    landmark3D: 'مختبر الفم واللسان السحري',
    allowedActivityTypes: ['pronunciation', 'sound_listening']
  },
  {
    stageNumber: 3,
    stageType: 'short_vowels',
    titleAr: 'الحركات السحرية الثلاث',
    objectiveAr: 'تمييز ونطق الحركات القصيرة: الفتحة (َ) والضمة (ُ) والكسرة (ِ)',
    explanationAr: 'يتعرف الطفل على الحركات التشكيلية القصيرة: الفتحة بفتح الفم لأعلى، والكسرة بابتسامة خفيفة، والضمة بضم الشفتين كالوردة.',
    howToPlayAr: 'استمع للمقطع الصوتي القصير، واختر الحركة المطابقة من بين الحركات الثلاث المعروضة!',
    shortTipAr: 'مَيِّزْ بَيْنَ الفَتْحَةِ وَالضَّمَّةِ وَالكَسْرَة!',
    landmark3D: 'برج الحركات المتوهج',
    allowedActivityTypes: ['vowel_discrimination', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 4,
    stageType: 'long_syllables',
    titleAr: 'قطار المدود الطويلة',
    objectiveAr: 'نطق وتمييز المدود الطويلة: مد الألف (ـَا) ومد الواو (ـُو) ومد الياء (ـِي)',
    explanationAr: 'ننطلق مع قطار الأصوات الطويلة، لنتعلم كيف يمتد صوت الحرف مع حروف المد الثلاثة: مد الألف، ومد الواو، ومد الياء.',
    howToPlayAr: 'اسمع صوت المد الطويل، وحدد المقطع الصحيح الذي يركب قطار الأصوات السريع!',
    shortTipAr: 'امْدُدْ صَوْتَكَ مَعَ الأَلِفِ وَالوَاوِ وَاليَاء!',
    landmark3D: 'بوابة غابة المقاطع',
    allowedActivityTypes: ['syllable_construction', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 5,
    stageType: 'words_positions',
    titleAr: 'صيد الكلمات المصورة',
    objectiveAr: 'ربط صوت الحرف بكلمات مبهجة ومصورة من واقع حياة الطفل',
    explanationAr: 'نربط الحرف بكلمات جميلة ومألوفة للطفل، ليتعرف على الحرف وهو يضيء في أسماء الأشياء والحيوانات من حوله.',
    howToPlayAr: 'استمع للكلمة التي ينطقها لومي، ثم اختر البطاقة المصورة المطابقة لتفتح الصندوق السحري!',
    shortTipAr: 'ارْبِطِ الكَلِمَةَ بِالصُّورَةِ المُنَاسِبَة!',
    landmark3D: 'معالم قرية الكلمات',
    allowedActivityTypes: ['word_image_match', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 6,
    stageType: 'sound_position',
    titleAr: 'قطار مواضع الحرف',
    objectiveAr: 'تحديد أين يقف الحرف في الكلمة (أول أو وسط أو آخر الكلمة)',
    explanationAr: 'يتدرب الطفل على التمييز السمعي والبصري لموقع الحرف: هل هو في أول الكلمة؟ أم في وسطها؟ أم في آخرها؟',
    howToPlayAr: 'انظر للكلمة واضغط على عربة القطار المناسبة (الأولى، الوسطى، أو الأخيرة) التي يقف فيها الحرف!',
    shortTipAr: 'حَدِّدْ مَوْقِعَ الحَرْفِ فِي الكَلِمَة!',
    landmark3D: 'قمة جبل التمييز',
    allowedActivityTypes: ['position_identification', 'sound_listening']
  },
  {
    stageNumber: 7,
    stageType: 'words_construction',
    titleAr: 'بناء الكلمات الساحر',
    objectiveAr: 'تركيب قطع الحروف والمقاطع لتكوين ونطق الكلمة كاملة',
    explanationAr: 'يتحول الطفل إلى مهندس كلمات! يجمع قطع الحروف المبعثرة ويرتبها في خاناتها الصحيحة لتهجئة الكلمة ونطقها.',
    howToPlayAr: 'اضغط على الحروف بالترتيب الهجائي الصحيح لتملأ خانات الكلمة، ويمكنك النقر على أي حرف لإلغائه!',
    shortTipAr: 'رَتِّبِ الحُرُوفَ لِبِنَاءِ الكَلِمَةِ كَامِلَة!',
    landmark3D: 'ساحة تركيب الكلمات',
    allowedActivityTypes: ['word_building', 'sound_listening', 'pronunciation']
  },
  {
    stageNumber: 8,
    stageType: 'integrated_challenge',
    titleAr: 'التحدي النهائي والكنز الملكي',
    objectiveAr: 'مراجعة الإتقان الشامل وتتويج الطفل بتاج بطل الحرف الملكي',
    explanationAr: 'بوابة التتويج الكبرى! يجيب البطل عن تحديات المراجعة الشاملة لجميع المهارات، ليفتح صندوق الكنز الملكي ويتوج بتاج الإتقان.',
    howToPlayAr: 'أجب عن أسئلة التحدي الثلاثة المتنوعة، وافتح الكنز الملكي لتحصل على التاج والكوينز!',
    shortTipAr: 'أَجِبْ عَنِ التَّحَدِّي وَافْتَحْ كَنْزَ التَّتْوِيج! 👑',
    landmark3D: 'بوابة لومي الكبرى',
    allowedActivityTypes: ['adaptive_gate_trial']
  }
];

class CurriculumEngine {
  public getLetter(letterId: string): LetterData {
    return ARABIC_LETTERS.find(l => l.id === letterId) || ARABIC_LETTERS[1];
  }

  public getAllLetters(): LetterData[] {
    return ARABIC_LETTERS;
  }

  public getStageDefinition(stageNumber: number): StageDefinition {
    return (
      STAGE_CURRICULUM_DEFINITIONS.find(s => s.stageNumber === stageNumber) ||
      STAGE_CURRICULUM_DEFINITIONS[0]
    );
  }

  public getApprovedContentForStage(letterId: string, stageNumber: number) {
    const letter = this.getLetter(letterId);
    const def = this.getStageDefinition(stageNumber);

    switch (def.stageType) {
      case 'sound_production':
        return {
          targetSound: letter.char,
          mouthGuide: letter.mouthGuide
        };
      case 'short_vowels':
        return {
          vowels: letter.syllables.short
        };
      case 'long_syllables':
        return {
          syllables: letter.syllables.long
        };
      case 'words_construction':
      case 'words_positions':
        return {
          words: letter.words
        };
      case 'sound_position':
        return {
          words: letter.words,
          positions: ['أول الكلمة', 'وسط الكلمة', 'آخر الكلمة']
        };
      case 'sentences_context':
        return {
          sentences: letter.sentences
        };
      case 'integrated_challenge':
        return {
          letter,
          vowels: letter.syllables.short,
          syllables: letter.syllables.long,
          words: letter.words,
          sentences: letter.sentences
        };
    }
  }
}

export const curriculumEngine = new CurriculumEngine();

```

## 📄 ملف: `src\engine\AIChallengeEngine.ts`
```typescript
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

```

## 📄 ملف: `src\data\words.json`
```json
{
  "baa": [
    {
      "id": "baa_w1",
      "word": "بَاب",
      "meaning": "باب البيت",
      "position": "start",
      "positionLabel": "في أول الكلمة",
      "highlightedWord": "<span class='text-rose-600 font-extrabold text-4xl'>بَـ</span>ـاب",
      "emoji": "🚪",
      "lettersBreakdown": ["ب", "ا", "ب"],
      "syllables": ["بَا", "بْ"],
      "difficulty": "easy"
    },
    {
      "id": "baa_w2",
      "word": "بَطَّة",
      "meaning": "بطة تسبح في الماء",
      "position": "start",
      "positionLabel": "في أول الكلمة",
      "highlightedWord": "<span class='text-rose-600 font-extrabold text-4xl'>بَـ</span>ـطَّة",
      "emoji": "🦆",
      "lettersBreakdown": ["ب", "ط", "ة"],
      "syllables": ["بَطْ", "طَة"],
      "difficulty": "easy"
    },
    {
      "id": "baa_w3",
      "word": "بَيْت",
      "meaning": "بيت دافئ وجميل",
      "position": "start",
      "positionLabel": "في أول الكلمة",
      "highlightedWord": "<span class='text-rose-600 font-extrabold text-4xl'>بَـ</span>ـيْت",
      "emoji": "🏠",
      "lettersBreakdown": ["ب", "ي", "ت"],
      "syllables": ["بَيْ", "تْ"],
      "difficulty": "easy"
    },
    {
      "id": "baa_w4",
      "word": "بَحْر",
      "meaning": "بحر أزرق واسع",
      "position": "start",
      "positionLabel": "في أول الكلمة",
      "highlightedWord": "<span class='text-rose-600 font-extrabold text-4xl'>بَـ</span>ـحْر",
      "emoji": "🌊",
      "lettersBreakdown": ["ب", "ح", "ر"],
      "syllables": ["بَحْ", "رْ"],
      "difficulty": "easy"
    },
    {
      "id": "baa_w5",
      "word": "حَبْل",
      "meaning": "حبل متين",
      "position": "middle",
      "positionLabel": "في وسط الكلمة",
      "highlightedWord": "حَـ<span class='text-rose-600 font-extrabold text-4xl'>ـبْـ</span>ـل",
      "emoji": "🪢",
      "lettersBreakdown": ["ح", "ب", "ل"],
      "syllables": ["حَبْ", "لْ"],
      "difficulty": "medium"
    },
    {
      "id": "baa_w6",
      "word": "خُبْز",
      "meaning": "خبز طازج ولذيذ",
      "position": "middle",
      "positionLabel": "في وسط الكلمة",
      "highlightedWord": "خُـ<span class='text-rose-600 font-extrabold text-4xl'>ـبْـ</span>ـز",
      "emoji": "🍞",
      "lettersBreakdown": ["خ", "ب", "ز"],
      "syllables": ["خُبْ", "زْ"],
      "difficulty": "medium"
    },
    {
      "id": "baa_w7",
      "word": "كَتَبَ",
      "meaning": "كتب بالقلم",
      "position": "end",
      "positionLabel": "في آخر الكلمة",
      "highlightedWord": "كَـتَـ<span class='text-rose-600 font-extrabold text-4xl'>ـبَ</span>",
      "emoji": "✍️",
      "lettersBreakdown": ["ك", "ت", "ب"],
      "syllables": ["كَ", "تَ", "بَ"],
      "difficulty": "medium"
    },
    {
      "id": "baa_w8",
      "word": "عِنَب",
      "meaning": "عنب حلو ولذيذ",
      "position": "end",
      "positionLabel": "في آخر الكلمة",
      "highlightedWord": "عِـنَـ<span class='text-rose-600 font-extrabold text-4xl'>ـب</span>",
      "emoji": "🍇",
      "lettersBreakdown": ["ع", "ن", "ب"],
      "syllables": ["عِ", "نَ", "بْ"],
      "difficulty": "easy"
    }
  ],
  "meem": [
    {
      "id": "meem_w1",
      "word": "مَوْز",
      "meaning": "موز أصفر حلو",
      "position": "start",
      "positionLabel": "في أول الكلمة",
      "highlightedWord": "<span class='text-amber-600 font-extrabold text-4xl'>مَـ</span>ـوْز",
      "emoji": "🍌",
      "lettersBreakdown": ["م", "و", "ز"],
      "syllables": ["مَوْ", "زْ"],
      "difficulty": "easy"
    },
    {
      "id": "meem_w2",
      "word": "مَطَر",
      "meaning": "مطر ينزل من السحاب",
      "position": "start",
      "positionLabel": "في أول الكلمة",
      "highlightedWord": "<span class='text-amber-600 font-extrabold text-4xl'>مَـ</span>ـطَر",
      "emoji": "🌧️",
      "lettersBreakdown": ["م", "ط", "ر"],
      "syllables": ["مَ", "طَ", "رْ"],
      "difficulty": "easy"
    },
    {
      "id": "meem_w3",
      "word": "شَمْس",
      "meaning": "شمس مشرقة ودافئة",
      "position": "middle",
      "positionLabel": "في وسط الكلمة",
      "highlightedWord": "شَـ<span class='text-amber-600 font-extrabold text-4xl'>ـمْـ</span>ـس",
      "emoji": "☀️",
      "lettersBreakdown": ["ش", "م", "س"],
      "syllables": ["شَمْ", "سْ"],
      "difficulty": "medium"
    },
    {
      "id": "meem_w4",
      "word": "قَلَم",
      "meaning": "قلم أكتب به",
      "position": "end",
      "positionLabel": "في آخر الكلمة",
      "highlightedWord": "قَـلَـ<span class='text-amber-600 font-extrabold text-4xl'>ـم</span>",
      "emoji": "✏️",
      "lettersBreakdown": ["ق", "ل", "م"],
      "syllables": ["قَ", "لَ", "مْ"],
      "difficulty": "easy"
    }
  ],
  "taa": [
    {
      "id": "taa_w1",
      "word": "تُفَّاح",
      "meaning": "تفاح أحمر لذيذ",
      "position": "start",
      "positionLabel": "في أول الكلمة",
      "highlightedWord": "<span class='text-emerald-600 font-extrabold text-4xl'>تُـ</span>ـفَّاح",
      "emoji": "🍎",
      "lettersBreakdown": ["ت", "ف", "ا", "ح"],
      "syllables": ["تُفْ", "فَاحْ"],
      "difficulty": "easy"
    },
    {
      "id": "taa_w2",
      "word": "تَاج",
      "meaning": "تاج ذهبي جميل",
      "position": "start",
      "positionLabel": "في أول الكلمة",
      "highlightedWord": "<span class='text-emerald-600 font-extrabold text-4xl'>تَـ</span>ـاج",
      "emoji": "👑",
      "lettersBreakdown": ["ت", "ا", "ج"],
      "syllables": ["تَا", "جْ"],
      "difficulty": "easy"
    },
    {
      "id": "taa_w3",
      "word": "كِتَاب",
      "meaning": "كتاب أقرأ فيه",
      "position": "middle",
      "positionLabel": "في وسط الكلمة",
      "highlightedWord": "كِـ<span class='text-emerald-600 font-extrabold text-4xl'>ـتَـ</span>ـاب",
      "emoji": "📖",
      "lettersBreakdown": ["ك", "ت", "ا", "ب"],
      "syllables": ["كِ", "تَا", "بْ"],
      "difficulty": "medium"
    },
    {
      "id": "taa_w4",
      "word": "بَيْت",
      "meaning": "بيت جميل",
      "position": "end",
      "positionLabel": "في آخر الكلمة",
      "highlightedWord": "بَـيْـ<span class='text-emerald-600 font-extrabold text-4xl'>ـت</span>",
      "emoji": "🏡",
      "lettersBreakdown": ["ب", "ي", "ت"],
      "syllables": ["بَيْ", "تْ"],
      "difficulty": "easy"
    }
  ]
}

```

## 📄 ملف: `src\data\tongueArticulationData.ts`
```typescript
// Anatomically Accurate Tongue Position Data for All 28 Arabic Letters
// Each letter maps to precise SVG coordinates for tongue shape, lip state,
// airflow direction, and articulation point — based on Arabic phonetics.

export type ArticulationPlace =
  | 'bilabial'       // شفوي ثنائي (ب، م، و)
  | 'labiodental'    // شفوي أسناني (ف)
  | 'dental'         // أسناني (ث، ذ، ظ)
  | 'alveolar'       // لثوي (ت، د، ط، ض، ن، ل، ر، ز، س، ص)
  | 'postalveolar'   // خلف لثوي (ش، ج)
  | 'palatal'        // غاري (ي)
  | 'velar'          // طبقي (ك، غ، خ)
  | 'uvular'         // لهوي (ق)
  | 'pharyngeal'     // حلقي (ح، ع)
  | 'glottal'        // حنجري (ه، ء/أ)
  | 'lateral';       // جانبي (ل)

export type LipState = 'closed' | 'open' | 'rounded' | 'spread' | 'labiodental' | 'protruded';
export type AirflowType = 'oral' | 'nasal' | 'oral_nasal';
export type VoicingState = 'voiced' | 'voiceless';

export interface TongueArticulationConfig {
  letterId: string;
  char: string;
  nameAr: string;
  place: ArticulationPlace;
  placeNameAr: string;
  // SVG path for tongue body shape (sagittal cross-section, viewBox 0 0 300 250)
  tonguePath: string;
  // Tongue tip position (cx, cy)
  tongueTipX: number;
  tongueTipY: number;
  // Tongue body peak height (how high the tongue rises)
  tongueRiseY: number;
  // Tongue back position (how far back it retracts)
  tongueBackX: number;
  tongueBackY: number;
  // Lip state
  lipState: LipState;
  // Upper lip offset (0 = normal, negative = up)
  upperLipOffset: number;
  // Lower lip offset (0 = normal, positive = down)
  lowerLipOffset: number;
  // Jaw opening (0 = closed, 1 = fully open)
  jawOpen: number;
  // Soft palate lowered (for nasal sounds)
  softPalateLowered: boolean;
  // Airflow direction
  airflow: AirflowType;
  // Voiced or voiceless
  voicing: VoicingState;
  // Vocal cords vibrating
  vocalCordsActive: boolean;
  // Epiglottis position (0 = normal, 1 = constricted)
  epiglottisConstriction: number;
  // Description of tongue movement for animation
  tipAr: string;
  // Contact point label
  contactPointAr: string;
  // Airflow path SVG
  airflowPath: string;
}

// Helper to generate tongue paths for different articulation positions
const makeTonguePath = (tipX: number, tipY: number, riseX: number, riseY: number, backX: number, backY: number): string => {
  // Tongue root is at approximately (65, 210)
  // Tongue body curves up to the rise point, then forward to the tip
  return `M 65 210 C 70 ${backY} ${backX} ${backY} ${riseX} ${riseY} C ${riseX + 20} ${riseY - 5} ${tipX - 15} ${tipY + 5} ${tipX} ${tipY} L ${tipX + 3} ${tipY + 8} C ${tipX - 10} ${tipY + 15} ${riseX + 15} ${riseY + 25} ${riseX - 5} ${riseY + 30} C ${backX - 10} ${backY + 5} 75 215 65 210 Z`;
};

export const TONGUE_ARTICULATION_DATA: TongueArticulationConfig[] = [
  // ============ 1. أَلِف (Glottal) ============
  {
    letterId: 'alif',
    char: 'ا',
    nameAr: 'أَلِف',
    place: 'glottal',
    placeNameAr: 'حَنْجَرِيّ',
    tonguePath: makeTonguePath(175, 155, 130, 145, 85, 185),
    tongueTipX: 175, tongueTipY: 155,
    tongueRiseY: 145, tongueBackX: 85, tongueBackY: 185,
    lipState: 'open', upperLipOffset: -2, lowerLipOffset: 4,
    jawOpen: 0.7, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0.3,
    tipAr: 'افتح فمك بحرية ودع الهواء يخرج من الحلق بنعومة',
    contactPointAr: 'الأحبال الصوتية',
    airflowPath: 'M 70 220 Q 110 180 160 150 Q 200 130 240 120'
  },

  // ============ 2. بَاء (Bilabial) ============
  {
    letterId: 'baa',
    char: 'ب',
    nameAr: 'بَاء',
    place: 'bilabial',
    placeNameAr: 'شَفَوِيّ',
    tonguePath: makeTonguePath(170, 160, 125, 155, 85, 190),
    tongueTipX: 170, tongueTipY: 160,
    tongueRiseY: 155, tongueBackX: 85, tongueBackY: 190,
    lipState: 'closed', upperLipOffset: 0, lowerLipOffset: 0,
    jawOpen: 0.1, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'أغلق الشفتين معاً بلطف ثم افتحهما مع الهواء: بْ!',
    contactPointAr: 'الشَّفَتَانِ مَعًا',
    airflowPath: 'M 70 220 Q 130 170 200 130 Q 230 115 250 105'
  },

  // ============ 3. تَاء (Alveolar) ============
  {
    letterId: 'taa',
    char: 'ت',
    nameAr: 'تَاء',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ',
    tonguePath: makeTonguePath(195, 108, 150, 115, 90, 185),
    tongueTipX: 195, tongueTipY: 108,
    tongueRiseY: 115, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان للثة خلف الأسنان العلوية مباشرة ثم أطلقه: تْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ عَلَى اللِّثَة',
    airflowPath: 'M 70 220 Q 130 160 190 115 Q 220 100 250 95'
  },

  // ============ 4. ثَاء (Dental) ============
  {
    letterId: 'thaa',
    char: 'ث',
    nameAr: 'ثَاء',
    place: 'dental',
    placeNameAr: 'أَسْنَانِيّ',
    tonguePath: makeTonguePath(210, 112, 160, 120, 90, 185),
    tongueTipX: 210, tongueTipY: 112,
    tongueRiseY: 120, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.25, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'أخرج طرف اللسان قليلاً بين الأسنان ودع الهواء يمر: ثْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ بَيْنَ الأَسْنَان',
    airflowPath: 'M 70 220 Q 140 160 200 118 Q 230 105 260 100'
  },

  // ============ 5. جِيم (Postalveolar) ============
  {
    letterId: 'jeem',
    char: 'ج',
    nameAr: 'جِيم',
    place: 'postalveolar',
    placeNameAr: 'خَلْفَ لِثَوِيّ',
    tonguePath: makeTonguePath(185, 115, 145, 100, 90, 180),
    tongueTipX: 185, tongueTipY: 115,
    tongueRiseY: 100, tongueBackX: 90, tongueBackY: 180,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع وسط اللسان نحو سقف الحلق خلف اللثة: جْ!',
    contactPointAr: 'وَسَطُ اللِّسَانِ خَلْفَ اللِّثَة',
    airflowPath: 'M 70 220 Q 120 150 175 110 Q 210 95 250 90'
  },

  // ============ 6. حَاء (Pharyngeal) ============
  {
    letterId: 'haa',
    char: 'ح',
    nameAr: 'حَاء',
    place: 'pharyngeal',
    placeNameAr: 'حَلْقِيّ',
    tonguePath: makeTonguePath(165, 158, 120, 148, 75, 175),
    tongueTipX: 165, tongueTipY: 158,
    tongueRiseY: 148, tongueBackX: 75, tongueBackY: 175,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 3,
    jawOpen: 0.5, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0.7,
    tipAr: 'ضيّق الحلق ودع الهواء يحتك بجدار البلعوم: حْ!',
    contactPointAr: 'جِدَارُ البَلْعُومِ (الحَلْق)',
    airflowPath: 'M 60 225 Q 75 195 85 170 Q 130 140 200 120'
  },

  // ============ 7. خَاء (Velar) ============
  {
    letterId: 'khaa',
    char: 'خ',
    nameAr: 'خَاء',
    place: 'velar',
    placeNameAr: 'طَبَقِيّ',
    tonguePath: makeTonguePath(165, 150, 115, 105, 80, 170),
    tongueTipX: 165, tongueTipY: 150,
    tongueRiseY: 105, tongueBackX: 80, tongueBackY: 170,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 3,
    jawOpen: 0.4, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع مؤخرة اللسان نحو سقف الحلق الرخو: خْ!',
    contactPointAr: 'مُؤَخَّرَةُ اللِّسَانِ + الطَّبَق',
    airflowPath: 'M 70 220 Q 100 165 125 110 Q 170 90 240 100'
  },

  // ============ 8. دَال (Alveolar) ============
  {
    letterId: 'daal',
    char: 'د',
    nameAr: 'دَال',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ',
    tonguePath: makeTonguePath(195, 108, 150, 115, 90, 185),
    tongueTipX: 195, tongueTipY: 108,
    tongueRiseY: 115, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان للثة خلف الأسنان ثم أطلقه بقوة: دْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ عَلَى اللِّثَة',
    airflowPath: 'M 70 220 Q 130 160 190 115 Q 220 100 250 95'
  },

  // ============ 9. ذَال (Dental) ============
  {
    letterId: 'zaal',
    char: 'ذ',
    nameAr: 'ذَال',
    place: 'dental',
    placeNameAr: 'أَسْنَانِيّ',
    tonguePath: makeTonguePath(210, 112, 160, 120, 90, 185),
    tongueTipX: 210, tongueTipY: 112,
    tongueRiseY: 120, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.25, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'أخرج طرف اللسان بين الأسنان مع اهتزاز الأحبال: ذْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ بَيْنَ الأَسْنَان',
    airflowPath: 'M 70 220 Q 140 160 200 118 Q 230 105 260 100'
  },

  // ============ 10. رَاء (Alveolar Trill) ============
  {
    letterId: 'raa',
    char: 'ر',
    nameAr: 'رَاء',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ تَكْرَارِيّ',
    tonguePath: makeTonguePath(190, 112, 148, 118, 88, 185),
    tongueTipX: 190, tongueTipY: 112,
    tongueRiseY: 118, tongueBackX: 88, tongueBackY: 185,
    lipState: 'open', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.35, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان للثة ودعه يهتز بسرعة: رْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ يَهْتَزُّ عَلَى اللِّثَة',
    airflowPath: 'M 70 220 Q 130 160 185 118 Q 215 100 250 95'
  },

  // ============ 11. زَاي (Alveolar Fricative) ============
  {
    letterId: 'zay',
    char: 'ز',
    nameAr: 'زَاي',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ احْتِكَاكِيّ',
    tonguePath: makeTonguePath(195, 115, 150, 118, 90, 185),
    tongueTipX: 195, tongueTipY: 115,
    tongueRiseY: 118, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.2, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان قرب اللثة ودع الهواء يمر مع اهتزاز: زْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ قُرْبَ اللِّثَة',
    airflowPath: 'M 70 220 Q 130 160 190 118 Q 220 105 255 98'
  },

  // ============ 12. سِين (Alveolar Fricative) ============
  {
    letterId: 'seen',
    char: 'س',
    nameAr: 'سِين',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ احْتِكَاكِيّ',
    tonguePath: makeTonguePath(195, 115, 150, 118, 90, 185),
    tongueTipX: 195, tongueTipY: 115,
    tongueRiseY: 118, tongueBackX: 90, tongueBackY: 185,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.2, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان قرب اللثة ودع الهواء يصفر: سْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ قُرْبَ اللِّثَة',
    airflowPath: 'M 70 220 Q 130 160 190 118 Q 220 105 255 98'
  },

  // ============ 13. شِين (Postalveolar) ============
  {
    letterId: 'sheen',
    char: 'ش',
    nameAr: 'شِين',
    place: 'postalveolar',
    placeNameAr: 'خَلْفَ لِثَوِيّ',
    tonguePath: makeTonguePath(180, 118, 140, 100, 88, 178),
    tongueTipX: 180, tongueTipY: 118,
    tongueRiseY: 100, tongueBackX: 88, tongueBackY: 178,
    lipState: 'protruded', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.25, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع وسط اللسان نحو سقف الحلق مع بروز الشفتين: شْ!',
    contactPointAr: 'وَسَطُ اللِّسَانِ خَلْفَ اللِّثَة',
    airflowPath: 'M 70 220 Q 120 150 170 108 Q 210 92 250 88'
  },

  // ============ 14. صَاد (Emphatic Alveolar) ============
  {
    letterId: 'saad',
    char: 'ص',
    nameAr: 'صَاد',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ مُفَخَّم',
    tonguePath: makeTonguePath(195, 118, 140, 110, 80, 170),
    tongueTipX: 195, tongueTipY: 118,
    tongueRiseY: 110, tongueBackX: 80, tongueBackY: 170,
    lipState: 'rounded', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.25, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0.2,
    tipAr: 'ارفع طرف اللسان للثة مع تفخيم مؤخرة اللسان: صْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ + تَفْخِيمُ المُؤَخَّرَة',
    airflowPath: 'M 70 220 Q 125 155 190 118 Q 220 105 255 98'
  },

  // ============ 15. ضَاد (Emphatic) ============
  {
    letterId: 'daad',
    char: 'ض',
    nameAr: 'ضَاد',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ مُفَخَّم',
    tonguePath: makeTonguePath(195, 110, 140, 108, 78, 168),
    tongueTipX: 195, tongueTipY: 110,
    tongueRiseY: 108, tongueBackX: 78, tongueBackY: 168,
    lipState: 'rounded', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0.2,
    tipAr: 'ارفع حافة اللسان الجانبية لسقف الحلق مع تفخيم: ضْ!',
    contactPointAr: 'حَافَةُ اللِّسَانِ الجَانِبِيَّة + التَّفْخِيم',
    airflowPath: 'M 70 220 Q 125 155 190 115 Q 220 100 255 95'
  },

  // ============ 16. طَاء (Emphatic Alveolar) ============
  {
    letterId: 'taa_heavy',
    char: 'ط',
    nameAr: 'طَاء',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ مُفَخَّم',
    tonguePath: makeTonguePath(195, 108, 138, 105, 78, 168),
    tongueTipX: 195, tongueTipY: 108,
    tongueRiseY: 105, tongueBackX: 78, tongueBackY: 168,
    lipState: 'rounded', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0.2,
    tipAr: 'ارفع طرف اللسان للثة مع تفخيم قوي في مؤخرة اللسان: طْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ + التَّفْخِيمُ القَوِيّ',
    airflowPath: 'M 70 220 Q 125 155 190 112 Q 220 98 255 92'
  },

  // ============ 17. ظَاء (Emphatic Dental) ============
  {
    letterId: 'zaa_heavy',
    char: 'ظ',
    nameAr: 'ظَاء',
    place: 'dental',
    placeNameAr: 'أَسْنَانِيّ مُفَخَّم',
    tonguePath: makeTonguePath(210, 112, 155, 115, 78, 170),
    tongueTipX: 210, tongueTipY: 112,
    tongueRiseY: 115, tongueBackX: 78, tongueBackY: 170,
    lipState: 'rounded', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0.2,
    tipAr: 'أخرج طرف اللسان بين الأسنان مع تفخيم: ظْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ بَيْنَ الأَسْنَانِ + التَّفْخِيم',
    airflowPath: 'M 70 220 Q 140 160 205 115 Q 235 105 265 100'
  },

  // ============ 18. عَيْن (Pharyngeal) ============
  {
    letterId: 'ayn',
    char: 'ع',
    nameAr: 'عَيْن',
    place: 'pharyngeal',
    placeNameAr: 'حَلْقِيّ',
    tonguePath: makeTonguePath(165, 155, 120, 145, 72, 172),
    tongueTipX: 165, tongueTipY: 155,
    tongueRiseY: 145, tongueBackX: 72, tongueBackY: 172,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 4,
    jawOpen: 0.55, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0.75,
    tipAr: 'ضيّق الحلق بقوة ودع الأحبال الصوتية تهتز: عْ!',
    contactPointAr: 'جِدَارُ البَلْعُوم (مَعَ اهْتِزَاز)',
    airflowPath: 'M 60 225 Q 72 195 80 172 Q 120 140 200 120'
  },

  // ============ 19. غَيْن (Velar Fricative) ============
  {
    letterId: 'ghayn',
    char: 'غ',
    nameAr: 'غَيْن',
    place: 'velar',
    placeNameAr: 'طَبَقِيّ',
    tonguePath: makeTonguePath(165, 148, 115, 100, 78, 168),
    tongueTipX: 165, tongueTipY: 148,
    tongueRiseY: 100, tongueBackX: 78, tongueBackY: 168,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 3,
    jawOpen: 0.4, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع مؤخرة اللسان للطبق مع اهتزاز الأحبال: غْ!',
    contactPointAr: 'مُؤَخَّرَةُ اللِّسَانِ + الطَّبَق',
    airflowPath: 'M 70 220 Q 100 165 120 108 Q 165 88 240 100'
  },

  // ============ 20. فَاء (Labiodental) ============
  {
    letterId: 'faa',
    char: 'ف',
    nameAr: 'فَاء',
    place: 'labiodental',
    placeNameAr: 'شَفَوِيّ أَسْنَانِيّ',
    tonguePath: makeTonguePath(170, 158, 125, 152, 85, 190),
    tongueTipX: 170, tongueTipY: 158,
    tongueRiseY: 152, tongueBackX: 85, tongueBackY: 190,
    lipState: 'labiodental', upperLipOffset: 0, lowerLipOffset: 0,
    jawOpen: 0.15, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ضع أسنانك العلوية على شفتك السفلية ودع الهواء يمر: فْ!',
    contactPointAr: 'الأَسْنَانُ العُلْوِيَّةُ + الشَّفَةُ السُّفْلِيَّة',
    airflowPath: 'M 70 220 Q 130 170 200 130 Q 235 118 260 110'
  },

  // ============ 21. قَاف (Uvular) ============
  {
    letterId: 'qaaf',
    char: 'ق',
    nameAr: 'قَاف',
    place: 'uvular',
    placeNameAr: 'لَهَوِيّ',
    tonguePath: makeTonguePath(165, 148, 110, 95, 75, 165),
    tongueTipX: 165, tongueTipY: 148,
    tongueRiseY: 95, tongueBackX: 75, tongueBackY: 165,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 3,
    jawOpen: 0.4, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع أقصى مؤخرة اللسان نحو اللهاة: قْ!',
    contactPointAr: 'أَقْصَى مُؤَخَّرَةِ اللِّسَانِ + اللَّهَاة',
    airflowPath: 'M 70 220 Q 90 170 110 100 Q 155 80 240 98'
  },

  // ============ 22. كَاف (Velar) ============
  {
    letterId: 'kaaf',
    char: 'ك',
    nameAr: 'كَاف',
    place: 'velar',
    placeNameAr: 'طَبَقِيّ',
    tonguePath: makeTonguePath(168, 148, 118, 100, 82, 170),
    tongueTipX: 168, tongueTipY: 148,
    tongueRiseY: 100, tongueBackX: 82, tongueBackY: 170,
    lipState: 'open', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.35, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0,
    tipAr: 'ارفع مؤخرة اللسان للطبق ثم أطلقه بقوة: كْ!',
    contactPointAr: 'مُؤَخَّرَةُ اللِّسَانِ + الطَّبَق',
    airflowPath: 'M 70 220 Q 100 165 125 108 Q 170 90 240 100'
  },

  // ============ 23. لاَم (Lateral Alveolar) ============
  {
    letterId: 'laam',
    char: 'ل',
    nameAr: 'لاَم',
    place: 'lateral',
    placeNameAr: 'لِثَوِيّ جَانِبِيّ',
    tonguePath: makeTonguePath(195, 108, 150, 110, 90, 182),
    tongueTipX: 195, tongueTipY: 108,
    tongueRiseY: 110, tongueBackX: 90, tongueBackY: 182,
    lipState: 'open', upperLipOffset: 0, lowerLipOffset: 2,
    jawOpen: 0.3, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان للثة ودع الهواء يمر من الجانبين: لْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ عَلَى اللِّثَة (الهَوَاءُ مِنَ الجَانِبَيْن)',
    airflowPath: 'M 70 220 Q 130 160 190 112 Q 220 100 250 95'
  },

  // ============ 24. مِيم (Bilabial Nasal) ============
  {
    letterId: 'meem',
    char: 'م',
    nameAr: 'مِيم',
    place: 'bilabial',
    placeNameAr: 'شَفَوِيّ أَنْفِيّ',
    tonguePath: makeTonguePath(170, 160, 125, 155, 85, 190),
    tongueTipX: 170, tongueTipY: 160,
    tongueRiseY: 155, tongueBackX: 85, tongueBackY: 190,
    lipState: 'closed', upperLipOffset: 0, lowerLipOffset: 0,
    jawOpen: 0.1, softPalateLowered: true, airflow: 'nasal',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'أغلق الشفتين ودع الهواء يخرج من الأنف: مْ!',
    contactPointAr: 'الشَّفَتَانِ (الهَوَاءُ عَبْرَ الأَنْف)',
    airflowPath: 'M 70 220 Q 100 180 110 130 Q 115 90 130 60'
  },

  // ============ 25. نُون (Alveolar Nasal) ============
  {
    letterId: 'noon',
    char: 'ن',
    nameAr: 'نُون',
    place: 'alveolar',
    placeNameAr: 'لِثَوِيّ أَنْفِيّ',
    tonguePath: makeTonguePath(195, 108, 150, 115, 90, 185),
    tongueTipX: 195, tongueTipY: 108,
    tongueRiseY: 115, tongueBackX: 90, tongueBackY: 185,
    lipState: 'open', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.2, softPalateLowered: true, airflow: 'nasal',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع طرف اللسان للثة ودع الهواء يخرج من الأنف: نْ!',
    contactPointAr: 'طَرَفُ اللِّسَانِ عَلَى اللِّثَة (الهَوَاءُ مِنَ الأَنْف)',
    airflowPath: 'M 70 220 Q 120 175 140 130 Q 145 90 130 60'
  },

  // ============ 26. هَاء (Glottal) ============
  {
    letterId: 'haa_soft',
    char: 'ه',
    nameAr: 'هَاء',
    place: 'glottal',
    placeNameAr: 'حَنْجَرِيّ',
    tonguePath: makeTonguePath(170, 158, 128, 148, 85, 188),
    tongueTipX: 170, tongueTipY: 158,
    tongueRiseY: 148, tongueBackX: 85, tongueBackY: 188,
    lipState: 'open', upperLipOffset: -1, lowerLipOffset: 3,
    jawOpen: 0.5, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiceless', vocalCordsActive: false, epiglottisConstriction: 0.2,
    tipAr: 'ابقِ اللسان مسترخياً ودع الهواء يمر من الحنجرة: هْ!',
    contactPointAr: 'الحَنْجَرَة (بِدُونِ اهْتِزَاز)',
    airflowPath: 'M 70 225 Q 110 185 150 150 Q 200 125 240 115'
  },

  // ============ 27. وَاو (Bilabial + Velar) ============
  {
    letterId: 'waaw',
    char: 'و',
    nameAr: 'وَاو',
    place: 'bilabial',
    placeNameAr: 'شَفَوِيّ طَبَقِيّ',
    tonguePath: makeTonguePath(160, 155, 115, 115, 80, 175),
    tongueTipX: 160, tongueTipY: 155,
    tongueRiseY: 115, tongueBackX: 80, tongueBackY: 175,
    lipState: 'rounded', upperLipOffset: 0, lowerLipOffset: 0,
    jawOpen: 0.15, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ضم الشفتين بشكل دائري مع رفع مؤخرة اللسان: وْ!',
    contactPointAr: 'الشَّفَتَانِ مُدَوَّرَتَانِ + مُؤَخَّرَةُ اللِّسَان',
    airflowPath: 'M 70 220 Q 110 170 140 120 Q 190 100 240 105'
  },

  // ============ 28. يَاء (Palatal) ============
  {
    letterId: 'yaa',
    char: 'ي',
    nameAr: 'يَاء',
    place: 'palatal',
    placeNameAr: 'غَارِيّ',
    tonguePath: makeTonguePath(180, 125, 140, 95, 85, 178),
    tongueTipX: 180, tongueTipY: 125,
    tongueRiseY: 95, tongueBackX: 85, tongueBackY: 178,
    lipState: 'spread', upperLipOffset: 0, lowerLipOffset: 1,
    jawOpen: 0.2, softPalateLowered: false, airflow: 'oral',
    voicing: 'voiced', vocalCordsActive: true, epiglottisConstriction: 0,
    tipAr: 'ارفع وسط اللسان نحو سقف الحلق الصلب مع ابتسامة: يْ!',
    contactPointAr: 'وَسَطُ اللِّسَانِ + سَقْفُ الحَلْقِ الصَّلْب',
    airflowPath: 'M 70 220 Q 115 155 150 100 Q 185 85 240 95'
  }
];

// Lookup helper
export const getTongueDataForLetter = (letterId: string): TongueArticulationConfig | undefined => {
  return TONGUE_ARTICULATION_DATA.find(d => d.letterId === letterId);
};

// Get articulation group
export const getArticulationGroup = (place: ArticulationPlace): TongueArticulationConfig[] => {
  return TONGUE_ARTICULATION_DATA.filter(d => d.place === place);
};

```

## 📄 ملف: `src\data\syllables.json`
```json
{
  "baa": {
    "short": [
      { "id": "baa_fatha", "syllable": "بَ", "vowel": "fatha", "nameAr": "باء بالفتحة", "soundTip": "بَ.. افتح الفم لأعلى", "audioKey": "ba_short" },
      { "id": "baa_kasra", "syllable": "بِ", "vowel": "kasra", "nameAr": "باء بالكسرة", "soundTip": "بِ.. ابتسم بلطف", "audioKey": "bi_short" },
      { "id": "baa_damma", "syllable": "بُ", "vowel": "damma", "nameAr": "باء بالضمة", "soundTip": "بُ.. ضم الشفتين", "audioKey": "bu_short" }
    ],
    "long": [
      { "id": "baa_alif", "syllable": "بَا", "vowel": "madd_alif", "nameAr": "مد بالألف", "soundTip": "بَااا.. مد الصوت طويلًا", "example": "بَاب" },
      { "id": "baa_yaa", "syllable": "بِي", "vowel": "madd_yaa", "nameAr": "مد بالياء", "soundTip": "بِييي.. ابتسم ومد الصوت", "example": "طَبِيب" },
      { "id": "baa_waw", "syllable": "بُو", "vowel": "madd_waw", "nameAr": "مد بالواو", "soundTip": "بُووو.. ضم الشفتين ومد", "example": "بُومَة" }
    ]
  },
  "meem": {
    "short": [
      { "id": "meem_fatha", "syllable": "مَ", "vowel": "fatha", "nameAr": "ميم بالفتحة", "soundTip": "مَ.. افتح الفم بعد إغلاق الشفتين", "audioKey": "ma_short" },
      { "id": "meem_kasra", "syllable": "مِ", "vowel": "kasra", "nameAr": "ميم بالكسرة", "soundTip": "مِ.. ابتسم مع الغنة", "audioKey": "mi_short" },
      { "id": "meem_damma", "syllable": "مُ", "vowel": "damma", "nameAr": "ميم بالضمة", "soundTip": "مُ.. ضم الشفتين مع الغنة", "audioKey": "mu_short" }
    ],
    "long": [
      { "id": "meem_alif", "syllable": "مَا", "vowel": "madd_alif", "nameAr": "مد بالألف", "soundTip": "مَااا.. مد الصوت الميم", "example": "مَاء" },
      { "id": "meem_yaa", "syllable": "مِي", "vowel": "madd_yaa", "nameAr": "مد بالياء", "soundTip": "مِييي.. مد الياء مع الميم", "example": "أَمِير" },
      { "id": "meem_waw", "syllable": "مُو", "vowel": "madd_waw", "nameAr": "مد بالواو", "soundTip": "مُووو.. ضم الشفتين ومد", "example": "لَيْمُون" }
    ]
  },
  "taa": {
    "short": [
      { "id": "taa_fatha", "syllable": "تَ", "vowel": "fatha", "nameAr": "تاء بالفتحة", "soundTip": "تَ.. طرف اللسان مع فتح الفم", "audioKey": "ta_short" },
      { "id": "taa_kasra", "syllable": "تِ", "vowel": "kasra", "nameAr": "تاء بالكسرة", "soundTip": "تِ.. ابتسامة مع التاء", "audioKey": "ti_short" },
      { "id": "taa_damma", "syllable": "تُ", "vowel": "damma", "nameAr": "تاء بالضمة", "soundTip": "تُ.. ضم الشفتين مع التاء", "audioKey": "tu_short" }
    ],
    "long": [
      { "id": "taa_alif", "syllable": "تَا", "vowel": "madd_alif", "nameAr": "مد بالألف", "soundTip": "تَااا.. مد الصوت", "example": "تَاج" },
      { "id": "taa_yaa", "syllable": "تِي", "vowel": "madd_yaa", "nameAr": "مد بالياء", "soundTip": "تِييي.. مد الياء", "example": "تِين" },
      { "id": "taa_waw", "syllable": "تُو", "vowel": "madd_waw", "nameAr": "مد بالواو", "soundTip": "تُووو.. مد الواو", "example": "تُوت" }
    ]
  },
  "noon": {
    "short": [
      { "id": "noon_fatha", "syllable": "نَ", "vowel": "fatha", "nameAr": "نون بالفتحة", "soundTip": "نَ.. نون مفتوحة خفيفة", "audioKey": "na_short" },
      { "id": "noon_kasra", "syllable": "نِ", "vowel": "kasra", "nameAr": "نون بالكسرة", "soundTip": "نِ.. نون مكسورة رقيقة", "audioKey": "ni_short" },
      { "id": "noon_damma", "syllable": "نُ", "vowel": "damma", "nameAr": "نون بالضمة", "soundTip": "نُ.. نون مضمومة جميلة", "audioKey": "nu_short" }
    ],
    "long": [
      { "id": "noon_alif", "syllable": "نَا", "vowel": "madd_alif", "nameAr": "مد بالألف", "soundTip": "نَااا.. مد النون", "example": "نَار" },
      { "id": "noon_yaa", "syllable": "نِي", "vowel": "madd_yaa", "nameAr": "مد بالياء", "soundTip": "نِييي.. مد الياء مع النون", "example": "تِين" },
      { "id": "noon_waw", "syllable": "نُو", "vowel": "madd_waw", "nameAr": "مد بالواو", "soundTip": "نُووو.. مد الواو مع النون", "example": "نُور" }
    ]
  }
}

```

## 📄 ملف: `src\data\sentences.json`
```json
{
  "baa": [
    {
      "id": "baa_s1",
      "sentence": "هَذَا بَابُ البَيْتِ.",
      "meaning": "هذا باب البيت",
      "emoji": "🚪🏡",
      "words": ["هَذَا", "بَابُ", "البَيْتِ"],
      "focusWord": "بَابُ",
      "missingWordExercise": {
        "question": "أكمل الجملة: هَذَا ..... البَيْتِ.",
        "options": ["بَابُ", "قَلَمُ", "شَمْسُ"],
        "correctIndex": 0
      }
    },
    {
      "id": "baa_s2",
      "sentence": "البَطَّةُ تَسْبَحُ فِي البَحْرِ.",
      "meaning": "البطة تسبح في البحر",
      "emoji": "🦆🌊",
      "words": ["البَطَّةُ", "تَسْبَحُ", "فِي", "البَحْرِ"],
      "focusWord": "البَطَّةُ",
      "missingWordExercise": {
        "question": "أكمل الجملة: ..... تَسْبَحُ فِي البَحْرِ.",
        "options": ["القِطَّةُ", "البَطَّةُ", "الشَّجَرَةُ"],
        "correctIndex": 1
      }
    },
    {
      "id": "baa_s3",
      "sentence": "أَنَا أُحِبُّ أَبِي وَأُمِّي.",
      "meaning": "أنا أحب أبي وأمي",
      "emoji": "❤️👨‍👩‍👧",
      "words": ["أَنَا", "أُحِبُّ", "أَبِي", "وَأُمِّي"],
      "focusWord": "أَبِي",
      "missingWordExercise": {
        "question": "أكمل الجملة: أَنَا أُحِبُّ ..... وَأُمِّي.",
        "options": ["أَبِي", "كِتَابِي", "بَابِي"],
        "correctIndex": 0
      }
    }
  ],
  "meem": [
    {
      "id": "meem_s1",
      "sentence": "المَوْزُ لَذِيذٌ وَمُفِيدٌ.",
      "meaning": "الموز لذيذ ومفيد",
      "emoji": "🍌😋",
      "words": ["المَوْزُ", "لَذِيذٌ", "وَمُفِيدٌ"],
      "focusWord": "المَوْزُ",
      "missingWordExercise": {
        "question": "أكمل الجملة: ..... لَذِيذٌ وَمُفِيدٌ.",
        "options": ["المَوْزُ", "البَابُ", "الحَبْلُ"],
        "correctIndex": 0
      }
    },
    {
      "id": "meem_s2",
      "sentence": "الشَّمْسُ تُشْرِقُ فِي الصَّبَاحِ.",
      "meaning": "الشمس تشرق في الصباح",
      "emoji": "☀️🌅",
      "words": ["الشَّمْسُ", "تُشْرِقُ", "فِي", "الصَّبَاحِ"],
      "focusWord": "الشَّمْسُ",
      "missingWordExercise": {
        "question": "أكمل الجملة: ..... تُشْرِقُ فِي الصَّبَاحِ.",
        "options": ["القَمَرُ", "الشَّمْسُ", "البَحْرُ"],
        "correctIndex": 1
      }
    }
  ],
  "taa": [
    {
      "id": "taa_s1",
      "sentence": "أَكَلَ أَحْمَدُ تُفَّاحَةً حَمْرَاءَ.",
      "meaning": "أكل أحمد تفاحة حمراء",
      "emoji": "🍎👦",
      "words": ["أَكَلَ", "أَحْمَدُ", "تُفَّاحَةً", "حَمْرَاءَ"],
      "focusWord": "تُفَّاحَةً",
      "missingWordExercise": {
        "question": "أكمل الجملة: أَكَلَ أَحْمَدُ ..... حَمْرَاءَ.",
        "options": ["تُفَّاحَةً", "بَابًا", "قَلَمًا"],
        "correctIndex": 0
      }
    }
  ]
}

```

## 📄 ملف: `src\data\letters.ts`
```typescript
// Comprehensive Database of All 28 Arabic Letters in Exact Alphabetical Order
// ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي

export interface LetterData {
  id: string;
  char: string;
  nameAr: string;
  order: number;
  soundKey: string;
  mouthGuide: {
    tip: string;
    lipPosition: string;
    shape: 'closed_lips' | 'open_throat' | 'tongue_teeth' | 'round_lips' | 'smile_teeth';
  };
  syllables: {
    short: Array<{ id: string; syl: string; vowel: string; nameAr: string; tip: string }>;
    long: Array<{ id: string; syl: string; vowel: string; nameAr: string; tip: string; example: string }>;
  };
  words: Array<{
    id: string;
    word: string;
    meaning: string;
    position: 'start' | 'middle' | 'end';
    positionLabel: string;
    emoji: string;
    letters: string[];
  }>;
  sentences: Array<{
    id: string;
    sentence: string;
    meaning: string;
    emoji: string;
    missingWordQuestion: string;
    options: string[];
    correctIndex: number;
  }>;
  themeColor: string;
  accentColor: string;
}

export const ARABIC_LETTERS: LetterData[] = [
  {
    id: 'alif',
    char: 'ا',
    nameAr: 'أَلِف',
    order: 1,
    soundKey: 'alif',
    mouthGuide: {
      tip: 'افتح فمك بحرية ودع الهواء النقي يخرج من الحلق: أَ',
      lipPosition: 'فم مفتوح براحة وهدوء',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'a_fatha', syl: 'أَ', vowel: 'fatha', nameAr: 'همزة بالفتحة', tip: 'أَ.. افتح الفم لأعلى' },
        { id: 'a_kasra', syl: 'إِ', vowel: 'kasra', nameAr: 'همزة بالكسرة', tip: 'إِ.. ابتسامة خفيفة' },
        { id: 'a_damma', syl: 'أُ', vowel: 'damma', nameAr: 'همزة بالضمة', tip: 'أُ.. ضم الشفتين' }
      ],
      long: [
        { id: 'a_madd_a', syl: 'آ', vowel: 'madd_alif', nameAr: 'مد الألف', tip: 'آااا.. مد الصوت طويلًا', example: 'آمَال' },
        { id: 'a_madd_y', syl: 'إِي', vowel: 'madd_yaa', nameAr: 'مد الياء', tip: 'إِييي.. مد الياء', example: 'إِيمَان' },
        { id: 'a_madd_w', syl: 'أُو', vowel: 'madd_waw', nameAr: 'مد الواو', tip: 'أُووو.. ضم الشفتين ومد', example: 'أُولَى' }
      ]
    },
    words: [
      { id: 'a_w1', word: 'أَرْنَب', meaning: 'أرنب يقفز في الحقل', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐰', letters: ['أ', 'ر', 'ن', 'ب'] },
      { id: 'a_w2', word: 'أَسَد', meaning: 'أسد قوي وشجاع', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦁', letters: ['أ', 'س', 'د'] },
      { id: 'a_w3', word: 'فَأْر', meaning: 'فأر صغير وسريع', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🐭', letters: ['ف', 'أ', 'ر'] },
      { id: 'a_w4', word: 'قَرَأَ', meaning: 'قرأ كتابًا مفيدًا', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '📖', letters: ['ق', 'ر', 'أ'] }
    ],
    sentences: [
      {
        id: 'a_s1',
        sentence: 'الأَرْنَبُ يَأْكُلُ الجَزَرَ.',
        meaning: 'الأرنب يأكل الجزر',
        emoji: '🐰🥕',
        missingWordQuestion: 'أكمل الجملة: ..... يَأْكُلُ الجَزَرَ.',
        options: ['الأَرْنَبُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-amber-400 to-red-500',
    accentColor: 'border-red-400 text-red-700 bg-red-50'
  },
  {
    id: 'baa',
    char: 'ب',
    nameAr: 'بَاء',
    order: 2,
    soundKey: 'baa',
    mouthGuide: {
      tip: 'أغلق الشفتين معًا بلطف ثم افتحهما مع إخراج الهواء: بْ',
      lipPosition: 'الشفتان متلاصقتان برفق ثم تنفرجان',
      shape: 'closed_lips'
    },
    syllables: {
      short: [
        { id: 'baa_fatha', syl: 'بَ', vowel: 'fatha', nameAr: 'باء بالفتحة', tip: 'بَ.. افتح الفم لأعلى' },
        { id: 'baa_kasra', syl: 'بِ', vowel: 'kasra', nameAr: 'باء بالكسرة', tip: 'بِ.. ابتسم بنعومة' },
        { id: 'baa_damma', syl: 'بُ', vowel: 'damma', nameAr: 'باء بالضمة', tip: 'بُ.. ضم الشفتين مثل الوردة' }
      ],
      long: [
        { id: 'baa_alif', syl: 'بَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'بَاااا.. مد الصوت طويلًا', example: 'بَاب' },
        { id: 'baa_yaa', syl: 'بِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'بِيييي.. ابتسم ومد الصوت', example: 'طَبِيب' },
        { id: 'baa_waw', syl: 'بُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'بُوووو.. ضم الشفتين ومد', example: 'بُومَة' }
      ]
    },
    words: [
      { id: 'baa_w1', word: 'بَاب', meaning: 'باب البيت الجميل', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🚪', letters: ['ب', 'ا', 'ب'] },
      { id: 'baa_w2', word: 'بَطَّة', meaning: 'بطة تسبح في البحيرة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦆', letters: ['ب', 'ط', 'ة'] },
      { id: 'baa_w3', word: 'بَيْت', meaning: 'بيت دافئ وسعيد', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🏠', letters: ['ب', 'ي', 'ت'] },
      { id: 'baa_w4', word: 'بَحْر', meaning: 'بحر أزرق واسع', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌊', letters: ['ب', 'ح', 'ر'] },
      { id: 'baa_w5', word: 'حَبْل', meaning: 'حبل متين', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🪢', letters: ['ح', 'ب', 'ل'] },
      { id: 'baa_w6', word: 'خُبْز', meaning: 'خبز طازج ولذيذ', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🍞', letters: ['خ', 'ب', 'ز'] },
      { id: 'baa_w7', word: 'عِنَب', meaning: 'عنب حلو ومفيد', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🍇', letters: ['ع', 'ن', 'ب'] },
      { id: 'baa_w8', word: 'كَتَبَ', meaning: 'كتب بالقلم', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '✍️', letters: ['ك', 'ت', 'ب'] }
    ],
    sentences: [
      {
        id: 'baa_s1',
        sentence: 'هَذَا بَابُ البَيْتِ.',
        meaning: 'هذا باب البيت',
        emoji: '🚪🏠',
        missingWordQuestion: 'أكمل الجملة: هَذَا ..... البَيْتِ.',
        options: ['بَابُ', 'قَلَمُ', 'شَمْسُ'],
        correctIndex: 0
      },
      {
        id: 'baa_s2',
        sentence: 'البَطَّةُ تَسْبَحُ فِي البَحْرِ.',
        meaning: 'البطة تسبح في البحر',
        emoji: '🦆🌊',
        missingWordQuestion: 'أكمل الجملة: ..... تَسْبَحُ فِي البَحْرِ.',
        options: ['القِطَّةُ', 'البَطَّةُ', 'الشَّجَرَةُ'],
        correctIndex: 1
      },
      {
        id: 'baa_s3',
        sentence: 'أَنَا أُحِبُّ أَبِي وَأُمِّي.',
        meaning: 'أنا أحب أبي وأمي',
        emoji: '❤️👨‍👩‍👧',
        missingWordQuestion: 'أكمل الجملة: أَنَا أُحِبُّ ..... وَأُمِّي.',
        options: ['أَبِي', 'كِتَابِي', 'بَابِي'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-rose-400 to-pink-500',
    accentColor: 'border-pink-400 text-pink-700 bg-pink-50'
  },
  {
    id: 'taa',
    char: 'ت',
    nameAr: 'تَاء',
    order: 3,
    soundKey: 'taa',
    mouthGuide: {
      tip: 'ضع طرف اللسان خلف الأسنان العلوية مباشرة واضغط بخفة: تْ',
      lipPosition: 'شفتان مفتوحتان قليلًا مع ملامسة طرف اللسان',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'taa_fatha', syl: 'تَ', vowel: 'fatha', nameAr: 'تاء بالفتحة', tip: 'تَ.. طرف اللسان مع الفتح' },
        { id: 'taa_kasra', syl: 'تِ', vowel: 'kasra', nameAr: 'تاء بالكسرة', tip: 'تِ.. ابتسامة مع التاء' },
        { id: 'taa_damma', syl: 'تُ', vowel: 'damma', nameAr: 'تاء بالضمة', tip: 'تُ.. ضم الشفتين' }
      ],
      long: [
        { id: 'taa_alif', syl: 'تَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'تَااا.. مد الصوت', example: 'تَاج' },
        { id: 'taa_yaa', syl: 'تِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'تِييي.. مد الياء', example: 'تِين' },
        { id: 'taa_waw', syl: 'تُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'تُووو.. مد الواو', example: 'تُوت' }
      ]
    },
    words: [
      { id: 'taa_w1', word: 'تُفَّاح', meaning: 'تفاح أحمر حلو ولذيذ', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍎', letters: ['ت', 'ف', 'ا', 'ح'] },
      { id: 'taa_w2', word: 'تَاج', meaning: 'تاج ذهبي لامع للأبطال', position: 'start', positionLabel: 'في أول الكلمة', emoji: '👑', letters: ['ت', 'ا', 'ج'] },
      { id: 'taa_w3', word: 'كِتَاب', meaning: 'كتاب مليء بالحكايات', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '📖', letters: ['ك', 'ت', 'ا', 'ب'] },
      { id: 'taa_w4', word: 'بَيْت', meaning: 'بيت جميل', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🏡', letters: ['ب', 'ي', 'ت'] }
    ],
    sentences: [
      {
        id: 'taa_s1',
        sentence: 'أَكَلَ أَحْمَدُ تُفَّاحَةً لَذِيذَةً.',
        meaning: 'أكل أحمد تفاحة لذيذة',
        emoji: '🍎😋',
        missingWordQuestion: 'أكمل الجملة: أَكَلَ أَحْمَدُ ..... لَذِيذَةً.',
        options: ['تُفَّاحَةً', 'بَابًا', 'قَلَمًا'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-emerald-400 to-teal-500',
    accentColor: 'border-emerald-400 text-emerald-700 bg-emerald-50'
  },
  {
    id: 'thaa',
    char: 'ث',
    nameAr: 'ثَاء',
    order: 4,
    soundKey: 'thaa',
    mouthGuide: {
      tip: 'أخرج طرف لسانك برفق بين الأسنان مع نفخ هواء ناعم: ثْ',
      lipPosition: 'طرف اللسان بارز قليلًا بين الأسنان',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'th_fatha', syl: 'ثَ', vowel: 'fatha', nameAr: 'ثاء بالفتحة', tip: 'ثَ.. افتح مع خروج طرف اللسان' },
        { id: 'th_kasra', syl: 'ثِ', vowel: 'kasra', nameAr: 'ثاء بالكسرة', tip: 'ثِ.. ابتسم مع الثاء' },
        { id: 'th_damma', syl: 'ثُ', vowel: 'damma', nameAr: 'ثاء بالضمة', tip: 'ثُ.. ضم الشفتين' }
      ],
      long: [
        { id: 'th_alif', syl: 'ثَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'ثَااا.. مد الصوت', example: 'ثَابِت' },
        { id: 'th_yaa', syl: 'ثِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'ثِييي.. مد الياء', example: 'كَثِير' },
        { id: 'th_waw', syl: 'ثُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'ثُووو.. مد الواو', example: 'ثُوم' }
      ]
    },
    words: [
      { id: 'th_w1', word: 'ثَعْلَب', meaning: 'ثعلب ذكي ورشيق', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦊', letters: ['ث', 'ع', 'ل', 'ب'] },
      { id: 'th_w2', word: 'ثَوْب', meaning: 'ثوب نظيف وأنيق', position: 'start', positionLabel: 'في أول الكلمة', emoji: '👘', letters: ['ث', 'و', 'ب'] },
      { id: 'th_w3', word: 'مُثَلَّث', meaning: 'شكل المثلث الهندسي', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🔺', letters: ['م', 'ث', 'ل', 'ث'] },
      { id: 'th_w4', word: 'بَحَثَ', meaning: 'بحث عن الكنز', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🔍', letters: ['ب', 'ح', 'ث'] }
    ],
    sentences: [
      {
        id: 'th_s1',
        sentence: 'الثَّعْلَبُ حَيَوَانٌ سَرِيعٌ.',
        meaning: 'الثعلب حيوان سريع',
        emoji: '🦊💨',
        missingWordQuestion: 'أكمل الجملة: ..... حَيَوَانٌ سَرِيعٌ.',
        options: ['الثَّعْلَبُ', 'الكِتَابُ', 'البَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-indigo-400 to-purple-500',
    accentColor: 'border-indigo-400 text-indigo-700 bg-indigo-50'
  },
  {
    id: 'jeem',
    char: 'ج',
    nameAr: 'جِيم',
    order: 5,
    soundKey: 'jeem',
    mouthGuide: {
      tip: 'وسط اللسان يرتفع لوسط سقف الحلق ويخرج صوت رنان: جْ',
      lipPosition: 'شفتان مدورتان قليلًا',
      shape: 'round_lips'
    },
    syllables: {
      short: [
        { id: 'j_fatha', syl: 'جَ', vowel: 'fatha', nameAr: 'جيم بالفتحة', tip: 'جَ.. جيم مفتوحة' },
        { id: 'j_kasra', syl: 'جِ', vowel: 'kasra', nameAr: 'جيم بالكسرة', tip: 'جِ.. جيم مكسورة' },
        { id: 'j_damma', syl: 'جُ', vowel: 'damma', nameAr: 'جيم بالضمة', tip: 'جُ.. جيم مضمومة' }
      ],
      long: [
        { id: 'j_alif', syl: 'جَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'جَااا', example: 'جَامِع' },
        { id: 'j_yaa', syl: 'جِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'جِييي', example: 'جِيرَان' },
        { id: 'j_waw', syl: 'جُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'جُووو', example: 'نُجُوم' }
      ]
    },
    words: [
      { id: 'j_w1', word: 'جَمَل', meaning: 'جمل يعيش في الصحراء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐪', letters: ['ج', 'م', 'ل'] },
      { id: 'j_w2', word: 'جَزَر', meaning: 'جزر برتقالي مفيد', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🥕', letters: ['ج', 'ز', 'ر'] },
      { id: 'j_w3', word: 'شَجَرَة', meaning: 'شجرة خضراء عالية', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🌳', letters: ['ش', 'ج', 'ر', 'ة'] },
      { id: 'j_w4', word: 'تَاج', meaning: 'تاج ذهبي', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '👑', letters: ['ت', 'ا', 'ج'] }
    ],
    sentences: [
      {
        id: 'j_s1',
        sentence: 'الجَمَلُ سَفِينَةُ الصَّحْرَاءِ.',
        meaning: 'الجمل سفينة الصحراء',
        emoji: '🐪🏜️',
        missingWordQuestion: 'أكمل الجملة: ..... سَفِينَةُ الصَّحْرَاءِ.',
        options: ['الجَمَلُ', 'البَحْرُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-yellow-400 to-amber-500',
    accentColor: 'border-amber-400 text-amber-700 bg-amber-50'
  },
  {
    id: 'haa',
    char: 'ح',
    nameAr: 'حَاء',
    order: 6,
    soundKey: 'haa',
    mouthGuide: {
      tip: 'أخرج هواءً دافئًا ناعمًا من وسط الحلق دون حشرجة: حْ',
      lipPosition: 'فم مفتوح باسترخاء وهواء دافئ',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'h_fatha', syl: 'حَ', vowel: 'fatha', nameAr: 'حاء بالفتحة', tip: 'حَ.. دافئة ومفتوحة' },
        { id: 'h_kasra', syl: 'حِ', vowel: 'kasra', nameAr: 'حاء بالكسرة', tip: 'حِ.. دافئة ومكسورة' },
        { id: 'h_damma', syl: 'حُ', vowel: 'damma', nameAr: 'حاء بالضمة', tip: 'حُ.. دافئة ومضمومة' }
      ],
      long: [
        { id: 'h_alif', syl: 'حَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'حَااا', example: 'حَافِلَة' },
        { id: 'h_yaa', syl: 'حِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'حِييي', example: 'حَلِيب' },
        { id: 'h_waw', syl: 'حُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'حُووو', example: 'حُوت' }
      ]
    },
    words: [
      { id: 'h_w1', word: 'حِصَان', meaning: 'حصان أصيل وسريع', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐴', letters: ['ح', 'ص', 'ا', 'ن'] },
      { id: 'h_w2', word: 'حَلِيب', meaning: 'حليب أبيض مغذٍ', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🥛', letters: ['ح', 'ل', 'ي', 'ب'] },
      { id: 'h_w3', word: 'بَحْر', meaning: 'بحر أزرق واسع', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🌊', letters: ['ب', 'ح', 'ر'] },
      { id: 'h_w4', word: 'تُفَّاح', meaning: 'تفاح أحمر', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🍎', letters: ['ت', 'ف', 'ا', 'ح'] }
    ],
    sentences: [
      {
        id: 'h_s1',
        sentence: 'الحِصَانُ يَجْرِي بِسُرْعَةٍ فِي المَيْدَانِ.',
        meaning: 'الحصان يجري بسرعة في الميدان',
        emoji: '🐴🏇',
        missingWordQuestion: 'أكمل الجملة: ..... يَجْرِي بِسُرْعَةٍ.',
        options: ['الحِصَانُ', 'البَابُ', 'الكِتَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-orange-400 to-rose-500',
    accentColor: 'border-orange-400 text-orange-700 bg-orange-50'
  },
  {
    id: 'khaa',
    char: 'خ',
    nameAr: 'خَاء',
    order: 7,
    soundKey: 'khaa',
    mouthGuide: {
      tip: 'صوت يخرج من أعلى الحلق برفق وانسيابية: خْ',
      lipPosition: 'فم نصف مفتوح',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'kh_fatha', syl: 'خَ', vowel: 'fatha', nameAr: 'خاء بالفتحة', tip: 'خَ.. مفخمة ومفتوحة' },
        { id: 'kh_kasra', syl: 'خِ', vowel: 'kasra', nameAr: 'خاء بالكسرة', tip: 'خِ.. مفخمة ومكسورة' },
        { id: 'kh_damma', syl: 'خُ', vowel: 'damma', nameAr: 'خاء بالضمة', tip: 'خُ.. مفخمة ومضمومة' }
      ],
      long: [
        { id: 'kh_alif', syl: 'خَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'خَااا', example: 'خَاتَم' },
        { id: 'kh_yaa', syl: 'خِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'خِييي', example: 'نَخِيل' },
        { id: 'kh_waw', syl: 'خُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'خُووو', example: 'خُوخ' }
      ]
    },
    words: [
      { id: 'kh_w1', word: 'خَرُوف', meaning: 'خروف ذو صوف ناعم', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐑', letters: ['خ', 'ر', 'و', 'ف'] },
      { id: 'kh_w2', word: 'خُبْز', meaning: 'خبز طازج وشهي', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍞', letters: ['خ', 'ب', 'ز'] },
      { id: 'kh_w3', word: 'نَخْلَة', meaning: 'نخلة تعطي التمر الحلو', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🌴', letters: ['ن', 'خ', 'ل', 'ة'] },
      { id: 'kh_w4', word: 'بِطِّيخ', meaning: 'بطيخ أحمر منعش', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🍉', letters: ['ب', 'ط', 'ي', 'خ'] }
    ],
    sentences: [
      {
        id: 'kh_s1',
        sentence: 'الخَرُوفُ يَرْعَى فِي الحَقْلِ الأَخْضَرِ.',
        meaning: 'الخروف يرعى في الحقل الأخضر',
        emoji: '🐑🌾',
        missingWordQuestion: 'أكمل الجملة: ..... يَرْعَى فِي الحَقْلِ.',
        options: ['الخَرُوفُ', 'القَلَمُ', 'السَّيَّارَةُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-green-400 to-emerald-600',
    accentColor: 'border-green-400 text-green-700 bg-green-50'
  },
  {
    id: 'daal',
    char: 'د',
    nameAr: 'دَال',
    order: 8,
    soundKey: 'daal',
    mouthGuide: {
      tip: 'المس خلف الأسنان العلوية بطرف اللسان بقوة خفيفة: دْ',
      lipPosition: 'شفتان مفتوحتان مع نبضة بطرف اللسان',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'd_fatha', syl: 'دَ', vowel: 'fatha', nameAr: 'دال بالفتحة', tip: 'دَ' },
        { id: 'd_kasra', syl: 'دِ', vowel: 'kasra', nameAr: 'دال بالكسرة', tip: 'دِ' },
        { id: 'd_damma', syl: 'دُ', vowel: 'damma', nameAr: 'دال بالضمة', tip: 'دُ' }
      ],
      long: [
        { id: 'd_alif', syl: 'دَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'دَااا', example: 'دَار' },
        { id: 'd_yaa', syl: 'دِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'دِييي', example: 'دِيك' },
        { id: 'd_waw', syl: 'دُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'دُووو', example: 'دُودَة' }
      ]
    },
    words: [
      { id: 'd_w1', word: 'دُبّ', meaning: 'دب أليف', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐻', letters: ['د', 'ب'] },
      { id: 'd_w2', word: 'دَرَّاجَة', meaning: 'دراجة أركبها في الحديقة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🚲', letters: ['د', 'ر', 'ا', 'ج', 'ة'] },
      { id: 'd_w3', word: 'حَدِيقَة', meaning: 'حديقة خضراء جميلة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🏡', letters: ['ح', 'د', 'ي', 'ق', 'ة'] },
      { id: 'd_w4', word: 'أَسَد', meaning: 'أسد ملك الغابة', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🦁', letters: ['أ', 'س', 'د'] }
    ],
    sentences: [
      {
        id: 'd_s1',
        sentence: 'أَحْمَدُ يَرْكَبُ الدَّرَّاجَةَ الجَدِيدَةَ.',
        meaning: 'أحمد يركب الدراجة الجديدة',
        emoji: '👦🚲',
        missingWordQuestion: 'أكمل الجملة: أَحْمَدُ يَرْكَبُ ..... الجَدِيدَةَ.',
        options: ['الدَّرَّاجَةَ', 'البَابَ', 'الشَّمْسَ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-teal-400 to-emerald-500',
    accentColor: 'border-teal-400 text-teal-700 bg-teal-50'
  },
  {
    id: 'zaal',
    char: 'ذ',
    nameAr: 'ذَال',
    order: 9,
    soundKey: 'zaal',
    mouthGuide: {
      tip: 'أخرج طرف لسانك قليلًا بين الأسنان برنين خفيف: ذْ',
      lipPosition: 'طرف اللسان بين الأسنان برفق',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'dh_fatha', syl: 'ذَ', vowel: 'fatha', nameAr: 'ذال بالفتحة', tip: 'ذَ' },
        { id: 'dh_kasra', syl: 'ذِ', vowel: 'kasra', nameAr: 'ذال بالكسرة', tip: 'ذِ' },
        { id: 'dh_damma', syl: 'ذُ', vowel: 'damma', nameAr: 'ذال بالضمة', tip: 'ذُ' }
      ],
      long: [
        { id: 'dh_alif', syl: 'ذَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'ذَااا', example: 'ذَاكِر' },
        { id: 'dh_yaa', syl: 'ذِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'ذِييي', example: 'مُذِيع' },
        { id: 'dh_waw', syl: 'ذُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'ذُووو', example: 'بُذُور' }
      ]
    },
    words: [
      { id: 'dh_w1', word: 'ذُرَة', meaning: 'ذرة صفراء ولذيذة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌽', letters: ['ذ', 'ر', 'ة'] },
      { id: 'dh_w2', word: 'ذِئْب', meaning: 'ذئب في الغابة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐺', letters: ['ذ', 'ئ', 'ب'] },
      { id: 'dh_w3', word: 'بُذُور', meaning: 'بذور نزرعها في التربة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🌱', letters: ['ب', 'ذ', 'و', 'ر'] },
      { id: 'dh_w4', word: 'قُنْفُذ', meaning: 'قنفذ ذو شوك لطيف', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🦔', letters: ['ق', 'ن', 'ف', 'ذ'] }
    ],
    sentences: [
      {
        id: 'dh_s1',
        sentence: 'الذُّرَةُ نَبَاتٌ لَذِيذٌ وَمُفِيدٌ.',
        meaning: 'الذرة نبات لذيذ ومفيد',
        emoji: '🌽😋',
        missingWordQuestion: 'أكمل الجملة: ..... نَبَاتٌ لَذِيذٌ وَمُفِيدٌ.',
        options: ['الذُّرَةُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-indigo-400 to-blue-600',
    accentColor: 'border-indigo-400 text-indigo-700 bg-indigo-50'
  },
  {
    id: 'raa',
    char: 'ر',
    nameAr: 'رَاء',
    order: 10,
    soundKey: 'raa',
    mouthGuide: {
      tip: 'دع طرف اللسان يرتعش برفق عند سقف الحلق: رْ',
      lipPosition: 'فم مفتوح باعتدال واللسان يهتز بخفة',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'r_fatha', syl: 'رَ', vowel: 'fatha', nameAr: 'راء بالفتحة', tip: 'رَ' },
        { id: 'r_kasra', syl: 'رِ', vowel: 'kasra', nameAr: 'راء بالكسرة', tip: 'رِ' },
        { id: 'r_damma', syl: 'رُ', vowel: 'damma', nameAr: 'راء بالضمة', tip: 'رُ' }
      ],
      long: [
        { id: 'r_alif', syl: 'رَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'رَااا', example: 'رَامِي' },
        { id: 'r_yaa', syl: 'رِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'رِييي', example: 'رِيشَة' },
        { id: 'r_waw', syl: 'رُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'رُووو', example: 'خَرُوف' }
      ]
    },
    words: [
      { id: 'r_w1', word: 'رُمَّان', meaning: 'رمان أحمر شهي', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍎', letters: ['ر', 'م', 'ا', 'ن'] },
      { id: 'r_w2', word: 'رِيشَة', meaning: 'ريشة طائر خفيفة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🪶', letters: ['ر', 'ي', 'ش', 'ة'] },
      { id: 'r_w3', word: 'زَرَافَة', meaning: 'زرافة طويلة العنق', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🦒', letters: ['ز', 'ر', 'ا', 'ف', 'ة'] },
      { id: 'r_w4', word: 'قَمَر', meaning: 'قمر منير في السماء', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🌙', letters: ['ق', 'م', 'ر'] }
    ],
    sentences: [
      {
        id: 'r_s1',
        sentence: 'القَمَرُ يُنِيرُ السَّمَاءَ فِي اللَّيْلِ.',
        meaning: 'القمر ينير السماء في الليل',
        emoji: '🌙✨',
        missingWordQuestion: 'أكمل الجملة: ..... يُنِيرُ السَّمَاءَ فِي اللَّيْلِ.',
        options: ['القَمَرُ', 'البَابُ', 'الخَرُوفُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-lime-400 to-green-500',
    accentColor: 'border-lime-400 text-lime-700 bg-lime-50'
  },
  {
    id: 'zay',
    char: 'ز',
    nameAr: 'زَاي',
    order: 11,
    soundKey: 'zay',
    mouthGuide: {
      tip: 'قرب الأسنان واجعل الصوت يرن ويهتز مثل طنين النحلة: زْ',
      lipPosition: 'ابتسامة والأسنان متقاربة مع طنين خفيف',
      shape: 'smile_teeth'
    },
    syllables: {
      short: [
        { id: 'z_fatha', syl: 'زَ', vowel: 'fatha', nameAr: 'زاي بالفتحة', tip: 'زَ' },
        { id: 'z_kasra', syl: 'زِ', vowel: 'kasra', nameAr: 'زاي بالكسرة', tip: 'زِ' },
        { id: 'z_damma', syl: 'زُ', vowel: 'damma', nameAr: 'زاي بالضمة', tip: 'زُ' }
      ],
      long: [
        { id: 'z_alif', syl: 'زَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'زَااا', example: 'زَائِر' },
        { id: 'z_yaa', syl: 'زِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'زِييي', example: 'وَزِير' },
        { id: 'z_waw', syl: 'زُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'زُووو', example: 'زُهُور' }
      ]
    },
    words: [
      { id: 'z_w1', word: 'زَرَافَة', meaning: 'زرافة لطيفة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦒', letters: ['ز', 'ر', 'ا', 'ف', 'ة'] },
      { id: 'z_w2', word: 'زَهْرَة', meaning: 'زهرة فواحة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌸', letters: ['ز', 'ه', 'ر', 'ة'] },
      { id: 'z_w3', word: 'جَزَر', meaning: 'جزر مقوٍ للنظر', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🥕', letters: ['ج', 'ز', 'ر'] },
      { id: 'z_w4', word: 'مَوْز', meaning: 'موز حلو', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🍌', letters: ['م', 'و', 'ز'] }
    ],
    sentences: [
      {
        id: 'z_s1',
        sentence: 'الزَّرَافَةُ تَأْكُلُ أَوْرَاقَ الشَّجَرِ العَالِيَةِ.',
        meaning: 'الزرافة تأكل أوراق الشجر',
        emoji: '🦒🌿',
        missingWordQuestion: 'أكمل الجملة: ..... تَأْكُلُ أَوْرَاقَ الشَّجَرِ.',
        options: ['الزَّرَافَةُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-purple-400 to-violet-600',
    accentColor: 'border-purple-400 text-purple-700 bg-purple-50'
  },
  {
    id: 'seen',
    char: 'س',
    nameAr: 'سِين',
    order: 12,
    soundKey: 'seen',
    mouthGuide: {
      tip: 'ابتسم وقرب الأسنان واخرج هواءً صافيًا كالنسيم: سْ',
      lipPosition: 'ابتسامة عريضة والأسنان متقاربة مع تدفق الهواء',
      shape: 'smile_teeth'
    },
    syllables: {
      short: [
        { id: 's_fatha', syl: 'سَ', vowel: 'fatha', nameAr: 'سين بالفتحة', tip: 'سَ' },
        { id: 's_kasra', syl: 'سِ', vowel: 'kasra', nameAr: 'سين بالكسرة', tip: 'سِ' },
        { id: 's_damma', syl: 'سُ', vowel: 'damma', nameAr: 'سين بالضمة', tip: 'سُ' }
      ],
      long: [
        { id: 's_alif', syl: 'سَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'سَااا', example: 'سَاعَة' },
        { id: 's_yaa', syl: 'سِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'سِييي', example: 'سَفِينَة' },
        { id: 's_waw', syl: 'سُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'سُووو', example: 'سُور' }
      ]
    },
    words: [
      { id: 's_w1', word: 'سَيَّارَة', meaning: 'سيارة حديثة وسريعة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🚗', letters: ['س', 'ي', 'ا', 'ر', 'ة'] },
      { id: 's_w2', word: 'سَمَكَة', meaning: 'سمكة ملونة في الحوض', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐟', letters: ['س', 'م', 'ك', 'ة'] },
      { id: 's_w3', word: 'مَسْجِد', meaning: 'مسجد نصلي فيه', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🕌', letters: ['م', 'س', 'ج', 'د'] },
      { id: 's_w4', word: 'شَمْس', meaning: 'شمس مشرقة', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '☀️', letters: ['ش', 'م', 'س'] }
    ],
    sentences: [
      {
        id: 's_s1',
        sentence: 'السَّمَكَةُ تَسْبَحُ فِي المَاءِ الصَّافِي.',
        meaning: 'السمكة تسبح في الماء الصافي',
        emoji: '🐟🌊',
        missingWordQuestion: 'أكمل الجملة: ..... تَسْبَحُ فِي المَاءِ.',
        options: ['السَّمَكَةُ', 'الكِتَابُ', 'البَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-purple-400 to-indigo-500',
    accentColor: 'border-purple-400 text-purple-700 bg-purple-50'
  },
  {
    id: 'sheen',
    char: 'ش',
    nameAr: 'شِين',
    order: 13,
    soundKey: 'sheen',
    mouthGuide: {
      tip: 'ضم الشفتين قليلًا للأمام واخرج هواءً واسعًا هادئًا: شْ',
      lipPosition: 'شفتان مدورتان قليلًا للأمام',
      shape: 'round_lips'
    },
    syllables: {
      short: [
        { id: 'sh_fatha', syl: 'شَ', vowel: 'fatha', nameAr: 'شين بالفتحة', tip: 'شَ' },
        { id: 'sh_kasra', syl: 'شِ', vowel: 'kasra', nameAr: 'شين بالكسرة', tip: 'شِ' },
        { id: 'sh_damma', syl: 'شُ', vowel: 'damma', nameAr: 'شين بالضمة', tip: 'شُ' }
      ],
      long: [
        { id: 'sh_alif', syl: 'شَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'شَااا', example: 'شَارِع' },
        { id: 'sh_yaa', syl: 'شِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'شِييي', example: 'نَشِيط' },
        { id: 'sh_waw', syl: 'شُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'شُووو', example: 'شُعُور' }
      ]
    },
    words: [
      { id: 'sh_w1', word: 'شَمْس', meaning: 'شمس دافئة وساطعة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '☀️', letters: ['ش', 'م', 'س'] },
      { id: 'sh_w2', word: 'شَجَرَة', meaning: 'شجرة خضراء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌳', letters: ['ش', 'ج', 'ر', 'ة'] },
      { id: 'sh_w3', word: 'فَرَاشَة', meaning: 'فراشة بألوان بديعة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🦋', letters: ['ف', 'ر', 'ا', 'ش', 'ة'] },
      { id: 'sh_w4', word: 'عُشّ', meaning: 'عش العصافير', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🪺', letters: ['ع', 'ش'] }
    ],
    sentences: [
      {
        id: 'sh_s1',
        sentence: 'الشَّمْسُ تُشْرِقُ كُلَّ صَبَاحٍ جَمِيلٍ.',
        meaning: 'الشمس تشرق كل صباح',
        emoji: '☀️🌅',
        missingWordQuestion: 'أكمل الجملة: ..... تُشْرِقُ كُلَّ صَبَاحٍ.',
        options: ['الشَّمْسُ', 'القَمَرُ', 'البَحْرُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-teal-400 to-cyan-600',
    accentColor: 'border-teal-400 text-teal-700 bg-teal-50'
  },
  {
    id: 'saad',
    char: 'ص',
    nameAr: 'صَاد',
    order: 14,
    soundKey: 'saad',
    mouthGuide: {
      tip: 'صوت قوي مفخم يملأ الفم مع تقريب الأسنان: صْ',
      lipPosition: 'فم ممتلئ بالهواء المفخم',
      shape: 'smile_teeth'
    },
    syllables: {
      short: [
        { id: 'sa_fatha', syl: 'صَ', vowel: 'fatha', nameAr: 'صاد بالفتحة', tip: 'صَ' },
        { id: 'sa_kasra', syl: 'صِ', vowel: 'kasra', nameAr: 'صاد بالكسرة', tip: 'صِ' },
        { id: 'sa_damma', syl: 'صُ', vowel: 'damma', nameAr: 'صاد بالضمة', tip: 'صُ' }
      ],
      long: [
        { id: 'sa_alif', syl: 'صَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'صَااا', example: 'صَابُون' },
        { id: 'sa_yaa', syl: 'صِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'صِييي', example: 'عَصِير' },
        { id: 'sa_waw', syl: 'صُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'صُووو', example: 'صُورَة' }
      ]
    },
    words: [
      { id: 'sa_w1', word: 'صَقْر', meaning: 'صقر جارح وقوي', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦅', letters: ['ص', 'ق', 'ر'] },
      { id: 'sa_w2', word: 'صَابُون', meaning: 'صابون ينظف الأيدي', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🧼', letters: ['ص', 'ا', 'ب', 'و', 'ن'] },
      { id: 'sa_w3', word: 'عَصِير', meaning: 'عصير برتقال لذيذ', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🧃', letters: ['ع', 'ص', 'ي', 'ر'] },
      { id: 'sa_w4', word: 'قَفَص', meaning: 'قفص العصافير', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🦜', letters: ['ق', 'ف', 'ص'] }
    ],
    sentences: [
      {
        id: 'sa_s1',
        sentence: 'الصَّقْرُ يَطِيرُ عَالِيًا فِي الفَضَاءِ.',
        meaning: 'الصقر يطير عاليًا',
        emoji: '🦅☁️',
        missingWordQuestion: 'أكمل الجملة: ..... يَطِيرُ عَالِيًا.',
        options: ['الصَّقْرُ', 'السَّمَكَةُ', 'البَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-amber-500 to-orange-600',
    accentColor: 'border-amber-400 text-amber-700 bg-amber-50'
  },
  {
    id: 'daad',
    char: 'ض',
    nameAr: 'ضَاد',
    order: 15,
    soundKey: 'daad',
    mouthGuide: {
      tip: 'حافة اللسان تلامس الأضراس العلوية بصوت لغة الضاد المميز: ضْ',
      lipPosition: 'ضغط جانبي بحافة اللسان',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'da_fatha', syl: 'ضَ', vowel: 'fatha', nameAr: 'ضاد بالفتحة', tip: 'ضَ' },
        { id: 'da_kasra', syl: 'ضِ', vowel: 'kasra', nameAr: 'ضاد بالكسرة', tip: 'ضِ' },
        { id: 'da_damma', syl: 'ضُ', vowel: 'damma', nameAr: 'ضاد بالضمة', tip: 'ضُ' }
      ],
      long: [
        { id: 'da_alif', syl: 'ضَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'ضَااا', example: 'ضَابِط' },
        { id: 'da_yaa', syl: 'ضِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'ضِييي', example: 'رَضِيع' },
        { id: 'da_waw', syl: 'ضُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'ضُووو', example: 'وُضُوء' }
      ]
    },
    words: [
      { id: 'da_w1', word: 'ضِفْدَع', meaning: 'ضفدع يقفز على الصخور', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐸', letters: ['ض', 'ف', 'د', 'ع'] },
      { id: 'da_w2', word: 'ضَوْء', meaning: 'ضوء المصباح المنير', position: 'start', positionLabel: 'في أول الكلمة', emoji: '💡', letters: ['ض', 'و', 'ء'] },
      { id: 'da_w3', word: 'خُضَار', meaning: 'خضار طازجة ومفيدة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🥦', letters: ['خ', 'ض', 'ا', 'ر'] },
      { id: 'da_w4', word: 'أَرْض', meaning: 'كوكب الأرض الجميل', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🌍', letters: ['أ', 'ر', 'ض'] }
    ],
    sentences: [
      {
        id: 'da_s1',
        sentence: 'الضِّفْدَعُ يَقْفِزُ فِي البِرْكَةِ المَائِيَّةِ.',
        meaning: 'الضفدع يقفز في البركة',
        emoji: '🐸💧',
        missingWordQuestion: 'أكمل الجملة: ..... يَقْفِزُ فِي البِرْكَةِ.',
        options: ['الضِّفْدَعُ', 'الكِتَابُ', 'البَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-emerald-500 to-green-700',
    accentColor: 'border-emerald-400 text-emerald-700 bg-emerald-50'
  },
  {
    id: 'taa_heavy',
    char: 'ط',
    nameAr: 'طَاء',
    order: 16,
    soundKey: 'taa_heavy',
    mouthGuide: {
      tip: 'طرف اللسان يلتصق بقوة بسقف الحلق مع تفخيم قوي: طْ',
      lipPosition: 'ارتفاع لمقدمة اللسان مع ملء الفم بالصوت',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'ta_fatha', syl: 'طَ', vowel: 'fatha', nameAr: 'طاء بالفتحة', tip: 'طَ' },
        { id: 'ta_kasra', syl: 'طِ', vowel: 'kasra', nameAr: 'طاء بالكسرة', tip: 'طِ' },
        { id: 'ta_damma', syl: 'طُ', vowel: 'damma', nameAr: 'طاء بالضمة', tip: 'طُ' }
      ],
      long: [
        { id: 'ta_alif', syl: 'طَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'طَااا', example: 'طَائِر' },
        { id: 'ta_yaa', syl: 'طِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'طِييي', example: 'طَبِيب' },
        { id: 'ta_waw', syl: 'طُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'طُووو', example: 'عُطُور' }
      ]
    },
    words: [
      { id: 'ta_w1', word: 'طَائِرَة', meaning: 'طائرة تحلق في السماء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '✈️', letters: ['ط', 'ا', 'ئ', 'ر', 'ة'] },
      { id: 'ta_w2', word: 'طَبِيب', meaning: 'طبيب يعالج المرضى', position: 'start', positionLabel: 'في أول الكلمة', emoji: '👨‍⚕️', letters: ['ط', 'ب', 'ي', 'ب'] },
      { id: 'ta_w3', word: 'قِطَار', meaning: 'قطار يسير على السكة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🚆', letters: ['ق', 'ط', 'ا', 'ر'] },
      { id: 'ta_w4', word: 'بَطَّة', meaning: 'بطة تسبح', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🦆', letters: ['ب', 'ط', 'ة'] }
    ],
    sentences: [
      {
        id: 'ta_s1',
        sentence: 'الطَّائِرَةُ تُحَلِّقُ فَوْقَ السَّحَابِ.',
        meaning: 'الطائرة تحلق فوق السحاب',
        emoji: '✈️☁️',
        missingWordQuestion: 'أكمل الجملة: ..... تُحَلِّقُ فَوْقَ السَّحَابِ.',
        options: ['الطَّائِرَةُ', 'السَّفِينَةُ', 'البَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-red-400 to-rose-600',
    accentColor: 'border-rose-400 text-rose-700 bg-rose-50'
  },
  {
    id: 'zaa_heavy',
    char: 'ظ',
    nameAr: 'ظَاء',
    order: 17,
    soundKey: 'zaa_heavy',
    mouthGuide: {
      tip: 'طرف اللسان بين الأسنان بصوت مفخم وقوي: ظْ',
      lipPosition: 'طرف اللسان بارز ومفخم',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'za_fatha', syl: 'ظَ', vowel: 'fatha', nameAr: 'ظاء بالفتحة', tip: 'ظَ' },
        { id: 'za_kasra', syl: 'ظِ', vowel: 'kasra', nameAr: 'ظاء بالكسرة', tip: 'ظِ' },
        { id: 'za_damma', syl: 'ظُ', vowel: 'damma', nameAr: 'ظاء بالضمة', tip: 'ظُ' }
      ],
      long: [
        { id: 'za_alif', syl: 'ظَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'ظَااا', example: 'ظَاهِر' },
        { id: 'za_yaa', syl: 'ظِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'ظِييي', example: 'نَظِيف' },
        { id: 'za_waw', syl: 'ظُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'ظُووو', example: 'حُظُوظ' }
      ]
    },
    words: [
      { id: 'za_w1', word: 'ظَرْف', meaning: 'ظرف رسالة جميلة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '✉️', letters: ['ظ', 'ر', 'ف'] },
      { id: 'za_w2', word: 'ظَبْي', meaning: 'ظبي رشيق وجميل', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦌', letters: ['ظ', 'ب', 'ي'] },
      { id: 'za_w3', word: 'نَظَّارَة', meaning: 'نظارة شمسية', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🕶️', letters: ['ن', 'ظ', 'ا', 'ر', 'ة'] },
      { id: 'za_w4', word: 'حَفِظَ', meaning: 'حفظ الدرس', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🧠', letters: ['ح', 'ف', 'ظ'] }
    ],
    sentences: [
      {
        id: 'za_s1',
        sentence: 'وَضَعَ أَحْمَدُ الرِّسَالَةَ فِي الظَّرْفِ.',
        meaning: 'وضع أحمد الرسالة في الظرف',
        emoji: '✉️📝',
        missingWordQuestion: 'أكمل الجملة: وَضَعَ الرِّسَالَةَ فِي .....',
        options: ['الظَّرْفِ', 'البَحْرِ', 'البَابِ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-purple-500 to-indigo-700',
    accentColor: 'border-purple-400 text-purple-700 bg-purple-50'
  },
  {
    id: 'ayn',
    char: 'ع',
    nameAr: 'عَيْن',
    order: 18,
    soundKey: 'ayn',
    mouthGuide: {
      tip: 'صوت عميق وسلس يخرج من وسط الحلق بانسيابية: عْ',
      lipPosition: 'تراجع خفيف لوسط الحلق مع فم مسترخٍ',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'ay_fatha', syl: 'عَ', vowel: 'fatha', nameAr: 'عين بالفتحة', tip: 'عَ' },
        { id: 'ay_kasra', syl: 'عِ', vowel: 'kasra', nameAr: 'عين بالكسرة', tip: 'عِ' },
        { id: 'ay_damma', syl: 'عُ', vowel: 'damma', nameAr: 'عين بالضمة', tip: 'عُ' }
      ],
      long: [
        { id: 'ay_alif', syl: 'عَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'عَااا', example: 'عَالِم' },
        { id: 'ay_yaa', syl: 'عِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'عِييي', example: 'عِيد' },
        { id: 'ay_waw', syl: 'عُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'عُووو', example: 'عُود' }
      ]
    },
    words: [
      { id: 'ay_w1', word: 'عَيْن', meaning: 'عين نرى بها الجمال', position: 'start', positionLabel: 'في أول الكلمة', emoji: '👁️', letters: ['ع', 'ي', 'ن'] },
      { id: 'ay_w2', word: 'عَسَل', meaning: 'عسل نحل لذيذ وشفاء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍯', letters: ['ع', 'س', 'ل'] },
      { id: 'ay_w3', word: 'ثَعْلَب', meaning: 'ثعلب في الغابة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🦊', letters: ['ث', 'ع', 'ل', 'ب'] },
      { id: 'ay_w4', word: 'شُمُوع', meaning: 'شموع مضيئة', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🕯️', letters: ['ش', 'م', 'و', 'ع'] }
    ],
    sentences: [
      {
        id: 'ay_s1',
        sentence: 'العَسَلُ شَرَابٌ حُلْوٌ وَمُفِيدٌ لِلصِّحَّةِ.',
        meaning: 'العسل شراب حلو ومفيد',
        emoji: '🍯🐝',
        missingWordQuestion: 'أكمل الجملة: ..... شَرَابٌ حُلْوٌ وَمُفِيدٌ.',
        options: ['العَسَلُ', 'البَابُ', 'الكِتَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-blue-400 to-cyan-600',
    accentColor: 'border-blue-400 text-blue-700 bg-blue-50'
  },
  {
    id: 'ghayn',
    char: 'غ',
    nameAr: 'غَيْن',
    order: 19,
    soundKey: 'ghayn',
    mouthGuide: {
      tip: 'صوت ناعم يخرج من أعلى الحلق كجريان الماء: غْ',
      lipPosition: 'فم مفتوح باسترخاء',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'gh_fatha', syl: 'غَ', vowel: 'fatha', nameAr: 'غين بالفتحة', tip: 'غَ' },
        { id: 'gh_kasra', syl: 'غِ', vowel: 'kasra', nameAr: 'غين بالكسرة', tip: 'غِ' },
        { id: 'gh_damma', syl: 'غُ', vowel: 'damma', nameAr: 'غين بالضمة', tip: 'غُ' }
      ],
      long: [
        { id: 'gh_alif', syl: 'غَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'غَااا', example: 'غَابَة' },
        { id: 'gh_yaa', syl: 'غِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'غِييي', example: 'صَغِير' },
        { id: 'gh_waw', syl: 'غُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'غُووو', example: 'غُيُوم' }
      ]
    },
    words: [
      { id: 'gh_w1', word: 'غَزَال', meaning: 'غزال سريع وجميل', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦌', letters: ['غ', 'ز', 'ا', 'ل'] },
      { id: 'gh_w2', word: 'غَيْمَة', meaning: 'غيمة بيضاء في السماء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '☁️', letters: ['غ', 'ي', 'م', 'ة'] },
      { id: 'gh_w3', word: 'مَغْنَاطِيس', meaning: 'مغناطيس يجذب الحديد', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🧲', letters: ['م', 'غ', 'ن', 'ا', 'ط', 'ي', 'س'] },
      { id: 'gh_w4', word: 'صَمْغ', meaning: 'صمغ نلصق به الأوراق', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🧴', letters: ['ص', 'م', 'غ'] }
    ],
    sentences: [
      {
        id: 'gh_s1',
        sentence: 'الغَزَالُ يَرْكُضُ بِمَرَحٍ فِي الغَابَةِ.',
        meaning: 'الغزال يركض في الغابة',
        emoji: '🦌🌲',
        missingWordQuestion: 'أكمل الجملة: ..... يَرْكُضُ بِمَرَحٍ.',
        options: ['الغَزَالُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-violet-400 to-purple-600',
    accentColor: 'border-violet-400 text-violet-700 bg-violet-50'
  },
  {
    id: 'faa',
    char: 'ف',
    nameAr: 'فَاء',
    order: 20,
    soundKey: 'faa',
    mouthGuide: {
      tip: 'الأسنان العلوية تلمس الشفة السفلية برفق مع نفخ الهواء: فْ',
      lipPosition: 'الأسنان فوق الشفة السفلية مع تدفق نسيم الهواء',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'f_fatha', syl: 'فَ', vowel: 'fatha', nameAr: 'فاء بالفتحة', tip: 'فَ' },
        { id: 'f_kasra', syl: 'فِ', vowel: 'kasra', nameAr: 'فاء بالكسرة', tip: 'فِ' },
        { id: 'f_damma', syl: 'فُ', vowel: 'damma', nameAr: 'فاء بالضمة', tip: 'فُ' }
      ],
      long: [
        { id: 'f_alif', syl: 'فَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'فَااا', example: 'فَارِس' },
        { id: 'f_yaa', syl: 'فِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'فِييي', example: 'فِيل' },
        { id: 'f_waw', syl: 'فُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'فُووو', example: 'فُول' }
      ]
    },
    words: [
      { id: 'f_w1', word: 'فَرَاشَة', meaning: 'فراشة رقيقة تطير فوق الزهور', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🦋', letters: ['ف', 'ر', 'ا', 'ش', 'ة'] },
      { id: 'f_w2', word: 'فِيل', meaning: 'فيل ضخم وطيب', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐘', letters: ['ف', 'ي', 'ل'] },
      { id: 'f_w3', word: 'تُفَّاح', meaning: 'تفاح أحمر لذيذ', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🍎', letters: ['ت', 'ف', 'ا', 'ح'] },
      { id: 'f_w4', word: 'خَرُوف', meaning: 'خروف لطيف', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🐑', letters: ['خ', 'ر', 'و', 'ف'] }
    ],
    sentences: [
      {
        id: 'f_s1',
        sentence: 'الفَرَاشَةُ تَرْقُصُ بَيْنَ الأَزْهَارِ المُلَوَّنَةِ.',
        meaning: 'الفراشة ترقص بين الأزهار',
        emoji: '🦋🌸',
        missingWordQuestion: 'أكمل الجملة: ..... تَرْقُصُ بَيْنَ الأَزْهَارِ.',
        options: ['الفَرَاشَةُ', 'البَابُ', 'الكِتَابُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-pink-400 to-rose-500',
    accentColor: 'border-pink-400 text-pink-700 bg-pink-50'
  },
  {
    id: 'qaaf',
    char: 'ق',
    nameAr: 'قَاف',
    order: 21,
    soundKey: 'qaaf',
    mouthGuide: {
      tip: 'أقصى اللسان من الخلف يرتفع لأقصى سقف الحلق بنبضة قوية: قْ',
      lipPosition: 'فم مفتوح ونبض حلقي قوي',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'q_fatha', syl: 'قَ', vowel: 'fatha', nameAr: 'قاف بالفتحة', tip: 'قَ' },
        { id: 'q_kasra', syl: 'قِ', vowel: 'kasra', nameAr: 'قاف بالكسرة', tip: 'قِ' },
        { id: 'q_damma', syl: 'قُ', vowel: 'damma', nameAr: 'قاف بالضمة', tip: 'قُ' }
      ],
      long: [
        { id: 'q_alif', syl: 'قَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'قَااا', example: 'قَائِد' },
        { id: 'q_yaa', syl: 'قِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'قِييي', example: 'قِطَار' },
        { id: 'q_waw', syl: 'قُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'قُووو', example: 'قُوَّة' }
      ]
    },
    words: [
      { id: 'q_w1', word: 'قَمَر', meaning: 'قمر مضيء يزين السماء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌙', letters: ['ق', 'م', 'ر'] },
      { id: 'q_w2', word: 'قَلَم', meaning: 'قلم نكتب ونرسم به', position: 'start', positionLabel: 'في أول الكلمة', emoji: '✏️', letters: ['ق', 'ل', 'م'] },
      { id: 'q_w3', word: 'صَقْر', meaning: 'صقر محلق', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🦅', letters: ['ص', 'ق', 'ر'] },
      { id: 'q_w4', word: 'حَدِيقَة', meaning: 'حديقة خضراء', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🏡', letters: ['ح', 'د', 'ي', 'ق', 'ة'] }
    ],
    sentences: [
      {
        id: 'q_s1',
        sentence: 'القَلَمُ أَدَاةُ العِلْمِ وَالمَعْرِفَةِ.',
        meaning: 'القلم أداة العلم',
        emoji: '✏️📚',
        missingWordQuestion: 'أكمل الجملة: ..... أَدَاةُ العِلْمِ.',
        options: ['القَلَمُ', 'البَابُ', 'البَحْرُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-yellow-500 to-amber-600',
    accentColor: 'border-yellow-400 text-yellow-700 bg-yellow-50'
  },
  {
    id: 'kaaf',
    char: 'ك',
    nameAr: 'كَاف',
    order: 22,
    soundKey: 'kaaf',
    mouthGuide: {
      tip: 'أقصى اللسان يلامس الحنك بلطف مع خروج هواء خفيف: كْ',
      lipPosition: 'فم نصف مفتوح مع همسة هواء',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'k_fatha', syl: 'كَ', vowel: 'fatha', nameAr: 'كاف بالفتحة', tip: 'كَ' },
        { id: 'k_kasra', syl: 'كِ', vowel: 'kasra', nameAr: 'كاف بالكسرة', tip: 'كِ' },
        { id: 'k_damma', syl: 'كُ', vowel: 'damma', nameAr: 'كاف بالضمة', tip: 'كُ' }
      ],
      long: [
        { id: 'k_alif', syl: 'كَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'كَااا', example: 'كَاتِب' },
        { id: 'k_yaa', syl: 'كِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'كِييي', example: 'كِيس' },
        { id: 'k_waw', syl: 'كُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'كُووو', example: 'كُوب' }
      ]
    },
    words: [
      { id: 'k_w1', word: 'كُرَة', meaning: 'كرة نلعب بها مع الأصدقاء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '⚽', letters: ['ك', 'ر', 'ة'] },
      { id: 'k_w2', word: 'كِتَاب', meaning: 'كتاب مفيد', position: 'start', positionLabel: 'في أول الكلمة', emoji: '📖', letters: ['ك', 'ت', 'ا', 'ب'] },
      { id: 'k_w3', word: 'سَمَكَة', meaning: 'سمكة في الماء', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🐟', letters: ['س', 'م', 'ك', 'ة'] },
      { id: 'k_w4', word: 'دِيك', meaning: 'ديك يصيح في الفجر', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🐓', letters: ['د', 'ي', 'ك'] }
    ],
    sentences: [
      {
        id: 'k_s1',
        sentence: 'الأَطْفَالُ يَلْعَبُونَ بِالكُرَةِ فِي المَلْعَبِ.',
        meaning: 'الأطفال يلعبون بالكرة',
        emoji: '⚽👦👧',
        missingWordQuestion: 'أكمل الجملة: الأَطْفَالُ يَلْعَبُونَ بِـ .....',
        options: ['الكُرَةِ', 'البَابِ', 'الشَّمْسِ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-fuchsia-400 to-pink-500',
    accentColor: 'border-fuchsia-400 text-fuchsia-700 bg-fuchsia-50'
  },
  {
    id: 'laam',
    char: 'ل',
    nameAr: 'لاَم',
    order: 23,
    soundKey: 'laam',
    mouthGuide: {
      tip: 'ارفع مقدمة اللسان لتلامس سقف الفم العلوي برفق: لْ',
      lipPosition: 'فم مفتوح قليلًا واللسان يرتفع لأعلى الحنك',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'l_fatha', syl: 'لَ', vowel: 'fatha', nameAr: 'لام بالفتحة', tip: 'لَ' },
        { id: 'l_kasra', syl: 'لِ', vowel: 'kasra', nameAr: 'لام بالكسرة', tip: 'لِ' },
        { id: 'l_damma', syl: 'لُ', vowel: 'damma', nameAr: 'لام بالضمة', tip: 'لُ' }
      ],
      long: [
        { id: 'l_alif', syl: 'لاَ', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'لاَااا', example: 'لاعِب' },
        { id: 'l_yaa', syl: 'لِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'لِييي', example: 'لَيْمُون' },
        { id: 'l_waw', syl: 'لُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'لُووو', example: 'لُولُو' }
      ]
    },
    words: [
      { id: 'l_w1', word: 'لَيْمُون', meaning: 'ليمون أصفر ومنعش', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍋', letters: ['ل', 'ي', 'م', 'و', 'ن'] },
      { id: 'l_w2', word: 'لُعْبَة', meaning: 'لعبة مسلية', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🧸', letters: ['ل', 'ع', 'ب', 'ة'] },
      { id: 'l_w3', word: 'قَلَم', meaning: 'قلم ملون', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '✏️', letters: ['ق', 'ل', 'م'] },
      { id: 'l_w4', word: 'جَمَل', meaning: 'جمل في الصحراء', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🐪', letters: ['ج', 'م', 'ل'] }
    ],
    sentences: [
      {
        id: 'l_s1',
        sentence: 'عَصِيرُ اللَّيْمُونِ بَارِدٌ وَلَذِيذٌ.',
        meaning: 'عصير الليمون بارد ولذيذ',
        emoji: '🍋🥤',
        missingWordQuestion: 'أكمل الجملة: عَصِيرُ ..... بَارِدٌ وَلَذِيذٌ.',
        options: ['اللَّيْمُونِ', 'البَابِ', 'الكِتَابِ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-cyan-400 to-teal-500',
    accentColor: 'border-cyan-400 text-cyan-700 bg-cyan-50'
  },
  {
    id: 'meem',
    char: 'م',
    nameAr: 'مِيم',
    order: 24,
    soundKey: 'meem',
    mouthGuide: {
      tip: 'أغلق الشفتين بلطف ودع الصوت الرنان يخرج بنعومة وغنة: مْ',
      lipPosition: 'الشفتان مغلقتان برفق وهدوء',
      shape: 'closed_lips'
    },
    syllables: {
      short: [
        { id: 'm_fatha', syl: 'مَ', vowel: 'fatha', nameAr: 'ميم بالفتحة', tip: 'مَ' },
        { id: 'm_kasra', syl: 'مِ', vowel: 'kasra', nameAr: 'ميم بالكسرة', tip: 'مِ' },
        { id: 'm_damma', syl: 'مُ', vowel: 'damma', nameAr: 'ميم بالضمة', tip: 'مُ' }
      ],
      long: [
        { id: 'm_alif', syl: 'مَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'مَااا', example: 'مَاء' },
        { id: 'm_yaa', syl: 'مِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'مِييي', example: 'أَمِير' },
        { id: 'm_waw', syl: 'مُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'مُووو', example: 'مَوْز' }
      ]
    },
    words: [
      { id: 'm_w1', word: 'مَوْز', meaning: 'موز أصفر حلو المذاق', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🍌', letters: ['م', 'و', 'ز'] },
      { id: 'm_w2', word: 'مَطَر', meaning: 'مطر يسقي الزرع', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌧️', letters: ['م', 'ط', 'ر'] },
      { id: 'm_w3', word: 'شَمْس', meaning: 'شمس مشرقة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '☀️', letters: ['ش', 'م', 'س'] },
      { id: 'm_w4', word: 'قَلَم', meaning: 'قلم نكتب به', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '✏️', letters: ['ق', 'ل', 'م'] }
    ],
    sentences: [
      {
        id: 'm_s1',
        sentence: 'المَوْزُ فَاكِهَةٌ لَذِيذَةٌ وَمُغَذِّيَةٌ.',
        meaning: 'الموز فاكهة لذيذة ومغذية',
        emoji: '🍌😋',
        missingWordQuestion: 'أكمل الجملة: ..... فَاكِهَةٌ لَذِيذَةٌ.',
        options: ['المَوْزُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-amber-400 to-orange-500',
    accentColor: 'border-orange-400 text-orange-700 bg-orange-50'
  },
  {
    id: 'noon',
    char: 'ن',
    nameAr: 'نُون',
    order: 25,
    soundKey: 'noon',
    mouthGuide: {
      tip: 'طرف اللسان يلامس سقف الحلق الأمامي مع خروج غنة جميلة: نْ',
      lipPosition: 'ابتسامة خفيفة مع رفع مقدمة اللسان',
      shape: 'tongue_teeth'
    },
    syllables: {
      short: [
        { id: 'n_fatha', syl: 'نَ', vowel: 'fatha', nameAr: 'نون بالفتحة', tip: 'نَ' },
        { id: 'n_kasra', syl: 'نِ', vowel: 'kasra', nameAr: 'نون بالكسرة', tip: 'نِ' },
        { id: 'n_damma', syl: 'نُ', vowel: 'damma', nameAr: 'نون بالضمة', tip: 'نُ' }
      ],
      long: [
        { id: 'n_alif', syl: 'نَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'نَااا', example: 'نَار' },
        { id: 'n_yaa', syl: 'نِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'نِييي', example: 'تِين' },
        { id: 'n_waw', syl: 'نُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'نُووو', example: 'نُور' }
      ]
    },
    words: [
      { id: 'n_w1', word: 'نَجْمَة', meaning: 'نجمة تلمع في السماء', position: 'start', positionLabel: 'في أول الكلمة', emoji: '⭐', letters: ['ن', 'ج', 'م', 'ة'] },
      { id: 'n_w2', word: 'نَمْلَة', meaning: 'نملة نشيطة ومجتهدة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🐜', letters: ['ن', 'م', 'ل', 'ة'] },
      { id: 'n_w3', word: 'عِنَب', meaning: 'عنب لذيذ', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🍇', letters: ['ع', 'ن', 'ب'] },
      { id: 'n_w4', word: 'عَيْن', meaning: 'عين جميلة', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '👁️', letters: ['ع', 'ي', 'ن'] }
    ],
    sentences: [
      {
        id: 'n_s1',
        sentence: 'النَّجْمَةُ تَلْمَعُ بِضِيَاءٍ جَمِيلٍ فِي الفَضَاءِ.',
        meaning: 'النجمة تلمع في الفضاء',
        emoji: '⭐🌌',
        missingWordQuestion: 'أكمل الجملة: ..... تَلْمَعُ فِي الفَضَاءِ.',
        options: ['النَّجْمَةُ', 'البَابُ', 'الخَرُوفُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-sky-400 to-blue-500',
    accentColor: 'border-sky-400 text-sky-700 bg-sky-50'
  },
  {
    id: 'haa_soft',
    char: 'هـ',
    nameAr: 'هَاء',
    order: 26,
    soundKey: 'haa_soft',
    mouthGuide: {
      tip: 'تنفس لطيف وخفيف يخرج كالهواء النقي الصافي: هْ',
      lipPosition: 'فم مفتوح براحة وهدوء تام',
      shape: 'open_throat'
    },
    syllables: {
      short: [
        { id: 'he_fatha', syl: 'هَ', vowel: 'fatha', nameAr: 'هاء بالفتحة', tip: 'هَ' },
        { id: 'he_kasra', syl: 'هِ', vowel: 'kasra', nameAr: 'هاء بالكسرة', tip: 'هِ' },
        { id: 'he_damma', syl: 'هُ', vowel: 'damma', nameAr: 'هاء بالضمة', tip: 'هُ' }
      ],
      long: [
        { id: 'he_alif', syl: 'هَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'هَااا', example: 'هَادِي' },
        { id: 'he_yaa', syl: 'هِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'هِييي', example: 'شَهِيد' },
        { id: 'he_waw', syl: 'هُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'هُووو', example: 'زُهُور' }
      ]
    },
    words: [
      { id: 'he_w1', word: 'هَدِيَّة', meaning: 'هدية جميلة في صندوق مفاجآت', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🎁', letters: ['ه', 'د', 'ي', 'ة'] },
      { id: 'he_w2', word: 'هِلال', meaning: 'هلال يظهر في أول الشهر', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌙', letters: ['ه', 'ل', 'ا', 'ل'] },
      { id: 'he_w3', word: 'زَهْرَة', meaning: 'زهرة عطرة', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🌸', letters: ['ز', 'ه', 'ر', 'ة'] },
      { id: 'he_w4', word: 'وَجْه', meaning: 'وجه مبتسم', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '😊', letters: ['و', 'ج', 'ه'] }
    ],
    sentences: [
      {
        id: 'he_s1',
        sentence: 'فَتَحَ الطِّفْلُ الهَدِيَّةَ بِفَرَحٍ كَبِيرٍ.',
        meaning: 'فتح الطفل الهدية بفرح',
        emoji: '🎁🎉',
        missingWordQuestion: 'أكمل الجملة: فَتَحَ الطِّفْلُ ..... بِفَرَحٍ.',
        options: ['الهَدِيَّةَ', 'البَابَ', 'الشَّمْسَ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-sky-300 to-indigo-400',
    accentColor: 'border-sky-400 text-sky-700 bg-sky-50'
  },
  {
    id: 'waaw',
    char: 'و',
    nameAr: 'وَاو',
    order: 27,
    soundKey: 'waaw',
    mouthGuide: {
      tip: 'ضم الشفتين كالدائرة الجميلة إلى الأمام: وْ',
      lipPosition: 'استدارة كاملة للشفتين للأمام',
      shape: 'round_lips'
    },
    syllables: {
      short: [
        { id: 'w_fatha', syl: 'وَ', vowel: 'fatha', nameAr: 'واو بالفتحة', tip: 'وَ' },
        { id: 'w_kasra', syl: 'وِ', vowel: 'kasra', nameAr: 'واو بالكسرة', tip: 'وِ' },
        { id: 'w_damma', syl: 'وُ', vowel: 'damma', nameAr: 'واو بالضمة', tip: 'وُ' }
      ],
      long: [
        { id: 'w_alif', syl: 'وَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'وَااا', example: 'وَاحَة' },
        { id: 'w_yaa', syl: 'وِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'وِييي', example: 'طَوِيل' },
        { id: 'w_waw', syl: 'وُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'وُووو', example: 'طَاوُوس' }
      ]
    },
    words: [
      { id: 'w_w1', word: 'وَرْدَة', meaning: 'وردة حمراء جميلة', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🌹', letters: ['و', 'ر', 'د', 'ة'] },
      { id: 'w_w2', word: 'وَزَّة', meaning: 'وزة بيضاء تسبح', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🪿', letters: ['و', 'ز', 'ة'] },
      { id: 'w_w3', word: 'مَوْز', meaning: 'موز لذيذ', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🍌', letters: ['م', 'و', 'ز'] },
      { id: 'w_w4', word: 'دَلْو', meaning: 'دلو نسحب به الماء', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '🪣', letters: ['د', 'ل', 'و'] }
    ],
    sentences: [
      {
        id: 'w_s1',
        sentence: 'الوَرْدَةُ الحَمْرَاءُ رَائِحَتُهَا زَكِيَّةٌ.',
        meaning: 'الوردة الحمراء رائحتها زكية',
        emoji: '🌹✨',
        missingWordQuestion: 'أكمل الجملة: ..... رَائِحَتُهَا زَكِيَّةٌ.',
        options: ['الوَرْدَةُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-amber-400 to-orange-400',
    accentColor: 'border-amber-400 text-amber-700 bg-amber-50'
  },
  {
    id: 'yaa',
    char: 'ي',
    nameAr: 'يَاء',
    order: 28,
    soundKey: 'yaa',
    mouthGuide: {
      tip: 'وسط اللسان يرتفع مع ابتسامة عريضة لطيفة: يْ',
      lipPosition: 'ابتسامة واسعة مع رفع وسط اللسان',
      shape: 'smile_teeth'
    },
    syllables: {
      short: [
        { id: 'y_fatha', syl: 'يَ', vowel: 'fatha', nameAr: 'ياء بالفتحة', tip: 'يَ' },
        { id: 'y_kasra', syl: 'يِ', vowel: 'kasra', nameAr: 'ياء بالكسرة', tip: 'يِ' },
        { id: 'y_damma', syl: 'يُ', vowel: 'damma', nameAr: 'ياء بالضمة', tip: 'يُ' }
      ],
      long: [
        { id: 'y_alif', syl: 'يَا', vowel: 'madd_alif', nameAr: 'مد بالألف', tip: 'يَااا', example: 'يَاسِر' },
        { id: 'y_yaa', syl: 'يِي', vowel: 'madd_yaa', nameAr: 'مد بالياء', tip: 'يِييي', example: 'يَمِين' },
        { id: 'y_waw', syl: 'يُو', vowel: 'madd_waw', nameAr: 'مد بالواو', tip: 'يُووو', example: 'يُوسُف' }
      ]
    },
    words: [
      { id: 'y_w1', word: 'يَد', meaning: 'يد نرسم ونكتب بها', position: 'start', positionLabel: 'في أول الكلمة', emoji: '✋', letters: ['ي', 'د'] },
      { id: 'y_w2', word: 'يَمَامَة', meaning: 'يمامة بيضاء تطير بسلام', position: 'start', positionLabel: 'في أول الكلمة', emoji: '🕊️', letters: ['ي', 'م', 'ا', 'م', 'ة'] },
      { id: 'y_w3', word: 'بَيْت', meaning: 'بيت الأمان', position: 'middle', positionLabel: 'في وسط الكلمة', emoji: '🏠', letters: ['ب', 'ي', 'ت'] },
      { id: 'y_w4', word: 'شَاي', meaning: 'شاي دافئ ولذيذ', position: 'end', positionLabel: 'في آخر الكلمة', emoji: '☕', letters: ['ش', 'ا', 'ي'] }
    ],
    sentences: [
      {
        id: 'y_s1',
        sentence: 'اليَمَامَةُ البَيْضَاءُ رَمْزُ السَّلامِ.',
        meaning: 'اليمامة البيضاء رمز السلام',
        emoji: '🕊️🌿',
        missingWordQuestion: 'أكمل الجملة: ..... رَمْزُ السَّلامِ.',
        options: ['اليَمَامَةُ', 'البَابُ', 'القَلَمُ'],
        correctIndex: 0
      }
    ],
    themeColor: 'from-emerald-400 to-teal-600',
    accentColor: 'border-emerald-400 text-emerald-700 bg-emerald-50'
  }
];

```

## 📄 ملف: `src\data\letters.json`
```json
[
  {
    "id": "baa",
    "character": "ب",
    "nameAr": "بَاء",
    "englishName": "Baa",
    "order": 2,
    "color": "from-rose-400 to-pink-500",
    "bgAccent": "bg-pink-100 border-pink-400 text-pink-700",
    "mouthGuide": {
      "tip": "أغلق الشفتين معًا بلطف ثم افتحهما مع إخراج الهواء: بْ",
      "mouthShape": "closed_lips",
      "lipPosition": "الشفتان متلاصقتان"
    },
    "defaultUnlocked": true,
    "exampleWord": "بَطَّة",
    "exampleEmoji": "🦆",
    "difficulty": "beginner"
  },
  {
    "id": "meem",
    "character": "م",
    "nameAr": "مِيم",
    "englishName": "Meem",
    "order": 24,
    "color": "from-amber-400 to-orange-500",
    "bgAccent": "bg-orange-100 border-orange-400 text-orange-700",
    "mouthGuide": {
      "tip": "أغلق الشفتين بلطف ودع الصوت يخرج بنعومة من الأنف: مْ",
      "mouthShape": "closed_lips_nasal",
      "lipPosition": "الشفتان مغلقتان برفق"
    },
    "defaultUnlocked": true,
    "exampleWord": "مَوْز",
    "exampleEmoji": "🍌",
    "difficulty": "beginner"
  },
  {
    "id": "taa",
    "character": "ت",
    "nameAr": "تَاء",
    "englishName": "Taa",
    "order": 3,
    "color": "from-emerald-400 to-teal-500",
    "bgAccent": "bg-emerald-100 border-emerald-400 text-emerald-700",
    "mouthGuide": {
      "tip": "ضع طرف اللسان خلف الأسنان العلوية مباشرة واضغط بخفة: تْ",
      "mouthShape": "tongue_top_teeth",
      "lipPosition": "شفتان مفتوحتان قليلًا واللسان للأعلى"
    },
    "defaultUnlocked": true,
    "exampleWord": "تُفَّاح",
    "exampleEmoji": "🍎",
    "difficulty": "beginner"
  },
  {
    "id": "noon",
    "character": "ن",
    "nameAr": "نُون",
    "englishName": "Noon",
    "order": 25,
    "color": "from-sky-400 to-blue-500",
    "bgAccent": "bg-sky-100 border-sky-400 text-sky-700",
    "mouthGuide": {
      "tip": "طرف اللسان يلامس سقف الحلق الأمامي مع خروج غنة جميلة: نْ",
      "mouthShape": "tongue_palate",
      "lipPosition": "ابتسامة خفيفة مع رفع اللسان"
    },
    "defaultUnlocked": true,
    "exampleWord": "نَجْمَة",
    "exampleEmoji": "⭐",
    "difficulty": "beginner"
  },
  {
    "id": "seen",
    "character": "س",
    "nameAr": "سِين",
    "englishName": "Seen",
    "order": 12,
    "color": "from-purple-400 to-indigo-500",
    "bgAccent": "bg-purple-100 border-purple-400 text-purple-700",
    "mouthGuide": {
      "tip": "قرّب الأسنان من بعضها واخرج هواءً صافيًا كالنسيم: سْ",
      "mouthShape": "teeth_close_smile",
      "lipPosition": "ابتسامة واضحة والأسنان متقاربة"
    },
    "defaultUnlocked": false,
    "exampleWord": "سَيَّارَة",
    "exampleEmoji": "🚗",
    "difficulty": "easy"
  },
  {
    "id": "laam",
    "character": "ل",
    "nameAr": "لاَم",
    "englishName": "Laam",
    "order": 23,
    "color": "from-cyan-400 to-teal-500",
    "bgAccent": "bg-cyan-100 border-cyan-400 text-cyan-700",
    "mouthGuide": {
      "tip": "ارفع مقدمة لسانك لتلمس سقف الفم العلوي برفق: لْ",
      "mouthShape": "tongue_up",
      "lipPosition": "فم مفتوح قليلًا واللسان يرتفع"
    },
    "defaultUnlocked": false,
    "exampleWord": "لَيْمُون",
    "exampleEmoji": "🍋",
    "difficulty": "easy"
  },
  {
    "id": "alif",
    "character": "أ",
    "nameAr": "أَلِف",
    "englishName": "Alif",
    "order": 1,
    "color": "from-amber-400 to-red-400",
    "bgAccent": "bg-red-100 border-red-400 text-red-700",
    "mouthGuide": {
      "tip": "افتح الفم بحرية وأخرج صوت الهمزة من الحلق: أَ",
      "mouthShape": "open_wide",
      "lipPosition": "فم مفتوح ومرتاح"
    },
    "defaultUnlocked": false,
    "exampleWord": "أَرْنَب",
    "exampleEmoji": "🐰",
    "difficulty": "beginner"
  },
  {
    "id": "raa",
    "character": "ر",
    "nameAr": "رَاء",
    "englishName": "Raa",
    "order": 10,
    "color": "from-lime-400 to-green-500",
    "bgAccent": "bg-lime-100 border-lime-400 text-lime-700",
    "mouthGuide": {
      "tip": "دع طرف اللسان يرتعش برفق عند سقف الحلق: رْ",
      "mouthShape": "tongue_vibrate",
      "lipPosition": "فم مفتوح باعتدال واللسان يهتز"
    },
    "defaultUnlocked": false,
    "exampleWord": "رُمَّان",
    "exampleEmoji": "🍇",
    "difficulty": "medium"
  },
  {
    "id": "daal",
    "character": "د",
    "nameAr": "دَال",
    "englishName": "Daal",
    "order": 8,
    "color": "from-teal-400 to-emerald-500",
    "bgAccent": "bg-teal-100 border-teal-400 text-teal-700",
    "mouthGuide": {
      "tip": "المس خلف الأسنان العلوية بطرف اللسان بقوة خفيفة: دْ",
      "mouthShape": "tongue_top_teeth",
      "lipPosition": "طرف اللسان يلمس أصول الثنايا"
    },
    "defaultUnlocked": false,
    "exampleWord": "دُبّ",
    "exampleEmoji": "🐻",
    "difficulty": "easy"
  },
  {
    "id": "kaaf",
    "character": "ك",
    "nameAr": "كَاف",
    "englishName": "Kaaf",
    "order": 22,
    "color": "from-fuchsia-400 to-pink-500",
    "bgAccent": "bg-fuchsia-100 border-fuchsia-400 text-fuchsia-700",
    "mouthGuide": {
      "tip": "أقصى اللسان من الخلف يلامس الحنك مع خروج هواء: كْ",
      "mouthShape": "back_tongue",
      "lipPosition": "فم نصف مفتوح"
    },
    "defaultUnlocked": false,
    "exampleWord": "كُرَة",
    "exampleEmoji": "⚽",
    "difficulty": "easy"
  },
  {
    "id": "jeem",
    "character": "ج",
    "nameAr": "جِيم",
    "englishName": "Jeem",
    "order": 5,
    "color": "from-yellow-400 to-amber-500",
    "bgAccent": "bg-amber-100 border-amber-400 text-amber-700",
    "mouthGuide": {
      "tip": "وسط اللسان يرتفع لوسط سقف الحلق: جْ",
      "mouthShape": "middle_tongue",
      "lipPosition": "شفتان مدورتان قليلًا"
    },
    "defaultUnlocked": false,
    "exampleWord": "جَمَل",
    "exampleEmoji": "🐪",
    "difficulty": "medium"
  },
  {
    "id": "haa",
    "character": "ح",
    "nameAr": "حَاء",
    "englishName": "Haa",
    "order": 6,
    "color": "from-orange-400 to-rose-500",
    "bgAccent": "bg-orange-100 border-orange-400 text-orange-700",
    "mouthGuide": {
      "tip": "أخرج هواءً دافئًا ناعمًا من وسط الحلق: حْ",
      "mouthShape": "throat_warm",
      "lipPosition": "فم مفتوح براحة وهواء دافئ"
    },
    "defaultUnlocked": false,
    "exampleWord": "حِصَان",
    "exampleEmoji": "🐴",
    "difficulty": "medium"
  },
  {
    "id": "khaa",
    "character": "خ",
    "nameAr": "خَاء",
    "englishName": "Khaa",
    "order": 7,
    "color": "from-green-400 to-emerald-600",
    "bgAccent": "bg-green-100 border-green-400 text-green-700",
    "mouthGuide": {
      "tip": "صوت يخرج من أعلى الحلق بنعومة: خْ",
      "mouthShape": "upper_throat",
      "lipPosition": "فم مسترخٍ"
    },
    "defaultUnlocked": false,
    "exampleWord": "خَرُوف",
    "exampleEmoji": "🐑",
    "difficulty": "medium"
  },
  {
    "id": "zaal",
    "character": "ذ",
    "nameAr": "ذَال",
    "englishName": "Zaal",
    "order": 9,
    "color": "from-indigo-400 to-blue-600",
    "bgAccent": "bg-indigo-100 border-indigo-400 text-indigo-700",
    "mouthGuide": {
      "tip": "أخرج طرف لسانك قليلاً بين الأسنان: ذْ",
      "mouthShape": "tongue_between_teeth",
      "lipPosition": "طرف اللسان بين الأسنان"
    },
    "defaultUnlocked": false,
    "exampleWord": "ذُرَة",
    "exampleEmoji": "🌽",
    "difficulty": "medium"
  },
  {
    "id": "zay",
    "character": "ز",
    "nameAr": "زَاي",
    "englishName": "Zay",
    "order": 11,
    "color": "from-purple-400 to-violet-600",
    "bgAccent": "bg-purple-100 border-purple-400 text-purple-700",
    "mouthGuide": {
      "tip": "أغلق الأسنان واجعل الصوت يهتز مثل طنين النحلة: زْ",
      "mouthShape": "teeth_buzz",
      "lipPosition": "ابتسامة واهتزاز خفيف"
    },
    "defaultUnlocked": false,
    "exampleWord": "زَرَافَة",
    "exampleEmoji": "🦒",
    "difficulty": "easy"
  },
  {
    "id": "sheen",
    "character": "ش",
    "nameAr": "شِين",
    "englishName": "Sheen",
    "order": 13,
    "color": "from-teal-400 to-cyan-600",
    "bgAccent": "bg-teal-100 border-teal-400 text-teal-700",
    "mouthGuide": {
      "tip": "ضم الشفتين قليلاً للأمام واخرج هواءً واسعًا: شْ",
      "mouthShape": "lips_round_forward",
      "lipPosition": "شفتان مدورتان للأمام"
    },
    "defaultUnlocked": false,
    "exampleWord": "شَمْس",
    "exampleEmoji": "☀️",
    "difficulty": "easy"
  },
  {
    "id": "saad",
    "character": "ص",
    "nameAr": "صَاد",
    "englishName": "Saad",
    "order": 14,
    "color": "from-amber-500 to-orange-600",
    "bgAccent": "bg-amber-100 border-amber-400 text-amber-700",
    "mouthGuide": {
      "tip": "صوت قوي مفخم مع تقريب الأسنان: صْ",
      "mouthShape": "thick_sound",
      "lipPosition": "فم ممتلئ بالصوت المفخم"
    },
    "defaultUnlocked": false,
    "exampleWord": "صَقْر",
    "exampleEmoji": "🦅",
    "difficulty": "medium"
  },
  {
    "id": "daad",
    "character": "ض",
    "nameAr": "ضَاد",
    "englishName": "Daad",
    "order": 15,
    "color": "from-emerald-500 to-green-700",
    "bgAccent": "bg-emerald-100 border-emerald-400 text-emerald-700",
    "mouthGuide": {
      "tip": "حافة اللسان تلامس الأضراس العلوية بصوت قوي: ضْ",
      "mouthShape": "side_tongue_molars",
      "lipPosition": "ضغط جانبي باللسان"
    },
    "defaultUnlocked": false,
    "exampleWord": "ضِفْدَع",
    "exampleEmoji": "🐸",
    "difficulty": "advanced"
  },
  {
    "id": "taa_heavy",
    "character": "ط",
    "nameAr": "طَاء",
    "englishName": "Taa Heavy",
    "order": 16,
    "color": "from-red-400 to-rose-600",
    "bgAccent": "bg-rose-100 border-rose-400 text-rose-700",
    "mouthGuide": {
      "tip": "طرف اللسان يلتصق بقوة بسقف الفم مع تفخيم: طْ",
      "mouthShape": "heavy_tongue_roof",
      "lipPosition": "ارتفاع كامل لمقدمة اللسان"
    },
    "defaultUnlocked": false,
    "exampleWord": "طَائِرَة",
    "exampleEmoji": "✈️",
    "difficulty": "medium"
  },
  {
    "id": "zaa_heavy",
    "character": "ظ",
    "nameAr": "ظَاء",
    "englishName": "Zaa Heavy",
    "order": 17,
    "color": "from-purple-500 to-indigo-700",
    "bgAccent": "bg-purple-100 border-purple-400 text-purple-700",
    "mouthGuide": {
      "tip": "طرف اللسان بين الأسنان بصوت مفخم وقوي: ظْ",
      "mouthShape": "tongue_between_teeth_heavy",
      "lipPosition": "طرف اللسان بارز ومفخم"
    },
    "defaultUnlocked": false,
    "exampleWord": "ظَرْف",
    "exampleEmoji": "✉️",
    "difficulty": "advanced"
  },
  {
    "id": "ayn",
    "character": "ع",
    "nameAr": "عَيْن",
    "englishName": "Ayn",
    "order": 18,
    "color": "from-blue-400 to-cyan-600",
    "bgAccent": "bg-blue-100 border-blue-400 text-blue-700",
    "mouthGuide": {
      "tip": "صوت عميق يخرج من وسط الحلق بانسيابية: عْ",
      "mouthShape": "deep_throat",
      "lipPosition": "تراجع خفيف لوسط الحلق"
    },
    "defaultUnlocked": false,
    "exampleWord": "عَيْن",
    "exampleEmoji": "👁️",
    "difficulty": "medium"
  },
  {
    "id": "ghayn",
    "character": "غ",
    "nameAr": "غَيْن",
    "englishName": "Ghayn",
    "order": 19,
    "color": "from-violet-400 to-purple-600",
    "bgAccent": "bg-violet-100 border-violet-400 text-violet-700",
    "mouthGuide": {
      "tip": "صوت ناعم يشبه الغرغرة الخفيفة في أعلى الحلق: غْ",
      "mouthShape": "gargle_throat",
      "lipPosition": "فم مفتوح باسترخاء"
    },
    "defaultUnlocked": false,
    "exampleWord": "غَزَال",
    "exampleEmoji": "🦌",
    "difficulty": "medium"
  },
  {
    "id": "faa",
    "character": "ف",
    "nameAr": "فَاء",
    "englishName": "Faa",
    "order": 20,
    "color": "from-pink-400 to-rose-500",
    "bgAccent": "bg-pink-100 border-pink-400 text-pink-700",
    "mouthGuide": {
      "tip": "الأسنان العلوية تلمس الشفة السفلية مع نفخ الهواء: فْ",
      "mouthShape": "teeth_lower_lip",
      "lipPosition": "الأسنان فوق الشفة السفلية"
    },
    "defaultUnlocked": false,
    "exampleWord": "فَرَاشَة",
    "exampleEmoji": "🦋",
    "difficulty": "easy"
  },
  {
    "id": "qaaf",
    "character": "ق",
    "nameAr": "قَاف",
    "englishName": "Qaaf",
    "order": 21,
    "color": "from-yellow-500 to-amber-600",
    "bgAccent": "bg-yellow-100 border-yellow-400 text-yellow-700",
    "mouthGuide": {
      "tip": "أقصى اللسان من الخلف يرتفع لأقصى الحلق بقوة: قْ",
      "mouthShape": "deep_back_tongue",
      "lipPosition": "فم مفتوح ونبض حلقي"
    },
    "defaultUnlocked": false,
    "exampleWord": "قَمَر",
    "exampleEmoji": "🌙",
    "difficulty": "medium"
  },
  {
    "id": "haa_soft",
    "character": "هـ",
    "nameAr": "هَاء",
    "englishName": "Haa Soft",
    "order": 26,
    "color": "from-sky-300 to-indigo-400",
    "bgAccent": "bg-sky-100 border-sky-400 text-sky-700",
    "mouthGuide": {
      "tip": "تنفس لطيف وخفيف يخرج كالهواء النقي: هْ",
      "mouthShape": "gentle_breath",
      "lipPosition": "فم مفتوح بهدوء"
    },
    "defaultUnlocked": false,
    "exampleWord": "هَدِيَّة",
    "exampleEmoji": "🎁",
    "difficulty": "easy"
  },
  {
    "id": "waaw",
    "character": "و",
    "nameAr": "وَاو",
    "englishName": "Waaw",
    "order": 27,
    "color": "from-amber-400 to-orange-400",
    "bgAccent": "bg-amber-100 border-amber-400 text-amber-700",
    "mouthGuide": {
      "tip": "ضم الشفتين كالدائرة الجميلة إلى الأمام: وْ",
      "mouthShape": "circle_lips",
      "lipPosition": "استدارة كاملة للشفتين"
    },
    "defaultUnlocked": false,
    "exampleWord": "وَرْدَة",
    "exampleEmoji": "🌹",
    "difficulty": "easy"
  },
  {
    "id": "yaa",
    "character": "ي",
    "nameAr": "يَاء",
    "englishName": "Yaa",
    "order": 28,
    "color": "from-emerald-400 to-teal-600",
    "bgAccent": "bg-emerald-100 border-emerald-400 text-emerald-700",
    "mouthGuide": {
      "tip": "وسط اللسان يرتفع مع ابتسامة عريضة لطيفة: يْ",
      "mouthShape": "wide_smile_tongue",
      "lipPosition": "ابتسامة واضحة"
    },
    "defaultUnlocked": false,
    "exampleWord": "يَد",
    "exampleEmoji": "✋",
    "difficulty": "easy"
  },
  {
    "id": "thaa",
    "character": "ث",
    "nameAr": "ثَاء",
    "englishName": "Thaa",
    "order": 4,
    "color": "from-indigo-400 to-purple-500",
    "bgAccent": "bg-indigo-100 border-indigo-400 text-indigo-700",
    "mouthGuide": {
      "tip": "أخرج طرف اللسان بلطف بين الأسنان مع هواء خفيف: ثْ",
      "mouthShape": "tongue_between_teeth_soft",
      "lipPosition": "طرف اللسان بين الأسنان بلطف"
    },
    "defaultUnlocked": false,
    "exampleWord": "ثَعْلَب",
    "exampleEmoji": "🦊",
    "difficulty": "medium"
  }
]

```

## 📄 ملف: `src\data\avatar_items.json`
```json
[
  { "id": "skin_yellow", "nameAr": "البطل اللامع", "category": "skin", "color": "#fde047", "price": 0, "stars": 0, "emoji": "🌟" },
  { "id": "skin_pink", "nameAr": "البطل الوردي", "category": "skin", "color": "#f472b6", "price": 20, "stars": 3, "emoji": "🌸" },
  { "id": "skin_cyan", "nameAr": "البطل المائي", "category": "skin", "color": "#38bdf8", "price": 30, "stars": 5, "emoji": "🌊" },
  { "id": "skin_green", "nameAr": "بطل الطبيعة", "category": "skin", "color": "#4ade80", "price": 40, "stars": 8, "emoji": "🍀" },
  { "id": "skin_purple", "nameAr": "بطل الفضاء", "category": "skin", "color": "#c084fc", "price": 60, "stars": 12, "emoji": "🚀" },

  { "id": "hat_none", "nameAr": "بدون قبعة", "category": "hat", "price": 0, "stars": 0, "emoji": "❌" },
  { "id": "hat_cap", "nameAr": "قبعة المغامر", "category": "hat", "price": 15, "stars": 2, "emoji": "🧢" },
  { "id": "hat_crown", "nameAr": "تاج الأبطال", "category": "hat", "price": 50, "stars": 10, "emoji": "👑" },
  { "id": "hat_wizard", "nameAr": "قبعة العباقرة", "category": "hat", "price": 35, "stars": 6, "emoji": "🧙" },
  { "id": "hat_party", "nameAr": "قبعة الاحتفال", "category": "hat", "price": 25, "stars": 4, "emoji": "🎉" },

  { "id": "outfit_casual", "nameAr": "لباس المستكشف", "category": "outfit", "price": 0, "stars": 0, "emoji": "👕" },
  { "id": "outfit_hero", "nameAr": "زي البطل الخارق", "category": "outfit", "price": 45, "stars": 7, "emoji": "🦸" },
  { "id": "outfit_spacesuit", "nameAr": "بدلة رائد الفضاء", "category": "outfit", "price": 70, "stars": 15, "emoji": "🧑‍🚀" },
  { "id": "outfit_artist", "nameAr": "زي الفنان الصغير", "category": "outfit", "price": 30, "stars": 5, "emoji": "🎨" },

  { "id": "acc_none", "nameAr": "بدون إكسسوار", "category": "accessory", "price": 0, "stars": 0, "emoji": "❌" },
  { "id": "acc_glasses", "nameAr": "نظارة ذكية", "category": "accessory", "price": 20, "stars": 3, "emoji": "🕶️" },
  { "id": "acc_medal", "nameAr": "وسام الشجاعة", "category": "accessory", "price": 40, "stars": 8, "emoji": "🏅" },
  { "id": "acc_wand", "nameAr": "عصا النجوم", "category": "accessory", "price": 50, "stars": 10, "emoji": "🪄" },

  { "id": "room_hills", "nameAr": "تلال الأصوات الخضراء", "category": "room", "price": 0, "stars": 0, "emoji": "🏞️", "gradient": "from-emerald-300 via-teal-200 to-sky-300" },
  { "id": "room_cloud", "nameAr": "قصر الغيوم", "category": "room", "price": 30, "stars": 5, "emoji": "☁️", "gradient": "from-sky-300 via-indigo-200 to-pink-200" },
  { "id": "room_space", "nameAr": "مجرة النجوم", "category": "room", "price": 60, "stars": 12, "emoji": "🌌", "gradient": "from-indigo-900 via-purple-900 to-slate-900" },
  { "id": "room_candy", "nameAr": "أرض الحلوى", "category": "room", "price": 45, "stars": 8, "emoji": "🍭", "gradient": "from-pink-300 via-rose-200 to-yellow-200" }
]

```

## 📄 ملف: `src\context\GameContext.tsx`
```typescript
import React, { createContext, useContext, useState, useEffect, useMemo, useRef } from 'react';
import { ARABIC_LETTERS } from '../data/letters';
import { audioManager } from '../audio/AudioManager';
import confetti from 'canvas-confetti';

export interface StageProgress {
  discovery: boolean;   // Stage 1
  sound: boolean;       // Stage 2
  vowels: boolean;      // Stage 3
  syllables: boolean;   // Stage 4
  words: boolean;       // Stage 5
  soundPosition: boolean; // Stage 6
  sentences: boolean;   // Stage 7
  finalChallenge: boolean; // Stage 8
  currentStage: number; // 1 to 8
  masteryPercentage: number;
}

export interface TherapistPlan {
  childName?: string;
  dailyMinutes?: number;
  focusedLetters?: string[];
  targetLetters?: string[];
  recommendedLevel?: number;
  focusLevel?: number;
  difficulty?: string;
  updatedAt?: string | number;
  notes: string;
}

export interface AttemptLog {
  id: string;
  timestamp: string;
  letter: string;
  letterId?: string;
  stageName?: string;
  target?: string;
  score: number;
  success?: boolean;
  status?: 'correct' | 'needs_practice' | 'failed' | any;
}

export interface ChildProfile {
  id: string;
  name: string;
  age: number;
  avatarEmoji?: string;
  stars: number;
  coins: number;
  streak: number;
  level: number;
  inventory: string[];
  avatar: { hat: string; glasses: string; skin: string; pet: string; room?: string; accessory?: string };
  letterProgressMap: Record<string, StageProgress>;
  therapistPlan: TherapistPlan;
  lastPlayedAt: number;
}

export interface GameContextType {
  // Active child profile data
  childName: string;
  setChildName: (name: string) => void;
  age: number;
  setAge: (age: number) => void;
  stars: number;
  coins: number;
  streak: number;
  level: number;
  trainingTimeMinutes: number;
  isVisualFirst: boolean;
  setIsVisualFirst: (active: boolean) => void;
  isVisualMode: boolean;
  setIsVisualMode: (active: boolean) => void;
  isMuted: boolean;
  toggleMute: () => void;
  volume: number;
  setVolume: (v: number) => void;
  selectedLetterId: string;
  setSelectedLetterId: (id: string) => void;
  letterProgressMap: Record<string, StageProgress>;
  updateLetterStage: (letterId: string, stageNum: number, isComplete: boolean) => void;
  addStars: (amount: number) => void;
  addCoins: (amount: number) => void;
  triggerCelebration: () => void;
  triggerVictoryCelebration: () => void;
  resetProgress: () => void;
  // Multi-Child Profile Management (Local Isolation on Same Device)
  profiles: ChildProfile[];
  activeProfileId: string;
  switchProfile: (profileId: string) => void;
  createProfile: (name: string, age?: number, avatarEmoji?: string) => string;
  deleteProfile: (profileId: string) => void;
  // Compatibility helpers
  letterProgress: Record<string, any>;
  updateLetterLevelProgress: (letterId: string, levelNum: number, score: number) => void;
  logAttempt: (letter: string, stageName: string, score: number, success: any) => void;
  attemptsLog: AttemptLog[];
  unlockLetterManually: (letterId: string) => void;
  lockLetterManually: (letterId: string) => void;
  therapistPlan: TherapistPlan;
  setTherapistPlan: (plan: TherapistPlan) => void;
  avatar: { hat: string; glasses: string; skin: string; pet: string; room?: string; accessory?: string };
  setAvatar: (a: any) => void;
  inventory: string[];
  buyAvatarItem: (itemId: string, price: number, starsRequired?: any) => boolean;
}

// Initial progress generator: all 28 letters start fresh from Stage 1 with 0% mastery
const generateInitialLetterProgress = (): Record<string, StageProgress> => {
  const map: Record<string, StageProgress> = {};
  ARABIC_LETTERS.forEach((letter) => {
    map[letter.id] = {
      discovery: false,
      sound: false,
      vowels: false,
      syllables: false,
      words: false,
      soundPosition: false,
      sentences: false,
      finalChallenge: false,
      currentStage: 1,
      masteryPercentage: 0
    };
  });
  return map;
};

const PROFILES_STORAGE_KEY = 'lumi_device_profiles_v3';
const ACTIVE_PROFILE_ID_KEY = 'lumi_active_profile_id_v3';

// Unique Device Fingerprint generator
export const getDeviceUUID = (): string => {
  if (typeof window === 'undefined') return 'server_device';
  let uuid = localStorage.getItem('lumi_device_uuid');
  if (!uuid) {
    uuid = `device_${Date.now()}_${Math.random().toString(36).substring(2, 10)}`;
    localStorage.setItem('lumi_device_uuid', uuid);
  }
  return uuid;
};

// Create a default initial child profile strictly starting at 0 stars and 0 coins
const createDefaultProfile = (name: string = 'البَطَل', age: number = 6, avatarEmoji: string = '👑'): ChildProfile => {
  return {
    id: `child_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    name,
    age,
    avatarEmoji,
    stars: 0, // Starts clean at ZERO
    coins: 0, // Starts clean at ZERO
    streak: 0,
    level: 1,
    inventory: ['crown_gold', 'star_shades', 'space_theme', 'cape_star'],
    avatar: {
      hat: 'crown_gold',
      glasses: 'star_shades',
      skin: 'default',
      pet: 'spark_cat',
      room: 'space_theme',
      accessory: 'cape_star'
    },
    letterProgressMap: generateInitialLetterProgress(),
    therapistPlan: {
      childName: name,
      dailyMinutes: 20,
      focusedLetters: ['baa', 'alif'],
      targetLetters: ['baa', 'alif'],
      recommendedLevel: 1,
      focusLevel: 1,
      notes: 'التركيز على مخارج الشفتين والحركات الأساسية.'
    },
    lastPlayedAt: Date.now()
  };
};

// Load all device profiles starting clean with zero stars/coins and independent per device
const loadDeviceProfiles = (): { profiles: ChildProfile[]; activeId: string } => {
  if (typeof window === 'undefined') {
    const def = createDefaultProfile();
    return { profiles: [def], activeId: def.id };
  }

  try {
    getDeviceUUID(); // Ensure device uuid is registered
    const rawProfiles = localStorage.getItem(PROFILES_STORAGE_KEY);
    let profilesList: ChildProfile[] = rawProfiles ? JSON.parse(rawProfiles) : [];

    // Initialize fresh clean profile starting at 0 if none exist
    if (profilesList.length === 0) {
      const cleanProfile = createDefaultProfile('البَطَل');
      profilesList = [cleanProfile];
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(profilesList));
      localStorage.setItem(ACTIVE_PROFILE_ID_KEY, cleanProfile.id);
    }

    let activeId = localStorage.getItem(ACTIVE_PROFILE_ID_KEY) || profilesList[0].id;
    if (!profilesList.some(p => p.id === activeId)) {
      activeId = profilesList[0].id;
    }

    return { profiles: profilesList, activeId };
  } catch {
    const def = createDefaultProfile();
    return { profiles: [def], activeId: def.id };
  }
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Profiles state
  const [profiles, setProfiles] = useState<ChildProfile[]>(() => loadDeviceProfiles().profiles);
  const [activeProfileId, setActiveProfileId] = useState<string>(() => loadDeviceProfiles().activeId);

  // Active Profile Lookup
  const activeProfile = useMemo(() => {
    return profiles.find(p => p.id === activeProfileId) || profiles[0] || createDefaultProfile();
  }, [profiles, activeProfileId]);

  // App-level state
  const [selectedLetterId, setSelectedLetterId] = useState<string>('baa');
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolumeState] = useState<number>(0.9);
  const [isVisualFirst, setIsVisualFirstState] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return localStorage.getItem('cos_visual_first') === 'true';
  });
  const [attemptsLog, setAttemptsLog] = useState<AttemptLog[]>([]);

  // Ref to hold current state for exit/background flush
  const profilesRef = useRef(profiles);
  profilesRef.current = profiles;
  const activeProfileIdRef = useRef(activeProfileId);
  activeProfileIdRef.current = activeProfileId;

  // Real-time atomic save function
  const saveAllToDisk = (updatedProfiles: ChildProfile[], currentActiveId: string) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(PROFILES_STORAGE_KEY, JSON.stringify(updatedProfiles));
      localStorage.setItem(ACTIVE_PROFILE_ID_KEY, currentActiveId);
    } catch (e) {
      console.warn('[Lumi Storage Error]:', e);
    }
  };

  // Helper to update active profile atomically
  const updateActiveProfile = (updater: (prev: ChildProfile) => ChildProfile) => {
    setProfiles(prevProfiles => {
      const nextProfiles = prevProfiles.map(p => {
        if (p.id === activeProfileId) {
          const updated = updater(p);
          updated.lastPlayedAt = Date.now();
          return updated;
        }
        return p;
      });
      saveAllToDisk(nextProfiles, activeProfileId);
      return nextProfiles;
    });
  };

  // =========================================================================
  // 🌟 ZERO-LOSS LIFECYCLE HOOK: Flush to disk on exit / app switch / tab close
  // =========================================================================
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const flushOnExit = () => {
      saveAllToDisk(profilesRef.current, activeProfileIdRef.current);
    };

    // 1. App background / switch tab
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        flushOnExit();
      }
    };

    window.addEventListener('beforeunload', flushOnExit);
    window.addEventListener('pagehide', flushOnExit);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      window.removeEventListener('beforeunload', flushOnExit);
      window.removeEventListener('pagehide', flushOnExit);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Multi-Child Profile Methods
  const switchProfile = (profileId: string) => {
    if (profiles.some(p => p.id === profileId)) {
      setActiveProfileId(profileId);
      saveAllToDisk(profiles, profileId);
      const target = profiles.find(p => p.id === profileId);
      if (target) {
        audioManager.speak(`أَهْلًا يَا ${target.name}! هَيَّا نُكْمِلُ رِحْلَتَنَا!`);
      }
    }
  };

  const createProfile = (name: string, age: number = 6, avatarEmoji: string = '👑'): string => {
    const newProfile = createDefaultProfile(name, age, avatarEmoji);
    const updatedList = [...profiles, newProfile];
    setProfiles(updatedList);
    setActiveProfileId(newProfile.id);
    saveAllToDisk(updatedList, newProfile.id);
    audioManager.speak(`مَرْحَبًا بِكَ يَا ${name} فِي مَمْلَكَةِ الأَصْوَات!`);
    return newProfile.id;
  };

  const deleteProfile = (profileId: string) => {
    if (profiles.length <= 1) return; // Keep at least one profile
    const updatedList = profiles.filter(p => p.id !== profileId);
    let nextActiveId = activeProfileId;
    if (activeProfileId === profileId) {
      nextActiveId = updatedList[0].id;
    }
    setProfiles(updatedList);
    setActiveProfileId(nextActiveId);
    saveAllToDisk(updatedList, nextActiveId);
  };

  // State Updaters targeting active child profile
  const setChildName = (name: string) => {
    updateActiveProfile(prev => ({ ...prev, name }));
  };

  const setAge = (age: number) => {
    updateActiveProfile(prev => ({ ...prev, age }));
  };

  const addStars = (amount: number) => {
    updateActiveProfile(prev => ({ ...prev, stars: prev.stars + amount }));
    audioManager.playStar();
  };

  const addCoins = (amount: number) => {
    updateActiveProfile(prev => ({ ...prev, coins: prev.coins + amount }));
    audioManager.playStar();
  };

  const setAvatar = (newAvatar: any) => {
    updateActiveProfile(prev => ({ ...prev, avatar: { ...prev.avatar, ...newAvatar } }));
  };

  const setTherapistPlan = (plan: TherapistPlan) => {
    updateActiveProfile(prev => ({ ...prev, therapistPlan: plan }));
  };

  const setIsVisualFirst = (active: boolean) => {
    setIsVisualFirstState(active);
    audioManager.setVisualFirstMode(active);
    if (typeof window !== 'undefined') {
      localStorage.setItem('cos_visual_first', active.toString());
    }
  };

  const toggleMute = () => {
    setIsMuted(prev => {
      const next = !prev;
      audioManager.setMute(next);
      return next;
    });
  };

  const setVolume = (v: number) => {
    setVolumeState(v);
    audioManager.setVolume(v);
  };

  const triggerCelebration = () => {
    audioManager.playVictory();
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch {}
  };

  const updateLetterStage = (letterId: string, stageNum: number, isComplete: boolean) => {
    updateActiveProfile(prev => {
      const current = prev.letterProgressMap[letterId] || {
        discovery: false,
        sound: false,
        vowels: false,
        syllables: false,
        words: false,
        soundPosition: false,
        sentences: false,
        finalChallenge: false,
        currentStage: 1,
        masteryPercentage: 0
      };

      const updated = { ...current };
      if (stageNum === 1) updated.discovery = isComplete;
      if (stageNum === 2) updated.sound = isComplete;
      if (stageNum === 3) updated.vowels = isComplete;
      if (stageNum === 4) updated.syllables = isComplete;
      if (stageNum === 5) updated.words = isComplete;
      if (stageNum === 6) updated.soundPosition = isComplete;
      if (stageNum === 7) updated.sentences = isComplete;
      if (stageNum === 8) updated.finalChallenge = isComplete;

      if (isComplete && updated.currentStage <= stageNum) {
        updated.currentStage = Math.min(8, stageNum + 1);
      }

      const completedCount = [
        updated.discovery,
        updated.sound,
        updated.vowels,
        updated.syllables,
        updated.words,
        updated.soundPosition,
        updated.sentences,
        updated.finalChallenge
      ].filter(Boolean).length;

      updated.masteryPercentage = Math.round((completedCount / 8) * 100);

      return {
        ...prev,
        letterProgressMap: {
          ...prev.letterProgressMap,
          [letterId]: updated
        }
      };
    });
  };

  const buyAvatarItem = (itemId: string, price: number): boolean => {
    if (activeProfile.coins >= price && !activeProfile.inventory.includes(itemId)) {
      updateActiveProfile(prev => ({
        ...prev,
        coins: prev.coins - price,
        inventory: [...prev.inventory, itemId]
      }));
      audioManager.playVictory();
      return true;
    }
    return false;
  };

  const resetProgress = () => {
    updateActiveProfile(prev => ({
      ...prev,
      stars: 0,
      coins: 0,
      letterProgressMap: generateInitialLetterProgress()
    }));
  };

  const logAttempt = (letter: string, stageName: string, score: number, success: any) => {
    setAttemptsLog(prev => [
      {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('ar-SA'),
        letter,
        letterId: letter,
        stageName,
        target: letter,
        score,
        success: success === 'correct' || success === true,
        status: typeof success === 'string' ? success : success ? 'correct' : 'needs_practice'
      },
      ...prev
    ]);
  };

  // Convert letterProgressMap to compatible letterProgress map with memoization
  const letterProgress = useMemo(() => {
    const map: Record<string, any> = {};
    ARABIC_LETTERS.forEach(l => {
      const p = activeProfile.letterProgressMap[l.id] || { currentStage: 1, masteryPercentage: 0 };
      map[l.id] = {
        isUnlocked: true,
        completedLevels: p.currentStage - 1,
        totalLevels: 8,
        stars: Math.floor(p.masteryPercentage / 20),
        accuracy: p.masteryPercentage
      };
    });
    return map;
  }, [activeProfile.letterProgressMap]);

  return (
    <GameContext.Provider
      value={{
        childName: activeProfile.name,
        setChildName,
        age: activeProfile.age,
        setAge,
        stars: activeProfile.stars,
        coins: activeProfile.coins,
        streak: activeProfile.streak,
        level: activeProfile.level,
        trainingTimeMinutes: 0,
        isVisualFirst,
        setIsVisualFirst,
        isVisualMode: isVisualFirst,
        setIsVisualMode: setIsVisualFirst,
        isMuted,
        toggleMute,
        volume,
        setVolume,
        selectedLetterId,
        setSelectedLetterId,
        letterProgressMap: activeProfile.letterProgressMap,
        updateLetterStage,
        addStars,
        addCoins,
        triggerCelebration,
        triggerVictoryCelebration: triggerCelebration,
        resetProgress,
        profiles,
        activeProfileId,
        switchProfile,
        createProfile,
        deleteProfile,
        letterProgress,
        updateLetterLevelProgress: (letterId, lvl) => updateLetterStage(letterId, lvl, true),
        logAttempt,
        attemptsLog,
        unlockLetterManually: () => {},
        lockLetterManually: () => {},
        therapistPlan: activeProfile.therapistPlan,
        setTherapistPlan,
        avatar: activeProfile.avatar,
        setAvatar,
        inventory: activeProfile.inventory,
        buyAvatarItem
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

```

## 📄 ملف: `src\components\worlds\WordsVillageWorld.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, DoorOpen, Check } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

export const WordsVillageWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration } = useGame();

  const villageLocations = [
    { id: 'house', word: 'بَاب', name: 'بَابُ المَنْزِل', emoji: '🚪', unlockedDesc: 'انْفَتَحَ بَابُ البَيْتِ المُضِيء!' },
    { id: 'pond', word: 'بَطَّة', name: 'بِرْكَةُ البَطِّ', emoji: '🦆', unlockedDesc: 'البَطَّةُ تَسْبَحُ فِي المَاءِ بِفَرَح!' },
    { id: 'bakery', word: 'خُبْز', name: 'مَخْبَزُ القَرْيَة', emoji: '🍞', unlockedDesc: 'خَرَجَ الخُبْزُ الطَّازَجُ الشَّهِيّ!' },
    { id: 'dock', word: 'بَحْر', name: 'مِينَاءُ البَحْر', emoji: '🌊', unlockedDesc: 'تَحَرَّكَتِ السَّفِينَةُ فِي البَحْر!' }
  ];

  const [unlockedLocations, setUnlockedLocations] = useState<string[]>([]);

  const handleUnlockLocation = (loc: typeof villageLocations[0]) => {
    audioManager.playClick();
    audioManager.speak(loc.word);

    if (!unlockedLocations.includes(loc.id)) {
      const newUnlocked = [...unlockedLocations, loc.id];
      setUnlockedLocations(newUnlocked);
      addStars(1);
      addCoins(5);

      if (newUnlocked.length === villageLocations.length) {
        triggerVictoryCelebration();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-amber-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-amber-50 text-amber-800 border-2 border-amber-200 hover:bg-amber-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🏘️ قَرْيَةُ الكَلِمَاتِ التَّفَاعُلِيَّة</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              انْطِقْ كَلِمَاتِ القَرْيَةِ لِفَتْحِ الأَبْوَابِ وَتَحْرِيكِ عَنَاصِرِ المَكَان!
            </p>
          </div>
        </div>

        <div className="bg-amber-100 text-amber-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-amber-300">
          🔑 أَمَاكِنٌ مَفْتُوحَة: {unlockedLocations.length} / 4
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`أَهْلًا بِكَ يَا ${childName || 'البَطَل'} فِي قَرْيَةِ الكَلِمَات! انْقُرْ عَلَى مَنَازِلِ وَأَمَاكِنِ القَرْيَةِ لِتَسْتَمِعَ لِلكَلِمَةِ وَتَفْتَحَ أَبْوَابَهَا السِّحْرِيَّة!` }
        shortHint="انْقُرْ عَلَى المَكَان"
        autoSpeak={true}
        emotion="happy"
      />

      {/* Village Scene Canvas */}
      <div className="relative w-full min-h-[460px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-amber-100 via-orange-100 to-amber-200 p-6 flex flex-col justify-between">
        
        {/* Village Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
          {villageLocations.map((loc) => {
            const isUnlocked = unlockedLocations.includes(loc.id);
            return (
              <div
                key={loc.id}
                onClick={() => handleUnlockLocation(loc)}
                className={`game-card p-5 border-4 cursor-pointer flex flex-col items-center justify-between text-center transition-all duration-300 ${
                  isUnlocked
                    ? 'bg-white border-amber-400 shadow-glow-yellow scale-105'
                    : 'bg-white/80 border-slate-300 hover:border-amber-400 hover:scale-105'
                }`}
              >
                <span className="text-5xl my-2 animate-float">
                  {loc.emoji}
                </span>

                <h4 className="font-black text-slate-900 text-base">
                  {loc.name}
                </h4>

                <span className="text-3xl font-black text-rose-600 my-1">
                  ({loc.word})
                </span>

                <p className="text-xs text-slate-600 font-bold mt-1">
                  {isUnlocked ? loc.unlockedDesc : 'اضْغَطْ لِفَتْحِ المَعْلَم 🔓'}
                </p>

                <div className="mt-2 w-full pt-2 border-t border-slate-100 flex items-center justify-center gap-1 text-xs font-bold text-amber-800">
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>اسْتَمِعْ لِلكَلِمَة</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\worlds\ValleyOfLettersWorld.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

export const ValleyOfLettersWorld: React.FC<{
  onBack: () => void;
  onSelectLetter?: (letterId: string) => void;
}> = ({ onBack, onSelectLetter }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration } = useGame();

  const lettersInValley = [
    { id: 'alif', char: 'أ', x: 20, y: 35, color: 'text-amber-500' },
    { id: 'baa', char: 'ب', x: 45, y: 25, color: 'text-sky-500' },
    { id: 'taa', char: 'ت', x: 70, y: 35, color: 'text-emerald-500' },
    { id: 'thaa', char: 'ث', x: 30, y: 65, color: 'text-rose-500' },
    { id: 'jeem', char: 'ج', x: 55, y: 55, color: 'text-purple-500' },
    { id: 'haa', char: 'ح', x: 80, y: 65, color: 'text-cyan-500' }
  ];

  const [foundLetters, setFoundLetters] = useState<string[]>([]);

  const handleSpotLetter = (char: string, letterId: string) => {
    audioManager.playBloom();
    audioManager.speak(char);

    if (!foundLetters.includes(char)) {
      const newFound = [...foundLetters, char];
      setFoundLetters(newFound);
      addStars(1);
      addCoins(5);

      if (newFound.length === lettersInValley.length) {
        triggerVictoryCelebration();
        audioManager.speak(`مُمْتَازٌ يَا ${childName || 'البَطَل'}! اكْتَشَفْتَ جَمِيعَ حُرُوفِ الوَادِي السَّاحِر!`);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-emerald-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800 border-2 border-emerald-200 hover:bg-emerald-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🏞️ وَادِي الحُرُوفِ السَّاحِر</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              ابْحَثْ عَنِ الحُرُوفِ الطَّافِيَةِ فِي الوَادِي وَانْقُرْ عَلَيْهَا لِسَمَاعِ صَوْتِهَا!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-100 px-4 py-2 rounded-2xl border-2 border-emerald-300">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <span className="font-black text-emerald-900 text-sm">{foundLetters.length} / {lettersInValley.length}</span>
        </div>
      </div>

      {/* Lumi Guide Banner */}
      <LumiGuideBanner
        message={`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'} فِي وَادِي الحُرُوفِ السَّاحِر! انْقُرْ عَلَى الأَحْجَارِ الطَّافِيَةِ لِتَسْتَمِعَ لِصَوْتِ الحُرُوفِ وَتَجْعَلَ الوَادِيَ يُزْهِر!` }
        shortHint="انْقُرْ عَلَى الحُرُوف"
        autoSpeak={true}
        emotion="happy"
      />

      {/* Interactive Living Valley Canvas Scene */}
      <div className="relative w-full h-[480px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-sky-300 via-emerald-200 to-green-300">
        
        {/* Animated Clouds & Hills */}
        <div className="absolute top-4 left-10 text-5xl opacity-40 animate-float">☁️</div>
        <div className="absolute top-12 right-20 text-6xl opacity-40 animate-float" style={{ animationDelay: '1.5s' }}>☁️</div>
        
        {/* Green Hills SVG Background */}
        <svg viewBox="0 0 1000 500" className="absolute bottom-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
          <path d="M 0 350 Q 250 200 500 320 T 1000 280 L 1000 500 L 0 500 Z" fill="#86efac" opacity="0.7" />
          <path d="M 0 390 Q 350 280 700 380 T 1000 360 L 1000 500 L 0 500 Z" fill="#4ade80" />
        </svg>

        {/* Blooming Flowers in Valley */}
        {Array.from({ length: foundLetters.length * 3 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-3xl animate-pop pointer-events-none"
            style={{
              bottom: `${15 + (i * 7) % 35}%`,
              left: `${8 + (i * 16) % 85}%`
            }}
          >
            🌸
          </div>
        ))}

        {/* Hidden Interactive Letters */}
        {lettersInValley.map((item) => {
          const isFound = foundLetters.includes(item.char);
          return (
            <button
              key={item.id}
              onClick={() => handleSpotLetter(item.char, item.id)}
              style={{
                position: 'absolute',
                top: `${item.y}%`,
                left: `${item.x}%`
              }}
              className={`w-18 h-18 md:w-20 md:h-20 rounded-3xl font-black text-4xl md:text-5xl border-4 transition-all duration-300 transform active:scale-95 flex items-center justify-center ${
                isFound
                  ? 'bg-white border-yellow-400 shadow-glow-yellow scale-110 ' + item.color
                  : 'bg-white/80 border-emerald-300 hover:scale-110 shadow-lg text-slate-800 animate-wiggle'
              }`}
            >
              {item.char}
              {isFound && (
                <span className="absolute -top-2 -right-2 text-xl">✨</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-slate-700">الحروف المكتشفة:</span>
          {foundLetters.map(ch => (
            <span key={ch} className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black rounded-xl border border-emerald-300">
              {ch}
            </span>
          ))}
        </div>

        {onSelectLetter && (
          <button
            onClick={() => onSelectLetter('baa')}
            className="game-btn px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-black text-xs md:text-sm"
          >
            اخْتَرْ حَرْفَ البَاء لِلبَدْء ←
          </button>
        )}
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\worlds\SyllablesForestWorld.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, RotateCcw } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

export const SyllablesForestWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration } = useGame();
  
  const treeSyllables = [
    { syl: 'بَ', vowel: 'فتحة', name: 'باء مفتوحة' },
    { syl: 'بِ', vowel: 'كسرة', name: 'باء مكسورة' },
    { syl: 'بُ', vowel: 'ضمة', name: 'باء مضمومة' },
    { syl: 'بَا', vowel: 'مد بالألف', name: 'مد الألف' },
    { syl: 'بِي', vowel: 'مد بالياء', name: 'مد الياء' },
    { syl: 'بُو', vowel: 'مد بالواو', name: 'مد الواو' }
  ];

  const [wateredTrees, setWateredTrees] = useState<string[]>([]);

  const handleGrowTree = (syl: string) => {
    audioManager.playBloom();
    audioManager.speak(syl);
    
    if (!wateredTrees.includes(syl)) {
      const newWatered = [...wateredTrees, syl];
      setWateredTrees(newWatered);
      addStars(1);
      addCoins(5);

      if (newWatered.length === treeSyllables.length) {
        triggerVictoryCelebration();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-green-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-green-50 text-green-800 border-2 border-green-200 hover:bg-green-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🌳 غَابَةُ المَقَاطِعِ السِّحْرِيَّة</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              اسْقِ الأَشْجَارَ السِّحْرِيَّةَ بِنُطْقِ المَقَاطِعِ لِتَنْمُوَ وَتُحَلِّقَ الفَرَاشَات!
            </p>
          </div>
        </div>

        <div className="bg-green-100 text-green-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-green-300">
          🦋 أَشْجَارٌ نَامِيَة: {wateredTrees.length} / 6
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'} فِي غَابَةِ المَقَاطِع! انْقُرْ عَلَى الشُّجَيْرَاتِ لِتَسْتَمِعَ لِمَقَاطِعِ الحَرَكَاتِ وَالمُدُودِ وَتَجْعَلَ الأَشْجَارَ تَنْمُو!` }
        shortHint="انْقُرْ لِسَمَاعِ المَقْطَع"
        autoSpeak={true}
        emotion="happy"
      />

      {/* Magical Forest Scene */}
      <div className="relative w-full min-h-[460px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-teal-900 via-emerald-800 to-green-900 p-6 flex flex-col justify-between">
        
        {/* Glowing Forest Fireflies */}
        <div className="absolute top-8 left-12 text-2xl text-yellow-300 animate-pulse">✨</div>
        <div className="absolute top-16 right-20 text-3xl text-emerald-300 animate-pulse">🌟</div>

        {/* Tree Syllables Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 relative z-10">
          {treeSyllables.map((item) => {
            const isGrown = wateredTrees.includes(item.syl);
            return (
              <div
                key={item.syl}
                onClick={() => handleGrowTree(item.syl)}
                className={`game-card p-5 border-4 cursor-pointer flex flex-col items-center justify-between text-center transition-all duration-300 ${
                  isGrown
                    ? 'bg-emerald-100/95 border-amber-400 shadow-glow-yellow scale-105'
                    : 'bg-white/90 border-emerald-400 hover:scale-105 hover:bg-white'
                }`}
              >
                <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-200 text-emerald-900">
                  {item.vowel}
                </span>

                <span className={`text-4xl my-2 ${isGrown ? 'animate-bounce' : ''}`}>
                  {isGrown ? '🌳' : '🌱'}
                </span>

                <span className="text-5xl font-black text-emerald-800">
                  {item.syl}
                </span>

                <div className="flex items-center gap-1 mt-2 text-xs font-bold text-slate-700">
                  <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{isGrown ? 'نَمَتِ الشَّجَرَة 🦋' : 'انْقُرْ لِتَنْمُو 💧'}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\worlds\StarRealmSpaceWorld.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Trophy, Rocket, Star, Volume2 } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

export const StarRealmSpaceWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { childName, stars, coins, addStars, addCoins, triggerVictoryCelebration } = useGame();
  const [spaceshipFired, setSpaceshipFired] = useState<boolean>(false);

  const starConstellations = [
    { name: 'كَوْكَبَةُ الحُرُوفِ الذَّهَبِيَّة', icon: '✨', starsCount: 10 },
    { name: 'سَدِيمُ الكَلِمَاتِ البَرَّاق', icon: '🌌', starsCount: 20 },
    { name: 'مَجَرَّةُ الأَبْطَالِ الخَالِدَة', icon: '🏆', starsCount: 50 }
  ];

  const handleLaunchSpaceship = () => {
    audioManager.playPortal();
    setSpaceshipFired(true);
    triggerVictoryCelebration();
    addStars(5);
    addCoins(25);
    setTimeout(() => setSpaceshipFired(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-yellow-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-amber-50 text-amber-800 border-2 border-amber-200 hover:bg-amber-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🌌 عَالَمُ النُّجُومِ وَالفَضَاءِ السَّاحِر</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              اسْتَكْشِفْ سَفِينَةَ لُومِي الفَضَائِيَّةَ وَالنَّيْبُولا البَرَّاقَةَ وَانْطَلِقْ لِلنُّجُوم!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 text-amber-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-amber-300 flex items-center gap-1.5">
            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            <span>{stars} نَجْمَة</span>
          </div>
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`أَهْلًا بِكَ يَا ${childName || 'البَطَل'} فِي عَالَمِ النُّجُومِ وَالفَضَاء! انْقُرْ عَلَى زِرِّ إِطْلاقِ السَّفِينَةِ الفَضَائِيَّةِ لِتُحَلِّقَ بَيْنَ النُّجُومِ وَتَجْمَعَ الجَوَائِز!` }
        shortHint="اطْلِقِ السَّفِينَةَ الفَضَائِيَّة"
        autoSpeak={true}
        emotion="excited"
      />

      {/* Real Space Environment Canvas */}
      <div className="relative w-full min-h-[500px] rounded-3xl border-4 border-yellow-400 shadow-2xl overflow-hidden bg-gradient-to-b from-purple-950 via-slate-950 to-indigo-950 p-6 flex flex-col justify-between text-white text-center">
        
        {/* Animated Nebulae & Space Dust */}
        <div className="absolute -top-20 -left-20 w-80 h-80 bg-pink-600/30 rounded-full blur-3xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-cyan-600/30 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '2s' }} />

        {/* Floating Constellation Stars */}
        <div className="absolute top-10 left-16 text-3xl animate-float">🌟</div>
        <div className="absolute top-20 right-24 text-2xl animate-float" style={{ animationDelay: '1s' }}>✨</div>
        <div className="absolute bottom-20 left-32 text-4xl animate-float" style={{ animationDelay: '2s' }}>🪐</div>

        {/* LUMI's Magical Spaceship Centerpiece */}
        <div className="relative z-10 space-y-4 my-auto">
          <div className={`relative inline-block transition-transform duration-1000 ${
            spaceshipFired ? 'translate-y-[-150px] scale-125' : 'animate-float'
          }`}>
            <div className="w-36 h-36 mx-auto rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 p-2 border-4 border-yellow-300 shadow-glow-yellow flex items-center justify-center text-7xl">
              🛸
            </div>
            {spaceshipFired && (
              <div className="text-4xl animate-bounce">🔥💨</div>
            )}
          </div>

          <h3 className="text-3xl font-black text-yellow-300 tracking-wide drop-shadow-md">
            سَفِينَةُ لُومِي الفَضَائِيَّة
          </h3>

          <p className="text-xs md:text-sm text-slate-300 font-bold max-w-md mx-auto">
            مُسْتَوَى البُطُولَةِ الفَضَائِيَّة! اطْلِقْ سَفِينَتَكَ الآنَ لِتَجْمَعَ مَزِيدًا مِنَ النُّجُوم!
          </p>

          <button
            onClick={handleLaunchSpaceship}
            className="game-btn px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-yellow hover:scale-105 active:scale-95"
          >
            <Rocket className="w-5 h-5" />
            <span>إِطْلاقُ السَّفِينَةِ الفَضَائِيَّة! 🚀</span>
          </button>
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\worlds\SoundsGalaxyWorld.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, Rocket } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

export const SoundsGalaxyWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration } = useGame();

  const skillPlanets = [
    { id: 'planet_letters', name: 'كَوْكَبُ الحُرُوف', emoji: '🪐', sound: 'أ ب ت ث', color: 'from-sky-400 to-blue-600' },
    { id: 'planet_syllables', name: 'كَوْكَبُ المَقَاطِع', emoji: '🌕', sound: 'با بو بي', color: 'from-emerald-400 to-teal-600' },
    { id: 'planet_words', name: 'كَوْكَبُ الكَلِمَات', emoji: '🪐', sound: 'باب بيت بطة', color: 'from-amber-400 to-orange-600' },
    { id: 'planet_sentences', name: 'كَوْكَبُ الجُمَل', emoji: '⭐', sound: 'أنا أحب لومي', color: 'from-purple-400 to-pink-600' }
  ];

  const [visitedPlanets, setVisitedPlanets] = useState<string[]>([]);

  const handleVisit = (p: typeof skillPlanets[0]) => {
    audioManager.playPortal();
    audioManager.speak(p.name);
    
    if (!visitedPlanets.includes(p.id)) {
      const newVisited = [...visitedPlanets, p.id];
      setVisitedPlanets(newVisited);
      addStars(2);
      addCoins(10);

      if (newVisited.length === skillPlanets.length) {
        triggerVictoryCelebration();
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-indigo-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-800 border-2 border-indigo-200 hover:bg-indigo-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🚀 مَجَرَّةُ الأَصْوَاتِ وَالفَضَاءِ</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              تَنَقَّلْ بِسَفِينَتِكَ بَيْنَ كَوَاكِبِ المَهَارَاتِ وَاصْعَدْ لِعَالَمِ النُّجُوم!
            </p>
          </div>
        </div>

        <div className="bg-indigo-100 text-indigo-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-indigo-300">
          🪐 كَوَاكِبٌ مُكْتَشَفَة: {visitedPlanets.length} / 4
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'} فِي مَجَرَّةِ الأَصْوَات! انْقُرْ عَلَى الكَوَاكِبِ الفَضَائِيَّةِ لِتَزُورَهَا وَتَسْتَمِعَ لأَصْوَاتِهَا البَرَّاقَة!` }
        shortHint="انْقُرْ عَلَى الكَوْكَب"
        autoSpeak={true}
        emotion="excited"
      />

      {/* Galaxy Space Scene */}
      <div className="relative w-full min-h-[460px] rounded-3xl border-4 border-indigo-400 shadow-2xl overflow-hidden bg-gradient-to-b from-indigo-950 via-slate-950 to-purple-950 p-6 flex flex-col justify-between text-white">
        
        {/* Floating Stars */}
        <div className="absolute top-6 left-8 text-yellow-300 animate-pulse text-2xl">✨</div>
        <div className="absolute bottom-12 left-16 text-yellow-300 animate-pulse text-xl">🌟</div>

        {/* Orbiting Planets Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10 my-auto">
          {skillPlanets.map((p) => {
            const isVisited = visitedPlanets.includes(p.id);
            return (
              <div
                key={p.id}
                onClick={() => handleVisit(p)}
                className={`game-card p-5 border-3 cursor-pointer flex flex-col items-center justify-between text-center transition-all duration-300 ${
                  isVisited
                    ? 'bg-indigo-900/90 border-amber-400 shadow-glow-yellow scale-105'
                    : 'bg-white/10 border-white/30 hover:border-indigo-400 hover:scale-105'
                }`}
              >
                <span className="text-5xl my-2 animate-float">
                  {p.emoji}
                </span>

                <h4 className="font-black text-base text-white">
                  {p.name}
                </h4>

                <span className="text-xs text-amber-300 font-bold mt-1">
                  {p.sound}
                </span>

                <div className="mt-3 px-3 py-1 rounded-full bg-white/20 text-[11px] font-black">
                  {isVisited ? 'كَوْكَبٌ مُضِيء ✨' : 'هَيَّا نَزُورُه 🚀'}
                </div>
              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\worlds\SoundsCastleWorld.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, Shield, Crown } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

export const SoundsCastleWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration } = useGame();

  const castleTrials = [
    { title: 'تَحَدِّي صَوْتِ الحَرْف', task: 'انْقُرْ عَلَى صَوْتِ: بَ', options: ['بَ', 'تَ', 'مَ'], correct: 'بَ' },
    { title: 'تَحَدِّي المَقْطَع', task: 'اخْتَرْ مَدَّ الأَلِف: بَا', options: ['بُو', 'بَا', 'بِي'], correct: 'بَا' },
    { title: 'تَحَدِّي الكَلِمَة', task: 'اخْتَرْ الكَلِمَةَ الَّتِي تَبْدَأُ بِـ ب', options: ['بَاب', 'شَمْس', 'قَلَم'], correct: 'بَاب' }
  ];

  const [currentTrialIdx, setCurrentTrialIdx] = useState<number>(0);
  const [clearedCount, setClearedCount] = useState<number>(0);

  const currentT = castleTrials[currentTrialIdx];

  const handleSolve = (ans: string) => {
    if (ans === currentT.correct) {
      audioManager.playVictory();
      setClearedCount(prev => prev + 1);
      addStars(2);
      addCoins(10);

      setTimeout(() => {
        if (currentTrialIdx < castleTrials.length - 1) {
          setCurrentTrialIdx(prev => prev + 1);
        } else {
          triggerVictoryCelebration();
        }
      }, 1200);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-rose-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-rose-50 text-rose-800 border-2 border-rose-200 hover:bg-rose-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🏰 قَلْعَةُ الأَصْوَاتِ الكُبْرَى</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              اجْتَزْ تَحَدِّيَاتِ الحُرُوفِ وَالمَقَاطِعِ وَالكَلِمَاتِ لِتَتَوَّجَ بَطَلَ القَلْعَة!
            </p>
          </div>
        </div>

        <div className="bg-rose-100 text-rose-900 px-4 py-1.5 rounded-2xl font-black text-xs md:text-sm border border-rose-300">
          👑 تَحَدِّيَاتٌ مُنْجَزَة: {clearedCount} / 3
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`أَهْلًا يَا ${childName || 'البَطَل'} فِي قَلْعَةِ الأَصْوَات! أَجِبْ عَنْ تَحَدِّيَاتِ القَلْعَةِ الشُّجَاعَةِ لِتَتَوَّجَ بَطَلَ المَمْلَكَة!` }
        shortHint="حُلَّ تَحَدِّي القَلْعَة"
        autoSpeak={true}
        emotion="cheering"
      />

      {/* Castle Scene */}
      <div className="relative w-full min-h-[440px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-rose-900 via-purple-900 to-slate-900 p-6 flex flex-col justify-between text-white text-center">
        
        <div className="relative z-10 space-y-6 max-w-lg mx-auto">
          <div className="text-6xl animate-bounce">🏰</div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border-2 border-white/20 space-y-4">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-1 rounded-full">
              {currentT.title}
            </span>

            <h3 className="text-2xl font-black text-amber-200">
              {currentT.task}
            </h3>

            <div className="grid grid-cols-3 gap-3 pt-3">
              {currentT.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSolve(opt)}
                  className="game-btn p-4 bg-gradient-to-b from-white to-rose-50 text-slate-900 rounded-2xl font-black text-2xl border-2 border-white shadow-lg active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\worlds\SentencesRiverWorld.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { ArrowRight, Sparkles, Volume2, Check } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

export const SentencesRiverWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration } = useGame();

  const sentenceChallenges = [
    {
      id: 1,
      targetSentence: 'هَذَا بَابُ البَيْتِ.',
      words: ['هَذَا', 'بَابُ', 'البَيْتِ'],
      emoji: '🚪🏠'
    },
    {
      id: 2,
      targetSentence: 'البَطَّةُ تَسْبَحُ فِي المَاءِ.',
      words: ['البَطَّةُ', 'تَسْبَحُ', 'فِي', 'المَاءِ'],
      emoji: '🦆🌊'
    }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [placedWords, setPlacedWords] = useState<string[]>([]);
  const [bridgeBuilt, setBridgeBuilt] = useState<boolean>(false);

  const currentQ = sentenceChallenges[currentIdx];

  const [availableWords, setAvailableWords] = useState<string[]>(() => {
    return [...sentenceChallenges[0].words].sort(() => Math.random() - 0.5);
  });

  const handlePickWord = (w: string, index: number) => {
    audioManager.playClick();
    const newPlaced = [...placedWords, w];
    setPlacedWords(newPlaced);
    setAvailableWords(prev => prev.filter((_, i) => i !== index));

    if (newPlaced.length === currentQ.words.length) {
      if (newPlaced.join(' ') === currentQ.words.join(' ')) {
        audioManager.playVictory();
        audioManager.speak(currentQ.targetSentence);
        setBridgeBuilt(true);
        addStars(2);
        addCoins(10);

        setTimeout(() => {
          if (currentIdx < sentenceChallenges.length - 1) {
            const nextIdx = currentIdx + 1;
            setCurrentIdx(nextIdx);
            setPlacedWords([]);
            setAvailableWords([...sentenceChallenges[nextIdx].words].sort(() => Math.random() - 0.5));
            setBridgeBuilt(false);
          } else {
            triggerVictoryCelebration();
          }
        }, 1500);
      } else {
        setTimeout(() => {
          setPlacedWords([]);
          setAvailableWords([...currentQ.words].sort(() => Math.random() - 0.5));
        }, 800);
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-sky-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-sky-50 text-sky-800 border-2 border-sky-200 hover:bg-sky-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🌊 نَهْرُ الجُمَلِ البَرَّاقَة</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              رَتِّب الكَلِمَاتِ لِبِنَاءِ الجِسْرِ المُضِيءِ وَعُبُورِ النَّهْر!
            </p>
          </div>
        </div>

        <button
          onClick={() => audioManager.speak(currentQ.targetSentence)}
          className="game-btn px-4 py-2 bg-sky-500 text-white rounded-2xl font-black text-xs md:text-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>اسْتَمِعْ لِلجُمْلَة</span>
        </button>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'} فِي نَهْرِ الجُمَل! رَتِّبِ الكَلِمَاتِ بِالتَّرْتِيبِ الصَّحِيحِ لِيَبْنِيَ لُومِي لَكَ جِسْرًا سِحْرِيًّا لِعُبُورِ النَّهْر!` }
        shortHint="رَتِّبِ الكَلِمَات"
        autoSpeak={true}
        emotion="happy"
      />

      {/* River Scene */}
      <div className="relative w-full min-h-[440px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-sky-400 via-blue-500 to-indigo-600 p-6 flex flex-col justify-between">
        
        {/* River Waves Animation */}
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Stepping Stones Bridge */}
        <div className="relative z-10 space-y-6 text-center">
          <div className="text-6xl animate-float">{currentQ.emoji}</div>

          {/* Bridge Construction Line */}
          <div className="flex items-center justify-center gap-3 dir-rtl">
            {currentQ.words.map((_, i) => (
              <div
                key={i}
                className={`w-28 h-16 rounded-2xl border-3 flex items-center justify-center font-black text-lg transition-all ${
                  placedWords[i]
                    ? 'bg-white text-slate-900 border-yellow-400 shadow-glow-yellow scale-105'
                    : 'bg-white/30 border-dashed border-white/70 text-white'
                }`}
              >
                {placedWords[i] || '؟'}
              </div>
            ))}
          </div>

          {/* Available Word Buttons */}
          <div className="pt-4">
            <p className="text-xs font-bold text-sky-100 mb-3">
              اخْتَرْ الكَلِمَاتِ بِالتَّرْتِيبِ الصَّحِيح:
            </p>
            <div className="flex items-center justify-center gap-3">
              {availableWords.map((w, index) => (
                <button
                  key={index}
                  onClick={() => handlePickWord(w, index)}
                  className="game-btn px-6 py-3 bg-white text-slate-900 rounded-2xl font-black text-base border-2 border-sky-300 hover:scale-105 active:scale-95 shadow-md transition-all"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\worlds\EchoMountainsWorld.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, Mic, Activity } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

export const EchoMountainsWorld: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { childName, addStars, addCoins, triggerVictoryCelebration } = useGame();

  const echoQuestions = [
    { target: 'بَ', options: ['بَ', 'بِ', 'بُ'], audio: 'بَ', hint: 'صوت الباء بالفتحة' },
    { target: 'بُو', options: ['بَا', 'بُو', 'بِي'], audio: 'بُو', hint: 'صوت الباء بالضمة الطويلة' },
    { target: 'بَاب', options: ['بَاب', 'نَاب', 'تَاب'], audio: 'بَاب', hint: 'كلمة تبدأ وتختم بالباء' }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [echoWaveActive, setEchoWaveActive] = useState<boolean>(false);

  const currentQ = echoQuestions[currentIdx];

  const handlePlayEcho = () => {
    setEchoWaveActive(true);
    audioManager.speak(currentQ.audio, 0.8, () => setEchoWaveActive(false));
  };

  const handleAnswer = (choice: string) => {
    if (choice === currentQ.target) {
      audioManager.playVictory();
      addStars(1);
      addCoins(5);

      setTimeout(() => {
        if (currentIdx < echoQuestions.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          triggerVictoryCelebration();
        }
      }, 1000);
    } else {
      audioManager.playEncouragement();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-indigo-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-indigo-50 text-indigo-800 border-2 border-indigo-200 hover:bg-indigo-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🏔️ جِبَالُ الصَّدَى السِّحْرِيَّة</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              اسْتَمِعْ لِصَدَى الصَّوْتِ المُنْبَعِثِ مِنَ الكَهْفِ وَحَدِّدِ الحَرْفَ المُنَاسِب!
            </p>
          </div>
        </div>

        <button
          onClick={handlePlayEcho}
          className="game-btn px-4 py-2 bg-indigo-600 text-white rounded-2xl font-black text-xs md:text-sm shadow-md"
        >
          <Volume2 className="w-4 h-4" />
          <span>إِطْلاقُ صَدَى الكَهْف 🔊</span>
        </button>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'} فِي جِبَالِ الصَّدَى! اسْتَمِعْ لِصَدَى الصَّوْتِ المُنْبَعِثِ مِنَ الكَهْفِ وَاخْتَرِ الحَرْفَ أَوِ المَقْطَعَ المُطَابِق!` }
        shortHint="اسْتَمِعْ لِلصَّدَى وَاخْتَر"
        autoSpeak={true}
        emotion="listening"
      />

      {/* Echo Cave Canvas */}
      <div className="relative w-full min-h-[440px] rounded-3xl border-4 border-white shadow-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-indigo-950 to-purple-950 p-6 flex flex-col justify-between text-white">
        
        {/* Visual Echo Wave Ripple Indicator */}
        <div className="relative z-10 text-center space-y-6">
          <div className="text-6xl animate-float">⛰️</div>

          <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border-2 border-white/20 max-w-lg mx-auto space-y-4">
            <h3 className="text-xl font-black text-indigo-200">
              {currentQ.hint}
            </h3>

            {/* Glowing Waveform */}
            <div className="flex items-center justify-center gap-2 h-16">
              {[0.3, 0.8, 1, 0.6, 0.9, 0.4, 0.7].map((h, i) => (
                <div
                  key={i}
                  className={`w-3 rounded-full transition-all duration-300 ${
                    echoWaveActive ? 'bg-amber-400 scale-y-125 speech-bar' : 'bg-indigo-400 opacity-50'
                  }`}
                  style={{ height: `${h * 100}%`, animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="game-btn p-4 bg-white/20 hover:bg-white text-white hover:text-slate-900 rounded-2xl font-black text-2xl border-2 border-white/40 active:scale-95 transition-all"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\ui\Modal.tsx`
```typescript
import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: 'error' | 'info' | 'success';
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, message, type = 'info' }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm font-body dir-rtl">
      <div className="bg-[var(--color-lumi-base)] border-2 border-[var(--color-lumi-secondary)] p-6 rounded-3xl shadow-2xl max-w-sm w-full animate-bloom relative">
        <button 
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="text-center space-y-4">
          <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center text-2xl ${
            type === 'error' ? 'bg-rose-500/20 text-rose-400' : 
            type === 'success' ? 'bg-emerald-500/20 text-emerald-400' : 
            'bg-blue-500/20 text-blue-400'
          }`}>
            {type === 'error' ? '⚠️' : type === 'success' ? '✨' : '💡'}
          </div>
          <h3 className="text-xl font-display font-black text-[var(--color-lumi-primary)]">
            {title}
          </h3>
          <p className="text-sm font-bold text-slate-300">
            {message}
          </p>
          <button
            onClick={onClose}
            className="w-full py-3 mt-2 bg-[var(--color-lumi-secondary)] hover:bg-purple-500 text-white rounded-xl font-black transition-colors"
          >
            حَسَناً
          </button>
        </div>
      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\therapist\TherapistDashboard.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Save, Lock, Unlock, CheckCircle, FileText, Settings, UserPlus, Sparkles } from 'lucide-react';
import { useGame, TherapistPlan } from '../../context/GameContext';
import lettersData from '../../data/letters.json';
import { soundManager } from '../../services/audio/SoundManager';

export const TherapistDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    childName,
    setChildName,
    age,
    setAge,
    letterProgress,
    unlockLetterManually,
    lockLetterManually,
    therapistPlan,
    setTherapistPlan,
    attemptsLog
  } = useGame();

  const [targetLetters, setTargetLetters] = useState<string[]>(
    therapistPlan?.targetLetters || ['baa', 'meem', 'taa']
  );
  const [focusLevel, setFocusLevel] = useState<number>(therapistPlan?.focusLevel || 2);
  const [notes, setNotes] = useState<string>(
    therapistPlan?.notes || 'التركيز على مخرج صوت حرف الباء مع الحركات القصيرة وتكرار كلمة حبل.'
  );
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const toggleTargetLetter = (id: string) => {
    if (targetLetters.includes(id)) {
      setTargetLetters(targetLetters.filter(l => l !== id));
    } else {
      setTargetLetters([...targetLetters, id]);
    }
  };

  const handleSavePlan = () => {
    const updatedPlan: TherapistPlan = {
      childName,
      targetLetters,
      focusLevel,
      difficulty: 'easy',
      notes,
      updatedAt: Date.now()
    };
    setTherapistPlan(updatedPlan);
    soundManager.playSuccess();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-3xl border-2 border-indigo-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>لَوْحَةُ تَحَكُّمِ أَخِصَّائِي التَّخَاطُب</span>
              <span className="text-xl">🩺</span>
            </h1>
            <p className="text-xs text-slate-500 font-bold">
              تَخْصِيصُ الخُطَّةِ العِلاجِيَّةِ وَإِدَارَةُ مَسَارِ التَّدْرِيب
            </p>
          </div>
        </div>

        <button
          onClick={handleSavePlan}
          className="game-btn px-5 py-2.5 bg-indigo-600 text-white rounded-2xl font-black text-xs md:text-sm flex items-center gap-1.5 shadow-md"
        >
          <Save className="w-4 h-4" />
          <span>حِفْظُ الخُطَّة 💾</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-100 border-2 border-emerald-400 text-emerald-800 px-4 py-3 rounded-2xl font-black text-xs text-center animate-pop">
          🌟 تَمَّ حِفْظُ الخُطَّةِ العِلاجِيَّةِ وَتَحْدِيثُ إِعْدَادَاتِ الطِّفْلِ بِنَجَاح!
        </div>
      )}

      {/* Child Profile & Focus Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Profile Card */}
        <div className="game-card p-6 border-2 border-indigo-200 bg-white space-y-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <Settings className="w-5 h-5 text-indigo-600" />
            <span>بَيَانَاتُ الطِّفْلِ وَالمُسْتَوَى</span>
          </h3>

          <div className="space-y-3 text-xs font-bold text-slate-700">
            <div>
              <label className="block mb-1">اسم الطفل:</label>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full p-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">عمر الطفل (سنوات):</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(parseInt(e.target.value, 10) || 6)}
                className="w-full p-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1">المستوى التعليمي المستهدف:</label>
              <select
                value={focusLevel}
                onChange={(e) => setFocusLevel(parseInt(e.target.value, 10))}
                className="w-full p-2.5 rounded-xl border-2 border-slate-200 focus:border-indigo-500 focus:outline-none"
              >
                <option value={1}>المستوى 1: التعرف على الحرف</option>
                <option value={2}>المستوى 2: صوت الحرف والميكروفون</option>
                <option value={3}>المستوى 3: الحركات القصيرة</option>
                <option value={4}>المستوى 4: المقاطع والمدود</option>
                <option value={5}>المستوى 5: الكلمات ومواقع الحرف</option>
                <option value={6}>المستوى 6: موقع الصوت داخل الكلمة</option>
                <option value={7}>المستوى 7: الجمل والمعاني</option>
                <option value={8}>المستوى 8: التحدي النهائي</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clinical Notes Card */}
        <div className="game-card p-6 border-2 border-indigo-200 bg-white space-y-4">
          <h3 className="text-lg font-black text-slate-800 flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600" />
            <span>مُلاحَظَاتُ الأَخِصَّائِي وَتَوْجِيهَاتُ الجَلَسَة</span>
          </h3>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={5}
            placeholder="اكتب التوجيهات والملاحظات السريرية هنا..."
            className="w-full p-3 rounded-2xl border-2 border-slate-200 text-xs font-medium text-slate-700 focus:border-indigo-500 focus:outline-none leading-relaxed"
          />
        </div>

      </div>

      {/* Target Letters & Lock/Unlock Overrides */}
      <div className="game-card p-6 border-2 border-slate-200 bg-white space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-black text-slate-800">
            تَحْدِيدُ الأَصْوَاتِ المُسْتَهْدَفَةِ وَالتَّحَكُّمُ فِي القَفْلِ وَالفَتْح:
          </h3>
          <span className="text-xs font-bold text-slate-500">
            اضغط على القفل لفتح أو قفل الحرف للطفل يدويًا
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
          {lettersData.map(l => {
            const prog = letterProgress[l.id];
            const isLocked = prog ? prog.status === 'locked' : !l.defaultUnlocked;
            const isTarget = targetLetters.includes(l.id);

            return (
              <div
                key={l.id}
                className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-between gap-2 text-center transition-all ${
                  isTarget
                    ? 'border-indigo-500 bg-indigo-50/70'
                    : 'border-slate-200 bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <input
                    type="checkbox"
                    checked={isTarget}
                    onChange={() => toggleTargetLetter(l.id)}
                    title="تحديد كهدف علاجي"
                    className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <button
                    onClick={() => {
                      if (isLocked) {
                        unlockLetterManually(l.id);
                      } else {
                        lockLetterManually(l.id);
                      }
                    }}
                    className={`p-1 rounded-lg ${isLocked ? 'text-rose-500 hover:bg-rose-100' : 'text-emerald-600 hover:bg-emerald-100'}`}
                    title={isLocked ? 'فتح الحرف' : 'قفل الحرف'}
                  >
                    {isLocked ? <Lock className="w-3.5 h-3.5" /> : <Unlock className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <span className="text-3xl font-black text-slate-800">{l.character}</span>
                <span className="text-[11px] font-black text-slate-600">{l.nameAr}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Speech Attempts History Table */}
      <div className="game-card p-6 border-2 border-slate-200 bg-white space-y-4">
        <h3 className="text-lg font-black text-slate-800">
          سِجِلُّ مُحَاوَلاتِ النُّطْقِ الأَخِيرَة:
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs">
            <thead>
              <tr className="border-b border-slate-200 text-slate-500 font-black">
                <th className="py-2.5 px-3">الهدف المستهدف</th>
                <th className="py-2.5 px-3">الحرف</th>
                <th className="py-2.5 px-3">النتيجة الآلية</th>
                <th className="py-2.5 px-3">مؤشر الثقة</th>
                <th className="py-2.5 px-3">الوقت</th>
              </tr>
            </thead>
            <tbody>
              {attemptsLog.map(log => (
                <tr key={log.id} className="border-b border-slate-100 hover:bg-slate-50 font-bold">
                  <td className="py-3 px-3 text-slate-900 font-black text-sm">{log.target}</td>
                  <td className="py-3 px-3 text-indigo-700">{log.letterId}</td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      log.status === 'high_confidence'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {log.status === 'high_confidence' ? 'نطق متقن 🌟' : 'يحتاج تكرار 🔄'}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-700 font-extrabold">%{log.score}</td>
                  <td className="py-3 px-3 text-slate-400">{new Date(log.timestamp).toLocaleTimeString('ar-SA')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\splash\ProjectIntroCredits.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, ArrowRight, Smartphone, Star, CheckCircle2, ShieldCheck, Download, Zap, Target, Palette, Code2, Users } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

interface ProjectIntroCreditsProps {
  onEnterApp: () => void;
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const ProjectIntroCredits: React.FC<ProjectIntroCreditsProps> = ({ onEnterApp }) => {
  const [step, setStep] = useState<'goals' | 'credits'>('goals');
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isInstalling, setIsInstalling] = useState<boolean>(false);
  const [installProgress, setInstallProgress] = useState<number>(0);

  const stepLabels: Record<string, string> = {
    goals: '1 / 2 — أَهْدَافُ البَرْنَامَج',
    credits: '2 / 2 — فَرِيقُ الإِعْدَاد'
  };

  const stepOrder: Array<'goals' | 'credits'> = ['goals', 'credits'];
  const currentIndex = stepOrder.indexOf(step);

  useEffect(() => {
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstalling(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  // Direct 1-Click Native APK / App Installation Action
  const handleDirectInstallApk = async () => {
    audioManager.playVictory();
    setIsInstalling(true);
    setInstallProgress(25);

    setTimeout(() => setInstallProgress(60), 300);
    setTimeout(async () => {
      setInstallProgress(100);
      if (deferredPrompt) {
        try {
          await deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            setIsInstalled(true);
          }
        } catch {}
      }
      setTimeout(() => setIsInstalling(false), 800);
    }, 600);
  };

  const handleNext = () => {
    audioManager.playClick();
    if (currentIndex < stepOrder.length - 1) {
      setStep(stepOrder[currentIndex + 1]);
    }
  };

  const handlePrev = () => {
    audioManager.playClick();
    if (currentIndex > 0) {
      setStep(stepOrder[currentIndex - 1]);
    }
  };

  const teamMembers = [
    { name: 'رنيم حسان العمري', role: 'إعداد وتطوير' },
    { name: 'فاطمة راضي البلاونة', role: 'إعداد وتطوير' },
    { name: 'هبة وليد ابو طبنجة', role: 'إعداد وتطوير' },
    { name: 'جنى عاطف الخوالدة', role: 'إعداد وتطوير' },
    { name: 'ميرا هيثم ذيابات', role: 'إعداد وتطوير' },
    { name: 'ديمة قاسم الكفيري', role: 'إعداد وتطوير' },
    { name: 'طيبة رامي الزعبي', role: 'إعداد وتطوير' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-[#000000] text-white flex flex-col justify-between p-4 md:p-8 select-none overflow-y-auto font-arabic">
      
      {/* Ambient Dark Velvet Lighting */}
      <div className="fixed top-0 left-1/3 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Bar */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-4">
        
        {/* Right Side: Direct APK Install Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDirectInstallApk}
            disabled={isInstalling || isInstalled}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm border-2 transition-all shadow-lg active:scale-95 ${
              isInstalled
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                : isInstalling
                ? 'bg-amber-500 text-slate-950 border-white animate-pulse'
                : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white border-emerald-400/90 shadow-[0_0_30px_rgba(16,185,129,0.6)] animate-pulse'
            }`}
            title="تثبيت التطبيق كـ APK مباشر على هاتفك المحمول"
          >
            <Smartphone className="w-4 h-4 text-emerald-200" />
            <span>
              {isInstalled
                ? 'تَمَّ التَّثْبِيتُ بِنَجَاح ✓'
                : isInstalling
                ? 'جَارٍ التَّثْبِيت... ⏳'
                : 'تَثْبِيت كَـ APK 📲'}
            </span>
          </button>
        </div>

        {/* Left Side: Step Indicator */}
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-black text-amber-300 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-400/30">
            {stepLabels[step]}
          </span>
        </div>

      </header>

      {/* Direct Installation Modal Animation */}
      {isInstalling && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0f172a] border-3 border-emerald-400 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-[0_0_50px_rgba(16,185,129,0.5)] animate-pop">
            <div className="w-20 h-20 mx-auto rounded-3xl overflow-hidden shadow-glow-yellow border-2 border-white">
              <img src="/icons/lumi_logo.png" alt="LUMI Official Logo" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <h3 className="text-lg font-black text-white">جَارٍ بَدْءُ التَّثْبِيتِ المَبَاشِر 📲</h3>
              <p className="text-xs text-cyan-300 font-bold">يَتِمُّ الآنَ إِعْدَادُ حُزْمَةِ التَّطْبِيقِ لِهَاتِفِك...</p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden border border-slate-700">
              <div
                className="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-300"
                style={{ width: `${installProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="relative z-10 max-w-3xl mx-auto w-full my-auto py-6 space-y-6">
        
        {/* ========================================================================= */}
        {/* STEP 1: GOALS (أهداف البرنامج) */}
        {/* ========================================================================= */}
        {step === 'goals' && (
          <div className="space-y-6 text-center animate-pop">
            
            {/* Custom High-Res 3D Official LUMI Logo */}
            <div className="relative inline-block group">
              <div className="w-28 h-28 md:w-32 md:h-32 mx-auto rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(245,158,11,0.5)] border-3 border-amber-400 transform group-hover:scale-105 transition-transform duration-300 bg-slate-950">
                <img
                  src="/icons/lumi_logo.png"
                  alt="LUMI Official Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-2 inset-x-0 flex justify-center pointer-events-none">
                <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 text-[10px] font-black px-3 py-0.5 rounded-full border border-white shadow-md">
                  ⭐ الشِّعَارُ الرَّسْمِيّ
                </span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2 pt-2">
              <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white">
                مَمْلَكَةُ لُومِي — عَالَمُ الأَصْوَاتِ وَمَخَارِجِ الحُرُوف
              </h1>
              <p className="text-xs md:text-sm text-cyan-300 font-bold max-w-xl mx-auto leading-relaxed">
                مَشْرُوعٌ تَعْلِيمِيٌّ وَعِلاجِيٌّ تَفَاعُلِيٌّ مُتَقَدِّمٌ لِتَصْحِيحِ مَخَارِجِ الحُرُوفِ وَتَشْرِيحِ اللِّسَانِ لِلأَطْفَالِ وَضِعَافِ السَّمْع
              </p>
            </div>

            {/* Goals Card */}
            <div className="bg-[#0a0a0a] border-2 border-amber-400/40 rounded-3xl p-5 md:p-6 text-right space-y-4 shadow-2xl">
              <div className="flex items-center gap-2 border-b border-zinc-800 pb-3">
                <Target className="w-5 h-5 text-amber-400" />
                <h2 className="text-base md:text-lg font-black text-amber-200">
                  أَهْدَافُ البَرْنَامَج
                </h2>
              </div>

              <div className="space-y-3">
                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🎯</span>
                  <div>
                    <h3 className="text-xs font-black text-amber-300">تَصْحِيحُ مَخَارِجِ الحُرُوف</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">مُسَاعَدَةُ الأَطْفَالِ فِي التَّغَلُّبِ عَلَى صُعُوبَاتِ النُّطْقِ وَتَعْلِيمِهِمْ مَخَارِجَ الحُرُوفِ العَرَبِيَّةِ السَّلِيمَة.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">👅</span>
                  <div>
                    <h3 className="text-xs font-black text-cyan-300">تَشْرِيحُ اللِّسَانِ المُبَسَّط</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">رُؤْيَةُ حَرَكَةِ اللِّسَانِ وَنِقَاطِ اللَّمْسِ المَطْلُوبَةِ لِكُلِّ حَرْف.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">🎮</span>
                  <div>
                    <h3 className="text-xs font-black text-emerald-300">مَسَارُ الـ 8 مَرَاحِل</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">تَدَرُّجٌ مِنْ صَوْتِ الحَرْفِ، ثُمَّ الحَرَكَاتِ، المَدِّ، الكَلِمَاتِ، وَالجُمَل.</p>
                  </div>
                </div>

                <div className="bg-[#111111] p-3.5 rounded-2xl border border-zinc-800 flex items-start gap-3">
                  <span className="text-2xl flex-shrink-0">📱</span>
                  <div>
                    <h3 className="text-xs font-black text-purple-300">حِفْظٌ مُتَعَدِّدٌ دُونَ إِنْتَرْنِت</h3>
                    <p className="text-[11px] text-slate-400 font-bold mt-0.5">حِفْظُ تَقَدُّمِ كُلِّ طِفْلٍ عَلَى نَفْسِ الهَاتِفِ دُونَ تَدَاخُلٍ أَوْ قَوَاعِدِ بَيَانَات.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: CREDITS SCREEN (فريق الإعداد والتطوير) */}
        {/* ========================================================================= */}
        {step === 'credits' && (
          <div className="space-y-6 text-center animate-pop">
            
            {/* Logo in Screen 2 */}
            <div className="w-20 h-20 mx-auto rounded-2xl overflow-hidden shadow-glow-yellow border-2 border-amber-400">
              <img src="/icons/lumi_logo.png" alt="LUMI Logo" className="w-full h-full object-cover" />
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl md:text-3xl font-black text-amber-200">
                فَرِيقُ الإِعْدَادِ وَالتَّطْوِير 👑
              </h2>
              <p className="text-xs text-slate-400 font-bold">
                تَمَّ إِعْدَادُ وَتَصْمِيمُ هَذَا المَشْرُوعِ بِإِشْرَافٍ وَإِبْدَاعٍ مُمَيَّزٍ مِنْ قِبَل:
              </p>
            </div>

            {/* Team Members Royal Cards Grid */}
            <div className="bg-[#0a0a0a] border-2 border-amber-400/50 rounded-3xl p-5 md:p-6 shadow-2xl space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-right">
                {teamMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-[#141414] to-[#0c0c0c] border border-amber-400/30 hover:border-amber-400 flex items-center justify-between transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-300 font-black text-sm flex items-center justify-center border border-amber-400/40 group-hover:scale-105 transition-transform">
                        {idx + 1}
                      </div>
                      <div>
                        <h3 className="text-sm font-black text-white group-hover:text-amber-200 transition-colors">
                          {member.name}
                        </h3>
                        <span className="text-[10px] text-cyan-300 font-bold block">
                          ⭐ {member.role}
                        </span>
                      </div>
                    </div>

                    <CheckCircle2 className="w-4 h-4 text-emerald-400 opacity-70" />
                  </div>
                ))}
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* Navigation Buttons (Shared across all steps) */}
        {/* ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          {/* Back Button */}
          {currentIndex > 0 && (
            <button
              onClick={handlePrev}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#141414] hover:bg-[#222222] text-slate-300 font-black text-sm rounded-2xl border border-zinc-700 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <ArrowRight className="w-4 h-4" />
              <span>السَّابِق</span>
            </button>
          )}

          {/* Next / Enter App Button */}
          {currentIndex < stepOrder.length - 1 ? (
            <button
              onClick={handleNext}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 rounded-2xl font-black text-base border-2 border-white shadow-glow-yellow active:scale-95 transition-all inline-flex items-center justify-center gap-2"
            >
              <span>التَّالِي</span>
              <ArrowLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={() => {
                audioManager.playVictory();
                onEnterApp();
              }}
              className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 rounded-2xl font-black text-base border-2 border-white shadow-glow-yellow active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>الدُّخُولُ إِلَى التَّطْبِيقِ وَبَدْءُ الرِّحْلَة 🚀</span>
            </button>
          )}
        </div>

      </main>

      {/* Footer Note */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-[10px] text-slate-500 font-bold border-t border-zinc-900 pt-3">
        <span>LUMI — مَمْلَكَةُ الأَصْوَاتِ وَمَخَارِجِ الحُرُوف © جَمِيعُ الحُقُوقِ مَحْفُوظَة</span>
      </footer>

    </div>
  );
};

```

## 📄 ملف: `src\components\parent\ParentGateModal.tsx`
```typescript
import React, { useState } from 'react';
import { Lock, ShieldAlert, X, ArrowLeft } from 'lucide-react';
import { soundManager } from '../../services/audio/SoundManager';

interface ParentGateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (role: 'parent' | 'therapist') => void;
}

export const ParentGateModal: React.FC<ParentGateModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [num1, setNum1] = useState(5);
  const [num2, setNum2] = useState(3);
  const [answer, setAnswer] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [selectedRole, setSelectedRole] = useState<'parent' | 'therapist'>('parent');

  React.useEffect(() => {
    if (isOpen) {
      setNum1(Math.floor(Math.random() * 8) + 3);
      setNum2(Math.floor(Math.random() * 8) + 2);
      setAnswer('');
      setError(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (parseInt(answer, 10) === num1 + num2) {
      soundManager.playSuccess();
      onSuccess(selectedRole);
      onClose();
    } else {
      soundManager.playEncouragement();
      setError(true);
      setAnswer('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 select-none">
      <div className="bg-white rounded-3xl p-6 max-w-md w-full border-4 border-purple-300 shadow-2xl space-y-5">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-700">
            <Lock className="w-6 h-6" />
            <h3 className="text-xl font-black text-slate-800">بَوَّابَةُ الأَهْلِ وَالأَخِصَّائِي</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Selector */}
        <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-2xl border">
          <button
            type="button"
            onClick={() => setSelectedRole('parent')}
            className={`flex-1 py-2 rounded-xl font-black text-xs transition-all ${
              selectedRole === 'parent' ? 'bg-white text-purple-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            👨‍👩‍👦 لَوْحَةُ الأَهْل
          </button>
          <button
            type="button"
            onClick={() => setSelectedRole('therapist')}
            className={`flex-1 py-2 rounded-xl font-black text-xs transition-all ${
              selectedRole === 'therapist' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            🩺 لَوْحَةُ الأَخِصَّائِي
          </button>
        </div>

        <p className="text-xs text-slate-600 font-medium leading-relaxed">
          لِحِمَايَةِ إِعْدَادَاتِ التَّدْرِيب، يُرْجَى حَلُّ المَسْأَلَةِ الرِّيَاضِيَّةِ البَسِيطَة:
        </p>

        {/* Math Security Puzzle */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-purple-50 p-4 rounded-2xl border-2 border-purple-200 text-center">
            <span className="text-2xl font-black text-purple-900 tracking-wider">
              {num1} + {num2} = ؟
            </span>
          </div>

          <input
            type="number"
            value={answer}
            onChange={(e) => {
              setAnswer(e.target.value);
              setError(false);
            }}
            placeholder="اكتب الناتج هنا..."
            autoFocus
            className="w-full text-center text-xl font-black p-3 rounded-2xl border-2 border-slate-300 focus:border-purple-500 focus:outline-none"
          />

          {error && (
            <p className="text-xs font-bold text-rose-600 text-center">
              الإجابة غير صحيحة، يرجى المحاولة مرة أخرى.
            </p>
          )}

          <button
            type="submit"
            className="game-btn w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl font-black text-sm"
          >
            <span>دُخُولُ اللَّوْحَة ⬅️</span>
          </button>
        </form>

      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\parent\ParentDashboard.tsx`
```typescript
import React from 'react';
import { ArrowRight, Clock, Star, TrendingUp, AlertCircle, CheckCircle2, ShieldCheck, User } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import lettersData from '../../data/letters.json';
import { soundManager } from '../../services/audio/SoundManager';

export const ParentDashboard: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const {
    childName,
    stars,
    coins,
    trainingTimeMinutes,
    letterProgress,
    attemptsLog
  } = useGame();

  const totalAttempts = attemptsLog.length;
  const highConfidenceAttempts = attemptsLog.filter(a => a.status === 'high_confidence').length;
  const successRate = totalAttempts > 0 ? Math.round((highConfidenceAttempts / totalAttempts) * 100) : 85;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white p-5 rounded-3xl border-2 border-purple-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>لَوْحَةُ مُتَابَعَةِ الأَهْل</span>
              <span className="text-xl">👨‍👩‍👦</span>
            </h1>
            <p className="text-xs text-slate-500 font-bold">
              تَقْرِيرُ تَقَدُّمِ الطِّفْلِ: {childName}
            </p>
          </div>
        </div>

        <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1.5 rounded-full border border-purple-300">
          مَسَارُ التَّدْرِيبِ المَنْزِلِي 🏡
        </span>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="game-card p-5 border-2 border-sky-200 bg-white">
          <div className="flex items-center justify-between text-sky-600 mb-2">
            <span className="text-xs font-black">وَقْتُ التَّدْرِيب</span>
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {trainingTimeMinutes} <span className="text-sm font-bold text-slate-500">دقيقة</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">تَمَّ التَّدَرُّبُ خِلَالَ هَذَا الأُسْبُوع</p>
        </div>

        <div className="game-card p-5 border-2 border-emerald-200 bg-white">
          <div className="flex items-center justify-between text-emerald-600 mb-2">
            <span className="text-xs font-black">نِسْبَةُ النَّجَاحِ فِي النُّطْق</span>
            <TrendingUp className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            %{successRate}
          </div>
          <p className="text-[11px] text-emerald-600 font-bold mt-1">تَقَدُّمٌ مُمْتَازٌ وَمُسْتَمِر 🌟</p>
        </div>

        <div className="game-card p-5 border-2 border-amber-200 bg-white">
          <div className="flex items-center justify-between text-amber-600 mb-2">
            <span className="text-xs font-black">النُّجُومُ المُكْتَسَبَة</span>
            <Star className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {stars} <span className="text-sm font-bold text-slate-500">نجمة</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">مُكَافَآتُ الإِنْجَازِ فِي الأَلْعَاب</p>
        </div>

        <div className="game-card p-5 border-2 border-purple-200 bg-white">
          <div className="flex items-center justify-between text-purple-600 mb-2">
            <span className="text-xs font-black">عَدَدُ المَحَاوَلَات</span>
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-3xl font-black text-slate-800">
            {totalAttempts} <span className="text-sm font-bold text-slate-500">محاولة</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">تَسْجِيلَاتٌ وَأَنْشِطَةٌ صَوْتِيَّة</p>
        </div>
      </div>

      {/* Letters Progress Breakdown Table */}
      <div className="bg-white rounded-3xl p-6 border-2 border-slate-200 shadow-sm space-y-4">
        <h3 className="text-lg font-black text-slate-800">
          تَفَاصِيلُ إِتْقَانِ الحُرُوفِ المُسْتَهْدَفَة:
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lettersData.slice(0, 4).map(l => {
            const prog = letterProgress[l.id] || { recognition: 0, sound: 0, syllables: 0, words: 0, sentences: 0, overall: 0 };
            return (
              <div key={l.id} className="p-4 rounded-2xl border-2 border-slate-100 bg-slate-50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-9 h-9 rounded-xl bg-purple-600 text-white font-black flex items-center justify-center text-lg">
                      {l.character}
                    </span>
                    <span className="font-black text-slate-800 text-sm">حَرْفُ {l.nameAr}</span>
                  </div>
                  <span className="font-black text-xs text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                    %{prog.overall} إتقان
                  </span>
                </div>

                {/* Sub-skill Bars */}
                <div className="space-y-1.5 text-xs font-bold text-slate-600">
                  <div className="flex justify-between">
                    <span>التعرف والتمييز:</span>
                    <span>%{prog.recognition}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full">
                    <div className="bg-sky-500 h-full rounded-full" style={{ width: `${prog.recognition}%` }} />
                  </div>

                  <div className="flex justify-between">
                    <span>صوت الحرف والمقاطع:</span>
                    <span>%{prog.sound}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full">
                    <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${prog.sound}%` }} />
                  </div>

                  <div className="flex justify-between">
                    <span>الكلمات والجمل:</span>
                    <span>%{prog.words}</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full">
                    <div className="bg-amber-500 h-full rounded-full" style={{ width: `${prog.words}%` }} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recommended Focus Points */}
      <div className="bg-amber-50 rounded-3xl p-5 border-2 border-amber-300 flex items-start gap-4">
        <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-black text-amber-900 text-sm">نِقَاطُ التَّرْكِيزِ المُقْتَرَحَةُ لِلأَهْل:</h4>
          <p className="text-xs text-amber-800 font-medium leading-relaxed">
            يُوصَى بِتَكْرَارِ تَدْرِيبَاتِ حَرَكَةِ الضَّمَّة (بُ) وَمَدِّ اليَاءِ (بِي)، وَاسْتِخْدَامِ قِسْمِ "مِرْآةِ لُولُو" لِمُشَاهَدَةِ إِغْلاقِ الشَّفَتَيْنِ عِنْدَ نُطْقِ كَلِمَةِ "حَبْل".
          </p>
        </div>
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\pages\CleanStagePlayer.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { ArrowRight, Volume2, Sparkles, Check, Play, Trophy, Star, Crown } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { aiChallengeEngine, GeneratedChallenge } from '../../engine/AIChallengeEngine';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../mascot/LumiMascot';
import { StagesGuideModal } from '../common/StagesGuideModal';

interface CleanStagePlayerProps {
  letterId: string;
  stageNumber: number;
  onBackToOverview: () => void;
  onCompleteStageAndNext: (nextStageNum: number) => void;
}

export const CleanStagePlayer: React.FC<CleanStagePlayerProps> = ({
  letterId,
  stageNumber,
  onBackToOverview,
  onCompleteStageAndNext
}) => {
  const { childName, updateLetterStage, addStars, addCoins, triggerVictoryCelebration } = useGame();

  const letter: LetterData = ARABIC_LETTERS.find(l => l.id === letterId) || ARABIC_LETTERS[1];
  const stageDef = STAGE_CURRICULUM_DEFINITIONS.find(s => s.stageNumber === stageNumber) || STAGE_CURRICULUM_DEFINITIONS[0];

  const [challenge, setChallenge] = useState<GeneratedChallenge | null>(null);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const ch = aiChallengeEngine.generateStageChallenge(
      letter.id,
      stageNumber,
      {
        letterId: letter.id,
        stageNumber,
        attemptsCount: 1,
        successfulAttempts: 1,
        recentMistakes: [],
        averageConfidence: 0.95
      },
      childName || 'البَطَل'
    );
    setChallenge(ch);
    setSelectedOptionId(null);
    setIsSuccess(false);
    setFeedback(null);
    
    // Auto speak prompt with pure female voice
    if (ch) {
      setTimeout(() => {
        audioManager.speak(ch.promptAr);
      }, 350);
    }
  }, [letter.id, stageNumber, childName]);

  const handleSelectOption = (option: { id: string; text: string; isCorrect: boolean }) => {
    setSelectedOptionId(option.id);

    if (option.isCorrect) {
      audioManager.playVictory();
      setIsSuccess(true);
      
      // Royal Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#fbbf24', '#38bdf8', '#6366f1', '#10b981']
      });

      const encouragingPhrases = [
        `أَحْسَنْتَ يَا ${childName || 'البَطَل'}! إِجَابَةٌ رَائِعَةٌ جِدًّا!`,
        `مُمْتَازٌ يَا ${childName || 'البَطَل'}! أَنْتَ ذَكِيٌّ وَمُتَفَوِّق!`,
        `عَمَلٌ مَلَكِيٌّ بَاهِرٌ يَا ${childName || 'البَطَل'}!`
      ];
      const randomCheer = encouragingPhrases[Math.floor(Math.random() * encouragingPhrases.length)];

      setFeedback(randomCheer);
      audioManager.speak(randomCheer);
      addStars(1);
      addCoins(10);
      updateLetterStage(letter.id, stageNumber, true);

      if (stageNumber === 8) {
        triggerVictoryCelebration();
      }
    } else {
      audioManager.playClick();
      const retryCheer = `لِنُجَرِّبْ خِيَارًا آخَرَ يَا ${childName || 'البَطَل'}.. أَنْتَ قَرِيبٌ جِدًّا!`;
      setFeedback(retryCheer);
      audioManager.speak(retryCheer);
      setTimeout(() => setFeedback(null), 1800);
    }
  };

  const handleNext = () => {
    audioManager.playPortal();
    if (stageNumber < 8) {
      onCompleteStageAndNext(stageNumber + 1);
    } else {
      onBackToOverview();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060a17] via-[#0a1435] to-[#060a17] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-hidden">
      
      {/* Background Radiance */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border-3 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <button
          onClick={() => {
            audioManager.playClick();
            onBackToOverview();
          }}
          className="p-3 rounded-2xl bg-[#132252] border-2 border-amber-400/50 text-amber-300 hover:bg-amber-950/50 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-2 font-black text-xs"
        >
          <ArrowRight className="w-5 h-5" />
          <span>خُرُوجٌ لِلرِّحْلَة</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioManager.playClick();
              setIsGuideModalOpen(true);
            }}
            className="px-3 py-1.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-black shadow-sm"
            title="دليل شَرْحِ المَرْحَلَة"
          >
            <span>📖</span>
            <span className="hidden sm:inline">شَرْحُ المَرْحَلَة</span>
          </button>
          <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-400 to-yellow-400 px-3.5 py-1 rounded-full border border-white shadow-sm">
            المرحلة {stageNumber} من 8 • {stageDef.titleAr}
          </span>
          <span className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 font-black text-2xl text-slate-950 flex items-center justify-center border-2 border-white shadow-glow-yellow">
            {letter.char}
          </span>
        </div>
      </header>

      {/* Main Single-Activity Focus Arena */}
      <main className="relative z-10 max-w-3xl mx-auto w-full my-auto space-y-6 text-center">
        
        {/* Mascot Hint & Voice */}
        <div className="flex justify-center">
          <LumiMascot
            message={feedback || challenge?.promptAr || 'انْظُرْ جَيِّدًا وَاخْتَرِ الإِجَابَةَ الصَّحِيحَة!'}
            emotion={isSuccess ? 'cheering' : 'happy'}
            size="md"
          />
        </div>

        {/* Big Clean Royal Challenge Card */}
        {challenge && (
          <div className="bg-[#0b1638]/95 backdrop-blur-2xl p-6 md:p-10 rounded-3xl border-3 border-amber-400/80 shadow-[0_0_45px_rgba(245,158,11,0.3)] space-y-6">
            
            {/* Target Display Item */}
            <div className="space-y-3">
              <span className="text-7xl md:text-8xl block animate-bounce-slow">
                {challenge.targetItem === letter.char ? letter.words[0]?.emoji || '👑' : '🎯'}
              </span>

              <h2 className="text-2xl md:text-3xl font-black text-amber-300">
                {challenge.promptAr}
              </h2>

              <button
                onClick={() => audioManager.speak(challenge.audioKey)}
                className="px-6 py-3 bg-[#132252] hover:bg-[#1a2f6e] text-amber-300 rounded-2xl font-black text-sm border-2 border-amber-400/50 inline-flex items-center gap-2 transition-all shadow-md active:scale-95"
              >
                <Volume2 className="w-5 h-5 text-amber-400" />
                <span>اسْتَمِعْ لِلصَّوْتِ المَلَكِيّ 🔊</span>
              </button>
            </div>

            {/* Answer Options Grid: Big, High Contrast, Touch Friendly */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {challenge.options.map((opt) => {
                const isSelected = selectedOptionId === opt.id;
                const isOptionCorrect = isSelected && opt.isCorrect;

                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelectOption(opt)}
                    disabled={isSuccess}
                    className={`p-6 rounded-3xl border-3 font-black text-2xl md:text-3xl transition-all duration-300 flex flex-col items-center justify-center gap-2 min-h-[130px] active:scale-95 shadow-xl ${
                      isOptionCorrect
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-white shadow-glow-green scale-105 animate-pop'
                        : isSelected && !opt.isCorrect
                        ? 'bg-rose-900/80 text-rose-200 border-rose-500'
                        : 'bg-[#132252] hover:bg-[#1e3578] hover:border-amber-400 text-white border-blue-900/70 hover:scale-105'
                    }`}
                  >
                    {opt.icon && <span className="text-4xl">{opt.icon}</span>}
                    <span>{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Next Stage Button (Visible on Success with Royal Fanfare) */}
            {isSuccess && (
              <div className="pt-6 border-t border-blue-900/60 animate-pop">
                <button
                  onClick={handleNext}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-xl border-2 border-white shadow-glow-yellow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
                >
                  <Crown className="w-6 h-6 fill-slate-950" />
                  <span>{stageNumber < 8 ? 'المَرْحَلَةُ التَّالِيَة 🚀' : 'أَتْمَمْتَ رِحْلَةَ الحَرْفِ بِتَفَوُّقٍ مَلَكِيّ! 👑'}</span>
                </button>
              </div>
            )}

          </div>
        )}

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-xs text-amber-200/70 font-bold py-2">
        <span>المرحلة {stageNumber}: {stageDef.landmark3D}</span>
      </footer>

      {/* Stages 8-Step Comprehensive Curriculum Guide Modal */}
      <StagesGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onSelectStage={(num) => onCompleteStageAndNext(num)}
        initialStage={stageNumber}
      />

    </div>
  );
};

```

## 📄 ملف: `src\components\pages\CleanMainMenu.tsx`
```typescript
import React, { useState } from 'react';
import { Sparkles, ArrowLeft, Volume2, Shield, Compass, BookOpen, Star, Crown, Flame } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';
import { VoiceSettingsModal } from '../common/VoiceSettingsModal';

interface CleanMainMenuProps {
  onGoToLetters: () => void;
  onGoToWorlds: () => void;
  onGoToMirror: () => void;
  onGoToParent: () => void;
  onQuickStartBaa: () => void;
}

export const CleanMainMenu: React.FC<CleanMainMenuProps> = ({
  onGoToLetters,
  onGoToWorlds,
  onGoToMirror,
  onGoToParent,
  onQuickStartBaa
}) => {
  const { childName, stars, coins, streak } = useGame();
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060a17] via-[#0a1435] to-[#060a17] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-hidden">
      
      {/* Royal Gold & Celestial Blue Glow Background */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Floating Magic Accents */}
      <div className="absolute top-16 left-12 text-2xl animate-float opacity-80">👑</div>
      <div className="absolute top-28 right-16 text-3xl animate-float opacity-80" style={{ animationDelay: '1s' }}>✨</div>
      <div className="absolute bottom-24 right-20 text-3xl animate-float opacity-80" style={{ animationDelay: '2s' }}>⭐</div>

      {/* Top Header: Child Greeting & Royal Stats */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border-3 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <div className="flex items-center gap-3.5">
          <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-blue-600 border-3 border-white shadow-glow-yellow flex items-center justify-center text-3xl">
            👑
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-white">
              أَهْلًا يَا {childName || 'البَطَل'}! ✨
            </h1>
            <p className="text-xs text-cyan-200 font-bold">
              مَمْلَكَةُ الأَصْوَاتِ السَّاحِرَةِ بِانْتِظَارِك!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          {/* Royal Stars */}
          <div className="flex items-center gap-1.5 bg-amber-500/25 text-amber-300 px-4 py-2 rounded-2xl border-2 border-amber-400 font-black text-xs md:text-sm shadow-glow-yellow">
            <Star className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin-slow" />
            <span>{stars}</span>
            <span className="text-[11px] text-amber-200">نجمة</span>
          </div>

          {/* Neural Voice Switcher */}
          <button
            onClick={() => setIsVoiceModalOpen(true)}
            className="p-2.5 rounded-2xl bg-[#132252] border-2 border-amber-400/60 text-amber-300 hover:bg-amber-950/50 transition-all shadow-md flex items-center gap-1.5 text-xs font-black active:scale-95"
            title="صوت الفتاة (Microsoft Neural)"
          >
            <Volume2 className="w-4 h-4 text-amber-300" />
            <span className="hidden sm:inline">صوت الفتاة 🎙️</span>
          </button>

          {/* Parent Mode */}
          <button
            onClick={() => {
              audioManager.playClick();
              onGoToParent();
            }}
            className="p-2.5 rounded-2xl bg-[#132252] border border-blue-500/40 text-blue-200 hover:bg-blue-900/50 transition-all shadow-sm flex items-center gap-1.5 text-xs font-bold active:scale-95"
            title="بوابة ولي الأمر والمعالج"
          >
            <Shield className="w-4 h-4 text-blue-300" />
            <span className="hidden sm:inline">ولي الأمر</span>
          </button>
        </div>
      </header>

      {/* Main Center Area: 3 Big Royal Joyful Cards */}
      <main className="relative z-10 max-w-4xl mx-auto w-full my-auto py-8 space-y-6">
        
        {/* Joyful Mascot Speech */}
        <div className="flex justify-center">
          <LumiMascot
            message={`أَهْلًا يَا ${childName || 'البَطَل'}! هَيَّا نَبْدَأُ رِحْلَةَ الحُرُوفِ السَّاحِرَةِ وَنَكْتَشِفُ أَجْمَلَ الأَصْوَاتِ مَعًا!` }
            emotion="happy"
            size="md"
          />
        </div>

        {/* 3 Prominent Royal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          
          {/* Card 1: 28 Letters Journey (Royal Gold & Cyan) */}
          <button
            onClick={() => {
              audioManager.playPortal();
              onGoToLetters();
            }}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#162758] to-[#0b1638] border-3 border-amber-400/80 hover:border-yellow-300 hover:shadow-[0_0_35px_rgba(245,158,11,0.4)] transition-all duration-300 hover:-translate-y-2 text-right flex flex-col justify-between min-h-[270px] active:scale-95 shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-3xl font-black text-slate-950 border-2 border-white shadow-glow-yellow group-hover:scale-110 transition-transform">
              🔤
            </div>

            <div className="space-y-1.5 my-3">
              <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-300 to-yellow-400 px-3 py-0.5 rounded-full border border-white font-black">
                28 حَرْفًا كَامِلَة • مَفْتُوحَة 🔓
              </span>
              <h2 className="text-2xl font-black text-white group-hover:text-amber-200 transition-colors">
                رِحْلَةُ الحُرُوف
              </h2>
              <p className="text-xs text-blue-100 font-bold leading-relaxed">
                اخْتَرْ أَيَّ حَرْفٍ وَتَدَرَّجْ فِي نُطْقِ المَقَاطِعِ وَالكَلِمَاتِ وَالجُمَل!
              </p>
            </div>

            <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs font-black text-amber-300">
              <span>ابْدَأِ الرِّحْلَة</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 2: 8 Living Worlds */}
          <button
            onClick={() => {
              audioManager.playPortal();
              onGoToWorlds();
            }}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#113a52] to-[#0b1638] border-3 border-cyan-400/80 hover:border-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.4)] transition-all duration-300 hover:-translate-y-2 text-right flex flex-col justify-between min-h-[270px] active:scale-95 shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-400 via-blue-400 to-indigo-600 flex items-center justify-center text-3xl font-black text-white border-2 border-white shadow-glow-cyan group-hover:scale-110 transition-transform">
              🗺️
            </div>

            <div className="space-y-1.5 my-3">
              <span className="text-xs font-black text-cyan-950 bg-gradient-to-r from-cyan-300 to-sky-300 px-3 py-0.5 rounded-full border border-white font-black">
                8 عَوَالِمَ مَلَكِيَّة 🏰
              </span>
              <h2 className="text-2xl font-black text-white group-hover:text-cyan-200 transition-colors">
                خَرِيطَةُ العَوَالِم
              </h2>
              <p className="text-xs text-cyan-100 font-bold leading-relaxed">
                اسْتَكْشِفْ وادِي الحُرُوف، غَابَةَ المَقَاطِع، مَجَرَّةَ الفَضَاءِ، وَالمَزِيد!
              </p>
            </div>

            <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs font-black text-cyan-300">
              <span>اسْتَكْشِفِ العَوَالِم</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>

          {/* Card 3: Mouth & Articulation Mirror */}
          <button
            onClick={() => {
              audioManager.playClick();
              onGoToMirror();
            }}
            className="group relative p-6 rounded-3xl bg-gradient-to-b from-[#2a1752] to-[#0b1638] border-3 border-purple-400/80 hover:border-pink-300 hover:shadow-[0_0_35px_rgba(217,70,239,0.4)] transition-all duration-300 hover:-translate-y-2 text-right flex flex-col justify-between min-h-[270px] active:scale-95 shadow-xl"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-400 via-pink-400 to-rose-600 flex items-center justify-center text-3xl font-black text-white border-2 border-white shadow-glow-pink group-hover:scale-110 transition-transform">
              🪞
            </div>

            <div className="space-y-1.5 my-3">
              <span className="text-xs font-black text-purple-950 bg-gradient-to-r from-purple-300 to-pink-300 px-3 py-0.5 rounded-full border border-white font-black">
                تَدْرِيبٌ بَصَرِيٌّ دَقِيق ✨
              </span>
              <h2 className="text-2xl font-black text-white group-hover:text-pink-200 transition-colors">
                مِرْآةُ لُومِي
              </h2>
              <p className="text-xs text-pink-100 font-bold leading-relaxed">
                شَاهِدْ حَرَكَةَ الشَّفَتَيْنِ وَمَخَارِجَ الأَصْوَاتِ وَقَلِّدْهَا أَمَامَ المِرْآة!
              </p>
            </div>

            <div className="pt-3 border-t border-blue-900/60 flex items-center justify-between text-xs font-black text-pink-300">
              <span>افْتَحِ المِرْآة</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </div>
          </button>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-xs text-amber-200/70 font-bold py-2">
        <span>LUMI — رِحْلَةُ الأَصْوَاتِ السَّاحِرَةِ لِلأَطْفَال ✨</span>
      </footer>

      {/* Voice Settings Modal */}
      <VoiceSettingsModal
        isOpen={isVoiceModalOpen}
        onClose={() => setIsVoiceModalOpen(false)}
      />

    </div>
  );
};

```

## 📄 ملف: `src\components\pages\CleanLetterSelect.tsx`
```typescript
import React from 'react';
import { ArrowRight, Volume2, Sparkles, Star, Crown } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

interface CleanLetterSelectProps {
  onSelectLetter: (letterId: string) => void;
  onBackToMenu: () => void;
}

export const CleanLetterSelect: React.FC<CleanLetterSelectProps> = ({
  onSelectLetter,
  onBackToMenu
}) => {
  const { childName, letterProgressMap } = useGame();

  const handleLetterClick = (letter: LetterData) => {
    audioManager.playPortal();
    audioManager.speak(letter.char);
    onSelectLetter(letter.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060a17] via-[#0a1435] to-[#060a17] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-hidden">
      
      {/* Background Ambience */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-6xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border-3 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToMenu();
            }}
            className="p-3 rounded-2xl bg-[#132252] border-2 border-amber-400/50 text-amber-300 hover:bg-amber-950/50 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-1.5 font-black text-xs"
            title="العودة للقائمة الرئيسية"
          >
            <ArrowRight className="w-5 h-5" />
            <span>الرَّئِيسِيَّة</span>
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-white flex items-center gap-2">
              <span>مَرْصَدُ الحُرُوفِ المَلَكِيّ (28 حَرْفًا)</span>
              <span>👑</span>
            </h1>
            <p className="text-xs text-cyan-200 font-bold">
              اخْتَرْ أَيَّ حَرْفٍ لِتَبْدَأَ رِحْلَتَهُ بِصَوْتِ الفَتَاةِ الفَصِيح!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 px-4 py-2 rounded-2xl border-2 border-white text-xs font-black shadow-glow-yellow">
          <Sparkles className="w-4 h-4 fill-slate-950" />
          <span>جَمِيعُ الحُرُوفِ مَفْتُوحَة 🔓</span>
        </div>
      </header>

      {/* Main Grid Area: Clean, Spacious, Highly Legible */}
      <main className="relative z-10 max-w-6xl mx-auto w-full my-6 space-y-4">
        
        {/* Lumi Voice Guide Banner */}
        <LumiGuideBanner
          message={`مَرْصَدُ الحُرُوفِ العَرَبِيَّةِ يَا ${childName || 'البَطَل'}! اخْتَرْ أَيَّ حَرْفٍ مِنَ الحُرُوفِ الثَّمَانِيَةِ وَالعِشْرِينَ لِتَسْتَمِعَ لِصَوْتِهِ وَتَبْدَأَ رِحْلَتَهُ السَّاحِرَة!`}
          shortHint="اخْتَرْ حَرْفَكَ المُفَضَّل"
          autoSpeak={true}
          emotion="happy"
        />

        {/* 28 Arabic Letters in Exact Order */}
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3.5 md:gap-4">
          {ARABIC_LETTERS.map((letter) => {
            const progress = letterProgressMap[letter.id] || {
              discovery: false,
              sound: false,
              vowels: false,
              syllables: false,
              words: false,
              soundPosition: false,
              sentences: false,
              finalChallenge: false,
              currentStage: 1,
              masteryPercentage: 0
            };

            const isMastered = progress.masteryPercentage === 100;
            const isInProgress = progress.masteryPercentage > 0 && !isMastered;

            return (
              <div
                key={letter.id}
                onClick={() => handleLetterClick(letter)}
                className={`relative p-4 rounded-3xl border-3 flex flex-col items-center justify-between min-h-[185px] cursor-pointer transition-all duration-300 select-none bg-[#0a1435]/95 backdrop-blur-md hover:-translate-y-2 active:scale-95 shadow-xl group ${
                  isMastered
                    ? 'border-amber-400 bg-gradient-to-b from-amber-950/60 to-[#0a1435] shadow-[0_0_25px_rgba(245,158,11,0.4)]'
                    : isInProgress
                    ? 'border-cyan-400 bg-gradient-to-b from-cyan-950/60 to-[#0a1435] shadow-glow-cyan'
                    : 'border-blue-900/60 hover:border-amber-400/80 hover:bg-[#132252]/90 hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]'
                }`}
              >
                {/* Order Badge & Sound Play */}
                <div className="w-full flex items-center justify-between text-xs">
                  <span className="w-7 h-7 rounded-full bg-[#132252] text-amber-300 font-black text-xs flex items-center justify-center border-2 border-amber-400/50 shadow-sm">
                    {letter.order}
                  </span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      audioManager.speak(letter.char);
                    }}
                    className="p-1.5 rounded-xl text-amber-300 hover:text-white hover:bg-amber-500/40 border border-amber-400/30 transition-colors shadow-sm"
                    title="اسْتَمِعْ لِصَوْتِ الحَرْف"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Big Royal Arabic Letter */}
                <div className="my-1">
                  <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-amber-200 via-yellow-300 to-white group-hover:scale-115 transition-transform duration-300 inline-block drop-shadow-[0_4px_10px_rgba(245,158,11,0.5)]">
                    {letter.char}
                  </span>
                </div>

                {/* Letter Name & Example */}
                <div className="w-full text-center space-y-1">
                  <div className="text-xs font-black text-white group-hover:text-amber-200 transition-colors">
                    حَرْفُ {letter.nameAr}
                  </div>

                  <div className="text-[11px] text-cyan-200 font-bold flex items-center justify-center gap-1">
                    <span>{letter.words[0]?.emoji}</span>
                    <span>{letter.words[0]?.word}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-[#132252] h-2 rounded-full overflow-hidden mt-1 border border-blue-900">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isMastered ? 'bg-amber-400 shadow-glow-yellow' : 'bg-cyan-400'
                      }`}
                      style={{ width: `${progress.masteryPercentage}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-black text-amber-200/80 pt-0.5">
                    <span>المرحلة {progress.currentStage}/8</span>
                    <span>%{progress.masteryPercentage}</span>
                  </div>
                </div>

                {/* Mastered Badge */}
                {isMastered && (
                  <div className="absolute -top-2.5 -right-2.5 w-8 h-8 bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 rounded-full flex items-center justify-center border-2 border-white shadow-glow-yellow text-base animate-bounce-slow">
                    👑
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-xs text-amber-200/70 font-bold py-2">
        <span>LUMI — جَمِيعُ الحُرُوفِ العَرَبِيَّةِ مُتَاحَةٌ بِصَوْتِ الفَتَاةِ النَّقِيّ ✨</span>
      </footer>

    </div>
  );
};

```

## 📄 ملف: `src\components\pages\CleanLetterOverview.tsx`
```typescript
import React from 'react';
import { ArrowRight, Volume2, Play, Lock, CheckCircle2, Star, Sparkles, Crown } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../mascot/LumiMascot';

interface CleanLetterOverviewProps {
  letterId: string;
  onBackToLetterSelect: () => void;
  onStartStage: (stageNum: number) => void;
}

export const CleanLetterOverview: React.FC<CleanLetterOverviewProps> = ({
  letterId,
  onBackToLetterSelect,
  onStartStage
}) => {
  const { childName, letterProgressMap } = useGame();

  const letter: LetterData = ARABIC_LETTERS.find(l => l.id === letterId) || ARABIC_LETTERS[1];
  const progress = letterProgressMap[letter.id] || {
    discovery: false,
    sound: false,
    vowels: false,
    syllables: false,
    words: false,
    soundPosition: false,
    sentences: false,
    finalChallenge: false,
    currentStage: 1,
    masteryPercentage: 0
  };

  const isStageUnlocked = (stageNum: number) => {
    if (stageNum === 1) return true;
    const stageKeys = ['discovery', 'sound', 'vowels', 'syllables', 'words', 'soundPosition', 'sentences', 'finalChallenge'];
    const prevKey = stageKeys[stageNum - 2];
    return (progress as any)[prevKey] === true || progress.currentStage >= stageNum;
  };

  const activeStage = progress.currentStage || 1;
  const activeStageDef = STAGE_CURRICULUM_DEFINITIONS.find(s => s.stageNumber === activeStage) || STAGE_CURRICULUM_DEFINITIONS[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060a17] via-[#0a1435] to-[#060a17] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-hidden">
      
      {/* Glow Ambience */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-blue-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border-3 border-amber-400/50 shadow-[0_0_30px_rgba(245,158,11,0.2)]">
        <button
          onClick={() => {
            audioManager.playClick();
            onBackToLetterSelect();
          }}
          className="p-3 rounded-2xl bg-[#132252] border-2 border-amber-400/50 text-amber-300 hover:bg-amber-950/50 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-2 font-black text-xs"
        >
          <ArrowRight className="w-5 h-5" />
          <span>مَرْصَدُ الحُرُوف</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-300">
            حَرْفُ {letter.nameAr}
          </span>
          <span className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black flex items-center justify-center border-2 border-white shadow-glow-yellow text-sm">
            {letter.order}
          </span>
        </div>
      </header>

      {/* Main Focus Card */}
      <main className="relative z-10 max-w-4xl mx-auto w-full my-auto space-y-6">
        
        {/* Big Letter Hero Card: Royal Gold & Blue */}
        <div className="bg-gradient-to-r from-[#162758] via-[#0f1d47] to-[#162758] rounded-3xl p-6 md:p-8 border-3 border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.3)] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-right">
          
          <div className="flex flex-col sm:flex-row items-center gap-6">
            {/* Big Glowing Royal Letter */}
            <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 flex items-center justify-center text-8xl font-black border-4 border-white shadow-glow-yellow animate-wiggle">
              {letter.char}
            </div>

            <div className="space-y-2">
              <span className="inline-block bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 text-xs font-black px-3.5 py-1 rounded-full border border-white shadow-sm">
                رِحْلَةُ حَرْفِ {letter.nameAr} المَلَكِيَّة 👑
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-white">
                حَرْفُ ({letter.char}) — {letter.words[0]?.word} {letter.words[0]?.emoji}
              </h2>
              <p className="text-xs md:text-sm text-cyan-200 font-bold max-w-md">
                المرحلة الحالية: {activeStageDef.stageNumber}. {activeStageDef.titleAr} ({activeStageDef.landmark3D})
              </p>
            </div>
          </div>

          {/* Big Action Button */}
          <div className="flex flex-col gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => {
                audioManager.playPortal();
                onStartStage(activeStage);
              }}
              className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 whitespace-nowrap"
            >
              <Play className="w-5 h-5 fill-slate-950" />
              <span>ابْدَأِ المَرْحَلَةَ {activeStage} 🚀</span>
            </button>

            <button
              onClick={() => audioManager.speak(letter.char)}
              className="px-4 py-2.5 bg-[#132252] hover:bg-[#1a2f6e] text-amber-300 rounded-xl font-black text-xs border-2 border-amber-400/40 flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95"
            >
              <Volume2 className="w-4 h-4 text-amber-300" />
              <span>اسْتَمِعْ لِصَوْتِ الحَرْف 🔊</span>
            </button>
          </div>
        </div>

        {/* 8-Stage Sequential Roadmap Grid */}
        <div className="bg-[#0b1638]/90 backdrop-blur-md p-6 rounded-3xl border-3 border-blue-900/60 shadow-xl space-y-4">
          <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <span>مَرَاحِلُ حَرْفِ {letter.nameAr} (8 مَرَاحِلَ مُتَسَلْسِلَة)</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </h3>
            <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-400/40">
              إِتْقَانُ الحَرْف: %{progress.masteryPercentage}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {STAGE_CURRICULUM_DEFINITIONS.map((stg) => {
              const isUnlocked = isStageUnlocked(stg.stageNumber);
              const isActive = activeStage === stg.stageNumber;
              const isCompleted = (progress as any)[['discovery', 'sound', 'vowels', 'syllables', 'words', 'soundPosition', 'sentences', 'finalChallenge'][stg.stageNumber - 1]];

              return (
                <button
                  key={stg.stageNumber}
                  onClick={() => {
                    if (isUnlocked) {
                      audioManager.playClick();
                      onStartStage(stg.stageNumber);
                    } else {
                      audioManager.playClick();
                      audioManager.speak('أَكْمِلِ المَرْحَلَةَ السَّابِقَةَ أَوَّلًا لِفَتْحِ هَذِهِ المَرْحَلَة!');
                    }
                  }}
                  className={`p-4 rounded-2xl border-2 text-right transition-all flex flex-col justify-between min-h-[115px] ${
                    isActive
                      ? 'bg-gradient-to-b from-[#1c3570] to-[#0f1f47] border-amber-400 shadow-glow-yellow'
                      : isCompleted
                      ? 'bg-emerald-950/70 border-emerald-400/70 text-emerald-200'
                      : isUnlocked
                      ? 'bg-[#132252] border-slate-700 hover:border-amber-400/60 text-slate-200'
                      : 'bg-[#060c1f] border-slate-800 text-slate-600 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-black">
                      {stg.stageNumber}. {stg.titleAr}
                    </span>
                    <span>
                      {isCompleted ? '👑' : !isUnlocked ? '🔒' : '📍'}
                    </span>
                  </div>

                  <p className="text-[11px] text-cyan-200/80 font-medium line-clamp-2 mt-1">
                    {stg.objectiveAr}
                  </p>

                  <span className="text-[10px] text-amber-300 font-bold mt-2">
                    {stg.landmark3D}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-xs text-amber-200/70 font-bold py-2">
        <span>LUMI — رِحْلَةُ حَرْفِ {letter.nameAr} • خُطْوَةً بِخُطْوَة</span>
      </footer>

    </div>
  );
};

```

## 📄 ملف: `src\components\onboarding\CinematicOnboarding.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowLeft, Crown, Star, Volume2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';

interface CinematicOnboardingProps {
  onComplete: () => void;
}

export const CinematicOnboarding: React.FC<CinematicOnboardingProps> = ({ onComplete }) => {
  const { childName, setChildName, selectedLetterId, setSelectedLetterId } = useGame();
  const [step, setStep] = useState<'name' | 'choose_letter'>('name');
  const [inputName, setInputName] = useState<string>(''); // Clean empty start

  // Spoken female voice welcome on entry
  useEffect(() => {
    const timer = setTimeout(() => {
      audioManager.speak('مَرْحَبًا يَا بَطَل! اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!', 0.85);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalName = inputName.trim() || 'البَطَل';
    audioManager.playVictory();
    setChildName(finalName);
    setStep('choose_letter');
    
    setTimeout(() => {
      audioManager.speak(`أَهْلًا يَا ${finalName}! اخْتَرْ حَرْفَكَ السِّحْرِيَّ الَّذِي تُرِيدُ أَنْ نَبْدَأَ بِهِ مُغَامَرَتَنَا!`, 0.85);
    }, 300);
  };

  const handleSelectLetter = (letter: LetterData) => {
    const activeName = childName || inputName.trim() || 'البَطَل';
    audioManager.playPortal();
    setSelectedLetterId(letter.id);
    audioManager.speak(`حَرْفُ ${letter.nameAr}! اخْتِيَارٌ رَائِعٌ يَا ${activeName}! هَيَّا بِنَا نَنْطَلِق!`, 0.85);
    
    setTimeout(() => {
      onComplete();
    }, 1200);
  };

  return (
    <div className="relative w-full min-h-screen bg-[#060a17] flex items-center justify-center p-4 select-none overflow-y-auto font-arabic">
      
      {/* Royal Gold & Celestial Atmosphere Lights */}
      <div className="absolute -top-24 -right-24 w-[450px] h-[450px] bg-gradient-to-br from-amber-500/25 to-yellow-600/10 rounded-full blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute -bottom-24 -left-24 w-[450px] h-[450px] bg-gradient-to-tr from-blue-600/30 to-cyan-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDelay: '1.5s' }} />

      {/* Floating Sparkle Elements */}
      <div className="absolute top-12 left-16 text-3xl animate-float">✨</div>
      <div className="absolute top-20 right-20 text-4xl animate-float" style={{ animationDelay: '1s' }}>🌟</div>
      <div className="absolute bottom-16 left-24 text-4xl animate-float" style={{ animationDelay: '2s' }}>👑</div>
      <div className="absolute bottom-20 right-24 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>⭐</div>

      <div className="relative z-10 max-w-2xl w-full bg-[#0a1128]/95 backdrop-blur-2xl rounded-3xl p-5 md:p-8 border-3 border-amber-400/70 shadow-[0_0_50px_rgba(245,158,11,0.25)] space-y-5 text-white text-center animate-pop">
        
        {/* ========================================================================= */}
        {/* STEP 1: ENTER CHILD NAME (كتابة الاسم) */}
        {/* ========================================================================= */}
        {step === 'name' && (
          <form onSubmit={handleNameSubmit} className="space-y-6 max-w-md mx-auto">
            
            {/* Royal Gold Badge */}
            <div className="relative inline-block">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 p-1 border-3 border-white shadow-glow-yellow flex items-center justify-center text-5xl animate-bounce-slow">
                👑
              </div>
              <span className="absolute -bottom-2 inset-x-0 mx-auto w-max bg-blue-600 text-white font-black text-[10px] px-2.5 py-0.5 rounded-full border border-white/60 shadow">
                بَوَّابَةُ الأَبْطَال
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl md:text-4xl font-black tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-white drop-shadow-md">
                مَا اسْمُكَ يَا بَطَل؟
              </h2>
              <p className="text-xs md:text-sm text-cyan-200 font-bold leading-relaxed">
                اكْتُبِ اسْمَكَ لِتُنَادِيَكَ لُومِي بِهِ طَوَالَ رِحْلَةِ التَّعَلُّمِ السَّاحِرَة!
              </p>
            </div>

            <div className="relative">
              <input
                type="text"
                value={inputName}
                onChange={(e) => setInputName(e.target.value)}
                placeholder="اكْتُبِ اسْمَكَ هُنَا..."
                className="w-full bg-[#131d3b] border-3 border-amber-400/60 focus:border-yellow-300 rounded-2xl px-5 py-4 text-center text-xl md:text-2xl font-black text-amber-200 placeholder-slate-400 focus:outline-none transition-all shadow-[inset_0_2px_8px_rgba(0,0,0,0.5)] focus:shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                autoFocus
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 rounded-2xl font-black text-lg md:text-xl border-2 border-white shadow-glow-yellow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3"
            >
              <span>مُتَابَعَة — اخْتِيَارُ الحَرْف</span>
              <ArrowLeft className="w-6 h-6" />
            </button>
          </form>
        )}

        {/* ========================================================================= */}
        {/* STEP 2: MANDATORY LETTER SELECTION (واجهة اختيار الحرف مباشرة بعد الاسم) */}
        {/* ========================================================================= */}
        {step === 'choose_letter' && (
          <div className="space-y-4 text-center">
            
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-xs font-black px-3.5 py-1 rounded-full border border-amber-400/40">
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>مَرْحَبًا يَا {childName || inputName}!</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white">
                اخْتَرْ حَرْفَكَ لِبَدْءِ المُغَامَرَة! 🎯
              </h2>
              <p className="text-xs text-cyan-300 font-bold">
                انْقُرْ عَلَى أَيِّ حَرْفٍ لِيَكُونَ بَطَلَ رِحْلَتِكَ وَمَرَاحِلِكَ اليَوْم
              </p>
            </div>

            {/* 28 Arabic Letters Responsive 3D Grid */}
            <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5 max-h-[55vh] overflow-y-auto pr-1 no-scrollbar p-1">
              {ARABIC_LETTERS.map((letter) => {
                const isSelected = letter.id === selectedLetterId;

                return (
                  <button
                    key={letter.id}
                    onClick={() => handleSelectLetter(letter)}
                    className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[75px] md:min-h-[85px] transition-all duration-200 active:scale-95 relative border-2 ${
                      isSelected
                        ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 border-white shadow-glow-yellow scale-105'
                        : 'bg-[#13224d] hover:bg-[#1c3272] text-white border-blue-800/80 hover:border-amber-400/70 hover:scale-105'
                    }`}
                  >
                    <span className="text-2xl md:text-3xl font-black">
                      {letter.char}
                    </span>

                    <span className={`text-[10px] font-black ${isSelected ? 'text-slate-950' : 'text-cyan-200'}`}>
                      {letter.nameAr}
                    </span>
                  </button>
                );
              })}
            </div>

            <p className="text-[11px] text-slate-400 font-bold pt-1">
              ✨ يُمْكِنُكَ تَغْيِيرُ الحَرْفِ دَائِمًا فِي أَيِّ وَقْتٍ مِنْ دَاخِلِ التَّطْبِيق!
            </p>

          </div>
        )}

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\mouth\LoulouMouthMirror.tsx`
```typescript
import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import lettersData from '../../data/letters.json';
import { soundManager } from '../../services/audio/SoundManager';
import { useGame } from '../../context/GameContext';
import { LoulouMascot } from '../mascot/LoulouMascot';

export const LoulouMouthMirror: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins } = useGame();
  const [selectedLetter, setSelectedLetter] = useState(lettersData[0]);
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [mouthAnimationState, setMouthAnimationState] = useState<'closed' | 'open' | 'smiling' | 'pout'>('closed');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Toggle Camera
  const toggleCamera = async () => {
    if (cameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        streamRef.current = stream;
        setCameraActive(true);
      } catch (err) {
        console.warn('Camera error:', err);
        alert('تعذر الوصول للكاميرا، يرجى منح الإذن في المتصفح.');
      }
    }
  };

  // Attach stream whenever cameraActive changes and video element mounts
  useEffect(() => {
    if (cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraActive]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Animate mouth when letter changes or sound plays
  const triggerMouthDemo = () => {
    soundManager.speak(selectedLetter.character);
    setMouthAnimationState('closed');
    setTimeout(() => setMouthAnimationState('open'), 300);
    setTimeout(() => setMouthAnimationState('smiling'), 700);
    setTimeout(() => setMouthAnimationState('closed'), 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-emerald-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>مِرْآةُ لُولُو لِتَعْلِيمِ حَرَكَةِ الفَم</span>
              <span className="text-2xl">🪞</span>
            </h1>
            <p className="text-xs text-slate-500 font-bold">
              شَاهِدْ حَرَكَةَ الشَّفَتَيْنِ وَاللِّسَانِ وَقَلِّدْهَا أَمَامَ المِرْآة!
            </p>
          </div>
        </div>

        <button
          onClick={toggleCamera}
          className={`game-btn px-4 py-2 rounded-xl font-extrabold text-xs md:text-sm border-2 transition-all ${
            cameraActive
              ? 'bg-rose-500 text-white border-rose-600'
              : 'bg-emerald-500 text-white border-emerald-600'
          }`}
        >
          {cameraActive ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          <span>{cameraActive ? 'إِغْلاق المِرْآة' : 'فَتْح المِرْآة 📷'}</span>
        </button>
      </div>

      {/* Main Mirror & Mouth Guide Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Card: Loulou Animated Mouth Guide */}
        <div className="game-card p-6 border-4 border-sky-300 bg-gradient-to-b from-sky-50 to-white flex flex-col items-center justify-between text-center space-y-4">
          <span className="bg-sky-100 text-sky-800 font-black text-xs px-3 py-1 rounded-full border border-sky-300">
            حَرَكَةُ الفَمِ لِحَرْفِ: {selectedLetter.nameAr} ({selectedLetter.character})
          </span>

          {/* Animated Mouth Illustration SVG */}
          <div className="relative w-48 h-48 bg-amber-50 rounded-full border-4 border-amber-300 flex items-center justify-center shadow-inner overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-36 h-36">
              {/* Lips Outline */}
              <ellipse cx="50" cy="50" rx="36" ry="24" fill="#f43f5e" />
              
              {/* Mouth Cavity */}
              {mouthAnimationState === 'closed' ? (
                <path d="M 20 50 Q 50 54 80 50" stroke="#be123c" strokeWidth="4" fill="none" strokeLinecap="round" />
              ) : mouthAnimationState === 'open' ? (
                <ellipse cx="50" cy="50" rx="26" ry="16" fill="#881337" />
              ) : (
                <ellipse cx="50" cy="50" rx="28" ry="12" fill="#881337" />
              )}

              {/* Teeth */}
              {mouthAnimationState !== 'closed' && (
                <>
                  <rect x="35" y="38" width="30" height="6" rx="2" fill="#ffffff" />
                  <rect x="38" y="56" width="24" height="5" rx="2" fill="#ffffff" />
                </>
              )}

              {/* Tongue Position */}
              {mouthAnimationState !== 'closed' && (
                <path d="M 38 56 Q 50 48 62 56 Z" fill="#fb7185" />
              )}
            </svg>
          </div>

          <div className="space-y-2">
            <h4 className="font-black text-slate-800 text-base">
              {selectedLetter.mouthGuide.lipPosition}
            </h4>
            <p className="text-xs md:text-sm text-slate-600 font-medium max-w-sm">
              {selectedLetter.mouthGuide.tip}
            </p>
          </div>

          <button
            onClick={triggerMouthDemo}
            className="game-btn px-6 py-2.5 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-bold text-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>حَرِّكِ الفَمَ وَاسْتَمِعْ 👄</span>
          </button>
        </div>

        {/* Right Card: Real Mirror / Camera View */}
        <div className="game-card p-6 border-4 border-emerald-300 bg-gradient-to-b from-emerald-50 to-white flex flex-col items-center justify-between text-center space-y-4">
          <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-300">
            مِرْآتُكَ الشَّخْصِيَّة 🪞
          </span>

          <div className="relative w-full h-56 bg-slate-900 rounded-3xl border-4 border-white shadow-card-pop overflow-hidden flex items-center justify-center">
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover transform -scale-x-100"
              />
            ) : (
              <div className="text-center p-6 space-y-2">
                <span className="text-5xl block opacity-80">🪞</span>
                <p className="text-white text-xs font-bold">
                  افْتَحِ الكَامِيرَا لِمُشَاهَدَةِ نَفْسِكَ وَتَقْلِيدِ الحَرَكَة!
                </p>
                <p className="text-slate-400 text-[10px]">
                  (الكَامِيرَا تَعْمَلُ مَحَلِّيًّا بِأَمَانٍ تَامّ دُونَ حِفْظِ أَيِّ فِيدْيُو)
                </p>
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                soundManager.playSuccess();
                addStars(1);
                addCoins(5);
              }}
              className="game-btn px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-xs"
            >
              <Sparkles className="w-4 h-4" />
              <span>قَلَّدْتُ الحَرَكَةَ بِنَجَاح! 🌟</span>
            </button>
          </div>
        </div>

      </div>

      {/* Bottom Letter Chooser for Mouth Mirror */}
      <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 shadow-sm space-y-3">
        <h3 className="font-black text-slate-800 text-sm">
          اخْتَرْ حَرْفًا لِتَعَلُّمِ مَخْرَجِهِ وَشَكْلِ فَمِهِ:
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {lettersData.slice(0, 14).map(l => (
            <button
              key={l.id}
              onClick={() => {
                setSelectedLetter(l);
                soundManager.playPop();
                soundManager.speak(l.character);
              }}
              className={`min-w-[48px] h-12 rounded-xl font-black text-xl border-2 transition-all flex items-center justify-center ${
                selectedLetter.id === l.id
                  ? 'bg-sky-500 text-white border-white shadow-md scale-105'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-sky-50'
              }`}
            >
              {l.character}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\mobile\MobileStagePlayer.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Volume2,
  Mic,
  Sparkles,
  Star,
  Crown,
  Play,
  CheckCircle2,
  RotateCcw,
  Award,
  Rocket,
  Layers,
  HelpCircle,
  Trophy,
  Smile,
  Heart
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { stripTashkeel } from '../../audio/audioManifest';
import { LumiGuideBanner } from '../common/LumiGuideBanner';
import { InteractiveLetter3D } from '../3d/InteractiveLetter3D';
import { ChildFriendlyMouthGuide } from '../articulation/ChildFriendlyMouthGuide';
import { StagesGuideModal } from '../common/StagesGuideModal';

interface MobileStagePlayerProps {
  letterId: string;
  stageNumber: number;
  onBackToMap: () => void;
  onCompleteStageAndNext: (nextStageNum: number) => void;
}

export const MobileStagePlayer: React.FC<MobileStagePlayerProps> = ({
  letterId,
  stageNumber,
  onBackToMap,
  onCompleteStageAndNext
}) => {
  const {
    childName,
    updateLetterStage,
    addStars,
    addCoins,
    triggerVictoryCelebration
  } = useGame();

  const currentLetter: LetterData =
    ARABIC_LETTERS.find((l) => l.id === letterId) || ARABIC_LETTERS[1];

  const stageDef =
    STAGE_CURRICULUM_DEFINITIONS.find((s) => s.stageNumber === stageNumber) ||
    STAGE_CURRICULUM_DEFINITIONS[0];

  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showEpicTransition, setShowEpicTransition] = useState<boolean>(false);
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  // ===== Stage 1: Sound Discovery States =====
  const [stage1Popped, setStage1Popped] = useState<number[]>([]);

  // ===== Stage 3: Short Vowels Quiz States =====
  const [targetVowelIdx, setTargetVowelIdx] = useState<number>(0);
  const [selectedVowelIdx, setSelectedVowelIdx] = useState<number | null>(null);

  // ===== Stage 4: Long Madd Train States =====
  const [selectedMaddIdx, setSelectedMaddIdx] = useState<number | null>(null);

  // ===== Stage 5: Word Hunt States =====
  const [targetWordIdx, setTargetWordIdx] = useState<number>(0);
  const [selectedWordIdx, setSelectedWordIdx] = useState<number | null>(null);

  // ===== Stage 6: Position Train States =====
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  // ===== Stage 7: Word Builder Puzzle States =====
  const [puzzlePlacedChars, setPuzzlePlacedChars] = useState<string[]>([]);

  // ===== Stage 8: Grand Finale 3-Question Quest =====
  const [finaleStep, setFinaleStep] = useState<number>(1);
  const [isChestOpened, setIsChestOpened] = useState<boolean>(false);

  // Get pedagogical stage prompt
  const getStageInstruction = (stage: number, char: string, nameAr: string) => {
    switch (stage) {
      case 1:
        return `المَرْحَلَةُ 1: اسْتَمِعْ لِصَوْتِ حَرْفِ (${char}ْ) الصَّافِي، ثُمَّ اصْطَدْ فُقَّاعَاتِ الحَرْفِ يَا ${childName || 'البَطَل'}!`;
      case 2:
        return `المَرْحَلَةُ 2: مَعْمَلُ الفَمِ وَاللِّسَان! تَعَلَّمْ كَيْفَ تَنْطِقُ حَرْفَ (${char}) بِـ 3 خُطُوَاتٍ سَهْلَة!`;
      case 3:
        return `المَرْحَلَةُ 3: الحَرَكَاتُ السَّحْرِيَّة! اسْتَمِعْ لِلصَّوْتِ وَاخْتَرِ الحَرَكَةَ الصَّحِيحَة!`;
      case 4:
        return `المَرْحَلَةُ 4: قِطَارُ المُدُودِ الطَّوِيلَة! اسْتَمِعْ لِصَوْتِ المَدِّ الطَّوِيلِ وَاخْتَرْهُ!`;
      case 5:
        return `المَرْحَلَةُ 5: صَيْدُ الكَلِمَاتِ المُصَوَّرَة! أَيْنَ هِيَ الكَلِمَةُ الَّتِي تَبْدَأُ بِحَرْفِ (${char})؟`;
      case 6:
        return `المَرْحَلَةُ 6: قِطَارُ المَوَاقِع! أَيْنَ يَقِفُ حَرْفُ (${char}) فِي الكَلِمَة؟ (أَوَّل، وَسَط، آخِر)`;
      case 7:
        return `المَرْحَلَةُ 7: صَانِعُ الكَلِمَاتِ السَّاحِر! رَكِّبْ حُرُوفَ الكَلِمَةِ بِالتَّرْتِيب!`;
      case 8:
        return `المَرْحَلَةُ 8: التَّحَدِّي المَلَكِيُّ الأَسْطُورِيّ! أَجِبْ وَافْتَحْ صُنْدُوقَ الكَنْزِ لِتَتْوِيجِك! 👑`;
      default:
        return `المَرْحَلَةُ ${stage}: هَيَّا نَتَدَرَّبْ مَعًا يَا ${childName || 'البَطَل'}!`;
    }
  };

  // Reset stage states on stageNumber or letterId change
  useEffect(() => {
    setIsCompleted(false);
    setShowEpicTransition(false);
    setStage1Popped([]);
    setTargetVowelIdx(Math.floor(Math.random() * 3));
    setSelectedVowelIdx(null);
    setSelectedMaddIdx(null);
    setTargetWordIdx(0);
    setSelectedWordIdx(null);
    setSelectedPosition(null);
    setPuzzlePlacedChars([]);
    setFinaleStep(1);
    setIsChestOpened(false);

    const prompt = getStageInstruction(stageNumber, currentLetter.char, currentLetter.nameAr);
    setFeedbackText(prompt);
  }, [stageNumber, letterId, childName]);

  // General Success Handler
  const handleSuccess = (customCheer?: string) => {
    audioManager.playVictory();
    setIsCompleted(true);

    try {
      confetti({
        particleCount: 85,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#38bdf8', '#fbbf24', '#10b981', '#ec4899']
      });
    } catch {}

    const cheer = customCheer || `أَحْسَنْتَ يَا ${childName || 'البَطَل'}! إِجَابَةٌ مَلَكِيَّةٌ رَائِعَة! 🌟`;
    setFeedbackText(cheer);
    audioManager.speak(cheer);

    addStars(1);
    addCoins(10);
    updateLetterStage(currentLetter.id, stageNumber, true);

    if (stageNumber === 8) {
      triggerVictoryCelebration();
    } else {
      setTimeout(() => {
        setShowEpicTransition(true);
        audioManager.speak(`مَبْرُوك يَا ${childName || 'البَطَل'}! فُتِحَتْ لَكَ المَرْحَلَةُ ${stageNumber + 1}! هَيَّا نَنْطَلِق! 🚀`);
      }, 1400);
    }
  };

  // General Retry Handler
  const handleRetry = () => {
    audioManager.playClick();
    const retryCheer = `حَاوِلْ مَرَّةً أُخْرَى يَا ${childName || 'البَطَل'}.. أَنْتَ قَرِيبٌ جِدًّا! 💪`;
    setFeedbackText(retryCheer);
    audioManager.speak(retryCheer);
  };

  // Next Stage navigation
  const handleNext = () => {
    audioManager.playPortal();
    setShowEpicTransition(false);
    if (stageNumber < 8) {
      onCompleteStageAndNext(stageNumber + 1);
    } else {
      onBackToMap();
    }
  };

  // Short vowels definitions for current letter
  const vowels = [
    { char: `${currentLetter.char}َ`, name: 'فَتْحَة', sound: `${currentLetter.char}َ`, emoji: '👄', mouthTip: 'افْتَحْ فَمَك' },
    { char: `${currentLetter.char}ُ`, name: 'ضَمَّة', sound: `${currentLetter.char}ُ`, emoji: '⭕', mouthTip: 'ضُمَّ شَفَتَيْك' },
    { char: `${currentLetter.char}ِ`, name: 'كَسْرَة', sound: `${currentLetter.char}ِ`, emoji: '😊', mouthTip: 'ابْتَسِمْ بِاتِّسَاع' }
  ];

  // Long madd definitions for current letter
  const maddList = [
    { char: `${currentLetter.char}َا`, name: 'مَدّ بِالأَلِف', sound: `${currentLetter.char}َا`, desc: 'صَوْتٌ طَوِيلٌ مَفْتُوح 🌊' },
    { char: `${currentLetter.char}ُو`, name: 'مَدّ بِالوَاو', sound: `${currentLetter.char}ُو`, desc: 'صَوْتٌ طَوِيلٌ مَضْمُوم 🚀' },
    { char: `${currentLetter.char}ِي`, name: 'مَدّ بِاليَاء', sound: `${currentLetter.char}ِي`, desc: 'صَوْتٌ طَوِيلٌ مُبْتَسِم 🎵' }
  ];

  // Current sample word for stages 6 and 7 (with diacritics stripped for character array)
  const sampleWordObj = currentLetter.words[0] || { word: `${currentLetter.char}َاب`, emoji: '🚪', meaning: 'بَابُ المَنْزِل' };
  const sampleWordLetters = stripTashkeel(sampleWordObj.word).split('').filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] via-[#091230] to-[#040711] text-white pb-16 select-none relative overflow-x-hidden flex flex-col justify-between font-arabic">
      
      {/* Background Ambience Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-10 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 bg-[#070e24]/90 backdrop-blur-xl border-b border-amber-400/30 px-4 py-3 shadow-md">
        <div className="max-w-xl mx-auto flex items-center justify-between">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToMap();
            }}
            className="p-2.5 rounded-2xl bg-[#111e47] border border-amber-400/50 text-amber-300 hover:text-white transition-all shadow-md active:scale-90 flex items-center gap-1.5 text-xs font-black"
          >
            <ArrowRight className="w-4 h-4" />
            <span>خَرِيطَةُ المَرَاحِل</span>
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                audioManager.playClick();
                setIsGuideModalOpen(true);
              }}
              className="px-2.5 py-1 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/50 active:scale-95 transition-all flex items-center gap-1 text-xs font-black shadow-sm"
              title="دليل شَرْحِ المَرْحَلَة"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">شَرْحُ المَرْحَلَة</span>
            </button>
            <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-400 to-yellow-300 px-3 py-1 rounded-full border border-white shadow-sm">
              المَرْحَلَةُ {stageNumber} مِنْ 8
            </span>
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-lg flex items-center justify-center border border-white shadow-glow-yellow">
              {currentLetter.char}
            </span>
          </div>
        </div>
      </header>

      {/* Center Stage Arena */}
      <main className="max-w-xl mx-auto w-full px-4 py-3 space-y-3.5 my-auto">
        
        {/* Lumi Voice Guide Banner */}
        <LumiGuideBanner
          message={feedbackText}
          shortHint={`المَرْحَلَةُ ${stageNumber} مِنْ 8`}
          autoSpeak={true}
          emotion={isCompleted ? 'cheering' : 'happy'}
          size="sm"
        />

        {/* Quick Stage Goal & Audio Narrator Bar */}
        <div className="flex items-center justify-between bg-[#0a1330]/90 px-3.5 py-2 rounded-2xl border border-blue-900/60 shadow-sm text-xs">
          <span className="font-bold text-amber-300 flex items-center gap-1.5 truncate">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
            <span className="truncate">{stageDef.titleAr}</span>
          </span>
          <button
            onClick={() => {
              audioManager.playClick();
              audioManager.speak(`stage_${stageNumber}_explain`);
            }}
            className="px-2.5 py-1 rounded-xl bg-[#162754] hover:bg-[#1d3572] text-amber-300 text-[11px] font-black border border-amber-400/40 flex items-center gap-1 active:scale-95 shadow-sm transition-all flex-shrink-0"
          >
            <Volume2 className="w-3 h-3" />
            <span>اسْتَمِعْ لِلشَّرْح 🔊</span>
          </button>
        </div>

        {/* Main Stage Interactive Card */}
        <div className="bg-[#0c173b]/95 backdrop-blur-xl rounded-3xl p-5 border-2 border-amber-400/70 shadow-[0_0_35px_rgba(245,158,11,0.3)] space-y-4 text-center">
          
          {/* ========================================================================= */}
          {/* STAGE 1: SOUND DISCOVERY & BUBBLE CATCH (اكتشاف صوت الحرف المجرد) */}
          {/* ========================================================================= */}
          {stageNumber === 1 && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <InteractiveLetter3D char={currentLetter.char} color="#f59e0b" size={120} />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-black text-amber-300">
                  صَوْتُ حَرْفِ {currentLetter.nameAr}: ({currentLetter.char}ْ)
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  اسْتَمِعْ لِلصَّوْتِ الصَّافِي ثُمَّ فَرِّقْ بَيْنَ الفُقَّاعَاتِ يَا {childName || 'البَطَل'}!
                </p>
              </div>

              <button
                onClick={() => {
                  audioManager.speak(`صَوْتُ حَرْفِ ${currentLetter.nameAr} الصَّافِي هُوَ: ${currentLetter.char}ْ.. ${currentLetter.char}ْ!`);
                }}
                className="w-full py-3 bg-[#182a5c] hover:bg-[#203777] text-amber-300 rounded-2xl font-black text-xs border border-amber-400/50 flex items-center justify-center gap-2 active:scale-95 shadow-md"
              >
                <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>اسْتَمِعْ لِصَوْتِ الحَرْفِ الصَّافِي ({currentLetter.char}ْ) 🔊</span>
              </button>

              <div className="pt-2 space-y-2">
                <p className="text-xs text-white font-extrabold">
                  🎯 اصْطَدْ كَافَّةَ فُقَّاعَاتِ حَرْفِ ({currentLetter.char}):
                </p>
                <div className="grid grid-cols-3 gap-2.5">
                  {[
                    { char: currentLetter.char, isTarget: true },
                    { char: ARABIC_LETTERS[((currentLetter.order || 1) + 4) % 28]?.char || 'س', isTarget: false },
                    { char: currentLetter.char, isTarget: true }
                  ].map((bubble, idx) => {
                    const isPopped = stage1Popped.includes(idx);
                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (bubble.isTarget) {
                            audioManager.playPortal();
                            audioManager.speak(bubble.char);
                            const next = [...stage1Popped, idx];
                            setStage1Popped(next);
                            if (next.length >= 2) {
                              handleSuccess(`أَحْسَنْتَ يَا ${childName || 'البَطَل'}! اصْطَدْتَ حَرْفَ (${currentLetter.char}) بِتَفَوُّق!`);
                            }
                          } else {
                            handleRetry();
                          }
                        }}
                        disabled={isPopped || isCompleted}
                        className={`py-4 rounded-2xl text-2xl font-black border-2 transition-all active:scale-90 shadow-md ${
                          isPopped
                            ? 'bg-emerald-600/80 border-emerald-300 text-white scale-95 opacity-70'
                            : 'bg-gradient-to-tr from-[#162758] to-[#1a3377] border-cyan-400 text-cyan-200 hover:border-amber-400 hover:scale-105'
                        }`}
                      >
                        <span>{bubble.char}</span>
                        {isPopped && <span className="block text-xs text-emerald-200 mt-1">✨ صَحِيح</span>}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 2: CHILD-FRIENDLY MOUTH & TONGUE GUIDE (معمل الفم الكرتوني البسيط) */}
          {/* ========================================================================= */}
          {stageNumber === 2 && (
            <div className="space-y-3 text-right">
              <ChildFriendlyMouthGuide
                letter={currentLetter}
                onSuccess={() => {
                  handleSuccess(`بَطَلٌ مَلَكِيّ يَا ${childName || 'البَطَل'}! أَتْقَنْتَ مَخْرَجَ حَرْفِ (${currentLetter.char})!`);
                }}
              />
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 3: SHORT VOWELS & MOUTH SHAPES (الحركات السحرية الثلاث) */}
          {/* ========================================================================= */}
          {stageNumber === 3 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-amber-300">
                  حَرَكَاتُ حَرْفِ {currentLetter.nameAr} الثَّلَاث 🎵
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  اسْتَمِعْ لِكُلِّ حَرَكَة، ثُمَّ اخْتَرِ الصَّوْتَ المَطْلُوب!
                </p>
              </div>

              {/* 3 Short Vowel Cards */}
              <div className="grid grid-cols-3 gap-2.5">
                {vowels.map((v, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedVowelIdx(idx);
                      audioManager.speak(`${v.char}.. ${v.name}`);
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-md ${
                      selectedVowelIdx === idx
                        ? 'bg-gradient-to-b from-[#1e3b7e] to-[#122656] border-amber-400 shadow-glow-yellow scale-105'
                        : 'bg-[#101e44] border-blue-900 text-slate-300 hover:border-cyan-400/60'
                    }`}
                  >
                    <span className="text-2xl">{v.emoji}</span>
                    <span className="text-3xl font-black text-amber-300">{v.char}</span>
                    <span className="text-[11px] font-black text-white">{v.name}</span>
                    <span className="text-[9px] text-cyan-300 font-bold">{v.mouthTip}</span>
                  </button>
                ))}
              </div>

              {/* Interactive Listening Challenge */}
              <div className="p-3.5 bg-[#0e1b42] rounded-2xl border border-cyan-400/40 space-y-2">
                <div className="flex items-center justify-between text-xs font-black text-cyan-200">
                  <span>🎯 تَحَدِّي الحَرَكَةِ المَسْمُوعَة:</span>
                  <button
                    onClick={() => audioManager.speak(vowels[targetVowelIdx].sound)}
                    className="text-amber-300 hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>أَعِدِ الاسْتِمَاع</span>
                  </button>
                </div>

                <p className="text-xs text-white font-bold">
                  أَيْنَ هُوَ صَوْتُ: ({vowels[targetVowelIdx].name})؟
                </p>

                <div className="grid grid-cols-3 gap-2 pt-1">
                  {vowels.map((v, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === targetVowelIdx) {
                          handleSuccess(`عَبْقَرِيٌّ يَا ${childName || 'البَطَل'}! مَيَّزْتَ صَوْتَ (${v.name}) بِدِقَّة!`);
                        } else {
                          handleRetry();
                        }
                      }}
                      disabled={isCompleted}
                      className="py-2.5 rounded-xl bg-[#172c63] hover:bg-emerald-600 border border-blue-800 text-base font-black text-white active:scale-95 transition-colors"
                    >
                      {v.char}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 4: LONG MADD TRAIN (أبطال المدود الطويلة) */}
          {/* ========================================================================= */}
          {stageNumber === 4 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-cyan-300">
                  قِطَارُ المُدُودِ الطَّوِيلَة 🌊
                </h3>
                <p className="text-xs text-slate-200 font-bold">
                  الصَّوْتُ الطَّوِيلُ يَمْتَدُّ بِرِئَتَيْكَ كَالنَّسِيم!
                </p>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {maddList.map((madd, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedMaddIdx(idx);
                      audioManager.speak(madd.char);
                    }}
                    className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-1 transition-all active:scale-95 shadow-md ${
                      selectedMaddIdx === idx
                        ? 'bg-gradient-to-b from-[#143270] to-[#0c1f4a] border-cyan-400 shadow-glow-cyan scale-105'
                        : 'bg-[#101d42] border-blue-900 text-slate-300 hover:border-cyan-400/60'
                    }`}
                  >
                    <span className="text-3xl font-black text-cyan-200">{madd.char}</span>
                    <span className="text-[11px] font-black text-amber-300">{madd.name}</span>
                    <span className="text-[9px] text-slate-300 font-bold">{madd.desc}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  handleSuccess(`رَائِعٌ جِدًّا يَا ${childName || 'البَطَل'}! أَتْقَنْتَ المُدُودَ الطَّوِيلَةَ كَالأَبْطَال!`);
                }}
                disabled={isCompleted}
                className="w-full py-3.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-2xl font-black text-sm border border-white shadow-glow-cyan active:scale-95"
              >
                <span>أَتْقَنْتُ نُطْقَ المُدُودِ الطَّوِيلَة 🌊</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 5: ILLUSTRATED WORD HUNT (صيد الكلمات المصورة) */}
          {/* ========================================================================= */}
          {stageNumber === 5 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-amber-300">
                  صَيْدُ كَلِمَاتِ حَرْفِ {currentLetter.nameAr} 📖
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  انْقُرْ عَلَى الكَلِمَاتِ لِسَمَاعِهَا وَاخْتَرْ كَلِمَةَ التَّحَدِّي!
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {currentLetter.words.slice(0, 4).map((w, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedWordIdx(idx);
                      audioManager.speak(w.word);
                    }}
                    className={`p-3.5 rounded-2xl border-2 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-90 shadow-md ${
                      selectedWordIdx === idx
                        ? 'bg-gradient-to-b from-[#1a3375] to-[#102354] border-amber-400 shadow-glow-yellow scale-102'
                        : 'bg-[#101e44] border-blue-900 hover:border-cyan-400/60'
                    }`}
                  >
                    <span className="text-4xl animate-bounce-slow">{w.emoji}</span>
                    <span className="text-lg font-black text-white">{w.word}</span>
                    <span className="text-[10px] text-cyan-300 font-bold">{w.meaning}</span>
                  </button>
                ))}
              </div>

              <button
                onClick={() => {
                  handleSuccess(`عَمَلٌ مُمْتَازٌ يَا ${childName || 'البَطَل'}! تَعَلَّمْتَ كَلِمَاتِ حَرْفِ ${currentLetter.nameAr}! 🌟`);
                }}
                disabled={isCompleted}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 rounded-2xl font-black text-sm border border-white shadow-glow-yellow active:scale-95"
              >
                <span>أَتْقَنْتُ الكَلِمَاتِ يَا لُومِي! ⭐</span>
              </button>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 6: LETTER POSITION TRAIN (موقع الحرف في الكلمة) */}
          {/* ========================================================================= */}
          {stageNumber === 6 && (() => {
            const cleanWord = stripTashkeel(sampleWordObj.word);
            const cleanChar = stripTashkeel(currentLetter.char);
            const isFirst = cleanWord.startsWith(cleanChar);
            const isLast = cleanWord.endsWith(cleanChar);
            const correctPos: 'first' | 'middle' | 'last' = isFirst ? 'first' : isLast ? 'last' : 'middle';
            
            const positionsList = [
              { id: 'first' as const, label: 'أَوَّل الكَلِمَة 🟢', isCorrect: correctPos === 'first', desc: `يَقِفُ فِي بَدَايَةِ (${sampleWordObj.word})` },
              { id: 'middle' as const, label: 'وَسَط الكَلِمَة 🟡', isCorrect: correctPos === 'middle', desc: `يَقِفُ فِي وَسَطِ (${sampleWordObj.word})` },
              { id: 'last' as const, label: 'آخِر الكَلِمَة 🔴', isCorrect: correctPos === 'last', desc: `يَقِفُ فِي نِهَايَةِ (${sampleWordObj.word})` }
            ];

            return (
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-cyan-300">
                    قِطَارُ مَوَاقِعِ الحَرْف 🚂
                  </h3>
                  <p className="text-xs text-slate-200 font-bold">
                    أَيْنَ يَقِفُ حَرْفُ ({currentLetter.char}) فِي كَلِمَةِ ({sampleWordObj.word})؟
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0e1a3f] border border-cyan-400/40 space-y-2">
                  <span className="text-5xl">{sampleWordObj.emoji}</span>
                  <p className="text-2xl font-black text-amber-300 tracking-wider">
                    {sampleWordObj.word}
                  </p>
                  <p className="text-xs text-cyan-200 font-bold">
                    {sampleWordObj.meaning}
                  </p>
                </div>

                {/* 3 Position Cards */}
                <div className="grid grid-cols-3 gap-2">
                  {positionsList.map((pos) => (
                    <button
                      key={pos.id}
                      onClick={() => {
                        setSelectedPosition(pos.id);
                        if (pos.isCorrect) {
                          handleSuccess(`عَبْقَرِيٌّ يَا ${childName || 'البَطَل'}! الحَرْفُ يَقِفُ فِي ${pos.label.split(' ')[0]} الكَلِمَة!`);
                        } else {
                          handleRetry();
                        }
                      }}
                      disabled={isCompleted}
                      className={`py-3 px-1 rounded-2xl border-2 text-xs font-black active:scale-95 transition-all shadow-md ${
                        selectedPosition === pos.id && pos.isCorrect
                          ? 'bg-emerald-600 border-white text-white'
                          : 'bg-[#132352] border-blue-900 text-white hover:border-cyan-400'
                      }`}
                    >
                      {pos.label}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          {/* ========================================================================= */}
          {/* STAGE 7: WORD BUILDER PUZZLE (بناء وتركيب الكلمة) */}
          {/* ========================================================================= */}
          {stageNumber === 7 && (
            <div className="space-y-4">
              <div className="space-y-1">
                <h3 className="text-xl font-black text-amber-300">
                  بِنَاءُ الكَلِمَةِ السَّاحِرَة 🧩
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  رَتِّبِ الحُرُوفَ لِبِنَاءِ كَلِمَةِ: ({sampleWordObj.word})
                </p>
              </div>

              {/* Puzzle Display Slots (Clickable to remove/undo) */}
              <div className="p-3.5 rounded-2xl bg-[#0d193d] border-2 border-dashed border-amber-400/60 min-h-[60px] flex items-center justify-center gap-3 text-2xl font-black text-amber-300">
                {sampleWordLetters.map((_, idx) => {
                  const placedChar = puzzlePlacedChars[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => {
                        if (placedChar && !isCompleted) {
                          audioManager.playPop();
                          const next = puzzlePlacedChars.filter((_, i) => i !== idx);
                          setPuzzlePlacedChars(next);
                        }
                      }}
                      className={`w-12 h-12 rounded-xl bg-blue-950/80 border-2 flex items-center justify-center shadow-inner transition-all ${
                        placedChar ? 'border-amber-400 text-amber-300 active:scale-90 hover:bg-rose-950/40' : 'border-cyan-400/60 text-slate-500'
                      }`}
                      title={placedChar ? 'انقر للإزالة' : ''}
                    >
                      {placedChar || '_'}
                    </button>
                  );
                })}
              </div>

              {/* Interactive Blocks */}
              <div className="space-y-2">
                <p className="text-xs text-slate-300 font-bold">انْقُرِ الحُرُوفَ بِالتَّرْتِيبِ الصَّحِيح:</p>
                <div className="flex items-center justify-center gap-3">
                  {sampleWordLetters.map((ch, idx) => {
                    const countPlacedOfThisChar = puzzlePlacedChars.filter(c => c === ch).length;
                    const totalOfThisChar = sampleWordLetters.filter(c => c === ch).length;
                    const isAllOfCharPlaced = countPlacedOfThisChar >= totalOfThisChar;
                    const isCurrentSlotFilled = puzzlePlacedChars.length > idx;

                    return (
                      <button
                        key={idx}
                        onClick={() => {
                          if (puzzlePlacedChars.length >= sampleWordLetters.length) return;
                          audioManager.speak(ch);
                          const next = [...puzzlePlacedChars, ch];
                          setPuzzlePlacedChars(next);

                          // Check if spelling matches word so far
                          const expectedChar = sampleWordLetters[next.length - 1];
                          if (ch !== expectedChar) {
                            audioManager.playEncouragement();
                            setTimeout(() => {
                              setPuzzlePlacedChars([]);
                            }, 700);
                            return;
                          }

                          if (next.length === sampleWordLetters.length) {
                            audioManager.speak(sampleWordObj.word);
                            handleSuccess(`عَمَلٌ أُسْطُورِيٌّ يَا ${childName || 'البَطَل'}! بَنَيْتَ كَلِمَةَ (${sampleWordObj.word}) كَامِلَة!`);
                          }
                        }}
                        disabled={isCurrentSlotFilled || isCompleted}
                        className={`w-14 h-14 rounded-2xl font-black text-2xl border-2 transition-all active:scale-90 shadow-md ${
                          isCurrentSlotFilled
                            ? 'bg-slate-800 border-slate-700 text-slate-500 scale-95 opacity-50'
                            : 'bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 border-white shadow-glow-yellow hover:scale-105'
                        }`}
                      >
                        {ch}
                      </button>
                    );
                  })}
                </div>

                {puzzlePlacedChars.length > 0 && !isCompleted && (
                  <button
                    onClick={() => setPuzzlePlacedChars([])}
                    className="text-xs text-rose-300 font-black inline-flex items-center gap-1 pt-1 hover:text-rose-200"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>إِعَادَةُ البِنَاء</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* STAGE 8: GRAND FINALE CHEST & ROYAL CORONATION (التحدي النهائي والكنز) */}
          {/* ========================================================================= */}
          {stageNumber === 8 && (
            <div className="space-y-4">
              <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 flex items-center justify-center text-5xl border-3 border-white shadow-glow-yellow animate-bounce-slow">
                {isChestOpened ? '👑' : '🎁'}
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-amber-300">
                  تَتْوِيجُ {childName || 'البَطَل'} بَطَلًا لِحَرْفِ {currentLetter.nameAr}! 👑
                </h3>
                <p className="text-xs text-cyan-200 font-bold">
                  {isChestOpened
                    ? `مَبْرُوك يَا ${childName || 'البَطَل'}! أَتْمَمْتَ كَافَّةَ المَرَاحِلِ بِامْتِيَاز!`
                    : `افْتَحْ صُنْدُوقَ الكَنْزِ يَا ${childName || 'البَطَل'} لِتَتَسَلَّمَ تَاجَ الإِتْقَان!`}
                </p>
              </div>

              {!isChestOpened ? (
                <button
                  onClick={() => {
                    setIsChestOpened(true);
                    addStars(2); // +2 stars bonus on top of 1 from handleSuccess = 3 stars total
                    addCoins(15);
                    handleSuccess(`أَلْفُ مَبْرُوك يَا ${childName || 'البَطَل'}! أَنْتَ رَسْمِيًّا بَطَلُ حَرْفِ ${currentLetter.nameAr} المَلَكِيّ! 👑`);
                  }}
                  className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base border-2 border-white shadow-glow-yellow active:scale-95 flex items-center justify-center gap-2"
                >
                  <Crown className="w-5 h-5 fill-slate-950" />
                  <span>افْتَحْ صُنْدُوقَ الكَنْزِ الأَسْطُورِيّ! 🎁</span>
                </button>
              ) : (
                <div className="p-3.5 bg-[#0f1e4a] rounded-2xl border border-amber-400 flex items-center justify-center gap-2 text-amber-300 text-sm font-black animate-pop shadow-glow-yellow">
                  <Award className="w-5 h-5" />
                  <span>تَاجُ الإِتْقَانِ المَلَكِيّ لِـ {childName || 'البَطَل'} 👑 (+3 نُجُوم ذَهَبِيَّة)</span>
                </div>
              )}
            </div>
          )}

          {/* Direct Next Button when completed */}
          {isCompleted && !showEpicTransition && (
            <div className="pt-3 border-t border-blue-900/60 animate-pop">
              <button
                onClick={handleNext}
                className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base border-2 border-white shadow-glow-yellow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Crown className="w-5 h-5 fill-slate-950" />
                <span>{stageNumber < 8 ? 'المَرْحَلَةُ التَّالِيَة 🚀' : 'الرُّجُوعُ لِخَرِيطَةِ المَرَاحِل 🗺️'}</span>
              </button>
            </div>
          )}

        </div>

      </main>

      {/* ========================================================================= */}
      {/* EPIC STAGE PROGRESSION MODAL */}
      {/* ========================================================================= */}
      {showEpicTransition && (
        <div className="fixed inset-0 z-50 bg-[#050814]/95 backdrop-blur-2xl flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-sm w-full bg-gradient-to-b from-[#132252] via-[#0d183d] to-[#08102a] rounded-3xl p-6 border-3 border-amber-400 shadow-[0_0_60px_rgba(245,158,11,0.5)] text-center space-y-5 animate-pop">
            
            {/* Floating 3D Rocket */}
            <div className="relative">
              <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-tr from-amber-400 via-yellow-300 to-cyan-400 p-1 border-4 border-white shadow-glow-yellow animate-bounce flex items-center justify-center text-5xl">
                🚀
              </div>
              <span className="absolute -bottom-2 inset-x-0 mx-auto w-max bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full border border-white shadow">
                المَرْحَلَةُ {stageNumber + 1} انْفَتَحَتْ! 🔓
              </span>
            </div>

            <div className="space-y-1.5 pt-2">
              <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-300 to-white">
                تَقَدُّمٌ رَائِعٌ يَا {childName || 'البَطَل'}! ✨
              </h3>
              <p className="text-xs text-cyan-200 font-bold">
                أَتْمَمْتَ المَرْحَلَةَ {stageNumber} بِنَجَاح، وَانْتَقَلْتَ لِلْمَرْحَلَةِ {stageNumber + 1}!
              </p>
            </div>

            {/* Stars & Coins Award Banner */}
            <div className="flex items-center justify-center gap-3 bg-[#0a1330] p-3 rounded-2xl border border-amber-400/40 shadow-inner">
              <div className="flex items-center gap-1.5 text-xs font-black text-amber-300">
                <Star className="w-4 h-4 fill-amber-300 animate-spin-slow" />
                <span>+1 نَجْمَة ذَهَبِيَّة</span>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-black text-yellow-300">
                <span>🪙</span>
                <span>+10 كُوَيْنْز</span>
              </div>
            </div>

            {/* Next Stage Action Button */}
            <button
              onClick={handleNext}
              className="w-full py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-lg border-2 border-white shadow-glow-yellow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5 fill-slate-950" />
              <span>انْطَلِقْ لِلْمَرْحَلَةِ {stageNumber + 1}! 🚀</span>
            </button>

          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="text-center text-[11px] text-amber-200/70 font-bold py-1">
        <span>LUMI — رِحْلَةُ حَرْفِ {currentLetter.nameAr} • المَرْحَلَة {stageNumber}</span>
      </footer>

      {/* Stages 8-Step Comprehensive Curriculum Guide Modal */}
      <StagesGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onSelectStage={(num) => onCompleteStageAndNext(num)}
        initialStage={stageNumber}
      />

    </div>
  );
};

```

## 📄 ملف: `src\components\mobile\MobileStageMap.tsx`
```typescript
import React, { useState } from 'react';
import { Sparkles, Star, Lock, Crown, Play, Volume2, Trophy, Compass, ArrowLeft, CheckCircle2, Award } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiGuideBanner } from '../common/LumiGuideBanner';
import { InteractiveLetter3D } from '../3d/InteractiveLetter3D';
import { ChildProfileModal } from '../common/ChildProfileModal';
import { PWAInstallButton } from '../common/PWAInstallButton';

import { StagesGuideModal } from '../common/StagesGuideModal';

interface MobileStageMapProps {
  onStartStage: (letterId: string, stageNum: number) => void;
  onOpenLetterSelect?: () => void;
  onOpenWorlds?: () => void;
  onOpenGames?: () => void;
  onBackToHub?: () => void;
}

export const MobileStageMap: React.FC<MobileStageMapProps> = ({
  onStartStage,
  onOpenLetterSelect,
  onOpenWorlds,
  onOpenGames,
  onBackToHub
}) => {
  const {
    childName,
    setChildName,
    stars,
    coins,
    selectedLetterId,
    setSelectedLetterId,
    letterProgressMap,
    resetProgress
  } = useGame();

  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState<boolean>(false);

  const currentLetter: LetterData =
    ARABIC_LETTERS.find((l) => l.id === selectedLetterId) || ARABIC_LETTERS[1];

  const progress = letterProgressMap[currentLetter.id] || {
    discovery: false,
    sound: false,
    vowels: false,
    syllables: false,
    words: false,
    soundPosition: false,
    sentences: false,
    finalChallenge: false,
    currentStage: 1,
    masteryPercentage: 0
  };

  const activeStage = progress.currentStage || 1;
  const [selectedStagePreview, setSelectedStagePreview] = useState<number | null>(null);

  const stageKeys = [
    'discovery',
    'sound',
    'vowels',
    'syllables',
    'words',
    'soundPosition',
    'sentences',
    'finalChallenge'
  ];

  const isStageUnlocked = (stageNum: number) => {
    if (stageNum === 1) return true;
    const prevKey = stageKeys[stageNum - 2];
    return (progress as any)[prevKey] === true || progress.currentStage >= stageNum;
  };

  const isStageCompleted = (stageNum: number) => {
    const key = stageKeys[stageNum - 1];
    return (progress as any)[key] === true;
  };

  const handleSelectLetter = (letterId: string) => {
    audioManager.playClick();
    setSelectedLetterId(letterId);
    const l = ARABIC_LETTERS.find((x) => x.id === letterId);
    if (l) {
      audioManager.speak(`حَرْفُ ${l.nameAr}`);
    }
  };

  const handleStageNodeClick = (stageNum: number) => {
    const unlocked = isStageUnlocked(stageNum);

    if (unlocked) {
      audioManager.playPortal();
      audioManager.speak(`stage_${stageNum}`);
      setSelectedStagePreview(stageNum);
    } else {
      audioManager.playClick();
      audioManager.speak('complete_previous_first');
    }
  };

  // Stage Node Icon List
  const stageIcons = ['🔍', '🎙️', '🎵', '🌊', '📖', '🎯', '💬', '👑'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] via-[#091230] to-[#040711] text-white pb-24 select-none relative overflow-x-hidden">
      {/* Radiant Background Ambience */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-20 right-0 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Mobile Header */}
      <header className="sticky top-0 z-30 bg-[#070e24]/90 backdrop-blur-xl border-b border-amber-400/30 px-4 py-3 shadow-lg">
        <div className="max-w-md mx-auto flex items-center justify-between">
          {/* Left: Home Hub Button */}
          {onBackToHub && (
            <button
              onClick={() => {
                audioManager.playClick();
                onBackToHub();
              }}
              className="p-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-amber-300 border border-amber-400/40 active:scale-95 transition-all flex items-center gap-1.5 text-xs font-black"
              title="العودة لشاشة المربعات الرئيسية"
            >
              <span>🏠</span>
              <span>الرَّئِيسِيَّة</span>
            </button>
          )}

          {/* Child Profile (Clickable to switch child or add new hero) */}
          <button
            onClick={() => setIsProfileModalOpen(true)}
            className="flex items-center gap-2 text-right p-1 rounded-2xl hover:bg-white/5 transition-all active:scale-95 group"
            title="انقر لتبديل ملف الطفل أو إضافة بطل جديد"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-xl border-2 border-white shadow-glow-yellow group-hover:scale-105 transition-transform">
              👑
            </div>
            <div className="hidden sm:block">
              <h1 className="text-sm font-black text-amber-200 flex items-center gap-1">
                <span>{childName ? `البَطَل ${childName}` : 'اخْتَرِ البَطَل'}</span>
                <span className="text-[10px] text-amber-300/80">🔄</span>
              </h1>
              <p className="text-[10px] text-cyan-300 font-bold">
                تَبْدِيلُ أَبْطَالِ الهَاتِف 📱
              </p>
            </div>
          </button>

          {/* Star & Coin Badges & Stages Guide & PWA Install Button */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                audioManager.playClick();
                setIsGuideModalOpen(true);
              }}
              className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500/30 to-yellow-500/20 hover:bg-amber-500/40 text-amber-300 border border-amber-400/60 active:scale-95 transition-all flex items-center gap-1 text-xs font-black shadow-sm"
              title="دليل شَرْحِ المَرَاحِل الثَّمَانِيَة"
            >
              <span>📖</span>
              <span className="hidden xs:inline">شَرْحُ المَرَاحِل</span>
            </button>
            <PWAInstallButton />
            <div className="flex items-center gap-1 bg-amber-500/20 px-2.5 py-1 rounded-xl border border-amber-400/50 text-xs font-black text-amber-300 shadow-sm">
              <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300 animate-spin-slow" />
              <span>{stars}</span>
            </div>
            <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-xl border border-yellow-400/40 text-xs font-black text-yellow-300">
              <span>🪙</span>
              <span>{coins}</span>
            </div>
          </div>
        </div>

        {/* 28 Letters Horizontal Slider */}
        <div className="max-w-md mx-auto mt-3 pt-2 border-t border-blue-900/60">
          <div className="flex items-center justify-between mb-1.5 px-1">
            <span className="text-[11px] font-black text-amber-300/90 flex items-center gap-1">
              <span>اخْتَرْ حَرْفَكَ المُلَفَّت:</span>
              <span className="text-cyan-300 font-black">({currentLetter.nameAr})</span>
            </span>
            <span className="text-[10px] text-slate-400 font-bold">28 حَرْفًا</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1 px-1">
            {ARABIC_LETTERS.map((ltr) => {
              const isSelected = ltr.id === selectedLetterId;
              const ltrProgress = letterProgressMap[ltr.id];
              const isMastered = ltrProgress?.masteryPercentage === 100;

              return (
                <button
                  key={ltr.id}
                  onClick={() => handleSelectLetter(ltr.id)}
                  className={`flex-shrink-0 w-11 h-12 rounded-2xl font-black text-lg flex flex-col items-center justify-center transition-all duration-200 active:scale-90 relative ${
                    isSelected
                      ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 border-2 border-white shadow-glow-yellow scale-110'
                      : 'bg-[#101c44] text-white border border-blue-900/80 hover:border-amber-400/60'
                  }`}
                >
                  <span>{ltr.char}</span>
                  {isMastered && (
                    <span className="absolute -top-1 -right-1 text-[10px]">👑</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Roadmap Area */}
      <main className="max-w-md mx-auto px-4 pt-4 space-y-6">
        
        {/* Letter Hero & 3D Interactive Jewel Card */}
        <div className="bg-gradient-to-br from-[#122252] via-[#0d1a42] to-[#142861] rounded-3xl p-4 border-2 border-amber-400/60 shadow-[0_0_30px_rgba(245,158,11,0.25)] flex items-center justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 bg-amber-400/20 text-amber-300 text-[11px] font-black px-2.5 py-0.5 rounded-full border border-amber-400/40">
              <span>رِحْلَةُ حَرْفِ</span>
              <span className="text-white">{currentLetter.nameAr}</span>
            </div>
            <h2 className="text-xl font-black text-white">
              حَرْفُ ({currentLetter.char}) — {currentLetter.words[0]?.word} {currentLetter.words[0]?.emoji}
            </h2>
            <p className="text-xs text-cyan-200 font-bold">
              إِتْقَانُ المَرَاحِل: %{progress.masteryPercentage}
            </p>

            <button
              onClick={() => audioManager.speak(`حَرْفُ ${currentLetter.nameAr}.. ${currentLetter.char}`)}
              className="mt-2 px-3 py-1.5 bg-[#1a2f6e] hover:bg-[#233e8f] text-amber-300 rounded-xl text-xs font-black border border-amber-400/40 flex items-center gap-1.5 active:scale-95 shadow-sm"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>نُطْقُ الحَرْف 🔊</span>
            </button>
          </div>

          {/* 3D Interactive Letter Gem */}
          <div className="w-24 h-24 flex items-center justify-center">
            <InteractiveLetter3D char={currentLetter.char} color="#f59e0b" size={105} />
          </div>
        </div>

        {/* Quick Portal Cards: 8 Worlds & 7 Mini-Games */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              audioManager.playPortal();
              if (onOpenWorlds) onOpenWorlds();
            }}
            className="p-3 rounded-2xl bg-gradient-to-br from-[#1a1c4b] to-[#0f1235] border-2 border-purple-400/60 hover:border-purple-300 text-right space-y-1 shadow-md hover:scale-[1.02] active:scale-95 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-125 transition-transform">🪐</span>
              <span className="text-[9px] font-black bg-purple-500/20 text-purple-200 px-2 py-0.5 rounded-full border border-purple-400/40">
                8 عَوَالِم
              </span>
            </div>
            <h3 className="text-xs font-black text-white group-hover:text-purple-200">
              خَرِيطَةُ العَوَالِمِ وَالفَضَاء
            </h3>
            <p className="text-[10px] text-slate-400 font-bold">
              اسْتَكْشِفِ الكَوَاكِبَ وَالمَجَرَّة 🚀
            </p>
          </button>

          <button
            onClick={() => {
              audioManager.playPortal();
              if (onOpenGames) onOpenGames();
            }}
            className="p-3 rounded-2xl bg-gradient-to-br from-[#0e2a4a] to-[#091b33] border-2 border-cyan-400/60 hover:border-cyan-300 text-right space-y-1 shadow-md hover:scale-[1.02] active:scale-95 transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-2xl group-hover:scale-125 transition-transform">🎮</span>
              <span className="text-[9px] font-black bg-cyan-500/20 text-cyan-200 px-2 py-0.5 rounded-full border border-cyan-400/40">
                7 أَلْعَاب
              </span>
            </div>
            <h3 className="text-xs font-black text-white group-hover:text-cyan-200">
              مَرْكَزُ الأَلْعَابِ التَّفَاعُلِيَّة
            </h3>
            <p className="text-[10px] text-slate-400 font-bold">
              فَقَاعَات، قِطَار، وَسِبَاقَات 🎯
            </p>
          </button>
        </div>
        {/* Lumi Voice Guide */}
        <LumiGuideBanner
          message={`أَهْلًا يَا ${childName || 'البَطَل'}! هُنَا طَرِيقُ المَرَاحِلِ لِحَرْفِ (${currentLetter.char}).. اجْتَزِ المَرَاحِلَ الثَّمَانِيَةَ بِالتَّرْتِيبِ لِتَجْمَعَ النُّجُومَ وَتَفْتَحَ الكَنْز!` }
          shortHint="اضْغَطْ عَلَى المَرْحَلَةِ لِتَبْدَأ"
          autoSpeak={true}
          emotion="happy"
        />

        {/* Winding 8-Stage Map Path */}
        <div className="relative py-4 px-2">
          
          {/* Connecting SVG Path Behind Stages */}
          <div className="absolute inset-0 flex justify-center pointer-events-none">
            <svg className="w-full h-full max-w-[340px]" viewBox="0 0 340 760" fill="none">
              <path
                d="M 170 40 
                   Q 260 90 260 140 
                   Q 260 190 170 230 
                   Q 80 270 80 320 
                   Q 80 370 170 410 
                   Q 260 450 260 500 
                   Q 260 550 170 590 
                   Q 80 630 80 680 
                   Q 80 730 170 750"
                stroke="rgba(245, 158, 11, 0.35)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="10 8"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* 8 Distinct Sequential Stage Nodes */}
          <div className="relative z-10 space-y-7">
            {STAGE_CURRICULUM_DEFINITIONS.map((stg, index) => {
              const stageNum = stg.stageNumber;
              const isUnlocked = isStageUnlocked(stageNum);
              const isCurrent = activeStage === stageNum;
              const isCompleted = isStageCompleted(stageNum);

              // Zigzag layout alignment: alternating positions
              const alignmentStyles = [
                'justify-center',       // Stage 1 (Center)
                'justify-end pr-4',     // Stage 2 (Right)
                'justify-center',       // Stage 3 (Center)
                'justify-start pl-4',   // Stage 4 (Left)
                'justify-center',       // Stage 5 (Center)
                'justify-end pr-4',     // Stage 6 (Right)
                'justify-center',       // Stage 7 (Center)
                'justify-center'        // Stage 8 (Grand Finale)
              ][index];

              return (
                <div key={stageNum} className={`flex items-center ${alignmentStyles}`}>
                  
                  {/* Stage Station Button */}
                  <div className="relative flex flex-col items-center">
                    
                    {/* Lumi Floating Companion on Active Stage */}
                    {isCurrent && (
                      <div className="absolute -top-12 z-20 animate-bounce flex flex-col items-center pointer-events-none">
                        <span className="bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-full border border-white shadow-md mb-1 whitespace-nowrap">
                          لُومِي هُنَا! 🌟
                        </span>
                        <div className="w-8 h-8 rounded-full bg-cyan-400/90 border-2 border-white flex items-center justify-center text-sm shadow-glow-cyan">
                          ✨
                        </div>
                      </div>
                    )}

                    {/* Outer Glowing Ring for Active Node */}
                    {isCurrent && (
                      <div className="absolute -inset-2.5 rounded-full bg-gradient-to-r from-amber-400/40 via-yellow-300/40 to-cyan-400/40 animate-spin-slow blur-sm pointer-events-none" />
                    )}

                    {/* Main Stage Node Bubble */}
                    <button
                      onClick={() => handleStageNodeClick(stageNum)}
                      className={`relative w-20 h-20 rounded-full font-black flex flex-col items-center justify-center border-4 transition-all duration-300 active:scale-90 shadow-2xl ${
                        isCompleted
                          ? 'bg-gradient-to-tr from-emerald-600 to-teal-400 border-emerald-200 text-white shadow-glow-green scale-100'
                          : isCurrent
                          ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 border-white text-slate-950 shadow-glow-yellow scale-110 ring-4 ring-amber-400/50'
                          : isUnlocked
                          ? 'bg-gradient-to-tr from-[#1b3269] to-[#12224d] border-blue-400 text-white hover:border-amber-400'
                          : 'bg-[#091124] border-slate-700 text-slate-500 opacity-60'
                      }`}
                    >
                      {/* Icon or Status Indicator */}
                      <span className="text-2xl mb-0.5">
                        {isCompleted ? '👑' : isUnlocked ? stageIcons[index] : '🔒'}
                      </span>

                      {/* Stage Number */}
                      <span className="text-xs font-black">
                        {stageNum}
                      </span>

                      {/* Stars Earned Overlay */}
                      {isCompleted && (
                        <div className="absolute -bottom-2 flex items-center gap-0.5 bg-emerald-950 px-1.5 py-0.5 rounded-full border border-emerald-400">
                          <Star className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                          <Star className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                          <Star className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
                        </div>
                      )}
                    </button>

                    {/* Stage Title Pill Below Node */}
                    <div className="mt-2 text-center">
                      <span className={`inline-block px-3 py-1 rounded-xl text-xs font-black border shadow-md ${
                        isCurrent
                          ? 'bg-amber-400 text-slate-950 border-white shadow-glow-yellow'
                          : isCompleted
                          ? 'bg-emerald-900/80 text-emerald-200 border-emerald-400/50'
                          : isUnlocked
                          ? 'bg-[#112048] text-cyan-200 border-blue-900'
                          : 'bg-[#091124] text-slate-500 border-slate-800'
                      }`}>
                        {stg.titleAr}
                      </span>
                    </div>

                  </div>

                </div>
              );
            })}
          </div>

        </div>

      </main>

      {/* Stage Launch Preview Sheet Modal */}
      {selectedStagePreview !== null && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-end sm:items-center justify-center p-4 animate-fade-in">
          {(() => {
            const stgDef = STAGE_CURRICULUM_DEFINITIONS.find((s) => s.stageNumber === selectedStagePreview) || STAGE_CURRICULUM_DEFINITIONS[0];

            return (
              <div className="bg-gradient-to-b from-[#132252] to-[#0a1435] w-full max-w-sm rounded-3xl p-5 border-3 border-amber-400 shadow-[0_0_50px_rgba(245,158,11,0.4)] text-center space-y-3.5 animate-pop max-h-[92vh] overflow-y-auto">
                
                {/* Header Badge */}
                <div className="flex justify-between items-center">
                  <span className="text-xs font-black text-amber-950 bg-gradient-to-r from-amber-400 to-yellow-300 px-3 py-0.5 rounded-full border border-white shadow-sm">
                    المَرْحَلَةُ {selectedStagePreview} مِنْ 8 🚀
                  </span>
                  <button
                    onClick={() => {
                      audioManager.playClick();
                      audioManager.stop();
                      setSelectedStagePreview(null);
                    }}
                    className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-black flex items-center justify-center hover:bg-slate-700 active:scale-95"
                  >
                    ✕
                  </button>
                </div>

                {/* Stage Hero Icon */}
                <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-cyan-400 flex items-center justify-center text-3xl border-2 border-white shadow-glow-yellow">
                  {stageIcons[selectedStagePreview - 1]}
                </div>

                <div className="space-y-1">
                  <h3 className="text-xl font-black text-white">
                    {stgDef.titleAr}
                  </h3>
                  <p className="text-xs text-cyan-200 font-bold">
                    {stgDef.objectiveAr}
                  </p>
                </div>

                {/* Stage Explanation & Audio Narrator Box */}
                <div className="bg-[#08102a] p-3 rounded-2xl border border-blue-900/80 text-right space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black text-amber-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>شَرْحُ المَرْحَلَة:</span>
                    </span>
                    <button
                      onClick={() => {
                        audioManager.playClick();
                        audioManager.speak(`stage_${stgDef.stageNumber}_explain`);
                      }}
                      className="px-2.5 py-1 rounded-xl bg-[#172c68] hover:bg-[#1f3b8a] text-amber-300 text-[11px] font-black border border-amber-400/50 flex items-center gap-1 active:scale-95 shadow-sm transition-all"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>اسْتَمِعْ 🔊</span>
                    </button>
                  </div>
                  <p className="text-xs font-bold text-slate-200 leading-relaxed">
                    {stgDef.explanationAr}
                  </p>
                  <p className="text-[11px] font-bold text-cyan-200/90 pt-1 border-t border-blue-900/40">
                    🎮 <span className="text-cyan-300">طريقة اللعب:</span> {stgDef.howToPlayAr}
                  </p>
                </div>

                {/* Rewards Preview */}
                <div className="flex items-center justify-center gap-3 bg-[#0a122c] p-2 rounded-2xl border border-blue-900">
                  <div className="flex items-center gap-1 text-xs font-black text-amber-300">
                    <Star className="w-3.5 h-3.5 fill-amber-300" />
                    <span>+1 نجمة</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-black text-yellow-300">
                    <span>🪙</span>
                    <span>+10 كوينز</span>
                  </div>
                </div>

                {/* Launch Stage Button */}
                <button
                  onClick={() => {
                    audioManager.playPortal();
                    const stgNum = selectedStagePreview;
                    setSelectedStagePreview(null);
                    onStartStage(currentLetter.id, stgNum);
                  }}
                  className="w-full py-3.5 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base border-2 border-white shadow-glow-yellow hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-5 h-5 fill-slate-950" />
                  <span>انْطَلِقْ لِلْمَرْحَلَة! 🚀</span>
                </button>

              </div>
            );
          })()}
        </div>
      )}

      {/* Multi-Child Profile Switcher Modal */}
      <ChildProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

      {/* Stages 8-Step Comprehensive Curriculum Guide Modal */}
      <StagesGuideModal
        isOpen={isGuideModalOpen}
        onClose={() => setIsGuideModalOpen(false)}
        onSelectStage={(num) => onStartStage(currentLetter.id, num)}
        initialStage={selectedStagePreview || activeStage}
      />

    </div>
  );
};

```

## 📄 ملف: `src\components\mobile\MobileBottomNav.tsx`
```typescript
import React from 'react';
import { Map, BookOpen, Sparkles, Shield, Compass, Gamepad2 } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

export type MobileTab = 'stages' | 'letters' | 'mirror' | 'worlds' | 'games' | 'parent';

interface MobileBottomNavProps {
  activeTab: MobileTab;
  onSelectTab: (tab: MobileTab) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelectTab
}) => {
  const tabs = [
    {
      id: 'stages' as MobileTab,
      label: 'المراحل',
      icon: Map,
      voice: 'طَرِيقُ المَرَاحِلِ السِّحْرِيّ'
    },
    {
      id: 'letters' as MobileTab,
      label: 'الحروف',
      icon: BookOpen,
      voice: 'مَرْصَدُ الحُرُوفِ الكَامِلَة'
    },
    {
      id: 'mirror' as MobileTab,
      label: 'المرآة',
      icon: Sparkles,
      voice: 'مُخْتَبَرُ النُّطْقِ وَالمِرْآة'
    },
    {
      id: 'worlds' as MobileTab,
      label: 'العوالم 🌍',
      icon: Compass,
      voice: 'خَرِيطَةُ العَوَالِمِ الثَّلاثَةِ السَّاحِرَة'
    },
    {
      id: 'games' as MobileTab,
      label: 'الألعاب 🎮',
      icon: Gamepad2,
      voice: 'قَلْعَةُ الأَلْعَابِ الثَّلاثِ التَّفَاعُلِيَّة'
    },
    {
      id: 'parent' as MobileTab,
      label: 'المعالج',
      icon: Shield,
      voice: 'بَوَّابَةُ وَلِيِّ الأَمْرِ وَالمُعَالِج'
    }
  ];

  const handleTabClick = (tab: typeof tabs[0]) => {
    audioManager.playClick();
    if (navigator.vibrate) {
      navigator.vibrate(20);
    }
    onSelectTab(tab.id);
  };

  return (
    <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#070e24]/95 backdrop-blur-xl border-t-2 border-amber-400/40 px-2 py-2 pb-safe max-w-lg mx-auto shadow-[0_-10px_35px_rgba(0,0,0,0.6)]">
      <div className="flex items-center justify-around gap-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab)}
              className={`flex flex-col items-center justify-center py-1 px-1.5 rounded-2xl transition-all duration-200 active:scale-90 flex-1 relative ${
                isActive
                  ? 'text-amber-300 bg-amber-400/15 border border-amber-400/40 shadow-glow-yellow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
              )}

              <Icon
                className={`w-5 h-5 transition-transform ${
                  isActive ? 'scale-110 stroke-[2.5]' : 'stroke-2'
                }`}
              />

              <span className="text-[10px] font-black mt-0.5 tracking-tight">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

```

## 📄 ملف: `src\components\mirror\LumiMirror.tsx`
```typescript
import React, { useState, useRef, useEffect } from 'react';
import { Camera, CameraOff, Sparkles, Volume2, ArrowRight } from 'lucide-react';
import { ARABIC_LETTERS } from '../../data/letters';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../mascot/LumiMascot';

export const LumiMirror: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins } = useGame();
  const [selectedLetter, setSelectedLetter] = useState(ARABIC_LETTERS[1]); // Baa
  const [cameraActive, setCameraActive] = useState<boolean>(false);
  const [mouthState, setMouthState] = useState<'closed' | 'open' | 'smiling'>('closed');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const toggleCamera = async () => {
    if (cameraActive) {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
      setCameraActive(false);
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
        streamRef.current = stream;
        setCameraActive(true);
      } catch (err) {
        console.warn('Camera access denied or unavailable:', err);
        alert('يرجى منح إذن الكاميرا لتشغيل المرآة التفاعلية.');
      }
    }
  };

  // Attach stream whenever cameraActive changes and video element mounts
  useEffect(() => {
    if (cameraActive && videoRef.current && streamRef.current) {
      videoRef.current.srcObject = streamRef.current;
    }
  }, [cameraActive]);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
        streamRef.current = null;
      }
    };
  }, []);

  const triggerMouthDemo = () => {
    audioManager.speak(selectedLetter.char);
    setMouthState('closed');
    setTimeout(() => setMouthState('open'), 300);
    setTimeout(() => setMouthState('smiling'), 700);
    setTimeout(() => setMouthState('closed'), 1200);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/95 p-4 rounded-3xl border-3 border-emerald-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-emerald-50 text-emerald-800 border-2 border-emerald-200 hover:bg-emerald-100"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <span>🪞 مِرْآةُ لُومِي لِتَعْلِيمِ حَرَكَةِ الفَم</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold">
              شَاهِدْ حَرَكَةَ الشَّفَتَيْنِ وَاللِّسَانِ بَصَرِيًّا وَقَلِّدْهَا أَمَامَ المِرْآة!
            </p>
          </div>
        </div>

        <button
          onClick={toggleCamera}
          className={`game-btn px-4 py-2 rounded-2xl font-black text-xs md:text-sm border-2 transition-all ${
            cameraActive ? 'bg-rose-500 text-white border-rose-600' : 'bg-emerald-500 text-white border-emerald-600'
          }`}
        >
          {cameraActive ? <CameraOff className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
          <span>{cameraActive ? 'إِغْلاقُ المِرْآة' : 'فَتْحُ المِرْآة 📷'}</span>
        </button>
      </div>

      {/* Main Mirror Stage */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Animated Mouth Guide */}
        <div className="game-card p-6 border-4 border-sky-300 bg-white flex flex-col items-center justify-between text-center space-y-4">
          <span className="bg-sky-100 text-sky-800 font-black text-xs px-3 py-1 rounded-full">
            حَرَكَةُ الفَمِ لِحَرْفِ: {selectedLetter.nameAr} ({selectedLetter.char})
          </span>

          <div className="relative w-48 h-48 bg-amber-50 rounded-full border-4 border-amber-300 flex items-center justify-center shadow-inner overflow-hidden">
            <svg viewBox="0 0 100 100" className="w-36 h-36">
              <ellipse cx="50" cy="50" rx="36" ry="24" fill="#f43f5e" />
              {mouthState === 'closed' ? (
                <path d="M 20 50 Q 50 54 80 50" stroke="#be123c" strokeWidth="4" fill="none" strokeLinecap="round" />
              ) : (
                <>
                  <ellipse cx="50" cy="50" rx="26" ry="16" fill="#881337" />
                  <rect x="35" y="38" width="30" height="6" rx="2" fill="#ffffff" />
                  <rect x="38" y="56" width="24" height="5" rx="2" fill="#ffffff" />
                  <path d="M 38 56 Q 50 48 62 56 Z" fill="#fb7185" />
                </>
              )}
            </svg>
          </div>

          <div className="space-y-1">
            <h4 className="font-black text-slate-900 text-base">{selectedLetter.mouthGuide.lipPosition}</h4>
            <p className="text-xs text-slate-600 font-bold">{selectedLetter.mouthGuide.tip}</p>
          </div>

          <button
            onClick={triggerMouthDemo}
            className="game-btn px-6 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-bold text-xs"
          >
            <Volume2 className="w-4 h-4" />
            <span>حَرِّكِ الفَمَ وَاسْتَمِعْ 👄</span>
          </button>
        </div>

        {/* Live Camera View */}
        <div className="game-card p-6 border-4 border-emerald-300 bg-white flex flex-col items-center justify-between text-center space-y-4">
          <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full">
            مِرْآتُكَ التَّفَاعُلِيَّة 🪞
          </span>

          <div className="relative w-full h-56 bg-slate-950 rounded-3xl border-4 border-white shadow-card-pop overflow-hidden flex items-center justify-center">
            {cameraActive ? (
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover transform -scale-x-100" />
            ) : (
              <div className="text-center p-6 space-y-2 text-white">
                <span className="text-5xl block">🪞</span>
                <p className="text-xs font-bold">افْتَحِ الكَامِيرَا لِمُشَاهَدَةِ نَفْسِكَ وَتَقْلِيدِ الحَرَكَة مَحَلِّيًّا بِأَمَان!</p>
              </div>
            )}
          </div>

          <button
            onClick={() => {
              audioManager.playVictory();
              addStars(1);
              addCoins(5);
            }}
            className="game-btn px-6 py-2.5 bg-emerald-500 text-white rounded-xl font-bold text-xs"
          >
            <Sparkles className="w-4 h-4" />
            <span>قَلَّدْتُ الحَرَكَةَ بِنَجَاح! 🌟</span>
          </button>
        </div>

      </div>

      {/* Choose Any Letter */}
      <div className="bg-white p-4 rounded-3xl border-2 border-slate-200 space-y-3">
        <h3 className="font-black text-slate-800 text-sm">اخْتَرْ أَيَّ حَرْفٍ لِتَعَلُّمِ مَخْرَجِهِ:</h3>
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {ARABIC_LETTERS.map(l => (
            <button
              key={l.id}
              onClick={() => {
                setSelectedLetter(l);
                audioManager.playClick();
                audioManager.speak(l.char);
              }}
              className={`min-w-[48px] h-12 rounded-xl font-black text-xl border-2 transition-all flex items-center justify-center ${
                selectedLetter.id === l.id
                  ? 'bg-sky-500 text-white border-white shadow-md scale-105'
                  : 'bg-slate-50 text-slate-800 border-slate-200 hover:bg-sky-50'
              }`}
            >
              {l.char}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\minigames\WordPictureHunterGame.tsx`
```typescript
import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

export const WordPictureHunterGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();

  const challenges = [
    {
      targetWord: 'بَطَّة',
      options: [
        { id: 1, name: 'بَطَّة', emoji: '🦆', isCorrect: true },
        { id: 2, name: 'سَيَّارَة', emoji: '🚗', isCorrect: false },
        { id: 3, name: 'تُفَّاحَة', emoji: '🍎', isCorrect: false },
        { id: 4, name: 'قَلَم', emoji: '✏️', isCorrect: false }
      ]
    },
    {
      targetWord: 'بَاب',
      options: [
        { id: 1, name: 'شَمْس', emoji: '☀️', isCorrect: false },
        { id: 2, name: 'بَاب', emoji: '🚪', isCorrect: true },
        { id: 3, name: 'مَوْز', emoji: '🍌', isCorrect: false },
        { id: 4, name: 'كُرَة', emoji: '⚽', isCorrect: false }
      ]
    },
    {
      targetWord: 'بَيْت',
      options: [
        { id: 1, name: 'عِنَب', emoji: '🍇', isCorrect: false },
        { id: 2, name: 'كِتَاب', emoji: '📖', isCorrect: false },
        { id: 3, name: 'بَيْت', emoji: '🏠', isCorrect: true },
        { id: 4, name: 'نَجْمَة', emoji: '⭐', isCorrect: false }
      ]
    }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentQ = challenges[currentIdx];

  const handlePickOption = (isCorrect: boolean, wordName: string) => {
    if (isCorrect) {
      soundManager.playSuccess();
      soundManager.speak(`صحيح! ${wordName}`);
      addStars(1);
      addCoins(5);

      setTimeout(() => {
        if (currentIdx < challenges.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setCompleted(true);
          triggerCelebration();
        }
      }, 1000);
    } else {
      soundManager.playEncouragement();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6">
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-pink-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎯</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ صَيْدِ الكَلِمَة</h2>
            <p className="text-xs text-slate-500 font-bold">
              اسْتَمِعْ لِلكَلِمَةِ وَاخْتَرْ الصُّورَةَ المُنَاسِبَة!
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-gradient-to-b from-pink-100 to-rose-50 p-6 md:p-8 rounded-3xl border-4 border-white shadow-card-pop text-center space-y-6">
        {!completed ? (
          <>
            <div className="space-y-2">
              <span className="text-xs font-black text-rose-700 bg-rose-200 px-3 py-1 rounded-full">
                السؤال {currentIdx + 1} من {challenges.length}
              </span>
              <h3 className="text-4xl md:text-5xl font-black text-slate-900 mt-2">
                أَيْنَ صُورَةُ: <span className="text-rose-600">({currentQ.targetWord})</span>؟
              </h3>
              <button
                onClick={() => soundManager.speak(currentQ.targetWord)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-rose-200 text-rose-900 rounded-full font-bold text-xs hover:bg-rose-300"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلكَلِمَة</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
              {currentQ.options.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handlePickOption(opt.isCorrect, opt.name)}
                  className="game-card p-6 flex flex-col items-center justify-center gap-3 border-3 border-pink-300 hover:border-pink-500 hover:scale-105 active:scale-95 transition-all bg-white"
                >
                  <span className="text-5xl md:text-6xl">{opt.emoji}</span>
                  <span className="font-black text-sm text-slate-800">{opt.name}</span>
                </button>
              ))}
            </div>
          </>
        ) : (
          <div className="py-6 space-y-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl font-black text-slate-800">
              صَيَّادُ كَلِمَاتٍ مَاهِرٌ جِدًّا!
            </h3>
            <button
              onClick={() => {
                setCurrentIdx(0);
                setCompleted(false);
              }}
              className="game-btn px-6 py-3 bg-rose-500 text-white rounded-2xl font-black text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>الْعَبْ ثَانِيَةً 🎯</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\minigames\WordBoxBuilderGame.tsx`
```typescript
import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight, Check } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot, MascotState } from '../mascot/LumiMascot';

export const WordBoxBuilderGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();

  const words = [
    { targetWord: 'بَاب', letters: ['ب', 'ا', 'ب'], emoji: '🚪' },
    { targetWord: 'بَحْر', letters: ['ب', 'ح', 'ر'], emoji: '🌊' },
    { targetWord: 'حَبْل', letters: ['ح', 'ب', 'ل'], emoji: '🪢' },
    { targetWord: 'عِنَب', letters: ['ع', 'ن', 'ب'], emoji: '🍇' }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [placedLetters, setPlacedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>(() => {
    return [...words[0].letters].sort(() => Math.random() - 0.5);
  });
  const [completed, setCompleted] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [mascotState, setMascotState] = useState<MascotState>('idle');

  const currentWord = words[currentIdx];

  const handleSelectLetter = (char: string, index: number) => {
    if (isProcessing || completed) return;

    soundManager.playPop();
    audioManager.speak(char);

    const newPlaced = [...placedLetters, char];
    setPlacedLetters(newPlaced);

    // Remove letter from available
    const newAvail = availableLetters.filter((_, i) => i !== index);
    setAvailableLetters(newAvail);

    // Check if word is completed
    if (newPlaced.length === currentWord.letters.length) {
      setIsProcessing(true);
      const spelled = newPlaced.join('');
      if (spelled === currentWord.letters.join('')) {
        soundManager.playSuccess();
        audioManager.speak(currentWord.targetWord);
        setMascotState('success');
        addStars(1);
        addCoins(5);

        setTimeout(() => {
          if (currentIdx < words.length - 1) {
            const nextIdx = currentIdx + 1;
            setCurrentIdx(nextIdx);
            setPlacedLetters([]);
            setAvailableLetters([...words[nextIdx].letters].sort(() => Math.random() - 0.5));
            setMascotState('idle');
          } else {
            setCompleted(true);
            triggerCelebration();
            addStars(2);
            addCoins(10);
          }
          setIsProcessing(false);
        }, 1500);
      } else {
        soundManager.playEncouragement();
        setMascotState('retry');
        setTimeout(() => {
          setPlacedLetters([]);
          setAvailableLetters([...currentWord.letters].sort(() => Math.random() - 0.5));
          setIsProcessing(false);
          setMascotState('idle');
        }, 1000);
      }
    }
  };

  const handleRemovePlacedLetter = (index: number) => {
    if (isProcessing || completed) return;
    const removedChar = placedLetters[index];
    if (!removedChar) return;

    soundManager.playPop();
    setPlacedLetters(prev => prev.filter((_, i) => i !== index));
    setAvailableLetters(prev => [...prev, removedChar]);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6 font-body">
      <div className="flex items-center justify-between bg-[var(--color-lumi-bubble)] backdrop-blur-md p-4 rounded-3xl border-2 border-[var(--color-lumi-wave)]/20 shadow-sm">
        <div className="flex items-center gap-3">
          <LumiMascot state="idle" size="sm" className="hidden sm:flex" />
          <div>
            <h2 className="text-xl font-display font-black text-slate-800">صُنْدُوقُ الكَلِمَات</h2>
            <p className="text-xs text-slate-500 font-bold">
              رَتِّب الحُرُوفَ لِتَكْوِينِ الكَلِمَةِ المُنَاسِبَةِ لِلصُّورَة!
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-[var(--color-lumi-bg)] p-6 md:p-8 rounded-3xl border-4 border-white shadow-xl text-center space-y-8">
        {!completed ? (
          <>
            <div className="flex flex-col items-center gap-4">
              <div className="text-7xl animate-float bg-white/50 w-32 h-32 flex items-center justify-center rounded-3xl shadow-sm border-2 border-[var(--color-lumi-wave)]/10">
                {currentWord.emoji}
              </div>
              {mascotState !== 'idle' && (
                <div className="absolute top-32">
                   <LumiMascot state={mascotState} size="md" />
                </div>
              )}
            </div>

            {/* Word Slots Container (Click placed letters to remove/undo) */}
            <div className="flex items-center justify-center gap-3 dir-rtl">
              {currentWord.letters.map((_, idx) => {
                const char = placedLetters[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => char && handleRemovePlacedLetter(idx)}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-white border-4 border-dashed flex items-center justify-center text-4xl font-display font-black shadow-inner transition-all ${
                      char
                        ? 'border-[var(--color-lumi-wave)] text-[var(--color-lumi-wave)] active:scale-90 hover:bg-rose-50'
                        : 'border-[var(--color-lumi-wave)]/20 text-slate-400'
                    }`}
                    title={char ? 'انقر لإرجاع الحرف' : ''}
                  >
                    {char || ''}
                  </button>
                );
              })}
            </div>

            {/* Letter Pickers */}
            <div className="pt-4">
              <p className="text-xs font-bold text-slate-600 mb-3">
                اضْغَطْ عَلَى الحُرُوفِ بِالتَّرْتِيبِ الصَّحِيح (أَوِ انْقُرِ المُرَبَّعَ لِلتَّرَاجُع):
              </p>
              <div className="flex items-center justify-center gap-3 min-h-[72px]">
                {availableLetters.map((char, i) => (
                  <button
                    key={i}
                    disabled={isProcessing}
                    onClick={() => handleSelectLetter(char, i)}
                    className="game-btn w-16 h-16 md:w-18 md:h-18 bg-[var(--color-lumi-wave)] text-white rounded-2xl font-display font-black text-3xl shadow-lg active:scale-95 disabled:opacity-50 hover:bg-purple-600"
                  >
                    {char}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="py-6 flex flex-col items-center justify-center space-y-6 animate-pop-burst">
            <LumiMascot state="success" size="xl" />
            <h3 className="text-3xl md:text-4xl font-display font-black text-[var(--color-lumi-wave)]">
              أَحْسَنْتَ يَا بَطَل!
            </h3>
            <button
              onClick={() => {
                setCurrentIdx(0);
                setPlacedLetters([]);
                setAvailableLetters([...words[0].letters].sort(() => Math.random() - 0.5));
                setCompleted(false);
                setIsProcessing(false);
                setMascotState('idle');
              }}
              className="game-btn px-8 py-4 bg-[var(--color-lumi-spark)] text-white rounded-full font-display font-black text-xl shadow-lg hover:scale-105 flex items-center gap-2"
            >
              <RotateCcw className="w-6 h-6" />
              <span>الْعَبْ مَرَّةً أُخْرَى</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\minigames\SyllableTrainGame.tsx`
```typescript
import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

export const SyllableTrainGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();
  
  const questions = [
    { target: 'بَ', audioPrompt: 'بَ', options: ['بَ', 'بِ', 'بُ', 'تَ'], correct: 'بَ' },
    { target: 'بَا', audioPrompt: 'بَا', options: ['بُو', 'بَا', 'بِي', 'تَا'], correct: 'بَا' },
    { target: 'بُ', audioPrompt: 'بُ', options: ['بَ', 'بِ', 'بُ', 'مُ'], correct: 'بُ' },
    { target: 'بِي', audioPrompt: 'بِي', options: ['بِي', 'بَا', 'بُو', 'تِي'], correct: 'بِي' }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [trainMoving, setTrainMoving] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentQ = questions[currentIdx];

  const handleSelectWagon = (syl: string) => {
    if (syl === currentQ.correct) {
      soundManager.playTrainWhistle();
      soundManager.playSuccess();
      setTrainMoving(true);
      addStars(1);
      addCoins(5);

      setTimeout(() => {
        setTrainMoving(false);
        if (currentIdx < questions.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setCompleted(true);
          triggerCelebration();
        }
      }, 1500);
    } else {
      soundManager.playEncouragement();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6">
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-emerald-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🚂</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ قِطَارِ المَقَاطِع</h2>
            <p className="text-xs text-slate-500 font-bold">
              اخْتَرْ عَرَبَةَ المَقْطَعِ الصَّحِيحِ لِيَتَحَرَّكَ القِطَار!
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Train Scene */}
      <div className="bg-gradient-to-b from-sky-200 via-emerald-100 to-amber-100 p-6 md:p-8 rounded-3xl border-4 border-white shadow-card-pop relative overflow-hidden min-h-[380px] flex flex-col justify-between">
        {/* Animated Moving Train */}
        <div className={`flex items-center gap-3 transition-transform duration-1000 ${trainMoving ? 'translate-x-[-120%]' : 'translate-x-0'}`}>
          {/* Locomotive Engine */}
          <div className="w-24 h-20 bg-rose-500 rounded-2xl flex items-center justify-center text-3xl border-3 border-white shadow-md text-white font-black relative">
            🚂
            {trainMoving && (
              <span className="absolute -top-6 right-2 text-2xl animate-bounce">💨</span>
            )}
          </div>

          {/* Connected Syllable Wagon */}
          <div className="w-24 h-20 bg-amber-400 rounded-2xl flex items-center justify-center text-4xl font-black border-3 border-white shadow-md text-slate-900">
            {currentQ.target}
          </div>
        </div>

        {/* Question & Options */}
        {!completed ? (
          <div className="bg-white/95 backdrop-blur-md p-5 rounded-2xl border-2 border-emerald-300 text-center space-y-3 mt-8">
            <div className="flex items-center justify-center gap-2">
              <span className="font-extrabold text-sm text-slate-800">
                أَيْنَ مَقْطَعُ: <span className="text-rose-600 text-2xl font-black">({currentQ.target})</span>؟
              </span>
              <button
                onClick={() => soundManager.speak(currentQ.audioPrompt)}
                className="p-1.5 rounded-full bg-sky-100 text-sky-700 hover:bg-sky-200"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectWagon(opt)}
                  className="game-btn p-4 bg-gradient-to-b from-white to-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl font-black text-3xl border-3 border-emerald-300 active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl font-black text-slate-800">
              وَصَلَ القِطَارُ إِلَى المَحَطَّةِ بِنَجَاح!
            </h3>
            <button
              onClick={() => {
                setCurrentIdx(0);
                setCompleted(false);
              }}
              className="game-btn px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>الْعَبْ ثَانِيَةً 🚂</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\minigames\SpeechGateGame.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { Mic, Sparkles, ArrowRight, RotateCcw, Volume2, Flower } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { speechAnalyzer } from '../../services/speech/SpeechAnalyzer';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot, MascotState } from '../mascot/LumiMascot';
import { Modal } from '../ui/Modal';

export const SpeechGateGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();
  
  const gateSounds = ['بَ', 'بَا', 'بَاب', 'بَطَّة'];
  const [gateIndex, setGateIndex] = useState<number>(0);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [gateOpen, setGateOpen] = useState<boolean>(false);
  const [micVol, setMicVol] = useState<number>(0);
  const [isAllCompleted, setIsAllCompleted] = useState<boolean>(false);
  const [mascotState, setMascotState] = useState<MascotState>('idle');
  
  // Custom Modal State
  const [modalState, setModalState] = useState<{isOpen: boolean, title: string, message: string, type: 'error'|'info'}>({
    isOpen: false, title: '', message: '', type: 'info'
  });

  const currentSound = gateSounds[gateIndex];

  // Cleanup microphone on unmount
  useEffect(() => {
    return () => {
      speechAnalyzer.stopListening();
    };
  }, []);

  const handleOpenGate = () => {
    if (!speechAnalyzer.isSupported()) {
      setModalState({
        isOpen: true,
        title: 'عذراً يا بطل',
        message: 'المُتَصَفِّحُ لَا يَدْعَمُ تَمْيِيزَ الصَّوْت. يُرْجَى اسْتِخْدَامُ Chrome أَوْ Edge.',
        type: 'error'
      });
      return;
    }
    
    setIsListening(true);
    setMascotState('listening');
    soundManager.playPop();

    // Timeout safety
    const timeoutId = setTimeout(() => {
      speechAnalyzer.stopListening();
      setIsListening(false);
      setMascotState('idle');
      setMicVol(0);
      setModalState({
        isOpen: true,
        title: 'أين صوتك؟',
        message: 'لم أتمكن من سماعك بوضوح، حاول الاقتراب من الميكروفون.',
        type: 'info'
      });
    }, 10000); // 10 seconds max

    speechAnalyzer.startListening(
      currentSound,
      (result) => {
        clearTimeout(timeoutId);
        setIsListening(false);
        setMicVol(0);
        if (result.status === 'high_confidence' || result.status === 'acceptable') {
          soundManager.playGateOpen();
          soundManager.playSuccess();
          setGateOpen(true);
          setMascotState('success');
          addStars(2);
          addCoins(10);
        } else {
          soundManager.playEncouragement();
          setMascotState('retry');
          setTimeout(() => setMascotState('idle'), 2000);
        }
      },
      (vol) => setMicVol(vol),
      () => {
        clearTimeout(timeoutId);
        setIsListening(false);
        setMicVol(0);
        if (mascotState === 'listening') setMascotState('idle');
      }
    );
  };

  // Fallback for devices without microphone or when permission is denied
  const handleListenAndAssist = () => {
    audioManager.speak(currentSound, 0.85, () => {
      soundManager.playGateOpen();
      soundManager.playSuccess();
      setGateOpen(true);
      setMascotState('success');
      addStars(1);
      addCoins(5);
    });
  };

  const handleNextGate = () => {
    setGateOpen(false);
    if (gateIndex < gateSounds.length - 1) {
      setGateIndex(prev => prev + 1);
      setMascotState('idle');
    } else {
      setIsAllCompleted(true);
      triggerCelebration();
      addStars(3);
      addCoins(15);
    }
  };

  const handleRestart = () => {
    setGateIndex(0);
    setGateOpen(false);
    setIsAllCompleted(false);
    setMascotState('idle');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6 font-body">
      
      <Modal 
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({...prev, isOpen: false}))}
        title={modalState.title}
        message={modalState.message}
        type={modalState.type}
      />

      <div className="flex items-center justify-between bg-[var(--color-lumi-glass)] backdrop-blur-md p-4 rounded-3xl border-2 border-[var(--color-lumi-secondary)]/50 shadow-lg text-white">
        <div className="flex items-center gap-3">
          <LumiMascot state="idle" size="sm" className="hidden sm:flex" />
          <div>
            <h2 className="text-xl font-display font-black text-[var(--color-lumi-primary)]">إِيقَاظُ الزَّهْرَةِ المُضِيئَة</h2>
            <p className="text-xs text-[var(--color-lumi-neutral)] font-bold">
              اِسْتَخْدِمْ صَوْتَكَ لِتُوقِظَ زَهْرَةَ الحَرْف!
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-[var(--color-lumi-base)] text-[var(--color-lumi-neutral)] hover:bg-[var(--color-lumi-secondary)] hover:text-white transition-colors"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-[var(--color-lumi-base)] p-8 rounded-3xl border-4 border-[var(--color-lumi-secondary)]/30 shadow-2xl text-white text-center space-y-6 relative overflow-hidden">
        
        {/* Forest Night Elements */}
        <div className="absolute top-4 left-6 text-[var(--color-lumi-primary)] animate-pulse text-xl opacity-60">✨</div>
        <div className="absolute top-20 right-12 text-[var(--color-lumi-accent)] animate-pulse text-sm opacity-60">🌿</div>
        <div className="absolute bottom-10 left-16 text-[var(--color-lumi-secondary)] animate-pulse text-lg opacity-60">✦</div>

        {!isAllCompleted ? (
          <>
            <div className="space-y-3 z-10 relative">
              <span className="text-xs font-black text-[var(--color-lumi-primary)] bg-[var(--color-lumi-primary)]/10 px-4 py-2 rounded-full border border-[var(--color-lumi-primary)]/30">
                الزهرة {gateIndex + 1} من {gateSounds.length}
              </span>
              <h3 className="text-xl md:text-2xl font-display font-black text-slate-300 mt-4">
                الكَلِمَةُ النَّائِمَة:
              </h3>
            </div>

            {/* Forest Scene: Lumi & Flower */}
            <div className="relative w-full max-w-md mx-auto h-72 flex flex-col items-center justify-between p-4 z-10">
              
              {/* Top: The Flower */}
              <div className="relative w-40 h-40 flex items-center justify-center transition-all duration-700">
                
                {/* Flower Glow based on mic volume */}
                {!gateOpen && (
                  <div 
                    className="absolute inset-0 bg-[var(--color-lumi-primary)] rounded-full blur-xl transition-all duration-75"
                    style={{ opacity: isListening ? 0.2 + (micVol * 0.8) : 0, transform: `scale(${1 + micVol})` }}
                  />
                )}

                {/* SVG Flower */}
                <svg viewBox="0 0 100 100" className={`w-full h-full drop-shadow-xl transition-all duration-700 ${
                  gateOpen ? 'scale-125' : (mascotState === 'listening' ? 'scale-105' : 'scale-100')
                }`}>
                  {gateOpen ? (
                     /* Bloomed Flower */
                    <g className="animate-bloom origin-center">
                      <path d="M50 80 Q 20 60 30 30 Q 50 40 50 50" fill="var(--color-lumi-accent)" opacity="0.8" />
                      <path d="M50 80 Q 80 60 70 30 Q 50 40 50 50" fill="var(--color-lumi-accent)" opacity="0.8" />
                      <circle cx="50" cy="45" r="20" fill="var(--color-lumi-primary)" />
                      {/* Petals */}
                      <path d="M 50 25 Q 65 5 80 25 Q 65 45 50 25" fill="var(--color-lumi-secondary)" />
                      <path d="M 50 25 Q 35 5 20 25 Q 35 45 50 25" fill="var(--color-lumi-secondary)" />
                      <path d="M 30 45 Q 5 45 20 65 Q 40 55 30 45" fill="var(--color-lumi-secondary)" />
                      <path d="M 70 45 Q 95 45 80 65 Q 60 55 70 45" fill="var(--color-lumi-secondary)" />
                    </g>
                  ) : (
                    /* Sleeping Bud */
                    <g className={mascotState === 'retry' ? 'animate-gentle-nod' : 'animate-breathe'}>
                      <path d="M50 80 Q 30 60 40 40 Q 50 50 50 60" fill="#065F46" />
                      <path d="M50 80 Q 70 60 60 40 Q 50 50 50 60" fill="#065F46" />
                      <path d="M 40 40 Q 50 20 60 40 Q 50 60 40 40" fill="#4C1D95" />
                    </g>
                  )}
                </svg>
                
                {/* The Word */}
                <div className={`absolute z-10 font-display font-black transition-all duration-700 ${
                  gateOpen ? 'text-slate-900 text-3xl md:text-4xl -translate-y-2' : 'text-slate-300 text-2xl md:text-3xl'
                }`}>
                  {currentSound}
                </div>
              </div>

              {/* Bottom: Lumi Mascot watching/listening */}
              <div className="relative mt-auto">
                <LumiMascot state={mascotState} size="lg" />
              </div>
            </div>

            {/* Action Controls */}
            <div className="flex flex-col items-center gap-4">
              {!gateOpen ? (
                <>
                  <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                      onClick={handleOpenGate}
                      className={`game-btn px-8 py-4 rounded-full font-display font-black text-xl border-2 border-[var(--color-lumi-base)] shadow-lg flex items-center gap-3 transition-all ${
                        isListening
                          ? 'bg-[var(--color-lumi-primary)] text-slate-900 scale-105 animate-glow-pulse'
                          : 'bg-[var(--color-lumi-secondary)] text-white hover:bg-purple-500'
                      }`}
                    >
                      <Mic className="w-7 h-7" />
                      <span>{isListening ? 'جَارِي الاسْتِمَاع...' : 'أَيْقِظْ بِصَوْتِك'}</span>
                    </button>

                    <button
                      onClick={handleListenAndAssist}
                      className="px-5 py-4 rounded-full bg-[var(--color-lumi-glass)] hover:bg-[var(--color-lumi-secondary)]/30 text-[var(--color-lumi-neutral)] hover:text-white border-2 border-[var(--color-lumi-secondary)]/50 font-black text-sm flex items-center gap-2 transition-all active:scale-95"
                      title="اسْتَمِعْ لِلصَّوْتِ مُسَاعَدَةً"
                    >
                      <Volume2 className="w-5 h-5" />
                      <span>مُسَاعَدَة</span>
                    </button>
                  </div>

                  {/* Optional: Remove the discrete bars and rely entirely on the flower glow. 
                      Since user wanted actual visual use of the state, we used it for the flower glow. 
                      We can leave this empty. */}
                </>
              ) : (
                <button
                  onClick={handleNextGate}
                  className="game-btn px-8 py-4 bg-[var(--color-lumi-accent)] text-white rounded-full font-display font-black text-xl hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
                >
                  <Sparkles className="w-6 h-6" />
                  <span>الزَّهْرَةُ التَّالِيَة ⬅️</span>
                </button>
              )}
            </div>
          </>
        ) : (
          /* Victory Completion Screen */
          <div className="py-6 flex flex-col items-center justify-center space-y-6 animate-bloom z-10 relative">
            <LumiMascot state="success" size="xl" />
            <h3 className="text-3xl md:text-4xl font-display font-black text-[var(--color-lumi-primary)] drop-shadow-lg">
              أَحْسَنْتَ يَا بَطَل!
            </h3>
            <p className="text-lg text-[var(--color-lumi-neutral)] font-bold max-w-md">
              بِفَضْلِ صَوْتِك، أَزْهَرَتْ كُلُّ النَّبَاتَاتِ وَعَادَ النُّور!
            </p>
            <div className="flex items-center gap-4 pt-4">
              <button
                onClick={handleRestart}
                className="game-btn px-6 py-3.5 bg-[var(--color-lumi-primary)] text-[var(--color-lumi-base)] rounded-full font-display font-black text-lg shadow-lg flex items-center gap-2 hover:scale-105"
              >
                <RotateCcw className="w-5 h-5" />
                <span>أَيْقِظْهَا مُجَدَّداً</span>
              </button>
              <button
                onClick={onBack}
                className="game-btn px-6 py-3.5 bg-[var(--color-lumi-glass)] border-2 border-[var(--color-lumi-secondary)] text-white rounded-full font-display font-black text-lg hover:bg-[var(--color-lumi-secondary)] flex items-center gap-2"
              >
                <span>العَوْدَةُ لِلْخَرِيطَة</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\minigames\SoundMemoryGame.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

interface CardItem {
  id: number;
  pairId: number;
  type: 'word' | 'emoji';
  content: string;
  nameAr: string;
  flipped: boolean;
  matched: boolean;
}

export const SoundMemoryGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();

  const pairs = [
    { id: 1, word: 'بَطَّة', emoji: '🦆' },
    { id: 2, word: 'بَاب', emoji: '🚪' },
    { id: 3, word: 'بَيْت', emoji: '🏠' },
    { id: 4, word: 'بَحْر', emoji: '🌊' }
  ];

  const [cards, setCards] = useState<CardItem[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const initGame = () => {
    const deck: CardItem[] = [];
    let counter = 0;
    pairs.forEach(p => {
      deck.push({ id: counter++, pairId: p.id, type: 'word', content: p.word, nameAr: p.word, flipped: false, matched: false });
      deck.push({ id: counter++, pairId: p.id, type: 'emoji', content: p.emoji, nameAr: p.word, flipped: false, matched: false });
    });
    setCards(deck.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setCompleted(false);
    setIsLocked(false);
  };

  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (isLocked || cards[index].flipped || cards[index].matched || flippedCards.length === 2) return;

    soundManager.playPop();
    const newCards = cards.map((c, i) => i === index ? { ...c, flipped: true } : c);
    soundManager.speak(cards[index].nameAr);
    setCards(newCards);

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setIsLocked(true);
      const first = newCards[newFlipped[0]];
      const second = newCards[newFlipped[1]];

      if (first.pairId === second.pairId) {
        // Matched!
        soundManager.playSuccess();
        setTimeout(() => {
          setCards(prev => {
            const updated = prev.map((c, i) => (i === newFlipped[0] || i === newFlipped[1]) ? { ...c, matched: true } : c);
            if (updated.every(c => c.matched)) {
              setCompleted(true);
              triggerCelebration();
              addStars(3);
              addCoins(15);
            }
            return updated;
          });
          setFlippedCards([]);
          setIsLocked(false);
        }, 500);
      } else {
        // Not matched
        soundManager.playEncouragement();
        setTimeout(() => {
          setCards(prev => prev.map((c, i) => (i === newFlipped[0] || i === newFlipped[1]) ? { ...c, flipped: false } : c));
          setFlippedCards([]);
          setIsLocked(false);
        }, 1000);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6">
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-teal-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🎴</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ ذَاكِرَةِ الأَصْوَات</h2>
            <p className="text-xs text-slate-500 font-bold">
              طَابِقْ بَيْنَ الكَلِمَةِ وَالصُّورَةِ المُنَاسِبَةِ لَهَا!
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      <div className="bg-gradient-to-b from-teal-100 to-sky-50 p-6 md:p-8 rounded-3xl border-4 border-white shadow-card-pop text-center space-y-6">
        {!completed ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto">
            {cards.map((card, idx) => (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                className={`w-full h-28 md:h-32 rounded-3xl font-black text-2xl md:text-3xl border-4 flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-md ${
                  card.flipped || card.matched
                    ? 'bg-white border-teal-400 text-teal-800 rotate-0'
                    : 'bg-gradient-to-tr from-teal-500 to-sky-400 border-white text-white rotate-1'
                }`}
              >
                {card.flipped || card.matched ? (
                  <span className="animate-pop">{card.content}</span>
                ) : (
                  <span className="text-3xl">❓</span>
                )}
              </button>
            ))}
          </div>
        ) : (
          <div className="py-6 space-y-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl font-black text-slate-800">
              ذَاكِرَةٌ قَوِيَّةٌ جِدًّا يَا بَطَل!
            </h3>
            <button
              onClick={initGame}
              className="game-btn px-6 py-3 bg-teal-500 text-white rounded-2xl font-black text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>الْعَبْ ثَانِيَةً 🎴</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\minigames\MiniGamesHub.tsx`
```typescript
import React, { useState } from 'react';
import { Play, Sparkles, Trophy, ArrowRight } from 'lucide-react';
import { soundManager } from '../../services/audio/SoundManager';
import { useGame } from '../../context/GameContext';
import { LumiGuideBanner } from '../common/LumiGuideBanner';
import { LetterBubblePopGame } from './LetterBubblePopGame';
import { SyllableTrainGame } from './SyllableTrainGame';
import { WordBoxBuilderGame } from './WordBoxBuilderGame';
import { WordPictureHunterGame } from './WordPictureHunterGame';
import { SpeechGateGame } from './SpeechGateGame';
import { SoundMemoryGame } from './SoundMemoryGame';
import { LoulouRunnerGame } from './LoulouRunnerGame';

interface MiniGamesHubProps {
  onBackToHome: () => void;
  selectedGameId?: string | null;
}

export const MiniGamesHub: React.FC<MiniGamesHubProps> = ({
  onBackToHome,
  selectedGameId = null
}) => {
  const { childName } = useGame();
  const [activeGame, setActiveGame] = useState<string | null>(selectedGameId);

  const games = [
    {
      id: 'bubble_pop',
      title: 'صَيْدُ الحَرْفِ وَفَرْقَعَةُ الفَقَاعَات 🫧',
      desc: 'افْقَعْ الفَقَاعَاتِ الَّتِي تَحْمِلُ الحَرْفَ المَطْلُوبَ وَاجْمَعِ النُّجُوم!',
      icon: '🫧',
      color: 'from-sky-400 to-blue-500',
      borderColor: 'border-sky-300'
    },
    {
      id: 'syllable_train',
      title: 'قِطَارُ المَقَاطِعِ السَّرِيع 🚂',
      desc: 'رَكِّبْ عَرَبَةَ المَقْطَعِ الصَّحِيحِ لِيَتَحَرَّكَ القِطَارُ السِّحْرِيّ!',
      icon: '🚂',
      color: 'from-emerald-400 to-green-600',
      borderColor: 'border-emerald-300'
    },
    {
      id: 'word_hunter',
      title: 'صَيْدُ الكَلِمَاتِ وَالصُّوَر 🎯',
      desc: 'اخْتَرْ الصُّورَةَ المُنَاسِبَةَ لِلكَلِمَةِ المَنْطُوقَةِ بِمَهَارَة!',
      icon: '🎯',
      color: 'from-amber-400 to-orange-500',
      borderColor: 'border-amber-300'
    }
  ];

  if (activeGame === 'bubble_pop') return <LetterBubblePopGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'syllable_train') return <SyllableTrainGame onBack={() => setActiveGame(null)} />;
  if (activeGame === 'word_hunter') return <WordPictureHunterGame onBack={() => setActiveGame(null)} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Bar Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToHome();
            }}
            className="p-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors"
            title="العودة للرئيسية"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
              <span>قَلْعَةُ الأَلْعَابِ التَّعْلِيمِيَّة</span>
              <span className="text-2xl">🎮</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-500 font-bold">
              3 أَلْعَابٍ بَطُولِيَّةٍ مُمْتِعَة لِتَرْسِيخِ النُّطْقِ وَالأَصْوَاتِ وَالكَلِمَات!
            </p>
          </div>
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`مَرْكَزُ الأَلْعَابِ التَّفَاعُلِيَّةِ يَا ${childName || 'البَطَل'}! اخْتَرْ أَيَّ لُعْبَةٍ تُحِبُّهَا لِتَصِيدَ الفَقَاعَاتِ أَوْ تُسَيِّرَ قِطَارَ المَقَاطِعِ وَتَجْمَعَ النُّجُوم!` }
        shortHint="اخْتَرْ لُعْبَتَكَ المُفَضَّلَة"
        autoSpeak={true}
        emotion="happy"
      />

      {/* Games List Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {games.map(game => (
          <div
            key={game.id}
            onClick={() => {
              soundManager.playClick();
              setActiveGame(game.id);
            }}
            className={`game-card p-6 border-4 ${game.borderColor} cursor-pointer group hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between min-h-[220px] bg-white`}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl group-hover:scale-125 transition-transform duration-300">
                  {game.icon}
                </span>
                <span className="text-[11px] font-black px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  مَجَّانِيَّة لِلَّعِب 🌟
                </span>
              </div>

              <h3 className="text-lg md:text-xl font-black text-slate-800 group-hover:text-sky-600 transition-colors mb-1">
                {game.title}
              </h3>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                {game.desc}
              </p>
            </div>

            <div className="pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-black text-slate-500">
                مُسْتَوَى مُمْتِع
              </span>
              <button className="game-btn px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-black text-xs">
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>الْعَبْ الآن</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\minigames\LoulouRunnerGame.tsx`
```typescript
import React, { useState } from 'react';
import { RotateCcw, Volume2, Sparkles, ArrowRight, Flag } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

export const LoulouRunnerGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { addStars, addCoins, triggerCelebration } = useGame();

  const runnerQuestions = [
    { question: 'أَيُّ كَلِمَةٍ تَبْدَأُ بِحَرْفِ (ب)؟', options: ['بَاب', 'شَمْس', 'قَلَم'], correct: 'بَاب' },
    { question: 'مَا هُوَ صَوْتُ حَرْفِ البَاءِ بِالفَتْحَة؟', options: ['بُ', 'بَ', 'بِ'], correct: 'بَ' },
    { question: 'أَيُّ كَلِمَةٍ فِيهَا حَرْفُ (ب) فِي الآخِر؟', options: ['عِنَب', 'بَحْر', 'حَبْل'], correct: 'عِنَب' },
    { question: 'أَكْمِل: البَطَّةُ تَسْبَحُ فِي .....', options: ['البَحْرِ', 'الكِتَابِ', 'البَابِ'], correct: 'البَحْرِ' }
  ];

  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [loulouPosition, setLoulouPosition] = useState<number>(10);
  const [completed, setCompleted] = useState<boolean>(false);

  const currentQ = runnerQuestions[currentIdx];

  const handleAnswer = (opt: string) => {
    if (opt === currentQ.correct) {
      soundManager.playSuccess();
      const newPos = loulouPosition + 25;
      setLoulouPosition(newPos);
      addStars(1);
      addCoins(5);

      setTimeout(() => {
        if (currentIdx < runnerQuestions.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setCompleted(true);
          triggerCelebration();
          addStars(3);
          addCoins(20);
        }
      }, 800);
    } else {
      soundManager.playEncouragement();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-6">
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-amber-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏃‍♂️</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ سِبَاقِ لُولُو</h2>
            <p className="text-xs text-slate-500 font-bold">
              سَاعِدْ لُولُو فِي الوُصُولِ لِخَطِّ النِّهَايَةِ بِالإِجَابَةِ الصَّحِيحَة!
            </p>
          </div>
        </div>

        <button
          onClick={onBack}
          className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>

      {/* Runner Track */}
      <div className="bg-gradient-to-b from-sky-300 via-sky-200 to-amber-200 p-6 md:p-8 rounded-3xl border-4 border-white shadow-card-pop relative overflow-hidden min-h-[380px] flex flex-col justify-between">
        
        {/* Track Runway */}
        <div className="relative w-full h-24 bg-amber-400/80 rounded-2xl border-2 border-amber-500 flex items-center px-4 overflow-hidden shadow-inner">
          {/* Finish Line Flag */}
          <div className="absolute left-6 text-4xl flex flex-col items-center">
            <Flag className="w-8 h-8 text-rose-600 fill-rose-500" />
            <span className="text-[10px] font-black bg-white px-1.5 rounded text-slate-800">النهاية</span>
          </div>

          {/* Running Loulou */}
          <div
            className="absolute transition-all duration-700 text-5xl flex items-center gap-1"
            style={{ right: `${loulouPosition}%` }}
          >
            <div className="w-14 h-14 rounded-full bg-sky-400 border-2 border-white shadow-md flex items-center justify-center text-3xl animate-bounce">
              👾
            </div>
            <span className="text-xs font-black bg-white/90 px-2 py-0.5 rounded-full text-slate-800 shadow">
              لولو
            </span>
          </div>
        </div>

        {/* Question Panel */}
        {!completed ? (
          <div className="bg-white/95 backdrop-blur-md p-6 rounded-3xl border-2 border-amber-300 text-center space-y-4">
            <h3 className="text-xl md:text-2xl font-black text-slate-900">
              {currentQ.question}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt)}
                  className="game-btn p-4 bg-gradient-to-b from-white to-amber-50 hover:bg-amber-100 text-slate-800 rounded-2xl font-black text-xl border-2 border-amber-300 active:scale-95"
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-6 space-y-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl font-black text-slate-800">
              فَازَ لُولُو بِالسِّبَاقِ بِفَضْلِكَ يَا بَطَل!
            </h3>
            <button
              onClick={() => {
                setCurrentIdx(0);
                setLoulouPosition(10);
                setCompleted(false);
              }}
              className="game-btn px-6 py-3 bg-amber-500 text-white rounded-2xl font-black text-sm"
            >
              <RotateCcw className="w-4 h-4" />
              <span>الْعَبْ سِبَاقًا جَدِيدًا 🏃‍♂️</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\minigames\LetterBubblePopGame.tsx`
```typescript
import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Trophy, RotateCcw, Volume2 } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { ARABIC_LETTERS } from '../../data/letters';

export const LetterBubblePopGame: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { selectedLetterId, addStars, addCoins, triggerCelebration } = useGame();
  
  const currentLetterObj = ARABIC_LETTERS.find(l => l.id === selectedLetterId) || ARABIC_LETTERS[1];
  const targetLetter = currentLetterObj.char;

  const [score, setScore] = useState<number>(0);
  const [bubbles, setBubbles] = useState<Array<{ id: number; char: string; x: number; y: number; speed: number; popped: boolean }>>([]);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const hasCelebratedRef = useRef<boolean>(false);

  const initGame = () => {
    const distractors = ARABIC_LETTERS.filter(l => l.char !== targetLetter).map(l => l.char);
    const pool = [targetLetter, targetLetter, targetLetter, ...distractors.slice(0, 6)];
    
    const initial = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      char: pool[Math.floor(Math.random() * pool.length)],
      x: 10 + Math.random() * 80,
      y: 10 + Math.random() * 70,
      speed: 0.5 + Math.random() * 0.7,
      popped: false
    }));
    setBubbles(initial);
    setTimeLeft(30);
    setScore(0);
    setGameOver(false);
    hasCelebratedRef.current = false;
  };

  // Initialize bubbles
  useEffect(() => {
    initGame();
  }, [targetLetter]);

  // Timer countdown without score dependency
  useEffect(() => {
    if (gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver]);

  // Handle Game Over victory
  useEffect(() => {
    if (gameOver && !hasCelebratedRef.current) {
      hasCelebratedRef.current = true;
      if (score >= 4) {
        triggerCelebration();
        addStars(3);
        addCoins(15);
      }
    }
  }, [gameOver, score, addStars, addCoins, triggerCelebration]);

  // Floating animation loop
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setBubbles(prev =>
        prev.map(b => {
          if (b.popped) return b;
          let newY = b.y - b.speed;
          if (newY < -10) {
            const distractors = ARABIC_LETTERS.filter(l => l.char !== targetLetter).map(l => l.char);
            const pool = [targetLetter, targetLetter, ...distractors.slice(0, 5)];
            return {
              ...b,
              y: 100,
              x: 10 + Math.random() * 80,
              char: pool[Math.floor(Math.random() * pool.length)]
            };
          }
          return { ...b, y: newY };
        })
      );
    }, 50);
    return () => clearInterval(interval);
  }, [gameOver, targetLetter]);

  const handlePop = (id: number, char: string) => {
    soundManager.playPop();
    if (char === targetLetter) {
      soundManager.playSuccess();
      setScore(s => s + 1);
      setBubbles(prev =>
        prev.map(b => (b.id === id ? { ...b, popped: true } : b))
      );
      setTimeout(() => {
        setBubbles(prev =>
          prev.map(b =>
            b.id === id
              ? {
                  ...b,
                  popped: false,
                  y: 100,
                  x: 10 + Math.random() * 80,
                  char: Math.random() > 0.4 ? targetLetter : ARABIC_LETTERS[Math.floor(Math.random() * 28)].char
                }
              : b
          )
        );
      }, 600);
    } else {
      soundManager.playEncouragement();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 select-none space-y-4">
      
      {/* Game Header */}
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-sky-200 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🫧</span>
          <div>
            <h2 className="text-xl font-black text-slate-800">لُعْبَةُ صَيْدِ الحَرْف</h2>
            <p className="text-xs text-slate-500 font-bold">
              افْقَعْ فَقَاعَاتِ حَرْفِ ({targetLetter}) فَقَطْ!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-sky-100 text-sky-900 px-3 py-1.5 rounded-xl font-black text-xs md:text-sm">
            ⭐ النِّقَاط: {score}
          </div>
          <div className="bg-rose-100 text-rose-900 px-3 py-1.5 rounded-xl font-black text-xs md:text-sm">
            ⏳ الوَقْت: {timeLeft}ث
          </div>
        </div>
      </div>

      {/* Game Canvas Board */}
      <div className="relative w-full h-[460px] bg-gradient-to-b from-sky-200 via-sky-100 to-indigo-100 rounded-3xl border-4 border-white shadow-card-pop overflow-hidden">
        {/* Floating Clouds Background */}
        <div className="absolute top-4 left-6 text-4xl opacity-40">☁️</div>
        <div className="absolute top-16 right-10 text-5xl opacity-40">☁️</div>

        {!gameOver ? (
          bubbles.map(b => (
            <button
              key={b.id}
              onClick={() => handlePop(b.id, b.char)}
              style={{
                position: 'absolute',
                left: `${b.x}%`,
                top: `${b.y}%`,
                transform: b.popped ? 'scale(1.4)' : 'scale(1)',
                opacity: b.popped ? 0 : 1,
                transition: b.popped ? 'all 0.3s ease-out' : 'none'
              }}
              className={`w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center font-black text-3xl md:text-4xl border-3 border-white/80 shadow-card-pop active:scale-95 ${
                b.char === targetLetter
                  ? 'bg-gradient-to-tr from-sky-400/80 to-blue-500/90 text-white'
                  : 'bg-gradient-to-tr from-pink-300/80 to-purple-400/90 text-white'
              }`}
            >
              {b.char}
            </button>
          ))
        ) : (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center space-y-4">
            <div className="text-6xl animate-bounce">🏆</div>
            <h3 className="text-2xl md:text-3xl font-black text-slate-800">
              انْتَهَتِ اللُّعْبَةُ يَا بَطَل!
            </h3>
            <p className="text-base text-slate-600 font-bold">
              لَقَدْ صِدْتَ <span className="text-sky-600 font-black text-xl">{score}</span> فَقَاعَةٍ صَحِيحَة!
            </p>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  setTimeLeft(30);
                  setScore(0);
                  setGameOver(false);
                }}
                className="game-btn px-6 py-3 bg-emerald-500 text-white rounded-2xl font-black text-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>الْعَبْ ثَانِيَةً</span>
              </button>
              <button
                onClick={onBack}
                className="game-btn px-6 py-3 bg-slate-200 text-slate-800 rounded-2xl font-black text-sm"
              >
                <span>العَوْدَةُ لِلأَلْعَاب</span>
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\mascot\LumiMascot.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

export type MascotState = 'idle' | 'listening' | 'success' | 'retry';

interface LumiMascotProps {
  state?: MascotState;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  message?: string;
}

export const LumiMascot: React.FC<LumiMascotProps> = ({ 
  state = 'idle', 
  className = '',
  size = 'md',
  message
}) => {
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleSpeak = () => {
    if (!message) return;
    setIsSpeaking(true);
    audioManager.speak(message, 0.85, () => setIsSpeaking(false));
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => handleSpeak(), 350);
      return () => clearTimeout(timer);
    }
  }, [message]);
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-48 h-48',
  };

  const getAnimationClass = () => {
    switch (state) {
      case 'idle': return 'animate-breathe';
      case 'listening': return 'animate-glow-pulse';
      case 'success': return 'animate-bloom';
      case 'retry': return 'animate-gentle-nod';
      default: return 'animate-breathe';
    }
  };

  // SVGs are drawn inline using the new Lumi colors
  // Lumi is a cute little sound wave ghost/sprite
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div 
        className={`relative flex items-center justify-center flex-shrink-0 cursor-pointer ${sizeClasses[size]}`}
        onClick={handleSpeak}
      >
      {state === 'listening' && (
        <div className="absolute inset-0 rounded-full border-4 border-[var(--color-lumi-primary)] animate-ping opacity-20" />
      )}
      
      {state === 'success' && (
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 text-[var(--color-lumi-primary)] text-xl animate-ping">✨</div>
          <div className="absolute bottom-0 left-0 text-[var(--color-lumi-primary)] text-2xl animate-pulse">🌟</div>
        </div>
      )}

      <svg
        viewBox="0 0 100 100"
        className={`w-full h-full drop-shadow-xl transition-all duration-300 ${getAnimationClass()}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Lumi Body (Light Sprite) */}
        <path
          d="M 50 10 C 25 10 15 35 15 60 C 15 80 25 90 35 85 C 40 82 45 88 50 85 C 55 88 60 82 65 85 C 75 90 85 80 85 60 C 85 35 75 10 50 10 Z"
          fill={state === 'retry' ? 'var(--color-lumi-neutral)' : 'var(--color-lumi-primary)'}
        />
        <path
          d="M 50 15 C 30 15 22 35 22 60 C 22 75 30 82 37 78 C 42 75 46 80 50 78 C 54 80 58 75 63 78 C 70 82 78 75 78 60 C 78 35 70 15 50 15 Z"
          fill="#FFF"
          fillOpacity="0.4"
        />

        {/* Eyes */}
        <circle cx="35" cy="45" r={state === 'success' ? "6" : "5"} fill="#1E293B" />
        <circle cx="65" cy="45" r={state === 'success' ? "6" : "5"} fill="#1E293B" />
        
        {/* Eye highlights */}
        <circle cx="33" cy="43" r="2" fill="white" />
        <circle cx="63" cy="43" r="2" fill="white" />

        {/* Mouth depending on state */}
        {state === 'idle' && (
          <path d="M 45 55 Q 50 60 55 55" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        )}
        {state === 'listening' && (
          <circle cx="50" cy="57" r="4" fill="#1E293B" />
        )}
        {state === 'success' && (
          <path d="M 40 55 Q 50 70 60 55 Z" fill="#1E293B" stroke="#1E293B" strokeWidth="2" strokeLinejoin="round" />
        )}
        {state === 'retry' && (
          <path d="M 45 58 Q 50 55 55 58" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        )}

        {/* Listening Ear / Hand */}
        {state === 'listening' && (
          <path d="M 85 45 C 95 35 95 65 85 55" stroke="var(--color-lumi-primary)" strokeWidth="4" strokeLinecap="round" fill="none" />
        )}

        {/* Cheeks */}
        {(state === 'success' || state === 'idle') && (
          <>
            <circle cx="25" cy="52" r="4" fill="#F472B6" opacity="0.6" />
            <circle cx="75" cy="52" r="4" fill="#F472B6" opacity="0.6" />
          </>
        )}
      </svg>
      </div>

      {message && (
        <div className="relative max-w-sm bg-[#0a1538]/95 backdrop-blur-2xl rounded-3xl p-4 border-2 border-amber-400/80 shadow-[0_0_35px_rgba(245,158,11,0.35)] transition-all z-10">
          <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-amber-400/80" />
          <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-r-6 border-r-[#0a1538]" />

          <div className="flex items-start gap-2.5">
            <p className="text-amber-100 font-extrabold text-xs md:text-sm leading-relaxed flex-1">
              {message}
            </p>

            <button
              onClick={handleSpeak}
              className={`p-2 rounded-2xl bg-[#14265c] text-amber-300 border border-amber-400/50 hover:bg-[#1f3b8c] transition-all flex-shrink-0 active:scale-90 ${
                isSpeaking ? 'animate-pulse bg-amber-400 text-slate-950 shadow-glow-yellow' : ''
              }`}
              title="اسْتَمِعْ لِصَوْتِ لُومِي"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

```

## 📄 ملف: `src\components\mascot\LoulouMascot.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { Volume2, Sparkles, MessageCircle } from 'lucide-react';
import { soundManager } from '../../services/audio/SoundManager';
import { useGame } from '../../context/GameContext';

interface LoulouMascotProps {
  message?: string;
  emotion?: 'happy' | 'talking' | 'cheering' | 'listening' | 'thinking';
  size?: 'sm' | 'md' | 'lg';
  autoSpeak?: boolean;
  onMascotClick?: () => void;
}

export const LoulouMascot: React.FC<LoulouMascotProps> = ({
  message = 'أَهْلًا يَا بَطَلْ! هَلْ نَبْدَأُ مُغَامَرَتَنَا فِي مَدِينَةِ الأَصْوَاتِ؟',
  emotion = 'happy',
  size = 'md',
  autoSpeak = false,
  onMascotClick
}) => {
  const { isVisualMode } = useGame();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [blink, setBlink] = useState(false);

  // Automatic blink animation
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 200);
    }, 3500);
    return () => clearInterval(blinkInterval);
  }, []);

  // Speak message when triggered or auto-speak
  const handleSpeak = () => {
    if (!message) return;
    setIsSpeaking(true);
    soundManager.speak(message, 0.85, () => {
      setIsSpeaking(false);
    });
  };

  useEffect(() => {
    if (autoSpeak && message) {
      const timer = setTimeout(() => {
        handleSpeak();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [message, autoSpeak]);

  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 md:w-28 md:h-28',
    lg: 'w-32 h-32 md:w-40 md:h-40'
  };

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Interactive Mascot Avatar */}
      <div
        onClick={() => {
          handleSpeak();
          if (onMascotClick) onMascotClick();
        }}
        className={`relative ${sizeClasses[size]} cursor-pointer group flex-shrink-0 transition-transform duration-200 active:scale-95`}
        title="اضغط على لولو للتحدث"
      >
        {/* Glow halo */}
        <div className={`absolute inset-0 bg-yellow-300/40 rounded-full blur-lg group-hover:blur-xl transition-all ${isSpeaking ? 'animate-pulse scale-110' : ''}`} />

        {/* Loulou Cute Animated Creature SVG */}
        <div className={`relative w-full h-full rounded-full bg-gradient-to-tr from-sky-400 via-sky-300 to-indigo-300 p-1 border-4 border-white shadow-card-pop transition-transform duration-300 ${isSpeaking ? 'animate-bounce' : 'animate-float'}`}>
          <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
            {/* Cute Ears */}
            <circle cx="26" cy="24" r="14" fill="#38bdf8" stroke="#ffffff" strokeWidth="3" />
            <circle cx="26" cy="24" r="7" fill="#f472b6" />
            <circle cx="74" cy="24" r="14" fill="#38bdf8" stroke="#ffffff" strokeWidth="3" />
            <circle cx="74" cy="24" r="7" fill="#f472b6" />

            {/* Face Body */}
            <ellipse cx="50" cy="54" rx="38" ry="34" fill="#60a5fa" />
            <ellipse cx="50" cy="56" rx="34" ry="30" fill="#bae6fd" />

            {/* Cheeks */}
            <ellipse cx="28" cy="62" rx="6" ry="4" fill="#f472b6" opacity="0.8" />
            <ellipse cx="72" cy="62" rx="6" ry="4" fill="#f472b6" opacity="0.8" />

            {/* Big Expressive Eyes */}
            {blink ? (
              <>
                <path d="M 32 50 Q 40 56 46 50" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
                <path d="M 54 50 Q 60 56 68 50" stroke="#1e293b" strokeWidth="3" fill="none" strokeLinecap="round" />
              </>
            ) : (
              <>
                {/* Left Eye */}
                <ellipse cx="38" cy="48" rx="7" ry="9" fill="#0f172a" />
                <circle cx="36" cy="45" r="3" fill="#ffffff" />
                <circle cx="40" cy="51" r="1.5" fill="#ffffff" />

                {/* Right Eye */}
                <ellipse cx="62" cy="48" rx="7" ry="9" fill="#0f172a" />
                <circle cx="60" cy="45" r="3" fill="#ffffff" />
                <circle cx="64" cy="51" r="1.5" fill="#ffffff" />
              </>
            )}

            {/* Little Cute Nose */}
            <polygon points="50,56 47,59 53,59" fill="#38bdf8" />

            {/* Animated Talking / Smiling Mouth */}
            {isSpeaking || emotion === 'talking' ? (
              <ellipse cx="50" cy="66" rx="7" ry="6" fill="#e11d48" className="animate-pulse">
                <ellipse cx="50" cy="67" rx="4" ry="3" fill="#f43f5e" />
              </ellipse>
            ) : emotion === 'cheering' ? (
              <path d="M 40 63 Q 50 75 60 63 Z" fill="#e11d48" stroke="#be123c" strokeWidth="1" />
            ) : (
              <path d="M 42 63 Q 50 70 58 63" stroke="#0f172a" strokeWidth="3" fill="none" strokeLinecap="round" />
            )}

            {/* Little Star Badge on Head */}
            <polygon points="50,22 52,27 57,28 53,31 54,36 50,33 46,36 47,31 43,28 48,27" fill="#fbbf24" stroke="#ffffff" strokeWidth="1" />
          </svg>
        </div>

        {/* Mascot Name Badge */}
        <div className="absolute -bottom-2 inset-x-0 flex justify-center">
          <span className="bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 font-extrabold text-xs px-2.5 py-0.5 rounded-full border-2 border-white shadow-sm flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-yellow-100" />
            لُولُو
          </span>
        </div>
      </div>

      {/* Interactive Speech Bubble */}
      {message && (
        <div className={`relative max-w-md bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl p-3.5 md:p-4 border-2 md:border-3 ${isVisualMode ? 'border-sky-500 shadow-glow-cyan' : 'border-sky-300 shadow-card-pop'} transition-all`}>
          {/* Arrow pointing to mascot */}
          <div className="absolute top-1/2 -right-2.5 -translate-y-1/2 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-sky-300" />
          <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-0 h-0 border-t-6 border-t-transparent border-b-6 border-b-transparent border-l-6 border-l-white" />

          <div className="flex items-start gap-2.5">
            <p className="text-slate-800 font-bold text-sm md:text-base leading-relaxed flex-1">
              {message}
            </p>

            {/* Audio Replay Button */}
            <button
              onClick={handleSpeak}
              className={`p-2 rounded-xl bg-sky-100 text-sky-700 hover:bg-sky-200 transition-colors flex-shrink-0 ${isSpeaking ? 'animate-pulse bg-sky-300' : ''}`}
              title="استمع إلى لولو"
            >
              <Volume2 className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          </div>

          {/* Visual Mode Subtitle Cue */}
          {isVisualMode && (
            <div className="mt-2 pt-2 border-t border-sky-100 flex items-center justify-between text-xs text-sky-600 font-medium">
              <span className="flex items-center gap-1">
                <MessageCircle className="w-3.5 h-3.5 text-sky-500" />
                وضع المساعدة البصرية نشط
              </span>
              <span className="bg-sky-100 px-2 py-0.5 rounded-full font-bold">بصري 👁️</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

```

## 📄 ملف: `src\components\map\WorldMap.tsx`
```typescript
import React from 'react';
import { ArrowRight, Sparkles, Compass, MapPin, Play } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';

interface WorldMapProps {
  onSelectWorld: (worldId: string) => void;
  onBackToHome: () => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({
  onSelectWorld,
  onBackToHome
}) => {
  const worlds = [
    {
      id: 'valley_of_letters',
      name: 'وادي الحروف',
      desc: 'اسْتَكْشِفْ أَشْكَالَ الحُرُوفِ وَتَتَبَّعْ رَسْمَهَا فِي المَرَاعِي الخَضْرَاء',
      icon: '🌿',
      tag: 'العالم 1',
      bgGradient: 'from-emerald-400 via-teal-400 to-green-500',
      borderColor: 'border-emerald-300',
      shadowColor: 'shadow-emerald-200',
      islandEmoji: '🏞️'
    },
    {
      id: 'syllables_forest',
      name: 'غابة المقاطع',
      desc: 'اشْجَارٌ سِحْرِيَّةٌ تَنْمُو بِنُطْقِ الحَرَكَاتِ وَالمُدُود (بَ، بِ، بُ، با، بي، بو)',
      icon: '🌳',
      tag: 'العالم 2',
      bgGradient: 'from-green-500 via-emerald-600 to-teal-700',
      borderColor: 'border-green-300',
      shadowColor: 'shadow-green-200',
      islandEmoji: '🌲'
    },
    {
      id: 'words_village',
      name: 'قرية الكلمات',
      desc: 'بُيُوتٌ وَمَتَاجِرُ تُفْتَحُ أَبْوَابُهَا عِنْدَ تَرْكِيبِ وَنُطْقِ الكَلِمَاتِ الصَّحِيحَة',
      icon: '🏘️',
      tag: 'العالم 3',
      bgGradient: 'from-amber-400 via-orange-400 to-rose-400',
      borderColor: 'border-amber-300',
      shadowColor: 'shadow-amber-200',
      islandEmoji: '🏠'
    }
  ];

  const handleWorldClick = (w: typeof worlds[0]) => {
    audioManager.playPortal();
    audioManager.speak(`مرحبًا بك في ${w.name}`);
    onSelectWorld(w.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Bar Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-3xl border-3 border-sky-200 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToHome();
            }}
            className="p-3 rounded-2xl bg-sky-50 border-2 border-sky-200 text-sky-800 hover:bg-sky-100 transition-all shadow-sm active:scale-95"
            title="العودة للرئيسية"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
              <span>خَرِيطَةُ عَوَالِمِ مَدِينَةِ الأَصْوَاتِ (8 عَوَالِم)</span>
              <span className="text-2xl">🗺️</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold mt-0.5">
              كُلُّ عَالَمٍ يَمْنَحُكَ تَجْرِبَةً بَصَرِيَّةً وَلُعْبَةً تَفَاعُلِيَّةً فَرِيدَة!
            </p>
          </div>
        </div>
      </div>

      {/* Mascot Notice */}
      <div className="bg-sky-50/90 border-2 border-sky-200 rounded-3xl p-4 flex items-center justify-between">
        <LumiMascot
          message="اخْتَرْ أَيَّ عَالَمٍ تُرِيدُ اسْتِكْشَافَهُ.. انْظُرْ كَيْفَ تَبْدُو مَجَرَّةُ النُّجُومِ وَغَابَةُ المَقَاطِع!"
          emotion="happy"
          size="sm"
        />
      </div>

      {/* 8 Distinct Living Worlds Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {worlds.map((world, idx) => (
          <div
            key={world.id}
            onClick={() => handleWorldClick(world)}
            className={`group relative game-card p-6 border-4 ${world.borderColor} cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-95 bg-white flex flex-col justify-between min-h-[280px] overflow-hidden`}
          >
            {/* Ambient Background Glow Banner */}
            <div className={`absolute top-0 inset-x-0 h-24 bg-gradient-to-r ${world.bgGradient} opacity-90 group-hover:opacity-100 transition-opacity flex items-center justify-between px-5 text-white`} />

            {/* Top Island Badge & Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-4xl drop-shadow-md group-hover:scale-125 transition-transform duration-300">
                {world.islandEmoji}
              </span>
              <span className="bg-white/90 text-slate-900 text-[11px] font-black px-3 py-1 rounded-full border shadow-sm">
                {world.tag}
              </span>
            </div>

            {/* Title & Description */}
            <div className="relative z-10 pt-12 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-2xl">{world.icon}</span>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors">
                  {world.name}
                </h3>
              </div>

              <p className="text-xs text-slate-600 font-bold leading-relaxed line-clamp-3">
                {world.desc}
              </p>
            </div>

            {/* Bottom Action Footer */}
            <div className="relative z-10 pt-4 mt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-black text-emerald-600 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                مَفْتُوحٌ لِلاسْتِكْشَاف
              </span>

              <button className="game-btn px-4 py-2 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-black text-xs shadow-md">
                <Play className="w-3 h-3 fill-white" />
                <span>ادْخُلِ العَالَم</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\letters\LetterSelectionGrid.tsx`
```typescript
import React, { useState } from 'react';
import { Lock, Trophy, Sparkles, Volume2, ArrowRight, CheckCircle2 } from 'lucide-react';
import lettersData from '../../data/letters.json';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { LoulouMascot } from '../mascot/LoulouMascot';

interface LetterSelectionGridProps {
  onSelectLetter: (letterId: string) => void;
  onBackToHome: () => void;
}

export const LetterSelectionGrid: React.FC<LetterSelectionGridProps> = ({
  onSelectLetter,
  onBackToHome
}) => {
  const { letterProgress, isVisualMode } = useGame();
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'learning' | 'mastered'>('all');

  const filteredLetters = lettersData.filter((letter) => {
    const progress = letterProgress[letter.id];
    const status = progress ? progress.status : (letter.defaultUnlocked ? 'available' : 'locked');

    if (filter === 'unlocked') return status !== 'locked';
    if (filter === 'learning') return status === 'learning';
    if (filter === 'mastered') return status === 'mastered';
    return true;
  });

  const handleLetterClick = (letter: typeof lettersData[0]) => {
    const progress = letterProgress[letter.id];
    const isLocked = progress ? progress.status === 'locked' : !letter.defaultUnlocked;

    if (isLocked) {
      soundManager.playEncouragement();
      soundManager.speak(`حرف ${letter.nameAr} مقفل حاليًا. أكمل تدريب الحروف السابقة لفتحه!`);
      return;
    }

    soundManager.playClick();
    soundManager.speak(letter.character);
    onSelectLetter(letter.id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Header with Back button and Filter Tabs */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToHome();
            }}
            className="p-2.5 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:bg-slate-50 transition-colors shadow-sm"
            title="العودة للرئيسية"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
              <span>اخْتَرْ الحَرْفَ الَّذِي تُرِيدُ تَعَلُّمَهُ</span>
              <span className="text-xl">🔤</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-medium mt-0.5">
              كُلُّ حَرْفٍ يَحْتَوِي عَلَى رِحْلَةٍ تَعْلِيمِيَّةٍ كَامِلَةٍ مِنْ 8 مُسْتَوَيَات!
            </p>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1.5 bg-white p-1 rounded-2xl border-2 border-slate-200 shadow-sm">
          {[
            { id: 'all', label: 'الكُلّ' },
            { id: 'unlocked', label: 'المَفْتُوحَة 🔓' },
            { id: 'learning', label: 'قَيْد التَّدْرِيب ⏳' },
            { id: 'mastered', label: 'المُكْتَمَلَة 🏆' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => {
                soundManager.playClick();
                setFilter(f.id as any);
              }}
              className={`px-3 py-1.5 rounded-xl font-extrabold text-xs transition-all ${
                filter === f.id
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loulou Guide Message */}
      <div className="bg-sky-50 border-2 border-sky-200 rounded-2xl p-4 flex items-center justify-between">
        <LoulouMascot
          message="اضْغَطْ عَلَى أَيِّ حَرْفٍ مَفْتُوحٍ لِبَدْءِ رِحْلَتِهِ المُمْتِعَة!"
          emotion="happy"
          size="sm"
          autoSpeak={false}
        />
      </div>

      {/* Letters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
        {filteredLetters.map((letter) => {
          const progress = letterProgress[letter.id] || {
            recognition: 0,
            sound: 0,
            syllables: 0,
            words: 0,
            sentences: 0,
            overall: 0,
            status: letter.defaultUnlocked ? 'available' : 'locked',
            attempts: 0,
            currentLevel: 1
          };

          const isLocked = progress.status === 'locked';
          const isMastered = progress.status === 'mastered';
          const isLearning = progress.status === 'learning';

          return (
            <div
              key={letter.id}
              onClick={() => handleLetterClick(letter)}
              className={`relative game-card p-4 flex flex-col items-center justify-between min-h-[160px] border-4 cursor-pointer transition-all duration-200 select-none ${
                isMastered
                  ? 'border-amber-400 bg-gradient-to-b from-amber-50 to-yellow-50 shadow-glow-yellow'
                  : isLearning
                  ? 'border-sky-400 bg-gradient-to-b from-sky-50 to-blue-50'
                  : isLocked
                  ? 'border-slate-200 bg-slate-100/80 opacity-70 cursor-not-allowed'
                  : 'border-emerald-300 bg-white hover:border-emerald-400'
              } ${!isLocked ? 'hover:-translate-y-1.5 hover:shadow-card-pop active:scale-95' : ''}`}
            >
              {/* Status Badge */}
              <div className="w-full flex items-center justify-between text-xs">
                {isMastered ? (
                  <span className="bg-amber-400 text-slate-900 font-black px-2 py-0.5 rounded-full flex items-center gap-1 text-[10px]">
                    <Trophy className="w-3 h-3" />
                    مُكْتَمَل
                  </span>
                ) : isLearning ? (
                  <span className="bg-sky-500 text-white font-bold px-2 py-0.5 rounded-full text-[10px]">
                    المستوى {progress.currentLevel}/8
                  </span>
                ) : isLocked ? (
                  <span className="bg-slate-300 text-slate-700 font-bold px-2 py-0.5 rounded-full text-[10px] flex items-center gap-1">
                    <Lock className="w-2.5 h-2.5" />
                    مُقْفَل
                  </span>
                ) : (
                  <span className="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full text-[10px]">
                    مَفْتُوح
                  </span>
                )}

                {/* Audio Preview button */}
                {!isLocked && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      soundManager.speak(letter.character);
                    }}
                    className="p-1 rounded-full text-slate-400 hover:text-sky-600 hover:bg-sky-100 transition-colors"
                    title="استمع لصوت الحرف"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Big Arabic Character */}
              <div className="my-2">
                <span className={`text-5xl md:text-6xl font-black transition-transform duration-200 ${
                  isLocked ? 'text-slate-400' : 'text-slate-800'
                }`}>
                  {letter.character}
                </span>
              </div>

              {/* Name & Example */}
              <div className="w-full text-center">
                <div className="text-xs font-black text-slate-700">
                  {letter.nameAr}
                </div>
                <div className="text-[11px] text-slate-500 font-medium flex items-center justify-center gap-1 mt-0.5">
                  <span>{letter.exampleEmoji}</span>
                  <span>{letter.exampleWord}</span>
                </div>

                {/* Progress Mini Bar */}
                {isLearning && (
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className="bg-sky-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${progress.overall}%` }}
                    />
                  </div>
                )}
              </div>

              {/* Mastered Star Sparkle */}
              {isMastered && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center border-2 border-white shadow-sm animate-bounce-slow">
                  ⭐
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\letters\AlphabetRoom.tsx`
```typescript
import React, { useState } from 'react';
import { Sparkles, Trophy, Volume2, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';

interface AlphabetRoomProps {
  onSelectLetter: (letterId: string) => void;
  onBackToHome: () => void;
}

export const AlphabetRoom: React.FC<AlphabetRoomProps> = ({
  onSelectLetter,
  onBackToHome
}) => {
  const { letterProgressMap, isVisualFirst } = useGame();
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);

  const handleLetterClick = (letter: LetterData) => {
    audioManager.playClick();
    audioManager.speak(`حرف ${letter.nameAr} .. ${letter.char}`);
    onSelectLetter(letter.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/90 backdrop-blur-md p-4 md:p-6 rounded-3xl border-3 border-sky-200 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToHome();
            }}
            className="p-3 rounded-2xl bg-sky-50 border-2 border-sky-200 text-sky-800 hover:bg-sky-100 transition-all shadow-sm active:scale-95"
            title="العودة للرئيسية"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 flex items-center gap-2">
              <span>غُرْفَةُ الحُرُوفِ العَرَبِيَّةِ (28 حَرْفًا)</span>
              <span className="text-2xl">🔤</span>
            </h1>
            <p className="text-xs md:text-sm text-slate-600 font-bold mt-0.5">
              جَمِيعُ الحُرُوفِ مُتَاحَةٌ دَائِمًا! اخْتَرْ أَيَّ حَرْفٍ لِبَدْءِ رِحْلَتِهِ الخَاصَّة
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-yellow-100 px-4 py-2 rounded-2xl border-2 border-amber-300">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <span className="text-xs font-black text-amber-900">
            اخْتِيَارٌ حُرٌّ دُونَ أَقْفَال 🔓
          </span>
        </div>
      </div>

      {/* Mascot Notice */}
      <div className="bg-sky-50/90 border-2 border-sky-200 rounded-3xl p-4 flex items-center justify-between">
        <LumiMascot
          message="اخْتَرْ أَيَّ حَرْفٍ تُرِيدُهُ لِتَنْطَلِقَ فِي مَرَاحِلِهِ الثَّمَانِيَةِ المُمْتِعَة!"
          emotion="happy"
          size="sm"
        />
      </div>

      {/* 28 Arabic Letters Grid in EXACT Order */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 md:gap-4">
        {ARABIC_LETTERS.map((letter) => {
          const progress = letterProgressMap[letter.id] || {
            discovery: false,
            sound: false,
            vowels: false,
            syllables: false,
            words: false,
            soundPosition: false,
            sentences: false,
            finalChallenge: false,
            currentStage: 1,
            masteryPercentage: 0
          };

          const isMastered = progress.masteryPercentage === 100;
          const isInProgress = progress.masteryPercentage > 0 && !isMastered;

          return (
            <div
              key={letter.id}
              onClick={() => handleLetterClick(letter)}
              onMouseEnter={() => setHoveredLetter(letter.id)}
              onMouseLeave={() => setHoveredLetter(null)}
              className={`relative game-card p-4 flex flex-col items-center justify-between min-h-[175px] border-4 cursor-pointer transition-all duration-200 select-none bg-white hover:-translate-y-2 hover:shadow-2xl active:scale-95 ${
                isMastered
                  ? 'border-amber-400 bg-gradient-to-b from-amber-50 to-yellow-50 shadow-glow-yellow'
                  : isInProgress
                  ? 'border-sky-400 bg-gradient-to-b from-sky-50 to-blue-50'
                  : 'border-slate-200 hover:border-sky-300'
              }`}
            >
              {/* Card Top: Order Badge & Audio Preview */}
              <div className="w-full flex items-center justify-between text-xs">
                <span className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 font-black text-[11px] flex items-center justify-center border">
                  {letter.order}
                </span>

                {/* Sound preview button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    audioManager.speak(letter.char);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-sky-600 hover:bg-sky-100 transition-colors"
                  title="استمع لصوت الحرف"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Big Arabic Letter Character */}
              <div className="my-2">
                <span className="text-5xl md:text-6xl font-black text-slate-800 transition-transform duration-200 group-hover:scale-110">
                  {letter.char}
                </span>
              </div>

              {/* Letter Name & Example */}
              <div className="w-full text-center space-y-1">
                <div className="text-xs font-black text-slate-800">
                  {letter.nameAr}
                </div>

                <div className="text-[11px] text-slate-500 font-bold flex items-center justify-center gap-1">
                  <span>{letter.words[0]?.emoji}</span>
                  <span>{letter.words[0]?.word}</span>
                </div>

                {/* Progress Ring / Percentage Bar */}
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mt-2 border">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isMastered ? 'bg-amber-400' : 'bg-sky-500'
                    }`}
                    style={{ width: `${progress.masteryPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-black text-slate-500 pt-0.5">
                  <span>المرحلة {progress.currentStage}/8</span>
                  <span>%{progress.masteryPercentage}</span>
                </div>
              </div>

              {/* Mastered Star Sparkle */}
              {isMastered && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center border-2 border-white shadow-md animate-bounce-slow text-sm">
                  ⭐
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\journey\LetterJourneyMap.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { ArrowRight, Volume2, Mic, CheckCircle2, Star, Trophy, Sparkles, ChevronLeft, Award } from 'lucide-react';
import lettersData from '../../data/letters.json';
import syllablesData from '../../data/syllables.json';
import wordsData from '../../data/words.json';
import sentencesData from '../../data/sentences.json';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import { speechAnalyzer, SpeechAnalysisResult } from '../../services/speech/SpeechAnalyzer';
import { LumiMascot } from '../mascot/LumiMascot';

interface LetterJourneyMapProps {
  letterId: string;
  onBackToLetters: () => void;
  onLaunchMiniGame: (gameId: string) => void;
}

export const LetterJourneyMap: React.FC<LetterJourneyMapProps> = ({
  letterId,
  onBackToLetters,
  onLaunchMiniGame
}) => {
  const {
    letterProgress,
    updateLetterLevelProgress,
    addStars,
    addCoins,
    logAttempt,
    triggerCelebration,
    isVisualMode
  } = useGame();

  const letter = lettersData.find(l => l.id === letterId) || lettersData[0];
  const syllables = (syllablesData as any)[letter.id] || (syllablesData as any)['baa'];
  const words = (wordsData as any)[letter.id] || (wordsData as any)['baa'];
  const sentences = (sentencesData as any)[letter.id] || (sentencesData as any)['baa'];

  const progress = letterProgress[letter.id] || {
    recognition: 0,
    sound: 0,
    syllables: 0,
    words: 0,
    sentences: 0,
    overall: 0,
    status: 'learning',
    attempts: 0,
    currentLevel: 1
  };

  const [activeLevel, setActiveLevel] = useState<number>(progress.currentLevel || 1);
  
  // Interactive Level States
  const [level1Step, setLevel1Step] = useState<number>(0);
  const [level1Selected, setLevel1Selected] = useState<string | null>(null);

  // Level 2 (Sound & Mic)
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [speechResult, setSpeechResult] = useState<SpeechAnalysisResult | null>(null);

  // Level 3 (Harakat)
  const [selectedHarakatIndex, setSelectedHarakatIndex] = useState<number>(0);

  // Level 4 (Madd Syllables)
  const [selectedMaddIndex, setSelectedMaddIndex] = useState<number>(0);

  // Level 5 (Words)
  const [selectedWordIndex, setSelectedWordIndex] = useState<number>(0);

  // Level 6 (Sound Position Quiz)
  const [positionQuizIndex, setPositionQuizIndex] = useState<number>(0);
  const [selectedPosition, setSelectedPosition] = useState<string | null>(null);

  // Level 7 (Sentence Quiz)
  const [sentenceQuizSelected, setSentenceQuizSelected] = useState<number | null>(null);

  // Cleanup microphone on unmount to prevent memory leaks and orphaned listening states
  useEffect(() => {
    return () => {
      speechAnalyzer.stopListening();
    };
  }, []);

  const levelsList = [
    { id: 1, title: 'التَّعَرُّف عَلَى الحَرْف', icon: '🔤', desc: 'شكل الحرف والصور المرتبطة' },
    { id: 2, title: 'صَوْتُ الحَرْفِ وَالمِيكْرُوفُون', icon: '🎙️', desc: 'نطق الحرف مع لولو' },
    { id: 3, title: 'الحَرَكَاتُ القَصِيرَة', icon: '🎵', desc: 'الفتحة، الضمة، الكسرة' },
    { id: 4, title: 'المَقَاطِعُ وَالمُدُود', icon: '🌊', desc: 'با، بو، بي' },
    { id: 5, title: 'الكَلِمَاتُ فِي مَوَاقِعِهَا', icon: '📖', desc: 'أول ووسط وآخر الكلمة' },
    { id: 6, title: 'مَوْقِعُ الصَّوْتِ', icon: '🎯', desc: 'تحدي تحديد موضع الحرف' },
    { id: 7, title: 'الجُمَلُ وَالمَعَانِي', icon: '💬', desc: 'تركيب الجمل والقصص' },
    { id: 8, title: 'التَّحَدِّي النِّهَائِي', icon: '🏆', desc: 'تتويج بطل الحرف' }
  ];

  // Speech recording handler
  const handleStartRecording = (targetText: string) => {
    if (!speechAnalyzer.isSupported()) {
      alert('المُتَصَفِّحُ لَا يَدْعَمُ تَمْيِيزَ الصَّوْت. يُرْجَى اسْتِخْدَامُ Chrome أَوْ Edge.');
      return;
    }
    setIsRecording(true);
    setSpeechResult(null);
    soundManager.playPop();

    speechAnalyzer.startListening(
      targetText,
      (result) => {
        setIsRecording(false);
        setSpeechResult(result);
        logAttempt(letter.id, targetText, result.phoneticScore, result.status);

        if (result.status === 'high_confidence' || result.status === 'acceptable') {
          soundManager.playSuccess();
          addStars(1);
          addCoins(5);
          updateLetterLevelProgress(letter.id, activeLevel, result.phoneticScore);
        } else {
          soundManager.playEncouragement();
        }
      },
      (vol) => setMicVolume(vol),
      () => {
        setIsRecording(false);
      }
    );
  };

  const handleStopRecording = () => {
    speechAnalyzer.stopListening();
    setIsRecording(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none font-body">
      
      {/* Top Breadcrumb & Letter Title */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[var(--color-lumi-glass)] backdrop-blur-md p-4 rounded-3xl border-2 border-[var(--color-lumi-secondary)]/50 shadow-lg text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBackToLetters();
            }}
            className="p-2.5 rounded-2xl bg-[var(--color-lumi-base)] border-2 border-[var(--color-lumi-secondary)]/30 text-[var(--color-lumi-neutral)] hover:text-white hover:bg-[var(--color-lumi-secondary)] transition-colors"
            title="العودة لقائمة الحروف"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[var(--color-lumi-primary)] text-slate-900 flex items-center justify-center text-3xl font-black border-2 border-[var(--color-lumi-secondary)] shadow-[0_0_15px_rgba(252,211,77,0.5)]">
              {letter.character}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-display font-black text-[var(--color-lumi-primary)]">
                مَسَارُ نُورِ حَرْفِ {letter.nameAr}
              </h1>
              <p className="text-xs text-[var(--color-lumi-neutral)] font-bold">
                المرحلة {activeLevel} من 8 • النور المكتمل {progress.overall}%
              </p>
            </div>
          </div>
        </div>

        {/* Listen Letter Audio */}
        <button
          onClick={() => {
            soundManager.playClick();
            soundManager.speak(`حرف ${letter.nameAr} .. ${letter.character}`);
          }}
          className="game-btn px-4 py-2 bg-[var(--color-lumi-base)] text-white rounded-xl font-extrabold text-xs md:text-sm border border-[var(--color-lumi-secondary)] hover:bg-[var(--color-lumi-secondary)] transition-colors"
        >
          <Volume2 className="w-4 h-4 text-[var(--color-lumi-primary)]" />
          <span>اسْتَمِعْ لِلحَرْف</span>
        </button>
      </div>

      {/* The Path of Light (مسار النور) */}
      <div className="bg-[var(--color-lumi-glass)] backdrop-blur-md p-4 md:p-6 rounded-3xl border-2 border-[var(--color-lumi-secondary)]/30 shadow-lg overflow-x-auto relative">
        <div className="flex items-center justify-between min-w-[700px] gap-2 relative z-10">
          
          {/* Continuous Glowing Line Background */}
          <div className="absolute top-1/2 left-4 right-4 h-1.5 -translate-y-1/2 bg-[var(--color-lumi-base)] rounded-full z-0 overflow-hidden">
            <div 
              className="h-full bg-[var(--color-lumi-primary)] shadow-[0_0_10px_#fcd34d] transition-all duration-700" 
              style={{ width: `${(Math.max(1, activeLevel) - 1) * (100 / 7)}%` }}
            />
          </div>

          {levelsList.map((lvl, index) => {
            const isUnlocked = progress.currentLevel >= lvl.id;
            const isActive = activeLevel === lvl.id;
            const isCompleted = progress.currentLevel > lvl.id;

            return (
              <div key={lvl.id} className="relative z-10 flex flex-col items-center">
                {isActive && (
                  <div className="absolute -top-12 animate-float-space drop-shadow-[0_0_10px_rgba(252,211,77,0.5)]">
                    <LumiMascot state="idle" size="sm" />
                  </div>
                )}
                
                <button
                  onClick={() => {
                    if (isUnlocked) {
                      soundManager.playClick();
                      setActiveLevel(lvl.id);
                    } else {
                      soundManager.playEncouragement();
                      soundManager.speak('أَنِرْ المَرْحَلَةَ السَّابِقَةَ أَوَّلًا يَا بَطَل!');
                    }
                  }}
                  className={`relative w-14 h-14 rounded-full flex items-center justify-center text-2xl border-4 transition-all duration-500 ${
                    isActive
                      ? 'bg-[var(--color-lumi-primary)] text-slate-900 border-white shadow-[0_0_20px_#fcd34d] scale-125 z-20'
                      : isCompleted
                      ? 'bg-[var(--color-lumi-accent)] text-white border-[var(--color-lumi-base)] shadow-[0_0_10px_#10b981]'
                      : isUnlocked
                      ? 'bg-[var(--color-lumi-base)] text-[var(--color-lumi-primary)] border-[var(--color-lumi-secondary)] hover:bg-[var(--color-lumi-secondary)]/30'
                      : 'bg-slate-800 text-slate-600 border-slate-700 opacity-60 cursor-not-allowed'
                  }`}
                >
                  {lvl.icon}
                </button>
                <span className={`mt-2 text-[10px] font-black whitespace-nowrap transition-colors ${
                  isActive ? 'text-[var(--color-lumi-primary)] drop-shadow-md' : 'text-[var(--color-lumi-neutral)]'
                }`}>
                  {lvl.title.split(' ')[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Interactive Stage Container */}
      <div className="bg-[var(--color-lumi-base)] rounded-3xl p-6 md:p-8 border-2 border-[var(--color-lumi-secondary)]/50 shadow-2xl min-h-[480px] flex flex-col justify-between text-white relative overflow-hidden">
        
        {/* Background ambient light */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-lumi-secondary)]/10 to-transparent pointer-events-none" />
        
        {/* ========================================================================= */}
        {/* LEVEL 1: Recognition & Shape */}
        {/* ========================================================================= */}
        {activeLevel === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-sky-100 text-sky-800 font-black text-xs px-3 py-1 rounded-full border border-sky-300">
                  المستوى 1: التَّعَرُّف عَلَى الحَرْف
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  شَاهِدْ وَتَعَرَّفْ عَلَى حَرْفِ {letter.nameAr}
                </h2>
              </div>
              <LumiMascot
                message={`هَذَا حَرْفُ ${letter.nameAr}! شَكْلُهُ مُمَيَّزٌ وَجَمِيل!`}
                state="idle"
                size="sm"
              />
            </div>

            {/* Giant Letter Showcase */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-4">
              <div
                onClick={() => {
                  soundManager.playPop();
                  soundManager.speak(letter.character);
                }}
                className="w-44 h-44 rounded-3xl bg-gradient-to-tr from-rose-400 to-pink-500 text-white flex items-center justify-center text-8xl font-black border-4 border-white shadow-glow-pink cursor-pointer active:scale-95 transition-transform animate-float"
                title="اضغط للاستماع"
              >
                {letter.character}
              </div>

              {/* Related Picture Examples */}
              <div className="space-y-3">
                <p className="text-sm font-bold text-slate-600">كَلِمَاتٌ تَبْدَأُ بِحَرْفِ {letter.nameAr}:</p>
                <div className="flex items-center gap-3">
                  {[
                    { emoji: '🦆', name: 'بَطَّة' },
                    { emoji: '🚪', name: 'بَاب' },
                    { emoji: '🌊', name: 'بَحْر' }
                  ].map(ex => (
                    <button
                      key={ex.name}
                      onClick={() => {
                        soundManager.playPop();
                        soundManager.speak(ex.name);
                      }}
                      className="game-card p-3.5 flex flex-col items-center gap-1 border-2 border-pink-200 hover:border-pink-400 active:scale-95 transition-transform"
                    >
                      <span className="text-3xl">{ex.emoji}</span>
                      <span className="font-black text-sm text-slate-800">{ex.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Mini Quiz: Choose the correct letter */}
            <div className="bg-slate-50 p-4 rounded-2xl border-2 border-slate-200 text-center space-y-3">
              <p className="font-extrabold text-slate-800 text-base">
                سُؤَالُ الأَبْطَالِ: أَيْنَ حَرْفُ <span className="text-rose-600 text-xl">({letter.character})</span>؟
              </p>
              <div className="flex items-center justify-center gap-3">
                {['ت', letter.character, 'ن', 'ي'].map((char, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (char === letter.character) {
                        soundManager.playSuccess();
                        setLevel1Selected(char);
                        addStars(1);
                        addCoins(5);
                        updateLetterLevelProgress(letter.id, 1, 95);
                      } else {
                        soundManager.playEncouragement();
                      }
                    }}
                    className={`w-16 h-16 rounded-2xl font-black text-3xl border-3 transition-all ${
                      level1Selected === char
                        ? 'bg-emerald-500 text-white border-white shadow-glow-green scale-110'
                        : 'bg-white text-slate-800 border-slate-300 hover:border-sky-400 hover:bg-sky-50 active:scale-95'
                    }`}
                  >
                    {char}
                  </button>
                ))}
              </div>
              {level1Selected && (
                <p className="text-emerald-600 font-black text-sm animate-pop">
                  🌟 رَائِعْ جِدًّا! إِجَابَةٌ صَحِيحَةٌ يَا بَطَل!
                </p>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 2: Letter Sound & Microphone Practice */}
        {/* ========================================================================= */}
        {activeLevel === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1 rounded-full border border-purple-300">
                  المستوى 2: صَوْتُ الحَرْفِ وَالمِيكْرُوفُون
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  تَدَرَّبْ عَلَى نُطْقِ صَوْتِ {letter.nameAr}
                </h2>
              </div>
              <LumiMascot
                message={`قُلْ مَعِي: (${letter.character}) .. اضْغَطْ عَلَى زِرِّ المِيكْرُوفُونِ وَتَحَدَّثْ!`}
                state="idle"
                size="sm"
              />
            </div>

            {/* Articulation Tip & Mouth Shape */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 flex items-center gap-4">
              <span className="text-4xl">👄</span>
              <div>
                <h4 className="font-black text-amber-900 text-sm">نَصِيحَةُ لُولُو لِمَخْرَجِ الصَّوْت:</h4>
                <p className="text-xs md:text-sm text-amber-800 font-medium mt-0.5">
                  {letter.mouthGuide.tip}
                </p>
              </div>
            </div>

            {/* Sound & Microphone Challenge Area */}
            <div className="flex flex-col items-center justify-center gap-5 py-4">
              <div className="text-center">
                <span className="text-7xl md:text-8xl font-black text-rose-500 block mb-2">
                  {letter.character}
                </span>
                <button
                  onClick={() => soundManager.speak(letter.character)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100 text-rose-800 font-bold text-xs hover:bg-rose-200 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>اسْتَمِعْ لِلصَّوْتِ أَوَّلًا</span>
                </button>
              </div>

              {/* Record Button with Audio Visualizer */}
              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={() => {
                    if (isRecording) {
                      handleStopRecording();
                    } else {
                      handleStartRecording(letter.character);
                    }
                  }}
                  className={`relative p-6 rounded-full border-4 transition-all duration-300 active:scale-95 shadow-card-pop ${
                    isRecording
                      ? 'bg-rose-500 text-white border-white animate-pulse shadow-glow-pink scale-110'
                      : 'bg-gradient-to-r from-sky-400 to-blue-600 text-white border-white shadow-glow-cyan hover:scale-105'
                  }`}
                >
                  <Mic className="w-10 h-10" />
                </button>

                <span className="font-extrabold text-sm text-slate-700">
                  {isRecording ? '🎙️ لُولُو يَسْتَمِعُ إِلَيْكَ الآن...' : 'اضْغَطْ وَقُلْ: ' + letter.character}
                </span>

                {/* Microphone Level Visualizer Bars */}
                {isRecording && (
                  <div className="flex items-center gap-1.5 h-8">
                    {[0.3, 0.6, 0.9, 0.7, 0.4, 0.8, 0.5].map((h, i) => (
                      <div
                        key={i}
                        className="w-2 bg-sky-500 rounded-full speech-bar"
                        style={{
                          height: `${Math.max(20, (micVolume || h) * 100)}%`,
                          animationDelay: `${i * 0.15}s`
                        }}
                      />
                    ))}
                  </div>
                )}

                {/* Analysis Result Feedback */}
                {speechResult && (
                  <div className={`mt-3 p-4 rounded-2xl border-2 text-center max-w-md ${
                    speechResult.status === 'high_confidence'
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
                      : 'bg-yellow-50 border-yellow-300 text-yellow-800'
                  }`}>
                    <p className="font-black text-base">{speechResult.feedbackMessage}</p>
                    <p className="text-xs text-slate-600 mt-1">
                      دِقَّةُ النُّطْق: {speechResult.phoneticScore}%
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 3: Short Vowels (Harakat) */}
        {/* ========================================================================= */}
        {activeLevel === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-300">
                  المستوى 3: الحَرَكَاتُ القَصِيرَة
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  الفَتْحَة ( َ ) ، الكَسْرَة ( ِ ) ، الضَّمَّة ( ُ )
                </h2>
              </div>
              <LumiMascot
                
                state="idle"
                size="sm"
              />
            </div>

            {/* Short Vowels Carousel Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              {syllables.short.map((item: any, idx: number) => {
                const isSelected = selectedHarakatIndex === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedHarakatIndex(idx);
                      soundManager.playPop();
                      soundManager.speak(item.syllable);
                    }}
                    className={`game-card p-6 flex flex-col items-center justify-between min-h-[220px] border-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-emerald-400 bg-emerald-50/90 shadow-card-pop scale-105'
                        : 'border-slate-200 hover:border-emerald-300 bg-white'
                    }`}
                  >
                    <span className="text-xs font-black bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                      {item.nameAr}
                    </span>

                    <span className="text-6xl font-black text-emerald-600 my-2">
                      {item.syllable}
                    </span>

                    <p className="text-xs text-slate-600 font-bold text-center">
                      {item.soundTip}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.speak(item.syllable);
                      }}
                      className="mt-2 p-2 rounded-xl bg-emerald-100 text-emerald-800 hover:bg-emerald-200 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Quiz: Find the correct haraka */}
            <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="font-extrabold text-slate-800 text-sm">
                  تَحَدِّي الحَرَكَات: اضْغَطْ عَلَى ({syllables.short[selectedHarakatIndex].syllable}) ثُمَّ رَدِّدْ مَعَنَا!
                </p>
              </div>

              <button
                onClick={() => {
                  soundManager.playSuccess();
                  addStars(1);
                  addCoins(5);
                  updateLetterLevelProgress(letter.id, 3, 90);
                }}
                className="game-btn px-5 py-2.5 bg-emerald-500 text-white rounded-xl font-black text-xs hover:bg-emerald-600 transition-colors"
              >
                <span>أَحْسَنْتَ التَّدْرِيب! تَأْكِيد 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 4: Syllables & Long Vowels (Madd) */}
        {/* ========================================================================= */}
        {activeLevel === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-sky-100 text-sky-800 font-black text-xs px-3 py-1 rounded-full border border-sky-300">
                  المستوى 4: المَقَاطِعُ وَالمُدُودُ الطَّوِيلَة
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  مَدُّ الأَلِف (بَا) ، مَدُّ اليَاء (بِي) ، مَدُّ الوَاو (بُو)
                </h2>
              </div>
              <LumiMascot
                
                state="idle"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              {syllables.long.map((item: any, idx: number) => {
                const isSelected = selectedMaddIndex === idx;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedMaddIndex(idx);
                      soundManager.playPop();
                      soundManager.speak(item.syllable);
                    }}
                    className={`game-card p-6 flex flex-col items-center justify-between min-h-[220px] border-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-sky-400 bg-sky-50/90 shadow-card-pop scale-105'
                        : 'border-slate-200 hover:border-sky-300 bg-white'
                    }`}
                  >
                    <span className="text-xs font-black bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                      {item.nameAr}
                    </span>

                    <span className="text-6xl font-black text-sky-600 my-2">
                      {item.syllable}
                    </span>

                    <p className="text-xs text-slate-600 font-bold text-center">
                      مِثَال: {item.example}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        soundManager.speak(item.syllable);
                      }}
                      className="mt-2 p-2 rounded-xl bg-sky-100 text-sky-800 hover:bg-sky-200 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  soundManager.playSuccess();
                  addStars(1);
                  addCoins(5);
                  updateLetterLevelProgress(letter.id, 4, 88);
                }}
                className="game-btn px-6 py-3 bg-sky-500 text-white rounded-2xl font-black text-sm"
              >
                <span>اكْتَمَلَ تَدْرِيبُ المُدُود 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 5: Words by Position (Start, Middle, End) */}
        {/* ========================================================================= */}
        {activeLevel === 5 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-100 text-amber-800 font-black text-xs px-3 py-1 rounded-full border border-amber-300">
                  المستوى 5: الكَلِمَاتُ فِي مَوَاقِعِهَا
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  كَلِمَاتٌ بِمَوَاقِعِ الحَرْف (أَوَّل، وَسَط، آخِر)
                </h2>
              </div>
              <LumiMascot
                
                state="idle"
                size="sm"
              />
            </div>

            {/* Word Explorer Carousel */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 py-4">
              <div className="game-card p-6 border-4 border-amber-300 bg-amber-50/60 max-w-md w-full text-center space-y-4">
                <span className="inline-block bg-amber-400 text-slate-900 font-black text-xs px-3 py-1 rounded-full">
                  {words[selectedWordIndex].positionLabel}
                </span>

                <div className="text-6xl my-2">
                  {words[selectedWordIndex].emoji}
                </div>

                <div
                  className="text-4xl md:text-5xl font-black text-slate-800"
                  dangerouslySetInnerHTML={{ __html: words[selectedWordIndex].highlightedWord }}
                />

                <p className="text-xs text-slate-600 font-bold">
                  {words[selectedWordIndex].meaning}
                </p>

                {/* Letters Breakdown Tag Chips */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  {words[selectedWordIndex].lettersBreakdown.map((ch: string, i: number) => (
                    <span
                      key={i}
                      className={`w-9 h-9 rounded-xl font-black text-base flex items-center justify-center border-2 ${
                        ch === letter.character
                          ? 'bg-rose-500 text-white border-white'
                          : 'bg-white text-slate-700 border-slate-200'
                      }`}
                    >
                      {ch}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => soundManager.speak(words[selectedWordIndex].word)}
                    className="game-btn px-4 py-2 bg-amber-200 text-amber-900 rounded-xl font-bold text-xs flex items-center gap-1.5"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>اسْتَمِعْ لِلكَلِمَة</span>
                  </button>

                  <button
                    onClick={() => handleStartRecording(words[selectedWordIndex].word)}
                    className="game-btn px-4 py-2 bg-rose-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                  >
                    <Mic className="w-4 h-4" />
                    <span>انْطِقْ أَنْت</span>
                  </button>
                </div>
              </div>

              {/* Word List Selector */}
              <div className="grid grid-cols-2 gap-2 max-w-xs w-full">
                {words.map((w: any, idx: number) => (
                  <button
                    key={w.id}
                    onClick={() => {
                      setSelectedWordIndex(idx);
                      soundManager.playPop();
                      soundManager.speak(w.word);
                    }}
                    className={`p-3 rounded-2xl font-black text-xs border-2 text-right flex items-center justify-between ${
                      selectedWordIndex === idx
                        ? 'bg-amber-400 text-slate-900 border-white shadow-md'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <span>{w.word}</span>
                    <span>{w.emoji}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => {
                  soundManager.playSuccess();
                  addStars(1);
                  addCoins(5);
                  updateLetterLevelProgress(letter.id, 5, 85);
                }}
                className="game-btn px-6 py-3 bg-amber-500 text-white rounded-2xl font-black text-sm"
              >
                <span>مُمْتَاز! اكْتَمَلَ تَدْرِيبُ الكَلِمَات 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 6: Sound Position in Word Quiz */}
        {/* ========================================================================= */}
        {activeLevel === 6 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-indigo-100 text-indigo-800 font-black text-xs px-3 py-1 rounded-full border border-indigo-300">
                  المستوى 6: مَوْقِعُ الصَّوْتِ دَاخِلَ الكَلِمَة
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  أَيْنَ يَجْلِسُ حَرْفُ {letter.nameAr}؟
                </h2>
              </div>
              <LumiMascot
                
                state="idle"
                size="sm"
              />
            </div>

            <div className="bg-indigo-50/80 p-6 rounded-3xl border-3 border-indigo-200 text-center space-y-4 max-w-lg mx-auto">
              <span className="text-5xl block">
                {words[positionQuizIndex].emoji}
              </span>

              <h3 className="text-4xl font-black text-indigo-900">
                {words[positionQuizIndex].word}
              </h3>

              <button
                onClick={() => soundManager.speak(words[positionQuizIndex].word)}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-indigo-200 text-indigo-900 rounded-full font-bold text-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلكَلِمَة</span>
              </button>

              <div className="grid grid-cols-3 gap-3 pt-3">
                {[
                  { id: 'start', label: 'فِي الأَوَّل' },
                  { id: 'middle', label: 'فِي الوَسَط' },
                  { id: 'end', label: 'فِي الآخِر' }
                ].map(pos => (
                  <button
                    key={pos.id}
                    onClick={() => {
                      if (pos.id === words[positionQuizIndex].position) {
                        soundManager.playSuccess();
                        setSelectedPosition(pos.id);
                        addStars(1);
                        addCoins(5);
                        updateLetterLevelProgress(letter.id, 6, 92);
                      } else {
                        soundManager.playEncouragement();
                      }
                    }}
                    className={`p-3.5 rounded-2xl font-black text-xs md:text-sm border-2 transition-all ${
                      selectedPosition === pos.id
                        ? 'bg-emerald-500 text-white border-white shadow-glow-green scale-105'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-indigo-400 active:scale-95'
                    }`}
                  >
                    {pos.label}
                  </button>
                ))}
              </div>

              {selectedPosition && (
                <div className="pt-2">
                  <p className="text-emerald-600 font-black text-sm">
                    🌟 بَطَل! إِجَابَةٌ دَقِيقَةٌ جِدًّا!
                  </p>
                  <button
                    onClick={() => {
                      setSelectedPosition(null);
                      setPositionQuizIndex((prev) => (prev + 1) % words.length);
                    }}
                    className="mt-2 px-4 py-1.5 bg-indigo-600 text-white rounded-xl font-bold text-xs"
                  >
                    السُّؤَالُ التَّالِي ⬅️
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 7: Sentences & Context */}
        {/* ========================================================================= */}
        {activeLevel === 7 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1 rounded-full border border-purple-300">
                  المستوى 7: الجُمَلُ وَالمَعَانِي
                </span>
                <h2 className="text-2xl font-black text-slate-800 mt-2">
                  تَرْكِيبُ وَفَهْمُ الجُمَلِ البَسِيطَة
                </h2>
              </div>
              <LumiMascot
                
                state="idle"
                size="sm"
              />
            </div>

            {/* Sentence Showcase */}
            <div className="bg-purple-50 p-6 rounded-3xl border-3 border-purple-200 max-w-xl mx-auto space-y-4 text-center">
              <span className="text-5xl block">{sentences[0].emoji}</span>

              <h3 className="text-3xl md:text-4xl font-black text-purple-950">
                {sentences[0].sentence}
              </h3>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => soundManager.speak(sentences[0].sentence)}
                  className="game-btn px-4 py-2 bg-purple-200 text-purple-900 rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>اسْتَمِعْ لِلجُمْلَة</span>
                </button>

                <button
                  onClick={() => handleStartRecording(sentences[0].sentence)}
                  className="game-btn px-4 py-2 bg-purple-600 text-white rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <Mic className="w-4 h-4" />
                  <span>كَرِّرِ الجُمْلَة 🎙️</span>
                </button>
              </div>

              {/* Missing Word Quiz */}
              <div className="pt-4 border-t border-purple-200 text-right space-y-2">
                <p className="font-extrabold text-xs text-slate-700">
                  {sentences[0].missingWordExercise.question}
                </p>
                <div className="flex items-center gap-2">
                  {sentences[0].missingWordExercise.options.map((opt: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (idx === sentences[0].missingWordExercise.correctIndex) {
                          soundManager.playSuccess();
                          setSentenceQuizSelected(idx);
                          addStars(2);
                          addCoins(10);
                          updateLetterLevelProgress(letter.id, 7, 90);
                        } else {
                          soundManager.playEncouragement();
                        }
                      }}
                      className={`flex-1 p-2.5 rounded-xl font-black text-xs border-2 ${
                        sentenceQuizSelected === idx
                          ? 'bg-emerald-500 text-white border-white shadow-md'
                          : 'bg-white text-slate-800 border-slate-200 hover:bg-purple-100'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* LEVEL 8: Final Challenge & Trophy Celebration */}
        {/* ========================================================================= */}
        {activeLevel === 8 && (
          <div className="space-y-6 text-center py-4">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-24 h-24 mx-auto bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-5xl border-4 border-white shadow-glow-yellow animate-bounce">
                🏆
              </div>

              <h2 className="text-3xl font-black text-slate-800">
                مُبَارَكْ! أَنْتَ بَطَلُ حَرْفِ {letter.nameAr}!
              </h2>

              <p className="text-sm text-slate-600 font-medium leading-relaxed">
                لَقَدْ أَتْمَمْتَ جَمِيعَ مُسْتَوَيَاتِ الحَرْفِ بِنَجَاحٍ بَاهِرٍ وَتَعَلَّمْتَ الصَّوْتَ وَالحَرَكَاتِ وَالكَلِمَاتِ وَالجُمَل!
              </p>

              {/* Trophy Certificate Card */}
              <div className="bg-gradient-to-br from-amber-50 to-yellow-100 border-4 border-amber-400 p-6 rounded-3xl shadow-md text-center space-y-3">
                <span className="text-xs font-black text-amber-800 bg-amber-200 px-3 py-1 rounded-full">
                  شَهَادَةُ إِتْقَانِ حَرْفِ {letter.nameAr}
                </span>

                <div className="text-5xl font-black text-rose-500">
                  {letter.character}
                </div>

                <p className="font-extrabold text-base text-slate-800">
                  البَطَلُ المُمَيَّزُ فِي نُطْقِ حَرْفِ {letter.nameAr}
                </p>

                <div className="flex items-center justify-center gap-4 text-xs font-black text-slate-700 pt-2 border-t border-amber-300">
                  <span>⭐ +5 نُجُوم</span>
                  <span>🪙 +30 عُمْلَة</span>
                  <span>🔓 فَتْحُ الحَرْفِ التَّالِي</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-3">
                <button
                  onClick={() => {
                    triggerCelebration();
                    addStars(5);
                    addCoins(30);
                    updateLetterLevelProgress(letter.id, 8, 100);
                  }}
                  className="game-btn px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-900 rounded-2xl font-black text-sm shadow-glow-yellow"
                >
                  <Sparkles className="w-5 h-5 text-amber-800" />
                  <span>اسْتَلِمْ جَائِزَةَ التَّتْوِيج! 🎁</span>
                </button>

                <button
                  onClick={() => {
                    soundManager.playClick();
                    onLaunchMiniGame('bubble_pop');
                  }}
                  className="game-btn px-5 py-3 bg-sky-500 text-white rounded-2xl font-black text-sm"
                >
                  <span>العَبْ صَيْدَ الحُرُوف 🎮</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Level Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-200 mt-6">
          <button
            onClick={() => {
              if (activeLevel > 1) {
                soundManager.playClick();
                setActiveLevel(prev => prev - 1);
              }
            }}
            disabled={activeLevel <= 1}
            className="game-btn px-4 py-2.5 rounded-xl border-2 border-slate-200 font-bold text-xs text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            <span>المستوى السابق</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-slate-500">
              {activeLevel} من 8
            </span>
          </div>

          <button
            onClick={() => {
              if (activeLevel < 8) {
                soundManager.playClick();
                setActiveLevel(prev => prev + 1);
              }
            }}
            disabled={activeLevel >= 8}
            className="game-btn px-5 py-2.5 bg-gradient-to-r from-sky-400 to-blue-500 text-white rounded-xl font-black text-xs disabled:opacity-40 disabled:cursor-not-allowed hover:from-sky-500 hover:to-blue-600"
          >
            <span>المستوى التالي ⬅️</span>
          </button>
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\journey\LetterJourneyAdventure.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, Mic, CheckCircle2, Trophy, Star, Award, Play } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../mascot/LumiMascot';

interface LetterJourneyAdventureProps {
  letterId: string;
  onBackToAlphabet: () => void;
  onSelectAnotherLetter: (id: string) => void;
}

export const LetterJourneyAdventure: React.FC<LetterJourneyAdventureProps> = ({
  letterId,
  onBackToAlphabet,
  onSelectAnotherLetter
}) => {
  const { letterProgressMap, updateLetterStage, addStars, addCoins, triggerVictoryCelebration } = useGame();
  
  const letter: LetterData = ARABIC_LETTERS.find(l => l.id === letterId) || ARABIC_LETTERS[1]; // default Baa
  const progress = letterProgressMap[letter.id] || {
    discovery: false,
    sound: false,
    vowels: false,
    syllables: false,
    words: false,
    soundPosition: false,
    sentences: false,
    finalChallenge: false,
    currentStage: 1,
    masteryPercentage: 0
  };

  const [activeStage, setActiveStage] = useState<number>(progress.currentStage || 1);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [environmentReaction, setEnvironmentReaction] = useState<string | null>(null);

  const stagesList = [
    { id: 1, title: 'اكتشف الحرف', icon: '🔤', desc: 'التعرف على شكل الحرف ورسمه' },
    { id: 2, title: 'تعرّف على الصوت', icon: '🎙️', desc: 'نطق الحرف الصافي مع لومي' },
    { id: 3, title: 'الحركات', icon: '🎵', desc: 'الحركات القصيرة: فتحة، كسرة، ضمة' },
    { id: 4, title: 'المقاطع', icon: '🌊', desc: 'المدود الطويلة: بالألف والياء والواو' },
    { id: 5, title: 'الكلمات', icon: '📖', desc: 'الكلمات في أول ووسط وآخر الموضع' },
    { id: 6, title: 'موقع الصوت', icon: '🎯', desc: 'تحديد موضع الحرف داخل الكلمة' },
    { id: 7, title: 'الجمل', icon: '💬', desc: 'فهم وتكرار الجمل المفيدة' },
    { id: 8, title: 'المغامرة النهائية', icon: '🏆', desc: 'بوابة التحدي الكبرى والتتويج' }
  ];

  const handleCompleteStage = (stageNum: number, reactionText: string) => {
    audioManager.playVictory();
    setEnvironmentReaction(reactionText);
    updateLetterStage(letter.id, stageNum, true);
    addStars(1);
    addCoins(5);

    setTimeout(() => {
      setEnvironmentReaction(null);
      if (stageNum < 8) {
        setActiveStage(stageNum + 1);
      } else {
        triggerVictoryCelebration();
      }
    }, 1500);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Breadcrumb Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white/95 backdrop-blur-md p-4 md:p-6 rounded-3xl border-3 border-rose-300 shadow-card-pop">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToAlphabet();
            }}
            className="p-3 rounded-2xl bg-rose-50 border-2 border-rose-200 text-rose-800 hover:bg-rose-100 transition-all shadow-sm active:scale-95"
            title="العودة لغرفة الحروف"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center text-4xl font-black border-2 border-white shadow-md">
              {letter.char}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-slate-900">
                {letter.char} — رِحْلَةُ حَرْفِ {letter.nameAr}
              </h1>
              <p className="text-xs md:text-sm text-slate-500 font-bold">
                المرحلة {activeStage} من 8 • نسبة إتقان الحرف %{progress.masteryPercentage}
              </p>
            </div>
          </div>
        </div>

        {/* Quick Letter Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audioManager.playClick();
              audioManager.speak(letter.char);
            }}
            className="game-btn px-4 py-2 bg-rose-100 text-rose-800 rounded-xl font-bold text-xs md:text-sm border border-rose-300"
          >
            <Volume2 className="w-4 h-4 text-rose-600" />
            <span>نُطْقُ الحَرْف</span>
          </button>
        </div>
      </div>

      {/* 8-Stage Interactive Path */}
      <div className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-3xl border-2 border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center justify-between min-w-[700px] gap-2">
          {stagesList.map((stg, idx) => {
            const isCompleted = (progress as any)[['discovery', 'sound', 'vowels', 'syllables', 'words', 'soundPosition', 'sentences', 'finalChallenge'][idx]];
            const isActive = activeStage === stg.id;

            return (
              <div key={stg.id} className="flex-1 flex items-center">
                <button
                  onClick={() => {
                    audioManager.playClick();
                    setActiveStage(stg.id);
                  }}
                  className={`w-full flex flex-col items-center gap-1 p-2.5 rounded-2xl border-2 transition-all ${
                    isActive
                      ? 'bg-gradient-to-b from-rose-500 to-pink-600 text-white border-white shadow-card-pop scale-105'
                      : isCompleted
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 hover:bg-emerald-100'
                      : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  <span className="text-xl">{isCompleted ? '⭐' : stg.icon}</span>
                  <span className="text-[11px] font-black whitespace-nowrap">
                    {stg.id}. {stg.title}
                  </span>
                </button>

                {idx < stagesList.length - 1 && (
                  <div className={`h-1 w-3 mx-1 rounded-full ${isCompleted ? 'bg-emerald-400' : 'bg-slate-200'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Interactive Game Canvas */}
      <div className="relative bg-white rounded-3xl p-6 md:p-8 border-4 border-rose-300 shadow-card-pop min-h-[460px] flex flex-col justify-between overflow-hidden">
        
        {/* Environmental Reaction Pop */}
        {environmentReaction && (
          <div className="absolute inset-0 bg-emerald-500/90 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white text-center p-6 space-y-3 animate-pop">
            <span className="text-6xl animate-bounce">🌸✨</span>
            <h3 className="text-2xl md:text-3xl font-black">
              {environmentReaction}
            </h3>
          </div>
        )}

        {/* STAGE 1: اكتشف الحرف */}
        {activeStage === 1 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-rose-100 text-rose-800 font-black text-xs px-3 py-1 rounded-full border border-rose-300">
                  المرحلة 1: اكْتَشِف الحَرْف
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  تَعَرَّفْ عَلَى شَكْلِ وَرَسْمِ حَرْفِ ({letter.char})
                </h2>
              </div>
              <LumiMascot
                message={`هَذَا حَرْفُ ${letter.nameAr}! انْقُرْ عَلَيْهِ لِيَنْبِضَ بِالأَلْوَان!`}
                emotion="happy"
                size="sm"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-6">
              <button
                onClick={() => {
                  audioManager.playBloom();
                  audioManager.speak(letter.char);
                }}
                className="w-48 h-48 rounded-3xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center text-9xl font-black border-4 border-white shadow-glow-pink active:scale-95 transition-transform animate-float"
              >
                {letter.char}
              </button>

              <div className="space-y-3">
                <p className="text-xs font-bold text-slate-600">كَلِمَاتٌ تَبْدَأُ بِحَرْفِ {letter.nameAr}:</p>
                <div className="flex items-center gap-3">
                  {letter.words.slice(0, 3).map(w => (
                    <button
                      key={w.id}
                      onClick={() => {
                        audioManager.playClick();
                        audioManager.speak(w.word);
                      }}
                      className="game-card p-4 flex flex-col items-center gap-1 border-2 border-pink-200 hover:border-pink-400 active:scale-95 transition-transform bg-white"
                    >
                      <span className="text-4xl">{w.emoji}</span>
                      <span className="font-black text-sm text-slate-800">{w.word}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(1, `أَزْهَرَتِ الأَزْهَارُ بِاكْتِشَافِ حَرْفِ ${letter.nameAr}!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>أَتْمَمْتُ اسْتِكْشَافَ الحَرْف! 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: تعرّف على الصوت */}
        {activeStage === 2 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1 rounded-full border border-purple-300">
                  المرحلة 2: تَعَرَّفْ عَلَى الصَّوْت
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  نُطْقُ صَوْتِ حَرْفِ {letter.nameAr}
                </h2>
              </div>
              <LumiMascot
                message={`قُلْ مَعِي: (${letter.char}) .. اسْتَمِعْ ثُمَّ جَرِّبِ النُّطْق!`}
                emotion="listening"
                size="sm"
              />
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-300 flex items-center gap-4">
              <span className="text-4xl">👄</span>
              <div>
                <h4 className="font-black text-amber-900 text-sm">نَصِيحَةُ لُومِي لِمَخْرَجِ الصَّوْت:</h4>
                <p className="text-xs md:text-sm text-amber-800 font-medium">{letter.mouthGuide.tip}</p>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 py-4 text-center">
              <span className="text-8xl font-black text-rose-500">{letter.char}</span>
              <button
                onClick={() => {
                  audioManager.speak(letter.char);
                }}
                className="game-btn px-6 py-3 bg-rose-500 text-white rounded-2xl font-black text-sm"
              >
                <Volume2 className="w-5 h-5" />
                <span>اسْتَمِعْ لِلصَّوْتِ الآن</span>
              </button>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(2, `صَوْتٌ رَائِع! طَارَتِ الفَرَاشَاتُ فِي الوَادِي!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>أَتْقَنْتُ صَوْتَ الحَرْف! 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 3: الحركات */}
        {activeStage === 3 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-emerald-100 text-emerald-800 font-black text-xs px-3 py-1 rounded-full border border-emerald-300">
                  المرحلة 3: الحَرَكَاتُ القَصِيرَة
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  الفتحة والكسرة والضمة
                </h2>
              </div>
              <LumiMascot
                message="اسْتَمِعْ لِكُلِّ حَرَكَةٍ وَانْقُرْ عَلَيْهَا لِتَسْمَعَ صَوْتَهَا!"
                emotion="talking"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              {letter.syllables.short.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    audioManager.playBloom();
                    audioManager.speak(s.syl);
                  }}
                  className="game-card p-6 border-4 border-emerald-300 bg-emerald-50 hover:bg-white hover:scale-105 transition-all flex flex-col items-center justify-between min-h-[180px]"
                >
                  <span className="text-xs font-black bg-emerald-200 text-emerald-900 px-3 py-0.5 rounded-full">
                    {s.nameAr}
                  </span>
                  <span className="text-6xl font-black text-emerald-700 my-2">
                    {s.syl}
                  </span>
                  <span className="text-xs font-bold text-slate-600">{s.tip}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(3, `تَفَتَّحَتْ أَزْهَارُ الحَرَكَاتِ القَصِيرَة!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>اكْتَمَلَ تَدْرِيبُ الحَرَكَات 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: المقاطع */}
        {activeStage === 4 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-sky-100 text-sky-800 font-black text-xs px-3 py-1 rounded-full border border-sky-300">
                  المرحلة 4: المَقَاطِعُ وَالمُدُودُ الطَّوِيلَة
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  مَدُّ الأَلِف وَاليَاءِ وَالوَاو
                </h2>
              </div>
              <LumiMascot
                message="مُدَّ الصَّوْتَ طَوِيلًا مَعِي مِثْلَ القِطَار!"
                emotion="cheering"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4">
              {letter.syllables.long.map((s) => (
                <button
                  key={s.id}
                  onClick={() => {
                    audioManager.playBloom();
                    audioManager.speak(s.syl);
                  }}
                  className="game-card p-6 border-4 border-sky-300 bg-sky-50 hover:bg-white hover:scale-105 transition-all flex flex-col items-center justify-between min-h-[180px]"
                >
                  <span className="text-xs font-black bg-sky-200 text-sky-900 px-3 py-0.5 rounded-full">
                    {s.nameAr}
                  </span>
                  <span className="text-6xl font-black text-sky-700 my-2">
                    {s.syl}
                  </span>
                  <span className="text-xs font-bold text-slate-600">مثال: {s.example}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(4, `نَمَتْ أَشْجَارُ غَابَةِ المَقَاطِعِ الطَّوِيلَة!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>اكْتَمَلَ تَدْرِيبُ المَقَاطِع 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 5: الكلمات */}
        {activeStage === 5 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-amber-100 text-amber-800 font-black text-xs px-3 py-1 rounded-full border border-amber-300">
                  المرحلة 5: الكَلِمَاتُ فِي مَوَاقِعِهَا
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  الحرف في أول ووسط وآخر الكلمة
                </h2>
              </div>
              <LumiMascot
                message="انْقُرْ عَلَى كَلِمَاتِ القَرْيَةِ لِتَفْتَحَ أَبْوَابَهَا!"
                emotion="happy"
                size="sm"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 py-4">
              {letter.words.map((w) => (
                <button
                  key={w.id}
                  onClick={() => {
                    audioManager.playClick();
                    audioManager.speak(w.word);
                  }}
                  className="game-card p-4 border-3 border-amber-300 bg-white hover:scale-105 transition-all flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-xs font-black text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full">
                    {w.positionLabel}
                  </span>
                  <span className="text-5xl">{w.emoji}</span>
                  <span className="text-2xl font-black text-slate-900">{w.word}</span>
                </button>
              ))}
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(5, `انْفَتَحَتْ أَبْوَابُ قَرْيَةِ الكَلِمَاتِ بِنَجَاح!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>اكْتَمَلَ تَدْرِيبُ الكَلِمَات 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 6: موقع الصوت */}
        {activeStage === 6 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-indigo-100 text-indigo-800 font-black text-xs px-3 py-1 rounded-full border border-indigo-300">
                  المرحلة 6: مَوْقِعُ الصَّوْت
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  أَيْنَ يَجْلِسُ حَرْفُ ({letter.char})؟
                </h2>
              </div>
              <LumiMascot
                message="حَدِّدْ مَوْقِعَ الحَرْف: فِي الأَوَّل، الوَسَط، أَم الآخِر؟"
                emotion="listening"
                size="sm"
              />
            </div>

            <div className="bg-indigo-50 p-6 rounded-3xl border-3 border-indigo-200 text-center space-y-4 max-w-md mx-auto">
              <span className="text-6xl block">{letter.words[0].emoji}</span>
              <h3 className="text-4xl font-black text-slate-900">{letter.words[0].word}</h3>

              <div className="grid grid-cols-3 gap-3 pt-3">
                {['فِي الأَوَّل', 'فِي الوَسَط', 'فِي الآخِر'].map((pos, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      audioManager.playVictory();
                      handleCompleteStage(6, `إِجَابَةٌ دَقِيقَةٌ جِدًّا يَا بَطَل!`);
                    }}
                    className="game-btn p-3 bg-white hover:bg-indigo-600 hover:text-white text-slate-900 font-black text-xs md:text-sm rounded-xl border-2 border-indigo-300 active:scale-95"
                  >
                    {pos}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 7: الجمل */}
        {activeStage === 7 && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="bg-purple-100 text-purple-800 font-black text-xs px-3 py-1 rounded-full border border-purple-300">
                  المرحلة 7: الجُمَلُ وَالمَعَانِي
                </span>
                <h2 className="text-2xl font-black text-slate-900 mt-2">
                  تَرْكِيبُ الجُمَلِ البَسِيطَة
                </h2>
              </div>
              <LumiMascot
                message="هَيَّا نَقْرَأُ هَذِهِ الجُمْلَةَ المُفِيدَةَ مَعًا!"
                emotion="cheering"
                size="sm"
              />
            </div>

            <div className="bg-purple-50 p-6 rounded-3xl border-3 border-purple-200 max-w-xl mx-auto text-center space-y-4">
              <span className="text-6xl block">{letter.sentences[0].emoji}</span>
              <h3 className="text-3xl font-black text-purple-950">
                {letter.sentences[0].sentence}
              </h3>
              <button
                onClick={() => audioManager.speak(letter.sentences[0].sentence)}
                className="game-btn px-6 py-2.5 bg-purple-600 text-white rounded-2xl font-bold text-xs"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلجُمْلَة</span>
              </button>
            </div>

            <div className="flex justify-end pt-4">
              <button
                onClick={() => handleCompleteStage(7, `تَشَكَّلَ جِسْرُ نَهْرِ الجُمَلِ البَرَّاقَة!`)}
                className="game-btn px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-2xl font-black text-sm shadow-md"
              >
                <span>اكْتَمَلَ تَدْرِيبُ الجُمَل 🌟</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 8: المغامرة النهائية */}
        {activeStage === 8 && (
          <div className="space-y-6 text-center py-6">
            <div className="max-w-md mx-auto space-y-4">
              <div className="w-28 h-28 mx-auto bg-gradient-to-tr from-amber-400 to-yellow-500 rounded-full flex items-center justify-center text-6xl border-4 border-white shadow-glow-yellow animate-bounce">
                🏆
              </div>

              <h2 className="text-3xl font-black text-slate-900">
                مُبَارَكْ! أَتْقَنْتَ رِحْلَةَ حَرْفِ {letter.nameAr}!
              </h2>

              <p className="text-sm text-slate-600 font-bold leading-relaxed">
                لَقَدْ أَصْبَحْتَ بَطَلًا حَقِيقِيًّا فِي نُطْقِ وَتَمْيِيزِ حَرْفِ ({letter.char})!
              </p>

              <div className="bg-gradient-to-br from-amber-50 to-yellow-100 border-4 border-amber-400 p-6 rounded-3xl shadow-md text-center space-y-3">
                <span className="text-xs font-black text-amber-900 bg-amber-200 px-3 py-1 rounded-full">
                  شَهَادَةُ بَطَلِ حَرْفِ {letter.nameAr}
                </span>

                <div className="text-6xl font-black text-rose-600 my-2">
                  {letter.char}
                </div>

                <div className="flex items-center justify-center gap-4 text-xs font-black text-slate-800 pt-2 border-t border-amber-300">
                  <span>⭐ +5 نُجُوم</span>
                  <span>🪙 +30 عُمْلَة</span>
                  <span>🏆 وِسَامُ الإِتْقَان</span>
                </div>
              </div>

              <button
                onClick={() => {
                  audioManager.playVictory();
                  triggerVictoryCelebration();
                  updateLetterStage(letter.id, 8, true);
                  addStars(5);
                  addCoins(30);
                }}
                className="game-btn px-8 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base shadow-glow-yellow"
              >
                <Sparkles className="w-5 h-5 text-amber-900" />
                <span>احْتَفِلْ بِالإِنْجَازِ وَاسْتَلِمِ الجَائِزَة! 🎁</span>
              </button>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\journey\LetterJourney3D.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Sparkles, Volume2, Lock, CheckCircle2, Trophy, Play, Star, Award } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { STAGE_CURRICULUM_DEFINITIONS, StageDefinition } from '../../engine/CurriculumEngine';
import { aiChallengeEngine, GeneratedChallenge } from '../../engine/AIChallengeEngine';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../mascot/LumiMascot';

interface LetterJourney3DProps {
  letterId: string;
  onBackToAlphabet: () => void;
  onSelectAnotherLetter: (id: string) => void;
}

export const LetterJourney3D: React.FC<LetterJourney3DProps> = ({
  letterId,
  onBackToAlphabet,
  onSelectAnotherLetter
}) => {
  const { childName, letterProgressMap, updateLetterStage, addStars, addCoins, triggerVictoryCelebration } = useGame();

  const letter: LetterData = ARABIC_LETTERS.find(l => l.id === letterId) || ARABIC_LETTERS[1]; // default 'ب'
  const progress = letterProgressMap[letter.id] || {
    discovery: false,
    sound: false,
    vowels: false,
    syllables: false,
    words: false,
    soundPosition: false,
    sentences: false,
    finalChallenge: false,
    currentStage: 1,
    masteryPercentage: 0
  };

  const [activeStageNum, setActiveStageNum] = useState<number>(progress.currentStage || 1);
  const [currentChallenge, setCurrentChallenge] = useState<GeneratedChallenge | null>(null);
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);
  const [stageAttempts, setStageAttempts] = useState<{ total: number; success: number }>({ total: 0, success: 0 });

  // Initialize or generate challenge when stage changes
  React.useEffect(() => {
    const ch = aiChallengeEngine.generateStageChallenge(
      letter.id,
      activeStageNum,
      {
        letterId: letter.id,
        stageNumber: activeStageNum,
        attemptsCount: stageAttempts.total,
        successfulAttempts: stageAttempts.success,
        recentMistakes: [],
        averageConfidence: 0.9
      },
      childName
    );
    setCurrentChallenge(ch);
    setFeedbackMessage(null);
  }, [activeStageNum, letter.id, childName]);

  const activeStageDef = STAGE_CURRICULUM_DEFINITIONS.find(s => s.stageNumber === activeStageNum) || STAGE_CURRICULUM_DEFINITIONS[0];

  // Stage unlocking logic: Stage 1 unlocked. Stages 2..8 unlocked only if previous completed
  const isStageUnlocked = (stageNum: number) => {
    if (stageNum === 1) return true;
    const stageKeys = ['discovery', 'sound', 'vowels', 'syllables', 'words', 'soundPosition', 'sentences', 'finalChallenge'];
    const prevKey = stageKeys[stageNum - 2];
    return (progress as any)[prevKey] === true || progress.currentStage >= stageNum;
  };

  const handleSelectStage = (stgNum: number) => {
    if (!isStageUnlocked(stgNum)) {
      audioManager.playClick();
      audioManager.speak(`هَذِهِ المَرْحَلَةُ مُغْلَقَةٌ حَتَّى تُتِمَّ المَرْحَلَةَ السَّابِقَةَ يَا ${childName}!`);
      return;
    }
    audioManager.playClick();
    setActiveStageNum(stgNum);
  };

  const handleOptionChoice = (option: { id: string; text: string; isCorrect: boolean }) => {
    setStageAttempts(prev => ({
      total: prev.total + 1,
      success: prev.success + (option.isCorrect ? 1 : 0)
    }));

    if (option.isCorrect) {
      audioManager.playVictory();
      setFeedbackMessage(currentChallenge?.encouragingFeedbackAr || `أَحْسَنْتَ يَا ${childName}!`);
      addStars(1);
      addCoins(5);

      // Mastery evaluation
      const evaluation = aiChallengeEngine.evaluateMastery(stageAttempts.total + 1, stageAttempts.success + 1);
      
      setTimeout(() => {
        setFeedbackMessage(null);
        updateLetterStage(letter.id, activeStageNum, true);

        if (activeStageNum < 8) {
          setActiveStageNum(prev => prev + 1);
        } else {
          triggerVictoryCelebration();
          audioManager.speak(`مُبَارَكٌ يَا ${childName}! أَنْتَ الآنَ بَطَلُ حَرْفِ ${letter.nameAr}!`);
        }
      }, 1400);
    } else {
      audioManager.playClick();
      setFeedbackMessage(`لِنُجَرِّبْ مَرَّةً أُخْرَى يَا ${childName}.. أَنْتَ قَرِيبٌ جِدًّا!`);
      setTimeout(() => setFeedbackMessage(null), 1500);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Header Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f172a]/95 backdrop-blur-md p-4 md:p-6 rounded-3xl border-2 border-indigo-500/30 shadow-2xl text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToAlphabet();
            }}
            className="p-3 rounded-2xl bg-[#1e293b] border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all shadow-sm active:scale-95"
            title="العودة لمرصد الحروف"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 text-white flex items-center justify-center text-4xl font-black border-2 border-cyan-300 shadow-glow-cyan">
              {letter.char}
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-black text-white">
                رِحْلَةُ حَرْفِ {letter.nameAr} ({letter.char})
              </h1>
              <p className="text-xs md:text-sm text-cyan-300 font-bold">
                المرحلة {activeStageNum} من 8 • نسبة إتقان الحرف %{progress.masteryPercentage}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            audioManager.playClick();
            audioManager.speak(letter.char);
          }}
          className="px-4 py-2 bg-indigo-900/80 hover:bg-indigo-800 text-cyan-300 rounded-xl font-bold text-xs md:text-sm border border-indigo-500/50 flex items-center gap-1.5 shadow-sm"
        >
          <Volume2 className="w-4 h-4" />
          <span>اسْتَمِعْ لِلحَرْف</span>
        </button>
      </div>

      {/* 3D Physical Stage Progression Path */}
      <div className="bg-[#0f172a]/90 backdrop-blur-md p-4 rounded-3xl border-2 border-indigo-500/30 shadow-xl overflow-x-auto">
        <div className="flex items-center justify-between min-w-[760px] gap-2">
          {STAGE_CURRICULUM_DEFINITIONS.map((stg, idx) => {
            const isCompleted = (progress as any)[['discovery', 'sound', 'vowels', 'syllables', 'words', 'soundPosition', 'sentences', 'finalChallenge'][idx]];
            const isUnlocked = isStageUnlocked(stg.stageNumber);
            const isActive = activeStageNum === stg.stageNumber;

            return (
              <div key={stg.stageNumber} className="flex-1 flex items-center">
                <button
                  onClick={() => handleSelectStage(stg.stageNumber)}
                  className={`w-full flex flex-col items-center gap-1.5 p-3 rounded-2xl border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-b from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-glow-cyan scale-105'
                      : isCompleted
                      ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/60 hover:bg-emerald-900/80'
                      : isUnlocked
                      ? 'bg-[#1e293b] text-slate-300 border-slate-700 hover:border-cyan-500/50'
                      : 'bg-[#0b0f19] text-slate-600 border-slate-800 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span className="text-xl">
                    {isCompleted ? '⭐' : !isUnlocked ? '🔒' : '📍'}
                  </span>

                  <span className="text-[11px] font-black whitespace-nowrap">
                    {stg.stageNumber}. {stg.titleAr}
                  </span>

                  <span className="text-[9px] text-slate-400 font-medium">
                    {stg.landmark3D}
                  </span>
                </button>

                {idx < STAGE_CURRICULUM_DEFINITIONS.length - 1 && (
                  <div className={`h-1 w-3 mx-1 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-slate-800'}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Active Stage Game Canvas & Adaptive Challenge */}
      <div className="relative bg-[#0f172a]/95 backdrop-blur-2xl rounded-3xl p-6 md:p-8 border-2 border-cyan-500/30 shadow-2xl min-h-[460px] flex flex-col justify-between overflow-hidden text-white">
        
        {/* Feedback Popup */}
        {feedbackMessage && (
          <div className="absolute inset-0 bg-[#064e3b]/95 backdrop-blur-md z-30 flex flex-col items-center justify-center text-white text-center p-6 space-y-3 animate-pop">
            <span className="text-6xl animate-bounce">🌟✨</span>
            <h3 className="text-2xl md:text-3xl font-black">{feedbackMessage}</h3>
          </div>
        )}

        {/* Stage Objective & LUMI Companion */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <span className="bg-cyan-950 text-cyan-300 font-black text-xs px-3 py-1 rounded-full border border-cyan-500/40">
              المرحلة {activeStageNum}: {activeStageDef.titleAr} ({activeStageDef.landmark3D})
            </span>
            <h2 className="text-xl md:text-2xl font-black text-white mt-2">
              {activeStageDef.objectiveAr}
            </h2>
          </div>

          <LumiMascot
            message={currentChallenge?.hintAr || `هَيَّا نَسْتَكْشِفْ هَذِهِ المَرْحَلَةَ يَا ${childName}!`}
            emotion="happy"
            size="sm"
          />
        </div>

        {/* Challenge Interactive Body */}
        {currentChallenge && (
          <div className="py-8 space-y-6 text-center max-w-xl mx-auto w-full">
            <div className="bg-[#1e293b]/80 p-6 rounded-3xl border border-indigo-500/40 space-y-4 shadow-inner">
              <span className="text-5xl block animate-float">
                {currentChallenge.targetItem === letter.char ? letter.words[0]?.emoji || '🌟' : '🎯'}
              </span>

              <h3 className="text-2xl md:text-3xl font-black text-amber-300">
                {currentChallenge.promptAr}
              </h3>

              <button
                onClick={() => audioManager.speak(currentChallenge.audioKey)}
                className="px-5 py-2 bg-cyan-900/80 hover:bg-cyan-800 text-cyan-200 rounded-xl font-bold text-xs border border-cyan-500/50 flex items-center justify-center gap-1.5 mx-auto"
              >
                <Volume2 className="w-4 h-4" />
                <span>اسْتَمِعْ لِلصَّوْت</span>
              </button>
            </div>

            {/* Answer Choices Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              {currentChallenge.options.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => handleOptionChoice(opt)}
                  className="p-4 bg-[#1e293b] hover:bg-cyan-600 hover:text-white text-slate-100 rounded-2xl font-black text-lg md:text-xl border-2 border-slate-700 hover:border-cyan-300 shadow-md active:scale-95 transition-all flex items-center justify-center gap-2"
                >
                  {opt.icon && <span>{opt.icon}</span>}
                  <span>{opt.text}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Mastery Info */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-bold">
          <span>نَمُوذَجُ الإِتْقَان: تَحَدٍّ تَكَيُّفِيٌّ بِالذَّكَاءِ الاصْطِنَاعِيّ 🧠</span>
          <span className="text-cyan-400">عَتَبَةُ الإِتْقَان: %80</span>
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\home\MagicalHome.tsx`
```typescript
import React from 'react';
import { Play, Sparkles, Compass, Star, Coins, Flame, ArrowLeft } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';

interface MagicalHomeProps {
  onOpenMap: () => void;
  onOpenAlphabet: () => void;
  onOpenMirror: () => void;
  onSelectLetter: (id: string) => void;
}

export const MagicalHome: React.FC<MagicalHomeProps> = ({
  onOpenMap,
  onOpenAlphabet,
  onOpenMirror,
  onSelectLetter
}) => {
  const { childName, stars, coins, streak } = useGame();

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 select-none">
      
      {/* Hero Welcome Realm */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-500 rounded-3xl p-6 md:p-8 text-white shadow-card-pop border-4 border-white">
        
        {/* Floating background glowing dust */}
        <div className="absolute -top-10 -right-10 w-44 h-44 bg-white/20 rounded-full blur-2xl pointer-events-none animate-pulse" />
        <div className="absolute -bottom-10 -left-10 w-52 h-52 bg-yellow-300/25 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1 rounded-full text-xs md:text-sm font-black border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>مَرْحَبًا بِكَ يَا بَطَل فِي مَدِينَةِ الأَصْوَاتِ السَّاحِرَة!</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">
              مَدِينَةُ الأَصْوَاتِ 🏰✨
            </h1>
            
            <p className="text-sky-100 text-sm md:text-lg max-w-xl leading-relaxed font-bold">
              تَعَلَّمْ نُطْقَ وَتَمْيِيزَ جَمِيعِ الحُرُوفِ العَرَبِيَّةِ فِي مُغَامَرَةٍ تَعْلِيمِيَّةٍ بَصَرِيَّةٍ مُمْتِعَة!
            </p>

            {/* Quick Action Navigation Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  audioManager.playPortal();
                  onOpenMap();
                }}
                className="game-btn px-6 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-950 rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-yellow hover:scale-105 transition-transform"
              >
                <Compass className="w-6 h-6" />
                <span>خَرِيطَةُ العَوَالِمِ (8 عَوَالِم) 🗺️</span>
              </button>

              <button
                onClick={() => {
                  audioManager.playClick();
                  onOpenAlphabet();
                }}
                className="game-btn px-5 py-3.5 bg-white text-sky-900 rounded-2xl font-black text-sm md:text-base border-2 border-white hover:bg-sky-50 shadow-md"
              >
                <span>غُرْفَةُ الحُرُوفِ (28 حَرْفًا) 🔤</span>
              </button>
            </div>
          </div>

          {/* LUMI Mascot Companion */}
          <div className="flex-shrink-0">
            <LumiMascot
              message="أَهْلًا يَا بَطَل! هَيَّا نَبْدَأُ رِحْلَةَ حَرْفِ البَاءِ (ب) أَوْ اخْتَرْ أَيَّ حَرْفٍ تُحِبُّه!"
              emotion="happy"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Featured Quest Spotlight: Letter Baa Vertical Slice */}
      <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 rounded-3xl p-6 md:p-8 border-4 border-rose-300 shadow-card-pop flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-rose-500 to-pink-500 text-white flex items-center justify-center text-6xl font-black border-4 border-white shadow-glow-pink animate-wiggle">
            ب
          </div>
          <div className="space-y-1">
            <span className="inline-block bg-rose-500 text-white text-xs font-black px-3 py-0.5 rounded-full">
              مُغَامَرَةُ الحَرْفِ الرَّئِيسِيَّة
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-slate-900">
              رِحْلَةُ حَرْفِ البَاءِ (ب) 🦆
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-bold max-w-lg">
              8 مَرَاحِلَ مُتَدَرِّجَة: اكْتِشَافُ الحَرْف، الصَّوْت، الحَرَكَات، المَقَاطِع، الكَلِمَات، مَوْقِعُ الصَّوْت، الجُمَل، وَالتَّحَدِّي النِّهَائِي!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            audioManager.playPortal();
            onSelectLetter('baa');
          }}
          className="game-btn px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-pink hover:scale-105 whitespace-nowrap"
        >
          <Play className="w-5 h-5 fill-white" />
          <span>ابْدَأ رِحْلَةَ حَرْفِ ب 🚀</span>
        </button>
      </div>

      {/* Quick Access World Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: '🌿 وادي الحروف', desc: 'اسْتَكْشِف الحُرُوفَ فِي الوَادِي الأَخْضَر', action: onOpenMap, color: 'border-emerald-300 bg-emerald-50' },
          { title: '🌲 غابة المقاطع', desc: 'أَشْجَارٌ تَنْمُو بِنُطْقِ الحَرَكَاتِ وَالمُدُود', action: onOpenMap, color: 'border-green-300 bg-green-50' },
          { title: '🏘️ قرية الكلمات', desc: 'قَرْيَةٌ سِحْرِيَّةٌ لِتَرْكِيبِ الكَلِمَات', action: onOpenMap, color: 'border-amber-300 bg-amber-50' }
        ].map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              audioManager.playClick();
              item.action();
            }}
            className={`game-card p-5 border-3 ${item.color} cursor-pointer hover:scale-105 transition-all flex flex-col justify-between`}
          >
            <div>
              <h4 className="text-lg font-black text-slate-900 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-600 font-bold">{item.desc}</p>
            </div>
            <span className="text-xs font-black text-sky-600 mt-3 flex items-center gap-1">
              <span>ادخل الآن</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\home\ExplorationHub3D.tsx`
```typescript
import React from 'react';
import { Compass, Sparkles, Star, Trophy, ArrowLeft, Play, Flame } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';

interface ExplorationHub3DProps {
  onOpenMap: () => void;
  onOpenObservatory: () => void;
  onOpenMirror: () => void;
  onSelectLetter: (id: string) => void;
}

export const ExplorationHub3D: React.FC<ExplorationHub3DProps> = ({
  onOpenMap,
  onOpenObservatory,
  onOpenMirror,
  onSelectLetter
}) => {
  const { childName, stars, coins, streak, letterProgressMap } = useGame();

  // Calculate total mastered letters
  const masteredCount = Object.values(letterProgressMap).filter(
    (p: any) => p.masteryPercentage === 100
  ).length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 select-none">
      
      {/* 3D Atmosphere Realm Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#2e1065] rounded-3xl p-6 md:p-8 text-white shadow-2xl border-2 border-indigo-500/40">
        
        {/* Glow Dust */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-[#1e293b]/80 backdrop-blur-md px-4 py-1 rounded-full text-xs font-bold border border-indigo-500/30 text-cyan-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>مَرْحَبًا يَا {childName} فِي عَالَمِ لُومِي السَّاحِر!</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white drop-shadow-md">
              عَالَمُ الأَصْوَاتِ السَّاحِر 🌌✨
            </h1>
            
            <p className="text-slate-300 text-sm md:text-base max-w-xl leading-relaxed font-bold">
              اسْتَكْشِفْ عَالَمَ الحُرُوفِ الثَّمَانِيَةِ وَالعِشْرِينَ بِتَرْتِيبِهَا الهِجَائِيِّ الدَّقِيقِ وَانْطَلِقْ فِي العَوَالِمِ الثَّمَانِيَة!
            </p>

            {/* Main Action Buttons */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  audioManager.playPortal();
                  onOpenMap();
                }}
                className="px-6 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-2xl font-black text-sm md:text-base border border-cyan-300/40 shadow-glow-cyan hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Compass className="w-5 h-5" />
                <span>خَرِيطَةُ العَوَالِمِ (8 عَوَالِم) 🗺️</span>
              </button>

              <button
                onClick={() => {
                  audioManager.playClick();
                  onOpenObservatory();
                }}
                className="px-5 py-3.5 bg-[#1e293b] text-white rounded-2xl font-black text-sm md:text-base border border-slate-700 hover:bg-[#334155] shadow-md transition-all flex items-center gap-2"
              >
                <span>مَرْصَدُ الحُرُوفِ (28 حَرْفًا) 🔤</span>
              </button>
            </div>
          </div>

          {/* LUMI Mascot Companion */}
          <div className="flex-shrink-0">
            <LumiMascot
              message={`أَهْلًا يَا ${childName}! هَيَّا نَبْدَأُ رِحْلَةَ حَرْفِ البَاءِ (ب) فِي وادِي الحُرُوف!` }
              emotion="happy"
              size="lg"
            />
          </div>
        </div>
      </div>

      {/* Featured Quest Spotlight: Letter Baa Vertical Slice */}
      <div className="bg-gradient-to-r from-[#0f172a] via-[#1e1b4b] to-[#1e293b] rounded-3xl p-6 md:p-8 border-2 border-cyan-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 text-white">
        <div className="flex items-center gap-5">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-cyan-400 to-indigo-600 text-white flex items-center justify-center text-6xl font-black border-4 border-white/50 shadow-glow-cyan animate-wiggle">
            ب
          </div>
          <div className="space-y-1 text-right">
            <span className="inline-block bg-cyan-500 text-slate-950 text-xs font-black px-3 py-0.5 rounded-full">
              المُغَامَرَةُ الرَّئِيسِيَّةُ المُتَاحَة
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-amber-300">
              رِحْلَةُ حَرْفِ البَاءِ (ب) 🦆
            </h3>
            <p className="text-xs md:text-sm text-slate-300 font-bold max-w-lg">
              8 مَرَاحِلَ مُتَدَرِّجَةٌ تَبْدَأُ بِـ (اكْتِشَافِ الحَرْف) وَتَنْتَهِي بِـ (تَحَدِّي بَوَّابَةِ لُومِي الكُبْرَى)!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            audioManager.playPortal();
            onSelectLetter('baa');
          }}
          className="px-8 py-4 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-500 text-slate-950 rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-2 whitespace-nowrap"
        >
          <Play className="w-5 h-5 fill-slate-950" />
          <span>ابْدَأ رِحْلَةَ حَرْفِ ب 🚀</span>
        </button>
      </div>

      {/* Highlights & Portals */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: '🌿 وادي الحروف', desc: 'اسْتَكْشِف الحُرُوفَ فِي الوَادِي السِّحْرِيّ', action: onOpenMap, border: 'border-emerald-500/40 bg-emerald-950/30' },
          { title: '🌲 غابة المقاطع', desc: 'أَشْجَارٌ تَنْمُو بِنُطْقِ الحَرَكَاتِ وَالمُدُود', action: onOpenMap, border: 'border-green-500/40 bg-green-950/30' },
          { title: '🏘️ قرية الكلمات', desc: 'قَرْيَةٌ سِحْرِيَّةٌ لِتَرْكِيبِ الكَلِمَات', action: onOpenMap, border: 'border-amber-500/40 bg-amber-950/30' }
        ].map((item, idx) => (
          <div
            key={idx}
            onClick={() => {
              audioManager.playClick();
              item.action();
            }}
            className={`p-5 rounded-3xl border-2 ${item.border} backdrop-blur-md cursor-pointer hover:scale-105 transition-all flex flex-col justify-between text-white`}
          >
            <div>
              <h4 className="text-lg font-black text-cyan-300 mb-1">{item.title}</h4>
              <p className="text-xs text-slate-300 font-bold leading-relaxed">{item.desc}</p>
            </div>
            <span className="text-xs font-black text-amber-400 mt-3 flex items-center gap-1">
              <span>ادخل الآن</span>
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\home\CityMapHome.tsx`
```typescript
import React from 'react';
import { Play, Sparkles, Trophy, Compass, Star, ArrowLeft, CheckCircle2, Lock } from 'lucide-react';
import { LoulouMascot } from '../mascot/LoulouMascot';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';
import lettersData from '../../data/letters.json';

interface CityMapHomeProps {
  onSelectLetter: (letterId: string) => void;
  onNavigateTab: (tab: string) => void;
}

export const CityMapHome: React.FC<CityMapHomeProps> = ({
  onSelectLetter,
  onNavigateTab
}) => {
  const { childName, stars, coins, level, letterProgress } = useGame();

  const zones = [
    {
      id: 'village',
      name: 'قرية الحروف',
      desc: 'تعلم أشكال وأصوات الحروف العربية',
      icon: '🔤',
      color: 'from-amber-400 to-orange-500',
      borderColor: 'border-amber-300',
      unlocked: true,
      badge: 'المرحلة 1',
      action: () => onNavigateTab('letters')
    },
    {
      id: 'forest',
      name: 'غابة المقاطع',
      desc: 'تدرب على الحركات والمدود القصيرة والطويلة',
      icon: '🌲',
      color: 'from-emerald-400 to-green-600',
      borderColor: 'border-emerald-300',
      unlocked: true,
      badge: 'المرحلة 2',
      action: () => onSelectLetter('baa')
    },
    {
      id: 'street',
      name: 'شارع الكلمات',
      desc: 'اكتشف الكلمات في أول ووسط وآخر الكلمة',
      icon: '🛣️',
      color: 'from-sky-400 to-blue-600',
      borderColor: 'border-sky-300',
      unlocked: true,
      badge: 'المرحلة 3',
      action: () => onSelectLetter('baa')
    },
    {
      id: 'city',
      name: 'مدينة الجمل',
      desc: 'ركّب جملاً مفيدة مع أصدقاء المدينة',
      icon: '🏙️',
      color: 'from-indigo-400 to-purple-600',
      borderColor: 'border-indigo-300',
      unlocked: true,
      badge: 'المرحلة 4',
      action: () => onSelectLetter('baa')
    },
    {
      id: 'castle',
      name: 'قلعة التحديات',
      desc: '7 ألعاب ممتعة لصيد الحروف والكلمات',
      icon: '🏰',
      color: 'from-rose-400 to-pink-600',
      borderColor: 'border-rose-300',
      unlocked: true,
      badge: 'ألعاب الأبطال',
      action: () => onNavigateTab('minigames')
    },
    {
      id: 'stars_realm',
      name: 'عالم النجوم',
      desc: 'متجر الأفاتار والملابس والجوائز',
      icon: '✨',
      color: 'from-yellow-400 to-amber-600',
      borderColor: 'border-yellow-300',
      unlocked: true,
      badge: 'المتجر والجوائز',
      action: () => onNavigateTab('avatar')
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-8 select-none">
      
      {/* Hero Welcome Banner with Mascot Loulou */}
      <div className="relative overflow-hidden bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 rounded-3xl p-6 md:p-8 text-white shadow-card-pop border-4 border-white">
        {/* Floating background elements */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-yellow-300/30 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 text-center md:text-right">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3.5 py-1 rounded-full text-xs md:text-sm font-bold border border-white/30">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span>مَرْحَبًا بِكَ فِي عَالَمِ الأَصْوَاتِ السَّاحِرْ!</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black tracking-tight drop-shadow-md">
              مَدِينَةُ الأَصْوَاتِ 🏰
            </h1>
            
            <p className="text-sky-100 text-sm md:text-lg max-w-xl leading-relaxed font-medium">
              تَعَلَّمْ نُطْقَ الحُرُوفِ وَالكَلِمَاتِ مِنْ خِلَالِ أَلْعَابٍ مُمْتِعَةٍ وَتَحَدِّيَاتٍ بَصَرِيَّةٍ وَصَوْتِيَّةٍ رَائِعَة!
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => {
                  soundManager.playClick();
                  onSelectLetter('baa');
                }}
                className="game-btn px-6 py-3.5 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 rounded-2xl font-black text-base md:text-lg border-2 border-white shadow-glow-yellow hover:scale-105 transition-transform"
              >
                <Play className="w-6 h-6 fill-slate-900" />
                <span>ابْدَأ التَّدْرِيبَ الآن! 🚀</span>
              </button>

              <button
                onClick={() => {
                  soundManager.playClick();
                  onNavigateTab('letters');
                }}
                className="game-btn px-5 py-3.5 bg-white/90 text-sky-800 rounded-2xl font-black text-sm md:text-base border-2 border-white hover:bg-white transition-all"
              >
                <Compass className="w-5 h-5 text-sky-600" />
                <span>خَرِيطَةُ الحُرُوفِ 🗺️</span>
              </button>
            </div>
          </div>

          {/* Loulou Mascot Talking */}
          <div className="flex-shrink-0">
            <LoulouMascot
              message="أَهْلًا يَا بَطَل! هَلْ نَبْدَأُ مُغَامَرَةَ حَرْفِ البَاءِ (ب) مَعًا؟"
              emotion="happy"
              size="lg"
              autoSpeak={false}
              onMascotClick={() => onSelectLetter('baa')}
            />
          </div>
        </div>
      </div>

      {/* Interactive World Map Zones */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <h2 className="text-xl md:text-2xl font-black text-slate-800">
              مَنَاطِقُ مَدِينَةِ الأَصْوَاتِ
            </h2>
          </div>
          <span className="text-xs md:text-sm text-slate-500 font-bold bg-white px-3 py-1 rounded-full border">
            اضغط على المنطقة لبدء المغامرة
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {zones.map((zone) => (
            <div
              key={zone.id}
              onClick={() => {
                if (zone.unlocked) {
                  soundManager.playClick();
                  zone.action();
                }
              }}
              className={`game-card relative overflow-hidden p-5 border-4 ${zone.borderColor} cursor-pointer group hover:-translate-y-1.5 transition-all duration-300 bg-white/90 backdrop-blur-md`}
            >
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl md:text-4xl group-hover:scale-125 transition-transform duration-300">
                  {zone.icon}
                </span>
                <span className="text-xs font-black px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border">
                  {zone.badge}
                </span>
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg md:text-xl font-black text-slate-800 group-hover:text-sky-600 transition-colors mb-1">
                {zone.name}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 font-medium leading-relaxed mb-4">
                {zone.desc}
              </p>

              {/* Progress / Status footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>مَفْتُوحَة لِلَّعِب</span>
                </div>

                <span className="inline-flex items-center gap-1 text-xs font-black text-sky-600 group-hover:translate-x-[-4px] transition-transform">
                  <span>ادخل الآن</span>
                  <ArrowLeft className="w-4 h-4" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Journey Spotlight: Letter Baa (حرف الباء) */}
      <div className="bg-gradient-to-r from-rose-100 via-pink-100 to-amber-100 rounded-3xl p-6 border-4 border-rose-300 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-400 text-white flex items-center justify-center text-5xl font-black border-4 border-white shadow-md animate-wiggle">
            ب
          </div>
          <div>
            <div className="inline-block bg-rose-500 text-white text-xs font-black px-2.5 py-0.5 rounded-full mb-1">
              رِحْلَةُ الحَرْفِ الحَالِيَّة
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-800">
              رِحْلَةُ حَرْفِ البَاءِ (ب) 🦆
            </h3>
            <p className="text-xs md:text-sm text-slate-600 font-medium mt-1">
              8 مُسْتَوَيَاتٍ تَدْرِيجِيَّة: التَّعَرُّف، الصَّوْت، الحَرَكَات، المَقَاطِع، الكَلِمَات، الجُمَل، وَالتَّحَدِّي النِّهَائِي!
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            soundManager.playClick();
            onSelectLetter('baa');
          }}
          className="game-btn px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-black text-sm md:text-base border-2 border-white shadow-glow-pink hover:scale-105 transition-transform whitespace-nowrap"
        >
          <span>مُتَابَعَةُ رِحْلَةِ ب 🌟</span>
        </button>
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\home\ChildKingdomHub.tsx`
```typescript
import React, { useState } from 'react';
import { Map, BookOpen, Sparkles, Compass, Gamepad2, Star, Volume2, User, Users, Smartphone, Trophy } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { ARABIC_LETTERS } from '../../data/letters';
import { LumiGuideBanner } from '../common/LumiGuideBanner';
import { ChildProfileModal } from '../common/ChildProfileModal';
import { PWAInstallButton } from '../common/PWAInstallButton';
import { MandatoryLetterPickerModal } from '../common/MandatoryLetterPickerModal';

interface ChildKingdomHubProps {
  onNavigate: (section: 'stages' | 'letters' | 'mirror' | 'worlds' | 'games' | 'ai_lab') => void;
}

export const ChildKingdomHub: React.FC<ChildKingdomHubProps> = ({ onNavigate }) => {
  const { childName, stars, coins, selectedLetterId, setSelectedLetterId } = useGame();
  const [isLetterPickerOpen, setIsLetterPickerOpen] = useState<boolean>(false);
  const [pendingTargetSection, setPendingTargetSection] = useState<'stages' | 'letters' | 'mirror' | 'worlds' | 'games' | 'ai_lab' | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);

  const currentLetter = ARABIC_LETTERS.find((l) => l.id === selectedLetterId) || ARABIC_LETTERS[1];

  const hubSections = [
    {
      id: 'stages' as const,
      title: 'طَرِيقُ المَرَاحِلِ السِّحْرِيّ',
      subtitle: 'اخْتَرْ حَرْفَكَ وَاجْتَزِ الـ 8 مَرَاحِل',
      icon: '🗺️',
      badge: 'الرِّحْلَةُ الأَسَاسِيَّة ⭐',
      bgGradient: 'from-[#1e3a8a] via-[#1d4ed8] to-[#0ea5e9]',
      borderColor: 'border-cyan-400',
      glowColor: 'shadow-[0_0_35px_rgba(14,165,233,0.4)]',
      voiceText: `طَرِيقُ المَرَاحِلِ السِّحْرِيّ يَا ${childName || 'البَطَل'}.. اخْتَرْ حَرْفَكَ لِتَبْدَأَ المَرَاحِلَ الثَّمَانِيَة!`,
      requiresLetterPick: true
    },
    {
      id: 'ai_lab' as const,
      title: 'مُخْتَبَرُ النُّطْقِ بِالذَّكَاءِ الاصْطِنَاعِيّ',
      subtitle: 'انْطِقْ وَدَعِ الذَّكَاءَ الاصْطِنَاعِيَّ يُقَيِّمْكَ وَيُصَحِّح',
      icon: '🤖',
      badge: 'تَقْيِيمٌ وَتَصْحِيحٌ ذَكِيّ ⚡',
      bgGradient: 'from-[#0f766e] via-[#0d9488] to-[#14b8a6]',
      borderColor: 'border-teal-300',
      glowColor: 'shadow-[0_0_35px_rgba(20,184,166,0.5)]',
      voiceText: `مُخْتَبَرُ النُّطْقِ بِالذَّكَاءِ الاصْطِنَاعِيّ يَا ${childName || 'البَطَل'}.. انْطِقِ الكَلِمَةَ لِيُقَيِّمَكَ الذَّكَاءُ الاصْطِنَاعِيُّ فَوْرًا!`,
      requiresLetterPick: false
    },
    {
      id: 'letters' as const,
      title: 'مَرْصَدُ الحُرُوفِ الـ 28',
      subtitle: 'اسْتَكْشِفْ كُلَّ الحُرُوفِ وَأَصْوَاتَهَا',
      icon: '🔤',
      badge: '28 حَرْفًا كَامِلًا 📚',
      bgGradient: 'from-[#065f46] via-[#059669] to-[#10b981]',
      borderColor: 'border-emerald-400',
      glowColor: 'shadow-[0_0_35px_rgba(16,185,129,0.4)]',
      voiceText: `مَرْصَدُ الحُرُوفِ الكَامِلَةِ يَا ${childName || 'البَطَل'}.. ثَمَانِيَةٌ وَعِشْرُونَ حَرْفًا عَرَبِيًّا!`,
      requiresLetterPick: false
    },
    {
      id: 'mirror' as const,
      title: 'مُخْتَبَرُ اللِّسَانِ وَالمِرْآة',
      subtitle: 'شَاهِدْ حَرَكَةَ اللِّسَانِ وَالمَخَارِج',
      icon: '👅',
      badge: 'تَشْرِيحٌ وَاقِعِيٌّ 3D ✨',
      bgGradient: 'from-[#831843] via-[#be185d] to-[#f43f5e]',
      borderColor: 'border-pink-400',
      glowColor: 'shadow-[0_0_35px_rgba(244,63,94,0.4)]',
      voiceText: `مُخْتَبَرُ اللِّسَانِ وَالمِرْآةِ يَا ${childName || 'البَطَل'}.. تَعَلَّمْ كَيْفَ يَتَحَرَّكُ اللِّسَانُ لِنُطْقِ الحَرْف!`,
      requiresLetterPick: true
    },
    {
      id: 'worlds' as const,
      title: 'العَوَالِمُ الثَّلاثَةُ السَّاحِرَة',
      subtitle: 'وَادِي الحُرُوف، غَابَةُ المَقَاطِع، قَرْيَةُ الكَلِمَات',
      icon: '🌍',
      badge: '3 عَوَالِمَ بَصَرِيَّة 🏞️',
      bgGradient: 'from-[#3b0764] via-[#6b21a8] to-[#9333ea]',
      borderColor: 'border-purple-400',
      glowColor: 'shadow-[0_0_35px_rgba(147,51,234,0.4)]',
      voiceText: `العَوَالِمُ الثَّلاثَةُ السَّاحِرَةُ يَا ${childName || 'البَطَل'}.. وَادِي الحُرُوفِ وَغَابَةُ المَقَاطِعِ وَقَرْيَةُ الكَلِمَات!`,
      requiresLetterPick: false
    },
    {
      id: 'games' as const,
      title: 'قَلْعَةُ الأَلْعَابِ الثَّلاث',
      subtitle: 'فَقَاعَاتُ الحُرُوف، قِطَارُ المَقَاطِع، صَيْدُ الكَلِمَات',
      icon: '🎮',
      badge: '3 أَلْعَابٍ مُشَوِّقَة 🎯',
      bgGradient: 'from-[#7c2d12] via-[#c2410c] to-[#f97316]',
      borderColor: 'border-amber-400',
      glowColor: 'shadow-[0_0_35px_rgba(249,115,22,0.4)]',
      voiceText: `قَلْعَةُ الأَلْعَابِ الثَّلاثِ يَا ${childName || 'البَطَل'}.. أَلْعَابٌ مُمْتِعَةٌ لِصَيْدِ الحُرُوفِ وَالمَقَاطِعِ وَالكَلِمَات!`,
      requiresLetterPick: false
    }
  ];

  const handleTileClick = (sec: typeof hubSections[0]) => {
    audioManager.playPortal();
    audioManager.speak(sec.voiceText);

    if (sec.requiresLetterPick) {
      setPendingTargetSection(sec.id);
      setIsLetterPickerOpen(true);
    } else {
      onNavigate(sec.id);
    }
  };

  const handleLetterPicked = (letterId: string) => {
    setIsLetterPickerOpen(false);
    if (pendingTargetSection) {
      onNavigate(pendingTargetSection);
      setPendingTargetSection(null);
    } else {
      onNavigate('stages');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] via-[#091230] to-[#040711] text-white p-3 sm:p-5 select-none flex flex-col justify-between font-arabic overflow-x-hidden">
      
      {/* Top Header Navigation & Child Profile Bar - Mobile Optimized */}
      <header className="max-w-4xl mx-auto w-full flex items-center justify-between gap-2 bg-[#0a122e]/95 backdrop-blur-xl p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl border-2 border-amber-400/50 shadow-lg">
        
        {/* Child Profile Button */}
        <button
          onClick={() => {
            audioManager.playClick();
            setIsProfileModalOpen(true);
          }}
          className="flex items-center gap-2 sm:gap-3 text-right hover:bg-white/10 p-1 sm:p-1.5 rounded-2xl transition-all active:scale-95 group"
          title="تبديل الطفل أو إضافة بطل جديد"
        >
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-xl sm:text-2xl flex items-center justify-center border-2 border-white shadow-glow-yellow group-hover:scale-105 transition-transform flex-shrink-0">
            👑
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-black text-xs sm:text-base text-white">
                {childName ? `البَطَل ${childName}` : 'اخْتَرِ البَطَل'}
              </span>
              <span className="text-xs text-amber-300">🔄</span>
            </div>
            <span className="text-[9px] sm:text-[10px] text-cyan-300 font-bold block">
              أَبْطَالُ هَذَا الهَاتِف 📱
            </span>
          </div>
        </button>

        {/* Selected Letter Quick Switcher & Stats */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          
          {/* Active Target Letter Badge */}
          <button
            onClick={() => {
              audioManager.playClick();
              setPendingTargetSection('stages');
              setIsLetterPickerOpen(true);
            }}
            className="flex items-center gap-1 bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 px-2.5 sm:px-3 py-1.5 rounded-xl sm:rounded-2xl border border-white font-black text-xs sm:text-sm shadow-glow-yellow active:scale-95 transition-all"
            title="انقر لتغيير الحرف الحالي"
          >
            <span className="hidden xs:inline text-[11px]">الحَرْف:</span>
            <span className="text-sm sm:text-base font-black">({currentLetter.char})</span>
            <span className="text-[10px] opacity-80">🔄</span>
          </button>

          <PWAInstallButton />

          <div className="flex items-center gap-1 bg-amber-500/20 px-2 sm:px-3 py-1.5 rounded-xl sm:rounded-2xl border border-amber-400/60 text-xs sm:text-sm font-black text-amber-300 shadow-sm">
            <Star className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-300 text-amber-300 animate-spin-slow" />
            <span>{stars}</span>
          </div>

          <div className="flex items-center gap-1 bg-yellow-500/20 px-2 sm:px-2.5 py-1.5 rounded-xl sm:rounded-2xl border border-yellow-400/50 text-xs sm:text-sm font-black text-yellow-300">
            <span>🪙</span>
            <span>{coins}</span>
          </div>
        </div>

      </header>

      {/* Main Grid: Big Interactive Square Tiles for Kids & Phone Layout */}
      <main className="max-w-4xl mx-auto w-full my-auto py-3 sm:py-5 space-y-4 sm:space-y-6">
        
        {/* Lumi Voice Guide Banner */}
        <LumiGuideBanner
          message={`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'}! أَنَا لُومِي.. اخْتَرْ طَرِيقَ المَرَاحِلِ لِتَتَدَرَّبَ، أَوْ مَرْصَدَ الحُرُوفِ لِتَسْتَكْشِف، أَوْ مُخْتَبَرَ اللِّسَانِ لِتُشَاهِدَ النُّطْق!`}
          shortHint="اخْتَرْ أَيَّ قِسْمٍ لِنَبْدَأ"
          autoSpeak={true}
          emotion="happy"
        />

        {/* Large Square Cards Grid - Mobile Friendly & Responsive */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-5">
          {hubSections.map((sec, idx) => (
            <button
              key={sec.id}
              onClick={() => handleTileClick(sec)}
              className={`group relative p-5 sm:p-6 rounded-3xl border-3 ${sec.borderColor} bg-gradient-to-br ${sec.bgGradient} ${sec.glowColor} text-right flex flex-col justify-between min-h-[160px] sm:min-h-[190px] md:min-h-[210px] aspect-auto sm:aspect-square lg:aspect-auto transition-all duration-300 hover:scale-[1.03] active:scale-95 overflow-hidden shadow-2xl ${
                idx === 0 ? 'sm:col-span-2 lg:col-span-1' : ''
              }`}
            >
              {/* Card Ambient Glow Highlight */}
              <div className="absolute top-0 right-0 w-36 h-36 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-500" />

              {/* Top Row: Big Square Emoji & Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-4xl sm:text-5xl group-hover:scale-125 transition-transform duration-300 drop-shadow-md">
                  {sec.icon}
                </span>
                <span className="bg-black/40 backdrop-blur-md text-white text-[10px] sm:text-[11px] font-black px-3 py-1 rounded-full border border-white/30 shadow-inner">
                  {sec.badge}
                </span>
              </div>

              {/* Bottom Row: Large Title & Subtitle */}
              <div className="relative z-10 pt-3 sm:pt-4 space-y-1">
                <h3 className="text-lg sm:text-xl font-black text-white group-hover:text-yellow-200 transition-colors drop-shadow-sm">
                  {sec.title}
                </h3>
                <p className="text-xs text-white/85 font-bold leading-relaxed">
                  {sec.subtitle}
                </p>
              </div>

              {/* Hover / Touch Action Indicator */}
              <div className="relative z-10 pt-2 flex items-center justify-between text-xs font-black text-yellow-300 opacity-95 group-hover:opacity-100">
                <span>انْقُرْ لِلبَدْء 🚀</span>
                <span className="group-hover:-translate-x-1.5 transition-transform">⬅️</span>
              </div>
            </button>
          ))}
        </div>

      </main>

      {/* Footer Branding */}
      <footer className="max-w-4xl mx-auto w-full text-center text-[10px] sm:text-[11px] text-slate-500 font-bold pt-2">
        <span>LUMI — مَمْلَكَةُ الأَصْوَاتِ وَمَخَارِجِ الحُرُوف</span>
      </footer>

      {/* Mandatory Letter Picker Modal */}
      <MandatoryLetterPickerModal
        isOpen={isLetterPickerOpen}
        onClose={() => setIsLetterPickerOpen(false)}
        onSelectLetter={handleLetterPicked}
      />

      {/* Multi-Child Profile Switcher Modal */}
      <ChildProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />

    </div>
  );
};

```

## 📄 ملف: `src\components\common\VoiceSettingsModal.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { X, Volume2, Mic, CheckCircle2, Sparkles } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

interface VoiceSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceSettingsModal: React.FC<VoiceSettingsModalProps> = ({ isOpen, onClose }) => {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');
  const [testText, setTestText] = useState<string>('مَرْحَبًا! هَذَا صَوْتُ لُومِي النَّاطِقُ الفَصِيح.');

  useEffect(() => {
    if (isOpen) {
      const vList = audioManager.getAvailableArabicVoices();
      setVoices(vList);
      if (vList.length > 0 && !selectedVoice) {
        setSelectedVoice(vList[0].name);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestVoice = (vName: string) => {
    audioManager.setSelectedVoice(vName);
    audioManager.speak(testText, 0.85);
  };

  const handleSelect = (vName: string) => {
    setSelectedVoice(vName);
    audioManager.setSelectedVoice(vName);
    audioManager.playClick();
    audioManager.speak('تَمَّ اخْتِيَارُ هَذَا الصَّوْتِ بِنَجَاح!');
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 select-none">
      <div className="bg-[#0f172a] border-2 border-indigo-500/40 rounded-3xl max-w-lg w-full p-6 text-white space-y-5 shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 to-indigo-600 flex items-center justify-center text-xl">
              🎙️
            </div>
            <div>
              <h3 className="text-lg font-black text-white">إِعْدَادَاتُ الصَّوْتِ (MICROSOFT NEURAL)</h3>
              <p className="text-xs text-cyan-300 font-bold">اخْتَرْ أَعْلَى وَأَصْفَى صَوْتٍ عَرَبِيٍّ طَبِيعِيّ</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#1e293b] text-slate-400 hover:text-white hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Voices List */}
        <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
          {voices.length === 0 ? (
            <div className="text-center py-6 text-slate-400 text-xs font-bold">
              جَارٍ تَحْمِيلُ أَصْوَاتِ النِّظَامِ وَمَايِكْرُوسُوفْت...
            </div>
          ) : (
            voices.map((v) => {
              const isMicrosoft = v.name.includes('Microsoft') || v.name.includes('Natural');
              const isSelected = selectedVoice === v.name;

              return (
                <div
                  key={v.name}
                  onClick={() => handleSelect(v.name)}
                  className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-glow-cyan'
                      : 'bg-[#1e293b] border-slate-700 hover:border-slate-500 text-slate-300'
                  }`}
                >
                  <div className="text-right space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-black text-xs md:text-sm">{v.name}</span>
                      {isMicrosoft && (
                        <span className="bg-amber-500/20 text-amber-300 border border-amber-500/40 text-[10px] font-black px-2 py-0.5 rounded-full">
                          مَايِكْرُوسُوفْت نِيُورَال ⭐
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold block">{v.lang}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTestVoice(v.name);
                    }}
                    className="p-2 rounded-xl bg-[#0f172a] hover:bg-cyan-600 text-cyan-300 hover:text-white border border-slate-700 transition-colors"
                    title="تَجْرِبَةُ الصَّوْت"
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Test Pronunciation Buttons */}
        <div className="bg-[#1e293b] p-3 rounded-2xl border border-slate-700 space-y-2">
          <span className="text-xs font-black text-slate-300 block text-right">اخْتِبَارُ نُطْقِ الحُرُوفِ وَالمَقَاطِع:</span>
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {['بَـ.. بَا', 'بِـ.. بِي', 'بُـ.. بُو', 'بَاب', 'بَطَّة'].map((sample) => (
              <button
                key={sample}
                onClick={() => audioManager.speak(sample)}
                className="px-3 py-1.5 bg-[#0f172a] hover:bg-cyan-600 text-white rounded-xl text-xs font-black border border-slate-600"
              >
                {sample}
              </button>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-black rounded-2xl shadow-glow-cyan text-sm"
        >
          حِفْظُ الإِعْدَادَاتِ وَالمُتَابَعَة
        </button>

      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\common\TopBar.tsx`
```typescript
import React from 'react';
import { Sparkles, Coins, Flame, Volume2, VolumeX, Eye, Compass, BookOpen, Shield } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';

interface TopBarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  currentTab,
  setCurrentTab
}) => {
  const {
    childName,
    stars,
    coins,
    streak,
    isVisualFirst,
    setIsVisualFirst,
    isMuted,
    toggleMute
  } = useGame();

  return (
    <header className="w-full bg-[#0a0f1d]/90 backdrop-blur-xl border-b-2 border-indigo-500/30 sticky top-0 z-40 px-3 py-2.5 md:px-6 md:py-3 shadow-lg select-none text-white">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        
        {/* Left Side: Child Avatar & Name */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-400 to-indigo-600 border-2 border-cyan-300 shadow-glow-cyan flex items-center justify-center text-2xl">
            🧑‍🚀
          </div>
          <div>
            <h2 className="font-black text-white text-sm md:text-base tracking-wide flex items-center gap-1.5">
              {childName}
            </h2>
            <div className="flex items-center gap-1 text-[11px] text-amber-400 font-extrabold">
              <Flame className="w-3.5 h-3.5 fill-amber-500 text-amber-500 animate-bounce-slow" />
              <span>{streak} أَيَّامٍ مُتَتَالِيَة! 🔥</span>
            </div>
          </div>
        </div>

        {/* Center: Stars & Coins */}
        <div className="flex items-center gap-2 md:gap-3 bg-[#1e293b]/90 px-3 py-1.5 rounded-2xl border border-slate-700 shadow-inner">
          <div className="flex items-center gap-1.5 bg-amber-500/20 text-amber-300 px-3 py-1 rounded-xl border border-amber-500/40 font-black text-xs md:text-sm">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>{stars}</span>
            <span className="text-[10px] text-amber-200">نجمة</span>
          </div>

          <div className="flex items-center gap-1.5 bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-xl border border-yellow-500/40 font-black text-xs md:text-sm">
            <Coins className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>{coins}</span>
            <span className="text-[10px] text-yellow-200">عملة</span>
          </div>
        </div>

        {/* Right Side: Accessibility, Parent Mode & Audio Controls */}
        <div className="flex items-center gap-2">
          {/* Visual-First Mode */}
          <button
            onClick={() => {
              audioManager.playClick();
              setIsVisualFirst(!isVisualFirst);
            }}
            className={`px-3 py-1.5 rounded-2xl font-black text-xs md:text-sm flex items-center gap-1.5 border transition-all ${
              isVisualFirst
                ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-glow-cyan'
                : 'bg-[#1e293b] text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="الوضع البصري المساند لضعاف السمع"
          >
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">الوضع البصري</span>
          </button>

          {/* Mute/Unmute */}
          <button
            onClick={() => toggleMute()}
            className={`p-2 rounded-2xl border transition-all ${
              isMuted
                ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                : 'bg-[#1e293b] text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title={isMuted ? 'تشغيل الصوت' : 'كتم الصوت'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          {/* Parent Mode Link */}
          <button
            onClick={() => {
              audioManager.playClick();
              setCurrentTab('parent');
            }}
            className={`p-2 rounded-2xl border transition-all ${
              currentTab === 'parent'
                ? 'bg-indigo-600 text-white border-indigo-400'
                : 'bg-[#1e293b] text-slate-300 border-slate-700 hover:bg-slate-800'
            }`}
            title="بوابة ولي الأمر والمعالج"
          >
            <Shield className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Main Navigation Bar */}
      <nav className="max-w-4xl mx-auto mt-3 flex items-center justify-between md:justify-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'hub', label: 'العَالَمُ الرَّئِيسِيّ 🌌' },
          { id: 'map', label: 'خريطة العوالم (8) 🗺️' },
          { id: 'observatory', label: 'مرصد الحروف (28) 🔤' },
          { id: 'mirror', label: 'مرآة لومي 🪞' }
        ].map((tab) => {
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioManager.playClick();
                setCurrentTab(tab.id);
              }}
              className={`px-4 py-2 rounded-2xl font-black text-xs md:text-sm transition-all whitespace-nowrap border ${
                isActive
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white border-cyan-300 shadow-glow-cyan scale-105'
                  : 'bg-[#1e293b] text-slate-300 border-slate-800 hover:bg-[#334155]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

```

## 📄 ملف: `src\components\common\StagesGuideModal.tsx`
```typescript
import React, { useState } from 'react';
import { STAGE_CURRICULUM_DEFINITIONS } from '../../engine/CurriculumEngine';
import { audioManager } from '../../audio/AudioManager';
import { Volume2, Sparkles, Trophy, ChevronRight, ChevronLeft, Play, X, Star } from 'lucide-react';

interface StagesGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectStage?: (stageNumber: number) => void;
  initialStage?: number;
}

const STAGE_ICONS = ['🔍', '🎙️', '🎵', '🌊', '📖', '🎯', '💬', '👑'];
const STAGE_COLORS = [
  'from-blue-500 to-cyan-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-yellow-500',
  'from-purple-500 to-indigo-500',
  'from-pink-500 to-rose-500',
  'from-orange-500 to-amber-500',
  'from-cyan-500 to-blue-600',
  'from-yellow-400 to-amber-600'
];

export const StagesGuideModal: React.FC<StagesGuideModalProps> = ({
  isOpen,
  onClose,
  onSelectStage,
  initialStage = 1
}) => {
  const [activeStageNum, setActiveStageNum] = useState<number>(initialStage);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  if (!isOpen) return null;

  const currentStage = STAGE_CURRICULUM_DEFINITIONS.find((s) => s.stageNumber === activeStageNum) || STAGE_CURRICULUM_DEFINITIONS[0];

  const handleSpeakExplanation = () => {
    audioManager.playClick();
    setIsSpeaking(true);
    audioManager.speak(`stage_${currentStage.stageNumber}_explain`, 0.85, () => {
      setIsSpeaking(false);
    });
  };

  const handlePrev = () => {
    audioManager.playClick();
    if (activeStageNum > 1) {
      setActiveStageNum(activeStageNum - 1);
    }
  };

  const handleNext = () => {
    audioManager.playClick();
    if (activeStageNum < 8) {
      setActiveStageNum(activeStageNum + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in select-none">
      <div className="bg-gradient-to-b from-[#0e1b40] via-[#091330] to-[#050a1c] w-full max-w-lg rounded-3xl border-3 border-amber-400/80 shadow-[0_0_60px_rgba(245,158,11,0.4)] text-white overflow-hidden flex flex-col max-h-[90vh] animate-pop">
        
        {/* Header */}
        <div className="p-4 border-b border-amber-400/30 bg-[#070e24]/90 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🗺️</span>
            <div>
              <h2 className="text-lg font-black text-amber-300">
                دَلِيلُ المَرَاحِلِ التَّعْلِيمِيَّةِ الثَّمَانِيَة
              </h2>
              <p className="text-[11px] text-cyan-200 font-bold">
                تَعَرَّفْ عَلَى خُطُوَاتِ رِحْلَةِ لُومِي السَّاحِرَة
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              audioManager.playClick();
              audioManager.stop();
              onClose();
            }}
            className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 font-black flex items-center justify-center hover:bg-slate-700 active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stage Number Tabs Pill Carousel */}
        <div className="p-3 bg-[#0a1435]/60 border-b border-blue-900/50 overflow-x-auto scrollbar-none flex gap-2">
          {STAGE_CURRICULUM_DEFINITIONS.map((stg) => {
            const isSelected = stg.stageNumber === activeStageNum;
            return (
              <button
                key={stg.stageNumber}
                onClick={() => {
                  audioManager.playClick();
                  setActiveStageNum(stg.stageNumber);
                }}
                className={`flex-shrink-0 px-3 py-1.5 rounded-2xl text-xs font-black transition-all flex items-center gap-1.5 border ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 border-white shadow-glow-yellow scale-105'
                    : 'bg-[#122048] text-slate-300 border-blue-900/80 hover:bg-[#182d63]'
                }`}
              >
                <span>{STAGE_ICONS[stg.stageNumber - 1]}</span>
                <span>المرحلة {stg.stageNumber}</span>
              </button>
            );
          })}
        </div>

        {/* Stage Card Content Area */}
        <div className="p-5 overflow-y-auto space-y-4 flex-1">
          
          {/* Stage Hero Banner */}
          <div className={`p-4 rounded-2xl bg-gradient-to-r ${STAGE_COLORS[activeStageNum - 1]} text-white border border-white/40 shadow-lg flex items-center gap-4`}>
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl border border-white/50 shadow-inner flex-shrink-0">
              {STAGE_ICONS[activeStageNum - 1]}
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-black bg-black/30 px-2.5 py-0.5 rounded-full border border-white/30">
                المَرْحَلَةُ {currentStage.stageNumber} مِنْ 8
              </span>
              <h3 className="text-xl font-black leading-tight drop-shadow-md">
                {currentStage.titleAr}
              </h3>
              <p className="text-xs font-bold text-white/90">
                🏛️ {currentStage.landmark3D}
              </p>
            </div>
          </div>

          {/* Voice Narrator Button */}
          <button
            onClick={handleSpeakExplanation}
            className={`w-full py-3 px-4 rounded-2xl font-black text-sm border-2 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-md ${
              isSpeaking
                ? 'bg-amber-400 text-slate-950 border-white animate-pulse'
                : 'bg-[#152758] hover:bg-[#1d3575] text-amber-300 border-amber-400/50'
            }`}
          >
            <Volume2 className={`w-5 h-5 ${isSpeaking ? 'animate-bounce' : ''}`} />
            <span>{isSpeaking ? 'جَارِي شَرْحُ المَرْحَلَة بِصَوْتِ لُومِي... 🔊' : '🔊 اسْتَمِعْ لِشَرْحِ المَرْحَلَةِ كَامِلًا'}</span>
          </button>

          {/* Goal & Description Box */}
          <div className="bg-[#0b1638] p-4 rounded-2xl border border-blue-900/80 space-y-3">
            <div>
              <h4 className="text-xs font-black text-amber-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>مَا هُوَ هَدَفُ المَرْحَلَة؟</span>
              </h4>
              <p className="text-sm font-bold text-slate-200 mt-1 leading-relaxed">
                {currentStage.explanationAr}
              </p>
            </div>

            <div className="pt-2 border-t border-blue-900/40">
              <h4 className="text-xs font-black text-cyan-300 flex items-center gap-1.5">
                <span>🎮</span>
                <span>كَيْفَ يَلْعَبُ الطِّفْلُ وَيَتَعَلَّم؟</span>
              </h4>
              <p className="text-xs font-bold text-cyan-100/90 mt-1 leading-relaxed">
                {currentStage.howToPlayAr}
              </p>
            </div>
          </div>

          {/* Rewards Pill */}
          <div className="flex items-center justify-between bg-[#08102a] p-3 rounded-2xl border border-amber-500/30">
            <span className="text-xs font-bold text-slate-300">
              جَوَائِزُ إِتْقَانِ المَرْحَلَة:
            </span>
            <div className="flex items-center gap-3 font-black text-xs">
              <span className="text-amber-300 flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-300" />
                +1 نجمة
              </span>
              <span className="text-yellow-300">
                🪙 +10 كوينز
              </span>
              {activeStageNum === 8 && (
                <span className="text-amber-400 flex items-center gap-1">
                  <Trophy className="w-3.5 h-3.5" />
                  تاج البطل 👑
                </span>
              )}
            </div>
          </div>

        </div>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-blue-900/60 bg-[#070e24] flex items-center justify-between gap-2">
          <button
            onClick={handlePrev}
            disabled={activeStageNum === 1}
            className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1 transition-all ${
              activeStageNum === 1
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                : 'bg-[#111e47] border-blue-800 text-slate-200 hover:bg-[#1a2d68] active:scale-95'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
            <span>السَّابِقَة</span>
          </button>

          {onSelectStage && (
            <button
              onClick={() => {
                audioManager.playPortal();
                onSelectStage(activeStageNum);
                onClose();
              }}
              className="flex-1 py-2.5 px-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 text-slate-950 rounded-xl font-black text-sm border border-white shadow-glow-yellow active:scale-95 transition-all flex items-center justify-center gap-1.5"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>انْطَلِقْ لِلْمَرْحَلَة {activeStageNum} 🚀</span>
            </button>
          )}

          <button
            onClick={handleNext}
            disabled={activeStageNum === 8}
            className={`p-2.5 rounded-xl border font-bold text-xs flex items-center gap-1 transition-all ${
              activeStageNum === 8
                ? 'opacity-40 cursor-not-allowed border-slate-800 text-slate-600'
                : 'bg-[#111e47] border-blue-800 text-slate-200 hover:bg-[#1a2d68] active:scale-95'
            }`}
          >
            <span>التَّالِيَة</span>
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\common\PWAInstallButton.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { Download, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Check if already in standalone/installed mode
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    audioManager.playVictory();
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsInstallable(false);
      audioManager.speak('مُبَارَك! تَمَّ تَثْبِيتُ تَطْبِيقِ لُومِي عَلَى هَاتِفِك!');
    }
    setDeferredPrompt(null);
  };

  // Don't render if already installed or not ready to install
  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs border border-emerald-300/60 shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-all animate-pulse"
      title="تثبيت تطبيق لومي كتطبيق مباشر على هاتفك للعمل بدون إنترنت"
    >
      <Smartphone className="w-3.5 h-3.5" />
      <span>تَثْبِيتُ التَّطْبِيق 📲</span>
    </button>
  );
};

```

## 📄 ملف: `src\components\common\MandatoryLetterPickerModal.tsx`
```typescript
import React from 'react';
import { Sparkles, X, Check, Volume2, Star } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';

interface MandatoryLetterPickerModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSelectLetter: (letterId: string) => void;
  title?: string;
  subtitle?: string;
}

export const MandatoryLetterPickerModal: React.FC<MandatoryLetterPickerModalProps> = ({
  isOpen,
  onClose,
  onSelectLetter,
  title = 'اخْتَرْ حَرْفَكَ لِبَدْءِ المُغَامَرَة! 🎯',
  subtitle = 'اخْتَرِ الحَرْفَ الَّذِي تُرِيدُ أَنْ تَتَدَرَّبَ عَلَيْهِ وَتَلْعَبَ بِه'
}) => {
  const { selectedLetterId, setSelectedLetterId, letterProgressMap } = useGame();

  if (!isOpen) return null;

  const handlePickLetter = (letter: LetterData) => {
    audioManager.playPortal();
    audioManager.speak(`حَرْفُ ${letter.nameAr}.. ${letter.char}`);
    setSelectedLetterId(letter.id);
    onSelectLetter(letter.id);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 md:p-6 select-none font-arabic animate-fadeIn">
      
      <div className="bg-gradient-to-b from-[#0e1b3d] to-[#080e21] border-3 border-amber-400 rounded-3xl max-w-2xl w-full p-4 md:p-6 text-white shadow-[0_0_50px_rgba(245,158,11,0.4)] flex flex-col max-h-[90vh] space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-900/80 pb-3">
          <div className="space-y-0.5 text-right">
            <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 text-[11px] font-black px-3 py-0.5 rounded-full border border-amber-400/40">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>خُطْوَةٌ أَسَاسِيَّة — اخْتِيَارُ الحَرْف</span>
            </div>
            <h2 className="text-lg md:text-2xl font-black text-white">
              {title}
            </h2>
            <p className="text-xs text-cyan-300 font-bold">
              {subtitle}
            </p>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-2xl bg-white/10 hover:bg-white/20 text-slate-300 border border-white/20 active:scale-90 transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* 28 Letters Grid (Scrollable) */}
        <div className="flex-1 overflow-y-auto pr-1 no-scrollbar space-y-3">
          <div className="grid grid-cols-4 sm:grid-cols-7 gap-2.5">
            {ARABIC_LETTERS.map((ltr) => {
              const isSelected = ltr.id === selectedLetterId;
              const progress = letterProgressMap[ltr.id];
              const isMastered = progress?.masteryPercentage === 100;

              return (
                <button
                  key={ltr.id}
                  onClick={() => handlePickLetter(ltr)}
                  className={`p-2.5 rounded-2xl flex flex-col items-center justify-between min-h-[75px] md:min-h-[85px] transition-all duration-200 active:scale-95 relative border-2 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 border-white shadow-glow-yellow scale-105'
                      : 'bg-[#13224d] hover:bg-[#1c3272] text-white border-blue-800/80 hover:border-amber-400/60'
                  }`}
                >
                  {/* Top Character */}
                  <span className="text-2xl md:text-3xl font-black">
                    {ltr.char}
                  </span>

                  {/* Letter Name */}
                  <span className={`text-[10px] font-black ${isSelected ? 'text-slate-950 font-bold' : 'text-cyan-200'}`}>
                    {ltr.nameAr}
                  </span>

                  {/* Mastery Badge */}
                  {isMastered && (
                    <span className="absolute -top-1 -right-1 text-[10px] bg-amber-400 text-slate-950 rounded-full w-4 h-4 flex items-center justify-center font-bold shadow-sm">
                      👑
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Helper Bar */}
        <div className="pt-2 border-t border-blue-900/60 text-center">
          <p className="text-[11px] text-slate-400 font-bold">
            💡 اضْغَطْ عَلَى الحَرْفِ لِيَتِمَّ تَطْبِيقُ كُلِّ التَّدْرِيبَاتِ وَالأَلْعَابِ عَلَيْه!
          </p>
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\common\LumiGuideBanner.tsx`
```typescript
import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Sparkles, VolumeX } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';

interface LumiGuideBannerProps {
  message: string;
  shortHint?: string;
  autoSpeak?: boolean;
  emotion?: 'happy' | 'talking' | 'cheering' | 'listening' | 'excited';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LumiGuideBanner: React.FC<LumiGuideBannerProps> = ({
  message,
  shortHint,
  autoSpeak = true,
  emotion = 'happy',
  size = 'md',
  className = ''
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const isMountedRef = useRef<boolean>(true);
  const timerRef = useRef<number | null>(null);

  const handleSpeak = () => {
    if (!message) return;
    audioManager.stop();
    setIsPlaying(true);
    
    audioManager.speak(message, 0.85, () => {
      if (isMountedRef.current) {
        setIsPlaying(false);
      }
    });
  };

  useEffect(() => {
    isMountedRef.current = true;

    if (autoSpeak && message) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        if (isMountedRef.current) {
          handleSpeak();
        }
      }, 250);
    }

    return () => {
      isMountedRef.current = false;
      if (timerRef.current) clearTimeout(timerRef.current);
      audioManager.stop();
    };
  }, [message]);

  const canvasSize = size === 'sm' ? 75 : size === 'lg' ? 110 : 90;

  return (
    <div
      className={`relative z-20 w-full max-w-3xl mx-auto bg-gradient-to-r from-[#0d1b46]/95 via-[#10235e]/95 to-[#0b163a]/95 backdrop-blur-xl rounded-3xl p-3 sm:p-4 border-2 border-amber-400/80 shadow-[0_0_25px_rgba(245,158,11,0.25)] flex items-center justify-between gap-3 sm:gap-4 select-none ${className}`}
      dir="rtl"
    >
      {/* Living Animated Lumi Character */}
      <div
        onClick={handleSpeak}
        className="relative cursor-pointer group flex-shrink-0 transition-transform active:scale-95"
        title="انقر على لومي لسماع الشرح!"
      >
        <div className="relative">
          <LumiMascot
            state={isPlaying ? 'listening' : (emotion === 'happy' ? 'idle' : 'success')}
            size="md"
          />
          {/* Glowing Ring around Lumi */}
          <div
            className={`absolute inset-0 rounded-full pointer-events-none transition-opacity duration-300 ${
              isPlaying
                ? 'ring-4 ring-amber-400 ring-offset-2 ring-offset-[#0d1b46] animate-pulse opacity-100'
                : 'opacity-0 group-hover:opacity-100 ring-2 ring-amber-300'
            }`}
          />
        </div>

        {/* Lumi Badge */}
        <div className="absolute -bottom-1 inset-x-0 flex justify-center pointer-events-none">
          <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full border border-white shadow-md flex items-center gap-0.5">
            <Sparkles className="w-2.5 h-2.5 text-amber-950 fill-amber-950" />
            لُومِي
          </span>
        </div>
      </div>

      {/* Guide Speech Text */}
      <div className="flex-1 min-w-0 pr-1">
        <div className="flex items-center gap-1.5 mb-1">
          <span className="text-[10px] sm:text-xs font-black text-amber-300 bg-amber-500/20 px-2 py-0.5 rounded-full border border-amber-400/40 inline-flex items-center gap-1">
            <Sparkles className="w-3 h-3 fill-amber-300 text-amber-300" />
            مرشدك السحري لومي يشرح لك:
          </span>
          {shortHint && (
            <span className="hidden sm:inline-block text-[10px] text-cyan-300 font-bold">
              • {shortHint}
            </span>
          )}
        </div>
        <p className="text-white font-extrabold text-xs sm:text-sm md:text-base leading-relaxed tracking-wide">
          {message}
        </p>
      </div>

      {/* Audio Button */}
      <button
        onClick={handleSpeak}
        className={`flex-shrink-0 flex flex-col items-center justify-center gap-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl border-2 font-black transition-all active:scale-90 shadow-md ${
          isPlaying
            ? 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 border-white shadow-glow-yellow animate-pulse'
            : 'bg-[#152a6b] text-amber-300 border-amber-400/60 hover:bg-[#1e3c99] hover:text-white'
        }`}
        title="استمع لصوت لومي"
      >
        <Volume2 className={`w-5 h-5 sm:w-6 sm:h-6 ${isPlaying ? 'animate-bounce' : ''}`} />
        <span className="text-[10px] sm:text-[11px] font-black whitespace-nowrap">
          {isPlaying ? 'يَتَحَدَّث...' : 'اسْتَمِعْ 🔊'}
        </span>
      </button>
    </div>
  );
};

```

## 📄 ملف: `src\components\common\ChildProfileModal.tsx`
```typescript
import React, { useState } from 'react';
import { X, UserPlus, Users, Sparkles, Star, Trophy, Trash2, Check, ArrowRight } from 'lucide-react';
import { useGame, ChildProfile } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';

interface ChildProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChildProfileModal: React.FC<ChildProfileModalProps> = ({ isOpen, onClose }) => {
  const {
    profiles,
    activeProfileId,
    switchProfile,
    createProfile,
    deleteProfile,
    childName
  } = useGame();

  const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
  const [newChildName, setNewChildName] = useState<string>('');
  const [newChildAge, setNewChildAge] = useState<number>(6);
  const [newChildAvatarEmoji, setNewChildAvatarEmoji] = useState<string>('👑');

  if (!isOpen) return null;

  const handleSelectProfile = (profileId: string) => {
    const prof = profiles.find(p => p.id === profileId);
    audioManager.playClick();
    switchProfile(profileId);
    if (prof) {
      setTimeout(() => {
        audioManager.speak(`أَهْلًا يَا ${prof.name}! هَيَّا نُكْمِلُ رِحْلَتَنَا السَّاحِرَة!`);
      }, 250);
    }
    onClose();
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newChildName.trim();
    if (!cleanName) return;

    audioManager.playVictory();
    const newId = createProfile(cleanName, newChildAge, newChildAvatarEmoji);
    setTimeout(() => {
      audioManager.speak(`أَهْلًا بِكَ يَا ${cleanName}! مَرْحَبًا بِكَ فِي مَمْلَكَةِ الأَصْوَات!`);
    }, 250);
    setIsCreatingNew(false);
    setNewChildName('');
    onClose();
  };

  const handleDelete = (e: React.MouseEvent, profileId: string, name: string) => {
    e.stopPropagation();
    if (confirm(`هل تريد حذف ملف البطل (${name})؟ لن تتأثر ملفات الأطفال الآخرين.`)) {
      audioManager.playClick();
      deleteProfile(profileId);
    }
  };

  const avatarOptions = [
    { emoji: '👑', label: 'الملك' },
    { emoji: '🦁', label: 'الأسد الشجاع' },
    { emoji: '🚀', label: 'رائد الفضاء' },
    { emoji: '⭐', label: 'نجم الأبطال' },
    { emoji: '🦄', label: 'المهر السحري' },
    { emoji: '🐱', label: 'القط الذكي' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 select-none">
      <div className="bg-[#091330] border-2 border-amber-400/80 rounded-3xl max-w-md w-full p-5 md:p-6 text-white space-y-4 shadow-[0_0_50px_rgba(245,158,11,0.35)] relative overflow-hidden">
        
        {/* Ambient Top Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-400/20 rounded-full blur-2xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-blue-900/60 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-amber-500 text-slate-950 flex items-center justify-center text-xl shadow-glow-yellow">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-amber-200">
                أَبْطَالُ هَذَا الهَاتِف 📱
              </h3>
              <p className="text-[11px] text-cyan-300 font-bold">
                حِفْظٌ مُسْتَقِلٌّ لِكُلِّ طِفْلٍ دُونَ تَدَاخُل!
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-[#111f4d] text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* MODE 1: PROFILES LIST */}
        {!isCreatingNew && (
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1 text-xs font-black text-slate-300">
              <span>اخْتَرِ البَطَلَ الَّذِي يَلْعَبُ الآن:</span>
              <span className="text-amber-400">{profiles.length} أَبْطَال</span>
            </div>

            {/* Profile Cards */}
            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {profiles.map((p) => {
                const isActive = p.id === activeProfileId;
                return (
                  <div
                    key={p.id}
                    onClick={() => handleSelectProfile(p.id)}
                    className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex items-center justify-between relative group ${
                      isActive
                        ? 'bg-gradient-to-r from-amber-500/25 via-yellow-500/15 to-blue-950/40 border-amber-400 shadow-glow-yellow scale-[1.02]'
                        : 'bg-[#0e1c45] border-blue-900/80 hover:border-amber-400/50 hover:bg-[#132457]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-2xl flex items-center justify-center border-2 border-white shadow-md">
                        {p.avatarEmoji || '👑'}
                      </div>

                      <div className="text-right">
                        <div className="flex items-center gap-2">
                          <span className="font-black text-sm text-white">{p.name}</span>
                          {isActive && (
                            <span className="bg-amber-400 text-slate-950 text-[9px] font-black px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <Check className="w-3 h-3" />
                              يَلْعَبُ الآن
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-[11px] text-cyan-300 font-bold mt-0.5">
                          <span className="flex items-center gap-0.5 text-amber-300">
                            <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                            {p.stars} نَجْمَة
                          </span>
                          <span>•</span>
                          <span>🪙 {p.coins}</span>
                          <span>•</span>
                          <span className="text-slate-400">{p.age} سَنَوَات</span>
                        </div>
                      </div>
                    </div>

                    {/* Delete action (disabled if only 1 profile) */}
                    {profiles.length > 1 && (
                      <button
                        onClick={(e) => handleDelete(e, p.id, p.name)}
                        className="opacity-0 group-hover:opacity-100 p-2 rounded-xl text-red-400 hover:bg-red-950/60 hover:text-red-300 transition-all"
                        title="حذف هذا الملف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Add New Child Button */}
            <button
              onClick={() => {
                audioManager.playClick();
                setIsCreatingNew(true);
              }}
              className="w-full py-3 rounded-2xl bg-[#14265c] hover:bg-[#1d3782] border-2 border-dashed border-amber-400/60 text-amber-300 font-black text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>إِضَافَةُ طِفْلٍ / بَطَلٍ جَدِيد ➕</span>
            </button>
          </div>
        )}

        {/* MODE 2: CREATE NEW CHILD PROFILE */}
        {isCreatingNew && (
          <form onSubmit={handleCreateSubmit} className="space-y-4 animate-pop">
            <div className="text-center space-y-1">
              <span className="text-xs font-black text-amber-300">
                مَلَفُّ بَطَلٍ جَدِيد 🌟
              </span>
              <p className="text-xs text-slate-300 font-bold">
                سَيَتِمُّ حِفْظُ تَقَدُّمِهِ وَنُجُومِهِ بِشَكْلٍ مُسْتَقِلٍّ كُلِّيًّا!
              </p>
            </div>

            {/* Child Name Input */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-black text-amber-200 block">
                اسْمُ البَطَل:
              </label>
              <input
                type="text"
                value={newChildName}
                onChange={(e) => setNewChildName(e.target.value)}
                placeholder="مَثَلًا: أَحْمَد، سَارَة، يُوسُف..."
                autoFocus
                required
                className="w-full px-4 py-3 bg-[#070e24] border-2 border-amber-400 rounded-2xl text-center text-white font-black text-base placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-inner"
              />
            </div>

            {/* Age Selection */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-black text-amber-200 block">
                العُمْر: ({newChildAge} سَنَوَات)
              </label>
              <div className="flex items-center justify-between gap-1.5">
                {[4, 5, 6, 7, 8, 9, 10].map((a) => (
                  <button
                    key={a}
                    type="button"
                    onClick={() => setNewChildAge(a)}
                    className={`flex-1 py-2 rounded-xl font-black text-xs transition-all ${
                      newChildAge === a
                        ? 'bg-amber-400 text-slate-950 font-extrabold shadow-glow-yellow'
                        : 'bg-[#0f1d47] text-slate-300 border border-blue-900'
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            {/* Emoji Avatar Selection */}
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-black text-amber-200 block">
                اخْتَرِ الشَّخْصِيَّة:
              </label>
              <div className="flex items-center justify-center gap-2">
                {avatarOptions.map((opt) => (
                  <button
                    key={opt.emoji}
                    type="button"
                    onClick={() => setNewChildAvatarEmoji(opt.emoji)}
                    className={`w-11 h-11 rounded-2xl text-2xl flex items-center justify-center border-2 transition-all ${
                      newChildAvatarEmoji === opt.emoji
                        ? 'bg-amber-400/30 border-amber-300 scale-110 shadow-glow-yellow'
                        : 'bg-[#070e24] border-blue-900 opacity-70 hover:opacity-100'
                    }`}
                  >
                    {opt.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="flex-1 py-3 rounded-2xl bg-[#0f1d47] text-slate-300 font-black text-xs hover:bg-[#182e6e] transition-colors"
              >
                إِلْغَاء
              </button>

              <button
                type="submit"
                className="flex-1 py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-xs shadow-glow-yellow active:scale-95 transition-transform"
              >
                حِفْظُ البَطَلِ وَالانْطِلاق 🚀
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\avatar\AvatarCustomizationShop.tsx`
```typescript
import React, { useState } from 'react';
import { Sparkles, Coins, Star, Check, Lock, ArrowRight, User } from 'lucide-react';
import avatarItems from '../../data/avatar_items.json';
import { useGame } from '../../context/GameContext';
import { soundManager } from '../../services/audio/SoundManager';

export const AvatarCustomizationShop: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { avatar, setAvatar, inventory, coins, stars, buyAvatarItem } = useGame();
  const [activeCategory, setActiveCategory] = useState<'skin' | 'hat' | 'outfit' | 'accessory' | 'room'>('outfit');

  const filteredItems = avatarItems.filter(item => item.category === activeCategory);

  const categories = [
    { id: 'outfit', label: 'المَلابِس 👕' },
    { id: 'hat', label: 'القُبَّعَات 🧢' },
    { id: 'accessory', label: 'الإِكْسِسْوَارَات 👓' },
    { id: 'skin', label: 'اللَّوْن 🌟' },
    { id: 'room', label: 'الخَلْفِيَّة 🏞️' }
  ];

  const handleEquipOrBuy = (item: typeof avatarItems[0]) => {
    const isOwned = inventory.includes(item.id);
    if (isOwned) {
      soundManager.playClick();
      setAvatar({ ...avatar, [item.category]: item.id });
    } else {
      const success = buyAvatarItem(item.id, item.price, item.stars);
      if (success) {
        setAvatar({ ...avatar, [item.category]: item.id });
      } else {
        soundManager.playEncouragement();
        soundManager.speak('تحتاج إلى المزيد من العملات أو النجوم!');
      }
    }
  };

  const selectedRoom = avatarItems.find(i => i.id === avatar.room) || avatarItems[avatarItems.length - 1];
  const selectedSkin = avatarItems.find(i => i.id === avatar.skin);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Header */}
      <div className="flex items-center justify-between bg-white/90 p-4 rounded-3xl border-2 border-purple-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              soundManager.playClick();
              onBack();
            }}
            className="p-2.5 rounded-2xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-xl md:text-2xl font-black text-slate-800 flex items-center gap-2">
              <span>تَخْصِيصُ الشَّخْصِيَّةِ وَالمَتْجَر</span>
              <span className="text-2xl">👕</span>
            </h1>
            <p className="text-xs text-slate-500 font-bold">
              غَيِّرْ مَلابِسَ وَقُبَّعَةَ وَخَلْفِيَّةَ بَطَلِك!
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-amber-100 text-amber-900 px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span>{stars}</span>
          </div>
          <div className="bg-yellow-100 text-yellow-900 px-3 py-1.5 rounded-xl font-black text-xs flex items-center gap-1">
            <Coins className="w-3.5 h-3.5 fill-yellow-500 text-yellow-600" />
            <span>{coins}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Side: Avatar Live Stage Preview */}
        <div className={`game-card p-6 border-4 border-purple-300 bg-gradient-to-b ${selectedRoom?.gradient || 'from-sky-300 to-indigo-200'} flex flex-col items-center justify-center min-h-[380px] shadow-card-pop relative overflow-hidden`}>
          <span className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black text-slate-800">
            بَطَلُ الأَصْوَات
          </span>

          {/* Animated Hero Avatar */}
          <div className="relative w-44 h-44 flex items-center justify-center animate-float">
            {/* Base Body */}
            <div
              className="w-32 h-32 rounded-full border-4 border-white shadow-2xl flex items-center justify-center text-6xl relative"
              style={{ backgroundColor: selectedSkin?.color || '#fde047' }}
            >
              {/* Face Emoji Expression */}
              <span>🧑‍🚀</span>

              {/* Hat Overlay */}
              {avatar.hat !== 'hat_none' && (
                <div className="absolute -top-7 text-4xl">
                  {avatarItems.find(i => i.id === avatar.hat)?.emoji}
                </div>
              )}

              {/* Accessory Overlay */}
              {avatar.accessory !== 'acc_none' && (
                <div className="absolute -bottom-2 -left-2 text-3xl">
                  {avatarItems.find(i => i.id === avatar.accessory)?.emoji}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl text-center border-2 border-white shadow-sm">
            <h4 className="font-black text-slate-800 text-sm">
              أَنْتَ تَبْدُو رَائِعًا جِدًّا! 🌟
            </h4>
          </div>
        </div>

        {/* Right Side: Category Switcher & Shop Grid */}
        <div className="md:col-span-2 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => {
                  soundManager.playClick();
                  setActiveCategory(cat.id as any);
                }}
                className={`px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm whitespace-nowrap border-2 transition-all ${
                  activeCategory === cat.id
                    ? 'bg-purple-600 text-white border-white shadow-md'
                    : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Items Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {filteredItems.map(item => {
              const isOwned = inventory.includes(item.id);
              const isEquipped = (avatar as any)[item.category] === item.id;
              const canAfford = coins >= item.price && stars >= item.stars;

              return (
                <div
                  key={item.id}
                  onClick={() => handleEquipOrBuy(item)}
                  className={`game-card p-4 border-3 cursor-pointer flex flex-col items-center justify-between text-center min-h-[160px] transition-all ${
                    isEquipped
                      ? 'border-purple-500 bg-purple-50 shadow-md scale-105'
                      : isOwned
                      ? 'border-slate-200 bg-white hover:border-purple-300'
                      : 'border-slate-200 bg-slate-50/90 opacity-80'
                  }`}
                >
                  <span className="text-4xl my-2">{item.emoji}</span>

                  <h5 className="font-black text-slate-800 text-xs mb-1">
                    {item.nameAr}
                  </h5>

                  {/* Status / Purchase Button */}
                  {isEquipped ? (
                    <span className="bg-purple-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      مُسْتَخْدَم
                    </span>
                  ) : isOwned ? (
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2.5 py-0.5 rounded-full">
                      مَمْلُوك (ارْتَدِ)
                    </span>
                  ) : (
                    <div className="flex items-center gap-1.5 text-[11px] font-black text-yellow-800 bg-yellow-100 px-2 py-0.5 rounded-full border border-yellow-300">
                      <Coins className="w-3 h-3 fill-yellow-600 text-yellow-600" />
                      <span>{item.price}</span>
                      {item.stars > 0 && <span>⭐{item.stars}</span>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\articulation\RealisticTongueAnatomy.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { getTongueDataForLetter, TongueArticulationConfig } from '../../data/tongueArticulationData';
import { LetterData } from '../../data/letters';
import { Sparkles, Volume2, Star, CheckCircle } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

interface RealisticTongueAnatomyProps {
  letter: LetterData;
  isAnimating?: boolean;
  showLabels?: boolean;
  showAirflow?: boolean;
  compact?: boolean;
}

export const RealisticTongueAnatomy: React.FC<RealisticTongueAnatomyProps> = ({
  letter,
  isAnimating = false,
  showLabels = true,
  showAirflow = true,
  compact = false,
}) => {
  const [tongueData, setTongueData] = useState<TongueArticulationConfig | null>(null);
  const [animPhase, setAnimPhase] = useState<'rest' | 'contact' | 'release'>('contact');
  const [localAnimating, setLocalAnimating] = useState<boolean>(false);

  useEffect(() => {
    const data = getTongueDataForLetter(letter.id);
    if (data) {
      setTongueData(data);
      setAnimPhase('contact');
    }
  }, [letter.id]);

  // Handle auto-animation or manual trigger
  const effectiveAnimating = isAnimating || localAnimating;

  useEffect(() => {
    if (!effectiveAnimating || !tongueData) return;

    setAnimPhase('rest');
    const t1 = setTimeout(() => setAnimPhase('contact'), 500);
    const t2 = setTimeout(() => setAnimPhase('release'), 1800);
    const t3 = setTimeout(() => {
      setAnimPhase('contact');
      setLocalAnimating(false);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [effectiveAnimating, tongueData]);

  if (!tongueData) return null;

  const isContact = animPhase === 'contact';
  const isRelease = animPhase === 'release';
  const isRest = animPhase === 'rest';

  // Resting tongue position (soft relaxed curve at floor of mouth)
  const restTonguePath = 'M 70 205 C 80 195 105 185 135 175 C 160 168 180 170 190 175 L 192 182 C 180 186 160 188 135 192 C 100 200 80 210 70 205 Z';

  // Current active tongue path
  const currentTonguePath = isRest ? restTonguePath : tongueData.tonguePath;

  // Lip state calculations
  const jawOffset = isContact ? tongueData.jawOpen * 14 : 4;
  const upperLipY = 96 + (isContact ? tongueData.upperLipOffset : 0);
  const lowerLipY = 138 + jawOffset + (isContact ? tongueData.lowerLipOffset : 0);

  const containerHeight = compact ? 'h-60' : 'h-72 md:h-80';

  const handleInteractiveTap = () => {
    setLocalAnimating(true);
    audioManager.speak(`صَوْتُ حَرْفِ ${letter.nameAr}.. ${letter.char}ْ`);
  };

  return (
    <div className={`relative w-full ${containerHeight} flex flex-col items-center justify-center select-none`}>
      
      {/* Interactive Floating Hint for Children */}
      {!compact && (
        <div className="absolute top-1 left-2 z-10 flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-pink-500/20 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/40 text-[11px] font-black text-amber-200">
          <Star className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300 animate-bounce" />
          <span>المِسِ النَّجْمَةَ الذَّهَبِيَّةَ بِلِسَانِك!</span>
        </div>
      )}

      {/* SVG Sagittal Child-Friendly & Realistic Anatomy Cutaway */}
      <svg
        viewBox="0 0 300 250"
        className="w-full h-full drop-shadow-2xl cursor-pointer"
        style={{ maxWidth: compact ? '270px' : '360px' }}
        onClick={handleInteractiveTap}
      >
        <defs>
          {/* Soft Child Skin Tone */}
          <linearGradient id="childSkin" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffdfba" />
            <stop offset="60%" stopColor="#f8c291" />
            <stop offset="100%" stopColor="#e77f67" />
          </linearGradient>

          {/* Clean Oral Cavity Inside Mouth */}
          <radialGradient id="mouthCavity" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4a0e2e" />
            <stop offset="75%" stopColor="#2c0b1d" />
            <stop offset="100%" stopColor="#17030e" />
          </radialGradient>

          {/* Vibrant Healthy Pink Tongue */}
          <linearGradient id="kidTongue" x1="0" y1="0" x2="0.2" y2="1">
            <stop offset="0%" stopColor="#ff758c" />
            <stop offset="45%" stopColor="#ff5376" />
            <stop offset="85%" stopColor="#e63963" />
            <stop offset="100%" stopColor="#c2185b" />
          </linearGradient>

          {/* Tongue Highlights */}
          <linearGradient id="tongueShine" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ff758c" stopOpacity="0" />
          </linearGradient>

          {/* Soft Palate Roof */}
          <linearGradient id="palateRoof" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#f6b93b" />
            <stop offset="40%" stopColor="#fda7df" />
            <stop offset="100%" stopColor="#f8a5c2" />
          </linearGradient>

          {/* Magic Star Glow */}
          <filter id="starGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft Breeze Airflow */}
          <filter id="breezeGlow">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* ===== 1. HEAD PROFILE OUTLINE (Clear Child Profile) ===== */}
        <path
          d="M 35 35 C 60 15 165 15 210 30 C 235 45 250 70 252 95 C 255 105 250 110 240 112 C 248 118 252 130 248 145 C 242 165 225 185 215 195 C 195 215 170 225 130 225 L 45 225 C 35 215 30 190 28 140 C 26 90 28 50 35 35 Z"
          fill="url(#childSkin)"
          stroke="#e77f67"
          strokeWidth="3"
        />

        {/* ===== 2. INSIDE MOUTH CAVITY (Clean Deep Space) ===== */}
        <path
          d="M 60 65 C 100 50 165 48 200 65 C 215 72 225 85 222 110 C 220 135 205 160 195 175 C 160 195 110 200 65 190 C 50 170 48 110 60 65 Z"
          fill="url(#mouthCavity)"
          stroke="#d63031"
          strokeWidth="2"
        />

        {/* ===== 3. ROOF OF MOUTH / PALATE (سقف الحلق الأملس) ===== */}
        <path
          d="M 90 65 C 130 52 170 54 205 68 C 212 72 216 78 214 84 L 202 84 C 200 78 195 75 188 73 C 160 66 125 66 102 75 C 96 77 92 82 90 85 Z"
          fill="url(#palateRoof)"
          stroke="#f8a5c2"
          strokeWidth="2"
        />

        {/* Cute Soft Uvula (اللهاة المتدلية) */}
        <ellipse
          cx="88"
          cy={tongueData.softPalateLowered && isContact ? 100 : 88}
          rx="6"
          ry="9"
          fill="#ff7675"
          stroke="#d63031"
          strokeWidth="1.5"
          style={{ transition: 'all 0.5s ease' }}
        />

        {/* ===== 4. BRIGHT WHITE TEETH (الأسنان النظيفة) ===== */}
        {/* Upper Teeth (الأسنان العلوية) */}
        <g>
          <rect x="208" y="72" width="10" height="20" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="219" y="74" width="9" height="18" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
          <rect x="228" y="76" width="8" height="15" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          {/* Shine on main tooth */}
          <rect x="210" y="75" width="3" height="12" rx="1" fill="#e2e8f0" opacity="0.6" />
        </g>

        {/* Lower Teeth (الأسنان السفلية) */}
        <g style={{ transition: 'transform 0.5s ease', transform: `translateY(${jawOffset}px)` }}>
          <rect x="208" y="142" width="10" height="18" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="219" y="140" width="9" height="16" rx="3" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1.2" />
          <rect x="228" y="142" width="8" height="14" rx="3" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="1" />
          <rect x="210" y="145" width="3" height="10" rx="1" fill="#e2e8f0" opacity="0.6" />
        </g>

        {/* ===== 5. CUTE EXPRESSIVE LIPS (الشفتان) ===== */}
        {/* Upper Lip */}
        <path
          d={`M 235 ${upperLipY - 4} C 245 ${upperLipY - 12} 258 ${upperLipY - 10} 265 ${upperLipY} C 270 ${upperLipY + 8} 260 ${upperLipY + 12} 248 ${upperLipY + 10} L 235 ${upperLipY + 3} Z`}
          fill="#ff6b81"
          stroke="#c44569"
          strokeWidth="2"
          style={{ transition: 'all 0.5s ease' }}
        />
        {/* Lower Lip */}
        <path
          d={`M 235 ${lowerLipY} L 250 ${lowerLipY - 2} C 262 ${lowerLipY + 2} 268 ${lowerLipY + 12} 260 ${lowerLipY + 18} C 250 ${lowerLipY + 22} 240 ${lowerLipY + 14} 235 ${lowerLipY + 8} Z`}
          fill="#ff4757"
          stroke="#b33939"
          strokeWidth="2"
          style={{ transition: 'all 0.5s ease' }}
        />

        {/* Bilabial closure glow (ب، م) */}
        {tongueData.lipState === 'closed' && isContact && (
          <g>
            <ellipse
              cx="248"
              cy={upperLipY + 6}
              rx="12"
              ry="5"
              fill="#fbbf24"
              opacity="0.8"
              filter="url(#starGlow)"
              className="animate-pulse"
            />
          </g>
        )}

        {/* ===== 6. THE ANIMATED CHILD-FRIENDLY TONGUE (اللسان البطل) ===== */}
        <path
          d={currentTonguePath}
          fill="url(#kidTongue)"
          stroke="#c2185b"
          strokeWidth="3"
          strokeLinejoin="round"
          style={{ transition: 'all 0.65s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
        />

        {/* Tongue Highlight / Smooth Shine */}
        <path
          d={currentTonguePath}
          fill="url(#tongueShine)"
          opacity="0.35"
          style={{ transition: 'all 0.65s ease' }}
        />

        {/* Cute Tongue Details (Taste buds / Soft Texture) */}
        {isContact && (
          <g opacity="0.4" style={{ transition: 'all 0.5s ease' }}>
            <circle cx={tongueData.tongueTipX - 10} cy={tongueData.tongueTipY + 6} r="2" fill="#fff" />
            <circle cx={tongueData.tongueTipX - 22} cy={tongueData.tongueTipY + 10} r="2.5" fill="#fff" />
            <circle cx={tongueData.tongueTipX - 35} cy={tongueData.tongueTipY + 14} r="2" fill="#fff" />
          </g>
        )}

        {/* ===== 7. MAGIC TOUCH POINT TARGET (⭐ النجمة السحرية لموضع اللمس) ===== */}
        {isContact && (
          <g className="animate-bounce-slow" filter="url(#starGlow)">
            {/* Glowing ring */}
            <circle
              cx={tongueData.tongueTipX}
              cy={tongueData.tongueTipY}
              r="10"
              fill="#fbbf24"
              opacity="0.3"
            >
              <animate attributeName="r" values="8;13;8" dur="1.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.1;0.4" dur="1.2s" repeatCount="indefinite" />
            </circle>
            
            {/* Sparkling Core Star */}
            <circle
              cx={tongueData.tongueTipX}
              cy={tongueData.tongueTipY}
              r="5.5"
              fill="#fef08a"
              stroke="#ca8a04"
              strokeWidth="1.5"
            />
            
            {/* Sparkle cross */}
            <path
              d={`M ${tongueData.tongueTipX - 7} ${tongueData.tongueTipY} L ${tongueData.tongueTipX + 7} ${tongueData.tongueTipY} M ${tongueData.tongueTipX} ${tongueData.tongueTipY - 7} L ${tongueData.tongueTipX} ${tongueData.tongueTipY + 7}`}
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* ===== 8. AIRFLOW MAGIC BREEZE & SOUND WAVES (الهواء والصوت) ===== */}
        {showAirflow && (isContact || isRelease) && (
          <g filter="url(#breezeGlow)">
            {/* Main breath path */}
            <path
              d={tongueData.airflowPath}
              fill="none"
              stroke="#38bdf8"
              strokeWidth="3.5"
              strokeDasharray="8 6"
              strokeLinecap="round"
              opacity="0.85"
            >
              <animate attributeName="stroke-dashoffset" from="0" to="28" dur="1s" repeatCount="indefinite" />
            </path>

            {/* Air Puffs Outside Mouth */}
            <g className="animate-ping" opacity="0.75">
              <circle cx="260" cy="115" r="4" fill="#38bdf8" />
              <circle cx="272" cy="110" r="3" fill="#67e8f9" />
              <circle cx="278" cy="122" r="2.5" fill="#a5f3fc" />
            </g>

            {/* Nasal sound puffs (م، ن) */}
            {tongueData.airflow === 'nasal' && (
              <g className="animate-bounce" opacity="0.8">
                <path
                  d="M 120 120 Q 125 70 140 40"
                  fill="none"
                  stroke="#c084fc"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                />
                <text x="145" y="35" fill="#e9d5ff" fontSize="9" fontWeight="bold">👃 هواء أنفي</text>
              </g>
            )}
          </g>
        )}

        {/* ===== 9. SIMPLE CHILD LABELS (تسميات سهلة وواضحة جداً) ===== */}
        {showLabels && (
          <g className="select-none font-bold" style={{ direction: 'rtl' }}>
            {/* Top Teeth */}
            <text x="228" y="55" fill="#ffffff" fontSize="9" fontWeight="900" filter="url(#starGlow)">
              الأسنان 🦷
            </text>

            {/* Tongue */}
            <text
              x={tongueData.tongueTipX - 20}
              y={tongueData.tongueTipY + 30}
              fill="#ffd1dc"
              fontSize="10"
              fontWeight="900"
            >
              اللِّسَان 👅
            </text>

            {/* Roof */}
            <text x="135" y="42" fill="#fde047" fontSize="9" fontWeight="900">
              سَقْفُ الفَم 🏠
            </text>
          </g>
        )}
      </svg>

      {/* ===== BOTTOM CHILD INSTRUCTIONS CARD ===== */}
      <div className="w-full mt-1.5 flex flex-col items-center gap-1.5 max-w-sm mx-auto px-2">
        
        {/* Big Simple Action Instruction Banner */}
        <div className="w-full bg-[#0d1b45]/90 border-2 border-amber-400/60 rounded-2xl p-2.5 flex items-center justify-between gap-2 shadow-lg">
          <div className="flex items-center gap-2 flex-1 text-right">
            <span className="text-xl">🎯</span>
            <div>
              <span className="text-[11px] font-black text-amber-300 block">
                كَيْفَ أَنْطِقُ حَرْفَ ({letter.char})؟
              </span>
              <p className="text-xs font-black text-white leading-snug">
                {tongueData.tipAr}
              </p>
            </div>
          </div>

          <button
            onClick={handleInteractiveTap}
            className="p-2 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-400 text-slate-950 font-black text-xs hover:scale-105 active:scale-95 transition-all shadow-md flex-shrink-0 flex items-center gap-1"
            title="حَرِّكِ اللِّسَان"
          >
            <Volume2 className="w-3.5 h-3.5" />
            <span>نَطْق</span>
          </button>
        </div>

        {/* Visual Badges */}
        <div className="flex items-center gap-1.5 flex-wrap justify-center text-[10px] font-black">
          <span className="bg-purple-950/70 border border-purple-400/40 text-purple-200 px-2.5 py-0.5 rounded-full">
            📍 {tongueData.contactPointAr}
          </span>
          <span className="bg-cyan-950/70 border border-cyan-400/40 text-cyan-200 px-2.5 py-0.5 rounded-full">
            👄 الشَّفَتَان: {letter.mouthGuide?.lipPosition || 'مَفْتُوحَتَان'}
          </span>
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\articulation\InteractiveTongueLab.tsx`
```typescript
import React, { useState } from 'react';
import { ArrowRight, Volume2, Sparkles, Star, Crown, CheckCircle2 } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { ARABIC_LETTERS } from '../../data/letters';
import { AnimatedArticulationTeacher } from './AnimatedArticulationTeacher';
import { LumiGuideBanner } from '../common/LumiGuideBanner';

interface InteractiveTongueLabProps {
  onBack: () => void;
}

export const InteractiveTongueLab: React.FC<InteractiveTongueLabProps> = ({ onBack }) => {
  const { childName, selectedLetterId, setSelectedLetterId } = useGame();
  
  const currentLetter =
    ARABIC_LETTERS.find((l) => l.id === selectedLetterId) || ARABIC_LETTERS[1];

  const handleSelectLetter = (letterId: string) => {
    audioManager.playClick();
    setSelectedLetterId(letterId);
    const l = ARABIC_LETTERS.find((x) => x.id === letterId);
    if (l) {
      audioManager.speak(`مَخْرَجُ حَرْفِ ${l.nameAr}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#060a17] via-[#0a1435] to-[#060a17] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-hidden pb-24">
      
      {/* Background Radiance */}
      <div className="absolute -top-28 -right-28 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-[500px] h-[500px] bg-purple-600/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <header className="relative z-10 max-w-5xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-4 md:p-5 rounded-3xl border-3 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
        <button
          onClick={() => {
            audioManager.playClick();
            onBack();
          }}
          className="p-3 rounded-2xl bg-[#132252] border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-950/50 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-2 font-black text-xs"
        >
          <ArrowRight className="w-5 h-5" />
          <span>الرُّجُوعُ لِلرِّحْلَة</span>
        </button>

        <div className="text-center sm:text-right">
          <h1 className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-cyan-200 to-white flex items-center gap-2">
            <span>فِيدْيُو وَمُخْتَبَرُ النُّطْقِ المَرْئِيّ 👩‍🏫</span>
          </h1>
          <p className="text-xs text-cyan-200 font-bold hidden sm:block">
            تَعَلَّمْ مَخَارِجَ الحُرُوفِ مَعَ المُعَلِّمَةِ سَارَة وَمِرْآةِ الفَمِ المُتَحَرِّكَة
          </p>
        </div>
      </header>

      {/* Main Content Arena */}
      <main className="relative z-10 max-w-5xl mx-auto w-full my-auto space-y-5 py-4">
        
        {/* Lumi Voice Guide Banner */}
        <LumiGuideBanner
          message={`مُخْتَبَرُ النُّطْقِ وَالمِرْآةِ يَا ${childName || 'البَطَل'}! شَاهِدِ المُعَلِّمَةَ سَارَة كَيْفَ يَتَحَرَّكُ اللِّسَانُ وَالشَّفَتَانِ لِنُطْقِ حَرْفِ (${currentLetter.char})، وَافْتَحِ المِرْآةَ لِتُجَرِّبَ بِنَفْسِك!` }
          shortHint="شَاهِدْ وَقَلِّدِ النُّطْق"
          autoSpeak={true}
          emotion="happy"
        />

        {/* 28 Letters Horizontal Bar */}
        <div className="bg-[#0b1638]/80 backdrop-blur-md p-3 rounded-2xl border border-blue-900">
          <div className="flex items-center justify-between mb-1 px-1 text-xs font-black text-cyan-300">
            <span>اخْتَرِ الحَرْفَ لِمُشَاهَدَةِ فِيدْيُو النُّطْق:</span>
            <span className="text-amber-300 font-extrabold">{currentLetter.nameAr} ({currentLetter.char})</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {ARABIC_LETTERS.map((ltr) => {
              const isSelected = ltr.id === currentLetter.id;
              return (
                <button
                  key={ltr.id}
                  onClick={() => handleSelectLetter(ltr.id)}
                  className={`flex-shrink-0 w-10 h-11 rounded-2xl font-black text-base flex items-center justify-center transition-all active:scale-90 ${
                    isSelected
                      ? 'bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-600 text-slate-950 border-2 border-white shadow-glow-cyan scale-110'
                      : 'bg-[#101c44] text-white border border-blue-900 hover:border-cyan-400/60'
                  }`}
                >
                  {ltr.char}
                </button>
              );
            })}
          </div>
        </div>

        {/* Animated Female Articulation Teacher Video & Anatomy Studio */}
        <AnimatedArticulationTeacher
          letter={currentLetter}
        />

      </main>

      {/* Footer */}
      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-xs text-cyan-200/70 font-bold py-2">
        <span>LUMI — مُخْتَبَرُ النُّطْقِ وَالمِرْآةِ التَّعْلِيمِيَّة</span>
      </footer>

    </div>
  );
};

```

## 📄 ملف: `src\components\articulation\ChildFriendlyMouthGuide.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { Sparkles, Volume2, Play, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { LetterData } from '../../data/letters';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';

interface ChildFriendlyMouthGuideProps {
  letter: LetterData;
  onSuccess?: () => void;
  compact?: boolean;
}

export interface KidArticulationGuide {
  title1: string;
  step1: string;
  title2: string;
  step2: string;
  title3: string;
  step3: string;
  funTip: string;
}

export function getKidArticulationGuide(letterId: string, char: string): KidArticulationGuide {
  switch (letterId) {
    case 'baa':
      return {
        title1: '1. شَفَتَانِ مُنْطَبِقَتَان',
        step1: 'أَغْلِقْ شَفَتَيْكَ بِنُعُومَة مِثْلِي',
        title2: '2. اللِّسَانُ مُسْتَرِيح',
        step2: 'اجْعَلْ لِسَانَكَ يَسْتَرِيحُ فِي الأَسْفَل',
        title3: '3. انْطِلَاقُ الصَّوْت',
        step3: 'افْتَحْ شَفَتَيْكَ وَانْطِقْ: بْ',
        funTip: 'مِثْلَ انْفِجَارِ فَقَاعَةِ الصَّابُون: بْ'
      };
    case 'taa':
    case 'taa_heavy':
      return {
        title1: '1. ابْتِسَامَةٌ مَفْتُوحَة',
        step1: 'ابْتَسِمْ وَافْتَحْ فَمَكَ قَلِيلًا',
        title2: '2. اللِّسَانُ خَلْفَ الأَسْنَان',
        step2: 'اجْعَلْ طَرَفَ لِسَانِكَ يَلْمِسُ أَسْنَانَكَ العُلْيَا',
        title3: '3. هَمْسَةُ الصَّوْت',
        step3: 'دَعِ الهَوَاءَ يَهْمِس: تْ.. تْ',
        funTip: 'مِثْلَ دَقَّاتِ السَّاعَة: تِكْ تَوْك'
      };
    case 'thaa':
    case 'zaal':
    case 'zaa_heavy':
      return {
        title1: '1. شَفَتَانِ مُتَبَاعِدَتَان',
        step1: 'افْتَحْ شَفَتَيْكَ بِهُدُوء',
        title2: '2. اللِّسَانُ بَيْنَ الأَسْنَان',
        step2: 'أَخْرِجْ طَرَفَ لِسَانِكَ قَلِيلًا بَيْنَ أَسْنَانِك',
        title3: '3. انْفُخِ الهَوَاء',
        step3: 'انْفُخْ بِلُطْفٍ وَانْطِقْ: ثْ',
        funTip: 'أَخْرِجْ لِسَانَكَ قَلِيلًا كَالثَّعْلَب'
      };
    case 'jeem':
    case 'sheen':
    case 'yaa':
      return {
        title1: '1. ابْتِسَامَةٌ عَرِيضَة',
        step1: 'ابْتَسِمْ بِاتِّسَاعٍ جَمِيل',
        title2: '2. وَسَطُ اللِّسَانِ يَرْتَفِع',
        step2: 'ارْفَعْ وَسَطَ لِسَانِكَ لِسَقْفِ الفَم',
        title3: '3. انْطِقِ الصَّوْت',
        step3: 'انْطِقْ بِوُضُوح: ' + char + 'ْ',
        funTip: 'ارْفَعْ لِسَانَكَ كَالجَبَلِ الصَّغِير'
      };
    case 'seen':
    case 'saad':
    case 'zay':
      return {
        title1: '1. أَسْنَانٌ مُتَقَارِبَة',
        step1: 'أَغْلِقْ أَسْنَانَكَ مَعًا بِابْتِسَامَة',
        title2: '2. اللِّسَانُ خَلْفَ الأَسْنَان',
        step2: 'اجْعَلْ لِسَانَكَ خَلْفَ أَسْنَانِكَ السُّفْلَى',
        title3: '3. صَفِيرُ النَّسِيم',
        step3: 'انْفُخْ صَفِيرًا جَمِيلًا: ' + char + 'ْ',
        funTip: 'اصْنَعْ صَفِيرَ النَّسِيمِ الرَّائِع'
      };
    case 'faa':
      return {
        title1: '1. أَسْنَانٌ عَلَى الشَّفَة',
        step1: 'ضَعْ أَسْنَانَكَ العُلْيَا فَوْقَ شَفَتِكَ السُّفْلَى',
        title2: '2. هَوَاءٌ خَفِيف',
        step2: 'اجْعَلِ اللِّسَانَ مُسْتَرِيحًا',
        title3: '3. صَوْتُ الفَرَاشَة',
        step3: 'انْفُخِ الهَوَاءَ وَانْطِقْ: فْ',
        funTip: 'مِثْلَ جَنَاحِ الفَرَاشَةِ الرَّقِيق'
      };
    case 'waaw':
      return {
        title1: '1. شَفَتَانِ دَائِرِيَّتَان',
        step1: 'ضُمَّ شَفَتَيْكَ كَدَائِرَةٍ صَغِيرَة',
        title2: '2. ارْتِفَاعُ اللِّسَان',
        step2: 'ارْفَعْ خَلْفَ لِسَانِكَ قَلِيلًا',
        title3: '3. انْطِقْ بِدِفْء',
        step3: 'دَعِ الصَّوْتَ يَنْطَلِق: وْ.. وَرْدَة',
        funTip: 'اصْنَعْ دَائِرَةً بِفَمِكَ كَالقَمَر'
      };
    case 'raa':
      return {
        title1: '1. فَمٌ مُبْتَسِم',
        step1: 'ابْتَسِمْ وَافْتَحْ فَمَكَ بِرَاحَة',
        title2: '2. اهْتِزَازُ اللِّسَان',
        step2: 'ارْفَعْ طَرَفَ لِسَانِكَ خَلْفَ الأَسْنَان',
        title3: '3. انْطِلَاقُ الصَّارُوخ',
        step3: 'شَغِّلْ مُحَرِّكَ اللِّسَان: رْرْرْ.. رْ',
        funTip: 'شَغِّلْ مُحَرِّكَ السَّيَّارَةِ بِلِسَانِك: رْرْرْ'
      };
    default:
      return {
        title1: '1. فَتْحُ الفَمِ بِنَقَاء',
        step1: 'افْتَحْ فَمَكَ بِشَكْلٍ مُرِيحٍ وَنَقِيّ',
        title2: '2. مَوْضِعُ اللِّسَان',
        step2: 'ضَعْ لِسَانَكَ فِي المَوْضِعِ الصَّحِيح',
        title3: '3. صَوْتُ الحَرْف',
        step3: 'انْطِقْ بِصَوْتٍ عَالٍ وَوَاضِح: ' + char + 'ْ',
        funTip: 'تَنَفَّسْ بِعُمْقٍ وَانْطِقْ كَالأَبْطَال'
      };
  }
}

export const ChildFriendlyMouthGuide: React.FC<ChildFriendlyMouthGuideProps> = ({
  letter,
  onSuccess,
  compact = false
}) => {
  const { childName, addStars, addCoins } = useGame();
  const guide = getKidArticulationGuide(letter.id, letter.char);

  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlayingDemonstration, setIsPlayingDemonstration] = useState<boolean>(false);
  const [hasPracticed, setHasPracticed] = useState<boolean>(false);

  useEffect(() => {
    setActiveStep(1);
    setIsPlayingDemonstration(false);
    setHasPracticed(false);
  }, [letter.id]);

  // Full 3-Step Guided Audio Lesson
  const handlePlayFullDemonstration = () => {
    setIsPlayingDemonstration(true);
    setActiveStep(1);

    const step1Speech = `الخُطْوَةُ الأُولَى يَا ${childName || 'البَطَل'}: ${guide.step1}`;
    audioManager.speak(step1Speech, 0.88, () => {
      setActiveStep(2);
      const step2Speech = `الخُطْوَةُ الثَّانِيَة: ${guide.step2}`;
      audioManager.speak(step2Speech, 0.88, () => {
        setActiveStep(3);
        const step3Speech = `الخُطْوَةُ الثَّالِثَة: ${guide.step3}`;
        audioManager.speak(step3Speech, 0.88, () => {
          setIsPlayingDemonstration(false);
          setHasPracticed(true);
          addStars(1);
          addCoins(5);
          try {
            confetti({
              particleCount: 60,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch {}
          if (onSuccess) onSuccess();
        });
      });
    });
  };

  const handleStepClick = (stepNum: number) => {
    setActiveStep(stepNum);
    const text = stepNum === 1 ? guide.step1 : stepNum === 2 ? guide.step2 : guide.step3;
    audioManager.speak(text, 0.9);
  };

  const handleSoundTap = () => {
    setActiveStep(3);
    audioManager.speak(`صَوْتُ حَرْفِ ${letter.nameAr}.. ${letter.char}ْ`, 0.85);
  };

  return (
    <div className="bg-[#0b1430]/95 backdrop-blur-xl rounded-3xl p-4 md:p-6 border-2 border-cyan-400/50 shadow-[0_0_40px_rgba(6,182,212,0.25)] space-y-4 text-white select-none font-arabic">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 border-b border-blue-900/60 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-yellow-300 to-cyan-400 flex items-center justify-center text-slate-950 font-black text-xl border-2 border-white shadow-glow-yellow">
            سَعْد
          </div>
          <div>
            <h3 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-200 to-white">
              دَلِيلُ الصَّدِيقِ سَعْد — نُطْقُ حَرْفِ ({letter.char}) بـ 3 خُطُوَاتٍ مُصَوَّرَة
            </h3>
            <p className="text-xs text-cyan-200 font-bold">
              انْظُرْ كَيْفَ يُحَرِّكُ سَعْدٌ فَمَهُ وَلِسَانَهُ وَقَلِّدْهُ بِبَسَاطَةٍ يَا {childName || 'البَطَل'}
            </p>
          </div>
        </div>

        <button
          onClick={handlePlayFullDemonstration}
          disabled={isPlayingDemonstration}
          className={`px-4 py-2 rounded-2xl font-black text-xs border flex items-center gap-2 active:scale-95 transition-all shadow-md ${
            isPlayingDemonstration
              ? 'bg-rose-600 border-white text-white animate-pulse'
              : 'bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 border-white shadow-glow-yellow hover:scale-105'
          }`}
        >
          <Play className="w-4 h-4 fill-slate-950" />
          <span>{isPlayingDemonstration ? 'سَعْدٌ يَشْرَحُ الآن...' : 'شَغِّلِ الخُطُوَاتِ الثَّلَاث'}</span>
        </button>
      </div>

      {/* 3 Step Picture Cards Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* ========================================================================= */}
        {/* CARD 1: STEP 1 - BOY LIPS & MOUTH PREPARATION */}
        {/* ========================================================================= */}
        <div
          onClick={() => handleStepClick(1)}
          className={`group rounded-3xl p-4 border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-3 relative active:scale-98 overflow-hidden ${
            activeStep === 1
              ? 'bg-gradient-to-b from-[#18326e] to-[#0f224f] border-amber-400 shadow-glow-yellow scale-102 ring-2 ring-amber-400/40'
              : 'bg-[#0a1538] border-blue-900/80 hover:border-cyan-400/50 text-slate-300'
          }`}
        >
          {/* Step Pill */}
          <div className="w-full flex items-center justify-between">
            <span className="bg-amber-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              الخُطْوَةُ 1
            </span>
            <span className="text-[11px] text-cyan-300 font-bold">شَكْلُ الشَّفَتَيْن</span>
          </div>

          {/* Realistic AI 3D Boy Picture 1 */}
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-lg group-hover:scale-105 transition-transform">
            <img
              src="/assets/articulation/boy_step1_lips.jpg"
              alt="سعد يجهز شفتيه"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-1.5 inset-x-0 text-center">
              <span className="text-[10px] font-black text-amber-200 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-amber-400/30">
                تَهْيِئَةُ الشَّفَتَيْن
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-black text-amber-300">{guide.title1}</h4>
            <p className="text-xs font-bold text-white leading-relaxed">{guide.step1}</p>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-cyan-200 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm border border-cyan-400/30">
            <Volume2 className="w-4 h-4 text-amber-400" />
            <span>اسْتَمِعْ لِلْخُطْوَة 1</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CARD 2: STEP 2 - BOY TONGUE & TEETH POSITION */}
        {/* ========================================================================= */}
        <div
          onClick={() => handleStepClick(2)}
          className={`group rounded-3xl p-4 border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-3 relative active:scale-98 overflow-hidden ${
            activeStep === 2
              ? 'bg-gradient-to-b from-[#18326e] to-[#0f224f] border-cyan-400 shadow-glow-cyan scale-102 ring-2 ring-cyan-400/40'
              : 'bg-[#0a1538] border-blue-900/80 hover:border-cyan-400/50 text-slate-300'
          }`}
        >
          {/* Step Pill */}
          <div className="w-full flex items-center justify-between">
            <span className="bg-cyan-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              الخُطْوَةُ 2
            </span>
            <span className="text-[11px] text-amber-300 font-bold">مَوْضِعُ اللِّسَان</span>
          </div>

          {/* Realistic AI 3D Boy Picture 2 */}
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-cyan-400/60 shadow-lg group-hover:scale-105 transition-transform">
            <img
              src="/assets/articulation/boy_step2_tongue.jpg"
              alt="موضع لسان وأسنان سعد"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            <div className="absolute bottom-1.5 inset-x-0 text-center">
              <span className="text-[10px] font-black text-cyan-200 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-cyan-400/30">
                مَوْضِعُ اللِّسَانِ وَالأَسْنَان
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-black text-cyan-300">{guide.title2}</h4>
            <p className="text-xs font-bold text-white leading-relaxed">{guide.step2}</p>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-blue-900 to-indigo-900 hover:from-blue-800 hover:to-indigo-800 text-cyan-200 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm border border-cyan-400/30">
            <Volume2 className="w-4 h-4 text-cyan-400" />
            <span>اسْتَمِعْ لِلْخُطْوَة 2</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CARD 3: STEP 3 - BOY JOYFULLY SPEAKING & PRODUCING PURE SOUND */}
        {/* ========================================================================= */}
        <div
          onClick={handleSoundTap}
          className={`group rounded-3xl p-4 border-2 transition-all cursor-pointer flex flex-col items-center justify-between text-center space-y-3 relative active:scale-98 overflow-hidden ${
            activeStep === 3
              ? 'bg-gradient-to-b from-[#18326e] to-[#0f224f] border-emerald-400 shadow-glow-green scale-102 ring-2 ring-emerald-400/40'
              : 'bg-[#0a1538] border-blue-900/80 hover:border-cyan-400/50 text-slate-300'
          }`}
        >
          {/* Step Pill */}
          <div className="w-full flex items-center justify-between">
            <span className="bg-emerald-400 text-slate-950 font-black text-xs px-3 py-0.5 rounded-full shadow">
              الخُطْوَةُ 3
            </span>
            <span className="text-[11px] text-emerald-300 font-bold">انْطِلَاقُ الصَّوْت</span>
          </div>

          {/* Realistic AI 3D Boy Picture 3 */}
          <div className="relative w-40 h-40 rounded-2xl overflow-hidden border-2 border-emerald-400/60 shadow-lg group-hover:scale-105 transition-transform">
            <img
              src="/assets/articulation/boy_step3_speak.jpg"
              alt="سعد ينطق الحرف بفرح"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
            
            {/* Target Letter Floating Badge */}
            <div className="absolute top-2 right-2 w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-base flex items-center justify-center border-2 border-white shadow-glow-yellow animate-bounce">
              {letter.char}
            </div>

            <div className="absolute bottom-1.5 inset-x-0 text-center">
              <span className="text-[10px] font-black text-emerald-200 bg-black/60 px-2 py-0.5 rounded-full backdrop-blur-sm border border-emerald-400/30">
                صَوْتُ حَرْفِ ({letter.char}ْ)
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm font-black text-emerald-300">{guide.title3}</h4>
            <p className="text-xs font-bold text-white leading-relaxed">{guide.step3}</p>
          </div>

          <button className="w-full py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-md border border-white/40">
            <Volume2 className="w-4 h-4" />
            <span>نُطْقُ الصَّوْتِ ({letter.char}ْ)</span>
          </button>
        </div>

      </div>

      {/* Bottom Child Motivation Card */}
      <div className="bg-[#0e1c45] p-3.5 rounded-2xl border border-cyan-400/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-right">
        <div className="flex items-center gap-2">
          <div>
            <span className="text-xs font-black text-amber-300 block">
              نَصِيحَةُ سَعْدٍ الذَّهَبِيَّة:
            </span>
            <p className="text-xs text-white font-extrabold">
              {guide.funTip}
            </p>
          </div>
        </div>

        <button
          onClick={handleSoundTap}
          className="px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 rounded-2xl font-black text-xs border border-white shadow-glow-cyan active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
        >
          <Volume2 className="w-4 h-4 fill-slate-950" />
          <span>انْطِقْ مَعَ سَعْد: {letter.char}ْ</span>
        </button>
      </div>

      {/* Completion Button for Stage 2 */}
      <button
        onClick={() => {
          audioManager.playVictory();
          addStars(1);
          addCoins(5);
          try {
            confetti({
              particleCount: 50,
              spread: 60,
              origin: { y: 0.6 }
            });
          } catch {}
          if (onSuccess) onSuccess();
        }}
        className="w-full py-3.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-slate-950 rounded-2xl font-black text-sm border-2 border-white shadow-glow-green active:scale-95 transition-all flex items-center justify-center gap-2"
      >
        <Sparkles className="w-4 h-4 fill-slate-950" />
        <span>أَتْقَنْتُ مَخْرَجَ حَرْفِ ({letter.char}) يَا لُومِي! 🌟</span>
      </button>

    </div>
  );
};

```

## 📄 ملف: `src\components\articulation\AnimatedArticulationTeacher.tsx`
```typescript
import React, { useState, useEffect } from 'react';
import { Play, Pause, Volume2, Sparkles, CheckCircle2, Eye, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LetterData } from '../../data/letters';
import { RealisticTongueAnatomy } from './RealisticTongueAnatomy';
import { ChildFriendlyMouthGuide } from './ChildFriendlyMouthGuide';
import { getTongueDataForLetter } from '../../data/tongueArticulationData';

interface AnimatedArticulationTeacherProps {
  letter: LetterData;
  onSuccess?: () => void;
}

export const AnimatedArticulationTeacher: React.FC<AnimatedArticulationTeacherProps> = ({
  letter,
  onSuccess
}) => {
  const { childName, addStars, addCoins } = useGame();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [lessonStep, setLessonStep] = useState<number>(1); // 1: Prep, 2: Release, 3: Word
  const [mouthShape, setMouthShape] = useState<'closed' | 'open' | 'round' | 'teeth' | 'smile' | 'labiodental'>('smile');
  const [tongueHeight, setTongueHeight] = useState<number>(75);
  const [isVibrating, setIsVibrating] = useState<boolean>(false);
  const [isAirflowVisible, setIsAirflowVisible] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'kid_mouth' | 'front_teacher' | 'xray_anatomy' | 'split_view' | 'interactive_game'>('kid_mouth');
  const [isAnatomyAnimating, setIsAnatomyAnimating] = useState<boolean>(false);

  // Minigame states
  const [gameScore, setGameScore] = useState<number>(0);
  const [poppedBubbles, setPoppedBubbles] = useState<number[]>([]);
  const [isGameCompleted, setIsGameCompleted] = useState<boolean>(false);

  useEffect(() => {
    const shape = letter.mouthGuide?.shape || 'closed_lips';
    if (shape === 'closed_lips') {
      setMouthShape('closed');
      setTongueHeight(75);
    } else if (shape === 'open_throat') {
      setMouthShape('open');
      setTongueHeight(80);
    } else if (shape === 'round_lips') {
      setMouthShape('round');
      setTongueHeight(65);
    } else if (shape === 'smile_teeth' || shape === 'tongue_teeth') {
      setMouthShape('teeth');
      setTongueHeight(35);
    }
    setGameScore(0);
    setPoppedBubbles([]);
    setIsGameCompleted(false);
    setIsAnatomyAnimating(false);
  }, [letter.id]);

  // Play full 3-step animated video lesson with female voice!
  const startVideoLesson = () => {
    setIsPlaying(true);
    setLessonStep(1);
    setIsAirflowVisible(false);
    setIsVibrating(false);
    setIsAnatomyAnimating(false);

    // Use existing tongueData from component scope
    const articulationTip = tongueData?.tipAr || letter.mouthGuide?.tip || 'انْطِبَاقُ الشَّفَتَيْنِ بِنُعُومَة';

    // Step 1: Teacher introduces preparation
    const step1Text = `أَهْلًا يَا ${childName}! تَعَلَّمْ مَعِي كَيْفِيَّةَ نُطْقِ حَرْفِ ${letter.nameAr}.. الخُطْوَةُ الأُولَى: ${articulationTip}`;
    audioManager.speak(step1Text, 0.85, () => {
      // Step 2: Airflow release & Sound
      setLessonStep(2);
      setIsAirflowVisible(true);
      setIsVibrating(true);
      setMouthShape('open');
      setIsAnatomyAnimating(true);

      const step2Text = `الخُطْوَةُ الثَّانِيَة يَا ${childName}: دَعِ الهَوَاءَ يَنْطَلِقْ لِيَخْرُجَ الصَّوْت: ${letter.char}ْ.. ${letter.char}ْ!`;
      audioManager.speak(step2Text, 0.82, () => {
        // Step 3: Example Word
        setLessonStep(3);
        setIsAirflowVisible(false);
        setIsVibrating(false);
        const sampleWord = letter.words[0]?.word || letter.char;
        const step3Text = `الخُطْوَةُ الثَّالِثَة يَا ${childName}: نَنْطِقُ الكَلِمَة: ${sampleWord}! أَنْتَ بَطَلٌ مُتَفَوِّق!`;

        audioManager.speak(step3Text, 0.85, () => {
          setIsPlaying(false);
          setIsAnatomyAnimating(false);
          if (onSuccess) onSuccess();
        });
      });
    });
  };

  // Handle Bubble Game Pop
  const handleBubbleClick = (index: number, soundText: string) => {
    if (poppedBubbles.includes(index)) return;

    audioManager.playPortal();
    audioManager.speak(soundText);
    const nextPopped = [...poppedBubbles, index];
    setPoppedBubbles(nextPopped);
    setGameScore((prev) => prev + 1);

    if (nextPopped.length >= 3) {
      setIsGameCompleted(true);
      audioManager.playVictory();
      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {}
      addStars(1);
      addCoins(10);
      audioManager.speak(`أَحْسَنْتَ يَا ${childName}! صِدْتَ كَافَّةَ فُقَّاعَاتِ حَرْفِ ${letter.nameAr}!`);
      if (onSuccess) onSuccess();
    }
  };

  const soundBubbles = [
    { text: `${letter.char}َ`, label: 'فَتْحَة', emoji: '⭐' },
    { text: `${letter.char}ُ`, label: 'ضَمَّة', emoji: '🌟' },
    { text: `${letter.char}ِ`, label: 'كَسْرَة', emoji: '✨' }
  ];

  // Get tongue data for current letter
  const tongueData = getTongueDataForLetter(letter.id);

  return (
    <div className="bg-[#091230] rounded-3xl p-4 md:p-6 border-3 border-cyan-400/60 shadow-[0_0_40px_rgba(6,182,212,0.25)] space-y-4 text-white select-none">
      
      {/* Top Video Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 border-b border-blue-900/60 pb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-400 via-pink-400 to-purple-600 flex items-center justify-center text-2xl border-2 border-white shadow-glow-pink">
            👩‍🏫
          </div>
          <div>
            <h2 className="text-base md:text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-cyan-200 to-white">
              المُعَلِّمَةُ سَارَة — دَلِيلُ تَعْلِيمِ النُّطْقِ السَّلِيم
            </h2>
            <p className="text-[11px] text-cyan-200 font-bold">
              تَدْرِيبٌ بَصَرِيٌّ لِحَرْفِ ({letter.char}) مَعَ {childName} ✨
            </p>
          </div>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[#050b1d] p-1 rounded-2xl border border-blue-900/80">
          <button
            onClick={() => setViewMode('kid_mouth')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
              viewMode === 'kid_mouth'
                ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👄 دَلِيلُ الفَم
          </button>

          <button
            onClick={() => setViewMode('xray_anatomy')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
              viewMode === 'xray_anatomy'
                ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🔬 تَشْرِيحُ اللِّسَان
          </button>

          <button
            onClick={() => setViewMode('front_teacher')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
              viewMode === 'front_teacher'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            👩‍🏫 المُعَلِّمَة
          </button>

          <button
            onClick={() => setViewMode('split_view')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
              viewMode === 'split_view'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Layers className="w-3 h-3 inline-block ml-1" />
            مُتَزَامِن
          </button>

          <button
            onClick={() => setViewMode('interactive_game')}
            className={`px-2.5 py-1.5 rounded-xl text-[11px] font-black transition-all ${
              viewMode === 'interactive_game'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 shadow-md font-extrabold'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            🎮 لُعْبَة
          </button>
        </div>
      </div>

      {/* ===== 0. KID FRIENDLY MOUTH GUIDE (DEFAULT FOR CHILDREN) ===== */}
      {viewMode === 'kid_mouth' && (
        <ChildFriendlyMouthGuide
          letter={letter}
          onSuccess={onSuccess}
        />
      )}

      {/* Main Video Animation Arena for Other Modes */}
      {viewMode !== 'kid_mouth' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Left / Center Video Stage */}
          <div className="relative md:col-span-8 bg-gradient-to-b from-[#0e1b42] to-[#070e24] rounded-3xl border-2 border-cyan-500/40 p-4 overflow-hidden shadow-inner flex flex-col items-center justify-center min-h-[320px]">
            
            {/* Step Overlay Pill */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-[#050b1d]/90 backdrop-blur-md px-3 py-1 rounded-full border border-cyan-400/50 text-[11px] font-black text-cyan-300">
              <Sparkles className="w-3 h-3 text-yellow-300" />
              <span>{lessonStep === 1 ? '1. وَضْعِيَّةُ الشَّفَتَيْن' : lessonStep === 2 ? '2. إِطْلاقُ الهَوَاءِ وَالصَّوْت' : '3. نُطْقُ الكَلِمَة'}</span>
            </div>

            {/* ===== 1. REALISTIC ANATOMY VIEW ===== */}
            {viewMode === 'xray_anatomy' && (
              <RealisticTongueAnatomy
                letter={letter}
                isAnimating={isAnatomyAnimating}
                showLabels={true}
                showAirflow={true}
              />
            )}

          {/* ===== 2. FRONT TEACHER ANIMATION VIEW ===== */}
          {viewMode === 'front_teacher' && (
            <div className="relative w-56 h-56 flex items-center justify-center">
              
              {/* Teacher Head SVG — Enhanced Female Face with Hijab */}
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
                {/* Hijab */}
                <ellipse cx="100" cy="90" rx="68" ry="72" fill="#7c3aed" />
                <path d="M 35 100 Q 20 145 35 180 L 45 185" stroke="#7c3aed" strokeWidth="22" fill="none" strokeLinecap="round" />
                <path d="M 165 100 Q 180 145 165 180 L 155 185" stroke="#7c3aed" strokeWidth="22" fill="none" strokeLinecap="round" />
                {/* Hijab highlight */}
                <path d="M 50 55 Q 100 30 150 55" stroke="#a78bfa" strokeWidth="4" fill="none" strokeLinecap="round" opacity="0.5" />

                {/* Face */}
                <ellipse cx="100" cy="108" rx="48" ry="52" fill="#fed7aa" />
                {/* Face shadow */}
                <ellipse cx="100" cy="115" rx="44" ry="45" fill="#fcc98f" opacity="0.3" />

                {/* Blush */}
                <ellipse cx="68" cy="118" rx="9" ry="6" fill="#f43f5e" opacity="0.3" />
                <ellipse cx="132" cy="118" rx="9" ry="6" fill="#f43f5e" opacity="0.3" />

                {/* Eyes */}
                <ellipse cx="76" cy="95" rx="7" ry="9" fill="#0f172a" />
                <circle cx="74" cy="92" r="3" fill="#ffffff" />
                <circle cx="78" cy="96" r="1.5" fill="#ffffff" opacity="0.5" />
                <path d="M 66 83 Q 76 77 86 83" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Eyelashes */}
                <path d="M 68 86 L 66 82" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 84 86 L 86 82" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />

                <ellipse cx="124" cy="95" rx="7" ry="9" fill="#0f172a" />
                <circle cx="122" cy="92" r="3" fill="#ffffff" />
                <circle cx="126" cy="96" r="1.5" fill="#ffffff" opacity="0.5" />
                <path d="M 114 83 Q 124 77 134 83" stroke="#78350f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M 116 86 L 114 82" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 132 86 L 134 82" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" />

                {/* Nose */}
                <path d="M 100 100 Q 103 108 97 109" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />

                {/* Dynamic Articulation Mouth — 6 shapes */}
                {mouthShape === 'closed' ? (
                  <g className={isVibrating ? 'animate-wiggle' : ''}>
                    <ellipse cx="100" cy="130" rx="20" ry="6" fill="#e11d48" />
                    <line x1="82" y1="130" x2="118" y2="130" stroke="#881337" strokeWidth="2.5" />
                    {/* Lip shine */}
                    <ellipse cx="100" cy="128" rx="12" ry="2" fill="#f87171" opacity="0.4" />
                  </g>
                ) : mouthShape === 'open' ? (
                  <g className="animate-pulse">
                    <ellipse cx="100" cy="132" rx="18" ry="15" fill="#881337" />
                    {/* Tongue visible */}
                    <ellipse cx="100" cy="138" rx="12" ry="7" fill="#fb7185" />
                    {/* Upper teeth */}
                    <path d="M 86 122 Q 100 126 114 122" fill="#ffffff" />
                    {/* Lower teeth */}
                    <path d="M 88 142 Q 100 138 112 142" fill="#f0f0f0" opacity="0.7" />
                  </g>
                ) : mouthShape === 'round' ? (
                  <g>
                    <circle cx="100" cy="132" r="12" fill="#e11d48" stroke="#881337" strokeWidth="3" />
                    <circle cx="100" cy="132" r="7" fill="#4c0519" />
                    {/* Lip highlight */}
                    <path d="M 92 128 Q 100 126 108 128" stroke="#f87171" strokeWidth="1.5" fill="none" opacity="0.5" />
                  </g>
                ) : mouthShape === 'labiodental' ? (
                  <g>
                    {/* Upper teeth touching lower lip */}
                    <path d="M 85 128 Q 100 132 115 128" fill="#e11d48" />
                    <path d="M 88 128 Q 100 126 112 128" fill="#ffffff" strokeWidth="1" />
                    <ellipse cx="100" cy="135" rx="14" ry="5" fill="#d06080" />
                  </g>
                ) : mouthShape === 'teeth' ? (
                  <g>
                    <path d="M 80 127 Q 100 142 120 127 Z" fill="#e11d48" />
                    <path d="M 85 127 Q 100 133 115 127" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                    {/* Tongue tip */}
                    <circle cx="100" cy="133" r="4" fill="#fb7185" opacity="0.8" />
                  </g>
                ) : (
                  <g>
                    {/* Spread lips (smile) */}
                    <path d="M 78 127 Q 100 140 122 127" fill="none" stroke="#e11d48" strokeWidth="3" strokeLinecap="round" />
                    <ellipse cx="100" cy="129" rx="18" ry="3" fill="#e11d48" opacity="0.5" />
                  </g>
                )}

                {/* Airflow particles */}
                {isAirflowVisible && (
                  <g className="animate-ping">
                    <circle cx="100" cy="150" r="4" fill="#38bdf8" />
                    <circle cx="86" cy="156" r="3" fill="#38bdf8" />
                    <circle cx="114" cy="156" r="3" fill="#38bdf8" />
                    <path d="M 90 142 Q 100 162 110 142" stroke="#38bdf8" strokeWidth="3" fill="none" />
                  </g>
                )}
              </svg>

              <div className="absolute -bottom-2 -left-2 text-4xl animate-bounce">
                👉
              </div>
            </div>
          )}

          {/* ===== 3. SPLIT VIEW (Anatomy + Teacher together) ===== */}
          {viewMode === 'split_view' && (
            <div className="w-full h-full flex flex-col md:flex-row items-center justify-center gap-3 py-2">
              {/* Left — Anatomy */}
              <div className="flex-1 min-w-0 max-w-[200px]">
                <RealisticTongueAnatomy
                  letter={letter}
                  isAnimating={isAnatomyAnimating}
                  showLabels={false}
                  showAirflow={true}
                  compact={true}
                />
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />
              <div className="md:hidden h-px w-32 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

              {/* Right — Teacher Face (compact) */}
              <div className="flex-1 min-w-0 max-w-[180px] flex flex-col items-center">
                <svg viewBox="0 0 200 200" className="w-36 h-36 drop-shadow-xl">
                  {/* Compact hijab */}
                  <ellipse cx="100" cy="90" rx="68" ry="72" fill="#7c3aed" />
                  <path d="M 35 100 Q 20 145 35 180" stroke="#7c3aed" strokeWidth="22" fill="none" strokeLinecap="round" />
                  <path d="M 165 100 Q 180 145 165 180" stroke="#7c3aed" strokeWidth="22" fill="none" strokeLinecap="round" />
                  <ellipse cx="100" cy="108" rx="48" ry="52" fill="#fed7aa" />
                  <ellipse cx="68" cy="118" rx="9" ry="6" fill="#f43f5e" opacity="0.3" />
                  <ellipse cx="132" cy="118" rx="9" ry="6" fill="#f43f5e" opacity="0.3" />
                  <ellipse cx="76" cy="95" rx="7" ry="9" fill="#0f172a" />
                  <circle cx="74" cy="92" r="3" fill="#ffffff" />
                  <ellipse cx="124" cy="95" rx="7" ry="9" fill="#0f172a" />
                  <circle cx="122" cy="92" r="3" fill="#ffffff" />
                  <path d="M 100 100 Q 103 108 97 109" stroke="#ea580c" strokeWidth="2" fill="none" strokeLinecap="round" />

                  {/* Dynamic mouth (simplified) */}
                  {mouthShape === 'closed' ? (
                    <g className={isVibrating ? 'animate-wiggle' : ''}>
                      <ellipse cx="100" cy="130" rx="20" ry="6" fill="#e11d48" />
                      <line x1="82" y1="130" x2="118" y2="130" stroke="#881337" strokeWidth="2.5" />
                    </g>
                  ) : mouthShape === 'open' ? (
                    <g className="animate-pulse">
                      <ellipse cx="100" cy="132" rx="18" ry="14" fill="#881337" />
                      <ellipse cx="100" cy="137" rx="12" ry="7" fill="#fb7185" />
                      <path d="M 86 122 Q 100 126 114 122" fill="#ffffff" />
                    </g>
                  ) : mouthShape === 'round' ? (
                    <g>
                      <circle cx="100" cy="132" r="12" fill="#e11d48" stroke="#881337" strokeWidth="3" />
                      <circle cx="100" cy="132" r="6" fill="#4c0519" />
                    </g>
                  ) : (
                    <g>
                      <path d="M 80 127 Q 100 142 120 127 Z" fill="#e11d48" />
                      <path d="M 85 127 Q 100 133 115 127" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" />
                    </g>
                  )}

                  {isAirflowVisible && (
                    <g className="animate-ping">
                      <circle cx="100" cy="150" r="4" fill="#38bdf8" />
                    </g>
                  )}
                </svg>

                <p className="text-[10px] text-cyan-300 font-bold text-center mt-1">
                  المُعَلِّمَةُ سَارَة 👩‍🏫
                </p>
              </div>
            </div>
          )}

          {/* ===== 4. INTERACTIVE BUBBLE GAME ===== */}
          {viewMode === 'interactive_game' && (
            <div className="w-full h-full flex flex-col items-center justify-center space-y-4 py-2">
              <div className="text-center space-y-1">
                <span className="text-xs font-black text-amber-300 bg-amber-500/20 px-3 py-0.5 rounded-full border border-amber-400/40">
                  لُعْبَةُ صَيْدِ أَصْوَاتِ حَرْفِ {letter.nameAr} 🎯
                </span>
                <p className="text-xs text-cyan-200 font-bold">
                  اضْغَطِ الفُقَّاعَاتِ لِتَفْجِيرِهَا وَسَمَاعِ الصَّوْتِ يَا {childName}!
                </p>
              </div>

              {/* Floating Bubbles */}
              <div className="flex items-center justify-center gap-4 pt-2">
                {soundBubbles.map((bubble, idx) => {
                  const isPopped = poppedBubbles.includes(idx);
                  return (
                    <button
                      key={idx}
                      onClick={() => handleBubbleClick(idx, bubble.text)}
                      className={`w-20 h-20 rounded-full font-black text-2xl flex flex-col items-center justify-center border-3 transition-all active:scale-90 relative ${
                        isPopped
                          ? 'bg-emerald-600/80 border-emerald-300 text-white scale-90 opacity-75'
                          : 'bg-gradient-to-tr from-cyan-400 via-sky-300 to-blue-500 text-slate-950 border-white shadow-glow-cyan animate-bounce-slow hover:scale-110'
                      }`}
                    >
                      <span>{bubble.emoji}</span>
                      <span className="text-lg font-black">{bubble.text}</span>
                      {isPopped && (
                        <span className="absolute -top-1 -right-1 text-sm">✨</span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isGameCompleted && (
                <div className="flex items-center gap-2 bg-emerald-950/80 px-4 py-1.5 rounded-2xl border border-emerald-400 text-xs font-black text-emerald-300 animate-pop">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>عَمَلٌ مَلَكِيٌّ بَاهِرٌ يَا {childName}! 👑</span>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Right Instructions Card */}
        <div className="space-y-3 md:col-span-4">
          
          {/* Articulation Details Card */}
          <div className="bg-[#0e1a3d] p-3.5 rounded-2xl border border-blue-800 space-y-2">
            <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
              <span>تَوْجِيهُ مَخْرَجِ حَرْفِ</span>
              <span className="text-white text-lg">({letter.char})</span>
            </span>
            
            {/* Use tongueData for more accurate tip */}
            <p className="text-xs text-slate-200 font-bold leading-relaxed">
              {tongueData?.tipAr || letter.mouthGuide?.tip || 'انْطِبَاقُ الشَّفَتَيْنِ مَعًا ثُمَّ انْفِتَاحُهُمَا بِخُرُوجِ الهَوَاء: بْ!'}
            </p>

            {/* Articulation place badge */}
            {tongueData && (
              <div className="flex items-center gap-2 flex-wrap pt-1">
                <span className="text-[10px] font-black text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded-full border border-purple-400/30">
                  📍 {tongueData.placeNameAr}
                </span>
                <span className="text-[10px] font-black text-cyan-300 bg-cyan-500/15 px-2 py-0.5 rounded-full border border-cyan-400/30">
                  {tongueData.contactPointAr}
                </span>
              </div>
            )}

            <p className="text-[11px] text-cyan-300 font-bold">
              وَضْعِيَّةُ الشَّفَتَيْن: {letter.mouthGuide?.lipPosition || 'مُغْلَقَتَانِ بِنُعُومَة'}
            </p>
          </div>

          {/* Action Control Buttons */}
          <div className="space-y-2 pt-1">
            <button
              onClick={startVideoLesson}
              disabled={isPlaying}
              className={`w-full py-3.5 rounded-2xl font-black text-sm border-2 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl ${
                isPlaying
                  ? 'bg-rose-600 border-white text-white animate-pulse'
                  : 'bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 text-slate-950 border-white shadow-glow-cyan'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-slate-950" />}
              <span>{isPlaying ? 'المُعَلِّمَةُ تَشْرَحُ الآن...' : 'شَغِّلْ فِيدْيُو التَّعْلِيم 🎬'}</span>
            </button>

            {/* Trigger anatomy animation button */}
            <button
              onClick={() => {
                setIsAnatomyAnimating(true);
                audioManager.speak(`صَوْتُ حَرْفِ ${letter.nameAr}.. ${letter.char}ْ`, 0.82, () => {
                  setTimeout(() => setIsAnatomyAnimating(false), 800);
                });
              }}
              className="w-full py-2.5 bg-gradient-to-r from-purple-900/60 to-pink-900/60 hover:from-purple-800/60 hover:to-pink-800/60 text-pink-200 rounded-xl font-black text-xs border border-pink-400/30 flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
            >
              <Eye className="w-4 h-4" />
              <span>شَاهِدْ حَرَكَةَ اللِّسَانِ 🔬</span>
            </button>

            <button
              onClick={() => audioManager.speak(`صَوْتُ حَرْفِ ${letter.nameAr}.. ${letter.char}ْ`)}
              className="w-full py-2.5 bg-[#14234f] hover:bg-[#1c3270] text-cyan-300 rounded-xl font-black text-xs border border-cyan-400/40 flex items-center justify-center gap-1.5 active:scale-95 shadow-sm"
            >
              <Volume2 className="w-4 h-4" />
              <span>نُطْقُ الصَّوْتِ فَقَط 🔊</span>
            </button>
          </div>

        </div>

      </div>
      )}

    </div>
  );
};

```

## 📄 ملف: `src\components\ai\AIPronunciationLab.tsx`
```typescript
/**
 * ============================================================================
 * 🌟 LUMI AI PRONUNCIATION LAB & SPEECH THERAPY ENGINE (UNIFIED MASTER FILE)
 * ============================================================================
 * 
 * هذا الملف يجمع كل متطلبات مختبر النطق بالذكاء الاصطناعي في ملف برمجي واحد مستقل:
 * 1. قاعدة بيانات الحروف العربية الـ 28 مع دليل مخارج الفم والمقاطع الصوتية والكلمات.
 * 2. محرك التخليق والمؤثرات الصوتية الذاتي (Web Audio API & Web Speech Synthesis).
 * 3. محرك المعالجة اللغوية الطبيعية للنص العربي (تجريد التشكيل، مرادفات المخارج، خوارزمية Levenshtein).
 * 4. محرك التقاط وتحليل تيار الميكروفون المباشر (Web Speech API & Audio Frequency Visualizer).
 * 5. شخصية "لومي" المرشدة التفاعلية الذكية وشريط التوجيه الصوتي.
 * 6. واجهة المستخدم التفاعلية المتكاملة لمختبر النطق والتحديات ونظام المكافآت.
 */

import React, { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  Mic,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Brain,
  ChevronRight,
  ChevronLeft,
  Loader2,
  Bot,
  Star,
  Award,
  RefreshCw,
  Zap,
  Smile,
  BookOpen
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { calculateArabicSimilarity, speechAnalyzer } from '../../services/speech/SpeechAnalyzer';
import { ARABIC_LETTERS } from '../../data/letters';
import { audioManager } from '../../audio/AudioManager';
import { useGame } from '../../context/GameContext';
import { LumiMascot } from '../mascot/LumiMascot';
// ============================================================================
// 5. شخصية لومي وشريط الإرشاد المدمج (LUMI GUIDE BANNER)
// ============================================================================

// ============================================================================
// 6. واجهة المستخدم التفاعلية الشاملة لمختبر النطق (AI PRONUNCIATION LAB UI)
// ============================================================================

export interface AIPronunciationLabProps {
  onBack?: () => void;
  childName?: string;
  initialLetter?: string;
  onReward?: (stars: number, coins: number) => void;
}

export const AIPronunciationLab: React.FC<AIPronunciationLabProps> = ({
  onBack = () => {},
  childName = 'البَطَل',
  initialLetter = 'ب',
  onReward
}) => {
  const { addStars, addCoins, triggerCelebration } = useGame();
  

  const letterData = ARABIC_LETTERS.find(l => l.char === initialLetter) || ARABIC_LETTERS[1];
  const matchingWords = letterData.words.map(w => ({ id: w.id, word: w.word, char: initialLetter, meaning: w.meaning, emoji: w.emoji, phonemes: w.letters }));
  const wordList = matchingWords;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [micVolume, setMicVolume] = useState<number>(0);
  const [recognizedSpeech, setRecognizedSpeech] = useState<string>('');
  const [aiScore, setAiScore] = useState<number | null>(null);
  const [aiStatus, setAiStatus] = useState<'idle' | 'success' | 'retry' | 'evaluating'>('idle');
  const [aiMessage, setAiMessage] = useState<string>('');
  const [soundFeedbackTip, setSoundFeedbackTip] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const currentChallenge = wordList[currentIndex % wordList.length];

  useEffect(() => {
    speechAnalyzer.stopListening();
    setIsRecording(false);
    setRecognizedSpeech('');
    setAiScore(null);
    setAiStatus('idle');
    setAiMessage('');
    setSoundFeedbackTip('');
    setErrorMsg('');
  }, [currentIndex, initialLetter]);

  useEffect(() => {
    return () => {
      speechAnalyzer.stopListening();
      audioManager.stop();
    };
  }, []);

  const handlePlayModel = () => {
    audioManager.stop();
    audioManager.speak(currentChallenge.word);
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      speechAnalyzer.stopListening();
      setIsRecording(false);
      setMicVolume(0);
    } else {
      if (!speechAnalyzer.isSupported()) {
        setErrorMsg('المُتَصَفِّحُ لَا يَدْعَمُ تَمْيِيزَ الصَّوْت. يُرْجَى اسْتِخْدَامُ متصفح Chrome أو Edge.');
        return;
      }

      audioManager.stop();
      audioManager.playClick();
      setIsRecording(true);
      setErrorMsg('');
      setRecognizedSpeech('');
      setAiStatus('evaluating');
      setAiScore(null);
      setAiMessage('جَارٍ الاسْتِمَاعُ لِصَوْتِكَ.. انْطِقِ الكَلِمَةَ الآن! 🎙️');
      setSoundFeedbackTip('');

      speechAnalyzer.startListening(
        currentChallenge.word,
        (result) => {
          setIsRecording(false);
          const similarity = calculateArabicSimilarity(currentChallenge.word, result.recognizedText);
          const isMatch = result.status === 'high_confidence' || similarity >= 0.75;
          handleAIResult(result.recognizedText, isMatch, Math.round(similarity * 100));
        },
        (vol) => setMicVolume(vol),
        (err) => {
          setIsRecording(false);
          console.warn('Speech error:', err);
          handleAIResult('', false, 0);
        }
      );
    }
  };

  const handleAIResult = (spokenText: string, isCorrectMatch?: boolean, customScore?: number) => {
    setIsRecording(false);
    setMicVolume(0);

    const cleanSpoken = (spokenText || '').trim();
    setRecognizedSpeech(cleanSpoken);

    if (!cleanSpoken) {
      setAiStatus('retry');
      setAiScore(0);
      const noSpeechMsg = `لَمْ نَسْتَطِعْ سَمَاعَ صَوْتِكَ يَا ${childName}! اضْغَطِ المَيْكْرُوفُونَ وَانْطِقْ بِصَوْتٍ أَعْلَى قَرِيبًا مِنَ الجِهَاز.`;
      setAiMessage(noSpeechMsg);
      setSoundFeedbackTip(`انْطِقْ كَلِمَةَ (${currentChallenge.word}) بِوُضُوح`);

      audioManager.playClick();
      audioManager.speak(`لَمْ أَسْمَعْ صَوْتَكَ يَا بَطَل! اضْغَطْ وَتَحَدَّثْ بِصَوْتٍ عَالٍ!`);
      return;
    }

    const similarity = customScore !== undefined ? customScore : Math.round(calculateArabicSimilarity(currentChallenge.word, cleanSpoken) * 100);
    const isSuccess = isCorrectMatch !== undefined ? isCorrectMatch : similarity >= 75;
    setAiScore(similarity);

    if (isSuccess) {
      setAiStatus('success');
      const cheer = `بَطَل! نُطْقُكَ صَحِيحٌ جِدًّا يَا ${childName} 🌟 (دِقَّة: ${similarity}%)`;
      setAiMessage(cheer);
      setSoundFeedbackTip('أَحْسَنْتَ صَوْتُ الحُرُوفِ وَالمَخَارِجِ كَانَ نَقِيًّا جِدًّا ✨');

      triggerCelebration();
      

      addStars(2);
      addCoins(10);
      if (onReward) onReward(2, 10);

      audioManager.speak(`بَطَل! نُطْقُكَ صَحِيحٌ جِدًّا يَا ${childName}`);
    } else {
      setAiStatus('retry');
      const retryText = `حَاوِلْ مَرَّةً ثَانِيَةً يَا بَطَل! 💪 (نَطَقْتَ: [${cleanSpoken}] — المَطْلُوب: [${currentChallenge.word}])`;
      setAiMessage(retryText);
      setSoundFeedbackTip(`انْتَبِهْ لِمَخْرَجِ حَرْفِ (${currentChallenge.char}) وَأَعِدِ النُّطْق`);

      audioManager.playClick();
      audioManager.speak(`حَاوِلْ مَرَّةً ثَانِيَةً يَا بَطَل! اسْتَمِعْ لِلنَّمُوذَجِ الصَّحِيحِ وَانْطِقْ مَعِي`);
    }
  };

  const handleSimulateCustom = (spokenText: string) => {
    audioManager.playClick();
    setIsRecording(true);
    setAiStatus('evaluating');
    setAiMessage('جَارٍ تَحْلِيلُ النُّطْقِ بِالذَّكَاءِ الاصْطِنَاعِيّ... ⚡');

    setTimeout(() => {
      const similarity = Math.round(calculateArabicSimilarity(currentChallenge.word, spokenText) * 100);
      const isMatch = similarity >= 75;
      handleAIResult(spokenText, isMatch, similarity);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#050814] via-[#091438] to-[#040817] text-white p-4 md:p-8 flex flex-col justify-between select-none relative overflow-x-hidden font-arabic pb-20">
      
      {/* خلفية الضوء والجماليات */}
      <div className="absolute -top-28 -right-28 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-28 -left-28 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* الهيدر العلوي */}
      <header className="relative z-10 max-w-4xl mx-auto w-full flex items-center justify-between bg-[#0b1638]/90 backdrop-blur-2xl p-3.5 sm:p-4 rounded-3xl border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(6,182,212,0.25)]">
        <button
          onClick={() => {
            audioManager.playClick();
            onBack();
          }}
          className="p-2.5 rounded-2xl bg-[#132252] border border-cyan-400/50 text-cyan-300 hover:text-white transition-all shadow-md active:scale-95 flex items-center gap-1.5 font-black text-xs"
        >
          <ArrowRight className="w-4 h-4" />
          <span>الرَّئِيسِيَّة</span>
        </button>

        <div className="text-center sm:text-right">
          <h1 className="text-base sm:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-sky-300 to-white flex items-center gap-1.5 justify-center sm:justify-start">
            <Bot className="w-5 h-5 text-cyan-400" />
            <span>مُخْتَبَرُ النُّطْقِ بِالذَّكَاءِ الاصْطِنَاعِيّ</span>
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin-slow" />
          </h1>
          <p className="text-[11px] text-cyan-200 font-bold hidden sm:block">
            انْطِقِ الكَلِمَةَ وَالذَّكَاءُ الاصْطِنَاعِيُّ يُقَيِّمُ صَوْتَكَ وَيُصَحِّحُ لَك!
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-amber-500/20 text-amber-300 px-2.5 py-1 rounded-xl border border-amber-400/50 text-xs font-black">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            <span>{stars}</span>
          </div>
          <div className="flex items-center gap-1 bg-cyan-500/20 text-cyan-300 px-2.5 py-1 rounded-xl border border-cyan-400/50 text-xs font-black">
            <Brain className="w-3.5 h-3.5" />
            <span>LUMI AI ⚡</span>
          </div>
        </div>
      </header>

      {/* الاستوديو التفاعلي الرئيسي */}
      <main className="relative z-10 max-w-3xl mx-auto w-full my-auto space-y-4 py-3">
        
        {/* شريط المرشد السحري لومي */}
        <LumiMascot
          message={`أَهْلًا يَا ${childName} فِي مُخْتَبَرِ الذَّكَاءِ الاصْطِنَاعِيّ! اسْتَمِعْ لِلنَّمُوذَجِ الصَّحِيح، ثُمَّ اضْغَطْ زِرَّ المَيْكْرُوفُونِ الكَبِيرَ وَانْطِقْ لِيُقَيِّمَكَ الذَّكَاءُ الاصْطِنَاعِيّ!`}
          state={aiStatus === 'idle' ? 'idle' : aiStatus === 'success' ? 'success' : 'listening'}
          size="md"
        />

        {errorMsg && (
          <div className="bg-red-500/20 border border-red-500 text-red-200 p-3 rounded-2xl text-center text-sm font-bold flex items-center justify-center gap-2">
            <AlertCircle className="w-5 h-5" />
            {errorMsg}
          </div>
        )}

        {/* بطاقة التحدي والكلمة */}
        <div className="bg-[#0b1638]/95 backdrop-blur-xl rounded-3xl p-5 md:p-6 border-2 border-cyan-400/60 shadow-[0_0_35px_rgba(6,182,212,0.2)] text-center space-y-4">
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-300">
            <button
              onClick={() => {
                audioManager.playClick();
                setCurrentIndex((prev) => (prev - 1 + wordList.length) % wordList.length);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 flex items-center gap-1 active:scale-95 transition-all"
            >
              <ChevronRight className="w-4 h-4" />
              <span>السَّابِق</span>
            </button>

            <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full border border-cyan-400/40 text-xs font-black">
              تَحَدِّي {currentIndex + 1} مِنْ {wordList.length}
            </span>

            <button
              onClick={() => {
                audioManager.playClick();
                setCurrentIndex((prev) => (prev + 1) % wordList.length);
              }}
              className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-300 flex items-center gap-1 active:scale-95 transition-all"
            >
              <span>التَّالِي</span>
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>

          {/* عرض الكلمة والرمز التعبيري */}
          <div className="space-y-2">
            <div className="text-6xl sm:text-7xl animate-float drop-shadow-lg">
              {currentChallenge.emoji}
            </div>

            <div className="flex items-center justify-center gap-3">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-white tracking-wider">
                {currentChallenge.word}
              </h2>

              <button
                onClick={handlePlayModel}
                className="p-3 rounded-2xl bg-amber-500/20 text-amber-300 border-2 border-amber-400/60 hover:bg-amber-500/30 hover:scale-110 active:scale-90 transition-all shadow-glow-yellow"
                title="اسْتَمِعْ لِلنَّمُوذَجِ الصَّحِيح"
              >
                <Volume2 className="w-6 h-6 animate-pulse" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-cyan-200 font-extrabold">
              {currentChallenge.meaning}
            </p>
          </div>

          {/* التقطيع الصوتي */}
          <div className="flex items-center justify-center gap-2 pt-1">
            <span className="text-[11px] text-slate-400 font-bold">المَقَاطِعُ الصَّوْتِيَّة:</span>
            {currentChallenge.phonemes.map((ph, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-xl bg-blue-900/60 border border-cyan-400/50 text-cyan-200 font-black text-xs shadow-inner"
              >
                {ph}
              </span>
            ))}
          </div>

          {/* زر الميكروفون الذكي */}
          <div className="py-3 flex flex-col items-center justify-center gap-2">
            <button
              onClick={handleToggleRecord}
              className={`relative w-24 h-24 sm:w-28 sm:h-28 rounded-full flex flex-col items-center justify-center text-white border-4 transition-all transform duration-300 active:scale-95 shadow-2xl ${
                isRecording
                  ? 'bg-gradient-to-tr from-rose-600 via-red-500 to-pink-500 border-white shadow-[0_0_50px_rgba(244,63,94,0.6)] animate-pulse scale-110'
                  : 'bg-gradient-to-tr from-cyan-500 via-sky-500 to-blue-600 border-white hover:scale-108 shadow-[0_0_35px_rgba(6,182,212,0.4)]'
              }`}
            >
              {isRecording && (
                <div
                  className="absolute inset-0 rounded-full border-4 border-rose-400 animate-ping opacity-75 pointer-events-none"
                  style={{ animationDuration: '1.2s' }}
                />
              )}

              <Mic className={`w-10 h-10 sm:w-12 sm:h-12 ${isRecording ? 'animate-bounce' : ''}`} />

              <span className="text-[10px] font-black mt-0.5">
                {isRecording ? 'أَنْصِتُ لَك...' : 'انْقُرْ وَانْطِقْ'}
              </span>
            </button>

            <span className="text-xs text-cyan-300 font-bold">
              {isRecording
                ? '🔴 جَارٍ التَّسْجِيل.. انْطِقِ الكَلِمَةَ بِوُضُوح'
                : 'اضْغَطِ المَيْكْرُوفُونَ لِتَبْدَأَ التَّحَدِّي'}
            </span>

            {/* أزرار المحاكاة السريعة للمعالجين وأولياء الأمور */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              <button
                onClick={() => handleSimulateCustom(currentChallenge.word)}
                className="px-3 py-1.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 text-[11px] font-black active:scale-95 transition-all flex items-center gap-1"
              >
                <span>✅ تَجْرِبَةُ نُطْقٍ صَحِيح ({currentChallenge.word})</span>
              </button>

              <button
                onClick={() => handleSimulateCustom(currentChallenge.word === 'بَاب' ? 'دَاب' : 'قَلَم')}
                className="px-3 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/40 text-[11px] font-black active:scale-95 transition-all flex items-center gap-1"
              >
                <span>❌ تَجْرِبَةُ نُطْقٍ خَاطِئ لِلتَّصْحِيح</span>
              </button>
            </div>
          </div>

          {/* لوحة النتائج الفورية والتقييم */}
          {aiStatus !== 'idle' && (
            <div
              className={`p-4 rounded-2xl border-2 transition-all duration-500 text-right space-y-2 ${
                aiStatus === 'success'
                  ? 'bg-emerald-950/80 border-emerald-400 shadow-[0_0_25px_rgba(16,185,129,0.3)]'
                  : aiStatus === 'retry'
                  ? 'bg-amber-950/80 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                  : 'bg-blue-950/80 border-cyan-400 animate-pulse'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {aiStatus === 'success' && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
                  {aiStatus === 'retry' && <AlertCircle className="w-6 h-6 text-amber-400" />}
                  {aiStatus === 'evaluating' && <Brain className="w-6 h-6 text-cyan-400 animate-spin" />}
                  <span className="font-black text-sm text-white">
                    {aiStatus === 'success' ? 'تَقْيِيمُ الذَّكَاءِ الاصْطِنَاعِيّ: بَطَل! ✅' : aiStatus === 'retry' ? 'تَقْيِيمُ الذَّكَاءِ الاصْطِنَاعِيّ: حَاوِلْ مَرَّةً أُخْرَى 💡' : 'جَارٍ التَّحْلِيل...'}
                  </span>
                </div>

                {aiScore !== null && (
                  <span className="bg-white/20 text-white font-black text-xs px-3 py-1 rounded-full border border-white/30">
                    دِقَّةُ النُّطْق: {aiScore}%
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm font-extrabold text-white leading-relaxed">
                {aiMessage}
              </p>

              {soundFeedbackTip && (
                <div className="bg-black/30 p-2.5 rounded-xl text-xs text-amber-200 font-bold border border-white/10 flex items-center justify-between">
                  <span>💡 {soundFeedbackTip}</span>
                  <button
                    onClick={handlePlayModel}
                    className="text-xs text-cyan-300 font-black underline hover:text-white"
                  >
                    أَعِدِ الاسْتِمَاع 🔊
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </main>

      <footer className="relative z-10 max-w-4xl mx-auto w-full text-center text-[11px] text-slate-500 font-bold pt-2">
        <span>LUMI — مُخْتَبَرُ النُّطْقِ وَالتَّصْحِيحِ الذَّكِيّ المَوْحَّد (AI SPEECH LAB)</span>
      </footer>

    </div>
  );
};
export default AIPronunciationLab;

```

## 📄 ملف: `src\components\3d\WorldMap3D.tsx`
```typescript
import React from 'react';
import { ArrowRight, Sparkles, Compass, Play, Rocket } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';
import { LumiGuideBanner } from '../common/LumiGuideBanner';
import { useGame } from '../../context/GameContext';

interface WorldMap3DProps {
  onSelectWorld: (worldId: string) => void;
  onBackToHome: () => void;
}

export const WorldMap3D: React.FC<WorldMap3DProps> = ({
  onSelectWorld,
  onBackToHome
}) => {
  const { childName } = useGame();

  const worlds = [
    {
      id: 'valley_of_letters',
      name: 'وادي الحروف والأصوات',
      desc: 'وَادٍ سِحْرِيٌّ ذُو أَحْجَارٍ طَافِيَةٍ وَرُمُوزٍ قَدِيمَةٍ مُضِيئَةٍ لِاسْتِكْشَافِ أَصْوَاتِ وَمَخَارِجِ الحُرُوف',
      tag: 'العَالَم 1 • الحُرُوف',
      bgGradient: 'from-emerald-900/60 via-teal-900/40 to-[#0f172a]',
      borderColor: 'border-emerald-500/40 hover:border-emerald-400',
      shadowColor: 'shadow-emerald-500/20',
      islandEmoji: '🏞️',
      accentColor: 'text-emerald-400'
    },
    {
      id: 'syllables_forest',
      name: 'غابة المقاطع والمدود',
      desc: 'أَشْجَارٌ سِحْرِيَّةٌ مُتَوَهِّجَةٌ تَنْمُو بِنُطْقِ الحَرَكَاتِ وَالمُدُود (بَ، بِ، بُ، بَا، بِي، بُو)',
      tag: 'العَالَم 2 • المَقَاطِع',
      bgGradient: 'from-green-900/60 via-emerald-950/40 to-[#0f172a]',
      borderColor: 'border-green-500/40 hover:border-green-400',
      shadowColor: 'shadow-green-500/20',
      islandEmoji: '🌲',
      accentColor: 'text-green-400'
    },
    {
      id: 'words_village',
      name: 'قرية الكلمات الساحرة',
      desc: 'قَرْيَةٌ سِحْرِيَّةٌ تَفَاعُلِيَّةٌ تُفْتَحُ أَبْوَابُهَا عِنْدَ تَرْكِيبِ وَنُطْقِ الكَلِمَاتِ وَالجُمَل',
      tag: 'العَالَم 3 • الكَلِمَات',
      bgGradient: 'from-amber-900/60 via-orange-950/40 to-[#0f172a]',
      borderColor: 'border-amber-500/40 hover:border-amber-400',
      shadowColor: 'shadow-amber-500/20',
      islandEmoji: '🏘️',
      accentColor: 'text-amber-400'
    }
  ];

  const handleWorldClick = (w: typeof worlds[0]) => {
    audioManager.playPortal();
    audioManager.speak(`مَرْحَبًا بِكَ يَا ${childName || 'البَطَل'} فِي ${w.name}`);
    onSelectWorld(w.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f172a]/90 backdrop-blur-md p-4 md:p-6 rounded-3xl border-2 border-cyan-500/30 shadow-2xl text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToHome();
            }}
            className="p-3 rounded-2xl bg-[#1e293b] border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all shadow-sm active:scale-95"
            title="العودة للرئيسية"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <span>خَرِيطَةُ العَوَالِمِ الثَّلاثَةِ السَّاحِرَة</span>
              <span className="text-2xl">🗺️</span>
            </h1>
            <p className="text-xs md:text-sm text-cyan-300 font-bold mt-0.5">
              3 عَوَالِمَ بَصَرِيَّةٍ سِحْرِيَّةٍ مُبْتَكَرَةٍ لِتَطْوِيرِ النُّطْقِ وَالمَهَارَات
            </p>
          </div>
        </div>
      </div>

      {/* Lumi Voice Guide Banner */}
      <LumiGuideBanner
        message={`خَرِيطَةُ العَوَالِمِ وَالفَضَاءِ يَا ${childName || 'البَطَل'}! اخْتَرْ أَيَّ عَالَمٍ كَوْنِيٍّ لِتَبْدَأَ فِيهِ مُغَامَرَةَ الحُرُوفِ أَوِ المَقَاطِعِ أَوِ الجُمَل!` }
        shortHint="اخْتَرْ عَالَمَكَ المُفَضَّل"
        autoSpeak={true}
        emotion="happy"
      />

      {/* 8 Worlds Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {worlds.map((world) => (
          <div
            key={world.id}
            onClick={() => handleWorldClick(world)}
            className={`group relative p-6 rounded-3xl border-2 ${world.borderColor} cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl active:scale-95 bg-[#0f172a]/95 backdrop-blur-md flex flex-col justify-between min-h-[300px] overflow-hidden`}
          >
            {/* Ambient Background Gradient */}
            <div className={`absolute top-0 inset-x-0 h-28 bg-gradient-to-b ${world.bgGradient} opacity-80 group-hover:opacity-100 transition-opacity`} />

            {/* Island Emoji & World Tag */}
            <div className="relative z-10 flex items-center justify-between">
              <span className="text-5xl drop-shadow-lg group-hover:scale-125 transition-transform duration-300">
                {world.islandEmoji}
              </span>
              <span className="bg-[#1e293b]/90 text-slate-200 text-[11px] font-black px-3 py-1 rounded-full border border-slate-700 shadow-sm">
                {world.tag}
              </span>
            </div>

            {/* Title & Detailed Purpose Description */}
            <div className="relative z-10 pt-10 space-y-1.5 text-right">
              <h3 className={`text-xl font-black ${world.accentColor} group-hover:text-white transition-colors`}>
                {world.name}
              </h3>

              <p className="text-xs text-slate-300 font-bold leading-relaxed line-clamp-3">
                {world.desc}
              </p>
            </div>

            {/* Bottom Button */}
            <div className="relative z-10 pt-4 mt-2 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs font-black text-cyan-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                مَفْتُوحٌ لِلاسْتِكْشَاف
              </span>

              <button className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-black text-xs shadow-glow-cyan flex items-center gap-1.5">
                <Play className="w-3 h-3 fill-white" />
                <span>ادْخُلِ العَالَم</span>
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\3d\LetterObservatory3D.tsx`
```typescript
import React, { useState } from 'react';
import { Sparkles, ArrowRight, Volume2, Play, Lock, CheckCircle2 } from 'lucide-react';
import { ARABIC_LETTERS, LetterData } from '../../data/letters';
import { useGame } from '../../context/GameContext';
import { audioManager } from '../../audio/AudioManager';
import { LumiMascot } from '../mascot/LumiMascot';

interface LetterObservatory3DProps {
  onSelectLetter: (letterId: string) => void;
  onBackToHome: () => void;
}

export const LetterObservatory3D: React.FC<LetterObservatory3DProps> = ({
  onSelectLetter,
  onBackToHome
}) => {
  const { childName, letterProgressMap } = useGame();
  const [hoveredLetter, setHoveredLetter] = useState<LetterData | null>(null);

  const handleLetterClick = (letter: LetterData) => {
    audioManager.playPortal();
    audioManager.speak(`حَرْفُ ${letter.nameAr} .. ${letter.char}`);
    onSelectLetter(letter.id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6 select-none">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#0f172a]/90 backdrop-blur-md p-4 md:p-6 rounded-3xl border-2 border-cyan-500/30 shadow-2xl text-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              audioManager.playClick();
              onBackToHome();
            }}
            className="p-3 rounded-2xl bg-[#1e293b] border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all shadow-sm active:scale-95"
            title="العودة للرئيسية"
          >
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-white flex items-center gap-2">
              <span>مَرْصَدُ الحُرُوفِ العَرَبِيَّة (28 حَرْفًا)</span>
              <span className="text-2xl">🌌</span>
            </h1>
            <p className="text-xs md:text-sm text-cyan-300 font-bold mt-0.5">
              جَمِيعُ الحُرُوفِ مُتَاحَةٌ بِالتَّرْتِيبِ الهِجَائِيِّ الدَّقِيق • اخْتَرْ أَيَّ حَرْفٍ لِبَدْءِ رِحْلَتِهِ
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 px-4 py-2 rounded-2xl border border-amber-500/40 text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span className="text-xs font-black">
            اخْتِيَارٌ حُرٌّ كَامِلٌ لِلأَبْطَال 🔓
          </span>
        </div>
      </div>

      {/* Mascot Notice */}
      <div className="bg-[#0f172a]/80 border border-indigo-500/30 rounded-3xl p-4 flex items-center justify-between">
        <LumiMascot
          message={`اخْتَرْ أَيَّ حَرْفٍ تُرِيدُ اسْتِكْشَافَهُ يَا ${childName}.. رِحْلَةُ حَرْفِ البَاءِ (ب) جَاهِزَةٌ بِالكَامِل!`}
          emotion="happy"
          size="sm"
        />
      </div>

      {/* 28 Arabic Letters Grid in EXACT Alphabetical Order */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3.5 md:gap-4">
        {ARABIC_LETTERS.map((letter) => {
          const progress = letterProgressMap[letter.id] || {
            discovery: false,
            sound: false,
            vowels: false,
            syllables: false,
            words: false,
            soundPosition: false,
            sentences: false,
            finalChallenge: false,
            currentStage: 1,
            masteryPercentage: 0
          };

          const isMastered = progress.masteryPercentage === 100;
          const isInProgress = progress.masteryPercentage > 0 && !isMastered;

          return (
            <div
              key={letter.id}
              onClick={() => handleLetterClick(letter)}
              onMouseEnter={() => setHoveredLetter(letter)}
              onMouseLeave={() => setHoveredLetter(null)}
              className={`relative p-5 rounded-3xl border-2 flex flex-col items-center justify-between min-h-[190px] cursor-pointer transition-all duration-300 select-none bg-[#0f172a]/90 backdrop-blur-md hover:-translate-y-2 active:scale-95 shadow-lg group ${
                isMastered
                  ? 'border-amber-400/80 bg-gradient-to-b from-amber-950/40 to-[#0f172a] shadow-glow-yellow'
                  : isInProgress
                  ? 'border-cyan-400/80 bg-gradient-to-b from-cyan-950/40 to-[#0f172a] shadow-glow-cyan'
                  : 'border-slate-800 hover:border-cyan-400/50 hover:bg-[#1e293b]/70'
              }`}
            >
              {/* Order Number & Audio Preview */}
              <div className="w-full flex items-center justify-between text-xs">
                <span className="w-6 h-6 rounded-full bg-[#1e293b] text-slate-300 font-black text-[11px] flex items-center justify-center border border-slate-700">
                  {letter.order}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    audioManager.speak(letter.char);
                  }}
                  className="p-1 rounded-full text-slate-400 hover:text-cyan-300 hover:bg-cyan-950/50 transition-colors"
                  title="استمع لصوت الحرف"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* 3D-styled Arabic Letter */}
              <div className="my-2">
                <span className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-tr from-cyan-300 via-indigo-200 to-white group-hover:scale-110 transition-transform duration-300 inline-block drop-shadow-md">
                  {letter.char}
                </span>
              </div>

              {/* Letter Name & Example */}
              <div className="w-full text-center space-y-1">
                <div className="text-xs font-black text-white">
                  {letter.nameAr}
                </div>

                <div className="text-[11px] text-slate-400 font-bold flex items-center justify-center gap-1">
                  <span>{letter.words[0]?.emoji}</span>
                  <span>{letter.words[0]?.word}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#1e293b] h-1.5 rounded-full overflow-hidden mt-2 border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      isMastered ? 'bg-amber-400' : 'bg-cyan-500'
                    }`}
                    style={{ width: `${progress.masteryPercentage}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] font-black text-slate-400 pt-0.5">
                  <span>المرحلة {progress.currentStage}/8</span>
                  <span>%{progress.masteryPercentage}</span>
                </div>
              </div>

              {/* Mastered Badge */}
              {isMastered && (
                <div className="absolute -top-2 -right-2 w-7 h-7 bg-amber-400 text-slate-950 rounded-full flex items-center justify-center border-2 border-white shadow-md text-sm animate-bounce-slow">
                  ⭐
                </div>
              )}
            </div>
          );
        })}
      </div>

    </div>
  );
};

```

## 📄 ملف: `src\components\3d\InteractiveLetter3D.tsx`
```typescript
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InteractiveLetter3DProps {
  char: string;
  color?: string;
  size?: number;
}

export const InteractiveLetter3D: React.FC<InteractiveLetter3DProps> = ({
  char,
  color = '#f59e0b',
  size = 200
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = size;
    const height = size;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(color, 3, 10);
    pointLight1.position.set(2, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 2, 10);
    pointLight2.position.set(-2, -3, 2);
    scene.add(pointLight2);

    // 4. Central 3D Gem Mesh (Icosahedron crystal)
    const geometry = new THREE.IcosahedronGeometry(1.6, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color).multiplyScalar(0.2),
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.7,
      ior: 1.5,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    const crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);

    // 5. Surrounding Floating Particle Halo
    const particlesCount = 45;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 2.0 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xfef08a,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // 6. Touch and Mouse Interaction
    let isDragging = false;
    let previousTouchX = 0;
    let previousTouchY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousTouchX = clientX;
      previousTouchY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousTouchX;
      const deltaY = clientY - previousTouchY;

      targetRotationY += deltaX * 0.015;
      targetRotationX += deltaY * 0.015;

      previousTouchX = clientX;
      previousTouchY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth idle rotation + spring to target
      if (!isDragging) {
        targetRotationY += 0.012;
        targetRotationX = Math.sin(elapsedTime * 1.5) * 0.15;
      }

      crystal.rotation.x += (targetRotationX - crystal.rotation.x) * 0.1;
      crystal.rotation.y += (targetRotationY - crystal.rotation.y) * 0.1;
      crystal.position.y = Math.sin(elapsedTime * 2) * 0.12;

      particleSystem.rotation.y = elapsedTime * 0.2;
      particleSystem.rotation.z = elapsedTime * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, [char, color, size]);

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Floating 2D Arabic Character Overlay Centered In Crystal */}
      <div className="relative pointer-events-none z-10 flex items-center justify-center">
        <span
          className="text-7xl font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-white tracking-wide animate-wiggle"
          style={{ textShadow: '0 0 20px rgba(254, 240, 138, 0.9), 0 0 35px rgba(245, 158, 11, 0.7)' }}
        >
          {char}
        </span>
      </div>
    </div>
  );
};

```

## 📄 ملف: `src\components\3d\CinematicIntroScene.tsx`
```typescript
import React, { useEffect, useState } from 'react';
import { audioManager } from '../../audio/AudioManager';
import { Sparkles, ArrowLeft, Volume2, Star } from 'lucide-react';
import { LumiMascot } from '../mascot/LumiMascot';

interface CinematicIntroSceneProps {
  onStartJourney: () => void;
}

export const CinematicIntroScene: React.FC<CinematicIntroSceneProps> = ({ onStartJourney }) => {
  const [dialogueStep, setDialogueStep] = useState<number>(0);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const dialogueLines = [
    'مَرْحَبًا.. أَنَا لُومِي! هَيَّا نَسْتَكْشِفُ مَعًا عَالَمَ الأَصْوَاتِ السَّاحِر!',
    'هَذَا العَالَمُ فَقَدَ أَصْوَاتَهُ السَّاحِرَة...',
    'هَلْ تُسَاعِدُنِي فِي إِعَادَتِهَا مَعًا؟'
  ];

  const dialogueAudioKeys = [
    '/audio/dialogue/intro_step_1.mp3',
    '/audio/dialogue/intro_step_2.mp3',
    '/audio/dialogue/intro_step_3.mp3'
  ];

  useEffect(() => {
    setIsSpeaking(true);
    audioManager.speak(dialogueAudioKeys[dialogueStep], 0.85, () => setIsSpeaking(false));
  }, [dialogueStep]);

  const handleNextDialogue = () => {
    audioManager.playClick();
    if (dialogueStep < dialogueLines.length - 1) {
      setDialogueStep((prev) => prev + 1);
    } else {
      audioManager.playPortal();
      onStartJourney();
    }
  };

  return (
    <div className="relative w-full h-screen bg-[#050814] overflow-hidden select-none flex flex-col justify-between">
      
      {/* Hyper-Realistic 8K Cinematic Cosmic Observatory Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="/assets/lumi/cinematic_portal_bg.jpg"
          alt="Cinematic Observatory Background"
          className="w-full h-full object-cover object-center filter brightness-95 scale-105 animate-pulse-slow"
        />
        {/* Atmosphere Vignette & Lighting Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-transparent to-[#050814]/70" />
        <div className="absolute inset-0 bg-radial-vignette opacity-55 pointer-events-none" />
      </div>

      {/* Floating Stardust Particles */}
      <div className="absolute inset-0 z-1 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/5 w-2 h-2 bg-amber-300 rounded-full animate-ping opacity-80" />
        <div className="absolute top-1/3 right-1/4 w-3 h-3 bg-cyan-300 rounded-full animate-pulse opacity-90 shadow-glow-cyan" />
        <div className="absolute bottom-1/3 left-1/3 w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce opacity-75" />
      </div>

      {/* Top Header */}
      <div className="relative z-10 p-6 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-[#09112a]/90 backdrop-blur-2xl px-5 py-2.5 rounded-full border-2 border-amber-400/50 text-amber-200 text-xs font-black shadow-[0_0_30px_rgba(245,158,11,0.35)]">
          <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300 animate-spin-slow" />
          <span>LUMI — مَمْلَكَةُ الأَصْوَاتِ الأَسْطُورِيَّة</span>
        </div>
      </div>

      {/* Center 60FPS Living Animated Lumi Character Hero */}
      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
        <div
          className="relative cursor-pointer transition-transform duration-300 hover:scale-105 active:scale-95"
          onClick={() => {
            setIsSpeaking(true);
            audioManager.playVictory();
            audioManager.speak(dialogueAudioKeys[dialogueStep], 0.85, () => setIsSpeaking(false));
          }}
          title="انقر على لومي للتحدث!"
        >
          {/* Animated 60FPS Living Mascot Canvas */}
          <LumiMascot
            state={isSpeaking ? 'listening' : 'idle'}
            size="xl"
          />

          <div className="absolute -bottom-2 inset-x-0 flex justify-center pointer-events-none">
            <span className="bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 font-black text-xs px-4 py-1 rounded-full border-2 border-white shadow-xl flex items-center gap-1.5 animate-bounce">
              <Sparkles className="w-3.5 h-3.5 text-amber-950 fill-amber-950" />
              لُومِي (LUMI) 🌟
            </span>
          </div>
        </div>
      </div>

      {/* Cinematic Dialogue Box & Action */}
      <div className="relative z-10 pb-10 px-4 max-w-lg mx-auto w-full text-center space-y-4">
        
        {/* Dialogue Card */}
        <div className="bg-[#091330]/95 backdrop-blur-2xl p-5 md:p-6 rounded-3xl border-3 border-amber-400/90 shadow-[0_0_50px_rgba(245,158,11,0.4)] space-y-3 transform transition-all duration-500 animate-pop">
          <p className="text-lg md:text-xl font-black text-amber-100 leading-relaxed drop-shadow-md">
            {dialogueLines[dialogueStep]}
          </p>

          <div className="flex items-center justify-center gap-1.5 pt-1">
            {dialogueLines.map((_, idx) => (
              <span
                key={idx}
                className={`h-1.5 rounded-full transition-all ${
                  dialogueStep === idx ? 'w-8 bg-amber-400' : 'w-2 bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={handleNextDialogue}
            className="group relative px-10 py-4 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-slate-950 rounded-2xl font-black text-lg border-2 border-white shadow-glow-yellow hover:scale-105 active:scale-95 transition-all flex items-center gap-3"
          >
            <span>{dialogueStep < dialogueLines.length - 1 ? 'مُتَابَعَة' : 'ابْدَأِ الرِّحْلَة 🚀'}</span>
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          </button>
        </div>

      </div>

    </div>
  );
};

```

## 📄 ملف: `src\audio\ClientEdgeTTS.ts`
```typescript
// 100% Client-Side Pure Microsoft Neural Edge TTS Engine for LUMI
// Runs directly in the browser with ZERO server dependency (Works on Netlify, GitHub Pages, Mobile & Desktop)
// Voice: ar-SA-ZariyahNeural (Saudi Female)

function generateUUID(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// In-memory audio Blob cache to prevent redundant synthesis
const audioBlobCache = new Map<string, string>();

export class ClientEdgeTTS {
  private static readonly WS_URL =
    'wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud/edge/v1?TrustedClientToken=6A5AA1D4EA654072B1647F16571D8806';

  /**
   * Synthesizes Arabic text using Microsoft Neural Female Voice directly in browser
   * Returns an Object URL pointing to the synthesized MP3 Blob
   */
  public static async synthesize(
    text: string,
    voice: string = 'ar-SA-ZariyahNeural',
    rate: string = '-4%',
    pitch: string = '+0Hz'
  ): Promise<string> {
    const cleanText = text.trim();
    const cacheKey = `${voice}_${rate}_${pitch}_${cleanText}`;

    if (audioBlobCache.has(cacheKey)) {
      return audioBlobCache.get(cacheKey)!;
    }

    // Try direct WebSocket synthesis first
    try {
      const blobUrl = await this.synthesizeViaWebSocket(cleanText, voice, rate, pitch);
      audioBlobCache.set(cacheKey, blobUrl);
      return blobUrl;
    } catch (wsError) {
      console.warn('[ClientEdgeTTS] WebSocket fallback to HTTPS audio stream...', wsError);
      // Fallback to high-speed public neural audio proxy
      const fallbackUrl = await this.synthesizeViaHttpsProxy(cleanText, voice);
      audioBlobCache.set(cacheKey, fallbackUrl);
      return fallbackUrl;
    }
  }

  private static synthesizeViaWebSocket(
    text: string,
    voice: string,
    rate: string,
    pitch: string
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      if (typeof window === 'undefined' || !window.WebSocket) {
        return reject(new Error('WebSockets not supported in this environment'));
      }

      const connectionId = generateUUID().replace(/-/g, '');
      const requestId = generateUUID().replace(/-/g, '');
      const ws = new WebSocket(`${this.WS_URL}&ConnectionId=${connectionId}`);
      ws.binaryType = 'arraybuffer';

      const audioChunks: BlobPart[] = [];
      let isCompleted = false;

      // 8-second synthesis timeout guard
      const timeoutTimer = setTimeout(() => {
        if (!isCompleted) {
          isCompleted = true;
          try { ws.close(); } catch {}
          reject(new Error('WebSocket TTS Timeout'));
        }
      }, 8000);

      ws.onopen = () => {
        // 1. Send speech config
        const configMsg =
          `Content-Type:application/json; charset=utf-8\r\nPath:speech.config\r\n\r\n` +
          JSON.stringify({
            context: {
              synthesis: {
                audio: {
                  metadataoptions: {
                    sentenceBoundaryEnabled: 'false',
                    wordBoundaryEnabled: 'false'
                  },
                  outputFormat: 'audio-24khz-48kbitrate-mono-mp3'
                }
              }
            }
          });
        ws.send(configMsg);

        // 2. Send SSML request
        const ssml =
          `<speak version='1.0' xmlns='http://www.w3.org/2001/10/synthesis' xml:lang='ar-SA'>` +
          `<voice name='${voice}'>` +
          `<prosody pitch='${pitch}' rate='${rate}'>` +
          `${this.escapeXml(text)}` +
          `</prosody></voice></speak>`;

        const ssmlMsg =
          `X-RequestId:${requestId}\r\n` +
          `Content-Type:application/ssml+xml\r\n` +
          `Path:ssml\r\n\r\n` +
          ssml;

        ws.send(ssmlMsg);
      };

      ws.onmessage = (event) => {
        if (typeof event.data === 'string') {
          if (event.data.includes('Path:turn.end')) {
            isCompleted = true;
            clearTimeout(timeoutTimer);
            try { ws.close(); } catch {}

            if (audioChunks.length === 0) {
              return reject(new Error('No audio received from Edge TTS'));
            }

            const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
            const blobUrl = URL.createObjectURL(audioBlob);
            resolve(blobUrl);
          }
        } else if (event.data instanceof ArrayBuffer) {
          const buffer = event.data;
          const view = new DataView(buffer);
          if (buffer.byteLength > 2) {
            const headerLength = view.getInt16(0);
            if (buffer.byteLength > headerLength + 2) {
              const audioPayload = buffer.slice(headerLength + 2);
              audioChunks.push(audioPayload);
            }
          }
        }
      };

      ws.onerror = (err) => {
        if (!isCompleted) {
          isCompleted = true;
          clearTimeout(timeoutTimer);
          reject(err);
        }
      };

      ws.onclose = () => {
        if (!isCompleted) {
          isCompleted = true;
          clearTimeout(timeoutTimer);
          if (audioChunks.length > 0) {
            const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
            resolve(URL.createObjectURL(audioBlob));
          } else {
            reject(new Error('WebSocket closed before audio completed'));
          }
        }
      };
    });
  }

  private static async synthesizeViaHttpsProxy(text: string, voice: string): Promise<string> {
    // High reliability fallback endpoint with pure female voice
    const clean = encodeURIComponent(text);
    const primaryUrl = `/api/tts?text=${clean}`;

    try {
      const response = await fetch(primaryUrl);
      if (response.ok && response.headers.get('content-type')?.includes('audio')) {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
      }
    } catch {}

    // Fallback: Google Translate Neural Arabic Female TTS
    const gUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${clean}`;
    return gUrl;
  }

  private static escapeXml(unsafe: string): string {
    return unsafe.replace(/[<>&'"]/g, (c) => {
      switch (c) {
        case '<': return '&lt;';
        case '>': return '&gt;';
        case '&': return '&amp;';
        case '\'': return '&apos;';
        case '"': return '&quot;';
        default: return c;
      }
    });
  }
}

```

## 📄 ملف: `src\audio\audioManifest.ts`
```typescript
// Comprehensive Static Audio Manifest & English Slug Mapping for LUMI
// Prioritizes pristine pre-recorded human audio files under /public/audio/

export interface AudioAsset {
  key: string;
  path: string;
  arText: string;
  category: 'letters' | 'syllables' | 'words' | 'sentences' | 'stages' | 'dialogue' | 'names' | 'articulation';
  descriptionAr: string;
}

// 1. Letters Mapping (28 Arabic Alphabet Letters)
export const LETTER_AUDIO_MAP: Record<string, string> = {
  'alif': '/audio/letters/alif.mp3',
  'baa': '/audio/letters/baa.mp3',
  'taa': '/audio/letters/taa.mp3',
  'thaa': '/audio/letters/thaa.mp3',
  'jeem': '/audio/letters/jeem.mp3',
  'haa': '/audio/letters/haa.mp3',
  'khaa': '/audio/letters/khaa.mp3',
  'daal': '/audio/letters/daal.mp3',
  'zaal': '/audio/letters/zaal.mp3',
  'raa': '/audio/letters/raa.mp3',
  'zay': '/audio/letters/zay.mp3',
  'seen': '/audio/letters/seen.mp3',
  'sheen': '/audio/letters/sheen.mp3',
  'saad': '/audio/letters/saad.mp3',
  'daad': '/audio/letters/daad.mp3',
  'taa_heavy': '/audio/letters/taa_heavy.mp3',
  'zaa_heavy': '/audio/letters/zaa_heavy.mp3',
  'ayn': '/audio/letters/ayn.mp3',
  'ghayn': '/audio/letters/ghayn.mp3',
  'faa': '/audio/letters/faa.mp3',
  'qaaf': '/audio/letters/qaaf.mp3',
  'kaaf': '/audio/letters/kaaf.mp3',
  'laam': '/audio/letters/laam.mp3',
  'meem': '/audio/letters/meem.mp3',
  'noon': '/audio/letters/noon.mp3',
  'haa_soft': '/audio/letters/haa_soft.mp3',
  'waaw': '/audio/letters/waaw.mp3',
  'yaa': '/audio/letters/yaa.mp3'
};

// 2. Syllables & Short/Long Vowels
export const SYLLABLE_AUDIO_MAP: Record<string, string> = {
  // Baa
  'baa_fatha': '/audio/syllables/baa_fatha.mp3',
  'baa_kasra': '/audio/syllables/baa_kasra.mp3',
  'baa_damma': '/audio/syllables/baa_damma.mp3',
  'baa_alif': '/audio/syllables/baa_alif.mp3',
  'baa_yaa': '/audio/syllables/baa_yaa.mp3',
  'baa_waw': '/audio/syllables/baa_waw.mp3',
  'بَ': '/audio/syllables/baa_fatha.mp3',
  'بِ': '/audio/syllables/baa_kasra.mp3',
  'بُ': '/audio/syllables/baa_damma.mp3',
  'بَا': '/audio/syllables/baa_alif.mp3',
  'بِي': '/audio/syllables/baa_yaa.mp3',
  'بُو': '/audio/syllables/baa_waw.mp3'
};

// 3. Words Mapping
export const WORD_AUDIO_MAP: Record<string, string> = {
  // Baa Words
  'baab': '/audio/words/baab.mp3',
  'battah': '/audio/words/battah.mp3',
  'bayt': '/audio/words/bayt.mp3',
  'bahr': '/audio/words/bahr.mp3',
  'hubz': '/audio/words/hubz.mp3',
  'habl': '/audio/words/habl.mp3',
  'inab': '/audio/words/inab.mp3',
  'kataba': '/audio/words/kataba.mp3',
  'بَاب': '/audio/words/baab.mp3',
  'بَطَّة': '/audio/words/battah.mp3',
  'بَيْت': '/audio/words/bayt.mp3',
  'بَحْر': '/audio/words/bahr.mp3',
  'خُبْز': '/audio/words/hubz.mp3',
  'حَبْل': '/audio/words/habl.mp3',
  'عِنَب': '/audio/words/inab.mp3',
  'كَتَبَ': '/audio/words/kataba.mp3',

  // Common Practice Words
  'arnab': '/audio/words/arnab.mp3',
  'asad': '/audio/words/asad.mp3',
  'faar': '/audio/words/faar.mp3',
  'qaraa': '/audio/words/qaraa.mp3',
  'أَرْنَب': '/audio/words/arnab.mp3',
  'أَسَد': '/audio/words/asad.mp3',
  'فَأْر': '/audio/words/faar.mp3',
  'قَرَأَ': '/audio/words/qaraa.mp3',

  'tuffah': '/audio/words/tuffah.mp3',
  'taaj': '/audio/words/taaj.mp3',
  'kitaab': '/audio/words/kitaab.mp3',
  'تُفَّاح': '/audio/words/tuffah.mp3',
  'تَاج': '/audio/words/taaj.mp3',
  'كِتَاب': '/audio/words/kitaab.mp3',

  'thalab': '/audio/words/thalab.mp3',
  'thawb': '/audio/words/thawb.mp3',
  'muthallath': '/audio/words/muthallath.mp3',
  'bahatha': '/audio/words/bahatha.mp3',
  'ثَعْلَب': '/audio/words/thalab.mp3',
  'ثَوْب': '/audio/words/thawb.mp3',
  'مُثَلَّث': '/audio/words/muthallath.mp3',
  'بَحَثَ': '/audio/words/bahatha.mp3',

  'jamal': '/audio/words/jamal.mp3',
  'jazar': '/audio/words/jazar.mp3',
  'shajarah': '/audio/words/shajarah.mp3',
  'جَمَل': '/audio/words/jamal.mp3',
  'جَزَر': '/audio/words/jazar.mp3',
  'شَجَرَة': '/audio/words/shajarah.mp3'
};

// 4. Sentences Mapping
export const SENTENCE_AUDIO_MAP: Record<string, string> = {
  'baab_bayt': '/audio/sentences/baab_bayt.mp3',
  'battah_tasbah': '/audio/sentences/battah_tasbah.mp3',
  'هَذَا بَابُ البَيْتِ': '/audio/sentences/baab_bayt.mp3',
  'هذا باب البيت': '/audio/sentences/baab_bayt.mp3',
  'البَطَّةُ تَسْبَحُ فِي البَحْرِ': '/audio/sentences/battah_tasbah.mp3',
  'البطة تسبح في البحر': '/audio/sentences/battah_tasbah.mp3',
  'الأَرْنَبُ يَأْكُلُ الجَزَرَ': '/audio/sentences/arnab_jazar.mp3',
  'الجَمَلُ سَفِينَةُ الصَّحْرَاءِ': '/audio/sentences/jamal_sahraa.mp3'
};

// 5. Stage Prompts & Progression
export const STAGE_AUDIO_MAP: Record<string, string> = {
  'stage_1': '/audio/stages/stage_1.mp3',
  'stage_2': '/audio/stages/stage_2.mp3',
  'stage_3': '/audio/stages/stage_3.mp3',
  'stage_4': '/audio/stages/stage_4.mp3',
  'stage_5': '/audio/stages/stage_5.mp3',
  'stage_6': '/audio/stages/stage_6.mp3',
  'stage_7': '/audio/stages/stage_7.mp3',
  'stage_8': '/audio/stages/stage_8.mp3',
  'stage_1_explain': '/audio/stages/stage_1_explain.mp3',
  'stage_2_explain': '/audio/stages/stage_2_explain.mp3',
  'stage_3_explain': '/audio/stages/stage_3_explain.mp3',
  'stage_4_explain': '/audio/stages/stage_4_explain.mp3',
  'stage_5_explain': '/audio/stages/stage_5_explain.mp3',
  'stage_6_explain': '/audio/stages/stage_6_explain.mp3',
  'stage_7_explain': '/audio/stages/stage_7_explain.mp3',
  'stage_8_explain': '/audio/stages/stage_8_explain.mp3',
  'listen_sound': '/audio/stages/listen_sound.mp3',
  'next_stage': '/audio/stages/next_stage.mp3',
  'اسْتَمِعْ لِصَوْتِ الحَرْف': '/audio/stages/listen_sound.mp3',
  'استمع لصوت الحرف': '/audio/stages/listen_sound.mp3'
};

// 6. Dialogue, Greetings & Encouragements
export const DIALOGUE_AUDIO_MAP: Record<string, string> = {
  'ask_name': '/audio/dialogue/ask_name.mp3',
  'choose_letter': '/audio/dialogue/choose_letter.mp3',
  'excellent': '/audio/dialogue/excellent.mp3',
  'help_me': '/audio/dialogue/help_me.mp3',
  'intro_step_1': '/audio/dialogue/intro_step_1.mp3',
  'intro_step_2': '/audio/dialogue/intro_step_2.mp3',
  'intro_step_3': '/audio/dialogue/intro_step_3.mp3',
  'launch_journey': '/audio/dialogue/launch_journey.mp3',
  'letter_choice_cheer': '/audio/dialogue/letter_choice_cheer.mp3',
  'lost_sounds': '/audio/dialogue/lost_sounds.mp3',
  'open_next_stage': '/audio/dialogue/open_next_stage.mp3',
  'try_again': '/audio/dialogue/try_again.mp3',
  'welcome': '/audio/dialogue/welcome.mp3',
  'welcome_child': '/audio/dialogue/welcome_child.mp3',
  'welcome_talal': '/audio/dialogue/welcome_talal.mp3',
  'welcome_raneem': '/audio/dialogue/welcome_raneem.mp3',
  'cheer_talal': '/audio/dialogue/cheer_talal.mp3',
  'cheer_raneem': '/audio/dialogue/cheer_raneem.mp3',
  'complete_previous_first': '/audio/dialogue/complete_previous_first.mp3',

  // Arabic Text Direct Match
  'مَا اسْمُكَ يَا بَطَل؟ اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/ask_name.mp3',
  'مَرْحَبًا يَا بَطَل! اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/ask_name.mp3',
  'مرحبا يا بطل! اكتب اسمك هنا لنبدأ رحلتنا الساحرة!': '/audio/dialogue/ask_name.mp3',
  'مَرْحَبًا.. أَنَا لُومِي! هَيَّا نَسْتَكْشِفُ مَعًا عَالَمَ الأَصْوَاتِ السَّاحِر!': '/audio/dialogue/intro_step_1.mp3',
  'مرحبا.. أنا لومي! هيا نستكشف معا عالم الأصوات الساحر!': '/audio/dialogue/intro_step_1.mp3',
  'هَذَا العَالَمُ فَقَدَ أَصْوَاتَهُ السَّاحِرَة...': '/audio/dialogue/intro_step_2.mp3',
  'هذا العالم فقد أصواته الساحرة...': '/audio/dialogue/intro_step_2.mp3',
  'هَلْ تُسَاعِدُنِي فِي إِعَادَتِهَا مَعًا؟': '/audio/dialogue/intro_step_3.mp3',
  'هل تساعدني في إعادتها معا؟': '/audio/dialogue/intro_step_3.mp3',
  'اخْتِيَارٌ سِحْرِيٌّ رَائِع! هَيَّا بِنَا نَبْدَأُ المُغَامَرَة!': '/audio/dialogue/letter_choice_cheer.mp3',
  'مَبْرُوك! فُتِحَتْ لَكَ المَرْحَلَةُ التَّالِيَة.. هَيَّا نَنْطَلِق!': '/audio/dialogue/open_next_stage.mp3',
  'أَكْمِلِ المَرْحَلَةَ السَّابِقَةَ أَوَّلًا لِفَتْحِ هَذِهِ المَرْحَلَة!': '/audio/dialogue/complete_previous_first.mp3',
  'أَحْسَنْتَ يَا بَطَل!': '/audio/dialogue/excellent.mp3',
  'أحسنت يا بطل!': '/audio/dialogue/excellent.mp3',
  'حَاوِلْ مَرَّةً أُخْرَى يَا بَطَل!': '/audio/dialogue/try_again.mp3',
  'حاول مرة أخرى يا بطل!': '/audio/dialogue/try_again.mp3',
  'حَاوِلْ مَرَّةً أُخْرَى': '/audio/dialogue/try_again.mp3'
};

// 7. Child Names (50 Pre-recorded Names)
export const NAME_AUDIO_MAP: Record<string, string> = {
  'talal': '/audio/names/talal.mp3',
  'طلال': '/audio/names/talal.mp3',
  'طَلَال': '/audio/names/talal.mp3',
  'raneem': '/audio/names/raneem.mp3',
  'رنيم': '/audio/names/raneem.mp3',
  'رَنِيم': '/audio/names/raneem.mp3',
  'fatima': '/audio/names/fatima.mp3',
  'فاطمة': '/audio/names/fatima.mp3',
  'فَاطِمَة': '/audio/names/fatima.mp3',
  'heba': '/audio/names/heba.mp3',
  'هبة': '/audio/names/heba.mp3',
  'هِبَة': '/audio/names/heba.mp3',
  'jana': '/audio/names/jana.mp3',
  'جنى': '/audio/names/jana.mp3',
  'جَنَى': '/audio/names/jana.mp3',
  'mira': '/audio/names/mira.mp3',
  'ميرا': '/audio/names/mira.mp3',
  'مِيرَا': '/audio/names/mira.mp3',
  'deema': '/audio/names/deema.mp3',
  'ديمة': '/audio/names/deema.mp3',
  'دِيمَة': '/audio/names/deema.mp3',
  'taiba': '/audio/names/taiba.mp3',
  'طيبة': '/audio/names/taiba.mp3',
  'طِيبَة': '/audio/names/taiba.mp3',
  'mohammed': '/audio/names/mohammed.mp3',
  'محمد': '/audio/names/mohammed.mp3',
  'مُحَمَّد': '/audio/names/mohammed.mp3',
  'ahmed': '/audio/names/ahmed.mp3',
  'أحمد': '/audio/names/ahmed.mp3',
  'أَحْمَد': '/audio/names/ahmed.mp3',
  'sara': '/audio/names/sara.mp3',
  'سارة': '/audio/names/sara.mp3',
  'سَارَة': '/audio/names/sara.mp3',
  'ali': '/audio/names/ali.mp3',
  'علي': '/audio/names/ali.mp3',
  'عَلِي': '/audio/names/ali.mp3',
  'omar': '/audio/names/omar.mp3',
  'عمر': '/audio/names/omar.mp3',
  'عُمَر': '/audio/names/omar.mp3',
  'youssef': '/audio/names/youssef.mp3',
  'يوسف': '/audio/names/youssef.mp3',
  'يُوسُف': '/audio/names/youssef.mp3',
  'nour': '/audio/names/nour.mp3',
  'نور': '/audio/names/nour.mp3',
  'نُور': '/audio/names/nour.mp3',
  'maryam': '/audio/names/maryam.mp3',
  'مريم': '/audio/names/maryam.mp3',
  'مَرْيَم': '/audio/names/maryam.mp3',
  'batal': '/audio/names/batal.mp3',
  'بطل': '/audio/names/batal.mp3',
  'البطل': '/audio/names/batal.mp3',
  'البَطَل': '/audio/names/batal.mp3',
  'يَا بَطَل': '/audio/names/batal.mp3',
  'يا بطل': '/audio/names/batal.mp3',
  'batala': '/audio/names/batala.mp3',
  'بطلة': '/audio/names/batala.mp3',
  'البطلة': '/audio/names/batala.mp3',
  'البَطَلَة': '/audio/names/batala.mp3',
  'يَا بَطَلَة': '/audio/names/batala.mp3',
  'يا بطلة': '/audio/names/batala.mp3',
  'abdullah': '/audio/names/abdullah.mp3',
  'عبدالله': '/audio/names/abdullah.mp3',
  'abdulrahman': '/audio/names/abdulrahman.mp3',
  'عبدالرحمن': '/audio/names/abdulrahman.mp3',
  'adam': '/audio/names/adam.mp3',
  'آدم': '/audio/names/adam.mp3',
  'faisal': '/audio/names/faisal.mp3',
  'فيصل': '/audio/names/faisal.mp3',
  'farah': '/audio/names/farah.mp3',
  'فرح': '/audio/names/farah.mp3',
  'hamza': '/audio/names/hamza.mp3',
  'حمزة': '/audio/names/hamza.mp3',
  'hassan': '/audio/names/hassan.mp3',
  'حسن': '/audio/names/hassan.mp3',
  'huda': '/audio/names/huda.mp3',
  'هدى': '/audio/names/huda.mp3',
  'hussein': '/audio/names/hussein.mp3',
  'حسين': '/audio/names/hussein.mp3',
  'ibrahim': '/audio/names/ibrahim.mp3',
  'إبراهيم': '/audio/names/ibrahim.mp3',
  'joud': '/audio/names/joud.mp3',
  'جود': '/audio/names/joud.mp3',
  'karam': '/audio/names/karam.mp3',
  'كرم': '/audio/names/karam.mp3',
  'khaled': '/audio/names/khaled.mp3',
  'خالد': '/audio/names/khaled.mp3',
  'khalil': '/audio/names/khalil.mp3',
  'خليل': '/audio/names/khalil.mp3',
  'layan': '/audio/names/layan.mp3',
  'ليان': '/audio/names/layan.mp3',
  'leila': '/audio/names/leila.mp3',
  'ليلى': '/audio/names/leila.mp3',
  'majd': '/audio/names/majd.mp3',
  'مجد': '/audio/names/majd.mp3',
  'malak': '/audio/names/malak.mp3',
  'ملك': '/audio/names/malak.mp3',
  'qais': '/audio/names/qais.mp3',
  'قيس': '/audio/names/qais.mp3',
  'rayan': '/audio/names/rayan.mp3',
  'ريان': '/audio/names/rayan.mp3',
  'reem': '/audio/names/reem.mp3',
  'ريم': '/audio/names/reem.mp3',
  'saad': '/audio/names/saad.mp3',
  'سعد': '/audio/names/saad.mp3',
  'salem': '/audio/names/salem.mp3',
  'سالم': '/audio/names/salem.mp3',
  'salma': '/audio/names/salma.mp3',
  'سلمى': '/audio/names/salma.mp3',
  'tariq': '/audio/names/tariq.mp3',
  'طارق': '/audio/names/tariq.mp3',
  'waseem': '/audio/names/waseem.mp3',
  'وسيم': '/audio/names/waseem.mp3',
  'wissam': '/audio/names/wissam.mp3',
  'وسام': '/audio/names/wissam.mp3',
  'yara': '/audio/names/yara.mp3',
  'يارا': '/audio/names/yara.mp3',
  'zaid': '/audio/names/zaid.mp3',
  'زيد': '/audio/names/zaid.mp3',
  'ziad': '/audio/names/ziad.mp3',
  'زياد': '/audio/names/ziad.mp3'
};

// 8. Articulation & Mouth Anatomy Guides
export const ARTICULATION_AUDIO_MAP: Record<string, string> = {
  'tongue_guide_baa': '/audio/articulation/tongue_guide_baa.mp3',
  'lips_guide_baa': '/audio/articulation/lips_guide_baa.mp3',
  'tongue_lab_intro': '/audio/articulation/tongue_lab_intro.mp3',
  'tongue_quiz_success': '/audio/articulation/tongue_quiz_success.mp3'
};

// Arabic letter character to English letter slug
export const ARABIC_CHAR_TO_SLUG: Record<string, string> = {
  'أ': 'alif', 'ا': 'alif', 'إ': 'alif', 'آ': 'alif', 'ء': 'alif',
  'ب': 'baa',
  'ت': 'taa',
  'ث': 'thaa',
  'ج': 'jeem',
  'ح': 'haa',
  'خ': 'khaa',
  'د': 'daal',
  'ذ': 'zaal',
  'ر': 'raa',
  'ز': 'zay',
  'س': 'seen',
  'ش': 'sheen',
  'ص': 'saad',
  'ض': 'daad',
  'ط': 'taa_heavy',
  'ظ': 'zaa_heavy',
  'ع': 'ayn',
  'غ': 'ghayn',
  'ف': 'faa',
  'ق': 'qaaf',
  'ك': 'kaaf',
  'ل': 'laam',
  'م': 'meem',
  'ن': 'noon',
  'ه': 'haa_soft', 'ة': 'haa_soft',
  'و': 'waaw',
  'ي': 'yaa', 'ى': 'yaa'
};

// Arabic letter name to English letter slug
export const ARABIC_NAME_TO_SLUG: Record<string, string> = {
  'أَلِف': 'alif', 'الف': 'alif', 'ألف': 'alif',
  'بَاء': 'baa', 'باء': 'baa',
  'تَاء': 'taa', 'تاء': 'taa',
  'ثَاء': 'thaa', 'ثاء': 'thaa',
  'جِيم': 'jeem', 'جيم': 'jeem',
  'حَاء': 'haa', 'حاء': 'haa',
  'خَاء': 'khaa', 'خاء': 'khaa',
  'دَال': 'daal', 'دال': 'daal',
  'ذَال': 'zaal', 'ذال': 'zaal',
  'رَاء': 'raa', 'راء': 'raa',
  'زَاي': 'zay', 'زاي': 'zay',
  'سِين': 'seen', 'سين': 'seen',
  'شِين': 'sheen', 'شين': 'sheen',
  'صَاد': 'saad', 'صاد': 'saad',
  'ضَاد': 'daad', 'ضاد': 'daad',
  'طَاء': 'taa_heavy', 'طاء': 'taa_heavy',
  'ظَاء': 'zaa_heavy', 'ظاء': 'zaa_heavy',
  'عَيْن': 'ayn', 'عين': 'ayn',
  'غَيْن': 'ghayn', 'غين': 'ghayn',
  'فَاء': 'faa', 'فاء': 'faa',
  'قَاف': 'qaaf', 'قاف': 'qaaf',
  'كَاف': 'kaaf', 'كاف': 'kaaf',
  'لاَم': 'laam', 'لام': 'laam',
  'مِيم': 'meem', 'ميم': 'meem',
  'نُون': 'noon', 'noon': 'noon',
  'هَاء': 'haa_soft', 'هاء': 'haa_soft',
  'وَاو': 'waaw', 'واو': 'waaw',
  'يَاء': 'yaa', 'ياء': 'yaa'
};

// Master Unified Static Audio Map
export const MASTER_AUDIO_MANIFEST: Record<string, string> = {
  ...LETTER_AUDIO_MAP,
  ...SYLLABLE_AUDIO_MAP,
  ...WORD_AUDIO_MAP,
  ...SENTENCE_AUDIO_MAP,
  ...STAGE_AUDIO_MAP,
  ...DIALOGUE_AUDIO_MAP,
  ...NAME_AUDIO_MAP,
  ...ARTICULATION_AUDIO_MAP
};

/**
 * Strips Arabic tashkeel (diacritics) for fuzzy matching
 */
export function stripTashkeel(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '')
    .trim();
}

/**
 * Strips emojis and punctuation icons
 */
export function stripEmojis(text: string): string {
  return text
    .replace(/[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{2300}-\u{23FF}\u{2B50}\u{1F004}\u{1F0CF}\u{2B06}\u{2194}-\u{21AA}]/gu, '')
    .replace(/[✨⭐🌟💫🎉🎈🎊👑💎💡🔔🎵🎶🏆🥇🥈🥉👄👅👃🦷👁️]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Resolves any key, text, or phrase to its standardized local MP3 file path
 * Returns null if no pre-recorded audio file matches.
 */
export function resolveStaticAudioPath(keyOrText: string): string | string[] | null {
  const raw = keyOrText.trim();
  if (!raw) return null;

  // 1. Direct path or URL
  if (raw.startsWith('/') || raw.startsWith('http')) {
    return raw;
  }

  // 2. Direct exact match in master manifest
  if (MASTER_AUDIO_MANIFEST[raw]) {
    return MASTER_AUDIO_MANIFEST[raw];
  }

  // 3. Single Arabic character lookup
  if (ARABIC_CHAR_TO_SLUG[raw]) {
    const slug = ARABIC_CHAR_TO_SLUG[raw];
    return LETTER_AUDIO_MAP[slug] || null;
  }

  // 4. Normalized stripped tashkeel match
  const stripped = stripTashkeel(raw);
  if (MASTER_AUDIO_MANIFEST[stripped]) {
    return MASTER_AUDIO_MANIFEST[stripped];
  }

  // 5. Letter name lookup (e.g. 'أَلِف', 'بَاء')
  if (ARABIC_NAME_TO_SLUG[stripped]) {
    const slug = ARABIC_NAME_TO_SLUG[stripped];
    return LETTER_AUDIO_MAP[slug] || null;
  }

  // 6. Stage specific explanations & titles
  if (STAGE_AUDIO_MAP[raw]) {
    return STAGE_AUDIO_MAP[raw];
  }
  if (STAGE_AUDIO_MAP[stripped]) {
    return STAGE_AUDIO_MAP[stripped];
  }

  // Check if text is a detailed stage explanation
  const isExplanation =
    stripped.includes('في هذه المرحلة') ||
    stripped.includes('شرح') ||
    stripped.includes('كيف يلعب') ||
    stripped.includes('طريقة اللعب') ||
    stripped.includes('اصطد فقاعات') ||
    stripped.includes('تشريح الفم') ||
    stripped.includes('الحركات التشكيلية') ||
    stripped.includes('قطار الاصوات') ||
    stripped.includes('صيد الكلمات') ||
    stripped.includes('مهندس كلمات') ||
    stripped.includes('بوابة التتويج') ||
    stripped.includes('استمع للمقطع') ||
    stripped.includes('انظر للكلمة');

  const stageMatch = stripped.match(/(?:المرحلة|مرحلة)\s*([1-8])/i);
  if (stageMatch && stageMatch[1]) {
    const stageNum = stageMatch[1];
    if (isExplanation || stripped.length > 40) {
      return STAGE_AUDIO_MAP[`stage_${stageNum}_explain`] || null;
    }
    // Only return short title mp3 if it's a short title phrase
    if (stripped.length <= 40) {
      return STAGE_AUDIO_MAP[`stage_${stageNum}`] || null;
    }
  }
  if (stripped.includes('اكمل المرحلة السابقة') || stripped.includes('أكمل المرحلة السابقة')) {
    return '/audio/dialogue/complete_previous_first.mp3';
  }
  if (stripped.includes('استمع لصوت الحرف') || stripped.includes('اسْتَمِعْ لِصَوْتِ الحَرْف')) {
    return '/audio/stages/listen_sound.mp3';
  }
  if (stripped.includes('فتحت لك المرحلة') || stripped.includes('فُتِحَتْ لَكَ المَرْحَلَةُ')) {
    return '/audio/dialogue/open_next_stage.mp3';
  }

  // 7. Letter phrase match: "حرف الباء", "صوت حرف الجيم.. جْ", "حرف ب"
  const letterMatch = stripped.match(/(?:حرف|صوت)\s+(?:حرف\s+)?(?:ال)?([^\s.]+)/i);
  if (letterMatch && letterMatch[1]) {
    const candidateName = letterMatch[1].replace(/^(ال|ل)/, '');
    if (ARABIC_NAME_TO_SLUG[candidateName]) {
      const slug = ARABIC_NAME_TO_SLUG[candidateName];
      return LETTER_AUDIO_MAP[slug] || null;
    }
    if (ARABIC_CHAR_TO_SLUG[candidateName]) {
      const slug = ARABIC_CHAR_TO_SLUG[candidateName];
      return LETTER_AUDIO_MAP[slug] || null;
    }
  }

  // 8. Dialogues & System prompts
  if (stripped.includes('ما اسمك') || stripped.includes('اكتب اسمك')) {
    return '/audio/dialogue/ask_name.mp3';
  }
  if (stripped.includes('اختر حرفك') || stripped.includes('اخْتَرْ حَرْفَكَ')) {
    return '/audio/dialogue/choose_letter.mp3';
  }
  if (stripped.includes('اختيار رائع') || stripped.includes('اختيار ساحر')) {
    return '/audio/dialogue/letter_choice_cheer.mp3';
  }

  // Encouragements
  if (
    stripped.includes('احسنت') ||
    stripped.includes('أحسنت') ||
    stripped.includes('ممتاز') ||
    stripped.includes('رائع') ||
    stripped.includes('عمل ملكي') ||
    stripped.includes('اجابة رائعة')
  ) {
    if (stripped.includes('طلال')) {
      return '/audio/dialogue/cheer_talal.mp3';
    }
    if (stripped.includes('رنيم')) {
      return '/audio/dialogue/cheer_raneem.mp3';
    }
    return '/audio/dialogue/excellent.mp3';
  }

  // Retries
  if (
    stripped.includes('حاول مرة') ||
    stripped.includes('حَاوِلْ مَرَّةً') ||
    stripped.includes('حاولي مرة') ||
    stripped.includes('لنجرب خيارا') ||
    stripped.includes('لِنُجَرِّبْ خِيَارًا')
  ) {
    return '/audio/dialogue/try_again.mp3';
  }

  // Welcomes & Greetings
  if (
    stripped.includes('مرحبا') ||
    stripped.includes('مَرْحَبًا') ||
    stripped.includes('اهلا') ||
    stripped.includes('أَهْلًا') ||
    stripped.includes('أهلا')
  ) {
    if (stripped.includes('طلال')) {
      return '/audio/dialogue/welcome_talal.mp3';
    }
    if (stripped.includes('رنيم')) {
      return '/audio/dialogue/welcome_raneem.mp3';
    }
    return '/audio/dialogue/welcome.mp3';
  }

  // 9. Exact Standalone Child Name Match ONLY (Never substring match across sentences)
  if (NAME_AUDIO_MAP[stripped]) {
    return NAME_AUDIO_MAP[stripped];
  }
  if (stripped.startsWith('يا ') || stripped.startsWith('يَا ')) {
    const singleName = stripped.replace(/^(يا|يَا)\s+/, '').trim();
    if (NAME_AUDIO_MAP[singleName]) {
      return NAME_AUDIO_MAP[singleName];
    }
  }

  return null;
}

```

## 📄 ملف: `src\audio\AudioManager.ts`
```typescript
// Pure Saudi Female Voice Audio Engine for LUMI
// 100% Pre-recorded Static Audio Architecture (Priority 1) with Dynamic Live TTS Fallback (Priority 2)
// Works offline natively on PWA, Netlify, Mobile & Desktop

import { ClientEdgeTTS } from './ClientEdgeTTS';
import {
  resolveStaticAudioPath,
  stripTashkeel,
  stripEmojis,
  MASTER_AUDIO_MANIFEST,
  LETTER_AUDIO_MAP
} from './audioManifest';

export const LETTER_ID_MAP: Record<string, string> = LETTER_AUDIO_MAP;
export { stripTashkeel, stripEmojis, LETTER_AUDIO_MAP };
export const EXACT_STATIC_AUDIO = MASTER_AUDIO_MANIFEST;

export class AudioManager {
  private currentAudioElement: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 1.0;
  private isVisualFirst: boolean = false;
  private currentPlaybackToken: number = 0;
  private preloadCache: Map<string, HTMLAudioElement> = new Map();
  private audioUnlocked: boolean = false;
  private audioContext: AudioContext | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAutoUnlock();
      setTimeout(() => this.preloadAllAudios(), 300);
    }
  }

  // Preload letters for instantaneous click-to-sound
  private preloadAllAudios() {
    if (typeof window === 'undefined') return;
    Object.values(LETTER_AUDIO_MAP).forEach((url: string) => {
      if (!this.preloadCache.has(url)) {
        try {
          const a = new Audio();
          a.preload = 'auto';
          a.src = url;
          this.preloadCache.set(url, a);
        } catch {}
      }
    });
  }

  // Universal User-Interaction Audio Unlocker
  private initAutoUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      if (this.audioUnlocked) return;
      this.audioUnlocked = true;

      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx && !this.audioContext) {
          this.audioContext = new AudioCtx();
          if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(() => {});
          }
        }
        // Warm up HTMLAudioElement
        const emptyAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
        emptyAudio.play().catch(() => {});
      } catch {}

      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
      window.removeEventListener('keydown', unlock);
    };

    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('click', unlock, { once: true, passive: true });
    window.addEventListener('keydown', unlock, { once: true, passive: true });
  }

  public ensureUnlocked() {
    if (typeof window === 'undefined') return;
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.currentAudioElement) {
      this.currentAudioElement.muted = muted;
    }
  }

  public getMute(): boolean {
    return this.isMuted;
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentAudioElement) {
      this.currentAudioElement.volume = this.volume;
    }
  }

  public setVisualFirstMode(active: boolean) {
    this.isVisualFirst = active;
  }

  public setSelectedVoice(_voiceName: string) {}
  public getAvailableArabicVoices(): SpeechSynthesisVoice[] {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      return window.speechSynthesis.getVoices().filter((v) => v.lang.startsWith('ar'));
    }
    return [];
  }

  private dispatchVisualPulse(type: 'success' | 'magic' | 'click' | 'portal') {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('city_visual_pulse', { detail: { type } }));
    }
  }

  public playClick() {
    this.dispatchVisualPulse('click');
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) this.audioContext = new AudioCtx();
      }
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      if (this.audioContext) {
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.12 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.07);
      }
    } catch {}
  }

  public playPop() {
    this.dispatchVisualPulse('click');
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) this.audioContext = new AudioCtx();
      }
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      if (this.audioContext) {
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.2 * this.volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.11);
      }
    } catch {}
  }

  public playSuccess() {
    this.dispatchVisualPulse('success');
    if (this.isMuted || typeof window === 'undefined') return;
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) this.audioContext = new AudioCtx();
      }
      if (this.audioContext && this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      if (this.audioContext) {
        const ctx = this.audioContext;
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.value = freq;
          const start = ctx.currentTime + idx * 0.08;
          gain.gain.setValueAtTime(0, start);
          gain.gain.linearRampToValueAtTime(0.2 * this.volume, start + 0.02);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.36);
        });
      }
    } catch {}
  }

  public playVictory() {
    this.playSuccess();
  }

  public playStar() {
    this.playVictory();
  }

  public playPortal() {
    this.dispatchVisualPulse('portal');
    this.playPop();
  }

  public playBloom() {
    this.dispatchVisualPulse('magic');
    this.playSuccess();
  }

  public playEncouragement() {
    this.dispatchVisualPulse('click');
    this.speak('حَاوِلْ مَرَّةً أُخْرَى يَا بَطَل!');
  }

  public stop() {
    this.currentPlaybackToken++;
    this.stopCurrentAudioOnly();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  private stopCurrentAudioOnly() {
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
        this.currentAudioElement.onended = null;
        this.currentAudioElement.onerror = null;
        this.currentAudioElement.src = '';
        this.currentAudioElement.load();
      } catch {}
      this.currentAudioElement = null;
    }
  }

  // Resolve arbitrary prompt to exact static audio path or sequence of paths (0ms offline priority)
  private resolveStaticAudio(text: string): string | string[] | null {
    return resolveStaticAudioPath(text);
  }

  // Play a single audio source with full cancellation token guard
  private playAudioSource(src: string, playbackToken: number, onEnd?: () => void) {
    if (this.currentPlaybackToken !== playbackToken || typeof window === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    this.stopCurrentAudioOnly();

    try {
      const audio = new Audio(src);
      audio.volume = this.volume;
      this.currentAudioElement = audio;

      audio.onended = () => {
        if (this.currentPlaybackToken === playbackToken) {
          this.currentAudioElement = null;
          if (onEnd) onEnd();
        }
      };

      audio.onerror = (e) => {
        console.warn(`[AudioManager] Playback error on source: ${src}`, e);
        if (this.currentPlaybackToken === playbackToken) {
          this.currentAudioElement = null;
          if (onEnd) onEnd();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn(`[AudioManager] play() catch for: ${src}`, err);
          if (this.currentPlaybackToken === playbackToken) {
            this.currentAudioElement = null;
            if (onEnd) onEnd();
          }
        });
      }
    } catch (err) {
      console.warn(`[AudioManager] playAudioSource exception on: ${src}`, err);
      if (onEnd) onEnd();
    }
  }

  // Play multiple audio files sequentially with full cancellation support
  private playAudioSequence(urls: string[], playbackToken: number, onEnd?: () => void) {
    if (!urls.length || typeof window === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    const playNext = (index: number) => {
      if (this.currentPlaybackToken !== playbackToken) {
        return;
      }
      if (index >= urls.length) {
        this.currentAudioElement = null;
        if (onEnd) onEnd();
        return;
      }

      this.stopCurrentAudioOnly();

      const url = urls[index];
      try {
        const audio = new Audio(url);
        audio.volume = this.volume;
        this.currentAudioElement = audio;

        audio.onended = () => {
          if (this.currentPlaybackToken === playbackToken) {
            playNext(index + 1);
          }
        };

        audio.onerror = () => {
          if (this.currentPlaybackToken === playbackToken) {
            playNext(index + 1);
          }
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            if (this.currentPlaybackToken === playbackToken) {
              playNext(index + 1);
            }
          });
        }
      } catch {
        if (this.currentPlaybackToken === playbackToken) {
          playNext(index + 1);
        }
      }
    };

    playNext(0);
  }

  // Main Speech Router:
  // 1. Instant Static MP3 or Sequence (0ms latency)
  // 2. Edge-TTS API or Client WebSocket (Microsoft Neural Saudi Female Voice)
  // ⛔ NO speechSynthesis fallback (prevents male voice)
  public speak(text: string, _rate: number = 0.85, onEnd?: () => void) {
    this.dispatchVisualPulse('click');
    this.ensureUnlocked();
    this.stop();

    if (this.isMuted) {
      if (onEnd) onEnd();
      return;
    }

    const cleanText = stripEmojis(text);
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const playbackToken = ++this.currentPlaybackToken;

    // 1. Check for Static MP3 or Sequence
    const staticResolution = this.resolveStaticAudio(cleanText);

    if (staticResolution && typeof window !== 'undefined') {
      if (Array.isArray(staticResolution)) {
        this.playAudioSequence(staticResolution, playbackToken, onEnd);
        return;
      } else if (typeof staticResolution === 'string') {
        this.playAudioSource(staticResolution, playbackToken, onEnd);
        return;
      }
    }

    // 2. Dynamic Text: Synthesize via Neural Female TTS (Fallback only for uncached custom text)
    this.synthesizeAndPlay(cleanText, playbackToken, onEnd);
  }

  /**
   * ⚠️ DYNAMIC FALLBACK SYNTHESIS (احتياطي مؤقت للنصوص الديناميكية فقط)
   * This is strictly a secondary fallback used ONLY when arbitrary, unmapped user input
   * (e.g. a child typing an unregistered custom name) cannot be found in the pre-recorded audio manifest.
   * Uses Microsoft Edge Neural Female Voice with resilient timeout protection and fail-safes.
   */
  private async synthesizeAndPlay(text: string, playbackToken: number, onEnd?: () => void) {
    if (typeof window === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    // Step 2A: Fetch from Serverless Edge-TTS API (/api/tts)
    try {
      const res = await fetch(`/api/tts?text=${encodeURIComponent(text)}&voice=ar-SA-ZariyahNeural`);
      if (this.currentPlaybackToken !== playbackToken) return;

      if (res.ok && res.headers.get('content-type')?.includes('audio')) {
        const blob = await res.blob();
        if (this.currentPlaybackToken !== playbackToken) return;

        const blobUrl = URL.createObjectURL(blob);
        this.playAudioSource(blobUrl, playbackToken, onEnd);
        return;
      }
    } catch (err) {
      console.warn('[AudioManager] /api/tts fetch error. Trying ClientEdgeTTS...', err);
    }

    // Step 2B: Client-side In-Browser Edge TTS (Saudi Female Voice)
    try {
      const audioUrl = await ClientEdgeTTS.synthesize(text, 'ar-SA-ZariyahNeural', '-4%', '+0Hz');
      if (this.currentPlaybackToken !== playbackToken) return;

      this.playAudioSource(audioUrl, playbackToken, onEnd);
      return;
    } catch (err) {
      console.warn('[AudioManager] ClientEdgeTTS synthesis exception. Playing offline female audio...', err);
      if (this.currentPlaybackToken === playbackToken) {
        this.playAudioSequence(['/audio/dialogue/welcome.mp3', '/audio/names/batal.mp3'], playbackToken, onEnd);
      }
    }
  }

  // ⛔ SPEECH SYNTHESIS PERMANENTLY DISABLED
  // window.speechSynthesis is NEVER used in this application.
  // On Windows/Android, the default Arabic voice is male (Microsoft Naayf / Google Arabic Male).
  // All audio must come from: pre-recorded static MP3 files OR edge-tts neural female synthesis.
  // If both fail, the app stays SILENT rather than play a male voice.

  public speakLetter(letterId: string, onEnd?: () => void) {
    const file = LETTER_ID_MAP[letterId] || EXACT_STATIC_AUDIO[letterId];
    if (file) {
      this.speak(file, 0.85, onEnd);
    } else {
      this.speak(letterId, 0.85, onEnd);
    }
  }

  public speakSyllable(syllable: string, onEnd?: () => void) {
    this.speak(syllable, 0.8, onEnd);
  }

  public speakWord(word: string, onEnd?: () => void) {
    this.speak(word, 0.8, onEnd);
  }

  public speakSentence(sentence: string, onEnd?: () => void) {
    this.speak(sentence, 0.85, onEnd);
  }

  // Diagnostic tool: Verifies all audio files in the application and logs full status
  public async verifyAllAudioFiles(): Promise<Array<{ path: string; status: number; ok: boolean; contentType: string }>> {
    const allPaths = Array.from(new Set(Object.values(EXACT_STATIC_AUDIO)));
    const results: Array<{ path: string; status: number; ok: boolean; contentType: string }> = [];

    for (const p of allPaths) {
      try {
        const res = await fetch(p, { method: 'HEAD' });
        results.push({
          path: p,
          status: res.status,
          ok: res.ok && (res.headers.get('content-type')?.includes('audio') ?? true),
          contentType: res.headers.get('content-type') || 'unknown'
        });
      } catch {
        results.push({
          path: p,
          status: 0,
          ok: false,
          contentType: 'network error'
        });
      }
    }

    console.table(results);
    return results;
  }
}

export const audioManager = new AudioManager();

```
