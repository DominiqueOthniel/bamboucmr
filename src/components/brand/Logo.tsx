import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
  /** Footer sur fond sombre */
  dark?: boolean;
  /** Masquer le nom à côté du logo */
  compact?: boolean;
  /** Masquer le texte sous le breakpoint sm (header mobile) */
  hideTextOnMobile?: boolean;
};

export function Logo({
  className = "",
  dark = false,
  compact = false,
  hideTextOnMobile = false,
}: LogoProps) {
  const showText = !compact;
  const textClass = hideTextOnMobile ? "hidden sm:inline" : "";

  return (
    <Link
      href="/"
      className={`inline-flex min-w-0 max-w-[min(100%,14rem)] items-center gap-2 sm:max-w-none sm:gap-2.5 ${className}`}
      aria-label="BambouCamer, accueil"
    >
      <Image
        src="/logo.jpg"
        alt=""
        width={48}
        height={48}
        className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-bamboo/20 sm:h-10 sm:w-10"
        priority
      />
      {showText && (
        <span
          className={`truncate font-display text-[1rem] font-bold tracking-tight sm:text-[1.15rem] ${textClass} ${dark ? "text-white" : "text-ink"}`}
        >
          Bambou
          <span className={dark ? "font-semibold text-shoot" : "font-semibold text-bamboo"}>
            Camer
          </span>
        </span>
      )}
    </Link>
  );
}
