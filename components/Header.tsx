import React from 'react';

interface HeaderProps {
  onClear: () => void;
  hasMessages: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onClear, hasMessages }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md z-20 flex items-center justify-between px-4 md:px-8 sticky top-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
          <i className="fa-solid fa-robot text-white text-xl"></i>
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-wide">رفيق</h1>
          <p className="text-xs text-brand-400 font-medium">المساعد الذكي</p>
        </div>
      </div>

      {hasMessages && (
        <button
          onClick={onClear}
          className="text-slate-400 hover:text-red-400 transition-colors duration-200 p-2 rounded-lg hover:bg-slate-800"
          title="بدء محادثة جديدة"
        >
          <i className="fa-solid fa-trash-can text-lg"></i>
        </button>
      )}
    </header>
  );
};