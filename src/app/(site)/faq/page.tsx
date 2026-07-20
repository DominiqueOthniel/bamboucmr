import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/shared/PageHero";
import { FaqAccordion } from "@/components/shared/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { getFaq } from "@/lib/content/reader";
import { getLocale, getMessages } from "@/i18n/server";
import { localizeList } from "@/i18n/localize";
import { images } from "@/lib/images";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Questions fréquentes sur BambouCamer : bambou, partenariats, formations, impact et contact à Dschang.",
};

export default async function FaqPage() {
  const [items, messages, locale] = await Promise.all([
    getFaq(),
    getMessages(),
    getLocale(),
  ]);
  const localized = localizeList(
    items as unknown as Record<string, unknown>[],
    ["question", "answer"],
    locale
  ) as typeof items;

  return (
    <>
      <PageHero
        eyebrow={messages.faq.eyebrow}
        title={messages.faq.title}
        description={messages.faq.description}
        image={images.bambooField}
      />

      <section className="section-y">
        <div className="container-site max-w-3xl">
          <Reveal>
            {localized.length > 0 ? (
              <FaqAccordion items={localized} />
            ) : (
              <p className="text-muted">{messages.faq.empty}</p>
            )}
          </Reveal>

          <Reveal delay={0.12} className="mt-12 rounded-[16px] border border-line bg-sand/50 p-6 sm:p-8">
            <h2 className="font-display text-[1.35rem] text-forest sm:text-[1.5rem]">
              {messages.faq.moreTitle}
            </h2>
            <p className="mt-2 max-w-[48ch] text-muted">{messages.faq.moreText}</p>
            <Link href="/contact" className="btn-cta btn-primary mt-5">
              {messages.common.contactUs}
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
