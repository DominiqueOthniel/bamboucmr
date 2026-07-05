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
  { value: 850, suffix: "+", label: "Agriculteurs formés & sensibilisés" },
  { value: 45, suffix: " ha", label: "De terres en cours de restauration" },
  { value: 18, suffix: "+", label: "Partenaires institutionnels actifs" },
  { value: 120, suffix: "+", label: "Emplois directs créés" },
] as const;

export const pillars = [
  {
    title: "Protection de l'environnement",
    description:
      "Planter, préserver et restaurer les écosystèmes grâce au bambou, capable de séquestrer jusqu'à 4× plus de CO₂ qu'un arbre ordinaire.",
    kpi: "Réponse locale à la crise climatique",
    icon: "shield",
  },
  {
    title: "Conservation de la biodiversité",
    description:
      "Protéger les habitats des forêts camerounaises et soutenir la coexistence durable entre activités humaines et richesse écologique.",
    kpi: "Une des biodiversités les + riches d'Afrique",
    icon: "globe",
  },
  {
    title: "Développement économique",
    description:
      "Accompagner les communautés rurales vers l'autonomie via la formation professionnelle, l'entrepreneuriat et les filières bambou.",
    kpi: "Le durable commence par les communautés",
    icon: "building",
  },
  {
    title: "Innovation verte & startup",
    description:
      "Incuber et accélérer des projets qui transforment le bambou en produits à forte valeur : construction, artisanat, emballages biodégradables.",
    kpi: "Une filière d'avenir pour l'Afrique",
    icon: "lightbulb",
  },
] as const;

export const solutions = [
  {
    title: "Conservation de la biodiversité",
    description:
      "Nous cartographions et protégeons les espèces menacées en intégrant les communautés locales comme premières gardiennes de la nature.",
    icon: "map-pin",
  },
  {
    title: "Restauration des terres dégradées",
    description:
      "Le bambou régénère les sols appauvris, stabilise les berges érodées et reconstitue les écosystèmes forestiers à grande échelle.",
    icon: "sprout",
  },
  {
    title: "Vente de crédits carbone",
    description:
      "Nos plantations certifiées génèrent des crédits carbone vérifiables pour les entreprises souhaitant compenser leur empreinte utilement.",
    icon: "coins",
  },
  {
    title: "Sensibilisation & formation",
    description:
      "Nous formons agriculteurs, jeunes et coopératives aux techniques de culture, de transformation et de commercialisation du bambou.",
    icon: "graduation",
  },
  {
    title: "Produits à base de bambou",
    description:
      "Construction écologique, mobilier, emballages biodégradables, ustensiles : des alternatives concrètes aux matériaux polluants.",
    icon: "package",
  },
  {
    title: "Consultation & expertise",
    description:
      "De l'étude de faisabilité à la mise en œuvre, nous accompagnons entreprises, ONG et institutions avec une connaissance fine du terrain.",
    icon: "users",
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
  { label: "Sensibilisation & formation", pct: 82 },
  { label: "Restauration des sols & biodiversité", pct: 68 },
  { label: "R&D & produits en bambou", pct: 74 },
  { label: "Plaidoyer & partenariats stratégiques", pct: 90 },
] as const;

export const news = [
  {
    cat: "Activité",
    title:
      "Participation au Salon de l'Événementiel Coopératif du Cameroun (SECO 2025)",
    date: "18 avril 2026",
    gradient: "from-bamboo to-forest-2",
  },
  {
    cat: "Activité",
    title:
      "Préparation d'un site de 5 hectares à Bansoa pour la culture du bambou",
    date: "18 avril 2026",
    gradient: "from-bamboo-2 to-bamboo",
  },
  {
    cat: "Activité",
    title: "Participation au SIPROME Jeune 2024",
    date: "18 avril 2026",
    gradient: "from-shoot-deep to-bamboo-2",
  },
  {
    cat: "Restauration",
    title: "Restauration des paysages forestiers au Sud-Kivu (RD Congo)",
    date: "18 avril 2026",
    gradient: "from-forest-2 to-bamboo",
  },
  {
    cat: "Intervention",
    title: "Intervention après l'éboulement de terrain à Dschang",
    date: "18 avril 2026",
    gradient: "from-bamboo to-shoot-deep",
  },
  {
    cat: "Distinction",
    title: "Finale du challenge Startupper Total Énergie 2024",
    date: "18 avril 2026",
    gradient: "from-bamboo-2 to-forest",
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
