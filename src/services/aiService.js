import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';
const DEV_MODE = import.meta.env.VITE_DEV_MODE === 'true';

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

// ============================================
// BANCO DE EXERCÍCIOS LOCAL (Fallback)
// ============================================

const exercisesDatabase = {
  chest: [
    { id: 'chest-001', name: 'Supino Reto', muscles: ['Peitoral', 'Tríceps'], sets: 4, reps: '8-12', rest: '60-90s', difficulty: 'intermediário' },
    { id: 'chest-002', name: 'Supino Inclinado', muscles: ['Peitoral Superior', 'Tríceps'], sets: 4, reps: '10-12', rest: '60-90s', difficulty: 'intermediário' },
    { id: 'chest-003', name: 'Crucifixo', muscles: ['Peitoral'], sets: 3, reps: '12-15', rest: '45-60s', difficulty: 'iniciante' },
    { id: 'chest-004', name: 'Crossover Polia', muscles: ['Peitoral'], sets: 3, reps: '12-15', rest: '45-60s', difficulty: 'intermediário' },
    { id: 'chest-005', name: 'Flexão de Braço', muscles: ['Peitoral', 'Tríceps'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'chest-006', name: 'Supino Declinado', muscles: ['Peitoral Inferior'], sets: 4, reps: '8-10', rest: '90s', difficulty: 'intermediário' },
    { id: 'chest-007', name: 'Peck Deck', muscles: ['Peitoral'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'chest-008', name: 'Pull-over', muscles: ['Peitoral', 'Dorsal'], sets: 3, reps: '12-15', rest: '60s', difficulty: 'intermediário' },
  ],
  back: [
    { id: 'back-001', name: 'Barra Fixa', muscles: ['Dorsal', 'Bíceps'], sets: 4, reps: '8-12', rest: '90s', difficulty: 'intermediário' },
    { id: 'back-002', name: 'Pulley Frente', muscles: ['Dorsal', 'Bíceps'], sets: 4, reps: '10-12', rest: '60-90s', difficulty: 'iniciante' },
    { id: 'back-003', name: 'Remada Curvada', muscles: ['Dorsal', 'Trapézio'], sets: 4, reps: '8-12', rest: '90s', difficulty: 'intermediário' },
    { id: 'back-004', name: 'Remada Sentada', muscles: ['Dorsal', 'Trapézio'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'iniciante' },
    { id: 'back-005', name: 'Levantamento Terra', muscles: ['Costas', 'Glúteos', 'Legs'], sets: 3, reps: '5-8', rest: '120s', difficulty: 'avançado' },
    { id: 'back-006', name: 'Remada Unilateral', muscles: ['Dorsal'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'iniciante' },
    { id: 'back-007', name: 'Pulley Costas', muscles: ['Dorsal'], sets: 3, reps: '12-15', rest: '60s', difficulty: 'iniciante' },
    { id: 'back-008', name: 'Hiperextensão', muscles: ['Lombar', 'Glúteos'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
  ],
  legs: [
    { id: 'legs-001', name: 'Agachamento Livre', muscles: ['Quadríceps', 'Glúteos'], sets: 4, reps: '8-12', rest: '90-120s', difficulty: 'intermediário' },
    { id: 'legs-002', name: 'Leg Press 45°', muscles: ['Quadríceps', 'Glúteos'], sets: 4, reps: '10-15', rest: '90s', difficulty: 'iniciante' },
    { id: 'legs-003', name: 'Cadeira Extensora', muscles: ['Quadríceps'], sets: 3, reps: '12-15', rest: '45-60s', difficulty: 'iniciante' },
    { id: 'legs-004', name: 'Mesa Flexora', muscles: ['Isquiotibiais'], sets: 3, reps: '12-15', rest: '60s', difficulty: 'iniciante' },
    { id: 'legs-005', name: 'Elevação Pélvica', muscles: ['Glúteos'], sets: 4, reps: '10-12', rest: '90s', difficulty: 'intermediário' },
    { id: 'legs-006', name: 'Panturrilha Sentado', muscles: ['Panturrilha'], sets: 4, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'legs-007', name: 'Agachamento Búlgaro', muscles: ['Quadríceps', 'Glúteos'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'intermediário' },
    { id: 'legs-008', name: 'Stiff', muscles: ['Isquiotibiais', 'Glúteos'], sets: 3, reps: '10-12', rest: '90s', difficulty: 'intermediário' },
    { id: 'legs-009', name: 'Cadeira Adutora', muscles: ['Adutores'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'legs-010', name: 'Cadeira Abdutora', muscles: ['Abdutores'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'legs-011', name: 'Panturrilha em Pé', muscles: ['Panturrilha'], sets: 4, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'legs-012', name: 'Agachamento Sumô', muscles: ['Quadríceps', 'Adutores'], sets: 3, reps: '12-15', rest: '90s', difficulty: 'intermediário' },
  ],
  shoulders: [
    { id: 'shoulder-001', name: 'Desenvolvimento', muscles: ['Deltoide', 'Tríceps'], sets: 4, reps: '8-12', rest: '90s', difficulty: 'intermediário' },
    { id: 'shoulder-002', name: 'Elevação Lateral', muscles: ['Deltoide Lateral'], sets: 3, reps: '12-15', rest: '45-60s', difficulty: 'iniciante' },
    { id: 'shoulder-003', name: 'Elevação Frontal', muscles: ['Deltoide Anterior'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'shoulder-004', name: 'Face Pull', muscles: ['Deltoide Posterior', 'Trapézio'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'shoulder-005', name: 'Desenvolvimento Halteres', muscles: ['Deltoide'], sets: 4, reps: '10-12', rest: '90s', difficulty: 'intermediário' },
    { id: 'shoulder-006', name: 'Remada Alta', muscles: ['Deltoide', 'Trapézio'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'intermediário' },
    { id: 'shoulder-007', name: 'Crucifixo Inverso', muscles: ['Deltoide Posterior'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
  ],
  biceps: [
    { id: 'bicep-001', name: 'Rosca Direta', muscles: ['Bíceps'], sets: 4, reps: '8-12', rest: '60s', difficulty: 'iniciante' },
    { id: 'bicep-002', name: 'Rosca Martelo', muscles: ['Bíceps', 'Braquial'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'iniciante' },
    { id: 'bicep-003', name: 'Rosca Scott', muscles: ['Bíceps'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'intermediário' },
    { id: 'bicep-004', name: 'Rosca Concentrada', muscles: ['Bíceps'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'bicep-005', name: 'Rosca Polia', muscles: ['Bíceps'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'bicep-006', name: 'Rosca Inversa', muscles: ['Bíceps', 'Antebraço'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'bicep-007', name: 'Rosca 21', muscles: ['Bíceps'], sets: 3, reps: '21', rest: '60s', difficulty: 'avançado' },
  ],
  triceps: [
    { id: 'tri-001', name: 'Tríceps Corda', muscles: ['Tríceps'], sets: 4, reps: '12-15', rest: '45-60s', difficulty: 'iniciante' },
    { id: 'tri-002', name: 'Tríceps Testa', muscles: ['Tríceps'], sets: 3, reps: '10-12', rest: '60-90s', difficulty: 'intermediário' },
    { id: 'tri-003', name: 'Tríceps Francês', muscles: ['Tríceps'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'intermediário' },
    { id: 'tri-004', name: 'Tríceps Banco', muscles: ['Tríceps'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'tri-005', name: 'Tríceps Polia', muscles: ['Tríceps'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'tri-006', name: 'Mergulho Paralelas', muscles: ['Tríceps', 'Peitoral'], sets: 3, reps: '10-15', rest: '60s', difficulty: 'intermediário' },
    { id: 'tri-007', name: 'Diamond Push-up', muscles: ['Tríceps', 'Peitoral'], sets: 3, reps: '10-15', rest: '45s', difficulty: 'intermediário' },
  ],
  core: [
    { id: 'core-001', name: 'Prancha', muscles: ['Abdômen', 'Core'], sets: 3, reps: '30-60s', rest: '30s', difficulty: 'iniciante' },
    { id: 'core-002', name: 'Abdominal Supra', muscles: ['Abdômen'], sets: 3, reps: '15-20', rest: '30s', difficulty: 'iniciante' },
    { id: 'core-003', name: 'Abdominal Infra', muscles: ['Abdômen Inferior'], sets: 3, reps: '12-15', rest: '30s', difficulty: 'intermediário' },
    { id: 'core-004', name: 'Russian Twist', muscles: ['Oblíquos'], sets: 3, reps: '20-30', rest: '30s', difficulty: 'iniciante' },
    { id: 'core-005', name: 'Mountain Climber', muscles: ['Core', 'Cardio'], sets: 3, reps: '30-45s', rest: '30s', difficulty: 'iniciante' },
    { id: 'core-006', name: 'Bicycle Crunch', muscles: ['Oblíquos', 'Abdômen'], sets: 3, reps: '20-30', rest: '30s', difficulty: 'iniciante' },
    { id: 'core-007', name: 'Leg Raise', muscles: ['Abdômen Inferior'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'intermediário' },
    { id: 'core-008', name: 'Pallof Press', muscles: ['Core', 'Oblíquos'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'intermediário' },
  ],
};

const allExercises = Object.values(exercisesDatabase).flat();

// ============================================
// GERADORES LOCAIS (Fallback sem backend)
// ============================================

const generateLocalWorkout = (userProfile) => {
  const {
    objective = 'hipertrofia',
    level = 'intermediário',
    daysPerWeek = 4,
    sessionDuration = 60,
    equipment = [],
    restrictions = [],
  } = userProfile;

  // Split de treino baseado nos dias por semana
  const splits = {
    1: [{ focus: 'Full Body', muscles: ['chest', 'back', 'legs', 'shoulders', 'biceps', 'triceps', 'core'] }],
    2: [
      { focus: 'Superior', muscles: ['chest', 'back', 'shoulders', 'biceps', 'triceps'] },
      { focus: 'Inferior', muscles: ['legs', 'core'] }
    ],
    3: [
      { focus: 'Empurrar', muscles: ['chest', 'shoulders', 'triceps'] },
      { focus: 'Puxar', muscles: ['back', 'biceps'] },
      { focus: 'Pernas', muscles: ['legs', 'core'] }
    ],
    4: [
      { focus: 'Peito & Tríceps', muscles: ['chest', 'triceps'] },
      { focus: 'Costas & Bíceps', muscles: ['back', 'biceps'] },
      { focus: 'Pernas Completo', muscles: ['legs'] },
      { focus: 'Ombros & Core', muscles: ['shoulders', 'core'] }
    ],
    5: [
      { focus: 'Peito', muscles: ['chest'] },
      { focus: 'Costas', muscles: ['back'] },
      { focus: 'Pernas', muscles: ['legs'] },
      { focus: 'Ombros', muscles: ['shoulders'] },
      { focus: 'Braços & Core', muscles: ['biceps', 'triceps', 'core'] }
    ],
    6: [
      { focus: 'Peito & Bíceps', muscles: ['chest', 'biceps'] },
      { focus: 'Costas & Tríceps', muscles: ['back', 'triceps'] },
      { focus: 'Pernas Anterior', muscles: ['legs'] },
      { focus: 'Ombros & Trapézio', muscles: ['shoulders'] },
      { focus: 'Pernas Posterior', muscles: ['legs'] },
      { focus: 'Braços & Core', muscles: ['biceps', 'triceps', 'core'] }
    ],
  };

  const split = splits[daysPerWeek] || splits[4];
  const repsScheme = {
    hipertrofia: { min: 8, max: 12 },
    emagrecimento: { min: 12, max: 20 },
    forca: { min: 4, max: 6 },
    resistencia: { min: 15, max: 25 },
  };

  const scheme = repsScheme[objective] || repsScheme.hipertrofia;
  const setsByLevel = { iniciante: 3, intermediario: 4, avancado: 5 };
  const sets = setsByLevel[level] || 3;

  const days = split.map((day, idx) => {
    const dayNames = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
    const exercises = [];

    day.muscles.forEach(muscle => {
      const muscleExercises = exercisesDatabase[muscle] || [];
      const numExercises = muscleExercises.length > 3 ? 2 : 1;

      for (let i = 0; i < numExercises && i < muscleExercises.length; i++) {
        const ex = muscleExercises[i];
        exercises.push({
          name: ex.name,
          muscle: ex.muscles[0],
          sets: ex.sets || sets,
          reps: `${scheme.min}-${scheme.max}`,
          rest: ex.rest || '60s',
          tempo: '2-1-1',
          notes: objective === 'hipertrofia' ? 'Foque na contração' : objective === 'emagrecimento' ? 'Mantenha ritmo acelerado' : 'Priorize a carga'
        });
      }
    });

    return {
      day: dayNames[idx] || `Dia ${idx + 1}`,
      focus: day.focus,
      duration: sessionDuration,
      exercises
    };
  });

  const caloriesByObjective = {
    hipertrofia: 3000,
    emagrecimento: 2000,
    forca: 2800,
    resistencia: 2500,
  };

  return {
    title: `Plano de Treino - ${objective.charAt(0).toUpperCase() + objective.slice(1)}`,
    description: `Treino personalizado de ${daysPerWeek} dias para ${level} com foco em ${objective}`,
    objective,
    level,
    daysPerWeek,
    totalWeeks: 12,
    days,
    nutrition: {
      dailyCalories: caloriesByObjective[objective] || 2500,
      macros: {
        protein: 180,
        carbs: objective === 'emagrecimento' ? 200 : 300,
        fat: 70
      }
    },
    tips: [
      'Aqueça 5-10 minutos antes do treino',
      'Mantenha hidratação adequada',
      'Descanse 48h entre treinos do mesmo grupo muscular',
      'Priorize a execução correta sobre a carga'
    ]
  };
};

const generateLocalDiet = (userProfile) => {
  const {
    objective = 'ganho_massa',
    dailyCalories = 2500,
    mealsPerDay = 5,
    restrictions = [],
    preferences = {},
  } = userProfile;

  const mealsDatabase = {
    breakfast: [
      { name: 'Ovos mexidos com pão integral', calories: 400, protein: 25, carbs: 35, fat: 15 },
      { name: 'Mingau de aveia com whey', calories: 450, protein: 30, carbs: 50, fat: 10 },
      { name: 'Iogurte com frutas e granola', calories: 350, protein: 20, carbs: 45, fat: 12 },
      { name: 'Panqueca de banana com aveia', calories: 400, protein: 18, carbs: 55, fat: 14 },
    ],
    lunch: [
      { name: 'Frango com arroz e feijão', calories: 600, protein: 45, carbs: 60, fat: 15 },
      { name: 'Peixe com batata doce', calories: 550, protein: 40, carbs: 55, fat: 12 },
      { name: 'Carne moída com macarrão', calories: 650, protein: 40, carbs: 65, fat: 20 },
      { name: 'Omelete com salada', calories: 450, protein: 30, carbs: 25, fat: 25 },
    ],
    dinner: [
      { name: 'Frango grelhado com legumes', calories: 500, protein: 40, carbs: 30, fat: 18 },
      { name: 'Peixe assado com arroz', calories: 550, protein: 38, carbs: 45, fat: 15 },
      { name: 'Ovos com salada completa', calories: 400, protein: 28, carbs: 20, fat: 22 },
      { name: 'Carne com purê de batata', calories: 600, protein: 35, carbs: 50, fat: 25 },
    ],
    snack: [
      { name: 'Whey com banana', calories: 250, protein: 25, carbs: 30, fat: 3 },
      { name: 'Iogurte proteico', calories: 180, protein: 20, carbs: 15, fat: 4 },
      { name: 'Castanhas e frutas secas', calories: 300, protein: 10, carbs: 25, fat: 20 },
      { name: 'Barra de proteína', calories: 200, protein: 20, carbs: 18, fat: 6 },
    ],
  };

  const macrosByObjective = {
    ganho_massa: { protein: 2, carbs: 4, fat: 1 },
    perda_gordura: { protein: 2.5, carbs: 2, fat: 0.8 },
    manutencao: { protein: 1.8, carbs: 3, fat: 1 },
  };

  const macroRatio = macrosByObjective[objective] || macrosByObjective.manutencao;
  const totalProtein = Math.round(dailyCalories * macroRatio.protein / 4 * 0.25);
  const totalCarbs = Math.round(dailyCalories * macroRatio.carbs / 4 * 0.55);
  const totalFat = Math.round(dailyCalories * macroRatio.fat / 9 * 0.20);

  const meals = [];
  const mealNames = ['Café da Manhã', 'Lanche da Manhã', 'Almoço', 'Lanche da Tarde', 'Jantar'];
  const mealTimes = ['07:00', '10:00', '12:30', '16:00', '20:00'];

  for (let i = 0; i < mealsPerDay && i < 5; i++) {
    let mealTemplate;
    if (i === 0) mealTemplate = mealsDatabase.breakfast;
    else if (i === 2) mealTemplate = mealsDatabase.lunch;
    else if (i === 4) mealTemplate = mealsDatabase.dinner;
    else mealTemplate = mealsDatabase.snack;

    const meal = mealTemplate[Math.floor(Math.random() * mealTemplate.length)];
    meals.push({
      name: mealNames[i],
      time: mealTimes[i],
      calories: meal.calories,
      items: [{
        food: meal.name,
        quantity: '1',
        unit: 'porção',
        calories: meal.calories,
        protein: meal.protein,
        carbs: meal.carbs,
        fat: meal.fat
      }],
      substitutions: mealTemplate.filter((_, idx) => idx !== mealTemplate.indexOf(meal)).map(m => m.name).slice(0, 2)
    });
  }

  return {
    title: `Plano Alimentar - ${objective.replace('_', ' ').charAt(0).toUpperCase() + objective.replace('_', ' ').slice(1)}`,
    objective,
    dailyCalories,
    macros: {
      protein: totalProtein,
      carbs: totalCarbs,
      fat: totalFat
    },
    meals,
    tips: [
      'Beba pelo menos 3L de água por dia',
      'Priorize alimentos integrais',
      'Evite açúcar refinado',
      'Coma devagar e mastigue bem'
    ],
    shoppingList: [
      'Peito de frango',
      'Ovos',
      'Arroz integral',
      'Batata doce',
      'Aveia',
      'Whey protein',
      'Frutas variadas',
      'Legumes e verduras',
      'Azeite de oliva',
      'Castanhas'
    ]
  };
};

const chatResponsesLocal = {
  greetings: {
    patterns: ['oi', 'olá', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'eai', 'hey'],
    response: `Olá! 💪 Sou seu assistente pessoal Gym AI!

Estou aqui para ajudar você a alcançar seus objetivos fitness. Posso:

• Criar treinos personalizados
• Sugerir planos alimentares
• Tirar dúvidas sobre exercícios
• Dar dicas de nutrição
• Acompanhar seu progresso

O que você gostaria de fazer hoje?`,
    suggestions: ['Criar treino', 'Plano alimentar', 'Dicas de exercício']
  },
  workout: {
    patterns: ['treino', 'exercício', 'exercicios', 'musculação', 'academia'],
    response: `Posso criar um treino personalizado para você! 🏋️

Para montar o plano ideal, preciso saber:

1. **Qual seu objetivo?**
   - Hipertrofia (ganhar massa)
   - Emagrecimento (perder gordura)
   - Força
   - Resistência

2. **Quantos dias pode treinar?** (1-6 dias)

3. **Qual seu nível?**
   - Iniciante
   - Intermediário
   - Avançado

Me conte mais sobre você!`,
    suggestions: ['Hipertrofia', 'Emagrecimento', 'Força']
  },
  diet: {
    patterns: ['dieta', 'alimentação', 'comida', 'nutrição', 'refeição', 'caloria'],
    response: `Nutrição é 70% dos resultados! 🥗

Para criar seu plano alimentar, preciso saber:

1. **Qual seu objetivo?**
   - Ganho de massa muscular
   - Perda de gordura
   - Manutenção do peso

2. **Tem alguma restrição alimentar?**
   (vegetariano, intolerância a lactose, etc.)

3. **Quantas refeições prefere?** (4-6 por dia)

Vamos montar sua dieta juntos!`,
    suggestions: ['Ganhar massa', 'Perder gordura', 'Manter peso']
  },
  progress: {
    patterns: ['progresso', 'resultado', 'evolução', 'estatística'],
    response: `Acompanhar o progresso é essencial! 📈

Seu histórico de treinos:
• Treinos completados: 12
• Peso médio levantado: +15%
• Consistência: 85%

Dicas para melhorar:
• Mantenha a regularidade
• Aumente as cargas gradualmente
• Durma 7-8h por noite
• Alimente-se adequadamente

Quer ver gráficos detalhados?`,
    suggestions: ['Ver gráficos', 'Histórico completo']
  },
  motivation: {
    patterns: ['motiv', 'cansado', 'desist', 'difícil', 'difícil'],
    response: `Lembre-se do porquê você começou! 💪

"O sucesso é a soma de pequenos esforços repetidos dia após dia."

Você já chegou até aqui - não desista agora! Cada treino conta, cada refeição saudável faz diferença.

Dica do dia: Foque no processo, não apenas no resultado. Celebre cada pequena vitória!

Vamos juntos! 🔥`,
    suggestions: ['Continuar', 'Novo treino']
  },
  default: {
    response: `Entendi! 💪

Para te ajudar melhor, posso:

1. **Criar um treino personalizado** - Baseado no seu objetivo e nível
2. **Sugerir um plano alimentar** - Adaptado às suas necessidades
3. **Explicar exercícios** - Técnica e execução correta
4. **Dar dicas de nutrição** - Para otimizar resultados

O que você prefere?`,
    suggestions: ['Criar treino', 'Plano alimentar', 'Dúvidas']
  }
};

const generateLocalChatResponse = (message, conversationHistory = []) => {
  const lowerMessage = message.toLowerCase();

  // Encontrar a categoria que melhor corresponde à mensagem
  for (const [category, data] of Object.entries(chatResponsesLocal)) {
    if (category === 'default') continue;

    if (data.patterns.some(pattern => lowerMessage.includes(pattern))) {
      return {
        response: data.response,
        suggestions: data.suggestions
      };
    }
  }

  return {
    response: chatResponsesLocal.default.response,
    suggestions: chatResponsesLocal.default.suggestions
  };
};

// ============================================
// FUNÇÕES PRINCIPAIS (com fallback)
// ============================================

/**
 * Gera um treino personalizado (backend ou local)
 */
export const generateWorkout = async (userProfile) => {
  if (DEV_MODE) {
    console.log('🔧 Modo DEV: usando gerador local de treinos');
    return generateLocalWorkout(userProfile);
  }

  try {
    const response = await api.post('/ai/generate-workout', { userProfile });
    return response.data;
  } catch (error) {
    console.warn('⚠️ Backend indisponível, usando fallback local');
    return generateLocalWorkout(userProfile);
  }
};

/**
 * Gera um plano alimentar (backend ou local)
 */
export const generateDiet = async (userProfile) => {
  if (DEV_MODE) {
    console.log('🔧 Modo DEV: usando gerador local de dietas');
    return generateLocalDiet(userProfile);
  }

  try {
    const response = await api.post('/ai/generate-diet', { userProfile });
    return response.data;
  } catch (error) {
    console.warn('⚠️ Backend indisponível, usando fallback local');
    return generateLocalDiet(userProfile);
  }
};

/**
 * Chat com IA (backend ou local)
 */
export const chatWithAI = async (message, conversationHistory = []) => {
  if (DEV_MODE) {
    console.log('🔧 Modo DEV: usando chat local');
    const result = generateLocalChatResponse(message, conversationHistory);
    return result.response;
  }

  try {
    const response = await api.post('/ai/chat', { message, conversationHistory });
    return response.data.response;
  } catch (error) {
    console.warn('⚠️ Backend indisponível, usando fallback local');
    const result = generateLocalChatResponse(message, conversationHistory);
    return result.response;
  }
};

/**
 * Salva o plano gerado (apenas backend)
 */
export const saveGeneratedPlan = async (userId, workout, diet) => {
  if (DEV_MODE) {
    // Salvar no localStorage em modo DEV
    localStorage.setItem('latestWorkout', JSON.stringify(workout));
    localStorage.setItem('latestDiet', JSON.stringify(diet));
    return { success: true, message: 'Plano salvo localmente' };
  }

  try {
    const response = await api.post('/ai/save-plan', { userId, workout, diet });
    return response.data;
  } catch (error) {
    console.warn('⚠️ Não foi possível salvar no backend');
    localStorage.setItem('latestWorkout', JSON.stringify(workout));
    localStorage.setItem('latestDiet', JSON.stringify(diet));
    return { success: true, message: 'Plano salvo localmente' };
  }
};

/**
 * Busca o último plano salvo
 */
export const getLatestPlan = async (userId) => {
  if (DEV_MODE) {
    const workout = JSON.parse(localStorage.getItem('latestWorkout') || 'null');
    const diet = JSON.parse(localStorage.getItem('latestDiet') || 'null');
    return { latestWorkout: workout, latestDiet: diet };
  }

  try {
    const response = await api.get(`/ai/latest-plan/${userId}`);
    return response.data;
  } catch (error) {
    const workout = JSON.parse(localStorage.getItem('latestWorkout') || 'null');
    const diet = JSON.parse(localStorage.getItem('latestDiet') || 'null');
    return { latestWorkout: workout, latestDiet: diet };
  }
};

/**
 * Busca exercícios do banco local
 */
export const getExercises = (filters = {}) => {
  const { muscle, difficulty, equipment } = filters;

  let result = allExercises;

  if (muscle) {
    result = result.filter(ex =>
      ex.muscles.some(m => m.toLowerCase().includes(muscle.toLowerCase()))
    );
  }

  if (difficulty) {
    result = result.filter(ex => ex.difficulty === difficulty);
  }

  return result;
};

/**
 * Busca um exercício específico por ID
 */
export const getExerciseById = (id) => {
  return allExercises.find(ex => ex.id === id);
};

/**
 * Gera sugestões de exercícios baseadas no objetivo
 */
export const getSuggestedExercises = (objective, level, targetMuscle) => {
  const exercises = getExercises({ muscle: targetMuscle });

  // Filtrar por dificuldade
  const filtered = level === 'iniciante'
    ? exercises.filter(ex => ex.difficulty === 'iniciante')
    : level === 'intermediario'
      ? exercises.filter(ex => ['iniciante', 'intermediário'].includes(ex.difficulty))
      : exercises;

  return filtered.slice(0, 5);
};

export default {
  generateWorkout,
  generateDiet,
  chatWithAI,
  saveGeneratedPlan,
  getLatestPlan,
  getExercises,
  getExerciseById,
  getSuggestedExercises,
};
