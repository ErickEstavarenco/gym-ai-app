import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

const variants = {
  default: 'bg-gym-surface border border-gym-line',
  elevated: 'bg-gym-surface-elevated border border-gym-line shadow-card',
  hero: 'bg-gradient-to-br from-gym-accent to-gym-accent-hover shadow-glow text-white border border-transparent',
  glass: 'glass',
  outline: 'bg-transparent border border-gym-accent/30',
};

const paddingMap = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-6',
};

/**
 * Card — base surface primitive.
 * - variant: default | elevated | hero | glass | outline
 * - padding: none | sm | md | lg
 * - glow: animated gradient border (uses .glow-border utility)
 * - interactive: hover lift + tap scale; auto-enabled when onClick is set
 */
const Card = ({
  variant = 'default',
  padding = 'md',
  glow = false,
  interactive = false,
  className = '',
  children,
  onClick,
  ...rest
}) => {
  const baseClasses = [
    variants[variant],
    paddingMap[padding],
    'rounded-card',
    glow ? 'glow-border' : '',
    className,
  ].join(' ');

  const isInteractive = interactive || Boolean(onClick);

  if (isInteractive) {
    return (
      <motion.div
        variants={fadeUp}
        whileHover={{ y: -4, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`${baseClasses} cursor-pointer`}
        {...rest}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div variants={fadeUp} className={baseClasses} {...rest}>
      {children}
    </motion.div>
  );
};

export default Card;