'use client';

import { useProfile } from '@/hooks/useProfile';
import { Dumbbell, Loader2, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

// Función para obtener el color según la dificultad
const getDifficultyColor = (difficulty: string) => {
    const colors = {
        Beginner: 'bg-green-100 text-green-700',
        Intermediate: 'bg-blue-100 text-blue-700',
        Advanced: 'bg-purple-100 text-purple-700',
    };
    return colors[difficulty as keyof typeof colors] || 'bg-gray-100 text-gray-700';
};

// Componente de Loading
const ExerciseSkeleton = () => (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden animate-pulse">
        <div className="bg-gray-200 h-40" />
        <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="space-y-2 pt-2">
                <div className="h-3 bg-gray-200 rounded w-1/2" />
                <div className="h-3 bg-gray-200 rounded w-1/2" />
            </div>
        </div>
    </div>
);

/**
 * Página de ejercicios del usuario con paginación
 * @returns
 */
export default function ExercisesPage() {
    const { exercises, user, isLoading, refetchExercises } = useProfile();


    const [currentPage, setCurrentPage] = useState(1);
    const exercisesPerPage = 6;


    const indexOfLastExercise = currentPage * exercisesPerPage;
    const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
    const displayedExercises = exercises.slice(indexOfFirstExercise, indexOfLastExercise);


    const totalPages = Math.ceil(exercises.length / exercisesPerPage);
    const hasMorePages = currentPage < totalPages;
    const hasPreviousPages = currentPage > 1;

    const handleLoadMore = () => {
        if (hasMorePages) {
            setCurrentPage(prev => prev + 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const handleLoadPrevious = () => {
        if (hasPreviousPages) {
            setCurrentPage(prev => prev - 1);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    return (
        <section className="container mx-auto px-4 py-6">
            {/* Header */}
            <div className="mb-6 text-center">
                <h1 className="text-3xl font-bold tracking-tight">{user?.username}&apos;s Exercises</h1>

                {/* Mostrar loading o contador de ejercicios */}
                {isLoading ? (
                    <div className="mt-2 flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Loading exercises...</p>
                    </div>
                ) : (
                    <p className="mt-2 text-sm text-muted-foreground">
                        {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} available
                    </p>
                )}
            </div>

            {/* Grid de ejercicios */}
            <div className="mx-auto max-w-6xl">
                {isLoading ? (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {[...Array(6)].map((_, i) => (
                            <ExerciseSkeleton key={i} />
                        ))}
                    </div>
                ) : exercises.length === 0 ? (
                    <div className="text-center py-12">
                        <Dumbbell className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No exercises found</h3>
                        <p className="text-sm text-muted-foreground mb-6">
                            Start by creating your first exercise
                        </p>
                        <button
                            onClick={refetchExercises}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2"
                        >
                            Refresh Exercises
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {displayedExercises.map((exercise) => (
                            <div
                                key={exercise._id}
                                className="bg-card text-card-foreground flex flex-col rounded-xl border shadow-sm group overflow-hidden hover:shadow-md transition-shadow"
                            >
                                {/* Imagen/Icono del ejercicio */}
                                <div className="relative bg-linear-to-br from-red-500/10 to-red-500/5 p-8">
                                    <div className="flex items-center justify-center">
                                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
                                            <Dumbbell className="h-10 w-10 text-red-500" />
                                        </div>
                                    </div>

                                    {/* Badge de dificultad */}
                                    <span
                                        className={`inline-flex items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium absolute top-2 left-2 ${getDifficultyColor(
                                            exercise.difficulty
                                        )}`}
                                    >
                                        {exercise.difficulty}
                                    </span>
                                </div>

                                {/* Contenido del ejercicio */}
                                <div className="p-4 flex-1 flex flex-col">
                                    <h3 className="text-base font-semibold truncate mb-2">{exercise.name}</h3>

                                    {/* Descripción */}
                                    {exercise.description && (
                                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                                            {exercise.description}
                                        </p>
                                    )}

                                    {/* Detalles del ejercicio */}
                                    <div className="mt-auto space-y-2">
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">Muscle Group:</span>
                                            <span className="font-medium text-foreground">{exercise.muscleGroup}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-xs">
                                            <span className="text-muted-foreground">Equipment:</span>
                                            <span className="font-medium text-foreground">{exercise.equipment}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Paginación: Botones de navegación */}
            {!isLoading && exercises.length > exercisesPerPage && (
                <div className="mt-8 flex flex-col items-center gap-4">
                    {/* Indicador de página */}
                    <p className="text-sm text-muted-foreground">
                        Showing {indexOfFirstExercise + 1}-{Math.min(indexOfLastExercise, exercises.length)} of {exercises.length} exercises
                        <span className="ml-2 text-xs">
                            (Page {currentPage} of {totalPages})
                        </span>
                    </p>

                    {/* Botones de navegación */}
                    <div className="flex gap-3 w-full sm:w-auto">
                        {/* Botón Previous */}
                        {hasPreviousPages && (
                            <button
                                onClick={handleLoadPrevious}
                                className="button-dark-red inline-flex items-center justify-center gap-2 flex-1 sm:w-40 h-12 border border-transparent text-sm font-medium rounded-md"
                            >
                                <ChevronLeft className="h-4 w-4" />
                                Previous
                            </button>
                        )}

                        {/* Botón Load More */}
                        {hasMorePages && (
                            <button
                                onClick={handleLoadMore}
                                className="button-dark-red inline-flex items-center justify-center gap-2 flex-1 sm:w-40 h-12 border border-transparent text-sm font-medium rounded-md"
                            >
                                Load More
                            </button>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}