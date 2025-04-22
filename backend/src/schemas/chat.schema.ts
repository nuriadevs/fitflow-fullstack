// src/schemas/chat.schema.ts
import { BaseResponse } from './base.schema';
import { Exercise } from './exercise.schema';

// Estructura de la respuesta del chat
export interface ChatResponse extends BaseResponse {
  success: true;
  response: string;
  exercises?: Exercise[];
}

export interface ChatErrorResponse extends BaseResponse {
  success: false;
}

// Definición del esquema para documentación Swagger/OpenAPI
export const chatResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: true },
    message: { type: 'string', example: 'Respuesta generada correctamente' },
    response: { type: 'string', example: 'Aquí tienes tu respuesta del agente.' },
    exercises: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '60c72b2f9f1b2c001c8a35b6' },
          name: { type: 'string', example: 'Push-up' },
          muscleGroup: { type: 'string', example: 'Pectorals' },
          equipment: { type: 'string', example: 'None' },
          difficulty: { type: 'string', example: 'Medium' },
          description: { type: 'string', example: 'An upper body exercise for chest muscles.' },
          addedAt: { type: 'string', example: '2023-01-01T12:00:00Z' },
        },
      },
      description: 'Lista de ejercicios sugeridos (si los hay)',
    },
  },
  required: ['success', 'message', 'response'],
};

export const chatErrorResponseSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean', example: false },
    message: { type: 'string', example: 'Error al procesar la solicitud' },
  },
  required: ['success', 'message'],
};