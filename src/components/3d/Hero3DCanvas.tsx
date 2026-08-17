import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // 2. High-Tech Studio Lighting (Deep Navy, Royal Blue, Daylight, and Subtle Warm Gold)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(5, 8, 6);
    scene.add(keyLight);

    const navyLight = new THREE.PointLight(0x1e3a8a, 4.5, 18);
    navyLight.position.set(-4, 3, 4);
    scene.add(navyLight);

    const cobaltLight = new THREE.PointLight(0x2563eb, 4, 18);
    cobaltLight.position.set(4, -3, 4);
    scene.add(cobaltLight);

    const goldAccentLight = new THREE.PointLight(0xd97706, 2.5, 15);
    goldAccentLight.position.set(0, 4, -3);
    scene.add(goldAccentLight);

    // 3. Central Master Pivot Group
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 4. Core Holographic Sphere (Deep Sovereign Sapphire Crystal Core)
    const coreSphereGeo = new THREE.SphereGeometry(1.6, 64, 64);
    const coreSphereMat = new THREE.MeshPhysicalMaterial({
      color: 0x0f172a,
      emissive: 0x0a1128,
      emissiveIntensity: 0.4,
      roughness: 0.1,
      metalness: 0.2,
      transmission: 0.6,
      thickness: 1.3,
      ior: 1.52,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.92
    });
    const coreSphere = new THREE.Mesh(coreSphereGeo, coreSphereMat);
    mainGroup.add(coreSphere);

    // 5. Inner Geometric Energy Core (Icosahedron Wireframe in Royal Blue)
    const icoGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const icoMat = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x2563eb,
      emissiveIntensity: 0.7,
      wireframe: true,
      roughness: 0.2,
      metalness: 0.8
    });
    const innerCore = new THREE.Mesh(icoGeo, icoMat);
    mainGroup.add(innerCore);

    // 6. Outer Futuristic Geodesic Grid Sphere (Neural Network Mesh)
    const outerGridGeo = new THREE.IcosahedronGeometry(2.05, 2);
    const outerGridMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.22
    });
    const outerGrid = new THREE.Mesh(outerGridGeo, outerGridMat);
    mainGroup.add(outerGrid);

    // 7. Interactive Orbiting Planetary Growth Rings
    const ringGroup = new THREE.Group();
    mainGroup.add(ringGroup);

    // Primary Equatorial Ring (Royal Blue)
    const ringGeo1 = new THREE.TorusGeometry(2.7, 0.025, 16, 120);
    const ringMat1 = new THREE.MeshStandardMaterial({
      color: 0x2563eb,
      emissive: 0x2563eb,
      emissiveIntensity: 0.5,
      metalness: 0.9,
      roughness: 0.1
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 2.5;
    ringGroup.add(ring1);

    // Secondary Tilted Ring (Cyan / Titanium Slate)
    const ringGeo2 = new THREE.TorusGeometry(3.1, 0.02, 16, 120);
    const ringMat2 = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      emissive: 0x0284c7,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 6;
    ringGroup.add(ring2);

    // 8. Orbiting Satellite Nodes (Data Growth Points)
    const satellites: THREE.Mesh[] = [];
    const satCount = 6;
    const satGeo = new THREE.OctahedronGeometry(0.12, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x2563eb,
      emissiveIntensity: 0.8,
      metalness: 0.6,
      roughness: 0.1
    });

    for (let i = 0; i < satCount; i++) {
      const satMesh = new THREE.Mesh(satGeo, satMat);
      satellites.push(satMesh);
      mainGroup.add(satMesh);
    }

    // 9. Floating Background Constellation Particles
    const particleCount = 240;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 2.8 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      particlePositions[i] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0x1e3a8a,
      size: 0.055,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending
    });
    const particleField = new THREE.Points(particleGeo, particleMat);
    scene.add(particleField);

    // 10. Interactive Cursor Parallax with Damping
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.6;
      targetY = y * 0.6;

      keyLight.position.x = x * 6 + 5;
      keyLight.position.y = y * 6 + 8;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // 11. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    // 12. Visibility & Animation Loop
    let animationFrameId: number;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(container);

    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      const elapsed = clock.getElapsedTime();

      // Smooth mouse follow
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      mainGroup.rotation.y = mouseX + elapsed * 0.25;
      mainGroup.rotation.x = mouseY + Math.sin(elapsed * 0.4) * 0.1;

      // Inner and outer counter-rotations
      innerCore.rotation.x = -elapsed * 0.4;
      innerCore.rotation.y = elapsed * 0.5;

      outerGrid.rotation.y = -elapsed * 0.15;
      outerGrid.rotation.z = elapsed * 0.1;

      ring1.rotation.z = elapsed * 0.3;
      ring2.rotation.z = -elapsed * 0.25;

      particleField.rotation.y = elapsed * 0.03;

      // Position satellites along orbital path
      satellites.forEach((sat, index) => {
        const angle = elapsed * 0.6 + (index * (Math.PI * 2 / satCount));
        const dist = index % 2 === 0 ? 2.7 : 3.1;
        sat.position.x = Math.cos(angle) * dist;
        sat.position.z = Math.sin(angle) * dist;
        sat.position.y = Math.sin(angle * 2) * 0.4;
        sat.rotation.x = elapsed * 2;
        sat.rotation.y = elapsed * 2;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }

      coreSphereGeo.dispose();
      coreSphereMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      outerGridGeo.dispose();
      outerGridMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="hero-3d-wrapper" />;
};
