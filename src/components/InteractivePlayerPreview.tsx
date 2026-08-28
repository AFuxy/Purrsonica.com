import React, { useState, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  Heart,
  Radio,
  Music,
  Tv,
  HardDrive,
  ListPlus,
  Search,
  ChevronLeft,
  ChevronRight,
  Disc,
  Clock,
} from 'lucide-react';

interface MockTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  durationStr: string;
  key: string;
  bpm: number;
  isLiked?: boolean;
}

const MOCK_TRACKS: MockTrack[] = [
  { id: '1', title: 'Midnight Drive', artist: 'Purrsonica Sound Lab', album: 'Neon Highways', duration: 214, durationStr: '3:34', key: '8A (Am)', bpm: 128, isLiked: true },
  { id: '2', title: 'Cybernetic Dreams', artist: 'Starlight Avenue', album: 'Future Beats', duration: 188, durationStr: '3:08', key: '11B (A)', bpm: 124, isLiked: false },
  { id: '3', title: 'Subway Pulse', artist: 'Ghost Frequency', album: 'Underground Odyssey', duration: 245, durationStr: '4:05', key: '4A (Fm)', bpm: 130, isLiked: true },
  { id: '4', title: 'Velvet Horizon', artist: 'Astral Echoes', album: 'Solar Wind', duration: 196, durationStr: '3:16', key: '8B (C)', bpm: 120, isLiked: false },
  { id: '5', title: 'Quantum Drift', artist: 'Hyperion Syndicate', album: 'Sub-Zero Resonance', duration: 232, durationStr: '3:52', key: '9A (Em)', bpm: 132, isLiked: true },
];

export const InteractivePlayerPreview: React.FC = () => {
  const [activeTrack, setActiveTrack] = useState<MockTrack>(MOCK_TRACKS[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(48);
  const [activeTab, setActiveTab] = useState<'all' | 'liked' | 'drive_c'>('all');
  const [isLiked, setIsLiked] = useState(true);

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime((prev) => (prev >= activeTrack.duration ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying, activeTrack]);

  const handleSelectTrack = (track: MockTrack) => {
    setActiveTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
    setIsLiked(!!track.isLiked);
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Waveform generation
  const totalBars = 54;
  const bars = Array.from({ length: totalBars }, (_, i) => {
    const raw = Math.sin(i * 0.28 + parseInt(activeTrack.id, 10)) * Math.cos(i * 0.12) * 0.65 + 0.35;
    return Math.max(0.18, Math.min(1.0, Math.abs(raw)));
  });

  const activeBarIndex = Math.floor((currentTime / activeTrack.duration) * totalBars);

  return (
    <section id="demo" className="py-12 md:py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">
            Live Web Sandbox
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Explore the Purrsonica Desktop Interface
          </h2>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Click any song row, scrub the audio waveform, or switch sidebar views to test the real interface in your browser.
          </p>
        </div>

        {/* Purrsonica Exact Desktop Window Mockup */}
        <div className="app-window rounded-2xl overflow-hidden border border-[var(--border-color)] select-none">
          {/* Top Titlebar */}
          <div className="h-12 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between px-4">
            {/* Window Traffic Lights & Navigation History */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 mr-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <img src="/PurrSonica-White.png" alt="Purrsonica" className="h-6 w-auto" />
              <div className="flex items-center gap-1 ml-2 text-[var(--text-muted)]">
                <div className="p-1 rounded-full hover:bg-[var(--bg-tertiary)]"><ChevronLeft className="w-3.5 h-3.5" /></div>
                <div className="p-1 rounded-full hover:bg-[var(--bg-tertiary)]"><ChevronRight className="w-3.5 h-3.5" /></div>
              </div>
            </div>

            {/* Simulated Titlebar Search Box */}
            <div className="hidden sm:flex items-center gap-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 w-72 text-xs text-[var(--text-muted)]">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)]" />
              <span>Search tracks, artists, albums...</span>
            </div>

            {/* Version & RPC Tag */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#5865F2]/20 border border-[#5865F2]/30 text-[10px] font-bold text-[#8ea1e1]">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>Discord RPC Ready</span>
              </div>
            </div>
          </div>

          {/* App Body (Sidebar + Content) */}
          <div className="flex flex-col md:flex-row h-[420px] bg-[var(--bg-primary)]">
            {/* Left Sidebar */}
            <aside className="w-full md:w-56 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] p-3 flex flex-col justify-between text-xs">
              <div className="space-y-4">
                {/* Main Views */}
                <div className="space-y-1">
                  <button
                    onClick={() => setActiveTab('all')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                      activeTab === 'all'
                        ? 'accent-btn-solid'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Music className="w-3.5 h-3.5" />
                      <span>All Media</span>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 rounded-full ${activeTab === 'all' ? 'bg-black/20 text-black' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'}`}>
                      2,480
                    </span>
                  </button>

                  <button
                    onClick={() => setActiveTab('liked')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                      activeTab === 'liked'
                        ? 'accent-btn-solid'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className={`w-3.5 h-3.5 ${activeTab === 'liked' ? 'fill-black' : 'text-emerald-400'}`} />
                      <span>Liked Songs</span>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 rounded-full ${activeTab === 'liked' ? 'bg-black/20 text-black' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'}`}>
                      342
                    </span>
                  </button>

                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Tv className="w-3.5 h-3.5" />
                      <span>Videos</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)]">12</span>
                  </button>
                </div>

                {/* Storage Drives */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-3 mb-1">
                    Storage Drives
                  </div>
                  <button
                    onClick={() => setActiveTab('drive_c')}
                    className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                      activeTab === 'drive_c'
                        ? 'bg-[var(--bg-tertiary)] text-white font-bold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <HardDrive className="w-3.5 h-3.5" />
                      <span>Drive C:</span>
                    </div>
                    <span className="text-[10px] font-mono text-[var(--text-muted)]">1,890</span>
                  </button>
                </div>
              </div>

              {/* Scan Storage Button */}
              <div className="pt-2 border-t border-[var(--border-color)]">
                <div
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg accent-btn-solid text-xs cursor-pointer"
                >
                  <span>Scan Storage</span>
                </div>
              </div>
            </aside>

            {/* Center: Track List Table */}
            <main className="flex-1 overflow-y-auto p-4 bg-[var(--bg-primary)]">
              {/* Column Headers */}
              <div className="grid grid-cols-12 gap-2 px-3 py-2 text-[11px] font-semibold text-[var(--text-muted)] border-b border-[var(--border-color)] uppercase tracking-wider">
                <div className="col-span-1">#</div>
                <div className="col-span-6 sm:col-span-5">Title & Artist</div>
                <div className="hidden sm:block sm:col-span-3">Album</div>
                <div className="col-span-3 sm:col-span-2 text-center">DJ Key</div>
                <div className="col-span-2 sm:col-span-1 text-right flex items-center justify-end">
                  <Clock className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Track Rows */}
              <div className="space-y-1 mt-1">
                {MOCK_TRACKS.map((t, idx) => {
                  const isCurrent = activeTrack.id === t.id;
                  return (
                    <div
                      key={t.id}
                      onClick={() => handleSelectTrack(t)}
                      className={`grid grid-cols-12 gap-2 items-center px-3 py-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[var(--bg-tertiary)] text-white font-medium border-l-2'
                          : 'hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-white'
                      }`}
                      style={{ borderLeftColor: isCurrent ? 'var(--accent)' : 'transparent' }}
                    >
                      {/* Play / Index */}
                      <div className="col-span-1 flex items-center">
                        {isCurrent && isPlaying ? (
                          <div className="w-4 h-4 rounded-full flex items-center justify-center" style={{ color: 'var(--accent)' }}>
                            <Play className="w-3 h-3 fill-current" />
                          </div>
                        ) : (
                          <span className="font-mono text-[var(--text-muted)]">{idx + 1}</span>
                        )}
                      </div>

                      {/* Title & Artist */}
                      <div className="col-span-6 sm:col-span-5 min-w-0 pr-2">
                        <div className={`truncate ${isCurrent ? 'font-bold' : ''}`} style={{ color: isCurrent ? 'var(--accent)' : undefined }}>
                          {t.title}
                        </div>
                        <div className="text-[10px] text-[var(--text-muted)] truncate">{t.artist}</div>
                      </div>

                      {/* Album */}
                      <div className="hidden sm:block sm:col-span-3 text-[var(--text-muted)] truncate">
                        {t.album}
                      </div>

                      {/* Camelot DJ Key Badge */}
                      <div className="col-span-3 sm:col-span-2 text-center">
                        <span
                          className="px-2 py-0.5 rounded text-[10px] font-mono font-bold inline-block"
                          style={{
                            backgroundColor: isCurrent ? 'var(--accent)' : 'var(--bg-tertiary)',
                            color: isCurrent ? '#000000' : 'var(--accent)',
                          }}
                        >
                          {t.key}
                        </span>
                      </div>

                      {/* Duration */}
                      <div className="col-span-2 sm:col-span-1 text-right font-mono text-[11px] text-[var(--text-muted)]">
                        {t.durationStr}
                      </div>
                    </div>
                  );
                })}
              </div>
            </main>
          </div>

          {/* Bottom Exact PlaybackBar */}
          <footer className="h-20 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] px-4 flex items-center justify-between select-none">
            {/* Left: Active Track Details */}
            <div className="flex items-center gap-3 w-1/3 min-w-[200px]">
              <div className="w-12 h-12 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-center flex-shrink-0 shadow-md border border-white/5">
                <Disc className="w-6 h-6 text-white/40 animate-spin-slow" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="text-xs font-bold text-white truncate">{activeTrack.title}</div>
                <div className="text-[11px] text-[var(--text-muted)] truncate">{activeTrack.artist}</div>
              </div>
              <button
                onClick={() => setIsLiked(!isLiked)}
                className="p-1 text-[var(--text-muted)] hover:text-white cursor-pointer"
              >
                <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} style={{ color: isLiked ? 'var(--accent)' : undefined }} />
              </button>
            </div>

            {/* Center: Waveform & Playback Controls */}
            <div className="flex flex-col items-center gap-1.5 w-1/3 max-w-md">
              {/* Transport Buttons */}
              <div className="flex items-center gap-3">
                <button className="text-[var(--text-muted)] hover:text-white cursor-pointer"><Shuffle className="w-3.5 h-3.5" /></button>
                <button
                  onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                  className="text-[var(--text-muted)] hover:text-white cursor-pointer"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full accent-btn-solid flex items-center justify-center cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <button
                  onClick={() => setCurrentTime((t) => Math.min(activeTrack.duration, t + 10))}
                  className="text-[var(--text-muted)] hover:text-white cursor-pointer"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                <button className="text-[var(--text-muted)] hover:text-white cursor-pointer"><Repeat className="w-3.5 h-3.5" /></button>
              </div>

              {/* Seekable Waveform Bar */}
              <div className="w-full flex items-center gap-2">
                <span className="text-[10px] font-mono" style={{ color: 'var(--accent)' }}>{formatTime(currentTime)}</span>
                <div
                  className="flex-1 h-5 flex items-end gap-0.5 bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded cursor-pointer border border-[var(--border-color)]"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    setCurrentTime(Math.floor(pct * activeTrack.duration));
                  }}
                >
                  {bars.map((barH, idx) => {
                    const isPlayed = idx <= activeBarIndex;
                    return (
                      <div
                        key={idx}
                        className="flex-1 rounded-full transition-all duration-75"
                        style={{
                          height: `${Math.round(barH * 100)}%`,
                          backgroundColor: isPlayed ? 'var(--accent)' : 'rgba(255, 255, 255, 0.18)',
                        }}
                      />
                    );
                  })}
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">{formatTime(activeTrack.duration)}</span>
              </div>
            </div>

            {/* Right: DJ Badge & Volume */}
            <div className="flex items-center justify-end gap-3 w-1/3 min-w-[200px]">
              <div
                className="px-2.5 py-1 rounded text-[11px] font-mono font-bold"
                style={{ backgroundColor: 'var(--accent)', color: '#000000' }}
              >
                {activeTrack.key}
              </div>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[var(--text-muted)]" />
                <div className="w-20 h-1.5 rounded-full bg-[var(--bg-tertiary)] overflow-hidden border border-white/5">
                  <div className="h-full rounded-full" style={{ width: '80%', backgroundColor: 'var(--accent)' }} />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};
