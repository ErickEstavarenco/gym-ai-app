/**
 * Helpers de cálculo para Stats.jsx — pure functions reutilizáveis.
 *
 * Tudo é derivado do `WorkoutContext.savedWorkouts` (não persistimos
 * completion por workout; usamos `createdAt` como proxy da data em que
 * o treino foi gerado e calculamos caloria estimada pelos dias/séries).
 */

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const sameDay = (a, b) => {
  const da = new Date(a);
  const db = new Date(b);
  return (
    da.getFullYear() === db.getFullYear() &&
    da.getMonth() === db.getMonth() &&
    da.getDate() === db.getDate()
  );
};

export const computeStreak = (workouts = []) => {
  if (!workouts.length) return 0;
  const sorted = [...workouts].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  for (const w of sorted) {
    const wd = new Date(w.createdAt);
    wd.setHours(0, 0, 0, 0);
    if (sameDay(wd, cursor)) {
      streak++;
      cursor = new Date(cursor.getTime() - ONE_DAY_MS);
    } else if (wd.getTime() === cursor.getTime() - ONE_DAY_MS) {
      streak++;
      cursor = new Date(wd.getTime() - ONE_DAY_MS);
    } else {
      break;
    }
  }
  return streak;
};

export const estimateCalories = (workout) => {
  if (!workout) return 0;
  // Heurística leve: 50 kcal por exercício × séries. Sem séries, cai pra 0.
  if (Array.isArray(workout.days)) {
    let count = 0;
    for (const day of workout.days) {
      if (Array.isArray(day.exercises)) {
        for (const ex of day.exercises) {
          count += ex.sets || 0;
        }
      }
    }
    return count * 25; // ~25 kcal por série
  }
  return 0;
};

export const buildWeeklyData = (workouts = []) => {
  const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const week = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today.getTime() - i * ONE_DAY_MS);
    const dayWorkouts = workouts.filter((w) => sameDay(w.createdAt, d));
    const calories = dayWorkouts.reduce((acc, w) => acc + estimateCalories(w), 0);
    week.push({
      day: days[d.getDay()],
      workouts: dayWorkouts.length,
      calories,
      _date: d.toISOString(),
    });
  }
  return week;
};

export const buildAchievements = (workouts = [], streak = 0) => {
  const total = workouts.length;
  const heavyWorkout = workouts.some((w) => hasHeavyLoad(w));
  return [
    {
      id: 1,
      key: 'first_workout',
      name: 'Primeiro Treino',
      desc: 'Complete seu primeiro treino',
      icon: 'Trophy',
      unlocked: total >= 1,
    },
    {
      id: 2,
      key: 'streak_3',
      name: 'Sequência de 3',
      desc: 'Treine 3 dias seguidos',
      icon: 'Flame',
      unlocked: streak >= 3,
    },
    {
      id: 3,
      key: 'heavy_load',
      name: 'Carga Pesada',
      desc: 'Treino com séries pesadas (>= 100kg estimado)',
      icon: 'Dumbbell',
      unlocked: heavyWorkout,
    },
    {
      id: 4,
      key: 'marathon',
      name: 'Maratonista',
      desc: 'Acumule 10 treinos no plano',
      icon: 'Calendar',
      unlocked: total >= 10,
    },
  ];
};

const hasHeavyLoad = (workout) => {
  if (!workout?.days) return false;
  for (const day of workout.days) {
    for (const ex of day.exercises || []) {
      // Heurística: composto (>= 4 séries) + sets >= 4 conta como carga alta
      if ((ex.sets || 0) >= 4 && /agachamento|supino|terra|barra|stiff/i.test(ex.name || '')) {
        return true;
      }
    }
  }
  return false;
};