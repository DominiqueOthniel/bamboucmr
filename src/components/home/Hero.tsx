"use client";

import Link from "next/link";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ArrowDown, ArrowRight, Check, Leaf, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";

const ease = [0.22, 0.61, 0.36, 1] as const;

function BambooArt() {
  return (
    <svg viewBox="0 0 300 300" fill="none" className="relative w-[86%] drop-shadow-[0_30px_40px_rgba(18,48,28,.22)]">
      <g>
        <rect x="118" y="40" width="26" height="230" rx="13" fill="#2F6B3C" />
        <rect x="118" y="95" width="26" height="6" fill="#12301C" opacity=".55" />
        <rect x="118" y="150" width="26" height="6" fill="#12301C" opacity=".55" />
        <rect x="118" y="205" width="26" height="6" fill="#12301C" opacity=".55" />
      </g>
      <g>
        <rect x="152" y="70" width="22" height="200" rx="11" fill="#3E8B4E" />
        <rect x="152" y="120" width="22" height="5" fill="#12301C" opacity=".5" />
        <rect x="152" y="170" width="22" height="5" fill="#12301C" opacity=".5" />
        <rect x="152" y="220" width="22" height="5" fill="#12301C" opacity=".5" />
      </g>
      <g>
        <rect x="96" y="90" width="18" height="180" rx="9" fill="#8FB63A" />
        <rect x="96" y="140" width="18" height="4" fill="#12301C" opacity=".4" />
        <rect x="96" y="200" width="18" height="4" fill="#12301C" opacity=".4" />
      </g>
      <path d="M131 40c-8-14-2-30 14-36-2 18-6 30-14 36Z" fill="#B4D64B" />
      <path d="M131 40c8-16 24-20 38-14-10 14-24 18-38 14Z" fill="#8FB63A" />
      <path d="M163 70c-6-12 0-24 12-30-2 14-6 24-12 30Z" fill="#B4D64B" />
      <path d="M105 90c-10-8-12-22-6-34 10 10 12 22 6 34Z" fill="#8FB63A" />
      <ellipse cx="150" cy="278" rx="70" ry="10" fill="#12301C" opacity=".12" />
    </svg>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const springX = useSpring(mx, { stiffness: 40, damping: 20 });
  const springY = useSpring(my, { stiffness: 40, damping: 20 });
  const artX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const artY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      mx.set((e.clientX - rect.left) / rect.width - 0.5);
      my.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, [mx, my, reduce]);

  const fadeUp = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease, delay },
        };

  return (
    <section
      ref={ref}
      className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-14 lg:pb-28 lg:pt-16"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,rgba(180,214,75,.18),transparent_50%),radial-gradient(ellipse_at_90%_20%,rgba(47,107,60,.12),transparent_45%),linear-gradient(180deg,#F4F5EE_0%,#EEF1E4_100%)]" />
        <div className="animate-mesh absolute -left-[10%] top-[-20%] h-[55vmax] w-[55vmax] rounded-full bg-[radial-gradient(circle,rgba(180,214,75,.22),transparent_68%)] blur-2xl" />
        <div className="animate-mesh absolute -right-[8%] bottom-[-10%] h-[45vmax] w-[45vmax] rounded-full bg-[radial-gradient(circle,rgba(47,107,60,.16),transparent_68%)] blur-2xl [animation-delay:-6s]" />
        <div className="absolute inset-0 opacity-[0.35] [background-image:linear-gradient(rgba(18,48,28,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(18,48,28,.04)_1px,transparent_1px)] [background-size:48px_48px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        {!reduce && (
          <motion.div
            className="absolute left-[12%] top-[22%] h-2 w-2 rounded-full bg-shoot-deep/70"
            animate={{ y: [0, -24, 0], opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
        {!reduce && (
          <motion.div
            className="absolute right-[18%] top-[35%] h-1.5 w-1.5 rounded-full bg-bamboo/60"
            animate={{ y: [0, 18, 0], opacity: [0.2, 0.9, 0.2] }}
            transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          />
        )}
      </div>

      <div className="relative mx-auto grid max-w-[1160px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:gap-16 lg:px-16">
        <div>
          <motion.div
            {...fadeUp(0.05)}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-1.5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-bamboo shadow-sm backdrop-blur"
          >
            <Sparkles className="h-3.5 w-3.5 text-shoot-deep" />
            Économie verte · Cameroun &amp; Afrique
          </motion.div>

          <motion.h1
            {...fadeUp(0.15)}
            className="mt-6 max-w-[14ch] text-[clamp(2.6rem,6.4vw,4.8rem)] leading-[0.98]"
          >
            Le bambou, moteur du{" "}
            <span className="relative inline-block">
              <span className="text-shimmer">développement durable</span>
              <motion.span
                className="absolute inset-x-0 bottom-[0.08em] -z-10 h-[0.18em] rounded-full bg-shoot/50"
                initial={reduce ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.9, ease, delay: 0.7 }}
                style={{ originX: 0 }}
              />
            </span>
            .
          </motion.h1>

          <motion.p
            {...fadeUp(0.28)}
            className="mt-6 max-w-[44ch] text-[clamp(1.05rem,1.6vw,1.2rem)] text-muted"
          >
            BambouCamer transforme une ressource extraordinaire en levier
            concret : protéger l&apos;environnement, préserver la biodiversité et
            dynamiser les économies locales.
          </motion.p>

          <motion.div
            {...fadeUp(0.4)}
            className="mt-8 flex flex-wrap gap-3.5"
          >
            <Link
              href="/solutions"
              className="group inline-flex items-center gap-2.5 rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white shadow-[0_12px_24px_-14px_rgba(47,107,60,.8)] transition hover:-translate-y-0.5 hover:bg-forest-2 hover:shadow-[0_18px_30px_-16px_rgba(47,107,60,.9)]"
            >
              Découvrir nos solutions
              <ArrowDown className="h-[18px] w-[18px] transition group-hover:translate-y-0.5" />
            </Link>
            <Link
              href="/apropos"
              className="inline-flex items-center gap-2.5 rounded-[13px] border-[1.5px] border-sand-2 bg-transparent px-6 py-3.5 font-semibold text-forest transition hover:-translate-y-0.5 hover:border-bamboo hover:bg-surface"
            >
              Qui sommes-nous
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </motion.div>

          <motion.div
            {...fadeUp(0.52)}
            className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[0.86rem] text-muted"
          >
            {[
              { label: "Association", rest: "à but non lucratif" },
              { label: "Startup", rest: "d'innovation sociale" },
              { label: "Basée à", rest: "Dschang" },
            ].map((item, i) => (
              <span key={item.label} className="inline-flex items-center gap-5">
                {i > 0 && (
                  <span className="hidden h-1.5 w-1.5 rounded-full bg-sand-2 sm:inline-block" />
                )}
                <span>
                  <b className="font-display text-forest">{item.label}</b>{" "}
                  {item.rest}
                </span>
              </span>
            ))}
          </motion.div>
        </div>

        {/* Visual */}
        <motion.div
          {...fadeUp(0.2)}
          className="relative mx-auto aspect-square w-full max-w-[420px] lg:max-w-none"
        >
          <div className="animate-pulse-glow absolute inset-[6%] rounded-full bg-[radial-gradient(circle_at_50%_42%,rgba(180,214,75,.32),rgba(47,107,60,.12)_55%,transparent_72%)]" />
          <div className="animate-spin-slow absolute inset-[10%] rounded-full border border-dashed border-bamboo/20" />

          <motion.div
            className="grid h-full place-items-center"
            style={reduce ? undefined : { x: artX, y: artY }}
          >
            <div className="animate-float">
              <BambooArt />
            </div>
          </motion.div>

          <motion.div
            className="animate-float absolute left-0 top-[8%] flex items-center gap-3 rounded-[15px] border border-line bg-surface/90 px-3.5 py-3 shadow-[0_6px_14px_rgba(18,48,28,.08),0_26px_50px_-24px_rgba(18,48,28,.38)] backdrop-blur-md sm:-left-[4%]"
            initial={reduce ? false : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.7 }}
          >
            <span className="grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-bamboo text-white">
              <Leaf className="h-4 w-4" />
            </span>
            <div>
              <small className="block text-[0.72rem] tracking-wide text-muted">
                Séquestration CO₂
              </small>
              <strong className="font-display text-[1.05rem]">×4 vs arbre</strong>
            </div>
          </motion.div>

          <motion.div
            className="animate-float-delayed absolute bottom-[10%] right-0 flex items-center gap-3 rounded-[15px] border border-line bg-surface/90 px-3.5 py-3 shadow-[0_6px_14px_rgba(18,48,28,.08),0_26px_50px_-24px_rgba(18,48,28,.38)] backdrop-blur-md sm:-right-[3%]"
            initial={reduce ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.85 }}
          >
            <span className="grid h-[38px] w-[38px] place-items-center rounded-[11px] bg-forest text-white">
              <Check className="h-4 w-4" />
            </span>
            <div>
              <small className="block text-[0.72rem] tracking-wide text-muted">
                Croissance
              </small>
              <strong className="font-display text-[1.05rem]">La + rapide</strong>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className="relative mt-12 flex justify-center lg:mt-16"
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1 }}
      >
        <a
          href="#chiffres"
          className="group flex flex-col items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-muted"
        >
          Explorer
          <span className="grid h-10 w-6 place-items-start justify-center overflow-hidden rounded-full border border-line pt-2">
            <motion.span
              className="h-2 w-1 rounded-full bg-bamboo"
              animate={reduce ? undefined : { y: [0, 12, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
