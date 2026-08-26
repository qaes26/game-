// 100% PURE FEMALE AUDIO ENGINE (Microsoft Neural ar-SA-ZariyahNeural)
// STRICT LAW: SpeechSynthesis (Browser male voices) IS PERMANENTLY BANNED & REMOVED.
// ALL audio plays 100% through studio pre-rendered static Female MP3 files & Neural Edge API.

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

export const NORM_LETTER_MAP: Record<string, string> = {
  'الف': '/audio/letters/alif.mp3',
  'ا': '/audio/letters/alif.mp3',
  'أ': '/audio/letters/alif.mp3',
  'إ': '/audio/letters/alif.mp3',
  'آ': '/audio/letters/alif.mp3',
  'باء': '/audio/letters/baa.mp3',
  'ب': '/audio/letters/baa.mp3',
  'تاء': '/audio/letters/taa.mp3',
  'ت': '/audio/letters/taa.mp3',
  'ثاء': '/audio/letters/thaa.mp3',
  'ث': '/audio/letters/thaa.mp3',
  'جيم': '/audio/letters/jeem.mp3',
  'ج': '/audio/letters/jeem.mp3',
  'حاء': '/audio/letters/haa.mp3',
  'ح': '/audio/letters/haa.mp3',
  'خاء': '/audio/letters/khaa.mp3',
  'خ': '/audio/letters/khaa.mp3',
  'دال': '/audio/letters/daal.mp3',
  'د': '/audio/letters/daal.mp3',
  'ذال': '/audio/letters/zaal.mp3',
  'ذ': '/audio/letters/zaal.mp3',
  'راء': '/audio/letters/raa.mp3',
  'ر': '/audio/letters/raa.mp3',
  'زاي': '/audio/letters/zay.mp3',
  'زين': '/audio/letters/zay.mp3',
  'ز': '/audio/letters/zay.mp3',
  'سين': '/audio/letters/seen.mp3',
  'س': '/audio/letters/seen.mp3',
  'شين': '/audio/letters/sheen.mp3',
  'ش': '/audio/letters/sheen.mp3',
  'صاد': '/audio/letters/saad.mp3',
  'ص': '/audio/letters/saad.mp3',
  'ضاد': '/audio/letters/daad.mp3',
  'ض': '/audio/letters/daad.mp3',
  'طاء': '/audio/letters/taa_heavy.mp3',
  'ط': '/audio/letters/taa_heavy.mp3',
  'ظاء': '/audio/letters/zaa_heavy.mp3',
  'ظ': '/audio/letters/zaa_heavy.mp3',
  'عين': '/audio/letters/ayn.mp3',
  'ع': '/audio/letters/ayn.mp3',
  'غين': '/audio/letters/ghayn.mp3',
  'غ': '/audio/letters/ghayn.mp3',
  'فاء': '/audio/letters/faa.mp3',
  'ف': '/audio/letters/faa.mp3',
  'قاف': '/audio/letters/qaaf.mp3',
  'ق': '/audio/letters/qaaf.mp3',
  'كاف': '/audio/letters/kaaf.mp3',
  'ك': '/audio/letters/kaaf.mp3',
  'لام': '/audio/letters/laam.mp3',
  'ل': '/audio/letters/laam.mp3',
  'ميم': '/audio/letters/meem.mp3',
  'م': '/audio/letters/meem.mp3',
  'نون': '/audio/letters/noon.mp3',
  'ن': '/audio/letters/noon.mp3',
  'هاء': '/audio/letters/haa_soft.mp3',
  'ه': '/audio/letters/haa_soft.mp3',
  'واو': '/audio/letters/waaw.mp3',
  'و': '/audio/letters/waaw.mp3',
  'ياء': '/audio/letters/yaa.mp3',
  'ي': '/audio/letters/yaa.mp3'
};

function normalizeArabic(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove Tashkeel
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .replace(/[.,!؟:;()"'_\-\/\\`~]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

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
      // Force kill any speech synthesis
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
      }

      this.initAutoUnlock();
      setTimeout(() => this.preloadAllAudios(), 500);
    }
  }

  // Preload studio audio in memory
  private preloadAllAudios() {
    if (typeof window === 'undefined') return;
    const staticAudios = [
      ...Object.values(LETTER_ID_MAP),
      '/audio/dialogue/ask_name.mp3',
      '/audio/dialogue/welcome_child.mp3',
      '/audio/dialogue/choose_letter.mp3',
      '/audio/dialogue/excellent.mp3',
      '/audio/dialogue/try_again.mp3',
      '/audio/dialogue/launch_journey.mp3',
      '/audio/stages/stage_1.mp3',
      '/audio/stages/stage_2.mp3',
      '/audio/stages/stage_3.mp3',
      '/audio/stages/stage_4.mp3',
      '/audio/stages/stage_5.mp3',
      '/audio/stages/stage_6.mp3',
      '/audio/stages/stage_7.mp3',
      '/audio/stages/stage_8.mp3',
      '/audio/stages/next_stage.mp3',
      '/audio/stages/listen_sound.mp3'
    ];

    staticAudios.forEach((url) => {
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

  // Autoplay Policy Unlocker on first user touch
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

  // Forcefully stop any running audio
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

  // Static Local Audio Matcher
  private resolveStaticAudioUrl(text: string): string | null {
    const raw = text.trim();
    const norm = normalizeArabic(raw);

    // 1. Direct letter exact match
    if (NORM_LETTER_MAP[norm]) {
      return NORM_LETTER_MAP[norm];
    }

    // 2. Prefix "حرف ..." or "صوت ..." (e.g. "حرف الف", "حرف الباء", "حرف ب")
    const letterPrefix = norm.match(/^(?:حرف|صوت)\s+([^\s]+)/);
    if (letterPrefix) {
      const candidate = letterPrefix[1].replace(/^ال/, '');
      if (NORM_LETTER_MAP[candidate]) {
        return NORM_LETTER_MAP[candidate];
      }
      if (NORM_LETTER_MAP[letterPrefix[1]]) {
        return NORM_LETTER_MAP[letterPrefix[1]];
      }
    }

    // 3. Stages exact & partial match
    if (norm.includes('المرحله 1') || norm.includes('المرحله الاولي')) return '/audio/stages/stage_1.mp3';
    if (norm.includes('المرحله 2') || norm.includes('المرحله الثانيه')) return '/audio/stages/stage_2.mp3';
    if (norm.includes('المرحله 3') || norm.includes('المرحله الثالثه')) return '/audio/stages/stage_3.mp3';
    if (norm.includes('المرحله 4') || norm.includes('المرحله الرابعه')) return '/audio/stages/stage_4.mp3';
    if (norm.includes('المرحله 5') || norm.includes('المرحله الخامسه')) return '/audio/stages/stage_5.mp3';
    if (norm.includes('المرحله 6') || norm.includes('المرحله السادسه')) return '/audio/stages/stage_6.mp3';
    if (norm.includes('المرحله 7') || norm.includes('المرحله السابعه')) return '/audio/stages/stage_7.mp3';
    if (norm.includes('المرحله 8') || norm.includes('المرحله الثامنه')) return '/audio/stages/stage_8.mp3';
    if (norm.includes('فتحت لك المرحله') || norm.includes('المرحله التاليه')) return '/audio/stages/next_stage.mp3';
    if (norm.includes('استمع لصوت الحرف')) return '/audio/stages/listen_sound.mp3';

    // 4. Syllable exact match
    if (raw === 'بَ') return '/audio/syllables/baa_fatha.mp3';
    if (raw === 'بِ') return '/audio/syllables/baa_kasra.mp3';
    if (raw === 'بُ') return '/audio/syllables/baa_damma.mp3';
    if (raw === 'بَا') return '/audio/syllables/baa_alif.mp3';
    if (raw === 'بِي') return '/audio/syllables/baa_yaa.mp3';
    if (raw === 'بُو') return '/audio/syllables/baa_waw.mp3';

    // 5. Word exact match
    if (norm === 'باب') return '/audio/words/baab.mp3';
    if (norm === 'بطه') return '/audio/words/battah.mp3';
    if (norm === 'بيت') return '/audio/words/bayt.mp3';
    if (norm === 'بحر') return '/audio/words/bahr.mp3';
    if (norm === 'خبز') return '/audio/words/hubz.mp3';
    if (norm === 'حبل') return '/audio/words/habl.mp3';
    if (norm === 'عنب') return '/audio/words/inab.mp3';

    // 6. Dialogue match
    if (norm.includes('مرحبا انا لومي')) return '/audio/dialogue/intro_step_1.mp3';
    if (norm.includes('فقد اصواته')) return '/audio/dialogue/intro_step_2.mp3';
    if (norm.includes('تساعدني')) return '/audio/dialogue/intro_step_3.mp3';
    if (norm.includes('ما اسمك')) return '/audio/dialogue/ask_name.mp3';
    if (norm.includes('اهلا يا') || norm.includes('اختر حرفك')) return '/audio/dialogue/choose_letter.mp3';
    if (norm.includes('اهلا وسهلا')) return '/audio/dialogue/welcome_child.mp3';
    if (norm.includes('على وشك عيش')) return '/audio/dialogue/launch_journey.mp3';
    if (norm.includes('احسنت') || norm.includes('ممتاز') || norm.includes('رائع') || norm.includes('متفوق')) {
      return '/audio/dialogue/excellent.mp3';
    }
    if (norm.includes('حاول') || norm.includes('قريب') || norm.includes('خيارا اخر')) {
      return '/audio/dialogue/try_again.mp3';
    }

    // 7. Articulation match
    if (norm.includes('مختبر اللسان')) return '/audio/articulation/tongue_lab_intro.mp3';
    if (norm.includes('بانطباق الشفتين')) return '/audio/articulation/lips_guide_baa.mp3';
    if (norm.includes('مستريحا في قاع الفم')) return '/audio/articulation/tongue_guide_baa.mp3';

    return null;
  }

  // Play Pure Female Voice (100% Pre-rendered MP3 or Neural Edge Stream)
  // SpeechSynthesis is banned to guarantee zero male voice.
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

    // 1. Check Static Studio Pre-rendered MP3
    const staticUrl = this.resolveStaticAudioUrl(cleanText);

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
            this.playViaEdgeNeural(cleanText, playbackToken, onEnd);
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
        return;
      } catch {
        if (onEnd) onEnd();
        return;
      }
    }

    // 2. Play Pure Microsoft Neural Edge Saudi Female Stream (/api/tts)
    this.playViaEdgeNeural(cleanText, playbackToken, onEnd);
  }

  // Pure Saudi Female Edge Stream (/api/tts)
  private playViaEdgeNeural(text: string, playbackToken: number, onEnd?: () => void) {
    if (typeof window === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    try {
      const audio = new Audio(`/api/tts?text=${encodeURIComponent(text)}`);
      audio.volume = this.volume;
      this.currentAudioElement = audio;

      audio.onended = () => {
        if (this.currentPlaybackToken === playbackToken && onEnd) {
          onEnd();
        }
      };

      audio.onerror = () => {
        // Play gentle female praise sound instead of failing or using male voice
        if (this.currentPlaybackToken === playbackToken) {
          const fallbackAudio = new Audio('/audio/dialogue/excellent.mp3');
          fallbackAudio.volume = this.volume;
          fallbackAudio.onended = () => { if (onEnd) onEnd(); };
          fallbackAudio.play().catch(() => { if (onEnd) onEnd(); });
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
    } catch {
      if (onEnd) onEnd();
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
