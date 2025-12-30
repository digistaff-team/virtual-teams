import React from 'react';
import { CartItem } from '../types';
import { Icon } from './Icon';
import { X, Trash2, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (id: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cartItems, onRemoveItem }) => {
  const total = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-slate-900 border-l border-slate-800 shadow-2xl z-50 transform transition-transform duration-300 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Корзина команд</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 gap-4">
              <Icon name="Bot" size={48} className="text-slate-700" />
              <p>Ваша корзина пуста</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 flex gap-4">
                 <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center shrink-0">
                    <Icon name={item.iconName} className="text-indigo-400" size={20} />
                 </div>
                 <div className="flex-1">
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-slate-400 mt-1">
                      {item.price.toLocaleString('ru-RU')} ₽/мес x {item.quantity}
                    </p>
                 </div>
                 <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="text-slate-500 hover:text-red-400 transition-colors"
                >
                   <Trash2 size={18} />
                 </button>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-slate-800 bg-slate-900">
          <div className="flex justify-between items-center mb-6">
            <span className="text-slate-400">Итого в месяц:</span>
            <span className="text-2xl font-bold text-white">{total.toLocaleString('ru-RU')} ₽</span>
          </div>
          <button 
            disabled={cartItems.length === 0}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            <span>Оформить подписку</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </>
  );
};