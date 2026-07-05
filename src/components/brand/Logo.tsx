import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  /** Footer sur fond sombre */
  dark?: boolean;
  /** Masquer le nom à côté du logo (mobile serré) */
  compact?: boolean;
};

export function Logo({ className = "", dark = false, compact = false }: LogoProps) {
  return (
    <Link
      href="/"
      className={`inline-flex min-w-0 items-center gap-2.5 ${className}`}
      aria-label="BambouCamer, accueil"
    >
      <Image
        src="/logo.jpg"
        alt=""
        width={48}
        height={48}
        className="h-10 w-10 shrink-0 rounded-full object-cover ring-2 ring-bamboo/20"
        priority
      />
      {!compact && (
        <span
          className={`truncate font-display text-[1.05rem] font-bold tracking-tight sm:text-[1.15rem] ${dark ? "text-white" : "text-ink"}`}
        >
          Bambou
          <b className={dark ? "text-shoot" : "text-bamboo"}>Camer</b>
        </span>
      )}
    </Link>
  );
}
