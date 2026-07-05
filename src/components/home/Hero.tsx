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
import { springBouncy, springSnappy, springSoft } from "@/lib/motion";
import { images } from "@/lib/images";

const badges = ["Association ONG", "Startup sociale", "Basée à Dschang"];

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.3]);

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      <motion.div className="absolute inset-0" style={reduce ? undefined : { y: bgY }} aria-hidden="true">
        <motion.div
          className="absolute inset-0"
          animate={reduce ? undefined : { scale: [1, 1.1] }}
          transition={{ duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          <SiteImage
            src={images.hero}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-forest/94 via-forest/82 to-forest/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest/85 via-transparent to-bamboo/15" />
        <FloatingOrbs />
        <div className="animate-spin-slow absolute -right-24 -top-24 h-72 w-72 rounded-full border border-shoot/10" />
        <div className="animate-spin-slow absolute -bottom-32 -left-16 h-56 w-56 rounded-full border border-white/5 [animation-direction:reverse]" />
      </motion.div>

      <motion.div
        className="container-site relative grid items-center gap-8 py-14 sm:gap-10 sm:py-16 lg:grid-cols-2 lg:gap-14 lg:py-20 xl:py-24"
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="text-white">
          <StaggerMount>
            <StaggerMountItem>
              <Eyebrow tone="on-dark">Nouveau vecteur de l&apos;économie verte</Eyebrow>
            </StaggerMountItem>

            <StaggerMountItem>
              <h1 className="mt-5 text-[clamp(2.4rem,7vw,4.5rem)] leading-[0.95] text-white">
                <TextReveal text="Bambou" delay={0.1} />
                <br />
                <TextReveal text="Camer" className="text-shoot" delay={0.28} />
              </h1>
            </StaggerMountItem>

            <StaggerMountItem>
              <motion.p
                className="mt-5 max-w-[48ch] text-[clamp(1rem,2.5vw,1.2rem)] leading-relaxed text-white/90"
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, ...springSoft }}
              >
                Transforme le bambou en moteur de développement durable au Cameroun
                et en Afrique. Protéger l&apos;environnement, préserver la biodiversité
                et dynamiser les économies locales.
              </motion.p>
            </StaggerMountItem>

            <StaggerMountItem>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <MagneticButton>
                  <Link
                    href="/solutions"
                    className="group inline-flex items-center justify-center gap-2 rounded-[13px] bg-shoot px-6 py-3.5 font-semibold text-forest shadow-lg shadow-shoot/20 transition hover:bg-white hover:shadow-shoot/30"
                  >
                    En savoir plus
                    <ArrowDown className="h-[18px] w-[18px] transition group-hover:translate-y-0.5" />
                  </Link>
                </MagneticButton>
                <MagneticButton>
                  <Link
                    href="/apropos"
                    className="inline-flex items-center justify-center gap-2 rounded-[13px] border border-white/35 bg-white/10 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/20"
                  >
                    Qui sommes-nous
                    <ArrowRight className="h-[18px] w-[18px]" />
                  </Link>
                </MagneticButton>
              </div>
            </StaggerMountItem>

            <StaggerMountItem>
              <motion.div
                className="mt-8 flex flex-wrap gap-2 sm:gap-3"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: {},
                  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.65 } },
                }}
              >
                {badges.map((label) => (
                  <motion.span
                    key={label}
                    className="rounded-full border border-white/15 bg-white/8 px-3 py-1.5 text-[0.78rem] text-white/90 backdrop-blur sm:text-[0.82rem]"
                    variants={{
                      hidden: { opacity: 0, scale: 0.7, y: 10 },
                      visible: { opacity: 1, scale: 1, y: 0 },
                    }}
                    transition={springBouncy}
                    whileHover={{ scale: 1.06, borderColor: "rgba(180,214,75,0.5)" }}
                  >
                    {label}
                  </motion.span>
                ))}
              </motion.div>
            </StaggerMountItem>
          </StaggerMount>
        </div>

        <motion.div
          className="w-full lg:max-w-[520px] lg:justify-self-end"
          initial={reduce ? false : { opacity: 0, x: 48, rotateY: -8 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          transition={{ delay: 0.35, ...springSnappy }}
          style={{ transformPerspective: 900 }}
        >
          <motion.div
            className="relative overflow-hidden rounded-[20px] border border-white/15 shadow-2xl sm:rounded-[24px]"
            animate={reduce ? undefined : { y: [0, -10, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <SiteImage
              src={images.bambooField}
              alt="Champ de bambou au Cameroun"
              width={1140}
              height={570}
              className="aspect-[4/3] w-full sm:aspect-[16/10]"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 transition-opacity duration-500 hover:opacity-100" />
            <motion.div
              className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-12"
              animate={reduce ? undefined : { x: ["-120%", "220%"] }}
              transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
            />
          </motion.div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4">
            {[
              { value: "12 000+", label: "plants mis en terre", dark: true },
              { value: "×4 CO₂", label: "vs arbre ordinaire", dark: false },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className={`rounded-2xl border px-4 py-3 backdrop-blur ${
                  stat.dark
                    ? "border-white/20 bg-forest/90 text-white"
                    : "border-white/20 bg-white/95 text-forest"
                }`}
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.12, ...springBouncy }}
                whileHover={{ scale: 1.04, y: -4 }}
              >
                <p
                  className={`font-display font-bold ${stat.dark ? "text-xl text-shoot sm:text-2xl" : "text-lg sm:text-xl"}`}
                >
                  {stat.value}
                </p>
                <p className={`text-xs sm:text-sm ${stat.dark ? "text-white/80" : "text-muted"}`}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <div className="relative flex justify-center pb-8">
        <motion.a
          href="#chiffres"
          className="flex flex-col items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-white/70"
          animate={reduce ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          Explorer
          <span className="grid h-9 w-5 place-items-start justify-center overflow-hidden rounded-full border border-white/30 pt-1.5">
            <motion.span
              className="h-2 w-1 rounded-full bg-shoot"
              animate={reduce ? undefined : { y: [0, 10, 0], opacity: [1, 0.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity }}
            />
          </span>
        </motion.a>
      </div>
    </section>
  );
}
