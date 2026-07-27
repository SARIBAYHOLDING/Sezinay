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

  // 1. 100x Masterpiece WebGL 3D Long-Stemmed Rose & Swirling Petal Scene
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x2a0212, 0.012);

    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // Warm Ambient & Ruby Red Rose Spot Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
    scene.add(ambientLight);

    const goldSpot = new THREE.SpotLight(0xffd700, 3.5);
    goldSpot.position.set(0, 25, 30);
    scene.add(goldSpot);

    const rubyRedLight = new THREE.PointLight(0xd90429, 4.5, 60);
    rubyRedLight.position.set(0, -10, 20);
    scene.add(rubyRedLight);

    // 2. Curved Organic Rose Petal Shape
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.7, 0.5, 1.3, 1.7, 0.7, 2.6);
    petalShape.bezierCurveTo(0.0, 3.2, -0.7, 3.2, -1.3, 2.6);
    petalShape.bezierCurveTo(-1.9, 1.7, -1.3, 0.5, 0, 0);

    const petalExtrude = {
      depth: 0.08,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.06,
      bevelThickness: 0.06,
    };
    const petalGeo = new THREE.ExtrudeGeometry(petalShape, petalExtrude);
    petalGeo.center();

    // Ruby Red Velvet Rose Petal Material
    const rubyRoseMat = new THREE.MeshPhongMaterial({
      color: 0xd90429,
      emissive: 0x540012,
      specular: 0xff8fa3,
      shininess: 45,
      side: THREE.DoubleSide,
    });

    const silkWhiteMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xffe6ed,
      specular: 0xffffff,
      shininess: 80,
      side: THREE.DoubleSide,
    });

    // Green Stem & Leaf Materials
    const stemMat = new THREE.MeshPhongMaterial({
      color: 0x2d6a4f,
      emissive: 0x1b4332,
      specular: 0x52b788,
      shininess: 30,
    });

    const leafMat = new THREE.MeshPhongMaterial({
      color: 0x40916c,
      emissive: 0x1b4332,
      specular: 0x74c69d,
      shininess: 50,
      side: THREE.DoubleSide,
    });

    // 3. Construct Complete 3D Long-Stemmed Rose Object (Blossom + Stem + Leaves)
    const fullRoseGroup = new THREE.Group();

    // A. Rose Flower Head (Spiraling Layered Petals)
    const flowerHead = new THREE.Group();
    const numLayers = 6;
    for (let layer = 0; layer < numLayers; layer++) {
      const petalsInLayer = 3 + layer * 2;
      const layerRadius = 0.2 + layer * 0.35;
      for (let p = 0; p < petalsInLayer; p++) {
        const petalMesh = new THREE.Mesh(petalGeo, rubyRoseMat.clone());
        const scale = 0.5 + layer * 0.22;
        petalMesh.scale.set(scale, scale, scale);

        const a = (p / petalsInLayer) * Math.PI * 2 + layer * 0.5;
        petalMesh.position.set(Math.cos(a) * layerRadius, Math.sin(a) * layerRadius, -layer * 0.15);
        petalMesh.rotation.z = a + Math.PI / 2;
        petalMesh.rotation.x = 0.4 + layer * 0.12;

        flowerHead.add(petalMesh);
      }
    }
    flowerHead.position.set(0, 3.5, 0);
    fullRoseGroup.add(flowerHead);

    // B. 3D Green Curved Stem
    const stemGeo = new THREE.CylinderGeometry(0.18, 0.14, 9, 16);
    const stemMesh = new THREE.Mesh(stemGeo, stemMat);
    stemMesh.position.set(0, -1, -0.2);
    stemMesh.rotation.z = -0.08;
    fullRoseGroup.add(stemMesh);

    // C. 3D Organic Green Leaves
    const leafShape = new THREE.Shape();
    leafShape.moveTo(0, 0);
    leafShape.bezierCurveTo(0.6, 0.4, 1.2, 1.2, 0.5, 2.0);
    leafShape.bezierCurveTo(0.0, 2.4, -0.5, 2.4, -1.0, 1.8);
    leafShape.bezierCurveTo(-1.5, 1.2, -0.6, 0.4, 0, 0);

    const leafGeo = new THREE.ExtrudeGeometry(leafShape, { depth: 0.04, bevelEnabled: true, bevelSize: 0.03 });
    leafGeo.center();

    const leaf1 = new THREE.Mesh(leafGeo, leafMat);
    leaf1.scale.set(0.9, 0.9, 0.9);
    leaf1.position.set(1.2, -0.5, 0);
    leaf1.rotation.set(0.3, -0.5, -0.6);
    fullRoseGroup.add(leaf1);

    const leaf2 = new THREE.Mesh(leafGeo, leafMat);
    leaf2.scale.set(0.9, 0.9, 0.9);
    leaf2.position.set(-1.2, -2.2, 0);
    leaf2.rotation.set(0.3, 0.5, 0.6);
    fullRoseGroup.add(leaf2);

    fullRoseGroup.position.set(0, 2, -2);
    scene.add(fullRoseGroup);

    // 4. 50 Slow Dreamy Swirling Rose Petals
    const petalInstances: {
      mesh: THREE.Mesh;
      speedY: number;
      rotSpeed: THREE.Vector3;
      radius: number;
      angle: number;
    }[] = [];

    const numPetals = 50;
    for (let i = 0; i < numPetals; i++) {
      const isWhite = i % 4 === 0;
      const mat = isWhite ? silkWhiteMat.clone() : rubyRoseMat.clone();
      const mesh = new THREE.Mesh(petalGeo, mat);
      const s = 0.4 + Math.random() * 0.6;
      mesh.scale.set(s, s, s);

      const radius = 6 + Math.random() * 20;
      const angle = Math.random() * Math.PI * 2;
      mesh.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      scene.add(mesh);
      petalInstances.push({
        mesh,
        speedY: 0.008 + Math.random() * 0.012,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01,
          (Math.random() - 0.5) * 0.01
        ),
        radius,
        angle,
      });
    }

    // 5. Golden Stardust Soft Glitter Particles
    const dustCount = 200;
    const dustGeo = new THREE.BufferGeometry();
    const dustPos = new Float32Array(dustCount * 3);
    for (let i = 0; i < dustCount; i++) {
      dustPos[i * 3] = (Math.random() - 0.5) * 45;
      dustPos[i * 3 + 1] = (Math.random() - 0.5) * 45;
      dustPos[i * 3 + 2] = (Math.random() - 0.5) * 25;
    }
    dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xffd700,
      size: 0.18,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const dustSystem = new THREE.Points(dustGeo, dustMat);
    scene.add(dustSystem);

    // Animation Loop with Slow Dreamy Motion
    let animId: number;
    const startTime = performance.now();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = (performance.now() - startTime) * 0.001;

      // Slow elegant 3D Long-Stemmed Rose Rotation
      fullRoseGroup.rotation.y = Math.sin(elapsed * 0.3) * 0.25;
      fullRoseGroup.rotation.z = Math.cos(elapsed * 0.25) * 0.08;

      dustSystem.rotation.y = elapsed * 0.02;

      // Gentle Floating Petals
      petalInstances.forEach((petal) => {
        petal.angle += 0.003;
        petal.mesh.position.x = Math.cos(petal.angle) * petal.radius;
        petal.mesh.position.z = Math.sin(petal.angle) * petal.radius;
        petal.mesh.position.y -= petal.speedY;

        petal.mesh.rotation.x += petal.rotSpeed.x;
        petal.mesh.rotation.y += petal.rotSpeed.y;
        petal.mesh.rotation.z += petal.rotSpeed.z;

        if (petal.mesh.position.y < -20) {
          petal.mesh.position.y = 20;
        }
      });

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
      petalGeo.dispose();
      rubyRoseMat.dispose();
      silkWhiteMat.dispose();
      stemGeo.dispose();
      stemMat.dispose();
      leafGeo.dispose();
      leafMat.dispose();
      dustGeo.dispose();
      dustMat.dispose();
      renderer.dispose();
    };
  }, []);

  // 6. 10.5-Second Progress Timer & Multi-Stage Transition
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
      {/* 3D WebGL Canvas for 3D Long-Stemmed Rose & Swirling Petals */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-tr from-pink-600/30 via-rose-500/20 to-amber-400/20 rounded-full blur-3xl pointer-events-none animate-pulse z-0" />

      {/* Main Content Carousel */}
      <div className="relative z-10 max-w-xl w-full flex flex-col items-center justify-center mt-16">
        <AnimatePresence mode="wait">
          {/* STAGE 1 (0s - 2.8s): Intro */}
          {stage === 1 && (
            <motion.div
              key="stage-1"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-36 h-36 md:w-44 md:h-44 mb-4 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-amber-300/70 shadow-2xl"
                />
                <motion.div
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-rose-950"
                >
                  <img
                    src="/photos/photo1.jpg"
                    alt="SELO & Sezinay"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </div>

              <h2 className="text-4xl md:text-6xl font-extrabold text-white font-heading tracking-wide mb-1 drop-shadow-2xl">
                SELO & Sezinay
              </h2>
              <p className="text-pink-200 text-sm md:text-base font-light tracking-widest uppercase">
                Sabret Ömrüm... ❤️ 🌹
              </p>
            </motion.div>
          )}

          {/* STAGE 2 (2.8s - 5.5s): EspressoLab Coffee Memory */}
          {stage === 2 && (
            <motion.div
              key="stage-2"
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="relative w-40 h-40 md:w-48 md:h-48 mb-4 rounded-3xl overflow-hidden border-4 border-amber-200/90 shadow-2xl bg-amber-50 p-2 transform -rotate-2">
                <img
                  src="/photos/photo6.jpg"
                  alt="İlk Kahvemiz"
                  className="w-full h-full object-cover rounded-2xl shadow-inner"
                />
              </div>

              <h3 className="font-handwriting text-3xl md:text-4xl text-amber-200 font-bold mb-1">
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
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full wax-seal-btn border-4 border-amber-300 flex items-center justify-center shadow-2xl text-amber-100 font-serif font-bold text-xl md:text-2xl mb-4 animate-pulse">
                17.07.26
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-white font-heading mb-1">
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
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 1.1, y: -20 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col items-center"
            >
              <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-gradient-to-tr from-pink-600 to-amber-300 flex items-center justify-center shadow-2xl border-4 border-white mb-4">
                <img
                  src="/photos/photo2.jpg"
                  alt="Sezinay & SELO"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>

              <h3 className="text-3xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-200 to-amber-200 font-heading mb-1">
                Hoş Geldin Sezinay'ım ❤️
              </h3>
              <p className="text-pink-100 text-xs md:text-sm font-light">
                Sana Özel Tasarladığım 3D Gül Bahçesi Açılıyor... 🌹
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 10.5-Second Progress Bar */}
        <div className="w-full mt-6 px-4">
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
