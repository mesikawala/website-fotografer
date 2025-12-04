import { useEffect, useRef, useState, useCallback } from 'react';

export const usePerformanceOptimization = () => {
  const frameRateRef = useRef(60);
  const lastFrameTimeRef = useRef(performance.now());
  const [isLowPerformance, setIsLowPerformance] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  // Monitor frame rate
  useEffect(() => {
    let frameCount = 0;
    const interval = setInterval(() => {
      const now = performance.now();
      const delta = now - lastFrameTimeRef.current;
      const fps = (frameCount * 1000) / delta;

      frameRateRef.current = fps;

      // Consider low performance if FPS drops below 30
      setIsLowPerformance(fps < 30);

      frameCount = 0;
      lastFrameTimeRef.current = now;
    }, 1000);

    const animationFrame = () => {
      frameCount++;
      requestAnimationFrame(animationFrame);
    };

    requestAnimationFrame(animationFrame);

    return () => clearInterval(interval);
  }, []);

  // Monitor page visibility
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Memory usage monitoring (if available)
  const checkMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = performance.memory;
      const usedMB = memory.usedJSHeapSize / 1024 / 1024;
      return usedMB;
    }
    return null;
  }, []);

  // Adaptive quality based on performance
  const getQualitySettings = useCallback(() => {
    return {
      pixelRatio: isLowPerformance ? 1 : Math.min(window.devicePixelRatio, 2),
      shadowMapSize: isLowPerformance ? 1024 : 2048,
      particleCount: isLowPerformance ? 25 : 50,
      enablePostProcessing: !isLowPerformance,
      enableReflections: !isLowPerformance,
    };
  }, [isLowPerformance]);

  return {
    frameRate: frameRateRef.current,
    isLowPerformance,
    isVisible,
    checkMemoryUsage,
    getQualitySettings,
  };
};

export const useTextureLoader = () => {
  const cache = useRef(new Map());
  const [loadedTextures, setLoadedTextures] = useState(0);
  const [totalTextures, setTotalTextures] = useState(0);

  const loadTexture = useCallback(async (url, onLoad, onError) => {
    if (cache.current.has(url)) {
      onLoad?.(cache.current.get(url));
      return cache.current.get(url);
    }

    setTotalTextures(prev => prev + 1);

    try {
      const img = new Image();
      img.crossOrigin = 'anonymous';

      return new Promise((resolve, reject) => {
        img.onload = () => {
          cache.current.set(url, img);
          setLoadedTextures(prev => prev + 1);
          onLoad?.(img);
          resolve(img);
        };

        img.onerror = () => {
          onError?.(new Error(`Failed to load texture: ${url}`));
          reject(new Error(`Failed to load texture: ${url}`));
        };

        img.src = url;
      });
    } catch (error) {
      onError?.(error);
      throw error;
    }
  }, []);

  const preloadTextures = useCallback(async (urls) => {
    setTotalTextures(urls.length);
    const promises = urls.map(url => loadTexture(url));

    try {
      await Promise.allSettled(promises);
      return true;
    } catch (error) {
      console.warn('Some textures failed to preload:', error);
      return false;
    }
  }, [loadTexture]);

  const clearCache = useCallback(() => {
    cache.current.clear();
    setLoadedTextures(0);
    setTotalTextures(0);
  }, []);

  return {
    loadTexture,
    preloadTextures,
    clearCache,
    loadedTextures,
    totalTextures,
    loadingProgress: totalTextures > 0 ? loadedTextures / totalTextures : 0,
  };
};

export const useLOD = (distanceThresholds = [10, 20, 40]) => {
  const [currentLOD, setCurrentLOD] = useState(0);

  const calculateLOD = useCallback((cameraPosition, objectPosition) => {
    const distance = cameraPosition.distanceTo(objectPosition);

    if (distance < distanceThresholds[0]) return 0; // High quality
    if (distance < distanceThresholds[1]) return 1; // Medium quality
    if (distance < distanceThresholds[2]) return 2; // Low quality
    return 3; // Lowest quality
  }, [distanceThresholds]);

  return {
    currentLOD,
    calculateLOD,
    setCurrentLOD,
  };
};