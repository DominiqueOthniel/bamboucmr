"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useLiteMotion } from "@/hooks/useLiteMotion";
import { tweenSmooth } from "@/lib/motion";

type TextRevealProps = {
  text: string;
  className?: string;
  highlightClassName?: string;
  delay?: number;
};

export function TextReveal({
  text,
  className = "",
  highlightClassName = "",
  delay = 0,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const lite = useLiteMotion();

  if (reduce || lite) {
    return <span className={`${className} ${highlightClassName}`.trim()}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.05, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className={`inline-block ${highlightClassName}`}
          variants={{
            hidden: { opacity: 0, y: 16 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={tweenSmooth}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
}
