// Pure Web Audio API Synthesizer — Zero External Audio Files
// Teenage Engineering Pocket Operator & Nolan Chronometer Rhythmic Instrument Engine

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

export type RhythmPatternName = "chrono" | "teenage" | "minimal";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  // Rhythm Sequencer State
  private isRhythmPlaying: boolean = false;
  private bpm: number = 120;
  private currentStep: number = 0;
  private rhythmTimer: NodeJS.Timeout | null = null;
  private beatPulseValue: number = 0;
  private pulseDecayTimer: NodeJS.Timeout | null = null;
  private currentPattern: RhythmPatternName = "chrono";
  private stepListeners: Set<(step: number, isDownbeat: boolean) => void> = new Set();
  private rhythmStateListeners: Set<(isPlaying: boolean, bpm: number, pattern: RhythmPatternName) => void> = new Set();

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
    } else if (this.isRhythmPlaying) {
      this.stopRhythm();
    }
    return this.enabled;
  }

  // ==========================================
  // RHYTHM & SEQUENCER ENGINE (120 BPM CLOCK)
  // ==========================================

  public isRhythmActive(): boolean {
    return this.isRhythmPlaying;
  }

  public getBpm(): number {
    return this.bpm;
  }

  public setBpm(newBpm: number) {
    this.bpm = Math.max(70, Math.min(180, newBpm));
    if (this.isRhythmPlaying) {
      // Restart loop with new tempo
      this.stopRhythm();
      this.startRhythm();
    }
    this.notifyRhythmState();
  }

  public getPattern(): RhythmPatternName {
    return this.currentPattern;
  }

  public setPattern(pattern: RhythmPatternName) {
    this.currentPattern = pattern;
    this.notifyRhythmState();
  }

  public toggleRhythm(): boolean {
    if (this.isRhythmPlaying) {
      this.stopRhythm();
    } else {
      this.startRhythm();
    }
    return this.isRhythmPlaying;
  }

  public startRhythm(customBpm?: number) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    if (customBpm) this.bpm = customBpm;
    if (this.isRhythmPlaying) return;

    this.isRhythmPlaying = true;
    this.currentStep = 0;
    this.notifyRhythmState();

    // 16th-note interval in milliseconds
    const stepIntervalMs = Math.round((60 / this.bpm / 4) * 1000);

    const tickLoop = () => {
      if (!this.isRhythmPlaying) return;
      this.executeRhythmStep(this.currentStep);
      this.currentStep = (this.currentStep + 1) % 16;
      this.rhythmTimer = setTimeout(tickLoop, stepIntervalMs);
    };

    tickLoop();
  }

  public stopRhythm() {
    this.isRhythmPlaying = false;
    if (this.rhythmTimer) {
      clearTimeout(this.rhythmTimer);
      this.rhythmTimer = null;
    }
    this.beatPulseValue = 0;
    this.notifyRhythmState();
  }

  public subscribeStep(listener: (step: number, isDownbeat: boolean) => void): () => void {
    this.stepListeners.add(listener);
    return () => {
      this.stepListeners.delete(listener);
    };
  }

  public subscribeRhythmState(
    listener: (isPlaying: boolean, bpm: number, pattern: RhythmPatternName) => void
  ): () => void {
    this.rhythmStateListeners.add(listener);
    listener(this.isRhythmPlaying, this.bpm, this.currentPattern);
    return () => {
      this.rhythmStateListeners.delete(listener);
    };
  }

  private notifyRhythmState() {
    this.rhythmStateListeners.forEach((listener) => {
      try {
        listener(this.isRhythmPlaying, this.bpm, this.currentPattern);
      } catch {}
    });
  }

  public getBeatPulse(): number {
    return this.beatPulseValue;
  }

  private triggerBeatPulse(strength: number) {
    this.beatPulseValue = strength;
    if (this.pulseDecayTimer) clearTimeout(this.pulseDecayTimer);
    const decay = () => {
      this.beatPulseValue *= 0.82;
      if (this.beatPulseValue > 0.05) {
        this.pulseDecayTimer = setTimeout(decay, 25);
      } else {
        this.beatPulseValue = 0;
      }
    };
    this.pulseDecayTimer = setTimeout(decay, 25);
  }

  private executeRhythmStep(step: number) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    const isQuarter = step % 4 === 0;
    const isDownbeat = step === 0;

    // Trigger visual pulse
    this.triggerBeatPulse(isDownbeat ? 1.0 : isQuarter ? 0.7 : 0.25);

    // Broadcast to listeners
    this.stepListeners.forEach((cb) => {
      try {
        cb(step, isQuarter);
      } catch {}
    });

    // Patterns
    if (this.currentPattern === "chrono") {
      // 1. Precise Nolan Chronometer Hi-Hat (Every 16th note)
      this.synthesizeHiHat(now, isQuarter ? 0.08 : 0.035, isQuarter ? 8500 : 9800);

      // 2. Sub-bass kick on 0 and 8
      if (step === 0 || step === 8) {
        this.synthesizeKick(now, step === 0 ? 0.28 : 0.2);
      }

      // 3. Mechanical Rimshot on 4 and 12
      if (step === 4 || step === 12) {
        this.synthesizeRimshot(now, 0.14);
      }

      // 4. Rolling Bassline Synth Pluck (D-min pentatonic)
      const bassMelody = [0, 0, 1, 3, 4, 3, 1, 2, 0, 1, 3, 5, 4, 3, 2, 1];
      const noteIdx = bassMelody[step];
      const note = D_MIN_PENTATONIC[noteIdx] || D_MIN_PENTATONIC[0];
      if (step % 2 === 0) {
        this.synthesizeBassPluck(now, note.freq, 0.1);
      }
    } else if (this.currentPattern === "teenage") {
      // Teenage Engineering Pocket Operator Breakbeat Groove
      this.synthesizeHiHat(now, step % 2 === 0 ? 0.06 : 0.02, 7200);

      // Syncopated kick: 0, 6, 10
      if (step === 0 || step === 6 || step === 10) {
        this.synthesizeKick(now, step === 0 ? 0.32 : 0.22);
      }

      // Snare: 4, 12
      if (step === 4 || step === 12) {
        this.synthesizeRimshot(now, 0.16);
      }

      // Synth Arpeggio
      const arpNotes = [0, 2, 3, 5, 7, 5, 3, 1];
      const n = D_MIN_PENTATONIC[arpNotes[step % 8]];
      if (n) {
        this.synthesizeSynthLead(now, n.freq * 1.5, 0.08);
      }
    } else {
      // Minimal Pulse
      if (step === 0 || step === 8) {
        this.synthesizeKick(now, 0.22);
      }
      this.synthesizeHiHat(now, 0.03, 10000);
    }
  }

  // Pure Web Audio Synth Voices
  private synthesizeKick(time: number, gainVal: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(145, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.11);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.2);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.22);
  }

  private synthesizeHiHat(time: number, gainVal: number, cutoff: number) {
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.02);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(cutoff, time);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.028);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
  }

  private synthesizeRimshot(time: number, gainVal: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(920, time);
    osc.frequency.exponentialRampToValueAtTime(260, time + 0.03);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.035);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.04);
  }

  private synthesizeBassPluck(time: number, freq: number, gainVal: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(freq, time);

    filter.type = "lowpass";
    filter.frequency.setValueAtTime(650, time);
    filter.frequency.exponentialRampToValueAtTime(140, time + 0.12);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.14);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.15);
  }

  private synthesizeSynthLead(time: number, freq: number, gainVal: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.11);
  }

  // ==========================================
  // PLAYABLE KEYBOARD INSTRUMENT VOICES
  // ==========================================

  public playNote(noteIndexOrName: number | string): NoteInfo {
    let note: NoteInfo;
    if (typeof noteIndexOrName === "number") {
      const idx = Math.max(0, Math.min(D_MIN_PENTATONIC.length - 1, noteIndexOrName));
      note = D_MIN_PENTATONIC[idx];
    } else {
      note =
        D_MIN_PENTATONIC.find((n) => n.name.toLowerCase() === noteIndexOrName.toLowerCase()) ||
        D_MIN_PENTATONIC[0];
    }

    if (!this.enabled) return note;

    try {
      this.initCtx();
      if (!this.ctx) return note;
      const now = this.ctx.currentTime;

      // Rich analog polyphonic synth voice
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(note.freq, now);

      osc2.type = "sine";
      osc2.frequency.setValueAtTime(note.freq * 2, now);

      filter.type = "lowpass";
      filter.frequency.setValueAtTime(note.freq * 4.5, now);
      filter.frequency.exponentialRampToValueAtTime(note.freq * 1.2, now + 0.35);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.42);
      osc2.stop(now + 0.42);

      this.triggerBeatPulse(0.85);
    } catch {}

    return note;
  }

  // Ambient D-Minor Chord
  public playChord() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const chordFreqs = [146.83, 220.0, 293.66, 349.23]; // D3, A3, D4, F4
      const now = this.ctx.currentTime;

      chordFreqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(freq, now + idx * 0.04);
        gain.gain.setValueAtTime(0.08, now + idx * 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.6);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.04);
        osc.stop(now + 0.65);
      });
      this.triggerBeatPulse(0.9);
    } catch {}
  }

  // ==========================================
  // SPATIAL BEAT PAD & TACTILE SFX
  // ==========================================

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
        // UPPER: Crisp synth pluck + tight hi-hat tick
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

        this.synthesizeHiHat(now, 0.06, 7500);
      } else if (clampedY < 0.66) {
        // MIDDLE: Warm Rhodes FM chord hit + rimshot
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

        this.synthesizeRimshot(now, 0.1);
      } else {
        // LOWER: Punchy sub-bass kick + low pluck
        this.synthesizeKick(now, 0.3);

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

      this.triggerBeatPulse(0.7);
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

  // Snappy analog relay detent
  public relay() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

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

  // Wooden chess move thock pitched by rank (1–8)
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

  public thock() {
    this.chessMove(4);
  }

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
      this.triggerBeatPulse(1.0);
    } catch {}
  }

  public tabSwitch(index: number) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const freqs = [293.66, 349.23, 440.0, 587.33];
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

      this.tick();
    } catch {}
  }

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
