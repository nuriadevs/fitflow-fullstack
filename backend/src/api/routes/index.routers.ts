// src/api/routes/index.ts
import { Router } from 'express';

import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import chatRoutes from './chat.routes';
import exerciseRoutes from './exercises.routes';

const router = Router();

// Agrupar rutas con su prefijo correspondiente
router.use('/auth', authRoutes);        
router.use('/users', userRoutes);        
router.use('/chat', chatRoutes);        
router.use('/exercises', exerciseRoutes); 

export default router;
