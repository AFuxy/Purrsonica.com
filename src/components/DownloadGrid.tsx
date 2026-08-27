import React from 'react';
import { Monitor, Apple, Terminal, Download, HardDrive, Package, Check, Sparkles, ExternalLink } from 'lucide-react';
import { LatestRelease } from '../utils/github';

interface DownloadGridProps {
  release: LatestRelease;
}

export const DownloadGrid: React.FC<DownloadGridProps> = ({ release }) => {
  return (
    <section id="download" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neutral-300 mb-3">
            <Sparkles className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
            <span>Latest Release {release.version}</span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
            Download Purrsonica for Free
          </h3>
          <p className="text-neutral-400 text-sm mt-3">
            Completely free and open source. Choose the installer matching your operating system.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Windows Card */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6">
                <Monitor className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black text-white">Windows</h4>
              <p className="text-xs text-neutral-400 mt-1 mb-6">Windows 10 & 11 (64-bit)</p>

              <div className="space-y-3">
                <a
                  href={release.assets.windowsSetup?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl accent-glow-button text-xs font-bold transition-transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Installer (.exe)</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">Recommended</span>
                </a>

                <a
                  href={release.assets.windowsPortable?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-4 h-4" />
                    <span>Portable (.exe)</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">No install</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-[11px] text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Auto-updater included</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Global Media Keys support</span>
              </div>
            </div>
          </div>

          {/* macOS Card */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                <Apple className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black text-white">macOS</h4>
              <p className="text-xs text-neutral-400 mt-1 mb-6">macOS 11 Big Sur & Newer</p>

              <div className="space-y-3">
                <a
                  href={release.assets.macDmg?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl accent-glow-button text-xs font-bold transition-transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>Universal DMG (.dmg)</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">M1/M2/M3 + Intel</span>
                </a>

                <a
                  href={release.assets.macZip?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>ZIP Archive (.zip)</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">Manual Extract</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-[11px] text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Native traffic light integration</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Apple Silicon optimized</span>
              </div>
            </div>
          </div>

          {/* Linux Card */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-white/20 transition-all">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                <Terminal className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black text-white">Linux</h4>
              <p className="text-xs text-neutral-400 mt-1 mb-6">Ubuntu, Debian, Fedora, Arch</p>

              <div className="space-y-3">
                <a
                  href={release.assets.linuxAppImage?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl accent-glow-button text-xs font-bold transition-transform hover:scale-[1.02]"
                >
                  <div className="flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    <span>AppImage (.AppImage)</span>
                  </div>
                  <span className="text-[10px] font-mono opacity-80">Run anywhere</span>
                </a>

                <a
                  href={release.assets.linuxDeb?.downloadUrl || release.htmlUrl}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-neutral-200 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <Package className="w-4 h-4" />
                    <span>Debian Package (.deb)</span>
                  </div>
                  <span className="text-[10px] text-neutral-400">Ubuntu / Mint</span>
                </a>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/5 text-[11px] text-neutral-400 space-y-1.5">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Automatic /media mount detection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Zero system dependency bloat</span>
              </div>
            </div>
          </div>
        </div>

        {/* GitHub Releases link */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/AFuxy/Purrsonica/releases"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors"
          >
            <span>View full release notes and SHA-512 checksums on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
