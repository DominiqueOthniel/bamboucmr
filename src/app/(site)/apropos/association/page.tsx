import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { images } from "@/lib/images";
import { SiteImage } from "@/components/shared/SiteImage";
import { getMessages } from "@/i18n/server";

export const metadata: Metadata = {
  title: "L'association",
  description:
    "BambouCamer Association : ONG camerounaise pour la promotion du bambou, la préservation de l'environnement et le développement local.",
};

const timeline = [
  {
    year: "2021",
    title: "Création",
    text: "Fondation de BambouCamer par un groupe de jeunes pour la conservation de la biodiversité, la restauration des écosystèmes et le développement socio-économique des communautés, avec une attention particulière aux jeunes, femmes et peuples autochtones.",
  },
  {
    year: "2023",
    title: "Premiers résultats",
    text: "Publication scientifique dans Advances in Bamboo Science. Consultances GIZ, INBAR, CEW. Premières formations communautaires sur le bambou et les écosystèmes dégradés.",
  },
  {
    year: "2024",
    title: "Légalisation et reconnaissance",
    text: "Légalisation officielle N° 091/RDA/F34/SAAP. Finaliste Challenge Startupper Total Énergie 2024. Participation au projet de restauration des paysages forestiers au Sud Kivu (RDC) avec GIZ/GOPA.",
  },
  {
    year: "2025",
    title: "Phase pilote active",
    text: "Préparation d'un site de 5 ha à Bansoa. Participation au SIPROME Jeune à Yaoundé et au SECO 2025 à Bafoussam. Lancement du projet Monts Bamboutos.",
  },
];

const axes = [
  {
    title: "Sensibilisation et éducation environnementale",
    text: "Éveiller la conscience citoyenne aux enjeux climatiques en promouvant le bambou comme solution écologique majeure.",
  },
  {
    title: "Formation communautaire",
    text: "Ateliers techniques pour transmettre les savoir-faire liés à la culture et à la transformation artisanale du bambou.",
  },
  {
    title: "Pratiques agricoles durables",
    text: "Agroforesterie, agroécologie et agriculture régénérative au service des territoires.",
  },
  {
    title: "Pépinières et plants",
    text: "Pépinières communautaires pour produire des plants de bambou et d'essences locales destinés à la reforestation.",
  },
  {
    title: "Reforestation et restauration",
    text: "Restaurer les paysages dégradés en combinant le bambou et des essences locales pour stabiliser les sols et enrichir la biodiversité.",
  },
];

export default async function AssociationPage() {
  const m = await getMessages();

  return (
    <>
      <PageHero
        eyebrow={m.association.eyebrow}
        title={m.association.title}
        description={m.association.description}
        image={images.association}
      />

      <section className="section-y">
        <div className="container-site grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Eyebrow>Qui nous sommes</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.5vw,2.4rem)] text-forest">
              Une ONG ancrée sur le terrain
            </h2>
            <p className="mt-5 text-muted">
              L&apos;Association Camerounaise pour la Promotion du Bambou, la
              Préservation de l&apos;Environnement, la Conservation de la nature
              et le Développement Local (BambouCamer) agit pour protéger la
              nature tout en améliorant les conditions de vie des communautés
              locales.
            </p>
            <dl className="mt-8 space-y-5">
              <div>
                <dt className="font-display text-[1.08rem] font-semibold text-forest">
                  Vision
                </dt>
                <dd className="mt-1 text-muted">
                  Créer un modèle de développement durable intégrant le bambou
                  comme levier économique, tout en protégeant
                  l&apos;environnement.
                </dd>
              </div>
              <div>
                <dt className="font-display text-[1.08rem] font-semibold text-forest">
                  Mission
                </dt>
                <dd className="mt-1 text-muted">
                  Promouvoir l&apos;utilisation durable du bambou pour protéger
                  l&apos;environnement, conserver la biodiversité et favoriser
                  le développement local.
                </dd>
              </div>
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="overflow-hidden rounded-[20px]">
              <SiteImage
                src={images.bambooField}
                alt="Actions de BambouCamer Association"
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
          <Reveal>
            <Eyebrow>Parcours</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.5vw,2.4rem)] text-forest">
              Historique
            </h2>
          </Reveal>
          <ol className="mt-10 space-y-6">
            {timeline.map((item, i) => (
              <Reveal key={item.year} delay={i * 0.05}>
                <li className="grid gap-3 border-l-2 border-forest/30 pl-5 sm:grid-cols-[6rem_1fr] sm:gap-8">
                  <span className="font-display text-lg font-semibold text-forest">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="font-display text-[1.1rem] text-ink">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-[0.95rem] text-muted">{item.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-y">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <Eyebrow>Axes de travail</Eyebrow>
            <h2 className="mt-4 text-[clamp(1.6rem,3.5vw,2.4rem)] text-forest">
              Nos principaux axes
            </h2>
            <p className="mt-4 text-muted">
              Restauration écologique, formation et autonomisation des
              populations pour une économie verte inclusive.
            </p>
          </Reveal>
          <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {axes.map((axe) => (
              <StaggerItem key={axe.title} className="h-full">
                <div className="flex h-full flex-col rounded-[16px] border border-line bg-surface p-5">
                  <h3 className="font-display text-[1.05rem] text-forest">
                    {axe.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[0.92rem] text-muted">
                    {axe.text}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      <section className="on-dark bg-forest py-14 text-white sm:py-16">
        <div className="container-site flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div className="max-w-xl">
            <h2 className="font-display text-[clamp(1.4rem,3vw,2rem)]">
              En savoir plus sur nos actions
            </h2>
            <p className="mt-2 text-white/75">
              Découvrez notre impact, nos solutions ou contactez-nous.
            </p>
          </div>
          <div className="btn-stack-mobile flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href="/impact" className="btn-light">
              Notre impact
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
