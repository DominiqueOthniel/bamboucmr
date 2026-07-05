import type { Metadata } from "next";
import Link from "next/link";
import { SiteImage } from "@/components/shared/SiteImage";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { aboutQuestions } from "@/lib/data";
import { images } from "@/lib/images";

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
        image={images.hero}
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto grid max-w-[1160px] items-start gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-16">
          <Reveal>
            <div className="space-y-3">
              {aboutQuestions.map((q, i) => (
                <div
                  key={q}
                  className={`rounded-xl border px-4 py-3 text-[0.92rem] ${
                    i === 0
                      ? "border-bamboo/30 bg-bamboo/8 font-medium text-forest"
                      : "border-line bg-surface text-muted"
                  }`}
                >
                  {q}
                </div>
              ))}
            </div>
          </Reveal>

          <div>
            <Reveal delay={0.08}>
              <p className="text-muted">
                Portée par l&apos;énergie de l&apos;entrepreneuriat social, nous agissons
                à la croisée de deux missions complémentaires : protéger la nature et
                créer de la valeur.
              </p>
              <p className="mt-4 text-muted">
                D&apos;un côté, nous œuvrons pour la préservation de l&apos;environnement et
                le développement des communautés locales. De l&apos;autre, nous incubons
                des projets qui transforment le bambou en produits durables, générateurs
                d&apos;emplois et de revenus.
              </p>
              <blockquote className="mt-6 border-l-4 border-shoot bg-sand/70 px-5 py-4 font-display text-[1.15rem] leading-snug text-forest">
                « Quand la nature est protégée et que l&apos;innovation sert les
                communautés, le développement durable devient une réalité tangible. »
              </blockquote>
            </Reveal>
            <Reveal delay={0.14} className="mt-7 flex flex-wrap gap-3.5">
              <Link
                href="/objectifs"
                className="inline-flex rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white transition hover:bg-forest-2"
              >
                Nos objectifs
              </Link>
              <Link
                href="/solutions"
                className="inline-flex rounded-[13px] border border-sand-2 px-6 py-3.5 font-semibold text-forest"
              >
                Nos solutions
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="mx-auto grid max-w-[1160px] gap-5 px-5 sm:grid-cols-2 sm:px-8 lg:px-16">
          <Reveal>
            <div className="overflow-hidden rounded-[20px] shadow-lg">
              <SiteImage
                src={images.association}
                alt="BambouCamer association"
                width={640}
                height={375}
                className="aspect-[4/3] w-full"
              />
              <div className="bg-forest p-5 text-white">
                <h3 className="text-lg">L&apos;association</h3>
                <p className="mt-1 text-sm text-white/80">
                  Protection de l&apos;environnement et développement des communautés.
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[20px] shadow-lg">
              <SiteImage
                src={images.startup}
                alt="BambouCamer startup"
                width={640}
                height={375}
                className="aspect-[4/3] w-full"
              />
              <div className="bg-bamboo p-5 text-white">
                <h3 className="text-lg">La startup</h3>
                <p className="mt-1 text-sm text-white/80">
                  Innovation sociale et produits durables à base de bambou.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
