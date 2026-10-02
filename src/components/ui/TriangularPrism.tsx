"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/**
 * True 3D Volumetric Crystalline Triangular Prism (Delta Shrine).
 * - Exact match to Image 2: Faceted holographic diamond crystal
 * - Volumetric 3D Extrusion (depth: 0.62) with beveled facets and inner hollow triangular portal
 * - Substantial 3D volume: looks solid, heavy, and refractive from EVERY angle (never collapses to 2D)
 * - Dual-material architecture:
 *   - Front & Back face caps: 1:1 mapped high-res diamond crystal facets from Image 2
 *   - Extruded side walls & bevels: Optical refractive glass with thin-film rainbow iridescence
 * - ZERO BACKLIGHT: Floats purely in dark studio space with zero halo or glow
 * - Full 360° omnidirectional drag-to-spin with momentum / inertial flick physics
 */

function VolumetricCrystalMesh({
  dragStateRef,
}: {
  dragStateRef: React.MutableRefObject<{
    rotY: number;
    rotX: number;
    velY: number;
    velX: number;
    isDragging: boolean;
  }>;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);

  // 1. Load high-res faceted crystal texture & diamond facet normal map
  const { crystalTexture, facetNormalTexture } = useMemo(() => {
    const loader = new THREE.TextureLoader();

    const tex = loader.load("/prism-crystal-trimmed.png");
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.ClampToEdgeWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;

    const norm = loader.load("/diamond-facets-normal.png");
    norm.wrapS = THREE.RepeatWrapping;
    norm.wrapT = THREE.RepeatWrapping;

    return { crystalTexture: tex, facetNormalTexture: norm };
  }, []);

  // 2. Generate 3D Hollow Triangular Prism Extrude Geometry with Beveled Facets
  const geometry = useMemo(() => {
    // Proportions matching 652x559 trimmed crystal texture
    const W = 2.4;
    const H = 2.4 * (559 / 652); // ~2.057

    // Outer equilateral triangle
    const shape = new THREE.Shape();
    shape.moveTo(0, H / 2);
    shape.lineTo(-W / 2, -H / 2);
    shape.lineTo(W / 2, -H / 2);
    shape.closePath();

    // Inner equilateral triangle cutout hole
    const hole = new THREE.Path();
    const yApexHole = 0.608229 * H - H / 2;
    const yBaseHole = 0.203936 * H - H / 2;
    const xLeftHole = -0.20552 * W;
    const xRightHole = 0.20399 * W;

    hole.moveTo(0, yApexHole);
    hole.lineTo(xRightHole, yBaseHole);
    hole.lineTo(xLeftHole, yBaseHole);
    hole.closePath();
    shape.holes.push(hole);

    // Deep 3D extrusion with beveled facet edges
    const extrudeSettings = {
      depth: 0.44, // Substantial 3D slab thickness
      bevelEnabled: true,
      bevelThickness: 0.08, // Generous 45° bevel cut
      bevelSize: 0.06,
      bevelSegments: 2,
      steps: 1,
    };

    const geo = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geo.center(); // Center at origin (0, 0, 0)
    geo.computeBoundingBox();

    const box = geo.boundingBox!;
    const sizeX = box.max.x - box.min.x;
    const sizeY = box.max.y - box.min.y;
    const sizeZ = box.max.z - box.min.z;
    const pos = geo.attributes.position;
    const uvs = geo.attributes.uv;

    // Group 0 = Front & Back face caps
    // Group 1 = Extruded side walls & bevel facets
    // Compute precise custom UVs for each group
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);

      if (z > 0.18) {
        // Front face cap (facing +Z)
        const u = (x - box.min.x) / sizeX;
        const v = (y - box.min.y) / sizeY;
        uvs.setXY(i, u, v);
      } else if (z < -0.18) {
        // Back face cap (facing -Z, mirror horizontally so apex stays up and symmetry holds)
        const u = 1 - (x - box.min.x) / sizeX;
        const v = (y - box.min.y) / sizeY;
        uvs.setXY(i, u, v);
      } else {
        // Extruded side walls and bevels: wrap angularly around perimeter + along depth Z
        const angle = Math.atan2(y, x); // -PI to PI
        const u = (angle / (Math.PI * 2) + 0.5) * 4.0;
        const v = ((z - box.min.z) / sizeZ) * 2.0;
        uvs.setXY(i, u, v);
      }
    }
    uvs.needsUpdate = true;
    geo.computeVertexNormals();

    return geo;
  }, []);

  // 3. Materials: Dual-material setup for photorealistic diamond face + refractive faceted sides
  const materials = useMemo(() => {
    // Material 0: Front and Back Face Diamond Crystal Caps (1:1 with Image 2)
    const capMaterial = new THREE.MeshPhysicalMaterial({
      map: crystalTexture,
      transparent: true,
      alphaTest: 0.01,
      roughness: 0.04,
      metalness: 0.06,
      transmission: 0.18,
      ior: 1.62,
      reflectivity: 1.0,
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      iridescence: 0.9,
      iridescenceIOR: 1.42,
      iridescenceThicknessRange: [220, 550],
      specularIntensity: 2.0,
      specularColor: new THREE.Color("#ffffff"),
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    // Material 1: Extruded Side Walls with Diamond-Cut Facets & Prismatic Iridescence
    const sideMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      transparent: true,
      roughness: 0.03,
      metalness: 0.04,
      transmission: 0.92, // Optical high-clarity crystal glass (no milky frost)
      thickness: 1.4,
      ior: 1.68, // Brilliant diamond refractive index
      reflectivity: 1.0,
      normalMap: facetNormalTexture,
      normalScale: new THREE.Vector2(1.2, 1.2), // Prominent diamond facet cuts
      iridescence: 1.0,
      iridescenceIOR: 1.52,
      iridescenceThicknessRange: [250, 650], // Prismatic rainbow dispersion sheen
      clearcoat: 1.0,
      clearcoatRoughness: 0.02,
      specularIntensity: 3.0,
      specularColor: new THREE.Color("#ffffff"),
      side: THREE.DoubleSide,
      depthWrite: true,
    });

    return [capMaterial, sideMaterial];
  }, [crystalTexture, facetNormalTexture]);

  // 4. Continuous 60fps frame loop for auto-rotation, inertia decay & tilt
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const state = dragStateRef.current;

    if (!state.isDragging) {
      // Apply rotational momentum
      state.rotY += state.velY * delta * 60;
      state.rotX += state.velX * delta * 60;

      // Soft vertical pitch return (restores tilt to level)
      state.velX *= Math.pow(0.92, delta * 60);
      state.rotX *= Math.pow(0.95, delta * 60);

      // Inertial damping smoothly transitioning to idle auto-spin
      const idleSpeed = 0.42; // Degrees per frame
      state.velY =
        state.velY * Math.pow(0.96, delta * 60) +
        idleSpeed * (1 - Math.pow(0.96, delta * 60));
    }

    // Apply rotation angles in radians
    groupRef.current.rotation.y = (state.rotY * Math.PI) / 180;
    groupRef.current.rotation.x = (state.rotX * Math.PI) / 180;

    // Weightless floating levitation on Y axis
    groupRef.current.position.y = Math.sin(performance.now() * 0.0016) * 0.07;
  });

  return (
    <group ref={groupRef}>
      {/* 3D Solid Volumetric Crystalline Body */}
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={materials}
        castShadow
        receiveShadow
      />

      {/* Internal Rotating Caustic Diamond Glints */}
      <pointLight position={[0, 0, 0.1]} intensity={2.2} color="#ffffff" distance={2.5} />
      <pointLight position={[0, 0.7, -0.1]} intensity={2.0} color="#c99cff" distance={2.5} />
      <pointLight position={[0, -0.6, 0.2]} intensity={1.8} color="#7de7eb" distance={2.5} />
    </group>
  );
}

export default function TriangularPrism() {
  const [mounted, setMounted] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [inView, setInView] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mutable state for drag physics to avoid React re-render lag during 60fps drag
  const dragStateRef = useRef({
    rotY: 0,
    rotX: 0,
    velY: 0.42,
    velX: 0,
    isDragging: false,
  });

  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    setMounted(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile, { passive: true });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { rootMargin: "200px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Pointer Down — start drag/grab
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    state.isDragging = true;
    setIsDragging(true);
    lastPointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: performance.now(),
    };

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore
    }
  };

  // Pointer Move — direct 3D angular manipulation
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state.isDragging) return;

    const now = performance.now();
    const dt = Math.max(now - lastPointerRef.current.time, 8);
    const dx = e.clientX - lastPointerRef.current.x;
    const dy = e.clientY - lastPointerRef.current.y;

    const sensX = isMobile ? 0.55 : 0.45;
    const sensY = isMobile ? 0.4 : 0.35;

    state.rotY += dx * sensX;
    state.rotX = Math.max(-40, Math.min(40, state.rotX - dy * sensY));

    // Calculate instantaneous release velocity
    state.velY = (dx / dt) * 16.667 * sensX;
    state.velX = -(dy / dt) * 16.667 * sensY;

    lastPointerRef.current = {
      x: e.clientX,
      y: e.clientY,
      time: now,
    };
  };

  // Pointer Up — release with momentum
  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    const state = dragStateRef.current;
    if (!state.isDragging) return;
    state.isDragging = false;
    setIsDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Ignore
    }

    // Limit maximum flick velocity for fluid elegance
    state.velY = Math.max(-14, Math.min(14, state.velY));
    state.velX = Math.max(-6, Math.min(6, state.velX));
  };

  if (!mounted) {
    return (
      <div className="w-full aspect-square max-w-[16.5rem] sm:max-w-[22rem] lg:max-w-[28rem] xl:max-w-[30rem] mx-auto lg:ml-auto flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full max-w-[16.5rem] sm:max-w-[22rem] lg:max-w-[28rem] xl:max-w-[30rem] mx-auto lg:ml-auto flex flex-col items-center select-none"
    >
      {/* 3D WebGL Canvas Container — ZERO backlight, pure dark canvas */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full aspect-square flex items-center justify-center touch-none select-none ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
      >
        <Canvas
          frameloop={inView ? "always" : "never"}
          camera={{ position: [0, 0, 4.4], fov: 40 }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
          className="w-full h-full"
        >
          {/* Studio Environment for Glistening Facet Reflections */}
          <Environment preset="studio" environmentIntensity={1.5} />

          {/* Multi-spectral directional lights for prismatic chromatic dispersion */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[-3, 4, 3]} intensity={2.5} color="#ffffff" />
          <directionalLight position={[4, 1.5, 2]} intensity={2.8} color="#c99cff" />
          <directionalLight position={[-4, -1.5, 2]} intensity={2.4} color="#7de7eb" />

          {/* The Volumetric 3D Crystal */}
          <VolumetricCrystalMesh dragStateRef={dragStateRef} />
        </Canvas>
      </div>

      {/* Minimal Sovereign Prompt Badge */}
      <div className="flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/5 backdrop-blur-sm -mt-2 sm:-mt-3 shadow-lg transition-colors hover:border-white/20">
        <span className="w-1.5 h-1.5 rounded-full bg-spectrum animate-pulse shrink-0" />
        <span className="font-mono text-[8px] sm:text-[9.5px] uppercase tracking-[0.22em] text-white/55 whitespace-nowrap">
          {isDragging ? "SPINNING · RELEASE TO GLIDE" : "✦ DRAG OR FLICK TO SPIN · 360°"}
        </span>
      </div>
    </div>
  );
}
