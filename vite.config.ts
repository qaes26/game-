import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';

function edgeTtsPlugin(): Plugin {
  const cache = new Map<string, Buffer>();
  const MAX_CACHE_SIZE = 200; // Prevent unbounded memory growth
  async function synthesizeSpeech(text: string): Promise<Buffer> {
    const tts = new MsEdgeTTS();
    await tts.setMetadata('ar-SA-ZariyahNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);
    
    const { audioStream } = tts.toStream(text, {
      pitch: '+6%',
      rate: '-5%'
    });

    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];
      audioStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      audioStream.on('end', () => resolve(Buffer.concat(chunks)));
      audioStream.on('error', (err) => reject(err));
    });
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
            res.end('Missing text parameter');
            return;
          }

          const cleanText = text.trim();

          // Check memory cache first
          if (cache.has(cleanText)) {
            const cachedBuffer = cache.get(cleanText)!;
            res.setHeader('Content-Type', 'audio/mpeg');
            res.setHeader('Cache-Control', 'public, max-age=31536000');
            res.end(cachedBuffer);
            return;
          }

          const buffer = await synthesizeSpeech(cleanText);
          if (cache.size >= MAX_CACHE_SIZE) {
            const oldestKey = cache.keys().next().value;
            if (oldestKey) cache.delete(oldestKey);
          }
          cache.set(cleanText, buffer);
          res.setHeader('Content-Type', 'audio/mpeg');
          res.setHeader('Cache-Control', 'public, max-age=31536000');
          res.end(buffer);
        } catch (error: any) {
          console.error('[TTS Plugin Error]:', error?.message || error);
          res.statusCode = 500;
          res.end(error?.message || 'TTS Synthesis Error');
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
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,json}'],
        runtimeCaching: [
          {
            urlPattern: /\/audio\/.*\.(?:mp3|wav|ogg)$/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'lumi-audio-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 Days
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
                maxEntries: 250,
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
  server: {
    port: 5173,
    host: true
  }
});
