import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Vector3 } from 'three';

const CustomOrbitControls = ({
  enabled = true,
  autoRotate = false,
  enablePan = true,
  enableZoom = true,
  enableRotate = true,
  minDistance = 5,
  maxDistance = 30,
  onCameraChange,
  darkMode
}) => {
  const controlsRef = useRef();
  const { camera, gl } = useThree();

  // Default camera position
  const defaultPosition = new Vector3(0, 0, 15);
  const defaultTarget = new Vector3(0, 0, 0);

  // Reset camera to default position
  const resetCamera = () => {
    if (controlsRef.current) {
      camera.position.copy(defaultPosition);
      camera.lookAt(defaultTarget);
      controlsRef.current.target.copy(defaultTarget);
      controlsRef.current.update();
    }
  };

  // Handle camera changes
  const handleChange = () => {
    if (onCameraChange && controlsRef.current) {
      onCameraChange({
        position: camera.position.clone(),
        target: controlsRef.current.target.clone(),
        distance: camera.position.distanceTo(controlsRef.current.target)
      });
    }
  };

  // Mobile touch optimizations
  useEffect(() => {
    if (controlsRef.current) {
      // Adjust touch sensitivity for mobile
      if ('ontouchstart' in window) {
        controlsRef.current.touchAction = 'pan-y';
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = 0.05;
      }
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!controlsRef.current || !enabled) return;

      switch (event.key) {
        case 'ArrowLeft':
          controlsRef.current.target.x -= 0.5;
          break;
        case 'ArrowRight':
          controlsRef.current.target.x += 0.5;
          break;
        case 'ArrowUp':
          controlsRef.current.target.y += 0.5;
          break;
        case 'ArrowDown':
          controlsRef.current.target.y -= 0.5;
          break;
        case 'r':
        case 'R':
          resetCamera();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [enabled]);

  return (
    <OrbitControls
      ref={controlsRef}
      args={[camera, gl.domElement]}
      enabled={enabled}
      enablePan={enablePan}
      enableZoom={enableZoom}
      enableRotate={enableRotate}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={minDistance}
      maxDistance={maxDistance}
      maxPolarAngle={Math.PI * 0.85} // Limit vertical rotation slightly
      minPolarAngle={Math.PI * 0.15}
      autoRotate={autoRotate}
      autoRotateSpeed={0.5}
      onChange={handleChange}
      onStart={() => {
        // Pause auto-rotation when user starts interacting
        if (controlsRef.current) {
          controlsRef.current.autoRotate = false;
        }
      }}
      onEnd={() => {
        // Resume auto-rotation if it was enabled
        if (controlsRef.current && autoRotate) {
          controlsRef.current.autoRotate = true;
        }
      }}
    />
  );
};

export default CustomOrbitControls;