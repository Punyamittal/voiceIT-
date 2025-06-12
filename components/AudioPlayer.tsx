"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useAudio } from '@/contexts/AudioContext';

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  className?: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, title, className = '' }) => {
  const [isPlaying, setIsPlaying] = useState(false);
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

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentAudio(null);
    } else {
      stopAllAudio(); // Stop any currently playing audio
      audioRef.current.play();
      setIsPlaying(true);
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
    <div className={`flex items-center space-x-4 ${className}`}>
      <button
        onClick={togglePlay}
        className="p-2 rounded-full bg-accent-orange text-white hover:bg-accent-orange/90 transition-colors"
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
      
      <div className="flex-1">
        <p className="text-sm font-medium text-text-primary">{title}</p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={toggleMute}
          className="p-1 rounded-full hover:bg-neutral-light/10 transition-colors"
        >
          {isMuted ? (
            <VolumeX className="h-4 w-4 text-text-secondary" />
          ) : (
            <Volume2 className="h-4 w-4 text-text-secondary" />
          )}
        </button>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className="w-20 accent-accent-orange"
        />
      </div>
    </div>
  );
}; 