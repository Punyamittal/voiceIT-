"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title, className = '' }) => {
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentAudio, setCurrentAudio, stopAllAudio } = useAudio();

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(audioUrl);
      audioRef.current.volume = volume;
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (currentAudio === audioRef.current) { // If this audio is currently playing
      audioRef.current.pause();
      setCurrentAudio(null);
    } else {
      stopAllAudio(); // Stop any currently playing audio
      audioRef.current.play();
      setCurrentAudio(audioRef.current);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex-1">
        <p className="text-sm font-medium text-text-primary">{title}</p>
      </div>
    </div>
  );
}; 