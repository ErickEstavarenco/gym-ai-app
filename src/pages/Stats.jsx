import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, Trophy, Flame, Dumbbell, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';

const Stats = () => {
  const weeklyData = [
    { day: 'Seg', workouts: 1, calories: 450 },
    { day: 'Ter', workouts: 1, calories: 520 },
    { day: 'Qua', workouts: 0, calories: 0 },
    { day: 'Qui', workouts: 1, calories: 480 },
    { day: 'Sex', workouts: 1, calories: 550 },
    { day: 'Sáb', workouts: 1, calories: 600 },
    { day: 'Dom', workouts: 0, calories: 0 },
  ];

  const achievements = [
    { id: 1, name: 'Primeiro Treino', desc: 'Complete seu primeiro treino', icon: Trophy, unlocked: true },
    { id: 2, name: 'Sequência de 3', desc: 'Treine 3 dias seguidos', icon: Flame, unlocked: true },
    { id: 3, name: 'Carga Pesada', desc: 'Levante mais de 100kg', icon: Dumbbell, unlocked: false },
    { id: 4, name: 'Maratonista', desc: 'Treine 30 dias no mês', icon: Calendar, unlocked: false },
  ];

  const maxCalories = Math.max(...weeklyData.map(d => d.calories));

  return (
    <div className="min-h-screen bg-gym-dark text-white pb-24">
      {/* Header */}
      <header className="pt-12 px-6 pb-6 sticky top-0 bg-gym-dark/80 backdrop-blur-md z-30">
        <p className="text-xs font-bold text-gym-orange tracking-widest uppercase">Progress</p>
        <h1 className="font-display text-4xl impact-text mt-1">STATS</h1>
      </header>

      <main className="px-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gym-card rounded-2xl p-5 border border-slate-800"
          >
            <Dumbbell size={24} className="text-gym-orange mb-3" />
            <p className="text-3xl font-black font-display">24</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Treinos</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gym-card rounded-2xl p-5 border border-slate-800"
          >
            <Flame size={24} className="text-orange-400 mb-3" />
            <p className="text-3xl font-black font-display">12.5k</p>
            <p className="text-xs text-slate-400 uppercase tracking-wider">Calorias</p>
          </motion.div>
        </div>

        {/* Weekly Chart */}
        <div className="bg-gym-card rounded-2xl p-6 border border-slate-800">
          <div className="flex justify-between items-center mb-6">
            <h2 className="font-bold flex items-center gap-2">
              <TrendingUp size={20} className="text-gym-orange" />
              Esta Semana
            </h2>
            <span className="text-xs text-slate-400">Últimos 7 dias</span>
          </div>

          <div className="flex items-end justify-between h-40 gap-2">
            {weeklyData.map((data, index) => (
              <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-1 h-32">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.workouts / 2) * 100}%` }}
                    transition={{ delay: index * 0.1 }}
                    className="flex-1 bg-gym-orange rounded-t-lg"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(data.calories / maxCalories) * 100}%` }}
                    transition={{ delay: index * 0.1 + 0.05 }}
                    className="flex-1 bg-white/20 rounded-t-lg"
                  />
                </div>
                <span className="text-xs text-slate-400">{data.day}</span>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-4 mt-4 text-xs">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-gym-orange rounded"></span> Treinos
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-white/20 rounded"></span> Calorias
            </span>
          </div>
        </div>

        {/* Achievements */}
        <div>
          <h2 className="font-bold mb-4 flex items-center gap-2">
            <Trophy size={20} className="text-yellow-400" />
            Conquistas
          </h2>
          <div className="space-y-3">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-gym-card rounded-2xl p-4 border flex items-center gap-4 ${
                  achievement.unlocked ? 'border-gym-orange/30' : 'border-slate-800 opacity-50'
                }`}
              >
                <div className={`p-3 rounded-xl ${
                  achievement.unlocked ? 'bg-gym-orange/20' : 'bg-white/5'
                }`}>
                  <achievement.icon size={24} className={achievement.unlocked ? 'text-gym-orange' : 'text-slate-400'} />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold">{achievement.name}</h3>
                  <p className="text-xs text-slate-400">{achievement.desc}</p>
                </div>
                {achievement.unlocked && (
                  <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">Desbloqueado</span>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Navbar />
    </div>
  );
};

export default Stats;
