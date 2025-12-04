import React, { Suspense, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { ErrorBoundary } from 'react-error-boundary';

const ThreeCanvas = ({ children, darkMode, onWebGLUnsupported }) => {
  const canvasRef = useRef();

  // Check for WebGL support
  const checkWebGLSupport = () => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  };

  if (!checkWebGLSupport()) {
    if (onWebGLUnsupported) {
      onWebGLUnsupported();
    }
    return (
      <div className={`flex items-center justify-center h-96 rounded-lg ${
        darkMode ? 'bg-[#0b1f3a] text-gray-400' : 'bg-gray-100 text-gray-600'
      }`}>
        <div className="text-center p-8">
          <div className="text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold mb-2">3D Gallery Unavailable</h3>
          <p>Your browser doesn't support WebGL. Please try a modern browser.</p>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary
      fallback={
        <div className={`flex items-center justify-center h-96 rounded-lg ${
          darkMode ? 'bg-[#0b1f3a] text-gray-400' : 'bg-gray-100 text-gray-600'
        }`}>
          <div className="text-center p-8">
            <div className="text-6xl mb-4">🔧</div>
            <h3 className="text-xl font-semibold mb-2">3D Gallery Error</h3>
            <p>Something went wrong with the 3D gallery. Please refresh the page.</p>
          </div>
        </div>
      }
    >
      <div className={`w-full h-full min-h-[500px] rounded-lg overflow-hidden ${
        darkMode ? 'shadow-2xl shadow-blue-900/20' : 'shadow-xl'
      }`}>
        <Canvas
          ref={canvasRef}
          camera={{
            position: [0, 0, 15],
            fov: 75,
            near: 0.1,
            far: 1000
          }}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={window.devicePixelRatio}
          performance={{ min: 0.5, max: 1 }}
          className={`${darkMode ? 'bg-gradient-to-b from-gray-900 to-blue-950' : 'bg-gradient-to-b from-blue-50 to-white'}`}
        >
          <Suspense
            fallback={
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
              </div>
            }
          >
            {children}
          </Suspense>
        </Canvas>
      </div>
    </ErrorBoundary>
  );
};

export default ThreeCanvas;