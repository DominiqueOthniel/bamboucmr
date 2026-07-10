import "server-only";

import { readFile, writeFile } from "fs/promises";
import path from "path";
import type { CollectionName, SiteSettings } from "./types";
import { CONTENT_COLLECTION, getDb, isMongoEnabled } from "@/lib/db/mongodb";

const CONTENT_DIR = path.join(process.cwd(), "content");

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

export async function loadCollectionItems<T>(
  name: CollectionName
): Promise<T[]> {
  if (isMongoEnabled()) {
    const db = await getDb();
    const doc = await db
      .collection<CollectionDoc<T>>(CONTENT_COLLECTION)
      .findOne({ key: name });
    return doc?.items ?? [];
  }

  return readJsonFile<T[]>(`${name}.json`);
}

export async function saveCollectionItems(
  name: CollectionName,
  items: unknown[]
): Promise<void> {
  if (isMongoEnabled()) {
    const db = await getDb();
    await db.collection<CollectionDoc<unknown>>(CONTENT_COLLECTION).replaceOne(
      { key: name },
      { key: name, items },
      { upsert: true }
    );
    return;
  }

  await writeJsonFile(`${name}.json`, items);
}

export async function loadSiteSettings(): Promise<SiteSettings> {
  if (isMongoEnabled()) {
    const db = await getDb();
    const doc = await db
      .collection<SettingsDoc>(CONTENT_COLLECTION)
      .findOne({ key: "site-settings" });
    if (!doc) {
      throw new Error("Paramètres du site introuvables en base");
    }
    const { key: _, ...settings } = doc;
    return settings;
  }

  return readJsonFile<SiteSettings>("site-settings.json");
}

export async function saveSiteSettings(data: SiteSettings): Promise<void> {
  if (isMongoEnabled()) {
    const db = await getDb();
    await db.collection<SettingsDoc>(CONTENT_COLLECTION).replaceOne(
      { key: "site-settings" },
      { key: "site-settings", ...data },
      { upsert: true }
    );
    return;
  }

  await writeJsonFile("site-settings.json", data);
}
