"use client";

import { useI18n } from "@/i18n/LocaleProvider";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, pending, t } = useI18n();

  const options: Locale[] = ["fr", "en"];

  return (
    <div
      className={`inline-flex items-center rounded-[var(--radius-sm)] border border-line bg-surface p-0.5 ${className}`}
      role="group"
      aria-label={`${t("lang.switchTo")} FR / EN`}
    >
      {options.map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            disabled={pending || active}
            onClick={() => setLocale(code)}
            className={`min-h-8 min-w-9 rounded-[5px] px-2 text-[0.78rem] font-semibold transition ${
              active
                ? "bg-forest text-white"
                : "text-muted hover:bg-sand hover:text-ink"
            }`}
            aria-pressed={active}
          >
            {t(`lang.${code}`)}
          </button>
        );
      })}
    </div>
  );
}
