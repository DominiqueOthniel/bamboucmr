import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Leaf, Sprout, Users, Building2 } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { PageHero } from "@/components/shared/PageHero";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { HashScroll } from "@/components/shared/HashScroll";
import { Reveal } from "@/components/motion/Reveal";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez BambouCamer : association et startup d'innovation sociale basées à Dschang, engagées pour le bambou et l'Afrique durable.",
};

const jumpLinks = [
  { href: "#nous", label: "Nous" },
  { href: "#bambou", label: "Le bambou" },
  { href: "#association", label: "Association" },
  { href: "#startup", label: "Startup" },
] as const;

export default function AproposPage() {
  return (
    <>
      <HashScroll />
      <PageHero
        eyebrow="Qui sommes-nous"
        title="BambouCamer"
        description="Association et startup sociale à Dschang : le bambou au service des communautés, des écosystèmes et d'une économie verte."
        image={images.hero}
      />

      <nav
        aria-label="Sections de la page"
        className="sticky top-14 z-30 border-b border-line bg-paper/90 backdrop-blur-md sm:top-[70px]"
      >
        <div className="container-site flex gap-1 overflow-x-auto py-2.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {jumpLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="shrink-0 rounded-full px-3.5 py-2 text-[0.85rem] font-medium text-ink/80 transition hover:bg-sand hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>

      <section
        id="nous"
        className="section-y scroll-mt-28 sm:scroll-mt-32"
      >
        <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>À propos de nous</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3.8vw,2.6rem)] text-forest">
              Une organisation, une mission claire
            </h2>
            <p className="mt-5 text-muted">
              BambouCamer est une organisation camerounaise apolitique et non
              confessionnelle. Nous agissons à la croisée de deux engagements :
              protéger la nature et créer de la valeur pour les communautés.
            </p>
            <p className="mt-4 text-muted">
              Basés à Dschang, nous travaillons sur le terrain : plantations,
              formation, filières locales et partenariats responsables, au
              Cameroun et au-delà.
            </p>
            <blockquote className="mt-7 border-l-4 border-forest bg-sand/60 px-5 py-4 font-display text-[1.12rem] leading-snug text-forest">
              « Quand la nature est protégée et que l&apos;innovation sert les
              communautés, le développement durable devient une réalité
              tangible. »
            </blockquote>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="overflow-hidden rounded-[20px]">
              <SiteImage
                src={images.bambooField}
                alt="Plantation de bambou au Cameroun"
                width={1140}
                height={570}
                className="aspect-[4/3] w-full object-cover sm:aspect-[16/11]"
              />
            </div>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                { icon: Users, label: "Communautés locales" },
                { icon: Leaf, label: "Écosystèmes restaurés" },
                { icon: Sprout, label: "Filière bambou" },
                { icon: Building2, label: "Partenariats durables" },
              ].map(({ icon: Icon, label }) => (
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
                alt="Bambou et paysage camerounais"
                width={800}
                height={600}
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.08} className="order-1 lg:order-2">
            <Eyebrow>À propos du bambou</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.7rem,3.8vw,2.6rem)] text-forest">
              Une ressource pour les défis d&apos;aujourd&apos;hui
            </h2>
            <p className="mt-5 text-muted">
              Le bambou pousse vite, stocke du carbone, stabilise les sols et
              peut remplacer des matériaux plus polluants. C&apos;est une ressource
              locale encore sous-exploitée, idéale pour allier climat, emplois
              et produits durables.
            </p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="font-display text-[1.05rem] font-semibold text-forest">
                  Jusqu&apos;à ×4 plus de CO₂
                </dt>
                <dd className="mt-1 text-[0.95rem] text-muted">
                  Séquestré par rapport à un arbre ordinaire, selon les
                  contextes de plantation.
                </dd>
              </div>
              <div>
                <dt className="font-display text-[1.05rem] font-semibold text-forest">
                  Sols et biodiversité
                </dt>
                <dd className="mt-1 text-[0.95rem] text-muted">
                  Restauration des terres dégradées, stabilisation des berges et
                  habitats mieux protégés.
                </dd>
              </div>
              <div>
                <dt className="font-display text-[1.05rem] font-semibold text-forest">
                  Économie locale
                </dt>
                <dd className="mt-1 text-[0.95rem] text-muted">
                  Formation, transformation et commercialisation pour des
                  revenus ancrés dans les territoires.
                </dd>
              </div>
            </dl>
            <Link
              href="/objectifs"
              className="btn-cta btn-primary mt-8 inline-flex"
            >
              Voir nos objectifs
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-y scroll-mt-28 sm:scroll-mt-32">
        <div className="container-site">
          <Reveal className="mx-auto max-w-2xl text-center">
            <div className="flex justify-center">
              <Eyebrow>Deux entités</Eyebrow>
            </div>
            <h2 className="mt-4 text-[clamp(1.7rem,3.8vw,2.6rem)] text-forest">
              Une association. Une startup. Une mission.
            </h2>
            <p className="mt-4 text-muted">
              Deux façons d&apos;agir, un même cap : faire du bambou un pilier
              du développement durable au Cameroun et en Afrique.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <Reveal>
              <article
                id="association"
                className="flex h-full flex-col overflow-hidden rounded-[20px] border border-line bg-surface scroll-mt-28 sm:scroll-mt-32"
              >
                <SiteImage
                  src={images.association}
                  alt="BambouCamer association"
                  width={640}
                  height={375}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-[1.35rem] text-forest">
                    L&apos;association
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                    Préservation de l&apos;environnement, conservation de la
                    biodiversité et accompagnement des communautés locales vers
                    des pratiques durables.
                  </p>
                  <Link
                    href="/impact"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-ink"
                  >
                    Voir notre impact
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
                  alt="BambouCamer startup"
                  width={640}
                  height={375}
                  className="aspect-[16/10] w-full object-cover"
                />
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-[1.35rem] text-forest">
                    La startup
                  </h3>
                  <p className="mt-3 flex-1 text-[0.95rem] leading-relaxed text-muted">
                    Innovation sociale et produits à base de bambou :
                    construction, artisanat, emballages et expertises pour les
                    marchés locaux et internationaux.
                  </p>
                  <Link
                    href="/solutions"
                    className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-forest transition hover:text-ink"
                  >
                    Découvrir nos solutions
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
              Construisons ensemble la suite
            </h2>
            <p className="mt-2 text-white/75">
              Partenariat, projet terrain ou simple question : parlons-en.
            </p>
          </div>
          <div className="btn-stack-mobile flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/contact" className="btn-light">
              Nous contacter
            </Link>
            <Link href="/solutions" className="btn-secondary">
              Nos solutions
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
