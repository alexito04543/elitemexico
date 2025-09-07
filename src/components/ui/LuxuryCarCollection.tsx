'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

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
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.03,
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900/20 py-20 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10" />
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 1px, transparent 1px),
                           radial-gradient(circle at 75% 75%, rgba(255,255,255,0.02) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.h2
            className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-2xl">
              AUTOS DE LUJO
            </span>
            <br />
            <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-2xl">
              COLECCIÓN
            </span>
          </motion.h2>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 font-light tracking-wider mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Descubre nuestra selecta colección de vehículos de ultra lujo.
            <br />
            <span className="text-orange-400">Cada uno, una obra maestra de ingeniería.</span>
          </motion.p>

          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mx-auto rounded-full shadow-lg"
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Cars Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {luxuryCars.map((car) => {
            // Efectos especiales para las primeras 3 cards
            const isSpecialCard = car.id <= 3;
            
            const getSpecialHoverEffect = () => {
              if (!isSpecialCard) return cardHoverVariants;
              
              switch(car.id) {
                case 1: // Supercar Elite - Efecto de fuego y velocidad
                  return {
                    hover: {
                      scale: 1.05,
                      y: -12,
                      rotateY: [0, 5, -5, 0],
                      transition: {
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }
                  };
                case 2: // Grand Tourer - Efecto de lujo elegante
                  return {
                    hover: {
                      scale: 1.04,
                      y: -10,
                      rotateX: [0, 2, -2, 0],
                      transition: {
                        duration: 0.8,
                        ease: "easeInOut"
                      }
                    }
                  };
                case 3: // Hyper Coupe - Efecto futurista
                  return {
                    hover: {
                      scale: 1.06,
                      y: -15,
                      rotateZ: [0, 1, -1, 0],
                      transition: {
                        duration: 0.5,
                        ease: "easeOut"
                      }
                    }
                  };
                default:
                  return cardHoverVariants;
              }
            };

            return (
              <motion.div
                key={car.id}
                className={`group relative backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl ${
                  isSpecialCard 
                    ? 'bg-gradient-to-br from-gray-900/90 to-black/95 border-2' 
                    : 'bg-gradient-to-br from-gray-900/80 to-black/90 border border-orange-500/20'
                } ${
                  car.id === 1 ? 'border-red-500/40 hover:border-red-400/60' :
                  car.id === 2 ? 'border-yellow-500/40 hover:border-yellow-400/60' :
                  car.id === 3 ? 'border-cyan-500/40 hover:border-cyan-400/60' :
                  'border-orange-500/20'
                }`}
                variants={cardVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredCard(car.id)}
                onHoverEnd={() => setHoveredCard(null)}
              >
                {/* Efectos especiales de fondo para las primeras 3 cards */}
                {isSpecialCard && hoveredCard === car.id && (
                  <>
                    {car.id === 1 && (
                      <>
                        {/* Efecto de llamas/fuego para Supercar Elite */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          {[...Array(8)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-2 h-6 bg-gradient-to-t from-red-500 via-orange-400 to-yellow-300 rounded-full"
                              style={{
                                left: `${10 + i * 12}%`,
                                bottom: '10px'
                              }}
                              animate={{
                                height: [24, 36, 20, 32, 24],
                                opacity: [0.6, 1, 0.7, 0.9, 0.6],
                                y: [0, -8, 0, -5, 0]
                              }}
                              transition={{
                                duration: 1.5,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            />
                          ))}
                        </motion.div>
                        
                        {/* Efecto de velocidad */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none overflow-hidden"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {[...Array(5)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute h-0.5 bg-gradient-to-r from-transparent via-red-400/80 to-transparent"
                              style={{
                                top: `${20 + i * 15}%`,
                                width: '100%'
                              }}
                              animate={{
                                x: ['-100%', '100%'],
                                opacity: [0, 1, 0]
                              }}
                              transition={{
                                duration: 0.8,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatType: "loop"
                              }}
                            />
                          ))}
                        </motion.div>
                      </>
                    )}
                    
                    {car.id === 2 && (
                      <>
                        {/* Efecto de partículas doradas para Grand Tourer */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {[...Array(12)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1.5 h-1.5 bg-gradient-to-br from-yellow-300 to-orange-400 rounded-full"
                              style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                              }}
                              animate={{
                                scale: [0, 1, 0],
                                opacity: [0, 1, 0],
                                rotate: [0, 180, 360]
                              }}
                              transition={{
                                duration: 2,
                                delay: i * 0.15,
                                repeat: Infinity,
                                repeatType: "loop"
                              }}
                            />
                          ))}
                        </motion.div>
                        
                        {/* Efecto de ondas elegantes */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute inset-0 border border-yellow-400/30 rounded-2xl"
                              animate={{
                                scale: [1, 1.05, 1],
                                opacity: [0.3, 0.6, 0.3]
                              }}
                              transition={{
                                duration: 2,
                                delay: i * 0.5,
                                repeat: Infinity,
                                repeatType: "reverse"
                              }}
                            />
                          ))}
                        </motion.div>
                      </>
                    )}
                    
                    {car.id === 3 && (
                      <>
                        {/* Efecto futurista para Hyper Coupe */}
                        <motion.div
                          className="absolute inset-0 pointer-events-none"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          {/* Líneas de circuito */}
                          {[...Array(4)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
                              style={{
                                left: '10%',
                                right: '10%',
                                top: `${25 + i * 15}%`,
                                height: '1px'
                              }}
                              animate={{
                                opacity: [0, 1, 0],
                                scaleX: [0, 1, 0]
                              }}
                              transition={{
                                duration: 1.5,
                                delay: i * 0.2,
                                repeat: Infinity,
                                repeatType: "loop"
                              }}
                            />
                          ))}
                          
                          {/* Pulsos de energía */}
                          {[...Array(6)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute w-1 h-1 bg-cyan-400 rounded-full"
                              style={{
                                left: `${15 + i * 15}%`,
                                top: '50%'
                              }}
                              animate={{
                                scale: [0, 2, 0],
                                opacity: [0, 1, 0],
                                boxShadow: [
                                  '0 0 0px rgba(34, 211, 238, 0.5)',
                                  '0 0 20px rgba(34, 211, 238, 0.8)',
                                  '0 0 0px rgba(34, 211, 238, 0.5)'
                                ]
                              }}
                              transition={{
                                duration: 1.2,
                                delay: i * 0.1,
                                repeat: Infinity,
                                repeatType: "loop"
                              }}
                            />
                          ))}
                        </motion.div>
                        
                        {/* Efecto holográfico */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-blue-500/10 pointer-events-none"
                          animate={{
                            opacity: [0.1, 0.3, 0.1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            repeatType: "reverse"
                          }}
                        />
                      </>
                    )}
                  </>
                )}

                <motion.div variants={getSpecialHoverEffect()}>
                {/* Car Image Placeholder */}
                <div className="relative h-64 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center border-b border-orange-500/20">
                  {car.imagePath ? (
                    <img
                      src={car.imagePath}
                      alt={car.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center text-gray-400 relative">
                      <motion.div
                        className="text-6xl mb-3 relative z-10"
                        animate={hoveredCard === car.id ? {
                          scale: car.id === 1 ? [1, 1.3, 1] : car.id === 2 ? [1, 1.2, 1] : car.id === 3 ? [1, 1.4, 1] : [1, 1.1, 1],
                          rotateY: car.id === 1 ? [0, 360] : car.id === 2 ? [0, -360] : car.id === 3 ? [0, 180, 360] : [0, 180, 360],
                          y: isSpecialCard ? [0, -10, 0] : [0, -5, 0]
                        } : {}}
                        transition={{ 
                          duration: isSpecialCard ? (car.id === 1 ? 1.5 : car.id === 2 ? 2.5 : 1.8) : 2, 
                          repeat: Infinity,
                          ease: isSpecialCard ? "easeInOut" : "linear"
                        }}
                        style={{
                          filter: isSpecialCard && hoveredCard === car.id 
                            ? car.id === 1 ? 'drop-shadow(0 0 10px rgba(239, 68, 68, 0.8))' 
                            : car.id === 2 ? 'drop-shadow(0 0 10px rgba(251, 191, 36, 0.8))'
                            : 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.8))'
                            : 'none'
                        }}
                      >
                        {car.id === 1 ? '🏎️' : car.id === 2 ? '🚗' : car.id === 3 ? '🛸' : '🏎️'}
                      </motion.div>
                      
                      {/* Efectos adicionales para el icono */}
                      {isSpecialCard && hoveredCard === car.id && (
                        <>
                          {car.id === 1 && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <motion.div
                                className="absolute w-20 h-20 border-2 border-red-500/50 rounded-full"
                                animate={{ 
                                  scale: [0.8, 1.2, 0.8],
                                  rotate: [0, 360]
                                }}
                                transition={{ duration: 2, repeat: Infinity }}
                              />
                            </motion.div>
                          )}
                          
                          {car.id === 2 && (
                            <>
                              {[...Array(6)].map((_, i) => (
                                <motion.div
                                  key={i}
                                  className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                                  style={{
                                    left: '50%',
                                    top: '50%',
                                    marginLeft: '-4px',
                                    marginTop: '-4px'
                                  }}
                                  animate={{
                                    x: Math.cos(i * 60 * Math.PI / 180) * 30,
                                    y: Math.sin(i * 60 * Math.PI / 180) * 30,
                                    opacity: [0, 1, 0]
                                  }}
                                  transition={{
                                    duration: 2,
                                    delay: i * 0.1,
                                    repeat: Infinity,
                                    repeatType: "loop"
                                  }}
                                />
                              ))}
                            </>
                          )}
                          
                          {car.id === 3 && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                            >
                              <motion.div
                                className="absolute w-16 h-16 rounded-full"
                                style={{
                                  background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, transparent 70%)'
                                }}
                                animate={{
                                  scale: [0.5, 1.5, 0.5],
                                  opacity: [0.5, 1, 0.5]
                                }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              />
                            </motion.div>
                          )}
                        </>
                      )}
                      
                      <p className="text-sm font-medium relative z-10">Imagen próximamente</p>
                      <p className={`text-xs mt-1 relative z-10 ${
                        car.id === 1 ? 'text-red-400' :
                        car.id === 2 ? 'text-yellow-400' :
                        car.id === 3 ? 'text-cyan-400' :
                        'text-orange-400'
                      }`}>Espacio reservado</p>
                    </div>
                  )}
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {car.price}
                  </div>
                  
                  {/* Overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                      {car.name}
                    </h3>
                    <p className="text-orange-400 text-sm font-medium">{car.brand} • {car.year}</p>
                  </div>

                  <p className="text-gray-300 text-sm mb-4 line-clamp-2 group-hover:text-gray-200 transition-colors">
                    {car.description}
                  </p>

                  {/* Specs */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Motor:</span>
                      <span className="text-white font-medium">{car.specs.engine}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">Potencia:</span>
                      <span className="text-orange-400 font-bold">{car.specs.power}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">0-100:</span>
                      <span className="text-white font-medium">{car.specs.acceleration}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-400">V. Máx:</span>
                      <span className="text-white font-medium">{car.specs.topSpeed}</span>
                    </div>
                  </div>

                  {/* CTA Button */}
                  <motion.button
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2.5 rounded-xl font-bold text-sm transition-all duration-300 hover:from-orange-400 hover:to-red-400 hover:shadow-lg hover:shadow-orange-500/25"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Ver Detalles
                  </motion.button>
                </div>

                {/* Glow effect on hover */}
                <motion.div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)',
                    boxShadow: '0 0 30px rgba(251, 146, 60, 0.3)'
                  }}
                />
              </motion.div>
            </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            whileHover={{ 
              boxShadow: "0 25px 50px rgba(251, 146, 60, 0.4)",
              y: -2
            }}
            whileTap={{ scale: 0.95 }}
          >
            Explorar Colección Completa
          </motion.button>
          
          <motion.p
            className="text-gray-400 text-sm mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            Más de 50 modelos exclusivos disponibles
          </motion.p>
        </motion.div>
      </div>

      {/* Subtle animated background elements */}
      <div className="absolute top-1/4 left-10 w-2 h-2 bg-orange-400 rounded-full animate-pulse opacity-30" />
      <div className="absolute top-1/2 right-16 w-1 h-1 bg-red-400 rounded-full animate-ping opacity-40" />
      <div className="absolute bottom-1/4 left-1/4 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse opacity-25" />
    </section>
  );
}