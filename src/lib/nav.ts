import "server-only";

import { getPillars, getSolutions } from "@/lib/content/reader";

export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  id: string;
  label: string;
  href: string;
  children?: NavChild[];
};

/** Arbre de navigation principal (sous-menus inclus). */
export async function getNavTree(): Promise<NavItem[]> {
  const [pillars, solutions] = await Promise.all([getPillars(), getSolutions()]);

  return [
    { id: "home", label: "Accueil", href: "/" },
    {
      id: "about",
      label: "À propos",
      href: "/apropos",
      children: [
        {
          label: "À propos de nous",
          href: "/apropos#nous",
          description: "Mission et engagement",
        },
        {
          label: "À propos du bambou",
          href: "/apropos#bambou",
          description: "Pourquoi cette ressource",
        },
        {
          label: "L'association",
          href: "/apropos#association",
          description: "Environnement et communautés",
        },
        {
          label: "La startup",
          href: "/apropos#startup",
          description: "Innovation et produits",
        },
      ],
    },
    {
      id: "goals",
      label: "Objectifs",
      href: "/objectifs",
      children: [
        {
          label: "Vue d'ensemble",
          href: "/objectifs",
          description: "Nos 4 piliers de durabilité",
        },
        ...pillars.map((p) => ({
          label: p.title,
          href: `/objectifs/${p.id}`,
        })),
      ],
    },
    {
      id: "solutions",
      label: "Solutions",
      href: "/solutions",
      children: [
        {
          label: "Vue d'ensemble",
          href: "/solutions",
          description: "Toutes nos solutions",
        },
        ...solutions.map((s) => ({
          label: s.title,
          href: `/solutions/${s.id}`,
        })),
        {
          label: "Entreprises & RSE",
          href: "/solutions#rse",
          description: "Collaborer avec nous",
        },
      ],
    },
    {
      id: "resources",
      label: "Ressources",
      href: "/actualites",
      children: [
        {
          label: "Actualités",
          href: "/actualites",
          description: "Interventions sur le terrain",
        },
        {
          label: "Notre impact",
          href: "/impact",
          description: "Résultats mesurables",
        },
        {
          label: "FAQ",
          href: "/faq",
          description: "Questions fréquentes",
        },
      ],
    },
    { id: "contact", label: "Contact", href: "/contact" },
  ];
}
