import { Exercise } from '../../../../shared/types/exercise.interface';

type Props = {
 exercise: Exercise;
};

const ExerciseCard = ({ exercise }: Props) => {
 return (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
   <div className="p-6">
    <h2 className="text-xl font-semibold text-gray-900 mb-2">{exercise.name}</h2>
    <div className="space-y-2">
     <div>
      <span className="text-sm font-medium text-gray-500">Muscle Group:</span>
      <p className="text-sm text-gray-900">{exercise.muscleGroup}</p>
     </div>
     <div>
      <span className="text-sm font-medium text-gray-500">Equipment:</span>
      <p className="text-sm text-gray-900">{exercise.equipment}</p>
     </div>
     <div>
      <span className="text-sm font-medium text-gray-500">Difficulty:</span>
      <p className="text-sm text-gray-900">{exercise.difficulty}</p>
     </div>
     <div>
      <span className="text-sm font-medium text-gray-500">Description:</span>
      <p className="text-sm text-gray-900 mt-1">{exercise.description}</p>
     </div>
    </div>
   </div>
  </div>
 );
};

export default ExerciseCard;
