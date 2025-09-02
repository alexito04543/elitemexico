export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  colors: CarColor[];
  specs: CarSpecs;
  images: string[];
  modelPath: string; // Path to 3D model
  carType: 'supercar' | 'sports' | 'luxury';
}

export interface CarColor {
  name: string;
  hex: string;
  metallic?: boolean;
}

export interface CarSpecs {
  engine: string;
  horsepower: number;
  acceleration: string; // 0-100 km/h
  topSpeed: number;
  transmission: string;
}

export interface ViewerConfig {
  enableOrbitControls: boolean;
  enableZoom: boolean;
  autoRotate: boolean;
  backgroundColor: string;
}