import Link from "next/link";
import {
  ArrowRight,
  Coins,
  GraduationCap,
  MapPin,
  Package,
  Sprout,
  Users,
} from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { solutions } from "@/lib/data";

const icons = {
  "map-pin": MapPin,
  sprout: Sprout,
  coins: Coins,
  graduation: GraduationCap,
  package: Package,
  users: Users,
} as const;

export function SolutionsPreview() {
  return (
    <section className="py-16 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16">
        <Reveal className="mb-12 max-w-[680px]">
          <span className="eyebrow">Nos solutions</span>
          <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)]">
            Des réponses concrètes pour un Cameroun et une Afrique durables
          </h2>
          <p className="mt-4 text-[1.05rem] text-muted">
            Restauration, formation, crédits carbone et produits durables — le bambou
            au service d&apos;un développement véritablement durable.
          </p>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {solutions.map((sol) => {
            const Icon = icons[sol.icon];
            return (
              <StaggerItem key={sol.title}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <SiteImage
                      src={sol.image}
                      alt={sol.title}
                      width={600}
                      height={450}
                      className="h-full w-full transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" />
                    <span
                      className={`absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl text-white ${sol.accent}`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-[1.1rem]">{sol.title}</h3>
                    <p className="mt-2 flex-1 text-[0.92rem] text-muted">
                      {sol.description}
                    </p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-2 text-[0.9rem] font-semibold text-bamboo"
                    >
                      En savoir plus
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>

        <Reveal className="mt-10 text-center">
          <Link
            href="/solutions"
            className="inline-flex rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white transition hover:bg-forest-2"
          >
            Toutes nos solutions
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
