import { motion, AnimatePresence } from 'framer-motion';
import { Clock, SkipForward } from 'lucide-react';
import { Progress } from './ui';

/**
 * RestTimerOverlay — floating countdown shown after completing a set.
 * Appears above the bottom 24 (above nav) and slides up from below.
 * - `urgent` (<=5s remaining) pulses the clock tile and shifts the countdown color.
 * - `onSkip` instantly closes the overlay.
 */
const RestTimerOverlay = ({ active, secondsLeft, duration, onSkip }) => {
  const pct = duration > 0 ? ((duration - secondsLeft) / duration) * 100 : 0;
  const urgent = active && secondsLeft <= 5;
  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="fixed bottom-24 left-4 right-4 z-40 glass-strong border border-gym-line rounded-hero p-4 shadow-card-elevated"
          role="status"
          aria-live="polite"
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={urgent ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={urgent ? { duration: 0.6, repeat: Infinity } : { duration: 0.3 }}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                urgent ? 'bg-gym-accent animate-pulse-glow' : 'bg-gym-accent-muted'
              }`}
            >
              <Clock size={20} className="text-gym-accent" />
            </motion.div>

            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-gym-accent uppercase tracking-[0.2em]">
                Descanso
              </p>
              <motion.p
                key={secondsLeft}
                initial={{ scale: urgent ? 1.25 : 1.05, opacity: 0.7 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className={`font-display impact-text text-4xl leading-none mt-1 ${
                  urgent ? 'text-gym-accent' : 'text-white'
                }`}
              >
                {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
              </motion.p>
            </div>

            <button
              onClick={onSkip}
              className="h-11 px-4 rounded-2xl bg-gym-surface border border-gym-line text-sm font-bold text-gym-text-primary hover:border-gym-accent/50 hover:bg-gym-accent-muted transition-all flex items-center gap-1.5 flex-shrink-0"
              aria-label="Pular descanso"
            >
              <SkipForward size={16} />
              Pular
            </button>
          </div>
          <Progress value={pct} gradient={false} size="sm" className="mt-3" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default RestTimerOverlay;
