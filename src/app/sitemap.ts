import { MetadataRoute } from 'next';
import { sportsCarData } from '@/data/cars';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://elite-sports-cars.com';
  
  const carPages = sportsCarData.map((car) => ({
    url: `${baseUrl}/car/${car.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/catalog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...carPages,
  ];
}