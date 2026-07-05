"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/data";

function Counter({
  value,
  suffix,
}: {
  value: number;
  suffix: string;
}) {
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

    const duration = 1600;
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
    <div ref={ref} className="font-display text-[clamp(2.1rem,4vw,2.9rem)] font-bold leading-none tracking-tight">
      {display.toLocaleString("fr-FR")}
      <span className="text-shoot">{suffix}</span>
    </div>
  );
}

export function Stats() {
  return (
    <section
      id="chiffres"
      aria-label="Nos chiffres"
      className="relative overflow-hidden bg-forest py-16 text-[#F1F5EC] sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            "radial-gradient(circle at 85% -10%, rgba(180,214,75,.16), transparent 45%)",
        }}
      />
      <div className="relative mx-auto grid max-w-[1160px] grid-cols-2 gap-x-5 gap-y-8 px-5 sm:px-8 md:grid-cols-3 lg:grid-cols-5 lg:px-16">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.55 }}
          >
            <Counter value={stat.value} suffix={stat.suffix} />
            <p className="mt-2 max-w-[18ch] text-[0.9rem] text-[#B9C7B4]">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
