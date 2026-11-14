// Cute Web Audio API Sound Effects & Ambient Music Synthesizer
// Completely offline, zero external bandwidth, works everywhere seamlessly

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Gentle cute pop for buttons and clicks
export function playPopSound(freq = 440) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.08);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch (e) {
    // Graceful fallback if audio is muted/blocked
  }
}

// Sparkle chime when picking options
export function playSparkleSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      const noteTime = now + idx * 0.04;

      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.08, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 0.25);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.26);
    });
  } catch (e) {}
}

// Romantic celebratory chime for success
export function playSuccessChime() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    // Sweet romantic melody: F4, A4, C5, E5, G5, C6
    const notes = [349.23, 440.0, 523.25, 659.25, 783.99, 1046.5];
    const now = ctx.currentTime;

    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      const noteTime = now + idx * 0.09;

      osc.frequency.setValueAtTime(freq, noteTime);
      gain.gain.setValueAtTime(0.15, noteTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, noteTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(noteTime);
      osc.stop(noteTime + 0.65);
    });
  } catch (e) {}
}

// Ambient Romantic Lofi Melody Loop
class RomanticMusicPlayer {
  constructor() {
    this.isPlaying = false;
    this.intervalId = null;
    this.currentStep = 0;
    // Romantic chords in F Major / D Minor (gentle dream-like progression)
    // Fmaj7 -> Am7 -> Bbmaj7 -> C7
    this.progression = [
      [349.23, 440.0, 523.25, 659.25], // Fmaj7 (F, A, C, E)
      [329.63, 440.0, 523.25, 659.25], // Am7/E (E, A, C, E)
      [233.08, 349.23, 440.0, 523.25], // Bbmaj7 (Bb, F, A, C)
      [261.63, 329.63, 392.0, 493.88], // C/E or Cadd9 (C, E, G, B)
    ];
  }

  playChord(frequencies) {
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;
    frequencies.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      // Low pass filter for soft lofi warmth
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, now);

      const delay = i * 0.12;
      const startTime = now + delay;
      gain.gain.setValueAtTime(0.001, startTime);
      gain.gain.linearRampToValueAtTime(0.045, startTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + 2.4);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 2.5);
    });
  }

  start() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    const ctx = getAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }

    // Play immediately, then interval every 2.4 seconds
    this.playChord(this.progression[this.currentStep]);
    this.currentStep = (this.currentStep + 1) % this.progression.length;

    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      this.playChord(this.progression[this.currentStep]);
      this.currentStep = (this.currentStep + 1) % this.progression.length;
    }, 2400);
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }
}

export const musicPlayer = new RomanticMusicPlayer();

