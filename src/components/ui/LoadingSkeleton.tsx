'use client';

import { motion } from 'framer-motion';

export const CarCardSkeleton = () => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 border-2 border-gray-700">
    <div className="flex justify-between items-start mb-4">
      <div className="space-y-2">
        <motion.div 
          className="h-6 bg-gray-700 rounded w-24"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        />
        <motion.div 
          className="h-4 bg-gray-700 rounded w-32"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.1 }}
        />
        <motion.div 
          className="h-3 bg-gray-700 rounded w-16"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }}
        />
      </div>
      <motion.div 
        className="h-8 bg-gray-700 rounded w-20"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5, delay: 0.3 }}
      />
    </div>
    
    <div className="grid grid-cols-2 gap-4 mb-4">
      {[...Array(4)].map((_, i) => (
        <motion.div 
          key={i}
          className="space-y-1"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
        >
          <div className="h-3 bg-gray-700 rounded w-12" />
          <div className="h-4 bg-gray-700 rounded w-16" />
        </motion.div>
      ))}
    </div>
    
    <div className="flex gap-2">
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className="w-6 h-6 rounded-full bg-gray-700"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.05 }}
        />
      ))}
    </div>
  </div>
);

export const ViewerSkeleton = () => (
  <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6">
    <motion.div 
      className="h-96 lg:h-[500px] mb-6 rounded-lg bg-gray-800 flex items-center justify-center"
      animate={{ opacity: [0.3, 0.7, 0.3] }}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <div className="text-4xl text-gray-600">🏎️</div>
    </motion.div>
    
    <div className="space-y-4">
      <motion.div 
        className="h-6 bg-gray-700 rounded w-32"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      />
      <div className="flex gap-3">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="w-12 h-12 rounded-full bg-gray-700"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
          />
        ))}
      </div>
    </div>
  </div>
);