import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/shared/ContactForm";
import { Reveal } from "@/components/motion/Reveal";
import { getSiteSettings } from "@/lib/content/reader";
import { getMessages } from "@/i18n/server";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez BambouCamer à Dschang : partenariats, formations et questions sur le bambou durable.",
};

export default async function ContactPage() {
  const [settings, messages] = await Promise.all([
    getSiteSettings(),
    getMessages(),
  ]);

  return (
    <>
      <PageHero
        eyebrow={messages.contact.eyebrow}
        title={messages.contact.title}
        description={messages.contact.description}
      />

      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="space-y-1.5">
              <Info
                icon={MapPin}
                label={messages.contact.address}
                value={settings.contact.address}
              />
              <Info
                icon={Phone}
                label={messages.contact.phone}
                value={settings.contact.phone}
                href={`tel:${settings.contact.phone.replace(/\s/g, "")}`}
              />
              <Info
                icon={Mail}
                label={messages.contact.email}
                value={settings.contact.email}
                href={`mailto:${settings.contact.email}`}
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}

function Info({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
}) {
  const content = href ? (
    <a href={href} className="transition-colors hover:text-forest">
      {value}
    </a>
  ) : (
    value
  );

  return (
    <div className="flex gap-3 rounded-[14px] border border-line bg-surface px-4 py-3.5">
      <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-[10px] bg-sand text-bamboo">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] text-muted">
          {label}
        </p>
        <p className="mt-0.5 text-[0.95rem] text-ink">{content}</p>
      </div>
    </div>
  );
}
