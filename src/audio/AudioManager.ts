// Pure Saudi Female Voice Audio Engine for LUMI (ar-SA-ZariyahNeural)
// 100% Client-Side In-Browser Architecture with Zero Server Dependency
// Works natively on Netlify, Vercel, GitHub Pages, Mobile & Desktop

import { ClientEdgeTTS } from './ClientEdgeTTS';

export const LETTER_ID_MAP: Record<string, string> = {
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

export const EXACT_STATIC_AUDIO: Record<string, string> = {
  // Letters
  'أَلِف': '/audio/letters/alif.mp3',
  'بَاء': '/audio/letters/baa.mp3',
  'تَاء': '/audio/letters/taa.mp3',
  'ثَاء': '/audio/letters/thaa.mp3',
  'جِيم': '/audio/letters/jeem.mp3',
  'حَاء': '/audio/letters/haa.mp3',
  'خَاء': '/audio/letters/khaa.mp3',
  'دَال': '/audio/letters/daal.mp3',
  'ذَال': '/audio/letters/zaal.mp3',
  'رَاء': '/audio/letters/raa.mp3',
  'زَاي': '/audio/letters/zay.mp3',
  'سِين': '/audio/letters/seen.mp3',
  'شِين': '/audio/letters/sheen.mp3',
  'صَاد': '/audio/letters/saad.mp3',
  'ضَاد': '/audio/letters/daad.mp3',
  'طَاء': '/audio/letters/taa_heavy.mp3',
  'ظَاء': '/audio/letters/zaa_heavy.mp3',
  'عَيْن': '/audio/letters/ayn.mp3',
  'غَيْن': '/audio/letters/ghayn.mp3',
  'فَاء': '/audio/letters/faa.mp3',
  'قَاف': '/audio/letters/qaaf.mp3',
  'كَاف': '/audio/letters/kaaf.mp3',
  'لاَم': '/audio/letters/laam.mp3',
  'مِيم': '/audio/letters/meem.mp3',
  'نُون': '/audio/letters/noon.mp3',
  'هَاء': '/audio/letters/haa_soft.mp3',
  'وَاو': '/audio/letters/waaw.mp3',
  'يَاء': '/audio/letters/yaa.mp3',

  // Syllables
  'بَ': '/audio/syllables/baa_fatha.mp3',
  'بِ': '/audio/syllables/baa_kasra.mp3',
  'بُ': '/audio/syllables/baa_damma.mp3',
  'بَا': '/audio/syllables/baa_alif.mp3',
  'بِي': '/audio/syllables/baa_yaa.mp3',
  'بُو': '/audio/syllables/baa_waw.mp3',

  // Words
  'بَاب': '/audio/words/baab.mp3',
  'بَطَّة': '/audio/words/battah.mp3',
  'بَيْت': '/audio/words/bayt.mp3',
  'بَحْر': '/audio/words/bahr.mp3',
  'خُبْز': '/audio/words/hubz.mp3',
  'حَبْل': '/audio/words/habl.mp3',
  'عِنَب': '/audio/words/inab.mp3',

  // Static Dialogues (only exact matches without child name)
  'اسْتَمِعْ لِصَوْتِ الحَرْف': '/audio/stages/listen_sound.mp3',
  'مَا اسْمُكَ يَا بَطَل؟ اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/ask_name.mp3',
  'مَرْحَبًا يَا بَطَل! اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/ask_name.mp3',
  'مَرْحَبًا.. أَنَا لُومِي! هَيَّا نَسْتَكْشِفُ مَعًا عَالَمَ الأَصْوَاتِ السَّاحِر!': '/audio/dialogue/intro_step_1.mp3',
  'هَذَا العَالَمُ فَقَدَ أَصْوَاتَهُ السَّاحِرَة...': '/audio/dialogue/intro_step_2.mp3',
  'هَلْ تُسَاعِدُنِي فِي إِعَادَتِهَا مَعًا؟': '/audio/dialogue/intro_step_3.mp3'
};

class AudioManager {
  private currentAudioElement: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 1.0;
  private isVisualFirst: boolean = false;
  private currentPlaybackToken: number = 0;
  private preloadCache: Map<string, HTMLAudioElement> = new Map();
  private audioUnlocked: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
      }

      this.initAutoUnlock();
      setTimeout(() => this.preloadAllAudios(), 400);
    }
  }

  private preloadAllAudios() {
    if (typeof window === 'undefined') return;
    Object.values(LETTER_ID_MAP).forEach((url) => {
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

  private initAutoUnlock() {
    if (typeof window === 'undefined') return;

    const unlock = () => {
      if (this.audioUnlocked) return;
      this.audioUnlocked = true;

      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          ctx.resume();
        }
        // Trick browser into unlocking HTML audio element
        const emptyAudio = new Audio('data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA');
        emptyAudio.play().catch(() => {});
      } catch {}

      window.removeEventListener('pointerdown', unlock);
      window.removeEventListener('touchstart', unlock);
      window.removeEventListener('click', unlock);
    };

    window.addEventListener('pointerdown', unlock, { once: true, passive: true });
    window.addEventListener('touchstart', unlock, { once: true, passive: true });
    window.addEventListener('click', unlock, { once: true, passive: true });
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
    return [];
  }

  private dispatchVisualPulse(type: 'success' | 'magic' | 'click' | 'portal') {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('city_visual_pulse', { detail: { type } }));
    }
  }

  public playClick() {
    this.dispatchVisualPulse('click');
  }

  public playVictory() {
    this.dispatchVisualPulse('success');
  }

  public playStar() {
    this.playVictory();
  }

  public playPortal() {
    this.dispatchVisualPulse('portal');
  }

  public playBloom() {
    this.dispatchVisualPulse('magic');
  }

  public stop() {
    this.currentPlaybackToken++;
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.currentTime = 0;
      } catch {}
      this.currentAudioElement = null;
    }
  }

  // Play Pure Saudi Female Voice:
  // 1. Direct Static local MP3 for exact letter / word click (0ms delay)
  // 2. Direct In-Browser ClientEdgeTTS for custom child name and dynamic sentences (Zero Server dependency)
  public speak(text: string, _rate: number = 0.85, onEnd?: () => void) {
    this.dispatchVisualPulse('click');
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

    const playbackToken = ++this.currentPlaybackToken;

    // 1. Direct static MP3 check (for isolated letter or single word)
    const isUrl = cleanText.startsWith('/') || cleanText.startsWith('http');
    const staticUrl = isUrl ? cleanText : EXACT_STATIC_AUDIO[cleanText];

    if (staticUrl && typeof window !== 'undefined') {
      try {
        const audio = new Audio(staticUrl);
        audio.volume = this.volume;
        this.currentAudioElement = audio;

        audio.onended = () => {
          if (this.currentPlaybackToken === playbackToken && onEnd) {
            onEnd();
          }
        };

        audio.onerror = () => {
          if (this.currentPlaybackToken === playbackToken) {
            this.synthesizeAndPlay(cleanText, playbackToken, onEnd);
          }
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            if (this.currentPlaybackToken === playbackToken) {
              this.synthesizeAndPlay(cleanText, playbackToken, onEnd);
            }
          });
        }
        return;
      } catch {
        this.synthesizeAndPlay(cleanText, playbackToken, onEnd);
        return;
      }
    }

    // 2. In-Browser Neural Female Speech Synthesis (Speaks child's real name out loud!)
    this.synthesizeAndPlay(cleanText, playbackToken, onEnd);
  }

  private async synthesizeAndPlay(text: string, playbackToken: number, onEnd?: () => void) {
    if (typeof window === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    try {
      // Synthesize directly in user's browser using Microsoft Neural Saudi Female Voice
      const audioUrl = await ClientEdgeTTS.synthesize(text, 'ar-SA-ZariyahNeural', '-8%', '+0Hz');

      if (this.currentPlaybackToken !== playbackToken) return;

      const audio = new Audio(audioUrl);
      audio.volume = this.volume;
      this.currentAudioElement = audio;

      audio.onended = () => {
        if (this.currentPlaybackToken === playbackToken && onEnd) {
          onEnd();
        }
      };

      audio.onerror = () => {
        if (this.currentPlaybackToken === playbackToken && onEnd) {
          onEnd();
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (this.currentPlaybackToken === playbackToken && onEnd) {
            onEnd();
          }
        });
      }
    } catch (err) {
      console.error('[AudioManager] Synthesis error:', err);
      if (this.currentPlaybackToken === playbackToken && onEnd) {
        onEnd();
      }
    }
  }

  public speakLetter(letterId: string, onEnd?: () => void) {
    const file = LETTER_ID_MAP[letterId];
    if (file) {
      this.speak(file, 0.85, onEnd);
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
}

export const audioManager = new AudioManager();
