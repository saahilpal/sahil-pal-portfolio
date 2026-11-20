// Pure Web Audio API Synthesizer + Studio-Grade OG Beats & Launchpad Engine
// Zero external libraries — Preloaded 16-bit 44.1kHz Studio WAVs + Full Dynamic Fallback

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

export type LaunchpadPadId =
  | "kick"
  | "snare"
  | "clap"
  | "hihat"
  | "openhat"
  | "subbass"
  | "chord"
  | "scratch";

export interface LaunchpadPadInfo {
  id: LaunchpadPadId;
  label: string;
  key: string;
  color: string;
}

export const LAUNCHPAD_PADS: LaunchpadPadInfo[] = [
  { id: "kick", label: "808 KICK", key: "Q", color: "#CCFF00" },
  { id: "snare", label: "BOOM SNARE", key: "W", color: "#00E5FF" },
  { id: "clap", label: "808 CLAP", key: "E", color: "#FF3B30" },
  { id: "hihat", label: "TIGHT HAT", key: "R", color: "#F4F4F0" },
  { id: "openhat", label: "OPEN SIZZLE", key: "A", color: "#F4F4F0" },
  { id: "subbass", label: "SUB DROP", key: "S", color: "#CCFF00" },
  { id: "chord", label: "RHODES FM", key: "D", color: "#3B82F6" },
  { id: "scratch", label: "TURNTABLE", key: "F", color: "#00E5FF" },
];

export type OgBeatId = "boombap" | "breakbeat" | "chrono" | "lofi";

export interface OgBeatPreset {
  id: OgBeatId;
  title: string;
  bpm: number;
  description: string;
  file: string;
}

export const OG_BEATS: OgBeatPreset[] = [
  {
    id: "boombap",
    title: "01 // OG BOOM-BAP",
    bpm: 90,
    description: "90s MPC vinyl crunch, swinging hats & heavy 808 sub",
    file: "/audio/beat-boombap.wav",
  },
  {
    id: "breakbeat",
    title: "02 // CYBER BREAKS",
    bpm: 128,
    description: "Syncopated rolling breakbeat with booming 808 subs",
    file: "/audio/beat-breakbeat.wav",
  },
  {
    id: "chrono",
    title: "03 // NOLAN CHRONO",
    bpm: 120,
    description: "Hans Zimmer IMAX ticking chronometer tension pulse",
    file: "/audio/beat-chrono.wav",
  },
  {
    id: "lofi",
    title: "04 // LO-FI D-MINOR",
    bpm: 84,
    description: "Chill Rhodes FM chords, tape hiss & mellow kick",
    file: "/audio/beat-lofi.wav",
  },
];

export type RhythmPatternName = "chrono" | "teenage" | "minimal";

class SoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;

  // Buffer Cache for Audio Files
  private audioBufferCache: Map<string, AudioBuffer> = new Map();
  private isPreloading: boolean = false;

  // Loop Playback State
  private activeLoopSource: AudioBufferSourceNode | null = null;
  private activeLoopGain: GainNode | null = null;
  private currentActiveBeatId: OgBeatId = "boombap";
  private isBeatPlaying: boolean = false;
  private beatBpm: number = 90;
  private beatStepInterval: NodeJS.Timeout | null = null;
  private currentStep: number = 0;

  // Dynamic Visual Pulse
  private beatPulseValue: number = 0;
  private pulseDecayTimer: NodeJS.Timeout | null = null;

  // Subscribers
  private stepListeners: Set<(step: number, isDownbeat: boolean) => void> = new Set();
  private beatStateListeners: Set<(isPlaying: boolean, activeBeatId: OgBeatId, bpm: number) => void> =
    new Set();

  constructor() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sahil_sfx");
      this.enabled = saved !== "off";
      // Preload after first user interaction
      const preloadOnInteraction = () => {
        this.preloadAudioAssets();
        window.removeEventListener("pointerdown", preloadOnInteraction);
        window.removeEventListener("keydown", preloadOnInteraction);
      };
      window.addEventListener("pointerdown", preloadOnInteraction, { passive: true });
      window.addEventListener("keydown", preloadOnInteraction, { passive: true });
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

  // Preload studio audio assets into memory
  public async preloadAudioAssets() {
    if (this.isPreloading || typeof window === "undefined") return;
    this.isPreloading = true;
    this.initCtx();
    if (!this.ctx) return;

    const filesToLoad = [
      "/audio/kick.wav",
      "/audio/snare.wav",
      "/audio/clap.wav",
      "/audio/hihat.wav",
      "/audio/openhat.wav",
      "/audio/subbass.wav",
      "/audio/chord.wav",
      "/audio/scratch.wav",
      "/audio/beat-boombap.wav",
      "/audio/beat-breakbeat.wav",
      "/audio/beat-chrono.wav",
      "/audio/beat-lofi.wav",
    ];

    for (const url of filesToLoad) {
      if (this.audioBufferCache.has(url)) continue;
      try {
        const res = await fetch(url);
        if (res.ok) {
          const arrayBuffer = await res.arrayBuffer();
          if (this.ctx) {
            const audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
            this.audioBufferCache.set(url, audioBuffer);
          }
        }
      } catch {}
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
    } else {
      this.stopOgBeat();
    }
    return this.enabled;
  }

  // ==========================================
  // LAUNCHPAD PAD TRIGGER (ZERO-LATENCY HIT)
  // ==========================================

  public triggerPad(padId: LaunchpadPadId) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    this.triggerBeatPulse(0.95);

    // Play from decoded AudioBuffer if available
    const url = `/audio/${padId}.wav`;
    const buffer = this.audioBufferCache.get(url);

    if (buffer) {
      try {
        const source = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();
        source.buffer = buffer;
        gain.gain.setValueAtTime(0.85, this.ctx.currentTime);
        source.connect(gain);
        gain.connect(this.ctx.destination);
        source.start();
        return;
      } catch {}
    }

    // Dynamic Synthesis Fallback
    const now = this.ctx.currentTime;
    if (padId === "kick") {
      this.synthesizeKick(now, 0.45);
    } else if (padId === "snare") {
      this.synthesizeSnare(now, 0.35);
    } else if (padId === "clap") {
      this.synthesizeClap(now, 0.3);
    } else if (padId === "hihat") {
      this.synthesizeHiHat(now, 0.12, 8500);
    } else if (padId === "openhat") {
      this.synthesizeOpenHat(now, 0.15);
    } else if (padId === "subbass") {
      this.synthesizeSubBass(now, 73.42, 0.5);
    } else if (padId === "chord") {
      this.playChord();
    } else if (padId === "scratch") {
      this.synthesizeScratch(now, 0.35);
    }
  }

  // ==========================================
  // OG BEATS LOOPER ENGINE
  // ==========================================

  public isOgBeatActive(): boolean {
    return this.isBeatPlaying;
  }

  public getActiveBeatId(): OgBeatId {
    return this.currentActiveBeatId;
  }

  public getBeatBpm(): number {
    return this.beatBpm;
  }

  public setBeatBpm(bpm: number) {
    this.beatBpm = Math.max(60, Math.min(180, bpm));
    if (this.isBeatPlaying) {
      // Re-trigger tempo clock
      this.startStepClock();
    }
    this.notifyBeatState();
  }

  public toggleOgBeat(beatId?: OgBeatId): boolean {
    const targetId = beatId || this.currentActiveBeatId;
    if (this.isBeatPlaying && this.currentActiveBeatId === targetId) {
      this.stopOgBeat();
      return false;
    }
    this.playOgBeat(targetId);
    return true;
  }

  public async playOgBeat(beatId: OgBeatId) {
    if (!this.enabled) return;
    this.initCtx();
    if (!this.ctx) return;

    // Stop current beat if running
    this.stopOgBeat();

    const preset = OG_BEATS.find((b) => b.id === beatId) || OG_BEATS[0];
    this.currentActiveBeatId = preset.id;
    this.beatBpm = preset.bpm;
    this.isBeatPlaying = true;
    this.currentStep = 0;

    // 1. Play real audio loop if cached or fetched
    const url = preset.file;
    let buffer = this.audioBufferCache.get(url);

    if (!buffer) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          const arr = await res.arrayBuffer();
          if (this.ctx) {
            buffer = await this.ctx.decodeAudioData(arr);
            this.audioBufferCache.set(url, buffer);
          }
        }
      } catch {}
    }

    if (buffer && this.ctx && this.isBeatPlaying) {
      try {
        const source = this.ctx.createBufferSource();
        const gain = this.ctx.createGain();
        source.buffer = buffer;
        source.loop = true;
        gain.gain.setValueAtTime(0.75, this.ctx.currentTime);
        source.connect(gain);
        gain.connect(this.ctx.destination);
        source.start();

        this.activeLoopSource = source;
        this.activeLoopGain = gain;
      } catch {}
    }

    // 2. Start step clock for 16-step visualizer and audio-reactive animations
    this.startStepClock();
    this.notifyBeatState();
  }

  public stopOgBeat() {
    this.isBeatPlaying = false;
    if (this.activeLoopGain && this.ctx) {
      try {
        // Quick 40ms exponential fade out to avoid pop
        const now = this.ctx.currentTime;
        this.activeLoopGain.gain.setValueAtTime(this.activeLoopGain.gain.value, now);
        this.activeLoopGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        setTimeout(() => {
          if (this.activeLoopSource) {
            try {
              this.activeLoopSource.stop();
              this.activeLoopSource.disconnect();
            } catch {}
            this.activeLoopSource = null;
          }
          this.activeLoopGain = null;
        }, 50);
      } catch {
        this.activeLoopSource = null;
        this.activeLoopGain = null;
      }
    }

    if (this.beatStepInterval) {
      clearInterval(this.beatStepInterval);
      this.beatStepInterval = null;
    }

    this.beatPulseValue = 0;
    this.notifyBeatState();
  }

  private startStepClock() {
    if (this.beatStepInterval) clearInterval(this.beatStepInterval);
    const stepIntervalMs = Math.round((60 / this.beatBpm / 4) * 1000);

    this.beatStepInterval = setInterval(() => {
      if (!this.isBeatPlaying) return;
      const isQuarter = this.currentStep % 4 === 0;
      const isDownbeat = this.currentStep === 0;

      // Audio-reactive visual pulse
      this.triggerBeatPulse(isDownbeat ? 1.0 : isQuarter ? 0.7 : 0.3);

      // If loop buffer was unavailable, fallback to real-time synthesis
      if (!this.activeLoopSource) {
        this.synthesizeLoopFallback(this.currentStep, this.currentActiveBeatId);
      }

      this.stepListeners.forEach((cb) => {
        try {
          cb(this.currentStep, isQuarter);
        } catch {}
      });

      this.currentStep = (this.currentStep + 1) % 16;
    }, stepIntervalMs);
  }

  private synthesizeLoopFallback(step: number, beatId: OgBeatId) {
    if (!this.ctx || !this.enabled) return;
    const now = this.ctx.currentTime;
    if (beatId === "boombap" || beatId === "lofi") {
      if (step === 0 || step === 6 || step === 10) this.synthesizeKick(now, 0.4);
      if (step === 4 || step === 12) this.synthesizeSnare(now, 0.35);
      this.synthesizeHiHat(now, step % 2 === 0 ? 0.08 : 0.04, 7500);
      if (step === 0) this.playChord();
    } else if (beatId === "breakbeat") {
      if (step === 0 || step === 8 || step === 11) this.synthesizeKick(now, 0.45);
      if (step === 4 || step === 12) this.synthesizeSnare(now, 0.38);
      this.synthesizeHiHat(now, 0.06, 9200);
    } else {
      if (step % 4 === 0) this.synthesizeKick(now, 0.4);
      this.synthesizeHiHat(now, 0.08, 9800);
    }
  }

  // Backwards compatibility aliases for previous rhythm implementation
  public isRhythmActive(): boolean {
    return this.isOgBeatActive();
  }
  public getBpm(): number {
    return this.getBeatBpm();
  }
  public setBpm(newBpm: number) {
    this.setBeatBpm(newBpm);
  }
  public getPattern(): RhythmPatternName {
    return this.currentActiveBeatId === "breakbeat"
      ? "teenage"
      : this.currentActiveBeatId === "chrono"
      ? "chrono"
      : "minimal";
  }
  public setPattern(pattern: RhythmPatternName) {
    if (pattern === "teenage") this.playOgBeat("breakbeat");
    else if (pattern === "chrono") this.playOgBeat("chrono");
    else this.playOgBeat("boombap");
  }
  public toggleRhythm(): boolean {
    return this.toggleOgBeat();
  }
  public startRhythm(customBpm?: number) {
    if (customBpm) this.beatBpm = customBpm;
    this.playOgBeat(this.currentActiveBeatId);
  }
  public stopRhythm() {
    this.stopOgBeat();
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
    const wrapped = (playing: boolean, _beatId: OgBeatId, currentBpm: number) => {
      listener(playing, currentBpm, this.getPattern());
    };
    this.beatStateListeners.add(wrapped as unknown as (p: boolean, id: OgBeatId, b: number) => void);
    listener(this.isBeatPlaying, this.beatBpm, this.getPattern());
    return () => {
      this.beatStateListeners.delete(wrapped as unknown as (p: boolean, id: OgBeatId, b: number) => void);
    };
  }

  public subscribeBeatState(
    listener: (isPlaying: boolean, activeBeatId: OgBeatId, bpm: number) => void
  ): () => void {
    this.beatStateListeners.add(listener);
    listener(this.isBeatPlaying, this.currentActiveBeatId, this.beatBpm);
    return () => {
      this.beatStateListeners.delete(listener);
    };
  }

  private notifyBeatState() {
    this.beatStateListeners.forEach((listener) => {
      try {
        listener(this.isBeatPlaying, this.currentActiveBeatId, this.beatBpm);
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

  // ==========================================
  // SYNTHESIS VOICES (DYNAMIC FALLBACK)
  // ==========================================

  private synthesizeKick(time: number, gainVal: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(155, time);
    osc.frequency.exponentialRampToValueAtTime(42, time + 0.12);

    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(time);
    osc.stop(time + 0.24);
  }

  private synthesizeSnare(time: number, gainVal: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(185, time);
    osc.frequency.exponentialRampToValueAtTime(120, time + 0.08);
    oscGain.gain.setValueAtTime(gainVal * 0.6, time);
    oscGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
    osc.connect(oscGain);
    oscGain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.11);

    // Snare snap noise
    this.synthesizeHiHat(time, gainVal * 0.8, 2500);
  }

  private synthesizeClap(time: number, gainVal: number) {
    if (!this.ctx) return;
    this.synthesizeHiHat(time, gainVal, 1800);
    this.synthesizeHiHat(time + 0.012, gainVal * 0.7, 2200);
    this.synthesizeHiHat(time + 0.024, gainVal * 0.9, 2000);
  }

  private synthesizeHiHat(time: number, gainVal: number, cutoff: number) {
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.025);
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
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.035);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(time);
  }

  private synthesizeOpenHat(time: number, gainVal: number) {
    if (!this.ctx) return;
    const bufferSize = Math.floor(this.ctx.sampleRate * 0.25);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "highpass";
    filter.frequency.setValueAtTime(6500, time);
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.25);
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    noise.start(time);
  }

  private synthesizeSubBass(time: number, freq: number, gainVal: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, time);
    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.38);
  }

  private synthesizeScratch(time: number, gainVal: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(320, time);
    osc.frequency.linearRampToValueAtTime(1400, time + 0.08);
    osc.frequency.linearRampToValueAtTime(400, time + 0.16);
    gain.gain.setValueAtTime(gainVal, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(time);
    osc.stop(time + 0.2);
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
        this.triggerPad("hihat");
        this.playNote(noteIdx);
      } else if (clampedY < 0.66) {
        this.triggerPad("chord");
      } else {
        this.triggerPad("kick");
      }

      this.triggerBeatPulse(0.75);
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
