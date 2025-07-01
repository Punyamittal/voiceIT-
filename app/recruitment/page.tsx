"use client"

import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, Instagram, Youtube, Music, Menu, X, Mic } from "lucide-react";
import ScrollFloat from "@/components/ScrollFloat";
import VariableProximity from "@/components/VariableProximity";
import { Navbar, NavBody, NavItems, NavbarLogo, MobileNav, MobileNavHeader, MobileNavToggle, MobileNavMenu } from "@/components/ui/resizable-navbar";
import JoinClubPage from '../components/JoinClubPage';
const RecruitmentPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const contactTextRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);

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

      {/* Contact Section */}
      <section id="contact" className="min-h-screen pt-16 py-20 bg-primary-bg/80 backdrop-blur-sm relative">
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
              Join Voice IT
            </ScrollFloat>
            <p className="text-xl text-text-secondary mt-4">
              <VariableProximity
                label="Ready to amplify your voice? Get in touch with us and become part of our community"
                className="text-xl text-text-secondary"
                fromFontVariationSettings="'wght' 400, 'opsz' 9"
                toFontVariationSettings="'wght' 1000, 'opsz' 40"
                containerRef={contactTextRef as React.RefObject<HTMLElement>}
                radius={100}
                falloff="linear"
              />
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-text-primary mb-6">Get in Touch</h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="bg-accent-orange/10 p-3 rounded-full">
                      <Mail className="h-5 w-5 text-accent-orange" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Email</p>
                      <p className="text-text-secondary">voiceit.vitchennai@gmail.com</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                  
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="bg-accent-orange/10 p-3 rounded-full">
                      <MapPin className="h-5 w-5 text-accent-orange" />
                    </div>
                    <div>
                      <p className="font-medium text-text-primary">Location</p>
                      <p className="text-text-secondary">VIT Chennai Campus, Kelambakkam</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-text-primary">Follow Us</h3>
                <div className="flex space-x-4">
                  <a
                    href="https://www.instagram.com/voiceit_vitcc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-accent-warm/10 rounded-full hover:bg-accent-warm/20 transition-all duration-300 hover:scale-110"
                  >
                    <Instagram className="h-5 w-5 text-accent-warm group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://www.youtube.com/@voiceit_vitcc"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-accent-warm/10 rounded-full hover:bg-accent-warm/20 transition-all duration-300 hover:scale-110"
                  >
                    <Youtube className="h-5 w-5 text-accent-warm group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                  <a
                    href="https://open.spotify.com/show/2j47V3HGbG0TY2qkrFPBoA?si=ESykZWXMSvO7gvszxXSX4w&nd=1&dlsi=87b3d8d7783b4410"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-2 bg-accent-warm/10 rounded-full hover:bg-accent-warm/20 transition-all duration-300 hover:scale-110"
                  >
                    <Music className="h-5 w-5 text-accent-warm group-hover:rotate-12 transition-transform duration-300" />
                  </a>
                </div>
              </div>
            </div>

            
            <JoinClubPage></JoinClubPage>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RecruitmentPage;