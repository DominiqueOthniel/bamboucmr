import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { NewsGrid } from "@/components/shared/NewsGrid";
import { getNews } from "@/lib/content/reader";
import { getLocale, getMessages } from "@/i18n/server";
import { localizeList } from "@/i18n/localize";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "Actualités",
  description:
    "Actualités et interventions de BambouCamer au Cameroun et en Afrique centrale.",
};

export default async function ActualitesPage() {
  const [newsRaw, messages, locale] = await Promise.all([
    getNews(),
    getMessages(),
    getLocale(),
  ]);
  const news = localizeList(
    newsRaw as unknown as Record<string, unknown>[],
    ["title", "excerpt", "body"],
    locale
  ) as typeof newsRaw;

  return (
    <>
      <PageHero
        eyebrow={messages.news.eyebrow}
        title={messages.news.title}
        description={messages.news.description}
        image={images.bambooField}
      />

      <section className="py-16 sm:py-24">
        <div className="container-site">
          <NewsGrid news={news} />
        </div>
      </section>
    </>
  );
}
