import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import { Vector3, Spherical } from 'three';
import { a, useSpring } from '@react-spring/three';

const PhotoDetailView = ({
  photo,
  onClose,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
  darkMode
}) => {
  const meshRef = useRef();
  const { camera } = useThree();
  const [isClosing, setIsClosing] = useState(false);

  // Animate camera to close-up position
  useEffect(() => {
    if (photo && meshRef.current && !isClosing) {
      // Calculate target position for close-up view
      const targetPosition = new Vector3(0, 0, 5); // 5 units away from photo
      const currentSpherical = new Spherical().setFromVector3(camera.position);

      // Smooth camera transition using useThree state
      const duration = 1500; // 1.5 seconds as specified
      const startPosition = camera.position.clone();
      const startTime = Date.now();

      const animateCamera = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easeProgress = 1 - Math.pow(1 - progress, 3); // Ease-out cubic

        camera.position.lerpVectors(startPosition, targetPosition, easeProgress);
        camera.lookAt(0, 0, 0);

        if (progress < 1 && !isClosing) {
          requestAnimationFrame(animateCamera);
        }
      };

      animateCamera();
    }
  }, [photo, camera, isClosing]);

  // Close animation
  const handleClose = () => {
    setIsClosing(true);

    // Animate camera back to original position
    const duration = 1000;
    const targetPosition = new Vector3(0, 0, 15);
    const startPosition = camera.position.clone();
    const startTime = Date.now();

    const animateCameraBack = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      camera.position.lerpVectors(startPosition, targetPosition, easeProgress);

      if (progress < 1) {
        requestAnimationFrame(animateCameraBack);
      } else {
        onClose();
      }
    };

    animateCameraBack();
  };

  // Spring animation for photo scaling
  const { scale } = useSpring({
    scale: isClosing ? 0 : 1,
    config: { tension: 120, friction: 14 }
  });

  // Load texture
  const texture = useTexture(photo?.textureUrl || photo?.src);

  // Subtle floating animation
  useFrame((state) => {
    if (meshRef.current && !isClosing) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.02;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  if (!photo) return null;

  return (
    <group>
      {/* Dim background */}
      <mesh position={[0, 0, -10]}>
        <planeGeometry args={[100, 100]} />
        <meshBasicMaterial
          color={darkMode ? '#000000' : '#1f2937'}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Main photo display */}
      <a.mesh
        ref={meshRef}
        scale={scale}
        position={[0, 0, 0]}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[8, 5.33]} /> {/* 16:9 aspect ratio */}
        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          roughness={0.6}
          emissive={darkMode ? '#1e3a8a' : '#3b82f6'}
          emissiveIntensity={0.05}
        />
      </a.mesh>

      {/* Frame around photo */}
      <a.mesh scale={scale} position={[0, 0, -0.05]}>
        <planeGeometry args={[8.5, 5.8]} />
        <meshStandardMaterial
          color={darkMode ? '#1f2937' : '#f3f4f6'}
          metalness={0.3}
          roughness={0.4}
        />
      </a.mesh>

      {/* Navigation arrows */}
      {hasPrevious && (
        <mesh
          position={[-6, 0, 0.5]}
          onClick={(e) => {
            e.stopPropagation();
            onPrevious();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={darkMode ? '#60a5fa' : '#3b82f6'}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {hasNext && (
        <mesh
          position={[6, 0, 0.5]}
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            document.body.style.cursor = 'pointer';
          }}
          onPointerOut={() => {
            document.body.style.cursor = 'default';
          }}
        >
          <planeGeometry args={[1, 1]} />
          <meshBasicMaterial
            color={darkMode ? '#60a5fa' : '#3b82f6'}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Close button */}
      <mesh
        position={[4, 3, 0.5]}
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = 'default';
        }}
      >
        <planeGeometry args={[0.8, 0.8]} />
        <meshBasicMaterial
          color={darkMode ? '#ef4444' : '#dc2626'}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Photo metadata */}
      <group position={[0, -4, 0]}>
        <mesh>
          <planeGeometry args={[8, 1]} />
          <meshBasicMaterial
            color={darkMode ? '#1f2937' : '#ffffff'}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </group>
  );
};

export default PhotoDetailView;