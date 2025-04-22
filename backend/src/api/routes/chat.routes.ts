import express, { Router, RequestHandler } from 'express';
import { chatWithAI } from '../controllers/chat.controller';
import isAuth from '../middlewares/auth.middleware';

const router: Router = express.Router();

// Ruta para chat con el agente
router.post('/', isAuth as RequestHandler, chatWithAI as RequestHandler);



export default router; 