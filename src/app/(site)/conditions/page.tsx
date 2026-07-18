import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Conditions d'utilisation" };

export default function ConditionsPage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Conditions d'utilisation" />
      <section className="py-16 sm:py-20">
        <Reveal className="mx-auto max-w-[720px] px-5 sm:px-8">
          <Block title="Objet">
            Les présentes conditions régissent l&apos;accès et l&apos;utilisation du site BambouCamer.
          </Block>
          <Block title="Usage du site">
            Le contenu est fourni à titre informatif. BambouCamer s&apos;efforce d&apos;en assurer l&apos;exactitude, sans garantie d&apos;exhaustivité.
          </Block>
          <Block title="Liens externes">
            Les liens vers des sites tiers sont proposés pour information. BambouCamer n&apos;est pas responsable de leur contenu.
          </Block>
          <Block title="Contact">
            Pour toute question relative à ces conditions, écrivez-nous via la page Contact.
          </Block>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Link href="/contact" className="btn-cta rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white">Nous contacter</Link>
            <Link href="/" className="rounded-[13px] border-[1.5px] border-sand-2 px-6 py-3.5 font-semibold text-forest">Retour à l&apos;accueil</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-9 first:mt-0">
      <h2 className="mb-3 text-[1.35rem]">{title}</h2>
      <p className="text-muted">{children}</p>
    </div>
  );
}
