import React, { useRef, useState } from 'react';
import { Mesh, TextureLoader } from 'three';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';

const PhotoPanel = ({
  photo,
  position,
  rotation,
  onClick,
  onHover,
  isSelected = false,
  isLoading = false
}) => {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [textureLoaded, setTextureLoaded] = useState(false);

  // Load texture with error handling
  let texture = null;
  try {
    texture = useTexture(photo.textureUrl || photo.src, (loadedTexture) => {
      setTextureLoaded(true);
    });
  } catch (error) {
    console.warn(`Failed to load texture for photo ${photo.id}:`, error);
  }

  // Animation for hover effects
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.05;

      // Hover scale effect
      const targetScale = hovered ? 1.1 : (isSelected ? 1.05 : 1.0);
      meshRef.current.scale.lerp(
        { x: targetScale, y: targetScale, z: targetScale },
        0.1
      );
    }
  });

  const handleClick = (e) => {
    e.stopPropagation();
    if (onClick && textureLoaded) {
      onClick(photo);
    }
  };

  const handlePointerOver = (e) => {
    e.stopPropagation();
    setHovered(true);
    if (onHover) {
      onHover(photo, true);
    }
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    setHovered(false);
    if (onHover) {
      onHover(photo, false);
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[3, 2, 0.1]} />
      <meshStandardMaterial
        map={textureLoaded ? texture : null}
        color={!textureLoaded ? (hovered ? '#60a5fa' : '#6b7280') : '#ffffff'}
        metalness={0.1}
        roughness={0.7}
        emissive={hovered ? '#1e40af' : (isSelected ? '#1e3a8a' : '#000000')}
        emissiveIntensity={hovered ? 0.2 : (isSelected ? 0.1 : 0)}
        transparent={!textureLoaded}
        opacity={!textureLoaded ? 0.8 : 1}
      />

      {/* Loading indicator */}
      {!textureLoaded && (
        <mesh position={[0, 0, 0.06]}>
          <planeGeometry args={[2.8, 1.8]} />
          <meshBasicMaterial color="#1f2937" />
        </mesh>
      )}
    </mesh>
  );
};

export default PhotoPanel;