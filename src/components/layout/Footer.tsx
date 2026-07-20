"use client";

import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/i18n/LocaleProvider";
import type { SiteSettings } from "@/lib/content/types";

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M14 9h3V6h-3c-2 0-3 1-3 3v2H9v3h2v7h3v-7h2.5l.5-3H14V9Z",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    path: "M6.5 8A1.5 1.5 0 1 0 5 6.5 1.5 1.5 0 0 0 6.5 8ZM5 10h3v9H5v-9Zm5 0h3v1.3c.5-.8 1.6-1.5 3-1.5 2.2 0 3 1.4 3 3.8V19h-3v-4.8c0-1.1-.4-1.8-1.4-1.8s-1.6.7-1.6 1.8V19h-3v-9Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm5.2-.9a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    path: "M22 12c0-2.4-.2-3.6-.6-4.3a2.6 2.6 0 0 0-1.8-1.3C18 6 12 6 12 6s-6 0-7.6.4A2.6 2.6 0 0 0 2.6 7.7C2.2 8.4 2 9.6 2 12s.2 3.6.6 4.3a2.6 2.6 0 0 0 1.8 1.3C6 18 12 18 12 18s6 0 7.6-.4a2.6 2.6 0 0 0 1.8-1.3c.4-.7.6-1.9.6-4.3Zm-12 3V9l5 3-5 3Z",
  },
];

const linkHover =
  "transition-colors hover:text-white focus-visible:text-white";

export function Footer({ settings }: { settings: SiteSettings }) {
  const { t } = useI18n();

  return (
    <footer className="on-dark bg-forest text-[#C7D3C1]">
      <div className="container-site pb-8 pt-14 lg:pt-20">
        <div className="grid gap-9 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.4fr]">
          <div>
            <Logo dark />
            <p className="mt-4 max-w-[34ch] text-[0.92rem]">{settings.footer.tagline}</p>
            <div className="mt-5 flex gap-2.5">
              {socials.map(({ label, href, path }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="btn-cta grid h-10 w-10 place-items-center rounded-[11px] bg-white/8 text-white transition hover:-translate-y-0.5 hover:bg-white/20"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d={path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 font-sans text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-white">
              {t("footer.navigation")}
            </h4>
            <ul className="space-y-2.5 text-[0.92rem]">
              <li><Link href="/apropos" className={linkHover}>{t("footer.about")}</Link></li>
              <li><Link href="/objectifs" className={linkHover}>{t("footer.goals")}</Link></li>
              <li><Link href="/solutions" className={linkHover}>{t("footer.solutions")}</Link></li>
              <li><Link href="/contact" className={linkHover}>{t("footer.contact")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-sans text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-white">
              {t("footer.resources")}
            </h4>
            <ul className="space-y-2.5 text-[0.92rem]">
              <li><Link href="/actualites" className={linkHover}>{t("footer.news")}</Link></li>
              <li><Link href="/impact" className={linkHover}>{t("footer.impact")}</Link></li>
              <li><Link href="/faq" className={linkHover}>{t("footer.faq")}</Link></li>
              <li><Link href="/apropos/association" className={linkHover}>{t("footer.associationStartup")}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-sans text-[0.82rem] font-semibold uppercase tracking-[0.12em] text-white">
              {t("footer.joinUs")}
            </h4>
            <ul className="space-y-3 text-[0.9rem]">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
                {settings.contact.address}
              </li>
              <li className="flex gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
                <a href={`tel:${settings.contact.phone.replace(/\s/g, "")}`} className={linkHover}>
                  {settings.contact.phone}
                </a>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-white/55" />
                <a href={`mailto:${settings.contact.email}`} className={linkHover}>
                  {settings.contact.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-11 flex flex-col gap-4 border-t border-white/10 pt-6 text-[0.85rem] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <span className="leading-relaxed">{t("footer.copyright")}</span>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-5">
            <Link href="/mentions-legales" className={linkHover}>
              {t("footer.legal")}
            </Link>
            <Link href="/confidentialite" className={linkHover}>
              {t("footer.privacy")}
            </Link>
            <Link href="/conditions" className={linkHover}>
              {t("footer.terms")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
