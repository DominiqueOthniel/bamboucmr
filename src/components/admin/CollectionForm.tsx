"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { CollectionMeta } from "@/lib/content/collections";

type Props = {
  meta: CollectionMeta;
  initialData?: Record<string, unknown>;
  isNew?: boolean;
};

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return "";
  }, obj);
}

function setNestedValue(
  obj: Record<string, unknown>,
  path: string,
  value: unknown
): Record<string, unknown> {
  const keys = path.split(".");
  const result = { ...obj };
  let cur: Record<string, unknown> = result;
  for (let i = 0; i < keys.length - 1; i++) {
    const k = keys[i];
    cur[k] = { ...(cur[k] as Record<string, unknown> | undefined) };
    cur = cur[k] as Record<string, unknown>;
  }
  cur[keys[keys.length - 1]] = value;
  return result;
}

export function CollectionForm({ meta, initialData = {}, isNew }: Props) {
  const router = useRouter();
  const [data, setData] = useState<Record<string, unknown>>(initialData);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const isSettings = meta.name === "site-settings";
  const id = initialData.id as string | undefined;

  function updateField(key: string, raw: string | boolean | number) {
    if (key.includes(".")) {
      setData((prev) => setNestedValue(prev, key, raw));
    } else {
      setData((prev) => ({ ...prev, [key]: raw }));
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const url = isSettings
      ? "/api/content/site-settings"
      : isNew
        ? `/api/content/${meta.name}`
        : `/api/content/${meta.name}/${id}`;

    const method = isNew ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setError(body.error ?? "Enregistrement impossible");
        return;
      }

      if (isSettings) {
        router.refresh();
        setSuccess("Modifications enregistrées.");
      } else {
        router.push(`/admin/${meta.name}`);
      }
    } catch {
      setError("Erreur réseau. Réessayez.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold text-forest">
          {isNew ? `Nouveau : ${meta.label}` : `Modifier : ${meta.label}`}
        </h1>
        <p className="mt-1 text-sm text-muted">{meta.description}</p>
      </div>

      <div className="space-y-4 rounded-2xl border border-line bg-surface p-5 sm:p-6">
        {meta.fields.map((field) => {
          const value = field.key.includes(".")
            ? getNestedValue(data, field.key)
            : data[field.key];

          const common =
            "w-full rounded-xl border border-line bg-paper px-4 py-2.5 text-sm outline-none focus:border-bamboo focus:ring-2 focus:ring-bamboo/20";

          return (
            <div key={field.key}>
              <label className="mb-1.5 block text-sm font-medium text-ink">
                {field.label}
                {field.required && <span className="text-red-500"> *</span>}
              </label>

              {field.type === "textarea" && (
                <textarea
                  className={`${common} min-h-[100px] resize-y`}
                  value={String(value ?? "")}
                  required={field.required}
                  onChange={(e) => updateField(field.key, e.target.value)}
                />
              )}

              {field.type === "select" && (
                <select
                  className={common}
                  value={String(value ?? "")}
                  required={field.required}
                  onChange={(e) => updateField(field.key, e.target.value)}
                >
                  <option value="">Choisir…</option>
                  {field.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}

              {field.type === "boolean" && (
                <label className="inline-flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(value)}
                    onChange={(e) => updateField(field.key, e.target.checked)}
                    className="h-4 w-4 rounded border-line text-bamboo"
                  />
                  Activé
                </label>
              )}

              {field.type === "number" && (
                <input
                  type="number"
                  className={common}
                  value={value === undefined || value === null ? "" : Number(value)}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  required={field.required}
                  onChange={(e) =>
                    updateField(field.key, e.target.value === "" ? 0 : Number(e.target.value))
                  }
                />
              )}

              {(field.type === "text" || field.type === "url") && (
                <input
                  type={field.type === "url" ? "url" : "text"}
                  className={common}
                  value={String(value ?? "")}
                  required={field.required}
                  onChange={(e) => updateField(field.key, e.target.value)}
                />
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      {success && (
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">{success}</p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-bamboo disabled:opacity-60"
        >
          {loading ? "Enregistrement…" : "Enregistrer"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="rounded-xl border border-line bg-surface px-5 py-2.5 text-sm font-medium hover:bg-sand"
        >
          Annuler
        </button>
      </div>
    </form>
  );
}
