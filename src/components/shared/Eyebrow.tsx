import type { ReactNode } from "react";

type EyebrowProps = {
  children: ReactNode;
  className?: string;
  tone?: "default" | "light" | "on-dark";
};

const tones = {
  default: "border-bamboo/25 bg-bamboo/10 text-bamboo",
  light: "border-shoot/30 bg-shoot/15 text-shoot-deep",
  "on-dark": "border-white/20 bg-white/10 text-shoot",
};

export function Eyebrow({ children, className = "", tone = "default" }: EyebrowProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.1em] ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}
