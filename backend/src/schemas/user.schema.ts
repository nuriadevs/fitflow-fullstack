// src/schemas/user.schema.ts
import { BaseResponse } from './base.schema';
import { User } from './auth.schema';

// Estructura de la respuesta de los ejercicios
export interface ExerciseResponse extends BaseResponse {
  success: true;
  exercise: User;
}

export interface UserSuccessResponse extends BaseResponse {
  success: true;
  user?: User;
  users?: User[];
}

export interface UserErrorResponse extends BaseResponse {
  success: false;
}