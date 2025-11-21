import React, { useState, useRef, useEffect } from 'react';

interface InputAreaProps {
  onSend: (text: string) => void;
  isLoading: boolean;
}

export const InputArea: React.FC<InputAreaProps> = ({ onSend, isLoading }) => {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (input.trim() && !isLoading) {
      onSend(input);
      setInput('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [input]);

  return (
    <div className="w-full bg-slate-900/95 border-t border-slate-800 p-4 md:pb-6 sticky bottom-0 z-20">
      <div className="max-w-4xl mx-auto relative">
        <form 
          onSubmit={handleSubmit}
          className="flex items-end gap-2 bg-slate-800/50 border border-slate-700 rounded-2xl p-2 shadow-lg focus-within:ring-2 focus-within:ring-brand-500/50 transition-all duration-300"
        >
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="اسألني عن أي شيء..."
            className="w-full bg-transparent text-white placeholder-slate-400 px-4 py-3 focus:outline-none resize-none max-h-32 overflow-y-auto"
            rows={1}
            disabled={isLoading}
          />
          
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center transition-all duration-200 ${
              !input.trim() || isLoading
                ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
                : 'bg-brand-600 text-white hover:bg-brand-500 hover:shadow-lg hover:shadow-brand-500/30 hover:scale-105 active:scale-95'
            }`}
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin"></i>
            ) : (
              <i className="fa-solid fa-paper-plane text-lg rtl:rotate-180"></i>
            )}
          </button>
        </form>
        
        <div className="text-center mt-2">
           <p className="text-[10px] text-slate-500">يمكن للذكاء الاصطناعي أن يرتكب أخطاء. يرجى التحقق من المعلومات المهمة.</p>
        </div>
      </div>
    </div>
  );
};