
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Middleware: El "portero de la discoteca" 🚪
 * Verifica si el usuario tiene el "token" (entrada) antes de acceder a rutas protegidas
 */
export function middleware(request: NextRequest) {

  const token = request.cookies.get('token');

  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/exercises', '/chat', '/profile'];
  

  const authRoutes = ['/signin', '/signup'];


  if (protectedRoutes.some(route => pathname.startsWith(route)) && !token) {

    return NextResponse.redirect(new URL('/signin', request.url));
  }


  if (authRoutes.some(route => pathname.startsWith(route)) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configurar en qué rutas se ejecuta el middleware
export const config = {
  matcher: [
    // Rutas protegidas
    '/dashboard/:path*',
    '/exercises/:path*',
    '/chat/:path*',
    '/profile/:path*',
    // Rutas de autenticación
    '/signin',
    '/signup',
  ],
};