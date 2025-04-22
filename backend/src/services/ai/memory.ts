import type { AIMessage } from '../../types/types'
import { v4 as uuidv4 } from 'uuid'
import { Message } from '../../models/Message'
import { MEMORY_CONSTANTS } from '../../constants/messages';

export type MessageWithMetadata = AIMessage & {
  _id: string;  
  createdAt: Date; 
  metadata?: {
    summary?: string;
  };
}

type Data = {
  messages: MessageWithMetadata[]
  summary: string
}

export const addMetadata = (message: AIMessage) => {
  // Crear un objeto base con los campos requeridos
  const result: any = {
    ...message,
    id: uuidv4(),
    createdAt: new Date(),
  };
  
  // Limpiar tool_calls si está vacío
  if (result.tool_calls && result.tool_calls.length === 0) {
    result.tool_calls = undefined;
  }
  
  return result;
}

export const removeMetadata = (message: any): AIMessage => {
  // Extraer solo los campos necesarios
  const { _id, createdAt, metadata, __v, $__, $isNew, _doc, ...rest } = message;
  
  // Asegurarnos de que content sea un string vacío si es null o undefined
  const cleanMessage: AIMessage = {
    role: message.role,
    content: message.content || '',
  };
  
  // Solo añadir tool_calls si existen y no están vacíos
  if (message.tool_calls && message.tool_calls.length > 0) {
    cleanMessage.tool_calls = message.tool_calls;
  }
  
  // Solo añadir tool_call_id si existe
  if (message.tool_call_id) {
    cleanMessage.tool_call_id = message.tool_call_id;
  }

  return cleanMessage;
}


export const addMessages = async (messages: AIMessage[]) => {
  try {
  //  console.log('Guardando mensajes en MongoDB...');
    const messagesWithMetadata = messages.map(addMetadata);
    
    // Guardar mensajes en MongoDB
    const savedMessages = await Message.insertMany(messagesWithMetadata);
   // console.log(`${savedMessages.length} mensajes guardados exitosamente`);

    // Obtener el conteo total de mensajes
    const totalMessages = await Message.countDocuments();
   // console.log(`Total de mensajes en la base de datos: ${totalMessages}`);

    // Si hay más de 10 mensajes, crear un resumen
    if (totalMessages >= 10) {
    //  console.log('Creando resumen de mensajes antiguos...');
      const oldestMessages = await Message.find()
        .sort({ createdAt: 1 })
        .limit(5);

    }
  } catch (error) {
    console.error('Error al guardar mensajes:', error);
    throw error;
  }
}

export const getMessages = async (): Promise<AIMessage[]> => {
  try {
    console.log('Obteniendo mensajes de MongoDB...');
    // Aumentamos el límite a 10 mensajes para tener más contexto
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .limit(10);

    const messagesWithoutMetadata = messages.map(removeMetadata);

    // Invertimos el orden para tener la conversación en orden cronológico
    const chronologicalMessages = messagesWithoutMetadata.reverse();

    // Verificar que cada mensaje de herramienta tenga un tool_call_id válido
    const validatedMessages: AIMessage[] = [];
    
    for (let i = 0; i < chronologicalMessages.length; i++) {
      const message = chronologicalMessages[i];
      
      // Validar mensajes de herramienta
      if (message.role === 'tool') {
        if (!message.tool_call_id) {
      //    console.warn('Mensaje de herramienta sin tool_call_id encontrado, omitiendo...');
          continue;
        }

        // Buscar el mensaje del asistente anterior que tenga el tool_call_id correspondiente
        const previousAssistantMessage = chronologicalMessages
          .slice(0, i)
          .reverse()
          .find(m => m.role === 'assistant' && m.tool_calls?.some(tc => tc.id === message.tool_call_id));


      }

      validatedMessages.push(message);
    }

    return validatedMessages;
  } catch (error) {
    console.error('Error al obtener mensajes:', error);
    throw error;
  }
}

export const getSummary = async () => {
  try {
    console.log('Obteniendo resumen de MongoDB...');
    const lastMessage = await Message.findOne()
      .sort({ createdAt: -1 });
    
    const summary = lastMessage?.metadata?.summary || '';
    console.log('Resumen obtenido exitosamente');
    return summary;
  } catch (error) {
    console.error('Error al obtener resumen:', error);
    throw error;
  }
}

export const saveToolResponse = async (
  toolCallId: string,
  toolResponse: string
) => {
  try {
    console.log('Guardando respuesta de herramienta...');
    
    // Verificar que el toolCallId sea válido
    if (!toolCallId) {
      throw new Error( MEMORY_CONSTANTS.ERROR_MESSAGES.TOOL_CALL_ID_REQUIRED);
    }

    // Buscar el mensaje del asistente correspondiente
    const assistantMessage = await Message.findOne({
      'tool_calls.id': toolCallId
    }).sort({ createdAt: -1 });

    if (!assistantMessage) {
      throw new Error(MEMORY_CONSTANTS.ERROR_MESSAGES.ASSISTANT_MESSAGE_NOT_FOUND);
    }

    // Guardar el mensaje de la herramienta
    return await addMessages([
      {
        role: 'tool',
        content: toolResponse,
        tool_call_id: toolCallId,
      },
    ]);
  } catch (error) {
    console.error('Error al guardar respuesta de herramienta:', error);
    throw error;
  }
}

