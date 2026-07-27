import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

interface InitialMasterpieceLoaderProps {
  onComplete: () => void;
}

export const InitialMasterpieceLoader: React.FC<InitialMasterpieceLoaderProps> = ({ onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [progress, setProgress] = useState<number>(0);
  const [stage, setStage] = useState<number>(1);

  // 1. WebGL 3D Particle Vortex & Floating Rose Petals Setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Particle Swirl Vortex
    const particleCount = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const color1 = new THREE.Color(0xff4d8d); // Pink
    const color2 = new THREE.Color(0xffd700); // Gold

    for (let i = 0; i < particleCount; i++) {
      const radius = 3 + Math.random() * 14;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      positions[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      positions[i * 3 + 1] = radius * Math.sin(phi);
      positions[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);

      const mixedColor = color1.clone().lerp(color2, Math.random());
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.25,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      particleSystem.rotation.y = elapsed * 0.35;
      particleSystem.rotation.x = Math.sin(elapsed * 0.2) * 0.15;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // 2. 10.5-Second Progress Timer & Multi-Stage Transition
  useEffect(() => {
    const duration = 10500; // 10.5 seconds
    const intervalTime = 50;
    const increment = (100 * intervalTime) / duration;

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }

        if (next >= 78 && stage < 4) setStage(4);
        else if (next >= 52 && stage < 3) setStage(3);
        else if (next >= 26 && stage < 2) setStage(2);

        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete, stage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.15, filter: 'blur(30px)' }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-rose-950 via-black to-pink-950 p-6 text-center overflow-hidden select-none"
    >
      {/* 3D WebGL Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Radial Glow Overlay */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-pink-600/30 via-rose-500/20 to-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse z-0" />

      {/* Main Content Carousel */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {/* STAGE 1 (0s - 2.8s): 3D Glowing Particle Heart & Intro */}
          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48 mb-6 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300/70 shadow-2xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.08, 1] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-rose-950"
                >
                  <img
                    src="/photos/photo1.jpg"
                    alt="SELO & Sezinay"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              <h2 className="text-4xl md:text-6xl font-extrabold text-white font-heading tracking-wide mb-2 drop-shadow-2xl">
                SELO & Sezinay
              </h2>
              <p className="text-pink-200 text-sm md:text-base font-light tracking-widest uppercase">
                Büyük Bir Aşk Hikayesi Başlıyor... ✨
              </p>
            </motion.div>
          )}

          {/* STAGE 2 (2.8s - 5.5s): EspressoLab Coffee Memory */}
          {stage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-48 h-48 md:w-56 md:h-56 mb-6 rounded-3xl overflow-hidden border-4 border-amber-200/90 shadow-2xl bg-amber-50 p-2 transform -rotate-2">
                <img
                  src="/photos/photo6.jpg"
                  alt="İlk Kahvemiz"
                  className="w-full h-full object-cover rounded-2xl shadow-inner"
                />
              </div>

              <h3 className="font-handwriting text-3xl md:text-5xl text-amber-200 font-bold mb-2">
                "Kushimoto EspressoLab Kahvemiz..."
              </h3>
              <p className="text-pink-100 text-xs md:text-sm font-light">
                "Selo" & "Ada" Yazılı İlk Buluşma Anımız Yükleniyor ❤️
              </p>
            </motion.div>
          )}

          {/* STAGE 3 (5.5s - 8.2s): 17.07.2026 Wax Seal Formation */}
          {stage === 3 && (
            <motion.div
              key="stage-3"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full wax-seal-btn border-4 border-amber-300 flex items-center justify-center shadow-2xl text-amber-100 font-serif font-bold text-2xl md:text-3xl mb-6 animate-pulse">
                17.07.26
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-white font-heading mb-2">
                17 Temmuz 2026
              </h3>
              <p className="text-pink-200 text-xs md:text-sm font-light">
                Kalplerimizin İlk Defa Mühürlendiği Tarih... 🌹
              </p>
            </motion.div>
          )}

          {/* STAGE 4 (8.2s - 10.5s): Welcome Sezinay & Portal Light Burst */}
          {stage === 4 && (
            <motion.div
              key="stage-4"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -30 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-pink-600 to-amber-300 flex items-center justify-center shadow-2xl border-4 border-white mb-6">
                <img
                  src="/photos/photo2.jpg"
                  alt="Sezinay & SELO"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-amber-200 font-heading mb-2">
                Hoş Geldin Sezinay'ım ❤️
              </h3>
              <p className="text-pink-100 text-xs md:text-sm font-light">
                Sana Özel Tasarladığım Gül Bahçesi Açılıyor...
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 10.5-Second Progress Bar */}
        <div className="w-full mt-10 px-4">
          <div className="w-full h-3 rounded-full bg-black/60 p-0.5 border border-pink-400/50 shadow-inner overflow-hidden mb-2">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-pink-500 via-rose-400 to-amber-300 shadow-lg"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-pink-300 font-bold">
            <span>SELO & SEZİNAY</span>
            <span>%{Math.round(progress)} YÜKLENDİ 🌹</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
