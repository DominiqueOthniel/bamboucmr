"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/** Animations allégées sur mobile et appareils tactiles pour garder 60 fps. */
export function useLiteMotion() {
  const reduce = useReducedMotion();
  const [lite, setLite] = useState(false);

  useEffect(() => {
    const check = () => {
      const narrow = window.matchMedia("(max-width: 767px)").matches;
      const coarse = window.matchMedia("(pointer: coarse)").matches;
      setLite(narrow || coarse);
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  return reduce || lite;
}
