import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    // Rich deep romantic fog for depth
    scene.fog = new THREE.FogExp2(0x3a0216, 0.015);

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
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xff99bb, 1.4);
    scene.add(ambientLight);

    const mainSpot = new THREE.SpotLight(0xff4d8d, 4);
    mainSpot.position.set(0, 30, 40);
    mainSpot.angle = Math.PI / 3;
    mainSpot.penumbra = 0.8;
    scene.add(mainSpot);

    const goldPoint = new THREE.PointLight(0xffd700, 3, 60);
    goldPoint.position.set(-20, -10, 20);
    scene.add(goldPoint);

    const rosePoint = new THREE.PointLight(0xff0055, 3.5, 70);
    rosePoint.position.set(20, 15, 15);
    scene.add(rosePoint);

    // 3. Wavy Silk Curtain Backdrop Geometry
    const curtainGeo = new THREE.PlaneGeometry(120, 80, 64, 48);
    const curtainMat = new THREE.MeshPhongMaterial({
      color: 0x5a031a,
      emissive: 0x24010a,
      specular: 0xff69b4,
      shininess: 40,
      side: THREE.DoubleSide,
      flatShading: false,
    });
    const curtainMesh = new THREE.Mesh(curtainGeo, curtainMat);
    curtainMesh.position.z = -25;
    scene.add(curtainMesh);

    // Store original Z for wave animation
    const posAttr = curtainGeo.attributes.position;
    const originalZ = new Float32Array(posAttr.count);
    for (let i = 0; i < posAttr.count; i++) {
      originalZ[i] = posAttr.getZ(i);
    }

    // 4. Falling 3D Rose Petals Engine
    const petalShape = new THREE.Shape();
    // Curved Rose Petal Path
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

    const petalMat = new THREE.MeshPhongMaterial({
      color: 0xff2a6d,
      emissive: 0x880e4f,
      specular: 0xffb6c1,
      shininess: 80,
      side: THREE.DoubleSide,
    });

    const petalInstances: {
      mesh: THREE.Mesh;
      speedY: number;
      speedX: number;
      rotSpeed: THREE.Vector3;
      swayOffset: number;
    }[] = [];

    const numPetals = 70;
    for (let i = 0; i < numPetals; i++) {
      const mesh = new THREE.Mesh(petalGeo, petalMat.clone());
      const s = 0.4 + Math.random() * 0.7;
      mesh.scale.set(s, s, s);

      mesh.position.set(
        (Math.random() - 0.5) * 60,
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

    // 5. Floating Shiny 3D Heart Objects
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

    const heartInstances: { mesh: THREE.Mesh; basePosY: number; floatSpeed: number }[] = [];
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
        floatSpeed: 0.008 + Math.random() * 0.015,
      });
    }

    // 6. Interactive Cursor Light Trail Particles
    const trailCount = 40;
    const trailGeo = new THREE.BufferGeometry();
    const trailPositions = new Float32Array(trailCount * 3);
    const trailColors = new Float32Array(trailCount * 3);

    for (let i = 0; i < trailCount; i++) {
      trailPositions[i * 3] = 9999;
      trailPositions[i * 3 + 1] = 9999;
      trailPositions[i * 3 + 2] = 0;

      trailColors[i * 3] = 1; // R
      trailColors[i * 3 + 1] = 0.6 + Math.random() * 0.4; // G
      trailColors[i * 3 + 2] = 0.8; // B
    }

    trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeo.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

    // Particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const g = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
      g.addColorStop(0, 'rgba(255, 255, 255, 1)');
      g.addColorStop(0.4, 'rgba(255, 77, 141, 0.9)');
      g.addColorStop(1, 'rgba(255, 77, 141, 0)');
      pCtx.fillStyle = g;
      pCtx.beginPath();
      pCtx.arc(16, 16, 16, 0, Math.PI * 2);
      pCtx.fill();
    }
    const pTexture = new THREE.CanvasTexture(pCanvas);

    const trailMat = new THREE.PointsMaterial({
      size: 1.2,
      vertexColors: true,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const trailPoints = new THREE.Points(trailGeo, trailMat);
    scene.add(trailPoints);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let trailIdx = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;

      // Project mouse coordinates into 3D world space
      const vector = new THREE.Vector3(mouseX, mouseY, 0.5);
      vector.unproject(camera);
      const dir = vector.sub(camera.position).normalize();
      const distance = (10 - camera.position.z) / dir.z;
      const pos = camera.position.clone().add(dir.multiplyScalar(distance));

      // Add point to cursor trail
      const arr = trailGeo.attributes.position.array as Float32Array;
      arr[trailIdx * 3] = pos.x;
      arr[trailIdx * 3 + 1] = pos.y;
      arr[trailIdx * 3 + 2] = pos.z;
      trailGeo.attributes.position.needsUpdate = true;

      trailIdx = (trailIdx + 1) % trailCount;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize Handler
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

      // Smooth camera tilt towards mouse
      targetX += (mouseX * 4 - targetX) * 0.05;
      targetY += (mouseY * 4 - targetY) * 0.05;
      camera.position.x = targetX;
      camera.position.y = targetY;
      camera.lookAt(0, 0, 0);

      // 1. Animate Wavy Silk Curtain Backdrop
      const pArr = curtainGeo.attributes.position;
      for (let i = 0; i < pArr.count; i++) {
        const u = pArr.getX(i);
        const v = pArr.getY(i);
        // Sinusoidal fold waves moving with time
        const z =
          Math.sin(u * 0.15 + elapsed * 1.2) * 2.5 +
          Math.cos(v * 0.1 + elapsed * 0.8) * 1.5;
        pArr.setZ(i, originalZ[i] + z);
      }
      curtainGeo.computeVertexNormals();
      pArr.needsUpdate = true;

      // 2. Animate Falling Rose Petals
      petalInstances.forEach((petal, idx) => {
        // Fall down
        petal.mesh.position.y -= petal.speedY;

        // Sway side to side
        petal.mesh.position.x += Math.sin(elapsed * 2 + petal.swayOffset + idx) * 0.03;
        petal.mesh.position.z += Math.cos(elapsed * 1.5 + idx) * 0.02;

        // Rotate in 3D
        petal.mesh.rotation.x += petal.rotSpeed.x;
        petal.mesh.rotation.y += petal.rotSpeed.y;
        petal.mesh.rotation.z += petal.rotSpeed.z;

        // Loop back up when bottom reached
        if (petal.mesh.position.y < -25) {
          petal.mesh.position.y = 25;
          petal.mesh.position.x = (Math.random() - 0.5) * 60;
        }
      });

      // 3. Animate Floating 3D Hearts
      heartInstances.forEach((h, idx) => {
        h.mesh.position.y = h.basePosY + Math.sin(elapsed * 1.8 + idx) * 1.2;
        h.mesh.rotation.y += 0.01;
        h.mesh.rotation.z = Math.sin(elapsed + idx) * 0.1;
      });

      // 4. Move Point Lights
      goldPoint.position.x = Math.sin(elapsed * 0.8) * 25;
      rosePoint.position.y = Math.cos(elapsed * 0.7) * 20;

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
