import OpenAI from 'openai'

// Definición del tipo de mensaje de la IA
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

// Definición del tipo de herramienta de la IA
export interface ToolFn<A = any, T = any> {
  (input: { userMessage: string; toolArgs: A }): Promise<T>
}


