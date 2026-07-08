import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Stagger, StaggerItem } from "@/components/motion/Reveal";
import type { NewsItem } from "@/lib/content/types";

export function NewsGrid({ news }: { news: NewsItem[] }) {
  return (
    <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {news.map((item) => (
        <StaggerItem key={item.id}>
          <Link
            href={`/actualites/${item.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface shadow-sm transition duration-300 hover:-translate-y-1.5 hover:shadow-xl"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <SiteImage
                src={item.image}
                alt={item.title}
                width={700}
                height={440}
                className="h-full w-full transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest/50 to-transparent opacity-0 transition group-hover:opacity-100" />
              <span className="absolute left-3 top-3 rounded-full bg-forest/80 px-2.5 py-1 text-[0.72rem] font-semibold text-white backdrop-blur">
                {item.cat}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-muted">
                <Calendar className="h-3.5 w-3.5" />
                {item.date}
              </span>
              <h3 className="mt-2.5 text-[1.08rem] leading-snug">{item.title}</h3>
              <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-[0.9rem] font-semibold text-bamboo">
                Lire l&apos;article
                <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </StaggerItem>
      ))}
    </Stagger>
  );
}
