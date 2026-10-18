import { forwardRef } from 'react';

/**
 * Input — labeled, iconized text input with optional trailing action.
 * Forwards ref so it can be used with form libraries.
 */
const Input = forwardRef(function Input(
  {
    label,
    icon: Icon,
    trailingIcon: TrailingIcon,
    onTrailingClick,
    error,
    hint,
    className = '',
    inputClassName = '',
    type = 'text',
    ...props
  },
  ref
) {
  return (
    <label className={`block ${className}`}>
      {label && (
        <span className="text-[10px] font-bold text-gym-text-secondary uppercase tracking-[0.15em] ml-1 mb-2 block">
          {label}
        </span>
      )}
      <div className="relative group">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gym-text-muted group-focus-within:text-gym-accent transition-colors pointer-events-none"
          />
        )}
        <input
          ref={ref}
          type={type}
          className={`w-full bg-gym-bg border ${
            error ? 'border-gym-danger/60' : 'border-gym-line'
          } ${
            Icon ? 'pl-12' : 'pl-4'
          } ${TrailingIcon ? 'pr-12' : 'pr-4'} py-4 rounded-2xl text-sm text-gym-text-primary placeholder:text-gym-text-muted/70 focus:outline-none focus:border-gym-accent focus:shadow-glow-sm transition-all duration-200 ${inputClassName}`}
          {...props}
        />
        {TrailingIcon && (
          <button
            type="button"
            onClick={onTrailingClick}
            tabIndex={-1}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gym-text-muted hover:text-gym-text-primary transition-colors"
          >
            <TrailingIcon size={18} />
          </button>
        )}
      </div>
      {error && (
        <span className="text-xs text-gym-danger mt-1.5 ml-1 block">{error}</span>
      )}
      {!error && hint && (
        <span className="text-xs text-gym-text-muted mt-1.5 ml-1 block">{hint}</span>
      )}
    </label>
  );
});

export default Input;
