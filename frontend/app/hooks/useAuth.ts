// hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '../../../shared/types/user.interface';
import { checkAuthApi, logoutApi } from '../services/authService';  // Importamos funciones modulares

export const useAuth = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Esta función se ejecutará al montarse el hook
    const checkAuth = async () => {
      try {
        const data = await checkAuthApi();  // Llamada a la API para verificar la sesión del usuario
        if (data.success && data.user) {
          setUser(data.user);  // Si el usuario está autenticado, se guarda el usuario
        } else {
          setUser(null);  // Si no está autenticado, dejamos el usuario como null
        }
      } catch (error) {
        console.error('Error de autenticación:', error);
        setUser(null);  // Si hay un error, no hay un usuario autenticado
      } finally {
        setIsLoading(false);  // Una vez que la verificación de autenticación termine, se actualiza el estado
      }
    };

    checkAuth();  // Ejecutamos la verificación de autenticación al montar el hook
  }, [router]);

  const logout = async () => {
    try {
      await logoutApi();  // Llamamos a la API para cerrar la sesión
      setUser(null);  // Eliminamos el usuario del estado
      router.push('/');  // Redirigimos a la página de inicio
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  return { user, isLoading, logout };
};
