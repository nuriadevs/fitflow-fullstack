import express, { Router, RequestHandler } from 'express';
import { getSavedExercises,getExerciseById,deleteExerciseById } from '../controllers/exercise.controller';
import isAuth from '../middlewares/auth.middleware';

const router: Router = express.Router();

// Ruta para obtener ejercicios guardados del usuario
router.get('/', isAuth as RequestHandler, getSavedExercises as RequestHandler);
router.get('/:id', isAuth as RequestHandler, getExerciseById as RequestHandler);
router.delete('/:id', isAuth as RequestHandler, deleteExerciseById as RequestHandler);



export default router; 