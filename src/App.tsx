import React, { useState, useEffect } from 'react';
import { Navbar, ACCENT_PALETTES, AccentColor } from './components/Navbar';
import { Hero } from './components/Hero';
import { InteractivePlayerPreview } from './components/InteractivePlayerPreview';
import { Features } from './components/Features';
import { CamelotDemo } from './components/CamelotDemo';
import { DownloadGrid } from './components/DownloadGrid';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { detectUserOS, fetchLatestRelease, DetectedOS, LatestRelease } from './utils/github';

export const App: React.FC = () => {
  const [currentAccent, setCurrentAccent] = useState<AccentColor>(ACCENT_PALETTES[0]);
  const [detectedOS, setDetectedOS] = useState<DetectedOS>('windows');
  const [releaseData, setReleaseData] = useState<LatestRelease>({
    version: 'v1.3.1',
    publishedAt: new Date().toISOString(),
    htmlUrl: 'https://github.com/AFuxy/Purrsonica/releases/latest',
    assets: {},
    totalDownloads: 0,
  });

  // Apply accent color to document root
  useEffect(() => {
    document.documentElement.style.setProperty('--accent', currentAccent.color);
    document.documentElement.style.setProperty('--accent-hover', currentAccent.hover);
    document.documentElement.style.setProperty('--accent-glow', currentAccent.glow);
  }, [currentAccent]);

  // Detect OS & Fetch live release
  useEffect(() => {
    setDetectedOS(detectUserOS());
    fetchLatestRelease().then((rel) => {
      setReleaseData(rel);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#ededef] flex flex-col selection:bg-emerald-500/30 selection:text-white">
      <Navbar
        currentAccent={currentAccent}
        onSelectAccent={setCurrentAccent}
        version={releaseData.version}
      />
      <main className="flex-1">
        <Hero os={detectedOS} release={releaseData} />
        <InteractivePlayerPreview />
        <Features />
        <CamelotDemo />
        <DownloadGrid release={releaseData} />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};
