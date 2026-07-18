import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ImpactBars } from "@/components/shared/ImpactBars";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { getImpactBars } from "@/lib/content/reader";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Suivez l'impact mesurable de BambouCamer : formation, restauration des sols, R&D produits bambou et partenariats stratégiques.",
};

export default async function ImpactPage() {
  const impactBars = await getImpactBars();

  return (
    <>
      <PageHero
        eyebrow="Pourcentage de tâches accomplies"
        title="Nous transformons nos engagements en résultats mesurables."
        description="Suivez l'avancement de nos chantiers : chaque étape franchie renforce l'économie du bambou et la protection de nos écosystèmes."
        image={images.mission}
      />

      <section className="on-dark bg-forest py-16 text-[#EFF4EA] sm:py-24">
        <div className="container-site grid items-center gap-8 sm:gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <Eyebrow tone="on-dark">Notre impact</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)] text-white">
              Des avancées concrètes sur le terrain
            </h2>
            <p className="mt-4 text-[#B9C7B4]">
              Chaque indicateur reflète un engagement tenu auprès des communautés et
              des écosystèmes que nous accompagnons.
            </p>
            <Link
              href="/actualites"
              className="btn-cta btn-secondary mt-7"
            >
              Voir les actualités
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ImpactBars bars={impactBars} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
