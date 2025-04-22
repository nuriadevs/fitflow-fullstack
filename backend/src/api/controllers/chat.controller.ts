import { Request, Response } from 'express';
import { runAgent } from '../../services/ai/agent';
import { tools } from '../../services/ai/tools';
import { Exercise } from '../../models/Exercise';
import { UserExercise } from '../../models/UserExercise';
import { getMessages } from '../../services/ai/memory';
import { chatResponses } from '../../responses/chat.response';
import { ChatResponse } from '../../schemas/chat.schema';

// Función para manejar la conversación con el agente
export const chatWithAI = async (req: Request, res: Response) => {
  const { message } = req.body;
  const userId = req.user?._id;

  if (!message) return res.status(400).json(chatResponses.missingMessage());
  if (!userId) return res.status(401).json(chatResponses.unauthorized());

  // Cheuqerar si el mensaje contiene palabras clave relacionadas con ejercicios
  const isExerciseRequest = /exercise|exercises|routine|training/i.test(message);

  try {
    await runAgent({ userMessage: message, tools });
    const messages = await getMessages();

    const assistantMessage = [...messages].reverse().find(msg => msg.role === 'assistant');

    if (!assistantMessage?.content) {
      return res.status(500).json(chatResponses.agentFailure());
    }

    if (isExerciseRequest) {
      const toolMessage = [...messages].reverse().find(msg => {
        if (msg.role === 'tool' && msg.content) {
          try {
            const content = JSON.parse(msg.content);
            return Array.isArray(content.exercises);
          } catch {
            return false;
          }
        }
        return false;
      });

      if (toolMessage?.content) {
        try {
          const toolData = JSON.parse(toolMessage.content);
          const savedExercises: ChatResponse['exercises'] = [];

          for (const ex of toolData.exercises) {
            let exercise = await Exercise.findOne({
              name: ex.name || ex.title,
              muscleGroup: ex.muscleGroup || ex.bodyPart,
              equipment: ex.equipment
            });

            if (!exercise) {
              exercise = new Exercise({
                name: ex.name || ex.title,
                muscleGroup: ex.muscleGroup || ex.bodyPart,
                equipment: ex.equipment,
                difficulty: ex.difficulty || ex.level,
                description: ex.description
              });
              await exercise.save();
            }

            // Guardar el ejercicio en la colección UserExercise
            const userExercise = await UserExercise.findOneAndUpdate(
              { userId, exerciseId: exercise._id },
              { userId, exerciseId: exercise._id, addedAt: new Date() },
              { upsert: true, new: true }
            );


            // Guardar el ejercicio en la base de datos
            savedExercises.push({
              _id: String(exercise._id),
              name: exercise.name,
              muscleGroup: exercise.muscleGroup,
              equipment: exercise.equipment,
              difficulty: exercise.difficulty,
              description: exercise.description,
              addedAt: userExercise.addedAt
            });
          }

          return res.status(200).json({
            response: assistantMessage.content,
            exercises: savedExercises
          });
        } catch (err) {
          console.error('Error al procesar ejercicios:', err);
        }
      }
    }

    return res.status(200).json({ response: assistantMessage.content });

  } catch (error) {
    console.error('Error en chat con el agente:', error);
    return res.status(500).json(chatResponses.internalError());
  }
};

