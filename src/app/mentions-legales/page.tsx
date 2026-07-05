import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Mentions légales" };

export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero eyebrow="Informations légales" title="Mentions légales" />
      <section className="py-16 sm:py-20">
        <Reveal className="mx-auto max-w-[720px] px-5 sm:px-8">
          <LegalBlock title="Éditeur du site">
            <p>BambouCamer — Association et startup d&apos;innovation sociale basée à Dschang, Cameroun.</p>
            <p>Adresse : Immeuble Gabon Bar, face au stade de Foréké — Dschang</p>
            <p>Téléphone : (+237) 653 07 70 76</p>
            <p>E-mail : contact@bamboucamer.com</p>
          </LegalBlock>
          <LegalBlock title="Hébergement">
            <p>Les informations d&apos;hébergement seront précisées lors de la mise en production du site.</p>
          </LegalBlock>
          <LegalBlock title="Propriété intellectuelle">
            <p>L&apos;ensemble des contenus présents sur ce site (textes, visuels, logos) est protégé. Toute reproduction non autorisée est interdite.</p>
          </LegalBlock>
          <div className="mt-9 flex flex-wrap gap-3.5">
            <Link href="/contact" className="rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white">Nous contacter</Link>
            <Link href="/" className="rounded-[13px] border-[1.5px] border-sand-2 px-6 py-3.5 font-semibold text-forest">Retour à l&apos;accueil</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function LegalBlock({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mt-9 first:mt-0">
      <h2 className="mb-3 text-[1.35rem]">{title}</h2>
      <div className="space-y-3 text-muted">{children}</div>
    </div>
  );
}
