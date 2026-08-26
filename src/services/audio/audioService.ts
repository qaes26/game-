// Ultra-Low Latency Frontend Audio Service for LUMI
// Supports Microsoft Azure Speech TTS (ar-SA-ZariyahNeural) with Pre-buffering & Memory Cache (<10ms)

import { EXACT_STATIC_AUDIO, LETTER_ID_MAP, stripTashkeel } from '../../audio/AudioManager';

interface AudioServiceOptions {
  voice?: string;
  volume?: number;
  rate?: number;
}

class AudioService {
  private blobCache: Map<string, string> = new Map();
  private audioPool: HTMLAudioElement[] = [];
  private poolIndex: number = 0;
  private currentAudio: HTMLAudioElement | null = null;
  private isUnlocked: boolean = false;
  private audioContext: AudioContext | null = null;
  private isMuted: boolean = false;
  private volume: number = 1.0;
  private playbackToken: number = 0;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initPool();
      this.initAutoplayUnlock();
    }
  }

  // Pre-instantiate pool of HTMLAudioElements to eliminate creation latency
  private initPool(poolSize: number = 4) {
    for (let i = 0; i < poolSize; i++) {
      const audio = new Audio();
      audio.preload = 'auto';
      this.audioPool.push(audio);
    }
  }

  private getPooledAudio(): HTMLAudioElement {
    if (this.audioPool.length === 0) {
      return new Audio();
    }
    const audio = this.audioPool[this.poolIndex % this.audioPool.length];
    this.poolIndex++;
    return audio;
  }

  // Seamless browser autoplay unlock
  private initAutoplayUnlock() {
    const unlock = () => {
      if (this.isUnlocked) return;
      this.isUnlocked = true;

      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx && !this.audioContext) {
          this.audioContext = new AudioCtx();
          if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(() => {});
          }
        }
        // Silent warm-up
        const silent = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
        silent.play().catch(() => {});
      } catch {}

      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
    };

    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('click', unlock, { once: true, passive: true });
  }

  public ensureUnlocked() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume().catch(() => {});
    }
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
    if (this.currentAudio) {
      this.currentAudio.muted = muted;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.currentAudio) {
      this.currentAudio.volume = this.volume;
    }
  }

  public stop() {
    this.playbackToken++;
    if (this.currentAudio) {
      try {
        this.currentAudio.pause();
        this.currentAudio.currentTime = 0;
      } catch {}
      this.currentAudio = null;
    }
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  // Pre-buffer and cache an audio URL or text
  public async prefetch(text: string, voice: string = 'ar-SA-ZariyahNeural'): Promise<void> {
    const clean = text.trim();
    if (!clean) return;

    if (this.blobCache.has(clean) || EXACT_STATIC_AUDIO[clean]) {
      return;
    }

    try {
      const url = `/api/tts?text=${encodeURIComponent(clean)}&voice=${voice}`;
      const res = await fetch(url);
      if (res.ok && res.headers.get('content-type')?.includes('audio')) {
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        this.blobCache.set(clean, blobUrl);
      }
    } catch {}
  }

  // Resolve static MP3 path for letters, words, sentences, stages
  private resolveStaticPath(text: string): string | null {
    const clean = text.trim();
    if (clean.startsWith('/') || clean.startsWith('http')) return clean;
    if (EXACT_STATIC_AUDIO[clean]) return EXACT_STATIC_AUDIO[clean];

    const stripped = stripTashkeel(clean);
    if (EXACT_STATIC_AUDIO[stripped]) return EXACT_STATIC_AUDIO[stripped];

    const match = stripped.match(/(?:حرف|صوت)\s+([^\s.]+)/i);
    if (match && match[1]) {
      const candidate = match[1].replace(/^(ال|ل)/, '');
      if (EXACT_STATIC_AUDIO[candidate]) return EXACT_STATIC_AUDIO[candidate];
      if (EXACT_STATIC_AUDIO['ال' + candidate]) return EXACT_STATIC_AUDIO['ال' + candidate];
    }

    return null;
  }

  /**
   * Play any Arabic text or letter with Ultra-Low Latency Female Voice
   */
  public async speak(
    text: string,
    options: AudioServiceOptions = {},
    onEnd?: () => void
  ): Promise<void> {
    this.ensureUnlocked();
    this.stop();

    if (this.isMuted) {
      if (onEnd) onEnd();
      return;
    }

    const cleanText = text.trim();
    if (!cleanText) {
      if (onEnd) onEnd();
      return;
    }

    const currentToken = ++this.playbackToken;
    const voice = options.voice || 'ar-SA-ZariyahNeural';

    // 1. Tier 1: Instant Static Local MP3 (<1ms)
    const staticUrl = this.resolveStaticPath(cleanText);
    if (staticUrl) {
      this.playAudioSource(staticUrl, currentToken, onEnd);
      return;
    }

    // 2. Tier 2: Check Client Blob Cache (<5ms)
    if (this.blobCache.has(cleanText)) {
      const cachedUrl = this.blobCache.get(cleanText)!;
      this.playAudioSource(cachedUrl, currentToken, onEnd);
      return;
    }

    // 3. Tier 3: Fetch from Azure Serverless TTS API
    try {
      const startTime = performance.now();
      const apiUrl = `/api/tts?text=${encodeURIComponent(cleanText)}&voice=${voice}`;
      const res = await fetch(apiUrl);

      if (this.playbackToken !== currentToken) return;

      if (res.ok && res.headers.get('content-type')?.includes('audio')) {
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);
        this.blobCache.set(cleanText, blobUrl);

        const latencyMs = (performance.now() - startTime).toFixed(1);
        console.debug(`[AudioService] TTS Synthesized in ${latencyMs}ms for: "${cleanText}"`);

        this.playAudioSource(blobUrl, currentToken, onEnd);
        return;
      }
    } catch (apiErr) {
      console.warn('[AudioService] Azure TTS API fetch failed, falling back...', apiErr);
    }

    // ⛔ speechSynthesis DISABLED - would play male voice on Windows/Android
    // Silent fail instead of male voice
    if (this.playbackToken === currentToken && onEnd) {
      onEnd();
    }
  }

  private playAudioSource(src: string, token: number, onEnd?: () => void) {
    try {
      const audio = this.getPooledAudio();
      audio.src = src;
      audio.volume = this.volume;
      this.currentAudio = audio;

      audio.onended = () => {
        if (this.playbackToken === token && onEnd) {
          onEnd();
        }
      };

      audio.onerror = (e) => {
        console.warn(`[AudioService] Playback error on source: ${src}`, e);
        if (this.playbackToken === token && onEnd) {
          onEnd();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[AudioService] Audio play() promise caught:', err);
          if (this.playbackToken === token && onEnd) {
            onEnd();
          }
        });
      }
    } catch (err) {
      console.warn('[AudioService] playAudioSource caught exception:', err);
      if (this.playbackToken === token && onEnd) {
        onEnd();
      }
    }
  }

  // ⛔ SPEECH SYNTHESIS PERMANENTLY DISABLED
  // window.speechSynthesis is NEVER used - on Windows/Android it defaults to male voice.
}

export const audioService = new AudioService();
