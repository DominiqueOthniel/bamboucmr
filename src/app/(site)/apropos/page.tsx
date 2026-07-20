import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, Sprout, Users, Building2 } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { PageHero } from "@/components/shared/PageHero";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { HashScroll } from "@/components/shared/HashScroll";
import { Reveal } from "@/components/motion/Reveal";
import { getMessages } from "@/i18n/server";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez BambouCamer : association et startup d'innovation sociale basées à Dschang, engagées pour le bambou et l'Afrique durable.",
};

export default async function AproposPage() {
  const m = await getMessages();

  const jumpLinks = [
    { href: "#nous", label: m.about.jumpUs },
    { href: "#bambou", label: m.about.jumpBamboo },
    { href: "/apropos/association", label: m.about.jumpAssociation },
    { href: "/apropos/startup", label: m.about.jumpStartup },
  ] as const;

  const chips = [
    { icon: Users, label: m.about.chipCommunities },
    { icon: Leaf, label: m.about.chipEcosystems },
    { icon: Sprout, label: m.about.chipSector },
    { icon: Building2, label: m.about.chipPartners },
  ];

  return (
    <>
      <HashScroll />
      <PageHero
        eyebrow={m.about.eyebrow}
        title={m.about.title}
        description={m.about.description}
        image={images.hero}
      />

      <nav
        aria-label="Sections"
        className="sticky top-14 z-30 border-b border-line bg-paper/90 backdrop-blur-md sm:top-[70px]"
      >
        <div className="container-site flex gap-1 overflow-x-auto py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {jumpLinks.map((link) =>
            link.href.startsWith("#") ? (
              <a
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full px-3.5 py-2 text-[0.85rem] font-medium text-ink/80 transition hover:bg-sand hover:text-ink"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="shrink-0 rounded-full px-3.5 py-2 text-[0.85rem] font-medium text-ink/80 transition hover:bg-sand hover:text-ink"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </nav>

      <section id="nous" className="section-y scroll-mt-28 sm:scroll-mt-32">
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>{m.about.usEyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3.8vw,2.6rem)] text-forest">
              {m.about.usTitle}
            </h2>
            <p className="mt-5 text-muted">{m.about.usP1}</p>
            <p className="mt-4 text-muted">{m.about.usP2}</p>
            <blockquote className="mt-7 border-l-4 border-forest bg-sand/60 px-5 py-4 font-display text-[1.12rem] leading-snug text-forest">
              {m.about.quote}
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[20px]">
              <SiteImage
                src={images.bambooField}
                alt={m.about.usTitle}
                width={1140}
                height={570}
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
              />
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {chips.map(({ icon: Icon, label }) => (
                <li
                  key={label}
                  className="flex items-center gap-3 rounded-[12px] border border-line bg-surface px-3.5 py-3"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-[10px] bg-sand text-forest">
                    <Icon className="h-4 w-4" aria-hidden />
                  </span>
                  <span className="text-[0.9rem] font-medium text-ink">{label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section
        id="bambou"
        className="section-band-sand section-y scroll-mt-28 sm:scroll-mt-32"
      >
        <div className="container-site grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <div className="overflow-hidden rounded-[20px]">
              <SiteImage
                src={images.mission}
                alt={m.about.bambooTitle}
                width={800}
                height={600}
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2">
            <Eyebrow>{m.about.bambooEyebrow}</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3.8vw,2.6rem)] text-forest">
              {m.about.bambooTitle}
            </h2>
            <p className="mt-5 text-muted">{m.about.bambooText}</p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="font-display text-[1.05rem] font-semibold text-forest">
                  {m.about.bambooCo2}
                </dt>
                <dd className="mt-1 text-[0.95rem] text-muted">
                  {m.about.bambooCo2Text}
                </dd>
              </div>
              <div>
                <dt className="font-display text-[1.05rem] font-semibold text-forest">
                  {m.about.bambooSoil}
                </dt>
                <dd className="mt-1 text-[0.95rem] text-muted">
                  {m.about.bambooSoilText}
                </dd>
              </div>
              <div>
                <dt className="font-display text-[1.05rem] font-semibold text-forest">
                  {m.about.bambooEconomy}
                </dt>
                <dd className="mt-1 text-[0.95rem] text-muted">
                  {m.about.bambooEconomyText}
                </dd>
              </div>
            </dl>
            <Link href="/objectifs" className="btn-cta btn-primary mt-8 inline-flex">
              {m.common.seeGoals}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-y scroll-mt-28 sm:scroll-mt-32">
        <div className="container-site">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>{m.about.dualEyebrow}</Eyebrow>
            </div>
            <h2 className="mt-4 text-[clamp(1.7rem,3.8vw,2.6rem)] text-forest">
              {m.about.dualTitle}
            </h2>
            <p className="mt-4 text-muted">{m.about.dualText}</p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <article
                id="association"
                className="flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface scroll-mt-28 sm:scroll-mt-32"
              >
                <SiteImage
                  src={images.association}
                  alt={m.about.associationTitle}
                  width={640}
                  height={375}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-[1.35rem] text-forest">
                    {m.about.associationTitle}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                    {m.about.associationText}
                  </p>
                  <Link
                    href="/apropos/association"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-ink"
                  >
                    {m.about.associationCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>

            <Reveal delay={0.1}>
              <article
                id="startup"
                className="flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface scroll-mt-28 sm:scroll-mt-32"
              >
                <SiteImage
                  src={images.startup}
                  alt={m.about.startupTitle}
                  width={640}
                  height={375}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-[1.35rem] text-forest">
                    {m.about.startupTitle}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                    {m.about.startupText}
                  </p>
                  <Link
                    href="/apropos/startup"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-ink"
                  >
                    {m.about.startupCta}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="on-dark bg-forest py-14 text-white sm:py-16">
        <div className="container-site flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.5rem,3.2vw,2.1rem)]">
              {m.about.ctaTitle}
            </h2>
            <p className="mt-2 text-white/75">{m.about.ctaText}</p>
          </div>
          <div className="btn-stack-mobile flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/contact" className="btn-light">
              {m.common.contactUs}
            </Link>
            <Link href="/solutions" className="btn-secondary">
              {m.common.seeSolutions}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
