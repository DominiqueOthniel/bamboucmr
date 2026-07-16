"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import type { SiteSettings } from "@/lib/content/types";

type Props = {
  hero: SiteSettings["hero"];
};

export function Hero({ hero }: Props) {
  const reduce = useReducedMotion();

  return (
    <section className="relative isolate min-h-[min(100svh,720px)] overflow-hidden bg-forest sm:min-h-[min(88vh,760px)]">
      <div className="absolute inset-0" aria-hidden="true">
        <SiteImage
          src={hero.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_30%] scale-[1.02] sm:object-[center_35%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,36,22,0.78)_0%,rgba(12,36,22,0.55)_40%,rgba(12,36,22,0.82)_100%)] sm:bg-[linear-gradient(105deg,rgba(12,36,22,0.92)_0%,rgba(12,36,22,0.72)_42%,rgba(12,36,22,0.38)_100%)]" />
        <div className="absolute inset-0 hidden bg-[linear-gradient(to_top,rgba(12,36,22,0.55)_0%,transparent_45%)] sm:block" />
        <div className="absolute inset-y-0 left-0 hidden w-[2px] bg-shoot/40 sm:block" />
      </div>

      <div className="container-site relative flex min-h-[min(100svh,720px)] flex-col justify-end pb-[max(2.5rem,env(safe-area-inset-bottom))] pt-24 sm:min-h-[min(88vh,760px)] sm:justify-center sm:pb-24 sm:pt-36">
        <motion.div
          className="max-w-3xl text-white"
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="eyebrow-text text-white/65">{hero.eyebrow}</p>

          <h1 className="mt-4 font-display text-[clamp(2.35rem,11vw,5.4rem)] font-semibold leading-[0.94] tracking-[-0.035em] text-white drop-shadow-[0_2px_24px_rgba(0,0,0,0.45)] sm:mt-5">
            {hero.title}
          </h1>

          <motion.p
            className="mt-4 max-w-[36rem] font-display text-[clamp(1.05rem,3.6vw,1.55rem)] font-medium leading-snug text-white/95 sm:mt-6"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {hero.tagline}
          </motion.p>

          <motion.p
            className="mt-3 max-w-[40rem] text-[0.95rem] leading-relaxed text-white/72 sm:mt-4 sm:text-[1.05rem]"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            className="btn-stack-mobile mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.28 }}
          >
            <Link href={hero.primaryCtaHref} className="btn-light">
              {hero.primaryCtaLabel}
              <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
            </Link>
            <Link href={hero.secondaryCtaHref} className="btn-secondary">
              {hero.secondaryCtaLabel}
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
