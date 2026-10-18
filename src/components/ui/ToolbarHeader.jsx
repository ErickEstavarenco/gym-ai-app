import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

/**
 * ToolbarHeader — back-button header for Chat/ActiveWorkout.
 * Glass surface, sticky, with optional right slot.
 */
const ToolbarHeader = ({
  backTo = '/',
  title,
  subtitle,
  rightSlot,
  onBack,
  className = '',
}) => {
  const navigate = useNavigate();
  const handleBack = () => {
    if (onBack) onBack();
    else if (typeof backTo === 'string') navigate(backTo);
    else if (typeof backTo === 'function') backTo();
  };

  return (
    <header
      className={`sticky top-0 z-30 glass-strong border-b border-gym-line ${className}`}
    >
      <div className="flex items-center gap-3 px-4 pt-12 pb-4">
        <button
          type="button"
          onClick={handleBack}
          className="w-10 h-10 rounded-full bg-gym-surface-elevated border border-gym-line flex items-center justify-center hover:border-gym-accent/40 transition-colors"
          aria-label="Voltar"
        >
          <ChevronLeft size={20} className="text-gym-text-primary" />
        </button>
        <div className="flex-1 min-w-0">
          <h2 className="font-bold text-gym-text-primary text-base truncate">
            {title}
          </h2>
          {subtitle && (
            <p className="text-xs text-gym-text-secondary truncate">{subtitle}</p>
          )}
        </div>
        {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
      </div>
    </header>
  );
};

export default ToolbarHeader;
