"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useTransition,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import type { Locale } from "./config";
import { dictionaries, type Messages } from "./messages";

type I18nContextValue = {
  locale: Locale;
  messages: Messages;
  t: (path: string) => string;
  setLocale: (locale: Locale) => void;
  pending: boolean;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function readPath(messages: Messages, path: string): string {
  const parts = path.split(".");
  let cur: unknown = messages;
  for (const part of parts) {
    if (!cur || typeof cur !== "object") return path;
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === "string" ? cur : path;
}

export function LocaleProvider({
  locale,
  children,
}: {
  locale: Locale;
  children: ReactNode;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const messages = dictionaries[locale];

  const setLocale = useCallback(
    (next: Locale) => {
      document.cookie = `bamboucamer_locale=${next}; path=/; max-age=31536000; samesite=lax`;
      document.documentElement.lang = next;
      startTransition(() => {
        router.refresh();
      });
    },
    [router]
  );

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      messages,
      t: (path: string) => readPath(messages, path),
      setLocale,
      pending,
    }),
    [locale, messages, setLocale, pending]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within LocaleProvider");
  }
  return ctx;
}
