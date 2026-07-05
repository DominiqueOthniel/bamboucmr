import type { Metadata } from "next";
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
import { PageHero } from "@/components/shared/PageHero";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { rseItems, solutions } from "@/lib/data";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Solutions BambouCamer : conservation, restauration, crédits carbone, formation, produits en bambou et expertise RSE.",
};

const icons = {
  "map-pin": MapPin,
  sprout: Sprout,
  coins: Coins,
  graduation: GraduationCap,
  package: Package,
  users: Users,
} as const;

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos solutions"
        title="Des réponses concrètes pour un Cameroun et une Afrique durables."
        description="Chaque action répond à un défi réel — de la restauration des terres aux crédits carbone certifiés."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16">
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol) => {
              const Icon = icons[sol.icon];
              return (
                <StaggerItem key={sol.title}>
                  <article className="group flex h-full flex-col rounded-[18px] border border-line bg-surface p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                    <span className="mb-4 grid h-12 w-12 place-items-center rounded-[13px] bg-sand text-bamboo transition group-hover:bg-bamboo group-hover:text-white">
                      <Icon className="h-6 w-6" />
                    </span>
                    <h3 className="text-[1.18rem]">{sol.title}</h3>
                    <p className="mt-2.5 flex-1 text-[0.94rem] text-muted">
                      {sol.description}
                    </p>
                    <Link
                      href="/contact"
                      className="mt-4 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-bamboo"
                    >
                      Nous contacter
                      <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                    </Link>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="bg-gradient-to-b from-paper to-sand py-16 sm:py-24">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16">
          <Reveal className="mb-10 max-w-[640px]">
            <span className="inline-flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-bamboo before:h-0.5 before:w-[22px] before:rounded-full before:bg-shoot-deep before:content-['']">
              Entreprises &amp; RSE
            </span>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)]">
              Collaborer avec nous sur vos projets écologiques.
            </h2>
            <p className="mt-4 text-[1.05rem] text-muted">
              Nous accompagnons chaque étape de votre démarche RSE avec des outils pratiques et des solutions sur mesure.
            </p>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rseItems.map((item) => (
              <StaggerItem key={item.n}>
                <div className="flex gap-4 rounded-xl border border-line bg-surface p-5 transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="shrink-0 font-display font-bold text-shoot-deep">
                    {item.n}
                  </span>
                  <div>
                    <h4 className="text-[1.02rem]">{item.title}</h4>
                    <p className="mt-1.5 text-[0.9rem] text-muted">
                      {item.description}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white transition hover:-translate-y-0.5 hover:bg-forest-2"
            >
              Devenir partenaire
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
