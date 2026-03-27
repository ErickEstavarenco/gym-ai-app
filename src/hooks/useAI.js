import { useState, useCallback } from 'react';
import { generateWorkout, generateDiet, chatWithAI } from '../services/aiService';

/**
 * Hook para gerenciar interações com IA
 */
export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  const sendMessage = useCallback(async (message) => {
    setLoading(true);
    setError(null);

    try {
      const response = await chatWithAI(message, conversationHistory);

      // Adicionar ao histórico
      setConversationHistory(prev => [
        ...prev,
        { role: 'user', content: message },
        { role: 'assistant', content: response }
      ]);

      return response;
    } catch (err) {
      const errorMsg = err.response?.data?.error || err.message || 'Erro ao processar mensagem';
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
      const errorMsg = err.response?.data?.error || err.message || 'Erro ao gerar treino';
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
      const errorMsg = err.response?.data?.error || err.message || 'Erro ao gerar dieta';
      setError(errorMsg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const clearHistory = useCallback(() => {
    setConversationHistory([]);
    setError(null);
  }, []);

  return {
    loading,
    error,
    conversationHistory,
    sendMessage,
    generateNewWorkout,
    generateNewDiet,
    clearHistory
  };
};

export default useAI;
