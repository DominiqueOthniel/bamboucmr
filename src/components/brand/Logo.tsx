import Link from "next/link";

export function Logo({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 font-display text-[1.15rem] font-bold tracking-tight ${className}`}
      aria-label="BambouCamer, accueil"
    >
      <svg
        viewBox="0 0 30 34"
        className="h-[34px] w-[30px] shrink-0"
        fill="none"
        aria-hidden="true"
      >
        <rect
          x="11"
          y="2"
          width="8"
          height="30"
          rx="4"
          fill={light ? "#B4D64B" : "#2F6B3C"}
        />
        <rect x="11" y="10.5" width="8" height="2.4" fill="#12301C" />
        <rect x="11" y="20" width="8" height="2.4" fill="#12301C" />
        <path
          d="M11 7C6 6 3 8 2 12c4 1 8-1 9-5Z"
          fill={light ? "#8FB63A" : "#B4D64B"}
        />
        {!light && (
          <path d="M19 16c5-1 8 1 9 5-4 1-8-1-9-5Z" fill="#8FB63A" />
        )}
      </svg>
      <span className={light ? "text-white" : "text-ink"}>
        Bambou
        <b className={light ? "text-shoot" : "text-bamboo"}>Camer</b>
      </span>
    </Link>
  );
}
