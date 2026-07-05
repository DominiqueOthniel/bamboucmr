import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ImpactBars } from "@/components/shared/ImpactBars";
import { Reveal } from "@/components/motion/Reveal";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Suivez l'impact mesurable de BambouCamer : formation, restauration des sols, R&D produits bambou et partenariats stratégiques.",
};

export default function ImpactPage() {
  return (
    <>
      <PageHero
        eyebrow="Pourcentage de tâches accomplies"
        title="Nous transformons nos engagements en résultats mesurables."
        description="Suivez l'avancement de nos chantiers : chaque étape franchie renforce l'économie du bambou et la protection de nos écosystèmes."
        image={images.mission}
      />

      <section className="bg-forest py-16 text-[#EFF4EA] sm:py-24">
        <div className="mx-auto grid max-w-[1160px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-[.95fr_1.05fr] lg:gap-16 lg:px-16">
          <Reveal>
            <span className="eyebrow text-shoot before:bg-shoot">
              Notre impact
            </span>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)] text-white">
              Des avancées concrètes sur le terrain
            </h2>
            <p className="mt-4 text-[#B9C7B4]">
              Chaque indicateur reflète un engagement tenu auprès des communautés et
              des écosystèmes que nous accompagnons.
            </p>
            <Link
              href="/actualites"
              className="mt-7 inline-flex rounded-[13px] border border-white/28 px-6 py-3.5 font-semibold text-white transition hover:border-shoot hover:bg-white/8"
            >
              Voir les actualités
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ImpactBars />
          </Reveal>
        </div>
      </section>
    </>
  );
}
