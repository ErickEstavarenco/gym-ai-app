import { motion } from 'framer-motion';
import { forwardRef } from 'react';
import { fadeUp } from '../../lib/motion';

const colorMap = {
  accent: 'text-gym-accent',
  success: 'text-gym-success',
  warning: 'text-gym-warning',
  danger: 'text-gym-danger',
  primary: 'text-gym-text-primary',
};

/**
 * Stat — big metric tile with optional icon and trend indicator.
 * Animates in when used inside a stagger parent (PageShell main variants).
 */
const Stat = forwardRef(function Stat(
  {
    label,
    value,
    unit,
    icon: Icon,
    trend,
    color = 'accent',
    className = '',
  },
  ref
) {
  return (
    <motion.div
      ref={ref}
      variants={fadeUp}
      className={`bg-gym-surface border border-gym-line rounded-card p-5 ${className}`}
    >
      <div className="flex items-start justify-between mb-3">
        <span className="text-[10px] font-bold text-gym-text-secondary uppercase tracking-[0.15em]">
          {label}
        </span>
        {Icon && (
          <div className={`p-2 rounded-xl bg-gym-surface-elevated ${colorMap[color]}`}>
            <Icon size={16} />
          </div>
        )}
      </div>
      <div className="flex items-baseline gap-1.5">
        <span className={`font-display impact-text text-3xl ${colorMap[color]}`}>
          {value}
        </span>
        {unit && (
          <span className="text-[10px] font-bold text-gym-text-muted uppercase tracking-wider">
            {unit}
          </span>
        )}
      </div>
      {trend && (
        <span className="text-xs text-gym-text-secondary mt-2 block">
          {trend}
        </span>
      )}
    </motion.div>
  );
});

export default Stat;