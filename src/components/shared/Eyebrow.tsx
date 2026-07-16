"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { tweenSmooth } from "@/lib/motion";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "light" | "on-dark";
};

const tones = {
  default: "text-bamboo",
  light: "text-shoot-deep",
  "on-dark": "text-white/70",
};

export function Eyebrow({ children, className = "", tone = "default" }: EyebrowProps) {
  const reduce = useReducedMotion();

  const classes = `eyebrow-text inline-flex items-center gap-2 ${tones[tone]} ${className}`;

  const content = (
    <>
      <span
        className={`h-px w-5 ${
          tone === "on-dark" ? "bg-white/40" : "bg-bamboo/50"
        }`}
        aria-hidden
      />
      {children}
    </>
  );

  if (reduce) {
    return <span className={classes}>{content}</span>;
  }

  return (
    <motion.span
      className={classes}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={tweenSmooth}
    >
      {content}
    </motion.span>
  );
}
