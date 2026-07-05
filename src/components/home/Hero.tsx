"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { useRef } from "react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { FloatingOrbs } from "@/components/motion/FloatingOrbs";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { StaggerMount, StaggerMountItem } from "@/components/motion/Reveal";
import { TextReveal } from "@/components/motion/TextReveal";
import { useLiteMotion } from "@/hooks/useLiteMotion";
import { tweenSmooth } from "@/lib/motion";
import { images } from "@/lib/images";

const badges = ["Association ONG", "Startup sociale", "Basée à Dschang"];

export function Hero() {
  const reduce = useReducedMotion();
  const lite = useLiteMotion();
  const heavy = !reduce && !lite;
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "5%"]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <motion.div
          className="absolute inset-0 will-change-transform"
          style={heavy ? { y: bgY } : undefined}
        >
          <div
            className={`absolute inset-0 ${heavy ? "animate-ken-burns" : ""}`}
          >
            <SiteImage
              src={images.hero}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest/94 via-forest/82 to-forest/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-bamboo/15" />
        {heavy && <FloatingOrbs />}
        {heavy && (
          <>
            <div className="animate-spin-slow absolute -right-24 -top-24 hidden h-72 w-72 rounded-full border border-shoot/10 md:block" />
            <div className="animate-spin-slow absolute -bottom-32 -left-16 hidden h-56 w-56 rounded-full border border-white/5 [animation-direction:reverse] md:block" />
          </>
        )}
      </div>

      <motion.div
        className="container-site relative grid items-center gap-6 py-12 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20 xl:py-24"
        style={heavy ? { y: contentY } : undefined}
      >
        <div className="min-w-0 text-white">
          <StaggerMount>
            <StaggerMountItem>
              <Eyebrow tone="on-dark">Nouveau vecteur de l&apos;économie verte</Eyebrow>
            </StaggerMountItem>

            <StaggerMountItem>
              <h1 className="mt-4 text-[clamp(2.1rem,7vw,4.5rem)] leading-[0.95] text-white sm:mt-5">
                <TextReveal text="Bambou" delay={0.08} />
                <br />
                <TextReveal text="Camer" className="text-shoot" delay={0.2} />
              </h1>
            </StaggerMountItem>

            <StaggerMountItem>
              <p className="mt-4 max-w-[48ch] text-[clamp(0.98rem,2.5vw,1.2rem)] leading-relaxed text-white/90 sm:mt-5">
                Transforme le bambou en moteur de développement durable au Cameroun
                et en Afrique. Protéger l&apos;environnement, préserver la biodiversité
                et dynamiser les économies locales.
              </p>
            </StaggerMountItem>

            <StaggerMountItem>
              <div className="mt-6 flex flex-col gap-3 sm:mt-7 sm:flex-row sm:flex-wrap">
                <MagneticButton>
                  <Link
                    href="/solutions"
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-[13px] bg-shoot px-6 py-3.5 font-semibold text-forest shadow-lg transition hover:bg-white sm:w-auto"
                  >
                    En savoir plus
                    <ArrowDown className="h-[18px] w-[18px] transition group-hover:translate-y-0.5" />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/apropos"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-[13px] border border-white/35 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20 sm:w-auto"
                  >
                    Qui sommes-nous
                    <ArrowRight className="h-[18px] w-[18px]" />
                  </Link>
                </MagneticButton>
              </div>
            </StaggerMountItem>

            <StaggerMountItem>
              <div className="mt-6 flex flex-wrap gap-2 sm:mt-8 sm:gap-3">
                {badges.map((label) => (
                  <span
                    key={label}
                    className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[0.75rem] text-white/90 backdrop-blur sm:text-[0.82rem]"
                  >
                    {label}
                  </span>
                ))}
              </div>
            </StaggerMountItem>
          </StaggerMount>
        </div>

        <motion.div
          className="w-full min-w-0 lg:max-w-[520px] lg:justify-self-end"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, ...tweenSmooth }}
        >
          <div
            className={`relative overflow-hidden rounded-[18px] border border-white/15 shadow-2xl sm:rounded-[24px] ${heavy ? "animate-float" : ""}`}
          >
            <SiteImage
              src={images.bambooField}
              alt="Champ de bambou au Cameroun"
              width={1140}
              height={570}
              className="aspect-[4/3] w-full sm:aspect-[16/10]"
              priority
            />
            {heavy && (
              <div className="pointer-events-none absolute inset-0 animate-shine-sweep bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            )}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2.5 sm:mt-4 sm:gap-4">
            {[
              { value: "12 000+", label: "plants mis en terre", dark: true },
              { value: "×4 CO₂", label: "vs arbre ordinaire", dark: false },
            ].map((stat) => (
              <div
                key={stat.label}
                className={`rounded-2xl border px-3 py-2.5 backdrop-blur sm:px-4 sm:py-3 ${
                  stat.dark
                    ? "border-white/20 bg-forest/90 text-white"
                    : "border-white/20 bg-white/95 text-forest"
                }`}
              >
                <p
                  className={`font-display font-bold ${stat.dark ? "text-lg text-shoot sm:text-2xl" : "text-base sm:text-xl"}`}
                >
                  {stat.value}
                </p>
                <p className={`text-[0.7rem] sm:text-sm ${stat.dark ? "text-white/80" : "text-muted"}`}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="relative flex justify-center pb-6 sm:pb-8">
        <a
          href="#chiffres"
          className="flex flex-col items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/70"
        >
          Explorer
          <span className="grid h-9 w-5 place-items-start justify-center overflow-hidden rounded-full border border-white/30 pt-1.5">
            <motion.span
              className="h-2 w-1 rounded-full bg-shoot"
              animate={reduce ? undefined : { y: [0, 10, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </a>
      </div>
    </section>
  );
}
