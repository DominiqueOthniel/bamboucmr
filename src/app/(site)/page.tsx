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
  getStats,
} from "@/lib/content/reader";

export default async function HomePage() {
  const [stats, aboutQuestions, pillars, solutions, impactBars, news, partners] =
    await Promise.all([
      getStats(),
      getAboutQuestions(),
      getPillars(),
      getSolutions(),
      getImpactBars(),
      getNews(),
      getPartners(),
    ]);

  return (
    <>
      <Hero />
      <Stats stats={stats} />
      <AboutSection aboutQuestions={aboutQuestions} />
      <ObjectivesPreview pillars={pillars} />
      <DualMission />
      <SolutionsPreview solutions={solutions} />
      <ImpactPreview impactBars={impactBars} />
      <NewsPreview news={news} />
      <Partners partners={partners} />
    </>
  );
}
