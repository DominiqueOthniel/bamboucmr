import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NewsArticleView } from "@/components/shared/NewsArticleView";
import { getNews, getNewsById } from "@/lib/content/reader";

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
  const news = await getNews();
  return news.map((item) => ({ id: item.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const article = await getNewsById(id);
  if (!article) return { title: "Article introuvable" };

  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function NewsArticlePage({ params }: Props) {
  const { id } = await params;
  const article = await getNewsById(id);
  if (!article) notFound();

  return <NewsArticleView article={article} />;
}
