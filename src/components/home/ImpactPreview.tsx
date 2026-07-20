"use client";

import Link from "next/link";
import { ImpactBars } from "@/components/shared/ImpactBars";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { useI18n } from "@/i18n/LocaleProvider";
import type { ImpactBarItem } from "@/lib/content/types";
import { images } from "@/lib/images";

export function ImpactPreview({ impactBars }: { impactBars: ImpactBarItem[] }) {
  const { t } = useI18n();

  return (
    <section className="on-dark relative overflow-hidden bg-forest py-14 text-[#EFF4EA] sm:py-24">
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

      <div className="container-site relative grid items-center gap-8 sm:gap-10 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <Eyebrow tone="on-dark">{t("home.impactEyebrow")}</Eyebrow>
          <h2 className="mt-4 text-[clamp(1.75rem,4.2vw,2.9rem)] text-white">
            {t("home.impactTitle")}
          </h2>
          <p className="mt-4 text-[#B9C7B4]">{t("home.impactText")}</p>
          <Link
            href="/impact"
            className="btn-cta btn-secondary mt-6 w-full sm:mt-7 sm:w-auto"
          >
            {t("home.impactCta")}
          </Link>
        </Reveal>
        <Reveal delay={0.1}>
          <ImpactBars bars={impactBars} />
        </Reveal>
      </div>
    </section>
  );
}
