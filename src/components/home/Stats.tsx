"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useLiteMotion } from "@/hooks/useLiteMotion";
import { tweenSmooth } from "@/lib/motion";
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
      className="font-display text-[clamp(1.9rem,4vw,2.9rem)] font-bold leading-none tracking-tight"
    >
      {display.toLocaleString("fr-FR")}
      <span className="text-shoot">{suffix}</span>
    </div>
  );
}

export function Stats() {
  const reduce = useReducedMotion();
  const lite = useLiteMotion();

  return (
    <section
      id="chiffres"
      aria-label="Nos chiffres"
      className="relative overflow-hidden bg-forest py-14 text-[#F1F5EC] sm:py-20"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 50%, rgba(180,214,75,.2), transparent 40%), radial-gradient(circle at 85% -10%, rgba(180,214,75,.16), transparent 45%)",
        }}
      />
      <div className="container-site relative">
        <motion.p
          className="mb-8 text-center font-display text-[clamp(1.15rem,2.5vw,1.6rem)] text-shoot sm:mb-10"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={tweenSmooth}
        >
          Notre impact en chiffres
        </motion.p>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, ...tweenSmooth }}
              whileHover={lite ? undefined : { y: -4 }}
              className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center backdrop-blur-sm sm:p-5"
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <p className="mt-2 text-[0.8rem] text-[#B9C7B4] sm:text-[0.88rem]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
