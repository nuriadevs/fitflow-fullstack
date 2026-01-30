'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Navlinks from './Navlinks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { User } from '@/types/user-interface';
import { logoutUser } from '@/lib/auth/api';

interface NavbarProps {
  user?: User | null;
}
/**
 * Componente Navbar que muestra la barra de navegación.
 * @param param0
 * @returns
 */
export default function Navbar({ user }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      await logoutUser();
      closeMenu();
      window.location.href = '/';
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return (
    <nav 
      aria-label="Global" 
      className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm"
    >
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center lg:flex-1">
          <Link href={user ? '/dashboard' : '/'} className="flex items-center gap-2 -m-1.5 p-1.5">
            <Image
              src="/images/logo.svg"
              width={150}
              height={180}
              alt="FitFlow logo"
              className="h-8 w-auto"
            />
            <span className="font-bold text-2xl text-gray-900">FitFlow</span>
          </Link>
        </div>

        {/* Enlaces escritorio */}
        <div className="hidden md:block">
          <Navlinks
            user={user}
            pathname={pathname}
            onLogout={handleLogout}
            isMobile={false}
          />
        </div>

        {/* Botón menú móvil */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-800 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-[#ff5757] transition-colors"
            aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isOpen}
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <Navlinks
            user={user}
            pathname={pathname}
            onLogout={handleLogout}
            isMobile={true}
            onNavigate={closeMenu}
          />
        </div>
      )}
    </nav>
  );
}