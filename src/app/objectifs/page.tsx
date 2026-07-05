import type { Metadata } from "next";
import Link from "next/link";
import {
  Building2,
  Globe2,
  Lightbulb,
  Shield,
} from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { pillars } from "@/lib/data";
import { images } from "@/lib/images";

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
        image={images.mission}
      />

      <section className="bg-sand py-16 sm:py-24">
        <div className="container-site">
          <Stagger className="grid gap-5 sm:grid-cols-2">
            {pillars.map((pillar, i) => {
              const Icon = icons[pillar.icon];
              return (
                <StaggerItem key={pillar.title}>
                  <article className="group overflow-hidden rounded-[20px] border border-line bg-surface shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <SiteImage
                        src={pillar.image}
                        alt={pillar.title}
                        width={800}
                        height={450}
                        className="h-full w-full transition duration-500 group-hover:scale-105"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${pillar.tint} mix-blend-multiply opacity-50`}
                      />
                      <span className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-xl bg-white/90 text-bamboo shadow">
                        <Icon className="h-6 w-6" />
                      </span>
                      <span className="absolute bottom-4 left-4 rounded-full bg-shoot px-3 py-1 text-[0.72rem] font-bold text-forest">
                        Objectif 0{i + 1}
                      </span>
                    </div>
                    <div className="p-6">
                      <h3 className="text-[1.15rem]">{pillar.title}</h3>
                      <p className="mt-2.5 text-[0.94rem] text-muted">
                        {pillar.description}
                      </p>
                      <p className="mt-4 font-display text-[0.92rem] font-bold text-bamboo">
                        {pillar.kpi}
                      </p>
                    </div>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>

          <Reveal className="mt-10 flex flex-wrap justify-center gap-3.5">
            <Link
              href="/solutions"
              className="inline-flex rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white transition hover:bg-forest-2"
            >
              Découvrir nos solutions
            </Link>
            <Link
              href="/impact"
              className="inline-flex rounded-[13px] border border-bamboo/40 bg-surface px-6 py-3.5 font-semibold text-bamboo"
            >
              Voir notre impact
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
