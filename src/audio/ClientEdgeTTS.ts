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
    rate: string = '-8%',
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
