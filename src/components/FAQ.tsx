import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is Purrsonica completely free?',
      a: 'Yes! Purrsonica is 100% free and open-source under the MIT license. There are no paid tiers, no premium paywalls, no ads, and no subscriptions.',
    },
    {
      q: 'Does Purrsonica collect telemetry or spy on my music files?',
      a: 'Never. Purrsonica operates completely offline. Your music files, metadata, ratings, and waveforms are stored in a local SQLite database on your machine. No telemetry or audio fingerprints are ever transmitted to any external server.',
    },
    {
      q: 'What audio and video formats are supported?',
      a: 'Purrsonica supports MP3, FLAC (including 24-bit Hi-Res audio), WAV, M4A, AAC, OGG, OPUS, AIFF, and local MP4/MKV video files with hardware-accelerated playback.',
    },
    {
      q: 'How does Purrsonica handle libraries with 50,000+ tracks without lagging?',
      a: 'Purrsonica uses Ghost Paging and virtual windowing. It only creates DOM elements for the items currently visible in your viewport, keeping RAM usage ultra-low (<120MB) and frame rates locked at 120 FPS regardless of library size.',
    },
    {
      q: 'How do I update Purrsonica when a new version is released?',
      a: 'Purrsonica includes a built-in auto-updater. When a new release is published to GitHub, the app alerts you with a release banner so you can update with a single click without reinstalling.',
    },
  ];

  return (
    <section id="faq" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            Got Questions?
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-4">
          {faqs.map((f, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-card rounded-2xl border border-white/5 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02]"
                >
                  <span className="text-base font-bold text-white">{f.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-neutral-400 flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-4">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
