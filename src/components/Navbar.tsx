import React from 'react';
import { Download, Sparkles } from 'lucide-react';

export interface AccentColor {
  id: string;
  name: string;
  color: string;
  hover: string;
  glow: string;
}

export const ACCENT_PALETTES: AccentColor[] = [
  { id: 'emerald', name: 'Emerald Green', color: '#10b981', hover: '#059669', glow: 'rgba(16, 185, 129, 0.3)' },
  { id: 'purple', name: 'Cyberpunk Purple', color: '#a855f7', hover: '#9333ea', glow: 'rgba(168, 85, 247, 0.3)' },
  { id: 'blue', name: 'Sapphire Blue', color: '#3b82f6', hover: '#2563eb', glow: 'rgba(59, 130, 246, 0.3)' },
  { id: 'red', name: 'Ruby Red', color: '#ef4444', hover: '#dc2626', glow: 'rgba(239, 68, 68, 0.3)' },
  { id: 'gold', name: 'Sunset Gold', color: '#f59e0b', hover: '#d97706', glow: 'rgba(245, 158, 11, 0.3)' },
  { id: 'cyan', name: 'Electric Cyan', color: '#06b6d4', hover: '#0891b2', glow: 'rgba(6, 182, 212, 0.3)' },
  { id: 'pink', name: 'Neon Pink', color: '#ec4899', hover: '#db2777', glow: 'rgba(236, 72, 153, 0.3)' },
];

interface NavbarProps {
  currentAccent: AccentColor;
  onSelectAccent: (accent: AccentColor) => void;
  version: string;
}

export const Navbar: React.FC<NavbarProps> = ({ currentAccent, onSelectAccent, version }) => {
  return (
    <header className="sticky top-0 z-50 w-full bg-[var(--bg-secondary)] border-b border-[var(--border-color)] select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Left: App Logo & Version Pill */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <img
              src="/PurrSonica-White.png"
              alt="Purrsonica"
              className="h-7 w-auto object-contain transition-transform group-hover:scale-105"
            />
          </a>
          <span className="px-2 py-0.5 text-[11px] font-mono font-bold rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)]">
            {version}
          </span>
        </div>

        {/* Center: Navigation Pills (Styled like desktop app view switchers) */}
        <nav className="hidden md:flex items-center gap-1.5 bg-[var(--bg-primary)] p-1 rounded-xl border border-[var(--border-color)] text-xs font-semibold">
          <a href="#features" className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] transition-colors">Features</a>
          <a href="#demo" className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] transition-colors">Player Preview</a>
          <a href="#camelot" className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] transition-colors">DJ Camelot Wheel</a>
          <a href="#download" className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] transition-colors">Downloads</a>
          <a href="#faq" className="px-3 py-1.5 rounded-lg text-[var(--text-secondary)] hover:text-white hover:bg-[var(--bg-tertiary)] transition-colors">FAQ</a>
        </nav>

        {/* Right side: App Accent Switcher + GitHub + Download */}
        <div className="flex items-center gap-3">
          {/* Accent Color Circles */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)]">
            {ACCENT_PALETTES.map((p) => {
              const isSelected = currentAccent.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onSelectAccent(p)}
                  title={`Switch theme to ${p.name}`}
                  className={`w-4 h-4 rounded-full transition-transform cursor-pointer ${
                    isSelected ? 'scale-125 ring-2 ring-white shadow-sm' : 'opacity-60 hover:opacity-100 hover:scale-110'
                  }`}
                  style={{ backgroundColor: p.color }}
                />
              );
            })}
          </div>

          {/* GitHub Star */}
          <a
            href="https://github.com/AFuxy/Purrsonica"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[var(--text-secondary)] hover:text-white bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] rounded-lg transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span className="hidden sm:inline">GitHub</span>
          </a>

          {/* Primary CTA */}
          <a
            href="#download"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg accent-btn-solid cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </a>
        </div>
      </div>
    </header>
  );
};
