"use client";

import { motion, useReducedMotion } from "framer-motion";

const orbs = [
  { size: 280, top: "8%", left: "-6%", color: "rgba(180,214,75,0.22)", delay: 0 },
  { size: 180, top: "55%", left: "72%", color: "rgba(47,107,60,0.35)", delay: 1.2 },
  { size: 120, top: "22%", left: "58%", color: "rgba(180,214,75,0.15)", delay: 0.6 },
  { size: 90, top: "78%", left: "18%", color: "rgba(255,255,255,0.06)", delay: 2 },
];

export function FloatingOrbs() {
  const reduce = useReducedMotion();

  if (reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            background: `radial-gradient(circle, ${orb.color}, transparent 70%)`,
          }}
          animate={{
            y: [0, -22, 0],
            x: [0, i % 2 === 0 ? 14 : -14, 0],
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 7 + i * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
    </div>
  );
}
