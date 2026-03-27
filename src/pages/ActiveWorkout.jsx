import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, RotateCcw, Check, ChevronLeft, Clock, Flame, Trophy, Plus, Minus, SkipForward } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const ActiveWorkout = () => {
  const navigate = useNavigate();
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [workoutCompleted, setWorkoutCompleted] = useState(false);

  const [exercises, setExercises] = useState([
    { id: 1, name: 'Supino Reto', sets: 4, reps: '8-12', weight: '60kg', completed: 0 },
    { id: 2, name: 'Supino Inclinado', sets: 3, reps: '10-12', weight: '50kg', completed: 0 },
    { id: 3, name: 'Crucifixo', sets: 3, reps: '12-15', weight: '15kg', completed: 0 },
    { id: 4, name: 'Tríceps Corda', sets: 4, reps: '12-15', weight: '25kg', completed: 0 },
    { id: 5, name: 'Tríceps Testa', sets: 3, reps: '10-12', weight: '20kg', completed: 0 },
  ]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const completedSets = exercises.reduce((acc, ex) => acc + ex.completed, 0);
  const progress = (completedSets / totalSets) * 100;

  const completeSet = (exerciseIndex) => {
    setExercises(prev => {
      const newExercises = [...prev];
      if (newExercises[exerciseIndex].completed < newExercises[exerciseIndex].sets) {
        newExercises[exerciseIndex].completed += 1;
      }
      return newExercises;
    });
  };

  const undoSet = (exerciseIndex) => {
    setExercises(prev => {
      const newExercises = [...prev];
      if (newExercises[exerciseIndex].completed > 0) {
        newExercises[exerciseIndex].completed -= 1;
      }
      return newExercises;
    });
  };

  const skipExercise = () => {
    if (currentExercise < exercises.length - 1) {
      setCurrentExercise(prev => prev + 1);
    }
  };

  const finishWorkout = () => {
    setIsRunning(false);
    setWorkoutCompleted(true);
    setShowCompleteModal(true);
  };

  const closeModal = () => {
    setShowCompleteModal(false);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gym-dark text-white pb-24">
      {/* Header */}
      <div className="bg-gym-card border-b border-white/5 p-6 pt-12 sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
          >
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-black">Peito & Tríceps</h1>
            <p className="text-xs text-gym-muted">Treino A • Hipertrofia</p>
          </div>
          <button
            onClick={skipExercise}
            className="p-2 hover:bg-white/10 rounded-xl transition-colors text-gym-muted"
            title="Pular exercício"
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>

      {/* Timer e Progresso */}
      <div className="p-6">
        <div className="bg-gym-card rounded-3xl p-6 border border-white/5 mb-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <Clock size={24} className="text-gym-orange" />
              <span className="text-4xl font-black font-mono">{formatTime(time)}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsRunning(!isRunning)}
                className={`p-3 rounded-xl ${isRunning ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}
              >
                {isRunning ? <Pause size={24} /> : <Play size={24} />}
              </button>
              <button
                onClick={() => { setTime(0); setIsRunning(false); }}
                className="p-3 bg-white/10 rounded-xl hover:bg-white/20"
              >
                <RotateCcw size={24} />
              </button>
            </div>
          </div>

          {/* Barra de progresso */}
          <div className="w-full bg-white/10 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-gym-orange to-gym-accent h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-2">
            <p className="text-xs text-gym-muted">{Math.round(progress)}% concluído</p>
            <p className="text-xs text-gym-orange font-bold">{completedSets}/{totalSets} séries</p>
          </div>
        </div>

        {/* Exercício Atual - Destaque */}
        {exercises[currentExercise] && (
          <motion.div
            key={currentExercise}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-gym-orange to-gym-accent rounded-3xl p-6 mb-6 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className="text-xs font-bold text-white/70 uppercase tracking-wider">Exercício Atual</span>
                  <h2 className="text-2xl font-black mt-1">{exercises[currentExercise].name}</h2>
                </div>
                <span className="text-2xl font-black">{exercises[currentExercise].weight}</span>
              </div>
              <p className="text-sm text-white/70 mb-4">{exercises[currentExercise].sets} séries • {exercises[currentExercise].reps} reps</p>

              {/* Controles de série */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => undoSet(currentExercise)}
                  disabled={exercises[currentExercise].completed === 0}
                  className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors disabled:opacity-50"
                >
                  <Minus size={20} />
                </button>
                <div className="flex-1 flex gap-2">
                  {Array.from({ length: exercises[currentExercise].sets }).map((_, i) => (
                    <div
                      key={i}
                      className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all ${
                        i < exercises[currentExercise].completed
                          ? 'bg-white text-gym-orange'
                          : 'bg-white/20'
                      }`}
                    >
                      {i < exercises[currentExercise].completed && <Check size={20} />}
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => completeSet(currentExercise)}
                  disabled={exercises[currentExercise].completed >= exercises[currentExercise].sets}
                  className="p-3 bg-white rounded-xl text-gym-orange hover:bg-white/90 transition-colors disabled:opacity-50"
                >
                  <Plus size={20} />
                </button>
              </div>
            </div>
            {/* Decoração */}
            <Flame className="absolute -right-4 -bottom-4 opacity-20" size={120} />
          </motion.div>
        )}

        {/* Lista de Exercícios */}
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Flame size={20} className="text-gym-orange" />
          Todos os Exercícios
        </h2>

        <div className="space-y-3 mb-6">
          {exercises.map((exercise, index) => (
            <motion.div
              key={exercise.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setCurrentExercise(index)}
              className={`bg-gym-card rounded-2xl p-4 border cursor-pointer transition-all ${
                index === currentExercise ? 'border-gym-orange bg-gym-orange/10' : 'border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    exercise.completed === exercise.sets ? 'bg-green-500/20 text-green-400' : 'bg-white/10'
                  }`}>
                    {exercise.completed === exercise.sets ? <Check size={16} /> : index + 1}
                  </div>
                  <div>
                    <h3 className="font-bold">{exercise.name}</h3>
                    <p className="text-xs text-gym-muted">{exercise.sets} séries • {exercise.reps}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-gym-orange font-bold">{exercise.weight}</span>
                  <span className="text-xs text-gym-muted">{exercise.completed}/{exercise.sets}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Botão Finalizar */}
        <button
          onClick={finishWorkout}
          className="w-full bg-gradient-to-r from-gym-orange to-gym-accent py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Trophy size={24} />
          {workoutCompleted ? 'Treino Finalizado!' : 'Finalizar Treino'}
        </button>
      </div>

      {/* Modal de Conclusão */}
      <AnimatePresence>
        {showCompleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gym-card rounded-3xl p-8 max-w-sm w-full text-center border border-white/10"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy size={40} className="text-green-400" />
              </div>
              <h2 className="text-2xl font-black mb-2">Treino Concluído! 🎉</h2>
              <p className="text-gym-muted mb-6">Parabéns por completar seu treino!</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gym-dark rounded-2xl p-4">
                  <p className="text-2xl font-black text-gym-orange">{formatTime(time)}</p>
                  <p className="text-xs text-gym-muted">Duração</p>
                </div>
                <div className="bg-gym-dark rounded-2xl p-4">
                  <p className="text-2xl font-black text-gym-orange">{completedSets}</p>
                  <p className="text-xs text-gym-muted">Séries</p>
                </div>
              </div>

              <button
                onClick={closeModal}
                className="w-full bg-gym-orange py-4 rounded-2xl font-bold hover:bg-gym-accent transition-colors"
              >
                Voltar para Início
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
    </div>
  );
};

export default ActiveWorkout;