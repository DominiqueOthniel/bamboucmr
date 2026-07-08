"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { tweenSmooth } from "@/lib/motion";

export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <>{children}</>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={tweenSmooth}
    >
      {children}
    </motion.div>
  );
}
