import "server-only";

import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { CollectionName, SiteSettings } from "./types";
import {
  CONTENT_COLLECTION,
  getDb,
  isMongoEnabled,
  markMongoUnavailable,
} from "@/lib/db/mongodb";

const CONTENT_DIR = path.join(process.cwd(), "content");

const DEFAULT_HERO: SiteSettings["hero"] = {
  eyebrow: "Développement durable · Cameroun",
  title: "BambouCamer",
  tagline: "Le bambou au service de l'économie verte et des territoires.",
  description:
    "Association et startup sociale basée à Dschang : restauration écologique, filières locales et partenariats responsables.",
  image: "/hero/bamboo.jpg",
  primaryCtaLabel: "Découvrir nos solutions",
  primaryCtaHref: "/solutions",
  secondaryCtaLabel: "Qui sommes-nous",
  secondaryCtaHref: "/apropos",
};

function withHeroDefaults(settings: SiteSettings): SiteSettings {
  return {
    ...settings,
    hero: { ...DEFAULT_HERO, ...(settings.hero ?? {}) },
  };
}

type CollectionDoc<T> = {
  key: CollectionName;
  items: T[];
};

type SettingsDoc = SiteSettings & {
  key: "site-settings";
};

async function readJsonFile<T>(filename: string): Promise<T> {
  const raw = await readFile(path.join(CONTENT_DIR, filename), "utf-8");
  return JSON.parse(raw) as T;
}

async function writeJsonFile(filename: string, data: unknown): Promise<void> {
  await writeFile(
    path.join(CONTENT_DIR, filename),
    `${JSON.stringify(data, null, 2)}\n`,
    "utf-8"
  );
}

async function withMongoFallback<T>(
  mongoOp: () => Promise<T>,
  jsonOp: () => Promise<T>
): Promise<T> {
  if (!isMongoEnabled()) {
    return jsonOp();
  }

  try {
    return await mongoOp();
  } catch (err) {
    markMongoUnavailable();
    console.warn(
      "[content] MongoDB indisponible, bascule sur content/*.json",
      err instanceof Error ? err.message : err
    );
    return jsonOp();
  }
}

export async function loadCollectionItems<T>(
  name: CollectionName
): Promise<T[]> {
  return withMongoFallback(
    async () => {
      const db = await getDb();
      const doc = await db
        .collection<CollectionDoc<T>>(CONTENT_COLLECTION)
        .findOne({ key: name });
      return doc?.items ?? [];
    },
    () => readJsonFile<T[]>(`${name}.json`)
  );
}

export async function saveCollectionItems(
  name: CollectionName,
  items: unknown[]
): Promise<void> {
  await withMongoFallback(
    async () => {
      const db = await getDb();
      await db.collection<CollectionDoc<unknown>>(CONTENT_COLLECTION).replaceOne(
        { key: name },
        { key: name, items },
        { upsert: true }
      );
    },
    () => writeJsonFile(`${name}.json`, items)
  );
}

export async function loadSiteSettings(): Promise<SiteSettings> {
  return withMongoFallback(
    async () => {
      const db = await getDb();
      const doc = await db
        .collection<SettingsDoc>(CONTENT_COLLECTION)
        .findOne({ key: "site-settings" });
      if (!doc) {
        throw new Error("Paramètres du site introuvables en base");
      }
      const { key: _, ...settings } = doc;
      return withHeroDefaults(settings as SiteSettings);
    },
    async () => {
      const settings = await readJsonFile<SiteSettings>("site-settings.json");
      return withHeroDefaults(settings);
    }
  );
}

export async function saveSiteSettings(data: SiteSettings): Promise<void> {
  await withMongoFallback(
    async () => {
      const db = await getDb();
      await db.collection<SettingsDoc>(CONTENT_COLLECTION).replaceOne(
        { key: "site-settings" },
        { key: "site-settings", ...data },
        { upsert: true }
      );
    },
    () => writeJsonFile("site-settings.json", data)
  );
}
