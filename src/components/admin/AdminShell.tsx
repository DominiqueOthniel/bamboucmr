"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  FileText,
  LayoutDashboard,
  Leaf,
  LogOut,
  Menu,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import { COLLECTIONS } from "@/lib/content/collections";

const icons: Record<string, React.ReactNode> = {
  news: <FileText className="h-4 w-4" />,
  "news-categories": <FileText className="h-4 w-4" />,
  stats: <BarChart3 className="h-4 w-4" />,
  "impact-bars": <BarChart3 className="h-4 w-4" />,
  partners: <Users className="h-4 w-4" />,
  pillars: <Leaf className="h-4 w-4" />,
  solutions: <Leaf className="h-4 w-4" />,
};

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  const nav = [
    { href: "/admin", label: "Tableau de bord", icon: <LayoutDashboard className="h-4 w-4" /> },
    ...COLLECTIONS.map((c) => ({
      href: `/admin/${c.name}`,
      label: c.labelPlural,
      icon: icons[c.name] ?? <FileText className="h-4 w-4" />,
    })),
    {
      href: "/admin/site-settings",
      label: "Paramètres",
      icon: <Settings className="h-4 w-4" />,
    },
  ];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <div className="flex min-h-screen">
        <aside
          className={`fixed inset-y-0 left-0 z-40 flex w-[min(18rem,88vw)] flex-col border-r border-line bg-surface transition-transform lg:static lg:w-64 lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-14 shrink-0 items-center gap-2.5 border-b border-line px-4 sm:h-16 sm:px-5">
            <Image
              src="/logo.jpg"
              alt=""
              width={36}
              height={36}
              className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-bamboo/20"
            />
            <Link href="/admin" className="min-w-0 font-display text-lg font-bold leading-tight text-forest">
              Bambou<span className="text-bamboo">Camer</span>
              <span className="mt-0.5 block text-[0.7rem] font-sans font-normal uppercase tracking-[0.08em] text-muted">
                Admin
              </span>
            </Link>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3 pb-28">
            {nav.map((item) => {
              const active =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex min-h-11 items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-bamboo/12 text-bamboo"
                      : "text-muted hover:bg-sand hover:text-ink"
                  }`}
                >
                  {item.icon}
                  <span className="truncate">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 border-t border-line bg-surface p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <button
              type="button"
              onClick={logout}
              className="flex min-h-11 w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-sand hover:text-ink"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
            <Link
              href="/"
              className="mt-1 block rounded-xl px-3 py-2 text-xs text-muted hover:text-ink"
            >
              Voir le site →
            </Link>
          </div>
        </aside>

        {open && (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/30 lg:hidden"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
          />
        )}

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 flex h-14 items-center gap-3 border-b border-line bg-surface/90 px-3 pt-[env(safe-area-inset-top)] backdrop-blur sm:h-16 sm:px-4 lg:px-8">
            <button
              type="button"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sand lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <div className="flex min-w-0 items-center gap-2.5 lg:hidden">
              <Image
                src="/logo.jpg"
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 shrink-0 rounded-full object-cover ring-1 ring-bamboo/20"
              />
              <p className="truncate text-sm font-medium text-ink">
                Bambou<span className="text-bamboo">Camer</span>
                <span className="ml-1.5 font-normal text-muted">Admin</span>
              </p>
            </div>
          </header>
          <main className="min-w-0 flex-1 overflow-x-clip p-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-4 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
