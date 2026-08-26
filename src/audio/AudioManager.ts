// 100% Guaranteed Pure Female Voice Audio Engine for LUMI
// Ultra-Low Latency (0ms local playback) + Studio Neural Female (ar-SA-ZariyahNeural)
// Male voices and Web Speech Synthesis fallbacks are STRICTLY ELIMINATED.

export const LETTER_FILE_MAP: Record<string, string> = {
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

export const AUDIO_MANIFEST: Record<string, string> = {
  // Letters - Names
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

  // Letters - Single Chars
  'ا': '/audio/letters/alif.mp3',
  'أ': '/audio/letters/alif.mp3',
  'إ': '/audio/letters/alif.mp3',
  'آ': '/audio/letters/alif.mp3',
  'ب': '/audio/letters/baa.mp3',
  'ت': '/audio/letters/taa.mp3',
  'ث': '/audio/letters/thaa.mp3',
  'ج': '/audio/letters/jeem.mp3',
  'ح': '/audio/letters/haa.mp3',
  'خ': '/audio/letters/khaa.mp3',
  'د': '/audio/letters/daal.mp3',
  'ذ': '/audio/letters/zaal.mp3',
  'ر': '/audio/letters/raa.mp3',
  'ز': '/audio/letters/zay.mp3',
  'س': '/audio/letters/seen.mp3',
  'ش': '/audio/letters/sheen.mp3',
  'ص': '/audio/letters/saad.mp3',
  'ض': '/audio/letters/daad.mp3',
  'ط': '/audio/letters/taa_heavy.mp3',
  'ظ': '/audio/letters/zaa_heavy.mp3',
  'ع': '/audio/letters/ayn.mp3',
  'غ': '/audio/letters/ghayn.mp3',
  'ف': '/audio/letters/faa.mp3',
  'ق': '/audio/letters/qaaf.mp3',
  'ك': '/audio/letters/kaaf.mp3',
  'ل': '/audio/letters/laam.mp3',
  'م': '/audio/letters/meem.mp3',
  'ن': '/audio/letters/noon.mp3',
  'ه': '/audio/letters/haa_soft.mp3',
  'و': '/audio/letters/waaw.mp3',
  'ي': '/audio/letters/yaa.mp3',

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

  // Sentences
  'هَذَا بَابُ البَيْتِ': '/audio/sentences/baab_bayt.mp3',
  'البَطَّةُ تَسْبَحُ فِي المَاءِ': '/audio/sentences/battah_tasbah.mp3',

  // Dialogue & Encouragement
  'مَرْحَبًا.. أَنَا لُومِي! هَيَّا نَسْتَكْشِفُ مَعًا عَالَمَ الأَصْوَاتِ السَّاحِر!': '/audio/dialogue/intro_step_1.mp3',
  'هَذَا العَالَمُ فَقَدَ أَصْوَاتَهُ السَّاحِرَة...': '/audio/dialogue/intro_step_2.mp3',
  'هَلْ تُسَاعِدُنِي فِي إِعَادَتِهَا مَعًا؟': '/audio/dialogue/intro_step_3.mp3',
  'مَا اسْمُكَ يَا بَطَل؟ اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/ask_name.mp3',
  'مَرْحَبًا يَا بَطَل! اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/ask_name.mp3',
  'أَهْلًا وَسَهْلًا بِكَ يَا بَطَل! أَنَا سَعِيدَةٌ جِدًّا بِوُجُودِكَ مَعِي! هَلْ أَنْتَ جَاهِزٌ لِلانْطِلاق؟': '/audio/dialogue/welcome_child.mp3',
  'هَيَّا بِنَا يَا بَطَل! أَنْتَ عَلَى وَشَكِ عَيْشِ أَجْمَلِ المُغَامَرَات!': '/audio/dialogue/launch_journey.mp3',
  'أَحْسَنْتَ يَا بَطَل! صَوْتٌ رَائِعٌ وَمُتَفَوِّق!': '/audio/dialogue/excellent.mp3',
  'أَنْتَ قَرِيبٌ جِدًّا.. لِنُجَرِّبْ خِيَارًا آخَر!': '/audio/dialogue/try_again.mp3',
  'مُمْتَازٌ يَا بَطَل! أَنْتَ ذَكِيٌّ وَمُتَفَوِّق!': '/audio/dialogue/excellent.mp3',

  // Articulation
  'مَرْحَبًا بِكَ فِي مُخْتَبَرِ اللِّسَانِ السِّحْرِيّ! شَاهِدْ حَرَكَةَ اللِّسَانِ وَالشَّفَتَيْنِ وَقَلِّدِ الصَّوْت!': '/audio/articulation/tongue_lab_intro.mp3',
  'حَرْفُ البَاءِ يَخْرُجُ بِانْطِبَاقِ الشَّفَتَيْنِ مَعًا ثُمَّ انْفِتَاحِهِمَا بِخُرُوجِ الهَوَاء: بْ!': '/audio/articulation/lips_guide_baa.mp3',
  'يَبْقَى اللِّسَانُ مُسْتَرِيحًا فِي قَاعِ الفَمِ عِنْدَ نُطْقِ حَرْفِ البَاء!': '/audio/articulation/tongue_guide_baa.mp3',
  'مُمْتَازٌ يَا بَطَل! انْطِبَاقُ الشَّفَتَيْنِ هُوَ مَخْرَجُ حَرْفِ البَاء!': '/audio/articulation/tongue_quiz_success.mp3'
};

class AudioManager {
  private currentAudioElement: HTMLAudioElement | null = null;
  private isMuted: boolean = false;
  private volume: number = 1.0;
  private isVisualFirst: boolean = false;
  private currentPlaybackToken: number = 0;
  private preloadCache: Map<string, HTMLAudioElement> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      // Silence Web Speech
      if ('speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
        } catch {}
      }

      // Preload Letter MP3s in memory for instant 0ms response
      setTimeout(() => this.preloadCommonAudios(), 1000);
    }
  }

  // Pre-buffer common audio assets for 0ms response
  private preloadCommonAudios() {
    if (typeof window === 'undefined') return;
    Object.values(LETTER_FILE_MAP).forEach((url) => {
      if (!this.preloadCache.has(url)) {
        try {
          const audio = new Audio(url);
          audio.preload = 'auto';
          this.preloadCache.set(url, audio);
        } catch {}
      }
    });
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

  // Forcefully stop any running audio or speech
  public stop() {
    this.currentPlaybackToken++;
    if (this.currentAudioElement) {
      try {
        this.currentAudioElement.pause();
        this.currentAudioElement.removeAttribute('src');
        this.currentAudioElement.load();
      } catch {}
      this.currentAudioElement = null;
    }
  }

  // Instant Smart Local Audio Matcher (0ms Latency)
  private resolveLocalAudioUrl(text: string): string | null {
    const clean = text.trim().replace(/[.,!؟]/g, '').trim();

    // 1. Direct manifest match
    if (AUDIO_MANIFEST[clean]) {
      return AUDIO_MANIFEST[clean];
    }

    // 2. Letter prefix match: "حَرْفُ أَلِف" / "حَرْفُ أ" / "حَرْف أَلِف" / "حَرْف البَاء"
    const letterPrefixMatch = clean.match(/^(?:حَرْفُ|حَرْف|صَوْتُ|صَوْت)\s+([^\s.]+)/i);
    if (letterPrefixMatch) {
      const candidate = letterPrefixMatch[1].trim();
      if (AUDIO_MANIFEST[candidate]) {
        return AUDIO_MANIFEST[candidate];
      }
    }

    // 3. Check for specific letters anywhere in short phrases
    const letterNames = Object.keys(AUDIO_MANIFEST);
    for (const name of letterNames) {
      if (name.length > 2 && clean.includes(name)) {
        return AUDIO_MANIFEST[name];
      }
    }

    // 4. Praise & Feedback keywords
    if (clean.includes('أَحْسَنْتَ') || clean.includes('أَحْسَنْتِ') || clean.includes('مُمْتَاز') || clean.includes('رَائِع')) {
      return '/audio/dialogue/excellent.mp3';
    }

    if (clean.includes('حَاوِلْ') || clean.includes('قَرِيب') || clean.includes('خِيَارًا آخَر')) {
      return '/audio/dialogue/try_again.mp3';
    }

    return null;
  }

  // Play Exclusively Pure Female Voice (Instant 0ms Local Preload + High-Speed Edge TTS)
  public speak(text: string, _rate: number = 0.85, onEnd?: () => void) {
    this.dispatchVisualPulse('click');
    
    // Stop any existing stream
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

    // 1. INSTANT LOCAL AUDIO RESOLUTION (0ms DELAY)
    const localAudioUrl = this.resolveLocalAudioUrl(cleanText);

    if (localAudioUrl && typeof window !== 'undefined') {
      let audio: HTMLAudioElement;

      // Use pre-cached audio element if available
      if (this.preloadCache.has(localAudioUrl)) {
        audio = this.preloadCache.get(localAudioUrl)!.cloneNode() as HTMLAudioElement;
      } else {
        audio = new Audio(localAudioUrl);
      }

      audio.volume = this.volume;
      this.currentAudioElement = audio;

      audio.onended = () => {
        if (this.currentPlaybackToken === playbackToken && onEnd) {
          onEnd();
        }
      };

      audio.onerror = () => {
        if (this.currentPlaybackToken === playbackToken) {
          this.playViaNeuralApi(cleanText, playbackToken, onEnd);
        }
      };

      audio.play().catch(() => {
        if (this.currentPlaybackToken === playbackToken) {
          this.playViaNeuralApi(cleanText, playbackToken, onEnd);
        }
      });
      return;
    }

    // 2. High-Speed Neural Edge TTS
    this.playViaNeuralApi(cleanText, playbackToken, onEnd);
  }

  // Studio-Grade Neural Edge Female API (/api/tts)
  private playViaNeuralApi(text: string, playbackToken: number, onEnd?: () => void) {
    if (typeof window === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    try {
      const apiUrl = `/api/tts?text=${encodeURIComponent(text)}`;
      const audio = new Audio(apiUrl);
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

      audio.play().catch(() => {
        if (this.currentPlaybackToken === playbackToken && onEnd) {
          onEnd();
        }
      });
    } catch {
      if (onEnd) onEnd();
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
