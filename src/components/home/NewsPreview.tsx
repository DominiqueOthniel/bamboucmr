import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import type { NewsItem } from "@/lib/content/types";

export function NewsPreview({ news }: { news: NewsItem[] }) {
  const preview = news.slice(0, 3);

  return (
    <section className="bg-sand py-14 sm:py-24">
      <div className="container-site">
        <Reveal className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
          <div className="max-w-[640px]">
            <Eyebrow>Actualités & terrain</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.75rem,4.2vw,2.9rem)]">
              Nos interventions récentes, là où les besoins sont réels
            </h2>
          </div>
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 font-semibold text-ink transition-colors hover:text-forest"
          >
            Toutes les actualités
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Stagger className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {preview.map((item) => (
            <StaggerItem key={item.id} variant="scale">
              <TiltCard className="h-full">
              <Link
                href={`/actualites/${item.id}`}
                className="group flex h-full flex-col overflow-hidden rounded-[18px] border border-line bg-surface shadow-sm sm:rounded-[20px]"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <SiteImage
                    src={item.image}
                    alt={item.title}
                    width={700}
                    height={440}
                    className="h-full w-full transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-forest/75 px-2.5 py-1 text-[0.72rem] font-semibold text-white backdrop-blur">
                    {item.cat}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-muted">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.date}
                  </span>
                  <h3 className="mt-2.5 text-[1rem] leading-snug sm:text-[1.05rem]">
                    {item.title}
                  </h3>
                  <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.88rem] font-semibold text-bamboo sm:text-[0.9rem]">
                    Lire l&apos;article
                    <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
              </TiltCard>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
