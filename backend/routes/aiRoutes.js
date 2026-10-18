import express from 'express';

import {
generateWorkout,
generateDiet,
chatWithAI,
saveWorkoutForUser,
saveDietForUser,
getLatestWorkoutForUser,
getLatestDietForUser
} from '../services/aiService.js';

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

/**

* POST /api/ai/generate-workout
* Gera um treino personalizado
  */
  router.post('/generate-workout', async (req, res) => {
  try {
  const { userProfile } = req.body;

  if (!userProfile) {
  return res.status(400).json({
  error: 'userProfile é obrigatório'
  });
  }

  const workout = await generateWorkout(userProfile);

  res.json(workout);
  } catch (error) {
  console.error('Erro ao gerar treino:', error);

  res.status(500).json({
  error: error.message || 'Erro ao gerar treino'
  });
  }
  });

/**

* POST /api/ai/generate-diet
* Gera um plano alimentar personalizado
  */
  router.post('/generate-diet', async (req, res) => {
  try {
  const { userProfile } = req.body;

  if (!userProfile) {
  return res.status(400).json({
  error: 'userProfile é obrigatório'
  });
  }

  const diet = await generateDiet(userProfile);

  res.json(diet);
  } catch (error) {
  console.error('Erro ao gerar dieta:', error);

  res.status(500).json({
  error: error.message || 'Erro ao gerar dieta'
  });
  }
  });

/**

* POST /api/ai/save-plan
* Salva treino e dieta do usuário autenticado
  */
  router.post('/save-plan', authMiddleware, async (req, res) => {
  try {
  const { workout, diet } = req.body;

  if (!workout || !diet) {
  return res.status(400).json({
  error: 'workout e diet são obrigatórios'
  });
  }

  // O ID do usuário vem do JWT
  const userId = req.user.id;

  const savedWorkout = await saveWorkoutForUser(userId, workout);
  const savedDiet = await saveDietForUser(userId, diet);

  res.json({
  savedWorkout,
  savedDiet
  });
  } catch (error) {
  console.error('Erro ao salvar plano:', error);

  res.status(500).json({
  error: error.message || 'Erro ao salvar plano'
  });
  }
  });

/**

* GET /api/ai/latest-plan
* Busca o último treino e dieta do usuário autenticado
  */
  router.get('/latest-plan', authMiddleware, async (req, res) => {
  try {
  // O ID do usuário vem do JWT
  const userId = req.user.id;

  const latestWorkout = await getLatestWorkoutForUser(userId);
  const latestDiet = await getLatestDietForUser(userId);

  res.json({
  latestWorkout,
  latestDiet
  });
  } catch (error) {
  console.error('Erro ao buscar plano:', error);

  res.status(500).json({
  error: error.message || 'Erro ao buscar plano'
  });
  }
  });

/**

* POST /api/ai/chat
* Chat genérico com IA
  */
  router.post('/chat', async (req, res) => {
  try {
  const { message, conversationHistory = [] } = req.body;

  if (!message) {
  return res.status(400).json({
  error: 'message é obrigatório'
  });
  }

  const response = await chatWithAI(
  message,
  conversationHistory
  );

  res.json({ response });
  } catch (error) {
  console.error('Erro ao processar chat:', error);

  res.status(500).json({
  error: error.message || 'Erro ao processar mensagem'
  });
  }
  });

export default router;
