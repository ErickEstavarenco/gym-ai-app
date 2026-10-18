import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Navbar from '../Navbar';
import { pageTransition } from '../../lib/motion';

/**
 * PageShell — wrapper that provides the canvas background, safe area padding,
 * navbar, and page transition envelope for all authenticated pages.
 *
 * Pass a `header` ReactNode (SectionHeader or ToolbarHeader) to mount it.
 */
const PageShell = ({ header, children, hideNav = false, className = '' }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gym-bg text-gym-text-primary bg-canvas-glow relative overflow-x-hidden">
      {header}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          {...pageTransition}
          className={`px-6 ${hideNav ? 'pb-8' : 'pb-32'} pt-2 space-y-6 ${className}`}
        >
          {children}
        </motion.main>
      </AnimatePresence>

      {!hideNav && <Navbar />}
    </div>
  );
};

export default PageShell;
