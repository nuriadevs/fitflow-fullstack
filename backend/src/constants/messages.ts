export const MESSAGES = {
    EXERCISE_SEARCH: "Aquí tienes tus ejercicios con los datos completos de Upstash:",
    NO_INFO: "No pude encontrar información adicional sobre tu consulta.",
    EXERCISES_FOUND: "Aquí tienes los ejercicios que solicitaste:",
    ERROR: "Hubo un error procesando tu solicitud. Por favor, intenta de nuevo."
  } as const;
  
export type MessageKey = keyof typeof MESSAGES;

export const LLM_CONSTANTS = {
  DEFAULT_TEMPERATURE: 0.1,
  MODEL_NAME: 'gpt-4o-mini',
  ERROR_MESSAGE: 'Error al procesar la solicitud con el modelo de lenguaje'
} as const;

export type LLMConstants = keyof typeof LLM_CONSTANTS;

export const MEMORY_CONSTANTS = {
  MESSAGE_LIMIT: 10,
  SUMMARY_THRESHOLD: 10,
  OLDEST_MESSAGES_LIMIT: 5,
  ERROR_MESSAGES: {
    TOOL_CALL_ID_REQUIRED: 'tool_call_id es requerido para mensajes de tipo tool',
    ASSISTANT_MESSAGE_NOT_FOUND: 'No se encontró un mensaje del asistente con tool_call_id:'
  }
} as const;

export type MemoryConstants = typeof MEMORY_CONSTANTS;