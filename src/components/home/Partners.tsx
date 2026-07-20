"use client";

import { SiteImage } from "@/components/shared/SiteImage";
import { Eyebrow } from "@/components/shared/Eyebrow";
import { useI18n } from "@/i18n/LocaleProvider";
import type { PartnerItem } from "@/lib/content/types";

function PartnerCard({ partner }: { partner: PartnerItem }) {
  return (
    <div className="flex h-[4.75rem] items-center justify-center rounded-[14px] border border-line bg-surface px-3 py-2.5 sm:h-[5.5rem] sm:rounded-[16px] sm:px-4">
      {partner.logoUrl ? (
        <SiteImage
          src={partner.logoUrl}
          alt={partner.name}
          width={180}
          height={64}
          className="!h-10 !w-auto max-h-10 max-w-[95%] !object-contain sm:!h-12 sm:max-h-12"
        />
      ) : (
        <span className="inline-flex items-center gap-2 text-center font-display text-xs font-bold text-forest sm:text-sm">
          <span className="h-2 w-2 shrink-0 rounded-full bg-shoot-deep" />
          {partner.name}
        </span>
      )}
    </div>
  );
}

export function Partners({ partners }: { partners: PartnerItem[] }) {
  const { t } = useI18n();
  if (partners.length === 0) return null;

  const track = [...partners, ...partners];

  return (
    <section
      className="overflow-hidden border-t border-line/70 bg-sand pb-12 pt-10 sm:pb-14 sm:pt-12"
      aria-labelledby="part-h"
    >
      <div className="container-site text-center">
        <div className="flex justify-center">
          <Eyebrow>{t("home.partnersEyebrow")}</Eyebrow>
        </div>
        <h2
          id="part-h"
          className="mt-2.5 text-[clamp(1.45rem,3.2vw,2.1rem)] text-forest"
        >
          {t("home.partnersTitle")}
        </h2>

        <div
          className={`mt-6 grid gap-3 md:hidden ${
            partners.length === 1
              ? "grid-cols-1 max-w-xs mx-auto"
              : partners.length === 3
                ? "grid-cols-2 sm:grid-cols-3"
                : "grid-cols-2"
          }`}
        >
          {partners.map((partner) => (
            <PartnerCard key={partner.id} partner={partner} />
          ))}
        </div>
      </div>

      <div className="relative mt-6 hidden md:block">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-sand to-transparent sm:w-20" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-sand to-transparent sm:w-20" />
        <div className="flex overflow-hidden">
          <div className="animate-marquee flex w-max gap-3 px-3 will-change-transform sm:gap-4 sm:px-4">
            {track.map((partner, i) => (
              <div
                key={`${partner.id}-${i}`}
                className="w-40 shrink-0 sm:w-48 lg:w-52"
              >
                <PartnerCard partner={partner} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
