"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface Radio3DProps {
  className?: string;
  size?: number;
  rotationSpeed?: number;
  enableRotation?: boolean;
}

const Radio3D = ({ 
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
  
  // Mouse interaction refs
  const mouseRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const previousMouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup with enhanced settings
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    // Enhanced lighting setup
    const ambientLight = new THREE.AmbientLight(0x404040, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 5, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 50;
    scene.add(directionalLight);

    // Orange accent light
    const orangeLight = new THREE.PointLight(0xff6b00, 1.5, 8);
    orangeLight.position.set(-2, 1, 2);
    scene.add(orangeLight);

    // Blue accent light
    const blueLight = new THREE.PointLight(0x0066ff, 1.0, 6);
    blueLight.position.set(2, -1, 1);
    scene.add(blueLight);

    // Create radio body
    const radioGroup = new THREE.Group();
    radioRef.current = radioGroup;

    // Main body (futuristic metallic cabinet with neon accents)
    const bodyGeometry = new THREE.BoxGeometry(2.4, 1.6, 1.0);
    const bodyMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc, // Bright metallic silver instead of black
      metalness: 0.9,
      roughness: 0.1,
      envMapIntensity: 1.2
    });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    body.castShadow = true;
    body.receiveShadow = true;
    radioGroup.add(body);

    // Neon orange accent lines on body
    const accentLineGeometry = new THREE.BoxGeometry(2.2, 0.02, 0.02);
    const accentLineMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff6600,
      emissive: 0xff6600,
      emissiveIntensity: 0.8,
      transparent: true,
      opacity: 0.9
    });
    
    // Top accent line
    const topAccent = new THREE.Mesh(accentLineGeometry, accentLineMaterial);
    topAccent.position.set(0, 0.79, 0.51);
    radioGroup.add(topAccent);
    
    // Bottom accent line
    const bottomAccent = new THREE.Mesh(accentLineGeometry, accentLineMaterial);
    bottomAccent.position.set(0, -0.79, 0.51);
    radioGroup.add(bottomAccent);

    // Front panel (holographic display surface)
    const panelGeometry = new THREE.BoxGeometry(2.2, 1.4, 0.08);
    const panelMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xdddddd, // Bright metallic silver instead of black
      metalness: 0.8,
      roughness: 0.1,
      transparent: true,
      opacity: 0.8
    });
    const panel = new THREE.Mesh(panelGeometry, panelMaterial);
    panel.position.set(0, 0, 0.54);
    radioGroup.add(panel);

    // Holographic speaker grille with neon effect
    const grilleGeometry = new THREE.BoxGeometry(1.8, 0.8, 0.02);
    const grilleMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x00ff00,
      emissive: 0x00ff00,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.7
    });
    const grille = new THREE.Mesh(grilleGeometry, grilleMaterial);
    grille.position.set(0, 0.2, 0.55);
    radioGroup.add(grille);

    // Holographic speaker holes with pulsing effect
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        const holeGeometry = new THREE.CircleGeometry(0.06, 12);
        const holeMaterial = new THREE.MeshStandardMaterial({ 
          color: 0xffffff,
          emissive: 0xff6600,
          emissiveIntensity: 0.4,
          transparent: true,
          opacity: 0.8
        });
        const hole = new THREE.Mesh(holeGeometry, holeMaterial);
        hole.position.set(
          -0.75 + i * 0.3,
          0.2 + j * 0.25,
          0.56
        );
        radioGroup.add(hole);
      }
    }

    // Futuristic holographic tuning dial
    const dialGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 16);
    const dialMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff6600,
      emissive: 0xff6600,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1
    });
    const dial = new THREE.Mesh(dialGeometry, dialMaterial);
    dial.rotation.z = Math.PI / 2;
    dial.position.set(-0.8, -0.3, 0.55);
    radioGroup.add(dial);

    // Holographic frequency ring around dial
    const frequencyRingGeometry = new THREE.RingGeometry(0.25, 0.3, 32);
    const frequencyRingMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      emissive: 0xff6600,
      emissiveIntensity: 0.6,
      transparent: true,
      opacity: 0.8
    });
    const frequencyRing = new THREE.Mesh(frequencyRingGeometry, frequencyRingMaterial);
    frequencyRing.position.set(-0.8, -0.3, 0.62);
    frequencyRing.rotation.x = -Math.PI / 2;
    radioGroup.add(frequencyRing);

    // Futuristic volume knob with neon glow
    const volumeGeometry = new THREE.CylinderGeometry(0.15, 0.15, 0.1, 16);
    const volumeMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff6600,
      emissive: 0xff6600,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.2
    });
    const volume = new THREE.Mesh(volumeGeometry, volumeMaterial);
    volume.rotation.z = Math.PI / 2;
    volume.position.set(0.8, -0.3, 0.55);
    radioGroup.add(volume);

    // Holographic display with advanced UI
    const displayGeometry = new THREE.BoxGeometry(1.2, 0.3, 0.02);
    const displayMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, // Bright white instead of black
      emissive: 0xff6600,
      emissiveIntensity: 0.8
    });
    const display = new THREE.Mesh(displayGeometry, displayMaterial);
    display.position.set(0, -0.1, 0.55);
    radioGroup.add(display);

    // Holographic text with advanced effects
    const textGeometry = new THREE.PlaneGeometry(1.0, 0.25);
    const textMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      emissive: 0xff6600,
      emissiveIntensity: 0.9,
      transparent: true,
      opacity: 0.9
    });
    const text = new THREE.Mesh(textGeometry, textMaterial);
    text.position.set(0, -0.1, 0.57);
    radioGroup.add(text);

    // Futuristic control buttons with different neon colors
    const buttonGeometry = new THREE.CylinderGeometry(0.05, 0.05, 0.03, 8);
    
    const buttonColors = [0xff6600, 0xffffff, 0xff8800, 0xffffff];
    
    for (let i = 0; i < 4; i++) {
      const buttonMaterial = new THREE.MeshStandardMaterial({ 
        color: buttonColors[i],
        emissive: 0xff6600,
        emissiveIntensity: 0.6,
        metalness: 0.7,
        roughness: 0.3
      });
      const button = new THREE.Mesh(buttonGeometry, buttonMaterial);
      button.rotation.z = Math.PI / 2;
      button.position.set(-0.4 + i * 0.25, -0.4, 0.55);
      radioGroup.add(button);
    }

    // Futuristic antenna with energy field
    const antennaGeometry = new THREE.CylinderGeometry(0.012, 0.012, 0.8, 8);
    const antennaMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      emissive: 0xff6600,
      emissiveIntensity: 0.7,
      metalness: 0.9,
      roughness: 0.1
    });
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial);
    antenna.position.set(1.0, 0.8, 0);
    antenna.rotation.z = Math.PI / 6;
    radioGroup.add(antenna);

    // Energy field around antenna
    const energyFieldGeometry = new THREE.SphereGeometry(0.15, 16, 16);
    const energyFieldMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      emissive: 0xff6600,
      emissiveIntensity: 0.3,
      transparent: true,
      opacity: 0.4
    });
    const energyField = new THREE.Mesh(energyFieldGeometry, energyFieldMaterial);
    energyField.position.set(1.0, 0.8, 0);
    radioGroup.add(energyField);

    // Futuristic base with levitation effect
    const baseGeometry = new THREE.BoxGeometry(2.6, 0.15, 1.2);
    const baseMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc, // Bright metallic silver instead of black
      metalness: 0.9,
      roughness: 0.1
    });
    const base = new THREE.Mesh(baseGeometry, baseMaterial);
    base.position.set(0, -0.875, 0);
    base.castShadow = true;
    base.receiveShadow = true;
    radioGroup.add(base);

    // Levitation field effect
    const levitationGeometry = new THREE.RingGeometry(1.0, 1.3, 32);
    const levitationMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      emissive: 0xff6600,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.6
    });
    const levitation = new THREE.Mesh(levitationGeometry, levitationMaterial);
    levitation.position.set(0, -0.8, 0);
    levitation.rotation.x = -Math.PI / 2;
    radioGroup.add(levitation);

    // Holographic trim elements
    const trimGeometry = new THREE.BoxGeometry(2.3, 0.05, 0.05);
    const trimMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xff6600,
      emissive: 0xff6600,
      emissiveIntensity: 0.7,
      transparent: true,
      opacity: 0.8
    });
    
    // Top trim
    const topTrim = new THREE.Mesh(trimGeometry, trimMaterial);
    topTrim.position.set(0, 0.825, 0.54);
    radioGroup.add(topTrim);
    
    // Bottom trim
    const bottomTrim = new THREE.Mesh(trimGeometry, trimMaterial);
    bottomTrim.position.set(0, -0.825, 0.54);
    radioGroup.add(bottomTrim);

    // Central energy core
    const coreGeometry = new THREE.SphereGeometry(0.1, 16, 16);
    const coreMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff,
      emissive: 0xff6600,
      emissiveIntensity: 1.0,
      transparent: true,
      opacity: 0.9
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    core.position.set(0, 0, 0.6);
    radioGroup.add(core);

    // Scale the entire radio
    radioGroup.scale.setScalar(size / 200);
    scene.add(radioGroup);

    // Animation loop with enhanced effects
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      timeRef.current += 0.016; // ~60fps

      if (radioRef.current) {
        if (isDraggingRef.current) {
          // Apply mouse-controlled rotation
          radioRef.current.rotation.x = rotationRef.current.x;
          radioRef.current.rotation.y = rotationRef.current.y;
        } else {
          // Continuous automatic rotation with smooth interpolation
          if (enableRotation) {
            // Add automatic rotation to current position
            rotationRef.current.y += rotationSpeed;
            
            // Apply smooth interpolation to the actual rotation
            radioRef.current.rotation.x += (rotationRef.current.x - radioRef.current.rotation.x) * 0.1;
            radioRef.current.rotation.y += (rotationRef.current.y - radioRef.current.rotation.y) * 0.1;
          }
        }
      }

      // Animate lights
      orangeLight.intensity = 1.5 + Math.sin(timeRef.current * 2) * 0.3;
      blueLight.intensity = 1.0 + Math.cos(timeRef.current * 1.5) * 0.2;

      // Animate LED elements
      if (text.material instanceof THREE.MeshStandardMaterial) {
        text.material.emissiveIntensity = 0.9 + Math.sin(timeRef.current * 4) * 0.3;
      }
      if (grille.material instanceof THREE.MeshStandardMaterial) {
        grille.material.emissiveIntensity = 0.6 + Math.sin(timeRef.current * 2.5) * 0.2;
      }
      if (frequencyRing.material instanceof THREE.MeshStandardMaterial) {
        frequencyRing.material.emissiveIntensity = 0.6 + Math.sin(timeRef.current * 3) * 0.3;
      }
      if (levitation.material instanceof THREE.MeshStandardMaterial) {
        levitation.material.emissiveIntensity = 0.5 + Math.sin(timeRef.current * 1.5) * 0.2;
      }
      if (energyField.material instanceof THREE.MeshStandardMaterial) {
        energyField.material.emissiveIntensity = 0.3 + Math.sin(timeRef.current * 5) * 0.2;
      }
      if (core.material instanceof THREE.MeshStandardMaterial) {
        core.material.emissiveIntensity = 1.0 + Math.sin(timeRef.current * 6) * 0.4;
      }

      // Animate accent lines
      if (topAccent.material instanceof THREE.MeshStandardMaterial) {
        topAccent.material.emissiveIntensity = 0.8 + Math.sin(timeRef.current * 2) * 0.3;
      }
      if (bottomAccent.material instanceof THREE.MeshStandardMaterial) {
        bottomAccent.material.emissiveIntensity = 0.8 + Math.cos(timeRef.current * 2) * 0.3;
      }

      // Animate trim elements
      if (topTrim.material instanceof THREE.MeshStandardMaterial) {
        topTrim.material.emissiveIntensity = 0.7 + Math.sin(timeRef.current * 2.5) * 0.2;
      }
      if (bottomTrim.material instanceof THREE.MeshStandardMaterial) {
        bottomTrim.material.emissiveIntensity = 0.7 + Math.cos(timeRef.current * 2.5) * 0.2;
      }

      // Animate dial and volume
      if (dial.material instanceof THREE.MeshStandardMaterial) {
        dial.material.emissiveIntensity = 0.5 + Math.sin(timeRef.current * 3.5) * 0.3;
      }
      if (volume.material instanceof THREE.MeshStandardMaterial) {
        volume.material.emissiveIntensity = 0.4 + Math.cos(timeRef.current * 4) * 0.2;
      }

      // Animate speaker holes with wave effect
      const holes = radioGroup.children.filter(child => 
        child.material && child.material.emissive && child.position.z === 0.56
      );
      holes.forEach((hole, index) => {
        if (hole.material instanceof THREE.MeshStandardMaterial) {
          const waveOffset = (index * 0.5) + timeRef.current * 2;
          hole.material.emissiveIntensity = 0.4 + Math.sin(waveOffset) * 0.3;
        }
      });

      // Animate buttons with different patterns
      const buttons = radioGroup.children.filter(child => 
        child.material && child.material.emissive && child.position.z === 0.55 && 
        child.position.y === -0.4
      );
      buttons.forEach((button, index) => {
        if (button.material instanceof THREE.MeshStandardMaterial) {
          const buttonOffset = timeRef.current * (2 + index * 0.5);
          button.material.emissiveIntensity = 0.6 + Math.sin(buttonOffset) * 0.4;
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      
      const width = container.clientWidth;
      const height = container.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    // Mouse interaction handlers
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      previousMouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current) return;

      const deltaX = event.clientX - previousMouseRef.current.x;
      const deltaY = event.clientY - previousMouseRef.current.y;

      rotationRef.current.y += deltaX * 0.01;
      rotationRef.current.x += deltaY * 0.01;

      // Clamp vertical rotation to prevent over-rotation
      rotationRef.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotationRef.current.x));

      previousMouseRef.current = { x: event.clientX, y: event.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleMouseLeave = () => {
      isDraggingRef.current = false;
    };

    // Add event listeners
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('mouseleave', handleMouseLeave);

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
      
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      
      // Dispose of geometries and materials
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      
      renderer.dispose();
    };
  }, [size, rotationSpeed, enableRotation]);

  return (
    <div ref={containerRef} className={`w-full h-full max-w-full max-h-full min-w-0 min-h-0 ${className}`} style={{ aspectRatio: 1 }} />
  );
};

export default Radio3D; 