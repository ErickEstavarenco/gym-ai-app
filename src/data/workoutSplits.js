import { getExercisesByCategory } from './exercises';

/**
 * Splits pré-definidos (A/B/C) — fonte primária para o /workout.
 *
 * Cada split aponta pros exercícios do `exercises.js` (mesma fonte que o
 * ExerciseTutorialSheet usa para mostrar vídeos). A função `getSplitForToday`
 * escolhe o split baseado no dia da semana, mas o usuário pode forçar via
 * `WorkoutContext.activeSplitId` (botão "Próximo split" ou comando do chat).
 */

const parseRest = (restStr = '') => {
  // '60-90s' -> 90 (maior); '45s' -> 45; '90s' -> 90.
  const nums = restStr.match(/\d+/g);
  if (!nums) return 60;
  return Math.max(...nums.map(Number));
};

const decorate = (ex, idx) => ({
  id: idx + 1,
  name: ex.name,
  sets: ex.sets || 4,
  reps: ex.reps || '8-12',
  weight: '—',
  completed: 0,
  restSeconds: parseRest(ex.rest),
  // Carrega o link de vídeo direto pra ficar fácil de plugar em overlays futuros
  videoEmbed: ex.videoEmbed,
});

const build = (category, indexes) =>
  indexes
    .map((i) => getExercisesByCategory(category)[i])
    .filter(Boolean)
    .map(decorate);

export const WORKOUT_SPLITS = [
  {
    id: 'A',
    name: 'Peito & Tríceps',
    focus: 'HIPERTROFIA',
    days: [1, 4], // Segunda, Quinta
    exercises: [
      ...build('chest', [0, 1, 2]), // Supino Reto, Supino Inclinado, Supino Declinado
      ...build('triceps', [0, 1]), // Tríceps Corda, Tríceps Testa
    ],
  },
  {
    id: 'B',
    name: 'Costas & Bíceps',
    focus: 'FORÇA',
    days: [2, 5], // Terça, Sexta
    exercises: [
      ...build('back', [0, 2, 3]), // Barra Fixa, Remada Curvada, Remada Sentada
      ...build('biceps', [0, 2]), // Rosca Direta, Rosca Scott
    ],
  },
  {
    id: 'C',
    name: 'Pernas & Ombros',
    focus: 'HIPERTROFIA',
    days: [3, 6], // Quarta, Sábado
    exercises: [
      ...build('legs', [0, 1, 7]), // Agachamento Livre, Leg Press, Stiff
      ...build('shoulders', [0, 1]), // Desenvolvimento, Elevação Lateral
    ],
  },
];

export const getSplitForToday = (date = new Date()) => {
  const day = date.getDay(); // 0=Dom, 1=Seg, ...
  const match = WORKOUT_SPLITS.find((s) => s.days.includes(day));
  return match || WORKOUT_SPLITS[0];
};

export const getSplitById = (id) => WORKOUT_SPLITS.find((s) => s.id === id) || WORKOUT_SPLITS[0];

export const getNextSplitId = (currentId) => {
  if (!currentId) return WORKOUT_SPLITS[0].id;
  const idx = WORKOUT_SPLITS.findIndex((s) => s.id === currentId);
  if (idx < 0) return WORKOUT_SPLITS[0].id;
  return WORKOUT_SPLITS[(idx + 1) % WORKOUT_SPLITS.length].id;
};