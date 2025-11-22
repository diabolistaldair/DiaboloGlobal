
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Language } from '../types';
import { sendMessageToCoach } from '../services/geminiService';
import { Send, Bot, Loader2, Sparkles, ExternalLink } from 'lucide-react';
import { TRANSLATIONS } from '../translations';

interface AICoachProps {
  lang: Language;
}

export const AICoach: React.FC<AICoachProps> = ({ lang }) => {
  const t = TRANSLATIONS[lang].coach;
  
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  
  // Reset greeting when language changes
  useEffect(() => {
    const greeting = lang === Language.ES 
      ? '¡Qué onda! Soy DiaboMentor 🎪. Listo para entrenar y resolver tus dudas técnicas. ¿Qué truco quieres aprender hoy?'
      : `Hello! I am DiaboMentor 🎪. Ready to train and solve your technical doubts. What trick do you want to learn today?`;

    setMessages([{
      role: 'model',
      text: greeting,
      timestamp: new Date()
    }]);
  }, [lang]);

  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      role: 'user',
      text: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await sendMessageToCoach(userMsg.text, lang);
      const botMsg: ChatMessage = {
        role: 'model',
        text: response.text,
        timestamp: new Date(),
        sources: response.sources
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.error(error);
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

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] md:h-[600px] max-w-4xl mx-auto bg-slate-800 md:rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
      {/* Header */}
      <div className="bg-slate-900 p-4 border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-gradient-to-br from-brand-500 via-white to-neon-pink p-2 rounded-lg">
            <Bot className="text-slate-900" size={24} />
          </div>
          <div>
            <h2 className="font-bold text-lg text-white">{t.title}</h2>
            <p className="text-xs text-brand-400 flex items-center">
              <Sparkles size={12} className="mr-1" />
              {t.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-800/50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[85%] md:max-w-[70%] p-4 rounded-2xl ${
                msg.role === 'user'
                  ? 'bg-brand-500 text-white rounded-tr-none'
                  : 'bg-slate-700 text-slate-100 rounded-tl-none shadow-md border border-slate-600'
              }`}
            >
              <p className="whitespace-pre-wrap text-sm md:text-base leading-relaxed">{msg.text}</p>
              
              {/* Render Sources if available */}
              {msg.sources && msg.sources.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-slate-600/50">
                      <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Fuentes / Sources:</p>
                      <div className="space-y-1">
                          {msg.sources.map((source, sIdx) => (
                              <a 
                                key={sIdx} 
                                href={source.uri} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center text-xs text-neon-cyan hover:underline truncate"
                              >
                                  <ExternalLink size={10} className="mr-1 flex-shrink-0" />
                                  <span className="truncate">{source.title}</span>
                              </a>
                          ))}
                      </div>
                  </div>
              )}

              <span className="text-[10px] opacity-50 block mt-2 text-right">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 p-4 rounded-2xl rounded-tl-none flex items-center space-x-2 border border-slate-600">
              <Loader2 className="animate-spin text-brand-400" size={16} />
              <span className="text-sm text-slate-400">{t.loading}</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-slate-900 border-t border-slate-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.placeholder}
            className="flex-1 bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent placeholder-slate-500 transition-all"
            disabled={isLoading}
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="bg-brand-500 hover:bg-brand-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};
