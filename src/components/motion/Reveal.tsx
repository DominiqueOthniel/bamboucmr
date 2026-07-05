"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeLeft, fadeRight, fadeUp, scaleIn, springSoft, staggerContainer } from "@/lib/motion";

type VariantName = "up" | "left" | "right" | "scale";

const variantMap: Record<VariantName, Variants> = {
  up: fadeUp,
  left: fadeLeft,
  right: fadeRight,
  scale: scaleIn,
};

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: VariantName;
};

export function Reveal({
  children,
  className,
  delay = 0,
  variant = "up",
}: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-6% 0px" }}
      variants={variantMap[variant]}
      transition={{ ...springSoft, delay }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className,
  stagger = 0.09,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-6% 0px" }}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren: 0.05 },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  variant?: VariantName;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      variants={variantMap[variant]}
      transition={springSoft}
    >
      {children}
    </motion.div>
  );
}

/** Stagger container for hero / above-the-fold (animate on mount, not scroll) */
export function StaggerMount({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {children}
    </motion.div>
  );
}

export function StaggerMountItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={fadeUp} transition={{ ...springSoft, duration: 0.7 }}>
      {children}
    </motion.div>
  );
}
