"use client";

import React, { useEffect, useRef, memo, useCallback } from 'react';

interface AuroraProps {
  colorStops?: string[];
  blend?: number;
  amplitude?: number;
  speed?: number;
  className?: string;
}

const Aurora = memo(({
  colorStops = ["#FF6B00", "#FFFFFF", "#FF6B00"],
  blend = 0.5,
  amplitude = 1.0,
  speed = 0.5,
  className = ""
}: AuroraProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
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

  // Optimized animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Clear canvas efficiently
    ctx.clearRect(0, 0, width, height);

    // Create gradient with optimized performance
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    
    // Simplified color stops for better performance
    const time = timeRef.current * speed;
    const offset1 = (Math.sin(time * 0.5) + 1) * 0.3;
    const offset2 = (Math.cos(time * 0.3) + 1) * 0.4;
    const offset3 = (Math.sin(time * 0.7) + 1) * 0.3;

    gradient.addColorStop(offset1, colorStops[0] || "#FF6B00");
    gradient.addColorStop(offset2, colorStops[1] || "#FFFFFF");
    gradient.addColorStop(offset3, colorStops[2] || "#FF6B00");

    // Draw aurora with simplified geometry for better performance
    ctx.fillStyle = gradient;
    ctx.globalAlpha = blend;
    
    // Use simpler path for better performance
    ctx.beginPath();
    ctx.moveTo(0, height * 0.3);
    
    // Simplified wave pattern
    for (let x = 0; x <= width; x += 20) { // Reduced resolution for performance
      const y = height * 0.3 + 
                Math.sin(x * 0.01 + time) * amplitude * 50 +
                Math.sin(x * 0.005 + time * 0.5) * amplitude * 30;
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    // Add second layer for depth (simplified)
    ctx.globalAlpha = blend * 0.6;
    ctx.beginPath();
    ctx.moveTo(0, height * 0.4);
    
    for (let x = 0; x <= width; x += 30) { // Further reduced resolution
      const y = height * 0.4 + 
                Math.sin(x * 0.008 + time * 0.8) * amplitude * 40 +
                Math.sin(x * 0.003 + time * 0.3) * amplitude * 20;
      ctx.lineTo(x, y);
    }
    
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();

    timeRef.current += 0.016; // Fixed time step
    animationRef.current = requestAnimationFrame(animate);
  }, [colorStops, blend, amplitude, speed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Start animation
    animate();

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(resizeTimeout);
    };
  }, [animate, handleResize]);

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

Aurora.displayName = 'Aurora';

export default Aurora;
