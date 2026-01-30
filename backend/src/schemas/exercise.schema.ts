// src/schemas/exercise.schema.ts
import { BaseResponse } from './base.schema';

// Estructura de la respuesta de los ejercicios
export interface Exercise {
  _id: string;
  name: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
  description: string;
  addedAt: Date;
  
}

export interface ExerciseResponse extends BaseResponse {
  success: true;
  exercise: Exercise;
}

export interface ExercisesResponse extends BaseResponse {
  success: true;
  exercises: Exercise[];
}

export interface ExerciseErrorResponse extends BaseResponse {
  success: false;
}