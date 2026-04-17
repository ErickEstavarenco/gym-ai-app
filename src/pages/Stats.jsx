import React from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Flame, Dumbbell, Calendar, TrendingUp, Award, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';

const Stats = () => {
  const { user } = useAuth();

  const weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];
  const completed  = [true, true, true, false, true, false, false];

  const stats = [
    { label: 'Treinos este mês', value: '12', icon: Dumbbell, color: 'text-gym-orange' },
    { label: 'Calorias queimadas', value: '3.200', icon: Flame, color: 'text-gym-orange' },
    { label: 'Horas treinadas', value: '18h', icon: Clock, color: 'text-gym-orange' },
    { label: 'Sequência atual', value: '5 dias', icon: TrendingUp, color: 'text-gym-orange' },
  ];

  const records = [
    { exercise: 'Supino Reto', value: '80 kg', date: 'há 3 dias' },
    { exercise: 'Agachamento', value: '100 kg', date: 'há 1 semana' },
    { exercise: 'Levantamento Terra', value: '120 kg', date: 'há 2 semanas' },
  ];

  return (
    <div className="min-h-screen bg-gym-dark text-white pb-24">
      {/* Header */}
      <div className="p-6 pt-12">
        <p className="text-gym-muted text-sm uppercase tracking-widest">Seu progresso</p>
        <h1 className="text-4xl font-black mt-1">ESTATÍSTICAS</h1>
      </div>

      {/* Semana atual */}
      <div className="px-6 mb-6">
        <div className="bg-gym-card rounded-3xl p-6 border border-white/5">
          <p className="text-xs text-gym-muted uppercase font-bold tracking-widest mb-4">Semana atual</p>
          <div className="flex justify-between">
            {weekDays.map((day, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={`w-10 h-10 rounded-2xl flex items-center justify-center font-black text-sm
                  ${completed[i] ? 'bg-gym-orange text-white' : 'bg-white/5 text-gym-muted'}`}>
                  {completed[i] ? <Flame size={16} /> : day}
                </div>
                <span className="text-[10px] text-gym-muted font-bold">{day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cards de stats */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-6">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="bg-gym-card rounded-3xl p-5 border border-white/5"
          >
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="text-2xl font-black">{s.value}</p>
            <p className="text-[10px] text-gym-muted uppercase font-bold tracking-widest mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Recordes pessoais */}
      <div className="px-6">
        <div className="flex items-center gap-2 mb-4">
          <Award size={16} className="text-gym-orange" />
          <p className="text-xs text-gym-muted uppercase font-bold tracking-widest">Recordes pessoais</p>
        </div>
        <div className="space-y-3">
          {records.map((r, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-gym-card rounded-2xl p-4 border border-white/5 flex justify-between items-center"
            >
              <div>
                <p className="font-bold text-sm">{r.exercise}</p>
                <p className="text-[10px] text-gym-muted mt-1">{r.date}</p>
              </div>
              <span className="text-gym-orange font-black text-lg">{r.value}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Stats;