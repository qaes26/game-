const { MsEdgeTTS, OUTPUT_FORMAT } = require('msedge-tts');

const cache = new Map();
const MAX_CACHE_SIZE = 300;

exports.handler = async function (event) {
  try {
    const text = event.queryStringParameters?.text;
    if (!text || !text.trim()) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing text parameter' })
      };
    }

    const cleanText = text.trim();

    // Check in-memory cache
    if (cache.has(cleanText)) {
      const base64Data = cache.get(cleanText);
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
          'Cache-Control': 'public, max-age=31536000, immutable'
        },
        body: base64Data,
        isBase64Encoded: true
      };
    }

    // Initialize Microsoft Edge TTS with Saudi Female Voice
    const tts = new MsEdgeTTS();
    await tts.setMetadata('ar-SA-ZariyahNeural', OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3);

    const audioStream = tts.toStream(cleanText, {
      pitch: '+0Hz',
      rate: '-6%'
    });

    const buffer = await new Promise((resolve, reject) => {
      const chunks = [];
      audioStream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
      audioStream.on('end', () => resolve(Buffer.concat(chunks)));
      audioStream.on('error', (err) => reject(err));
    });

    const base64Audio = buffer.toString('base64');

    if (cache.size >= MAX_CACHE_SIZE) {
      const oldest = cache.keys().next().value;
      if (oldest) cache.delete(oldest);
    }
    cache.set(cleanText, base64Audio);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=31536000, immutable'
      },
      body: base64Audio,
      isBase64Encoded: true
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message || 'TTS Error' })
    };
  }
};
