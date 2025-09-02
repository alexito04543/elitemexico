'use client';

import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';

interface ViewerControlsProps {
  onEnvironmentChange: (preset: string) => void;
  onAutoRotateToggle: (enabled: boolean) => void;
  onCameraReset: () => void;
}

const environments = [
  { name: 'Studio', value: 'studio', icon: '💡' },
  { name: 'City', value: 'city', icon: '🏙️' },
  { name: 'Sunset', value: 'sunset', icon: '🌅' },
  { name: 'Forest', value: 'forest', icon: '🌲' },
  { name: 'Warehouse', value: 'warehouse', icon: '🏭' }
];

export function ViewerControls({ 
  onEnvironmentChange, 
  onAutoRotateToggle, 
  onCameraReset 
}: ViewerControlsProps) {
  const [selectedEnvironment, setSelectedEnvironment] = useState('studio');
  const [autoRotate, setAutoRotate] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleEnvironmentChange = useCallback((env: string) => {
    setSelectedEnvironment(env);
    onEnvironmentChange(env);
  }, [onEnvironmentChange]);

  const handleAutoRotateToggle = useCallback(() => {
    const newValue = !autoRotate;
    setAutoRotate(newValue);
    onAutoRotateToggle(newValue);
  }, [autoRotate, onAutoRotateToggle]);

  return (
    <div className="absolute top-4 left-4 z-10">
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="bg-black/50 backdrop-blur-sm text-white p-3 rounded-full shadow-lg mb-4"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        ⚙️
      </motion.button>

      <motion.div
        initial={false}
        animate={{ 
          opacity: isExpanded ? 1 : 0,
          y: isExpanded ? 0 : -20,
          pointerEvents: isExpanded ? 'auto' : 'none'
        }}
        transition={{ duration: 0.3 }}
        className="bg-black/70 backdrop-blur-sm rounded-xl p-4 space-y-4 min-w-48"
      >
        {/* Environment Selection */}
        <div>
          <h4 className="text-white font-semibold mb-2">Ambiente</h4>
          <div className="grid grid-cols-2 gap-2">
            {environments.map(env => (
              <motion.button
                key={env.value}
                onClick={() => handleEnvironmentChange(env.value)}
                className={`
                  p-2 rounded-lg text-xs flex items-center gap-2 transition-all
                  ${selectedEnvironment === env.value 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{env.icon}</span>
                <span>{env.name}</span>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Auto Rotate Toggle */}
        <div className="flex items-center justify-between">
          <span className="text-white text-sm">Auto Rotación</span>
          <motion.button
            onClick={handleAutoRotateToggle}
            className={`
              w-12 h-6 rounded-full p-1 transition-all
              ${autoRotate ? 'bg-red-500' : 'bg-gray-600'}
            `}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="w-4 h-4 bg-white rounded-full"
              animate={{ x: autoRotate ? 24 : 0 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </motion.button>
        </div>

        {/* Camera Reset */}
        <motion.button
          onClick={onCameraReset}
          className="w-full bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded-lg text-sm transition-all"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          📷 Resetear Cámara
        </motion.button>

      </motion.div>
    </div>
  );
}