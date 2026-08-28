import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is Purrsonica completely free?',
      a: 'Yes. Purrsonica is 100% free and open-source under the MIT license. No paid subscriptions, no premium paywalls, and no ads.',
    },
    {
      q: 'Does Purrsonica collect telemetry or track my listening habits?',
      a: 'No. Purrsonica is fully offline and privacy-first. Your music files, metadata, ratings, and waveforms are stored exclusively on your local machine.',
    },
    {
      q: 'What audio and video formats are supported?',
      a: 'Purrsonica supports MP3, FLAC (including 24-bit Hi-Res audio), WAV, M4A, AAC, OGG, OPUS, and local MP4/MKV video files.',
    },
    {
      q: 'How do I update Purrsonica?',
      a: 'You can check for and download updates directly inside the app by going to Settings ➔ Updates and clicking Download & Install.',
    },
  ];

  return (
    <section id="faq" className="py-16 md:py-24 relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">
            Questions & Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((f, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="app-card rounded-xl border border-[var(--border-color)] overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[var(--bg-hover)]"
                >
                  <span className="text-sm font-bold text-white">{f.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--text-muted)] flex-shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-white' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs text-[var(--text-secondary)] leading-relaxed border-t border-[var(--border-color)] pt-3">
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
