import type { ComponentProps } from "react";
import Image from "next/image";

type SiteImageProps = Omit<ComponentProps<typeof Image>, "alt"> & {
  alt: string;
};

export function SiteImage({ className = "", ...props }: SiteImageProps) {
  const objectClass = className.includes("object-contain")
    ? "object-contain"
    : "object-cover";

  const src = typeof props.src === "string" ? props.src : "";
  const fromApi = src.startsWith("/api/media/");
  const isSvg = src.endsWith(".svg");

  return (
    <Image
      {...props}
      unoptimized={fromApi || isSvg || props.unoptimized}
      className={`${objectClass} ${className}`.trim()}
      sizes={props.sizes ?? "(max-width: 768px) 100vw, 50vw"}
    />
  );
}
