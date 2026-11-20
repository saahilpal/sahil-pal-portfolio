// Pure Web Audio API Synthesizer — Tactical Rhythmic Button Audio Engine
// Zero external libraries — Nolan Neo-Brutalist Mechanical Relays & D-Minor Pentatonic Cadence

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

  // Rhythmic Step Sequence Engine
  private clickStep: number = 0;
  private lastClickTime: number = 0;

  // Audio-Reactive Kinetic Pulse for 3D Mesh
  private beatPulseValue: number = 0;
  private pulseDecayTimer: NodeJS.Timeout | null = null;

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

  // ==========================================
  // RHYTHMIC BUTTON CLICK ENGINE
  // ==========================================
  // Each button click triggers a tuned, tactile acoustic relay thock
  // that steps sequentially along a rhythmic D-minor pentatonic groove.
  // Consecutive clicks form an intentional musical rhythm; pauses reset to step 0.

  public rhythmicClick(intensity: number = 1.0) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;

      const nowMs = Date.now();
      // If idle for more than 1600ms, reset back to root note
      if (nowMs - this.lastClickTime > 1600) {
        this.clickStep = 0;
      }
      this.lastClickTime = nowMs;

      const currentNote = D_MIN_PENTATONIC[this.clickStep % D_MIN_PENTATONIC.length];
      const isDownbeat = this.clickStep % 4 === 0;
      this.clickStep = (this.clickStep + 1) % D_MIN_PENTATONIC.length;

      const now = this.ctx.currentTime;

      // Layer 1: High-Frequency Mechanical Transient (The Switch Latch Snap)
      const oscSnap = this.ctx.createOscillator();
      const gainSnap = this.ctx.createGain();
      oscSnap.type = "sine";
      oscSnap.frequency.setValueAtTime(1750 * (isDownbeat ? 1.15 : 1.0), now);
      oscSnap.frequency.exponentialRampToValueAtTime(320, now + 0.014);

      gainSnap.gain.setValueAtTime(0.09 * intensity, now);
      gainSnap.gain.exponentialRampToValueAtTime(0.0001, now + 0.016);

      oscSnap.connect(gainSnap);
      gainSnap.connect(this.ctx.destination);
      oscSnap.start(now);
      oscSnap.stop(now + 0.018);

      // Layer 2: Tactile Acoustic Noise Crack
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.012);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(isDownbeat ? 3600 : 4800, now);
      filter.Q.setValueAtTime(3.0, now);

      const gainNoise = this.ctx.createGain();
      gainNoise.gain.setValueAtTime(0.04 * intensity, now);
      gainNoise.gain.exponentialRampToValueAtTime(0.0001, now + 0.014);

      noise.connect(filter);
      filter.connect(gainNoise);
      gainNoise.connect(this.ctx.destination);
      noise.start(now);

      // Layer 3: Warm Rhythmic Pitch Body (D-Minor Pentatonic Resonance)
      const oscBody = this.ctx.createOscillator();
      const gainBody = this.ctx.createGain();
      oscBody.type = isDownbeat ? "triangle" : "sine";
      oscBody.frequency.setValueAtTime(currentNote.freq, now + 0.004);
      oscBody.frequency.exponentialRampToValueAtTime(currentNote.freq * 0.92, now + 0.055);

      gainBody.gain.setValueAtTime(0.12 * intensity, now + 0.004);
      gainBody.gain.exponentialRampToValueAtTime(0.0001, now + 0.06);

      oscBody.connect(gainBody);
      gainBody.connect(this.ctx.destination);
      oscBody.start(now + 0.004);
      oscBody.stop(now + 0.065);

      // Trigger reactive visual pulse on the 3D wireframe mesh
      this.triggerBeatPulse(0.35 + (isDownbeat ? 0.35 : 0.15));
    } catch {}
  }

  // Mechanical chronometer micro-tick / subtle button detent
  public tick() {
    this.rhythmicClick(0.75);
  }

  // Snappy analog mechanical relay
  public relay() {
    this.rhythmicClick(1.0);
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

      this.triggerBeatPulse(0.4);
    } catch {}
  }

  public thock() {
    this.chessMove(4);
  }

  // Alert check ping
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

      this.triggerBeatPulse(0.6);
    } catch {}
  }

  // Opponent forced reply thud
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

      this.triggerBeatPulse(0.5);
    } catch {}
  }

  // Triumphant checkmate ascending Nolan chord
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

  // Tab switch pitched by index (0-3)
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

      this.triggerBeatPulse(0.5);
    } catch {}
  }

  // Error dissonance
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

      this.triggerBeatPulse(0.3);
    } catch {}
  }

  // Subtle bass pulse
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

      this.triggerBeatPulse(0.4);
    } catch {}
  }

  // Tenet Temporal Turnstile Inversion Sweep
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

      this.triggerBeatPulse(0.8);
    } catch {}
  }

  // Interactive 3D Wireframe Canvas Spatial Beat Click
  public spatialBeat(normX: number, normY: number): NoteInfo {
    const clampedX = Math.max(0, Math.min(0.999, normX));
    const noteIdx = Math.floor(clampedX * D_MIN_PENTATONIC.length);
    const note = D_MIN_PENTATONIC[noteIdx] || D_MIN_PENTATONIC[0];

    this.rhythmicClick(0.9);
    return note;
  }

  // Beat pulse reading for 3D hero wireframe mesh
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

  // Backward-compatibility safe stubs
  public isOgBeatActive(): boolean {
    return false;
  }
  public isRhythmActive(): boolean {
    return false;
  }
  public toggleOgBeat(): boolean {
    return false;
  }
  public stopOgBeat(): void {}
  public playOgBeat(): void {}
  public triggerPad(): void {
    this.rhythmicClick();
  }
}

export const sound = new SoundEngine();
