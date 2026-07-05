"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { springBouncy } from "@/lib/motion";

export function BackToTop() {
  const [show, setShow] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          type="button"
          aria-label="Revenir en haut"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.92 }}
          transition={springBouncy}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" })
          }
          className="fixed bottom-5 right-4 z-40 grid h-12 w-12 place-items-center rounded-[14px] bg-forest text-white shadow-lg shadow-forest/30 transition-colors hover:bg-bamboo sm:bottom-6 sm:right-5"
        >
          <ArrowUp className="h-5 w-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
