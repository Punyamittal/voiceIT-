"use client"

import React, { useState, useRef } from 'react';
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Calendar, Menu, X, Mic, Instagram } from "lucide-react";
import ScrollFloat from "../../components/ScrollFloat";
import VariableProximity from "../../components/VariableProximity";
import { Navbar, NavBody, NavItems, NavbarLogo, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "../../components/ui/resizable-navbar";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import '../../styles/flip-cards.css';
import Aurora from '@/components/ui/aurora';

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

  const teamMembers = [
    // Core Team (These are dummy entries for image paths, actual team members are not relevant here)
    { image: "/team/magic1.jpg" },
    { image: "/team/dare1.jpg" },
    { image: "/team/exit1.jpg" },
  ];

  return (
    <>
      <div className="fixed inset-0 z-[-2] pointer-events-none" style={{ opacity: 1.8 }}>
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
            <NavItems items={NAV_ITEMS} />
            <MobileNav>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={isMenuOpen}
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
              </MobileNavHeader>
              <MobileNavMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}>
                {NAV_ITEMS.map((item, idx) => (
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
              {EVENTS_DATA.map((event, index) => (
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
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Past Events Section */}
        <section className="py-32 bg-neutral-dark relative">
          <div className="squares-overlay absolute inset-0 w-full h-full z-0" />
          <div className="container mx-auto px-4 relative z-10">
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
                      </h3>
                      <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-accent-orange via-accent-warm to-accent-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full"></div>
                    </div>
                    <p className="mt-4 px-6 py-2 bg-accent-orange/10 rounded-full backdrop-blur-sm text-sm text-accent-orange font-medium">
                      {event.tag}
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
              {SPONSORS_DATA.map((sponsor, index) => (
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
    </>
  );
};

export default EventsPage;