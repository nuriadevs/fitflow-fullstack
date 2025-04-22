import { Request, Response } from 'express';
import { Exercise } from '../../models/Exercise';
import { UserExercise } from '../../models/UserExercise';
import { exerciseResponses } from '../../responses/exercise.response';


// Función para obtener todos los ejercicios
export const getSavedExercises = async (req: Request, res: Response) => {
 const userId = req.user?._id;
 if (!userId) {
  return res.status(401).json(exerciseResponses.unauthenticated());
 }

 try {
  const userExercises = await UserExercise.find({ userId })
   .populate('exerciseId')
   .sort({ addedAt: -1 });

  const exercises = userExercises.map((ue) => {
   const exercise = ue.exerciseId as any;
   return {
    ...exercise.toObject(),
    userExercise: ue.toObject(),
   };
  });

  res.status(200).json({ exercises });
 } catch (error) {
  console.error('Error al obtener ejercicios guardados:', error);
  res.status(500).json(exerciseResponses.fetchError());
 }
};

// Función para guardar un ejercicio por ID
export const getExerciseById = async (req: Request, res: Response) => {
 const userId = req.user?._id;
 const exerciseId = req.params.id;

 if (!userId) {
  return res.status(401).json(exerciseResponses.unauthenticated());
 }

 try {
  const exercise = await Exercise.findById(exerciseId);

  if (!exercise) {
   return res.status(404).json(exerciseResponses.notFound());
  }

  const userExercise = await UserExercise.findOne({ userId, exerciseId });

  const exerciseData = {
   ...exercise.toObject(),
   userExercise: userExercise ? userExercise.toObject() : null,
  };

  res.status(200).json({ exercise: exerciseData });
 } catch (error) {
  console.error('Error al obtener ejercicio por ID:', error);
  res.status(500).json(exerciseResponses.fetchByIdError());
 }
};

// Función para eliminar un ejercicio por ID
export const deleteExerciseById = async (req: Request, res: Response) => {
 const userId = req.user?._id;
 const exerciseId = req.params.id;

 if (!userId) {
  return res.status(401).json(exerciseResponses.unauthenticated());
 }

 try {
  const userExercise = await UserExercise.findOneAndDelete({ userId, exerciseId });

  if (!userExercise) {
   return res.status(404).json(exerciseResponses.notFoundForUser());
  }

  res.status(200).json(exerciseResponses.deleteSuccess());
 } catch (error) {
  console.error('Error al eliminar el ejercicio:', error);
  return res.status(500).json(exerciseResponses.deleteError());
 }
};
