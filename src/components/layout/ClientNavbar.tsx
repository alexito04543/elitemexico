'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLink {
  href: string;
  label: string;
  icon: string;
}

const navigationLinks: NavLink[] = [
  { href: '/', label: 'Modelos', icon: '' },
  { href: '/nuevos-lanzamientos', label: 'Nuevos Lanzamientos', icon: '' },
  { href: '/servicio-post-venta', label: 'Servicio Post Venta', icon: '' },
  { href: '/refacciones', label: 'Refacciones', icon: '' }
];

export default function ClientNavbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActivePath = (href: string) => {
    if (href === '/') return pathname === '/' || pathname.startsWith('/car/');
    return pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black/95 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-xl font-bold text-white">E</span>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-500 to-orange-500 bg-clip-text text-transparent">
                  Elite Sports Cars
                </h1>
                <p className="text-xs text-gray-400 hidden lg:block">Experiencia 3D Premium</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {navigationLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActivePath(link.href)
                      ? 'text-white bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <span>{link.label}</span>
                  
                  {isActivePath(link.href) && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-500 to-orange-500" />
                  )}
                </Link>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-all">
                Contacto
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-lg transition-all">
                Cotizar
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors flex items-center justify-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <div className="w-6 h-5 relative">
                <span className={`absolute block h-0.5 w-6 bg-white transform transition-all ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`} style={{ top: '6px' }} />
                <span className={`absolute block h-0.5 w-6 bg-white transition-all ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`} style={{ top: '12px' }} />
                <span className={`absolute block h-0.5 w-6 bg-white transform transition-all ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`} style={{ top: '18px' }} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/80" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-80 max-w-sm bg-gray-900 shadow-2xl">
            <div className="p-6 pt-20">
              <div className="space-y-2">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`block px-4 py-4 rounded-xl transition-all ${
                      isActivePath(link.href)
                        ? 'bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 text-white'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span className="font-medium">{link.label}</span>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 space-y-3">
                <button className="w-full px-4 py-3 text-sm font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-gray-400 rounded-lg transition-all">
                  📞 Contacto
                </button>
                <button className="w-full px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 rounded-lg transition-all">
                  💰 Cotizar Ahora
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="h-16 lg:h-20" />
    </>
  );
}