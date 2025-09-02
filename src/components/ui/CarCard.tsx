'use client';

import { Car } from '@/types/car';
import { motion } from 'framer-motion';
import { memo, useCallback, useMemo } from 'react';

interface CarCardProps {
  car: Car;
  onSelect: (car: Car) => void;
  isSelected?: boolean;
}

export const CarCard = memo(function CarCard({ car, onSelect, isSelected = false }: CarCardProps) {
  const handleSelect = useCallback(() => {
    onSelect(car);
  }, [car, onSelect]);

  const cardVariants = useMemo(() => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    hover: { scale: 1.02 },
    tap: { scale: 0.98 }
  }), []);

  const visibleColors = useMemo(() => car.colors.slice(0, 4), [car.colors]);
  const extraColorsCount = useMemo(() => Math.max(0, car.colors.length - 4), [car.colors.length]);

  const cardClassName = useMemo(() => `
    bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 cursor-pointer
    border-2 transition-all duration-300
    ${isSelected ? 'border-red-500 shadow-red-500/20 shadow-xl' : 'border-gray-700 hover:border-gray-500'}
    hover:shadow-xl
  `, [isSelected]);
  return (
    <motion.div
      className={cardClassName}
      onClick={handleSelect}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-white">{car.brand}</h3>
          <p className="text-gray-300">{car.model}</p>
          <p className="text-sm text-gray-500">{car.year}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-red-400">
            ${car.price.toLocaleString()}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Motor</p>
          <p className="text-white font-medium">{car.specs.engine}</p>
        </div>
        <div>
          <p className="text-gray-400">Potencia</p>
          <p className="text-white font-medium">{car.specs.horsepower} HP</p>
        </div>
        <div>
          <p className="text-gray-400">0-100 km/h</p>
          <p className="text-white font-medium">{car.specs.acceleration}</p>
        </div>
        <div>
          <p className="text-gray-400">Vel. Máxima</p>
          <p className="text-white font-medium">{car.specs.topSpeed} km/h</p>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        {visibleColors.map((color) => (
          <div
            key={color.name}
            className="w-6 h-6 rounded-full border border-gray-600"
            style={{ backgroundColor: color.hex }}
            title={color.name}
          />
        ))}
        {extraColorsCount > 0 && (
          <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
            <span className="text-xs text-white">+{extraColorsCount}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
});