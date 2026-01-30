// components/providers/ToastProvider.tsx
'use client';

import { Toaster } from 'react-hot-toast';

export function ToastProvider() {
  return (
    <Toaster
      position="top-center"
      reverseOrder={false}
      gutter={8}
      toastOptions={{
        // Opciones por defecto
        duration: 4000,
        style: {
          background: '#fff',
          color: '#363636',
          fontSize: '14px',
          fontWeight: '500',
          borderRadius: '10px',
          padding: '16px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          maxWidth: '500px',
        },
        
        // Toast de éxito
        success: {
          duration: 5000,
          style: {
            background: '#10b981',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#10b981',
          },
        },
        
        // Toast de error
        error: {
          duration: 5000,
          style: {
            background: '#ef4444',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#ef4444',
          },
        },
        
        // Toast de loading
        loading: {
          style: {
            background: '#3b82f6',
            color: '#fff',
          },
          iconTheme: {
            primary: '#fff',
            secondary: '#3b82f6',
          },
        },
      }}
    />
  );
}