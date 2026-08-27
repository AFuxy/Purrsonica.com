import React from 'react';
import { Download, Sparkles, Monitor, Apple, Terminal, ArrowRight, ShieldCheck, Zap, Disc3 } from 'lucide-react';
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
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background ambient lighting */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full blur-[140px] opacity-25 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: 'var(--accent)' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Release badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-white/10 text-xs font-semibold mb-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <span className="flex h-2 w-2 rounded-full animate-ping" style={{ backgroundColor: 'var(--accent)' }} />
          <span className="text-neutral-200">Purrsonica {release.version} is now live</span>
          <span className="text-neutral-400">• Multi-Platform Windows, macOS & Linux</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]">
          Your Music Library, <br />
          <span
            className="bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-400"
            style={{
              backgroundImage: `linear-gradient(135deg, #ffffff 0%, var(--accent) 100%)`,
            }}
          >
            Faster & Smarter
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          The high-performance local music and video player with instant ghost paging for 50,000+ songs, interactive waveform scrubbing, DJ Camelot wheel analysis, and Discord Rich Presence.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={primary.url}
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl accent-glow-button text-base font-bold transition-all hover:scale-105"
          >
            {primary.icon}
            <div className="text-left">
              <div>{primary.label}</div>
              <div className="text-[10px] opacity-80 font-normal">{primary.subtext}</div>
            </div>
          </a>

          <a
            href="#download"
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 rounded-xl glass-card hover:bg-white/10 border border-white/10 text-sm font-semibold text-neutral-200 transition-all hover:border-white/20"
          >
            <span>All Platforms & Formats</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs font-semibold text-neutral-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>100% Offline & Private (No Telemetry)</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4" style={{ color: 'var(--accent)' }} />
            <span>50k+ Tracks in ~1ms</span>
          </div>
          <div className="flex items-center gap-2">
            <Disc3 className="w-4 h-4 text-indigo-400" />
            <span>DJ Camelot Harmonic Mixing</span>
          </div>
        </div>
      </div>
    </section>
  );
};
