"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { MouseEvent, ReactNode } from "react";
import { springSnappy } from "@/lib/motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

export function TiltCard({ children, className = "", intensity = 12 }: TiltCardProps) {
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), springSnappy);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), springSnappy);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{ scale: 1.02, z: 20 }}
      transition={springSnappy}
    >
      {children}
    </motion.div>
  );
}
