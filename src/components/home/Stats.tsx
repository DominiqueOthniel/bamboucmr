"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLiteMotion } from "@/hooks/useLiteMotion";
import { tweenSmooth } from "@/lib/motion";
import type { StatItem } from "@/lib/content/types";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const duration = 1400;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  return (
    <div
      ref={ref}
      className="font-display text-[clamp(1.45rem,5.5vw,2.9rem)] font-bold leading-none tracking-tight"
    >
      {display.toLocaleString("fr-FR")}
      <span className="text-shoot/90">{suffix}</span>
    </div>
  );
}

export function Stats({ stats }: { stats: StatItem[] }) {
  const reduce = useReducedMotion();
  const lite = useLiteMotion();

  return (
    <section
      id="chiffres"
      aria-label="Nos chiffres"
      className="relative overflow-hidden bg-forest py-16 text-[#EDF2EA] sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(circle at 12% 40%, rgba(42,95,58,.45), transparent 42%), radial-gradient(circle at 88% 0%, rgba(132,158,66,.18), transparent 40%)",
        }}
      />
      <div className="container-site relative">
        <motion.p
          className="mb-10 text-center eyebrow-text text-white/55"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={tweenSmooth}
        >
          Notre impact en chiffres
        </motion.p>
        <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.id}
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, ...tweenSmooth }}
              whileHover={lite ? undefined : { y: -3 }}
              className={`border border-white/10 bg-white/[0.04] px-2.5 py-4 text-center sm:px-4 sm:py-6 ${
                stats.length % 2 === 1 && i === stats.length - 1
                  ? "col-span-2 md:col-span-1"
                  : ""
              }`}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-[0.75rem] leading-snug text-[#A8B6A6] sm:mt-2.5 sm:text-[0.88rem]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
