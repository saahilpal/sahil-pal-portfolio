const fs = require("fs");
const path = require("path");

const AUDIO_DIR = path.join(__dirname, "../public/audio");
if (!fs.existsSync(AUDIO_DIR)) {
  fs.mkdirSync(AUDIO_DIR, { recursive: true });
}

const SAMPLE_RATE = 44100;

function createWavBuffer(samples, sampleRate = SAMPLE_RATE) {
  const numChannels = 1;
  const bytesPerSample = 2; // 16-bit
  const blockAlign = numChannels * bytesPerSample;
  const byteRate = sampleRate * blockAlign;
  const dataSize = samples.length * bytesPerSample;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVE", 8);

  // fmt
  buffer.write("fmt ", 12);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20); // PCM
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // 16 bits

  // data
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    // Soft saturation for tape warmth
    const saturated = Math.tanh(samples[i] * 1.2);
    const s = Math.max(-1, Math.min(1, saturated));
    const val = s < 0 ? s * 32768 : s * 32767;
    buffer.writeInt16LE(Math.floor(val), offset);
    offset += 2;
  }
  return buffer;
}

// 1. Heavy 808 Sub Kick
function generateKick(duration = 0.45) {
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Pitch drops from 160Hz down to 42Hz exponentially
    const freq = 42 + 118 * Math.exp(-t * 28);
    const phase = 2 * Math.PI * freq * t;
    const body = Math.sin(phase) * Math.exp(-t * 6.5);
    // Transient click
    const click = (Math.random() * 2 - 1) * Math.exp(-t * 120) * 0.4;
    out[i] = (body + click) * 0.95;
  }
  return out;
}

// 2. Boom-Bap Snare
function generateSnare(duration = 0.3) {
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Tone component: 185Hz drop to 120Hz
    const toneFreq = 120 + 65 * Math.exp(-t * 30);
    const tone = Math.sin(2 * Math.PI * toneFreq * t) * Math.exp(-t * 14) * 0.5;
    // Snare wires (shaped noise)
    const noise = (Math.random() * 2 - 1) * Math.exp(-t * 11) * 0.7;
    out[i] = (tone + noise) * 0.9;
  }
  return out;
}

// 3. Staggered 808 Clap
function generateClap(duration = 0.35) {
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Pre-burst clicks at 0ms, 12ms, 24ms, then body at 35ms
    let clickAmp = 0;
    if (t < 0.012) clickAmp = Math.exp(-t * 250);
    else if (t < 0.024) clickAmp = Math.exp(-(t - 0.012) * 250);
    else if (t < 0.036) clickAmp = Math.exp(-(t - 0.024) * 250);
    else clickAmp = Math.exp(-(t - 0.036) * 12);

    const noise = (Math.random() * 2 - 1) * clickAmp * 0.85;
    out[i] = noise;
  }
  return out;
}

// 4. Closed Hi-Hat
function generateHiHat(duration = 0.08) {
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    // High frequency metallic blend
    const m1 = Math.sin(2 * Math.PI * 7200 * t);
    const m2 = Math.sin(2 * Math.PI * 9400 * t);
    const noise = Math.random() * 2 - 1;
    const metallic = (m1 * 0.3 + m2 * 0.3 + noise * 0.7) * Math.exp(-t * 55);
    out[i] = metallic * 0.7;
  }
  return out;
}

// 5. Open Hi-Hat
function generateOpenHat(duration = 0.4) {
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const m1 = Math.sin(2 * Math.PI * 6800 * t);
    const m2 = Math.sin(2 * Math.PI * 8900 * t);
    const noise = Math.random() * 2 - 1;
    const ring = (m1 * 0.35 + m2 * 0.35 + noise * 0.6) * Math.exp(-t * 9);
    out[i] = ring * 0.65;
  }
  return out;
}

// 6. Deep D-Minor Sub Bass Pluck
function generateSubBass(duration = 0.6) {
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(numSamples);
  const root = 73.42; // D2 sub
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    const f1 = Math.sin(2 * Math.PI * root * t);
    const f2 = Math.sin(2 * Math.PI * root * 2 * t) * 0.35;
    const env = Math.exp(-t * 3.5);
    out[i] = (f1 + f2) * env * 0.9;
  }
  return out;
}

// 7. Lush D-Minor FM Rhodes Chord (D3, F3, A3, C4, E4)
function generateRhodesChord(duration = 0.9) {
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(numSamples);
  const freqs = [146.83, 174.61, 220.0, 261.63, 329.63];
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    let sum = 0;
    freqs.forEach((f, idx) => {
      // FM synthesis: carrier + modulator
      const mod = Math.sin(2 * Math.PI * f * 2 * t) * f * 0.5 * Math.exp(-t * 4);
      const carrier = Math.sin(2 * Math.PI * f * t + mod * 0.005);
      sum += carrier * (1 / (idx + 1.2));
    });
    out[i] = sum * Math.exp(-t * 2.2) * 0.6;
  }
  return out;
}

// 8. Vinyl Scratch / Turntable DJ Sweep
function generateScratch(duration = 0.28) {
  const numSamples = Math.floor(SAMPLE_RATE * duration);
  const out = new Float32Array(numSamples);
  for (let i = 0; i < numSamples; i++) {
    const t = i / SAMPLE_RATE;
    // Pitch chirp up then pull back down
    let freq = 300;
    if (t < 0.12) {
      freq = 300 + 1400 * (t / 0.12);
    } else {
      freq = 1700 - 1300 * ((t - 0.12) / 0.16);
    }
    const osc = Math.sin(2 * Math.PI * freq * t);
    const grit = (Math.random() * 2 - 1) * 0.25;
    const env = Math.sin((t / duration) * Math.PI);
    out[i] = (osc + grit) * env * 0.75;
  }
  return out;
}

// ==============================================
// 4 FULL MULTI-BAR OG BEAT LOOPS
// ==============================================

// Helper: Mix a sample into a multi-bar buffer
function mixAt(track, sample, startIndex, gain = 1.0) {
  for (let i = 0; i < sample.length; i++) {
    const targetIdx = startIndex + i;
    if (targetIdx < track.length) {
      track[targetIdx] += sample[i] * gain;
    }
  }
}

// A. OG Boom-Bap Loop (90 BPM, 2 bars = 8 beats)
function generateBoomBapLoop() {
  const bpm = 90;
  const beats = 8;
  const beatSec = 60 / bpm;
  const totalSec = beats * beatSec; // ~5.333s
  const numSamples = Math.floor(SAMPLE_RATE * totalSec);
  const loop = new Float32Array(numSamples);

  const kick = generateKick(0.35);
  const snare = generateSnare(0.25);
  const hat = generateHiHat(0.06);
  const openHat = generateOpenHat(0.3);
  const sub = generateSubBass(0.45);
  const chord = generateRhodesChord(0.7);

  // 16 steps per bar (32 steps total, 16th notes)
  const stepSec = beatSec / 4;

  // Add subtle vinyl floor noise
  for (let i = 0; i < numSamples; i++) {
    loop[i] = (Math.random() * 2 - 1) * 0.015;
  }

  // 32-step grid with authentic 15% boom-bap shuffle on even 16ths
  for (let step = 0; step < 32; step++) {
    let t = step * stepSec;
    if (step % 2 !== 0) {
      t += stepSec * 0.14; // MPC swing
    }
    const idx = Math.floor(t * SAMPLE_RATE);

    // Hi-hats on all 16ths with velocity groove
    const hatVol = step % 4 === 2 ? 0.75 : step % 2 === 0 ? 0.5 : 0.35;
    mixAt(loop, hat, idx, hatVol);

    // Kicks: 0, 6, 14, 16, 22, 28
    if ([0, 6, 14, 16, 22, 28].includes(step)) {
      mixAt(loop, kick, idx, 0.95);
      mixAt(loop, sub, idx, 0.6);
    }

    // Snares: 4, 12, 20, 28
    if ([4, 12, 20].includes(step)) {
      mixAt(loop, snare, idx, 0.9);
    }

    // Open hat on upbeats
    if ([10, 26].includes(step)) {
      mixAt(loop, openHat, idx, 0.5);
    }

    // Rhodes Chords on 0 and 16
    if (step === 0 || step === 16) {
      mixAt(loop, chord, idx, 0.45);
    }
  }

  return loop;
}

// B. Cyber Breakbeat Loop (128 BPM, 2 bars = 8 beats)
function generateBreakbeatLoop() {
  const bpm = 128;
  const beats = 8;
  const beatSec = 60 / bpm;
  const totalSec = beats * beatSec;
  const numSamples = Math.floor(SAMPLE_RATE * totalSec);
  const loop = new Float32Array(numSamples);

  const kick = generateKick(0.28);
  const snare = generateSnare(0.2);
  const clap = generateClap(0.22);
  const hat = generateHiHat(0.05);
  const sub = generateSubBass(0.35);

  const stepSec = beatSec / 4;

  for (let step = 0; step < 32; step++) {
    const idx = Math.floor(step * stepSec * SAMPLE_RATE);

    // Rapid hi-hats
    mixAt(loop, hat, idx, step % 2 === 0 ? 0.55 : 0.3);

    // Heavy syncopated breakbeat kicks: 0, 8, 11, 16, 24, 27
    if ([0, 8, 11, 16, 24, 27].includes(step)) {
      mixAt(loop, kick, idx, 0.95);
      mixAt(loop, sub, idx, 0.55);
    }

    // Snare snaps: 4, 12, 20, 28 + ghost notes
    if ([4, 12, 20, 28].includes(step)) {
      mixAt(loop, snare, idx, 0.9);
      mixAt(loop, clap, idx, 0.4);
    }
    // Ghost snares
    if ([7, 15, 23, 31].includes(step)) {
      mixAt(loop, snare, idx, 0.35);
    }
  }

  return loop;
}

// C. Nolan Chrono-Pulse Loop (120 BPM, 2 bars = 8 beats)
function generateChronoLoop() {
  const bpm = 120;
  const beats = 8;
  const beatSec = 60 / bpm;
  const totalSec = beats * beatSec;
  const numSamples = Math.floor(SAMPLE_RATE * totalSec);
  const loop = new Float32Array(numSamples);

  const kick = generateKick(0.35);
  const hat = generateHiHat(0.04);
  const sub = generateSubBass(0.4);

  const stepSec = beatSec / 4;

  for (let step = 0; step < 32; step++) {
    const idx = Math.floor(step * stepSec * SAMPLE_RATE);

    // Relentless chronometer pocket-watch ticking
    const isBeat = step % 4 === 0;
    mixAt(loop, hat, idx, isBeat ? 0.75 : 0.4);

    // Four-on-the-floor sub impact
    if (step % 4 === 0) {
      mixAt(loop, kick, idx, 0.85);
      mixAt(loop, sub, idx, 0.5);
    }
  }

  return loop;
}

// D. Lo-Fi D-Minor Chill (84 BPM, 2 bars = 8 beats)
function generateLofiLoop() {
  const bpm = 84;
  const beats = 8;
  const beatSec = 60 / bpm;
  const totalSec = beats * beatSec;
  const numSamples = Math.floor(SAMPLE_RATE * totalSec);
  const loop = new Float32Array(numSamples);

  const kick = generateKick(0.3);
  const clap = generateClap(0.25);
  const hat = generateHiHat(0.05);
  const chord = generateRhodesChord(0.85);
  const sub = generateSubBass(0.4);

  const stepSec = beatSec / 4;

  // Vinyl surface hum
  for (let i = 0; i < numSamples; i++) {
    loop[i] = (Math.random() * 2 - 1) * 0.02;
  }

  for (let step = 0; step < 32; step++) {
    let t = step * stepSec;
    if (step % 2 !== 0) t += stepSec * 0.16; // heavy lofi swing
    const idx = Math.floor(t * SAMPLE_RATE);

    mixAt(loop, hat, idx, step % 2 === 0 ? 0.4 : 0.2);

    if ([0, 10, 16, 26].includes(step)) {
      mixAt(loop, kick, idx, 0.85);
      mixAt(loop, sub, idx, 0.5);
    }

    if ([4, 12, 20, 28].includes(step)) {
      mixAt(loop, clap, idx, 0.75);
    }

    if (step === 0 || step === 16) {
      mixAt(loop, chord, idx, 0.6);
    }
  }

  return loop;
}

// Generate and write all files
const files = [
  // 8 Launchpad Drum Hits
  { name: "kick.wav", data: generateKick() },
  { name: "snare.wav", data: generateSnare() },
  { name: "clap.wav", data: generateClap() },
  { name: "hihat.wav", data: generateHiHat() },
  { name: "openhat.wav", data: generateOpenHat() },
  { name: "subbass.wav", data: generateSubBass() },
  { name: "chord.wav", data: generateRhodesChord() },
  { name: "scratch.wav", data: generateScratch() },

  // 4 Full Multi-Bar OG Beat Loops
  { name: "beat-boombap.wav", data: generateBoomBapLoop() },
  { name: "beat-breakbeat.wav", data: generateBreakbeatLoop() },
  { name: "beat-chrono.wav", data: generateChronoLoop() },
  { name: "beat-lofi.wav", data: generateLofiLoop() },
];

console.log("Synthesizing studio-grade WAV samples and OG beats...");
files.forEach((f) => {
  const filePath = path.join(AUDIO_DIR, f.name);
  const wavBuffer = createWavBuffer(f.data);
  fs.writeFileSync(filePath, wavBuffer);
  console.log(`✓ Generated ${f.name} (${(wavBuffer.length / 1024).toFixed(1)} KB)`);
});
console.log("All audio assets successfully written to public/audio/!");
