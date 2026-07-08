import "server-only";

import { readFile, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { unstable_noStore as noStore } from "next/cache";
import type {
  AboutQuestionItem,
  CollectionItemMap,
  CollectionName,
  ImpactBarItem,
  NavLinkItem,
  NewsItem,
  PartnerItem,
  PillarItem,
  RseItem,
  SiteSettings,
  SolutionItem,
  StatItem,
} from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

async function readJson<T>(filename: string): Promise<T> {
  noStore();
  const raw = await readFile(path.join(CONTENT_DIR, filename), "utf-8");
  return JSON.parse(raw) as T;
}

export async function getNews(): Promise<NewsItem[]> {
  const items = await readJson<NewsItem[]>("news.json");
  return items.filter((n) => n.published);
}

export async function getAllNews(): Promise<NewsItem[]> {
  return readJson<NewsItem[]>("news.json");
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  const items = await readJson<NewsItem[]>("news.json");
  const item = items.find((n) => n.id === id);
  if (!item || !item.published) return null;
  return item;
}

export async function getStats(): Promise<StatItem[]> {
  return readJson<StatItem[]>("stats.json");
}

export async function getImpactBars(): Promise<ImpactBarItem[]> {
  return readJson<ImpactBarItem[]>("impact-bars.json");
}

export async function getPartners(): Promise<PartnerItem[]> {
  const items = await readJson<PartnerItem[]>("partners.json");
  return [...items].sort((a, b) => a.order - b.order);
}

export async function getAboutQuestions(): Promise<AboutQuestionItem[]> {
  return readJson<AboutQuestionItem[]>("about-questions.json");
}

export async function getNavLinks(): Promise<NavLinkItem[]> {
  return readJson<NavLinkItem[]>("nav-links.json");
}

export async function getPillars(): Promise<PillarItem[]> {
  return readJson<PillarItem[]>("pillars.json");
}

export async function getSolutions(): Promise<SolutionItem[]> {
  return readJson<SolutionItem[]>("solutions.json");
}

export async function getRseItems(): Promise<RseItem[]> {
  return readJson<RseItem[]>("rse-items.json");
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return readJson<SiteSettings>("site-settings.json");
}

export async function getCollection<T extends CollectionName>(
  name: T
): Promise<CollectionItemMap[T][]> {
  return readJson<CollectionItemMap[T][]>(`${name}.json`);
}

export async function getCollectionItem<T extends CollectionName>(
  name: T,
  id: string
): Promise<CollectionItemMap[T] | null> {
  const items = await getCollection(name);
  return items.find((item) => item.id === id) ?? null;
}
