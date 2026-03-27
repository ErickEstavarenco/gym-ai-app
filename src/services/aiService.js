import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Adicionar token aos headers se existir
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-auth-token'] = token;
  }
  return config;
});

/**
 * Gera um treino personalizado
 */
export const generateWorkout = async (userProfile) => {
  try {
    const response = await api.post('/ai/generate-workout', { userProfile });
    return response.data;
  } catch (error) {
    console.error('Erro ao gerar treino:', error);
    throw error;
  }
};

/**
 * Gera um plano alimentar
 */
export const generateDiet = async (userProfile) => {
  try {
    const response = await api.post('/ai/generate-diet', { userProfile });
    return response.data;
  } catch (error) {
    console.error('Erro ao gerar dieta:', error);
    throw error;
  }
};

/**
 * Chat com IA
 */
export const chatWithAI = async (message, conversationHistory = []) => {
  try {
    const response = await api.post('/ai/chat', { message, conversationHistory });
    return response.data.response;
  } catch (error) {
    console.error('Erro ao enviar mensagem:', error);
    throw error;
  }
};

export default {
  generateWorkout,
  generateDiet,
  chatWithAI,
  api
};
