import { motion } from 'framer-motion';
import { Dumbbell } from 'lucide-react';

/**
 * Brand mark — gradient Dumbbell icon, optionally with wordmark.
 * Used on Login/Register hero and as the Navbar brand anchor.
 */
const sizeMap = {
  sm: { tile: 'p-2 rounded-xl', icon: 18, text: 'text-base' },
  md: { tile: 'p-3 rounded-2xl', icon: 26, text: 'text-xl' },
  lg: { tile: 'p-4 rounded-2xl', icon: 40, text: 'text-3xl' },
};

const Logo = ({ size = 'md', withWordmark = false, animate = false, asLink = false, onClick }) => {
  const cfg = sizeMap[size];

  const content = (
    <>
      <motion.div
        {...(animate
          ? {
              initial: { scale: 0, rotate: -20 },
              animate: { scale: 1, rotate: 0 },
              transition: { type: 'spring', stiffness: 260, damping: 18 },
            }
          : {})}
        className={`bg-gradient-to-br from-gym-accent to-gym-accent-hover shadow-glow-sm ${cfg.tile}`}
      >
        <Dumbbell size={cfg.icon} className="text-white" strokeWidth={2.5} />
      </motion.div>
      {withWordmark && (
        <span className={`font-display impact-text text-white ${cfg.text}`}>
          Gym<span className="gradient-text"> AI</span>
        </span>
      )}
    </>
  );

  if (asLink || onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className="flex items-center gap-2.5 group focus:outline-none"
      >
        {content}
      </button>
    );
  }

  return <div className="flex items-center gap-2.5">{content}</div>;
};

export default Logo;
