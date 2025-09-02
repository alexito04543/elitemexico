'use client';

import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface StaticFrameHeroProps {
  className?: string;
}

export function StaticFrameHero({ className = '' }: StaticFrameHeroProps) {
  // Simplified version to prevent React loops
  const [isLoaded, setIsLoaded] = useState(true);

  return (
    <div className={`relative h-[120vh] lg:h-[150vh] xl:h-[180vh] overflow-hidden ${className}`}>
      {/* Static Background - No animation to prevent React loops */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ 
          backgroundImage: `url(/images/carro3/carro3_000001.jpg)`,
          filter: 'brightness(0.8) contrast(1.3) saturate(1.1)'
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
        </div>
      </div>
    </div>
  );
}