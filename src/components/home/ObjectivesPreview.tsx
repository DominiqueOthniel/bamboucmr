import Link from "next/link";
import {
  Building2,
  Globe2,
  Lightbulb,
  Shield,
} from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { pillars } from "@/lib/data";

const icons = {
  shield: Shield,
  globe: Globe2,
  building: Building2,
  lightbulb: Lightbulb,
} as const;

export function ObjectivesPreview() {
  return (
    <section className="bg-gradient-to-b from-sand via-paper to-paper py-16 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16">
        <Reveal className="mx-auto mb-12 max-w-[720px] text-center">
          <span className="eyebrow justify-center">4 objectifs de durabilité</span>
          <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)]">
            Le bambou, une réponse aux défis sociaux, économiques et environnementaux
          </h2>
          <p className="mt-4 text-[1.05rem] text-muted">
            BambouCamer exploite cette ressource méconnue pour transformer
            l&apos;économie camerounaise, protéger l&apos;environnement et améliorer
            les conditions de vie à l&apos;échelle nationale.
          </p>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2">
          {pillars.map((pillar, i) => {
            const Icon = icons[pillar.icon];
            return (
              <StaggerItem key={pillar.title}>
                <article className="group overflow-hidden rounded-[20px] border border-line bg-surface shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <SiteImage
                      src={pillar.image}
                      alt={pillar.title}
                      width={800}
                      height={450}
                      className="h-full w-full transition duration-500 group-hover:scale-105"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${pillar.tint} mix-blend-multiply opacity-55`}
                    />
                    <div className="absolute left-4 top-4 grid h-11 w-11 place-items-center rounded-xl bg-white/90 text-bamboo shadow">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-1 text-[0.72rem] font-bold uppercase tracking-wide text-forest">
                      0{i + 1}
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

        <Reveal className="mt-10 text-center">
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
