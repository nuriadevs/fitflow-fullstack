 export interface Exercise {
    name: string;
    muscleGroup: string;
    equipment: string;
    difficulty: string;
    description: string;
  }
  
  export interface ChatResponse {
    response: string;
    exercises?: Exercise[];
  }

  export interface Message {
    role: 'user' | 'assistant'; // El rol del usuario o del asistente
    content: string ; // Puede ser texto o un JSX.Element (para renderizar componentes como los ejercicios)
    exercises?: Exercise[]; // Ejercicios (opcional)
  }
  
  /*
  export type AIMessage = {
    role: 'user' | 'assistant' | 'tool';
    content?: string;
    tool_call_id?: string;
    tool_calls?: {
      id: string;
      type: 'function';
      function: {
        name: string;
        arguments: string;
      };
    }[];
    metadata?: {
      summary?: string;
    };
  }
    */