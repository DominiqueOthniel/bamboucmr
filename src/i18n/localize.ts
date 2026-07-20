import type { Locale } from "./config";

/** Pick localized CMS field: uses `fieldEn` when locale is en. */
export function pickLocalized<T extends Record<string, unknown>>(
  item: T,
  field: keyof T & string,
  locale: Locale
): string {
  if (locale === "en") {
    const enKey = `${field}En` as keyof T;
    const enVal = item[enKey];
    if (typeof enVal === "string" && enVal.trim()) return enVal;
  }
  const val = item[field];
  return typeof val === "string" ? val : "";
}

/** Overwrite selected string fields with their localized values. */
export function localizeItem<T extends Record<string, unknown>>(
  item: T,
  fields: (keyof T & string)[],
  locale: Locale
): T {
  if (locale === "fr") return item;
  const next = { ...item };
  for (const field of fields) {
    const localized = pickLocalized(item, field, locale);
    if (localized) (next as Record<string, unknown>)[field] = localized;
  }
  return next;
}

export function localizeList<T extends Record<string, unknown>>(
  items: T[],
  fields: (keyof T & string)[],
  locale: Locale
): T[] {
  return items.map((item) => localizeItem(item, fields, locale));
}
