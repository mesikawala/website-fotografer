import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';

const GalleryEnvironment = ({ darkMode }) => {
  const particlesRef = useRef();

  // Generate particle positions for background effect
  const particles = useMemo(() => {
    const count = 50;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 50;     // x
      positions[i + 1] = (Math.random() - 0.5) * 30; // y
      positions[i + 2] = (Math.random() - 0.5) * 50;  // z
    }

    return positions;
  }, []);

  // Animate particles
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <>
      {/* Key Light - Main directional light */}
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.0}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-far={50}
        shadow-camera-left={-15}
        shadow-camera-right={15}
        shadow-camera-top={15}
        shadow-camera-bottom={-15}
      >
        <mesh position={[0, 0, -5]}>
          <planeGeometry args={[0.5, 0.5]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>
      </directionalLight>

      {/* Fill Light - Soft light from lower-left */}
      <directionalLight
        position={[-8, -5, 8]}
        intensity={0.4}
        color="#ffffff"
      />

      {/* Rim Light - Back light for edge definition */}
      <directionalLight
        position={[0, 8, -10]}
        intensity={0.6}
        color="#ffffff"
      />

      {/* Ambient Light - Base illumination */}
      <ambientLight
        intensity={0.2}
        color={darkMode ? '#1e40af' : '#f0f9ff'}
      />

      {/* Background gradient using large sphere */}
      <mesh scale={[100, 100, 100]}>
        <sphereGeometry args={[1, 32, 16]} />
        <meshBasicMaterial
          color={darkMode ? '#0f172a' : '#f8fafc'}
          side={1} // BackSide
          transparent
          opacity={1}
        />
      </mesh>

      {/* Particle System for subtle background effect */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particles.length / 3}
            array={particles}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color={darkMode ? '#3b82f6' : '#64748b'}
          size={0.1}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Ground plane for shadows */}
      <mesh
        position={[0, -8, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[50, 50]} />
        <meshStandardMaterial
          color={darkMode ? '#1e293b' : '#e2e8f0'}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Reflection probes for realistic photo surface reflections */}
      <cubeCamera position={[0, 2, 10]} args={[1, 256, 256]}>
        <meshBasicMaterial color="#ffffff" />
      </cubeCamera>

      <cubeCamera position={[10, 2, 0]} args={[1, 256, 256]}>
        <meshBasicMaterial color="#ffffff" />
      </cubeCamera>
    </>
  );
};

export default GalleryEnvironment;