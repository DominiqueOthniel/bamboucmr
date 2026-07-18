import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { getFaq } from "@/lib/content/reader";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions fréquentes sur BambouCamer : bambou, partenariats, formations, impact et contact à Dschang.",
};

export default async function FaqPage() {
  const items = await getFaq();

  return (
    <>
      <PageHero
        eyebrow="FAQ"
        title="Vos questions, nos réponses."
        description="Tout ce qu'il faut savoir sur BambouCamer, le bambou et nos façons de collaborer."
        image={images.bambooField}
      />

      <section className="section-y">
        <div className="container-site max-w-3xl">
          <Reveal>
            {items.length > 0 ? (
              <FaqAccordion items={items} />
            ) : (
              <p className="text-muted">
                Les questions fréquentes seront bientôt disponibles.
              </p>
            )}
          </Reveal>

          <Reveal delay={0.12} className="mt-12 rounded-[16px] border border-line bg-sand/50 p-6 sm:p-8">
            <h2 className="font-display text-[1.35rem] text-forest sm:text-[1.5rem]">
              Vous ne trouvez pas votre réponse ?
            </h2>
            <p className="mt-2 max-w-[48ch] text-muted">
              Écrivez-nous : nous vous répondons sous 48 h pour tout projet,
              partenariat ou demande d&apos;information.
            </p>
            <Link href="/contact" className="btn-cta btn-primary mt-5">
              Nous contacter
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
