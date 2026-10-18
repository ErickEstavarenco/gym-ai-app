/**
 * Toggle — accessible on/off switch with label.
 */
const Toggle = ({ checked, onChange, label, description, disabled = false }) => {
  return (
    <label
      className={`flex items-center justify-between gap-4 ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div className="flex-1">
        {label && (
          <span className="text-sm font-semibold text-gym-text-primary block">
            {label}
          </span>
        )}
        {description && (
          <span className="text-xs text-gym-text-secondary block mt-0.5">
            {description}
          </span>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-gym-accent/50 ${
          checked ? 'bg-gym-accent shadow-glow-sm' : 'bg-gym-line'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </label>
  );
};

export default Toggle;
