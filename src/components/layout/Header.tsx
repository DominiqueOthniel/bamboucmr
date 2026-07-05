"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { navLinks } from "@/lib/data";

export function Header() {
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
      className={`sticky top-0 z-50 border-b transition-[background,border-color,box-shadow] duration-300 ${
        scrolled
          ? "border-line bg-paper/85 shadow-[0_8px_30px_-22px_rgba(18,48,28,.5)] backdrop-blur-xl"
          : "border-transparent bg-paper/70 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex h-[72px] max-w-[1160px] items-center gap-7 px-5 sm:px-8 lg:px-16">
        <Logo />

        <nav
          className="ml-auto hidden items-center gap-1 lg:flex"
          aria-label="Navigation principale"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`relative rounded-[10px] px-3.5 py-2 text-[0.94rem] font-medium transition-colors ${
                isActive(link.href)
                  ? "text-bamboo"
                  : "text-ink hover:bg-sand"
              }`}
            >
              {link.label}
              {isActive(link.href) && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute inset-x-3.5 bottom-1 h-0.5 rounded-full bg-shoot-deep"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 30 }
                  }
                />
              )}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          className="ml-3 hidden items-center gap-2 rounded-xl bg-forest px-5 py-2.5 text-[0.94rem] font-semibold text-white transition hover:-translate-y-0.5 hover:bg-bamboo hover:shadow-[0_12px_24px_-12px_rgba(47,107,60,.7)] lg:inline-flex"
        >
          Devenir partenaire
          <ArrowRight className="h-4 w-4" />
        </Link>

        <button
          type="button"
          className="ml-auto flex h-11 w-11 items-center justify-center rounded-[11px] bg-sand lg:hidden"
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
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="border-b border-line bg-surface px-5 pb-6 pt-2 shadow-lg lg:hidden"
          >
            <nav className="flex flex-col gap-1" aria-label="Menu mobile">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={`block rounded-xl px-4 py-3 text-base font-medium ${
                      isActive(link.href)
                        ? "bg-sand text-bamboo"
                        : "text-ink hover:bg-sand/70"
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <Link
                href="/contact"
                className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-5 py-3 font-semibold text-white"
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
