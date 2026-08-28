import React from 'react';
import { Zap, Disc3, Radio, Shield, Palette, Cpu, FolderSearch, Keyboard } from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: <Zap className="w-5 h-5 text-amber-400" />,
      title: 'Ghost Windowing & Instant Paging',
      description: 'Zero page-switch lag. Asynchronous 250-item virtual windowing smoothly scrolls across 50,000+ tracks at 120 FPS with minimal RAM footprint.',
    },
    {
      icon: <Disc3 className="w-5 h-5 text-indigo-400" />,
      title: 'DJ Camelot Wheel & Key Detection',
      description: 'Automatic musical key analysis (1A–12B) and interactive Camelot Wheel picker to find harmonically compatible tracks for seamless transitions.',
    },
    {
      icon: <Radio className="w-5 h-5 text-[#5865F2]" />,
      title: 'Discord Rich Presence (RPC)',
      description: 'Live profile activity broadcasting your active song title, artist, album, playback progress timer, and optional repository action buttons.',
    },
    {
      icon: <Shield className="w-5 h-5 text-emerald-400" />,
      title: '100% Offline & Zero Telemetry',
      description: 'No accounts, no analytics, no subscriptions, and zero tracking. Your music library remains private and stored entirely on your device.',
    },
    {
      icon: <Palette className="w-5 h-5 text-pink-400" />,
      title: 'Real-Time Accent Themes',
      description: 'Choose from 7 signature color palettes (Cyberpunk Purple, Emerald, Sapphire, Ruby) or input custom hex colors with instant DOM theme updates.',
    },
    {
      icon: <FolderSearch className="w-5 h-5 text-cyan-400" />,
      title: 'Background Multi-Threaded Scanner',
      description: 'Deep storage drive indexing runs in a separate worker thread with smart exclusion filters ignoring games, temp folders, and OS caches.',
    },
    {
      icon: <Keyboard className="w-5 h-5 text-violet-400" />,
      title: 'Global System Media Keys',
      description: 'Control Play, Pause, Next Track, and Volume directly from your hardware keyboard keys and headset controls even when Purrsonica is minimized.',
    },
    {
      icon: <Cpu className="w-5 h-5 text-rose-400" />,
      title: 'Native Cross-Platform',
      description: 'Built with optimized native bindings for Windows 10/11, macOS (Apple Silicon M1–M4 & Intel), and Linux (AppImage & Debian).',
    },
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">
            Built for Local Music
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Core Features & Architecture
          </h2>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-2">
            Everything you need for fast local audio management, DJ preparation, and daily listening.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {featureList.map((f, i) => (
            <div
              key={i}
              className="app-card rounded-xl p-5 border border-[var(--border-color)] hover:border-neutral-600 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center mb-3.5">
                  {f.icon}
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{f.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
