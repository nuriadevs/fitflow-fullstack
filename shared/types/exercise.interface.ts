export interface Exercise {
    _id: string;
    name: string;
    description?: string;
    createdAt?: string;
    updatedAt?: string;
    userId?: string; // si cada ejercicio pertenece a un usuario
    [key: string]: any; // opcional: permite campos adicionales sin romper el tipo
  }
  

 export interface ExerciseListProps {
    exercises: Exercise[];
  }