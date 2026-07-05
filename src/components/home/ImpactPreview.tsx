import Link from "next/link";
import { ImpactBars } from "@/components/shared/ImpactBars";
import { Reveal } from "@/components/motion/Reveal";
import { images } from "@/lib/images";

export function ImpactPreview() {
  return (
    <section className="relative overflow-hidden bg-forest py-16 text-[#EFF4EA] sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url(${images.mission})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(18,48,28,.95) 0%, rgba(47,107,60,.88) 100%)",
        }}
      />

      <div className="relative mx-auto grid max-w-[1160px] items-center gap-10 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:px-16">
        <Reveal>
          <span className="eyebrow text-shoot before:bg-shoot">
            Pourcentage de tâches accomplies
          </span>
          <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)] text-white">
            Des engagements transformés en résultats mesurables
          </h2>
          <p className="mt-4 text-[#B9C7B4]">
            Chaque étape franchie renforce l&apos;économie du bambou et la protection
            de nos écosystèmes.
          </p>
          <Link
            href="/impact"
            className="mt-7 inline-flex rounded-[13px] border border-white/25 px-6 py-3.5 font-semibold text-white transition hover:border-shoot hover:bg-white/8"
          >
            Voir notre impact
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <ImpactBars />
        </Reveal>
      </div>
    </section>
  );
}
