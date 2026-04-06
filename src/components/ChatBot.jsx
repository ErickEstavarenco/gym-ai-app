import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, X, Sparkles, Dumbbell, Utensils, Calendar, TrendingUp, Zap, CheckCircle, Flame, Loader2, Heart, Activity } from 'lucide-react';
import { useAI } from '../hooks/useAI';
import { useWorkout } from '../context/WorkoutContext';
import { useAuth } from '../context/AuthContext';

const ChatBot = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: 'Olá! 💪 Sou seu assistente pessoal Gym AI!\n\nComo posso ajudar você hoje?',
      suggestions: [
        { icon: Dumbbell, label: 'Criar treino', action: 'criar_treino' },
        { icon: Utensils, label: 'Plano alimentar', action: 'criar_dieta' },
        { icon: Sparkles, label: 'Plano completo', action: 'gerar_plano_completo' },
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const messagesEndRef = useRef(null);
  const { sendMessage, generateNewWorkout, generateNewDiet, savePlan, loading: aiLoading } = useAI();
  const { saveWorkout, saveDiet, updateUserProfile } = useWorkout();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (userInput) => {
    if (!userInput.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: userInput,
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await sendMessage(userInput);

      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: response,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        suggestions: generateSuggestions(userInput)
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: '❌ Desculpe, ocorreu um erro. Tente novamente.',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const collectUserInfo = async (answers) => {
    const profile = {
      objective: answers.objective || 'hipertrofia',
      level: answers.level || 'intermediario',
      daysPerWeek: answers.daysPerWeek || 4,
      sessionDuration: answers.sessionDuration || 60,
      equipment: answers.equipment || [],
      restrictions: answers.restrictions || [],
      preferences: answers.preferences || {},
    };

    setUserProfile(profile);
    updateUserProfile(profile);

    return profile;
  };

  const handleGenerateWorkout = async () => {
    setIsTyping(true);

    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type: 'bot',
      content: '🏋️ Criando seu treino personalizado...\n\nIsso pode levar alguns segundos.',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }]);

    try {
      const profile = userProfile || {
        objective: 'hipertrofia',
        level: 'intermediario',
        daysPerWeek: 4,
      };

      const generatedWorkout = await generateNewWorkout(profile);

      if (user?.id) {
        saveWorkout(generatedWorkout);
        await savePlan(user.id, generatedWorkout, null);
      } else {
        saveWorkout(generatedWorkout);
      }

      const numDays = generatedWorkout.days?.length || 0;

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        content: `✅ Treino gerado com sucesso!\n\n📋 ${generatedWorkout.title}\n📅 ${numDays} dias de treino\n🎯 Foco: ${generatedWorkout.objective}\n\nSeu treino foi salvo! Vá para a tela de Treino para ver os detalhes.`,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          { icon: CheckCircle, label: 'Ver treino', action: 'ver_treino' },
          { icon: Utensils, label: 'Criar dieta', action: 'criar_dieta' },
        ]
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        content: '❌ Erro ao gerar treino. Tente novamente.',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGenerateDiet = async () => {
    setIsTyping(true);

    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type: 'bot',
      content: '🥗 Criando seu plano alimentar...\n\nAguarde alguns segundos.',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }]);

    try {
      const profile = userProfile || {
        objective: 'ganho_massa',
        dailyCalories: 2500,
        mealsPerDay: 5,
      };

      const generatedDiet = await generateNewDiet(profile);

      if (user?.id) {
        saveDiet(generatedDiet);
        await savePlan(user.id, null, generatedDiet);
      } else {
        saveDiet(generatedDiet);
      }

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        content: `✅ Plano alimentar gerado!\n\n📋 ${generatedDiet.title}\n🔥 ${generatedDiet.dailyCalories} calorias/dia\n💪 Proteínas: ${generatedDiet.macros.protein}g\n🍞 Carboidratos: ${generatedDiet.macros.carbs}g\n🥑 Gorduras: ${generatedDiet.macros.fat}g\n\nSua dieta foi salva! Vá para a tela de Dieta para ver os detalhes.`,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          { icon: CheckCircle, label: 'Ver dieta', action: 'ver_dieta' },
          { icon: Dumbbell, label: 'Criar treino', action: 'criar_treino' },
        ]
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        content: '❌ Erro ao gerar dieta. Tente novamente.',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleGenerateFullPlan = async () => {
    setIsTyping(true);

    setMessages(prev => [...prev, {
      id: prev.length + 1,
      type: 'bot',
      content: '✨ Gerando seu plano COMPLETO (treino + dieta)...\n\nIsso pode levar alguns segundos.',
      time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }]);

    try {
      const profile = userProfile || {
        objective: 'hipertrofia',
        level: 'intermediario',
        daysPerWeek: 4,
        dailyCalories: 2500,
        mealsPerDay: 5,
      };

      const [generatedWorkout, generatedDiet] = await Promise.all([
        generateNewWorkout(profile),
        generateNewDiet(profile)
      ]);

      if (user?.id) {
        saveWorkout(generatedWorkout);
        saveDiet(generatedDiet);
        await savePlan(user.id, generatedWorkout, generatedDiet);
      } else {
        saveWorkout(generatedWorkout);
        saveDiet(generatedDiet);
      }

      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        content: `🎉 Plano completo gerado!\n\n✅ Treino: ${generatedWorkout.days?.length || 0} dias\n✅ Dieta: ${generatedDiet.dailyCalories} calorias/dia\n\nSeus planos foram salvos! Comece agora mesmo!`,
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          { icon: Dumbbell, label: 'Ver treino', action: 'ver_treino' },
          { icon: Utensils, label: 'Ver dieta', action: 'ver_dieta' },
          { icon: TrendingUp, label: 'Ver progresso', action: 'ver_progresso' },
        ]
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        type: 'bot',
        content: '❌ Erro ao gerar plano completo. Tente novamente.',
        time: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  const generateSuggestions = (input) => {
    const lowerInput = input.toLowerCase();

    if (lowerInput.includes('treino') || lowerInput.includes('exercício')) {
      return [
        { icon: Flame, label: 'Hipertrofia', action: 'objetivo_hipertrofia' },
        { icon: Activity, label: 'Emagrecer', action: 'objetivo_emagrecimento' },
        { icon: Zap, label: 'Força', action: 'objetivo_forca' },
      ];
    }

    if (lowerInput.includes('dieta') || lowerInput.includes('alimentação') || lowerInput.includes('comida')) {
      return [
        { icon: Flame, label: 'Ganhar massa', action: 'dieta_massa' },
        { icon: Activity, label: 'Perder gordura', action: 'dieta_cut' },
        { icon: CheckCircle, label: 'Manter', action: 'dieta_manter' },
      ];
    }

    if (lowerInput.includes('oi') || lowerInput.includes('olá')) {
      return [
        { icon: Dumbbell, label: 'Criar treino', action: 'criar_treino' },
        { icon: Utensils, label: 'Dieta', action: 'criar_dieta' },
        { icon: Sparkles, label: 'Plano completo', action: 'gerar_plano_completo' },
      ];
    }

    return [
      { icon: Dumbbell, label: 'Criar treino', action: 'criar_treino' },
      { icon: Utensils, label: 'Dieta', action: 'criar_dieta' },
    ];
  };

  const handleSuggestionClick = async (action) => {
    switch (action) {
      case 'criar_treino':
        await handleGenerateWorkout();
        break;
      case 'criar_dieta':
        await handleGenerateDiet();
        break;
      case 'gerar_plano_completo':
        await handleGenerateFullPlan();
        break;
      case 'objetivo_hipertrofia':
        setUserProfile(prev => ({ ...prev, objective: 'hipertrofia' }));
        handleSendMessage('Quero focar em hipertrofia e ganho de massa muscular');
        break;
      case 'objetivo_emagrecimento':
        setUserProfile(prev => ({ ...prev, objective: 'emagrecimento' }));
        handleSendMessage('Quero emagrecer e perder gordura');
        break;
      case 'objetivo_forca':
        setUserProfile(prev => ({ ...prev, objective: 'forca' }));
        handleSendMessage('Quero ganhar força');
        break;
      case 'dieta_massa':
        setUserProfile(prev => ({ ...prev, objective: 'ganho_massa' }));
        handleSendMessage('Quero ganhar massa muscular');
        break;
      case 'dieta_cut':
        setUserProfile(prev => ({ ...prev, objective: 'perda_gordura' }));
        handleSendMessage('Quero perder gordura');
        break;
      case 'dieta_manter':
        setUserProfile(prev => ({ ...prev, objective: 'manutencao' }));
        handleSendMessage('Quero manter o peso');
        break;
      case 'ver_treino':
        window.location.href = '/workout';
        break;
      case 'ver_dieta':
        window.location.href = '/diet';
        break;
      case 'ver_progresso':
        window.location.href = '/stats';
        break;
      default:
        handleSendMessage(action);
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-24 right-4 left-4 md:left-auto md:w-96 bg-gym-card rounded-3xl shadow-2xl border border-white/10 overflow-hidden z-50 max-h-[70vh] flex flex-col"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-gym-orange to-gym-accent p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white/20 p-2 rounded-xl">
            <Bot size={24} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-white">Assistente Gym AI</h3>
            <p className="text-xs text-white/70 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Online
            </p>
          </div>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-xl transition-colors">
          <X size={20} className="text-white" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[50vh]">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.type === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                message.type === 'bot' ? 'bg-gym-orange' : 'bg-white/10'
              }`}>
                {message.type === 'bot' ? <Bot size={16} /> : <User size={16} />}
              </div>
              <div className={`max-w-[80%] space-y-2`}>
                <div className={`p-3 rounded-2xl text-sm ${
                  message.type === 'bot'
                    ? 'bg-white/5 text-white'
                    : 'bg-gym-orange text-white'
                }`}>
                  <div className="whitespace-pre-line leading-relaxed">{message.content}</div>
                </div>

                {/* Sugestões */}
                {message.suggestions && (
                  <div className="flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestionClick(suggestion.action)}
                        disabled={aiLoading}
                        className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs hover:border-gym-orange/50 hover:bg-gym-orange/10 transition-colors disabled:opacity-50"
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
            <div className="w-8 h-8 rounded-full bg-gym-orange flex items-center justify-center">
              <Bot size={16} />
            </div>
            <div className="bg-white/5 p-3 rounded-2xl flex items-center gap-1">
              <span className="w-2 h-2 bg-gym-muted rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gym-muted rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
              <span className="w-2 h-2 bg-gym-muted rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-white/5 bg-gym-dark/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !aiLoading && handleSendMessage(inputValue)}
            placeholder="Digite sua mensagem..."
            disabled={aiLoading}
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-gym-orange transition-colors disabled:opacity-50"
          />
          <button
            onClick={() => handleSendMessage(inputValue)}
            disabled={!inputValue.trim() || aiLoading}
            className="bg-gym-orange p-3 rounded-xl hover:bg-gym-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {aiLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
          </button>
        </div>
        <p className="text-[10px] text-gym-muted text-center mt-2 flex items-center justify-center gap-1">
          <Sparkles size={10} />
          Powered by Gym AI
        </p>
      </div>
    </motion.div>
  );
};

export default ChatBot;
