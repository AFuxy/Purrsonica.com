export interface ReleaseAsset {
  name: string;
  downloadUrl: string;
  size: number;
  downloadCount: number;
}

export interface LatestRelease {
  version: string;
  publishedAt: string;
  htmlUrl: string;
  assets: {
    windowsSetup?: ReleaseAsset;
    windowsPortable?: ReleaseAsset;
    macDmg?: ReleaseAsset;
    macZip?: ReleaseAsset;
    linuxAppImage?: ReleaseAsset;
    linuxDeb?: ReleaseAsset;
    linuxTar?: ReleaseAsset;
  };
  totalDownloads: number;
}

export type DetectedOS = 'windows' | 'mac' | 'linux';

export function detectUserOS(): DetectedOS {
  if (typeof window === 'undefined') return 'windows';
  const ua = window.navigator.userAgent.toLowerCase();
  if (ua.includes('mac') || ua.includes('darwin') || ua.includes('ipad') || ua.includes('iphone')) {
    return 'mac';
  }
  if (ua.includes('linux') || ua.includes('ubuntu') || ua.includes('debian') || ua.includes('fedora') || ua.includes('arch')) {
    return 'linux';
  }
  return 'windows';
}

export async function fetchLatestRelease(): Promise<LatestRelease> {
  const fallback: LatestRelease = {
    version: 'v1.3.1',
    publishedAt: new Date().toISOString(),
    htmlUrl: 'https://github.com/AFuxy/Purrsonica/releases/latest',
    assets: {
      windowsSetup: {
        name: 'Purrsonica-Setup-1.3.1.exe',
        downloadUrl: 'https://github.com/AFuxy/Purrsonica/releases/download/v1.3.1/Purrsonica-Setup-1.3.1.exe',
        size: 95 * 1024 * 1024,
        downloadCount: 0,
      },
      windowsPortable: {
        name: 'Purrsonica-1.3.1.exe',
        downloadUrl: 'https://github.com/AFuxy/Purrsonica/releases/download/v1.3.1/Purrsonica-1.3.1.exe',
        size: 92 * 1024 * 1024,
        downloadCount: 0,
      },
      macDmg: {
        name: 'Purrsonica-1.3.1.dmg',
        downloadUrl: 'https://github.com/AFuxy/Purrsonica/releases/download/v1.3.1/Purrsonica-1.3.1.dmg',
        size: 110 * 1024 * 1024,
        downloadCount: 0,
      },
      macZip: {
        name: 'Purrsonica-1.3.1-mac.zip',
        downloadUrl: 'https://github.com/AFuxy/Purrsonica/releases/download/v1.3.1/Purrsonica-1.3.1-mac.zip',
        size: 105 * 1024 * 1024,
        downloadCount: 0,
      },
      linuxAppImage: {
        name: 'Purrsonica-1.3.1.AppImage',
        downloadUrl: 'https://github.com/AFuxy/Purrsonica/releases/download/v1.3.1/Purrsonica-1.3.1.AppImage',
        size: 118 * 1024 * 1024,
        downloadCount: 0,
      },
      linuxDeb: {
        name: 'purrsonica_1.3.1_amd64.deb',
        downloadUrl: 'https://github.com/AFuxy/Purrsonica/releases/download/v1.3.1/purrsonica_1.3.1_amd64.deb',
        size: 85 * 1024 * 1024,
        downloadCount: 0,
      },
      linuxTar: {
        name: 'purrsonica-1.3.1.tar.gz',
        downloadUrl: 'https://github.com/AFuxy/Purrsonica/releases/download/v1.3.1/purrsonica-1.3.1.tar.gz',
        size: 80 * 1024 * 1024,
        downloadCount: 0,
      },
    },
    totalDownloads: 0,
  };

  try {
    const res = await fetch('https://api.github.com/repos/AFuxy/Purrsonica/releases/latest');
    if (!res.ok) return fallback;
    const data = await res.json();

    const assetsMap: LatestRelease['assets'] = {};
    let totalDl = 0;

    for (const a of data.assets || []) {
      const name = a.name.toLowerCase();
      totalDl += a.download_count || 0;
      const assetObj: ReleaseAsset = {
        name: a.name,
        downloadUrl: a.browser_download_url,
        size: a.size,
        downloadCount: a.download_count,
      };

      if (name.includes('setup') && name.endsWith('.exe')) {
        assetsMap.windowsSetup = assetObj;
      } else if (name.endsWith('.exe') && !name.includes('setup')) {
        assetsMap.windowsPortable = assetObj;
      } else if (name.endsWith('.dmg')) {
        assetsMap.macDmg = assetObj;
      } else if (name.endsWith('.zip') && name.includes('mac')) {
        assetsMap.macZip = assetObj;
      } else if (name.endsWith('.appimage')) {
        assetsMap.linuxAppImage = assetObj;
      } else if (name.endsWith('.deb')) {
        assetsMap.linuxDeb = assetObj;
      } else if (name.endsWith('.tar.gz')) {
        assetsMap.linuxTar = assetObj;
      }
    }

    return {
      version: data.tag_name || 'v1.3.1',
      publishedAt: data.published_at,
      htmlUrl: data.html_url,
      assets: {
        ...fallback.assets,
        ...assetsMap,
      },
      totalDownloads: totalDl,
    };
  } catch {
    return fallback;
  }
}
