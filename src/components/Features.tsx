import React from 'react';
import { Zap, Disc3, Radio, Shield, Palette, Cpu, FolderSearch, Keyboard } from 'lucide-react';

export const Features: React.FC = () => {
  const featureList = [
    {
      icon: <Zap className="w-6 h-6 text-amber-400" />,
      title: 'Ghost Windowing & Instant Paging',
      description: 'Zero page-switch lag. Asynchronous 250-item virtual windowing smoothly scrolls across 50,000+ tracks at 120 FPS with minimal RAM footprint.',
    },
    {
      icon: <Disc3 className="w-6 h-6 text-indigo-400" />,
      title: 'DJ Camelot Wheel & Key Detection',
      description: 'Automatic musical key analysis (1A–12B) and interactive Camelot Wheel picker to find harmonically compatible tracks for seamless transitions.',
    },
    {
      icon: <Radio className="w-6 h-6 text-[#5865F2]" />,
      title: 'Discord Rich Presence (RPC)',
      description: 'Live profile activity broadcasting your active song title, artist, album, playback progress timer, and optional repository action buttons.',
    },
    {
      icon: <Shield className="w-6 h-6 text-emerald-400" />,
      title: '100% Offline & Zero Telemetry',
      description: 'No accounts, no analytics, no subscriptions, and zero tracking. Your music library remains private and stored entirely on your device.',
    },
    {
      icon: <Palette className="w-6 h-6 text-pink-400" />,
      title: 'Real-Time Accent Themes',
      description: 'Choose from 7 signature color palettes (Cyberpunk Purple, Emerald, Sapphire, Ruby) or input custom hex colors with instant DOM theme updates.',
    },
    {
      icon: <FolderSearch className="w-6 h-6 text-cyan-400" />,
      title: 'Background Multi-Threaded Scanner',
      description: 'Deep storage drive indexing runs in a separate worker thread with smart exclusion filters ignoring games, temp folders, and OS caches.',
    },
    {
      icon: <Keyboard className="w-6 h-6 text-violet-400" />,
      title: 'Global System Media Keys',
      description: 'Control Play, Pause, Next Track, and Volume directly from your hardware keyboard keys and headset controls even when Purrsonica is minimized.',
    },
    {
      icon: <Cpu className="w-6 h-6 text-rose-400" />,
      title: 'Native Cross-Platform',
      description: 'Built with optimized native bindings for Windows 10/11, macOS (Apple Silicon M1–M4 & Intel), and Linux (AppImage & Debian).',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-neutral-400" style={{ color: 'var(--accent)' }}>
            Engineered for Audiophiles
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Packed with Features. Free of Bloat.
          </h3>
          <p className="text-neutral-400 text-base mt-4">
            Everything you need for serious local audio management, DJ preparation, and distraction-free daily listening.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featureList.map((f, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl glass-card border border-white/5 hover:border-white/20 transition-all duration-200 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 border border-white/10">
                  {f.icon}
                </div>
                <h4 className="text-base font-bold text-white mb-2">{f.title}</h4>
                <p className="text-xs text-neutral-400 leading-relaxed">{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
