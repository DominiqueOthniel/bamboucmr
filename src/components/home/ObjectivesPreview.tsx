import Link from "next/link";
import {
  Building2,
  Globe2,
  Lightbulb,
  Shield,
} from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { pillars } from "@/lib/data";

const icons = {
  shield: Shield,
  globe: Globe2,
  building: Building2,
  lightbulb: Lightbulb,
} as const;

export function ObjectivesPreview() {
  return (
    <section className="section-band-sand py-14 sm:py-20 lg:py-24">
      <div className="container-site">
        <Reveal className="mx-auto mb-10 max-w-[720px] text-center sm:mb-12">
          <Eyebrow className="justify-center">4 objectifs de durabilité</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,2.75rem)] leading-tight">
            Le bambou, une réponse aux défis sociaux, économiques et
            environnementaux
          </h2>
          <p className="mt-4 text-[1rem] text-muted sm:text-[1.05rem]">
            BambouCamer exploite cette ressource pour transformer l&apos;économie
            camerounaise et améliorer les conditions de vie à l&apos;échelle
            nationale.
          </p>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5">
          {pillars.map((pillar, i) => {
            const Icon = icons[pillar.icon];
            return (
              <StaggerItem key={pillar.title} variant="scale">
                <TiltCard className="h-full">
                <article className="group overflow-hidden rounded-[18px] border border-line bg-surface shadow-sm sm:rounded-[20px]">
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
                    <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-white/90 text-bamboo shadow sm:left-4 sm:top-4 sm:h-11 sm:w-11">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="absolute bottom-3 left-3 rounded-full bg-shoot px-2.5 py-0.5 text-[0.68rem] font-bold text-forest sm:bottom-4 sm:left-4 sm:px-3 sm:py-1 sm:text-[0.72rem]">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="text-[1.05rem] sm:text-[1.15rem]">{pillar.title}</h3>
                    <p className="mt-2 text-[0.9rem] text-muted sm:text-[0.94rem]">
                      {pillar.description}
                    </p>
                    <p className="mt-3 font-display text-[0.88rem] font-bold text-bamboo sm:text-[0.92rem]">
                      {pillar.kpi}
                    </p>
                  </div>
                </article>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-8 text-center sm:mt-10">
          <Link
            href="/objectifs"
            className="inline-flex rounded-[13px] bg-forest px-6 py-3.5 font-semibold text-white transition hover:bg-bamboo"
          >
            Voir tous les objectifs
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
