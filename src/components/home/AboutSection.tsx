"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/i18n/LocaleProvider";
import { useLiteMotion } from "@/hooks/useLiteMotion";
import type { AboutQuestionItem } from "@/lib/content/types";
import { images } from "@/lib/images";

export function AboutSection({
  aboutQuestions,
}: {
  aboutQuestions: AboutQuestionItem[];
}) {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const lite = useLiteMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["4%", "-4%"]);
  const useParallax = !reduce && !lite;

  return (
    <section ref={ref} className="relative overflow-hidden py-14 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-shoot/15 blur-3xl" />
      <div className="container-site grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        <Reveal className="relative" variant="left">
          <div className="overflow-hidden rounded-[20px] shadow-xl sm:rounded-[22px]">
            <motion.div style={useParallax ? { y: imageY } : undefined}>
            <SiteImage
              src={images.bambooField}
              alt={t("home.aboutBadge")}
              width={1140}
              height={570}
              className="aspect-[16/10] w-full"
            />
            </motion.div>
            <div className="on-dark bg-forest px-5 py-4 text-white sm:px-6 sm:py-5">
              <Eyebrow tone="on-dark" className="mb-2">
                {t("home.aboutBadge")}
              </Eyebrow>
              <p className="font-display text-lg leading-snug sm:text-xl">
                {t("home.aboutBadgeLine")}
              </p>
            </div>
          </div>
          <motion.div
            className="mt-4 inline-flex rounded-2xl border border-line bg-surface px-4 py-3 shadow-md sm:absolute sm:-bottom-4 sm:-right-3 sm:mt-0"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div>
              <p className="font-display text-2xl font-bold text-bamboo">×4</p>
              <p className="text-sm text-muted">{t("home.co2Label")}</p>
            </div>
          </motion.div>
        </Reveal>

        <div>
          <Reveal variant="right">
            <Eyebrow>{t("home.aboutEyebrow")}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
              {t("home.aboutTitle")}
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="mt-5 space-y-2.5">
            {aboutQuestions.map((q, i) => (
              <div
                key={q.id}
                className={`rounded-xl border px-3.5 py-2.5 text-[0.88rem] sm:px-4 sm:py-3 sm:text-[0.92rem] ${
                  i === 0
                    ? "border-bamboo/30 bg-bamboo/8 font-medium text-forest"
                    : "border-line bg-surface text-muted"
                }`}
              >
                {q.text}
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.14} className="mt-5 space-y-4 text-muted">
            <p>{t("home.aboutLead")}</p>
            <blockquote className="rounded-xl border-l-4 border-shoot bg-sand/60 px-4 py-3 font-display text-[1.05rem] leading-snug text-forest sm:px-5 sm:text-[1.1rem]">
              {t("home.aboutQuote")}
            </blockquote>
          </Reveal>

          <Reveal delay={0.2} className="btn-stack-mobile mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/apropos"
              className="btn-primary"
            >
              {t("home.aboutCta")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/objectifs"
              className="btn-cta inline-flex min-h-11 items-center justify-center rounded-[var(--radius-sm)] border border-line bg-surface px-5 py-3 font-semibold text-ink transition hover:bg-sand"
            >
              {t("home.aboutGoals")}
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
