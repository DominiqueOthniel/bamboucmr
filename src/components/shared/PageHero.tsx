"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  image?: string;
  eyebrowTone?: "default" | "light" | "on-dark";
};

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  eyebrowTone,
}: PageHeroProps) {
  const reduce = useReducedMotion();
  const tone = eyebrowTone ?? (image ? "on-dark" : "default");

  return (
    <section
      className={`relative overflow-hidden border-b border-line ${image ? "min-h-[240px] sm:min-h-[300px]" : ""}`}
    >
      {image && (
        <div className="absolute inset-0" aria-hidden="true">
          <SiteImage
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/92 via-forest/78 to-bamboo/55" />
        </div>
      )}
      {!image && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-sand via-paper to-shoot/10"
          aria-hidden="true"
        />
      )}

      <div className="container-site relative py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className={`mt-4 max-w-[22ch] text-[clamp(1.85rem,4.5vw,3.4rem)] leading-[1.02] ${image ? "text-white" : ""}`}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className={`mt-4 max-w-[52ch] text-[1rem] leading-relaxed sm:text-[1.08rem] ${image ? "text-white/88" : "text-muted"}`}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
