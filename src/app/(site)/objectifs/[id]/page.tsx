import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentDetailView } from "@/components/shared/ContentDetailView";
import { getPillarById } from "@/lib/content/reader";
import { getLocale, getMessages } from "@/i18n/server";
import { localizeItem } from "@/i18n/localize";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  const pillar = await getPillarById(id);
  if (!pillar) return { title: "Objectif" };

  const localized = localizeItem(
    pillar as unknown as Record<string, unknown>,
    ["title", "description"],
    locale
  ) as typeof pillar;

  return {
    title: localized.title,
    description: localized.description,
  };
}

export default async function ObjectifDetailPage({ params }: Props) {
  const { id } = await params;
  const [pillar, messages, locale] = await Promise.all([
    getPillarById(id),
    getMessages(),
    getLocale(),
  ]);
  if (!pillar) notFound();

  const localized = localizeItem(
    pillar as unknown as Record<string, unknown>,
    ["title", "description", "body", "kpi"],
    locale
  ) as typeof pillar;

  return (
    <ContentDetailView
      backHref="/objectifs"
      backLabel={messages.detail.backGoals}
      eyebrow={messages.detail.goalEyebrow}
      title={localized.title}
      image={localized.image}
      description={localized.description}
      body={localized.body}
      highlight={localized.kpi}
      ctaHref="/solutions"
      ctaLabel={messages.common.seeSolutions}
    />
  );
}
