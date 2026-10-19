import dotenv from 'dotenv';
dotenv.config();

const DEV_MODE = process.env.NODE_ENV !== 'production';

// ============================================
// GERADOR LOCAL DE TREINO
// ============================================

const exerciseDatabase = [
  { id: 'ex-001', name: 'Supino reto', muscleGroup: 'peito', equipment: 'barra', difficulty: 'intermediario' },
  { id: 'ex-002', name: 'Supino inclinado com halteres', muscleGroup: 'peito', equipment: 'halteres', difficulty: 'intermediario' },
  { id: 'ex-003', name: 'Crucifixo na máquina', muscleGroup: 'peito', equipment: 'maquina', difficulty: 'iniciante' },
  { id: 'ex-004', name: 'Puxada frontal', muscleGroup: 'costas', equipment: 'maquina', difficulty: 'iniciante' },
  { id: 'ex-005', name: 'Remada baixa', muscleGroup: 'costas', equipment: 'cabo', difficulty: 'iniciante' },
  { id: 'ex-006', name: 'Remada cavalinho', muscleGroup: 'costas', equipment: 'maquina', difficulty: 'intermediario' },
  { id: 'ex-007', name: 'Rosca direta', muscleGroup: 'biceps', equipment: 'barra', difficulty: 'iniciante' },
  { id: 'ex-008', name: 'Rosca martelo', muscleGroup: 'biceps', equipment: 'halteres', difficulty: 'iniciante' },
  { id: 'ex-009', name: 'Tríceps na corda', muscleGroup: 'triceps', equipment: 'cabo', difficulty: 'iniciante' },
  { id: 'ex-010', name: 'Desenvolvimento de ombros', muscleGroup: 'ombros', equipment: 'halteres', difficulty: 'intermediario' },
  { id: 'ex-011', name: 'Elevação lateral', muscleGroup: 'ombros', equipment: 'halteres', difficulty: 'iniciante' },
  { id: 'ex-012', name: 'Leg press', muscleGroup: 'pernas', equipment: 'maquina', difficulty: 'iniciante' },
  { id: 'ex-013', name: 'Cadeira extensora', muscleGroup: 'quadriceps', equipment: 'maquina', difficulty: 'iniciante' },
  { id: 'ex-014', name: 'Mesa flexora', muscleGroup: 'posterior', equipment: 'maquina', difficulty: 'iniciante' },
  { id: 'ex-015', name: 'Panturrilha na máquina', muscleGroup: 'panturrilhas', equipment: 'maquina', difficulty: 'iniciante' },
];

const normalizeText = (value = '') =>
  String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();

const getLocalExercises = (muscleGroup, limit = 4) => {
  const group = normalizeText(muscleGroup);
  return exerciseDatabase
    .filter((ex) => !group || group === 'todos' || normalizeText(ex.muscleGroup).includes(group))
    .slice(0, limit);
};

// ============================================
// GERAÇÃO DE TREINO E DIETA
// ============================================

export const generateWorkout = async (userProfile = {}) => {
  const { objective = 'hipertrofia', level = 'iniciante', daysPerWeek = 3 } = userProfile;

  const splits = [
    { name: 'Treino A - Peito e Tríceps', exercises: [...getLocalExercises('peito', 3), ...getLocalExercises('triceps', 2)] },
    { name: 'Treino B - Costas e Bíceps', exercises: [...getLocalExercises('costas', 3), ...getLocalExercises('biceps', 2)] },
    { name: 'Treino C - Pernas e Ombros', exercises: [...getLocalExercises('pernas', 3), ...getLocalExercises('ombros', 2)] },
  ];

  return {
    title: `Plano de Treino - ${objective}`,
    objective,
    level,
    daysPerWeek,
    days: splits.slice(0, Math.min(daysPerWeek, splits.length)),
    message: 'Treino gerado com sucesso',
  };
};

export const generateDiet = async (userProfile = {}) => {
  const { objective = 'manutencao', dailyCalories = 2500 } = userProfile;

  return {
    title: `Plano Alimentar - ${objective}`,
    objective,
    dailyCalories,
    macros: {
      protein: Math.round(dailyCalories * 0.30 / 4),
      carbs: Math.round(dailyCalories * 0.45 / 4),
      fat: Math.round(dailyCalories * 0.25 / 9),
    },
    meals: [
      { name: 'Café da manhã', time: '07:00', calories: Math.round(dailyCalories * 0.25) },
      { name: 'Almoço', time: '12:00', calories: Math.round(dailyCalories * 0.35) },
      { name: 'Lanche', time: '16:00', calories: Math.round(dailyCalories * 0.15) },
      { name: 'Jantar', time: '19:00', calories: Math.round(dailyCalories * 0.25) },
    ],
    message: 'Dieta gerada com sucesso',
  };
};

export const chatWithAI = async (message, conversationHistory = []) => {
  const text = normalizeText(message);

  if (/oi|ola|bom dia|boa tarde|boa noite/.test(text)) {
    return 'Olá! Sou seu treinador virtual. Posso ajudar com treinos, exercícios e alimentação. O que você precisa?';
  }
  if (/treino|musculacao|exercicio|hipertrofia/.test(text)) {
    return 'Para montar um treino ideal, me fale seu objetivo, nível de experiência e quantos dias por semana pode treinar.';
  }
  if (/dieta|alimentacao|caloria|emagrecer/.test(text)) {
    return 'Para orientar sua alimentação, preciso saber seu objetivo, peso e rotina diária. Posso gerar um plano base para você.';
  }
  if (/descanso|recuperacao|dor/.test(text)) {
    return 'O descanso é parte essencial do treino. Respeite 48h de recuperação por grupo muscular e durma bem.';
  }

  return 'Posso ajudar com treinos, exercícios e alimentação. Conte mais sobre sua dúvida!';
};

// ============================================
// FUNÇÕES DE PERSISTÊNCIA NO BANCO
// ============================================

export const saveWorkoutForUser = async (userId, workout) => {
  try {
    const { Workout } = await import('../models/Workout.js');
    const saved = await Workout.create({
      user_id: userId,
      title: workout.title || 'Treino gerado',
      objective: workout.objective || 'hipertrofia',
      level: workout.level || 'intermediario',
      days_per_week: workout.daysPerWeek || 3,
      data: JSON.stringify(workout),
    });
    return saved;
  } catch (error) {
    console.warn('⚠️ Não foi possível salvar treino:', error.message);
    return workout;
  }
};

export const saveDietForUser = async (userId, diet) => {
  try {
    const { Diet } = await import('../models/Diet.js');
    const saved = await Diet.create({
      user_id: userId,
      title: diet.title || 'Dieta gerada',
      objective: diet.objective || 'manutencao',
      daily_calories: diet.dailyCalories || 2500,
      data: JSON.stringify(diet),
    });
    return saved;
  } catch (error) {
    console.warn('⚠️ Não foi possível salvar dieta:', error.message);
    return diet;
  }
};

export const getLatestWorkoutForUser = async (userId) => {
  try {
    const { Workout } = await import('../models/Workout.js');
    const workout = await Workout.findOne({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
    });
    return workout ? JSON.parse(workout.data) : null;
  } catch (error) {
    console.warn('⚠️ Não foi possível buscar treino:', error.message);
    return null;
  }
};

export const getLatestDietForUser = async (userId) => {
  try {
    const { Diet } = await import('../models/Diet.js');
    const diet = await Diet.findOne({
      where: { user_id: userId },
      order: [['created_at', 'DESC']],
    });
    return diet ? JSON.parse(diet.data) : null;
  } catch (error) {
    console.warn('⚠️ Não foi possível buscar dieta:', error.message);
    return null;
  }
};

export const generateLocalChatResponse = chatWithAI;
export const generateLocalWorkout = generateWorkout;
export const generateLocalDiet = generateDiet;

export default {
  generateWorkout,
  generateDiet,
  generateLocalWorkout,
  generateLocalDiet,
  generateLocalChatResponse,
  chatWithAI,
  saveWorkoutForUser,
  saveDietForUser,
  getLatestWorkoutForUser,
  getLatestDietForUser,
};