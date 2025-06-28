"use client";

import { useEffect, useRef, memo, useCallback } from 'react';
import * as THREE from 'three';

interface Radio3DProps {
  className?: string;
  size?: number;
  rotationSpeed?: number;
  enableRotation?: boolean;
}

const Radio3D = memo(({ 
  className = "", 
  size = 200, 
  rotationSpeed = 0.005,
  enableRotation = true 
}: Radio3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const radioRef = useRef<THREE.Group | null>(null);
  const timeRef = useRef(0);
  const frameIdRef = useRef<number | null>(null);
  
  // Mouse interaction refs
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  // Performance optimization: Debounced resize handler
  const handleResize = useCallback(() => {
    const container = containerRef.current;
    const renderer = rendererRef.current;
    if (!container || !renderer) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    renderer.setSize(width, height);
    
    if (sceneRef.current) {
      const camera = sceneRef.current.children.find(child => child instanceof THREE.PerspectiveCamera) as THREE.PerspectiveCamera;
      if (camera) {
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
      }
    }
  }, []);

  // Optimized scene setup
  const setupScene = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup with optimized settings
    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0x000000, 1, 10); // Add fog for performance
    sceneRef.current = scene;

    // Optimized camera setup
    const camera = new THREE.PerspectiveCamera(
      60, // Reduced FOV for better performance
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);
    scene.add(camera);

    // Optimized renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disable antialiasing for performance
      alpha: true,
      powerPreference: "high-performance",
      precision: "mediump" // Use medium precision for better performance
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = false; // Disable shadows for performance
    renderer.toneMapping = THREE.NoToneMapping; // Disable tone mapping for performance
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Simplified lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Reduced number of lights
    const orangeLight = new THREE.PointLight(0xff6b00, 1.0, 6);
    orangeLight.position.set(-2, 1, 2);
    scene.add(orangeLight);

    // Create radio body with optimized geometry
    const radioGroup = new THREE.Group();
    radioRef.current = radioGroup;

    // Main body with simplified material
    const bodyGeometry = new THREE.BoxGeometry(2.4, 1.6, 1.0);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc,
      metalness: 0.7,
      roughness: 0.2,
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    radioGroup.add(body);

    // Simplified accent lines
    const accentLineGeometry = new THREE.BoxGeometry(2.2, 0.02, 0.02);
    const accentLineMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff6600,
      emissive: 0xff6600,
      emissiveIntensity: 0.5,
    });
    
    const topAccent = new THREE.Mesh(accentLineGeometry, accentLineMaterial);
    topAccent.position.set(0, 0.79, 0.51);
    radioGroup.add(topAccent);
    
    const bottomAccent = new THREE.Mesh(accentLineGeometry, accentLineMaterial);
    bottomAccent.position.set(0, -0.79, 0.51);
    radioGroup.add(bottomAccent);

    // Simplified front panel
    const panelGeometry = new THREE.BoxGeometry(2.2, 1.4, 0.08);
    const panelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xdddddd,
      metalness: 0.6,
      roughness: 0.2,
    });
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.position.set(0, 0, 0.54);
    radioGroup.add(panel);

    // Simplified speaker grille
    const grilleGeometry = new THREE.BoxGeometry(1.8, 0.8, 0.02);
    const grilleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00ff00,
      emissive: 0x00ff00,
      emissiveIntensity: 0.4,
    });
    const grille = new THREE.Mesh(grilleGeometry, grilleMaterial);
    grille.position.set(0, 0.2, 0.55);
    radioGroup.add(grille);

    // Reduced number of speaker holes
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < 2; j++) {
        const holeGeometry = new THREE.CircleGeometry(0.06, 8); // Reduced segments
        const holeMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xffffff,
          emissive: 0xff6600,
          emissiveIntensity: 0.3,
        });
        const hole = new THREE.Mesh(holeGeometry, holeMaterial);
        hole.position.set(
          -0.6 + i * 0.4,
          0.1 + j * 0.3,
          0.56
        );
        radioGroup.add(hole);
      }
    }

    // Simplified tuning dial
    const dialGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 12); // Reduced segments
    const dialMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff6600,
      emissive: 0xff6600,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2
    });
    const dial = new THREE.Mesh(dialGeometry, dialMaterial);
    dial.rotation.z = Math.PI / 2;
    dial.position.set(-0.8, -0.3, 0.55);
    radioGroup.add(dial);

    // Simplified frequency ring
    const frequencyRingGeometry = new THREE.RingGeometry(0.25, 0.3, 16); // Reduced segments
    const frequencyRingMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      emissive: 0xff6600,
      emissiveIntensity: 0.5,
    });
    const frequencyRing = new THREE.Mesh(frequencyRingGeometry, frequencyRingMaterial);
    frequencyRing.position.set(-0.8, -0.3, 0.62);
    frequencyRing.rotation.x = -Math.PI / 2;
    radioGroup.add(frequencyRing);

    // Simplified volume knob
    const volumeGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 12); // Reduced segments
    const volumeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      emissive: 0xff6600,
      emissiveIntensity: 0.3,
      metalness: 0.8,
      roughness: 0.2
    });
    const volume = new THREE.Mesh(volumeGeometry, volumeMaterial);
    volume.rotation.z = Math.PI / 2;
    volume.position.set(0.8, -0.3, 0.55);
    radioGroup.add(volume);

    // Simplified base
    const baseGeometry = new THREE.BoxGeometry(2.6, 0.2, 1.2);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff6600,
      metalness: 0.6,
      roughness: 0.3
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, -0.9, 0);
    radioGroup.add(base);

    scene.add(radioGroup);
  }, []);

  // Optimized animation loop
  const animate = useCallback(() => {
    if (!sceneRef.current || !rendererRef.current || !radioRef.current) return;

    timeRef.current += 0.016; // Fixed time step for consistent animation

    if (enableRotation && !isDraggingRef.current) {
      radioRef.current.rotation.y += rotationSpeed;
    }

    // Apply mouse rotation
    if (isDraggingRef.current) {
      radioRef.current.rotation.y = rotationRef.current.y;
      radioRef.current.rotation.x = rotationRef.current.x;
    }

    rendererRef.current.render(sceneRef.current, sceneRef.current.children.find(child => child instanceof THREE.PerspectiveCamera) as THREE.PerspectiveCamera);
    frameIdRef.current = requestAnimationFrame(animate);
  }, [enableRotation, rotationSpeed]);

  useEffect(() => {
    setupScene();
    
    // Start animation
    animate();

    // Add event listeners
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      previousMouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !radioRef.current) return;

      const deltaX = event.clientX - previousMouseRef.current.x;
      const deltaY = event.clientY - previousMouseRef.current.y;

      rotationRef.current.y += deltaX * 0.01;
      rotationRef.current.x += deltaY * 0.01;

      // Clamp vertical rotation
      rotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationRef.current.x));

      previousMouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseLeave = () => {
      isDraggingRef.current = false;
    };

    // Debounced resize handler
    let resizeTimeout: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 100);
    };

    window.addEventListener('resize', debouncedResize);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      window.removeEventListener('resize', debouncedResize);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseleave', handleMouseLeave);
      
      // Cleanup Three.js resources
      if (rendererRef.current && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }
      if (sceneRef.current) {
        sceneRef.current.clear();
      }
    };
  }, [setupScene, animate, handleResize]);

  return (
    <div ref={containerRef} className={`w-full h-full max-w-full max-h-full min-w-0 min-h-0 ${className}`} style={{ aspectRatio: 1 }} />
  );
});

Radio3D.displayName = 'Radio3D';

export default Radio3D; 