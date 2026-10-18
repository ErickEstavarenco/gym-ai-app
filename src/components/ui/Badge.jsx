import { motion } from 'framer-motion';

const variants = {
  accent: 'bg-gym-accent-muted text-gym-accent border border-gym-accent/20',
  solid: 'bg-gradient-to-r from-gym-accent to-gym-accent-hover text-white border border-transparent',
  success: 'bg-gym-success/15 text-gym-success border border-gym-success/25',
  warning: 'bg-gym-warning/15 text-gym-warning border border-gym-warning/25',
  danger: 'bg-gym-danger/15 text-gym-danger border border-gym-danger/25',
  neutral: 'bg-gym-surface-elevated text-gym-text-secondary border border-gym-line',
  outline: 'bg-transparent text-gym-text-secondary border border-gym-line hover:border-gym-accent/40 hover:text-gym-text-primary',
  glass: 'glass text-white',
};

const sizes = {
  sm: 'text-[10px] px-2 py-0.5 rounded-md',
  md: 'text-xs px-3 py-1 rounded-lg',
  lg: 'text-sm px-4 py-1.5 rounded-xl',
};

const Badge = ({
  variant = 'neutral',
  size = 'md',
  icon: Icon,
  className = '',
  children,
  ...rest
}) => {
  const classes = `inline-flex items-center gap-1.5 font-bold uppercase tracking-wider ${variants[variant]} ${sizes[size]} ${className}`;
  return (
    <span className={classes} {...rest}>
      {Icon && <Icon size={size === 'sm' ? 10 : size === 'lg' ? 16 : 12} />}
      {children}
    </span>
  );
};

export default Badge;
