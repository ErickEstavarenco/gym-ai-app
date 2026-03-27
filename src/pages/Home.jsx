import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Dumbbell, Flame, Calendar, MessageSquare, Trophy, Zap, Clock } from 'lucide-react';
import Navbar from '../components/Navbar';
import ChatBot from '../components/ChatBot';

const Home = () => {
  const { user, api } = useAuth();
  const navigate = useNavigate();
  const [chatOpen, setChatOpen] = useState(false);
  const [latestWorkout, setLatestWorkout] = useState(null);
  const [latestDiet, setLatestDiet] = useState(null);
  const [loadingPlan, setLoadingPlan] = useState(false);

  React.useEffect(() => {
    const fetchLatestPlan = async () => {
      if (!user?.id || !api) return;
      setLoadingPlan(true);
      try {
        const res = await api.get(`/api/ai/latest-plan/${user.id}`);
        setLatestWorkout(res.data.latestWorkout);
        setLatestDiet(res.data.latestDiet);
      } catch (err) {
        console.error('Erro ao buscar plano:', err);
      } finally {
        setLoadingPlan(false);
      }
    };

    fetchLatestPlan();
  }, [user, api]);

  // Dados de exemplo para os treinos
  const workoutSplits = [
    {
      id: 1,
      name: 'PEITO & TRÍCEPS',
      focus: 'PUSH FOCUS • HIPERTROFIA',
      time: '55 MIN',
      exercises: 8,
      color: 'from-gym-orange to-orange-500',
      bgImage: 'chest',
      cta: 'START NOW',
      completed: false
    },
    {
      id: 2,
      name: 'COSTAS & BÍCEPS',
      focus: 'PULL FOCUS • FORÇA',
      time: '62 MIN',
      exercises: 7,
      color: 'from-blue-600 to-blue-400',
      bgImage: 'back',
      cta: 'VIEW PLAN',
      completed: true
    },
    {
      id: 3,
      name: 'PERNAS & CORE',
      focus: 'LOWER BODY • ESTABILIDADE',
      time: '48 MIN',
      exercises: 6,
      color: 'from-emerald-600 to-emerald-400',
      bgImage: 'legs',
      cta: 'VIEW PLAN',
      completed: false
    },
  ];

  // Estatísticas rápidas
  const stats = [
    { label: 'Treinos', value: '12', icon: Dumbbell, color: 'text-gym-orange' },
    { label: 'Calorias', value: '1.2k', icon: Flame, color: 'text-orange-400' },
    { label: 'Sequência', value: '5 dias', icon: Trophy, color: 'text-yellow-400' },
  ];

  return (
    <div className="min-h-screen bg-gym-dark text-white pb-24">
      {/* Header */}
      <header className="pt-12 px-6 pb-4 flex justify-between items-center sticky top-0 bg-gym-dark/80 backdrop-blur-md z-30">
        <div>
          <p className="text-xs font-bold text-gym-orange tracking-widest uppercase">My Daily Routine</p>
          <h1 className="font-display text-4xl impact-text mt-1">WORKOUT SPLIT</h1>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden border-2 border-gym-orange">
          <img
            alt="User Profile"
            className="w-full h-full object-cover"
            src="https://ui-avatars.com/api/?name=User&background=FF4D00&color=fff"
          />
        </div>
      </header>

      <main className="px-6 space-y-6 pt-2">
        {/* AI Recommendation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gym-orange/10 border border-gym-orange/20 p-4 rounded-2xl flex items-start gap-4"
        >
          <div className="bg-gym-orange p-2 rounded-xl text-white">
            <Zap size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm">AI Recommendation</h3>
            <p className="text-xs opacity-80 mt-1">Based on your last recovery, I've increased the volume for Split B today.</p>
          </div>
        </motion.div>

        {loadingPlan ? (
          <div className="bg-gym-card border border-white/20 rounded-2xl p-4 text-sm">Carregando seu plano mais recente...</div>
        ) : latestWorkout || latestDiet ? (
          <div className="bg-gym-card border border-gym-orange/30 p-4 rounded-2xl mb-4">
            <h3 className="text-white font-bold mb-2">Seu plano AI mais recente</h3>
            {latestWorkout && (
              <div className="mb-3">
                <p className="text-sm font-semibold">Treino: {latestWorkout.title}</p>
                <p className="text-xs text-slate-300">Objetivo: {latestWorkout.objective || '—'}</p>
                <p className="text-xs">Dias/semana: {latestWorkout.days_per_week || '—'}</p>
                <button
                  onClick={() => navigate('/workout')}
                  className="mt-2 py-2 px-3 rounded-lg bg-gym-orange text-white text-sm"
                >
                  Iniciar treino salvo
                </button>
              </div>
            )}
            {latestDiet && (
              <div>
                <p className="text-sm font-semibold">Dieta: {latestDiet.title}</p>
                <p className="text-xs text-slate-300">Calorias: {latestDiet.daily_calories || '—'}</p>
                <button
                  onClick={() => navigate('/diet')}
                  className="mt-2 py-2 px-3 rounded-lg bg-sky-500 text-white text-sm"
                >
                  Ver plano alimentar
                </button>
              </div>
            )}
          </div>
        ) : null}

        {/* Workout Splits */}
        <div className="space-y-4">
          {workoutSplits.map((workout, index) => (
            <motion.div
              key={workout.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="relative overflow-hidden group rounded-3xl bg-gym-card shadow-xl border border-slate-100 dark:border-slate-800"
            >
              {/* Background Image with Gradient Overlay */}
              <div className="absolute right-0 top-0 w-1/2 h-full opacity-20 dark:opacity-40 group-hover:scale-110 transition-transform duration-500">
                <div className={`w-full h-full bg-gradient-to-br ${workout.color} opacity-30`}></div>
              </div>

              <div className="relative p-6 z-10">
                <div className="flex justify-between items-start">
                  <span className={`text-white text-[10px] font-black px-2 py-1 rounded impact-text bg-gradient-to-r ${workout.color}`}>
                    SPLIT {String.fromCharCode(65 + index)}
                  </span>
                  <div className="flex gap-2">
                    <span className="bg-white/10 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                      <Clock size={12} /> {workout.time}
                    </span>
                    <span className="bg-white/10 px-2 py-1 rounded-lg text-[10px] font-bold flex items-center gap-1">
                      <Dumbbell size={12} /> {workout.exercises} EXERCÍCIOS
                    </span>
                  </div>
                </div>

                <h2 className="font-display text-3xl impact-text mt-4 leading-none">
                  {workout.name.split(' ')[0]} &<br/>{workout.name.split(' ')[2]}
                </h2>
                <p className="text-xs text-slate-400 mt-2 font-medium">{workout.focus}</p>

                <div className="mt-6 flex gap-2">
                  <button
                    onClick={() => navigate('/workout')}
                    className={`flex-1 py-3 rounded-xl font-bold text-sm active:scale-95 transition-transform ${
                      workout.completed
                        ? 'bg-slate-800 text-white'
                        : 'bg-gym-orange text-white'
                    }`}
                  >
                    {workout.completed ? 'REFAZER' : 'INICIAR'}
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center bg-white/10 rounded-xl text-slate-300">
                    <MoreHoriz size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gym-card p-4 rounded-2xl border border-slate-800"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Weekly Streak</p>
            <div className="flex items-end gap-2 mt-1">
              <span className="text-2xl font-display impact-text text-gym-orange">5 DAYS</span>
              <div className="flex gap-0.5 mb-1.5">
                <div className="w-1 h-3 bg-gym-orange rounded-full"></div>
                <div className="w-1 h-4 bg-gym-orange rounded-full"></div>
                <div className="w-1 h-2 bg-gym-orange rounded-full"></div>
                <div className="w-1 h-5 bg-gym-orange rounded-full"></div>
                <div className="w-1 h-3 bg-gym-orange rounded-full"></div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gym-card p-4 rounded-2xl border border-slate-800"
          >
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Calories Est.</p>
            <div className="flex items-baseline gap-1 mt-1">
              <span className="text-2xl font-display impact-text">1,250</span>
              <span className="text-[10px] font-bold opacity-60">KCAL</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Chat Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-28 right-6 w-14 h-14 bg-gym-orange text-white rounded-full shadow-2xl shadow-gym-orange/40 z-40 flex items-center justify-center hover:scale-105 active:scale-90 transition-transform"
      >
        <MessageSquare size={28} />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 border-2 border-gym-dark rounded-full"></div>
      </motion.button>

      {/* Chat Bot */}
      <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />

      <Navbar />
    </div>
  );
};

// Importar ícone Material
const MoreHoriz = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);

export default Home;
