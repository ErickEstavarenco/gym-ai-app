import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, X, Play, Pause } from 'lucide-react';
import Navbar from '../components/Navbar';

const defaultExercises = [
  { id: 1, name: 'Supino Reto', sets: 4, reps: 10, done: false },
];

const ActiveWorkout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const workoutData = location.state?.workout;

  const [exercises, setExercises] = useState(
    workoutData?.exercises?.map(ex => ({
      ...ex,
      done: false
    })) || defaultExercises
  );

  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval);
  }, [running]);

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const toggleDone = (id) => {
    setExercises(prev =>
      prev.map(e => e.id === id ? { ...e, done: !e.done } : e)
    );
  };

  const doneCount = exercises.filter(e => e.done).length;
  const progress = (doneCount / exercises.length) * 100;

  return (
    <div className="min-h-screen bg-gym-dark text-white pb-24">

      {/* Header */}
      <div className="p-6 pt-12 flex justify-between items-start">
        <div>
          <p className="text-gym-muted text-sm uppercase tracking-widest">
            Em andamento
          </p>
          <h1 className="text-4xl font-black mt-1">
            {workoutData?.name || "WORKOUT"}
          </h1>
        </div>

        <button
          onClick={() => navigate('/')}
          className="bg-white/10 p-2 rounded-xl"
        >
          <X size={20} />
        </button>
      </div>

      {/* Timer */}
      <div className="px-6 mb-6">
        <div className="bg-gym-orange rounded-3xl p-6 flex justify-between items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest opacity-80">
              Tempo
            </p>
            <p className="text-4xl font-black mt-1">
              {formatTime(seconds)}
            </p>
            <p className="text-xs mt-2 opacity-80">
              {doneCount}/{exercises.length} exercícios
            </p>
          </div>

          <button
            onClick={() => setRunning(r => !r)}
            className="bg-white/20 p-4 rounded-2xl"
          >
            {running ? <Pause size={24} /> : <Play size={24} />}
          </button>
        </div>

        <div className="mt-3 bg-white/10 rounded-full h-1.5">
          <motion.div
            className="bg-gym-orange rounded-full h-1.5"
            animate={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Exercícios */}
      <div className="px-6 space-y-3">
        {exercises.map((ex, i) => (
          <motion.button
            key={ex.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => toggleDone(ex.id)}
            className={`w-full rounded-2xl p-5 border flex justify-between items-center ${
              ex.done
                ? 'bg-gym-orange/10 border-gym-orange/30'
                : 'bg-gym-card border-white/5'
            }`}
          >
            <div className="text-left">
              <p className={`font-black text-sm ${ex.done ? 'line-through opacity-60' : ''}`}>
                {ex.name}
              </p>
              <p className="text-[10px] text-gym-muted mt-1">
                {ex.sets} séries × {ex.reps} reps
              </p>
            </div>

            <CheckCircle
              size={24}
              className={ex.done ? 'text-gym-orange' : 'text-white/20'}
            />
          </motion.button>
        ))}
      </div>

      <Navbar />
    </div>
  );
};

export default ActiveWorkout;