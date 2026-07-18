import Link from "next/link";
import {
  Building2,
  Globe2,
  Leaf,
  Lightbulb,
  Shield,
  Sprout,
  Users,
} from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import type { PillarItem } from "@/lib/content/types";

const icons: Record<string, typeof Shield> = {
  shield: Shield,
  globe: Globe2,
  building: Building2,
  lightbulb: Lightbulb,
  leaf: Leaf,
  users: Users,
  sprout: Sprout,
};

export function ObjectivesPreview({ pillars }: { pillars: PillarItem[] }) {
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
            const Icon = icons[pillar.icon] ?? Leaf;
            return (
              <StaggerItem key={pillar.id} variant="scale">
                <TiltCard className="h-full">
                  <Link
                    href={`/objectifs/${pillar.id}`}
                    className="surface-card group block h-full"
                  >
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <SiteImage
                        src={pillar.image}
                        alt={pillar.title}
                        width={800}
                        height={450}
                        className="h-full w-full transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${pillar.tint} mix-blend-multiply opacity-40`}
                      />
                      <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] bg-white/95 text-bamboo shadow-sm sm:left-4 sm:top-4">
                        <Icon className="h-5 w-5" />
                      </span>
                      <span className="absolute bottom-3 left-3 text-[0.7rem] font-semibold tracking-[0.14em] text-white/90 sm:bottom-4 sm:left-4">
                        0{i + 1}
                      </span>
                    </div>
                    <div className="p-5 sm:p-6">
                      <h3 className="text-[1.08rem] text-forest sm:text-[1.18rem]">{pillar.title}</h3>
                      <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                        {pillar.description}
                      </p>
                      <p className="mt-4 text-[0.88rem] font-semibold text-bamboo">
                        {pillar.kpi}
                      </p>
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-8 text-center sm:mt-10">
          <Link
            href="/objectifs"
            className="btn-cta inline-flex rounded-[13px] bg-forest px-6 py-3.5 font-semibold text-white transition"
          >
            Voir tous les objectifs
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
