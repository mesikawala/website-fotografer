import React, { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import PhotoPanel from './PhotoPanel';

const CYLINDER_RADIUS = 8;
const CYLINDER_HEIGHT = 6;
const AUTO_ROTATION_SPEED = 0.5;
const IDLE_TIMEOUT = 3000; // 3 seconds

const CylinderCarousel = ({
  photos,
  onPhotoClick,
  onPhotoHover,
  selectedPhoto,
  autoRotate = true,
  darkMode
}) => {
  const groupRef = useRef();
  const [rotation, setRotation] = useState(0);
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [lastInteractionTime, setLastInteractionTime] = useState(Date.now());
  const [hoveredPhoto, setHoveredPhoto] = useState(null);

  // Generate cylinder positions for photos
  const generatePhotoPositions = (photoArray) => {
    return photoArray.map((photo, index) => {
      const angle = (index / photoArray.length) * Math.PI * 2;
      const x = Math.sin(angle) * CYLINDER_RADIUS;
      const z = Math.cos(angle) * CYLINDER_RADIUS;
      const y = (Math.random() - 0.5) * CYLINDER_HEIGHT * 0.6; // Random height within cylinder

      return {
        ...photo,
        position: [x, y, z],
        rotation: [0, -angle, 0],
        index
      };
    });
  };

  const photoPositions = generatePhotoPositions(photos);

  // Handle user interaction
  const handleUserInteraction = () => {
    setIsUserInteracting(true);
    setLastInteractionTime(Date.now());
  };

  // Check for idle state
  useEffect(() => {
    const checkIdleState = () => {
      if (Date.now() - lastInteractionTime > IDLE_TIMEOUT) {
        setIsUserInteracting(false);
      }
    };

    const interval = setInterval(checkIdleState, 1000);
    return () => clearInterval(interval);
  }, [lastInteractionTime]);

  // Auto-rotation animation
  useFrame((state, delta) => {
    if (groupRef.current) {
      let targetRotation = rotation;

      // Auto-rotate when not interacting
      if (autoRotate && !isUserInteracting) {
        targetRotation += AUTO_ROTATION_SPEED * delta;
      }

      // Smooth rotation
      setRotation(targetRotation);
      groupRef.current.rotation.y = targetRotation;
    }
  });

  // Handle photo hover
  const handlePhotoHover = (photo, isHovering) => {
    setHoveredPhoto(isHovering ? photo : null);
    if (onPhotoHover) {
      onPhotoHover(photo, isHovering);
    }
  };

  // Handle mouse movement for interaction detection
  const handleMouseMove = () => {
    handleUserInteraction();
  };

  return (
    <group
      ref={groupRef}
      onPointerMove={handleMouseMove}
      onPointerDown={handleUserInteraction}
    >
      {/* Central cylinder structure for visual reference */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[CYLINDER_RADIUS, CYLINDER_RADIUS, CYLINDER_HEIGHT, 32, 1, true]} />
        <meshBasicMaterial
          color={darkMode ? '#1e3a8a' : '#dbeafe'}
          transparent
          opacity={0.05}
          side={2} // DoubleSide
        />
      </mesh>

      {/* Photo panels arranged in cylinder */}
      {photoPositions.map((photoData) => (
        <PhotoPanel
          key={photoData.id}
          photo={photoData}
          position={photoData.position}
          rotation={photoData.rotation}
          onClick={onPhotoClick}
          onHover={handlePhotoHover}
          isSelected={selectedPhoto?.id === photoData.id}
          isLoading={false}
        />
      ))}

      {/* Hover indicator */}
      {hoveredPhoto && (
        <mesh
          position={[
            hoveredPhoto.position[0] * 0.5,
            hoveredPhoto.position[1] + CYLINDER_HEIGHT / 2 + 1,
            hoveredPhoto.position[2] * 0.5
          ]}
        >
          <planeGeometry args={[2, 0.5]} />
          <meshBasicMaterial
            color={darkMode ? '#1f2937' : '#ffffff'}
            transparent
            opacity={0.9}
          />
        </mesh>
      )}
    </group>
  );
};

export default CylinderCarousel;