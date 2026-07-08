"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { useLiteMotion } from "@/hooks/useLiteMotion";
import type { AboutQuestionItem } from "@/lib/content/types";
import { images } from "@/lib/images";

export function AboutSection({
  aboutQuestions,
}: {
  aboutQuestions: AboutQuestionItem[];
}) {
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
              alt="Plantation de bambou au Cameroun"
              width={1140}
              height={570}
              className="aspect-[16/10] w-full"
            />
            </motion.div>
            <div className="bg-forest px-5 py-4 text-white sm:px-6 sm:py-5">
              <Eyebrow tone="on-dark" className="mb-2">
                Terrain · Cameroun
              </Eyebrow>
              <p className="font-display text-lg leading-snug sm:text-xl">
                Né au Cameroun, engagé pour{" "}
                <span className="text-shoot">l&apos;Afrique</span>
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
              <p className="text-sm text-muted">plus de CO₂ séquestré</p>
            </div>
          </motion.div>
        </Reveal>

        <div>
          <Reveal variant="right">
            <Eyebrow>Qui sommes-nous</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
              Une association et une startup, une seule mission
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
            <p>
              <strong className="text-forest">BambouCamer</strong> est une
              association camerounaise à but non lucratif, née d&apos;une conviction
              profonde : le bambou est un levier puissant pour transformer nos
              communautés.
            </p>
            <blockquote className="rounded-xl border-l-4 border-shoot bg-sand/60 px-4 py-3 font-display text-[1.05rem] leading-snug text-forest sm:px-5 sm:text-[1.1rem]">
              « Quand la nature est protégée et que l&apos;innovation sert les
              communautés, le développement durable devient une réalité tangible. »
            </blockquote>
          </Reveal>

          <Reveal delay={0.2} className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link
              href="/apropos"
              className="inline-flex items-center justify-center gap-2 rounded-[13px] bg-bamboo px-5 py-3 font-semibold text-white transition hover:bg-forest-2"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/objectifs"
              className="inline-flex items-center justify-center rounded-[13px] border border-bamboo/40 bg-surface px-5 py-3 font-semibold text-bamboo transition hover:bg-bamboo/8"
            >
              Nos objectifs
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
