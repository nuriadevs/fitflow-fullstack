import express, { Router, RequestHandler } from 'express';
import { login, register, logout, me } from '../controllers/auth.controller';
import isAuth from '../middlewares/auth.middleware';

const router: Router = express.Router();

// Rutas de autenticación
router.post('/login', login as RequestHandler);
router.post('/register', register as RequestHandler);
router.post('/logout', logout as RequestHandler);
router.get('/me', isAuth as RequestHandler, me as RequestHandler);


export default router; 