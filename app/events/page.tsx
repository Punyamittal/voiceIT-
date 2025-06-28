"use client"

<<<<<<< HEAD
import React, { useState, useEffect, useRef } from 'react';
=======
import React, { useState, useRef } from 'react';
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Calendar, Menu, X, Mic, Instagram } from "lucide-react";
import ScrollFloat from "../../components/ScrollFloat";
import VariableProximity from "../../components/VariableProximity";
import { Navbar, NavBody, NavItems, NavbarLogo, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "../../components/ui/resizable-navbar";
<<<<<<< HEAD
import Image from "next/image";
import Folder from '@/components/Folder';
import { Badge } from "@/components/ui/badge";

<style jsx global>{`
.clock-input {
  display: flex;
  position: relative;
  width: 60px;
  height: 60px;
  --a: #0004, #fff4;
  --b: var(--a), var(--a), var(--a);
  --c: var(--b), var(--b), var(--b);
  background: conic-gradient(
      from -2deg,
      #efefff88,
      #00000088,
      #efefff88,
      #00000088,
      #efefff88
    ),
    radial-gradient(var(--c), var(--c)),
    radial-gradient(circle at 12% 12%, #efefff, #9999a4);
  background-size: calc(100% + 8px) calc(100% + 8px);
  background-position: -4px -4px;
  border: 4px solid #0005;
  border-radius: 50%;
}
.clock-input input {
  display: none;
  pointer-events: none;
}
.dial {
  position: absolute;
  width: 26px;
  height: 4px;
  border-radius: 99px;
  background-color: #000b;
  top: calc(50% - 2px);
  left: calc(50% - 2px);
  transform-origin: 2px 50%;
  pointer-events: none;
  transition: 0.15s;
  animation: owo 0.15s;
}
@keyframes owo {
  0% {
    transform: rotate(-60deg);
  }
  to {
    transform: rotate(0deg);
  }
}
.clock-input label {
  position: absolute;
  width: 48px;
  height: 48px;
  cursor: pointer;
}
#v1:checked ~ #l2 {
  z-index: 2;
}
#v1:checked ~ .dial {
  transform: rotate(0deg);
}
#v2:checked ~ #l3 {
  z-index: 2;
}
#v2:checked ~ .dial {
  transform: rotate(60deg);
  animation: none;
}
#v3:checked ~ #l4 {
  z-index: 2;
}
#v3:checked ~ .dial {
  transform: rotate(120deg);
  animation: none;
}
#v4:checked ~ #l5 {
  z-index: 2;
}
#v4:checked ~ .dial {
  transform: rotate(180deg);
  animation: none;
}
#v5:checked ~ #l6 {
  z-index: 2;
}
#v5:checked ~ .dial {
  transform: rotate(240deg);
  animation: none;
}
#v6:checked ~ #l1 {
  z-index: 2;
}
#v6:checked ~ .dial {
  transform: rotate(300deg);
  animation: none;
}
.notch {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 8px;
  height: 1px;
  background-color: #fffc;
  transform: translate(-50%) rotate(calc((var(--n) - 1) * 60deg))
    translateX(38px);
  counter-reset: section;
}
.notch::before {
  content: counter(section);
  position: absolute;
  counter-set: section var(--n);
  color: #fffc;
  transform: translate(12px, -50%) rotate(calc((var(--n) - 1) * -60deg));
  font-size: 12px;
}
`}</style>

const ClockInput = () => (
  <div className="clock-input">
    <input type="radio" id="v1" name="radio" defaultChecked />
    <input type="radio" id="v2" name="radio" />
    <input type="radio" id="v3" name="radio" />
    <input type="radio" id="v4" name="radio" />
    <input type="radio" id="v5" name="radio" />
    <input type="radio" id="v6" name="radio" />
    <label htmlFor="v1" id="l1"></label>
    <label htmlFor="v2" id="l2"></label>
    <label htmlFor="v3" id="l3"></label>
    <label htmlFor="v4" id="l4"></label>
    <label htmlFor="v5" id="l5"></label>
    <label htmlFor="v6" id="l6"></label>
    <div className="dial"></div>
    <div className="notches">
      <div className="notch" style={{ ['--n' as any]: 1 }}></div>
      <div className="notch" style={{ ['--n' as any]: 2 }}></div>
      <div className="notch" style={{ ['--n' as any]: 3 }}></div>
      <div className="notch" style={{ ['--n' as any]: 4 }}></div>
      <div className="notch" style={{ ['--n' as any]: 5 }}></div>
      <div className="notch" style={{ ['--n' as any]: 6 }}></div>
    </div>
  </div>
);

const EventsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const eventsRef = useRef<HTMLDivElement>(null);
  const eventsTextRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

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
  ];
=======
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import '../../styles/flip-cards.css';

// Data moved outside component for better performance
const EVENTS_DATA = [
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
];

const PAST_EVENTS_DATA = [
  {
    title: "Magic Show",
    date: "December 15, 2023",
    description: "A comprehensive workshop on radio broadcasting techniques and equipment handling.",
    highlights: "150+ participants, 8 industry experts",
    tag: "Experience the Magic"
  },
  {
    title: "Dare Dash 2.0",
    date: "October 20, 2023",
    description: "Our annual showcase featuring the best of campus radio and entertainment.",
    highlights: "Live performances, Guest RJs",
    tag: "Take the Challenge"
  },
  {
    title: "Emergency Exit 2.0",
    date: "August 5, 2023",
    description: "Learn the art of podcasting from industry professionals.",
    highlights: "Hands-on training, Equipment demo",
    tag: "Find Your Way"
  }
];

const SPONSORS_DATA = [
  {
    name: "TechCorp",
    logo: "/placeholder-logo.png",
    description: "Leading technology solutions provider",
    tier: "Platinum Sponsor"
  },
  {
    name: "MediaHub",
    logo: "/placeholder-logo.png", 
    description: "Digital media and broadcasting experts",
    tier: "Gold Sponsor"
  },
  {
    name: "AudioTech",
    logo: "/placeholder-logo.png",
    description: "Professional audio equipment manufacturer",
    tier: "Silver Sponsor"
  },
  {
    name: "CampusConnect",
    logo: "/placeholder-logo.png",
    description: "Student engagement platform",
    tier: "Bronze Sponsor"
  }
];

const NAV_ITEMS = [
  { name: "Home", link: "/" },
  { name: "About", link: "/#about" },
  { name: "Team", link: "/#team" },
  { name: "Recruitment", link: "/recruitment" },
  { name: "Podcasts", link: "/podcasts" },
  { name: "Events", link: "/events" },
];

const EventsPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const eventsTextRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8

  const teamMembers = [
    // Core Team (These are dummy entries for image paths, actual team members are not relevant here)
    { image: "/team/magic1.jpg" },
    { image: "/team/dare1.jpg" },
    { image: "/team/exit1.jpg" },
  ];

<<<<<<< HEAD
  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/#about" },
    { name: "Team", link: "/#team" },
    { name: "Recruitment", link: "/recruitment" },
    { name: "Podcasts", link: "/podcasts" },
    { name: "Events", link: "/events" },
  ];

=======
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
  return (
    <div className="min-h-screen relative">
      <Navbar>
        <NavBody>
          <NavbarLogo />
<<<<<<< HEAD
          <NavItems items={navItems} />
=======
          <NavItems items={NAV_ITEMS} />
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
          <MobileNav>
            <MobileNavHeader>
              <NavbarLogo />
              <MobileNavToggle
                isOpen={isMenuOpen}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </MobileNavHeader>
            <MobileNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
<<<<<<< HEAD
              {navItems.map((item, idx) => (
=======
              {NAV_ITEMS.map((item, idx) => (
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
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

      <section id="events" className="pt-16 py-20 bg-primary-bg/80 backdrop-blur-sm relative">
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
              Upcoming Events
            </ScrollFloat>
            <p className="text-xl text-text-secondary mt-4">
              <VariableProximity
                label="Don't miss out on our exciting lineup of events and workshops"
                className="text-xl text-text-secondary"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={eventsTextRef as React.RefObject<HTMLElement>}
                radius={100}
                falloff="linear"
              />
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
<<<<<<< HEAD
            {events.map((event, index) => (
=======
            {EVENTS_DATA.map((event, index) => (
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
              <Card
                key={index}
                className="bg-neutral-lightest border-neutral-light hover:shadow-lg transition-all duration-300 hover:border-accent-orange/30"
              >
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-accent-orange p-2 rounded-full mr-3">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-accent-orange font-semibold">{event.date}</p>
                      <p className="text-sm text-text-muted">{event.time}</p>
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-3">{event.title}</h3>
                  <p className="text-text-secondary">{event.description}</p>
                  <Button className="mt-4 w-full bg-accent-warm hover:bg-accent-warm/90 text-white rounded-full">
                    Register Now
                  </Button>
<<<<<<< HEAD
                  <ClockInput />
=======
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section */}
<<<<<<< HEAD
      <section className="py-32 bg-neutral-dark">
        <div className="container mx-auto px-4">
=======
      <section className="py-32 bg-neutral-dark relative">
        <div className="squares-overlay absolute inset-0 w-full h-full z-0" />
        <div className="container mx-auto px-4 relative z-10">
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=50%"
            scrollEnd="bottom bottom-=40%"
            stagger={0.03}
            containerClassName="text-4xl font-bold text-center mb-48 text-white"
            scrollContainerRef={scrollContainerRef}
          >
            Past Events
          </ScrollFloat>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mt-32">
<<<<<<< HEAD
            {[
              {
                title: "Radio Workshop 2023",
                date: "December 15, 2023",
                description: "A comprehensive workshop on radio broadcasting techniques and equipment handling.",
                highlights: "150+ participants, 8 industry experts"
              },
              {
                title: "Voice IT Annual Show",
                date: "October 20, 2023",
                description: "Our annual showcase featuring the best of campus radio and entertainment.",
                highlights: "Live performances, Guest RJs"
              },
              {
                title: "Podcast Masterclass",
                date: "August 5, 2023",
                description: "Learn the art of podcasting from industry professionals.",
                highlights: "Hands-on training, Equipment demo"
              }
            ].map((event, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div style={{ height: '300px', position: 'relative' }}>
                  <Folder 
                    size={3} 
                    color="#FF6B00" 
                    className="custom-folder"
                    items={index === 0 ? [
                      <Image key="magic1" src="/team/magic1.jpg" alt="Magic 1" width={100} height={100} className="w-full h-full object-cover rounded-lg" />,
                      <Image key="magic2" src="/team/magic3.jpg" alt="Magic 2" width={100} height={100} className="w-full h-full object-cover rounded-lg" />,
                      <Image key="magic3" src="/team/magic2.jpg" alt="Magic 3" width={100} height={100} className="w-full h-full object-cover rounded-lg" />
                    ] : index === 1 ? [
                      <Image key="dare1" src="/team/dare1.jpg" alt="Dare 1" width={100} height={100} className="w-full h-full object-cover rounded-lg" />,
                      <Image key="dare2" src="/team/dare3.jpg" alt="Dare 2" width={100} height={100} className="w-full h-full object-cover rounded-lg" />,
                      <Image key="dare3" src="/team/dare2.jpg" alt="Dare 3" width={100} height={100} className="w-full h-full object-cover rounded-lg" />
                    ] : [
                      <Image key="exit1" src="/team/exit1.jpg" alt="Exit 1" width={100} height={100} className="w-full h-full object-cover rounded-lg" />,
                      <Image key="exit2" src="/team/exit3.jpg" alt="Exit 2" width={100} height={100} className="w-full h-full object-cover rounded-lg" />,
                      <Image key="exit3" src="/team/exit2.jpg" alt="Exit 3" width={100} height={100} className="w-full h-full object-cover rounded-lg" />
                    ]}
                  />
                </div>
                <div className="mt-0.1 text-center transform transition-all duration-300 group-hover:scale-105">
                  <div className="relative inline-block">
                    <h3 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-accent-orange via-accent-warm to-accent-orange bg-clip-text text-transparent bg-size-200 animate-gradient">
                      {index === 0 ? "Magic Show" : index === 1 ? "Dare Dash 2.0" : "Emergency Exit 2.0"}
=======
            {PAST_EVENTS_DATA.map((event, index) => (
              <div key={index} className="flex flex-col items-center group">
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <div className="text-center">
                        <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                        <p className="text-sm opacity-90">{event.date}</p>
                      </div>
                    </div>
                    <div className="flip-card-back">
                      <div className="text-center p-4">
                        <p className="text-sm mb-2">{event.description}</p>
                        <p className="text-xs opacity-90">{event.highlights}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center transform transition-all duration-300 group-hover:scale-105">
                  <div className="relative inline-block">
                    <h3 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-accent-orange via-accent-warm to-accent-orange bg-clip-text text-transparent bg-size-200 animate-gradient">
                      {event.title}
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
                    </h3>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent-orange via-accent-warm to-accent-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                  </div>
                  <p className="mt-4 px-6 py-2 bg-accent-orange/10 rounded-full backdrop-blur-sm text-sm text-accent-orange font-medium">
<<<<<<< HEAD
                    {index === 0 ? "Experience the Magic" : index === 1 ? "Take the Challenge" : "Find Your Way"}
=======
                    {event.tag}
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-16 text-center">
            <a 
              href="https://www.instagram.com/voiceit_vitcc" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent-orange to-accent-warm text-white rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 hover:from-accent-warm hover:to-accent-orange group"
            >
              <Instagram className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              <span>View More Past Events</span>
              <div className="absolute inset-0 bg-white/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <p className="mt-4 text-text-secondary text-sm">Follow us on Instagram for more exciting events and updates!</p>
          </div>
        </div>
      </section>

      {/* Sponsors Section */}
      <section className="py-20 bg-primary-bg/80 backdrop-blur-sm relative">
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
              Our Sponsors
            </ScrollFloat>
            <p className="text-xl text-text-secondary mt-4">
              <VariableProximity
                label="Proudly supported by industry leaders who believe in the power of student voices"
                className="text-xl text-text-secondary"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={eventsTextRef as React.RefObject<HTMLElement>}
                radius={100}
                falloff="linear"
              />
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
<<<<<<< HEAD
            {[
              {
                name: "TechCorp",
                logo: "/placeholder-logo.png",
                description: "Leading technology solutions provider",
                tier: "Platinum Sponsor"
              },
              {
                name: "MediaHub",
                logo: "/placeholder-logo.png", 
                description: "Digital media and broadcasting experts",
                tier: "Gold Sponsor"
              },
              {
                name: "AudioTech",
                logo: "/placeholder-logo.png",
                description: "Professional audio equipment manufacturer",
                tier: "Silver Sponsor"
              },
              {
                name: "CampusConnect",
                logo: "/placeholder-logo.png",
                description: "Student engagement platform",
                tier: "Bronze Sponsor"
              }
            ].map((sponsor, index) => (
=======
            {SPONSORS_DATA.map((sponsor, index) => (
>>>>>>> 704f5f0596c7c85a2c3843ede71436367d1461a8
              <Card
                key={index}
                className="bg-neutral-lightest border-accent-orange hover:shadow-lg transition-all duration-300 hover:border-accent-orange/50"
              >
                <CardContent className="p-6 text-center">
                  <div className="w-20 h-20 mx-auto mb-4 bg-accent-orange/10 rounded-full flex items-center justify-center">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-text-primary mb-2">{sponsor.name}</h3>
                  <p className="text-text-secondary text-sm mb-3">{sponsor.description}</p>
                  <Badge className="bg-accent-orange/10 text-accent-orange border-accent-orange/20">
                    {sponsor.tier}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Button className="bg-accent-orange hover:bg-accent-orange/90 text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg hover:shadow-accent-orange/25">
              Become a Sponsor
            </Button>
            <p className="mt-4 text-text-secondary text-sm">
              Interested in supporting student initiatives? Get in touch with us!
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EventsPage;