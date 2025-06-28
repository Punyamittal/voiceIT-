"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import {
  Mic,
  Radio,
  Users,
  Calendar,
  Play,
  Instagram,
  Twitter,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Headphones,
  Volume2,
  Waves,
  Music,
} from "lucide-react"
import ScrollFloat from "@/components/ScrollFloat"
import VariableProximity from "@/components/VariableProximity"
import Ribbons from "@/components/Ribbons"
import { AudioPlayer } from '@/components/AudioPlayer'
import Image from "next/image"
import TiltedCard from '../components/TiltedCard'
import { Carousel, Card as AppleCard } from "@/components/ui/apple-cards-carousel"
import { EvervaultCard, Icon } from "@/components/ui/evervault-card"
import TypewriterEffect from '@/components/TypewriterEffect';
import Aurora from '@/components/ui/aurora';
  
export default function VoiceITWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")
  const [barHeights, setBarHeights] = useState<number[]>([])
  const [smallBarHeights, setSmallBarHeights] = useState<number[]>([])
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] = useState(false)
  
  // Add refs for all text containers
  const heroRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const eventsRef = useRef<HTMLDivElement>(null)
  const teamRef = useRef<HTMLDivElement>(null)
  const liveRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const footerRef = useRef<HTMLDivElement>(null)

  // Add refs for text containers
  const heroTextRef = useRef<HTMLDivElement>(null)
  const aboutTextRef = useRef<HTMLDivElement>(null)
  const eventsTextRef = useRef<HTMLDivElement>(null)
  const teamTextRef = useRef<HTMLDivElement>(null)
  const liveTextRef = useRef<HTMLDivElement>(null)
  const contactTextRef = useRef<HTMLDivElement>(null)
  const footerTextRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Function to generate random heights
  const generateHeights = (count: number, min: number, max: number) => {
    return Array.from({ length: count }, () => {
      // Randomly decide if this bar should be very small
      const shouldBeSmall = Math.random() < 0.4; // 40% chance to be small
      if (shouldBeSmall) {
        return Math.random() * 2; // Height between 0-2px
      }
      return Math.random() * (max - min) + min;
    });
  }

  // Update bar heights frequently
  useEffect(() => {
    const updateHeights = () => {
      setBarHeights(generateHeights(5, 10, 80))
      setSmallBarHeights(generateHeights(8, 5, 40))
    }

    // Initial heights
    updateHeights()

    // Update heights every 100ms
    const interval = setInterval(updateHeights, 800)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "events", "team", "live", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const events = [
    {
      title: "RJ Battle Championship",
      date: "March 15, 2024",
      time: "6:00 PM",
      description: "Annual competition to find VIT's next radio star",
    },
    {
      title: "Open Mic Night",
      date: "March 22, 2024",
      time: "7:30 PM",
      description: "Share your voice, stories, and talents with the community",
    },
    {
      title: "Podcast Workshop",
      date: "March 29, 2024",
      time: "4:00 PM",
      description: "Learn the art of podcasting from industry professionals",
    },
  ]

  const teamMembers = [
    // Advisory Board
    { image: "/team/advisory-varishth.jpg" },
    { image: "/team/advisory-srinidhi.jpg" },
    { image: "/team/advisory-dishitha.jpg" },
    { image: "/team/advisory-malavika.jpg" },
    { image: "/team/advisory-midun.jpg" },
    // Core Team
    { image: "/team/pranav2.jpg" },
    { image: "/team/hemshyam.jpg" },
    { image: "/team/sideshwar.jpg" },
    { image: "/team/priyanka.jpg" },
    { image: "/team/sai.jpg" },
    { image: "/team/kamalesh.jpg" },
    // HR Team
    { image: "/team/hr-shanmitha.jpg" },
    { image: "/team/hr-dharsan_j_k.jpg" },
    { image: "/team/hr-haseeb-ahsan.jpg" },
    // Language Teams
    { image: "/team/telugu2.jpg" },
    { image: "/team/telugu11.jpg" },
    { image: "/team/eng-tannya.jpg" },
    { image: "/team/eng-deekshitha.jpg" },
    { image: "/team/tamil-jerome.jpg" },
    { image: "/team/tamil-afzal.jpg" },
    { image: "/team/tamil-aruthra.jpg" },
    { image: "/team/tamil-ramanan.jpg" },
    { image: "/team/tamil-rajaraman.jpg" },
    { image: "/team/malyalam-lakshmi.jpg" },
    { image: "/team/malyalam-goutham.jpg" },
    { image: "/team/hin-aman.jpg" },
    
    // Content Team
    { image: "/team/content-vahini.jpg" },
    { image: "/team/content-divya.jpg" },
    { image: "/team/content-monica.jpg" },
    // Design Team
    { image: "/team/design-guru.jpg" },
    { image: "/team/design-yoha.jpg" },

    
    // Tech Team
    { image: "/team/tech-rishika.jpg" },
    // Camera & Editing Team
    { image: "/team/camera-annamalai.jpg" },
    { image: "/team/camera-mithin.jpg" },
    { image: "/team/editing-adithya.jpg" },
    { image: "/team/editing-munis.jpg" }
    
    
  ]

  // Add cursor effect state
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Handle mouse move for cursor effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setCursorPosition({ x, y });
  };

  return (
    <div className="min-h-screen relative bg-primary-bg/80 backdrop-blur-sm">
      {/* Aurora Background */}
      <div className="fixed left-0 top-0 w-full h-[70vh] pointer-events-none z-[-1]">
        <Aurora
          colorStops={["#FF6B00", "#FFFFFF", "#FF6B00"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      {/* Background Music Player */}
      <div className="fixed bottom-4 right-4 z-50">
        <AudioPlayer 
          audioUrl="/radiom.mp3" 
          title="Background Music"
          className="bg-primary-bg/80 backdrop-blur-md p-2 rounded-lg shadow-lg"
        />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-primary-bg/80 backdrop-blur-md border-b border-neutral-light z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-accent-orange p-2 rounded-full">
                <Mic className="h-6 w-6 text-white" />
              </div>
              <div ref={navRef} style={{ position: 'relative' }}>
                <VariableProximity
                  label="Voice IT"
                  className="text-4xl font-bold text-text-primary"
                  fromFontVariationSettings="'wght' 400, 'opsz' 9"
                  toFontVariationSettings="'wght' 1000, 'opsz' 40"
                  containerRef={navRef as React.RefObject<HTMLElement>}
                  radius={100}
                  falloff="linear"
                />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "team"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`capitalize transition-colors ${
                    activeSection === section
                      ? "text-accent-orange font-semibold"
                      : "text-text-secondary hover:text-accent-orange"
                  }`}
                >
                  {section}
                </button>
              ))}
              <a
                href="/recruitment"
                className={`capitalize transition-colors ${
                  activeSection === "recruitment"
                    ? "text-accent-orange font-semibold"
                    : "text-text-secondary hover:text-accent-orange"
                }`}
              >
                Recruitment
              </a>
              <a
                href="/podcasts"
                className={`capitalize transition-colors ${
                  activeSection === "podcasts"
                    ? "text-accent-orange font-semibold"
                    : "text-text-secondary hover:text-accent-orange"
                }`}
              >
                Podcasts
              </a>
              <a
                href="/events"
                className={`capitalize transition-colors ${
                  activeSection === "events"
                    ? "text-accent-orange font-semibold"
                    : "text-text-secondary hover:text-accent-orange"
                }`}
              >
                Events
              </a>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-text-secondary hover:text-accent-orange"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-primary-bg border-t border-neutral-light">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {["home", "about", "team"].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-accent-orange capitalize w-full text-left"
                >
                  {section}
                </button>
              ))}
              <a
                href="/recruitment"
                className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-accent-orange capitalize w-full text-left"
              >
                Recruitment
              </a>
              <a
                href="/podcasts"
                className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-accent-orange capitalize w-full text-left"
              >
                Podcasts
              </a>
              <a
                href="/events"
                className="block px-3 py-2 text-base font-medium text-text-secondary hover:text-accent-orange capitalize w-full text-left"
              >
                Events
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-2">
                <TypewriterEffect
                  words={["Voice IT", "वॉइस इट", "വോയിസ് ഇറ്റ്", "వాయిస్ ఇట్", "வாய்ஸ் இட்", "ವಾಯ್ಸ್ ಇಟ್"]
                  }
                  className="text-7xl font-bold text-accent-orange"
                />
                <ScrollFloat
                  animationDuration={1}
                  ease="back.inOut(2)"
                  scrollStart="center bottom+=50%"
                  scrollEnd="bottom bottom-=40%"
                  stagger={0.03}
                  containerClassName="text-6xl font-bold text-text-primary"
                  scrollContainerRef={scrollContainerRef}
                >
                  <TypewriterEffect
                    words={["Voice IT", "वॉइस आईटी", "வாய்ஸ் ஐடி", "వాయిస్ ఐటి", "വോയ്സ് ഐടി"]}
                    className="text-6xl font-bold text-text-primary"
                  />
                </ScrollFloat>
                <p className="text-xl text-text-secondary max-w-lg">
                  <VariableProximity
                    label="Where voices come alive and stories find their rhythm. Join VIT Chennai's premier radio community."
                    className="text-xl text-text-secondary"
                    fromFontVariationSettings="'wght' 400, 'opsz' 9"
                    toFontVariationSettings="'wght' 1000, 'opsz' 40"
                    containerRef={heroTextRef as React.RefObject<HTMLElement>}
                    radius={100}
                    falloff="linear"
                  />
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-accent-orange hover:bg-accent-orange/90 text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-accent-orange/25"
                  onClick={() => window.location.href = "/recruitment"}
                >
                  Join the Club
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent-warm text-accent-warm hover:bg-accent-warm hover:text-white px-8 py-3 rounded-full font-semibold transition-all"
                  onClick={() => scrollToSection("live")}
                >
                  <Play className="w-4 h-4 mr-2" />
                  Listen Live
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-gradient-to-br from-accent-orange/10 to-accent-warm/10 rounded-3xl p-8 backdrop-blur-sm border border-accent-orange">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <div className="w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-text-secondary font-medium">ON AIR</span>
                </div>
                <div className="flex items-center justify-center mb-8">
                  <div className="bg-accent-orange p-6 rounded-full">
                    <Radio className="h-12 w-12 text-white" />
                  </div>
                </div>
                <div className="h-20 flex justify-center space-x-2 mb-4">
                  {barHeights.map((height, i) => (
                    <div
                      key={i}
                      className="w-2 bg-accent-orange rounded-full transition-all duration-500"
                      style={{
                        height: `${height}px`,
                        marginTop: 'auto'
                      }}
                    ></div>
                  ))}
                </div>
                <p className="text-center text-text-secondary">Broadcasting creativity across campus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-primary-bg/80 backdrop-blur-sm relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollFloat
              animationDuration={1}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="text-4xl font-bold text-text-primary"
              scrollContainerRef={scrollContainerRef}
            >
              About Voice IT
            </ScrollFloat>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto mt-4">
              <VariableProximity
                label="We're more than just a radio club – we're a community of storytellers, creators, and voice artists passionate about audio expression."
                className="text-xl text-text-secondary"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={aboutTextRef as React.RefObject<HTMLElement>}
                radius={100}
                falloff="linear"
              />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-primary-bg border-accent-orange hover:shadow-lg transition-all duration-300 hover:border-accent-orange/30">
              <CardContent className="p-8 text-center">
                <div className="h-[300px] w-full">
                  <EvervaultCard text="Creative Expression" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Creative Expression</h3>
                <p className="text-text-secondary">
                  Discover your unique voice through radio shows, podcasts, and live performances that showcase your
                  creativity.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-bg border-accent-orange hover:shadow-lg transition-all duration-300 hover:border-accent-orange/30">
              <CardContent className="p-8 text-center">
                <div className="h-[300px] w-full">
                  <EvervaultCard text="Community" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Community Building</h3>
                <p className="text-text-secondary">
                  Connect with like-minded individuals and build lasting friendships through shared passion for audio
                  arts.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-primary-bg border-accent-orange hover:shadow-lg transition-all duration-300 hover:border-accent-orange/30">
              <CardContent className="p-8 text-center">
                <div className="h-[300px] w-full">
                  <EvervaultCard text="Skills" />
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-4">Skill Development</h3>
                <p className="text-text-secondary">
                  Learn professional broadcasting techniques, audio editing, and public speaking in a supportive
                  environment.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="py-20 bg-primary-bg/80 backdrop-blur-sm relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <ScrollFloat
              animationDuration={0.5}
              ease="back.inOut(2)"
              scrollStart="center bottom+=50%"
              scrollEnd="bottom bottom-=40%"
              stagger={0.03}
              containerClassName="text-4xl font-bold text-text-primary"
              scrollContainerRef={scrollContainerRef}
            >
              Meet Our Team
            </ScrollFloat>
            <p className="text-xl text-text-secondary mt-4">
              <VariableProximity
                label="The voices behind Voice IT who make the magic happen"
                className="text-xl text-text-secondary"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={teamTextRef as React.RefObject<HTMLElement>}
                radius={100}
                falloff="linear"
              />
            </p>
          </div>

          <div className="w-full h-full py-20">
            <Carousel items={teamMembers.map((member, index) => (
              <div key={member.image} className="px-2">
                <TiltedCard
                  imageSrc={member.image}
                  altText="Team Member"
                  containerHeight="400px"
                  containerWidth="300px"
                  imageHeight="400px"
                  imageWidth="300px"
                  displayOverlayContent={false}
                  showTooltip={false}
                  scaleOnHover={1.05}
                  rotateAmplitude={10}
                  showMobileWarning={false}
                />
              </div>
            ))} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary-bg border-t border-neutral-light py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Voice IT</h3>
              <p className="text-neutral-light">
                The official RJ Club of VIT Chennai, bringing you the best in campus radio and entertainment.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="text-neutral-light hover:text-accent transition-colors">Home</a></li>
                <li><a href="#about" className="text-neutral-light hover:text-accent transition-colors">About</a></li>
                <li><a href="#team" className="text-neutral-light hover:text-accent transition-colors">Team</a></li>
                <li><a href="#contact" className="text-neutral-light hover:text-accent transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-neutral-light hover:text-accent transition-colors">Instagram</a></li>
                
              
                <li><a href="https://youtu.be/GV1CV79Gr4k" target="_blank" rel="noopener noreferrer" className="text-neutral-light hover:text-accent transition-colors">YouTube</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Contact</h3>
              <ul className="space-y-2">
                <li className="text-neutral-light">VIT Chennai Campus</li>
                <li className="text-neutral-light">Chennai, Tamil Nadu</li>
                <li className="text-neutral-light">Email: voiceit.vitchennai@gmail.com</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-neutral-light text-center">
            <p className="text-neutral-light">
              © {new Date().getFullYear()} Voice IT. All rights reserved.
            </p>
            <p className="text-neutral-light mt-2">
              Created and Designed by{" "}
              <a
                href="https://www.linkedin.com/in/punya-mittal-a1122520b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 font-medium transition-colors duration-200 inline-flex items-center gap-1"
              >
                Punya Mittal
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <span className="mx-1">and</span>
              <a
                href="https://www.linkedin.com/in/hirendrabalaji/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-accent/80 font-medium transition-colors duration-200 inline-flex items-center gap-1"
              >
                Hirendra Balaji
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
