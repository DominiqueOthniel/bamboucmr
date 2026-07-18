"use client";

import { useEffect } from "react";

/** Assure le scroll vers l'ancre après navigation (header sticky). */
export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    const el = document.getElementById(id);
    if (!el) return;
    requestAnimationFrame(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }, []);

  return null;
}
