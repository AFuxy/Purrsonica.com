import React, { useState } from 'react';
import { Disc3, CheckCircle2 } from 'lucide-react';

interface CamelotKey {
  code: string;
  musicalKey: string;
  mode: 'minor' | 'major';
}

const CAMELOT_KEYS: CamelotKey[] = [
  { code: '1A', musicalKey: 'Abm', mode: 'minor' },
  { code: '1B', musicalKey: 'B', mode: 'major' },
  { code: '2A', musicalKey: 'Ebm', mode: 'minor' },
  { code: '2B', musicalKey: 'F#', mode: 'major' },
  { code: '3A', musicalKey: 'Bbm', mode: 'minor' },
  { code: '3B', musicalKey: 'Db', mode: 'major' },
  { code: '4A', musicalKey: 'Fm', mode: 'minor' },
  { code: '4B', musicalKey: 'Ab', mode: 'major' },
  { code: '5A', musicalKey: 'Cm', mode: 'minor' },
  { code: '5B', musicalKey: 'Eb', mode: 'major' },
  { code: '6A', musicalKey: 'Gm', mode: 'minor' },
  { code: '6B', musicalKey: 'Bb', mode: 'major' },
  { code: '7A', musicalKey: 'Dm', mode: 'minor' },
  { code: '7B', musicalKey: 'F', mode: 'major' },
  { code: '8A', musicalKey: 'Am', mode: 'minor' },
  { code: '8B', musicalKey: 'C', mode: 'major' },
  { code: '9A', musicalKey: 'Em', mode: 'minor' },
  { code: '9B', musicalKey: 'G', mode: 'major' },
  { code: '10A', musicalKey: 'Bm', mode: 'minor' },
  { code: '10B', musicalKey: 'D', mode: 'major' },
  { code: '11A', musicalKey: 'F#m', mode: 'minor' },
  { code: '11B', musicalKey: 'A', mode: 'major' },
  { code: '12A', musicalKey: 'C#m', mode: 'minor' },
  { code: '12B', musicalKey: 'E', mode: 'major' },
];

function getCompatibleKeys(code: string): string[] {
  const match = code.match(/^(\d+)([AB])$/);
  if (!match) return [code];
  const num = parseInt(match[1], 10);
  const letter = match[2];
  const opp = letter === 'A' ? 'B' : 'A';

  const prev = num === 1 ? 12 : num - 1;
  const next = num === 12 ? 1 : num + 1;

  return [code, `${num}${opp}`, `${prev}${letter}`, `${next}${letter}`];
}

export const CamelotDemo: React.FC = () => {
  const [selectedKey, setSelectedKey] = useState('8A');
  const compatible = getCompatibleKeys(selectedKey);
  const selectedObj = CAMELOT_KEYS.find((k) => k.code === selectedKey) || CAMELOT_KEYS[14];

  return (
    <section id="camelot" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-[var(--text-muted)]">
            Harmonic Mixing
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            DJ Camelot Wheel Compatibility
          </h2>
          <p className="text-[var(--text-secondary)] text-xs sm:text-sm mt-2">
            Click any musical key to see how Purrsonica calculates seamless harmonic transitions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Key Selection Grid */}
          <div className="lg:col-span-2 app-card p-6 rounded-xl border border-[var(--border-color)]">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-[var(--text-secondary)]">
              <span>Select Key:</span>
              <span className="font-mono text-[var(--text-muted)]">1A - 12B Wheel</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {CAMELOT_KEYS.map((k) => {
                const isSelected = selectedKey === k.code;
                const isHarmonic = compatible.includes(k.code);
                return (
                  <button
                    key={k.code}
                    onClick={() => setSelectedKey(k.code)}
                    className={`p-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'accent-btn-solid'
                        : isHarmonic
                        ? 'bg-[var(--bg-tertiary)] border-[var(--accent)] text-[var(--accent)] font-bold'
                        : 'bg-[var(--bg-tertiary)]/50 border-[var(--border-color)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)] hover:text-white'
                    }`}
                  >
                    <div className="text-xs font-mono font-bold">{k.code}</div>
                    <div className="text-[10px] opacity-75">{k.musicalKey}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Results Panel */}
          <div className="app-card p-6 rounded-xl border border-[var(--border-color)] flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Disc3 className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-primary)]">
                  Selected Key Match
                </span>
              </div>

              <div className="p-3.5 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-color)] mb-4">
                <div className="text-[11px] text-[var(--text-muted)]">Current Key:</div>
                <div className="text-xl font-black text-white font-mono mt-0.5 flex items-baseline gap-2">
                  <span style={{ color: 'var(--accent)' }}>{selectedObj.code}</span>
                  <span className="text-xs font-normal text-[var(--text-secondary)]">({selectedObj.musicalKey} {selectedObj.mode})</span>
                </div>
              </div>

              <div className="text-xs font-semibold text-[var(--text-secondary)] mb-2">Compatible Mixes:</div>
              <div className="space-y-1.5">
                {compatible.map((code) => {
                  const obj = CAMELOT_KEYS.find((k) => k.code === code);
                  const isSame = code === selectedKey;
                  return (
                    <div
                      key={code}
                      className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-mono ${
                        isSame
                          ? 'bg-[var(--bg-tertiary)] border-white/20 text-white font-bold'
                          : 'bg-[var(--bg-tertiary)]/60 border-[var(--border-color)] text-[var(--text-secondary)]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5" style={{ color: 'var(--accent)' }} />
                        <span>{code} — {obj?.musicalKey}</span>
                      </div>
                      <span className="text-[10px] text-[var(--text-muted)] font-sans">
                        {isSame ? 'Same' : 'Harmonic'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[var(--border-color)] text-[11px] text-[var(--text-muted)]">
              ⚡ Purrsonica automatically identifies compatible songs in your library for key-matched sets.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
