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
  kpi: string;
  icon: "shield" | "globe" | "building" | "lightbulb";
  image: string;
  tint: string;
};

export type SolutionItem = {
  id: string;
  title: string;
  description: string;
  icon: "map-pin" | "sprout" | "coins" | "graduation" | "package" | "users";
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
};

export type CollectionName =
  | "news"
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
  stats: StatItem;
  "impact-bars": ImpactBarItem;
  partners: PartnerItem;
  "about-questions": AboutQuestionItem;
  "nav-links": NavLinkItem;
  pillars: PillarItem;
  solutions: SolutionItem;
  "rse-items": RseItem;
};
