"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Calendar, Menu, X, Mic, Instagram } from "lucide-react";
import ScrollFloat from "../../components/ScrollFloat";
import VariableProximity from "../../components/VariableProximity";
import { Navbar, NavBody, NavItems, NavbarLogo, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "../../components/ui/resizable-navbar";
import Image from "next/image";
import Folder from '@/components/Folder';
import { Badge } from "@/components/ui/badge";

const SPONSORS_DATA = [
  {
    name: "SRS APPLIANCE",
    logo: "/placeholder-logo.png",
    description: "Leading technology solutions provider",
    tier: "Platinum Sponsor"
  },
  {
    name: "SGR 777",
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
    name: "AudioTech",
    logo: "/placeholder-logo.png",
    description: "Professional audio equipment manufacturer",
    tier: "Silver Sponsor"
  }
];

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

  const teamMembers = [
    // Core Team (These are dummy entries for image paths, actual team members are not relevant here)
    { image: "/team/magic1.jpg" },
    { image: "/team/dare1.jpg" },
    { image: "/team/exit1.jpg" },
  ];

  const navItems = [
    { name: "Home", link: "/" },
    { name: "About", link: "/#about" },
    { name: "Team", link: "/#team" },
    { name: "Recruitment", link: "/recruitment" },
    { name: "Podcasts", link: "/podcasts" },
    { name: "Events", link: "/events" },
  ];

  return (
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
            {events.map((event, index) => (
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
                  <ClockInput />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events Section */}
      <section className="py-32 bg-neutral-dark">
        <div className="container mx-auto px-4">
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
                    </h3>
                    <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent-orange via-accent-warm to-accent-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                  </div>
                  <p className="mt-4 px-6 py-2 bg-accent-orange/10 rounded-full backdrop-blur-sm text-sm text-accent-orange font-medium">
                    {index === 0 ? "Experience the Magic" : index === 1 ? "Take the Challenge" : "Find Your Way"}
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
            <div className="flex justify-center mb-4">
              <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-accent-orange to-accent-warm shadow-lg">
                <svg width="28" height="28" fill="none" viewBox="0 0 24 24"><path d="M12 2L15 8L22 9L17 14L18 21L12 18L6 21L7 14L2 9L9 8L12 2Z" fill="#fff"/></svg>
              </span>
            </div>
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

          {/* Sponsors Cards Box */}
          <div className="mx-auto max-w-5xl bg-white/90 dark:bg-neutral-900/80 rounded-3xl shadow-2xl p-10 md:p-14 flex flex-col items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center items-stretch w-full">
              {SPONSORS_DATA.map((sponsor, index) => (
                <Card
                  key={index}
                  className="bg-gradient-to-br from-orange-50 via-white to-orange-100 border-accent-orange hover:shadow-2xl transition-all duration-300 hover:border-accent-orange/70 flex flex-col h-full min-h-[320px] justify-stretch items-stretch transform-gpu hover:scale-105 opacity-0 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.12 + 0.1}s`, animationFillMode: 'forwards' }}
                >
                  <CardContent className="flex flex-col h-full p-8 items-center justify-start">
                    <div className="w-20 h-20 mx-auto mb-4 bg-accent-orange/10 rounded-full flex items-center justify-center shadow-md">
                      <Image
                        src={sponsor.logo}
                        alt={sponsor.name + ' logo'}
                        aria-label={sponsor.name + ' logo'}
                        width={60}
                        height={60}
                        className="rounded-lg"
                      />
                    </div>
                    <h3 className="text-xl font-semibold text-text-primary mb-2 text-center drop-shadow-sm">{sponsor.name}</h3>
                    <p className="text-text-secondary text-sm mb-3 text-center">{sponsor.description}</p>
                    <div className="mt-auto w-full flex justify-center">
                      <Badge className="bg-gradient-to-r from-accent-orange to-accent-warm text-white border-0 px-4 py-2 text-base font-bold shadow-md rounded-full">
                        {sponsor.tier}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
              {/* Add placeholder cards if less than 3 sponsors */}
              {Array.from({ length: Math.max(0, 3 - SPONSORS_DATA.length) }).map((_, idx) => (
                <Card
                  key={`placeholder-${idx}`}
                  className="bg-neutral-lightest border-dashed border-2 border-neutral-200 min-h-[320px] flex flex-col justify-center items-center opacity-0"
                  aria-hidden="true"
                >
                  <CardContent className="p-6" />
                </Card>
              ))}
            </div>
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
        <style jsx>{`
          @keyframes fade-in-up {
            0% { opacity: 0; transform: translateY(40px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in-up {
            animation: fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
          }
        `}</style>
      </section>
    </div>
  );
};

export default EventsPage;