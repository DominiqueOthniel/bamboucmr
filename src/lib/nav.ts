import "server-only";

import { getPillars, getSolutions } from "@/lib/content/reader";
import { getLocale } from "@/i18n/server";
import { dictionaries } from "@/i18n/messages";
import { pickLocalized } from "@/i18n/localize";

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
  const locale = await getLocale();
  const m = dictionaries[locale];
  const [pillars, solutions] = await Promise.all([getPillars(), getSolutions()]);

  return [
    { id: "home", label: m.nav.home, href: "/" },
    {
      id: "about",
      label: m.nav.about,
      href: "/apropos",
      children: [
        {
          label: m.nav.aboutUs,
          href: "/apropos#nous",
          description: m.nav.aboutUsDesc,
        },
        {
          label: m.nav.aboutBamboo,
          href: "/apropos#bambou",
          description: m.nav.aboutBambooDesc,
        },
        {
          label: m.nav.association,
          href: "/apropos/association",
          description: m.nav.associationDesc,
        },
        {
          label: m.nav.startup,
          href: "/apropos/startup",
          description: m.nav.startupDesc,
        },
      ],
    },
    {
      id: "goals",
      label: m.nav.goals,
      href: "/objectifs",
      children: [
        {
          label: m.nav.goalsOverview,
          href: "/objectifs",
          description: m.nav.goalsOverviewDesc,
        },
        ...pillars.map((p) => ({
          label: pickLocalized(p as unknown as Record<string, unknown>, "title", locale),
          href: `/objectifs/${p.id}`,
        })),
      ],
    },
    {
      id: "solutions",
      label: m.nav.solutions,
      href: "/solutions",
      children: [
        {
          label: m.nav.solutionsOverview,
          href: "/solutions",
          description: m.nav.solutionsOverviewDesc,
        },
        ...solutions.map((s) => ({
          label: pickLocalized(s as unknown as Record<string, unknown>, "title", locale),
          href: `/solutions/${s.id}`,
        })),
        {
          label: m.nav.collaborate,
          href: "/solutions#collaborer",
          description: m.nav.collaborateDesc,
        },
      ],
    },
    {
      id: "resources",
      label: m.nav.resources,
      href: "/actualites",
      children: [
        {
          label: m.nav.news,
          href: "/actualites",
          description: m.nav.newsDesc,
        },
        {
          label: m.nav.impact,
          href: "/impact",
          description: m.nav.impactDesc,
        },
        {
          label: m.nav.faq,
          href: "/faq",
          description: m.nav.faqDesc,
        },
      ],
    },
    { id: "contact", label: m.nav.contact, href: "/contact" },
  ];
}
