
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/auth/api';
import { User } from '@/types/user-interface';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();


  const fetchUser = async () => {
    setIsLoading(true);
    try {

      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (!response.ok) {
        setUser(null);
        return;
      }

      const data = await response.json();
      setUser(data.user || data);
    } catch (error) {
      console.error('❌ [useAuth] Error fetching user:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };


  const logout = async () => {
    try {
      await logoutUser();
      setUser(null);
      router.push('/signin');
    } catch (error) {
      console.error('❌ [useAuth] Error logout:', error);
    }
  };


  useEffect(() => {
    fetchUser();
  }, []);

  return {
    user,
    isLoading,
    logout,
    refetch: fetchUser,
  };
};
