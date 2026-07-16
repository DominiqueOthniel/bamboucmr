import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";

type Props = {
  backHref: string;
  backLabel: string;
  eyebrow: string;
  title: string;
  image: string;
  description: string;
  body?: string;
  highlight?: string;
  ctaHref?: string;
  ctaLabel?: string;
};

export function ContentDetailView({
  backHref,
  backLabel,
  eyebrow,
  title,
  image,
  description,
  body,
  highlight,
  ctaHref = "/contact",
  ctaLabel = "Nous contacter",
}: Props) {
  const paragraphs = (body || description)
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <article className="container-site py-10 sm:py-16">
      <Link
        href={backHref}
        className="inline-flex items-center gap-2 text-sm font-medium text-bamboo hover:text-forest"
      >
        <ArrowLeft className="h-4 w-4" />
        {backLabel}
      </Link>

      <header className="mx-auto mt-8 max-w-3xl">
        <span className="inline-block rounded-full bg-bamboo/12 px-3 py-1 text-xs font-semibold text-bamboo">
          {eyebrow}
        </span>
        <h1 className="mt-4 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-bold leading-tight text-forest">
          {title}
        </h1>
        {highlight && (
          <p className="mt-4 font-display text-[1.05rem] font-semibold text-bamboo">
            {highlight}
          </p>
        )}
      </header>

      <div className="mx-auto mt-8 max-w-4xl overflow-hidden rounded-[20px] border border-line shadow-md">
        <SiteImage
          src={image}
          alt={title}
          width={1200}
          height={675}
          className="h-auto max-h-[480px] w-full"
          priority
        />
      </div>

      <div className="mx-auto mt-10 max-w-3xl space-y-5 text-[1.05rem] leading-relaxed text-ink">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}

        <div className="flex flex-wrap gap-3 pt-5">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-md bg-forest px-5 py-3 text-sm font-semibold text-white transition hover:bg-bamboo"
          >
            {ctaLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href={backHref}
            className="inline-flex items-center rounded-md border border-line bg-surface px-5 py-3 text-sm font-semibold text-ink transition hover:bg-sand"
          >
            {backLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
