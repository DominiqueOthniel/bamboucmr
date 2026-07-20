import type { Locale } from "./config";

type DeepStringify<T> = {
  [K in keyof T]: T[K] extends string ? string : DeepStringify<T[K]>;
};

export type Messages = DeepStringify<typeof fr>;

export const fr = {
  nav: {
    home: "Accueil",
    about: "À propos",
    aboutUs: "À propos de nous",
    aboutUsDesc: "Mission et engagement",
    aboutBamboo: "À propos du bambou",
    aboutBambooDesc: "Pourquoi cette ressource",
    association: "L'association",
    associationDesc: "Environnement et communautés",
    startup: "La startup",
    startupDesc: "Innovation et produits",
    goals: "Objectifs",
    goalsOverview: "Vue d'ensemble",
    goalsOverviewDesc: "Nos 4 piliers de durabilité",
    solutions: "Solutions",
    solutionsOverview: "Vue d'ensemble",
    solutionsOverviewDesc: "Toutes nos solutions",
    collaborate: "Collaborer avec nous",
    collaborateDesc: "Projets et partenariats",
    resources: "Ressources",
    news: "Actualités",
    newsDesc: "Interventions sur le terrain",
    impact: "Notre impact",
    impactDesc: "Résultats mesurables",
    faq: "FAQ",
    faqDesc: "Questions fréquentes",
    contact: "Contact",
    partnerCta: "Devenir partenaire",
    partnerCtaShort: "Partenaire",
    seeAll: "Voir tout",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
  },
  common: {
    learnMore: "En savoir plus",
    contactUs: "Nous contacter",
    readArticle: "Lire l'article",
    allNews: "Toutes les actualités",
    back: "Retour",
    seeImpact: "Voir notre impact",
    seeSolutions: "Nos solutions",
    seeGoals: "Voir nos objectifs",
    skipToContent: "Aller au contenu",
  },
  home: {
    partnersEyebrow: "Ils nous font confiance",
    partnersTitle: "Nos partenaires",
    newsEyebrow: "Actualités & terrain",
    newsTitle: "Nos interventions récentes, là où les besoins sont réels",
    impactEyebrow: "Pourcentage de tâches accomplies",
    impactTitle: "Des engagements transformés en résultats mesurables",
    impactText:
      "Chaque étape franchie renforce l'économie du bambou et la protection de nos écosystèmes.",
    impactCta: "Voir notre impact",
    dualEyebrow: "Une association · Une startup",
    dualTitle: "BambouCamer, une seule mission",
    dualText:
      "Nés au Cameroun, engagés pour l'Afrique. Deux forces complémentaires pour faire du bambou un pilier du développement durable.",
    associationCard:
      "Préservation de l'environnement, conservation de la biodiversité et développement des communautés locales.",
    startupCard:
      "Incubation de projets innovants qui transforment le bambou en produits durables et générateurs d'emplois.",
    solutionsEyebrow: "Nos solutions",
    solutionsTitle: "Des réponses concrètes pour un Cameroun et une Afrique durables",
    aboutEyebrow: "Qui sommes-nous",
    aboutTitle: "Une association et une startup, une seule mission",
    aboutQuote:
      "« Quand la nature est protégée et que l'innovation sert les communautés, le développement durable devient une réalité tangible. »",
    aboutCta: "En savoir plus",
    aboutGoals: "Nos objectifs",
    aboutBadge: "Terrain · Cameroun",
    aboutBadgeLine: "Né au Cameroun, engagé pour l'Afrique",
    aboutLead:
      "BambouCamer est une association camerounaise à but non lucratif, née d'une conviction profonde : le bambou est un levier puissant pour transformer nos communautés.",
    co2Label: "plus de CO₂ séquestré",
    goalsEyebrow: "4 objectifs de durabilité",
    goalsTitle:
      "Le bambou, une réponse aux défis sociaux, économiques et environnementaux",
    goalsText:
      "BambouCamer exploite cette ressource pour transformer l'économie camerounaise et améliorer les conditions de vie à l'échelle nationale.",
    seeAllGoals: "Voir tous les objectifs",
    solutionsLead:
      "Restauration, formation, crédits carbone et produits durables : le bambou au service d'un développement véritablement durable.",
    allSolutions: "Toutes nos solutions",
    statsLabel: "Nos chiffres",
    statsEyebrow: "Notre impact en chiffres",
  },
  footer: {
    navigation: "Navigation",
    resources: "Ressources",
    joinUs: "Nous joindre",
    about: "À propos",
    goals: "Objectifs",
    solutions: "Solutions",
    contact: "Contact",
    news: "Actualités",
    impact: "Notre impact",
    faq: "FAQ",
    associationStartup: "Association / Startup",
    legal: "Mentions légales",
    privacy: "Confidentialité",
    terms: "Conditions d'utilisation",
    copyright: "© 2026 BambouCamer · Nouveau vecteur de l'économie verte.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Vos questions, nos réponses.",
    description:
      "Tout ce qu'il faut savoir sur BambouCamer, le bambou et nos façons de collaborer.",
    empty: "Les questions fréquentes seront bientôt disponibles.",
    moreTitle: "Vous ne trouvez pas votre réponse ?",
    moreText:
      "Écrivez-nous : nous vous répondons sous 48 h pour tout projet, partenariat ou demande d'information.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Construisons ensemble une Afrique durable.",
    description:
      "Une question, un projet, un partenariat ? Écrivez-nous, notre équipe vous répond sous 48 h.",
    address: "Adresse",
    phone: "Téléphone",
    email: "E-mail",
    formName: "Nom complet",
    formNamePh: "Votre nom",
    formNameErr: "Merci d'indiquer votre nom.",
    formEmail: "E-mail",
    formEmailPh: "vous@exemple.com",
    formEmailErr: "Adresse e-mail invalide.",
    formMessage: "Votre message",
    formMessagePh: "Parlez-nous de votre projet ou de votre demande…",
    formMessageErr: "Écrivez-nous quelques mots (10 caractères min.).",
    formSubmit: "Envoyer le message",
    formPrivacy: "Vos informations restent confidentielles et ne sont jamais partagées.",
    formSuccess: "Message envoyé. Merci, nous revenons vers vous très vite.",
  },
  solutions: {
    eyebrow: "Nos solutions",
    title: "Des réponses concrètes pour un Cameroun et une Afrique durables.",
    description:
      "Chaque action répond à un défi réel, de la restauration des terres aux crédits carbone certifiés.",
    collabEyebrow: "Collaborer avec nous",
    collabTitle: "Des projets écologiques construits ensemble",
    collabText:
      "Collectivités, ONG, entreprises et bailleurs : co-construisons plantation, formation, produits bambou ou crédits carbone avec une équipe ancrée sur le terrain.",
    partnerCta: "Devenir partenaire",
  },
  about: {
    eyebrow: "Qui sommes-nous",
    title: "BambouCamer",
    description:
      "Association et startup sociale à Dschang : le bambou au service des communautés, des écosystèmes et d'une économie verte.",
    jumpUs: "Nous",
    jumpBamboo: "Le bambou",
    jumpAssociation: "Association",
    jumpStartup: "Startup",
    usEyebrow: "À propos de nous",
    usTitle: "Une organisation, une mission claire",
    usP1:
      "BambouCamer est une organisation camerounaise apolitique et non confessionnelle. Nous agissons à la croisée de deux engagements : protéger la nature et créer de la valeur pour les communautés.",
    usP2:
      "Basés à Dschang, nous travaillons sur le terrain : plantations, formation, filières locales et partenariats responsables, au Cameroun et au-delà.",
    quote:
      "« Quand la nature est protégée et que l'innovation sert les communautés, le développement durable devient une réalité tangible. »",
    chipCommunities: "Communautés locales",
    chipEcosystems: "Écosystèmes restaurés",
    chipSector: "Filière bambou",
    chipPartners: "Partenariats durables",
    bambooEyebrow: "À propos du bambou",
    bambooTitle: "Une ressource pour les défis d'aujourd'hui",
    bambooText:
      "Le bambou pousse vite, stocke du carbone, stabilise les sols et peut remplacer des matériaux plus polluants. C'est une ressource locale encore sous-exploitée, idéale pour allier climat, emplois et produits durables.",
    bambooCo2: "Jusqu'à ×4 plus de CO₂",
    bambooCo2Text:
      "Séquestré par rapport à un arbre ordinaire, selon les contextes de plantation.",
    bambooSoil: "Sols et biodiversité",
    bambooSoilText:
      "Restauration des terres dégradées, stabilisation des berges et habitats mieux protégés.",
    bambooEconomy: "Économie locale",
    bambooEconomyText:
      "Formation, transformation et commercialisation pour des revenus ancrés dans les territoires.",
    dualEyebrow: "Deux entités",
    dualTitle: "Une association. Une startup. Une mission.",
    dualText:
      "Deux façons d'agir, un même cap : faire du bambou un pilier du développement durable au Cameroun et en Afrique.",
    associationTitle: "L'association",
    associationText:
      "Préservation de l'environnement, conservation de la biodiversité et accompagnement des communautés locales vers des pratiques durables.",
    associationCta: "Découvrir l'association",
    startupTitle: "La startup",
    startupText:
      "Innovation sociale et produits à base de bambou : construction, artisanat, emballages et expertises pour les marchés locaux et internationaux.",
    startupCta: "Découvrir la startup",
    ctaTitle: "Construisons ensemble la suite",
    ctaText: "Partenariat, projet terrain ou simple question : parlons-en.",
  },
  association: {
    eyebrow: "L'association",
    title: "De l'urgence climatique à l'action locale.",
    description:
      "ONG camerounaise apolitique et non confessionnelle, dédiée à la promotion du bambou, à la protection de l'environnement et au développement des communautés.",
  },
  startup: {
    eyebrow: "La startup",
    title: "Une entreprise verte née d'une urgence climatique.",
    description:
      "Enregistrée en 2025 après des années d'expérimentation, BambouCamer Startup transforme le bambou en solutions écologiques et économiques pour les communautés.",
  },
  impact: {
    eyebrow: "Notre impact",
    title: "Des avancées concrètes sur le terrain",
    description:
      "Chaque indicateur reflète un engagement tenu auprès des communautés et des écosystèmes que nous accompagnons.",
    newsCta: "Voir les actualités",
    pageEyebrow: "Pourcentage de tâches accomplies",
    pageTitle: "Nous transformons nos engagements en résultats mesurables.",
    pageDescription:
      "Suivez l'avancement de nos chantiers : chaque étape franchie renforce l'économie du bambou et la protection de nos écosystèmes.",
  },
  goals: {
    eyebrow: "4 objectifs de durabilité",
    title: "Le bambou, une réponse aux défis sociaux, économiques et environnementaux.",
    description:
      "Une ressource méconnue mise au service d'une transformation concrète, à l'échelle du Cameroun et de l'Afrique.",
    badge: "Objectif",
  },
  news: {
    eyebrow: "Actualités & terrain",
    title: "Nos interventions récentes, là où les besoins sont réels.",
    description:
      "BambouCamer agit concrètement au Cameroun et en Afrique centrale. Voici un aperçu de nos actions les plus récentes.",
  },
  detail: {
    backSolutions: "Retour aux solutions",
    backGoals: "Retour aux objectifs",
    backNews: "Retour aux actualités",
    solutionEyebrow: "Solution BambouCamer",
    goalEyebrow: "Objectif BambouCamer",
    talkCta: "En parler avec nous",
  },
  lang: {
    fr: "FR",
    en: "EN",
    switchTo: "Passer en",
  },
} as const;

export const en: Messages = {
  nav: {
    home: "Home",
    about: "About",
    aboutUs: "About us",
    aboutUsDesc: "Mission and commitment",
    aboutBamboo: "About bamboo",
    aboutBambooDesc: "Why this resource",
    association: "The association",
    associationDesc: "Environment and communities",
    startup: "The startup",
    startupDesc: "Innovation and products",
    goals: "Goals",
    goalsOverview: "Overview",
    goalsOverviewDesc: "Our 4 sustainability pillars",
    solutions: "Solutions",
    solutionsOverview: "Overview",
    solutionsOverviewDesc: "All our solutions",
    collaborate: "Work with us",
    collaborateDesc: "Projects and partnerships",
    resources: "Resources",
    news: "News",
    newsDesc: "Field interventions",
    impact: "Our impact",
    impactDesc: "Measurable results",
    faq: "FAQ",
    faqDesc: "Frequently asked questions",
    contact: "Contact",
    partnerCta: "Become a partner",
    partnerCtaShort: "Partner",
    seeAll: "See all",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
  common: {
    learnMore: "Learn more",
    contactUs: "Contact us",
    readArticle: "Read article",
    allNews: "All news",
    back: "Back",
    seeImpact: "See our impact",
    seeSolutions: "Our solutions",
    seeGoals: "See our goals",
    skipToContent: "Skip to content",
  },
  home: {
    partnersEyebrow: "They trust us",
    partnersTitle: "Our partners",
    newsEyebrow: "News & field work",
    newsTitle: "Recent interventions where needs are real",
    impactEyebrow: "Share of completed tasks",
    impactTitle: "Commitments turned into measurable results",
    impactText:
      "Every milestone strengthens the bamboo economy and the protection of our ecosystems.",
    impactCta: "See our impact",
    dualEyebrow: "One association · One startup",
    dualTitle: "BambouCamer, one mission",
    dualText:
      "Born in Cameroon, committed to Africa. Two complementary forces making bamboo a pillar of sustainable development.",
    associationCard:
      "Environmental protection, biodiversity conservation and local community development.",
    startupCard:
      "Incubating innovative projects that turn bamboo into durable, job-creating products.",
    solutionsEyebrow: "Our solutions",
    solutionsTitle: "Concrete answers for a sustainable Cameroon and Africa",
    aboutEyebrow: "Who we are",
    aboutTitle: "One association and one startup, one mission",
    aboutQuote:
      "“When nature is protected and innovation serves communities, sustainable development becomes tangible.”",
    aboutCta: "Learn more",
    aboutGoals: "Our goals",
    aboutBadge: "Field · Cameroon",
    aboutBadgeLine: "Born in Cameroon, committed to Africa",
    aboutLead:
      "BambouCamer is a non-profit Cameroonian association born from a deep conviction: bamboo is a powerful lever to transform our communities.",
    co2Label: "more CO₂ sequestered",
    goalsEyebrow: "4 sustainability goals",
    goalsTitle:
      "Bamboo as an answer to social, economic and environmental challenges",
    goalsText:
      "BambouCamer uses this resource to transform Cameroon’s economy and improve living conditions nationwide.",
    seeAllGoals: "See all goals",
    solutionsLead:
      "Restoration, training, carbon credits and durable products: bamboo serving truly sustainable development.",
    allSolutions: "All our solutions",
    statsLabel: "Our figures",
    statsEyebrow: "Our impact in figures",
  },
  footer: {
    navigation: "Navigation",
    resources: "Resources",
    joinUs: "Reach us",
    about: "About",
    goals: "Goals",
    solutions: "Solutions",
    contact: "Contact",
    news: "News",
    impact: "Our impact",
    faq: "FAQ",
    associationStartup: "Association / Startup",
    legal: "Legal notice",
    privacy: "Privacy",
    terms: "Terms of use",
    copyright: "© 2026 BambouCamer · A new driver of the green economy.",
  },
  faq: {
    eyebrow: "FAQ",
    title: "Your questions, our answers.",
    description:
      "Everything you need to know about BambouCamer, bamboo and how we work together.",
    empty: "Frequently asked questions will be available soon.",
    moreTitle: "Can't find your answer?",
    moreText:
      "Write to us: we usually reply within 48 hours for projects, partnerships or information requests.",
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's build a sustainable Africa together.",
    description:
      "A question, a project, a partnership? Write to us: our team replies within 48 hours.",
    address: "Address",
    phone: "Phone",
    email: "Email",
    formName: "Full name",
    formNamePh: "Your name",
    formNameErr: "Please enter your name.",
    formEmail: "Email",
    formEmailPh: "you@example.com",
    formEmailErr: "Invalid email address.",
    formMessage: "Your message",
    formMessagePh: "Tell us about your project or request…",
    formMessageErr: "Write a few words (10 characters min.).",
    formSubmit: "Send message",
    formPrivacy: "Your information stays confidential and is never shared.",
    formSuccess: "Message sent. Thank you, we will get back to you very soon.",
  },
  solutions: {
    eyebrow: "Our solutions",
    title: "Concrete answers for a sustainable Cameroon and Africa.",
    description:
      "Every action meets a real challenge, from land restoration to certified carbon credits.",
    collabEyebrow: "Work with us",
    collabTitle: "Ecological projects built together",
    collabText:
      "Local governments, NGOs, businesses and funders: let's co-build planting, training, bamboo products or carbon credits with a field-based team.",
    partnerCta: "Become a partner",
  },
  about: {
    eyebrow: "Who we are",
    title: "BambouCamer",
    description:
      "Association and social startup in Dschang: bamboo serving communities, ecosystems and a green economy.",
    jumpUs: "Us",
    jumpBamboo: "Bamboo",
    jumpAssociation: "Association",
    jumpStartup: "Startup",
    usEyebrow: "About us",
    usTitle: "One organisation, one clear mission",
    usP1:
      "BambouCamer is a non-political, non-denominational Cameroonian organisation. We act at the intersection of two commitments: protect nature and create value for communities.",
    usP2:
      "Based in Dschang, we work on the ground: plantations, training, local value chains and responsible partnerships across Cameroon and beyond.",
    quote:
      "“When nature is protected and innovation serves communities, sustainable development becomes tangible.”",
    chipCommunities: "Local communities",
    chipEcosystems: "Restored ecosystems",
    chipSector: "Bamboo value chain",
    chipPartners: "Durable partnerships",
    bambooEyebrow: "About bamboo",
    bambooTitle: "A resource for today's challenges",
    bambooText:
      "Bamboo grows fast, stores carbon, stabilises soils and can replace more polluting materials. It is still underused locally, ideal for climate, jobs and durable products.",
    bambooCo2: "Up to ×4 more CO₂",
    bambooCo2Text:
      "Sequestered compared with an ordinary tree, depending on plantation contexts.",
    bambooSoil: "Soils and biodiversity",
    bambooSoilText:
      "Restoring degraded land, stabilising riverbanks and better-protected habitats.",
    bambooEconomy: "Local economy",
    bambooEconomyText:
      "Training, processing and marketing for income rooted in territories.",
    dualEyebrow: "Two entities",
    dualTitle: "One association. One startup. One mission.",
    dualText:
      "Two ways of acting, one direction: make bamboo a pillar of sustainable development in Cameroon and Africa.",
    associationTitle: "The association",
    associationText:
      "Environmental preservation, biodiversity conservation and supporting local communities toward sustainable practices.",
    associationCta: "Discover the association",
    startupTitle: "The startup",
    startupText:
      "Social innovation and bamboo-based products: construction, crafts, packaging and expertise for local and international markets.",
    startupCta: "Discover the startup",
    ctaTitle: "Let's build what comes next",
    ctaText: "Partnership, field project or a simple question: let's talk.",
  },
  association: {
    eyebrow: "The association",
    title: "From climate urgency to local action.",
    description:
      "A non-political, non-denominational Cameroonian NGO dedicated to promoting bamboo, protecting the environment and developing communities.",
  },
  startup: {
    eyebrow: "The startup",
    title: "A green enterprise born from climate urgency.",
    description:
      "Registered in 2025 after years of experimentation, BambouCamer Startup turns bamboo into ecological and economic solutions for communities.",
  },
  impact: {
    eyebrow: "Our impact",
    title: "Concrete progress on the ground",
    description:
      "Each indicator reflects a commitment kept with the communities and ecosystems we support.",
    newsCta: "See the news",
    pageEyebrow: "Share of completed tasks",
    pageTitle: "We turn commitments into measurable results.",
    pageDescription:
      "Follow the progress of our workstreams: every milestone strengthens the bamboo economy and the protection of our ecosystems.",
  },
  goals: {
    eyebrow: "4 sustainability goals",
    title: "Bamboo as an answer to social, economic and environmental challenges.",
    description:
      "An overlooked resource put to work for concrete transformation across Cameroon and Africa.",
    badge: "Goal",
  },
  news: {
    eyebrow: "News & field work",
    title: "Recent interventions where needs are real.",
    description:
      "BambouCamer acts concretely in Cameroon and Central Africa. Here is a look at our most recent actions.",
  },
  detail: {
    backSolutions: "Back to solutions",
    backGoals: "Back to goals",
    backNews: "Back to news",
    solutionEyebrow: "BambouCamer solution",
    goalEyebrow: "BambouCamer goal",
    talkCta: "Talk with us",
  },
  lang: {
    fr: "FR",
    en: "EN",
    switchTo: "Switch to",
  },
};

export const dictionaries: Record<Locale, Messages> = { fr, en };
