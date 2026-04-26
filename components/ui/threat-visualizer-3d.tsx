'use client';
import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ThreatNode({ riskScore }: { riskScore: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  const isMalicious = riskScore > 75;
  const isSuspicious = riskScore > 40 && riskScore <= 75;

  const color = isMalicious ? '#ef4444' : isSuspicious ? '#f97316' : '#22c55e';
  const distort = isMalicious ? 0.8 : isSuspicious ? 0.4 : 0.1;
  const speed = isMalicious ? 4 : isSuspicious ? 2 : 1;

  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * (speed * 0.2);
      meshRef.current.rotation.y += delta * (speed * 0.3);
    }
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 64, 64]}>
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={0.8}
        clearcoatRoughness={0}
        metalness={0.5}
        roughness={0.2}
        distort={distort}
        speed={speed}
      />
    </Sphere>
  );
}

export function ThreatVisualizer3D({ riskScore }: { riskScore: number }) {
  const isMalicious = riskScore > 75;
  const isSuspicious = riskScore > 40 && riskScore <= 75;
  const statusLabel = isMalicious ? 'MALICIOUS' : isSuspicious ? 'SUSPICIOUS' : 'CLEAN';
  const statusColor = isMalicious ? 'text-red-400 border-red-500/40' : isSuspicious ? 'text-orange-400 border-orange-500/40' : 'text-green-400 border-green-500/40';

  return (
    <div className="w-full h-[300px] bg-black/40 rounded-xl border border-white/10 overflow-hidden relative">
      {/* Top-left label */}
      <div className="absolute top-4 left-4 z-10 bg-black/60 px-3 py-1 rounded-full border border-white/10 text-xs text-white backdrop-blur-sm">
        Live 3D Hologram Analysis
      </div>

      {/* Top-right status badge */}
      <div className={`absolute top-4 right-4 z-10 bg-black/60 px-3 py-1 rounded-full border backdrop-blur-sm text-xs font-bold ${statusColor}`}>
        {statusLabel}
      </div>

      {/* Bottom score bar */}
      <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-3">
        <div className="flex-1 h-1 rounded-full bg-white/10 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${isMalicious ? 'bg-red-500' : isSuspicious ? 'bg-orange-500' : 'bg-green-500'}`}
            style={{ width: `${riskScore}%` }}
          />
        </div>
        <span className="text-xs text-white/60 font-mono shrink-0">{riskScore}/100</span>
      </div>

      <Canvas camera={{ position: [0, 0, 4] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#6366f1" />
        <ThreatNode riskScore={riskScore} />
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={isMalicious ? 5 : isSuspicious ? 2 : 1}
        />
      </Canvas>
    </div>
  );
}
