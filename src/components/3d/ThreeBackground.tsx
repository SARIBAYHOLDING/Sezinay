import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x3a0216, 0.012);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 28);

    const renderer = new THREE.WebGLRenderer({ alpha: false, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // 2. Lights with Pure White & Pink Accents
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    const whiteSpot = new THREE.SpotLight(0xffffff, 3.5);
    whiteSpot.position.set(0, 35, 45);
    whiteSpot.angle = Math.PI / 3;
    whiteSpot.penumbra = 0.8;
    scene.add(whiteSpot);

    const goldPoint = new THREE.PointLight(0xffd700, 3, 60);
    goldPoint.position.set(-20, -10, 20);
    scene.add(goldPoint);

    const pinkPoint = new THREE.PointLight(0xff4d8d, 3.5, 70);
    pinkPoint.position.set(20, 15, 15);
    scene.add(pinkPoint);

    // 3. Wavy Silk Curtain Backdrop Geometry
    const curtainGeo = new THREE.PlaneGeometry(120, 80, 64, 48);
    const curtainMat = new THREE.MeshPhongMaterial({
      color: 0x5a031a,
      emissive: 0x2b010d,
      specular: 0xffffff,
      shininess: 50,
      side: THREE.DoubleSide,
    });
    const curtainMesh = new THREE.Mesh(curtainGeo, curtainMat);
    curtainMesh.position.z = -25;
    scene.add(curtainMesh);

    const posAttr = curtainGeo.attributes.position;
    const originalZ = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      originalZ[i] = posAttr.getZ(i);
    }

    // 4. Falling 3D Rose Petals Engine (Mixed Pink & Silk White Petals)
    const petalShape = new THREE.Shape();
    petalShape.moveTo(0, 0);
    petalShape.bezierCurveTo(0.8, 0.6, 1.2, 1.8, 0.4, 2.5);
    petalShape.bezierCurveTo(-0.2, 2.8, -0.8, 2.2, -0.8, 1.2);
    petalShape.bezierCurveTo(-0.8, 0.4, -0.4, 0.1, 0, 0);

    const petalExtrude = {
      depth: 0.05,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04,
    };
    const petalGeo = new THREE.ExtrudeGeometry(petalShape, petalExtrude);
    petalGeo.center();

    // Pink Petal Material
    const pinkPetalMat = new THREE.MeshPhongMaterial({
      color: 0xff2a6d,
      emissive: 0x880e4f,
      specular: 0xffffff,
      shininess: 90,
      side: THREE.DoubleSide,
    });

    // Silk White Petal Material
    const whitePetalMat = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      emissive: 0xffeef2,
      specular: 0xffffff,
      shininess: 100,
      side: THREE.DoubleSide,
    });

    const petalInstances: {
      mesh: THREE.Mesh;
      speedY: number;
      speedX: number;
      rotSpeed: THREE.Vector3;
      swayOffset: number;
    }[] = [];

    const numPetals = 85;
    for (let i = 0; i < numPetals; i++) {
      const isWhite = i % 3 === 0;
      const mat = isWhite ? whitePetalMat.clone() : pinkPetalMat.clone();
      const mesh = new THREE.Mesh(petalGeo, mat);
      const s = 0.4 + Math.random() * 0.7;
      mesh.scale.set(s, s, s);

      mesh.position.set(
        (Math.random() - 0.5) * 65,
        Math.random() * 50 - 15,
        (Math.random() - 0.5) * 35
      );

      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
      );

      scene.add(mesh);
      petalInstances.push({
        mesh,
        speedY: 0.04 + Math.random() * 0.06,
        speedX: (Math.random() - 0.5) * 0.02,
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03,
          (Math.random() - 0.5) * 0.03
        ),
        swayOffset: Math.random() * Math.PI * 2,
      });
    }

    // 5. Floating Shiny 3D Hearts & White Pearls
    const heartShape = new THREE.Shape();
    const x = 0, y = 0;
    heartShape.moveTo(x + 0.5, y + 0.5);
    heartShape.bezierCurveTo(x + 0.5, y + 0.5, x + 0.4, y, x, y);
    heartShape.bezierCurveTo(x - 0.6, y, x - 0.6, y + 0.7, x - 0.6, y + 0.7);
    heartShape.bezierCurveTo(x - 0.6, y + 1.1, x - 0.3, y + 1.54, x + 0.5, y + 1.9);
    heartShape.bezierCurveTo(x + 1.3, y + 1.54, x + 1.6, y + 1.1, x + 1.6, y + 0.7);
    heartShape.bezierCurveTo(x + 1.6, y, x + 1.4, y, x + 1.0, y);
    heartShape.bezierCurveTo(x + 0.7, y, x + 0.5, y + 0.5, x + 0.5, y + 0.5);

    const heartExtrude = {
      depth: 0.4,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.2,
      bevelThickness: 0.2,
    };
    const heartGeo = new THREE.ExtrudeGeometry(heartShape, heartExtrude);
    heartGeo.center();

    const heartMat = new THREE.MeshPhongMaterial({
      color: 0xff4d8d,
      emissive: 0x990033,
      specular: 0xffffff,
      shininess: 100,
    });

    const heartInstances: { mesh: THREE.Mesh; basePosY: number }[] = [];
    const numHearts = 18;
    for (let i = 0; i < numHearts; i++) {
      const mesh = new THREE.Mesh(heartGeo, heartMat.clone());
      const s = 0.5 + Math.random() * 0.8;
      mesh.scale.set(s, s, s);

      mesh.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25
      );

      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);

      scene.add(mesh);
      heartInstances.push({
        mesh,
        basePosY: mesh.position.y,
      });
    }

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      targetX += (mouseX * 4 - targetX) * 0.05;
      targetY += (mouseY * 4 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // Wavy Silk Curtain
      const pArr = curtainGeo.attributes.position;
      for (let i = 0; i < pArr.count; i++) {
        const u = pArr.getX(i);
        const v = pArr.getY(i);
        const z =
          Math.sin(u * 0.15 + elapsed * 1.2) * 2.5 +
          Math.cos(v * 0.1 + elapsed * 0.8) * 1.5;
        pArr.setZ(i, originalZ[i] + z);
      }
      curtainGeo.computeVertexNormals();
      pArr.needsUpdate = true;

      // Falling Petals
      petalInstances.forEach((petal, idx) => {
        petal.mesh.position.y -= petal.speedY;
        petal.mesh.position.x += Math.sin(elapsed * 2 + petal.swayOffset + idx) * 0.03;
        petal.mesh.position.z += Math.cos(elapsed * 1.5 + idx) * 0.02;

        petal.mesh.rotation.x += petal.rotSpeed.x;
        petal.mesh.rotation.y += petal.rotSpeed.y;
        petal.mesh.rotation.z += petal.rotSpeed.z;

        if (petal.mesh.position.y < -25) {
          petal.mesh.position.y = 25;
          petal.mesh.position.x = (Math.random() - 0.5) * 65;
        }
      });

      // Floating Hearts
      heartInstances.forEach((h, idx) => {
        h.mesh.position.y = h.basePosY + Math.sin(elapsed * 1.8 + idx) * 1.2;
        h.mesh.rotation.y += 0.01;
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0" />;
};
