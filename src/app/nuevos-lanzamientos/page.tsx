'use client';

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import ClientNavbar from '@/components/layout/ClientNavbar';

interface CarLaunch {
  id: number;
  name: string;
  brand: string;
  year: number;
  price: string;
  description: string;
  specs: {
    engine: string;
    power: string;
    acceleration: string;
    topSpeed: string;
    transmission: string;
    fuelType: string;
  };
  imagePath: string;
}

const newLaunches: CarLaunch[] = [
  {
    id: 1,
    name: "Corvette Stingray",
    brand: "Chevrolet",
    year: 1974,
    price: "$385,000",
    description: "Un clásico americano reimaginado. El '74 Corvette combina el estilo atemporal con tecnología moderna restaurada.",
    specs: {
      engine: "V8 Big Block 454",
      power: "270 HP",
      acceleration: "0-100 km/h en 6.8s",
      topSpeed: "200 km/h",
      transmission: "4-Speed Manual",
      fuelType: "Gasolina Premium"
    },
    imagePath: ""
  }
];

export default function NuevosLanzamientosPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const currentCar = newLaunches[0];

  const playSound = () => {
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900/20">
      <ClientNavbar />
      
      <section className="relative pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-yellow-400 text-transparent bg-clip-text mb-4">
              Nuevos Lanzamientos
            </h1>
            <p className="text-xl text-gray-300">
              Descubre los últimos modelos en nuestra colección exclusiva
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gray-900/80 rounded-2xl p-8 border border-orange-500/30">
              <h2 className="text-3xl font-bold text-white mb-4">{currentCar.name}</h2>
              <p className="text-xl text-orange-400 mb-2">{currentCar.brand} - {currentCar.year}</p>
              <p className="text-2xl font-bold text-yellow-400 mb-4">{currentCar.price}</p>
              <p className="text-gray-300 mb-6">{currentCar.description}</p>
              
              <div className="space-y-3">
                <h3 className="text-xl font-semibold text-white mb-3">Especificaciones</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Motor:</span>
                    <p className="text-white">{currentCar.specs.engine}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Potencia:</span>
                    <p className="text-white">{currentCar.specs.power}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Aceleración:</span>
                    <p className="text-white">{currentCar.specs.acceleration}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Velocidad Máxima:</span>
                    <p className="text-white">{currentCar.specs.topSpeed}</p>
                  </div>
                </div>
              </div>

              <button
                onClick={playSound}
                disabled={isPlaying}
                className="mt-8 w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-4 px-8 rounded-lg hover:from-red-600 hover:to-orange-600 transition-all duration-300 disabled:opacity-50"
              >
                {isPlaying ? 'Reproduciendo...' : 'Escuchar Motor'}
              </button>
            </div>

            <div className="relative bg-gray-900/80 rounded-2xl overflow-hidden border border-orange-500/30">
              <div className="h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                <p className="text-2xl text-gray-500">Imagen próximamente</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}