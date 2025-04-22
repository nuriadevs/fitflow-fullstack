import React from 'react';
import { Exercise, ExerciseListProps } from '../../../../shared/types/exercise.interface'; // Importamos los tipos

const ExerciseList: React.FC<ExerciseListProps> = ({ exercises }) => {
 return (
  <div>
   {exercises.map((exercise: Exercise, index: number) => (
    <div key={index} className="bg-white rounded-lg p-4 mb-4 shadow-md">
     <h3 className="text-xl font-semibold">{exercise.name}</h3>
     <p>
      <strong>Muscle Group:</strong> {exercise.muscleGroup}
     </p>
     <p>
      <strong>Equipment:</strong> {exercise.equipment}
     </p>
     <p>
      <strong>Difficulty:</strong> {exercise.difficulty}
     </p>
     <p>
      <strong>Description:</strong> {exercise.description}
     </p>
    </div>
   ))}
  </div>
 );
};

export default ExerciseList;
