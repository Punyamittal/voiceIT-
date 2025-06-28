"use client";

import { useEffect, useState } from 'react';
import Aurora from '@/components/ui/aurora';
import Particles from '@/components/ui/Particles';

const GlobalBackground = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Pause animations when tab is not visible for better performance
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  if (!isVisible) {
    return null; // Don't render when tab is not visible
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1]">
      <Aurora
        colorStops={["#FF6B00", "#FFFFFF", "#FF6B00"]}
        blend={0.3} // Reduced opacity for global background
        amplitude={0.8}
        speed={0.3} // Slower speed for better performance
      />
      <Particles
        particleCount={50} // Reduced count for global background
        particleSpread={10}
        speed={0.03} // Slower speed
        particleColors={["#FF6B00", "#FFFFFF", "#FF8C42"]}
        moveParticlesOnHover={false} // Disable hover for global background
        alphaParticles={true}
        particleBaseSize={40} // Smaller particles
        sizeRandomness={0.6}
        cameraDistance={20}
        disableRotation={false}
        className="w-full h-full"
      />
    </div>
  );
};

export default GlobalBackground; 