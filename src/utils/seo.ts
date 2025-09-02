import { Metadata } from 'next';
import { Car } from '@/types/car';

export function generateCarMetadata(car: Car): Metadata {
  const title = `${car.brand} ${car.model} ${car.year} - Configurador 3D | Elite Sports Cars`;
  const description = `Explora el ${car.brand} ${car.model} ${car.year} con ${car.specs.horsepower} HP. Visualización 3D interactiva, personalización de colores y especificaciones técnicas completas. Precio desde $${car.price.toLocaleString()}.`;

  return {
    title,
    description,
    keywords: `${car.brand}, ${car.model}, ${car.year}, ${car.specs.engine}, ${car.specs.horsepower} HP, autos deportivos, superdeportivos, configurador 3D`,
    openGraph: {
      title,
      description,
      images: [
        {
          url: `/cars/${car.id}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: `${car.brand} ${car.model} ${car.year}`,
        },
      ],
    },
    twitter: {
      title,
      description,
      images: [`/cars/${car.id}/twitter-image.jpg`],
    },
  };
}

export function generateCarJsonLd(car: Car) {
  return {
    "@context": "https://schema.org",
    "@type": "Car",
    "name": `${car.brand} ${car.model}`,
    "brand": {
      "@type": "Brand",
      "name": car.brand
    },
    "model": car.model,
    "vehicleModelDate": car.year.toString(),
    "vehicleEngine": {
      "@type": "EngineSpecification",
      "name": car.specs.engine,
      "enginePower": {
        "@type": "QuantitativeValue",
        "value": car.specs.horsepower,
        "unitCode": "BHP"
      }
    },
    "vehicleTransmission": car.specs.transmission,
    "speed": {
      "@type": "QuantitativeValue",
      "value": car.specs.topSpeed,
      "unitCode": "KMH"
    },
    "accelerationTime": {
      "@type": "QuantitativeValue",
      "value": car.specs.acceleration,
      "unitText": "0-100 km/h"
    },
    "offers": {
      "@type": "Offer",
      "priceCurrency": "USD",
      "price": car.price,
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "AutoDealer",
        "name": "Elite Sports Cars"
      }
    },
    "color": car.colors.map(color => color.name),
    "image": car.images,
    "description": `${car.brand} ${car.model} ${car.year} con motor ${car.specs.engine} de ${car.specs.horsepower} HP. Acelera de 0-100 km/h en ${car.specs.acceleration} con velocidad máxima de ${car.specs.topSpeed} km/h.`
  };
}