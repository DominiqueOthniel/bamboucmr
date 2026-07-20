import type { CollectionName } from "./types";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "image"
  | "select"
  | "boolean";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  /** Static options for select fields */
  options?: string[];
  /** Load options from another collection (uses `label` or optionLabelKey) */
  optionsFrom?: CollectionName;
  optionLabelKey?: string;
  /** Allow typing a new value and creating it in optionsFrom collection */
  creatable?: boolean;
  required?: boolean;
  step?: number;
  min?: number;
  max?: number;
  help?: string;
};

export type CollectionMeta = {
  name: CollectionName | "site-settings";
  label: string;
  labelPlural: string;
  description: string;
  fields: FieldDef[];
  listColumns: string[];
};

export const COLLECTION_NAMES = [
  "news",
  "news-categories",
  "stats",
  "impact-bars",
  "partners",
  "about-questions",
  "nav-links",
  "pillars",
  "solutions",
  "rse-items",
  "faq",
] as const satisfies readonly CollectionName[];

const PILLAR_ICONS = ["shield", "globe", "building", "lightbulb", "leaf", "users", "sprout"];
const SOLUTION_ICONS = [
  "map-pin",
  "sprout",
  "coins",
  "graduation",
  "package",
  "users",
  "leaf",
  "globe",
  "building",
];

const TINT_PRESETS = [
  "from-forest to-bamboo",
  "from-bamboo-2 to-shoot-deep",
  "from-bamboo to-forest-2",
  "from-shoot-deep to-bamboo-2",
  "from-forest-2 to-bamboo",
  "from-bamboo to-shoot-deep",
];

const ACCENT_PRESETS = [
  "bg-forest",
  "bg-bamboo",
  "bg-forest-2",
  "bg-bamboo-2",
  "bg-shoot-deep",
];

export const COLLECTIONS: CollectionMeta[] = [
  {
    name: "news",
    label: "Actualité",
    labelPlural: "Actualités",
    description: "Articles et interventions sur le terrain.",
    listColumns: ["title", "cat", "date", "published"],
    fields: [
      {
        key: "cat",
        label: "Catégorie",
        type: "select",
        optionsFrom: "news-categories",
        optionLabelKey: "label",
        creatable: true,
        required: true,
        help: "Choisissez une catégorie ou créez-en une nouvelle.",
      },
      { key: "title", label: "Titre", type: "text", required: true },
      { key: "titleEn", label: "Titre (EN)", type: "text" },
      { key: "date", label: "Date affichée", type: "text", required: true },
      { key: "image", label: "Image", type: "image", required: true },
      { key: "excerpt", label: "Résumé court", type: "textarea", required: true },
      { key: "excerptEn", label: "Résumé court (EN)", type: "textarea" },
      { key: "body", label: "Contenu de l'article", type: "textarea", required: true },
      { key: "bodyEn", label: "Contenu de l'article (EN)", type: "textarea" },
      { key: "published", label: "Publié sur le site", type: "boolean" },
    ],
  },
  {
    name: "news-categories",
    label: "Catégorie",
    labelPlural: "Catégories d'actualités",
    description: "Catégories utilisées pour classer les articles.",
    listColumns: ["label", "order"],
    fields: [
      { key: "label", label: "Nom de la catégorie", type: "text", required: true },
      { key: "labelEn", label: "Nom de la catégorie (EN)", type: "text" },
      { key: "order", label: "Ordre d'affichage", type: "number", min: 0 },
    ],
  },
  {
    name: "stats",
    label: "Chiffre",
    labelPlural: "Chiffres clés",
    description: "Statistiques affichées sur la page d'accueil.",
    listColumns: ["label", "value", "suffix"],
    fields: [
      { key: "value", label: "Valeur", type: "number", required: true, min: 0 },
      { key: "suffix", label: "Suffixe", type: "text", required: true },
      { key: "label", label: "Libellé", type: "text", required: true },
      { key: "labelEn", label: "Libellé (EN)", type: "text" },
    ],
  },
  {
    name: "impact-bars",
    label: "Indicateur",
    labelPlural: "Barres d'impact",
    description: "Pourcentages de progression sur la page Impact.",
    listColumns: ["label", "pct"],
    fields: [
      { key: "label", label: "Libellé", type: "text", required: true },
      { key: "labelEn", label: "Libellé (EN)", type: "text" },
      {
        key: "pct",
        label: "Pourcentage",
        type: "number",
        required: true,
        min: 0,
        max: 100,
      },
    ],
  },
  {
    name: "partners",
    label: "Partenaire",
    labelPlural: "Partenaires",
    description: "Logos et noms des partenaires.",
    listColumns: ["name", "order"],
    fields: [
      { key: "name", label: "Nom", type: "text", required: true },
      { key: "logoUrl", label: "Logo", type: "image" },
      { key: "order", label: "Ordre d'affichage", type: "number", min: 0 },
    ],
  },
  {
    name: "pillars",
    label: "Objectif",
    labelPlural: "Objectifs (piliers)",
    description: "Piliers de durabilité (ajoutez-en autant que nécessaire).",
    listColumns: ["title", "icon"],
    fields: [
      { key: "title", label: "Titre", type: "text", required: true },
      { key: "titleEn", label: "Titre (EN)", type: "text" },
      { key: "description", label: "Résumé (cartes)", type: "textarea", required: true },
      { key: "descriptionEn", label: "Résumé (cartes) EN", type: "textarea" },
      {
        key: "body",
        label: "Contenu détaillé (page)",
        type: "textarea",
        required: true,
        help: "Texte affiché sur la page de détail. Séparez les paragraphes par une ligne vide.",
      },
      {
        key: "bodyEn",
        label: "Contenu détaillé (page) EN",
        type: "textarea",
        help: "English body for the detail page.",
      },
      { key: "kpi", label: "Accroche KPI", type: "text", required: true },
      { key: "kpiEn", label: "Accroche KPI (EN)", type: "text" },
      {
        key: "icon",
        label: "Icône",
        type: "select",
        options: PILLAR_ICONS,
        required: true,
      },
      { key: "image", label: "Image", type: "image", required: true },
      {
        key: "tint",
        label: "Teinte image",
        type: "select",
        options: TINT_PRESETS,
        required: true,
      },
    ],
  },
  {
    name: "solutions",
    label: "Solution",
    labelPlural: "Solutions",
    description: "Cartes solutions sur le site.",
    listColumns: ["title", "icon"],
    fields: [
      { key: "title", label: "Titre", type: "text", required: true },
      { key: "titleEn", label: "Titre (EN)", type: "text" },
      { key: "description", label: "Résumé (cartes)", type: "textarea", required: true },
      { key: "descriptionEn", label: "Résumé (cartes) EN", type: "textarea" },
      {
        key: "body",
        label: "Contenu détaillé (page)",
        type: "textarea",
        required: true,
        help: "Texte affiché sur la page de détail. Séparez les paragraphes par une ligne vide.",
      },
      {
        key: "bodyEn",
        label: "Contenu détaillé (page) EN",
        type: "textarea",
      },
      {
        key: "icon",
        label: "Icône",
        type: "select",
        options: SOLUTION_ICONS,
        required: true,
      },
      { key: "image", label: "Image", type: "image", required: true },
      {
        key: "accent",
        label: "Couleur d'accent",
        type: "select",
        options: ACCENT_PRESETS,
        required: true,
      },
    ],
  },
  {
    name: "rse-items",
    label: "Accompagnement",
    labelPlural: "Accompagnement partenaires",
    description:
      "Cartes de la section Collaborer avec nous, en bas de la page Solutions.",
    listColumns: ["n", "title"],
    fields: [
      { key: "n", label: "Numéro", type: "text", required: true },
      { key: "title", label: "Titre", type: "text", required: true },
      { key: "titleEn", label: "Titre (EN)", type: "text" },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        required: true,
        help: "Texte affiché sur la carte (page Solutions).",
      },
      { key: "descriptionEn", label: "Description (EN)", type: "textarea" },
    ],
  },
  {
    name: "about-questions",
    label: "Question",
    labelPlural: "Accroches À propos",
    description: "Phrases d'accroche de la section Qui sommes-nous.",
    listColumns: ["text"],
    fields: [
      { key: "text", label: "Texte", type: "textarea", required: true },
      { key: "textEn", label: "Texte (EN)", type: "textarea" },
    ],
  },
  {
    name: "faq",
    label: "FAQ",
    labelPlural: "FAQ",
    description: "Questions fréquentes affichées sur la page FAQ.",
    listColumns: ["question", "order"],
    fields: [
      { key: "question", label: "Question", type: "text", required: true },
      { key: "questionEn", label: "Question (EN)", type: "text" },
      { key: "answer", label: "Réponse", type: "textarea", required: true },
      { key: "answerEn", label: "Réponse (EN)", type: "textarea" },
      { key: "order", label: "Ordre d'affichage", type: "number", min: 0 },
    ],
  },
  {
    name: "nav-links",
    label: "Lien",
    labelPlural: "Navigation",
    description: "Liens du menu principal.",
    listColumns: ["label", "href"],
    fields: [
      { key: "label", label: "Libellé", type: "text", required: true },
      { key: "labelEn", label: "Libellé (EN)", type: "text" },
      { key: "href", label: "URL", type: "text", required: true },
    ],
  },
];

export const SITE_SETTINGS_META: CollectionMeta = {
  name: "site-settings",
  label: "Paramètres",
  labelPlural: "Paramètres du site",
  description: "Hero, coordonnées et textes globaux.",
  listColumns: [],
  fields: [
    { key: "hero.eyebrow", label: "Hero · Sur-titre", type: "text", required: true },
    { key: "hero.eyebrowEn", label: "Hero · Sur-titre (EN)", type: "text" },
    { key: "hero.title", label: "Hero · Titre (marque)", type: "text", required: true },
    { key: "hero.titleEn", label: "Hero · Titre (EN)", type: "text" },
    { key: "hero.tagline", label: "Hero · Accroche", type: "textarea", required: true },
    { key: "hero.taglineEn", label: "Hero · Accroche (EN)", type: "textarea" },
    { key: "hero.description", label: "Hero · Texte", type: "textarea", required: true },
    { key: "hero.descriptionEn", label: "Hero · Texte (EN)", type: "textarea" },
    { key: "hero.image", label: "Hero · Image de fond", type: "image", required: true },
    { key: "hero.primaryCtaLabel", label: "Hero · CTA principal (texte)", type: "text", required: true },
    { key: "hero.primaryCtaLabelEn", label: "Hero · CTA principal (EN)", type: "text" },
    { key: "hero.primaryCtaHref", label: "Hero · CTA principal (lien)", type: "text", required: true },
    { key: "hero.secondaryCtaLabel", label: "Hero · CTA secondaire (texte)", type: "text", required: true },
    { key: "hero.secondaryCtaLabelEn", label: "Hero · CTA secondaire (EN)", type: "text" },
    { key: "hero.secondaryCtaHref", label: "Hero · CTA secondaire (lien)", type: "text", required: true },
    { key: "contact.address", label: "Adresse", type: "textarea", required: true },
    { key: "contact.phone", label: "Téléphone", type: "text", required: true },
    { key: "contact.email", label: "E-mail", type: "text", required: true },
    { key: "footer.tagline", label: "Texte footer", type: "textarea", required: true },
    { key: "footer.taglineEn", label: "Texte footer (EN)", type: "textarea" },
  ],
};

export function getCollectionMeta(name: string): CollectionMeta | undefined {
  if (name === "site-settings") return SITE_SETTINGS_META;
  return COLLECTIONS.find((c) => c.name === name);
}
