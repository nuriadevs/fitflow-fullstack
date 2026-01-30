
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupData {
  username: string;
  email: string;
  password: string;
}

/**
 * Login de usuario
 */
export async function loginUser(credentials: LoginCredentials) {
  const response = await fetch('/api/auth/login', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', 
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al iniciar sesión');
  }

  return response.json();
}

/**
 * Registro de usuario
 */
export async function signupUser(data: SignupData) {
  const response = await fetch('/api/auth/register', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Error al registrarse');
  }

  return response.json();
}

/**
 * Logout de usuario
 */
export async function logoutUser() {
  const response = await fetch('/api/auth/logout', { 
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Error al cerrar sesión');
  }

  return response.json();
}