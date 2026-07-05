import { Reveal } from "@/components/motion/Reveal";
import { partners } from "@/lib/data";

export function Partners() {
  return (
    <section className="bg-sand py-16 sm:py-20" aria-labelledby="part-h">
      <div className="mx-auto max-w-[1160px] px-5 text-center sm:px-8 lg:px-16">
        <Reveal>
          <span className="inline-flex items-center justify-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-bamboo before:h-0.5 before:w-[22px] before:rounded-full before:bg-shoot-deep before:content-['']">
            Ils nous font confiance
          </span>
          <h2
            id="part-h"
            className="mt-3.5 text-[clamp(1.6rem,3.5vw,2.3rem)]"
          >
            Nos partenaires
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-8 flex flex-wrap items-center justify-center gap-3.5">
          {partners.map((name) => (
            <span
              key={name}
              className="inline-flex items-center gap-2.5 rounded-[14px] border border-line bg-surface px-5 py-3.5 font-display text-base font-bold text-forest transition hover:-translate-y-0.5 hover:border-bamboo hover:shadow-md"
            >
              <span className="h-2.5 w-2.5 rounded-full bg-shoot-deep" />
              {name}
            </span>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
