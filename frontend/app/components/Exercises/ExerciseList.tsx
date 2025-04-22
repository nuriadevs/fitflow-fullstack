import { Exercise } from '../../../../shared/types/exercise.interface';
import ExerciseCard from './ExerciseCard';

type Props = {
 exercises: Exercise[];
};

const ExerciseList = ({ exercises }: Props) => {
 if (exercises.length === 0) {
  return (
   <div className="text-center py-12">
    <p className="text-gray-500">You don't have any saved workouts yet.</p>
    <p className="text-gray-500 mt-2">You can search for workouts in the chat to save them here.</p>
   </div>
  );
 }

 return (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
   {exercises.map((exercise) => (
    <ExerciseCard key={exercise._id} exercise={exercise} />
   ))}
  </div>
 );
};

export default ExerciseList;
