"use client";

import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { partners } from "@/lib/data";
import { partnerLogos } from "@/lib/images";

type PartnerItem =
  | { type: "logo"; name: string; src: string }
  | { type: "text"; name: string };

const allPartners: PartnerItem[] = [
  ...partnerLogos.map((p) => ({ type: "logo" as const, name: p.name, src: p.src })),
  ...partners.slice(3).map((name) => ({ type: "text" as const, name })),
];

function PartnerCard({ item }: { item: PartnerItem }) {
  return (
    <div className="flex h-20 items-center justify-center rounded-[14px] border border-line bg-surface p-3 sm:h-24 sm:rounded-[16px] sm:p-4">
      {item.type === "logo" ? (
        <SiteImage
          src={item.src}
          alt={item.name}
          width={140}
          height={60}
          className="max-h-10 w-auto !object-contain sm:max-h-12"
        />
      ) : (
        <span className="inline-flex items-center gap-2 text-center font-display text-xs font-bold text-forest sm:text-sm">
          <span className="h-2 w-2 shrink-0 rounded-full bg-shoot-deep" />
          {item.name}
        </span>
      )}
    </div>
  );
}

export function Partners() {
  const track = [...allPartners, ...allPartners];

  return (
    <section className="overflow-hidden py-14 sm:py-20" aria-labelledby="part-h">
      <div className="container-site text-center">
        <Reveal>
          <Eyebrow className="justify-center">Ils nous font confiance</Eyebrow>
          <h2 id="part-h" className="mt-3.5 text-[clamp(1.5rem,3.5vw,2.3rem)]">
            Nos partenaires
          </h2>
        </Reveal>

        {/* Grille statique sur mobile */}
        <Reveal delay={0.08} className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 md:hidden">
          {allPartners.map((item) => (
            <PartnerCard key={item.name} item={item} />
          ))}
        </Reveal>
      </div>

      {/* Marquee fluide sur tablette+ */}
      <Reveal delay={0.1} className="relative mt-8 hidden md:block sm:mt-10">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent sm:w-24" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent sm:w-24" />
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex w-max gap-4 px-4 will-change-transform">
            {track.map((item, i) => (
              <div key={`${item.name}-${i}`} className="w-40 shrink-0 sm:w-44">
                <PartnerCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
