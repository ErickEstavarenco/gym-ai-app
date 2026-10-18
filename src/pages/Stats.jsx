import { useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Calendar,
  Trophy,
  Flame,
  Dumbbell,
  Activity,
} from 'lucide-react';
import {
  Badge,
  Card,
  PageShell,
  SectionHeader,
  Stat,
} from '../components/ui';
import { fadeUp, staggerParent } from '../lib/motion';
import { useWorkout } from '../context/WorkoutContext';
import {
  buildAchievements,
  buildWeeklyData,
  computeStreak,
  estimateCalories,
} from '../utils/workoutStats';

const ICONS = { Trophy, Flame, Dumbbell, Calendar, Activity, TrendingUp };

const formatCalories = (n) => {
  if (n < 1000) return `${n}`;
  return `${(n / 1000).toFixed(1)}k`;
};

const Stats = () => {
  const { savedWorkouts } = useWorkout();

  const totalWorkouts = savedWorkouts.length;
  const totalCalories = useMemo(
    () => savedWorkouts.reduce((acc, w) => acc + estimateCalories(w), 0),
    [savedWorkouts]
  );
  const weeklyData = useMemo(() => buildWeeklyData(savedWorkouts), [savedWorkouts]);
  const streak = useMemo(() => computeStreak(savedWorkouts), [savedWorkouts]);
  const achievements = useMemo(
    () => buildAchievements(savedWorkouts, streak),
    [savedWorkouts, streak]
  );

  const maxCalories = Math.max(...weeklyData.map((d) => d.calories), 1);
  const maxWorkouts = Math.max(...weeklyData.map((d) => d.workouts), 1);

  return (
    <PageShell
      header={
        <SectionHeader
          kicker="PROGRESS"
          title="STATS"
          subtitle="Seu desempenho na última semana"
        />
      }
    >
      <motion.div
        variants={staggerParent(0.08)}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Summary */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 gap-3">
          <Stat
            label="Treinos"
            value={totalWorkouts}
            unit="TOTAL"
            icon={Dumbbell}
            color="accent"
          />
          <Stat
            label="Calorias"
            value={formatCalories(totalCalories)}
            unit="QUEIMADAS"
            icon={Flame}
            color="warning"
          />
        </motion.div>

        <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
          <Card variant="default" padding="md">
            <p className="text-[10px] text-gym-text-muted uppercase tracking-wider">Sequência</p>
            <p className="font-display impact-text text-2xl gradient-text mt-1">
              {streak}
            </p>
            <p className="text-xs text-gym-text-secondary mt-0.5">dias seguidos</p>
          </Card>
          <Card variant="default" padding="md">
            <p className="text-[10px] text-gym-text-muted uppercase tracking-wider">Conquistas</p>
            <p className="font-display impact-text text-2xl gradient-text mt-1">
              {achievements.filter((a) => a.unlocked).length}/{achievements.length}
            </p>
            <p className="text-xs text-gym-text-secondary mt-0.5">desbloqueadas</p>
          </Card>
          <Card variant="default" padding="md">
            <p className="text-[10px] text-gym-text-muted uppercase tracking-wider">Hoje</p>
            <p className="font-display impact-text text-2xl gradient-text mt-1">
              {weeklyData[weeklyData.length - 1]?.workouts || 0}
            </p>
            <p className="text-xs text-gym-text-secondary mt-0.5">treinos</p>
          </Card>
        </motion.div>

        {/* Weekly Chart */}
        <motion.div variants={fadeUp}>
          <Card variant="elevated" padding="lg">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-gym-accent-muted flex items-center justify-center">
                  <TrendingUp size={16} className="text-gym-accent" />
                </div>
                <h2 className="font-bold text-gym-text-primary">Esta semana</h2>
              </div>
              <Badge variant="neutral" size="sm">
                7 dias
              </Badge>
            </div>

            <div className="flex items-end justify-between h-44 gap-2">
              {weeklyData.map((data, index) => (
                <div key={data.day + index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex gap-1 h-36">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{
                        height: maxWorkouts
                          ? `${(data.workouts / maxWorkouts) * 100}%`
                          : '0%',
                      }}
                      transition={{
                        delay: 0.3 + index * 0.05,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex-1 bg-gradient-to-t from-gym-accent to-gym-accent-hover rounded-t-lg shadow-glow-sm"
                    />
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${(data.calories / maxCalories) * 100}%` }}
                      transition={{
                        delay: 0.4 + index * 0.05,
                        duration: 0.7,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="flex-1 bg-gym-line rounded-t-lg"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-gym-text-muted uppercase tracking-wider">
                    {data.day}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-5 mt-5">
              <span className="flex items-center gap-2 text-xs text-gym-text-secondary">
                <span className="w-3 h-3 rounded-sm bg-gradient-to-br from-gym-accent to-gym-accent-hover shadow-glow-sm" />
                Treinos
              </span>
              <span className="flex items-center gap-2 text-xs text-gym-text-secondary">
                <span className="w-3 h-3 rounded-sm bg-gym-line" />
                Calorias
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center gap-2 mb-3">
            <Trophy size={16} className="text-gym-warning" />
            <h2 className="text-xs font-bold text-gym-text-secondary uppercase tracking-[0.2em]">
              Conquistas
            </h2>
          </div>
          <div className="space-y-2.5">
            {achievements.map((achievement) => {
              const Icon = ICONS[achievement.icon] || Trophy;
              return (
                <Card
                  key={achievement.id}
                  variant="default"
                  padding="md"
                  className={achievement.unlocked ? 'glow-border' : 'opacity-50'}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        achievement.unlocked
                          ? 'bg-gym-accent-muted shadow-glow-sm'
                          : 'bg-gym-surface-elevated'
                      }`}
                    >
                      <Icon
                        size={22}
                        strokeWidth={2.5}
                        className={achievement.unlocked ? 'text-gym-accent' : 'text-gym-text-muted'}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-gym-text-primary text-sm">
                        {achievement.name}
                      </p>
                      <p className="text-xs text-gym-text-secondary mt-0.5">
                        {achievement.desc}
                      </p>
                    </div>
                    {achievement.unlocked && (
                      <Badge variant="success" size="sm">
                        Desbloqueado
                      </Badge>
                    )}
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>
      </motion.div>
    </PageShell>
  );
};

export default Stats;