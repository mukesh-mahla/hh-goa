import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Play, Pause, ChevronUp, Disc, Waves, Sparkles, Wind } from 'lucide-react';
import { beachSynth } from '../lib/audioSynth';

export default function BeachAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [mode, setMode] = useState('lofi');
  const [isOpen, setIsOpen] = useState(false);
  const [vizBars, setVizBars] = useState([12, 24, 18, 30, 20]);
  const animFrameRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      beachSynth.stop();
      setIsPlaying(false);
    } else {
      beachSynth.play(mode);
      setIsPlaying(true);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (isPlaying) {
      beachSynth.play(newMode);
    }
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    beachSynth.setVolume(val);
  };

  // Audio Visualizer Loop
  useEffect(() => {
    const updateViz = () => {
      if (isPlaying) {
        const raw = beachSynth.getVisualizerData();
        const bars = [
          Math.max(6, (raw[0] || 0) / 7),
          Math.max(6, (raw[2] || 0) / 6),
          Math.max(6, (raw[4] || 0) / 5),
          Math.max(6, (raw[6] || 0) / 6),
          Math.max(6, (raw[8] || 0) / 7),
        ];
        setVizBars(bars);
      } else {
        setVizBars([6, 6, 6, 6, 6]);
      }
      animFrameRef.current = requestAnimationFrame(updateViz);
    };

    animFrameRef.current = requestAnimationFrame(updateViz);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Expanded Audio Settings Modal */}
      {isOpen && (
        <div className="mb-3 p-4 w-72 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-hh-indigo text-hh-indigo shadow-[6px_6px_0_#2e2870] animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-center justify-between pb-3 border-b border-hh-indigo/15">
            <div className="flex items-center gap-2">
              <Disc className={`w-4 h-4 text-hh-pink ${isPlaying ? 'animate-spin' : ''}`} />
              <span className="font-mono text-xs font-black tracking-wider text-hh-indigo">
                GLITCH PARADISE MIX
              </span>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-hh-lavender-light border border-hh-indigo text-hh-indigo">
              WEB AUDIO
            </span>
          </div>

          {/* Mode Selector */}
          <div className="mt-3 space-y-2">
            <label className="font-mono text-[10px] font-black tracking-widest text-hh-indigo/70 uppercase">
              Vibe Mode
            </label>
            <div className="grid grid-cols-3 gap-1.5">
              <button
                type="button"
                onClick={() => handleModeChange('waves')}
                className={`p-2 rounded-xl text-center font-mono text-[11px] flex flex-col items-center gap-1 border-2 transition-all ${
                  mode === 'waves'
                    ? 'bg-hh-yellow text-hh-indigo border-hh-indigo font-black shadow-[2px_2px_0_#2e2870]'
                    : 'bg-hh-lavender-light text-hh-indigo border-hh-indigo/20 hover:border-hh-indigo'
                }`}
              >
                <Waves className="w-4 h-4" />
                <span>Waves</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('lofi')}
                className={`p-2 rounded-xl text-center font-mono text-[11px] flex flex-col items-center gap-1 border-2 transition-all ${
                  mode === 'lofi'
                    ? 'bg-hh-pink text-white border-hh-indigo font-black shadow-[2px_2px_0_#2e2870]'
                    : 'bg-hh-lavender-light text-hh-indigo border-hh-indigo/20 hover:border-hh-indigo'
                }`}
              >
                <Sparkles className="w-4 h-4" />
                <span>Sunset</span>
              </button>

              <button
                type="button"
                onClick={() => handleModeChange('breeze')}
                className={`p-2 rounded-xl text-center font-mono text-[11px] flex flex-col items-center gap-1 border-2 transition-all ${
                  mode === 'breeze'
                    ? 'bg-hh-mint text-hh-indigo border-hh-indigo font-black shadow-[2px_2px_0_#2e2870]'
                    : 'bg-hh-lavender-light text-hh-indigo border-hh-indigo/20 hover:border-hh-indigo'
                }`}
              >
                <Wind className="w-4 h-4" />
                <span>Breeze</span>
              </button>
            </div>
          </div>

          {/* Volume Control */}
          <div className="mt-4 pt-3 border-t border-hh-indigo/15">
            <div className="flex items-center justify-between mb-1.5 font-mono text-[10px] text-hh-indigo font-bold">
              <span className="flex items-center gap-1">
                {volume === 0 ? <VolumeX className="w-3.5 h-3.5 text-hh-pink" /> : <Volume2 className="w-3.5 h-3.5 text-hh-indigo" />}
                VOLUME
              </span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-hh-pink cursor-pointer h-1.5 bg-hh-lavender rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Main Pill Button */}
      <div className="flex items-center bg-white/90 backdrop-blur-md border-2 border-hh-indigo rounded-full px-3.5 py-2 shadow-[4px_4px_0_#2e2870] hover:scale-105 transition-all">
        {/* Play/Pause & Vinyl Icon */}
        <button
          type="button"
          onClick={togglePlay}
          className="flex items-center gap-2.5 group focus:outline-none"
          title={isPlaying ? 'Pause Beach Sound' : 'Play Beach Sound'}
        >
          {/* Animated Vinyl Ring */}
          <div className="relative w-7 h-7 rounded-full bg-hh-lavender border-2 border-hh-indigo flex items-center justify-center">
            <div className={`w-3.5 h-3.5 rounded-full bg-hh-pink flex items-center justify-center ${isPlaying ? 'animate-spin' : ''}`}>
              <div className="w-1 h-1 rounded-full bg-white"></div>
            </div>
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border border-hh-pink/60 animate-ping"></span>
            )}
          </div>

          <span className="font-mono text-xs font-black tracking-widest text-hh-indigo">
            BEACH MIX
          </span>

          {/* Frequency Equalizer Visualizer */}
          <div className="flex items-end gap-0.5 h-4 px-1">
            {vizBars.map((h, i) => (
              <span
                key={i}
                className="w-1 bg-hh-pink rounded-full transition-all duration-75"
                style={{ height: `${h}px` }}
              ></span>
            ))}
          </div>
        </button>

        {/* Expand / Collapse Options */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="ml-2 pl-2 border-l-2 border-hh-indigo/30 text-hh-indigo hover:text-hh-pink transition-colors"
        >
          <ChevronUp className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      </div>
    </div>
  );
}
