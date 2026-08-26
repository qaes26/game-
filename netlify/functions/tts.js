// Pure Edge-TTS Serverless TTS Handler for LUMI
// Strictly Arabic Female Voices Only: ar-SA-ZariyahNeural (Primary) / ar-EG-SalmaNeural (Fallback)
// Persona Tuning: Pitch +6%, Rate -5%

const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');
const https = require('https');
const crypto = require('crypto');

// In-Memory Hash Cache
const audioCache = new Map();
const MAX_CACHE_ENTRIES = 500;

async function synthesizeWithEdgeTTS(text, voice = 'ar-SA-ZariyahNeural') {
  const tts = new MsEdgeTTS();
  await tts.setMetadata(voice, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

  const { audioStream } = tts.toStream(text, {
    pitch: '+6%',
    rate: '-5%'
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

exports.handler = async function (event) {
  try {
    const rawText = event.queryStringParameters?.text;
    if (!rawText || !rawText.trim()) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing text parameter' })
      };
    }

    const cleanText = decodeURIComponent(rawText).trim();
    const requestedVoice = event.queryStringParameters?.voice || 'ar-SA-ZariyahNeural';

    // Strictly enforce Arabic female voices only
    const allowedVoices = ['ar-SA-ZariyahNeural', 'ar-EG-SalmaNeural'];
    const activeVoice = allowedVoices.includes(requestedVoice) ? requestedVoice : 'ar-SA-ZariyahNeural';

    const hash = crypto.createHash('md5').update(`${activeVoice}:${cleanText}`).digest('hex');

    // 1. In-Memory Cache Hit (0ms)
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

    // 2. Primary Synthesis: ar-SA-ZariyahNeural (Saudi Female)
    try {
      audioBuffer = await synthesizeWithEdgeTTS(cleanText, activeVoice);
    } catch (primaryErr) {
      console.warn(`[EdgeTTS] Primary voice (${activeVoice}) failed:`, primaryErr.message);
      // Secondary Fallback: ar-EG-SalmaNeural (Egyptian Female)
      try {
        audioBuffer = await synthesizeWithEdgeTTS(cleanText, 'ar-EG-SalmaNeural');
      } catch (secondaryErr) {
        console.warn('[EdgeTTS] Secondary voice (ar-EG-SalmaNeural) failed:', secondaryErr.message);
      }
    }

    // 3. High-Speed Fallback: Google Arabic Female Stream
    if (!audioBuffer || audioBuffer.length === 0) {
      try {
        audioBuffer = await synthesizeWithGoogleFemaleFallback(cleanText);
      } catch (fallbackErr) {
        console.error('[EdgeTTS] Fallback synthesis failed:', fallbackErr);
      }
    }

    if (!audioBuffer || audioBuffer.length === 0) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
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
    console.error('[EdgeTTS Handler Exception]:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'TTS Synthesis Error' })
    };
  }
};
