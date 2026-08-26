import React, { useState, useEffect } from 'react';
import { Download, Sparkles, Smartphone, CheckCircle2 } from 'lucide-react';
import { audioManager } from '../../audio/AudioManager';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
}

export const PWAInstallButton: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState<boolean>(false);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);

  useEffect(() => {
    // Check if already in standalone/installed mode
    if (
      window.matchMedia('(display-mode: standalone)').matches ||
      (window.navigator as any).standalone === true
    ) {
      setIsInstalled(true);
      return;
    }

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setIsInstallable(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    audioManager.playVictory();
    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsInstallable(false);
      audioManager.speak('مُبَارَك! تَمَّ تَثْبِيتُ تَطْبِيقِ لُومِي عَلَى هَاتِفِك!');
    }
    setDeferredPrompt(null);
  };

  // Don't render if already installed or not ready to install
  if (isInstalled || !isInstallable) {
    return null;
  }

  return (
    <button
      onClick={handleInstallClick}
      className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs border border-emerald-300/60 shadow-[0_0_20px_rgba(16,185,129,0.4)] active:scale-95 transition-all animate-pulse"
      title="تثبيت تطبيق لومي كتطبيق مباشر على هاتفك للعمل بدون إنترنت"
    >
      <Smartphone className="w-3.5 h-3.5" />
      <span>تَثْبِيتُ التَّطْبِيق 📲</span>
    </button>
  );
};
