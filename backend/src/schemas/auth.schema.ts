import { BaseResponse } from './base.schema';

// Esrtructura de la respuesta de autenticación del usurio
export interface User {
  _id: string;
  username: string;
  email: string;
}

export interface AuthUser extends User {
  token: string;
}

export interface AuthSuccessResponse extends BaseResponse {
  success: true;
  user: AuthUser;
}

export interface AuthErrorResponse extends BaseResponse {
  success: false;
}