"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { impactBars } from "@/lib/data";

function Bar({ label, pct }: { label: string; pct: number }) {
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
    const duration = 1300;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setShown(Math.round(pct * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, pct, reduce]);

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[0.96rem] font-medium">{label}</span>
        <b className="font-display text-[1.05rem] text-shoot">{shown}%</b>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/12">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-bamboo-2 to-shoot"
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : { width: 0 }}
          transition={{ duration: reduce ? 0 : 1.3, ease: [0.22, 0.61, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function ImpactBars() {
  return (
    <div className="flex flex-col gap-6">
      {impactBars.map((bar) => (
        <Bar key={bar.label} label={bar.label} pct={bar.pct} />
      ))}
    </div>
  );
}
