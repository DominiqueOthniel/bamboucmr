import type { ComponentProps } from "react";
import Image from "next/image";

type SiteImageProps = Omit<ComponentProps<typeof Image>, "alt"> & {
  alt: string;
};

export function SiteImage({ className = "", ...props }: SiteImageProps) {
  const objectClass = className.includes("object-contain")
    ? "object-contain"
    : "object-cover";

  return (
    <Image
      {...props}
      className={`${objectClass} ${className}`.trim()}
      sizes={props.sizes ?? "(max-width: 768px) 100vw, 50vw"}
    />
  );
}
