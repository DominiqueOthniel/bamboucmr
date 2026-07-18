"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { tweenSmooth } from "@/lib/motion";

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
      className={`relative overflow-hidden border-b border-line ${image ? "on-dark min-h-[240px] sm:min-h-[300px]" : ""}`}
    >
      {image ? (
        <div className="absolute inset-0" aria-hidden="true">
          <SiteImage
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(12,36,22,0.9)_0%,rgba(12,36,22,0.72)_55%,rgba(42,95,58,0.5)_100%)]" />
        </div>
      ) : (
        <div
          className="absolute inset-0 bg-[linear-gradient(160deg,var(--sand)_0%,var(--paper)_55%,color-mix(in_srgb,var(--bamboo)_6%,transparent)_100%)]"
          aria-hidden="true"
        />
      )}

      <div className="container-site relative py-12 sm:py-16 lg:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tweenSmooth}
        >
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, ...tweenSmooth }}
          className={`mt-4 max-w-[20ch] text-[clamp(1.85rem,4.6vw,3.35rem)] leading-[1.05] ${image ? "text-white" : "text-forest"}`}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12, ...tweenSmooth }}
            className={`mt-4 max-w-[48ch] text-[1rem] leading-relaxed sm:text-[1.08rem] ${image ? "text-white/80" : "text-muted"}`}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
