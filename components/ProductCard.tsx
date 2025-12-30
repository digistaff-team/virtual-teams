import React from 'react';
import { AgentTeam } from '../types';
import { Icon } from './Icon';
import { MessageSquareText, ShoppingCart, ArrowRight, CheckCircle2 } from 'lucide-react';

interface ProductCardProps {
  team: AgentTeam;
  onAddToCart: (team: AgentTeam) => void;
  onDemo: (team: AgentTeam) => void;
  onViewDetails: (team: AgentTeam) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ team, onAddToCart, onDemo, onViewDetails }) => {
  return (
    <div className="group relative bg-slate-900 rounded-2xl border border-slate-800 hover:border-indigo-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10 flex flex-col h-full overflow-hidden">
      
      {/* Visual Header */}
      <div 
        className="h-24 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden cursor-pointer"
        onClick={() => onViewDetails(team)}
      >
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[length:16px_16px]"></div>
        <div className="relative p-4 rounded-xl bg-slate-800/80 border border-slate-700 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
           <Icon name={team.iconName} size={32} className="text-indigo-400 group-hover:text-indigo-300" />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <h3 
          className="text-xl font-bold text-white mb-2 cursor-pointer hover:text-indigo-400 transition-colors"
          onClick={() => onViewDetails(team)}
        >
          {team.title}
        </h3>
        <p className="text-slate-400 text-sm mb-4 line-clamp-3 flex-1">{team.description}</p>
        
        {/* Features Preview */}
        <ul className="space-y-2 mb-6">
          {team.features.slice(0, 2).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 size={12} className="text-emerald-500" />
              {feature}
            </li>
          ))}
          {team.features.length > 2 && (
            <li className="text-xs text-slate-600 pl-5">
              + еще {team.features.length - 2} возможностей
            </li>
          )}
        </ul>

        {/* Footer / Actions */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800 gap-4">
          <div className="text-lg font-bold text-white leading-tight">
            {team.price.toLocaleString('ru-RU')} ₽
            <div className="text-xs text-slate-500 font-normal">/мес</div>
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              onClick={() => onViewDetails(team)}
              className="group/btn flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all duration-200 border border-transparent hover:border-slate-600"
              title="Подробнее"
            >
              <ArrowRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
            
            <button 
              onClick={() => onDemo(team)}
              className="group/btn flex items-center justify-center w-10 h-10 rounded-xl bg-slate-800 hover:bg-slate-700 text-indigo-400 hover:text-indigo-300 transition-all duration-200 border border-transparent hover:border-indigo-500/30"
              title="Демо чат"
            >
              <MessageSquareText size={18} />
            </button>

            <button 
              onClick={() => onAddToCart(team)}
              className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 active:scale-95 transition-all duration-200"
              title="В корзину"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
