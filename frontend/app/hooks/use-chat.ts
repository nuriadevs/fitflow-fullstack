
import { useState } from 'react';
import { Message, MessagePart } from "@/types/chat";
import type { ChatStatus } from 'ai'; 

export const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<ChatStatus>('ready');

  const generateId = () => `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    const userMessageId = generateId();
    const userMessage: Message = {
      id: userMessageId,
      role: 'user',
      parts: [
        {
          type: 'text',
          text: message.trim(),
        }
      ],
      createdAt: new Date(),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsLoading(true);
    setStatus('submitted'); 

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

      setStatus('streaming');

      const data = await response.json();
      const assistantMessageId = generateId();
      const parts: MessagePart[] = [];

      if (data.sources && Array.isArray(data.sources)) {
        data.sources.forEach((source: { url: string; title?: string }) => {
          parts.push({
            type: 'source-url',
            url: source.url,
            title: source.title,
          });
        });
      }

      if (data.exercises && Array.isArray(data.exercises) && data.exercises.length > 0) {
        if (data.response) {
          parts.push({
            type: 'text',
            text: data.response,
          });
        }

        parts.push({
          type: 'exercise-list',
          exercises: data.exercises,
        });
      } else {
        parts.push({
          type: 'text',
          text: data.response || 'No response',
        });
      }

      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        parts,
        createdAt: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      setStatus('ready');
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
      
      const errorMessageId = generateId();
      const errorMessage: Message = {
        id: errorMessageId,
        role: 'assistant',
        parts: [
          {
            type: 'text',
            text: 'Sorry, something went wrong while processing your message. Please try again.',
          }
        ],
        createdAt: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, errorMessage]);
      setStatus('error');
    } finally {
      setIsLoading(false);
    }
  };

  const regenerate = async () => {
    if (messages.length === 0) return;
    
    const lastUserMessageIndex = messages.findLastIndex(msg => msg.role === 'user');
    if (lastUserMessageIndex === -1) return;

    const lastUserMessage = messages[lastUserMessageIndex];
    const userMessageText = lastUserMessage.parts.find(part => part.type === 'text');
    
    if (!userMessageText || userMessageText.type !== 'text') return;

    setMessages(messages.slice(0, lastUserMessageIndex + 1));
    
    await sendMessage(userMessageText.text);
  };

  return {
    messages,
    input,
    setInput,
    isLoading,
    status,
    sendMessage,
    regenerate,
  };
};