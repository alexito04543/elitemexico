'use client';

import { Canvas } from '@react-three/fiber';
import { 
  OrbitControls, 
  Environment, 
  PerspectiveCamera,
  ContactShadows,
  Lightformer,
  Float,
  Text
} from '@react-three/drei';
import { Suspense, useRef, useState, useCallback, useEffect } from 'react';
import { PureCarLoader } from './PureCarLoader';
import { FuturisticGarage } from './FuturisticGarage';
import { ViewerControls } from '../ui/ViewerControls';
import { CarColor } from '@/types/car';
import * as THREE from 'three';
import { getPerformanceLevel, PERFORMANCE_SETTINGS } from '@/utils/performance';

interface PhotorealisticSceneProps {
  modelPath: string;
  selectedColor: CarColor;
  className?: string;
}

function GarageLighting() {
  return (
    <>
      {/* Main Garage Lighting */}
      <directionalLight
        position={[0, 15, 0]}
        intensity={1.5}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={50}
        shadow-camera-left={-25}
        shadow-camera-right={25}
        shadow-camera-top={25}
        shadow-camera-bottom={-25}
        color="#ffffff"
      />
      
      {/* Ambient Workshop Lighting */}
      <ambientLight intensity={0.2} color="#74b9ff" />
      
      {/* Accent Lighting for Drama */}
      <spotLight
        position={[10, 8, 10]}
        intensity={1.0}
        angle={0.3}
        penumbra={0.5}
        color="#e17055"
        castShadow
      />
      
      <spotLight
        position={[-10, 8, -10]}
        intensity={1.0}
        angle={0.3}
        penumbra={0.5}
        color="#00cec9"
        castShadow
      />
    </>
  );
}


export function PhotorealisticScene({ modelPath, selectedColor, className = '' }: PhotorealisticSceneProps) {
  const controlsRef = useRef<any>(null);
  const [environment, setEnvironment] = useState('studio');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const perfSettings = PERFORMANCE_SETTINGS.ultra;

  const handleCameraReset = useCallback(() => {
    if (controlsRef.current) {
      controlsRef.current.reset();
    }
  }, []);

  return (
    <div className={`w-full h-full relative ${className}`}>
      <ViewerControls
        onEnvironmentChange={setEnvironment}
        onAutoRotateToggle={setAutoRotate}
        onCameraReset={handleCameraReset}
      />
      
      {/* Sketchfab-style Loading Progress */}
      {isModelLoading && (
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center z-20 rounded-lg">
          <div className="text-6xl mb-6 animate-spin">🏎️</div>
          <div className="text-white font-semibold text-xl mb-2">Cargando Modelo 3D</div>
          <div className="text-blue-400 font-medium text-sm mb-6">Sistema de optimización Sketchfab activo</div>
          
          {/* Progressive Loading Bar */}
          <div className="w-96 bg-gray-800 rounded-full h-4 mb-4 overflow-hidden border border-blue-500/30">
            <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-pulse shadow-lg shadow-blue-500/50" />
          </div>
          
          {/* Loading Features */}
          <div className="grid grid-cols-2 gap-4 text-xs text-gray-300">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Progressive Quality</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span>DRACO Compression</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>Streaming Chunks</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>Smart Caching</span>
            </div>
          </div>
        </div>
      )}
      
      <Canvas 
        shadows={true}
        gl={{ 
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.2,
          outputColorSpace: THREE.SRGBColorSpace,
          pixelRatio: perfSettings.pixelRatio,
          powerPreference: 'high-performance',
          precision: 'highp',
          alpha: true,
          premultipliedAlpha: false,
          preserveDrawingBuffer: false,
          logarithmicDepthBuffer: false,
          failIfMajorPerformanceCaveat: false
        }}
        camera={{ 
          position: [6, 3, 6], 
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#0a0a0a']} />
        <fog attach="fog" args={['#0a0a0a', 10, 50]} />
        
        <Suspense fallback={
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 1, 4]} />
            <meshStandardMaterial color="#666" />
          </mesh>
        }>
          {/* Futuristic Garage Environment */}
          <FuturisticGarage />
          
          {/* Optimized Car Loader with Sketchfab-style Progressive Loading */}
          <PureCarLoader 
            modelPath={modelPath}
            color={selectedColor.hex}
            metallic={selectedColor.metallic}
            autoRotate={autoRotate}
            carType="supercar"
            onLoadingChange={setIsModelLoading}
          />
          
          {/* Professional Garage Lighting */}
          <GarageLighting />
          
          {/* High Quality Contact Shadows */}
          <ContactShadows
            position={[0, -0.99, 0]}
            scale={25}
            blur={1.5}
            far={6}
            resolution={1024}
            color="#000000"
            opacity={0.9}
          />
          
          {/* Environment for Reflections */}
          <Environment preset={environment as any} background={false}>
            {/* Custom lightformers for car photography */}
            <Lightformer
              position={[5, 5, -5]}
              form="rect"
              intensity={4}
              color="#ffffff"
              scale={3}
              target={[0, 0, 0]}
            />
            <Lightformer
              position={[-5, 1, -1]}
              form="circle"
              intensity={2}
              color="#74b9ff"
              scale={2}
              target={[0, 0, 0]}
            />
          </Environment>
        </Suspense>
        
        <OrbitControls 
          ref={controlsRef}
          enablePan={true}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={0.1}
          minDistance={2}
          maxDistance={50}
          autoRotate={autoRotate}
          autoRotateSpeed={0.3}
          dampingFactor={0.03}
          enableDamping={true}
          panSpeed={2}
          enableZoom={true}
          zoomSpeed={1.5}
          rotateSpeed={1.2}
        />
      </Canvas>
    </div>
  );
}