import { useState } from 'react';
import { Exercise } from '../../../shared/types/exercise.interface';
import { Message } from '../../../shared/types/chat';
import ExerciseList from '../components/Chat/ExerciseList';

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);


  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: message.trim(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message }),
      });

      if (!response.ok) {
        throw new Error('Error en la respuesta del servidor');
      }

      const data = await response.json();

      // Si la respuesta contiene ejercicios
      if (data.exercises && (
        message.toLowerCase().includes('exercise') || 
        message.toLowerCase().includes('exercises') || 
        message.toLowerCase().includes('routine') ||
        message.toLowerCase().includes('training') 
      )) {
        const exercisesJSX = (
          <div className="mt-4">
            <div className="mb-4">
              <p>{data.response}</p>
            </div>
            <hr />
            <h3 className="mt-4 text-lg font-semibold mb-2">Your saved exercises:</h3>
            <ExerciseList exercises={data.exercises} />
          </div>
        );

        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: exercisesJSX as any },
        ]);
      } else {
        // Si solo contiene una respuesta de texto
        setMessages((prevMessages) => [
          ...prevMessages,
          { role: 'assistant', content: data.response },
        ]);
      }
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          role: 'assistant',
          content: 'Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, intenta de nuevo.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    sendMessage,
  };
};
