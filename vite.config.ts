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
