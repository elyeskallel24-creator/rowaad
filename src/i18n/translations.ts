export type Lang = "en" | "fr";

type Dict = Record<string, { en: string; fr: string }>;

export const translations: Dict = {
  // Nav
  "nav.home": { en: "Home", fr: "Accueil" },
  "nav.services": { en: "Services", fr: "Services" },
  "nav.work": { en: "Our Work", fr: "Nos Projets" },
  "nav.intelligence": { en: "Intelligence", fr: "Intelligence" },
  "nav.about": { en: "About", fr: "À Propos" },
  "nav.invest": { en: "Invest", fr: "Investir" },
  "nav.contact": { en: "Contact", fr: "Contact" },
  "nav.bookCall": { en: "Book a Call", fr: "Réserver un Appel" },

  // Hero
  "hero.eyebrow": { en: "Revenue Architecture. Scale by Design.", fr: "Architecture des Revenus. Croissance par Conception." },
  "hero.line1": { en: "WE BUILD", fr: "NOUS CONSTRUISONS" },
  "hero.line2": { en: "GROWTH MACHINES.", fr: "DES MACHINES DE CROISSANCE." },
  "hero.sub": {
    en: "Rowaad is the elite growth agency for individuals, professionals, and B2B companies who are done with average results. We don't sell advice, we install systems that move money.",
    fr: "Rowaad est l'agence de croissance d'élite pour les individus, les professionnels et les entreprises B2B qui en ont fini avec les résultats médiocres. Nous ne vendons pas des conseils, nous installons des systèmes qui font circuler l'argent.",
  },
  "hero.cta1": { en: "Book a Strategy Call", fr: "Réserver un Appel Stratégique" },
  "hero.cta2": { en: "Explore Our Work", fr: "Explorer Nos Projets" },
  "hero.founderRole": { en: "Founder & CEO", fr: "Fondateur & CEO" },

  // Marquee
  "marquee.items": {
    en: "Revenue Systems · Growth Architecture · AI Stacks · Venture Optimization · Fractional CGO · Ecosystem Overhaul · High-Yield Assets",
    fr: "Systèmes de Revenus · Architecture de Croissance · Stacks IA · Optimisation Venture · CGO Fractionnel · Refonte Écosystème · Actifs à Haut Rendement",
  },

  // Services
  "services.eyebrow": { en: "What We Actually Do", fr: "Ce Que Nous Faisons Réellement" },
  "services.title1": { en: "The", fr: "Le" },
  "services.title2": { en: "Growth Stack", fr: "Stack de Croissance" },
  "services.s1.title": { en: "Fractional Chief Growth Officer", fr: "Directeur de la Croissance Fractionnel" },
  "services.s1.body": {
    en: "We embed directly into your company as your senior growth leadership, with a special-forces execution team built to hit revenue targets fast.",
    fr: "Nous nous intégrons directement dans votre entreprise en tant que direction senior de la croissance, avec une équipe d'exécution d'élite conçue pour atteindre rapidement vos objectifs de revenus.",
  },
  "services.s2.title": { en: "Revenue Systems Design", fr: "Conception de Systèmes de Revenus" },
  "services.s2.body": {
    en: "We architect the 'pipes' that move money through your operation without friction, CRM flows, automation, conversion systems, all wired together.",
    fr: "Nous concevons les « tuyaux » qui font circuler l'argent dans votre opération sans friction, flux CRM, automatisation, systèmes de conversion, tout interconnecté.",
  },
  "services.s3.title": { en: "Total Ecosystem Overhaul", fr: "Refonte Totale de l'Écosystème" },
  "services.s3.body": {
    en: "Tech stack + strategy rebuilt simultaneously. We don't patch problems. We replace the foundation and install a high-performance growth engine.",
    fr: "Stack technique et stratégie reconstruits simultanément. Nous ne colmatons pas les problèmes. Nous remplaçons les fondations et installons un moteur de croissance haute performance.",
  },
  "services.s4.title": { en: "Custom Growth Stack™", fr: "Stack de Croissance Sur Mesure™" },
  "services.s4.body": {
    en: "We build the exact combination of AI tools, integrations, and tactical frameworks your company needs, turning stagnant operations into high-yield assets.",
    fr: "Nous construisons la combinaison exacte d'outils IA, d'intégrations et de cadres tactiques dont votre entreprise a besoin, transformant les opérations stagnantes en actifs à haut rendement.",
  },
  "services.s5.title": { en: "Scale Architecture", fr: "Architecture de Mise à l'Échelle" },
  "services.s5.body": {
    en: "We identify every technical and operational bottleneck in your business and replace them with high-leverage AI systems, moving you toward 100% capacity.",
    fr: "Nous identifions chaque goulot d'étranglement technique et opérationnel de votre entreprise et les remplaçons par des systèmes IA à fort levier, vous rapprochant de 100% de capacité.",
  },
  "services.s6.title": { en: "Invest in Rowaad Projects", fr: "Investir dans les Projets Rowaad" },
  "services.s6.body": {
    en: "We build businesses we own entirely. As an investor, you can participate and receive monthly revenue. Exclusive access to curated high-potential ventures.",
    fr: "Nous bâtissons des entreprises que nous possédons entièrement. En tant qu'investisseur, vous pouvez participer et recevoir des revenus mensuels. Accès exclusif à des ventures à fort potentiel sélectionnées.",
  },

  // Why Rowaad
  "why.eyebrow": { en: "Why Rowaad", fr: "Pourquoi Rowaad" },
  "why.title1": { en: "NOT AN", fr: "PAS UNE" },
  "why.title2": { en: "AGENCY.", fr: "AGENCE." },
  "why.title3": { en: "A GROWTH OS.", fr: "UN OS DE CROISSANCE." },
  "why.body": {
    en: "While others sell decks, we install engines. Built to hit revenue targets, not to fill calendars.",
    fr: "Alors que d'autres vendent des présentations, nous installons des moteurs. Conçus pour atteindre les objectifs de revenus, pas pour remplir des agendas.",
  },
  "why.p1": { en: "Systems-first, not campaign-first", fr: "D'abord les systèmes, pas les campagnes" },
  "why.p2": { en: "We take on limited clients, by qualification only", fr: "Nous prenons un nombre limité de clients, sur qualification uniquement" },
  "why.p3": { en: "We operate in the high-end B2B space exclusively", fr: "Nous opérons exclusivement dans l'espace B2B haut de gamme" },
  "why.p4": { en: "Founded by Elyes Kallel, 28 April 2026", fr: "Fondée par Elyes Kallel, 28 avril 2026" },

  // Our Work
  "work.eyebrow": { en: "Built. Shipped. Scaled.", fr: "Construit. Livré. Mis à l'échelle." },
  "work.title": { en: "Our Work", fr: "Nos Projets" },
  "work.empty": { en: "Projects coming soon", fr: "Projets bientôt disponibles" },
  "work.emptySub": { en: "New ventures are being shipped from the lab.", fr: "De nouvelles ventures sortent du laboratoire." },
  "work.viewProject": { en: "View Project", fr: "Voir le Projet" },
  "work.filterAll": { en: "All", fr: "Tous" },

  // Founder
  "founder.eyebrow": { en: "The Architect Behind Rowaad", fr: "L'Architecte Derrière Rowaad" },
  "founder.role": { en: "Founder & CEO", fr: "Fondateur & CEO" },
  "founder.statement": {
    en: "\"Rowaad was born from a simple conviction: most companies are not limited by ambition, they're limited by broken systems. We exist to fix that. Permanently.\"",
    fr: "« Rowaad est né d'une conviction simple : la plupart des entreprises ne sont pas limitées par leur ambition, elles sont limitées par des systèmes défaillants. Nous existons pour y remédier. Définitivement. »",
  },
  "founder.founded": { en: "Founded", fr: "Fondée" },
  "founder.based": { en: "Based", fr: "Basée à" },

  // Team
  "team.eyebrow": { en: "The people behind the systems.", fr: "Les personnes derrière les systèmes." },
  "team.title": { en: "The Team", fr: "L'Équipe" },
  "team.empty": { en: "Team members coming soon.", fr: "Membres de l'équipe bientôt disponibles." },

  // Partners
  "partners.eyebrow": { en: "Trusted by the right people", fr: "La Confiance des Bonnes Personnes" },
  "partners.title": { en: "Partners & Clients", fr: "Partenaires & Clients" },
  "partners.empty": { en: "Strategic partnerships are being onboarded.", fr: "Des partenariats stratégiques sont en cours d'intégration." },

  // Invest (home teaser + invest page)
  "invest.eyebrow": { en: "Rowaad Ventures", fr: "Rowaad Ventures" },
  "invest.title1": { en: "Invest in", fr: "Investissez dans" },
  "invest.title2": { en: "what we build.", fr: "ce que nous construisons." },
  "invest.body": {
    en: "Rowaad doesn't just serve businesses, we build them. Every project we launch is owned entirely by Rowaad. Selected investors receive monthly revenue distributions from our portfolio of ventures.",
    fr: "Rowaad ne se contente pas de servir des entreprises, nous les construisons. Chaque projet que nous lançons est entièrement détenu par Rowaad. Les investisseurs sélectionnés reçoivent des distributions mensuelles de revenus issues de notre portefeuille de ventures.",
  },
  "invest.cta": { en: "Explore Investment Opportunities", fr: "Explorer les Opportunités d'Investissement" },
  "invest.cta.full": { en: "See the Full Investment Architecture", fr: "Voir l'Architecture d'Investissement Complète" },
  "invest.stat.owned": { en: "Owned", fr: "Détenu" },
  "invest.stat.distribution": { en: "Distribution", fr: "Distribution" },
  "invest.stat.access": { en: "Access", fr: "Accès" },
  "invest.stat.ownedV": { en: "100%", fr: "100%" },
  "invest.stat.distributionV": { en: "Monthly", fr: "Mensuelle" },
  "invest.stat.accessV": { en: "Curated", fr: "Sélectif" },

  // Footer
  "footer.cta": { en: "Ready to build your growth machine?", fr: "Prêt à construire votre machine de croissance ?" },
  "footer.copy": { en: "© 2026 Rowaad. All rights reserved.", fr: "© 2026 Rowaad. Tous droits réservés." },
  "footer.navigate": { en: "Navigate", fr: "Navigation" },
  "footer.origin": { en: "Origin", fr: "Origine" },
  "footer.founded": { en: "Initiated 28 April 2026", fr: "Fondée le 28 Avril 2026" },
  "footer.location": { en: "Tunis, Tunisia", fr: "Tunis, Tunisie" },

  // Contact
  "contact.session": { en: "Strategy Session", fr: "Session Stratégique" },
  "contact.modalTitle": { en: "Book a Call", fr: "Réserver un Appel" },
  "contact.modalSub": { en: "Tell us about your business. We'll respond within 24 hours.", fr: "Parlez-nous de votre entreprise. Nous répondrons sous 24 heures." },
  "contact.title1": { en: "Let's", fr: "Construisons" },
  "contact.title2": { en: "Build.", fr: "Ensemble." },
  "contact.sub": {
    en: "We accept a limited number of clients per quarter. Tell us about your business and we'll respond personally on WhatsApp within 24 hours.",
    fr: "Nous acceptons un nombre limité de clients par trimestre. Parlez-nous de votre entreprise et nous vous répondrons personnellement sur WhatsApp sous 24 heures.",
  },
  "contact.bullet1": { en: "Reach out via WhatsApp after submission", fr: "Contact WhatsApp après soumission" },
  "contact.bullet2": { en: "Direct line opened upon qualification", fr: "Ligne directe ouverte après qualification" },
  "contact.bullet3": { en: "Tunis, Tunisia · Operating globally", fr: "Tunis, Tunisie · Opérations mondiales" },
  "contact.formTitle": { en: "Request a Strategy Session", fr: "Demander une Session Stratégique" },
  "contact.success": { en: "Request received", fr: "Demande reçue" },
  "contact.successSub": { en: "Your strategy session request has been logged. Elyes will reach out personally on WhatsApp soon.", fr: "Votre demande de session stratégique a été enregistrée. Elyes vous contactera personnellement sur WhatsApp prochainement." },
  "contact.close": { en: "Close", fr: "Fermer" },

  // Form fields
  "form.name": { en: "Full Name", fr: "Nom Complet" },
  "form.email": { en: "Email Address", fr: "Adresse Email" },
  "form.whatsapp": { en: "WhatsApp Number", fr: "Numéro WhatsApp" },
  "form.company": { en: "Company / What do you need?", fr: "Entreprise / Description du Projet" },
  "form.companyPh": { en: "Tell us about your business and goals...", fr: "Parlez-nous de votre entreprise et de vos objectifs..." },
  "form.date": { en: "Preferred Date", fr: "Date Préférée" },
  "form.time": { en: "Preferred Time", fr: "Heure Préférée" },
  "form.submit": { en: "Request My Strategy Session", fr: "Demander Ma Session Stratégique" },
  "form.required": { en: "Required", fr: "Requis" },
  "form.invalidEmail": { en: "Valid email required", fr: "Email valide requis" },

  // Intelligence
  "intel.eyebrow": { en: "Rowaad Intelligence", fr: "Rowaad Intelligence" },
  "intel.title1": { en: "We don't guess.", fr: "Nous ne devinons pas." },
  "intel.title2": { en: "We measure.", fr: "Nous mesurons." },
  "intel.sub": {
    en: "Live, illustrative views of the market signals we track to architect revenue systems. Sources are public, models are ours.",
    fr: "Vues illustratives en direct des signaux de marché que nous suivons pour concevoir des systèmes de revenus. Sources publiques, modèles propriétaires.",
  },
  "intel.disclaimer": {
    en: "ILLUSTRATIVE PROJECTION MODEL — All figures are based on public market data and Rowaad internal modeling. Not a forecast, not a guarantee.",
    fr: "MODÈLE DE PROJECTION ILLUSTRATIF — Tous les chiffres sont basés sur des données publiques et la modélisation interne Rowaad. Ni prévision ni garantie.",
  },
  "intel.b1.title": { en: "B2B AI Adoption Curve", fr: "Courbe d'Adoption IA B2B" },
  "intel.b1.note": { en: "Source: McKinsey State of AI 2024 — % of mid-market firms using generative AI in at least one function.", fr: "Source : McKinsey State of AI 2024 — % d'entreprises mid-market utilisant l'IA générative dans au moins une fonction." },
  "intel.b2.title": { en: "Revenue per Operator (Lean Teams)", fr: "Revenu par Opérateur (Équipes Restreintes)" },
  "intel.b2.note": { en: "Public benchmarks: Stripe Atlas, Bessemer Cloud Index — illustrative range across SaaS cohorts 2021–2025.", fr: "Benchmarks publics : Stripe Atlas, Bessemer Cloud Index — fourchette illustrative cohortes SaaS 2021–2025." },
  "intel.b3.title": { en: "Conversion System Maturity", fr: "Maturité des Systèmes de Conversion" },
  "intel.b3.note": { en: "Rowaad scoring rubric, anchored to HubSpot Sales Trends Report.", fr: "Grille Rowaad, ancrée au HubSpot Sales Trends Report." },
  "intel.b4.title": { en: "Time-to-Revenue After System Install", fr: "Délai au Revenu Après Installation" },
  "intel.b4.note": { en: "Illustrative model — typical engagement curve for mid-market growth installs.", fr: "Modèle illustratif — courbe typique pour installations growth mid-market." },
  "intel.b5.title": { en: "12-Month Revenue Ramp", fr: "Montée en Revenu sur 12 Mois" },
  "intel.b5.note": { en: "ILLUSTRATIVE PROJECTION MODEL — Not a forecast.", fr: "MODÈLE DE PROJECTION ILLUSTRATIF — Pas une prévision." },
  "intel.b6.title": { en: "Channel Efficiency Map", fr: "Carte d'Efficacité des Canaux" },
  "intel.b6.note": { en: "Public CAC/LTV ranges across paid, organic, and partnership motions.", fr: "Fourchettes CAC/LTV publiques sur canaux payants, organiques et partenariats." },
  "intel.terminal.title": { en: "Live Market Signal", fr: "Signal de Marché en Direct" },

  // Invest expanded
  "invest.arch.title": { en: "The Investment Architecture", fr: "L'Architecture d'Investissement" },
  "invest.arch.sub": { en: "Four steps. Total transparency. Zero guarantees of return.", fr: "Quatre étapes. Transparence totale. Aucune garantie de rendement." },
  "invest.step1.t": { en: "We Build", fr: "Nous Construisons" },
  "invest.step1.b": { en: "Rowaad funds and builds the venture, 100% owned by Rowaad. No third-party founders.", fr: "Rowaad finance et construit la venture, 100% détenue par Rowaad. Aucun fondateur tiers." },
  "invest.step2.t": { en: "We Operate", fr: "Nous Opérons" },
  "invest.step2.b": { en: "Our team installs the growth system, runs operations, and reports monthly performance.", fr: "Notre équipe installe le système de croissance, opère et rapporte la performance mensuelle." },
  "invest.step3.t": { en: "You Participate", fr: "Vous Participez" },
  "invest.step3.b": { en: "Qualified investors receive a defined revenue share, paid monthly from venture cashflow.", fr: "Les investisseurs qualifiés reçoivent une part de revenus définie, versée mensuellement." },
  "invest.step4.t": { en: "Compounding", fr: "Composition" },
  "invest.step4.b": { en: "Reinvest distributions into new ventures or withdraw, your choice each cycle.", fr: "Réinvestissez les distributions ou retirez-les, votre choix à chaque cycle." },
  "invest.tiers.title": { en: "Investor Tiers", fr: "Niveaux d'Investisseurs" },
  "invest.tiers.sub": { en: "Access is by qualification only. Tier sizing discussed privately.", fr: "Accès sur qualification uniquement. Dimensionnement discuté en privé." },
  "invest.tier1.n": { en: "Observer", fr: "Observateur" },
  "invest.tier1.b": { en: "Quarterly portfolio briefings. No capital commitment.", fr: "Briefings trimestriels. Aucun engagement capital." },
  "invest.tier2.n": { en: "Allocator", fr: "Allocateur" },
  "invest.tier2.b": { en: "Single-venture allocation, monthly distributions, performance reporting.", fr: "Allocation venture unique, distributions mensuelles, reporting." },
  "invest.tier3.n": { en: "Architect", fr: "Architecte" },
  "invest.tier3.b": { en: "Multi-venture portfolio access, priority on new launches.", fr: "Accès portefeuille multi-ventures, priorité sur nouveaux lancements." },
  "invest.tier4.n": { en: "Principal", fr: "Principal" },
  "invest.tier4.b": { en: "Strategic seat, co-design of new ventures, full portfolio coverage.", fr: "Siège stratégique, co-conception, couverture portefeuille complète." },
  "invest.ramp.title": { en: "Illustrative 12-Month Revenue Ramp", fr: "Montée en Revenu Illustrative 12 Mois" },
  "invest.disclaimer": {
    en: "No guaranteed return. No public solicitation. Distributions depend entirely on venture performance and may be zero in any given month.",
    fr: "Aucun rendement garanti. Aucune sollicitation publique. Les distributions dépendent entièrement de la performance des ventures et peuvent être nulles.",
  },
};

export function translate(key: string, lang: Lang): string {
  const entry = translations[key];
  if (!entry) return key;
  return entry[lang] ?? entry.en;
}
