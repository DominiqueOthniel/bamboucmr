import { LocaleProvider } from "@/i18n/LocaleProvider";
import { getLocale } from "@/i18n/server";

export async function AppProviders({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return <LocaleProvider locale={locale}>{children}</LocaleProvider>;
}
