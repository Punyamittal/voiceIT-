"use client";

import React, { createContext, useContext, useState, useCallback } from 'react';

interface AudioContextType {
  currentAudio: HTMLAudioElement | null;
  setCurrentAudio: (audio: HTMLAudioElement | null) => void;
  stopAllAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const stopAllAudio = useCallback(() => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
  }, [currentAudio]);

  return (
    <AudioContext.Provider value={{ currentAudio, setCurrentAudio, stopAllAudio }}>
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
} 