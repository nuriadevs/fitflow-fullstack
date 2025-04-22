// src/responses/exercise.responses.ts
import { BaseResponse } from '../schemas/base.schema';
import { Exercise, ExerciseErrorResponse, ExerciseResponse, ExercisesResponse } from '../schemas/exercise.schema';

// Estructura de las respuestas para errores y éxitos en el ejercicio
export const exerciseResponses = {
  unauthenticated: (): ExerciseErrorResponse => ({
    success: false,
    message: "User not authenticated",
  }),

  notFound: (): ExerciseErrorResponse => ({
    success: false,
    message: "Exercise not found",
  }),

  notFoundForUser: (): ExerciseErrorResponse => ({
    success: false,
    message: "Exercise not found for this user",
  }),

  fetchError: (): ExerciseErrorResponse => ({
    success: false,
    message: "Error fetching exercises",
  }),

  fetchByIdError: (): ExerciseErrorResponse => ({
    success: false,
    message: "Error fetching the exercise",
  }),

  deleteError: (): ExerciseErrorResponse => ({
    success: false,
    message: "Internal error deleting exercise-user relationship",
  }),

  deleteSuccess: (): BaseResponse => ({
    success: true,
    message: "Exercise-user relationship deleted successfully",
  }),

  fetchSuccess: (exercises: Exercise[]): ExercisesResponse => ({
    success: true,
    message: "Exercises retrieved successfully",
    exercises,
  }),

  fetchByIdSuccess: (exercise: Exercise): ExerciseResponse => ({
    success: true,
    message: "Exercise retrieved successfully",
    exercise,
  }),
};
