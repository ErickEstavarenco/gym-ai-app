import { useState, useCallback } from 'react';
import { chatWithAI, generateWorkout, generateDiet, saveGeneratedPlan } from '../services/aiService';

/**
 * Hook para gerenciar interações com IA
 */
export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  const sendMessage = useCallback(async (message, context = {}) => {
    setLoading(true);
    setError(null);

    try {
      const response = await chatWithAI(message, conversationHistory);

      // Adicionar ao histórico
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: message, context },
        { role: 'assistant', content: response }
      ]);

      return response;
    } catch (err) {
      const errorMsg = err.message || 'Erro ao processar mensagem';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [conversationHistory]);

  const generateNewWorkout = useCallback(async (userProfile) => {
    setLoading(true);
    setError(null);

    try {
      const workout = await generateWorkout(userProfile);
      return workout;
    } catch (err) {
      const errorMsg = err.message || 'Erro ao gerar treino';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateNewDiet = useCallback(async (userProfile) => {
    setLoading(true);
    setError(null);

    try {
      const diet = await generateDiet(userProfile);
      return diet;
    } catch (err) {
      const errorMsg = err.message || 'Erro ao gerar dieta';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const savePlan = useCallback(async (userId, workout, diet) => {
    try {
      const result = await saveGeneratedPlan(userId, workout, diet);
      return result;
    } catch (err) {
      const errorMsg = err.message || 'Erro ao salvar plano';
      setError(errorMsg);
      throw err;
    }
  }, []);

  const clearHistory = useCallback(() => {
    setConversationHistory([]);
    setError(null);
  }, []);

  const getLastResponse = useCallback(() => {
    if (conversationHistory.length === 0) return null;
    const lastMessage = conversationHistory[conversationHistory.length - 1];
    return lastMessage.role === 'assistant' ? lastMessage.content : null;
  }, [conversationHistory]);

  return {
    loading,
    error,
    conversationHistory,
    sendMessage,
    generateNewWorkout,
    generateNewDiet,
    savePlan,
    clearHistory,
    getLastResponse
  };
};

export default useAI;
