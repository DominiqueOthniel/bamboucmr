"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import type { NavLinkItem } from "@/lib/content/types";
import { tweenFast } from "@/lib/motion";

export function Header({ navLinks }: { navLinks: NavLinkItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-50 border-b pt-[env(safe-area-inset-top)] transition-[background,border-color,box-shadow,backdrop-filter] duration-300 ${
        scrolled
          ? "border-line/80 bg-paper/92 shadow-[0_10px_40px_-28px_rgba(12,36,22,.45)] backdrop-blur-xl"
          : "border-transparent bg-paper/75 backdrop-blur-md"
      }`}
    >
      <div className="container-site flex h-14 items-center gap-2 sm:h-[70px] sm:gap-4">
        <Logo hideTextOnMobile className="min-w-0 shrink" />

        <nav
          className="ml-auto hidden items-center gap-0.5 lg:flex"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative whitespace-nowrap rounded-[var(--radius-sm)] px-2.5 py-2 text-[0.88rem] font-medium transition-colors xl:px-3.5 xl:text-[0.9rem] ${
                isActive(link.href)
                  ? "text-bamboo"
                  : "text-ink/85 hover:bg-sand/80 hover:text-ink"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-2.5 bottom-1 h-px rounded-full bg-bamboo xl:inset-x-3"
                  transition={reduce ? { duration: 0 } : tweenFast}
                />
              )}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] bg-forest px-4 py-2.5 text-[0.88rem] font-semibold text-white transition hover:bg-bamboo lg:ml-2 lg:inline-flex xl:px-5"
        >
          <span className="hidden xl:inline">Devenir partenaire</span>
          <span className="xl:hidden">Partenaire</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        <button
          type="button"
          className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-sand lg:ml-0 lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={tweenFast}
            className="max-h-[min(80vh,560px)] overflow-y-auto border-b border-line bg-surface lg:hidden"
          >
            <nav
              className="container-site flex flex-col gap-1 py-3 pb-[max(1rem,env(safe-area-inset-bottom))]"
              aria-label="Menu mobile"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`block rounded-[var(--radius-md)] px-4 py-3.5 text-base font-medium ${
                    isActive(link.href)
                      ? "bg-sand text-bamboo"
                      : "text-ink active:bg-sand/70"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-forest px-5 py-3 font-semibold text-white"
              >
                Devenir partenaire
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
