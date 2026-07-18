"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { CollectionMeta, FieldDef } from "@/lib/content/collections";

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

function ImageField({
  field,
  value,
  common,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  common: string;
  onChange: (next: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const src = String(value ?? "");

  async function onFileChange(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setUploadError("");

    try {
      const body = new FormData();
      body.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body });
      const payload = (await res.json()) as { url?: string; error?: string };

      if (!res.ok || !payload.url) {
        setUploadError(payload.error ?? "Upload impossible");
        return;
      }

      onChange(payload.url);
    } catch {
      setUploadError("Erreur réseau pendant l'upload.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt="Aperçu"
          className="h-36 w-full rounded-xl border border-line bg-sand object-cover"
        />
      ) : (
        <div className="flex h-36 items-center justify-center rounded-xl border border-dashed border-line bg-sand text-sm text-muted">
          Aucune image
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
          className="btn-cta rounded-xl bg-forest px-4 py-2 text-sm font-semibold text-white disabled:opacity-60"
        >
          {uploading ? "Upload…" : "Choisir depuis l'appareil"}
        </button>
        {src && (
          <button
            type="button"
            disabled={uploading}
            onClick={() => onChange("")}
            className="rounded-xl border border-line bg-surface px-4 py-2 text-sm font-medium hover:bg-sand disabled:opacity-60"
          >
            Retirer
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        className="hidden"
        onChange={(e) => void onFileChange(e.target.files?.[0])}
      />

      <div>
        <p className="mb-1 text-xs text-muted">
          Ou collez une URL / un chemin existant
        </p>
        <input
          type="text"
          className={common}
          value={src}
          required={field.required}
          placeholder="/news/exemple.jpg ou https://…"
          onChange={(e) => onChange(e.target.value)}
        />
      </div>

      {uploadError && <p className="text-sm text-red-700">{uploadError}</p>}
    </div>
  );
}

function DynamicSelect({
  field,
  value,
  common,
  onChange,
}: {
  field: FieldDef;
  value: unknown;
  common: string;
  onChange: (next: string) => void;
}) {
  const [options, setOptions] = useState<string[]>(field.options ?? []);
  const [loading, setLoading] = useState(Boolean(field.optionsFrom));
  const [creating, setCreating] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [error, setError] = useState("");
  const current = String(value ?? "");

  useEffect(() => {
    if (!field.optionsFrom) {
      setOptions(field.options ?? []);
      setLoading(false);
      return;
    }

    let cancelled = false;
    const labelKey = field.optionLabelKey ?? "label";

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/content/${field.optionsFrom}`);
        if (!res.ok) throw new Error("Chargement impossible");
        const items = (await res.json()) as Record<string, unknown>[];
        if (cancelled) return;
        const labels = items
          .map((item) => String(item[labelKey] ?? ""))
          .filter(Boolean)
          .sort((a, b) => a.localeCompare(b, "fr"));
        setOptions(labels);
      } catch {
        if (!cancelled) setError("Impossible de charger les options.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [field.optionsFrom, field.optionLabelKey, field.options]);

  async function createOption() {
    const label = newValue.trim();
    if (!label || !field.optionsFrom) return;

    setCreating(true);
    setError("");
    try {
      const res = await fetch(`/api/content/${field.optionsFrom}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          [field.optionLabelKey ?? "label"]: label,
          order: options.length + 1,
        }),
      });
      if (!res.ok) {
        const body = (await res.json()) as { error?: string };
        setError(body.error ?? "Création impossible");
        return;
      }
      setOptions((prev) =>
        prev.includes(label) ? prev : [...prev, label].sort((a, b) => a.localeCompare(b, "fr"))
      );
      onChange(label);
      setNewValue("");
    } catch {
      setError("Erreur réseau lors de la création.");
    } finally {
      setCreating(false);
    }
  }

  const allOptions =
    current && !options.includes(current) ? [current, ...options] : options;

  return (
    <div className="space-y-2">
      <select
        className={common}
        value={current}
        required={field.required}
        disabled={loading}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{loading ? "Chargement…" : "Choisir…"}</option>
        {allOptions.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>

      {field.creatable && field.optionsFrom && (
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="text"
            className={common}
            value={newValue}
            placeholder="Nouvelle valeur…"
            onChange={(e) => setNewValue(e.target.value)}
          />
          <button
            type="button"
            disabled={creating || !newValue.trim()}
            onClick={() => void createOption()}
            className="shrink-0 rounded-xl border border-line bg-sand/60 px-4 py-2.5 text-sm font-semibold text-ink transition hover:bg-sand disabled:opacity-60"
          >
            {creating ? "Création…" : "Ajouter"}
          </button>
        </div>
      )}

      {field.help && <p className="text-xs text-muted">{field.help}</p>}
      {error && <p className="text-sm text-red-700">{error}</p>}
    </div>
  );
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
                <>
                  <textarea
                    className={`${common} min-h-[100px] resize-y`}
                    value={String(value ?? "")}
                    required={field.required}
                    onChange={(e) => updateField(field.key, e.target.value)}
                  />
                  {field.help && (
                    <p className="mt-1 text-xs text-muted">{field.help}</p>
                  )}
                </>
              )}

              {field.type === "select" && (
                <DynamicSelect
                  field={field}
                  value={value}
                  common={common}
                  onChange={(next) => updateField(field.key, next)}
                />
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
                    updateField(
                      field.key,
                      e.target.value === "" ? 0 : Number(e.target.value)
                    )
                  }
                />
              )}

              {field.type === "image" && (
                <ImageField
                  field={field}
                  value={value}
                  common={common}
                  onChange={(next) => updateField(field.key, next)}
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
        <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-800">
          {success}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={loading}
          className="btn-cta rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
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
