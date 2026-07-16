export type NewsCategoryItem = {
  id: string;
  label: string;
  order: number;
};

export type NewsItem = {
  id: string;
  cat: string;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  body: string;
  published: boolean;
};

export type StatItem = {
  id: string;
  value: number;
  suffix: string;
  label: string;
};

export type ImpactBarItem = {
  id: string;
  label: string;
  pct: number;
};

export type PartnerItem = {
  id: string;
  name: string;
  logoUrl: string | null;
  order: number;
};

export type AboutQuestionItem = {
  id: string;
  text: string;
};

export type NavLinkItem = {
  id: string;
  href: string;
  label: string;
};

export type PillarItem = {
  id: string;
  title: string;
  description: string;
  body: string;
  kpi: string;
  icon: string;
  image: string;
  tint: string;
};

export type SolutionItem = {
  id: string;
  title: string;
  description: string;
  body: string;
  icon: string;
  image: string;
  accent: string;
};

export type RseItem = {
  id: string;
  n: string;
  title: string;
  description: string;
};

export type SiteSettings = {
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  footer: {
    tagline: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    tagline: string;
    description: string;
    image: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
  };
};

export type CollectionName =
  | "news"
  | "news-categories"
  | "stats"
  | "impact-bars"
  | "partners"
  | "about-questions"
  | "nav-links"
  | "pillars"
  | "solutions"
  | "rse-items";

export type CollectionItemMap = {
  news: NewsItem;
  "news-categories": NewsCategoryItem;
  stats: StatItem;
  "impact-bars": ImpactBarItem;
  partners: PartnerItem;
  "about-questions": AboutQuestionItem;
  "nav-links": NavLinkItem;
  pillars: PillarItem;
  solutions: SolutionItem;
  "rse-items": RseItem;
};
