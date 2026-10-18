import { motion } from 'framer-motion';
import { fadeUp } from '../../lib/motion';

/**
 * SectionHeader — editorial header for Home/Stats/Profile/Diet.
 * Sticky by default, with kicker + impact-text title + optional right slot.
 */
const SectionHeader = ({
  kicker,
  title,
  subtitle,
  rightSlot,
  sticky = true,
  className = '',
}) => {
  return (
    <motion.header
      variants={fadeUp}
      initial="hidden"
      animate="show"
      className={`${
        sticky ? 'sticky top-0 z-30' : ''
      } pt-12 pb-4 px-6 ${sticky ? 'bg-gym-bg/70 backdrop-blur-xl' : ''} ${className}`}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0 flex-1">
          {kicker && (
            <p className="text-[10px] font-bold text-gym-accent tracking-[0.2em] uppercase">
              {kicker}
            </p>
          )}
          <h1 className="font-display impact-text text-4xl text-white mt-1.5 leading-none">
            {title}
          </h1>
          {subtitle && (
            <p className="text-sm text-gym-text-secondary mt-2">{subtitle}</p>
          )}
        </div>
        {rightSlot && <div className="flex-shrink-0">{rightSlot}</div>}
      </div>
      {/* Subtle gradient divider */}
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gym-accent/30 to-transparent" />
    </motion.header>
  );
};

export default SectionHeader;
