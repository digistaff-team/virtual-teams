import React from 'react';
import { AgentTeam } from '../types';
import { Icon } from './Icon';
import { ArrowLeft, CheckCircle2, ShoppingCart, MessageSquareText } from 'lucide-react';

interface TeamDetailsProps {
  team: AgentTeam;
  onBack: () => void;
  onAddToCart: (team: AgentTeam) => void;
  onDemo: (team: AgentTeam) => void;
}

export const TeamDetails: React.FC<TeamDetailsProps> = ({ team, onBack, onAddToCart, onDemo }) => {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-300">
      
      {/* Navigation */}
      <div className="container mx-auto px-4 py-6">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span>Назад к каталогу</span>
        </button>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 mb-16">
        <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row gap-8 items-start relative z-10">
            <div className="p-6 bg-slate-800 rounded-2xl border border-slate-700 shadow-xl">
              <Icon name={team.iconName} size={64} className="text-indigo-400" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{team.title}</h1>
              <p className="text-xl text-slate-300 leading-relaxed max-w-3xl mb-8">
                {team.description}
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={() => onAddToCart(team)}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2"
                >
                  <ShoppingCart size={20} />
                  <span>Нанять за {team.price.toLocaleString('ru-RU')} ₽/мес</span>
                </button>
                <button 
                  onClick={() => onDemo(team)}
                  className="px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-xl border border-slate-700 transition-all flex items-center gap-2"
                >
                  <MessageSquareText size={20} />
                  <span>Интервью с командой</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Details Grid */}
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Composition */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Icon name="Users" className="text-indigo-400" />
              Состав команды
            </h2>
            <div className="space-y-4">
              {team.composition.map((role, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 p-5 rounded-xl hover:border-indigo-500/30 transition-colors flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-indigo-900/30 flex items-center justify-center shrink-0 text-indigo-400 font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-lg">{role.title}</h3>
                    <p className="text-slate-400 text-sm mt-1">{role.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Workflow / Capabilities */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Icon name="Cpu" className="text-indigo-400" />
              Как мы работаем
            </h2>
            
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-8">
              <div className="relative border-l-2 border-slate-800 ml-3 space-y-10">
                {team.workflow.map((step, idx) => (
                  <div key={idx} className="relative pl-8">
                    <span className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-slate-700 border-2 border-slate-900 ring-2 ring-slate-800"></span>
                    <h4 className="text-indigo-400 font-medium text-sm mb-1 uppercase tracking-wider">Этап {idx + 1}</h4>
                    <p className="text-slate-200 text-lg">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-white mb-4">Ключевые возможности</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {team.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-slate-900/50 p-3 rounded-lg border border-slate-800/50">
                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

    </div>
  );
};
