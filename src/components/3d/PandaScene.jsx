import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PandaCharacter } from './ProceduralPanda';
import { FloatingDecorations } from './FloatingDecorations';
import PandaFallback from './PandaFallback';

export default function PandaScene({
  activeStep = 0,
  drinkChoice = null,
  isCelebration = false,
  className = '',
}) {
  const containerRef = useRef(null);
  const [webglSupported, setWebglSupported] = useState(true);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animFrameRef = useRef(null);

  // References to animated objects
  const pandaLeftRef = useRef(null);
  const pandaRightRef = useRef(null);
  const decorationsRef = useRef(null);
  const mousePosRef = useRef({ x: 0, y: 0 });

  // Detect WebGL capability
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebglSupported(false);
      }
    } catch (e) {
      setWebglSupported(false);
    }
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!webglSupported || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 360;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0xfff5f7, 0.045);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 1.2, 5.2);
    camera.lookAt(0, 0.9, 0);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Studio Lighting
    // Soft ambient light with romantic lavender-pink tint
    const ambientLight = new THREE.AmbientLight(0xffeef3, 1.2);
    scene.add(ambientLight);

    // Warm key light
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 1.4);
    keyLight.position.set(3, 5, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    // Cool fill light from left
    const fillLight = new THREE.DirectionalLight(0xe8e0ff, 0.8);
    fillLight.position.set(-4, 3, 2);
    scene.add(fillLight);

    // Soft pink rim light from back
    const rimLight = new THREE.DirectionalLight(0xffb8d0, 0.6);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    // 5. Floating background decorations (clouds, flowers, hearts)
    decorationsRef.current = new FloatingDecorations(scene);

    // 6. Two Pandas: Bao (Left) and Mochi (Right)
    const pandaLeft = new PandaCharacter({ isRight: false, name: 'Bao' });
    pandaLeft.group.position.set(-1.05, -0.45, 0);
    scene.add(pandaLeft.group);
    pandaLeftRef.current = pandaLeft;

    const pandaRight = new PandaCharacter({ isRight: true, name: 'Mochi' });
    pandaRight.group.position.set(1.05, -0.45, 0);
    scene.add(pandaRight.group);
    pandaRightRef.current = pandaRight;

    // Default prop setup
    pandaLeft.setProp('heart');
    pandaRight.setProp('none');

    // 7. Mouse/Touch tracking
    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const x = ((clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
      mousePosRef.current = { x, y };
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // 8. Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || 360;
      camera.aspect = w / h;
      // Adjust camera zoom for mobile portrait screens
      if (w < 640) {
        camera.position.z = 6.2;
        camera.position.y = 1.35;
      } else {
        camera.position.z = 5.2;
        camera.position.y = 1.2;
      }
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // 9. Animation Loop
    const clock = new THREE.Clock();
    const animate = () => {
      animFrameRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Update pandas
      if (pandaLeftRef.current) {
        pandaLeftRef.current.update(delta, time, mousePosRef.current);
      }
      if (pandaRightRef.current) {
        pandaRightRef.current.update(delta, time, mousePosRef.current);
      }

      // Update decorations
      if (decorationsRef.current) {
        decorationsRef.current.update(delta, time);
      }

      // Gentle camera sway
      camera.position.x = Math.sin(time * 0.4) * 0.08;
      camera.position.y = (container.clientWidth < 640 ? 1.35 : 1.2) + Math.cos(time * 0.5) * 0.04;
      camera.lookAt(0, 0.9, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [webglSupported]);

  // Handle dynamic scene updates based on activeStep and user selections
  useEffect(() => {
    const pandaLeft = pandaLeftRef.current;
    const pandaRight = pandaRightRef.current;
    if (!pandaLeft || !pandaRight) return;

    if (activeStep === 0) {
      // Hero: Bao holds heart, Mochi greets
      pandaLeft.group.position.set(-1.05, -0.45, 0);
      pandaRight.group.position.set(1.05, -0.45, 0);
      pandaLeft.group.rotation.y = 0.2;
      pandaRight.group.rotation.y = -0.2;
      pandaLeft.setProp('heart');
      pandaRight.setProp('none');
    } else if (activeStep === 1) {
      // Step 1: Drink Selection
      if (drinkChoice === 'coffee') {
        pandaLeft.setProp('coffee');
        pandaRight.setProp('coffee');
      } else if (drinkChoice === 'chai') {
        pandaLeft.setProp('chai');
        pandaRight.setProp('chai');
      } else {
        pandaLeft.setProp('coffee');
        pandaRight.setProp('chai');
      }
    } else if (activeStep === 8 || isCelebration) {
      // Success Scene: Holding paws together in the center!
      pandaLeft.group.position.set(-0.62, -0.45, 0);
      pandaRight.group.position.set(0.62, -0.45, 0);
      pandaLeft.group.rotation.y = 0.4;
      pandaRight.group.rotation.y = -0.4;
      pandaLeft.setProp('hands');
      pandaRight.setProp('hands');
    } else {
      // Other steps: cute companion idle state
      pandaLeft.setProp('heart');
      pandaRight.setProp('none');
      pandaLeft.group.position.set(-1.05, -0.45, 0);
      pandaRight.group.position.set(1.05, -0.45, 0);
    }
  }, [activeStep, drinkChoice, isCelebration]);

  // Click handler to trigger cute reaction
  const handlePandaClick = () => {
    if (pandaRightRef.current) {
      pandaRightRef.current.triggerWave();
    }
    if (pandaLeftRef.current) {
      pandaLeftRef.current.triggerWave();
    }
  };

  if (!webglSupported) {
    return (
      <div className={`w-full ${className}`}>
        <PandaFallback drinkMode={drinkChoice} holdingHands={activeStep === 8 || isCelebration} />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      onClick={handlePandaClick}
      title="Tap the pandas for a cute wave! 🐾"
      className={`w-full h-full relative cursor-pointer outline-none ${className}`}
    />
  );
}

