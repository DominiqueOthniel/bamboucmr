"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { springSnappy } from "@/lib/motion";
import { impactBars } from "@/lib/data";

function Bar({ label, pct, index }: { label: string; pct: number; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setShown(pct);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setShown(Math.round(pct * (1 - Math.pow(1 - p, 4))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, pct, reduce]);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, x: -24 }}
      animate={inView ? { opacity: 1, x: 0 } : undefined}
      transition={{ delay: index * 0.12, ...springSnappy }}
    >
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[0.96rem] font-medium">{label}</span>
        <motion.b
          className="font-display text-[1.05rem] text-shoot"
          key={shown}
          initial={reduce ? false : { scale: 1.3, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={springSnappy}
        >
          {shown}%
        </motion.b>
      </div>
      <div className="relative h-2.5 overflow-hidden rounded-full bg-white/12">
        <motion.div
          className="bar-shine relative h-full rounded-full bg-gradient-to-r from-bamboo-2 via-shoot to-bamboo-2"
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: reduce ? 0 : 1.4, ease: [0.22, 0.61, 0.36, 1], delay: index * 0.1 }}
        />
      </div>
    </motion.div>
  );
}

export function ImpactBars() {
  return (
    <div className="flex flex-col gap-6">
      {impactBars.map((bar, i) => (
        <Bar key={bar.label} label={bar.label} pct={bar.pct} index={i} />
      ))}
    </div>
  );
}
