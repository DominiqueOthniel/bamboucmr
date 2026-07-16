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
      { key: "date", label: "Date affichée", type: "text", required: true },
      { key: "image", label: "Image", type: "image", required: true },
      { key: "excerpt", label: "Résumé court", type: "textarea", required: true },
      { key: "body", label: "Contenu de l'article", type: "textarea", required: true },
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
      { key: "description", label: "Résumé (cartes)", type: "textarea", required: true },
      {
        key: "body",
        label: "Contenu détaillé (page)",
        type: "textarea",
        required: true,
        help: "Texte affiché sur la page de détail. Séparez les paragraphes par une ligne vide.",
      },
      { key: "kpi", label: "Accroche KPI", type: "text", required: true },
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
      { key: "description", label: "Résumé (cartes)", type: "textarea", required: true },
      {
        key: "body",
        label: "Contenu détaillé (page)",
        type: "textarea",
        required: true,
        help: "Texte affiché sur la page de détail. Séparez les paragraphes par une ligne vide.",
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
    label: "Élément RSE",
    labelPlural: "Bloc RSE entreprises",
    description: "Items du bloc entreprises sur la page Solutions.",
    listColumns: ["n", "title"],
    fields: [
      { key: "n", label: "Numéro", type: "text", required: true },
      { key: "title", label: "Titre", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
    ],
  },
  {
    name: "about-questions",
    label: "Question",
    labelPlural: "Accroches À propos",
    description: "Phrases d'accroche de la section Qui sommes-nous.",
    listColumns: ["text"],
    fields: [{ key: "text", label: "Texte", type: "textarea", required: true }],
  },
  {
    name: "nav-links",
    label: "Lien",
    labelPlural: "Navigation",
    description: "Liens du menu principal.",
    listColumns: ["label", "href"],
    fields: [
      { key: "label", label: "Libellé", type: "text", required: true },
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
    { key: "hero.title", label: "Hero · Titre (marque)", type: "text", required: true },
    { key: "hero.tagline", label: "Hero · Accroche", type: "textarea", required: true },
    { key: "hero.description", label: "Hero · Texte", type: "textarea", required: true },
    { key: "hero.image", label: "Hero · Image de fond", type: "image", required: true },
    { key: "hero.primaryCtaLabel", label: "Hero · CTA principal (texte)", type: "text", required: true },
    { key: "hero.primaryCtaHref", label: "Hero · CTA principal (lien)", type: "text", required: true },
    { key: "hero.secondaryCtaLabel", label: "Hero · CTA secondaire (texte)", type: "text", required: true },
    { key: "hero.secondaryCtaHref", label: "Hero · CTA secondaire (lien)", type: "text", required: true },
    { key: "contact.address", label: "Adresse", type: "textarea", required: true },
    { key: "contact.phone", label: "Téléphone", type: "text", required: true },
    { key: "contact.email", label: "E-mail", type: "text", required: true },
    { key: "footer.tagline", label: "Texte footer", type: "textarea", required: true },
  ],
};

export function getCollectionMeta(name: string): CollectionMeta | undefined {
  if (name === "site-settings") return SITE_SETTINGS_META;
  return COLLECTIONS.find((c) => c.name === name);
}
