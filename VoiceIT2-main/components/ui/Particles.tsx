"use client";

import React, { useEffect, useRef, memo, useCallback } from 'react';

interface ParticlesProps {
  particleCount?: number;
  particleSpread?: number;
  speed?: number;
  particleColors?: string[];
  moveParticlesOnHover?: boolean;
  particleHoverFactor?: number;
  alphaParticles?: boolean;
  particleBaseSize?: number;
  sizeRandomness?: number;
  cameraDistance?: number;
  disableRotation?: boolean;
  className?: string;
}

const Particles = memo(({
  particleCount = 100, // Reduced default count for better performance
  particleSpread = 15,
  speed = 0.05,
  particleColors = ["#FF6B00", "#FFFFFF", "#FF8C42", "#FFA500"],
  moveParticlesOnHover = true,
  particleHoverFactor = 0.5,
  alphaParticles = true,
  particleBaseSize = 60, // Reduced default size
  sizeRandomness = 0.8,
  cameraDistance = 25,
  disableRotation = false,
  className = ""
}: ParticlesProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<any[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  // Performance optimization: Debounced resize handler
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }
  }, []);

  // Optimized particle initialization
  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * rect.width,
        y: Math.random() * rect.height,
        vx: (Math.random() - 0.5) * speed * 2,
        vy: (Math.random() - 0.5) * speed * 2,
        size: particleBaseSize * (0.5 + Math.random() * sizeRandomness),
        color: particleColors[Math.floor(Math.random() * particleColors.length)],
        alpha: alphaParticles ? Math.random() * 0.5 + 0.5 : 1,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: disableRotation ? 0 : (Math.random() - 0.5) * 0.02
      });
    }

    particlesRef.current = particles;
  }, [particleCount, speed, particleBaseSize, sizeRandomness, particleColors, alphaParticles, disableRotation]);

  // Optimized animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    
    // Clear canvas efficiently
    ctx.clearRect(0, 0, rect.width, rect.height);

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    // Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      const particle = particles[i];

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Bounce off edges
      if (particle.x <= 0 || particle.x >= rect.width) {
        particle.vx *= -1;
        particle.x = Math.max(0, Math.min(rect.width, particle.x));
      }
      if (particle.y <= 0 || particle.y >= rect.height) {
        particle.vy *= -1;
        particle.y = Math.max(0, Math.min(rect.height, particle.y));
      }

      // Mouse interaction (simplified for performance)
      if (moveParticlesOnHover) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          const force = (100 - distance) / 100 * particleHoverFactor;
          particle.vx += (dx / distance) * force * 0.01;
          particle.vy += (dy / distance) * force * 0.01;
        }
      }

      // Update rotation
      if (!disableRotation) {
        particle.rotation += particle.rotationSpeed;
      }

      // Draw particle with optimized rendering
      ctx.save();
      ctx.globalAlpha = particle.alpha;
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);

      // Use gradient for better performance
      const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, particle.size);
      gradient.addColorStop(0, particle.color);
      gradient.addColorStop(1, 'transparent');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    timeRef.current += 0.016;
    animationRef.current = requestAnimationFrame(animate);
  }, [moveParticlesOnHover, particleHoverFactor, disableRotation]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize particles
    initializeParticles();

    // Start animation
    animate();

    // Mouse move handler (throttled for performance)
    let mouseTimeout: NodeJS.Timeout;
    const handleMouseMove = (e: MouseEvent) => {
      clearTimeout(mouseTimeout);
      mouseTimeout = setTimeout(() => {
        const rect = canvas.getBoundingClientRect();
        mouseRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      }, 16); // ~60fps
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        handleResize();
        initializeParticles();
      }, 100);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(mouseTimeout);
      clearTimeout(resizeTimeout);
    };
  }, [initializeParticles, animate, handleResize]);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
      style={{ 
        display: 'block',
        willChange: 'transform', // Optimize for animations
      }}
    />
  );
});

Particles.displayName = 'Particles';

export default Particles;
