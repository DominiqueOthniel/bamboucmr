import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/shared/BackToTop";
import { getSiteSettings } from "@/lib/content/reader";
import { getNavTree } from "@/lib/nav";
import { getLocale, getMessages } from "@/i18n/server";
import { localizeItem } from "@/i18n/localize";
import type { SiteSettings } from "@/lib/content/types";

function localizeSettings(settings: SiteSettings, locale: "fr" | "en"): SiteSettings {
  const hero = localizeItem(
    settings.hero as unknown as Record<string, unknown>,
    ["eyebrow", "title", "tagline", "description", "primaryCtaLabel", "secondaryCtaLabel"],
    locale
  ) as unknown as SiteSettings["hero"];
  const footer = localizeItem(
    settings.footer as unknown as Record<string, unknown>,
    ["tagline"],
    locale
  ) as unknown as SiteSettings["footer"];
  return { ...settings, hero: { ...settings.hero, ...hero }, footer: { ...settings.footer, ...footer } };
}

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navItems, settings, messages, locale] = await Promise.all([
    getNavTree(),
    getSiteSettings(),
    getMessages(),
    getLocale(),
  ]);
  const localizedSettings = localizeSettings(settings, locale);

  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-[10px] focus:bg-forest focus:px-4 focus:py-2.5 focus:font-semibold focus:text-white"
      >
        {messages.common.skipToContent}
      </a>
      <Header navItems={navItems} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer settings={localizedSettings} />
      <BackToTop />
    </div>
  );
}
