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
  Music,
  Tv,
  HardDrive,
  Disc,
  ListPlus,
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
  Settings,
  Sun,
  Moon,
  Clock,
  MoreHorizontal,
  FolderInput,
  Radio,
  Sparkles,
  Zap,
} from 'lucide-react';

interface MockTrack {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number;
  durationStr: string;
  camelotKey: string;
  musicalKey: string;
  bpm: number;
  isLiked?: boolean;
  coverColor: string;
}

const MOCK_LIBRARY: MockTrack[] = [
  { id: '1', title: 'Midnight Drive', artist: 'Purrsonica Sound Lab', album: 'Neon Odyssey', duration: 214, durationStr: '3:34', camelotKey: '8A', musicalKey: 'Am', bpm: 128, isLiked: true, coverColor: '#064e3b' },
  { id: '2', title: 'Cybernetic Dreams', artist: 'Starlight Avenue', album: 'Future Beats', duration: 188, durationStr: '3:08', camelotKey: '11B', musicalKey: 'A', bpm: 124, isLiked: false, coverColor: '#1e1b4b' },
  { id: '3', title: 'Subway Pulse', artist: 'Ghost Frequency', album: 'Underground Velocity', duration: 245, durationStr: '4:05', camelotKey: '4A', musicalKey: 'Fm', bpm: 130, isLiked: true, coverColor: '#3b0764' },
  { id: '4', title: 'Velvet Horizon', artist: 'Astral Echoes', album: 'Solar Wind', duration: 196, durationStr: '3:16', camelotKey: '8B', musicalKey: 'C', bpm: 120, isLiked: false, coverColor: '#701a75' },
  { id: '5', title: 'Quantum Drift', artist: 'Hyperion Syndicate', album: 'Sub-Zero Resonance', duration: 232, durationStr: '3:52', camelotKey: '9A', musicalKey: 'Em', bpm: 132, isLiked: true, coverColor: '#14532d' },
  { id: '6', title: 'Neon Skylines', artist: 'Vapor Synth', album: 'Retro City', duration: 205, durationStr: '3:25', camelotKey: '2B', musicalKey: 'F#', bpm: 126, isLiked: false, coverColor: '#1e293b' },
];

export const InteractivePlayerPreview: React.FC = () => {
  const [currentTrack, setCurrentTrack] = useState<MockTrack>(MOCK_LIBRARY[0]);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentTime, setCurrentTime] = useState(48);
  const [currentView, setCurrentView] = useState<'all' | 'liked' | 'drive_c' | 'playlist'>('all');
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({
    '1': true,
    '3': true,
    '5': true,
  });
  const [searchFilter, setSearchFilter] = useState('');

  // Auto-play progress timer
  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setCurrentTime((prev) => (prev >= currentTrack.duration ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [isPlaying, currentTrack]);

  const handlePlayTrack = (t: MockTrack) => {
    if (currentTrack.id === t.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentTrack(t);
      setCurrentTime(0);
      setIsPlaying(true);
    }
  };

  const toggleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const formatDuration = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Filtered tracks
  const displayedTracks = MOCK_LIBRARY.filter((t) => {
    if (currentView === 'liked' && !likedMap[t.id]) return false;
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.album.toLowerCase().includes(q) ||
        t.camelotKey.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Simulated Waveform Bars
  const totalPeaks = 56;
  const peaks = Array.from({ length: totalPeaks }, (_, i) => {
    const val = Math.sin(i * 0.28 + parseInt(currentTrack.id, 10)) * Math.cos(i * 0.12) * 0.65 + 0.35;
    return Math.max(0.15, Math.min(1.0, Math.abs(val)));
  });
  const activePeakIndex = Math.floor((currentTime / currentTrack.duration) * totalPeaks);

  return (
    <section id="demo" className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">
            Live Interactive Demo
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Experience Purrsonica
          </h2>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Interact with the simulated desktop app below. Double-click rows to switch tracks, scrub the audio waveform, and change views.
          </p>
        </div>

        {/* 1:1 Exact Purrsonica Desktop App Container */}
        <div className="w-full rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--bg-primary)] shadow-2xl select-none">
          {/* Top Titlebar */}
          <header className="h-12 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center justify-between px-4">
            {/* Left: Brand, Logo & History Controls */}
            <div className="flex items-center gap-2">
              {/* Traffic Lights */}
              <div className="flex items-center gap-1.5 mr-2">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
              </div>
              <img src="/PurrSonica-White.png" alt="Purrsonica" className="h-7 w-auto object-contain" />
              <div className="flex items-center gap-0.5 ml-1">
                <button className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] transition-all">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button className="p-1.5 rounded-full text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] transition-all">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Center: Search input */}
            <div className="flex items-center gap-2 bg-[var(--bg-tertiary)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 w-64 sm:w-80 text-xs focus-within:border-emerald-500 transition-colors">
              <Search className="w-3.5 h-3.5 text-[var(--text-muted)] flex-shrink-0" />
              <input
                type="text"
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                placeholder="Search tracks, artists, keys..."
                className="bg-transparent text-xs text-[var(--text-primary)] outline-none w-full placeholder:text-[var(--text-muted)]"
              />
            </div>

            {/* Right: Controls & Discord Tag */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#5865F2]/15 border border-[#5865F2]/30 text-[#8ea1e1] text-[11px]">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>Discord RPC</span>
              </div>
              <div className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] cursor-pointer">
                <Settings className="w-4 h-4" />
              </div>
              <div className="p-1.5 rounded-md text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] cursor-pointer">
                <Sun className="w-4 h-4 text-amber-400" />
              </div>
            </div>
          </header>

          {/* Middle: Sidebar + Main Content Table */}
          <div className="flex h-[420px] overflow-hidden">
            {/* Left Sidebar */}
            <aside className="w-56 bg-[var(--bg-secondary)] border-r border-[var(--border-color)] flex flex-col justify-between p-3 select-none text-xs flex-shrink-0">
              <div className="space-y-5 overflow-y-auto no-scrollbar">
                {/* Main Views */}
                <div className="space-y-1">
                  <button
                    onClick={() => { setCurrentView('all'); setSearchFilter(''); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                      currentView === 'all'
                        ? 'bg-emerald-500 text-black font-bold shadow-sm'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Music className="w-4 h-4" />
                      <span>All Media</span>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${currentView === 'all' ? 'bg-black/20 text-black' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'}`}>
                      {MOCK_LIBRARY.length}
                    </span>
                  </button>

                  <button
                    onClick={() => { setCurrentView('liked'); setSearchFilter(''); }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold transition-all cursor-pointer ${
                      currentView === 'liked'
                        ? 'bg-emerald-500 text-black font-bold shadow-sm'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className={`w-4 h-4 ${currentView === 'liked' ? 'fill-black' : 'fill-emerald-500 text-emerald-500'}`} />
                      <span>Liked Songs</span>
                    </div>
                    <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${currentView === 'liked' ? 'bg-black/20 text-black' : 'bg-[var(--bg-tertiary)] text-[var(--text-muted)]'}`}>
                      {Object.values(likedMap).filter(Boolean).length}
                    </span>
                  </button>

                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Tv className="w-4 h-4" />
                      <span>Videos</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)]">12</span>
                  </button>

                  <button
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-semibold text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)] transition-all cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Disc className="w-4 h-4" />
                      <span>Albums</span>
                    </div>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-full bg-[var(--bg-tertiary)] text-[var(--text-muted)]">6</span>
                  </button>
                </div>

                {/* Storage Drives */}
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] px-3 mb-1.5">
                    Physical Drives
                  </div>
                  <div className="space-y-0.5">
                    <button
                      onClick={() => setCurrentView('drive_c')}
                      className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
                        currentView === 'drive_c'
                          ? 'bg-[var(--bg-tertiary)] text-emerald-400 font-bold border-l-2 border-emerald-500'
                          : 'text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-[var(--text-primary)]'
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

                {/* Playlists */}
                <div>
                  <div className="flex items-center justify-between px-3 mb-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    <span>Playlists</span>
                    <Plus className="w-3 h-3 hover:text-white cursor-pointer" />
                  </div>
                  <div className="space-y-0.5">
                    <div className="px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white cursor-pointer truncate flex items-center gap-2">
                      <ListPlus className="w-3.5 h-3.5" />
                      <span>Cyberpunk Mix</span>
                    </div>
                    <div className="px-3 py-1.5 rounded-lg text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] hover:text-white cursor-pointer truncate flex items-center gap-2">
                      <ListPlus className="w-3.5 h-3.5" />
                      <span>DJ Set Prep</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="space-y-2 pt-3 border-t border-[var(--border-color)]">
                <button
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-black font-bold shadow-md transition-all cursor-pointer"
                >
                  <Zap className="w-3.5 h-3.5 fill-current" />
                  <span>Scan Storage</span>
                </button>
              </div>
            </aside>

            {/* Main Content Workspace (Header + Table) */}
            <main className="flex-1 flex flex-col bg-[var(--bg-primary)] overflow-hidden">
              {/* Header Title */}
              <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">
                    {currentView === 'all' && 'All Media'}
                    {currentView === 'liked' && 'Liked Songs'}
                    {currentView === 'drive_c' && 'Drive C: Library'}
                  </h3>
                  <p className="text-[11px] text-[var(--text-muted)]">
                    {displayedTracks.length} tracks • Ready for playback
                  </p>
                </div>
              </div>

              {/* Exact Track Table */}
              <div className="flex-1 overflow-y-auto">
                {/* Column Headers */}
                <div className="grid grid-cols-[36px_minmax(180px,2fr)_minmax(120px,1.2fr)_60px_80px_65px_40px] items-center px-4 py-2 text-[11px] font-semibold text-[var(--text-muted)] border-b border-[var(--border-color)] uppercase tracking-wider sticky top-0 bg-[var(--bg-primary)] z-10">
                  <div className="text-center">#</div>
                  <div>Title</div>
                  <div>Album</div>
                  <div className="text-right">BPM</div>
                  <div className="text-center">Key</div>
                  <div className="text-right flex items-center justify-end">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div></div>
                </div>

                {/* Rows */}
                <div className="divide-y divide-transparent">
                  {displayedTracks.map((t, idx) => {
                    const isCurrent = currentTrack.id === t.id;
                    const isLikedTrack = likedMap[t.id];
                    return (
                      <div
                        key={t.id}
                        onDoubleClick={() => handlePlayTrack(t)}
                        className={`grid grid-cols-[36px_minmax(180px,2fr)_minmax(120px,1.2fr)_60px_80px_65px_40px] items-center px-4 h-11 hover:bg-[var(--bg-tertiary)] transition-colors group cursor-pointer ${
                          isCurrent ? 'bg-[var(--bg-tertiary)] text-emerald-400' : ''
                        }`}
                      >
                        {/* Index / Play Button */}
                        <div className="flex items-center justify-center">
                          <button
                            onClick={() => handlePlayTrack(t)}
                            className="flex items-center justify-center"
                          >
                            {isCurrent && isPlaying ? (
                              <Pause className="w-4 h-4 fill-current text-emerald-400" />
                            ) : isCurrent && !isPlaying ? (
                              <Play className="w-4 h-4 fill-current text-emerald-400" />
                            ) : (
                              <>
                                <span className="text-xs text-[var(--text-muted)] group-hover:hidden font-mono">{idx + 1}</span>
                                <Play className="w-4 h-4 fill-current text-white hidden group-hover:block" />
                              </>
                            )}
                          </button>
                        </div>

                        {/* Title, Artist, Thumbnail */}
                        <div className="flex items-center gap-2.5 min-w-0 pr-4">
                          <div
                            className="w-7 h-7 rounded overflow-hidden flex-shrink-0 flex items-center justify-center shadow-sm"
                            style={{ backgroundColor: t.coverColor }}
                          >
                            <Disc className="w-4 h-4 text-white/50" />
                          </div>
                          <div className="flex flex-col min-w-0">
                            <span className={`font-semibold truncate text-xs ${isCurrent ? 'text-emerald-400' : 'text-[var(--text-primary)]'}`}>
                              {t.title}
                            </span>
                            <span className="text-[10px] text-[var(--text-secondary)] truncate">
                              {t.artist}
                            </span>
                          </div>
                        </div>

                        {/* Album */}
                        <div className="truncate text-[var(--text-secondary)] text-xs pr-4">
                          {t.album}
                        </div>

                        {/* BPM */}
                        <div className="text-right font-mono text-[11px] pr-2 text-[var(--text-muted)]">
                          {t.bpm}
                        </div>

                        {/* Camelot Key Badge */}
                        <div className="flex items-center justify-center">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                              t.camelotKey.endsWith('A')
                                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            }`}
                          >
                            {t.camelotKey}
                          </span>
                        </div>

                        {/* Duration */}
                        <div className="text-right font-mono text-[11px] text-[var(--text-muted)]">
                          {t.durationStr}
                        </div>

                        {/* Like Button */}
                        <div className="flex items-center justify-center">
                          <button
                            onClick={(e) => toggleLike(t.id, e)}
                            className="p-1 text-[var(--text-muted)] hover:text-white transition-colors"
                          >
                            <Heart
                              className={`w-3.5 h-3.5 ${isLikedTrack ? 'fill-emerald-500 text-emerald-500' : ''}`}
                            />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
          </div>

          {/* Bottom Persistent PlaybackBar */}
          <footer className="h-20 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] px-4 flex items-center justify-between z-40 select-none">
            {/* Left: Current Track Details */}
            <div className="flex items-center gap-3 w-1/3 max-w-sm min-w-[200px]">
              <div
                className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center shadow-md ring-1 ring-white/5"
                style={{ backgroundColor: currentTrack.coverColor }}
              >
                <Disc className="w-6 h-6 text-white/50 animate-spin-slow" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                  {currentTrack.title}
                </span>
                <span className="text-[11px] text-[var(--text-secondary)] truncate">
                  {currentTrack.artist}
                </span>
              </div>
              <button
                onClick={() => toggleLike(currentTrack.id)}
                className="text-[var(--text-muted)] hover:text-white transition-colors"
              >
                <Heart className={`w-4 h-4 ${likedMap[currentTrack.id] ? 'fill-emerald-500 text-emerald-500' : ''}`} />
              </button>
            </div>

            {/* Center: Controls & Waveform */}
            <div className="flex flex-col items-center gap-1.5 w-1/3 max-w-md">
              {/* Transport Buttons */}
              <div className="flex items-center gap-4">
                <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"><Shuffle className="w-3.5 h-3.5" /></button>
                <button
                  onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <SkipBack className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-8 h-8 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black flex items-center justify-center shadow transition-all hover:scale-105"
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                </button>
                <button
                  onClick={() => setCurrentTime((t) => Math.min(currentTrack.duration, t + 10))}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                >
                  <SkipForward className="w-4 h-4" />
                </button>
                <button className="text-[var(--text-muted)] hover:text-[var(--text-primary)]"><Repeat className="w-3.5 h-3.5" /></button>
              </div>

              {/* Seekable Waveform Bar */}
              <div className="w-full flex items-center gap-2">
                <span className="text-[10px] font-mono text-[var(--text-muted)]">{formatDuration(currentTime)}</span>
                <div
                  className="flex-1 h-5 flex items-end gap-0.5 bg-[var(--bg-tertiary)] px-1.5 py-0.5 rounded cursor-pointer border border-[var(--border-color)]"
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const pct = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    setCurrentTime(Math.floor(pct * currentTrack.duration));
                  }}
                >
                  {peaks.map((p, idx) => {
                    const isPlayed = idx <= activePeakIndex;
                    return (
                      <div
                        key={idx}
                        className="flex-1 rounded-full transition-all duration-75"
                        style={{
                          height: `${Math.round(p * 100)}%`,
                          backgroundColor: isPlayed ? '#10b981' : 'rgba(255, 255, 255, 0.18)',
                        }}
                      />
                    );
                  })}
                </div>
                <span className="text-[10px] font-mono text-[var(--text-muted)]">{formatDuration(currentTrack.duration)}</span>
              </div>
            </div>

            {/* Right: Key Pill & Volume Slider */}
            <div className="flex items-center justify-end gap-3 w-1/3 min-w-[200px]">
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                {currentTrack.camelotKey} ({currentTrack.musicalKey})
              </span>
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-[var(--text-muted)]" />
                <div className="w-20 h-1 bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </section>
  );
};
