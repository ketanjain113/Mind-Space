import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const Neural3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio || 1);
    renderer.setSize(width, height);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0px';
    renderer.domElement.style.left = '0px';
    renderer.domElement.style.zIndex = '0';
    // The canvas itself should not capture pointer events
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.opacity = '0.5';

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
    camera.position.z = 120;

    // Create a round sprite texture (canvas) so points are circular and smooth
    const spriteSize = 64;
    const sprite = document.createElement('canvas');
    sprite.width = spriteSize;
    sprite.height = spriteSize;
    const ctx = sprite.getContext('2d');
    if (ctx) {
      const cx = spriteSize / 2;
      const cy = spriteSize / 2;
      const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cx);
      // tune gradient to bright cyan -> blue tones similar to the attachment
      grad.addColorStop(0, 'rgba(255,255,255,1)');
      grad.addColorStop(0.18, 'rgba(26,235,255,0.98)');
      grad.addColorStop(0.4, 'rgba(120,160,255,0.75)');
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, spriteSize, spriteSize);
    }
    const spriteTexture = new THREE.CanvasTexture(sprite);

    // Subtle dark field of round particles to match the hero image
    const POINT_COUNT = 800;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(POINT_COUNT * 3);
    const basePositions = new Float32Array(POINT_COUNT * 3);
    const colors = new Float32Array(POINT_COUNT * 3);

    const maxRadius = Math.max(width, height) * 0.6;
    const colorNear = new THREE.Color(0x06f0e8); // cyan-ish highlights
    const colorFar = new THREE.Color(0x07101a); // very dark navy

    for (let i = 0; i < POINT_COUNT; i++) {
      const i3 = i * 3;
      // distribute across a wide area but sparse
      const r = Math.pow(Math.random(), 0.9) * maxRadius;
      const a = Math.random() * Math.PI * 2;
      const x = Math.cos(a) * r + (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * (height * 0.6);
      const z = Math.sin(a) * r + (Math.random() - 0.5) * 10;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;

      // color subtly shifts with radius (closer brighter cyan, farther darker)
      const t = Math.min(1, r / maxRadius);
      const col = colorNear.clone().lerp(colorFar, t * 0.8);
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.6,
      map: spriteTexture,
      transparent: true,
      alphaTest: 0.01,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.NormalBlending,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Add a few brighter small orbs near the hero icon area (right side)
    const ORB_COUNT = 10;
    const orbGeom = new THREE.BufferGeometry();
    const orbPos = new Float32Array(ORB_COUNT * 3);
    const orbColors = new Float32Array(ORB_COUNT * 3);
    // place cluster around an approximate right-hero position
    const heroX = width * 0.58; // tuned to image composition
    const heroY = 0; // vertical center
    for (let i = 0; i < ORB_COUNT; i++) {
      const i3 = i * 3;
      const r = 18 + Math.random() * 70;
      const a = Math.random() * Math.PI * 2;
      orbPos[i3] = heroX + Math.cos(a) * r + (Math.random() - 0.5) * 6;
      orbPos[i3 + 1] = heroY + (Math.random() - 0.5) * 60;
      orbPos[i3 + 2] = Math.sin(a) * r + (Math.random() - 0.5) * 6;
      const c = new THREE.Color(0x07f0ea).lerp(new THREE.Color(0x5ee1ff), Math.random() * 0.6);
      orbColors[i3] = c.r;
      orbColors[i3 + 1] = c.g;
      orbColors[i3 + 2] = c.b;
    }
    orbGeom.setAttribute('position', new THREE.BufferAttribute(orbPos, 3));
    orbGeom.setAttribute('color', new THREE.BufferAttribute(orbColors, 3));
    const orbMat = new THREE.PointsMaterial({
      size: 6.0,
      map: spriteTexture,
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
    });
    const orbs = new THREE.Points(orbGeom, orbMat);
    scene.add(orbs);

    // subtle fog to blend with page (very dark)
    scene.fog = new THREE.FogExp2(0x04050a, 0.00035);

    // Append canvas to container
    containerRef.current.appendChild(renderer.domElement);

    // Resize handler
    const onResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', onResize);

    // Animation
    const tempVec = new THREE.Vector3();
    let tStart = performance.now();

    const animate = (t: number) => {
      const time = (t - tStart) * 0.001;

      // Rotate the whole galaxy slowly
      points.rotation.y = time * 0.02;
      points.rotation.x = Math.sin(time * 0.12) * 0.01;

  // Slight movement on orbs cluster
  orbs.rotation.y = time * 0.02;

      // Slight per-point breathing / twinkle
      const pos = geometry.getAttribute('position') as THREE.BufferAttribute;
      for (let i = 0; i < POINT_COUNT; i++) {
        const i3 = i * 3;
        const bx = basePositions[i3];
        const by = basePositions[i3 + 1];
        const bz = basePositions[i3 + 2];

        // small oscillation that depends on index to desynchronize
        const noise = Math.sin(time * 0.8 + i * 0.23) * 0.4 + Math.cos(time * 0.3 + i * 0.11) * 0.3;

        pos.array[i3] = bx + (bx * 0.0018) * noise;
        pos.array[i3 + 1] = by + (by * 0.0015) * noise;
        pos.array[i3 + 2] = bz + (bz * 0.0018) * noise;
      }
      pos.needsUpdate = true;

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', onResize);

      try {
        geometry.dispose();
      } catch (e) {
        // ignore if already disposed
      }
      try {
        material.dispose();
      } catch (e) {
        // ignore
      }
      try {
        orbGeom.dispose();
      } catch (e) {
        // ignore
      }
      try {
        orbMat.dispose();
      } catch (e) {
        // ignore
      }
      try {
        spriteTexture.dispose();
      } catch (e) {
        // ignore
      }
      scene.clear();

      // remove canvas from DOM
      if (renderer.domElement && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement);
      }

      try {
        renderer.dispose();
      } catch (e) {
        // ignore
      }
    };
  }, []);

  // Container covers viewport and doesn't capture pointer events
  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
        opacity: 0.5,
      }}
    />
  );
};

export default Neural3DBackground;
