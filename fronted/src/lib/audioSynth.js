// Web Audio API procedural soundscape generator for Hacker House Goa "BEACH MIX"

class BeachSoundscapeEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.volume = 0.5;
    this.mode = 'waves'; // 'waves', 'lofi', 'breeze'
    this.analyser = null;
    this.gainNode = null;
    this.activeNodes = [];
    this.intervalId = null;
  }

  initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Pink noise buffer generator for realistic ocean waves
  createNoiseBuffer() {
    const bufferSize = this.ctx.sampleRate * 4;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  startOceanWaveLayer() {
    const noiseBuffer = this.createNoiseBuffer();
    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    noiseSource.loop = true;

    // Filter to shape into sea surf
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, this.ctx.currentTime);

    // LFO for wave modulation
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // ~8 sec wave cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(320, this.ctx.currentTime);

    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);

    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(0.8, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(waveGain);
    waveGain.connect(this.analyser);
    this.analyser.connect(this.gainNode);

    lfo.start();
    noiseSource.start();

    this.activeNodes.push(noiseSource, lfo, filter, waveGain, lfoGain);
  }

  startSunsetChordsLayer() {
    // E minor 9 / A major 9 chill sunset frequencies
    const chordFrequencies = [164.81, 196.00, 246.94, 293.66, 370.00];
    
    chordFrequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, this.ctx.currentTime);

      const chordGain = this.ctx.createGain();
      chordGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      // Tremolo
      const tremolo = this.ctx.createOscillator();
      tremolo.frequency.setValueAtTime(0.2 + idx * 0.05, this.ctx.currentTime);
      const tremoloGain = this.ctx.createGain();
      tremoloGain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      tremolo.connect(tremoloGain);
      tremoloGain.connect(chordGain.gain);

      osc.connect(filter);
      filter.connect(chordGain);
      chordGain.connect(this.analyser);

      osc.start();
      tremolo.start();
      this.activeNodes.push(osc, tremolo, filter, chordGain, tremoloGain);
    });
  }

  play(mode = 'waves') {
    this.initContext();
    this.stop();
    this.mode = mode;
    this.isPlaying = true;

    if (mode === 'waves') {
      this.startOceanWaveLayer();
    } else if (mode === 'lofi') {
      this.startOceanWaveLayer();
      this.startSunsetChordsLayer();
    } else if (mode === 'breeze') {
      this.startSunsetChordsLayer();
    }
  }

  stop() {
    this.activeNodes.forEach(node => {
      try {
        if (node.stop) node.stop();
        if (node.disconnect) node.disconnect();
      } catch {
        // ignore already stopped
      }
    });
    this.activeNodes = [];
    this.isPlaying = false;
  }

  setVolume(vol) {
    this.volume = vol;
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  getVisualizerData() {
    if (!this.analyser || !this.isPlaying) {
      return new Uint8Array(16);
    }
    const buffer = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(buffer);
    return buffer.slice(0, 16);
  }
}

export const beachSynth = new BeachSoundscapeEngine();
