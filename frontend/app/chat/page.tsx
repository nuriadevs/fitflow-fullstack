'use client';

import React, { useEffect, useRef } from 'react';
import { useProfile } from '../hooks/useProfile'; // Usamos el hook que ya creaste
import { useChat } from '../hooks/useChat'; // Asumiendo que tienes el hook 'useChat' en la carpeta de hooks
import Navbar from '../components/ui/Navbar/Navbar';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import MessageList from '../components/Chat/MessageList';
import ChatInput from '../components/Chat/ChatInput';

export default function ChatPage() {
 const { messages, input, setInput, isLoading, sendMessage } = useChat(); // Desestructuramos el hook useChat
 const { user, isLoading: isUserLoading, logout } = useProfile(); // Desestructuramos el hook useAuth para manejar autenticación

 const messagesEndRef = useRef<HTMLDivElement>(null);

 // Desplazar al final de los mensajes automáticamente cuando cambian
 const scrollToBottom = () => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
 };

 // Usamos useEffect para hacer scroll cuando los mensajes cambian
 useEffect(() => {
  scrollToBottom();
 }, [messages]);

 // Enviar el mensaje al hacer submit
 const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  if (!input.trim() || isLoading) return; // No enviar si está vacío o está cargando

  sendMessage(input); // Llamamos a sendMessage del hook
  setInput(''); // Limpiar el campo de texto
 };

 if (isUserLoading) return <LoadingSpinner />;

 return (
  <div className="min-h-screen bg-gray-100 flex flex-col">
   <Navbar user={user} onLogout={logout} />

   <div className="flex-1 overflow-y-auto p-4 mt-20">
    <MessageList messages={messages} isLoading={isLoading} />
    <div ref={messagesEndRef} />
   </div>

   <ChatInput input={input} setInput={setInput} isLoading={isLoading} handleSubmit={handleSubmit} />
  </div>
 );
}
