
/*import { useState } from 'react';

export function useExerciseActions() {
 const [loading, setLoading] = useState(false);

 const deleteExercise = async (exerciseId: string, onSuccess?: () => void) => {
  setLoading(true);
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseId}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
   });

   const result = await res.json(); // <-- Solo una vez

   console.log('Respuesta del backend:', result);

   if (!res.ok) {
    throw new Error(result.message || 'Error al eliminar ejercicio');
   }
   // Si la eliminación fue exitosa, se ejecuta el callback onSuccess
   onSuccess?.();
  } catch (error) {
   console.error(error);
   alert('Ocurrió un error al eliminar el ejercicio.');
  } finally {
   setLoading(false);
  }
 };

 return { deleteExercise, loading };
}
*/

import { useState } from 'react';
export function useExerciseActions() {
  const [loading, setLoading] = useState(false);

  const deleteExercise = async (exerciseId: string, onSuccess?: () => void) => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/exercises/${exerciseId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
      });

      // Primero obtenemos la respuesta como texto
      const result = await res.text();

      // Verificamos si la respuesta es JSON
      if (res.headers.get('Content-Type')?.includes('application/json')) {
        const jsonResult = JSON.parse(result);
        console.log('Respuesta del backend:', jsonResult);

        if (!res.ok) {
          throw new Error(jsonResult.message || 'Error al eliminar ejercicio');
        }

        // Si la eliminación fue exitosa, ejecutamos el callback onSuccess
        onSuccess?.();
      } else {
        // Si no es JSON, manejamos el error de alguna manera
        console.error('La respuesta del servidor no es JSON:', result);
        throw new Error('Error inesperado');
      }
    } catch (error) {
      console.error(error);
      alert('Ocurrió un error al eliminar el ejercicio.');
    } finally {
      setLoading(false);
    }
  };

  return { deleteExercise, loading };
}
