import type { Metadata } from "next";
import type { ComponentType } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { ContactForm } from "@/components/shared/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

import { getSiteSettings } from "@/lib/content/reader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez BambouCamer à Dschang : partenariats, projets RSE, formations et questions sur le bambou durable.",
};

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Construisons ensemble une Afrique durable."
        description="Une question, un projet, un partenariat ? Écrivez-nous, notre équipe vous répond sous 48 h."
      />

      <section className="py-16 sm:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="space-y-1.5">
              <Info
                icon={MapPin}
                label="Adresse"
                value={settings.contact.address}
              />
              <Info
                icon={Phone}
                label="Téléphone"
                value={settings.contact.phone}
                href={`tel:${settings.contact.phone.replace(/\s/g, "")}`}
              />
              <Info
                icon={Mail}
                label="E-mail"
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
    <a href={href} className="font-display font-semibold transition-colors hover:text-forest">
      {value}
    </a>
  ) : (
    <b className="font-display font-semibold">{value}</b>
  );

  return (
    <div className="flex items-start gap-4 rounded-[14px] p-3.5 transition hover:bg-sand">
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-forest text-shoot">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <small className="block text-[0.8rem] text-muted">{label}</small>
        {content}
      </div>
    </div>
  );
}
