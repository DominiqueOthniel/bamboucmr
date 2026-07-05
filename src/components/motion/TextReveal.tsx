"use client";

import { motion, useReducedMotion } from "framer-motion";
import { springBouncy } from "@/lib/motion";

type TextRevealProps = {
  text: string;
  className?: string;
  highlightClassName?: string;
  highlightFrom?: number;
  delay?: number;
};

export function TextReveal({
  text,
  className = "",
  highlightClassName = "",
  highlightFrom,
  delay = 0,
}: TextRevealProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    const before = highlightFrom !== undefined ? text.slice(0, highlightFrom) : text;
    const after = highlightFrom !== undefined ? text.slice(highlightFrom) : "";
    return (
      <span className={className}>
        {before}
        {after && <span className={highlightClassName}>{after}</span>}
      </span>
    );
  }

  return (
    <motion.span
      className={`inline-flex flex-wrap gap-x-[0.28em] ${className}`}
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((word, i) => {
        const isHighlight =
          highlightFrom !== undefined &&
          words.slice(0, i + 1).join(" ").length >= highlightFrom;
        return (
          <motion.span
            key={`${word}-${i}`}
            className={`inline-block ${isHighlight ? highlightClassName : ""}`}
            variants={{
              hidden: { opacity: 0, y: 48, rotateX: -40, filter: "blur(10px)" },
              visible: { opacity: 1, y: 0, rotateX: 0, filter: "blur(0px)" },
            }}
            transition={springBouncy}
            style={{ transformPerspective: 600 }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.span>
  );
}
