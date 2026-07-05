import { SiteImage } from "@/components/shared/SiteImage";
import { Reveal } from "@/components/motion/Reveal";
import { partners } from "@/lib/data";
import { partnerLogos } from "@/lib/images";

export function Partners() {
  return (
    <section className="py-16 sm:py-20" aria-labelledby="part-h">
      <div className="mx-auto max-w-[1160px] px-5 text-center sm:px-8 lg:px-16">
        <Reveal>
          <span className="eyebrow justify-center">Ils nous font confiance</span>
          <h2 id="part-h" className="mt-3.5 text-[clamp(1.6rem,3.5vw,2.3rem)]">
            Nos partenaires
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {partnerLogos.map((p) => (
            <div
              key={p.name}
              className="flex h-24 items-center justify-center rounded-[16px] border border-line bg-surface p-4 transition hover:-translate-y-1 hover:border-bamboo hover:shadow-md"
            >
              <SiteImage
                src={p.src}
                alt={p.name}
                width={140}
                height={60}
                className="max-h-12 w-auto !object-contain"
              />
            </div>
          ))}
          {partners.slice(3).map((name) => (
            <div
              key={name}
              className="flex h-24 items-center justify-center rounded-[16px] border border-line bg-surface px-4 font-display text-sm font-bold text-forest transition hover:-translate-y-1 hover:border-bamboo hover:shadow-md"
            >
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-shoot-deep" />
                {name}
              </span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
