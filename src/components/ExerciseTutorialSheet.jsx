import { motion, AnimatePresence } from 'framer-motion';
import { X, Dumbbell, Sparkles, Play, Clock } from 'lucide-react';
import { Badge, Button, Card } from './ui';
import { modalBackdrop } from '../lib/motion';

/**
 * ExerciseTutorialSheet — bottom drawer showing execution details for an exercise.
 * Receives `exercise` (from ActiveWorkout state) and `tutorialData` (from findExerciseByName).
 * - Video embed (YouTube iframe) when tutorialData has videoEmbed.
 * - Fallback: gradient + Dumbbell icon when no video is available.
 * - Steps are synthesized from tutorialData.description when array is missing.
 * - Tips come from tutorialData.tips[].
 * - Drag down past 120px to dismiss.
 */
const ExerciseTutorialSheet = ({ open, onClose, exercise, tutorialData }) => {
  if (!exercise) return null;

  const group = tutorialData?.group || 'Geral';
  const equipment = tutorialData?.equipment || '—';
  const muscles = tutorialData?.muscles || [];
  const steps = tutorialData?.steps || [
    'Posicione-se corretamente no equipamento',
    'Execute o movimento com amplitude completa',
    'Mantenha o core ativado durante todo o exercício',
    'Controle a fase excêntrica (descida)',
    'Contraia o músculo alvo no topo do movimento',
  ];
  const tips = tutorialData?.tips || [
    'Foque na técnica antes da carga',
    'Respire de forma controlada: expire na força, inspire na volta',
  ];
  const description = tutorialData?.description || '';
  const videoEmbed = tutorialData?.videoEmbed || null;
  const difficulty = tutorialData?.difficulty || 'intermediário';
  const rest = tutorialData?.rest || '60s';

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            aria-hidden="true"
          />

          {/* Sheet */}
          <motion.div
            drag="y"
            dragConstraints={{ top: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              if (info.offset.y > 120) onClose();
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-gym-surface-elevated border-t border-gym-line rounded-t-hero shadow-card-elevated max-h-[85vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes de execução: ${exercise.name}`}
          >
            <div className="p-6 pb-10">
              {/* Drag handle */}
              <div className="w-12 h-1.5 bg-gym-line rounded-full mx-auto mb-5" />

              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-5">
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <Badge variant="solid" size="sm">
                      {group}
                    </Badge>
                    <Badge variant="outline" size="sm" icon={Clock}>
                      Descanso {rest}
                    </Badge>
                    {difficulty && (
                      <Badge variant="neutral" size="sm">
                        {difficulty}
                      </Badge>
                    )}
                  </div>
                  <h3 className="font-display impact-text text-2xl text-white leading-tight">
                    {exercise.name}
                  </h3>
                  <p className="text-xs text-gym-text-secondary mt-1.5">
                    {equipment}
                    {muscles.length > 0 && ` • ${muscles.join(' • ')}`}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Fechar"
                  className="w-10 h-10 rounded-xl bg-gym-surface border border-gym-line flex items-center justify-center hover:border-gym-accent/50 hover:bg-gym-accent-muted transition-all flex-shrink-0"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Video embed OR fallback */}
              <div className="aspect-video rounded-card overflow-hidden border border-gym-line mb-5 bg-gym-surface">
                {videoEmbed ? (
                  <iframe
                    src={videoEmbed}
                    title={`Vídeo de execução: ${exercise.name}`}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gym-accent/20 to-gym-accent-hover/10 flex flex-col items-center justify-center gap-3">
                    <div className="w-16 h-16 rounded-2xl bg-gym-accent/20 flex items-center justify-center">
                      <Dumbbell size={32} className="text-gym-accent" />
                    </div>
                    <p className="text-xs text-gym-text-secondary">Vídeo em breve</p>
                  </div>
                )}
              </div>

              {/* Brief description (if available) */}
              {description && (
                <p className="text-sm text-gym-text-secondary leading-relaxed mb-5">
                  {description}
                </p>
              )}

              {/* Steps */}
              <h4 className="text-xs font-bold text-gym-text-secondary uppercase tracking-[0.2em] mb-3">
                Execução
              </h4>
              <ol className="space-y-2.5 mb-6">
                {steps.map((step, idx) => (
                  <li key={idx} className="flex gap-3 items-start">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-gym-accent-muted text-gym-accent text-xs font-bold flex items-center justify-center mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-sm text-gym-text-primary leading-relaxed flex-1">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>

              {/* Tips */}
              <h4 className="text-xs font-bold text-gym-text-secondary uppercase tracking-[0.2em] mb-3">
                Dicas
              </h4>
              <Card variant="glass" padding="md" className="mb-6">
                <ul className="space-y-2">
                  {tips.map((tip, idx) => (
                    <li
                      key={idx}
                      className="text-sm text-gym-text-secondary flex gap-2.5 items-start"
                    >
                      <Sparkles
                        size={14}
                        className="text-gym-accent flex-shrink-0 mt-0.5"
                      />
                      <span className="flex-1">{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Target sets/reps */}
              <div className="grid grid-cols-3 gap-2 mb-6">
                <div className="bg-gym-surface border border-gym-line rounded-card p-3 text-center">
                  <p className="font-display impact-text text-2xl gradient-text">
                    {exercise.sets}
                  </p>
                  <p className="text-[10px] text-gym-text-muted uppercase tracking-wider mt-1">
                    Séries
                  </p>
                </div>
                <div className="bg-gym-surface border border-gym-line rounded-card p-3 text-center">
                  <p className="font-display impact-text text-2xl gradient-text">
                    {exercise.reps}
                  </p>
                  <p className="text-[10px] text-gym-text-muted uppercase tracking-wider mt-1">
                    Reps
                  </p>
                </div>
                <div className="bg-gym-surface border border-gym-line rounded-card p-3 text-center">
                  <p className="font-display impact-text text-2xl gradient-text">
                    {exercise.weight}
                  </p>
                  <p className="text-[10px] text-gym-text-muted uppercase tracking-wider mt-1">
                    Carga
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button variant="ghost" size="lg" fullWidth onClick={onClose}>
                  Fechar
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  leftIcon={Play}
                  onClick={onClose}
                >
                  Começar exercício
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ExerciseTutorialSheet;
