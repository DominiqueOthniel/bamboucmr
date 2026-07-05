import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez BambouCamer : association et startup d'innovation sociale basées à Dschang.",
};

export default function AproposPage() {
  return (
    <>
      <PageHero
        eyebrow="Qui sommes-nous"
        title="Une association et une startup, unies pour valoriser le bambou."
        description="BambouCamer est une organisation camerounaise apolitique et non confessionnelle, née d'une conviction : le bambou est un levier pour transformer nos communautés."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-16 lg:px-16">
          <Reveal>
            <div className="relative grid aspect-[4/5] max-w-[340px] place-items-center overflow-hidden rounded-[18px] bg-gradient-to-br from-forest to-bamboo shadow-xl lg:max-w-none lg:aspect-[4/5]">
              <svg viewBox="0 0 200 200" fill="none" className="w-[70%]" aria-hidden>
                <rect x="70" y="24" width="24" height="150" rx="12" fill="#B4D64B" />
                <rect x="70" y="64" width="24" height="5" fill="#12301C" opacity=".4" />
                <rect x="70" y="104" width="24" height="5" fill="#12301C" opacity=".4" />
                <rect x="70" y="144" width="24" height="5" fill="#12301C" opacity=".4" />
                <rect x="102" y="44" width="20" height="130" rx="10" fill="#8FB63A" />
                <rect x="102" y="90" width="20" height="4" fill="#12301C" opacity=".35" />
                <rect x="102" y="134" width="20" height="4" fill="#12301C" opacity=".35" />
                <path d="M82 24c-6-12 0-24 12-28-2 14-6 22-12 28Z" fill="#EAF1E3" />
                <path d="M82 24c8-10 22-10 32-4-10 10-22 12-32 4Z" fill="#B4D64B" />
              </svg>
              <div className="absolute inset-x-[18px] bottom-[18px] rounded-[14px] border border-white/14 bg-forest/55 p-4 text-[#EAF1E3] backdrop-blur">
                Né au Cameroun, engagé pour <b className="font-display text-shoot">l&apos;Afrique</b> — une seule mission portée par deux forces.
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <div className="mb-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-sand px-3.5 py-2 text-[0.9rem] font-semibold text-forest">
                  Association à but non lucratif
                </span>
                <span className="rounded-full bg-forest px-3.5 py-2 text-[0.9rem] font-semibold text-white">
                  Startup d&apos;innovation sociale
                </span>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="text-muted">
                BambouCamer est une organisation camerounaise apolitique et non confessionnelle, née d&apos;une conviction : le bambou est bien plus qu&apos;une plante. C&apos;est un levier pour transformer nos communautés, restaurer nos écosystèmes et bâtir une Afrique durable.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="mt-4 text-muted">
                D&apos;un côté, nous œuvrons pour la préservation de l&apos;environnement et le développement des communautés locales. De l&apos;autre, nous incubons des projets qui transforment le bambou en produits durables, générateurs d&apos;emplois et de revenus.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <blockquote className="mt-6 border-l-[3px] border-shoot-deep pl-5 font-display text-[1.15rem] leading-snug text-forest">
                « Quand la nature est protégée et que l&apos;innovation sert les communautés, le développement durable devient une réalité tangible. »
              </blockquote>
            </Reveal>
            <Reveal delay={0.26} className="mt-7 flex flex-wrap gap-3.5">
              <Link
                href="/objectifs"
                className="inline-flex rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-forest-2"
              >
                Nos objectifs
              </Link>
              <Link
                href="/solutions"
                className="inline-flex rounded-[13px] border-[1.5px] border-sand-2 px-6 py-3.5 font-semibold text-forest transition hover:border-bamboo hover:bg-surface"
              >
                Nos solutions
              </Link>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
