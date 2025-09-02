'use client';

import { CarColor } from '@/types/car';
import { motion } from 'framer-motion';
import { memo } from 'react';

interface ColorPickerProps {
  colors: CarColor[];
  selectedColor: CarColor;
  onColorChange: (color: CarColor) => void;
}

const adjustBrightness = (hex: string, percent: number): string => {
  const num = parseInt(hex.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = (num >> 8 & 0x00FF) + amt;
  const B = (num & 0x0000FF) + amt;
  return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255))
    .toString(16)
    .slice(1)}`;
};

export const ColorPicker = memo(function ColorPicker({ colors, selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-semibold text-white">Seleccionar Color</h3>
      <div className="flex gap-3 flex-wrap">
        {colors.map((color) => {
          const isSelected = selectedColor.name === color.name;
          const buttonStyle = {
            backgroundColor: color.hex,
            background: color.metallic 
              ? `linear-gradient(45deg, ${color.hex}, ${adjustBrightness(color.hex, 30)})` 
              : color.hex
          };

          const buttonClassName = `
            w-12 h-12 rounded-full border-2 transition-all
            ${isSelected 
              ? 'border-white shadow-lg scale-110' 
              : 'border-gray-400 hover:border-white hover:scale-105'
            }
            ${color.metallic ? 'shadow-inner' : ''}
          `;

          const handleColorClick = () => {
            onColorChange(color);
          };

          return (
            <motion.button
              key={color.name}
              onClick={handleColorClick}
              className={buttonClassName}
              style={buttonStyle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              title={color.name}
            />
          );
        })}
      </div>
      <p className="text-sm text-gray-300">
        {selectedColor.name} {selectedColor.metallic && '(Metálico)'}
      </p>
    </div>
  );
});