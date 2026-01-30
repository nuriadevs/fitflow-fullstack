export interface Exercise {
  _id: string;
  name: string;
  description?: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
  createdAt?: string;
  updatedAt?: string;
  userId?: string;
}

export interface ExerciseListProps {
  exercises: Exercise[];
}
