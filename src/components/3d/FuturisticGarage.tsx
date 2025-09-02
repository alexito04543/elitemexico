'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function FuturisticGarage() {
  const lightsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (lightsRef.current && state.clock.elapsedTime % 0.1 < 0.016) {
      // Throttled breathing effect - only update 10 times per second
      lightsRef.current.children.forEach((light, i) => {
        const intensity = 0.8 + Math.sin(state.clock.elapsedTime * 0.3 + i) * 0.05;
        if ((light as THREE.PointLight).intensity !== undefined) {
          (light as THREE.PointLight).intensity = intensity;
        }
      });
    }
  });

  // Simple materials to avoid uniform errors
  const floorMaterial = new THREE.MeshStandardMaterial({
    color: '#2d3436',
  });

  const wallMaterial = new THREE.MeshStandardMaterial({
    color: '#636e72',
  });

  const ceilingMaterial = new THREE.MeshStandardMaterial({
    color: '#2d3436',
  });

  const panelMaterial = new THREE.MeshStandardMaterial({
    color: '#0984e3',
  });

  const neonMaterial = new THREE.MeshBasicMaterial({
    color: '#00cec9',
  });

  return (
    <group>
      {/* Garage Floor - Polished Concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <primitive object={floorMaterial} />
      </mesh>

      {/* Floor Grid Lines (Futuristic) */}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={`grid-x-${i}`} position={[-16 + i * 4, -1.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.05, 40]} />
          <meshBasicMaterial color="#00cec9" transparent opacity={0.3} />
        </mesh>
      ))}
      {Array.from({ length: 9 }, (_, i) => (
        <mesh key={`grid-z-${i}`} position={[0, -1.18, -16 + i * 4]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[40, 0.05]} />
          <meshBasicMaterial color="#00cec9" transparent opacity={0.3} />
        </mesh>
      ))}

      {/* Walls */}
      <mesh position={[0, 5, -20]} material={wallMaterial} receiveShadow>
        <planeGeometry args={[40, 12]} />
      </mesh>
      <mesh position={[-20, 5, 0]} rotation={[0, Math.PI / 2, 0]} material={wallMaterial} receiveShadow>
        <planeGeometry args={[40, 12]} />
      </mesh>
      <mesh position={[20, 5, 0]} rotation={[0, -Math.PI / 2, 0]} material={wallMaterial} receiveShadow>
        <planeGeometry args={[40, 12]} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 12, 0]} material={ceilingMaterial}>
        <planeGeometry args={[40, 40]} />
      </mesh>

      {/* Ceiling Light Fixtures (Professional Track Lighting) */}
      <group ref={lightsRef}>
        {Array.from({ length: 6 }, (_, i) => (
          <group key={`light-${i}`} position={[-15 + i * 6, 11, 0]}>
            {/* Light Housing */}
            <mesh material={panelMaterial} castShadow>
              <boxGeometry args={[1, 0.3, 0.3]} />
            </mesh>
            
            {/* LED Strip */}
            <mesh position={[0, -0.2, 0]} material={neonMaterial}>
              <boxGeometry args={[0.8, 0.05, 0.2]} />
            </mesh>
            
            {/* Actual Light Source */}
            <pointLight
              position={[0, -0.3, 0]}
              intensity={1.2}
              color="#ffffff"
              distance={15}
              decay={1.5}
              castShadow
            />
          </group>
        ))}
        
        {/* Cross lighting */}
        {Array.from({ length: 4 }, (_, i) => (
          <group key={`cross-light-${i}`} position={[0, 11, -12 + i * 8]}>
            <mesh material={panelMaterial} rotation={[0, Math.PI / 2, 0]} castShadow>
              <boxGeometry args={[1, 0.3, 0.3]} />
            </mesh>
            <mesh position={[0, -0.2, 0]} material={neonMaterial} rotation={[0, Math.PI / 2, 0]}>
              <boxGeometry args={[0.8, 0.05, 0.2]} />
            </mesh>
            <pointLight
              position={[0, -0.3, 0]}
              intensity={0.8}
              color="#74b9ff"
              distance={12}
              decay={1.2}
              castShadow
            />
          </group>
        ))}
      </group>

      {/* Simple Black Pedestal */}
      <mesh position={[0, -0.85, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[2.8, 3.2, 0.5, 32]} />
        <meshStandardMaterial color="#000000" />
      </mesh>

      {/* Garage Tools & Equipment */}
      
      {/* Tool Cabinet */}
      <mesh position={[-18, 1, -18]} material={panelMaterial} castShadow>
        <boxGeometry args={[2, 4, 1]} />
      </mesh>
      
      {/* Diagnostic Equipment */}
      <mesh position={[18, 1.5, -18]} material={panelMaterial} castShadow>
        <boxGeometry args={[1.5, 3, 0.8]} />
      </mesh>

      {/* Overhead Crane Rails */}
      <mesh position={[0, 11.5, 10]} material={panelMaterial} castShadow>
        <boxGeometry args={[30, 0.3, 0.3]} />
      </mesh>
      <mesh position={[0, 11.5, -10]} material={panelMaterial} castShadow>
        <boxGeometry args={[30, 0.3, 0.3]} />
      </mesh>

      {/* Ventilation Systems */}
      {Array.from({ length: 4 }, (_, i) => (
        <mesh key={`vent-${i}`} position={[-15 + i * 10, 11.8, -15]} material={panelMaterial} castShadow>
          <cylinderGeometry args={[0.4, 0.4, 0.2, 8]} />
        </mesh>
      ))}

      {/* Neon Accent Strips */}
      <mesh position={[0, 8, -19.9]} material={neonMaterial}>
        <boxGeometry args={[35, 0.1, 0.1]} />
      </mesh>
      <mesh position={[-19.9, 8, 0]} rotation={[0, Math.PI / 2, 0]} material={neonMaterial}>
        <boxGeometry args={[35, 0.1, 0.1]} />
      </mesh>
      <mesh position={[19.9, 8, 0]} rotation={[0, Math.PI / 2, 0]} material={neonMaterial}>
        <boxGeometry args={[35, 0.1, 0.1]} />
      </mesh>

      {/* Workbench */}
      <mesh position={[15, 1, 15]} material={panelMaterial} castShadow>
        <boxGeometry args={[3, 2, 1.5]} />
      </mesh>

      {/* Computer Terminals */}
      <mesh position={[15, 2.5, 15]} castShadow>
        <boxGeometry args={[1, 0.8, 0.1]} />
        <meshStandardMaterial 
          color="#000000" 
          emissive="#0984e3" 
          emissiveIntensity={0.2}
          metalness={0.1}
          roughness={0.1}
        />
      </mesh>

      {/* Ambient Environmental Glow */}
      <pointLight position={[0, 5, 0]} intensity={0.3} color="#00cec9" distance={25} />
      <pointLight position={[15, 3, 15]} intensity={0.4} color="#0984e3" distance={10} />
      <pointLight position={[-15, 3, -15]} intensity={0.4} color="#e17055" distance={10} />
    </group>
  );
}