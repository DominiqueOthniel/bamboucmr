"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, Leaf, Sparkles } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { images } from "@/lib/images";

const ease = [0.22, 0.61, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease, delay },
        };

  return (
    <section className="relative min-h-[88vh] overflow-hidden">
      {/* Photo de fond */}
      <div className="absolute inset-0" aria-hidden="true">
        <SiteImage
          src={images.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest/92 via-forest/78 to-forest/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-bamboo/20" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(180,214,75,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(180,214,75,.08)_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>

      {/* Blobs animés */}
      {!reduce && (
        <>
          <motion.div
            className="pointer-events-none absolute -left-20 top-20 h-64 w-64 rounded-full bg-shoot/20 blur-3xl"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity }}
          />
          <motion.div
            className="pointer-events-none absolute bottom-10 right-10 h-48 w-48 rounded-full bg-bamboo/30 blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 10, repeat: Infinity, delay: 1 }}
          />
        </>
      )}

      <div className="relative mx-auto grid max-w-[1160px] items-center gap-10 px-5 pb-20 pt-16 sm:px-8 lg:min-h-[88vh] lg:grid-cols-[1.1fr_.9fr] lg:gap-14 lg:px-16 lg:pb-24 lg:pt-20">
        <div className="text-white">
          <motion.div
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-shoot backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5" />
            Nouveau vecteur de l&apos;économie verte
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-6 max-w-[14ch] text-[clamp(2.8rem,6.8vw,5rem)] leading-[0.95] text-white"
          >
            Bambou{" "}
            <span className="text-shoot">Camer</span>
          </motion.h1>

          <motion.p
            {...fadeUp(0.25)}
            className="mt-5 max-w-[46ch] text-[clamp(1.05rem,1.6vw,1.25rem)] text-white/88"
          >
            Transforme le bambou en moteur de développement durable au Cameroun
            et en Afrique — protéger l&apos;environnement, préserver la
            biodiversité et dynamiser les économies locales.
          </motion.p>

          <motion.div
            {...fadeUp(0.38)}
            className="mt-8 flex flex-wrap gap-3.5"
          >
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2.5 rounded-[13px] bg-shoot px-6 py-3.5 font-semibold text-forest shadow-lg transition hover:-translate-y-0.5 hover:bg-white"
            >
              En savoir plus
              <ArrowDown className="h-[18px] w-[18px] transition group-hover:translate-y-0.5" />
            </Link>
            <Link
              href="/apropos"
              className="inline-flex items-center gap-2.5 rounded-[13px] border border-white/35 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Qui sommes-nous
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.5)}
            className="mt-10 flex flex-wrap gap-3"
          >
            {[
              { icon: Leaf, label: "Association ONG" },
              { icon: Sparkles, label: "Startup sociale" },
              { icon: Leaf, label: "Basée à Dschang" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-2 text-[0.82rem] text-white/90 backdrop-blur"
              >
                <Icon className="h-3.5 w-3.5 text-shoot" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Carte visuelle */}
        <motion.div
          {...fadeUp(0.2)}
          className="relative mx-auto w-full max-w-[440px] lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-[24px] border border-white/15 shadow-[0_30px_60px_-20px_rgba(0,0,0,.5)]">
            <SiteImage
              src={images.bambooField}
              alt="Champ de bambou — BambouCamer"
              width={1140}
              height={570}
              className="aspect-[4/3] w-full"
              priority
            />
            <div className="absolute inset-0 rounded-[24px] ring-1 ring-inset ring-white/10" />
          </div>

          <motion.div
            className="absolute -bottom-4 -left-3 rounded-2xl border border-white/20 bg-forest/90 px-4 py-3 text-white shadow-xl backdrop-blur md:-left-6"
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <p className="font-display text-2xl font-bold text-shoot">12 000+</p>
            <p className="text-sm text-white/80">plants mis en terre</p>
          </motion.div>

          <motion.div
            className="absolute -right-2 top-6 rounded-2xl border border-white/20 bg-white/95 px-4 py-3 text-forest shadow-xl md:-right-5"
            initial={reduce ? false : { opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.85 }}
          >
            <p className="font-display text-lg font-bold">×4 CO₂</p>
            <p className="text-sm text-muted">vs arbre ordinaire</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="relative flex justify-center pb-8"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <a
          href="#chiffres"
          className="flex flex-col items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-white/70"
        >
          Explorer
          <span className="grid h-10 w-6 place-items-start justify-center overflow-hidden rounded-full border border-white/30 pt-2">
            <motion.span
              className="h-2 w-1 rounded-full bg-shoot"
              animate={reduce ? undefined : { y: [0, 12, 0] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
