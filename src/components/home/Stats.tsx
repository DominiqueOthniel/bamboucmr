"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { springBouncy, springSnappy } from "@/lib/motion";
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
    const duration = 1800;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 4);
      setDisplay(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduce, value]);

  return (
    <motion.div
      ref={ref}
      className="font-display text-[clamp(2.1rem,4vw,2.9rem)] font-bold leading-none tracking-tight"
      animate={inView && !reduce ? { scale: [1, 1.06, 1] } : undefined}
      transition={{ duration: 0.5, delay: 1.2 }}
    >
      {display.toLocaleString("fr-FR")}
      <span className="text-shimmer">{suffix}</span>
    </motion.div>
  );
}

export function Stats() {
  const reduce = useReducedMotion();

  return (
    <section
      id="chiffres"
      aria-label="Nos chiffres"
      className="relative overflow-hidden bg-forest py-16 text-[#F1F5EC] sm:py-20"
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 50%, rgba(180,214,75,.2), transparent 40%), radial-gradient(circle at 85% -10%, rgba(180,214,75,.16), transparent 45%)",
        }}
        animate={reduce ? undefined : { opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-site relative">
        <motion.p
          className="mb-10 text-center font-display text-[clamp(1.2rem,2.5vw,1.6rem)] text-shoot"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={springSnappy}
        >
          Notre impact en chiffres
        </motion.p>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 32, scale: 0.85 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, ...springBouncy }}
              whileHover={{ y: -6, scale: 1.03, borderColor: "rgba(180,214,75,0.45)" }}
              className="rounded-2xl border border-white/10 bg-white/5 p-5 text-center backdrop-blur-sm transition-colors"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-[0.88rem] text-[#B9C7B4]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
