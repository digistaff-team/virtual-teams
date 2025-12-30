import React from 'react';
import { X, Sparkles, ArrowRight } from 'lucide-react';

interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowItWorksModal: React.FC<HowItWorksModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSelectTeam = () => {
    onClose();
    // Smooth scroll to catalog section with a slight delay to allow modal to close
    setTimeout(() => {
      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-[80px] pointer-events-none"></div>

        <div className="p-6 border-b border-slate-800 flex items-center justify-between relative z-10">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Sparkles className="text-indigo-400" size={20} />
            Как это работает?
          </h2>
          <button 
            onClick={onClose}
            className="text-slate-400 hover:text-white transition-colors p-1 hover:bg-slate-800 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-4 text-slate-300 leading-relaxed text-sm md:text-base relative z-10">
          <p>
            Команды цифровых сотрудников работают над решением задач развития вашего бизнеса, почти как реальные сотрудники.
          </p>
          <p>
            Чтобы их работа приносила постоянный положительный результат, мы настраиваем их с учётом реалий и специфики вашего бизнеса.
          </p>
          <p>
            После настройки мы поддерживаем их работу, повышая качество и точность их действий, меняя, если нужно, содержание выполняемых операций и функций.
          </p>
          <div className="bg-indigo-900/20 border border-indigo-500/20 p-4 rounded-xl text-indigo-200 text-sm mt-6">
            Оплата работы команды AI-агентов включает в себя все тарифные платежи и стоимость токенов, расходуемых на работу нейросети. Работаем по договору, с НДС.
          </div>
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900/50 flex justify-end">
          <button 
            onClick={handleSelectTeam}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-colors font-semibold shadow-lg shadow-indigo-500/20 flex items-center gap-2"
          >
            <span>Выбрать команду</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};