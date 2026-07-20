import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailView } from "@/components/shared/ContentDetailView";
import { getSolutionById } from "@/lib/content/reader";
import { getLocale, getMessages } from "@/i18n/server";
import { localizeItem } from "@/i18n/localize";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  const solution = await getSolutionById(id);
  if (!solution) return { title: "Solution" };

  const localized = localizeItem(
    solution as unknown as Record<string, unknown>,
    ["title", "description"],
    locale
  ) as typeof solution;

  return {
    title: localized.title,
    description: localized.description,
  };
}

export default async function SolutionDetailPage({ params }: Props) {
  const { id } = await params;
  const [solution, messages, locale] = await Promise.all([
    getSolutionById(id),
    getMessages(),
    getLocale(),
  ]);
  if (!solution) notFound();

  const localized = localizeItem(
    solution as unknown as Record<string, unknown>,
    ["title", "description", "body"],
    locale
  ) as typeof solution;

  return (
    <ContentDetailView
      backHref="/solutions"
      backLabel={messages.detail.backSolutions}
      eyebrow={messages.detail.solutionEyebrow}
      title={localized.title}
      image={localized.image}
      description={localized.description}
      body={localized.body}
      ctaHref="/contact"
      ctaLabel={messages.detail.talkCta}
    />
  );
}
