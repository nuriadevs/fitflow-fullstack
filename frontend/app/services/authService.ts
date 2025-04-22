export const checkAuthApi = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/me`, {
    credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('No autorizado');
    }
  
    return response.json();
  };
  
  export const logoutApi = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
  
    if (!response.ok) {
      throw new Error('Error al cerrar sesión');
    }
  
    return response.json();
  };
  