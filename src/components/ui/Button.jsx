import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const variants = {
  primary:
    'bg-gradient-to-r from-gym-accent to-gym-accent-hover text-white shadow-glow-sm hover:shadow-glow hover:brightness-110',
  ghost:
    'bg-gym-surface border border-gym-line text-gym-text-primary hover:bg-gym-surface-elevated hover:border-gym-text-muted',
  outline:
    'bg-transparent border border-gym-accent/40 text-gym-accent hover:bg-gym-accent-muted hover:border-gym-accent',
  chip:
    'bg-gym-surface border border-gym-line text-gym-text-primary hover:border-gym-accent/40 hover:bg-gym-accent-muted',
  danger:
    'bg-transparent border border-gym-danger/30 text-gym-danger hover:bg-gym-danger/10',
  glass: 'glass text-white hover:bg-gym-surface-elevated/80',
};

const sizes = {
  sm: 'h-9 px-3 text-xs rounded-xl gap-1.5',
  md: 'h-11 px-4 text-sm rounded-2xl gap-2',
  lg: 'h-12 px-5 text-sm rounded-2xl gap-2',
  xl: 'h-14 px-6 text-base rounded-2xl gap-2.5 font-bold',
  icon: 'w-11 h-11 rounded-2xl',
  'icon-sm': 'w-9 h-9 rounded-xl',
};

/**
 * Button — primary CTA, ghost, outline, chip, icon, danger, glass.
 * Auto-supports loading, left/right icons, fullWidth, disabled.
 */
const Button = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  icon: Icon,
  children,
  className = '',
  type = 'button',
  ...rest
}) => {
  const isIconOnly = (size === 'icon' || size === 'icon-sm') && !children;
  const iconSize = size === 'xl' ? 22 : size === 'lg' ? 20 : size === 'sm' ? 14 : 18;

  const classes = [
    'inline-flex items-center justify-center font-semibold',
    'transition-all duration-200 ease-out',
    'active:scale-[0.97]',
    'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-gym-accent/50',
    variants[variant],
    sizes[size],
    fullWidth ? 'w-full' : '',
    className,
  ].join(' ');

  return (
    <motion.button
      whileTap={disabled || loading ? {} : { scale: 0.97 }}
      type={type}
      disabled={disabled || loading}
      className={classes}
      {...rest}
    >
      {loading ? (
        <>
          <Loader2 size={iconSize} className="animate-spin" />
          {children && <span className="opacity-80">{children}</span>}
        </>
      ) : (
        <>
          {Icon ? <Icon size={iconSize} /> : LeftIcon && <LeftIcon size={iconSize} />}
          {!isIconOnly && children}
          {!Icon && RightIcon && !isIconOnly && <RightIcon size={iconSize} />}
        </>
      )}
    </motion.button>
  );
};

export default Button;
