import React, { useRef, useEffect } from 'react';
import { Message } from '../types';
import { MessageBubble } from './MessageBubble';

interface ChatListProps {
  messages: Message[];
  isStreaming: boolean;
}

export const ChatList: React.FC<ChatListProps> = ({ messages, isStreaming }) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to bottom whenever messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
      {messages.map((msg) => (
        <MessageBubble key={msg.id} message={msg} />
      ))}
      
      {isStreaming && messages[messages.length - 1]?.role !== 'model' && (
        <div className="flex justify-start w-full animate-pulse">
           <div className="bg-slate-800/50 rounded-2xl rounded-tr-none p-4 flex items-center gap-2">
             <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
             <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
             <div className="w-2 h-2 bg-brand-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
           </div>
        </div>
      )}
      
      <div ref={bottomRef} className="h-4" />
    </div>
  );
};