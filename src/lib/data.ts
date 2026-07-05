import { images } from "./images";

export const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/apropos", label: "À propos" },
  { href: "/objectifs", label: "Objectifs" },
  { href: "/solutions", label: "Solutions" },
  { href: "/actualites", label: "Actualités" },
  { href: "/contact", label: "Contact" },
] as const;

export const stats = [
  { value: 12000, suffix: "+", label: "Plants de bambou mis en terre" },
  { value: 850, suffix: "+", label: "Agriculteurs formés et sensibilisés" },
  { value: 45, suffix: " ha", label: "De terres en cours de restauration" },
  { value: 18, suffix: "+", label: "Partenaires institutionnels actifs" },
  { value: 120, suffix: "+", label: "Emplois directs créés" },
] as const;

export const pillars = [
  {
    title: "Protection de l'environnement",
    description:
      "BambouCamer plante, préserve et restaure les écosystèmes naturels du Cameroun grâce au bambou — capable de séquestrer jusqu'à 4 fois plus de CO₂ qu'un arbre ordinaire.",
    kpi: "Réponse concrète à la crise climatique",
    icon: "shield",
    image: images.bambooField,
    tint: "from-forest to-bamboo",
  },
  {
    title: "Conservation de la biodiversité",
    description:
      "Nos programmes protègent les habitats des forêts camerounaises et soutiennent la coexistence durable entre activités humaines et richesse écologique.",
    kpi: "Une biodiversité remarquable d'Afrique",
    icon: "globe",
    image: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture1-3.jpg",
    tint: "from-bamboo-2 to-shoot-deep",
  },
  {
    title: "Développement économique",
    description:
      "Nous accompagnons les communautés rurales vers l'autonomie via la formation professionnelle, l'entrepreneuriat local et les filières bambou.",
    kpi: "Le durable commence par les communautés",
    icon: "building",
    image: images.training,
    tint: "from-bamboo to-forest-2",
  },
  {
    title: "Innovation verte & startup",
    description:
      "Nous incubons des projets qui transforment le bambou en produits durables à forte valeur ajoutée — construction, artisanat, emballages biodégradables.",
    kpi: "Une filière d'avenir pour l'Afrique",
    icon: "lightbulb",
    image: images.products,
    tint: "from-shoot-deep to-bamboo-2",
  },
] as const;

export const solutions = [
  {
    title: "Conservation de la biodiversité",
    description:
      "Nous identifions, cartographions et protégeons les espèces menacées en intégrant les communautés locales comme premières gardiennes de la nature.",
    icon: "map-pin",
    image: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture1-2.jpg",
    accent: "bg-forest",
  },
  {
    title: "Restauration des terres dégradées",
    description:
      "Le bambou régénère les sols appauvris, stabilise les berges érodées et reconstitue les écosystèmes forestiers dégradés à grande échelle.",
    icon: "sprout",
    image: images.restoration,
    accent: "bg-bamboo",
  },
  {
    title: "Vente de crédits carbone",
    description:
      "Nos plantations certifiées génèrent des crédits carbone vérifiables pour financer la reforestation et soutenir les communautés rurales.",
    icon: "coins",
    image: images.bambooField,
    accent: "bg-forest-2",
  },
  {
    title: "Sensibilisation & formation",
    description:
      "Nous formons agriculteurs, jeunes et coopératives aux techniques de culture, de transformation et de commercialisation du bambou.",
    icon: "graduation",
    image: images.training,
    accent: "bg-bamboo-2",
  },
  {
    title: "Produits à base de bambou",
    description:
      "Construction écologique, mobilier, emballages biodégradables et ustensiles : des alternatives concrètes aux matériaux polluants.",
    icon: "package",
    image: images.products,
    accent: "bg-shoot-deep",
  },
  {
    title: "Consultation & expertise",
    description:
      "De l'étude de faisabilité à la mise en œuvre, nous accompagnons entreprises, ONG et institutions avec une connaissance fine du terrain.",
    icon: "users",
    image: images.mission,
    accent: "bg-forest",
  },
] as const;

export const rseItems = [
  {
    n: "01",
    title: "Empreinte carbone",
    description:
      "Analyser vos activités, identifier les sources d'émissions et déployer des solutions durables.",
  },
  {
    n: "02",
    title: "Certificats carbone",
    description:
      "Compenser une partie de vos émissions en soutenant des projets durables et certifiés.",
  },
  {
    n: "03",
    title: "Action climatique",
    description:
      "Efficacité énergétique, innovations vertes et compensation carbone, mises en œuvre concrètement.",
  },
  {
    n: "04",
    title: "Achats écologiques",
    description:
      "Adopter des choix responsables : matériaux durables, fournisseurs engagés, faible impact carbone.",
  },
  {
    n: "05",
    title: "Réduction CO₂ par le bambou",
    description:
      "Intégrer cette ressource durable pour contribuer activement à la lutte climatique.",
  },
  {
    n: "06",
    title: "Consultation & formation",
    description:
      "Des conseils personnalisés pour identifier les meilleures pratiques de votre transition.",
  },
] as const;

export const impactBars = [
  { label: "Sensibilisation et formation", pct: 82 },
  { label: "Restauration des sols et biodiversité", pct: 68 },
  { label: "R&D et produits en bambou", pct: 74 },
  { label: "Plaidoyer et partenariats stratégiques", pct: 90 },
] as const;

export const news = [
  {
    cat: "Activité",
    title:
      "Participation au Salon de l'Événementiel Coopératif du Cameroun (SECO 2025)",
    date: "18 avril 2026",
    image: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture1.jpg",
  },
  {
    cat: "Activité",
    title:
      "Préparation d'un site de 5 hectares à Bansoa pour la culture du bambou",
    date: "18 avril 2026",
    image: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture1-2.jpg",
  },
  {
    cat: "Activité",
    title: "Participation au SIPROME Jeune 2024",
    date: "18 avril 2026",
    image: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture1-3.jpg",
  },
  {
    cat: "Restauration",
    title:
      "Restauration des paysages forestiers au Sud-Kivu (RD Congo)",
    date: "18 avril 2026",
    image: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture2-4.jpg",
  },
  {
    cat: "Intervention",
    title: "Intervention après l'éboulement de terrain à Dschang",
    date: "18 avril 2026",
    image: "https://bamboucamer.com/wp-content/uploads/2026/04/Picture3-1.jpg",
  },
  {
    cat: "Distinction",
    title: "Finale du challenge Startupper Total Énergie 2024",
    date: "18 avril 2026",
    image: images.training,
  },
  {
    cat: "Restauration",
    title: "Restauration des terres dégradées du Mont Bamboutos",
    date: "18 avril 2026",
    image: images.restoration,
  },
  {
    cat: "Conservation",
    title: "Conservation du Coffea Rhizomatosa — Espèce menacée au Cameroun",
    date: "18 avril 2026",
    image:
      "https://bamboucamer.com/wp-content/uploads/2025/12/coffee-rizetiana-679x375.png",
  },
] as const;

export const partners = [
  "Carbonapp",
  "The Rufford Foundation",
  "Afrique RSE",
  "DGIA",
  "THELIE",
  "Économie Media Group",
] as const;

export const aboutQuestions = [
  "Une association | startup de valorisation du bambou au Cameroun et en Afrique",
  "Une association centrée sur le développement durable au Cameroun et en Afrique",
  "Une association | startup centrée sur le développement économique au Cameroun",
  "Une association centrée sur la lutte contre le changement climatique au Cameroun",
] as const;
