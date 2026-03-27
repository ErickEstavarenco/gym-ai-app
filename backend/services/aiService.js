import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Gera um treino personalizado usando IA
 * @param {Object} userProfile - Perfil do usuário (objetivo, nível, dias, etc)
 * @returns {Object} Treino estruturado em JSON
 */
export const generateWorkout = async (userProfile) => {
  const {
    objective = 'hipertrofia', // hipertrofia, emagrecimento, força
    level = 'intermediário', // iniciante, intermediário, avançado
    daysPerWeek = 4,
    sessionDuration = 60,
    equipment = ['barra', 'halteres', 'máquinas'],
    restrictions = [],
    preferences = {}
  } = userProfile;

  const prompt = `
Você é um treinador de musculação experiente. Crie um plano de treino personalizado em JSON.

DADOS DO USUÁRIO:
- Objetivo: ${objective}
- Nível: ${level}
- Dias por semana: ${daysPerWeek}
- Duração da sessão: ${sessionDuration} minutos
- Equipamentos disponíveis: ${equipment.join(', ')}
- Restrições: ${restrictions.length > 0 ? restrictions.join(', ') : 'Nenhuma'}

IMPORTANTE: Retorne APENAS um JSON válido, sem explicações extras. Estrutura:

{
  "title": "Nome do Plano",
  "description": "Descrição breve",
  "objective": "${objective}",
  "level": "${level}",
  "daysPerWeek": ${daysPerWeek},
  "totalWeeks": 12,
  "days": [
    {
      "day": "Segunda",
      "focus": "Peito & Tríceps",
      "duration": ${sessionDuration},
      "exercises": [
        {
          "name": "Supino Reto",
          "sets": 4,
          "reps": "8-12",
          "restSeconds": 90,
          "tempo": "3-1-1",
          "notes": "Controle o movimento"
        }
      ]
    }
  ],
  "nutrition": {
    "dailyCalories": 2500,
    "macros": {
      "protein": 180,
      "carbs": 250,
      "fat": 80
    }
  },
  "tips": ["Dica 1", "Dica 2"]
}

Crie um plano realista e eficaz para ${daysPerWeek} dias.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente de treino especializado. Sempre retorna respostas em JSON válido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;
    
    // Tentar fazer parse do JSON
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Erro ao fazer parse do JSON:', e);
    }

    return { error: 'Não foi possível gerar o treino', raw: content };
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error);
    throw new Error('Erro ao gerar treino com IA');
  }
};

/**
 * Gera um plano alimentar personalizado
 * @param {Object} userProfile - Perfil do usuário
 * @returns {Object} Plano alimentar estruturado
 */
export const generateDiet = async (userProfile) => {
  const {
    objective = 'ganho_massa', // ganho_massa, perda_gordura, manutenção
    dailyCalories = 2500,
    mealsPerDay = 5,
    restrictions = [],
    preferences = {}
  } = userProfile;

  const prompt = `
Você é um nutricionista especializado em musculação. Crie um plano alimentar em JSON.

DADOS DO USUÁRIO:
- Objetivo: ${objective}
- Calorias diárias: ${dailyCalories}
- Refeições por dia: ${mealsPerDay}
- Restrições: ${restrictions.length > 0 ? restrictions.join(', ') : 'Nenhuma'}

IMPORTANTE: Retorne APENAS um JSON válido, sem explicações extras. Estrutura:

{
  "title": "Plano Alimentar",
  "objective": "${objective}",
  "dailyCalories": ${dailyCalories},
  "macros": {
    "protein": 180,
    "carbs": 250,
    "fat": 80
  },
  "meals": [
    {
      "name": "Café da Manhã",
      "time": "07:00",
      "calories": 500,
      "items": [
        {
          "food": "Ovos",
          "quantity": "3",
          "unit": "unidades",
          "calories": 210,
          "protein": 18,
          "carbs": 2,
          "fat": 15
        }
      ],
      "substitutions": ["Alternativa 1", "Alternativa 2"]
    }
  ],
  "tips": ["Dica 1", "Dica 2"],
  "shoppingList": ["Item 1", "Item 2"]
}

Crie um plano realista com ${mealsPerDay} refeições.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente de nutrição. Sempre retorna respostas em JSON válido.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    });

    const content = response.choices[0].message.content;
    
    try {
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    } catch (e) {
      console.error('Erro ao fazer parse do JSON:', e);
    }

    return { error: 'Não foi possível gerar a dieta', raw: content };
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error);
    throw new Error('Erro ao gerar dieta com IA');
  }
};

/**
 * Chat genérico com IA
 * @param {String} message - Mensagem do usuário
 * @param {Array} conversationHistory - Histórico da conversa
 * @returns {String} Resposta da IA
 */
export const chatWithAI = async (message, conversationHistory = []) => {
  try {
    const messages = [
      {
        role: 'system',
        content: `Você é um assistente de treino e nutrição especializado. Ajude o usuário com:
- Criação de planos de treino personalizados
- Dicas de nutrição e dieta
- Motivação e acompanhamento
- Responda em português brasileiro de forma amigável e profissional.`
      },
      ...conversationHistory,
      {
        role: 'user',
        content: message
      }
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error);
    throw new Error('Erro ao processar mensagem com IA');
  }
};

// Funções para armazenar e recuperar planos no banco de dados
import { Workout } from '../models/Workout.js';
import { Diet } from '../models/Diet.js';

export const saveWorkoutForUser = async (userId, workoutData) => {
  const record = await Workout.create({
    user_id: userId,
    title: workoutData.title || 'Plano de Treino IA',
    objective: workoutData.objective || null,
    level: workoutData.level || null,
    days_per_week: workoutData.daysPerWeek || null,
    data: workoutData,
  });
  return record;
};

export const saveDietForUser = async (userId, dietData) => {
  const record = await Diet.create({
    user_id: userId,
    title: dietData.title || 'Plano Alimentar IA',
    objective: dietData.objective || null,
    daily_calories: dietData.dailyCalories || null,
    data: dietData,
  });
  return record;
};

export const getLatestWorkoutForUser = async (userId) => {
  return await Workout.findOne({
    where: { user_id: userId },
    order: [['created_at', 'DESC']],
  });
};

export const getLatestDietForUser = async (userId) => {
  return await Diet.findOne({
    where: { user_id: userId },
    order: [['created_at', 'DESC']],
  });
};

export default {
  generateWorkout,
  generateDiet,
  chatWithAI,
  saveWorkoutForUser,
  saveDietForUser,
  getLatestWorkoutForUser,
  getLatestDietForUser,
};
