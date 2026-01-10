import React, { useState, useRef, useEffect } from 'react';
import { streamGeminiResponse } from '../services/geminiService';
import { ChatMessage } from '../types';

export const GeminiChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput('');
    const newHistory = [...messages, { role: 'user', text: userText } as ChatMessage];
    setMessages(newHistory);
    setIsTyping(true);

    // Placeholder for stream
    setMessages(prev => [...prev, { role: 'model', text: '', isLoading: true }]);

    let fullResponse = '';
    
    await streamGeminiResponse(
      newHistory.map(m => ({ role: m.role, text: m.text })),
      (chunk) => {
        fullResponse += chunk;
        setMessages(prev => {
          const last = prev[prev.length - 1];
          if (last.role === 'model') {
            return [...prev.slice(0, -1), { role: 'model', text: fullResponse, isLoading: false }];
          }
          return prev;
        });
      }
    );

    setIsTyping(false);
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 p-3 rounded-full shadow-lg border border-neutral-700 transition-all z-50 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:scale-110 transition-transform"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
        <span className="sr-only">Ask AI</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 w-80 sm:w-96 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden max-h-[500px]">
      <div className="flex justify-between items-center p-3 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur">
        <h3 className="text-neutral-400 uppercase tracking-widest">Ask AI about Me</h3>
        <button onClick={() => setIsOpen(false)} className="text-neutral-500 hover:text-neutral-300">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[300px] bg-neutral-900">
        {messages.length === 0 && (
          <p className="text-neutral-600 text-center mt-10">
            Ask me about my experience, skills, or projects.
          </p>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div 
              className={`max-w-[85%] rounded-lg p-3 leading-relaxed ${
                msg.role === 'user' 
                  ? 'bg-neutral-800 text-neutral-200' 
                  : 'bg-transparent text-neutral-300 pl-0'
              }`}
            >
              {msg.text}
              {msg.isLoading && <span className="animate-pulse ml-1">...</span>}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-3 border-t border-neutral-800 bg-neutral-900">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="w-full bg-neutral-800 text-neutral-200 rounded-md py-2 px-3 focus:outline-none focus:ring-1 focus:ring-neutral-600 placeholder:text-neutral-600"
            disabled={isTyping}
          />
        </div>
      </form>
    </div>
  );
};