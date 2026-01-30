
import { Exercise } from '@/types/exercise.interface';

export type MessageRole = 'user' | 'assistant';

export type MessagePartType = 'text' | 'reasoning' | 'source-url' | 'exercise-list';

export interface TextPart {
  type: 'text';
  text: string;
}

export interface ReasoningPart {
  type: 'reasoning';
  text: string;
}

export interface SourceUrlPart {
  type: 'source-url';
  url: string;
  title?: string;
}

export interface ExerciseListPart {
  type: 'exercise-list';
  exercises: Exercise[];
  description?: string;
}

export type MessagePart = TextPart | ReasoningPart | SourceUrlPart | ExerciseListPart;

export interface Message {
  id: string;
  role: MessageRole;
  parts: MessagePart[];
  createdAt?: Date;
}

export interface ChatResponse {
  response: string;
  exercises?: Exercise[];
  sources?: Array<{ url: string; title?: string }>;
}

export interface ChatState {
  messages: Message[];
  input: string;
  isLoading: boolean;
}