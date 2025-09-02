import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import dynamic from "next/dynamic";

const ClientNavbar = dynamic(() => import("@/components/layout/ClientNavbar"), {
  ssr: false
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Elite Sports Cars - Configurador 3D Interactivo | Autos Deportivos de Lujo",
  description: "Descubre nuestra exclusiva colección de autos deportivos con visualización 3D interactiva. Personaliza colores, explora especificaciones técnicas de Ferrari, Lamborghini, McLaren y más. Experiencia inmersiva para amantes de superdeportivos.",
  keywords: "autos deportivos, Ferrari, Lamborghini, McLaren, configurador 3D, superdeportivos, autos de lujo, visualizador interactivo, carros deportivos",
  authors: [{ name: "Elite Sports Cars" }],
  creator: "Elite Sports Cars",
  publisher: "Elite Sports Cars",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://elite-sports-cars.com'),
  alternates: {
    canonical: '/',
    languages: {
      'es-ES': '/es',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: "Elite Sports Cars - Configurador 3D Interactivo",
    description: "Explora nuestra colección exclusiva de superdeportivos con tecnología 3D avanzada. Ferrari, Lamborghini, McLaren y más.",
    url: 'https://elite-sports-cars.com',
    siteName: 'Elite Sports Cars',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elite Sports Cars - Configurador 3D',
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Elite Sports Cars - Configurador 3D",
    description: "Descubre superdeportivos con visualización 3D interactiva",
    images: ['/twitter-image.jpg'],
    creator: '@elitesportscars',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <meta name="theme-color" content="#ef4444" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "AutoDealer",
              "name": "Elite Sports Cars",
              "description": "Concesionaria exclusiva de autos deportivos de lujo con configurador 3D interactivo",
              "url": "https://elite-sports-cars.com",
              "logo": "https://elite-sports-cars.com/logo.png",
              "sameAs": [
                "https://facebook.com/elitesportscars",
                "https://instagram.com/elitesportscars",
                "https://twitter.com/elitesportscars"
              ],
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Principal 123",
                "addressLocality": "Ciudad",
                "addressRegion": "Estado",
                "postalCode": "12345",
                "addressCountry": "MX"
              },
              "telephone": "+52-555-123-4567",
              "priceRange": "$200,000 - $500,000",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Autos Deportivos de Lujo",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Car",
                      "name": "Ferrari 488 GTB",
                      "brand": "Ferrari",
                      "model": "488 GTB",
                      "vehicleEngine": "V8 Biturbo 3.9L",
                      "fuelType": "Gasoline"
                    }
                  }
                ]
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ClientNavbar />
        {children}
      </body>
    </html>
  );
}
