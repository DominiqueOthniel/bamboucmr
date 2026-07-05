import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { news } from "@/lib/data";

export function NewsPreview() {
  const preview = news.slice(0, 3);

  return (
    <section className="bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16">
        <Reveal className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-[640px]">
            <span className="eyebrow">Actualités & terrain</span>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)]">
              Nos interventions récentes, là où les besoins sont réels
            </h2>
          </div>
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 font-semibold text-bamboo hover:text-forest"
          >
            Toutes les actualités
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Reveal>

        <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {preview.map((item) => (
            <StaggerItem key={item.title}>
              <article className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl">
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
                  <h3 className="mt-2.5 text-[1.05rem] leading-snug">{item.title}</h3>
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
  );
}
