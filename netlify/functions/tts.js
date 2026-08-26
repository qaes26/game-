// Microsoft Azure Speech TTS Serverless Function for LUMI
// Ultra-Low Latency Arabic Female Voice (ar-SA-ZariyahNeural / ar-EG-SalmaNeural)

const https = require('https');
const crypto = require('crypto');

// In-Memory Hash Cache for Instant Repeat Playback (0ms)
const audioCache = new Map();
const MAX_CACHE_ENTRIES = 500;

function escapeXml(unsafe) {
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

function buildSSML(text, voice = 'ar-SA-ZariyahNeural') {
  return `<speak version="1.0" xmlns="http://www.w3.org/2001/10/synthesis" xml:lang="ar-SA">
  <voice name="${voice}">
    <prosody rate="0.95" pitch="+6%">
      ${escapeXml(text)}
    </prosody>
  </voice>
</speak>`;
}

// Direct Azure Cognitive Services REST API Stream
function callAzureSpeechRest(text, voice, key, region) {
  return new Promise((resolve, reject) => {
    const ssml = buildSSML(text, voice);
    const postData = Buffer.from(ssml, 'utf8');

    const options = {
      hostname: `${region}.tts.speech.microsoft.com`,
      port: 443,
      path: '/cognitiveservices/v1',
      method: 'POST',
      headers: {
        'Ocp-Apim-Subscription-Key': key,
        'Content-Type': 'application/ssml+xml',
        'X-Microsoft-OutputFormat': 'audio-24khz-48kbitrate-mono-mp3',
        'User-Agent': 'LumiChildApp',
        'Content-Length': postData.length
      },
      timeout: 6000
    };

    const req = https.request(options, (res) => {
      if (res.statusCode !== 200) {
        let errBody = '';
        res.on('data', (d) => { errBody += d; });
        res.on('end', () => {
          reject(new Error(`Azure TTS returned HTTP ${res.statusCode}: ${errBody}`));
        });
        return;
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        resolve(Buffer.concat(chunks));
      });
    });

    req.on('error', (err) => reject(err));
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Azure Speech API Timeout'));
    });

    req.write(postData);
    req.end();
  });
}

// Fallback: Google Translate Arabic Female Neural Stream (Zero API Key needed)
function callGoogleTTSFallback(text) {
  return new Promise((resolve, reject) => {
    const clean = encodeURIComponent(text);
    const url = `https://translate.google.com/translate_tts?ie=UTF-8&tl=ar&client=tw-ob&q=${clean}`;

    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Google TTS status ${res.statusCode}`));
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
    const text = event.queryStringParameters?.text;
    const requestedVoice = event.queryStringParameters?.voice || 'ar-SA-ZariyahNeural';

    if (!text || !text.trim()) {
      return {
        statusCode: 400,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing text parameter' })
      };
    }

    const cleanText = text.trim();
    const hash = crypto.createHash('md5').update(`${requestedVoice}:${cleanText}`).digest('hex');

    // 1. Check in-memory Cache (Instant Response)
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

    const azureKey = process.env.AZURE_SPEECH_KEY || process.env.VITE_AZURE_SPEECH_KEY;
    const azureRegion = process.env.AZURE_SPEECH_REGION || process.env.VITE_AZURE_SPEECH_REGION || 'eastus';

    let audioBuffer = null;

    // 2. Try Primary Azure Speech REST API (if key is configured)
    if (azureKey) {
      try {
        audioBuffer = await callAzureSpeechRest(cleanText, requestedVoice, azureKey, azureRegion);
      } catch (azureErr) {
        console.warn('[Azure TTS Primary Error]:', azureErr.message);
        // Try Secondary Voice Fallback (ar-EG-SalmaNeural)
        try {
          audioBuffer = await callAzureSpeechRest(cleanText, 'ar-EG-SalmaNeural', azureKey, azureRegion);
        } catch (secondaryErr) {
          console.warn('[Azure TTS Secondary Error]:', secondaryErr.message);
        }
      }
    }

    // 3. Ultra-reliable High-Speed Fallback (Female Arabic Voice)
    if (!audioBuffer) {
      try {
        audioBuffer = await callGoogleTTSFallback(cleanText);
      } catch (fallbackErr) {
        console.error('[TTS Fallback Error]:', fallbackErr);
      }
    }

    if (!audioBuffer || audioBuffer.length === 0) {
      return {
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Failed to synthesize audio' })
      };
    }

    const base64Data = audioBuffer.toString('base64');

    // Cache result
    if (audioCache.size >= MAX_CACHE_ENTRIES) {
      const oldestKey = audioCache.keys().next().value;
      if (oldestKey) audioCache.delete(oldestKey);
    }
    audioCache.set(hash, base64Data);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
        'X-Cache': 'MISS'
      },
      body: base64Data,
      isBase64Encoded: true
    };
  } catch (err) {
    console.error('[TTS Handler Exception]:', err);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'TTS Synthesis Failed' })
    };
  }
};
