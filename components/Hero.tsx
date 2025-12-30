import React from 'react';
import { Icon } from './Icon';

interface HeroProps {
  onOpenHowItWorks: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenHowItWorks }) => {
  return (
    <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px] -z-10"></div>
      
      <div className="container mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 text-indigo-400 text-xs font-medium mb-6">
          <Icon name="Sparkles" size={14} />
          <span>Работает на модели Gemini 3.0</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white mb-6">
          Виртуальный интеллект <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
            для реального бизнеса
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Наймите автономные команды AI-агентов для решения специализированных задач: от финансов до юридической поддержки. Масштабируйте бизнес без раздувания штата.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all transform hover:scale-105"
          >
            Выбрать команду
          </button>
          <button 
            onClick={onOpenHowItWorks}
            className="px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold rounded-xl transition-all border border-slate-700"
          >
            Как это работает?
          </button>
        </div>
      </div>
    </section>
  );
};