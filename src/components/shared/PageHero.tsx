"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { useLiteMotion } from "@/hooks/useLiteMotion";
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
  const lite = useLiteMotion();
  const heavy = !reduce && !lite;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const tone = eyebrowTone ?? (image ? "on-dark" : "default");

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden border-b border-line ${image ? "min-h-[220px] sm:min-h-[280px]" : ""}`}
    >
      {image && (
        <motion.div
          className="absolute inset-0"
          style={heavy ? { scale: bgScale } : undefined}
          aria-hidden="true"
        >
          <SiteImage
            src={image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/92 via-forest/78 to-bamboo/55" />
        </motion.div>
      )}
      {!image && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-sand via-paper to-shoot/10"
          aria-hidden="true"
        />
      )}

      <div className="container-site relative py-10 sm:py-16 lg:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={tweenSmooth}
        >
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, ...tweenSmooth }}
          className={`mt-3 max-w-[22ch] text-[clamp(1.75rem,4.5vw,3.4rem)] leading-[1.05] sm:mt-4 ${image ? "text-white" : ""}`}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16, ...tweenSmooth }}
            className={`mt-3 max-w-[52ch] text-[0.95rem] leading-relaxed sm:mt-4 sm:text-[1.08rem] ${image ? "text-white/88" : "text-muted"}`}
          >
            {description}
          </motion.p>
        )}
      </div>
    </section>
  );
}
