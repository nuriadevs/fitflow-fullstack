import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from './useAuth';
import { Exercise } from '../../../shared/types/exercise.interface';

export const useProfile = () => {
  const router = useRouter();
  const { user, isLoading: authLoading, logout } = useAuth();
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExercises = async () => {
    if (!user) return;

    setIsLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exercises?userId=${user.id}`, {
        credentials: 'include',
      });

      if (!res.ok) {
        console.error('No se pudieron obtener los ejercicios');
        return;
      }

      const data = await res.json();
      if (data.exercises) {
        setExercises(data.exercises);
      }
    } catch (error) {
      console.error('Error al obtener ejercicios:', error);
      router.push('/auth/signin');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchExercises();
    }
  }, [authLoading, user, router]);

  return {
    user,
    exercises,
    setExercises,
    isLoading: authLoading || isLoading,
    logout
  };
};
