import { Vector3, Spherical, MathUtils } from 'three';

// Utility functions for 3D operations
export const calculateCylinderPosition = (index, total, radius = 8, heightVariation = 3) => {
  const angle = (index / total) * Math.PI * 2;
  const x = Math.sin(angle) * radius;
  const z = Math.cos(angle) * radius;
  const y = (Math.random() - 0.5) * heightVariation;

  return new Vector3(x, y, z);
};

// Calculate rotation to face the center
export const calculateCylinderRotation = (index, total) => {
  const angle = (index / total) * Math.PI * 2;
  return [0, -angle, 0];
};

// Smooth camera transition
export const transitionCamera = (camera, fromPos, toPos, duration = 1500) => {
  return new Promise((resolve) => {
    const startTime = performance.now();
    const startPos = fromPos.clone();

    const animate = () => {
      const elapsed = performance.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeInOutCubic(progress);

      camera.position.lerpVectors(startPos, toPos, easeProgress);
      camera.updateMatrixWorld();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        resolve();
      }
    };

    animate();
  });
};

// Easing functions
export const easeInOutCubic = (t) => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const easeOutQuart = (t) => {
  return 1 - Math.pow(1 - t, 4);
};

export const easeInOutQuad = (t) => {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

// Raycasting utilities
export const getIntersectingObject = (raycaster, objects) => {
  const intersects = raycaster.intersectObjects(objects, true);
  return intersects.length > 0 ? intersects[0] : null;
};

// Check if device is mobile
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Check if WebGL2 is supported
export const isWebGL2Supported = () => {
  try {
    const canvas = document.createElement('canvas');
    return !!canvas.getContext('webgl2');
  } catch (e) {
    return false;
  }
};

// Performance monitoring
export const measurePerformance = (fn, label) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${label}: ${end - start}ms`);
  return result;
};

// Memory cleanup utilities
export const disposeObject = (object) => {
  if (object.geometry) {
    object.geometry.dispose();
  }

  if (object.material) {
    if (Array.isArray(object.material)) {
      object.material.forEach(material => {
        if (material.map) material.map.dispose();
        if (material.normalMap) material.normalMap.dispose();
        if (material.roughnessMap) material.roughnessMap.dispose();
        if (material.metalnessMap) material.metalnessMap.dispose();
        material.dispose();
      });
    } else {
      if (object.material.map) object.material.map.dispose();
      if (object.material.normalMap) object.material.normalMap.dispose();
      if (object.material.roughnessMap) object.material.roughnessMap.dispose();
      if (object.material.metalnessMap) object.material.metalnessMap.dispose();
      object.material.dispose();
    }
  }
};

// Generate random arrangement positions
export const generateRandomArrangement = (photos, baseRadius = 8, spread = 4) => {
  return photos.map((photo, index) => {
    const angle = (index / photos.length) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
    const radius = baseRadius + (Math.random() - 0.5) * spread;
    const height = (Math.random() - 0.5) * 6;

    return {
      ...photo,
      position: new Vector3(
        Math.sin(angle) * radius,
        height,
        Math.cos(angle) * radius
      ),
      rotation: [0, -angle + Math.random() * 0.3, (Math.random() - 0.5) * 0.2],
      scale: 0.8 + Math.random() * 0.4
    };
  });
};

// Category-specific arrangements
export const getCategoryArrangement = (category, photos) => {
  const arrangements = {
    wedding: {
      radius: 6, // Tighter spacing
      heightVariation: 1.5, // Less vertical variation
      baseRotation: 0.3, // Elegant slow rotation
      centerAlign: true, // More formal alignment
    },
    portrait: {
      radius: 7,
      heightVariation: 4, // More vertical emphasis
      baseRotation: 0.2,
      centerAlign: true,
    },
    landscape: {
      radius: 10, // Wider spacing
      heightVariation: 2, // Horizontal emphasis
      baseRotation: 0.4,
      centerAlign: false,
    },
    product: {
      radius: 8,
      heightVariation: 3,
      baseRotation: 0.5,
      centerAlign: true,
    },
    travel: {
      radius: 9,
      heightVariation: 5, // Dynamic, varied heights
      baseRotation: 0.6,
      centerAlign: false,
    }
  };

  const config = arrangements[category] || arrangements.wedding;

  return photos.map((photo, index) => {
    const baseAngle = (index / photos.length) * Math.PI * 2;
    const angleVariation = config.centerAlign ? 0 : (Math.random() - 0.5) * 0.8;
    const angle = baseAngle + angleVariation;
    const radiusVariation = config.centerAlign ? 0 : (Math.random() - 0.5) * 2;

    return {
      ...photo,
      position: new Vector3(
        Math.sin(angle) * (config.radius + radiusVariation),
        (Math.random() - 0.5) * config.heightVariation,
        Math.cos(angle) * (config.radius + radiusVariation)
      ),
      rotation: [0, -angle, 0],
      scale: 1.0
    };
  });
};

// Touch gesture helpers
export const calculateTouchDistance = (touch1, touch2) => {
  const dx = touch1.clientX - touch2.clientX;
  const dy = touch1.clientY - touch2.clientY;
  return Math.sqrt(dx * dx + dy * dy);
};

export const calculateTouchCenter = (touch1, touch2) => {
  return {
    x: (touch1.clientX + touch2.clientX) / 2,
    y: (touch1.clientY + touch2.clientY) / 2
  };
};