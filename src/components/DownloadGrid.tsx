import React from 'react';
import { Monitor, Apple, Terminal, Download, HardDrive, Package, Check, Sparkles, ExternalLink } from 'lucide-react';
import { LatestRelease } from '../utils/github';

interface DownloadGridProps {
  release: LatestRelease;
}

export const DownloadGrid: React.FC<DownloadGridProps> = ({ release }) => {
  return (
    <section id="download" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-secondary)] mb-2">
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>Latest Release {release.version}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Download Purrsonica for Free
          </h2>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-1.5">
            Free and open-source. Choose the package matching your platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Windows Card */}
          <div className="app-card p-6 rounded-xl border border-[var(--border-color)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center text-blue-400 mb-4">
                <Monitor className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Windows</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 mb-5">Windows 10 & 11 (64-bit)</p>

              <div className="space-y-2.5">
                <a
                  href={release.assets.windowsSetup?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg accent-btn-solid text-xs font-bold"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5" />
                    <span>Installer (.exe)</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-75">Recommended</span>
                </a>

                <a
                  href={release.assets.windowsPortable?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>Portable (.exe)</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)]">No setup</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] space-y-1">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                <span>Auto-updater included</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                <span>Global Media Keys support</span>
              </div>
            </div>
          </div>

          {/* macOS Card */}
          <div className="app-card p-6 rounded-xl border border-[var(--border-color)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center text-purple-400 mb-4">
                <Apple className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">macOS</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 mb-5">macOS 11 Big Sur & Newer</p>

              <div className="space-y-2.5">
                <a
                  href={release.assets.macDmg?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg accent-btn-solid text-xs font-bold"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5" />
                    <span>Universal DMG (.dmg)</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-75">M1–M4 + Intel</span>
                </a>

                <a
                  href={release.assets.macZip?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>ZIP Archive (.zip)</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)]">Manual</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] space-y-1">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                <span>Native traffic lights</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                <span>Apple Silicon native</span>
              </div>
            </div>
          </div>

          {/* Linux Card */}
          <div className="app-card p-6 rounded-xl border border-[var(--border-color)] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center text-amber-400 mb-4">
                <Terminal className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Linux</h3>
              <p className="text-xs text-[var(--text-muted)] mt-0.5 mb-5">Ubuntu, Debian, Fedora, Arch</p>

              <div className="space-y-2.5">
                <a
                  href={release.assets.linuxAppImage?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg accent-btn-solid text-xs font-bold"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-3.5 h-3.5" />
                    <span>AppImage (.AppImage)</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-75">Universal</span>
                </a>

                <a
                  href={release.assets.linuxDeb?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--bg-hover)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                    <span>Debian Package (.deb)</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)]">Ubuntu / Mint</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] space-y-1">
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                <span>/media auto-mount support</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3 h-3" style={{ color: 'var(--accent)' }} />
                <span>Zero system bloat</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <a
            href="https://github.com/AFuxy/Purrsonica/releases"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--text-muted)] hover:text-white transition-colors"
          >
            <span>View release notes & SHA-512 checksums on GitHub</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </section>
  );
};
