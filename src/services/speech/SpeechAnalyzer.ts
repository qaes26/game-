// Speech Recognition & Analysis Abstraction Layer for Arabic Speech Therapy

export type SpeechStatus = 'high_confidence' | 'acceptable' | 'needs_retry';

export interface SpeechAnalysisResult {
  targetText: string;
  recognizedText: string;
  confidence: number;
  status: SpeechStatus;
  feedbackMessage: string;
  phoneticScore: number;
  timestamp: number;
}

export interface ISpeechAnalyzer {
  startListening(
    targetText: string,
    onResult: (result: SpeechAnalysisResult) => void,
    onVolumeChange?: (volume: number) => void,
    onError?: (error: string) => void
  ): void;
  stopListening(): void;
  isSupported(): boolean;
}

// Arabic Text Normalizer (removes diacritics/tashkeel for fuzzy matching comparison)
export function normalizeArabicText(text: string): string {
  if (!text) return '';
  return text
    .replace(/[\u064B-\u065F\u0670]/g, '') // Remove tashkeel / harakat
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim()
    .toLowerCase();
}

export const ARABIC_LETTER_PHONETIC_ALIASES: Record<string, string[]> = {
  'ا': ['الف', 'ألف', 'ا', 'حرف الالف', 'حرف ألف', 'اه', 'آ', 'أ', 'إ'],
  'أ': ['الف', 'ألف', 'ا', 'حرف الالف', 'حرف ألف', 'اه', 'آ', 'أ', 'إ'],
  'إ': ['الف', 'ألف', 'ا', 'حرف الالف', 'حرف ألف', 'اه', 'آ', 'أ', 'إ'],
  'آ': ['الف', 'ألف', 'ا', 'حرف الالف', 'حرف ألف', 'اه', 'آ', 'أ', 'إ'],
  'ب': ['با', 'باء', 'الباء', 'حرف الباء', 'به', 'اب', 'ب', 'بي', 'بو'],
  'ت': ['تا', 'تاء', 'التاء', 'حرف التاء', 'ته', 'ات', 'ت', 'تي', 'تو'],
  'ث': ['ثا', 'ثاء', 'الثاء', 'حرف الثاء', 'ثه', 'اث', 'ث', 'ثي', 'ثو'],
  'ج': ['جا', 'جيم', 'الجيم', 'حرف الجيم', 'جه', 'اج', 'ج', 'جي', 'جو'],
  'ح': ['حا', 'حاء', 'الحاء', 'حرف الحاء', 'حه', 'اح', 'ح', 'حي', 'حو'],
  'خ': ['خا', 'خاء', 'الخاء', 'حرف الخاء', 'خه', 'اخ', 'خ', 'خي', 'خو'],
  'د': ['دا', 'دال', 'الدال', 'حرف الدال', 'ده', 'اد', 'د', 'دي', 'دو'],
  'ذ': ['ذا', 'ذال', 'الذال', 'حرف الذال', 'ذه', 'اذ', 'ذ', 'ذي', 'ذو'],
  'ر': ['را', 'راء', 'الراء', 'حرف الراء', 'ره', 'ار', 'ر', 'ري', 'رو'],
  'ز': ['زا', 'زاي', 'الزاي', 'حرف الزاي', 'زين', 'زه', 'از', 'ز', 'زي', 'زو'],
  'س': ['سا', 'سين', 'السين', 'حرف السين', 'سه', 'اس', 'س', 'سي', 'سو'],
  'ش': ['شا', 'شين', 'الشين', 'حرف الشين', 'شه', 'اش', 'ش', 'شي', 'شو'],
  'ص': ['صا', 'صاد', 'الصاد', 'حرف الصاد', 'صه', 'اص', 'ص', 'صي', 'صو'],
  'ض': ['ضا', 'ضاد', 'الضاد', 'حرف الضاد', 'ضه', 'اض', 'ض', 'ضي', 'ضو'],
  'ط': ['طا', 'طاء', 'الطاء', 'حرف الطاء', 'طه', 'اط', 'ط', 'طي', 'طو'],
  'ظ': ['ظا', 'ظاء', 'الظاء', 'حرف الظاء', 'ظه', 'اظ', 'ظ', 'ظي', 'ظو'],
  'ع': ['عا', 'عين', 'العين', 'حرف العين', 'عه', 'اع', 'ع', 'عي', 'عو'],
  'غ': ['غا', 'غين', 'الغين', 'حرف الغين', 'غه', 'اغ', 'غ', 'غي', 'غو'],
  'ف': ['فا', 'فاء', 'الفاء', 'حرف الفاء', 'فه', 'اف', 'ف', 'في', 'فو'],
  'ق': ['قا', 'قاف', 'القاف', 'حرف القاف', 'قه', 'اق', 'ق', 'قي', 'قو'],
  'ك': ['كا', 'كاف', 'الكاف', 'حرف الكاف', 'كه', 'اك', 'ك', 'كي', 'كو'],
  'ل': ['لا', 'لام', 'اللام', 'حرف اللام', 'له', 'ال', 'ل', 'لي', 'لو'],
  'م': ['ما', 'ميم', 'الميم', 'حرف الميم', 'مه', 'ام', 'م', 'مي', 'مو'],
  'ن': ['نا', 'نون', 'النون', 'حرف النون', 'نه', 'ان', 'ن', 'ني', 'نو'],
  'ه': ['ها', 'هاء', 'الهاء', 'حرف الهاء', 'هه', 'اه', 'ه', 'هي', 'هو'],
  'و': ['وا', 'واو', 'الواو', 'حرف الواو', 'وه', 'او', 'و', 'وي', 'وو'],
  'ي': ['يا', 'ياء', 'الياء', 'حرف الياء', 'يه', 'اي', 'ي', 'يي', 'يو']
};

// Calculate similarity score between target Arabic sound/word and recognized text
export function calculateArabicSimilarity(target: string, recognized: string): number {
  const normTarget = normalizeArabicText(target);
  const normRec = normalizeArabicText(recognized);

  if (!normRec) return 0.0;
  if (normTarget === normRec) return 1.0;

  const baseLetter = normTarget.charAt(0);
  const aliases = ARABIC_LETTER_PHONETIC_ALIASES[baseLetter] || [];
  if (aliases.includes(normRec) || aliases.some(a => normRec.includes(a) || a.includes(normRec))) {
    return 1.0;
  }

  // Direct containment check
  if (normRec.includes(normTarget) || normTarget.includes(normRec)) {
    return 0.85;
  }

  // Levenshtein distance calculation for fuzzy matching
  const m = normTarget.length;
  const n = normRec.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (normTarget[i - 1] === normRec[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
      }
    }
  }

  const distance = dp[m][n];
  const maxLen = Math.max(m, n);
  return Math.max(0, 1 - distance / maxLen);
}

// Child-friendly encouraging feedback generator
export function getChildEncouragement(status: SpeechStatus): string {
  if (status === 'high_confidence') {
    const praise = [
      'ممتاز يا بطل! نطق رائع وواضح! 🌟',
      'ما شاء الله! صوتك جميل جدًا! 👏',
      'أحسنت! إجابة مذهلة! 🏆',
      'رائع جدًا! استمر في هذا التألق! ✨'
    ];
    return praise[Math.floor(Math.random() * praise.length)];
  } else if (status === 'acceptable') {
    const good = [
      'محاولة رائعة جدًا! أنت قريب جدًا! 💫',
      'بطل! صوتك يتحسن في كل مرة! 🎯',
      'جميل جدًا! أحسنت المحاولة! 👍'
    ];
    return good[Math.floor(Math.random() * good.length)];
  } else {
    const retry = [
      'محاولة شجاعة! جرب مرة ثانية بصوت أوضح ❤️',
      'أنت بطل! دعنا نحاول معًا مرة أخرى 🌸',
      'قريب جدًا! اسمع الصوت وحاول تقليده ✨'
    ];
    return retry[Math.floor(Math.random() * retry.length)];
  }
}

export class WebSpeechAnalyzer implements ISpeechAnalyzer {
  private recognition: any = null;
  private isListening: boolean = false;
  private mediaStream: MediaStream | null = null;
  private audioCtx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private animFrameId: number | null = null;
  private watchdogTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    if (typeof window !== 'undefined') {
      const SpeechRec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRec) {
        this.recognition = new SpeechRec();
        this.recognition.continuous = false;
        this.recognition.interimResults = true;
        this.recognition.lang = 'ar-SA';
        this.recognition.maxAlternatives = 3;
      }
    }
  }

  public isSupported(): boolean {
    return !!this.recognition || (typeof navigator !== 'undefined' && !!navigator.mediaDevices);
  }

  public startListening(
    targetText: string,
    onResult: (result: SpeechAnalysisResult) => void,
    onVolumeChange?: (volume: number) => void,
    onError?: (error: string) => void
  ): void {
    if (this.isListening) {
      this.stopListening();
    }

    this.isListening = true;

    // 1. Setup Audio Visualizer for live microphone volume indicator
    if (typeof navigator !== 'undefined' && navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        if (!this.isListening) {
          stream.getTracks().forEach(t => t.stop());
          return;
        }
        this.mediaStream = stream;
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioCtx) {
          this.audioCtx = new AudioCtx();
          this.analyser = this.audioCtx.createAnalyser();
          this.analyser.fftSize = 256;
          const source = this.audioCtx.createMediaStreamSource(stream);
          source.connect(this.analyser);

          const bufferLength = this.analyser.frequencyBinCount;
          const dataArray = new Uint8Array(bufferLength);

          const checkVolume = () => {
            if (!this.isListening || !this.analyser) return;
            this.analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < bufferLength; i++) {
              sum += dataArray[i];
            }
            const average = sum / bufferLength;
            const normalized = Math.min(1, average / 100);
            if (onVolumeChange) onVolumeChange(normalized);
            this.animFrameId = requestAnimationFrame(checkVolume);
          };
          checkVolume();
        }
      }).catch(err => {
        console.warn('Microphone access for visualizer:', err);
      });
    }

    // 2. Setup Web Speech Recognition
    if (this.recognition) {
      let finalTranscript = '';
      let highestConfidence = 0.75;
      const startTime = Date.now();

      this.watchdogTimer = setTimeout(() => {
        if (this.isListening) {
          console.warn('Speech recognition watchdog triggered.');
          if (onError) onError('timeout');
          this.evaluateAttempt(targetText, finalTranscript, highestConfidence, onResult);
          this.stopListening();
        }
      }, 10000);

      this.recognition.onresult = (event: any) => {
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const res = event.results[i];
          if (res.isFinal || event.results[i][0]) {
            const transcript = res[0].transcript;
            finalTranscript = transcript;
            highestConfidence = res[0].confidence || 0.75;
          }
        }
      };

      this.recognition.onerror = (event: any) => {
        if (this.isListening) {
          if (onError) onError(event.error);
          this.evaluateAttempt(targetText, finalTranscript, highestConfidence, onResult);
        }
        this.stopListening();
      };

      this.recognition.onend = () => {
        if (this.isListening) {
          const duration = Date.now() - startTime;
          if (duration < 1000 && !finalTranscript) {
            if (onError) onError('browser-blocked');
          }
          this.evaluateAttempt(targetText, finalTranscript, highestConfidence, onResult);
          this.stopListening();
        }
      };

      try {
        this.recognition.start();
      } catch {
        // Fallback simulation if already started
      }
    } else {
      setTimeout(() => {
        if (this.isListening) {
          this.evaluateAttempt(targetText, '', 0, onResult);
          this.stopListening();
        }
      }, 2500);
    }
  }

  private evaluateAttempt(
    targetText: string,
    recognizedText: string,
    rawConfidence: number,
    onResult: (result: SpeechAnalysisResult) => void
  ) {
    const similarity = calculateArabicSimilarity(targetText, recognizedText);
    
    // Weighted score combining recognition confidence and fuzzy similarity
    const finalScore = Math.max(similarity, rawConfidence > 0.7 ? similarity * 0.9 : 0.6);

    let status: SpeechStatus = 'needs_retry';
    if (finalScore >= 0.75 || similarity >= 0.8) {
      status = 'high_confidence';
    } else if (finalScore >= 0.5 || similarity >= 0.45) {
      status = 'acceptable';
    }

    const result: SpeechAnalysisResult = {
      targetText,
      recognizedText: recognizedText,
      confidence: finalScore,
      status,
      feedbackMessage: getChildEncouragement(status),
      phoneticScore: Math.round(finalScore * 100),
      timestamp: Date.now()
    };

    onResult(result);
  }

  public stopListening(): void {
    this.isListening = false;
    if (this.watchdogTimer) {
      clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(t => t.stop());
      this.mediaStream = null;
    }
    if (this.audioCtx) {
      this.audioCtx.close().catch(() => {});
      this.audioCtx = null;
    }
    if (this.recognition) {
      try {
        this.recognition.stop();
      } catch {}
    }
  }
}

export const speechAnalyzer = new WebSpeechAnalyzer();
