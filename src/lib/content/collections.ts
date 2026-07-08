import type { CollectionName } from "./types";

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "url"
  | "select"
  | "boolean";

export type FieldDef = {
  key: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
  step?: number;
  min?: number;
  max?: number;
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
  "stats",
  "impact-bars",
  "partners",
  "about-questions",
  "nav-links",
  "pillars",
  "solutions",
  "rse-items",
] as const satisfies readonly CollectionName[];

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
        options: [
          "Activité",
          "Restauration",
          "Intervention",
          "Distinction",
          "Conservation",
        ],
        required: true,
      },
      { key: "title", label: "Titre", type: "text", required: true },
      { key: "date", label: "Date affichée", type: "text", required: true },
      { key: "image", label: "Image (URL ou chemin /news/...)", type: "text", required: true },
      { key: "excerpt", label: "Résumé court", type: "textarea", required: true },
      { key: "body", label: "Contenu de l'article", type: "textarea", required: true },
      { key: "published", label: "Publié sur le site", type: "boolean" },
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
      { key: "logoUrl", label: "URL du logo (optionnel)", type: "url" },
      { key: "order", label: "Ordre d'affichage", type: "number", min: 0 },
    ],
  },
  {
    name: "pillars",
    label: "Objectif",
    labelPlural: "Objectifs (piliers)",
    description: "Les 4 piliers de durabilité.",
    listColumns: ["title", "icon"],
    fields: [
      { key: "title", label: "Titre", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
      { key: "kpi", label: "Accroche KPI", type: "text", required: true },
      {
        key: "icon",
        label: "Icône",
        type: "select",
        options: ["shield", "globe", "building", "lightbulb"],
        required: true,
      },
      { key: "image", label: "URL image", type: "url", required: true },
      { key: "tint", label: "Classes gradient Tailwind", type: "text", required: true },
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
      { key: "description", label: "Description", type: "textarea", required: true },
      {
        key: "icon",
        label: "Icône",
        type: "select",
        options: ["map-pin", "sprout", "coins", "graduation", "package", "users"],
        required: true,
      },
      { key: "image", label: "URL image", type: "url", required: true },
      { key: "accent", label: "Classe couleur (ex. bg-forest)", type: "text", required: true },
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
  description: "Coordonnées et textes globaux.",
  listColumns: [],
  fields: [
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
