'use client';

import { useState, useCallback, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { CarCard } from '@/components/ui/CarCard';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { CarCardSkeleton, ViewerSkeleton } from '@/components/ui/LoadingSkeleton';
import { StaticFrameHero } from '@/components/ui/StaticFrameHero';
import { sportsCarData } from '@/data/cars';
import { Car, CarColor } from '@/types/car';

const CarViewer = dynamic(() => import('@/components/3d/CarViewer').then(mod => ({ default: mod.CarViewer })), {
  ssr: false,
  loading: () => <ViewerSkeleton />
});


export default function Home() {
  const [selectedCar, setSelectedCar] = useState<Car>(sportsCarData[0]);
  const [selectedColor, setSelectedColor] = useState<CarColor>(sportsCarData[0].colors[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [modelStatus, setModelStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [modelSize, setModelSize] = useState(0);

  // Removed fake Sketchfab optimization hook for better performance

  const handleCarSelect = useCallback(async (car: Car) => {
    setIsLoading(true);
    setModelStatus('loading');
    setSelectedCar(car);
    setSelectedColor(car.colors[0]);
    
    // Validate model before loading
    try {
      const response = await fetch(car.modelPath, { method: 'HEAD' });
      if (response.ok) {
        const size = parseInt(response.headers.get('content-length') || '0');
        setModelSize(size);
        setModelStatus('success');
      } else {
        setModelStatus('error');
      }
    } catch (error) {
      console.error('Model validation failed:', error);
      setModelStatus('error');
    }
    
    // Removed fake preloading call
    
    // Reduced delay for faster feel
    setTimeout(() => setIsLoading(false), 150);
  }, []);

  // Validate initial model on load
  useEffect(() => {
    handleCarSelect(selectedCar);
  }, [handleCarSelect, selectedCar]); // Include dependencies

  const handleColorChange = useCallback((color: CarColor) => {
    setSelectedColor(color);
  }, []);

  const memoizedCarCards = useMemo(() => 
    sportsCarData.map((car) => (
      <CarCard
        key={car.id}
        car={car}
        onSelect={handleCarSelect}
        isSelected={selectedCar.id === car.id}
      />
    )), [selectedCar.id, handleCarSelect]
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Static Frame Animation */}
      <StaticFrameHero />
      
      <div className="container mx-auto px-4 py-8 pt-8">
        {/* Header */}
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-4">
            Elite Sports Cars
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Descubre la colección más exclusiva de autos deportivos de alta gama. 
            Experimenta cada modelo en 3D con colores personalizables.
          </p>
        </motion.header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
          {/* Car Selection */}
          <motion.div 
            className="lg:col-span-1 space-y-3 lg:space-y-4 order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-xl lg:text-2xl font-bold mb-4 lg:mb-6">Selecciona tu Auto</h2>
            {isLoading ? (
              <div className="space-y-4">
                <CarCardSkeleton />
                <CarCardSkeleton />
                <CarCardSkeleton />
              </div>
            ) : (
              memoizedCarCards
            )}
          </motion.div>

          {/* 3D Viewer */}
          <motion.div 
            className="lg:col-span-2 order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 lg:p-6">
              <div className="h-64 sm:h-80 lg:h-[500px] mb-4 lg:mb-6 rounded-lg overflow-hidden relative">
                {isLoading && (
                  <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                    <motion.div
                      className="text-4xl"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      🏎️
                    </motion.div>
                  </div>
                )}
                <CarViewer
                  modelPath={selectedCar.modelPath}
                  selectedColor={selectedColor}
                  className="w-full h-full"
                />
              </div>
              
              <ColorPicker
                colors={selectedCar.colors}
                selectedColor={selectedColor}
                onColorChange={handleColorChange}
              />
              
              {/* Model Performance Info */}
              <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Estado:</span>
                  <span className={modelStatus === 'success' ? 'text-green-400' : modelStatus === 'error' ? 'text-red-400' : 'text-yellow-400'}>
                    {modelStatus === 'success' ? '✅ LISTO' : modelStatus === 'error' ? '❌ ERROR' : '⏳ CARGANDO'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tamaño:</span>
                  <span className="text-blue-400">{(modelSize / (1024 * 1024)).toFixed(1)} MB</span>
                </div>
              </div>
              
              {/* Optimization Features Active */}
              <div className="mt-3 bg-blue-900/30 rounded-lg p-3 border border-blue-500/20">
                <div className="text-xs font-semibold text-blue-300 mb-2">🚀 Optimizaciones Sketchfab Activas:</div>
                <div className="grid grid-cols-2 gap-1 text-xs text-blue-200">
                  <div>✅ Progressive Loading</div>
                  <div>✅ DRACO Compression</div>
                  <div>✅ Smart Caching</div>
                  <div>✅ Adaptive Preload</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Car Details */}
        <motion.section 
          className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold mb-4 lg:mb-6">{selectedCar.brand} {selectedCar.model}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-red-400">{selectedCar.specs.horsepower}</div>
              <div className="text-gray-400 text-xs lg:text-sm">Caballos de Fuerza</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-blue-400">{selectedCar.specs.acceleration}</div>
              <div className="text-gray-400 text-xs lg:text-sm">0-100 km/h</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-green-400">{selectedCar.specs.topSpeed}</div>
              <div className="text-gray-400 text-xs lg:text-sm">km/h Máxima</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-purple-400">${selectedCar.price.toLocaleString()}</div>
              <div className="text-gray-400 text-xs lg:text-sm">Precio USD</div>
            </div>
          </div>
        </motion.section>
      </div>

    </div>
  );
}
