import { Car } from '@/types/car';

export const sportsCarData: Car[] = [
  {
    id: 'ferrari-488',
    brand: 'Ferrari',
    model: '488 GTB',
    year: 2024,
    price: 280000,
    colors: [
      { name: 'Rosso Corsa', hex: '#D40000', metallic: false },
      { name: 'Nero Daytona', hex: '#1C1C1C', metallic: true },
      { name: 'Bianco Avus', hex: '#F8F8FF', metallic: true },
      { name: 'Giallo Modena', hex: '#FFD700', metallic: false },
    ],
    specs: {
      engine: 'V8 Biturbo 3.9L',
      horsepower: 661,
      acceleration: '3.0s',
      topSpeed: 330,
      transmission: '7-Speed Dual Clutch'
    },
    images: ['/cars/ferrari-488/main.jpg'],
    modelPath: '/models/2016_ferrari_488_gtb.glb',
    carType: 'supercar' as const
  },
  {
    id: 'lamborghini-huracan',
    brand: 'Lamborghini',
    model: 'Huracán EVO',
    year: 2024,
    price: 248000,
    colors: [
      { name: 'Verde Mantis', hex: '#4CBB17', metallic: true },
      { name: 'Arancio Borealis', hex: '#FF8C00', metallic: false },
      { name: 'Nero Nemesis', hex: '#0A0A0A', metallic: true },
      { name: 'Bianco Icarus', hex: '#FFFFFF', metallic: true },
    ],
    specs: {
      engine: 'V10 Naturally Aspirated 5.2L',
      horsepower: 631,
      acceleration: '2.9s',
      topSpeed: 325,
      transmission: '7-Speed Dual Clutch'
    },
    images: ['/cars/lamborghini-huracan/main.jpg'],
    modelPath: '/models/lamborghini_huracan_evo.glb',
    carType: 'supercar' as const
  },
  {
    id: 'mclaren-720s',
    brand: 'McLaren',
    model: '720S',
    year: 2024,
    price: 299000,
    colors: [
      { name: 'McLaren Orange', hex: '#FF8700', metallic: false },
      { name: 'Storm Grey', hex: '#4A4A4A', metallic: true },
      { name: 'Volcano Red', hex: '#C21807', metallic: true },
      { name: 'Silica White', hex: '#F5F5F5', metallic: true },
    ],
    specs: {
      engine: 'V8 Biturbo 4.0L',
      horsepower: 710,
      acceleration: '2.8s',
      topSpeed: 341,
      transmission: '7-Speed Seamless Shift'
    },
    images: ['/cars/mclaren-720s/main.jpg'],
    modelPath: '/models/mclaren_720s.glb',
    carType: 'supercar' as const
  }
];