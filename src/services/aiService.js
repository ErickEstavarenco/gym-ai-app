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
// BANCO DE EXERCÃCIOS LOCAL (Fallback)
// ============================================

const exercisesDatabase = {
  chest: [
    { id: 'chest-001', name: 'Supino Reto', muscles: ['Peitoral', 'TrÃ­ceps'], sets: 4, reps: '8-12', rest: '60-90s', difficulty: 'intermediÃ¡rio' },
    { id: 'chest-002', name: 'Supino Inclinado', muscles: ['Peitoral Superior', 'TrÃ­ceps'], sets: 4, reps: '10-12', rest: '60-90s', difficulty: 'intermediÃ¡rio' },
    { id: 'chest-003', name: 'Crucifixo', muscles: ['Peitoral'], sets: 3, reps: '12-15', rest: '45-60s', difficulty: 'iniciante' },
    { id: 'chest-004', name: 'Crossover Polia', muscles: ['Peitoral'], sets: 3, reps: '12-15', rest: '45-60s', difficulty: 'intermediÃ¡rio' },
    { id: 'chest-005', name: 'FlexÃ£o de BraÃ§o', muscles: ['Peitoral', 'TrÃ­ceps'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'chest-006', name: 'Supino Declinado', muscles: ['Peitoral Inferior'], sets: 4, reps: '8-10', rest: '90s', difficulty: 'intermediÃ¡rio' },
    { id: 'chest-007', name: 'Peck Deck', muscles: ['Peitoral'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'chest-008', name: 'Pull-over', muscles: ['Peitoral', 'Dorsal'], sets: 3, reps: '12-15', rest: '60s', difficulty: 'intermediÃ¡rio' },
  ],
  back: [
    { id: 'back-001', name: 'Barra Fixa', muscles: ['Dorsal', 'BÃ­ceps'], sets: 4, reps: '8-12', rest: '90s', difficulty: 'intermediÃ¡rio' },
    { id: 'back-002', name: 'Pulley Frente', muscles: ['Dorsal', 'BÃ­ceps'], sets: 4, reps: '10-12', rest: '60-90s', difficulty: 'iniciante' },
    { id: 'back-003', name: 'Remada Curvada', muscles: ['Dorsal', 'TrapÃ©zio'], sets: 4, reps: '8-12', rest: '90s', difficulty: 'intermediÃ¡rio' },
    { id: 'back-004', name: 'Remada Sentada', muscles: ['Dorsal', 'TrapÃ©zio'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'iniciante' },
    { id: 'back-005', name: 'Levantamento Terra', muscles: ['Costas', 'GlÃºteos', 'Legs'], sets: 3, reps: '5-8', rest: '120s', difficulty: 'avanÃ§ado' },
    { id: 'back-006', name: 'Remada Unilateral', muscles: ['Dorsal'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'iniciante' },
    { id: 'back-007', name: 'Pulley Costas', muscles: ['Dorsal'], sets: 3, reps: '12-15', rest: '60s', difficulty: 'iniciante' },
    { id: 'back-008', name: 'HiperextensÃ£o', muscles: ['Lombar', 'GlÃºteos'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
  ],
  legs: [
    { id: 'legs-001', name: 'Agachamento Livre', muscles: ['QuadrÃ­ceps', 'GlÃºteos'], sets: 4, reps: '8-12', rest: '90-120s', difficulty: 'intermediÃ¡rio' },
    { id: 'legs-002', name: 'Leg Press 45Â°', muscles: ['QuadrÃ­ceps', 'GlÃºteos'], sets: 4, reps: '10-15', rest: '90s', difficulty: 'iniciante' },
    { id: 'legs-003', name: 'Cadeira Extensora', muscles: ['QuadrÃ­ceps'], sets: 3, reps: '12-15', rest: '45-60s', difficulty: 'iniciante' },
    { id: 'legs-004', name: 'Mesa Flexora', muscles: ['Isquiotibiais'], sets: 3, reps: '12-15', rest: '60s', difficulty: 'iniciante' },
    { id: 'legs-005', name: 'ElevaÃ§Ã£o PÃ©lvica', muscles: ['GlÃºteos'], sets: 4, reps: '10-12', rest: '90s', difficulty: 'intermediÃ¡rio' },
    { id: 'legs-006', name: 'Panturrilha Sentado', muscles: ['Panturrilha'], sets: 4, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'legs-007', name: 'Agachamento BÃºlgaro', muscles: ['QuadrÃ­ceps', 'GlÃºteos'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'intermediÃ¡rio' },
    { id: 'legs-008', name: 'Stiff', muscles: ['Isquiotibiais', 'GlÃºteos'], sets: 3, reps: '10-12', rest: '90s', difficulty: 'intermediÃ¡rio' },
    { id: 'legs-009', name: 'Cadeira Adutora', muscles: ['Adutores'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'legs-010', name: 'Cadeira Abdutora', muscles: ['Abdutores'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'legs-011', name: 'Panturrilha em PÃ©', muscles: ['Panturrilha'], sets: 4, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'legs-012', name: 'Agachamento SumÃ´', muscles: ['QuadrÃ­ceps', 'Adutores'], sets: 3, reps: '12-15', rest: '90s', difficulty: 'intermediÃ¡rio' },
  ],
  shoulders: [
    { id: 'shoulder-001', name: 'Desenvolvimento', muscles: ['Deltoide', 'TrÃ­ceps'], sets: 4, reps: '8-12', rest: '90s', difficulty: 'intermediÃ¡rio' },
    { id: 'shoulder-002', name: 'ElevaÃ§Ã£o Lateral', muscles: ['Deltoide Lateral'], sets: 3, reps: '12-15', rest: '45-60s', difficulty: 'iniciante' },
    { id: 'shoulder-003', name: 'ElevaÃ§Ã£o Frontal', muscles: ['Deltoide Anterior'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'shoulder-004', name: 'Face Pull', muscles: ['Deltoide Posterior', 'TrapÃ©zio'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
    { id: 'shoulder-005', name: 'Desenvolvimento Halteres', muscles: ['Deltoide'], sets: 4, reps: '10-12', rest: '90s', difficulty: 'intermediÃ¡rio' },
    { id: 'shoulder-006', name: 'Remada Alta', muscles: ['Deltoide', 'TrapÃ©zio'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'intermediÃ¡rio' },
    { id: 'shoulder-007', name: 'Crucifixo Inverso', muscles: ['Deltoide Posterior'], sets: 3, reps: '15-20', rest: '45s', difficulty: 'iniciante' },
  ],
  biceps: [
    { id: 'bicep-001', name: 'Rosca Direta', muscles: ['BÃ­ceps'], sets: 4, reps: '8-12', rest: '60s', difficulty: 'iniciante' },
    { id: 'bicep-002', name: 'Rosca Martelo', muscles: ['BÃ­ceps', 'Braquial'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'iniciante' },
    { id: 'bicep-003', name: 'Rosca Scott', muscles: ['BÃ­ceps'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'intermediÃ¡rio' },
    { id: 'bicep-004', name: 'Rosca Concentrada', muscles: ['BÃ­ceps'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'bicep-005', name: 'Rosca Polia', muscles: ['BÃ­ceps'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'bicep-006', name: 'Rosca Inversa', muscles: ['BÃ­ceps', 'AntebraÃ§o'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'bicep-007', name: 'Rosca 21', muscles: ['BÃ­ceps'], sets: 3, reps: '21', rest: '60s', difficulty: 'avanÃ§ado' },
  ],
  triceps: [
    { id: 'tri-001', name: 'TrÃ­ceps Corda', muscles: ['TrÃ­ceps'], sets: 4, reps: '12-15', rest: '45-60s', difficulty: 'iniciante' },
    { id: 'tri-002', name: 'TrÃ­ceps Testa', muscles: ['TrÃ­ceps'], sets: 3, reps: '10-12', rest: '60-90s', difficulty: 'intermediÃ¡rio' },
    { id: 'tri-003', name: 'TrÃ­ceps FrancÃªs', muscles: ['TrÃ­ceps'], sets: 3, reps: '10-12', rest: '60s', difficulty: 'intermediÃ¡rio' },
    { id: 'tri-004', name: 'TrÃ­ceps Banco', muscles: ['TrÃ­ceps'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'tri-005', name: 'TrÃ­ceps Polia', muscles: ['TrÃ­ceps'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'iniciante' },
    { id: 'tri-006', name: 'Mergulho Paralelas', muscles: ['TrÃ­ceps', 'Peitoral'], sets: 3, reps: '10-15', rest: '60s', difficulty: 'intermediÃ¡rio' },
    { id: 'tri-007', name: 'Diamond Push-up', muscles: ['TrÃ­ceps', 'Peitoral'], sets: 3, reps: '10-15', rest: '45s', difficulty: 'intermediÃ¡rio' },
  ],
  core: [
    { id: 'core-001', name: 'Prancha', muscles: ['AbdÃ´men', 'Core'], sets: 3, reps: '30-60s', rest: '30s', difficulty: 'iniciante' },
    { id: 'core-002', name: 'Abdominal Supra', muscles: ['AbdÃ´men'], sets: 3, reps: '15-20', rest: '30s', difficulty: 'iniciante' },
    { id: 'core-003', name: 'Abdominal Infra', muscles: ['AbdÃ´men Inferior'], sets: 3, reps: '12-15', rest: '30s', difficulty: 'intermediÃ¡rio' },
    { id: 'core-004', name: 'Russian Twist', muscles: ['OblÃ­quos'], sets: 3, reps: '20-30', rest: '30s', difficulty: 'iniciante' },
    { id: 'core-005', name: 'Mountain Climber', muscles: ['Core', 'Cardio'], sets: 3, reps: '30-45s', rest: '30s', difficulty: 'iniciante' },
    { id: 'core-006', name: 'Bicycle Crunch', muscles: ['OblÃ­quos', 'AbdÃ´men'], sets: 3, reps: '20-30', rest: '30s', difficulty: 'iniciante' },
    { id: 'core-007', name: 'Leg Raise', muscles: ['AbdÃ´men Inferior'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'intermediÃ¡rio' },
    { id: 'core-008', name: 'Pallof Press', muscles: ['Core', 'OblÃ­quos'], sets: 3, reps: '12-15', rest: '45s', difficulty: 'intermediÃ¡rio' },
  ],
};

const allExercises = Object.values(exercisesDatabase).flat();

// ============================================
// GERADORES LOCAIS (Fallback sem backend)
// ============================================

export const generateLocalWorkout = (userProfile = {}) => {
  const {
    objective = 'hipertrofia',
    level = 'intermediÃ¡rio',
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
      { focus: 'Peito & TrÃ­ceps', muscles: ['chest', 'triceps'] },
      { focus: 'Costas & BÃ­ceps', muscles: ['back', 'biceps'] },
      { focus: 'Pernas Completo', muscles: ['legs'] },
      { focus: 'Ombros & Core', muscles: ['shoulders', 'core'] }
    ],
    5: [
      { focus: 'Peito', muscles: ['chest'] },
      { focus: 'Costas', muscles: ['back'] },
      { focus: 'Pernas', muscles: ['legs'] },
      { focus: 'Ombros', muscles: ['shoulders'] },
      { focus: 'BraÃ§os & Core', muscles: ['biceps', 'triceps', 'core'] }
    ],
    6: [
      { focus: 'Peito & BÃ­ceps', muscles: ['chest', 'biceps'] },
      { focus: 'Costas & TrÃ­ceps', muscles: ['back', 'triceps'] },
      { focus: 'Pernas Anterior', muscles: ['legs'] },
      { focus: 'Ombros & TrapÃ©zio', muscles: ['shoulders'] },
      { focus: 'Pernas Posterior', muscles: ['legs'] },
      { focus: 'BraÃ§os & Core', muscles: ['biceps', 'triceps', 'core'] }
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
    const dayNames = ['Segunda', 'TerÃ§a', 'Quarta', 'Quinta', 'Sexta', 'SÃ¡bado'];
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
          notes: objective === 'hipertrofia' ? 'Foque na contraÃ§Ã£o' : objective === 'emagrecimento' ? 'Mantenha ritmo acelerado' : 'Priorize a carga'
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
      'AqueÃ§a 5-10 minutos antes do treino',
      'Mantenha hidrataÃ§Ã£o adequada',
      'Descanse 48h entre treinos do mesmo grupo muscular',
      'Priorize a execuÃ§Ã£o correta sobre a carga'
    ]
  };
};

export const generateLocalDiet = (userProfile = {}) => {
  const {
    objective = 'ganho_massa',
    dailyCalories = 2500,
    mealsPerDay = 5,
    restrictions = [],
    preferences = {},
  } = userProfile;

  const mealsDatabase = {
    breakfast: [
      { name: 'Ovos mexidos com pÃ£o integral', calories: 400, protein: 25, carbs: 35, fat: 15 },
      { name: 'Mingau de aveia com whey', calories: 450, protein: 30, carbs: 50, fat: 10 },
      { name: 'Iogurte com frutas e granola', calories: 350, protein: 20, carbs: 45, fat: 12 },
      { name: 'Panqueca de banana com aveia', calories: 400, protein: 18, carbs: 55, fat: 14 },
    ],
    lunch: [
      { name: 'Frango com arroz e feijÃ£o', calories: 600, protein: 45, carbs: 60, fat: 15 },
      { name: 'Peixe com batata doce', calories: 550, protein: 40, carbs: 55, fat: 12 },
      { name: 'Carne moÃ­da com macarrÃ£o', calories: 650, protein: 40, carbs: 65, fat: 20 },
      { name: 'Omelete com salada', calories: 450, protein: 30, carbs: 25, fat: 25 },
    ],
    dinner: [
      { name: 'Frango grelhado com legumes', calories: 500, protein: 40, carbs: 30, fat: 18 },
      { name: 'Peixe assado com arroz', calories: 550, protein: 38, carbs: 45, fat: 15 },
      { name: 'Ovos com salada completa', calories: 400, protein: 28, carbs: 20, fat: 22 },
      { name: 'Carne com purÃª de batata', calories: 600, protein: 35, carbs: 50, fat: 25 },
    ],
    snack: [
      { name: 'Whey com banana', calories: 250, protein: 25, carbs: 30, fat: 3 },
      { name: 'Iogurte proteico', calories: 180, protein: 20, carbs: 15, fat: 4 },
      { name: 'Castanhas e frutas secas', calories: 300, protein: 10, carbs: 25, fat: 20 },
      { name: 'Barra de proteÃ­na', calories: 200, protein: 20, carbs: 18, fat: 6 },
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
  const mealNames = ['CafÃ© da ManhÃ£', 'Lanche da ManhÃ£', 'AlmoÃ§o', 'Lanche da Tarde', 'Jantar'];
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
        unit: 'porÃ§Ã£o',
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
      'Beba pelo menos 3L de Ã¡gua por dia',
      'Priorize alimentos integrais',
      'Evite aÃ§Ãºcar refinado',
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
    patterns: ['oi', 'olÃ¡', 'ola', 'bom dia', 'boa tarde', 'boa noite', 'eai', 'hey'],
    response: `OlÃ¡! ðŸ’ª Sou seu assistente pessoal Gym AI!

Estou aqui para ajudar vocÃª a alcanÃ§ar seus objetivos fitness. Posso:

â€¢ Criar treinos personalizados
â€¢ Sugerir planos alimentares
â€¢ Tirar dÃºvidas sobre exercÃ­cios
â€¢ Dar dicas de nutriÃ§Ã£o
â€¢ Acompanhar seu progresso

O que vocÃª gostaria de fazer hoje?`,
    suggestions: ['Criar treino', 'Plano alimentar', 'Dicas de exercÃ­cio']
  },
  workout: {
    patterns: ['treino', 'exercÃ­cio', 'exercicios', 'musculaÃ§Ã£o', 'academia'],
    response: `Posso criar um treino personalizado para vocÃª! ðŸ‹ï¸

Para montar o plano ideal, preciso saber:

1. **Qual seu objetivo?**
   - Hipertrofia (ganhar massa)
   - Emagrecimento (perder gordura)
   - ForÃ§a
   - ResistÃªncia

2. **Quantos dias pode treinar?** (1-6 dias)

3. **Qual seu nÃ­vel?**
   - Iniciante
   - IntermediÃ¡rio
   - AvanÃ§ado

Me conte mais sobre vocÃª!`,
    suggestions: ['Hipertrofia', 'Emagrecimento', 'ForÃ§a']
  },
  diet: {
    patterns: ['dieta', 'alimentaÃ§Ã£o', 'comida', 'nutriÃ§Ã£o', 'refeiÃ§Ã£o', 'caloria'],
    response: `NutriÃ§Ã£o Ã© 70% dos resultados! ðŸ¥—

Para criar seu plano alimentar, preciso saber:

1. **Qual seu objetivo?**
   - Ganho de massa muscular
   - Perda de gordura
   - ManutenÃ§Ã£o do peso

2. **Tem alguma restriÃ§Ã£o alimentar?**
   (vegetariano, intolerÃ¢ncia a lactose, etc.)

3. **Quantas refeiÃ§Ãµes prefere?** (4-6 por dia)

Vamos montar sua dieta juntos!`,
    suggestions: ['Ganhar massa', 'Perder gordura', 'Manter peso']
  },
  progress: {
    patterns: ['progresso', 'resultado', 'evoluÃ§Ã£o', 'estatÃ­stica'],
    response: `Acompanhar o progresso Ã© essencial! ðŸ“ˆ

Seu histÃ³rico de treinos:
â€¢ Treinos completados: 12
â€¢ Peso mÃ©dio levantado: +15%
â€¢ ConsistÃªncia: 85%

Dicas para melhorar:
â€¢ Mantenha a regularidade
â€¢ Aumente as cargas gradualmente
â€¢ Durma 7-8h por noite
â€¢ Alimente-se adequadamente

Quer ver grÃ¡ficos detalhados?`,
    suggestions: ['Ver grÃ¡ficos', 'HistÃ³rico completo']
  },
  motivation: {
    patterns: ['motiv', 'cansado', 'desist', 'difÃ­cil', 'difÃ­cil'],
    response: `Lembre-se do porquÃª vocÃª comeÃ§ou! ðŸ’ª

"O sucesso Ã© a soma de pequenos esforÃ§os repetidos dia apÃ³s dia."

VocÃª jÃ¡ chegou atÃ© aqui - nÃ£o desista agora! Cada treino conta, cada refeiÃ§Ã£o saudÃ¡vel faz diferenÃ§a.

Dica do dia: Foque no processo, nÃ£o apenas no resultado. Celebre cada pequena vitÃ³ria!

Vamos juntos! ðŸ”¥`,
    suggestions: ['Continuar', 'Novo treino']
  },
  default: {
    response: `Entendi! ðŸ’ª

Para te ajudar melhor, posso:

1. **Criar um treino personalizado** - Baseado no seu objetivo e nÃ­vel
2. **Sugerir um plano alimentar** - Adaptado Ã s suas necessidades
3. **Explicar exercÃ­cios** - TÃ©cnica e execuÃ§Ã£o correta
4. **Dar dicas de nutriÃ§Ã£o** - Para otimizar resultados

O que vocÃª prefere?`,
    suggestions: ['Criar treino', 'Plano alimentar', 'DÃºvidas']
  }
};

export const generateLocalChatResponse = (message, conversationHistory = []) => {
  const lowerMessage = message.toLowerCase();

  // Encontrar a categoria que melhor corresponde Ã  mensagem
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
// FUNÃ‡Ã•ES PRINCIPAIS (com fallback)
// ============================================

/**
 * Gera um treino personalizado (backend ou local)
 */
export const generateWorkout = async (userProfile) => {
  if (DEV_MODE) {
    console.log('ðŸ”§ Modo DEV: usando gerador local de treinos');
    return generateLocalWorkout(userProfile);
  }

  try {
    const response = await api.post('/ai/generate-workout', { userProfile });
    return response.data;
  } catch (error) {
    console.warn('âš ï¸ Backend indisponÃ­vel, usando fallback local');
    return generateLocalWorkout(userProfile);
  }
};

/**
 * Gera um plano alimentar (backend ou local)
 */
export const generateDiet = async (userProfile) => {
  if (DEV_MODE) {
    console.log('ðŸ”§ Modo DEV: usando gerador local de dietas');
    return generateLocalDiet(userProfile);
  }

  try {
    const response = await api.post('/ai/generate-diet', { userProfile });
    return response.data;
  } catch (error) {
    console.warn('âš ï¸ Backend indisponÃ­vel, usando fallback local');
    return generateLocalDiet(userProfile);
  }
};

/**
 * Chat com IA (backend ou local).
 *
 * Retorna sempre `{ response, suggestions }`.
 *   - DEV_MODE: usa `generateLocalChatResponse` (keyword matcher PT-BR).
 *   - Backend OK: usa a resposta da API; se ela trouxer `suggestions`, usa.
 *   - Backend falha: cai pro fallback local (sem suggestions, vazio).
 *
 * O shape Ã© estÃ¡vel â€” o hook `useCoachChat` e o componente visual (`ChatPanel`)
 * sÃ³ precisam ler `response` (string) e `suggestions` (array de strings).
 */
export const chatWithAI = async (message, conversationHistory = []) => {
  if (DEV_MODE) {
    console.log('ðŸ”§ Modo DEV: usando chat local');
    const result = generateLocalChatResponse(message, conversationHistory);
    return { response: result.response, suggestions: result.suggestions || [] };
  }

  try {
    const response = await api.post('/ai/chat', { message, conversationHistory });
    const data = response.data || {};
    return {
      response: data.response || '',
      suggestions: Array.isArray(data.suggestions) ? data.suggestions : [],
    };
  } catch (error) {
    console.warn('âš ï¸ Backend indisponÃ­vel, usando fallback local');
    const result = generateLocalChatResponse(message, conversationHistory);
    // Em fallback local, devolvemos o erro enriquecido pelo chamador
    // (useCoachChat intercepta com buildErrorMessage), entÃ£o aqui
    // passamos o objeto do erro adiante via thrown.
    error.__localFallback = {
      response: result.response,
      suggestions: result.suggestions || [],
    };
    throw error;
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
    console.warn('âš ï¸ NÃ£o foi possÃ­vel salvar no backend');
    localStorage.setItem('latestWorkout', JSON.stringify(workout));
    localStorage.setItem('latestDiet', JSON.stringify(diet));
    return { success: true, message: 'Plano salvo localmente' };
  }
};

/**
 * Busca o Ãºltimo plano salvo
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
 * Busca exercÃ­cios do banco local
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
 * Busca um exercÃ­cio especÃ­fico por ID
 */
export const getExerciseById = (id) => {
  return allExercises.find(ex => ex.id === id);
};

/**
 * Gera sugestÃµes de exercÃ­cios baseadas no objetivo
 */
export const getSuggestedExercises = (objective, level, targetMuscle) => {
  const exercises = getExercises({ muscle: targetMuscle });

  // Filtrar por dificuldade
  const filtered = level === 'iniciante'
    ? exercises.filter(ex => ex.difficulty === 'iniciante')
    : level === 'intermediario'
      ? exercises.filter(ex => ['iniciante', 'intermediÃ¡rio'].includes(ex.difficulty))
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

