'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';

interface PureCarLoaderProps {
  modelPath: string;
  color: string;
  metallic?: boolean;
  autoRotate?: boolean;
  carType?: 'supercar' | 'sports' | 'luxury';
  onLoadingChange?: (isLoading: boolean) => void;
}

export function PureCarLoader({ 
  modelPath, 
  color, 
  metallic = false, 
  autoRotate = true,
  carType = 'supercar',
  onLoadingChange
}: PureCarLoaderProps) {
  const group = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);
  
  // Only load GLB files (self-contained)
  const isValidModel = modelPath && modelPath.endsWith('.glb');
  
  const { scene } = useGLTF(isValidModel ? modelPath : '', true);

  // Process loaded model
  useEffect(() => {
    if (scene && group.current && isValidModel) {
      group.current.clear();
      
      const enhancedScene = scene.clone();
      
      enhancedScene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          
          if (child.material) {
            enhanceMaterial(child, color, metallic);
          }
          
          if (child.geometry) {
            optimizeGeometry(child.geometry);
          }
        }
      });
      
      scaleModel(enhancedScene, carType);
      group.current.add(enhancedScene);
      
      setModelLoaded(true);
      if (onLoadingChange) {
        onLoadingChange(false);
      }
    }
  }, [scene, color, metallic, carType, isValidModel, onLoadingChange, enhanceMaterial]);

  const enhanceMaterial = (mesh: THREE.Mesh, color: string, metallic: boolean) => {
    if (!mesh.material) return;
    
    const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
    
    materials.forEach((material: any, index) => { // eslint-disable-line @typescript-eslint/no-explicit-any
      // Convert MeshPhysicalMaterial to MeshStandardMaterial to avoid shader errors
      if (material instanceof THREE.MeshPhysicalMaterial) {
        const simplified = new THREE.MeshStandardMaterial({
          color: material.color,
          metalness: material.metalness,
          roughness: material.roughness,
          map: material.map,
          normalMap: material.normalMap,
          name: material.name
        });
        
        if (Array.isArray(mesh.material)) {
          mesh.material[index] = simplified;
        } else {
          mesh.material = simplified;
        }
        
        material = simplified;
      }
      
      if (material instanceof THREE.MeshStandardMaterial) {
        const materialName = material.name?.toLowerCase() || '';
        const isBodyMaterial = isCarBody(materialName, material);
        
        if (isBodyMaterial) {
          material.color.set(color);
          material.metalness = metallic ? 0.8 : 0.1;
          material.roughness = metallic ? 0.1 : 0.4;
          material.needsUpdate = true;
        }
      }
    });
  };

  const isCarBody = (materialName: string, material: any): boolean => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const bodyKeywords = ['paint', 'body', 'exterior', 'car', 'hull', 'panel'];
    const hasKeyword = bodyKeywords.some(keyword => materialName.includes(keyword));
    const hasColor = material.color && (material.color.r > 0.2 || material.color.g > 0.2 || material.color.b > 0.2);
    return hasKeyword || (hasColor && !materialName.includes('wheel') && !materialName.includes('glass'));
  };


  const optimizeGeometry = (geometry: THREE.BufferGeometry) => {
    if (!geometry.attributes.normal) {
      geometry.computeVertexNormals();
    }
    if (geometry.attributes.uv && !geometry.attributes.tangent) {
      geometry.computeTangents();
    }
    geometry.computeBoundingBox();
    geometry.computeBoundingSphere();
  };

  const scaleModel = (scene: THREE.Object3D, carType: string) => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    
    if (maxDim > 0) {
      const targetSize = carType === 'supercar' ? 4.5 : 4.0;
      const scale = targetSize / maxDim;
      scene.scale.setScalar(scale);
      
      const center = box.getCenter(new THREE.Vector3());
      scene.position.set(
        -center.x * scale,
        -center.y * scale + 0.3,
        -center.z * scale
      );
    }
  };

  useFrame((state, delta) => {
    if (group.current && autoRotate && modelLoaded && delta < 0.1) {
      // Throttle rotation updates and reduce speed
      const speed = hovered ? 0.3 : 0.15;
      group.current.rotation.y += speed * Math.min(delta, 0.016); // Cap delta to 60fps
    }
  });

  if (!isValidModel) {
    return (
      <group>
        <mesh>
          <boxGeometry args={[3, 1.5, 6]} />
          <meshStandardMaterial color={color} metalness={metallic ? 0.8 : 0.2} roughness={0.3} />
        </mesh>
      </group>
    );
  }

  return (
    <group 
      ref={group}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={hovered && modelLoaded ? 1.015 : 1}
    />
  );
}

// Removed model preloading for faster initial page load
// Models now load on-demand only