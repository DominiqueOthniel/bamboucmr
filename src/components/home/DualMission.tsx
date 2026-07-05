"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { springSnappy } from "@/lib/motion";
import { images } from "@/lib/images";

const cards = [
  {
    title: "L'association",
    description:
      "Préservation de l'environnement, conservation de la biodiversité et développement des communautés locales.",
    href: "/apropos",
    image: images.association,
    color: "from-forest to-bamboo",
  },
  {
    title: "La startup",
    description:
      "Incubation de projets innovants qui transforment le bambou en produits durables et générateurs d'emplois.",
    href: "/apropos",
    image: images.startup,
    color: "from-bamboo-2 to-shoot-deep",
  },
];

export function DualMission() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-forest py-14 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(180,214,75,.18),transparent_45%)]" />
      <motion.div
        className="pointer-events-none absolute -right-32 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-shoot/10 blur-3xl"
        animate={reduce ? undefined : { scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="container-site relative">
        <Reveal className="mb-10 text-center">
          <Eyebrow tone="on-dark" className="justify-center">
            Une association · Une startup
          </Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.8rem)]">
            BambouCamer, une seule mission
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[#B9C7B4]">
            Nés au Cameroun, engagés pour l&apos;Afrique. Deux forces complémentaires
            pour faire du bambou un pilier du développement durable.
          </p>
        </Reveal>

        <Stagger className="grid gap-4 sm:gap-5 md:grid-cols-2" stagger={0.15}>
          {cards.map((card) => (
            <StaggerItem key={card.title} variant="scale">
              <motion.div whileHover={{ y: -8 }} transition={springSnappy}>
                <Link
                  href={card.href}
                  className="group relative block overflow-hidden rounded-[18px] border border-white/10 sm:rounded-[20px]"
                >
                  <motion.div
                    className="overflow-hidden"
                    initial={reduce ? false : { clipPath: "inset(0 100% 0 0)" }}
                    whileInView={{ clipPath: "inset(0 0% 0 0)" }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, ease: [0.22, 0.61, 0.36, 1] }}
                  >
                    <SiteImage
                      src={card.image}
                      alt={card.title}
                      width={640}
                      height={375}
                      className="aspect-[16/10] w-full transition duration-700 group-hover:scale-110"
                    />
                  </motion.div>
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-80 mix-blend-multiply`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                    <h3 className="text-lg sm:text-xl">{card.title}</h3>
                    <p className="mt-2 max-w-[40ch] text-sm text-white/85">
                      {card.description}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-shoot">
                      En savoir plus
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
