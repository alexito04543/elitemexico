import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Elite Sports Cars - Configurador 3D Interactivo',
    short_name: 'Elite Cars 3D',
    description: 'Explora superdeportivos con visualización 3D interactiva y personalización avanzada',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#ef4444',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
    categories: ['automotive', 'lifestyle', 'shopping'],
    lang: 'es',
    dir: 'ltr',
  };
}