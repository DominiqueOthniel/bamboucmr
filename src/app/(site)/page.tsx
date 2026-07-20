import { AboutSection } from "@/components/home/AboutSection";
import { DualMission } from "@/components/home/DualMission";
import { Hero } from "@/components/home/Hero";
import { ImpactPreview } from "@/components/home/ImpactPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { ObjectivesPreview } from "@/components/home/ObjectivesPreview";
import { Partners } from "@/components/home/Partners";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { Stats } from "@/components/home/Stats";
import {
  getAboutQuestions,
  getImpactBars,
  getNews,
  getPartners,
  getPillars,
  getSolutions,
  getSiteSettings,
  getStats,
} from "@/lib/content/reader";
import { getLocale } from "@/i18n/server";
import { localizeItem, localizeList } from "@/i18n/localize";
import type { SiteSettings } from "@/lib/content/types";

export default async function HomePage() {
  const locale = await getLocale();
  const [
    stats,
    aboutQuestions,
    pillars,
    solutions,
    impactBars,
    news,
    partners,
    settings,
  ] = await Promise.all([
    getStats(),
    getAboutQuestions(),
    getPillars(),
    getSolutions(),
    getImpactBars(),
    getNews(),
    getPartners(),
    getSiteSettings(),
  ]);

  const hero = localizeItem(
    settings.hero as unknown as Record<string, unknown>,
    ["eyebrow", "title", "tagline", "description", "primaryCtaLabel", "secondaryCtaLabel"],
    locale
  ) as unknown as SiteSettings["hero"];

  return (
    <>
      <Hero hero={{ ...settings.hero, ...hero }} />
      <Stats
        stats={localizeList(
          stats as unknown as Record<string, unknown>[],
          ["label"],
          locale
        ) as typeof stats}
      />
      <AboutSection
        aboutQuestions={localizeList(
          aboutQuestions as unknown as Record<string, unknown>[],
          ["text"],
          locale
        ) as typeof aboutQuestions}
      />
      <ObjectivesPreview
        pillars={localizeList(
          pillars as unknown as Record<string, unknown>[],
          ["title", "description", "kpi", "body"],
          locale
        ) as typeof pillars}
      />
      <DualMission />
      <SolutionsPreview
        solutions={localizeList(
          solutions as unknown as Record<string, unknown>[],
          ["title", "description", "body"],
          locale
        ) as typeof solutions}
      />
      <ImpactPreview
        impactBars={localizeList(
          impactBars as unknown as Record<string, unknown>[],
          ["label"],
          locale
        ) as typeof impactBars}
      />
      <NewsPreview
        news={localizeList(
          news as unknown as Record<string, unknown>[],
          ["title", "excerpt", "body"],
          locale
        ) as typeof news}
      />
      <Partners partners={partners} />
    </>
  );
}
