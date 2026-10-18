import { motion } from 'framer-motion';

/**
 * Progress — animated horizontal bar with optional gradient fill and label.
 */
const Progress = ({
  value = 0,
  max = 100,
  label,
  showValue = false,
  gradient = true,
  size = 'md',
  className = '',
}) => {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const heightClass = size === 'sm' ? 'h-1.5' : size === 'lg' ? 'h-4' : 'h-3';
  const fillClass = gradient
    ? 'bg-gradient-to-r from-gym-accent to-gym-accent-hover'
    : 'bg-gym-accent';

  return (
    <div className={className}>
      {(label || showValue) && (
        <div className="flex items-center justify-between mb-1.5">
          {label && (
            <span className="text-[10px] font-bold text-gym-text-secondary uppercase tracking-[0.15em]">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-xs font-bold text-gym-text-primary">
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gym-line rounded-full ${heightClass} overflow-hidden`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={`${heightClass} ${fillClass} rounded-full shadow-glow-sm`}
        />
      </div>
    </div>
  );
};

export default Progress;
