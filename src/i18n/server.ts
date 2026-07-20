import { cookies, headers } from "next/headers";
import {
  LOCALE_COOKIE,
  defaultLocale,
  isLocale,
  type Locale,
} from "./config";
import { dictionaries, type Messages } from "./messages";

export async function getLocale(): Promise<Locale> {
  const jar = await cookies();
  const fromCookie = jar.get(LOCALE_COOKIE)?.value;
  if (isLocale(fromCookie)) return fromCookie;

  const accept = (await headers()).get("accept-language") ?? "";
  if (accept.toLowerCase().startsWith("en")) return "en";
  return defaultLocale;
}

export async function getMessages(): Promise<Messages> {
  const locale = await getLocale();
  return dictionaries[locale];
}

export function tPath(messages: Messages, path: string): string {
  const parts = path.split(".");
  let cur: unknown = messages;
  for (const part of parts) {
    if (!cur || typeof cur !== "object") return path;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === "string" ? cur : path;
}
