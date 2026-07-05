export const easeOut = [0.22, 0.61, 0.36, 1] as const;
export const easeInOut = [0.65, 0, 0.35, 1] as const;

export const springSnappy = { type: "spring" as const, stiffness: 380, damping: 28 };
export const springBouncy = { type: "spring" as const, stiffness: 260, damping: 18 };
export const springSoft = { type: "spring" as const, stiffness: 120, damping: 20 };

export const fadeUp = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};

export const fadeLeft = {
  hidden: { opacity: 0, x: -40, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

export const fadeRight = {
  hidden: { opacity: 0, x: 40, filter: "blur(6px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.88, filter: "blur(6px)" },
  visible: { opacity: 1, scale: 1, filter: "blur(0px)" },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.04 },
  },
};

export const pageEnter = {
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
};
