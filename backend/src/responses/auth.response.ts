import { BaseResponse } from '../schemas/base.schema';
import { AuthErrorResponse, AuthSuccessResponse, User } from '../schemas/auth.schema';

// Estructura de respuesta para errores y éxitos en la autenticación
export const authResponses = {
 missingFields: (): AuthErrorResponse => ({
  success: false,
  message: 'Please provide all fields',
 }),

 userExists: (): AuthErrorResponse => ({
  success: false,
  message: 'The user already exists',
 }),

 userNotFound: (): AuthErrorResponse => ({
  success: false,
  message: 'User does not exist',
 }),

 invalidCredentials: (): AuthErrorResponse => ({
  success: false,
  message: 'Invalid credentials',
 }),

 unauthorized: (): AuthErrorResponse => ({
  success: false,
  message: 'Unauthorized',
 }),

 internalError: (): AuthErrorResponse => ({
  success: false,
  message: 'Internal server error',
 }),

 logoutSuccess: (): BaseResponse => ({
  success: true,
  message: 'Session closed successfully',
 }),

 registrationSuccess: (
  email: string,
  username: string,
  token: string,
  id: string
 ): AuthSuccessResponse => ({
  success: true,
  message: 'User created successfully',
  user: { _id: id, email, username, token },
 }),

 loginSuccess: (user: User, token: string): AuthSuccessResponse => ({
  success: true,
  message: 'User successfully authenticated',
  user: {
   _id: user._id,
   username: user.username,
   email: user.email,
   token,
  },
 }),

 meSuccess: (user: User): AuthSuccessResponse => ({
  success: true,
  message: 'User profile retrieved',
  user: {
   _id: user._id,
   username: user.username,
   email: user.email,
   token: '', // Se podría eliminar esto o manejarlo de otra forma
  },
 }),
};
