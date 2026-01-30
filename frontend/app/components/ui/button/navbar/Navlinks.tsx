'use client';

import Link from 'next/link';
import { useState } from 'react';
import LogoutConfirmModal from './LogoutConfirmModal';
import { User } from '@/types/user-interface';

interface NavlinksProps {
    user?: User | null;
    pathname: string;
    onLogout: () => Promise<void>;
    isMobile: boolean;
    onNavigate?: () => void;
}

/**
 * Componente Navlinks que muestra enlaces de navegación basados en el estado de autenticación del usuario.
 * @param param0
 * @returns
 */
export default function Navlinks({ user, pathname, onLogout, isMobile, onNavigate }: NavlinksProps) {
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const navLinksClass = isMobile
        ? "flex flex-col py-4 px-6"
        : "flex items-center gap-6";

    const navLinkClass = isMobile
        ? "py-3 px-4 rounded-md font-medium transition-colors duration-200 no-underline w-full text-center"
        : "py-2 px-3 font-medium transition-all duration-200 relative no-underline group";

    const NavLink = (href: string, label: string) => {
        const isActive = pathname === href;

        return (
            <Link
                href={href}
                className={`${navLinkClass} ${
                    isMobile 
                        ? (isActive ? 'text-[#ff5757] bg-red-50' : 'text-zinc-700 hover:bg-gray-50')
                        : (isActive ? 'text-[#ff5757]' : 'text-zinc-700 hover:text-[#ff5757]')
                }`}
                onClick={onNavigate}
            >
                {label}
                
                {!isMobile && (
                    <>
                        {isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5757]" />
                        )}
                        
                        {!isActive && (
                            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5757] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                        )}
                    </>
                )}
            </Link>
        );
    };

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setShowLogoutModal(true);
    };

    const handleConfirmLogout = async () => {
        setShowLogoutModal(false);
        if (onNavigate) {
            onNavigate();
        }
        try {
            await onLogout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleCancelLogout = () => {
        setShowLogoutModal(false);
    };

    return (
        <>
            <div className={navLinksClass}>
                {user ? (
                    // Enlaces para usuarios autenticados
                    <>
                        {NavLink('/dashboard', 'Dashboard')}
                        {NavLink('/exercises', 'Exercises')}
                        {NavLink('/chat', 'Chat')}

                        <button
                            onClick={handleLogoutClick}
                            className={`${navLinkClass} ${
                                isMobile 
                                    ? 'text-zinc-700 hover:bg-gray-50' 
                                    : 'text-zinc-700 hover:text-[#ff5757]'
                            }`}
                        >
                            Log Out
                            
                            {!isMobile && (
                                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ff5757] scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left" />
                            )}
                        </button>
                    </>
                ) : (
                    // Enlaces para usuarios no autenticados
                    <>
                        {NavLink('/', 'Home')}
                        {NavLink('/signin', 'Sign In')}
                        {NavLink('/signup', 'Sign Up')}
                    </>
                )}
            </div>

            <LogoutConfirmModal
                isOpen={showLogoutModal}
                onCancel={handleCancelLogout}
                onConfirm={handleConfirmLogout}
            />
        </>
    );
}