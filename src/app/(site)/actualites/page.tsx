import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { NewsGrid } from "@/components/shared/NewsGrid";
import { getNews } from "@/lib/content/reader";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Actualités et interventions de BambouCamer au Cameroun et en Afrique centrale.",
};

export default async function ActualitesPage() {
  const news = await getNews();

  return (
    <>
      <PageHero
        eyebrow="Actualités & terrain"
        title="Nos interventions récentes, là où les besoins sont réels."
        description="BambouCamer agit concrètement au Cameroun et en Afrique centrale. Voici un aperçu de nos actions les plus récentes."
        image={images.bambooField}
      />

      <section className="py-16 sm:py-24">
        <div className="container-site">
          <NewsGrid news={news} />
        </div>
      </section>
    </>
  );
}
