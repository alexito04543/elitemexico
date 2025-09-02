'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, PerspectiveCamera } from '@react-three/drei';
import { Suspense, useRef, useState, useCallback } from 'react';
import { PureCarLoader } from './PureCarLoader';
import { ViewerControls } from '../ui/ViewerControls';
import { CarColor } from '@/types/car';

interface CarViewerProps {
  modelPath: string;
  selectedColor: CarColor;
  className?: string;
}

export function CarViewer({ modelPath, selectedColor, className = '' }: CarViewerProps) {
  const controlsRef = useRef<any>(null); // eslint-disable-line @typescript-eslint/no-explicit-any
  const [environment, setEnvironment] = useState('studio');
  const [autoRotate, setAutoRotate] = useState(true);

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
      
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[5, 2, 5]} />
        <Suspense fallback={
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[2, 1, 4]} />
            <meshStandardMaterial color="#666" />
          </mesh>
        }>
          <PureCarLoader 
            modelPath={modelPath} 
            color={selectedColor.hex}
            metallic={selectedColor.metallic}
            autoRotate={autoRotate}
            carType="supercar"
          />
          <Environment preset={environment as any} /> {/* eslint-disable-line @typescript-eslint/no-explicit-any */}
        </Suspense>
        <OrbitControls 
          ref={controlsRef}
          enablePan={false} 
          maxPolarAngle={Math.PI / 2}
          minDistance={3}
          maxDistance={20}
          autoRotate={autoRotate}
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}