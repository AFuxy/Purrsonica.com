import React, { useState } from 'react';
import { Disc3, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

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
    <section id="camelot" className="py-20 md:py-28 relative bg-gradient-to-b from-transparent via-[#0d0d10] to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-indigo-400">
            Harmonic Mixing Engine
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
            Interactive DJ Camelot Wheel
          </h3>
          <p className="text-neutral-400 text-sm mt-3">
            Click any key on the matrix below to see how Purrsonica instantly calculates harmonic key matches for seamless transitions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          {/* Key Selection Grid */}
          <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase text-neutral-400">Select Track Key</span>
              <span className="text-xs text-neutral-500 font-mono">1A - 12B Wheel</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {CAMELOT_KEYS.map((k) => {
                const isSelected = selectedKey === k.code;
                const isHarmonic = compatible.includes(k.code);
                return (
                  <button
                    key={k.code}
                    onClick={() => setSelectedKey(k.code)}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                      isSelected
                        ? 'accent-glow-button ring-2 ring-white font-extrabold scale-105'
                        : isHarmonic
                        ? 'bg-indigo-950/50 border-indigo-500/60 text-indigo-200 hover:bg-indigo-900/60 shadow-sm'
                        : 'bg-white/[0.02] border-white/5 text-neutral-400 hover:bg-white/[0.06] hover:text-white'
                    }`}
                  >
                    <div className="text-sm font-mono font-black">{k.code}</div>
                    <div className="text-[10px] opacity-75">{k.musicalKey}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Harmonic Results Panel */}
          <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Disc3 className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">Live DJ Matrix</span>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/10 mb-6">
                <div className="text-xs text-neutral-400">Current Active Key:</div>
                <div className="text-2xl font-black text-white font-mono mt-1 flex items-baseline gap-2">
                  <span style={{ color: 'var(--accent)' }}>{selectedObj.code}</span>
                  <span className="text-sm font-normal text-neutral-400">({selectedObj.musicalKey} {selectedObj.mode})</span>
                </div>
              </div>

              <div className="text-xs font-semibold text-neutral-300 mb-3">Harmonically Compatible Keys:</div>
              <div className="space-y-2">
                {compatible.map((code) => {
                  const obj = CAMELOT_KEYS.find((k) => k.code === code);
                  const isSame = code === selectedKey;
                  return (
                    <div
                      key={code}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl border text-xs font-mono ${
                        isSame
                          ? 'bg-white/10 border-white/20 text-white font-bold'
                          : 'bg-indigo-950/40 border-indigo-500/30 text-indigo-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{code} — {obj?.musicalKey}</span>
                      </div>
                      <span className="text-[10px] text-neutral-400 font-sans">
                        {isSame ? 'Exact Key' : 'Harmonic Match'}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 text-[11px] text-neutral-400">
              ⚡ Purrsonica automatically identifies compatible songs in your library so you never play a clashing mix.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
