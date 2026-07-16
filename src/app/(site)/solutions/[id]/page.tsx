import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailView } from "@/components/shared/ContentDetailView";
import { getSolutionById } from "@/lib/content/reader";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const solution = await getSolutionById(id);
  if (!solution) return { title: "Solution introuvable" };

  return {
    title: solution.title,
    description: solution.description,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { id } = await params;
  const solution = await getSolutionById(id);
  if (!solution) notFound();

  return (
    <ContentDetailView
      backHref="/solutions"
      backLabel="Retour aux solutions"
      eyebrow="Solution BambouCamer"
      title={solution.title}
      image={solution.image}
      description={solution.description}
      body={solution.body}
      ctaHref="/contact"
      ctaLabel="En parler avec nous"
    />
  );
}
