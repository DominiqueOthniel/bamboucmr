import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Globe2,
  Lightbulb,
  Shield,
} from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { pillars } from "@/lib/data";

export const metadata: Metadata = {
  title: "Objectifs",
  description:
    "Les 4 objectifs de durabilité de BambouCamer : environnement, biodiversité, développement économique et innovation verte.",
};

const icons = {
  shield: Shield,
  globe: Globe2,
  building: Building2,
  lightbulb: Lightbulb,
} as const;

export default function ObjectifsPage() {
  return (
    <>
      <PageHero
        eyebrow="4 objectifs de durabilité"
        title="Le bambou, une réponse aux défis sociaux, économiques et environnementaux."
        description="Une ressource méconnue mise au service d'une transformation concrète, à l'échelle du Cameroun et de l'Afrique."
      />

      <section className="bg-sand py-16 sm:py-24">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => {
              const Icon = icons[pillar.icon];
              return (
                <StaggerItem key={pillar.title}>
                  <article className="group relative h-full overflow-hidden rounded-[18px] border border-line bg-surface p-6 transition duration-300 hover:-translate-y-1.5 hover:border-transparent hover:shadow-xl">
                    <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-shoot transition duration-300 group-hover:scale-y-100" />
                    <span className="mb-4 grid h-[52px] w-[52px] place-items-center rounded-[14px] bg-forest text-shoot">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-[1.15rem]">{pillar.title}</h3>
                    <p className="mt-2.5 text-[0.94rem] text-muted">
                      {pillar.description}
                    </p>
                    <p className="mt-4 font-display text-[0.92rem] font-bold text-bamboo">
                      {pillar.kpi}
                    </p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal className="mt-10 flex flex-wrap justify-center gap-3.5">
            <Link
              href="/solutions"
              className="inline-flex rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-forest-2"
            >
              Découvrir nos solutions
            </Link>
            <Link
              href="/impact"
              className="inline-flex rounded-[13px] border-[1.5px] border-sand-2 bg-surface px-6 py-3.5 font-semibold text-forest transition hover:border-bamboo"
            >
              Voir notre impact
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
