import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { ImpactBars } from "@/components/shared/ImpactBars";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal } from "@/components/motion/Reveal";
import { getImpactBars } from "@/lib/content/reader";
import { getLocale, getMessages } from "@/i18n/server";
import { localizeList } from "@/i18n/localize";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Impact",
  description:
    "Suivez l'impact mesurable de BambouCamer : formation, restauration des sols, R&D produits bambou et partenariats stratégiques.",
};

export default async function ImpactPage() {
  const [impactBarsRaw, messages, locale] = await Promise.all([
    getImpactBars(),
    getMessages(),
    getLocale(),
  ]);
  const impactBars = localizeList(
    impactBarsRaw as unknown as Record<string, unknown>[],
    ["label"],
    locale
  ) as typeof impactBarsRaw;

  return (
    <>
      <PageHero
        eyebrow={messages.impact.pageEyebrow}
        title={messages.impact.pageTitle}
        description={messages.impact.pageDescription}
        image={images.mission}
      />

      <section className="on-dark bg-forest py-16 text-[#EFF4EA] sm:py-24">
        <div className="container-site grid items-center gap-8 sm:gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <Reveal>
            <Eyebrow tone="on-dark">{messages.impact.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.9rem,4.2vw,2.9rem)] text-white">
              {messages.impact.title}
            </h2>
            <p className="mt-4 text-[#B9C7B4]">{messages.impact.description}</p>
            <Link href="/actualites" className="btn-cta btn-secondary mt-7">
              {messages.impact.newsCta}
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <ImpactBars bars={impactBars} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
