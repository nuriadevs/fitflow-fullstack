// src/responses/user.responses.ts
import { BaseResponse } from '../schemas/base.schema';
import { User } from '../schemas/auth.schema';
import { UserErrorResponse, UserSuccessResponse } from '../schemas/user.schema';


// Estructura de las respuestas para errores y éxitos en el usuario
export const userResponses = {
 getSuccess: (users: User[]): UserSuccessResponse => ({
  success: true,
  message: 'Users retrieved successfully',
  users,
 }),

 getSingleSuccess: (user: User): UserSuccessResponse => ({
  success: true,
  message: 'User retrieved successfully',
  user,
 }),

 updateSuccess: (user: User): UserSuccessResponse => ({
  success: true,
  message: `User ${user} updated successfully`,
  user,
 }),

 deleteSuccess: (): BaseResponse => ({
  success: true,
  message: 'User deleted successfully',
 }),

 internalError: (): UserErrorResponse => ({
  success: false,
  message: 'Internal server error',
 }),

 notFound: (): UserErrorResponse => ({
  success: false,
  message: 'User not found',
 }),

};
