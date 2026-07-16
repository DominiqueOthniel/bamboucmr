import "server-only";

import { unstable_noStore as noStore } from "next/cache";
import {
  loadCollectionItems,
  loadSiteSettings,
} from "./store";
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

export async function getNews(): Promise<NewsItem[]> {
  noStore();
  const items = await loadCollectionItems<NewsItem>("news");
  return items.filter((n) => n.published);
}

export async function getAllNews(): Promise<NewsItem[]> {
  noStore();
  return loadCollectionItems<NewsItem>("news");
}

export async function getNewsById(id: string): Promise<NewsItem | null> {
  noStore();
  const items = await loadCollectionItems<NewsItem>("news");
  const item = items.find((n) => n.id === id);
  if (!item || !item.published) return null;
  return item;
}

export async function getStats(): Promise<StatItem[]> {
  noStore();
  return loadCollectionItems<StatItem>("stats");
}

export async function getImpactBars(): Promise<ImpactBarItem[]> {
  noStore();
  return loadCollectionItems<ImpactBarItem>("impact-bars");
}

export async function getPartners(): Promise<PartnerItem[]> {
  noStore();
  const items = await loadCollectionItems<PartnerItem>("partners");
  return [...items].sort((a, b) => a.order - b.order);
}

export async function getAboutQuestions(): Promise<AboutQuestionItem[]> {
  noStore();
  return loadCollectionItems<AboutQuestionItem>("about-questions");
}

export async function getNavLinks(): Promise<NavLinkItem[]> {
  noStore();
  return loadCollectionItems<NavLinkItem>("nav-links");
}

export async function getPillars(): Promise<PillarItem[]> {
  noStore();
  const items = await loadCollectionItems<PillarItem>("pillars");
  return items.map((item) => ({
    ...item,
    body: item.body || item.description,
  }));
}

export async function getPillarById(id: string): Promise<PillarItem | null> {
  noStore();
  const items = await loadCollectionItems<PillarItem>("pillars");
  const item = items.find((entry) => entry.id === id);
  if (!item) return null;
  return { ...item, body: item.body || item.description };
}

export async function getSolutions(): Promise<SolutionItem[]> {
  noStore();
  const items = await loadCollectionItems<SolutionItem>("solutions");
  return items.map((item) => ({
    ...item,
    body: item.body || item.description,
  }));
}

export async function getSolutionById(id: string): Promise<SolutionItem | null> {
  noStore();
  const items = await loadCollectionItems<SolutionItem>("solutions");
  const item = items.find((entry) => entry.id === id);
  if (!item) return null;
  return { ...item, body: item.body || item.description };
}

export async function getRseItems(): Promise<RseItem[]> {
  noStore();
  return loadCollectionItems<RseItem>("rse-items");
}

export async function getSiteSettings(): Promise<SiteSettings> {
  noStore();
  return loadSiteSettings();
}

export async function getCollection<T extends CollectionName>(
  name: T
): Promise<CollectionItemMap[T][]> {
  noStore();
  return loadCollectionItems<CollectionItemMap[T]>(name);
}

export async function getCollectionItem<T extends CollectionName>(
  name: T,
  id: string
): Promise<CollectionItemMap[T] | null> {
  const items = await getCollection(name);
  return items.find((item) => item.id === id) ?? null;
}
