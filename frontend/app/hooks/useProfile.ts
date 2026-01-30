
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Exercise } from "@/types/exercise.interface";

export const useProfile = () => {

  const { user, isLoading: authLoading, logout } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchExercises = useCallback(async () => {

    const userId = user?._id;
    
    if (!userId) {
      return;
    }

    setIsLoading(true);
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || '';
      const url = `${apiUrl}/api/exercises?userId=${userId}`;
      
      const res = await fetch(url, { 
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      });

      if (!res.ok) {
        console.error('❌ Error al obtener ejercicios:', res.status);
        return;
      }

      const data = await res.json();
      
      setExercises(data.exercises || []);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (!authLoading && user) {
      fetchExercises();
    }
  }, [authLoading, user, fetchExercises]);

  return {
    user,
    exercises,
    setExercises,
    isLoading: authLoading || isLoading,
    logout,
    refetchExercises: fetchExercises,
  };
};