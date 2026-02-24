export interface HeroContent {
  title: string;
  subtitle: string;
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
  imageUrl: string;
}

export interface AboutContent {
  title: string;
  intro: string;
}

export interface ServiceTile {
  title: string;
  description: string;
}

export interface StatMetric {
  value: string;
  label: string;
}

export interface ContactContent {
  email: string;
  phone: string;
  location: string;
}

export interface SiteContent {
  hero: HeroContent;
  about: AboutContent;
  tiles: ServiceTile[];
  stats: StatMetric[];
  contact: ContactContent;
}

export const DEFAULT_CONTENT: SiteContent = {
  hero: {
    title: `Silniejsze ciało, spokojniejsza głowa`,
    subtitle: `Pracuję z zabieganymi ludźmi, którzy chcą odzyskać energię
      i pewność siebie dzięki dopasowanym treningom i pracy nad nawykami.`,
    primaryCtaLabel: `Umów konsultację`,
    secondaryCtaLabel: `Zobacz przemiany`,
    imageUrl: `assets/images/joanna-trener.jpg`,
  },
  about: {
    title: `Jak pracuję`,
    intro: `Łączę trening siłowy, mobilność i dbanie o regenerację.
      Opieram się na danych z pomiarów, ale słucham też intuicji
      podopiecznych. Każdy plan zaczyna się od dokładnego poznania
      Twoich celów i ograniczeń.`,
  },
  tiles: [
    {
      title: `Diagnoza startowa`,
      description: `Analiza postawy, mobilności i stylu życia pozwala dobrać
        najefektywniejszą drogę do wyniku.`,
    },
    {
      title: `Plan 360°`,
      description: `Trening, regeneracja i mikro cele tygodniowe. Wszystko w
        jednym dashboardzie dostępnym na telefonie.`,
    },
    {
      title: `Stała komunikacja`,
      description: `Szybkie konsultacje na czacie i cykliczne sesje video, by
        przystosować plan do Twojego życia.`,
    },
    {
      title: `Wynik i utrzymanie`,
      description: `Kończymy dopiero, gdy wiesz jak samodzielnie utrzymać formę
        i masz gotowe strategie na trudniejsze dni.`,
    },
  ],
  stats: [
    { value: `100`, label: `Podopiecznych rocznie` },
    { value: `8 lat`, label: `Doświadczenia` },
    { value: `95%`, label: `Klientów wraca po kolejną współpracę` },
  ],
  contact: {
    email: `kontakt@trenerpremium.pl`,
    phone: `+48 600 700 800`,
    location: `Studio Rzeszów / Online`,
  },
};
