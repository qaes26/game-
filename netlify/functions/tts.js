// Netlify Serverless Function for LUMI Neural Text-to-Speech
// ES Module format compatible with package.json "type": "module"
// Voice: ar-SA-ZariyahNeural (Primary Pure Saudi Female Voice) / ar-JO-SanaNeural / ar-EG-SalmaNeural

import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts';
import https from 'https';
import crypto from 'crypto';

// In-Memory Buffer Cache across warm Lambda invocations
const audioCache = new Map();
const MAX_CACHE_ENTRIES = 500;

async function synthesizeWithEdgeTTS(text, voice = 'ar-SA-ZariyahNeural') {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const { audioStream } = tts.toStream(text, {
    pitch: '+0Hz',
    rate: '-4%'
  });

  return new Promise((resolve, reject) => {
    const chunks = [];
    audioStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    audioStream.on('end', () => resolve(Buffer.concat(chunks)));
    audioStream.on('error', (err) => reject(err));
  });
}

function synthesizeWithGoogleFemaleFallback(text) {
  return new Promise((resolve, reject) => {
    const clean = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${clean}`;

    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Fallback status ${res.statusCode}`));
        return;
      }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

export const handler = async (event) => {
  // Handle HTTP OPTIONS for CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      },
      body: ''
    };
  }

  try {
    const rawText = event.queryStringParameters?.text;
    if (!rawText || !rawText.trim()) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Missing text parameter' })
      };
    }

    const cleanText = decodeURIComponent(rawText).trim();
    const requestedVoice = event.queryStringParameters?.voice || 'ar-SA-ZariyahNeural';

    // Strictly enforce Arabic female voices only
    const allowedVoices = ['ar-SA-ZariyahNeural', 'ar-JO-SanaNeural', 'ar-EG-SalmaNeural'];
    const activeVoice = allowedVoices.includes(requestedVoice) ? requestedVoice : 'ar-SA-ZariyahNeural';

    const hash = crypto.createHash('md5').update(`${activeVoice}:${cleanText}`).digest('hex');

    // 1. In-Memory Warm Cache Hit (0ms)
    if (audioCache.has(hash)) {
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Access-Control-Allow-Origin': '*',
          'X-Cache': 'HIT'
        },
        body: audioCache.get(hash),
        isBase64Encoded: true
      };
    }

    let audioBuffer = null;

    // 2. Primary Neural Female Voice Synthesis (ar-SA-ZariyahNeural)
    try {
      audioBuffer = await synthesizeWithEdgeTTS(cleanText, activeVoice);
    } catch (primaryErr) {
      console.warn(`[EdgeTTS] Primary voice (${activeVoice}) error:`, primaryErr?.message || primaryErr);
      
      // Secondary Fallback: ar-JO-SanaNeural (Levant Female)
      try {
        audioBuffer = await synthesizeWithEdgeTTS(cleanText, 'ar-JO-SanaNeural');
      } catch (secondaryErr) {
        console.warn('[EdgeTTS] Secondary voice (ar-JO-SanaNeural) error:', secondaryErr?.message || secondaryErr);
        
        // Tertiary Fallback: ar-EG-SalmaNeural (Egyptian Female)
        try {
          audioBuffer = await synthesizeWithEdgeTTS(cleanText, 'ar-EG-SalmaNeural');
        } catch (tertiaryErr) {
          console.warn('[EdgeTTS] Tertiary voice (ar-EG-SalmaNeural) error:', tertiaryErr?.message || tertiaryErr);
        }
      }
    }

    // 3. Fallback: Google Arabic Female Stream
    if (!audioBuffer || audioBuffer.length === 0) {
      try {
        audioBuffer = await synthesizeWithGoogleFemaleFallback(cleanText);
      } catch (fallbackErr) {
        console.error('[EdgeTTS] All fallback synthesis failed:', fallbackErr);
      }
    }

    if (!audioBuffer || audioBuffer.length === 0) {
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ error: 'Failed to synthesize female audio' })
      };
    }

    const base64Audio = audioBuffer.toString('base64');

    if (audioCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = audioCache.keys().next().value;
      if (oldestKey) audioCache.delete(oldestKey);
    }
    audioCache.set(hash, base64Audio);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS'
      },
      body: base64Audio,
      isBase64Encoded: true
    };
  } catch (err) {
    console.error('[EdgeTTS Lambda Exception]:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ error: err?.message || 'TTS Synthesis Error' })
    };
  }
};
