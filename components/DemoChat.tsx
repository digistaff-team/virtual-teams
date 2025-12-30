import React, { useState, useEffect, useRef } from 'react';
import { AgentTeam, ChatMessage } from '../types';
import { createChatSession, StreamGenerator } from '../services/geminiService';
import { GenerateContentResponse } from "@google/genai";
import { Icon } from './Icon';
import { Send, X, Loader2 } from 'lucide-react';

interface DemoChatProps {
  team: AgentTeam;
  isOpen: boolean;
  onClose: () => void;
}

export const DemoChat: React.FC<DemoChatProps> = ({ team, isOpen, onClose }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<any>(null); // Store the chat session
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize chat when modal opens or team changes
  useEffect(() => {
    if (isOpen && team) {
      setMessages([{
        role: 'model',
        text: `Здравствуйте! Я представляю команду "${team.title}". Как мы можем помочь оптимизировать ваш бизнес сегодня?`
      }]);
      try {
        chatSessionRef.current = createChatSession(team.systemInstruction);
      } catch (error) {
        console.error("Failed to init chat", error);
        setMessages(prev => [...prev, { role: 'model', text: "Ошибка подключения к нейросети. Проверьте API ключ." }]);
      }
    }
  }, [isOpen, team]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      const resultStream: StreamGenerator = await chatSessionRef.current.sendMessageStream({ message: userMsg });
      
      let fullResponse = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]); // Add placeholder

      for await (const chunk of resultStream) {
        const chunkText = (chunk as GenerateContentResponse).text || '';
        fullResponse += chunkText;
        
        // Update the last message with the accumulating text
        setMessages(prev => {
          const newHistory = [...prev];
          newHistory[newHistory.length - 1] = { role: 'model', text: fullResponse };
          return newHistory;
        });
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Извините, произошла ошибка при обработке запроса." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl h-[600px] rounded-2xl flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        
        {/* Header */}
        <div className="bg-slate-800 p-4 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600/20 rounded-lg border border-indigo-500/30">
              <Icon name={team.iconName} className="text-indigo-400" />
            </div>
            <div>
              <h3 className="font-bold text-white">{team.title}</h3>
              <p className="text-xs text-green-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                AI Online
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-full transition-colors text-slate-400 hover:text-white">
            <X size={20} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-900">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div 
                className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-slate-800 border-t border-slate-700">
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Спросите команду о чем-нибудь..."
              disabled={isLoading}
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
            />
            <button
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50 disabled:hover:bg-indigo-600 transition-colors"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
            </button>
          </div>
          <p className="text-[10px] text-slate-500 mt-2 text-center">
            AI может допускать ошибки. Проверяйте важную информацию.
          </p>
        </div>
      </div>
    </div>
  );
};
