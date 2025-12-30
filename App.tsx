import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { DemoChat } from './components/DemoChat';
import { TeamDetails } from './components/TeamDetails';
import { HowItWorksModal } from './components/HowItWorksModal';
import { AGENT_TEAMS } from './constants';
import { AgentTeam, CartItem } from './types';

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [selectedDemoTeam, setSelectedDemoTeam] = useState<AgentTeam | null>(null);
  
  // Navigation State
  const [view, setView] = useState<'home' | 'details'>('home');
  const [activeTeam, setActiveTeam] = useState<AgentTeam | null>(null);

  const addToCart = (team: AgentTeam) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === team.id);
      if (existing) {
        return prev.map(item => 
          item.id === team.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...team, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleViewDetails = (team: AgentTeam) => {
    setActiveTeam(team);
    setView('details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    setView('home');
    setActiveTeam(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Header 
        cartItems={cartItems} 
        onOpenCart={() => setIsCartOpen(true)} 
      />

      <main className="flex-1">
        {view === 'home' ? (
          <>
            <Hero onOpenHowItWorks={() => setIsHowItWorksOpen(true)} />
            {/* Catalog Section */}
            <section className="container mx-auto px-4 pb-24" id="catalog">
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-3xl font-bold text-white">Доступные команды</h2>
                <div className="text-sm text-slate-400 hidden sm:block">
                  Показано {AGENT_TEAMS.length} спецподразделений
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {AGENT_TEAMS.map(team => (
                  <ProductCard 
                    key={team.id}
                    team={team}
                    onAddToCart={addToCart}
                    onDemo={setSelectedDemoTeam}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
            </section>
          </>
        ) : (
          activeTeam && (
            <TeamDetails 
              team={activeTeam}
              onBack={handleBackToHome}
              onAddToCart={addToCart}
              onDemo={setSelectedDemoTeam}
            />
          )
        )}
      </main>

      <footer className="bg-slate-900 py-12 border-t border-slate-800">
        <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} DigiStaff. Все права защищены.</p>
          <div className="mt-4 flex justify-center gap-6">
            <a href="#" className="hover:text-indigo-400">Приватность</a>
            <a href="#" className="hover:text-indigo-400">Условия</a>
            <a href="#" className="hover:text-indigo-400">Контакты</a>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onRemoveItem={removeFromCart}
      />

      {selectedDemoTeam && (
        <DemoChat 
          team={selectedDemoTeam}
          isOpen={!!selectedDemoTeam}
          onClose={() => setSelectedDemoTeam(null)}
        />
      )}

      <HowItWorksModal 
        isOpen={isHowItWorksOpen}
        onClose={() => setIsHowItWorksOpen(false)}
      />
    </div>
  );
};

export default App;