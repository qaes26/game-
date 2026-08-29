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
