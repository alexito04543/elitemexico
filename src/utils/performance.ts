export const PERFORMANCE_SETTINGS = {
  // Ultra High Quality - No limits, full model rendering
  ultra: {
    shadowMapSize: 4096,
    antialias: true,
    samples: 16,
    pixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 2,
    enablePostProcessing: true,
    maxLights: 20,
    enableFullGeometry: true,
    maxTriangles: Infinity,
    textureQuality: 'high'
  },
  // High-end devices
  high: {
    shadowMapSize: 2048,
    antialias: true,
    samples: 8,
    pixelRatio: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1,
    enablePostProcessing: true,
    maxLights: 10,
    enableFullGeometry: true,
    maxTriangles: 200000,
    textureQuality: 'high'
  },
  // Medium devices
  medium: {
    shadowMapSize: 1024,
    antialias: true,
    samples: 4,
    pixelRatio: 1.5,
    enablePostProcessing: false,
    maxLights: 6,
    enableFullGeometry: true,
    maxTriangles: 100000,
    textureQuality: 'medium'
  },
  // Low-end devices/slow connections
  low: {
    shadowMapSize: 512,
    antialias: false,
    samples: 0,
    pixelRatio: 1,
    enablePostProcessing: false,
    maxLights: 3,
    enableFullGeometry: false,
    maxTriangles: 50000,
    textureQuality: 'low'
  }
} as const;

export function getPerformanceLevel() {
  if (typeof window === 'undefined') return 'medium';
  
  const memory = (navigator as any).deviceMemory || 4; // eslint-disable-line @typescript-eslint/no-explicit-any
  const cores = navigator.hardwareConcurrency || 4;
  
  // Smart device detection for optimal performance
  if (memory >= 8 && cores >= 8) return 'ultra';
  if (memory >= 4 && cores >= 4) return 'high';
  if (memory >= 2 && cores >= 2) return 'medium';
  return 'low';
  
  // Original logic preserved for reference:
  /*
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  const connection = (navigator as any).connection;
  
  // Check connection speed
  const isSlowConnection = connection?.effectiveType === 'slow-2g' || 
                          connection?.effectiveType === '2g' ||
                          connection?.downlink < 1;
  
  // Check device capabilities
  const isLowEndDevice = memory <= 2 || cores <= 2;
  const isMediumDevice = memory <= 4 || cores <= 4;
  
  if (isSlowConnection || isLowEndDevice) return 'low';
  if (isMediumDevice) return 'medium';
  return 'high';
  */
}

export function optimizeForMobile() {
  if (typeof window === 'undefined') return {
    reduceQuality: false,
    simplifyGeometry: false,
    disableAutoRotate: false,
    reducedAnimations: false
  };
  
  return {
    reduceQuality: window.innerWidth < 768,
    simplifyGeometry: window.innerWidth < 480,
    disableAutoRotate: window.innerWidth < 768,
    reducedAnimations: (navigator as any).connection?.effectiveType === 'slow-2g' // eslint-disable-line @typescript-eslint/no-explicit-any
  };
}