'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { SimpleCarViewer } from '@/components/ui/SimpleCarViewer';
import { ColorPicker } from '@/components/ui/ColorPicker';
import { sportsCarData } from '@/data/cars';
import { Car, CarColor } from '@/types/car';
import { generateCarJsonLd } from '@/utils/seo';

interface CarPageProps {
  params: { id: string };
}

export default function CarPage({ params }: CarPageProps) {
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [selectedColor, setSelectedColor] = useState<CarColor | null>(null);

  useEffect(() => {
    const foundCar = sportsCarData.find(c => c.id === params.id);
    if (foundCar) {
      setCar(foundCar);
      setSelectedColor(foundCar.colors[0]);
    }
  }, [params.id]);

  if (!car || !selectedColor) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando auto...</div>
      </div>
    );
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateCarJsonLd(car))
        }}
      />
      
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8 pt-24">
          {/* Back Button */}
          <motion.button
            onClick={() => router.back()}
            className="mb-6 flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            whileHover={{ x: -4 }}
          >
            ← Volver al catálogo
          </motion.button>

          {/* Car Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent mb-2">
              {car.brand} {car.model}
            </h1>
            <p className="text-xl text-gray-300">{car.year} | ${car.price.toLocaleString()}</p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            {/* 3D Viewer */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 lg:p-6">
                <div className="h-64 sm:h-80 lg:h-[600px] mb-4 lg:mb-6 rounded-lg overflow-hidden">
                  <CarViewer
                    modelPath={car.modelPath}
                    selectedColor={selectedColor}
                    className="w-full h-full"
                  />
                </div>
                
                <ColorPicker
                  colors={car.colors}
                  selectedColor={selectedColor}
                  onColorChange={setSelectedColor}
                />
              </div>
            </motion.div>

            {/* Car Details */}
            <motion.div 
              className="lg:col-span-1 space-y-6"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Specifications */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 lg:p-6">
                <h2 className="text-xl lg:text-2xl font-bold text-white mb-4 lg:mb-6">Especificaciones</h2>
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-red-400">{car.specs.horsepower}</div>
                    <div className="text-gray-400 text-sm">Caballos de Fuerza</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-blue-400">{car.specs.acceleration}</div>
                    <div className="text-gray-400 text-sm">0-100 km/h</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-3xl font-bold text-green-400">{car.specs.topSpeed}</div>
                    <div className="text-gray-400 text-sm">km/h Máxima</div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 text-center">
                    <div className="text-2xl font-bold text-purple-400">{car.year}</div>
                    <div className="text-gray-400 text-sm">Año Modelo</div>
                  </div>
                </div>
              </div>

              {/* Engine Details */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Motor y Transmisión</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Motor:</span>
                    <span className="text-white font-medium">{car.specs.engine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Transmisión:</span>
                    <span className="text-white font-medium">{car.specs.transmission}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Potencia:</span>
                    <span className="text-white font-medium">{car.specs.horsepower} HP</span>
                  </div>
                </div>
              </div>

              {/* Available Colors */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Colores Disponibles</h3>
                <div className="grid grid-cols-2 gap-3">
                  {car.colors.map(color => (
                    <div key={color.name} className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full border border-gray-600"
                        style={{ backgroundColor: color.hex }}
                      />
                      <div>
                        <div className="text-white font-medium">{color.name}</div>
                        {color.metallic && <div className="text-xs text-gray-400">Metálico</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="space-y-3">
                <motion.button
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  💬 Contactar Vendedor
                </motion.button>
                <motion.button
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-xl font-semibold transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  📄 Solicitar Información
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}