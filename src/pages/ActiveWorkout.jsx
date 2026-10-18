import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Pause,
  RotateCcw,
  Check,
  Clock,
  Flame,
  Trophy,
  Plus,
  Minus,
  SkipForward,
  RefreshCw,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Badge,
  Button,
  Card,
  PageShell,
  Progress,
  ToolbarHeader,
} from '../components/ui';
import { modalBackdrop, modalContent, fadeUp, staggerParent } from '../lib/motion';
import RestTimerOverlay from '../components/RestTimerOverlay';
import ExerciseTutorialSheet from '../components/ExerciseTutorialSheet';
import { findExerciseByName, getCategoryLabelForName } from '../utils/exerciseLookup';
import { getSplitForToday, getSplitById, getNextSplitId } from '../data/workoutSplits';
import { useWorkout } from '../context/WorkoutContext';

const ActiveWorkout = () => {
  const navigate = useNavigate();
  const { activeSplitId, setActiveSplit } = useWorkout();

  // Split ativo: do contexto (override via chat/botão) ou do dia da semana.
  const activeSplit = activeSplitId
    ? getSplitById(activeSplitId)
    : getSplitForToday();

  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [exercises, setExercises] = useState(() =>
    activeSplit.exercises.map((e) => ({ ...e, completed: 0 }))
  );
  const [restTimer, setRestTimer] = useState({ active: false, secondsLeft: 0, duration: 0 });
  const [tutorialOpen, setTutorialOpen] = useState(false);
  const [tutorialExerciseIdx, setTutorialExerciseIdx] = useState(0);
  const restIntervalRef = useRef(null);

  // Quando o usuário muda o split (botão "Próximo" ou comando do chat),
  // resetar exercises e voltar pro primeiro item.
  useEffect(() => {
    setExercises(activeSplit.exercises.map((e) => ({ ...e, completed: 0 })));
    setCurrentExercise(0);
  }, [activeSplit.id]);

  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => setTime((t) => t + 1), 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  // Rest timer countdown — runs whenever restTimer is active.
  useEffect(() => {
    if (!restTimer.active) {
      if (restIntervalRef.current) {
        clearInterval(restIntervalRef.current);
        restIntervalRef.current = null;
      }
      return;
    }
    restIntervalRef.current = setInterval(() => {
      setRestTimer((prev) => {
        if (!prev.active || prev.secondsLeft <= 1) {
          return { ...prev, active: false, secondsLeft: 0 };
        }
        return { ...prev, secondsLeft: prev.secondsLeft - 1 };
      });
    }, 1000);
    return () => {
      if (restIntervalRef.current) {
        clearInterval(restIntervalRef.current);
        restIntervalRef.current = null;
      }
    };
  }, [restTimer.active]);

  const cycleNextSplit = () => {
    const nextId = getNextSplitId(activeSplit.id);
    setActiveSplit(nextId);
  };

  const skipRest = () => {
    setRestTimer((prev) => ({ ...prev, active: false, secondsLeft: 0 }));
  };

  const skipExercise = () => {
    if (currentExercise < exercises.length - 1) setCurrentExercise((p) => p + 1);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const totalSets = exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const completedSets = exercises.reduce((acc, ex) => acc + ex.completed, 0);
  const progress = (completedSets / totalSets) * 100;

  const completeSet = (idx) => {
    let willStartRest = false;
    let restDur = 60;
    setExercises((prev) =>
      prev.map((ex, i) => {
        if (i !== idx || ex.completed >= ex.sets) return ex;
        willStartRest = ex.completed + 1 < ex.sets;
        restDur = ex.restSeconds || 60;
        return { ...ex, completed: ex.completed + 1 };
      })
    );
    if (willStartRest) {
      setRestTimer({ active: true, secondsLeft: restDur, duration: restDur });
    }
  };

  const undoSet = (idx) => {
    setExercises((prev) =>
      prev.map((ex, i) =>
        i === idx && ex.completed > 0
          ? { ...ex, completed: ex.completed - 1 }
          : ex
      )
    );
  };

  const selectExercise = (idx) => {
    setCurrentExercise(idx);
    setTutorialExerciseIdx(idx);
    setTutorialOpen(true);
  };

  const finishWorkout = () => {
    setIsRunning(false);
    setShowCompleteModal(true);
  };

  const exercise = exercises[currentExercise];
  const tutorialExercise = exercises[tutorialExerciseIdx];
  const tutorialLookup = findExerciseByName(tutorialExercise?.name);
  const tutorialData = tutorialLookup
    ? {
        ...tutorialLookup,
        group: getCategoryLabelForName(tutorialExercise.name),
      }
    : null;

  return (
    <PageShell
      hideNav
      header={
        <ToolbarHeader
          backTo="/"
          title={activeSplit.name}
          subtitle={
            <span className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 bg-gym-accent-muted text-gym-accent text-[10px] font-bold rounded-md">
                Split {activeSplit.id}
              </span>
              <span>{activeSplit.focus}</span>
            </span>
          }
          rightSlot={
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={cycleNextSplit}
                aria-label="Próximo split"
                title="Próximo split"
              >
                <RefreshCw size={18} />
              </Button>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={skipExercise}
                aria-label="Pular exercício"
              >
                <SkipForward size={18} />
              </Button>
            </div>
          }
        />
      }
    >
      <motion.div
        variants={staggerParent(0.07)}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Timer + Progress */}
        <motion.div variants={fadeUp}>
          <Card variant="elevated" padding="lg">
            <div className="flex justify-between items-center mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gym-accent-muted flex items-center justify-center">
                  <Clock size={18} className="text-gym-accent" />
                </div>
                <span className="font-display impact-text text-4xl tracking-wider">
                  {formatTime(time)}
                </span>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={isRunning ? 'outline' : 'primary'}
                  size="icon"
                  onClick={() => setIsRunning(!isRunning)}
                  aria-label={isRunning ? 'Pausar' : 'Iniciar'}
                >
                  {isRunning ? <Pause size={18} /> : <Play size={18} />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setTime(0);
                    setIsRunning(false);
                  }}
                  aria-label="Resetar"
                >
                  <RotateCcw size={18} />
                </Button>
              </div>
            </div>

            <Progress value={progress} showValue gradient />
            <div className="flex justify-between mt-3">
              <span className="text-xs text-gym-text-muted">
                {Math.round(progress)}% concluído
              </span>
              <span className="text-xs text-gym-accent font-bold">
                {completedSets}/{totalSets} séries
              </span>
            </div>
          </Card>
        </motion.div>

        {/* Current Exercise Hero */}
        {exercise && (
          <motion.div
            key={currentExercise}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="relative overflow-hidden rounded-hero bg-gradient-to-br from-gym-accent to-gym-accent-hover p-6 shadow-glow"
          >
            <Flame
              className="absolute -right-6 -bottom-6 text-white/10"
              size={160}
              strokeWidth={1.5}
            />
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-3">
                <Badge variant="glass" size="sm">
                  Exercício atual
                </Badge>
                <span className="font-display impact-text text-2xl text-white">
                  {exercise.weight}
                </span>
              </div>
              <h2 className="font-display impact-text text-3xl text-white mt-2">
                {exercise.name}
              </h2>
              <p className="text-sm text-white/80 mt-1.5">
                {exercise.sets} séries • {exercise.reps} reps
              </p>

              <div className="flex items-center gap-3 mt-6">
                <Button
                  variant="glass"
                  size="icon"
                  onClick={() => undoSet(currentExercise)}
                  disabled={exercise.completed === 0}
                  aria-label="Desfazer série"
                >
                  <Minus size={18} />
                </Button>
                <div className="flex-1 flex gap-2">
                  {Array.from({ length: exercise.sets }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={false}
                      animate={{
                        scale: i < exercise.completed ? [1, 1.15, 1] : 1,
                      }}
                      transition={{ duration: 0.3 }}
                      className={`flex-1 h-12 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        i < exercise.completed
                          ? 'bg-white text-gym-accent shadow-glow-sm'
                          : 'bg-white/20 text-white/50'
                      }`}
                    >
                      {i < exercise.completed && <Check size={18} strokeWidth={3} />}
                    </motion.div>
                  ))}
                </div>
                <Button
                  variant="glass"
                  size="icon"
                  onClick={() => completeSet(currentExercise)}
                  disabled={exercise.completed >= exercise.sets}
                  aria-label="Adicionar série"
                  className="bg-white text-gym-accent hover:bg-white/90"
                >
                  <Plus size={18} strokeWidth={3} />
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Exercise list */}
        <motion.div variants={fadeUp}>
          <div className="flex items-center gap-2 mb-3">
            <Flame size={16} className="text-gym-accent" />
            <h2 className="text-xs font-bold text-gym-text-secondary uppercase tracking-[0.2em]">
              Todos os exercícios
            </h2>
          </div>
          <div className="space-y-2.5">
            {exercises.map((ex, index) => {
              const isComplete = ex.completed === ex.sets;
              const isActive = index === currentExercise;
              return (
                <Card
                  key={ex.id}
                  variant={isActive ? 'elevated' : 'default'}
                  padding="md"
                  interactive
                  onClick={() => selectExercise(index)}
                  className={isActive ? 'ring-1 ring-gym-accent/50 glow-border' : ''}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isComplete
                          ? 'bg-gym-success/15 text-gym-success'
                          : isActive
                            ? 'bg-gym-accent-muted text-gym-accent'
                            : 'bg-gym-surface-elevated text-gym-text-muted'
                      }`}
                    >
                      {isComplete ? <Check size={16} strokeWidth={3} /> : <span className="font-bold text-sm">{index + 1}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`font-bold text-sm ${isComplete ? 'text-gym-text-secondary line-through' : 'text-gym-text-primary'}`}>
                        {ex.name}
                      </p>
                      <p className="text-xs text-gym-text-secondary mt-0.5">
                        {ex.sets} séries • {ex.reps}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-sm font-bold text-gym-accent">{ex.weight}</p>
                      <p className="text-[10px] text-gym-text-muted uppercase tracking-wider">
                        {ex.completed}/{ex.sets}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <Button
            variant="primary"
            size="xl"
            fullWidth
            onClick={finishWorkout}
            leftIcon={Trophy}
          >
            Finalizar Treino
          </Button>
        </motion.div>
      </motion.div>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompleteModal && (
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50"
          >
            <motion.div
              variants={modalContent}
              initial="hidden"
              animate="show"
              exit="exit"
              className="bg-gym-surface-elevated border border-gym-line rounded-hero p-8 max-w-sm w-full text-center shadow-card-elevated"
            >
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                className="w-20 h-20 bg-gym-success/15 rounded-full flex items-center justify-center mx-auto mb-5"
              >
                <Trophy size={36} className="text-gym-success" strokeWidth={2.5} />
              </motion.div>
              <h2 className="font-display impact-text text-3xl text-white mb-2">
                Treino Concluído! 🎉
              </h2>
              <p className="text-sm text-gym-text-secondary mb-6">
                Parabéns por completar seu treino!
              </p>

              <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gym-surface border border-gym-line rounded-card p-4">
                  <p className="font-display impact-text text-2xl gradient-text">
                    {formatTime(time)}
                  </p>
                  <p className="text-[10px] text-gym-text-muted uppercase tracking-wider mt-1">
                    Duração
                  </p>
                </div>
                <div className="bg-gym-surface border border-gym-line rounded-card p-4">
                  <p className="font-display impact-text text-2xl gradient-text">
                    {completedSets}
                  </p>
                  <p className="text-[10px] text-gym-text-muted uppercase tracking-wider mt-1">
                    Séries
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() => {
                  setShowCompleteModal(false);
                  navigate('/');
                }}
              >
                Voltar para Início
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Rest Timer Overlay */}
      <RestTimerOverlay
        active={restTimer.active}
        secondsLeft={restTimer.secondsLeft}
        duration={restTimer.duration}
        onSkip={skipRest}
      />

      {/* Exercise Tutorial Sheet */}
      <ExerciseTutorialSheet
        open={tutorialOpen}
        onClose={() => setTutorialOpen(false)}
        exercise={tutorialExercise}
        tutorialData={tutorialData}
      />
    </PageShell>
  );
};

export default ActiveWorkout;
