"use client";

import Link from "next/link";
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
          className={`fixed inset-y-0 left-0 z-40 w-64 border-r border-line bg-surface transition-transform lg:static lg:translate-x-0 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center border-b border-line px-5">
            <Link href="/admin" className="font-display text-lg font-bold text-forest">
              Bambou<span className="text-bamboo">Camer</span>
              <span className="ml-1 text-xs font-normal text-muted">Admin</span>
            </Link>
          </div>
          <nav className="flex flex-col gap-1 p-3">
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
                  className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    active
                      ? "bg-bamboo/12 text-bamboo"
                      : "text-muted hover:bg-sand hover:text-ink"
                  }`}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="absolute bottom-0 left-0 right-0 border-t border-line p-3">
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium text-muted transition hover:bg-sand hover:text-ink"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </button>
            <Link
              href="/"
              className="mt-1 block rounded-xl px-3 py-2 text-xs text-muted hover:text-bamboo"
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
          <header className="flex h-16 items-center gap-3 border-b border-line bg-surface/80 px-4 backdrop-blur lg:px-8">
            <button
              type="button"
              className="rounded-lg bg-sand p-2 lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </header>
          <main className="flex-1 p-4 lg:p-8">{children}</main>
        </div>
      </div>
    </div>
  );
}
