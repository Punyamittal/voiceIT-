"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Radio, Users, Headphones, Music, Youtube, Play, Pause, Volume2, VolumeX } from "lucide-react";
import ScrollFloat from "@/components/ScrollFloat";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Navbar, NavBody, NavItems, NavbarLogo, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/ui/resizable-navbar";
import CircularGallery from '@/components/CircularGallery'; // Import the new CircularGallery component
import '../../styles/clock-input.css'; // Import the new CSS file
import { Carousel, Card as AppleCard } from "@/components/ui/apple-cards-carousel";
import TiltedCard from '@/components/TiltedCard';
import Aurora from '@/components/ui/aurora';

import { useAudio } from '@/contexts/AudioContext';

const PodcastsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { currentAudio, setCurrentAudio, stopAllAudio } = useAudio();
  const [isLivePlaying, setIsLivePlaying] = useState(false);
  const [isLiveMuted, setIsLiveMuted] = useState(false);
  const [liveVolume, setLiveVolume] = useState(1);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/public/radiom.mp3");
      audioRef.current.volume = liveVolume;
    }

    const handlePlay = () => setIsLivePlaying(true);
    const handlePause = () => setIsLivePlaying(false);
    const handleVolumeChange = () => {
      if (audioRef.current) {
        setLiveVolume(audioRef.current.volume);
        setIsLiveMuted(audioRef.current.volume === 0);
      }
    };

    audioRef.current.addEventListener('play', handlePlay);
    audioRef.current.addEventListener('pause', handlePause);
    audioRef.current.addEventListener('volumechange', handleVolumeChange);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('play', handlePlay);
        audioRef.current.removeEventListener('pause', handlePause);
        audioRef.current.removeEventListener('volumechange', handleVolumeChange);
        audioRef.current = null;
      }
    };
  }, []);

  const toggleLivePlay = () => {
    if (!audioRef.current) return;

    if (isLivePlaying) {
      audioRef.current.pause();
      setCurrentAudio(null);
    } else {
      stopAllAudio();
      audioRef.current.play();
      setCurrentAudio(audioRef.current);
    }
  };

  const toggleLiveMute = () => {
    if (!audioRef.current) return;

    if (isLiveMuted) {
      audioRef.current.volume = liveVolume > 0 ? liveVolume : 1; // Restore previous volume or set to 1
      setIsLiveMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsLiveMuted(true);
    }
  };

  const handleLiveVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setLiveVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume === 0) {
      setIsLiveMuted(true);
    } else {
      setIsLiveMuted(false);
    }
  };

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/#about" },
    { name: "Team", link: "/#team" },
    { name: "Contact", link: "/#contact" },
    { name: "Podcasts", link: "/podcasts" },
    { name: "Events", link: "/events" },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[-2] pointer-events-none" style={{ opacity: 0.8 }}>
        <Aurora
          colorStops={["#FF6B00", "#FFFFFF", "#FF6B00"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="min-h-screen relative">
        <Navbar>
          <NavBody>
            <NavbarLogo />
            <NavItems items={navItems} />
            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </MobileNavHeader>
              <MobileNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                {navItems.map((item, idx) => (
                  <a
                    key={`mobile-nav-link-${idx}`}
                    href={item.link}
                    className="block px-3 py-2 text-base font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800 dark:hover:text-white"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
              </MobileNavMenu>
            </MobileNav>
          </NavBody>
        </Navbar>

        {/* Live Radio & Podcasts Section */}
        <section id="live" className="pt-16 py-16 bg-primary-bg/80 backdrop-blur-sm relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
                containerClassName="text-4xl font-bold text-text-primary"
                scrollContainerRef={scrollContainerRef}
              >
                Radio & Podcasts
              </ScrollFloat>
            </div>
            <div className="flex flex-col md:flex-row gap-8">
              {/* Live Radio Card */}
              <div className="flex-1 bg-primary-bg rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Live Radio</h3>
                  <p className="text-text-secondary mb-6">Your daily dose of music, news, and campus updates</p>
                  <br>
                  </br>
                  <br>
                  </br>
                  <div className="flex items-center justify-between mb-4">
                    <div className="clock-input">
                      <input type="radio" id="v1" name="radio" onChange={() => { if (audioRef.current) audioRef.current.volume = 0; setIsLiveMuted(true); }} />
                      <input type="radio" id="v2" name="radio" onChange={() => { if (audioRef.current) audioRef.current.volume = 0.2; setIsLiveMuted(false); }} />
                      <input type="radio" id="v3" name="radio" onChange={() => { if (audioRef.current) audioRef.current.volume = 0.4; setIsLiveMuted(false); }} />
                      <input type="radio" id="v4" name="radio" onChange={() => { if (audioRef.current) audioRef.current.volume = 0.6; setIsLiveMuted(false); }} />
                      <input type="radio" id="v5" name="radio" onChange={() => { if (audioRef.current) audioRef.current.volume = 0.8; setIsLiveMuted(false); }} />
                      <input type="radio" id="v6" name="radio" defaultChecked onChange={() => { if (audioRef.current) audioRef.current.volume = 1; setIsLiveMuted(false); }} />
                      <label htmlFor="v1" id="l1"></label>
                      <label htmlFor="v2" id="l2"></label>
                      <label htmlFor="v3" id="l3"></label>
                      <label htmlFor="v4" id="l4"></label>
                      <label htmlFor="v5" id="l5"></label>
                      <label htmlFor="v6" id="l6"></label>
                      <div className="dial"></div>
                      <div className="notches">
                        <div className="notch" style={{ '--n': 1 } as React.CSSProperties}></div>
                        <div className="notch" style={{ '--n': 2 } as React.CSSProperties}></div>
                        <div className="notch" style={{ '--n': 3 } as React.CSSProperties}></div>
                        <div className="notch" style={{ '--n': 4 } as React.CSSProperties}></div>
                        <div className="notch" style={{ '--n': 5 } as React.CSSProperties}></div>
                        <div className="notch" style={{ '--n': 6 } as React.CSSProperties}></div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <p className="text-sm font-medium text-text-primary">VoiceIT Live Radio</p>
                      <button
                        onClick={toggleLivePlay}
                        className="p-2 rounded-full bg-accent-orange text-white hover:bg-accent-orange/90 transition-colors"
                      >
                        {isLivePlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Podcasts Card */}
              <div className="flex-1 bg-primary-bg rounded-lg overflow-hidden shadow-lg">
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-4">Latest Podcasts</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Tech Talk Tuesday",
                        icon: <Radio className="h-6 w-6 text-accent-warm" />,
                        description: "Latest tech trends and discussions",
                        audioUrl: "/podcasts/tech-talk-ep1.mp3"
                      },
                      {
                        title: "Campus Chronicles",
                        icon: <Users className="h-6 w-6 text-accent-warm" />,
                        description: "Student life and campus events",
                        audioUrl: "/podcasts/campus-chronicles-ep1.mp3"
                      },
                      {
                        title: "Music & More",
                        icon: <Headphones className="h-6 w-6 text-accent-warm" />,
                        description: "Music reviews and artist interviews",
                        audioUrl: "/podcasts/music-more-ep1.mp3"
                      }
                    ].map((podcast, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-accent-warm/5 p-3 rounded-lg hover:bg-accent-warm/10 transition-colors">
                        <div className="flex-shrink-0 bg-accent-warm/10 p-2 rounded-lg">
                          {podcast.icon}
                        </div>
                        <div className="flex-grow min-w-0">
                          <h4 className="font-medium text-text-primary text-sm truncate">{podcast.title}</h4>
                          <p className="text-xs text-text-secondary truncate">{podcast.description}</p>
                        </div>
                        {/* Removed AudioPlayer for individual podcasts, can be re-added with a different component if needed */}
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 space-y-3">
                    <div className="flex flex-col gap-4">
                      <a
                        href="https://www.youtube.com/@voiceit_vitcc"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-accent-warm/10 hover:bg-accent-warm/20 text-accent-warm rounded-lg transition-all duration-300 hover:scale-105"
                      >
                        <Youtube className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="font-medium">Watch on YouTube</span>
                      </a>
                      <a
                        href="https://open.spotify.com/show/your-show-id"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-2 px-4 py-2 bg-accent-warm/10 hover:bg-accent-warm/20 text-accent-warm rounded-lg transition-all duration-300 hover:scale-105"
                      >
                        <Music className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="font-medium">Listen on Spotify</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Podcast Episodes Carousel Section */}
        <section id="podcast-episodes" className="py-16 bg-primary-bg/80 backdrop-blur-sm relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
                containerClassName="text-4xl font-bold text-text-primary"
                scrollContainerRef={scrollContainerRef}
              >
                Featured Episodes
              </ScrollFloat>
              <p className="text-xl text-text-secondary mt-4">
                Discover our latest podcast episodes and exclusive content
              </p>
            </div>
            <div className="w-full h-full py-20">
              <Carousel items={[
                {
                  title: "Tech Talk Tuesday - Episode 1",
                  description: "Latest tech trends and discussions",
                  image: "/placeholder.jpg",
                  audioUrl: "/podcasts/tech-talk-ep1.mp3"
                },
                {
                  title: "Campus Chronicles - Episode 1", 
                  description: "Student life and campus events",
                  image: "/placeholder.jpg",
                  audioUrl: "/podcasts/campus-chronicles-ep1.mp3"
                },
                {
                  title: "Music & More - Episode 1",
                  description: "Music reviews and artist interviews", 
                  image: "/placeholder.jpg",
                  audioUrl: "/podcasts/music-more-ep1.mp3"
                },
                {
                  title: "VoiceIT Special - Episode 1",
                  description: "Behind the scenes of our radio club",
                  image: "/placeholder.jpg", 
                  audioUrl: "/podcasts/voiceit-special-ep1.mp3"
                },
                {
                  title: "Interview Series - Episode 1",
                  description: "Exclusive interviews with industry experts",
                  image: "/placeholder.jpg",
                  audioUrl: "/podcasts/interview-series-ep1.mp3"
                }
              ].map((episode, index) => (
                <div key={index} className="px-2">
                  <TiltedCard
                    imageSrc={episode.image}
                    altText={episode.title}
                    containerHeight="400px"
                    containerWidth="300px"
                    imageHeight="400px"
                    imageWidth="300px"
                    displayOverlayContent={true}
                    showTooltip={true}
                    scaleOnHover={1.05}
                    rotateAmplitude={10}
                    showMobileWarning={false}
                    overlayContent={
                      <div className="text-center text-white p-4">
                        <h3 className="text-lg font-bold mb-2">{episode.title}</h3>
                        <p className="text-sm mb-4">{episode.description}</p>
                        <button className="bg-accent-orange hover:bg-accent-orange/90 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors">
                          Listen Now
                        </button>
                      </div>
                    }
                  />
                </div>
              ))} />
            </div>
          </div>
        </section>

        {/* Celebrity Feedback Section */}
        <section id="celebrity-feedback" className="py-16 bg-primary-bg/80 backdrop-blur-sm relative">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <ScrollFloat
                animationDuration={1}
                ease="back.inOut(2)"
                scrollStart="center bottom+=50%"
                scrollEnd="bottom bottom-=40%"
                stagger={0.03}
                containerClassName="text-4xl font-bold text-text-primary"
                scrollContainerRef={scrollContainerRef}
              >
                Celebrity Feedback
              </ScrollFloat>
            </div>
            <div style={{ height: '600px', position: 'relative' }}>
              <CircularGallery bend={3} textColor="#ffffff" borderRadius={0.05} />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default PodcastsPage;