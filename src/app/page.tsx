import { AboutSection } from "@/components/home/AboutSection";
import { DualMission } from "@/components/home/DualMission";
import { Hero } from "@/components/home/Hero";
import { ImpactPreview } from "@/components/home/ImpactPreview";
import { NewsPreview } from "@/components/home/NewsPreview";
import { ObjectivesPreview } from "@/components/home/ObjectivesPreview";
import { Partners } from "@/components/home/Partners";
import { SolutionsPreview } from "@/components/home/SolutionsPreview";
import { Stats } from "@/components/home/Stats";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <AboutSection />
      <ObjectivesPreview />
      <DualMission />
      <SolutionsPreview />
      <ImpactPreview />
      <NewsPreview />
      <Partners />
    </>
  );
}
