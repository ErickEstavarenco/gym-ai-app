import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Dumbbell, Flame, Calendar, MessageSquare, Plus } from 'lucide-react';
import Navbar from '../components/Navbar';
import { generateWorkout } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { user, api } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const workoutSplits = [
    { id: 1, name: 'CHEST & TRICEPS', focus: 'PUSH FOCUS • HYPERTROPHY', time: '50 MIN', exercises: 8, color: 'bg-gym-orange' },
    { id: 2, name: 'BACK & BICEPS', focus: 'PULL FOCUS • STRENGTH', time: '62 MIN', exercises: 7, color: 'bg-white/10' },
    { id: 3, name: 'LEGS & CORE', focus: 'LOWER BODY • STABILITY', time: '48 MIN', exercises: 6, color: 'bg-white/10' },
  ];

  const handleGenerateWorkout = async () => {
    try {
      setLoading(true);

      const res = await generateWorkout(api, {
        goal: user?.goal || "hipertrofia",
        level: user?.level || "iniciante",
      });

      navigate('/active-workout', {
        state: { workout: res.workout }
      });

    } catch (err) {
      console.error(err);
      alert("Erro ao gerar treino");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gym-dark text-white pb-24">
      
      {/* Header */}
      <div className="p-6 pt-12">
        <p className="text-gym-muted text-sm uppercase tracking-widest">Minha Rotina Diária</p>
        <h1 className="text-4xl font-black mt-1">WORKOUT SPLIT</h1>
      </div>

      {/* AI Recommendation */}
      <div className="px-6 mb-8">
        <div className="bg-gym-orange/10 border border-gym-orange/20 rounded-3xl p-5 flex gap-4 items-start">
          <div className="bg-gym-orange p-2 rounded-xl mt-1">
            <MessageSquare size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-bold text-gym-orange">AI Recommendation</h3>
            <p className="text-sm text-gym-muted mt-1 leading-relaxed">
              Gere um treino personalizado com base no seu perfil.
            </p>
          </div>
        </div>
      </div>

      {/* Workout Cards */}
      <div className="px-6 space-y-4">
        {workoutSplits.map((workout, index) => (
          <motion.div
            key={workout.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`${workout.color === 'bg-gym-orange' ? 'bg-gym-orange' : 'bg-gym-card'} rounded-[2.5rem] p-8 relative overflow-hidden group`}
          >
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold opacity-70 tracking-tighter">
                SPLIT {String.fromCharCode(65 + index)}
              </span>

              <div className="flex gap-4 text-[10px] font-bold opacity-70">
                <span className="flex items-center gap-1">
                  <Calendar size={10} /> {workout.time}
                </span>
                <span className="flex items-center gap-1">
                  <Dumbbell size={10} /> {workout.exercises} EXERCISES
                </span>
              </div>
            </div>

            <h2 className="text-3xl font-black mb-1">{workout.name}</h2>
            <p className="text-[10px] font-bold opacity-70 tracking-widest uppercase mb-6">
              {workout.focus}
            </p>

            <button
              onClick={handleGenerateWorkout}
              className={`py-3 px-8 rounded-full font-bold text-sm ${
                workout.color === 'bg-gym-orange'
                  ? 'bg-white text-gym-orange'
                  : 'bg-white/10 text-white'
              } transition-colors`}
            >
              {loading ? 'GERANDO...' : 'START NOW'}
            </button>

            <Dumbbell
              className="absolute -right-4 -bottom-4 opacity-10"
              size={120}
            />
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="px-6 mt-8 flex gap-4">
        <div className="flex-1 bg-gym-card rounded-3xl p-5 border border-white/5">
          <p className="text-xs text-gym-muted uppercase font-bold tracking-widest">
            Weekly Streak
          </p>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-2xl font-black">5 DAYS</span>
            <Flame size={20} className="text-gym-orange mb-1" />
          </div>
        </div>

        <div className="flex-1 bg-gym-card rounded-3xl p-5 border border-white/5">
          <p className="text-xs text-gym-muted uppercase font-bold tracking-widest">
            Calories Est.
          </p>
          <div className="flex items-end gap-2 mt-2">
            <span className="text-2xl font-black">1,250</span>
            <div className="bg-gym-orange h-5 w-5 rounded-full flex items-center justify-center mb-1">
              <Plus size={12} className="text-white" />
            </div>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

export default Home;