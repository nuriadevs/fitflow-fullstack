import { addMessages, getMessages } from './memory';
import { runLLM } from './llm';
import { showLoader, logMessage } from '../../cli/ui';
import { runTool } from './toolRunner';
import type { AIMessage } from '../../types/types';
import type { ChatResponse } from '../../../../shared/types/chat';
import { MESSAGES } from '../../constants/messages';

// Función para verificar si la respuesta de la herramienta es un objeto JSON válido
const isExerciseSearchResponse = (content: string | undefined): boolean => {
 if (!content) return false;

 try {
  const parsed = JSON.parse(content);
  return parsed.message === Array.isArray(parsed.exercises);
 } catch (error) {
  return false;
 }
};

// Función principal para ejecutar el agente
export const runAgent = async ({ userMessage, tools }: { userMessage: string; tools: any[] }) => {
 await addMessages([{ role: 'user', content: userMessage }]);

 const loader = showLoader('🤔');
 let lastToolResponse = '';

 // Verificar si es una solicitud de ejercicios
 const isExerciseRequest =
 userMessage.toLowerCase().includes('exercise') ||
 userMessage.toLowerCase().includes('exercises') ||
 userMessage.toLowerCase().includes('routine') ||
 userMessage.toLowerCase().includes('training');
 

 try {
  while (true) {
   const currentHistory = await getMessages();
   const response = await runLLM({
    messages: currentHistory,
    tools: isExerciseRequest ? tools : [], 
   });


   const aiMessage: AIMessage = {
    role: response.role,
    content: response.content || '',
   };

   // Añadir tool_calls solo si existen
   if (response.tool_calls && response.tool_calls.length > 0 && isExerciseRequest) {
    aiMessage.tool_calls = response.tool_calls;
   }

   // Primero guardar el mensaje del asistente
   await addMessages([aiMessage]);

   if (aiMessage.content) {
    loader.stop();
    logMessage(aiMessage);

    const result: ChatResponse = {
     response: aiMessage.content,
     exercises: isExerciseRequest ? (response as any).exercises : undefined,
    };

    return result;
   }

   console.log('Recibiendo mensaje del usuario:', userMessage);

   // Si hay tool_calls, ejecutar la herramienta y guardar su respuesta
   if (aiMessage.tool_calls && aiMessage.tool_calls.length > 0 && isExerciseRequest) {
    const toolCall = aiMessage.tool_calls[0];
    console.log('Llamada a herramienta detectada:', toolCall);

    logMessage(aiMessage);
    loader.update(`executing: ${toolCall.function.name}`);

    const toolResponse = await runTool(toolCall, userMessage);

    if (toolResponse === '[]') {
     console.warn('Warning: Empty tool response');
     return;
    }

    if (toolResponse === lastToolResponse) {
     console.warn('Warning: Duplicate tool response');
     const finalMessage: AIMessage = {
      role: 'assistant',
      content: MESSAGES.NO_INFO,
     };
     loader.stop();
     logMessage(finalMessage);
     await addMessages([finalMessage]);
     return { response: finalMessage.content };
    }

    lastToolResponse = toolResponse;

    // Añadir el mensaje de herramienta después de haber añadido el mensaje con tool_calls
    const toolMessage: AIMessage = {
     role: 'tool',
     content: toolResponse,
     tool_call_id: toolCall.id,
    };

    console.log('Guardando mensaje de herramienta:', toolMessage);
    await addMessages([toolMessage]); // Solo guardar toolMessage aquí

    if (isExerciseSearchResponse(toolResponse)) {
     const parsedResponse = JSON.parse(toolResponse);
     const finalAiMessage: AIMessage = {
      role: 'assistant',
      content: parsedResponse.message || MESSAGES.EXERCISES_FOUND ,
     };

     loader.stop();
     logMessage(finalAiMessage);
     await addMessages([finalAiMessage]);
     return {
      response: finalAiMessage.content,
      exercises: parsedResponse.exercises,
     };
    }
   }
  }
 } catch (error) {
  console.error('Error en runAgent:', error);
  loader.stop();
  return { response: MESSAGES.ERROR };
 }
};
