import React from 'react';

interface WelcomeScreenProps {
  onSuggestionClick: (text: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onSuggestionClick }) => {
  const suggestions = [
    { icon: 'fa-lightbulb', text: 'أعطني أفكاراً لوجبة عشاء صحية وسريعة' },
    { icon: 'fa-code', text: 'اكتب كود React لإنشاء قائمة مهام' },
    { icon: 'fa-pen-nib', text: 'اكتب رسالة بريد إلكتروني رسمية لطلب وظيفة' },
    { icon: 'fa-globe', text: 'ما هي أهم المعالم السياحية في مصر؟' },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full px-6 text-center z-10 overflow-y-auto">
      <div className="mb-8 relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-600 to-purple-600 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
        <div className="w-24 h-24 bg-slate-800 rounded-full flex items-center justify-center relative ring-4 ring-slate-900 shadow-2xl animate-float">
          <i className="fa-solid fa-robot text-5xl bg-gradient-to-br from-brand-400 to-brand-600 text-transparent bg-clip-text"></i>
        </div>
      </div>

      <h2 className="text-3xl font-bold text-white mb-2">أهلاً بك في رفيق</h2>
      <p className="text-slate-400 max-w-md mb-10 text-lg">
        أنا هنا لمساعدتك في أي شيء تحتاجه. من الكتابة والترجمة إلى البرمجة والإجابة على الأسئلة المعقدة.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
        {suggestions.map((sug, idx) => (
          <button
            key={idx}
            onClick={() => onSuggestionClick(sug.text)}
            className="flex items-center gap-4 p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-brand-500/50 rounded-xl text-right transition-all duration-200 group hover:shadow-lg hover:shadow-brand-900/20 active:scale-[0.98]"
          >
            <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center group-hover:bg-brand-500/20 group-hover:text-brand-400 transition-colors">
              <i className={`fa-solid ${sug.icon}`}></i>
            </div>
            <span className="text-slate-300 group-hover:text-white font-medium text-sm">
              {sug.text}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};