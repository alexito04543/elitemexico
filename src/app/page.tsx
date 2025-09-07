'use client';

import { motion } from 'framer-motion';
import { StaticFrameHero } from '@/components/ui/StaticFrameHero';
import { SecondFrameSection } from '@/components/ui/SecondFrameSection';
import { LuxuryCarCollection } from '@/components/ui/LuxuryCarCollection';


export default function Home() {

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section with Static Frame Animation */}
      <StaticFrameHero />

      {/* Enhanced Smooth Transition Divider - Elite Edition */}
      <div className="relative h-40 bg-gradient-to-b from-black via-gray-900/80 to-blue-900/30 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/15 via-purple-500/10 to-blue-500/15" />
        
        {/* Animated particles */}
        <motion.div 
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          viewport={{ once: true }}
        >
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full"
              style={{
                left: `${10 + i * 7}%`,
                top: `${30 + (i % 3) * 15}%`
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [0.8, 1.2, 0.8],
                y: [0, -10, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
          ))}
        </motion.div>

        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-6 text-white/70">
            <motion.div 
              className="w-20 h-px bg-gradient-to-r from-transparent via-orange-400/60 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 1, delay: 0.5 }}
              viewport={{ once: true }}
            />
            <motion.div 
              className="text-3xl filter drop-shadow-lg"
              animate={{ 
                rotateY: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ⚡
            </motion.div>
            <motion.div 
              className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent"
              initial={{ width: 0 }}
              whileInView={{ width: 80 }}
              transition={{ duration: 1, delay: 0.7 }}
              viewport={{ once: true }}
            />
          </div>
        </motion.div>

        {/* Subtle wave effect */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500/20 via-purple-500/20 to-blue-500/20 blur-sm" />
      </div>

      {/* Second Frame Animation Section - Seamless Integration */}
      <SecondFrameSection />

      {/* Luxury Car Collection Section */}
      <LuxuryCarCollection />

    </div>
  );
}
