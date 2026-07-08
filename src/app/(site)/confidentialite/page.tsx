import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Confidentialité" };

export default function ConfidentialitePage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Politique de confidentialité" />
      <section className="py-16 sm:py-20">
        <Reveal className="mx-auto max-w-[720px] px-5 sm:px-8">
          <Block title="Données collectées">
            Lorsque vous utilisez le formulaire de contact, nous collectons votre nom, votre adresse e-mail et le contenu de votre message.
          </Block>
          <Block title="Finalité">
            Ces données servent uniquement à répondre à votre demande et à assurer le suivi de nos échanges.
          </Block>
          <Block title="Conservation">
            Vos informations ne sont jamais vendues ni partagées à des tiers à des fins commerciales.
          </Block>
          <Block title="Vos droits">
            Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en écrivant à contact@bamboucamer.com.
          </Block>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Link href="/contact" className="rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white">Nous contacter</Link>
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
