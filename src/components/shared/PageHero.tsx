"use client";

import { motion, useReducedMotion } from "framer-motion";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-line bg-gradient-to-b from-sand to-paper py-12 sm:py-16 lg:py-20">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse at 80% 0%, rgba(180,214,75,.2), transparent 50%)",
        }}
      />
      <div className="relative mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-bamboo before:h-0.5 before:w-[22px] before:rounded-full before:bg-shoot-deep before:content-['']"
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-3.5 max-w-[18ch] text-[clamp(2rem,4.8vw,3.4rem)]"
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="mt-4 max-w-[52ch] text-[1.08rem] text-muted"
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
