'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Navlinks from './Navlinks';
import s from './Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { User } from '../../../../../shared/types/user.interface'; 

interface NavbarProps {
  user?: User | null;
  onLogout?: () => Promise<void>;
}

export default function Navbar({ user, onLogout }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cerrar el menú cuando cambia la ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Si se proporciona una función de logout externa, la usamos
  const handleLogout = async () => {
    if (onLogout) {
      try {
        await onLogout();
      } catch (err) {
        console.error('Error al cerrar sesión:', err);
      }
    }
  };

  return (
    <nav className={s.nav}>
      <div className={s.container}>
        {/* Logo siempre visible */}
        <div className="flex items-center gap-4">
          <Image src="/images/logo.svg" alt="FitFlow Logo" width={120} height={30} className="h-8 w-auto" />
          <p className={s.fitFlow}>FitFlow</p>
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
        <div className="md:hidden z-50">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-zinc-800 rounded focus:outline-none"
            aria-label="Abrir menú móvil"
          >
            <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" />
          </button>
        </div>
      </div>

      {/* Menú móvil desplegable */}
      {isOpen && (
        <div className={`${s.mobileMenu} ${s.mobileMenuOpen} md:hidden`}>
          <Navlinks 
            user={user} 
            pathname={pathname} 
            onLogout={handleLogout} 
            isMobile={true} 
          />
        </div>
      )}
    </nav>
  );
}
