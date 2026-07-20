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
  /** Lien de destination (défaut : accueil) */
  href?: string;
};

export function Logo({
  className = "",
  dark = false,
  compact = false,
  hideTextOnMobile = false,
  href = "/",
}: LogoProps) {
  const showText = !compact;
  const textClass = hideTextOnMobile ? "hidden sm:inline" : "";

  return (
    <Link
      href={href}
      className={`inline-flex shrink-0 items-center gap-2 sm:gap-2.5 ${className}`}
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
          className={`whitespace-nowrap font-display text-[1rem] font-bold tracking-tight sm:text-[1.15rem] ${textClass} ${dark ? "text-white" : "text-ink"}`}
        >
          Bambou
          <span className={dark ? "font-semibold text-white/90" : "font-semibold text-bamboo"}>
            Camer
          </span>
        </span>
      )}
    </Link>
  );
}
