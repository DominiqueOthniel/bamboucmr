"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { springSnappy } from "@/lib/motion";

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
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const tone = eyebrowTone ?? (image ? "on-dark" : "default");

  return (
    <section
      ref={ref}
      className={`relative overflow-hidden border-b border-line ${image ? "min-h-[240px] sm:min-h-[300px]" : ""}`}
    >
      {image && (
        <motion.div
          className="absolute inset-0"
          style={reduce ? undefined : { scale: bgScale }}
          aria-hidden="true"
        >
          <motion.div
            className="absolute inset-0"
            animate={reduce ? undefined : { scale: [1, 1.08] }}
            transition={{ duration: 18, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          >
            <SiteImage
              src={image}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-forest/92 via-forest/78 to-bamboo/55" />
        </motion.div>
      )}
      {!image && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-sand via-paper to-shoot/10"
          aria-hidden="true"
        />
      )}

      <motion.div
        className="container-site relative py-12 sm:py-16 lg:py-20"
        style={reduce ? undefined : { y: contentY }}
      >
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.8, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={springSnappy}
        >
          <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: 0.1, ...springSnappy }}
          className={`mt-4 max-w-[22ch] text-[clamp(1.85rem,4.5vw,3.4rem)] leading-[1.02] ${image ? "text-white" : ""}`}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`mt-4 max-w-[52ch] text-[1rem] leading-relaxed sm:text-[1.08rem] ${image ? "text-white/88" : "text-muted"}`}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </section>
  );
}
