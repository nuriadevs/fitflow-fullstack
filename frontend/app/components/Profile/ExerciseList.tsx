import { Exercise } from '../../../../shared/types/exercise.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type ExerciseListProps = {
 exercises: Exercise[];
 loading: boolean;
 onDelete: (exerciseId: string) => void;
};

const ExerciseList = ({ exercises, loading, onDelete }: ExerciseListProps) => (
 <div className="mt-6">
  <h2 className="text-xl font-bold text-gray-900 mb-4">My Workouts</h2>

  {exercises.length > 0 ? (
   <div className="overflow-x-auto">
    <table className="min-w-full bg-white shadow rounded-lg">
     <thead className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
      <tr>
       <th className="px-6 py-3">#</th>
       <th className="px-6 py-3">Name</th>
       <th className="px-6 py-3">Muscle Group</th>
       <th className="px-6 py-3">Difficulty</th>
       <th className="px-6 py-3 text-right">Actions</th>
      </tr>
     </thead>
     <tbody className="text-gray-700 text-sm divide-y divide-gray-200">
      {exercises.map((exercise, index) => (
       <tr key={exercise._id}>
        <td className="px-6 py-4">{index + 1}</td>
        <td className="px-6 py-4 font-medium">{exercise.name}</td>
        <td className="px-6 py-4">{exercise.muscleGroup}</td>
        <td className="px-6 py-4">{exercise.difficulty}</td>
        <td className="px-6 py-4 text-right">
         <button
          onClick={() => onDelete(exercise._id)}
          disabled={loading}
          className={`transition ${
           loading ? 'opacity-50 cursor-not-allowed' : 'text-red-500 hover:text-red-700'
          }`}
          title="Eliminar ejercicio"
         >
          <FontAwesomeIcon icon={faTrash} />
         </button>
        </td>
       </tr>
      ))}
     </tbody>
    </table>
   </div>
  ) : (
   <p className="text-gray-500">You don't have any saved workouts yet.</p>
  )}
 </div>
);

export default ExerciseList;
