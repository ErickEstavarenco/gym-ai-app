
import axios from 'axios';

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || 'http://localhost:5001/api'
).replace(/\/$/, '');


const DEV_MODE = import.meta.env.DEV;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 120000,
});

api.interceptors.request.use(
  (config) => {
    try {
      const token =
        localStorage.getItem('token') ||
        localStorage.getItem('authToken');

      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      if (DEV_MODE) {
        console.warn('Não foi possível recuperar o token:', error);
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

const exerciseDatabase = [
  {
    id: 'ex-001',
    name: 'Supino reto',
    muscleGroup: 'peito',
    equipment: 'barra',
    difficulty: 'intermediario',
  },
  {
    id: 'ex-002',
    name: 'Supino inclinado com halteres',
    muscleGroup: 'peito',
    equipment: 'halteres',
    difficulty: 'intermediario',
  },
  {
    id: 'ex-003',
    name: 'Crucifixo na máquina',
    muscleGroup: 'peito',
    equipment: 'maquina',
    difficulty: 'iniciante',
  },
  {
    id: 'ex-004',
    name: 'Puxada frontal',
    muscleGroup: 'costas',
    equipment: 'maquina',
    difficulty: 'iniciante',
  },
  {
    id: 'ex-005',
    name: 'Remada baixa',
    muscleGroup: 'costas',
    equipment: 'cabo',
    difficulty: 'iniciante',
  },
  {
    id: 'ex-006',
    name: 'Remada cavalinho',
    muscleGroup: 'costas',
    equipment: 'maquina',
    difficulty: 'intermediario',
  },
  {
    id: 'ex-007',
    name: 'Rosca direta',
    muscleGroup: 'biceps',
    equipment: 'barra',
    difficulty: 'iniciante',
  },
  {
    id: 'ex-008',
    name: 'Rosca martelo',
    muscleGroup: 'biceps',
    equipment: 'halteres',
    difficulty: 'iniciante',
  },
  {
    id: 'ex-009',
    name: 'Tríceps na corda',
    muscleGroup: 'triceps',
    equipment: 'cabo',
    difficulty: 'iniciante',
  },
  {
    id: 'ex-010',
    name: 'Desenvolvimento de ombros',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    difficulty: 'intermediario',
  },
  {
    id: 'ex-011',
    name: 'Elevação lateral',
    muscleGroup: 'ombros',
    equipment: 'halteres',
    difficulty: 'iniciante',
  },
  {
    id: 'ex-012',
    name: 'Leg press',
    muscleGroup: 'pernas',
    equipment: 'maquina',
    difficulty: 'iniciante',
  },
  {
    id: 'ex-013',
    name: 'Cadeira extensora',
    muscleGroup: 'quadriceps',
    equipment: 'maquina',
    difficulty: 'iniciante',
  },
  {
    id: 'ex-014',
    name: 'Mesa flexora',
    muscleGroup: 'posterior',
    equipment: 'maquina',
    difficulty: 'iniciante',
  },
  {
    id: 'ex-015',
    name: 'Panturrilha na máquina',
    muscleGroup: 'panturrilhas',
    equipment: 'maquina',
    difficulty: 'iniciante',
  },
];

const normalizeText = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim();

const getErrorMessage = (error) =>
  error?.response?.data?.message ||
  error?.response?.data?.error ||
  error?.message ||
  'Ocorreu um erro inesperado.';

const getLocalExercises = (muscleGroup, limit = 4) => {
  const group = normalizeText(muscleGroup);

  const matching = exerciseDatabase.filter((exercise) => {
    if (!group || group === 'todos') return true;

    return normalizeText(exercise.muscleGroup).includes(group);
  });

  return matching.slice(0, limit);
};

/**
 * Resposta local para o chat do treinador.
 * Exportada para permitir a importação em coachLogic.js.
 */
export const generateLocalChatResponse = (
  message,
  conversationHistory = []
) => {
  const text = normalizeText(message);

  if (!text) {
    return 'Pode me contar sua dúvida sobre treino, alimentação ou evolução?';
  }

  if (/oi|ola|bom dia|boa tarde|boa noite/.test(text)) {
    return 'Olá! Sou seu treinador virtual. Posso ajudar com treinos, exercícios, alimentação e acompanhamento dos seus objetivos. O que você gostaria de melhorar hoje?';
  }

  if (/treino|musculacao|hipertrofia|exercicio/.test(text)) {
    return 'Para montar um treino adequado, precisamos considerar seu objetivo, sua experiência, quantos dias você pode treinar e se possui alguma limitação física. Qual é seu principal objetivo neste momento?';
  }

  if (/dieta|alimentacao|comida|caloria|emagrecer|perder peso/.test(text)) {
    return 'Para orientar sua alimentação, é importante considerar seu peso, altura, rotina, atividade física e objetivo. Posso ajudar a organizar hábitos e informações gerais, mas uma dieta individualizada deve ser avaliada por um nutricionista.';
  }

  if (/descanso|recuperacao|dor|cansaco/.test(text)) {
    return 'A recuperação também faz parte do treino. Respeite o descanso e evite treinar intensamente uma região que ainda não se recuperou. Se a dor for intensa, persistente ou incomum, procure avaliação profissional.';
  }

  if (/creatina|whey|suplemento/.test(text)) {
    return 'Suplementos podem ser úteis em situações específicas, mas não substituem uma alimentação adequada, sono e consistência. A indicação depende das suas necessidades e condições individuais.';
  }

  if (/motivacao|desanimo|desistir/.test(text)) {
    return 'Tente focar na próxima ação possível, em vez de exigir perfeição. Um treino adaptado à sua rotina e feito com consistência costuma ser mais sustentável do que um plano difícil de manter.';
  }

  if (conversationHistory.length > 0) {
    return 'Entendi. Para te orientar melhor, me diga um pouco mais sobre seu objetivo e sobre o que você já tentou.';
  }

  return 'Posso ajudar com treino, exercícios, alimentação e recuperação. Conte um pouco mais sobre sua dúvida para que eu possa direcionar a orientação.';
};

/**
 * Gera um treino pela API.
 */
export const generateWorkout = async (userProfile = {}) => {
  try {
    const response = await api.post('/ai/generate-workout', {
      ...userProfile,
    });

    return response.data;
  } catch (error) {
    console.error(
      'Erro ao gerar treino pela API:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/**
 * Gera uma sugestão básica de treino local.
 * Não substitui a geração personalizada pela API.
 */
export const generateLocalWorkout = (userProfile = {}) => {
  const daysPerWeek = Math.max(
    1,
    Math.min(7, Number(userProfile.daysPerWeek) || 3)
  );

  const days = [
    {
      name: 'Treino A - Peito e tríceps',
      muscleGroups: ['peito', 'triceps'],
      exercises: [
        ...getLocalExercises('peito', 3),
        ...getLocalExercises('triceps', 2),
      ],
    },
    {
      name: 'Treino B - Costas e bíceps',
      muscleGroups: ['costas', 'biceps'],
      exercises: [
        ...getLocalExercises('costas', 3),
        ...getLocalExercises('biceps', 2),
      ],
    },
    {
      name: 'Treino C - Pernas e ombros',
      muscleGroups: ['pernas', 'ombros'],
      exercises: [
        ...getLocalExercises('pernas', 3),
        ...getLocalExercises('ombros', 2),
      ],
    },
  ];

  return {
    title: 'Sugestão de treino local',
    objective: userProfile.objective || 'hipertrofia',
    level: userProfile.level || 'iniciante',
    daysPerWeek,
    days: days.slice(0, Math.min(daysPerWeek, days.length)),
    isLocalFallback: true,
    message:
      'Sugestão básica local. Ajuste os exercícios às suas necessidades e limitações.',
  };
};

/**
 * Gera uma sugestão alimentar básica local.
 * Não é uma dieta individualizada nem substitui um nutricionista.
 */
export const generateLocalDiet = (userProfile = {}) => ({
  title: 'Orientações alimentares gerais',
  objective: userProfile.objective || 'manutenção',
  meals: [],
  isLocalFallback: true,
  message:
    'Esta é uma estrutura informativa sem cálculo individual de calorias ou porções. Procure um nutricionista para um plano personalizado.',
});

/**
 * Gera uma dieta pela API.
 */
export const generateDiet = async (userProfile = {}) => {
  try {
    const response = await api.post('/ai/generate-diet', {
      ...userProfile,
    });

    return response.data;
  } catch (error) {
    console.error(
      'Erro ao gerar alimentação pela API:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/**
 * Envia uma mensagem para o chat de IA.
 */
export const chatWithAI = async (
  message,
  conversationHistory = [],
  userProfile = {}
) => {
  try {
    const response = await api.post('/ai/chat', {
      message,
      conversationHistory,
      userProfile,
    });

    return response.data;
  } catch (error) {
    console.error(
      'Erro ao conversar com a IA:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/**
 * Salva o plano gerado no backend.
 */
export const saveGeneratedPlan = async (plan = {}) => {
  try {
    const response = await api.post('/ai/save-plan', plan);

    return response.data;
  } catch (error) {
    console.error(
      'Erro ao salvar o plano:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/**
 * Busca o plano mais recente do usuário.
 */
export const getLatestPlan = async (userId) => {
  if (!userId) {
    throw new Error('O ID do usuário é obrigatório.');
  }

  try {
    const response = await api.get(
      `/ai/latest-plan/${encodeURIComponent(userId)}`
    );

    return response.data;
  } catch (error) {
    console.error(
      'Erro ao buscar o plano mais recente:',
      getErrorMessage(error)
    );

    throw error;
  }
};

/**
 * Retorna os exercícios disponíveis localmente.
 */
export const getExercises = (filters = {}) => {
  let exercises = [...exerciseDatabase];

  if (filters.muscleGroup) {
    const group = normalizeText(filters.muscleGroup);

    exercises = exercises.filter((exercise) =>
      normalizeText(exercise.muscleGroup).includes(group)
    );
  }

  if (filters.equipment) {
    const equipment = normalizeText(filters.equipment);

    exercises = exercises.filter((exercise) =>
      normalizeText(exercise.equipment).includes(equipment)
    );
  }

  if (filters.difficulty) {
    const difficulty = normalizeText(filters.difficulty);

    exercises = exercises.filter(
      (exercise) =>
        normalizeText(exercise.difficulty) === difficulty
    );
  }

  return exercises;
};

/**
 * Busca um exercício pelo ID.
 */
export const getExerciseById = (id) =>
  exerciseDatabase.find((exercise) => exercise.id === id) || null;

/**
 * Retorna sugestões de exercícios para um grupo muscular.
 */
export const getSuggestedExercises = (
  muscleGroup,
  limit = 4
) => getLocalExercises(muscleGroup, limit);

/**
 * Alias para projetos que utilizam o nome generateLocalDiet.
 */
export const generateLocalDietPlan = generateLocalDiet;

/**
 * Objeto padrão do serviço.
 */
const aiService = {
  generateWorkout,
  generateDiet,
  generateLocalWorkout,
  generateLocalDiet,
  generateLocalDietPlan,
  generateLocalChatResponse,
  chatWithAI,
  saveGeneratedPlan,
  getLatestPlan,
  getExercises,
  getExerciseById,
  getSuggestedExercises,
};

export default aiService;
