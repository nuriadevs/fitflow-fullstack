// src/responses/chat.responses.ts
import { ChatErrorResponse, ChatResponse } from '../schemas/chat.schema';
import { Exercise } from '../schemas/exercise.schema';

//Estructura de ls respuesta para errores y éxitos en el chat
export const chatResponses = {
 missingMessage: (): ChatErrorResponse => ({
  success: false,
  message: 'Please provide a message',
 }),

 unauthorized: (): ChatErrorResponse => ({
  success: false,
  message: 'User not authenticated',
 }),

 agentFailure: (): ChatErrorResponse => ({
  success: false,
  message: 'No response received from the agent',
 }),

 internalError: (): ChatErrorResponse => ({
  success: false,
  message: 'Error processing the request',
 }),

 chatSuccess: (response: string, exercises?: Exercise[]): ChatResponse => ({
  success: true,
  message: 'Response generated successfully',
  response,
  exercises,
 }),
};
