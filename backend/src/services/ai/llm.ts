import type { AIMessage } from '../../types/types'
import { openai } from '../../config/openai'
import { zodFunction, zodResponseFormat } from 'openai/helpers/zod'
import { systemPrompt as defaultSystemPrompt } from './systemPrompt'
import { z } from 'zod'
import { getSummary } from './memory'
import { LLM_CONSTANTS } from '../../constants/messages';

// Función para validar el formato de la respuesta de la función
export const runLLM = async ({
    messages,
    tools = [],
    temperature = LLM_CONSTANTS.DEFAULT_TEMPERATURE,
    systemPrompt,
  }: {
    messages: AIMessage[]
    tools?: any[]
    temperature?: number
    systemPrompt?: string
  }) => {
    const formattedTools = tools.map(zodFunction)
    const summary = await getSummary()
  
    // Convertir mensajes a un formato compatible con OpenAI
    const openaiMessages = messages.map(msg => {
      // Crear un objeto base
      const result: any = {
        role: msg.role,
        content: msg.content || '',
      };
      
      // Añadir campos adicionales solo si existen y no están vacíos
      if (msg.tool_calls && msg.tool_calls.length > 0) {
        result.tool_calls = msg.tool_calls;
      }
      
      if (msg.tool_call_id) {
        result.tool_call_id = msg.tool_call_id;
      }
      
      return result;
    });
  
    // Validar los mensajes con el esquema de OpenAI
    const response = await openai.chat.completions.create({
      model: LLM_CONSTANTS.MODEL_NAME,
      temperature,
      messages: [
        {
          role: 'system',
          content: `${
            systemPrompt || defaultSystemPrompt
          }. Conversation summary so far: ${summary}`,
        },
        ...openaiMessages,       
             
      ],
      ...(formattedTools.length > 0 && {
        tools: formattedTools,
        tool_choice: 'auto',
        parallel_tool_calls: false,
      }),
    })
  
    // Asegurarnos de que tool_calls sea undefined si está vacío
    const message = response.choices[0].message;
    if (message.tool_calls && message.tool_calls.length === 0) {
      message.tool_calls = undefined;
    }
  
    return message;
  }
  
