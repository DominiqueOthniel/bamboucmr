import type { Metadata } from "next";
import { ArrowRight, Calendar } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import { news } from "@/lib/data";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Actualités et interventions de BambouCamer au Cameroun et en Afrique centrale.",
};

export default function ActualitesPage() {
  return (
    <>
      <PageHero
        eyebrow="Actualités & terrain"
        title="Nos interventions récentes, là où les besoins sont réels."
        description="BambouCamer agit concrètement au Cameroun et en Afrique centrale. Voici un aperçu de nos actions les plus récentes."
      />

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16">
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {news.map((item) => (
              <StaggerItem key={item.title}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-surface transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
                  <div
                    className={`relative grid aspect-[16/10] place-items-center bg-gradient-to-br ${item.gradient}`}
                  >
                    <span className="absolute left-3 top-3 rounded-full bg-forest/60 px-2.5 py-1 text-[0.72rem] font-semibold tracking-wide text-white backdrop-blur">
                      {item.cat}
                    </span>
                    <div className="h-16 w-16 rounded-full bg-white/10" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-muted">
                      <Calendar className="h-3.5 w-3.5" />
                      {item.date}
                    </span>
                    <h3 className="mt-2.5 text-[1.08rem] leading-snug">
                      {item.title}
                    </h3>
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.9rem] font-semibold text-bamboo">
                      Lire l&apos;article
                      <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>
    </>
  );
}
