import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Heart, Radio, Sparkles, Disc, Flame } from 'lucide-react';

export const InteractivePlayerPreview: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(48);
  const [isLiked, setIsLiked] = useState(true);
  const duration = 214; // 3:34

  // Simulated playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= duration ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, duration]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Generate simulated waveform bars
  const totalBars = 64;
  const bars = Array.from({ length: totalBars }, (_, i) => {
    const raw = Math.sin(i * 0.25) * Math.cos(i * 0.1) * 0.7 + 0.3;
    return Math.max(0.15, Math.min(1.0, Math.abs(raw)));
  });

  const progressPercent = (currentTime / duration) * 100;
  const activeBarIndex = Math.floor((currentTime / duration) * totalBars);

  return (
    <section id="demo" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Experience the Interface
          </h2>
          <p className="text-neutral-400 text-sm mt-2">
            Click anywhere on the waveform or controls to test Purrsonica's live playback engine.
          </p>
        </div>

        {/* Simulated Purrsonica Window Frame */}
        <div className="relative rounded-2xl glass-panel shadow-2xl border border-white/10 overflow-hidden group">
          {/* Top Titlebar */}
          <div className="h-10 bg-[#121216] border-b border-white/5 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] font-medium text-neutral-400 ml-2">Purrsonica — Local Player</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-neutral-400">
                120 FPS Ghost Virtualization
              </span>
            </div>
          </div>

          {/* Player Hero Deck */}
          <div className="p-6 sm:p-8 bg-gradient-to-b from-[#141419] to-[#0d0d10] flex flex-col md:flex-row items-center gap-8">
            {/* Album Cover Art */}
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-xl overflow-hidden shadow-2xl border border-white/10 flex-shrink-0 bg-neutral-900 group/art">
              <div
                className="w-full h-full flex flex-col items-center justify-center p-6 text-center transition-transform group-hover/art:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #1e1b4b 0%, #0f172a 50%, #064e3b 100%)',
                }}
              >
                <Disc className="w-16 h-16 text-white/40 mb-2 animate-spin-slow" />
                <span className="text-xs font-bold text-white tracking-wide">CYBER PURR</span>
                <span className="text-[10px] text-white/60">FLAC 24-bit / 96kHz</span>
              </div>

              {/* Floating Discord Badge */}
              <div className="absolute top-2 right-2 px-2 py-1 rounded-md bg-[#5865F2]/90 backdrop-blur text-[10px] font-bold text-white flex items-center gap-1 shadow-lg">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>Discord RPC</span>
              </div>
            </div>

            {/* Track Info & Interactive Waveform */}
            <div className="flex-1 w-full flex flex-col justify-between">
              {/* Title, Artist, & DJ Badges */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl sm:text-2xl font-black text-white">Midnight Drive</h3>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors cursor-pointer"
                    >
                      <Heart
                        className={`w-5 h-5 transition-transform active:scale-125 ${
                          isLiked ? 'fill-current' : 'text-neutral-500'
                        }`}
                        style={{ color: isLiked ? 'var(--accent)' : undefined }}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-neutral-400 mt-0.5">Purrsonica Sound Laboratory</p>
                </div>

                {/* DJ Harmonic Tags */}
                <div className="flex items-center gap-2">
                  <div
                    className="px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-black shadow-sm"
                    style={{ backgroundColor: 'var(--accent)' }}
                  >
                    8A (Am)
                  </div>
                  <div className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-white/5 border border-white/10 text-neutral-300">
                    128 BPM
                  </div>
                  <div className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-white/5 border border-white/10 text-neutral-300">
                    44.1kHz
                  </div>
                </div>
              </div>

              {/* Interactive Waveform Scrubber */}
              <div className="mt-8">
                <div
                  className="h-16 flex items-end gap-1 px-2 py-1 bg-white/[0.02] border border-white/5 rounded-xl cursor-pointer hover:bg-white/[0.04] transition-colors relative"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const pct = Math.max(0, Math.min(1, clickX / rect.width));
                    setCurrentTime(Math.floor(pct * duration));
                  }}
                >
                  {bars.map((barHeight, idx) => {
                    const isPlayed = idx <= activeBarIndex;
                    return (
                      <div
                        key={idx}
                        className="flex-1 rounded-full transition-all duration-75"
                        style={{
                          height: `${Math.round(barHeight * 100)}%`,
                          backgroundColor: isPlayed ? 'var(--accent)' : 'rgba(255, 255, 255, 0.15)',
                          boxShadow: isPlayed ? '0 0 8px var(--accent-glow)' : 'none',
                        }}
                      />
                    );
                  })}
                </div>

                {/* Timestamps */}
                <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mt-2">
                  <span style={{ color: 'var(--accent)' }}>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>

              {/* Controls Bar */}
              <div className="mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                    className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Previous Track"
                  >
                    <SkipBack className="w-5 h-5" />
                  </button>

                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 rounded-full accent-glow-button flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                    title={isPlaying ? 'Pause' : 'Play'}
                  >
                    {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                  </button>

                  <button
                    onClick={() => setCurrentTime((t) => Math.min(duration, t + 10))}
                    className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Next Track"
                  >
                    <SkipForward className="w-5 h-5" />
                  </button>
                </div>

                {/* Volume & Telemetry status */}
                <div className="flex items-center gap-3">
                  <Volume2 className="w-4 h-4 text-neutral-400" />
                  <div className="w-24 h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: '85%', backgroundColor: 'var(--accent)' }} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
