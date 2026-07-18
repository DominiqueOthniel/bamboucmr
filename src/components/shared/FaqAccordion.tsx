"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FaqItem } from "@/lib/content/types";

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <ul className="space-y-3">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <li key={item.id}>
            <div className="overflow-hidden rounded-[14px] border border-line bg-surface shadow-[var(--shadow-card)]">
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`faq-panel-${item.id}`}
                id={`faq-trigger-${item.id}`}
                className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition hover:bg-sand/60 sm:px-6 sm:py-5"
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span className="font-display text-[1.05rem] font-semibold leading-snug text-ink sm:text-[1.12rem]">
                  {item.question}
                </span>
                <ChevronDown
                  className={`mt-0.5 h-5 w-5 shrink-0 text-muted transition-transform duration-200 ${
                    open ? "rotate-180 text-forest" : ""
                  }`}
                  aria-hidden
                />
              </button>
              <div
                id={`faq-panel-${item.id}`}
                role="region"
                aria-labelledby={`faq-trigger-${item.id}`}
                hidden={!open}
                className="border-t border-line px-5 pb-5 pt-3 sm:px-6 sm:pb-6"
              >
                <p className="max-w-[62ch] text-[0.95rem] leading-relaxed text-muted sm:text-[1rem]">
                  {item.answer}
                </p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
