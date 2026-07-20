export type NewsCategoryItem = {
  id: string;
  label: string;
  labelEn?: string;
  order: number;
};

export type NewsItem = {
  id: string;
  cat: string;
  title: string;
  titleEn?: string;
  date: string;
  image: string;
  excerpt: string;
  excerptEn?: string;
  body: string;
  bodyEn?: string;
  published: boolean;
};

export type StatItem = {
  id: string;
  value: number;
  suffix: string;
  label: string;
  labelEn?: string;
};

export type ImpactBarItem = {
  id: string;
  label: string;
  labelEn?: string;
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
  textEn?: string;
};

export type FaqItem = {
  id: string;
  question: string;
  questionEn?: string;
  answer: string;
  answerEn?: string;
  order: number;
};

export type NavLinkItem = {
  id: string;
  href: string;
  label: string;
  labelEn?: string;
};

export type PillarItem = {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  body: string;
  bodyEn?: string;
  kpi: string;
  kpiEn?: string;
  icon: string;
  image: string;
  tint: string;
};

export type SolutionItem = {
  id: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  body: string;
  bodyEn?: string;
  icon: string;
  image: string;
  accent: string;
};

export type RseItem = {
  id: string;
  n: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
};

export type SiteSettings = {
  contact: {
    address: string;
    phone: string;
    email: string;
  };
  footer: {
    tagline: string;
    taglineEn?: string;
  };
  hero: {
    eyebrow: string;
    eyebrowEn?: string;
    title: string;
    titleEn?: string;
    tagline: string;
    taglineEn?: string;
    description: string;
    descriptionEn?: string;
    image: string;
    primaryCtaLabel: string;
    primaryCtaLabelEn?: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaLabelEn?: string;
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
  | "rse-items"
  | "faq";

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
  faq: FaqItem;
};
