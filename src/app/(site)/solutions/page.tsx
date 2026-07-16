import type { Metadata } from "next";
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
import { PageHero } from "@/components/shared/PageHero";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { getRseItems, getSolutions } from "@/lib/content/reader";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Solutions BambouCamer : conservation, restauration, crédits carbone, formation, produits en bambou et expertise RSE.",
};

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

export default async function SolutionsPage() {
  const [solutions, rseItems] = await Promise.all([getSolutions(), getRseItems()]);

  return (
    <>
      <PageHero
        eyebrow="Nos solutions"
        title="Des réponses concrètes pour un Cameroun et une Afrique durables."
        description="Chaque action répond à un défi réel, de la restauration des terres aux crédits carbone certifiés."
        image={images.restoration}
      />

      <section className="py-16 sm:py-24">
        <div className="container-site">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((sol) => {
              const Icon = icons[sol.icon] ?? Leaf;
              return (
                <StaggerItem key={sol.id}>
                  <Link
                    href={`/solutions/${sol.id}`}
                    className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface shadow-sm transition hover:-translate-y-1.5 hover:shadow-xl"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <SiteImage
                        src={sol.image}
                        alt={sol.title}
                        width={600}
                        height={450}
                        className="h-full w-full transition duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-forest/75 to-transparent" />
                      <span
                        className={`absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-xl text-white ${sol.accent}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-[1.18rem]">{sol.title}</h3>
                      <p className="mt-2.5 flex-1 text-[0.94rem] text-muted">
                        {sol.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-[0.92rem] font-semibold text-bamboo">
                        En savoir plus
                        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </section>

      <section className="relative overflow-hidden bg-gradient-to-br from-forest via-bamboo to-shoot-deep py-16 text-white sm:py-24">
        <div className="pointer-events-none absolute bottom-0 right-0 p-8 opacity-20">
          <SiteImage
            src={images.rse}
            alt=""
            width={280}
            height={120}
            className="!object-contain"
            aria-hidden
          />
        </div>
        <div className="relative container-site">
          <Reveal className="mb-10 max-w-[640px]">
            <Eyebrow tone="on-dark">Entreprises &amp; RSE</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)]">
              Collaborer avec nous sur vos projets écologiques
            </h2>
            <p className="mt-4 text-white/80">
              Nous accompagnons chaque étape de votre démarche RSE avec des outils
              pratiques et des solutions sur mesure.
            </p>
          </Reveal>

          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {rseItems.map((item) => (
              <StaggerItem key={item.id}>
                <div className="rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur transition hover:bg-white/15">
                  <span className="font-display text-lg font-bold text-shoot">
                    {item.n}
                  </span>
                  <h4 className="mt-2 text-[1.02rem]">{item.title}</h4>
                  <p className="mt-2 text-[0.9rem] text-white/80">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10 flex justify-center">
            <Link
              href="/contact"
              className="inline-flex rounded-[13px] bg-white px-6 py-3.5 font-semibold text-forest transition hover:bg-shoot"
            >
              Devenir partenaire
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
