export const easeOut = [0.22, 0.61, 0.36, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const springSmooth = { type: "spring" as const, stiffness: 200, damping: 28 };
export const springSnappy = { type: "spring" as const, stiffness: 320, damping: 32 };
export const springSoft = { type: "spring" as const, stiffness: 160, damping: 26 };

export const tweenSmooth = { duration: 0.55, ease: easeOut };
export const tweenFast = { duration: 0.35, ease: easeOut };

export const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -24 },
  visible: { opacity: 1, x: 0 },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 24 },
  visible: { opacity: 1, x: 0 },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1 },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.03 },
  },
};

export const pageEnter = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -6 },
};
