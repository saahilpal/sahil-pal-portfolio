// Pure Web Audio API Synthesizer — Zero External Audio Files
// Teenage Engineering Pocket Operator & Brutalist Positional Beat Engine

export interface NoteInfo {
  name: string;
  freq: number;
}

export const D_MIN_PENTATONIC: NoteInfo[] = [
  { name: "D3", freq: 146.83 },
  { name: "F3", freq: 174.61 },
  { name: "G3", freq: 196.00 },
  { name: "A3", freq: 220.00 },
  { name: "C4", freq: 261.63 },
  { name: "D4", freq: 293.66 },
  { name: "F4", freq: 349.23 },
  { name: "G4", freq: 392.00 },
  { name: "A4", freq: 440.00 },
  { name: "C5", freq: 523.25 },
  { name: "D5", freq: 587.33 },
];

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sahil_sfx");
      this.enabled = saved !== "off";
    }
  }

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
  }

  public isEnabled(): boolean {
    return this.enabled;
  }

  public toggle(): boolean {
    this.enabled = !this.enabled;
    if (typeof window !== "undefined") {
      localStorage.setItem("sahil_sfx", this.enabled ? "on" : "off");
    }
    if (this.enabled) {
      this.relay();
    }
    return this.enabled;
  }

  // Pocket Operator Spatial Beat Pad (X = Note on D-min pentatonic, Y = Tone layer & percussion)
  public spatialBeat(normX: number, normY: number): NoteInfo {
    const clampedX = Math.max(0, Math.min(0.999, normX));
    const clampedY = Math.max(0, Math.min(0.999, normY));
    const noteIdx = Math.floor(clampedX * D_MIN_PENTATONIC.length);
    const note = D_MIN_PENTATONIC[noteIdx] || D_MIN_PENTATONIC[0];

    if (!this.enabled) return note;

    try {
      this.initCtx();
      if (!this.ctx) return note;
      const now = this.ctx.currentTime;

      if (clampedY < 0.33) {
        // UPPER THIRD: Crisp synth pluck + tight hi-hat tick
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = "triangle";
        osc.frequency.setValueAtTime(note.freq, now);

        filter.type = "bandpass";
        filter.frequency.setValueAtTime(note.freq * 2.5, now);
        filter.Q.setValueAtTime(3, now);

        gain.gain.setValueAtTime(0.18, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.18);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(now);
        osc.stop(now + 0.19);

        // Hi-hat noise burst
        const bufferSize = Math.floor(this.ctx.sampleRate * 0.025);
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }
        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        const hatFilter = this.ctx.createBiquadFilter();
        hatFilter.type = "highpass";
        hatFilter.frequency.setValueAtTime(7500, now);
        const hatGain = this.ctx.createGain();
        hatGain.gain.setValueAtTime(0.06, now);
        hatGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

        whiteNoise.connect(hatFilter);
        hatFilter.connect(hatGain);
        hatGain.connect(this.ctx.destination);
        whiteNoise.start(now);
      } else if (clampedY < 0.66) {
        // MIDDLE THIRD: Warm Rhodes-style FM chord hit + rimshot
        const carrier = this.ctx.createOscillator();
        const modulator = this.ctx.createOscillator();
        const modGain = this.ctx.createGain();
        const gain = this.ctx.createGain();

        carrier.type = "sine";
        carrier.frequency.setValueAtTime(note.freq, now);

        modulator.type = "sine";
        modulator.frequency.setValueAtTime(note.freq * 1.5, now);
        modGain.gain.setValueAtTime(note.freq * 0.8, now);
        modGain.gain.exponentialRampToValueAtTime(1, now + 0.22);

        modulator.connect(modGain);
        modGain.connect(carrier.frequency);

        gain.gain.setValueAtTime(0.16, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.26);

        carrier.connect(gain);
        gain.connect(this.ctx.destination);

        carrier.start(now);
        modulator.start(now);
        carrier.stop(now + 0.28);
        modulator.stop(now + 0.28);

        // Rimshot tap
        const rim = this.ctx.createOscillator();
        const rimGain = this.ctx.createGain();
        rim.type = "triangle";
        rim.frequency.setValueAtTime(950, now);
        rim.frequency.exponentialRampToValueAtTime(300, now + 0.03);
        rimGain.gain.setValueAtTime(0.1, now);
        rimGain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
        rim.connect(rimGain);
        rimGain.connect(this.ctx.destination);
        rim.start(now);
        rim.stop(now + 0.04);
      } else {
        // LOWER THIRD: Punchy sub-bass kick + low pluck
        const kick = this.ctx.createOscillator();
        const kickGain = this.ctx.createGain();

        kick.type = "sine";
        kick.frequency.setValueAtTime(140, now);
        kick.frequency.exponentialRampToValueAtTime(42, now + 0.12);

        kickGain.gain.setValueAtTime(0.3, now);
        kickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

        kick.connect(kickGain);
        kickGain.connect(this.ctx.destination);

        kick.start(now);
        kick.stop(now + 0.24);

        // Low root pluck
        const pluck = this.ctx.createOscillator();
        const pluckGain = this.ctx.createGain();
        const rootFreq = note.freq > 300 ? note.freq / 2 : note.freq;
        pluck.type = "triangle";
        pluck.frequency.setValueAtTime(rootFreq, now);
        pluckGain.gain.setValueAtTime(0.12, now);
        pluckGain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        pluck.connect(pluckGain);
        pluckGain.connect(this.ctx.destination);
        pluck.start(now);
        pluck.stop(now + 0.2);
      }
    } catch {}

    return note;
  }

  // Mechanical chronometer micro-tick
  public tick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.025);
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.025);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.03);
    } catch {}
  }

  // Snappy analog relay detent (for buttons, ⌘K, Turnstile toggle)
  public relay() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Click 1 (higher frequency latch)
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(1800, now);
      osc1.frequency.exponentialRampToValueAtTime(600, now + 0.015);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.018);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.02);

      // Click 2 (mechanical body knock)
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(260, now + 0.008);
      osc2.frequency.exponentialRampToValueAtTime(70, now + 0.025);
      gain2.gain.setValueAtTime(0.12, now + 0.008);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.008);
      osc2.stop(now + 0.035);
    } catch {}
  }

  // Wooden chess move thock pitched by board rank (1–8)
  public chessMove(rank: number = 4) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const baseFreq = 110 + (Math.max(1, Math.min(8, rank)) - 1) * 16;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(baseFreq * 1.4, now);
      osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.45, now + 0.065);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.075);
    } catch {}
  }

  // Backwards compatibility alias
  public thock() {
    this.chessMove(4);
  }

  // Sharper resonant click on Check (+)
  public check() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(660, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.04);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.11);
    } catch {}
  }

  // Deeper thud on Black's forced auto-reply
  public reply() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(105, now);
      osc.frequency.exponentialRampToValueAtTime(40, now + 0.08);
      gain.gain.setValueAtTime(0.22, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.085);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.09);
    } catch {}
  }

  // Checkmate victory major chord arpeggio (C5 - E5 - G5 - C6)
  public checkmate() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [523.25, 659.25, 783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "sine";
        const startTime = now + idx * 0.08;
        osc.frequency.setValueAtTime(freq, startTime);
        gain.gain.setValueAtTime(0.001, startTime);
        gain.gain.exponentialRampToValueAtTime(0.14, startTime + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.7);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.75);
      });
    } catch {}
  }

  // Project workbench tab switch with ascending harmonic intervals
  public tabSwitch(index: number) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [293.66, 349.23, 440.0, 587.33]; // D4, F4, A4, D5
      const freq = freqs[Math.max(0, Math.min(3, index))] || 440.0;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.9, now + 0.06);

      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);

      // Micro relay click
      this.tick();
    } catch {}
  }

  // Error low buzz
  public error() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(130, now);
      osc.frequency.setValueAtTime(110, now + 0.08);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.17);
    } catch {}
  }

  // Pulse sound
  public pulse() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.1);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.14);
    } catch {}
  }

  // Tenet Temporal Turnstile Inversion sweep
  public turnstile() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.18);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.23);
    } catch {}
  }
}

export const sound = new SoundEngine();
