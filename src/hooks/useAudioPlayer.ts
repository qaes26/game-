import { useState, useCallback, useEffect } from 'react';
import { audioManager } from '../audio/AudioManager';

export interface UseAudioPlayerOptions {
  rate?: number;
  onEnd?: () => void;
}

export function useAudioPlayer() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentKey, setCurrentKey] = useState<string | null>(null);

  const play = useCallback(
    (keyOrText: string, options: UseAudioPlayerOptions = {}) => {
      if (!keyOrText || !keyOrText.trim()) return;

      setIsPlaying(true);
      setCurrentKey(keyOrText);

      audioManager.speak(keyOrText, options.rate || 0.85, () => {
        setIsPlaying(false);
        setCurrentKey(null);
        if (options.onEnd) {
          options.onEnd();
        }
      });
    },
    []
  );

  const stop = useCallback(() => {
    audioManager.stop();
    setIsPlaying(false);
    setCurrentKey(null);
  }, []);

  const playLetter = useCallback((letterIdOrChar: string, onEnd?: () => void) => {
    setIsPlaying(true);
    setCurrentKey(letterIdOrChar);
    audioManager.speakLetter(letterIdOrChar, () => {
      setIsPlaying(false);
      setCurrentKey(null);
      if (onEnd) onEnd();
    });
  }, []);

  const playWord = useCallback((word: string, onEnd?: () => void) => {
    setIsPlaying(true);
    setCurrentKey(word);
    audioManager.speakWord(word, () => {
      setIsPlaying(false);
      setCurrentKey(null);
      if (onEnd) onEnd();
    });
  }, []);

  const playSyllable = useCallback((syl: string, onEnd?: () => void) => {
    setIsPlaying(true);
    setCurrentKey(syl);
    audioManager.speakSyllable(syl, () => {
      setIsPlaying(false);
      setCurrentKey(null);
      if (onEnd) onEnd();
    });
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      // Don't interrupt background audio if navigating away unless component wants to
    };
  }, []);

  return {
    play,
    playLetter,
    playWord,
    playSyllable,
    stop,
    isPlaying,
    currentKey
  };
}
