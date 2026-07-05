"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteImage } from "@/components/shared/SiteImage";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
};

export function PageHero({ eyebrow, title, description, image }: PageHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section
      className={`relative overflow-hidden border-b border-line ${image ? "min-h-[300px]" : ""}`}
    >
      {image && (
        <div className="absolute inset-0" aria-hidden="true">
          <SiteImage src={image} alt="" fill sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/75 to-bamboo/60" />
        </div>
      )}
      {!image && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-sand via-paper to-shoot/10"
          aria-hidden="true"
        />
      )}

      <div className="relative mx-auto max-w-[1160px] px-5 py-14 sm:px-8 sm:py-18 lg:px-16 lg:py-20">
        <motion.span
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className={`eyebrow ${image ? "text-shoot before:bg-shoot" : ""}`}
        >
          {eyebrow}
        </motion.span>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className={`mt-3.5 max-w-[18ch] text-[clamp(2rem,4.8vw,3.4rem)] ${image ? "text-white" : ""}`}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className={`mt-4 max-w-[52ch] text-[1.08rem] ${image ? "text-white/85" : "text-muted"}`}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
