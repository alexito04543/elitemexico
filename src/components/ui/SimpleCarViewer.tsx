'use client';

import { CarColor } from '@/types/car';
import { motion } from 'framer-motion';

interface SimpleCarViewerProps {
  modelPath: string;
  selectedColor: CarColor;
  className?: string;
}

export function SimpleCarViewer({ selectedColor, className = '' }: SimpleCarViewerProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <motion.div
        className="w-64 h-32 rounded-xl shadow-2xl relative overflow-hidden"
        style={{
          background: selectedColor.metallic 
            ? `linear-gradient(45deg, ${selectedColor.hex}, ${selectedColor.hex}dd)`
            : selectedColor.hex
        }}
        animate={{ 
          rotateY: [0, 360],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          rotateY: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity }
        }}
        whileHover={{ scale: 1.1 }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="text-4xl"
            animate={{ rotate: [0, -10, 0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            🏎️
          </motion.div>
        </div>
        <div className="absolute bottom-2 left-2 right-2 text-center">
          <div className="text-white text-xs font-bold drop-shadow-lg">
            {selectedColor.name}
          </div>
        </div>
      </motion.div>
    </div>
  );
}