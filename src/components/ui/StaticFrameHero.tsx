'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface StaticFrameHeroProps {
  className?: string;
}

export function StaticFrameHero({ className = '' }: StaticFrameHeroProps) {
  const [currentFrame, setCurrentFrame] = useState(94);
  const [loadedFrames, setLoadedFrames] = useState(new Set<number>());
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  
  // Frame range for carro4: from 94 to 205 (112 frames total)
  const startFrame = 94;
  const endFrame = 205;
  const totalFrames = endFrame - startFrame + 1; // 112 frames
  
  // Preload ALL frames for completely smooth animation
  const preloadAllFrames = useCallback(() => {
    let loadedCount = 0;
    const promises: Promise<void>[] = [];
    
    for (let i = startFrame; i <= endFrame; i++) {
      const promise = new Promise<void>((resolve) => {
        const img = new Image();
        img.onload = () => {
          imageCache.current.set(i, img);
          loadedCount++;
          setLoadedFrames(prev => {
            const newSet = new Set(prev);
            newSet.add(i);
            return newSet;
          });
          setLoadingProgress((loadedCount / totalFrames) * 100);
          resolve();
        };
        img.onerror = () => {
          console.warn(`Failed to load frame ${i}`);
          loadedCount++;
          setLoadingProgress((loadedCount / totalFrames) * 100);
          resolve();
        };
        img.src = `/images/carro4/carro4_${i.toString().padStart(6, '0')}.jpg`;
      });
      promises.push(promise);
    }
    
    Promise.all(promises).then(() => {
      setIsAllLoaded(true);
      console.log('All frames loaded successfully!');
    });
  }, [totalFrames, startFrame, endFrame]);

  // Handle scroll-based frame animation
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;
    
    // Calculate scroll progress (0 to 1)
    const scrollProgress = Math.max(0, Math.min(1, 
      (windowHeight - rect.top) / (windowHeight + elementHeight)
    ));
    
    // Map scroll progress to frame number (startFrame to endFrame)
    const frameNumber = Math.floor(scrollProgress * (totalFrames - 1)) + startFrame;
    
    if (frameNumber !== currentFrame && frameNumber >= startFrame && frameNumber <= endFrame) {
      setCurrentFrame(frameNumber);
    }
  }, [currentFrame, totalFrames, startFrame, endFrame]);

  // Set up scroll listener with optimized performance
  useEffect(() => {
    preloadAllFrames();
    
    let ticking = false;
    const optimizedScrollHandler = () => {
      if (!ticking && isAllLoaded) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', optimizedScrollHandler, { passive: true });
    window.addEventListener('resize', optimizedScrollHandler, { passive: true });
    
    // Initial call only after images are loaded
    if (isAllLoaded) {
      optimizedScrollHandler();
    }
    
    return () => {
      window.removeEventListener('scroll', optimizedScrollHandler);
      window.removeEventListener('resize', optimizedScrollHandler);
    };
  }, [handleScroll, preloadAllFrames, isAllLoaded]);

  // Generate frame image path
  const currentFrameImage = useMemo(() => 
    `/images/carro4/carro4_${currentFrame.toString().padStart(6, '0')}.jpg`,
    [currentFrame]
  );

  return (
    <div ref={containerRef} className={`relative h-[120vh] lg:h-[150vh] xl:h-[180vh] overflow-hidden ${className}`}>
      {/* Loading Screen */}
      {!isAllLoaded && (
        <div className="absolute inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-center text-white">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🏎️
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">Cargando Experiencia</h2>
            <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-2">
              <div 
                className="h-2 bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">{Math.round(loadingProgress)}% - {loadedFrames.size}/{totalFrames} frames</p>
            <p className="text-xs text-blue-300 mt-1">Carro 4 - Frames {startFrame} to {endFrame}</p>
          </div>
        </div>
      )}

      {/* Animated Background with Frame Sequence - Ultra High Quality */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-300 high-quality-bg gpu-accelerated retina-optimized ultra-hd-optimized ${
          isAllLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          backgroundImage: isAllLoaded ? `url(${currentFrameImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          imageRendering: 'high-quality',
          filter: 'brightness(0.88) contrast(1.45) saturate(1.18) blur(0px)',
          WebkitFilter: 'brightness(0.88) contrast(1.45) saturate(1.18) blur(0px)',
          transform: 'translateZ(0)', // Force GPU acceleration
          willChange: 'background-image',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />
      
      {/* Ultra-Sharp Detail Enhancement Layer */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center mix-blend-soft-light opacity-15 ultra-sharp gpu-accelerated ${
          isAllLoaded ? 'block' : 'hidden'
        }`}
        style={{ 
          backgroundImage: isAllLoaded ? `url(${currentFrameImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'contrast(1.8) brightness(1.15) blur(0px)',
          transform: 'translateZ(0)',
          imageRendering: 'crisp-edges',
        }}
      />
      
      {/* Additional Clarity Enhancement for Professional Quality */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center mix-blend-luminosity opacity-8 ${
          isAllLoaded ? 'block' : 'hidden'
        }`}
        style={{ 
          backgroundImage: isAllLoaded ? `url(${currentFrameImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'contrast(2.2) brightness(1.1) saturate(0.9)',
          transform: 'translateZ(0)',
        }}
      />
      
      {/* Content Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 flex items-start justify-center pt-32">
        <div className="text-center text-white px-4 max-w-6xl">
          {/* Main Title */}
          <motion.h1
            className="text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-black mb-6 leading-none"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0 }}
          >
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent drop-shadow-2xl text-stroke-2 text-stroke-white/20">
              CARROS
            </span>
            <br />
            <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl text-stroke-2 text-stroke-white/20">
              DE LUJO
            </span>
          </motion.h1>
          
          {/* Subtitle */}
          <motion.div
            className="mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.p 
              className="text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-[0.4em] mb-4 filter drop-shadow-xl"
              whileHover={{ scale: 1.02 }}
            >
              MÉXICO
            </motion.p>
            <motion.div 
              className="w-40 h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 mx-auto rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />
          </motion.div>

          {/* Premium Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.div 
              className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md border border-red-500/30 rounded-2xl p-6 hover:border-red-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.3 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl mb-3 filter drop-shadow-lg">🏎️</div>
              <h3 className="font-black text-xl bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                3D INTERACTIVO
              </h3>
              <p className="text-sm text-gray-200 mt-2 font-medium">Visualización realista en tiempo real</p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md border border-orange-500/30 rounded-2xl p-6 hover:border-orange-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl mb-3 filter drop-shadow-lg">⚡</div>
              <h3 className="font-black text-xl bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                CONFIGURACIÓN
              </h3>
              <p className="text-sm text-gray-200 mt-2 font-medium">Colores y acabados personalizables</p>
            </motion.div>
            
            <motion.div 
              className="bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-md border border-yellow-500/30 rounded-2xl p-6 hover:border-yellow-500/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="text-3xl mb-3 filter drop-shadow-lg">🎯</div>
              <h3 className="font-black text-xl bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
                EXPERIENCIA PREMIUM
              </h3>
              <p className="text-sm text-gray-200 mt-2 font-medium">Calidad excepcional garantizada</p>
            </motion.div>
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="flex flex-col items-center text-white/90"
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-xs font-medium mb-2 tracking-wider">DESLIZA PARA EXPLORAR</span>
              <div className="w-6 h-8 border-2 border-white/40 rounded-full flex justify-center relative overflow-hidden">
                <motion.div
                  className="w-1.5 h-3 bg-gradient-to-b from-red-400 to-orange-400 rounded-full mt-1"
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          </motion.div>

          {/* Frame Debug Indicator (bottom-left) - Only show when loaded */}
          {isAllLoaded && (
            <div className="fixed bottom-4 left-4 bg-black/60 backdrop-blur-sm border border-red-500/30 rounded-lg p-2 z-20">
              <div className="text-xs text-white font-mono">
                Frame: <span className="text-red-400 font-bold">{currentFrame}</span>/{totalFrames}
              </div>
              <div className="w-20 h-1 bg-gray-700 rounded-full mt-1">
                <div 
                  className="h-1 bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                  style={{ width: `${((currentFrame - startFrame) / (totalFrames - 1)) * 100}%` }}
                />
              </div>
              <div className="text-xs text-green-400 mt-1">
                ✅ {loadedFrames.size} frames ready
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}