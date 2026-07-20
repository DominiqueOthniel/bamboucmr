"use client";

import Link from "next/link";
import { ArrowLeft, Calendar } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { useI18n } from "@/i18n/LocaleProvider";
import type { NewsItem } from "@/lib/content/types";

export function NewsArticleView({ article }: { article: NewsItem }) {
  const { t } = useI18n();
  const paragraphs = article.body.split(/\n\n+/).filter(Boolean);

  return (
    <article className="container-site py-10 sm:py-16">
      <Link
        href="/actualites"
        className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-forest"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("detail.backNews")}
      </Link>

      <header className="mx-auto mt-8 max-w-3xl">
        <span className="inline-block rounded-full bg-bamboo/12 px-3 py-1 text-xs font-semibold text-bamboo">
          {article.cat}
        </span>
        <h1 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-forest">
          {article.title}
        </h1>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted">
          <Calendar className="h-4 w-4" />
          {article.date}
        </p>
      </header>

      <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[20px] border border-line shadow-md">
        <SiteImage
          src={article.image}
          alt={article.title}
          width={1200}
          height={675}
          className="h-auto w-full max-h-[480px]"
          priority
        />
      </div>

      <div className="prose prose-neutral mx-auto mt-10 max-w-3xl text-[1.05rem] leading-relaxed text-ink prose-p:mb-5">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </article>
  );
}
