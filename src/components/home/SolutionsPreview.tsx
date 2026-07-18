import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Coins,
  Globe2,
  GraduationCap,
  Leaf,
  MapPin,
  Package,
  Sprout,
  Users,
} from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import type { SolutionItem } from "@/lib/content/types";

const icons: Record<string, typeof MapPin> = {
  "map-pin": MapPin,
  sprout: Sprout,
  coins: Coins,
  graduation: GraduationCap,
  package: Package,
  users: Users,
  leaf: Leaf,
  globe: Globe2,
  building: Building2,
};

export function SolutionsPreview({ solutions }: { solutions: SolutionItem[] }) {
  return (
    <section className="py-14 sm:py-24">
      <div className="container-site">
        <Reveal className="mb-10 max-w-[680px] sm:mb-12">
          <Eyebrow>Nos solutions</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,4.2vw,2.9rem)]">
            Des réponses concrètes pour un Cameroun et une Afrique durables
          </h2>
          <p className="mt-4 text-[1rem] text-muted sm:text-[1.05rem]">
            Restauration, formation, crédits carbone et produits durables : le bambou
            au service d&apos;un développement véritablement durable.
          </p>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {solutions.map((sol) => {
            const Icon = icons[sol.icon] ?? Leaf;
            return (
              <StaggerItem key={sol.id} variant="scale">
                <TiltCard className="h-full">
                  <Link
                    href={`/solutions/${sol.id}`}
                    className="surface-card group flex h-full flex-col"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SiteImage
                        src={sol.image}
                        alt={sol.title}
                        width={600}
                        height={450}
                        className="h-full w-full transition duration-700 group-hover:scale-[1.03]"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/75 via-forest/15 to-transparent" />
                      <span
                        className={`absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-[var(--radius-sm)] text-white sm:left-4 sm:top-4 ${sol.accent}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[1.08rem] text-forest sm:text-[1.12rem]">{sol.title}</h3>
                      <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-muted">
                        {sol.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[0.88rem] font-semibold text-bamboo">
                        En savoir plus
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </TiltCard>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-8 text-center sm:mt-10">
          <Link
            href="/solutions"
            className="btn-cta inline-flex rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white transition"
          >
            Toutes nos solutions
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
