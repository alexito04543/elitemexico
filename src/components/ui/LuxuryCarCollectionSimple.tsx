'use client';

import React from 'react';
import { useState } from 'react';
import Image from 'next/image';

interface LuxuryCarData {
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
  };
  imagePath: string;
}

const luxuryCars: LuxuryCarData[] = [
  {
    id: 1,
    name: "Supercar Elite",
    brand: "Premium Motors",
    year: 2024,
    price: "$450,000",
    description: "El epítome del lujo y la performance. Diseño aerodinámico con tecnología de vanguardia.",
    specs: {
      engine: "V12 Twin-Turbo",
      power: "750 HP",
      acceleration: "0-100 km/h en 2.8s",
      topSpeed: "350 km/h"
    },
    imagePath: "/images/uno.jpg"
  },
  {
    id: 2,
    name: "Grand Tourer",
    brand: "Elite Automotive",
    year: 2024,
    price: "$320,000",
    description: "Elegancia refinada con performance excepcional. Perfecto para viajes de lujo.",
    specs: {
      engine: "V8 Biturbo",
      power: "630 HP",
      acceleration: "0-100 km/h en 3.2s",
      topSpeed: "320 km/h"
    },
    imagePath: "/images/dos.jpg"
  },
  {
    id: 3,
    name: "Hyper Coupe",
    brand: "Luxury Dynamics",
    year: 2024,
    price: "$680,000",
    description: "Ingeniería de precisión con un diseño revolucionario. Exclusividad máxima.",
    specs: {
      engine: "Híbrido V10",
      power: "900 HP",
      acceleration: "0-100 km/h en 2.5s",
      topSpeed: "380 km/h"
    },
    imagePath: "/images/3.jpg"
  }
];

export function LuxuryCarCollection() {
  const [, setHoveredCard] = useState<number | null>(null);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900/20 py-20 px-4">
      <div className="relative max-w-7xl mx-auto">
        <h2 className="text-5xl font-bold text-center mb-12 text-white">
          Colección de Lujo
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {luxuryCars.map((car) => (
            <div
              key={car.id}
              className="group relative bg-gray-900/80 rounded-2xl overflow-hidden shadow-2xl border border-orange-500/20 hover:border-orange-400/40 transition-all duration-300"
              onMouseEnter={() => setHoveredCard(car.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900">
                {car.imagePath && (
                  <Image
                    src={car.imagePath}
                    alt={car.name}
                    fill
                    className="object-cover"
                  />
                )}
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold text-white mb-2">{car.name}</h3>
                <p className="text-orange-400 font-semibold mb-4">{car.price}</p>
                <p className="text-gray-300 mb-4">{car.description}</p>
                
                <div className="space-y-2 text-sm text-gray-400">
                  <p>Motor: {car.specs.engine}</p>
                  <p>Potencia: {car.specs.power}</p>
                  <p>Aceleración: {car.specs.acceleration}</p>
                  <p>Velocidad Máxima: {car.specs.topSpeed}</p>
                </div>
                
                <button className="mt-6 w-full bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300">
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}