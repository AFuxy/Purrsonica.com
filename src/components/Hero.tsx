import React from 'react';
import { Apple, Monitor, Terminal, ArrowRight, ShieldCheck, Zap, Disc3 } from 'lucide-react';
import { DetectedOS, LatestRelease } from '../utils/github';

interface HeroProps {
  os: DetectedOS;
  release: LatestRelease;
}

export const Hero: React.FC<HeroProps> = ({ os, release }) => {
  const getPrimaryDownload = () => {
    if (os === 'mac') {
      return {
        label: 'Download for macOS',
        subtext: 'Universal .dmg (Apple Silicon & Intel)',
        icon: <Apple className="w-5 h-5" />,
        url: release.assets.macDmg?.downloadUrl || release.htmlUrl,
      };
    }
    if (os === 'linux') {
      return {
        label: 'Download for Linux',
        subtext: 'Universal .AppImage & .deb',
        icon: <Terminal className="w-5 h-5" />,
        url: release.assets.linuxAppImage?.downloadUrl || release.htmlUrl,
      };
    }
    return {
      label: 'Download for Windows',
      subtext: 'Installer (.exe) & Portable',
      icon: <Monitor className="w-5 h-5" />,
      url: release.assets.windowsSetup?.downloadUrl || release.htmlUrl,
    };
  };

  const primary = getPrimaryDownload();

  return (
    <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 overflow-hidden">
      {/* Subtle App Glow Ambient */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] rounded-full blur-[160px] opacity-20 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Release Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold mb-6">
          <span className="flex h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="text-[var(--text-primary)]">Purrsonica {release.version} is now available</span>
          <span className="text-[var(--text-muted)]">• Windows, macOS & Linux</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          The Modern Player for <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: `linear-gradient(135deg, #ffffff 30%, var(--accent) 100%)`,
            }}
          >
            Local Music & Video
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
          Ultra-fast massive library loading, Fast playback, Camelot wheel harmonic key analysis, and Discord Rich Presence.
        </p>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={primary.url}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-3.5 rounded-xl accent-btn-solid text-sm font-bold shadow-lg cursor-pointer"
          >
            {primary.icon}
            <div className="text-left">
              <div>{primary.label}</div>
              <div className="text-[10px] opacity-75 font-normal">{primary.subtext}</div>
            </div>
          </a>

          <a
            href="#download"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-colors hover:border-neutral-500"
          >
            <span>All Formats & Releases</span>
            <ArrowRight className="w-3.5 h-3.5 text-[var(--text-muted)]" />
          </a>
        </div>

        {/* Key App Highlights */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-[var(--text-secondary)]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span>100% Offline & Private (Zero Telemetry)</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <span>50k+ Tracks in ~1ms</span>
          </div>
          <div className="flex items-center gap-2">
            <Disc3 className="w-4 h-4 text-indigo-400" />
            <span>Camelot Harmonic Mixing</span>
          </div>
        </div>
      </div>
    </section>
  );
};
