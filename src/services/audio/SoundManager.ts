// Web Audio API Synthesizer & Speech Synthesis Engine for City of Sounds

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private soundVolume: number = 0.8;
  private voiceVolume: number = 1.0;
  private isVisualMode: boolean = false;

  constructor() {
    // AudioContext will be initialized on first user gesture
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public setMute(muted: boolean) {
    this.isMuted = muted;
  }

  public getMute(): boolean {
    return this.isMuted;
  }

  public setVisualMode(active: boolean) {
    this.isVisualMode = active;
  }

  public setSoundVolume(volume: number) {
    this.soundVolume = Math.max(0, Math.min(1, volume));
  }

  public setVoiceVolume(volume: number) {
    this.voiceVolume = Math.max(0, Math.min(1, volume));
  }

  // Visual Cue Trigger for Hearing Impaired Mode
  private triggerVisualCue(type: 'success' | 'encourage' | 'pop' | 'star') {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('city_of_sounds_visual_cue', { detail: { type } }));
    }
  }

  // 1. Playful UI Button Click
  public playClick() {
    this.triggerVisualCue('pop');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.15 * this.soundVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.09);
    } catch {
      // Audio context might be restricted
    }
  }

  // 2. Bubble / Letter Pop
  public playPop() {
    this.triggerVisualCue('pop');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.3 * this.soundVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.13);
    } catch {
      // ignore
    }
  }

  // 3. Success / Correct Answer (Melodious Triad)
  public playSuccess() {
    this.triggerVisualCue('success');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);

        gain.gain.setValueAtTime(0, ctx.currentTime);
        gain.gain.setValueAtTime(0.25 * this.soundVolume, ctx.currentTime + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.4);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.08);
        osc.stop(ctx.currentTime + idx * 0.08 + 0.45);
      });
    } catch {
      // ignore
    }
  }

  // 4. Gentle Encouragement ("جرب مرة ثانية" - soft non-punitive tone)
  public playEncouragement() {
    this.triggerVisualCue('encourage');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const notes = [440, 523.25]; // A4, C5 gentle rising warmth
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.12);

        gain.gain.setValueAtTime(0.18 * this.soundVolume, ctx.currentTime + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.12 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.12);
        osc.stop(ctx.currentTime + idx * 0.12 + 0.35);
      });
    } catch {
      // ignore
    }
  }

  // 5. Star / Coin Collection Chime
  public playStar() {
    this.triggerVisualCue('star');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const freqs = [880, 1320, 1760];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.2 * this.soundVolume, ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.06 + 0.3);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + idx * 0.06);
        osc.stop(ctx.currentTime + idx * 0.06 + 0.35);
      });
    } catch {
      // ignore
    }
  }

  // 6. Fanfare / Level Mastered Celebration
  public playFanfare() {
    this.triggerVisualCue('success');
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const melody = [
        { f: 523.25, d: 0.15, t: 0 },
        { f: 659.25, d: 0.15, t: 0.15 },
        { f: 783.99, d: 0.15, t: 0.30 },
        { f: 1046.50, d: 0.45, t: 0.45 },
        { f: 880.00, d: 0.20, t: 0.95 },
        { f: 1046.50, d: 0.60, t: 1.15 }
      ];

      melody.forEach(note => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(note.f, ctx.currentTime + note.t);

        gain.gain.setValueAtTime(0.3 * this.soundVolume, ctx.currentTime + note.t);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + note.t + note.d);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + note.t);
        osc.stop(ctx.currentTime + note.t + note.d + 0.05);
      });
    } catch {
      // ignore
    }
  }

  // 7. Train Whistle for Syllable Train
  public playTrainWhistle() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      [600, 750].forEach(freq => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.12 * this.soundVolume, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0.15 * this.soundVolume, ctx.currentTime + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.65);
      });
    } catch {
      // ignore
    }
  }

  // 8. Speech Gate Magical Sound
  public playGateOpen() {
    if (this.isMuted) return;
    const ctx = this.getContext();
    if (!ctx) return;

    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.8);

      gain.gain.setValueAtTime(0.25 * this.soundVolume, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.85);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.9);
    } catch {
      // ignore
    }
  }

  // 9. Natural Arabic Speech Synthesizer (Delegated strictly to pure Female AudioManager)
  public speak(text: string, rate: number = 0.85, onEnd?: () => void) {
    import('../../audio/AudioManager').then(({ audioManager }) => {
      audioManager.speak(text, rate, onEnd);
    }).catch(() => {
      if (onEnd) onEnd();
    });
  }
}

export const soundManager = new SoundManager();
