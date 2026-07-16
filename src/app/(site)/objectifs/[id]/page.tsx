import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailView } from "@/components/shared/ContentDetailView";
import { getPillarById } from "@/lib/content/reader";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const pillar = await getPillarById(id);
  if (!pillar) return { title: "Objectif introuvable" };

  return {
    title: pillar.title,
    description: pillar.description,
  };
}

export default async function ObjectifDetailPage({ params }: Props) {
  const { id } = await params;
  const pillar = await getPillarById(id);
  if (!pillar) notFound();

  return (
    <ContentDetailView
      backHref="/objectifs"
      backLabel="Retour aux objectifs"
      eyebrow="Objectif de durabilité"
      title={pillar.title}
      image={pillar.image}
      description={pillar.description}
      body={pillar.body}
      highlight={pillar.kpi}
      ctaHref="/solutions"
      ctaLabel="Voir nos solutions"
    />
  );
}
