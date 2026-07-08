import "server-only";

import { writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import type { CollectionName, SiteSettings } from "./types";
import { COLLECTION_NAMES } from "./collections";

const CONTENT_DIR = path.join(process.cwd(), "content");

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
}

export async function writeCollection(
  name: CollectionName,
  data: unknown
): Promise<void> {
  if (!isCollectionName(name)) {
    throw new Error("Collection invalide");
  }
  await writeFile(
    path.join(CONTENT_DIR, `${name}.json`),
    `${JSON.stringify(data, null, 2)}\n`,
    "utf-8"
  );
  revalidateAfterCollectionWrite(name);
}

export async function writeSiteSettings(data: SiteSettings): Promise<void> {
  await writeFile(
    path.join(CONTENT_DIR, "site-settings.json"),
    `${JSON.stringify(data, null, 2)}\n`,
    "utf-8"
  );
  revalidatePath("/", "layout");
  revalidatePath("/contact");
}

export function newId(prefix: string): string {
  return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
}
