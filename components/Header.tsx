import React from 'react';
import { CartItem } from '../types';
import { ShoppingCart } from 'lucide-react';

interface HeaderProps {
  cartItems: CartItem[];
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({ cartItems, onOpenCart }) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img 
            src="/logo.png" 
            alt="DigiStaff Logo" 
            className="h-10 w-10 object-contain"
          />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
            DigiStaff Team
          </span>
        </div>

        <nav className="hidden md:flex gap-6 text-sm font-medium text-slate-400">
          <a href="#" className="hover:text-white transition-colors">Решения</a>
          <a href="#" className="hover:text-white transition-colors">Технологии</a>
          <a href="#" className="hover:text-white transition-colors">Цены</a>
          <a href="#" className="hover:text-white transition-colors">О нас</a>
        </nav>

        <button 
          onClick={onOpenCart}
          className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-full transition-all"
        >
          <ShoppingCart size={24} />
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-500 text-[10px] font-bold text-white animate-pulse">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
};
