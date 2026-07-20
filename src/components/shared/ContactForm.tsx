"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send } from "lucide-react";
import { type FormEvent, type ReactNode, useState } from "react";
import { useI18n } from "@/i18n/LocaleProvider";

export function ContactForm() {
  const { t } = useI18n();
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const next = {
      name: !name,
      email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
      message: message.length < 10,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setSent(true);
  }

  return (
    <div className="rounded-[18px] border border-line bg-surface p-4 shadow-[0_1px_2px_rgba(18,48,28,.04),0_12px_30px_-18px_rgba(18,48,28,.28)] sm:p-8">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-start gap-3 rounded-[14px] border-[1.5px] border-shoot-deep bg-[color-mix(in_srgb,var(--shoot)_22%,var(--surface))] p-4 text-forest"
            role="status"
          >
            <CheckCircle2 className="mt-0.5 h-6 w-6 shrink-0 text-bamboo" />
            <div>{t("contact.formSuccess")}</div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0 }}
            id="cform"
            noValidate
            onSubmit={onSubmit}
            className="space-y-4"
          >
            <Field
              id="name"
              label={t("contact.formName")}
              error={errors.name}
              message={t("contact.formNameErr")}
            >
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder={t("contact.formNamePh")}
                required
                onChange={() => setErrors((e) => ({ ...e, name: false }))}
                className={inputClass(errors.name)}
              />
            </Field>
            <Field
              id="email"
              label={t("contact.formEmail")}
              error={errors.email}
              message={t("contact.formEmailErr")}
            >
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder={t("contact.formEmailPh")}
                required
                onChange={() => setErrors((e) => ({ ...e, email: false }))}
                className={inputClass(errors.email)}
              />
            </Field>
            <Field
              id="message"
              label={t("contact.formMessage")}
              error={errors.message}
              message={t("contact.formMessageErr")}
            >
              <textarea
                id="message"
                name="message"
                placeholder={t("contact.formMessagePh")}
                required
                rows={5}
                onChange={() => setErrors((e) => ({ ...e, message: false }))}
                className={`${inputClass(errors.message)} min-h-[120px] resize-y`}
              />
            </Field>
            <button
              type="submit"
              className="btn-cta inline-flex w-full items-center justify-center gap-2.5 rounded-[13px] bg-bamboo px-6 py-3.5 font-semibold text-white shadow-[0_12px_24px_-14px_rgba(47,107,60,.8)] transition hover:-translate-y-0.5"
            >
              {t("contact.formSubmit")}
              <Send className="h-4 w-4" />
            </button>
            <p className="text-center text-[0.8rem] text-muted">
              {t("contact.formPrivacy")}
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  id,
  label,
  error,
  message,
  children,
}: {
  id: string;
  label: string;
  error?: boolean;
  message: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-[0.9rem] font-semibold">
        {label} <span className="text-[#C0492E]">*</span>
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-[0.82rem] text-[#C0492E]">{message}</p>
      )}
    </div>
  );
}

function inputClass(error?: boolean) {
  return `w-full rounded-xl border-[1.5px] bg-paper px-4 py-3 font-inherit text-ink transition focus:bg-surface focus:outline-none focus:ring-4 focus:ring-bamboo/15 ${
    error
      ? "border-[#C0492E] ring-4 ring-[#C0492E]/10"
      : "border-line focus:border-bamboo"
  }`;
}
