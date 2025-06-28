"use client";
import Aurora from '@/components/ui/aurora';
import Particles from '@/components/ui/Particles';

export default function GlobalBackground() {
  return (
    <>
      <div className="fixed inset-0 z-[-2] pointer-events-none" style={{ willChange: 'opacity, transform' }}>
        <Aurora
          colorStops={["#FF6B00", "#FFFFFF", "#FF6B00"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <div className="fixed inset-0 z-[-1] pointer-events-none" style={{ willChange: 'opacity, transform' }}>
        <Particles
          particleCount={150}
          particleSpread={15}
          speed={0.05}
          particleColors={["#FF6B00", "#FFFFFF", "#FF8C42", "#FFA500"]}
          moveParticlesOnHover={true}
          particleHoverFactor={0.5}
          alphaParticles={true}
          particleBaseSize={100}
          sizeRandomness={0.8}
          cameraDistance={25}
          disableRotation={false}
          className="w-full h-full"
        />
      </div>
    </>
  );
} 