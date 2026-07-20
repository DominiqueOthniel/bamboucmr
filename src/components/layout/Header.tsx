"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { useI18n } from "@/i18n/LocaleProvider";
import type { NavItem } from "@/lib/nav";
import { tweenFast } from "@/lib/motion";

export function Header({ navItems }: { navItems: NavItem[] }) {
  const { t } = useI18n();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState<string | null>(null);
  const [hash, setHash] = useState("");
  const reduce = useReducedMotion();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash.replace(/^#/, ""));
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  useEffect(() => {
    setOpen(false);
    setDesktopOpen(null);
    setMobileOpen(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!desktopOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDesktopOpen(null);
    };
    const onPointer = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setDesktopOpen(null);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onPointer);
    };
  }, [desktopOpen]);

  /** Surligne uniquement le lien réellement courant (pas le parent /apropos sur /apropos/association). */
  const isActive = (href: string, siblingHrefs: string[] = []) => {
    const [path, linkHash] = href.split("#");
    if (path === "/") return pathname === "/";

    // Liens d'ancre: page exacte + hash
    if (linkHash !== undefined) {
      return pathname === path && hash === linkHash;
    }

    if (pathname === path) return true;

    // "Vue d'ensemble" ne reste pas active sur une sous-page
    const isOverview = siblingHrefs.some((sib) => {
      const sibPath = sib.split("#")[0];
      return sibPath !== path && sibPath.startsWith(`${path}/`);
    });
    if (isOverview) return false;

    return pathname.startsWith(`${path}/`);
  };

  const isGroupActive = (item: NavItem) => {
    const sibs = item.children?.map((c) => c.href) ?? [];
    if (isActive(item.href, sibs)) return true;
    return item.children?.some((c) => isActive(c.href, sibs)) ?? false;
  };

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
          ref={navRef}
          className="ml-auto hidden items-center gap-0.5 lg:flex"
          aria-label="Navigation principale"
        >
          {navItems.map((item) =>
            item.children?.length ? (
              <DesktopDropdown
                key={item.id}
                item={item}
                active={isGroupActive(item)}
                open={desktopOpen === item.id}
                reduce={!!reduce}
                onOpen={() => setDesktopOpen(item.id)}
                onClose={() => setDesktopOpen(null)}
                onToggle={() =>
                  setDesktopOpen((cur) => (cur === item.id ? null : item.id))
                }
                isActive={isActive}
              />
            ) : (
              <Link
                key={item.id}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-[var(--radius-sm)] px-2.5 py-2 text-[0.88rem] font-medium transition-colors xl:px-3.5 xl:text-[0.9rem] ${
                  isActive(item.href)
                    ? "text-forest"
                    : "text-ink/85 hover:bg-sand/80 hover:text-ink"
                }`}
              >
                {item.label}
                {isActive(item.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-2.5 bottom-1 h-px rounded-full bg-forest xl:inset-x-3"
                    transition={reduce ? { duration: 0 } : tweenFast}
                  />
                )}
              </Link>
            )
          )}
        </nav>

        <LanguageSwitcher className="hidden lg:inline-flex" />

        <Link
          href="/contact"
          className="btn-cta hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-[var(--radius-sm)] bg-forest px-4 py-2.5 text-[0.88rem] font-semibold text-white transition lg:ml-2 lg:inline-flex xl:px-5"
        >
          <span className="hidden xl:inline">{t("nav.partnerCta")}</span>
          <span className="xl:hidden">{t("nav.partnerCtaShort")}</span>
          <ArrowRight className="h-4 w-4" />
        </Link>

        <button
          type="button"
          className="ml-auto flex h-11 w-11 shrink-0 items-center justify-center rounded-[var(--radius-sm)] bg-sand lg:ml-0 lg:hidden"
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
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
              aria-label={t("nav.openMenu")}
            >
              <div className="mb-2 px-1">
                <LanguageSwitcher />
              </div>
              {navItems.map((item) =>
                item.children?.length ? (
                  <MobileGroup
                    key={item.id}
                    item={item}
                    active={isGroupActive(item)}
                    open={mobileOpen === item.id}
                    onToggle={() =>
                      setMobileOpen((cur) => (cur === item.id ? null : item.id))
                    }
                    isActive={isActive}
                  />
                ) : (
                  <Link
                    key={item.id}
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`block rounded-[var(--radius-md)] px-4 py-3.5 text-base font-medium ${
                      isActive(item.href)
                        ? "bg-sand text-forest"
                        : "text-ink active:bg-sand/70"
                    }`}
                  >
                    {item.label}
                  </Link>
                )
              )}
              <Link
                href="/contact"
                className="btn-cta mt-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-forest px-5 py-3 font-semibold text-white"
              >
                {t("nav.partnerCta")}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function DesktopDropdown({
  item,
  active,
  open,
  reduce,
  onOpen,
  onClose,
  onToggle,
  isActive,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  reduce: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  isActive: (href: string, siblings?: string[]) => boolean;
}) {
  const panelId = useId();
  const children = item.children ?? [];
  const siblingHrefs = children.map((c) => c.href);

  return (
    <div
      className="relative"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={panelId}
        onClick={onToggle}
        className={`relative inline-flex items-center gap-1 whitespace-nowrap rounded-[var(--radius-sm)] px-2.5 py-2 text-[0.88rem] font-medium transition-colors xl:px-3.5 xl:text-[0.9rem] ${
          active || open
            ? "text-forest"
            : "text-ink/85 hover:bg-sand/80 hover:text-ink"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
        {active && (
          <motion.span
            layoutId="nav-underline"
            className="absolute inset-x-2.5 bottom-1 h-px rounded-full bg-forest xl:inset-x-3"
            transition={reduce ? { duration: 0 } : tweenFast}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            role="menu"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: 4 }}
            transition={tweenFast}
            className="absolute left-1/2 top-full z-50 w-[min(20rem,calc(100vw-2rem))] -translate-x-1/2 pt-2"
          >
            <div className="max-h-[min(70vh,28rem)] overflow-y-auto overflow-hidden rounded-[14px] border border-line bg-surface py-2 shadow-[var(--shadow-card)]">
              <Link
                href={item.href}
                role="menuitem"
                className="mx-2 mb-1 block rounded-[10px] px-3 py-2.5 text-[0.82rem] font-semibold text-forest transition hover:bg-sand focus-visible:bg-sand focus-visible:outline-none"
                onClick={onClose}
              >
                Voir tout · {item.label}
              </Link>
              <div className="mx-2 mb-1 h-px bg-line" />
              {children.map((child) => {
                const childActive = isActive(child.href, siblingHrefs);
                return (
                  <Link
                    key={child.href + child.label}
                    href={child.href}
                    role="menuitem"
                    aria-current={childActive ? "page" : undefined}
                    className={`mx-2 block rounded-[10px] px-3 py-2.5 transition hover:bg-sand focus-visible:bg-sand focus-visible:outline-none ${
                      childActive ? "bg-sand/80" : "bg-transparent"
                    }`}
                    onClick={onClose}
                  >
                    <span className="block text-[0.9rem] font-medium text-ink">
                      {child.label}
                    </span>
                    {child.description && (
                      <span className="mt-0.5 block text-[0.78rem] text-muted">
                        {child.description}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MobileGroup({
  item,
  active,
  open,
  onToggle,
  isActive,
}: {
  item: NavItem;
  active: boolean;
  open: boolean;
  onToggle: () => void;
  isActive: (href: string, siblings?: string[]) => boolean;
}) {
  const panelId = useId();
  const children = item.children ?? [];
  const siblingHrefs = children.map((c) => c.href);

  return (
    <div className="rounded-[var(--radius-md)]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        className={`flex w-full items-center justify-between rounded-[var(--radius-md)] px-4 py-3.5 text-left text-base font-medium ${
          active ? "bg-sand text-forest" : "text-ink"
        }`}
      >
        {item.label}
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden
        />
      </button>
      {open && (
        <div id={panelId} className="mb-1 space-y-0.5 pb-2 pl-3">
          <Link
            href={item.href}
            className="block rounded-[10px] px-3 py-2.5 text-sm font-semibold text-forest active:bg-sand/70"
          >
            Voir tout
          </Link>
          {children.map((child) => {
            const childActive = isActive(child.href, siblingHrefs);
            return (
              <Link
                key={child.href + child.label}
                href={child.href}
                aria-current={childActive ? "page" : undefined}
                className={`block rounded-[10px] px-3 py-2.5 text-sm ${
                  childActive
                    ? "bg-sand/80 font-medium text-forest"
                    : "bg-transparent text-muted active:bg-sand/70"
                }`}
              >
                {child.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
