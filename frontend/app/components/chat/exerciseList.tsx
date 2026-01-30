
import React from 'react';
import { Exercise, ExerciseListProps } from "@/types/exercise.interface";
import { Dumbbell  } from 'lucide-react';

interface ExerciseListEnhancedProps extends ExerciseListProps {
    userName?: string;
}
/**
 * Componente que muestra una lista de ejercicios en tarjetas estilizadas.
 * @param param0
 * @returns 
 */
const ExerciseList: React.FC<ExerciseListEnhancedProps> = ({ exercises, userName }) => {

    const getDifficultyColor = (difficulty: string) => {
        const colors = {
            beginner: 'bg-green-100 text-green-800 border-green-200',
            intermediate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
            advanced: 'bg-red-100 text-red-800 border-red-200',
        };
        return colors[difficulty.toLowerCase() as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200';
    };


    if (exercises.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="text-6xl mb-4"><Dumbbell className="h-16 w-16 mx-auto text-red-400" /></div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                    {userName ? `${userName}, aún no tienes ejercicios guardados` : 'No hay ejercicios guardados'}
                </h3>
                <p className="text-gray-500">Comienza a agregar ejercicios a tu rutina</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header con nombre del usuario */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {userName ? `Ejercicios de ${userName}` : 'Tus ejercicios guardados'}
                </h2>
                <p className="text-gray-600">
                    {exercises.length} {exercises.length === 1 ? 'ejercicio' : 'ejercicios'} en tu colección
                </p>
            </div>

            {/* Grid de tarjetas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exercises.map((exercise: Exercise, index: number) => (
                    <div
                        key={exercise._id || index}
                        className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-xl hover:border-red-300 transition-all duration-300 hover:-translate-y-1"
                    >
                        {/* Header de la tarjeta */}
                        <div className="bg-linear-to-r from-red-500 to-red-600 p-4">
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-white leading-tight">
                                        {exercise.name}
                                    </h3>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(exercise.difficulty)}`}>
                                    {exercise.difficulty}
                                </span>
                            </div>
                        </div>

                        {/* Contenido */}
                        <div className="p-5 space-y-4">
                            {/* Muscle Group */}
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                <span className="text-sm text-gray-500">Grupo muscular:</span>
                                <span className="text-sm font-semibold text-gray-900 capitalize">
                                    {exercise.muscleGroup}
                                </span>
                            </div>

                            {/* Equipment */}
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                <span className="text-sm text-gray-500">Equipo:</span>
                                <span className="text-sm font-semibold text-gray-900 capitalize">
                                    {exercise.equipment}
                                </span>
                            </div>

                            {/* Description */}
                            <div className="pt-3 border-t border-gray-100">
                                <p className="text-sm text-gray-600 line-clamp-3 leading-relaxed">
                                    {exercise.description}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseList;