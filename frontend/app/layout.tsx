import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './styles/globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
 title: 'FitFlow - Tu Compañero de Fitness',
 description: 'Obtén consejos personalizados de ejercicios y sigue tu progreso con la ayuda de IA',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
 return (
  <html lang="es">
   <body className="min-h-screen flex flex-col">
    <main className="flex-grow">{children}</main>
   </body>
  </html>
 );
}
