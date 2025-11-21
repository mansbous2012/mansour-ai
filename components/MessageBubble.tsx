import React from 'react';
import { Message, Role } from '../types';

interface MessageBubbleProps {
  message: Message;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === Role.USER;

  // Simple text formatter to handle bold and code blocks purely with React/CSS
  const formatContent = (text: string) => {
    const parts = text.split(/(```[\s\S]*?```|\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('```') && part.endsWith('```')) {
        const code = part.slice(3, -3).replace(/^[a-z]*\n/, ''); // Remove language identifier if present
        return (
          <pre key={index} className="bg-slate-950/80 text-brand-200 p-3 rounded-lg my-2 overflow-x-auto text-sm font-mono border border-slate-700/50 dir-ltr text-left">
            <code>{code}</code>
          </pre>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index} className="text-brand-300 font-bold">{part.slice(2, -2)}</strong>;
      }
      return <span key={index} className="whitespace-pre-wrap">{part}</span>;
    });
  };

  return (
    <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] md:max-w-[75%] flex gap-3 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center shadow-lg ${
          isUser ? 'bg-slate-700 text-slate-300' : 'bg-brand-600 text-white'
        }`}>
          <i className={`fa-solid ${isUser ? 'fa-user' : 'fa-robot'} text-sm md:text-base`}></i>
        </div>

        {/* Bubble */}
        <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
          <div className={`px-4 py-3 md:px-5 md:py-4 rounded-2xl shadow-md text-sm md:text-base leading-relaxed ${
            isUser 
              ? 'bg-gradient-to-br from-slate-700 to-slate-600 text-white rounded-tl-none' 
              : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tr-none backdrop-blur-sm'
          }`}>
            {formatContent(message.content)}
          </div>
          <span className="text-[10px] text-slate-500 mt-1 px-1">
            {message.timestamp.toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>

      </div>
    </div>
  );
};