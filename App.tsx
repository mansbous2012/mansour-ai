import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Message, Role } from './types';
import { ChatService } from './services/chatService';
import { Header } from './components/Header';
import { ChatList } from './components/ChatList';
import { InputArea } from './components/InputArea';
import { WelcomeScreen } from './components/WelcomeScreen';

const App: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize chat service ref to persist session
  const chatServiceRef = useRef<ChatService | null>(null);
  
  useEffect(() => {
    chatServiceRef.current = new ChatService();
  }, []);

  const handleSendMessage = useCallback(async (text: string) => {
    if (!text.trim() || !chatServiceRef.current) return;

    // Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: Role.USER,
      content: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);
    setIsStreaming(true);
    setError(null);

    try {
      // Create a placeholder for AI response
      const aiMsgId = (Date.now() + 1).toString();
      const aiPlaceholder: Message = {
        id: aiMsgId,
        role: Role.MODEL,
        content: '',
        timestamp: new Date(),
        isStreaming: true,
      };
      
      setMessages((prev) => [...prev, aiPlaceholder]);

      // Stream response
      const stream = await chatServiceRef.current.sendMessageStream(text);
      
      let accumulatedText = '';
      
      for await (const chunk of stream) {
        const chunkText = chunk.text;
        if (chunkText) {
          accumulatedText += chunkText;
          setMessages((prev) => 
            prev.map((msg) => 
              msg.id === aiMsgId 
                ? { ...msg, content: accumulatedText } 
                : msg
            )
          );
        }
      }

      // Finalize message
      setMessages((prev) => 
        prev.map((msg) => 
          msg.id === aiMsgId 
            ? { ...msg, isStreaming: false } 
            : msg
        )
      );

    } catch (err: any) {
      console.error("Error sending message:", err);
      setError("حدث خطأ أثناء الاتصال بالخادم. يرجى المحاولة مرة أخرى.");
      // Remove the empty placeholder if it failed immediately
      setMessages((prev) => prev.filter(m => m.content !== '' || m.role !== Role.MODEL));
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  }, []);

  const handleClearChat = () => {
    setMessages([]);
    chatServiceRef.current = new ChatService(); // Reset session
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 text-slate-100 font-sans overflow-hidden selection:bg-brand-500 selection:text-white">
      <Header onClear={handleClearChat} hasMessages={messages.length > 0} />
      
      <main className="flex-1 overflow-hidden relative flex flex-col">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 pointer-events-none"></div>
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-brand-600/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse-slow pointer-events-none"></div>

        {messages.length === 0 ? (
          <WelcomeScreen onSuggestionClick={handleSendMessage} />
        ) : (
          <ChatList messages={messages} isStreaming={isStreaming} />
        )}
      </main>

      <InputArea onSend={handleSendMessage} isLoading={isLoading && !isStreaming} />
    </div>
  );
};

export default App;