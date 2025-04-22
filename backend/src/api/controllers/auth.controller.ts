import 'dotenv/config';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/Users';
import cookieOptions from '../../config/cookieOptions';
import { authResponses } from '../../responses/auth.response';

// Verifica si el entorno es de producción y si la variable JWT_SECRET está definida
if (!process.env.JWT_SECRET) {
 throw new Error('JWT_SECRET is not defined');
}

const JWT_SECRET = process.env.JWT_SECRET;

// Función para registrar un usuario y generar un token JWT 
export const register = async (req: Request, res: Response) => {
 try {
  const { email, password, username } = req.body;
  if (!email || !password || !username) {
   return res.status(400).json(authResponses.missingFields());
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
   return res.status(400).json(authResponses.userExists());
  }

  const newUser = new User({ email, password, username });
  await newUser.save();

  const token = jwt.sign({ email, username }, JWT_SECRET, { expiresIn: '1h' });

  res.cookie('token', token, cookieOptions);
  res.status(201).json(authResponses.registrationSuccess(email, username, token, newUser._id as string));
 } catch (error) {
  console.error('Registration error:', error);
  res.status(500).json(authResponses.internalError());
 }
};

// Función para iniciar sesión y generar un token JWT
export const login = async (req: Request, res: Response) => {
 try {
  const { email, password } = req.body;
  if (!email || !password) {
   return res.status(400).json(authResponses.missingFields());
  }

  const user = await User.findOne({ email });
  if (!user) {
   return res.status(400).json(authResponses.userNotFound());
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
   return res.status(400).json(authResponses.invalidCredentials());
  }

  const token = jwt.sign({ email, username: user.username }, JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', token, cookieOptions);
  res.status(200).json(authResponses.loginSuccess( user, token));
 } catch (error) {
  console.error('Login error:', error);
  res.status(500).json(authResponses.internalError());
 }
};

// Función para salir de la sesión y eliminar el token JWT
export const logout = (_req: Request, res: Response) => {
 res.clearCookie('token', {
  path: '/',
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax',
 });
 res.status(200).json(authResponses.logoutSuccess());
};

// Función para obtener la información del usuario autenticado
export const me = async (req: Request, res: Response) => {
 try {
  if (!req.user) {
   return res.status(401).json(authResponses.unauthorized());
  }

  res.status(200).json(authResponses.meSuccess(req.user));
 } catch (error) {
  console.error('Error in me:', error);
  res.status(500).json(authResponses.internalError());
 }
};

