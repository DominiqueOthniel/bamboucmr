import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";

const teasers = [
  {
    href: "/apropos",
    eyebrow: "Qui sommes-nous",
    title: "Association & startup unies",
    description:
      "Deux forces, une mission : valoriser le bambou pour les communautés et les écosystèmes.",
    cta: "En savoir plus",
  },
  {
    href: "/solutions",
    eyebrow: "Nos solutions",
    title: "Des réponses concrètes",
    description:
      "Restauration, formation, crédits carbone et produits durables pour le Cameroun et l'Afrique.",
    cta: "Voir les solutions",
  },
  {
    href: "/impact",
    eyebrow: "Notre impact",
    title: "Des résultats mesurables",
    description:
      "Suivez l'avancement de nos chantiers et l'effet concret de nos engagements sur le terrain.",
    cta: "Voir l'impact",
  },
];

export function Teasers() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16">
        <Reveal className="mb-10 max-w-[640px] sm:mb-14">
          <span className="inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-bamboo before:h-0.5 before:w-[22px] before:rounded-full before:bg-shoot-deep before:content-['']">
            Explorer BambouCamer
          </span>
          <h2 className="mt-4 text-[clamp(1.9rem,4.4vw,3rem)]">
            Une mission, plusieurs leviers d&apos;action.
          </h2>
          <p className="mt-4 text-[1.05rem] text-muted">
            Découvrez qui nous sommes, ce que nous visons et comment le bambou
            devient un outil concret de développement durable.
          </p>
        </Reveal>

        <Stagger className="grid gap-4 md:grid-cols-3">
          {teasers.map((item) => (
            <StaggerItem key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full flex-col rounded-[18px] border border-line bg-surface p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_6px_14px_rgba(18,48,28,.08),0_26px_50px_-24px_rgba(18,48,28,.38)]"
              >
                <span className="inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-bamboo before:h-0.5 before:w-[22px] before:rounded-full before:bg-shoot-deep before:content-['']">
                  {item.eyebrow}
                </span>
                <h3 className="mt-3 text-[1.2rem]">{item.title}</h3>
                <p className="mt-2.5 flex-1 text-[0.95rem] text-muted">
                  {item.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-2 font-semibold text-bamboo">
                  {item.cta}
                  <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
