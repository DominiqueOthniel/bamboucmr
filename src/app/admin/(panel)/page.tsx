import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { COLLECTIONS } from "@/lib/content/collections";
import { getAllNews, getCollection } from "@/lib/content/reader";

export default async function AdminDashboardPage() {
  const [news, stats] = await Promise.all([
    getAllNews(),
    getCollection("stats"),
  ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-bold text-forest">Tableau de bord</h1>
        <p className="mt-2 text-muted">
          Gérez le contenu du site BambouCamer. Les modifications sont visibles immédiatement
          après enregistrement.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-sm text-muted">Actualités publiées</p>
          <p className="mt-1 font-display text-3xl font-bold text-bamboo">
            {news.filter((n) => n.published).length}
          </p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-sm text-muted">Chiffres clés</p>
          <p className="mt-1 font-display text-3xl font-bold text-bamboo">{stats.length}</p>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-5">
          <p className="text-sm text-muted">Collections</p>
          <p className="mt-1 font-display text-3xl font-bold text-bamboo">
            {COLLECTIONS.length + 1}
          </p>
        </div>
      </div>

      <div>
        <h2 className="mb-4 font-display text-xl font-bold text-forest">Accès rapide</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {COLLECTIONS.map((c) => (
            <Link
              key={c.name}
              href={`/admin/${c.name}`}
              className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3.5 transition hover:border-bamboo hover:shadow-sm"
            >
              <div>
                <p className="font-medium text-ink">{c.labelPlural}</p>
                <p className="text-xs text-muted">{c.description}</p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-bamboo" />
            </Link>
          ))}
          <Link
            href="/admin/site-settings"
            className="group flex items-center justify-between rounded-xl border border-line bg-surface px-4 py-3.5 transition hover:border-bamboo hover:shadow-sm"
          >
            <div>
              <p className="font-medium text-ink">Paramètres du site</p>
              <p className="text-xs text-muted">Contact et footer</p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted transition group-hover:translate-x-0.5 group-hover:text-bamboo" />
          </Link>
        </div>
      </div>
    </div>
  );
}
