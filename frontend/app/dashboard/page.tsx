'use client';

import Navbar from '../components/ui/Navbar/Navbar';
import DashboardGreeting from '../components/Dashboard/DashboardGreeting';
import DashboardActions from '../components/Dashboard/DashboardActions';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';

export default function DashboardPage() {
 const { user, isLoading, logout } = useAuth();

 if (isLoading) return <LoadingSpinner />;

 // Si no hay usuario (es decir, no está autenticado), redirigir o mostrar un mensaje
 if (!user) {
  return (
   <div className="min-h-screen flex items-center justify-center">
    <p>No estás autenticado. Por favor, inicia sesión para acceder al dashboard.</p>
   </div>
  );
 }

 return (
  <div className="min-h-screen bg-gray-100">
   <Navbar user={user} onLogout={logout} />
   <main>
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
     <DashboardGreeting username={user.username} />
     <DashboardActions />
    </div>
   </main>
  </div>
 );
}
