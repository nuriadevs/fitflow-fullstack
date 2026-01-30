import { ExerciseResponse } from '../interfaces/exercise.interface';


// Función para extraer ejercicios de la respuesta de la IA
export function extractExercisesFromResponse(response: string): ExerciseResponse[] | null {
    try {
        if (!response.trim()) {
            return null;
        }

        if (response.trim().startsWith('{') || response.trim().startsWith('[')) {
            const parsed = JSON.parse(response);
            
            // Formato 1: Objeto con mensaje y ejercicios
            if (parsed.message?.includes("ejercicios") && Array.isArray(parsed.exercises)) {
                const validExercises = validateExercises(parsed.exercises);
                return validExercises.length > 0 ? validExercises : null;
            }
            
            // Formato 2: Array directo de ejercicios
            if (Array.isArray(parsed)) {
                const validExercises = validateExercises(parsed);
                return validExercises.length > 0 ? validExercises : null;
            }
        }
        
        return null;
    } catch (error) {
        console.error('Error al procesar la respuesta:', error);
        return null;
    }
}
// Función para validar los ejercicios
export function validateExercises(exercises: any[]): ExerciseResponse[] {
    return exercises.filter(exercise => {
        const isValid = 
            (exercise.title || exercise.name) &&
            (exercise.bodyPart || exercise.muscleGroup) &&
            exercise.equipment &&
            (exercise.level || exercise.difficulty) &&
            exercise.description;

        if (!isValid) {
            console.log('Ejercicio inválido descartado:', exercise);
        }

        return isValid;
    });
} 