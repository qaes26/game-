// Pure Saudi Female Voice Audio Engine for LUMI (ar-SA-ZariyahNeural)
// 100% Client-Side In-Browser Architecture with Zero Server Dependency
// Works natively on Netlify, Vercel, GitHub Pages, Mobile & Desktop

import { ClientEdgeTTS } from './ClientEdgeTTS';

// 1. Exact map of letter IDs to audio files
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

// Helper: Strip Arabic diacritics (tashkeel)
export function stripTashkeel(text: string): string {
  return text
    .replace(/[\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E8\u06EA-\u06ED]/g, '')
    .trim();
}

// 2. Comprehensive Static Audio Dictionary (Includes Letters, Syllables, Words, Sentences, Stages, Dialogues)
export const EXACT_STATIC_AUDIO: Record<string, string> = {
  // Letters by Arabic Name (with and without tashkeel)
  'أَلِف': '/audio/letters/alif.mp3', 'الف': '/audio/letters/alif.mp3', 'ألف': '/audio/letters/alif.mp3', 'إلف': '/audio/letters/alif.mp3',
  'بَاء': '/audio/letters/baa.mp3', 'باء': '/audio/letters/baa.mp3',
  'تَاء': '/audio/letters/taa.mp3', 'تاء': '/audio/letters/taa.mp3',
  'ثَاء': '/audio/letters/thaa.mp3', 'ثاء': '/audio/letters/thaa.mp3',
  'جِيم': '/audio/letters/jeem.mp3', 'جيم': '/audio/letters/jeem.mp3',
  'حَاء': '/audio/letters/haa.mp3', 'حاء': '/audio/letters/haa.mp3',
  'خَاء': '/audio/letters/khaa.mp3', 'خاء': '/audio/letters/khaa.mp3',
  'دَال': '/audio/letters/daal.mp3', 'دال': '/audio/letters/daal.mp3',
  'ذَال': '/audio/letters/zaal.mp3', 'ذال': '/audio/letters/zaal.mp3',
  'رَاء': '/audio/letters/raa.mp3', 'راء': '/audio/letters/raa.mp3',
  'زَاي': '/audio/letters/zay.mp3', 'زاي': '/audio/letters/zay.mp3',
  'سِين': '/audio/letters/seen.mp3', 'سين': '/audio/letters/seen.mp3',
  'شِين': '/audio/letters/sheen.mp3', 'شين': '/audio/letters/sheen.mp3',
  'صَاد': '/audio/letters/saad.mp3', 'صاد': '/audio/letters/saad.mp3',
  'ضَاد': '/audio/letters/daad.mp3', 'ضاد': '/audio/letters/daad.mp3',
  'طَاء': '/audio/letters/taa_heavy.mp3', 'طاء': '/audio/letters/taa_heavy.mp3',
  'ظَاء': '/audio/letters/zaa_heavy.mp3', 'ظاء': '/audio/letters/zaa_heavy.mp3',
  'عَيْن': '/audio/letters/ayn.mp3', 'عين': '/audio/letters/ayn.mp3',
  'غَيْن': '/audio/letters/ghayn.mp3', 'غين': '/audio/letters/ghayn.mp3',
  'فَاء': '/audio/letters/faa.mp3', 'فاء': '/audio/letters/faa.mp3',
  'قَاف': '/audio/letters/qaaf.mp3', 'قاف': '/audio/letters/qaaf.mp3',
  'كَاف': '/audio/letters/kaaf.mp3', 'كاف': '/audio/letters/kaaf.mp3',
  'لاَم': '/audio/letters/laam.mp3', 'لام': '/audio/letters/laam.mp3',
  'مِيم': '/audio/letters/meem.mp3', 'ميم': '/audio/letters/meem.mp3',
  'نُون': '/audio/letters/noon.mp3', 'نون': '/audio/letters/noon.mp3',
  'هَاء': '/audio/letters/haa_soft.mp3', 'هاء': '/audio/letters/haa_soft.mp3',
  'وَاو': '/audio/letters/waaw.mp3', 'واو': '/audio/letters/waaw.mp3',
  'يَاء': '/audio/letters/yaa.mp3', 'ياء': '/audio/letters/yaa.mp3',

  // Letters by Single Character
  'ا': '/audio/letters/alif.mp3', 'أ': '/audio/letters/alif.mp3', 'إ': '/audio/letters/alif.mp3', 'آ': '/audio/letters/alif.mp3', 'ء': '/audio/letters/alif.mp3',
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
  'ه': '/audio/letters/haa_soft.mp3', 'ة': '/audio/letters/haa_soft.mp3',
  'و': '/audio/letters/waaw.mp3',
  'ي': '/audio/letters/yaa.mp3', 'ى': '/audio/letters/yaa.mp3',

  // Letters by ID key
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
  'yaa': '/audio/letters/yaa.mp3',

  // Syllables
  'بَ': '/audio/syllables/baa_fatha.mp3',
  'بِ': '/audio/syllables/baa_kasra.mp3',
  'بُ': '/audio/syllables/baa_damma.mp3',
  'بَا': '/audio/syllables/baa_alif.mp3',
  'بِي': '/audio/syllables/baa_yaa.mp3',
  'بُو': '/audio/syllables/baa_waw.mp3',
  'baa_fatha': '/audio/syllables/baa_fatha.mp3',
  'baa_kasra': '/audio/syllables/baa_kasra.mp3',
  'baa_damma': '/audio/syllables/baa_damma.mp3',
  'baa_alif': '/audio/syllables/baa_alif.mp3',
  'baa_yaa': '/audio/syllables/baa_yaa.mp3',
  'baa_waw': '/audio/syllables/baa_waw.mp3',

  // Words
  'بَاب': '/audio/words/baab.mp3', 'باب': '/audio/words/baab.mp3', 'baab': '/audio/words/baab.mp3',
  'بَطَّة': '/audio/words/battah.mp3', 'بطة': '/audio/words/battah.mp3', 'battah': '/audio/words/battah.mp3',
  'بَيْت': '/audio/words/bayt.mp3', 'بيت': '/audio/words/bayt.mp3', 'bayt': '/audio/words/bayt.mp3',
  'بَحْر': '/audio/words/bahr.mp3', 'بحر': '/audio/words/bahr.mp3', 'bahr': '/audio/words/bahr.mp3',
  'خُبْز': '/audio/words/hubz.mp3', 'خبز': '/audio/words/hubz.mp3', 'hubz': '/audio/words/hubz.mp3',
  'حَبْل': '/audio/words/habl.mp3', 'حبل': '/audio/words/habl.mp3', 'habl': '/audio/words/habl.mp3',
  'عِنَب': '/audio/words/inab.mp3', 'عنب': '/audio/words/inab.mp3', 'inab': '/audio/words/inab.mp3',

  // Sentences
  'هَذَا بَابُ البَيْتِ': '/audio/sentences/baab_bayt.mp3',
  'هذا باب البيت': '/audio/sentences/baab_bayt.mp3',
  'baab_bayt': '/audio/sentences/baab_bayt.mp3',
  'البَطَّةُ تَسْبَحُ فِي البَحْرِ': '/audio/sentences/battah_tasbah.mp3',
  'البطة تسبح في البحر': '/audio/sentences/battah_tasbah.mp3',
  'battah_tasbah': '/audio/sentences/battah_tasbah.mp3',

  // Stages
  'stage_1': '/audio/stages/stage_1.mp3',
  'stage_2': '/audio/stages/stage_2.mp3',
  'stage_3': '/audio/stages/stage_3.mp3',
  'stage_4': '/audio/stages/stage_4.mp3',
  'stage_5': '/audio/stages/stage_5.mp3',
  'stage_6': '/audio/stages/stage_6.mp3',
  'stage_7': '/audio/stages/stage_7.mp3',
  'stage_8': '/audio/stages/stage_8.mp3',
  'listen_sound': '/audio/stages/listen_sound.mp3',
  'اسْتَمِعْ لِصَوْتِ الحَرْف': '/audio/stages/listen_sound.mp3',
  'استمع لصوت الحرف': '/audio/stages/listen_sound.mp3',
  'next_stage': '/audio/stages/next_stage.mp3',

  // Names (100% Offline Pure Saudi Female Voice)
  'طلال': '/audio/names/talal.mp3', 'طَلَال': '/audio/names/talal.mp3', 'talal': '/audio/names/talal.mp3',
  'رنيم': '/audio/names/raneem.mp3', 'رَنِيم': '/audio/names/raneem.mp3', 'raneem': '/audio/names/raneem.mp3',
  'فاطمة': '/audio/names/fatima.mp3', 'فَاطِمَة': '/audio/names/fatima.mp3', 'fatima': '/audio/names/fatima.mp3',
  'هبة': '/audio/names/heba.mp3', 'هِبَة': '/audio/names/heba.mp3', 'heba': '/audio/names/heba.mp3',
  'جنى': '/audio/names/jana.mp3', 'جَنَى': '/audio/names/jana.mp3', 'jana': '/audio/names/jana.mp3',
  'ميرا': '/audio/names/mira.mp3', 'مِيرَا': '/audio/names/mira.mp3', 'mira': '/audio/names/mira.mp3',
  'ديمة': '/audio/names/deema.mp3', 'دِيمَة': '/audio/names/deema.mp3', 'deema': '/audio/names/deema.mp3',
  'طيبة': '/audio/names/taiba.mp3', 'طِيبَة': '/audio/names/taiba.mp3', 'taiba': '/audio/names/taiba.mp3',
  'محمد': '/audio/names/mohammed.mp3', 'مُحَمَّد': '/audio/names/mohammed.mp3', 'mohammed': '/audio/names/mohammed.mp3',
  'أحمد': '/audio/names/ahmed.mp3', 'أَحْمَد': '/audio/names/ahmed.mp3', 'ahmed': '/audio/names/ahmed.mp3',
  'سارة': '/audio/names/sara.mp3', 'سَارَة': '/audio/names/sara.mp3', 'sara': '/audio/names/sara.mp3',
  'علي': '/audio/names/ali.mp3', 'عَلِي': '/audio/names/ali.mp3', 'ali': '/audio/names/ali.mp3',
  'عمر': '/audio/names/omar.mp3', 'عُمَر': '/audio/names/omar.mp3', 'omar': '/audio/names/omar.mp3',
  'يوسف': '/audio/names/youssef.mp3', 'يُوسُف': '/audio/names/youssef.mp3', 'youssef': '/audio/names/youssef.mp3',
  'نور': '/audio/names/nour.mp3', 'نُور': '/audio/names/nour.mp3', 'nour': '/audio/names/nour.mp3',
  'مريم': '/audio/names/maryam.mp3', 'مَرْيَم': '/audio/names/maryam.mp3', 'maryam': '/audio/names/maryam.mp3',
  'بطل': '/audio/names/batal.mp3', 'يَا بَطَل': '/audio/names/batal.mp3', 'يا بطل': '/audio/names/batal.mp3', 'batal': '/audio/names/batal.mp3',
  'بطلة': '/audio/names/batala.mp3', 'يَا بَطَلَة': '/audio/names/batala.mp3', 'يا بطلة': '/audio/names/batala.mp3', 'batala': '/audio/names/batala.mp3',

  // Dialogues & Tailored Greetings
  'ask_name': '/audio/dialogue/ask_name.mp3',
  'مَا اسْمُكَ يَا بَطَل؟ اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/ask_name.mp3',
  'مَرْحَبًا يَا بَطَل! اكْتُبِ اسْمَكَ هُنَا لِنَبْدَأَ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/ask_name.mp3',
  'مرحبا يا بطل! اكتب اسمك هنا لنبدأ رحلتنا الساحرة!': '/audio/dialogue/ask_name.mp3',
  'choose_letter': '/audio/dialogue/choose_letter.mp3',
  'excellent': '/audio/dialogue/excellent.mp3',
  'help_me': '/audio/dialogue/help_me.mp3',
  'intro_step_1': '/audio/dialogue/intro_step_1.mp3',
  'مَرْحَبًا.. أَنَا لُومِي! هَيَّا نَسْتَكْشِفُ مَعًا عَالَمَ الأَصْوَاتِ السَّاحِر!': '/audio/dialogue/intro_step_1.mp3',
  'مرحبا.. أنا لومي! هيا نستكشف معا عالم الأصوات الساحر!': '/audio/dialogue/intro_step_1.mp3',
  'intro_step_2': '/audio/dialogue/intro_step_2.mp3',
  'هَذَا العَالَمُ فَقَدَ أَصْوَاتَهُ السَّاحِرَة...': '/audio/dialogue/intro_step_2.mp3',
  'هذا العالم فقد أصواته الساحرة...': '/audio/dialogue/intro_step_2.mp3',
  'intro_step_3': '/audio/dialogue/intro_step_3.mp3',
  'هَلْ تُسَاعِدُنِي فِي إِعَادَتِهَا مَعًا؟': '/audio/dialogue/intro_step_3.mp3',
  'هل تساعدني في إعادتها معا؟': '/audio/dialogue/intro_step_3.mp3',
  'launch_journey': '/audio/dialogue/launch_journey.mp3',
  'lost_sounds': '/audio/dialogue/lost_sounds.mp3',
  'try_again': '/audio/dialogue/try_again.mp3',
  'welcome': '/audio/dialogue/welcome.mp3',
  'welcome_child': '/audio/dialogue/welcome_child.mp3',
  'welcome_talal': '/audio/dialogue/welcome_talal.mp3',
  'أَهْلًا يَا طَلَال! هَيَّا نَبْدَأُ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/welcome_talal.mp3',
  'أهلا يا طلال! هيا نبدأ رحلتنا الساحرة!': '/audio/dialogue/welcome_talal.mp3',
  'welcome_raneem': '/audio/dialogue/welcome_raneem.mp3',
  'أَهْلًا يَا رَنِيم! هَيَّا نَبْدَأُ رِحْلَتَنَا السَّاحِرَة!': '/audio/dialogue/welcome_raneem.mp3',
  'أهلا يا رنيم! هيا نبدأ رحلتنا الساحرة!': '/audio/dialogue/welcome_raneem.mp3',
  'cheer_talal': '/audio/dialogue/cheer_talal.mp3',
  'أَحْسَنْتَ يَا طَلَال! نُطْقٌ مَلَكِيٌّ رَائِع!': '/audio/dialogue/cheer_talal.mp3',
  'cheer_raneem': '/audio/dialogue/cheer_raneem.mp3',
  'أَحْسَنْتِ يَا رَنِيم! نُطْقٌ مَلَكِيٌّ رَائِع!': '/audio/dialogue/cheer_raneem.mp3',
  'letter_choice_cheer': '/audio/dialogue/letter_choice_cheer.mp3',
  'اخْتِيَارٌ سِحْرِيٌّ رَائِع! هَيَّا بِنَا نَبْدَأُ المُغَامَرَة!': '/audio/dialogue/letter_choice_cheer.mp3',
  'open_next_stage': '/audio/dialogue/open_next_stage.mp3',
  'مَبْرُوك! فُتِحَتْ لَكَ المَرْحَلَةُ التَّالِيَة.. هَيَّا نَنْطَلِق!': '/audio/dialogue/open_next_stage.mp3',
  'complete_previous_first': '/audio/dialogue/complete_previous_first.mp3',
  'أَكْمِلِ المَرْحَلَةَ السَّابِقَةَ أَوَّلًا لِفَتْحِ هَذِهِ المَرْحَلَة!': '/audio/dialogue/complete_previous_first.mp3',

  // Articulation Guides
  'tongue_guide_baa': '/audio/articulation/tongue_guide_baa.mp3',
  'lips_guide_baa': '/audio/articulation/lips_guide_baa.mp3',
  'tongue_lab_intro': '/audio/articulation/tongue_lab_intro.mp3',
  'tongue_quiz_success': '/audio/articulation/tongue_quiz_success.mp3'
};

class AudioManager {
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
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch {}
    }
  }

  // Resolve arbitrary prompt to exact static audio path if applicable
  private resolveStaticAudio(text: string): string | null {
    const clean = text.trim();
    if (!clean) return null;

    // Direct path or URL
    if (clean.startsWith('/') || clean.startsWith('http')) {
      return clean;
    }

    // Direct dictionary match
    if (EXACT_STATIC_AUDIO[clean]) {
      return EXACT_STATIC_AUDIO[clean];
    }

    // Stripped tashkeel match
    const stripped = stripTashkeel(clean);
    if (EXACT_STATIC_AUDIO[stripped]) {
      return EXACT_STATIC_AUDIO[stripped];
    }

    // Match phrases like "حَرْفُ البَاء.. ب" or "حرف الباء" or "حرف ب"
    const letterMatch = stripped.match(/(?:حرف|صوت)\s+([^\s.]+)/i);
    if (letterMatch && letterMatch[1]) {
      const candidate = letterMatch[1].replace(/^(ال|ل)/, '');
      if (EXACT_STATIC_AUDIO[candidate]) {
        return EXACT_STATIC_AUDIO[candidate];
      }
      if (EXACT_STATIC_AUDIO['ال' + candidate]) {
        return EXACT_STATIC_AUDIO['ال' + candidate];
      }
    }

    return null;
  }

  // Main Speech Router:
  // 1. Instant Static MP3 (0ms latency)
  // 2. ClientEdgeTTS (Microsoft Neural Saudi Female Voice directly in browser)
  // 3. Native Web Speech API (window.speechSynthesis)
  public speak(text: string, _rate: number = 0.85, onEnd?: () => void) {
    this.dispatchVisualPulse('click');
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

    const playbackToken = ++this.currentPlaybackToken;

    // 1. Check for Static MP3
    const staticUrl = this.resolveStaticAudio(cleanText);

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

        audio.onerror = (e) => {
          console.warn(`[AudioManager] Static audio failed for '${staticUrl}'. Falling back to TTS...`, e);
          if (this.currentPlaybackToken === playbackToken) {
            this.synthesizeAndPlay(cleanText, playbackToken, onEnd);
          }
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.warn(`[AudioManager] Autoplay blocked or decode issue on '${staticUrl}'. Falling back...`, err);
            if (this.currentPlaybackToken === playbackToken) {
              this.synthesizeAndPlay(cleanText, playbackToken, onEnd);
            }
          });
        }
        return;
      } catch (err) {
        console.warn(`[AudioManager] Audio constructor error on '${staticUrl}'. Falling back...`, err);
        this.synthesizeAndPlay(cleanText, playbackToken, onEnd);
        return;
      }
    }

    // 2. Dynamic Text: Synthesize via Neural TTS
    this.synthesizeAndPlay(cleanText, playbackToken, onEnd);
  }

  private async synthesizeAndPlay(text: string, playbackToken: number, onEnd?: () => void) {
    if (typeof window === 'undefined') {
      if (onEnd) onEnd();
      return;
    }

    // Step 2A: Fetch from Azure Serverless TTS API (/api/tts)
    try {
      const res = await fetch(`/api/tts?text=${encodeURIComponent(text)}&voice=ar-SA-ZariyahNeural`);
      if (this.currentPlaybackToken !== playbackToken) return;

      if (res.ok && res.headers.get('content-type')?.includes('audio')) {
        const blob = await res.blob();
        const blobUrl = URL.createObjectURL(blob);

        const audio = new Audio(blobUrl);
        audio.volume = this.volume;
        this.currentAudioElement = audio;

        audio.onended = () => {
          if (this.currentPlaybackToken === playbackToken && onEnd) {
            onEnd();
          }
        };

        audio.onerror = () => {
          if (this.currentPlaybackToken === playbackToken) {
            this.fallbackNativeSpeech(text, playbackToken, onEnd);
          }
        };

        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            if (this.currentPlaybackToken === playbackToken) {
              this.fallbackNativeSpeech(text, playbackToken, onEnd);
            }
          });
        }
        return;
      }
    } catch (err) {
      console.warn('[AudioManager] /api/tts fetch error. Trying ClientEdgeTTS...', err);
    }

    // Step 2B: Client-side In-Browser Edge TTS (Saudi Female Voice)
    try {
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
        if (this.currentPlaybackToken === playbackToken) {
          this.fallbackNativeSpeech(text, playbackToken, onEnd);
        }
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          if (this.currentPlaybackToken === playbackToken) {
            this.fallbackNativeSpeech(text, playbackToken, onEnd);
          }
        });
      }
      return;
    } catch (err) {
      console.warn('[AudioManager] ClientEdgeTTS unavailable, switching to Native Web Speech:', err);
      if (this.currentPlaybackToken === playbackToken) {
        this.fallbackNativeSpeech(text, playbackToken, onEnd);
      }
    }
  }

  // Step 2C: Native Web Speech API Fallback (Strictly Arabic Female Voice)
  private fallbackNativeSpeech(text: string, playbackToken: number, onEnd?: () => void) {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      if (this.currentPlaybackToken === playbackToken && onEnd) onEnd();
      return;
    }

    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ar-SA';
      utterance.rate = 0.95;
      utterance.pitch = 1.15; // Slightly higher feminine pitch
      utterance.volume = this.volume;

      const voices = window.speechSynthesis.getVoices();
      // Strictly prioritize female voices
      const arabicFemaleVoice = voices.find((v) =>
        (v.lang.startsWith('ar') && (v.name.includes('Female') || v.name.includes('Zariyah') || v.name.includes('Salma') || v.name.includes('Laila') || v.name.includes('Hoda') || v.name.includes('Fatima') || v.name.includes('Maryam'))) ||
        (v.lang.startsWith('ar') && !v.name.includes('Male') && !v.name.includes('Naayf') && !v.name.includes('Tarik') && !v.name.includes('Hamed'))
      );

      if (arabicFemaleVoice) {
        utterance.voice = arabicFemaleVoice;
      }

      utterance.onend = () => {
        if (this.currentPlaybackToken === playbackToken && onEnd) {
          onEnd();
        }
      };

      utterance.onerror = () => {
        if (this.currentPlaybackToken === playbackToken && onEnd) {
          onEnd();
        }
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('[AudioManager] SpeechSynthesis error:', e);
      if (this.currentPlaybackToken === playbackToken && onEnd) {
        onEnd();
      }
    }
  }

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
