import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteImage } from "@/components/shared/SiteImage";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { images } from "@/lib/images";

const cards = [
  {
    title: "L'association",
    description:
      "Préservation de l'environnement, conservation de la biodiversité et développement des communautés locales.",
    href: "/apropos",
    image: images.association,
    color: "from-forest to-bamboo",
  },
  {
    title: "La startup",
    description:
      "Incubation de projets innovants qui transforment le bambou en produits durables et générateurs d'emplois.",
    href: "/apropos",
    image: images.startup,
    color: "from-bamboo-2 to-shoot-deep",
  },
];

export function DualMission() {
  return (
    <section className="relative overflow-hidden bg-forest py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(180,214,75,.18),transparent_45%)]" />
      <div className="relative mx-auto max-w-[1160px] px-5 sm:px-8 lg:px-16">
        <Reveal className="mb-10 text-center">
          <span className="inline-flex items-center justify-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-shoot before:h-0.5 before:w-[22px] before:rounded-full before:bg-shoot before:content-['']">
            Une association · Une startup
          </span>
          <h2 className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)]">
            BambouCamer — une seule mission
          </h2>
          <p className="mx-auto mt-4 max-w-[640px] text-[#B9C7B4]">
            Nés au Cameroun, engagés pour l&apos;Afrique. Deux forces complémentaires
            pour faire du bambou un pilier du développement durable.
          </p>
        </Reveal>

        <Stagger className="grid gap-5 md:grid-cols-2">
          {cards.map((card) => (
            <StaggerItem key={card.title}>
              <Link
                href={card.href}
                className="group relative block overflow-hidden rounded-[20px] border border-white/10"
              >
                <SiteImage
                  src={card.image}
                  alt={card.title}
                  width={640}
                  height={375}
                  className="aspect-[16/10] w-full transition duration-500 group-hover:scale-105"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${card.color} opacity-80 mix-blend-multiply`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl">{card.title}</h3>
                  <p className="mt-2 max-w-[40ch] text-sm text-white/85">
                    {card.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-shoot">
                    En savoir plus
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
