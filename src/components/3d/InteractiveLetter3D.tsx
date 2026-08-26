import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface InteractiveLetter3DProps {
  char: string;
  color?: string;
  size?: number;
}

export const InteractiveLetter3D: React.FC<InteractiveLetter3DProps> = ({
  char,
  color = '#f59e0b',
  size = 200
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = size;
    const height = size;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 5;

    // 2. WebGL Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(color, 3, 10);
    pointLight1.position.set(2, 3, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 2, 10);
    pointLight2.position.set(-2, -3, 2);
    scene.add(pointLight2);

    // 4. Central 3D Gem Mesh (Icosahedron crystal)
    const geometry = new THREE.IcosahedronGeometry(1.6, 1);
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(color),
      emissive: new THREE.Color(color).multiplyScalar(0.2),
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.7,
      ior: 1.5,
      transparent: true,
      opacity: 0.85,
      wireframe: false
    });
    const crystal = new THREE.Mesh(geometry, material);
    scene.add(crystal);

    // 5. Surrounding Floating Particle Halo
    const particlesCount = 45;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i += 3) {
      const radius = 2.0 + Math.random() * 0.8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xfef08a,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particleSystem);

    // 6. Touch and Mouse Interaction
    let isDragging = false;
    let previousTouchX = 0;
    let previousTouchY = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;

    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      isDragging = true;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      previousTouchX = clientX;
      previousTouchY = clientY;
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      if (!isDragging) return;
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      const deltaX = clientX - previousTouchX;
      const deltaY = clientY - previousTouchY;

      targetRotationY += deltaX * 0.015;
      targetRotationX += deltaY * 0.015;

      previousTouchX = clientX;
      previousTouchY = clientY;
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const dom = renderer.domElement;
    dom.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    dom.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth idle rotation + spring to target
      if (!isDragging) {
        targetRotationY += 0.012;
        targetRotationX = Math.sin(elapsedTime * 1.5) * 0.15;
      }

      crystal.rotation.x += (targetRotationX - crystal.rotation.x) * 0.1;
      crystal.rotation.y += (targetRotationY - crystal.rotation.y) * 0.1;
      crystal.position.y = Math.sin(elapsedTime * 2) * 0.12;

      particleSystem.rotation.y = elapsedTime * 0.2;
      particleSystem.rotation.z = elapsedTime * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      dom.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      dom.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, [char, color, size]);

  return (
    <div className="relative flex items-center justify-center select-none" style={{ width: size, height: size }}>
      {/* Three.js Canvas Container */}
      <div ref={containerRef} className="absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Floating 2D Arabic Character Overlay Centered In Crystal */}
      <div className="relative pointer-events-none z-10 flex items-center justify-center">
        <span
          className="text-7xl font-black drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] text-white tracking-wide animate-wiggle"
          style={{ textShadow: '0 0 20px rgba(254, 240, 138, 0.9), 0 0 35px rgba(245, 158, 11, 0.7)' }}
        >
          {char}
        </span>
      </div>
    </div>
  );
};
