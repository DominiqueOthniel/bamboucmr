"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { images } from "@/lib/images";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.75, ease, delay },
        };

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <SiteImage
          src={images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/94 via-forest/82 to-forest/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-bamboo/15" />
      </div>

      <div className="container-site relative grid items-center gap-8 py-14 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20 xl:py-24">
        <div className="text-white">
          <motion.div {...fadeUp(0.05)}>
            <Eyebrow tone="on-dark">Nouveau vecteur de l&apos;économie verte</Eyebrow>
          </motion.div>

          <motion.h1
            {...fadeUp(0.12)}
            className="mt-5 text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95] text-white"
          >
            Bambou <span className="text-shoot">Camer</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.22)}
            className="mt-5 max-w-[48ch] text-[clamp(1rem,2.5vw,1.2rem)] leading-relaxed text-white/90"
          >
            Transforme le bambou en moteur de développement durable au Cameroun
            et en Afrique. Protéger l&apos;environnement, préserver la biodiversité
            et dynamiser les économies locales.
          </motion.p>

          <motion.div
            {...fadeUp(0.32)}
            className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Link
              href="/solutions"
              className="group inline-flex items-center justify-center gap-2 rounded-[13px] bg-shoot px-6 py-3.5 font-semibold text-forest shadow-lg transition hover:bg-white"
            >
              En savoir plus
              <ArrowDown className="h-[18px] w-[18px] transition group-hover:translate-y-0.5" />
            </Link>
            <Link
              href="/apropos"
              className="inline-flex items-center justify-center gap-2 rounded-[13px] border border-white/35 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Qui sommes-nous
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.42)}
            className="mt-8 flex flex-wrap gap-2 sm:gap-3"
          >
            {["Association ONG", "Startup sociale", "Basée à Dschang"].map(
              (label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[0.78rem] text-white/90 backdrop-blur sm:text-[0.82rem]"
                >
                  {label}
                </span>
              )
            )}
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.18)} className="w-full lg:max-w-[520px] lg:justify-self-end">
          <div className="relative overflow-hidden rounded-[20px] border border-white/15 shadow-2xl sm:rounded-[24px]">
            <SiteImage
              src={images.bambooField}
              alt="Champ de bambou au Cameroun"
              width={1140}
              height={570}
              className="aspect-[4/3] w-full sm:aspect-[16/10]"
              priority
            />
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
            <div className="rounded-2xl border border-white/20 bg-forest/90 px-4 py-3 text-white backdrop-blur">
              <p className="font-display text-xl font-bold text-shoot sm:text-2xl">
                12 000+
              </p>
              <p className="text-xs text-white/80 sm:text-sm">plants mis en terre</p>
            </div>
            <div className="rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-forest">
              <p className="font-display text-lg font-bold sm:text-xl">×4 CO₂</p>
              <p className="text-xs text-muted sm:text-sm">vs arbre ordinaire</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative flex justify-center pb-8">
        <a
          href="#chiffres"
          className="flex flex-col items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/70"
        >
          Explorer
          <span className="grid h-9 w-5 place-items-start justify-center overflow-hidden rounded-full border border-white/30 pt-1.5">
            <motion.span
              className="h-2 w-1 rounded-full bg-shoot"
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </span>
        </a>
      </div>
    </section>
  );
}
