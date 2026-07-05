"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { springBouncy } from "@/lib/motion";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "light" | "on-dark";
};

const tones = {
  default: "border-bamboo/25 bg-bamboo/10 text-bamboo",
  light: "border-shoot/30 bg-shoot/15 text-shoot-deep",
  "on-dark": "border-white/20 bg-white/10 text-shoot",
};

export function Eyebrow({ children, className = "", tone = "default" }: EyebrowProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <span
        className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] ${tones[tone]} ${className}`}
      >
        {children}
      </span>
    );
  }

  return (
    <motion.span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] ${tones[tone]} ${className}`}
      initial={{ opacity: 0, scale: 0.6, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={springBouncy}
    >
      {children}
    </motion.span>
  );
}
