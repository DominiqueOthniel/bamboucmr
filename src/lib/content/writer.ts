import "server-only";

import { revalidatePath } from "next/cache";
import { saveCollectionItems, saveSiteSettings } from "./store";
import type { CollectionName, SiteSettings } from "./types";
import { COLLECTION_NAMES } from "./collections";

const REVALIDATE_PATHS: Record<CollectionName, string[]> = {
  news: ["/", "/actualites"],
  stats: ["/"],
  "impact-bars": ["/", "/impact"],
  partners: ["/"],
  "about-questions": ["/", "/apropos"],
  "nav-links": [],
  pillars: ["/", "/objectifs"],
  solutions: ["/", "/solutions"],
  "rse-items": ["/solutions"],
};

function isCollectionName(name: string): name is CollectionName {
  return (COLLECTION_NAMES as readonly string[]).includes(name);
}

function revalidateAfterCollectionWrite(name: CollectionName) {
  for (const route of REVALIDATE_PATHS[name]) {
    revalidatePath(route);
  }
  if (name === "nav-links") {
    revalidatePath("/", "layout");
  }
  if (name === "news") {
    revalidatePath("/actualites", "layout");
  }
}

export async function writeCollection(
  name: CollectionName,
  data: unknown
): Promise<void> {
  if (!isCollectionName(name)) {
    throw new Error("Collection invalide");
  }
  await saveCollectionItems(name, data as unknown[]);
  revalidateAfterCollectionWrite(name);
}

export async function writeSiteSettings(data: SiteSettings): Promise<void> {
  await saveSiteSettings(data);
  revalidatePath("/", "layout");
  revalidatePath("/contact");
}

export function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}
