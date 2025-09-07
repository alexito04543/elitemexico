'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SecondFrameSectionProps {
  className?: string;
}

export function SecondFrameSection({ className = '' }: SecondFrameSectionProps) {
  const [currentFrame, setCurrentFrame] = useState(6);
  const [loadedFrames, setLoadedFrames] = useState(new Set<number>());
  const [isAllLoaded, setIsAllLoaded] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageCache = useRef<Map<number, HTMLImageElement>>(new Map());
  
  // Frame range for carro3: from 6 to 67 (62 frames total)
  const startFrame = 6;
  const endFrame = 67;
  const totalFrames = endFrame - startFrame + 1; // 62 frames
  
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
          console.warn(`Failed to load carro3 frame ${i}`);
          loadedCount++;
          setLoadingProgress((loadedCount / totalFrames) * 100);
          resolve();
        };
        img.src = `/images/carro3/carro3_${i.toString().padStart(6, '0')}.jpg`;
      });
      promises.push(promise);
    }
    
    Promise.all(promises).then(() => {
      setIsAllLoaded(true);
      console.log('All carro3 frames loaded successfully!');
    });
  }, [totalFrames, startFrame, endFrame]);

  // Handle scroll-based frame animation
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const elementHeight = rect.height;
    
    // Calculate scroll progress (0 to 1) - when element is in view
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
    `/images/carro3/carro3_${currentFrame.toString().padStart(6, '0')}.jpg`,
    [currentFrame]
  );

  return (
    <div ref={containerRef} className={`relative h-[100vh] lg:h-[120vh] xl:h-[140vh] overflow-hidden ${className}`}>
      {/* Loading Screen - Similar but different colors for visual distinction */}
      {!isAllLoaded && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black flex items-center justify-center z-50">
          <div className="text-center text-white">
            <motion.div
              className="text-6xl mb-4"
              animate={{ rotate: -360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              🚗
            </motion.div>
            <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Cargando Secuencia Adicional
            </h2>
            <div className="w-64 h-2 bg-gray-700 rounded-full mx-auto mb-2">
              <div 
                className="h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-300"
                style={{ width: `${loadingProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-400">{Math.round(loadingProgress)}% - {loadedFrames.size}/{totalFrames} frames</p>
            <p className="text-xs text-cyan-300 mt-1">Carro 3 - Frames {startFrame} to {endFrame}</p>
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
          filter: 'brightness(0.85) contrast(1.4) saturate(1.15) blur(0px)',
          WebkitFilter: 'brightness(0.85) contrast(1.4) saturate(1.15) blur(0px)',
          transform: 'translateZ(0)', // Force GPU acceleration
          willChange: 'background-image',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
        }}
      />
      
      {/* Ultra-Sharp Detail Enhancement Layer */}
      <div 
        className={`absolute inset-0 w-full h-full bg-cover bg-center mix-blend-soft-light opacity-12 ultra-sharp gpu-accelerated ${
          isAllLoaded ? 'block' : 'hidden'
        }`}
        style={{ 
          backgroundImage: isAllLoaded ? `url(${currentFrameImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          filter: 'contrast(1.6) brightness(1.1) blur(0px)',
          transform: 'translateZ(0)',
          imageRendering: 'crisp-edges',
        }}
      />
      
      {/* Content Overlay with Different Gradient for Visual Distinction */}
      <div className="absolute inset-0 bg-gradient-to-t from-blue-900/50 via-purple-900/10 to-blue-900/30 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-6xl">
          {/* Secondary Title with Different Colors */}
          <motion.h2
            className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 leading-none"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent drop-shadow-2xl">
              EXPERIENCIA
            </span>
            <br />
            <span className="bg-gradient-to-r from-teal-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent drop-shadow-2xl">
              INMERSIVA
            </span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            className="text-xl md:text-2xl lg:text-3xl text-cyan-200 font-light tracking-[0.3em] mb-8 filter drop-shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            TECNOLOGÍA AVANZADA
          </motion.p>

          {/* Decorative Line */}
          <motion.div 
            className="w-32 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-teal-400 mx-auto rounded-full shadow-lg"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          />
        </div>
      </div>

      {/* Frame Debug Indicator (bottom-right for distinction) - Only show when loaded */}
      {isAllLoaded && (
        <div className="fixed bottom-4 right-4 bg-blue-900/60 backdrop-blur-sm border border-cyan-500/30 rounded-lg p-2 z-20">
          <div className="text-xs text-white font-mono">
            Carro3: <span className="text-cyan-400 font-bold">{currentFrame}</span>/{totalFrames}
          </div>
          <div className="w-20 h-1 bg-gray-700 rounded-full mt-1">
            <div 
              className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
              style={{ width: `${((currentFrame - startFrame) / (totalFrames - 1)) * 100}%` }}
            />
          </div>
          <div className="text-xs text-cyan-300 mt-1">
            ✅ {loadedFrames.size} frames
          </div>
        </div>
      )}
    </div>
  );
}