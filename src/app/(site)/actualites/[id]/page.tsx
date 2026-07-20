import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticleView } from "@/components/shared/NewsArticleView";
import { getNewsById } from "@/lib/content/reader";
import { getLocale } from "@/i18n/server";
import { localizeItem } from "@/i18n/localize";

type Props = {
  params: Promise<{ id: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const locale = await getLocale();
  const article = await getNewsById(id);
  if (!article) return { title: "Article" };

  const localized = localizeItem(
    article as unknown as Record<string, unknown>,
    ["title", "excerpt"],
    locale
  ) as typeof article;

  return {
    title: localized.title,
    description: localized.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { id } = await params;
  const [article, locale] = await Promise.all([getNewsById(id), getLocale()]);
  if (!article) notFound();

  const localized = localizeItem(
    article as unknown as Record<string, unknown>,
    ["title", "excerpt", "body"],
    locale
  ) as typeof article;

  return <NewsArticleView article={localized} />;
}
