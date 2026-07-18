"use client";

import Link from "next/link";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CollectionMeta } from "@/lib/content/collections";

type Props = {
  meta: CollectionMeta;
  items: Record<string, unknown>[];
};

export function CollectionTable({ meta, items }: Props) {
  const router = useRouter();
  const [deleting, setDeleting] = useState<string | null>(null);

  async function remove(id: string) {
    if (!confirm("Supprimer cet élément ?")) return;
    setDeleting(id);
    try {
      await fetch(`/api/content/${meta.name}/${id}`, { method: "DELETE" });
      router.refresh();
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-bold text-forest">{meta.labelPlural}</h1>
          <p className="mt-1 text-sm text-muted">{meta.description}</p>
        </div>
        <Link
          href={`/admin/${meta.name}/new`}
          className="btn-cta inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-white sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Ajouter
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-line bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead className="border-b border-line bg-sand/50 text-xs uppercase tracking-wide text-muted">
              <tr>
                {meta.listColumns.map((col) => (
                  <th key={col} className="px-4 py-3 font-semibold">
                    {col}
                  </th>
                ))}
                <th className="px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && (
                <tr>
                  <td
                    colSpan={meta.listColumns.length + 1}
                    className="px-4 py-8 text-center text-muted"
                  >
                    Aucun élément. Cliquez sur Ajouter pour commencer.
                  </td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={String(item.id)} className="border-b border-line last:border-0">
                  {meta.listColumns.map((col) => (
                    <td key={col} className="max-w-[280px] truncate px-4 py-3">
                      {col === "published"
                        ? item[col]
                          ? "Oui"
                          : "Non"
                        : String(item[col] ?? "")}
                    </td>
                  ))}
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/admin/${meta.name}/${item.id}`}
                        className="inline-flex items-center gap-1 rounded-lg bg-sand px-2.5 py-1.5 text-xs font-medium hover:bg-sand-2 hover:text-ink"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                        Modifier
                      </Link>
                      <button
                        type="button"
                        disabled={deleting === item.id}
                        onClick={() => remove(String(item.id))}
                        className="inline-flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100 disabled:opacity-50"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        {deleting === item.id ? "…" : "Suppr."}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
