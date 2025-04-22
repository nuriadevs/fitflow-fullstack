'use client';

import Link from 'next/link';
import { useState } from 'react';
import s from './Navbar.module.css';
import LogoutConfirmModal from './LogoutConfirmModal';

interface NavlinksProps {
 user?: any;
 pathname: string;
 onLogout: () => Promise<void>;
 isMobile: boolean;
}

export default function Navlinks({ user, pathname, onLogout, isMobile }: NavlinksProps) {
 const [showLogoutModal, setShowLogoutModal] = useState(false);
 const navLinksClass = isMobile ? s.mobileNavLinks : s.navLinks;
 const navLinkClass = isMobile ? s.mobileNavLink : s.navLink;

 const NavLink = (href: string, label: string) => (
  <Link
   href={href}
   className={`${navLinkClass} ${pathname === href ? s.navLinkActive : s.navLinkInactive}`}
  >
   {label}
  </Link>
 );

 const handleLogoutClick = (e: React.MouseEvent) => {
  e.preventDefault();
  setShowLogoutModal(true);
 };

 const handleConfirmLogout = async () => {
  setShowLogoutModal(false);
  try {
   await onLogout();
  } catch (error) {
   console.error('Error al cerrar sesión:', error);
  }
 };

 return (
  <>
   <div className={navLinksClass}>
    {user ? (
     // Enlaces para usuarios autenticados
     <>
      {NavLink('/dashboard', 'Dashboard')}
      {NavLink('/exercises', 'Workouts')}
      {NavLink('/chat', 'Chat')}
      {NavLink('/profile', 'Profile')}

      <button onClick={handleLogoutClick} className={`${navLinkClass} ${s.navLinkInactive}`}>
      Log Out
      </button>
     </>
    ) : (
     // Enlaces para usuarios no autenticados
     <>
      {NavLink('/', 'Home')}
      {NavLink('/auth/signin', 'Log In')}
      {NavLink('/auth/signup', 'Sign Up')}
     </>
    )}
   </div>

   {/* Modal de logout */}
   <LogoutConfirmModal
    isOpen={showLogoutModal}
    onCancel={() => setShowLogoutModal(false)}
    onConfirm={handleConfirmLogout}
   />
  </>
 );
}
