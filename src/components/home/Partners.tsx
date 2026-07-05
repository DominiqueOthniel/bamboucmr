import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { partners } from "@/lib/data";
import { partnerLogos } from "@/lib/images";

export function Partners() {
  return (
    <section className="py-14 sm:py-20" aria-labelledby="part-h">
      <div className="container-site text-center">
        <Reveal>
          <Eyebrow className="justify-center">Ils nous font confiance</Eyebrow>
          <h2 id="part-h" className="mt-3.5 text-[clamp(1.5rem,3.5vw,2.3rem)]">
            Nos partenaires
          </h2>
        </Reveal>

        <Reveal
          delay={0.1}
          className="mt-8 grid grid-cols-2 gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4 lg:grid-cols-6"
        >
          {partnerLogos.map((p) => (
            <div
              key={p.name}
              className="flex h-20 items-center justify-center rounded-[14px] border border-line bg-surface p-3 transition hover:-translate-y-1 hover:border-bamboo hover:shadow-md sm:h-24 sm:rounded-[16px] sm:p-4"
            >
              <SiteImage
                src={p.src}
                alt={p.name}
                width={140}
                height={60}
                className="max-h-10 w-auto !object-contain sm:max-h-12"
              />
            </div>
          ))}
          {partners.slice(3).map((name) => (
            <div
              key={name}
              className="flex h-20 items-center justify-center rounded-[14px] border border-line bg-surface px-3 font-display text-xs font-bold text-forest transition hover:-translate-y-1 hover:border-bamboo hover:shadow-md sm:h-24 sm:rounded-[16px] sm:px-4 sm:text-sm"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 shrink-0 rounded-full bg-shoot-deep" />
                {name}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
