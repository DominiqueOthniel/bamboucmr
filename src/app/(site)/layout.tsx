import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { BackToTop } from "@/components/shared/BackToTop";
import { getSiteSettings } from "@/lib/content/reader";
import { getNavTree } from "@/lib/nav";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [navItems, settings] = await Promise.all([getNavTree(), getSiteSettings()]);

  return (
    <div className="flex min-h-full flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[200] focus:rounded-[10px] focus:bg-forest focus:px-4 focus:py-2.5 focus:font-semibold focus:text-white"
      >
        Aller au contenu
      </a>
      <Header navItems={navItems} />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer settings={settings} />
      <BackToTop />
    </div>
  );
}
