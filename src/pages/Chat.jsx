import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, ArrowLeft, Sparkles, Dumbbell, Utensils, Calendar, TrendingUp, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Chat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! Sou seu assistente de treino 💪\n\nComo posso ajudar você hoje?',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        { icon: Dumbbell, label: 'Criar treino', action: 'Quero criar um treino personalizado' },
        { icon: Utensils, label: 'Plano alimentar', action: 'Me sugira um plano alimentar' },
        { icon: TrendingUp, label: 'Ver progresso', action: 'Como está meu progresso?' },
        { icon: Calendar, label: 'Agendar treino', action: 'Quando devo treinar amanhã?' },
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (input) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('treino') || lowerInput.includes('exercício')) {
      return {
        content: 'Posso ajudar você a criar um treino personalizado! Para isso, preciso saber:\n\n• Qual seu objetivo? (hipertrofia, emagrecimento, força)\n• Quantos dias por semana pode treinar?\n• Tem alguma limitação física?\n\nMe conte mais sobre você! 🏋️',
        suggestions: [
          { icon: Dumbbell, label: 'Hipertrofia', action: 'Quero focar em hipertrofia' },
          { icon: Flame, label: 'Emagrecer', action: 'Quero emagrecer' },
          { icon: Zap, label: 'Força', action: 'Quero ganhar força' },
        ]
      };
    }

    if (lowerInput.includes('dieta') || lowerInput.includes('alimentação') || lowerInput.includes('comida')) {
      return {
        content: 'Nutrição é fundamental para seus resultados! 💪\n\nPara criar um plano alimentar ideal, me diga:\n\n• Qual seu objetivo? (ganho de massa, perda de gordura, manutenção)\n• Tem alguma restrição alimentar?\n• Quantas refeições prefere fazer por dia?\n\nVamos montar sua dieta juntos! 🥗',
        suggestions: [
          { icon: Utensils, label: 'Ganho de massa', action: 'Quero ganhar massa muscular' },
          { icon: Flame, label: 'Perder gordura', action: 'Quero perder gordura' },
          { icon: Scale, label: 'Manutenção', action: 'Quero manter o peso' },
        ]
      };
    }

    if (lowerInput.includes('progresso') || lowerInput.includes('resultado')) {
      return {
        content: 'Seu progresso está ótimo! 📈\n\nNesta semana você:\n• Completou 4 treinos\n• Queimou ~2.400 calorias\n• Manteve 85% de consistência\n\nContinue assim! Quer ver um gráfico detalhado?',
        suggestions: [
          { icon: TrendingUp, label: 'Ver gráficos', action: 'Mostrar meus gráficos' },
          { icon: Calendar, label: 'Histórico', action: 'Ver histórico completo' },
        ]
      };
    }

    if (lowerInput.includes('oi') || lowerInput.includes('olá') || lowerInput.includes('ola') || lowerInput.includes('eai')) {
      return {
        content: 'Oi! Tudo bem? 😊\n\nEstou aqui para ajudar com:\n• Criação de treinos personalizados\n• Dicas de nutrição\n• Acompanhamento de progresso\n• Motivação diária\n\nO que você precisa hoje?',
        suggestions: [
          { icon: Dumbbell, label: 'Novo treino', action: 'Criar novo treino' },
          { icon: Utensils, label: 'Dieta', action: 'Ajuda com dieta' },
          { icon: Trophy, label: 'Motivação', action: 'Me motive!' },
        ]
      };
    }

    return {
      content: 'Entendi! 💪\n\nPara te dar a melhor resposta, posso sugerir:\n\n1. **Criar um treino** - Montar um plano personalizado\n2. **Analisar dieta** - Verificar sua alimentação\n3. **Ver estatísticas** - Acompanhar seu progresso\n\nQual dessas opções te interessa mais?',
      suggestions: [
        { icon: Dumbbell, label: 'Criar treino', action: 'Quero criar um treino' },
        { icon: Utensils, label: 'Analisar dieta', action: 'Quero analisar minha dieta' },
        { icon: TrendingUp, label: 'Estatísticas', action: 'Ver minhas estatísticas' },
      ]
    };
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        content: response.content,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        suggestions: response.suggestions
      }]);
      setIsTyping(false);
    }, 1000);
  };

  const handleSuggestion = (action) => {
    setInputValue(action);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <div className="min-h-screen bg-gym-dark text-white pb-24 flex flex-col">
      {/* Header */}
      <div className="bg-gym-card border-b border-white/5 p-6 pt-12 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="bg-gym-orange p-2 rounded-xl">
              <Bot size={24} className="text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Assistente Gym AI</h1>
              <p className="text-xs text-gym-muted flex items-center gap-1">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Online agora
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'bot' ? 'bg-gym-orange' : 'bg-white/10'
              }`}>
                {message.type === 'bot' ? <Bot size={20} /> : <User size={20} />}
              </div>
              <div className={`max-w-[80%] space-y-2`}>
                <div className={`p-4 rounded-2xl text-sm ${
                  message.type === 'bot'
                    ? 'bg-gym-card text-white border border-white/5'
                    : 'bg-gym-orange text-white'
                }`}>
                  <div className="whitespace-pre-line leading-relaxed">{message.content}</div>
                </div>
                <p className={`text-[10px] text-gym-muted ${message.type === 'user' ? 'text-right' : ''}`}>
                  {message.time}
                </p>

                {/* Sugestões */}
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestion(suggestion.action)}
                        className="flex items-center gap-2 px-4 py-2 bg-gym-card border border-white/10 rounded-full text-xs hover:border-gym-orange transition-colors"
                      >
                        <suggestion.icon size={14} className="text-gym-orange" />
                        <span>{suggestion.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gym-orange flex items-center justify-center">
              <Bot size={20} />
            </div>
            <div className="bg-gym-card border border-white/5 p-4 rounded-2xl flex items-center gap-1">
              <span className="w-2 h-2 bg-gym-muted rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gym-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
              <span className="w-2 h-2 bg-gym-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="bg-gym-card border-t border-white/5 p-4 sticky bottom-20">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Digite sua mensagem..."
            className="flex-1 bg-gym-dark border border-white/10 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:border-gym-orange transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={!inputValue.trim()}
            className="bg-gym-orange p-4 rounded-2xl hover:bg-gym-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-[10px] text-gym-muted text-center mt-3 flex items-center justify-center gap-1">
          <Sparkles size={10} />
          Powered by Gym AI
        </p>
      </div>

      <Navbar />
    </div>
  );
};

// Ícones adicionais
const Flame = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>
  </svg>
);

const Scale = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/>
    <path d="M7 21h10"/>
    <path d="M12 21v-9"/>
    <path d="M12 11V3"/>
  </svg>
);

const Trophy = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
    <path d="M4 22h16"/>
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
  </svg>
);

export default Chat;