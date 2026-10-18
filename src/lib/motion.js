/**
 * Shared framer-motion variants.
 * Use these instead of hardcoding initial/animate/transition per component.
 *
 * Curve of choice: cubic-bezier(0.16, 1, 0.3, 1) — "out-expo", snappy with elegant settle.
 */

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1];

/** Fade + slide up — for cards, sections, list items */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_OUT_EXPO },
  },
};

/** Fade only */
export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

/** Slide in from left */
export const slideInLeft = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/** Slide in from right */
export const slideInRight = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
};

/** Spring bounce — for hero elements, modals, FABs */
export const springBounce = {
  hidden: { scale: 0.85, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring', stiffness: 300, damping: 22, mass: 0.8 },
  },
};

/** Stagger parent — wrap children in motion variants for sequenced entry */
export const staggerParent = (delay = 0.07) => ({
  hidden: {},
  show: {
    transition: {
      staggerChildren: delay,
      delayChildren: 0.05,
    },
  },
});

/** Continuous glow pulse — for CTAs, active nav item, FAB */
export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 20px rgba(255, 77, 0, 0.25)',
      '0 0 45px rgba(255, 77, 0, 0.5)',
      '0 0 20px rgba(255, 77, 0, 0.25)',
    ],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/** Subtle continuous float */
export const float = {
  animate: {
    y: [0, -6, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/** Hover lift — for clickable cards */
export const hoverLift = {
  rest: { y: 0, scale: 1 },
  hover: { y: -4, scale: 1.01, transition: { duration: 0.25, ease: EASE_OUT_EXPO } },
  tap: { scale: 0.98 },
};

/** Page transition — used inside AnimatePresence in routes */
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.3, ease: EASE_OUT_EXPO },
};

/** Modal transition — backdrop + content */
export const modalBackdrop = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const modalContent = {
  hidden: { opacity: 0, scale: 0.92, y: 20 },
  show: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 280, damping: 24 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: { duration: 0.2 },
  },
};

/** Chat bubble entry */
export const chatBubble = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: EASE_OUT_EXPO },
  },
};
