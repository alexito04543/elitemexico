'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    imagePath: "" // Placeholder para imagen
  }
];

const features = [
  { 
    id: 1, 
    title: "Llantas", 
    description: "Compuestos de última generación para máximo agarre",
    side: "left",
    imagePath: "" 
  },
  { 
    id: 2, 
    title: "Rines", 
    description: "Aleaciones ultraligeras con diseño aerodinámico",
    side: "right",
    imagePath: "" 
  },
  { 
    id: 3, 
    title: "Colores", 
    description: "Paleta exclusiva con acabados premium personalizables",
    side: "left",
    imagePath: "" 
  },
  { 
    id: 4, 
    title: "Tecnología", 
    description: "Sistemas inteligentes de última generación",
    side: "right",
    imagePath: "" 
  },
  { 
    id: 5, 
    title: "Interior", 
    description: "Materiales premium con acabados artesanales",
    side: "left",
    imagePath: "" 
  },
  { 
    id: 6, 
    title: "Performance", 
    description: "Calibraciones de alto rendimiento personalizadas",
    side: "right",
    imagePath: "" 
  },
  { 
    id: 7, 
    title: "Seguridad", 
    description: "Sistemas de protección avanzados integrados",
    side: "left",
    imagePath: "" 
  },
  { 
    id: 8, 
    title: "Conectividad", 
    description: "Integración completa con ecosistema digital",
    side: "right",
    imagePath: "" 
  }
];

export default function NuevosLanzamientosPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const currentCar = newLaunches[0]; // Only one car now

  const playSound = async () => {
    console.log('Attempting to play sound...');
    setIsLoading(true);

    try {
      // Try multiple audio formats for better compatibility
      const audioSources = [
        '/images/sonido1.mp3',
        // Fallback to a simple beep sound if needed
      ];

      let audio: HTMLAudioElement | null = null;
      let audioLoaded = false;

      for (const src of audioSources) {
        try {
          console.log(`Trying audio source: ${src}`);
          audio = new Audio();
          
          // Set up audio properties
          audio.volume = 0.7;
          audio.preload = 'auto';
          audio.crossOrigin = 'anonymous';
          
          // Create a promise to handle loading
          const loadPromise = new Promise<void>((resolve, reject) => {
            const cleanup = () => {
              audio!.removeEventListener('canplaythrough', onCanPlay);
              audio!.removeEventListener('error', onError);
              audio!.removeEventListener('loadeddata', onLoaded);
            };

            const onCanPlay = () => {
              console.log('Audio can play through');
              cleanup();
              resolve();
            };

            const onLoaded = () => {
              console.log('Audio data loaded');
            };

            const onError = (e: Event) => {
              console.error('Audio load error:', e);
              console.error('Audio error details:', audio!.error);
              cleanup();
              reject(new Error(`Audio load failed: ${audio!.error?.message || 'Unknown error'}`));
            };

            audio!.addEventListener('canplaythrough', onCanPlay);
            audio!.addEventListener('error', onError);
            audio!.addEventListener('loadeddata', onLoaded);
          });

          // Set source and load
          audio.src = src;
          audio.load();

          // Wait for audio to be ready
          await loadPromise;
          audioLoaded = true;
          setCurrentAudio(audio);
          break;

        } catch (error) {
          console.error(`Failed to load ${src}:`, error);
          if (audio) {
            audio.pause();
            audio = null;
          }
        }
      }

      if (!audioLoaded || !audio) {
        throw new Error('No se pudo cargar ningún formato de audio');
      }

      // Set up playback event listeners
      const handleEnded = () => {
        console.log('Audio playback ended');
        setIsPlaying(false);
        setCurrentAudio(null);
      };

      audio.addEventListener('ended', handleEnded);

      // Start playback
      setIsLoading(false);
      setIsPlaying(true);
      console.log('Starting audio playback...');
      
      await audio.play();
      console.log('Audio is now playing');

    } catch (error) {
      console.error('Audio playback failed:', error);
      setIsLoading(false);
      setIsPlaying(false);
      setCurrentAudio(null);
      
      // Create a fallback audio beep
      try {
        console.log('Attempting fallback beep sound...');
        createBeepSound();
      } catch (beepError) {
        console.error('Fallback beep also failed:', beepError);
        alert('No se pudo reproducir el audio del motor. Tu navegador podría no ser compatible con el formato de audio.');
      }
    }
  };

  // Fallback function to create an engine sound using Web Audio API
  const createBeepSound = () => {
    const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    
    // Create multiple oscillators for a more realistic engine sound
    const oscillators: OscillatorNode[] = [];
    const gainNodes: GainNode[] = [];
    
    // Main engine rumble (low frequency)
    const rumble = audioContext.createOscillator();
    const rumbleGain = audioContext.createGain();
    rumble.type = 'sawtooth';
    rumble.frequency.value = 60;
    rumbleGain.gain.value = 0.4;
    rumble.connect(rumbleGain);
    rumbleGain.connect(audioContext.destination);
    oscillators.push(rumble);
    gainNodes.push(rumbleGain);
    
    // Mid-range engine noise
    const mid = audioContext.createOscillator();
    const midGain = audioContext.createGain();
    mid.type = 'square';
    mid.frequency.value = 150;
    midGain.gain.value = 0.2;
    mid.connect(midGain);
    midGain.connect(audioContext.destination);
    oscillators.push(mid);
    gainNodes.push(midGain);
    
    // High-frequency engine whine
    const high = audioContext.createOscillator();
    const highGain = audioContext.createGain();
    high.type = 'triangle';
    high.frequency.value = 400;
    highGain.gain.value = 0.15;
    high.connect(highGain);
    highGain.connect(audioContext.destination);
    oscillators.push(high);
    gainNodes.push(highGain);
    
    // Add some modulation for realism
    const lfo = audioContext.createOscillator();
    const lfoGain = audioContext.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 5; // 5Hz modulation
    lfoGain.gain.value = 10;
    lfo.connect(lfoGain);
    lfoGain.connect(rumble.frequency);
    
    // Start all oscillators
    const startTime = audioContext.currentTime;
    const duration = 3; // 3 seconds
    
    oscillators.forEach(osc => osc.start(startTime));
    lfo.start(startTime);
    
    // Create envelope (fade in, sustain, fade out)
    gainNodes.forEach(gain => {
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(gain.gain.value, startTime + 0.2);
      gain.gain.linearRampToValueAtTime(gain.gain.value, startTime + duration - 0.5);
      gain.gain.exponentialRampToValueAtTime(0.01, startTime + duration);
    });
    
    // Stop all oscillators
    oscillators.forEach(osc => osc.stop(startTime + duration));
    lfo.stop(startTime + duration);
    
    setIsPlaying(true);
    setTimeout(() => {
      setIsPlaying(false);
      audioContext.close();
    }, duration * 1000);
  };

  const stopSound = () => {
    console.log('stopSound called', { isLoading, isPlaying }); // Debug log
    
    // Stop current audio if it exists
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setCurrentAudio(null);
    }
    
    // Reset all states immediately
    setIsPlaying(false);
    setIsLoading(false);
    
    console.log('stopSound completed'); // Debug log
    // The AnimatePresence will handle the re-appearance of the main button
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900/20">
      <ClientNavbar />
      
      {/* Hero Section with Horizontal Car Cards */}
      <section className="relative pt-8 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Title */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6">
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                NUEVOS
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 bg-clip-text text-transparent">
                LANZAMIENTOS
              </span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Descubre la leyenda restaurada: el icónico Chevrolet Corvette Stingray 1974
            </p>
          </motion.div>

          {/* Horizontal Car Card */}
          <motion.div
            className="bg-gradient-to-r from-gray-900/90 to-black/95 rounded-3xl overflow-hidden border border-orange-500/30 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
              <div className="flex flex-col lg:flex-row">
                {/* Car Image Section */}
                <div className="lg:w-1/2 h-80 lg:h-96 bg-gradient-to-br from-gray-800 to-gray-900 relative overflow-hidden">
                  {currentCar.imagePath ? (
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={currentCar.imagePath}
                      alt={currentCar.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <motion.div
                          className="text-8xl mb-4"
                          animate={{ 
                            scale: [1, 1.1, 1],
                            rotateY: [0, 360]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          🏎️
                        </motion.div>
                        <p className="text-lg font-medium">Imagen próximamente</p>
                        <p className="text-sm text-orange-400">Espacio reservado</p>
                      </div>
                    </div>
                  )}
                  
                  {/* Price Badge */}
                  <div className="absolute top-4 right-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-bold shadow-lg">
                    {currentCar.price}
                  </div>
                </div>

                {/* Specifications Section */}
                <div className="lg:w-1/2 p-8 lg:p-12">
                  <div className="h-full flex flex-col justify-between">
                    <div>
                      <motion.h2
                        className="text-3xl lg:text-4xl font-bold text-white mb-2"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        {currentCar.name}
                      </motion.h2>
                      <p className="text-orange-400 text-lg font-medium mb-4">
                        {currentCar.brand} • {currentCar.year}
                      </p>
                      <p className="text-gray-300 mb-8 leading-relaxed">
                        {currentCar.description}
                      </p>

                      {/* Specs Grid */}
                      <div className="grid grid-cols-2 gap-6 mb-8">
                        {Object.entries(currentCar.specs).map(([key, value], index) => (
                          <motion.div
                            key={key}
                            className="text-center p-4 bg-gray-800/50 rounded-xl border border-gray-700"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                          >
                            <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="text-white font-bold text-sm">{value}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:from-orange-400 hover:to-red-400 hover:shadow-lg hover:shadow-orange-500/25"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Solicitar Información
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>

          {/* Sound Panel - Professional Design */}
          <motion.div
            className="mt-16 mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <motion.div
              className="relative max-w-2xl mx-auto bg-gradient-to-br from-slate-900/95 via-gray-900/95 to-slate-800/95 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-gray-700/50 shadow-2xl overflow-hidden"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.3 }}
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-red-500/5 to-yellow-500/5" />
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 20% 20%, rgba(251, 146, 60, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)`,
              }} />
              
              {/* Header */}
              <div className="relative text-center mb-8">
                <div className="inline-block p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-2xl border border-orange-500/30 mb-4">
                  <div className="w-16 h-16 flex items-center justify-center">
                    {/* Audio Wave Icon */}
                    <svg className="w-12 h-12 text-orange-400" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                    </svg>
                  </div>
                </div>
                
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  <span className="bg-gradient-to-r from-orange-400 via-red-400 to-yellow-400 bg-clip-text text-transparent">
                    Experiencia Sonora Auténtica
                  </span>
                </h3>
                <p className="text-gray-300 text-lg leading-relaxed max-w-lg mx-auto">
                  Sumérgete en el rugido legendario del motor V8 Big Block 454 del Corvette Stingray &apos;74
                </p>
              </div>

              {/* Main Button - Only shows when not loading/playing */}
              <AnimatePresence>
                {!isLoading && !isPlaying && (
                  <motion.div
                    className="flex justify-center"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.button
                      className="group relative bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 bg-size-200 bg-pos-0 hover:bg-pos-100 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-2xl border border-orange-500/50 transition-all duration-500 hover:shadow-orange-500/40"
                      onClick={() => {
                        playSound();
                      }}
                      style={{
                        backgroundSize: '200% 100%',
                        backgroundPosition: '0% 0'
                      }}
                    >
                      {/* Button Background Glow */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-orange-500 via-red-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
                      />
                      
                      {/* Button Content */}
                      <div className="relative flex items-center space-x-4">
                        {/* Icon */}
                        <motion.div
                          className="flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl backdrop-blur-sm"
                        >
                          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                          </svg>
                        </motion.div>

                        {/* Text Content */}
                        <div className="text-left">
                          <div className="text-xl font-bold">Encender Motor</div>
                          <div className="text-sm text-orange-100 font-medium">Corvette Stingray &apos;74</div>
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Audio Status Panel - Slides down when active */}
              <AnimatePresence>
                {(isLoading || isPlaying) && (
                  <motion.div
                    className="mt-8 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-gray-600/50"
                    initial={{ opacity: 0, height: 0, y: -20 }}
                    animate={{ opacity: 1, height: 'auto', y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  >
                    {/* Status Header */}
                    <div className="text-center mb-6">
                      <div
                        className={`inline-block p-3 rounded-xl mb-3 ${
                          isLoading ? 'bg-blue-500/20 border border-blue-400/30' :
                          'bg-green-500/20 border border-green-400/30'
                        }`}
                      >
                        {isLoading ? (
                          <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        ) : (
                          <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
                          </svg>
                        )}
                      </div>
                      
                      <h4 className="text-xl font-bold text-white mb-2">
                        {isLoading ? 'Inicializando Sistema V8' : 'Motor en Funcionamiento'}
                      </h4>
                      <p className="text-gray-300">
                        {isLoading ? 'Preparando sistema de audio...' : 'V8 Big Block 454 activo'}
                      </p>
                    </div>

                    {/* Audio Visualizer */}
                    <motion.div
                      className="flex justify-center items-end space-x-2 mb-6 h-16" // Fixed height container
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      {[...Array(8)].map((_, i) => (
                        <motion.div
                          key={i}
                          className={`w-1.5 rounded-full ${
                            isPlaying ? 'bg-gradient-to-t from-orange-500 to-red-400' :
                            'bg-gradient-to-t from-blue-500 to-indigo-400'
                          }`}
                          style={{ 
                            height: '50px', // Base height
                            transformOrigin: 'bottom' // Scale from bottom
                          }}
                          animate={{
                            scaleY: isPlaying 
                              ? [0.4, 0.8, 0.6, 0.9, 0.5, 0.7, 0.4, 1.0]
                              : [0.3, 0.5, 0.3, 0.6, 0.3],
                            opacity: [0.6, 1, 0.8, 1, 0.7]
                          }}
                          transition={{
                            duration: isPlaying ? 0.6 : 1,
                            repeat: Infinity,
                            delay: i * 0.1,
                            ease: "easeInOut"
                          }}
                        />
                      ))}
                    </motion.div>

                    {/* System Status */}
                    <div className="flex items-center justify-center">
                      <div
                        className={`w-3 h-3 rounded-full mr-3 ${
                          isPlaying ? 'bg-green-400' : 'bg-blue-400'
                        }`}
                      />
                      <span className="text-gray-300 font-medium">
                        {isLoading ? 'Cargando componentes del motor...' : 'Sistema de audio completamente activo'}
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Stop Motor Button - Shows when loading or playing */}
              <AnimatePresence>
                {(isLoading || isPlaying) && (
                  <motion.div
                    className="flex justify-center mt-6 relative z-50"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                  >
                    <motion.button
                      className={`relative bg-gradient-to-r from-red-600 to-red-700 text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl border border-red-500/50 hover:shadow-red-500/30 transition-all duration-300 cursor-pointer ${
                        isLoading ? 'opacity-90' : ''
                      }`}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        console.log('Stop button clicked'); // Debug log
                        stopSound();
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{ pointerEvents: 'all', zIndex: 1000 }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-white/10 rounded-xl">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 6h12v12H6z"/>
                          </svg>
                        </div>
                        <div className="text-left">
                          <div className="font-bold">
                            {isLoading ? 'Cancelar' : 'Apagar Motor'}
                          </div>
                          <div className="text-sm text-red-100">
                            {isLoading ? 'Detener carga' : 'Detener V8 Big Block'}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section - Full Screen Sections */}
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
          Características <span className="text-orange-500">Premium</span>
        </h2>
        <p className="text-gray-300 text-xl max-w-3xl mx-auto">
          Cada detalle pensado para ofrecer la experiencia de conducción más exclusiva
        </p>
      </motion.div>

      {/* Full Screen Feature Sections */}
      {features.map((feature, index) => (
        <section 
          key={feature.id} 
          className={`relative min-h-screen flex items-center overflow-hidden ${
            index % 2 === 0 
              ? 'bg-gradient-to-br from-black via-gray-900 to-blue-900/20' 
              : 'bg-gradient-to-bl from-gray-900 via-black to-purple-900/20'
          }`}
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className={`absolute inset-0 ${
              index % 2 === 0 
                ? 'bg-gradient-to-r from-orange-500/10 via-red-500/10 to-yellow-500/10' 
                : 'bg-gradient-to-l from-purple-500/10 via-indigo-500/10 to-blue-500/10'
            }`} />
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at ${feature.side === 'left' ? '25%' : '75%'} 50%, rgba(255,255,255,0.03) 1px, transparent 1px)`,
              backgroundSize: '60px 60px'
            }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <motion.div
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                feature.side === 'right' ? 'lg:flex-row-reverse' : ''
              }`}
              initial={{ opacity: 0, x: feature.side === 'left' ? -150 : 150 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {/* Feature Image - Larger */}
              <motion.div 
                className="lg:w-1/2 w-full"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.div
                  className="aspect-[4/3] bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl overflow-hidden border border-orange-500/20 shadow-2xl backdrop-blur-sm"
                  whileHover={{ scale: 1.03, rotate: feature.side === 'left' ? 1 : -1 }}
                  transition={{ duration: 0.3 }}
                >
                  {feature.imagePath ? (
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={feature.imagePath}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <div className="text-center">
                        <motion.div
                          className="text-8xl lg:text-9xl mb-6"
                          animate={{ 
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                            y: [0, -10, 0]
                          }}
                          transition={{ 
                            duration: 3, 
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                        >
                          {feature.id === 1 ? '🛞' : 
                           feature.id === 2 ? '⚙️' : 
                           feature.id === 3 ? '🎨' : 
                           feature.id === 4 ? '💻' :
                           feature.id === 5 ? '🪑' :
                           feature.id === 6 ? '⚡' :
                           feature.id === 7 ? '🛡️' : '📱'}
                        </motion.div>
                        <p className="text-xl font-medium text-gray-300">Imagen próximamente</p>
                        <p className="text-lg text-orange-400">{feature.title}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
                
                {/* Decorative elements */}
                <motion.div
                  className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-3xl blur-3xl -z-10"
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    scale: [0.95, 1.05, 0.95]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>

              {/* Feature Content - Enhanced */}
              <motion.div 
                className="lg:w-1/2 text-center lg:text-left"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-6 border border-orange-500/30">
                    Premium Feature #{feature.id}
                  </span>
                </motion.div>

                <motion.h3
                  className="text-5xl lg:text-6xl font-black text-white mb-6"
                  initial={{ opacity: 0, x: feature.side === 'left' ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                    {feature.title}
                  </span>
                </motion.h3>

                <motion.p
                  className="text-gray-300 text-xl lg:text-2xl mb-8 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  {feature.description}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button
                    className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:shadow-orange-500/25 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Ver Más Detalles
                  </motion.button>
                  <motion.button
                    className="bg-transparent text-white px-8 py-4 rounded-xl font-bold text-lg border-2 border-gray-600 hover:border-orange-500 hover:bg-orange-500/10 transition-all"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Personalizar
                  </motion.button>
                </motion.div>

                {/* Additional visual elements */}
                <motion.div
                  className="mt-12 flex gap-6 justify-center lg:justify-start"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                >
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-16 h-16 bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl border border-gray-700 flex items-center justify-center"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                    >
                      <span className="text-2xl">
                        {i === 0 ? '✨' : i === 1 ? '🏆' : '⭐'}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, 30, 0],
              y: [0, -30, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-full blur-3xl"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
              scale: [1, 1.3, 1]
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </section>
      ))}

    </div>
  );
}