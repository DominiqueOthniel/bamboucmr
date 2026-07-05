"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Reveal } from "@/components/motion/Reveal";
import { aboutQuestions } from "@/lib/data";
import { images } from "@/lib/images";

export function AboutSection() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-16 sm:py-24">
      <div className="pointer-events-none absolute -right-20 top-0 h-72 w-72 rounded-full bg-shoot/20 blur-3xl" />
      <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <Reveal className="relative">
          <div className="relative overflow-hidden rounded-[22px] shadow-[0_20px_50px_-20px_rgba(18,48,28,.45)]">
            <SiteImage
              src={images.bambooField}
              alt="Plantation de bambou au Cameroun"
              width={1140}
              height={570}
              className="aspect-[16/10] w-full"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-forest/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <span className="rounded-full bg-shoot/90 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wider text-forest">
                Terrain · Cameroun
              </span>
              <p className="mt-3 font-display text-xl leading-snug">
                Né au Cameroun, engagé pour <span className="text-shoot">l&apos;Afrique</span>
              </p>
            </div>
          </div>
          <motion.div
            className="absolute -bottom-5 -right-3 hidden rounded-2xl border border-line bg-surface p-4 shadow-xl sm:block"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p className="font-display text-2xl font-bold text-bamboo">×4</p>
            <p className="text-sm text-muted">plus de CO₂ séquestré</p>
          </motion.div>
        </Reveal>

        <div>
          <Reveal>
            <span className="eyebrow">Qui sommes-nous</span>
            <h2 className="mt-4 text-[clamp(1.9rem,4vw,2.8rem)]">
              Une association et une startup, une seule mission.
            </h2>
          </Reveal>

          <Reveal delay={0.08} className="mt-6 space-y-3">
            {aboutQuestions.map((q, i) => (
              <div
                key={q}
                className={`rounded-xl border px-4 py-3 text-[0.92rem] transition ${
                  i === 0
                    ? "border-bamboo/30 bg-bamboo/8 font-medium text-forest"
                    : "border-line bg-surface text-muted"
                }`}
              >
                {q}
              </div>
            ))}
          </Reveal>

          <Reveal delay={0.14} className="mt-6 space-y-4 text-muted">
            <p>
              <strong className="text-forest">BambouCamer</strong> est une association
              camerounaise à but non lucratif, apolitique et non confessionnelle, née
              d&apos;une conviction profonde : le bambou est bien plus qu&apos;une plante,
              c&apos;est un levier puissant pour transformer nos communautés.
            </p>
            <blockquote className="border-l-4 border-shoot bg-sand/60 px-5 py-4 font-display text-[1.1rem] leading-snug text-forest">
              « Quand la nature est protégée et que l&apos;innovation sert les
              communautés, le développement durable devient une réalité tangible. »
            </blockquote>
          </Reveal>

          <Reveal delay={0.2} className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/apropos"
              className="inline-flex items-center gap-2 rounded-[13px] bg-bamboo px-5 py-3 font-semibold text-white transition hover:bg-forest-2"
            >
              En savoir plus
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/objectifs"
              className="inline-flex rounded-[13px] border border-bamboo/40 bg-surface px-5 py-3 font-semibold text-bamboo transition hover:bg-bamboo/8"
            >
              Nos objectifs
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
