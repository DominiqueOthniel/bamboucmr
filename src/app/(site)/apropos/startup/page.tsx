import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { images } from "@/lib/images";
import { SiteImage } from "@/components/shared/SiteImage";
import { getMessages } from "@/i18n/server";

export const metadata: Metadata = {
  title: "La startup",
  description:
    "BambouCamer Startup : entreprise verte spécialisée dans les produits, services et filières durables autour du bambou au Cameroun.",
};

const services = [
  {
    title: "Mobilier et objets artisanaux",
    text: "Tables, chaises, étagères, paniers, ustensiles et objets déco. Solides, esthétiques et biodégradables.",
  },
  {
    title: "Biochar à base de bambou",
    text: "Charbon vert issu de la pyrolyse. Enrichit les sols, capte le CO₂ et réduit la dépendance aux engrais chimiques.",
  },
  {
    title: "Plants de bambou",
    text: "Vente de plants certifiés, appui à la plantation et intégration du bambou dans les systèmes agricoles.",
  },
  {
    title: "Crédits carbone volontaires",
    text: "Plantations sur terres dégradées avec certification carbone. Ouverts aux organisations qui compensent leurs émissions.",
  },
  {
    title: "Formation et conseil",
    text: "Formation des jeunes, femmes, ONG et municipalités sur les métiers verts, l'économie circulaire et l'éco-conception.",
  },
  {
    title: "Zéro déchet",
    text: "Copeaux, sciures et tiges valorisés en biochar ou compost. Aucune perte dans la chaîne de transformation.",
  },
];

export default async function StartupPage() {
  const m = await getMessages();

  return (
    <>
      <PageHero
        eyebrow={m.startup.eyebrow}
        title={m.startup.title}
        description={m.startup.description}
        image={images.startup}
      />

      <section className="section-y">
        <div className="container-site grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>À propos</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.5vw,2.4rem)] text-forest">
              Une chaîne de valeur intégrée
            </h2>
            <p className="mt-5 text-muted">
              Née de l&apos;ambition de son fondateur, expert en foresterie et
              agroforesterie, BambouCamer Startup répond aux défis
              environnementaux, économiques et sociaux du Cameroun grâce au
              bambou.
            </p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="font-display text-[1.08rem] font-semibold text-forest">
                  Vision
                </dt>
                <dd className="mt-1 text-muted">
                  Offrir des solutions écologiques et économiques durables aux
                  communautés locales.
                </dd>
              </div>
              <div>
                <dt className="font-display text-[1.08rem] font-semibold text-forest">
                  Mission
                </dt>
                <dd className="mt-1 text-muted">
                  Former plus de 10 000 jeunes et femmes aux métiers verts du
                  bambou, tout en développant des produits et services à impact.
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[20px]">
              <SiteImage
                src={images.innovation}
                alt="Produits et innovation BambouCamer Startup"
                width={800}
                height={600}
                className="aspect-[5/4] w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-band-sand section-y">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <Eyebrow>Produits et services</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.5vw,2.4rem)] text-forest">
              Toute la chaîne du bambou
            </h2>
            <p className="mt-4 text-muted">
              Une offre qui couvre la production, la transformation, la formation
              et les crédits carbone.
            </p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((item) => (
              <StaggerItem key={item.title} className="h-full">
                <div className="flex h-full min-h-[11.5rem] flex-col rounded-[16px] border border-line bg-surface p-5">
                  <h3 className="font-display text-[1.05rem] text-forest">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.92rem] leading-relaxed text-muted">
                    {item.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site grid gap-8 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <Eyebrow>Marché</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.5rem,3.2vw,2.2rem)] text-forest">
              Un marché du bambou en croissance
            </h2>
            <p className="mt-4 text-muted">
              Au Cameroun, la demande en matériaux écologiques progresse dans la
              construction, l&apos;ameublement, l&apos;emballage et
              l&apos;énergie. Les marchés du carbone volontaire offrent
              également de nouvelles opportunités de financement.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="space-y-3">
              {[
                "Modèle circulaire zéro déchet",
                "Chaîne de valeur intégrée",
                "Expertise technique et R&D",
                "Partenariats académiques et terrain",
              ].map((item) => (
                <li
                  key={item}
                  className="rounded-[12px] border border-line bg-surface px-4 py-3 text-[0.95rem] font-medium text-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section className="on-dark bg-forest py-14 text-white sm:py-16">
        <div className="container-site flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)]">
              Travaillons ensemble
            </h2>
            <p className="mt-2 text-white/75">
              Produits, formation, plantation ou crédits carbone : parlons de
              votre projet.
            </p>
          </div>
          <div className="btn-stack-mobile flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/solutions" className="btn-light">
              Nos solutions
            </Link>
            <Link href="/contact" className="btn-secondary">
              Nous contacter
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
