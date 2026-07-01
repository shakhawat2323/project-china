export type Locale =
  | "en"
  | "zh"
  | "bn"
  | "de"
  | "ja"
  | "ko"
  | "hi"
  | "ur"
  | "fr"
  | "it"
  | "es"
  | "ru"
  | "pt"
  | "ar"
  | "tr"
  | "af";

export type CountryCode =
  | "US"
  | "GB"
  | "CA"
  | "AU"
  | "CN"
  | "BD"
  | "DE"
  | "JP"
  | "KR"
  | "IN"
  | "PK"
  | "FR"
  | "IT"
  | "ES"
  | "RU"
  | "BR"
  | "SA"
  | "AE"
  | "TR"
  | "ZA";

export type CountryOption = {
  countryCode: CountryCode;
  locale: Locale;
  label: string;
  nativeLabel: string;
  shortLabel: string;
};

export type NavItem = {
  title: string;
  items: string[];
};

export type Dictionary = {
  navbar: {
    companyName: string;
    logoAlt: string;
    badge: string;
    countries: string;
    selectCountry: string;
    navigation: string;
    explore: string;
    login: string;
    homePanelTitle: string;
    homePanelDescription: string;
    navItems: NavItem[];
    homeHighlights: {
      label: string;
      description: string;
    }[];
    theme: {
      toggle: string;
      light: string;
      dark: string;
      system: string;
    };
  };
  home: {
    title: string;
    description: string;
    selectedLanguage: string;
  };
  sections: {
    hero: {
      eyebrow: string;
      title: string;
      description: string;
      quoteBtn: string;
      productsBtn: string;
      badges: string[];
    };
    about: {
      eyebrow: string;
      title: string;
      description: string;
      videoTitle: string;
    };
    products: {
      eyebrow: string;
      title: string;
      description: string;
      allLink: string;
      videoTitle: string;
      items: string[];
    };
    capability: {
      eyebrow: string;
      title: string;
      description: string;
      videoTitle: string;
      items: string[];
    };
    assembly: {
      eyebrow: string;
      title: string;
      description: string;
      videoTitle: string;
      items: string[];
    };
    quality: {
      eyebrow: string;
      title: string;
      description: string;
      videoTitle: string;
      steps: string[];
    };
    industries: {
      eyebrow: string;
      title: string;
      description: string;
      videoTitle: string;
      items: string[];
    };
    factory: {
      eyebrow: string;
      title: string;
      description: string;
      videoTitle: string;
    };
    contact: {
      eyebrow: string;
      title: string;
      description: string;
      salesBtn: string;
      supportBtn: string;
      videoTitle: string;
    };
  };
  footer: {
    description: string;
    aboutTitle: string;
    productsTitle: string;
    capabilitiesTitle: string;
    contactTitle: string;
    addressLabel: string;
    addressVal: string;
    phoneLabel: string;
    phoneVal: string;
    emailLabel: string;
    emailVal: string;
    copyright: string;
  };
};

export const defaultLocale: Locale = "en";

export const countryOptions: CountryOption[] = [
  {
    countryCode: "CN",
    locale: "zh",
    label: "China",
    nativeLabel: "Chinese",
    shortLabel: "CN",
  },
  {
    countryCode: "US",
    locale: "en",
    label: "United States",
    nativeLabel: "English",
    shortLabel: "US",
  },
  {
    countryCode: "GB",
    locale: "en",
    label: "United Kingdom",
    nativeLabel: "English",
    shortLabel: "UK",
  },
  {
    countryCode: "DE",
    locale: "de",
    label: "Germany",
    nativeLabel: "German",
    shortLabel: "DE",
  },
  {
    countryCode: "JP",
    locale: "ja",
    label: "Japan",
    nativeLabel: "Japanese",
    shortLabel: "JP",
  },
  {
    countryCode: "KR",
    locale: "ko",
    label: "South Korea",
    nativeLabel: "Korean",
    shortLabel: "KR",
  },
  {
    countryCode: "CA",
    locale: "en",
    label: "Canada",
    nativeLabel: "English",
    shortLabel: "CA",
  },
  {
    countryCode: "AU",
    locale: "en",
    label: "Australia",
    nativeLabel: "English",
    shortLabel: "AU",
  },
  {
    countryCode: "BD",
    locale: "bn",
    label: "Bangladesh",
    nativeLabel: "Bangla",
    shortLabel: "BD",
  },
  {
    countryCode: "IN",
    locale: "hi",
    label: "India",
    nativeLabel: "Hindi",
    shortLabel: "IN",
  },
  {
    countryCode: "PK",
    locale: "ur",
    label: "Pakistan",
    nativeLabel: "Urdu",
    shortLabel: "PK",
  },
  {
    countryCode: "FR",
    locale: "fr",
    label: "France",
    nativeLabel: "French",
    shortLabel: "FR",
  },
  {
    countryCode: "IT",
    locale: "it",
    label: "Italy",
    nativeLabel: "Italian",
    shortLabel: "IT",
  },
  {
    countryCode: "ES",
    locale: "es",
    label: "Spain",
    nativeLabel: "Spanish",
    shortLabel: "ES",
  },
  {
    countryCode: "RU",
    locale: "ru",
    label: "Russia",
    nativeLabel: "Russian",
    shortLabel: "RU",
  },
  {
    countryCode: "BR",
    locale: "pt",
    label: "Brazil",
    nativeLabel: "Portuguese",
    shortLabel: "BR",
  },
  {
    countryCode: "SA",
    locale: "ar",
    label: "Saudi Arabia",
    nativeLabel: "Arabic",
    shortLabel: "SA",
  },
  {
    countryCode: "AE",
    locale: "ar",
    label: "United Arab Emirates",
    nativeLabel: "Arabic",
    shortLabel: "AE",
  },
  {
    countryCode: "TR",
    locale: "tr",
    label: "Turkey",
    nativeLabel: "Turkish",
    shortLabel: "TR",
  },
  {
    countryCode: "ZA",
    locale: "af",
    label: "South Africa",
    nativeLabel: "Afrikaans",
    shortLabel: "ZA",
  },
];

export const sourceDictionary: Dictionary = {
  navbar: {
    companyName: "Wuping Feitian Electronic Technology Company Limited",
    logoAlt: "Wuping Feitian Electronic Technology Company Limited logo",
    badge: "Precision PCB Partner",
    countries: "Countries",
    selectCountry: "Select Country",
    navigation: "Navigation",
    explore: "Explore",
    login: "Login",
    homePanelTitle: "Explore our company at a glance",
    homePanelDescription:
      "Quick access to company intro, latest updates, and career opportunities.",
    navItems: [
      {
        title: "Home",
        items: ["Welcome", "News & Updates", "Careers"],
      },
      {
        title: "About FT",
        items: [
          "Company Profile",
          "Our Team",
          "Our Advantage",
          "Service",
          "Why Choose Us",
          "Testimonials",
          "Industries",
          "Privacy Policy",
          "PCB Blogs",
        ],
      },
      {
        title: "Products",
        items: ["PCB Products", "PCBA Products"],
      },
      {
        title: "PCB Manufacture",
        items: [
          "Overview",
          "Equipments",
          "Material",
          "Impedance PCB",
          "Testing",
          "Prototype",
          "FAQ",
        ],
      },
      {
        title: "PCB Assembly",
        items: [
          "Overview",
          "Equipments",
          "Prototype Assembly",
          "Low Volume",
          "High Volume",
          "Fast Turn",
          "Turnkey",
          "Partial Turnkey",
          "FAQ",
        ],
      },
      {
        title: "Capability",
        items: [
          "Rigid PCB",
          "SMT",
          "Metal Core",
          "Flex PCB",
          "Testing",
          "Quality Control",
        ],
      },
      {
        title: "Value Add Service",
        items: [
          "Components Sourcing",
          "Cable Harness",
          "Coating",
          "Programming",
          "Stencil",
        ],
      },
      {
        title: "Contact",
        items: ["Sales Inquiry", "Support Team", "Office Address"],
      },
    ],
    homeHighlights: [
      {
        label: "Welcome",
        description: "Start here and discover our factory strengths.",
      },
      {
        label: "News & Updates",
        description: "See the latest company and production updates.",
      },
      {
        label: "Careers",
        description: "Join our team and grow with our engineering culture.",
      },
    ],
    theme: {
      toggle: "Toggle theme",
      light: "Light",
      dark: "Dark",
      system: "System",
    },
  },
  home: {
    title: "Welcome to our website",
    description:
      "Choose a country from the navbar to translate every website text dynamically.",
    selectedLanguage: "Current language",
  },
  sections: {
    hero: {
      eyebrow: "Precision PCB and PCBA Manufacturing Partner",
      title: "Reliable PCB production for modern electronics.",
      description:
        "Wuping Feitian Electronic Technology Company Limited supports PCB fabrication, assembly, testing, and value-added production services for global electronics teams.",
      quoteBtn: "Get Quote",
      productsBtn: "View Products",
      badges: ["Prototype to volume", "PCB and PCBA", "Quality inspection"],
    },
    about: {
      eyebrow: "About",
      title: "Engineering-focused support from quote to shipment",
      description:
        "The homepage can introduce the company as a practical production partner for PCB fabrication, PCBA assembly, sourcing, and final inspection.",
      videoTitle: "Company overview video",
    },
    products: {
      eyebrow: "Products",
      title: "PCB and PCBA product categories",
      description:
        "Show users the main product families quickly, with visual examples for each board type and assembly service.",
      allLink: "All products",
      videoTitle: "Product showcase video",
      items: [
        "Rigid PCB",
        "Flex PCB",
        "Metal Core PCB",
        "HDI PCB",
        "Prototype PCB",
        "PCBA Products",
      ],
    },
    capability: {
      eyebrow: "Capability",
      title: "Production capability built for repeatable results",
      description:
        "This section can highlight technical capacity, process control, material choices, and test coverage.",
      videoTitle: "Capability walkthrough video",
      items: [
        "Single to multilayer PCB production",
        "Impedance control and material selection",
        "Prototype, low-volume, and high-volume runs",
        "Surface finishes for reliable solderability",
        "Electrical test, AOI, and final inspection",
        "Engineering support before production",
      ],
    },
    assembly: {
      eyebrow: "PCB Assembly",
      title: "Assembly services for prototypes and production orders",
      description:
        "Use this area to explain SMT, DIP, component sourcing, fast-turn prototypes, and production assembly support.",
      videoTitle: "Assembly process video",
      items: [
        "SMT assembly",
        "DIP assembly",
        "Turnkey sourcing",
        "Prototype assembly",
        "Low-volume assembly",
        "High-volume assembly",
      ],
    },
    quality: {
      eyebrow: "Quality",
      title: "Inspection checkpoints across the production flow",
      description:
        "A quality section helps buyers understand how boards are reviewed before shipment.",
      videoTitle: "Quality control video",
      steps: [
        "Incoming material check",
        "Process inspection",
        "AOI review",
        "Electrical testing",
        "Final visual inspection",
        "Packaging control",
      ],
    },
    industries: {
      eyebrow: "Industries",
      title: "PCB support for demanding electronics categories",
      description:
        "This section connects the factory capability with the market categories your customers care about.",
      videoTitle: "Industry applications video",
      items: [
        "Industrial control",
        "Consumer electronics",
        "Communication devices",
        "Automotive electronics",
        "Medical equipment",
        "LED and IoT products",
      ],
    },
    factory: {
      eyebrow: "Factory",
      title: "Visual factory and equipment showcase",
      description:
        "A media-heavy factory section builds trust by showing production scenes, machines, operators, and finished boards.",
      videoTitle: "Factory tour video",
    },
    contact: {
      eyebrow: "Request Quote",
      title: "Ready to discuss PCB or PCBA production?",
      description:
        "Add your quote form, sales email, WhatsApp, or file upload workflow here so buyers can move from browsing to inquiry quickly.",
      salesBtn: "Sales Inquiry",
      supportBtn: "Support Team",
      videoTitle: "Customer communication video",
    },
  },
  footer: {
    description:
      "Precision PCB and PCBA manufacturing partner for prototype, low-volume, and high-volume electronics production.",
    aboutTitle: "About Us",
    productsTitle: "Products",
    capabilitiesTitle: "Capabilities",
    contactTitle: "Contact Us",
    addressLabel: "Address",
    addressVal: "Wuping County, Longyan City, Fujian Province, China",
    phoneLabel: "Phone",
    phoneVal: "+86 123 4567 8901",
    emailLabel: "Email",
    emailVal: "sales@FT.com",
    copyright: "Â© 2026 Wuping Feitian Electronic Technology Company Limited. All rights reserved.",
  },
};

type PartialDictionary = {
  [Key in keyof Dictionary]?: Dictionary[Key] extends Array<unknown>
    ? Dictionary[Key]
    : Dictionary[Key] extends object
      ? PartialDictionaryObject<Dictionary[Key]>
      : Dictionary[Key];
};

type PartialDictionaryObject<T> = {
  [Key in keyof T]?: T[Key] extends Array<unknown>
    ? T[Key]
    : T[Key] extends object
      ? PartialDictionaryObject<T[Key]>
      : T[Key];
};

function mergeDictionary<T extends Record<string, unknown>>(base: T, override?: PartialDictionaryObject<T>): T {
  if (!override) {
    return structuredClone(base);
  }

  const output = structuredClone(base) as Record<string, unknown>;

  Object.entries(override).forEach(([key, value]) => {
    if (value === undefined) {
      return;
    }

    const currentValue = output[key];
    const shouldMergeObject =
      value &&
      currentValue &&
      typeof value === "object" &&
      typeof currentValue === "object" &&
      !Array.isArray(value) &&
      !Array.isArray(currentValue);

    output[key] = shouldMergeObject
      ? mergeDictionary(currentValue as Record<string, unknown>, value as PartialDictionaryObject<Record<string, unknown>>)
      : value;
  });

  return output as T;
}

const localizedNavItems: Record<Exclude<Locale, "en">, NavItem[]> = {
  zh: [
    { title: "é¦–é¡µ", items: ["æ¬¢è¿Ž", "æ–°é—»åŠ¨æ€", "æ‹›è˜"] },
    { title: "å…³äºŽ FT", items: ["å…¬å¸ç®€ä»‹", "å›¢é˜Ÿ", "ä¼˜åŠ¿", "æœåŠ¡", "ä¸ºä»€ä¹ˆé€‰æ‹©æˆ‘ä»¬", "å®¢æˆ·è¯„ä»·", "è¡Œä¸šåº”ç”¨", "éšç§æ”¿ç­–", "PCB åšå®¢"] },
    { title: "äº§å“", items: ["PCB äº§å“", "PCBA äº§å“"] },
    { title: "PCB åˆ¶é€ ", items: ["æ¦‚è§ˆ", "è®¾å¤‡", "ææ–™", "é˜»æŠ— PCB", "æµ‹è¯•", "æ ·å“", "å¸¸è§é—®é¢˜"] },
    { title: "PCB ç»„è£…", items: ["æ¦‚è§ˆ", "è®¾å¤‡", "æ ·å“ç»„è£…", "å°æ‰¹é‡", "å¤§æ‰¹é‡", "å¿«é€Ÿäº¤ä»˜", "å…¨ turnkey", "éƒ¨åˆ† turnkey", "å¸¸è§é—®é¢˜"] },
    { title: "èƒ½åŠ›", items: ["åˆšæ€§ PCB", "SMT", "é‡‘å±žåŸºæ¿", "æŸ”æ€§ PCB", "æµ‹è¯•", "è´¨é‡æŽ§åˆ¶"] },
    { title: "å¢žå€¼æœåŠ¡", items: ["å…ƒå™¨ä»¶é‡‡è´­", "çº¿æŸ", "æ¶‚è¦†", "çƒ§å½•", "é’¢ç½‘"] },
    { title: "è”ç³»", items: ["é”€å”®å’¨è¯¢", "æ”¯æŒå›¢é˜Ÿ", "åŠžå…¬åœ°å€"] },
  ],
  bn: [
    { title: "à¦¹à§‹à¦®", items: ["à¦¸à§à¦¬à¦¾à¦—à¦¤à¦®", "à¦–à¦¬à¦° à¦“ à¦†à¦ªà¦¡à§‡à¦Ÿ", "à¦•à§à¦¯à¦¾à¦°à¦¿à¦¯à¦¼à¦¾à¦°"] },
    { title: "FT à¦¸à¦®à§à¦ªà¦°à§à¦•à§‡", items: ["à¦•à§‹à¦®à§à¦ªà¦¾à¦¨à¦¿ à¦ªà§à¦°à§‹à¦«à¦¾à¦‡à¦²", "à¦†à¦®à¦¾à¦¦à§‡à¦° à¦Ÿà¦¿à¦®", "à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à§à¦¬à¦¿à¦§à¦¾", "à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸", "à¦•à§‡à¦¨ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¬à§‡à¦›à§‡ à¦¨à§‡à¦¬à§‡à¦¨", "à¦•à¦¾à¦¸à§à¦Ÿà¦®à¦¾à¦° à¦°à¦¿à¦­à¦¿à¦‰", "à¦‡à¦¨à§à¦¡à¦¾à¦¸à§à¦Ÿà§à¦°à¦¿", "à¦ªà§à¦°à¦¾à¦‡à¦­à§‡à¦¸à¦¿ à¦ªà¦²à¦¿à¦¸à¦¿", "PCB à¦¬à§à¦²à¦—"] },
    { title: "à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿà¦¸", items: ["PCB à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ", "PCBA à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ"] },
    { title: "PCB à¦®à§à¦¯à¦¾à¦¨à§à¦«à§à¦¯à¦¾à¦•à¦šà¦¾à¦°", items: ["à¦“à¦­à¦¾à¦°à¦­à¦¿à¦‰", "à¦‡à¦•à§à¦‡à¦ªà¦®à§‡à¦¨à§à¦Ÿ", "à¦®à§à¦¯à¦¾à¦Ÿà§‡à¦°à¦¿à¦¯à¦¼à¦¾à¦²", "à¦‡à¦®à§à¦ªà¦¿à¦¡à§‡à¦¨à§à¦¸ PCB", "à¦Ÿà§‡à¦¸à§à¦Ÿà¦¿à¦‚", "à¦ªà§à¦°à§‹à¦Ÿà§‹à¦Ÿà¦¾à¦‡à¦ª", "FAQ"] },
    { title: "PCB à¦…à§à¦¯à¦¾à¦¸à§‡à¦®à§à¦¬à¦²à¦¿", items: ["à¦“à¦­à¦¾à¦°à¦­à¦¿à¦‰", "à¦‡à¦•à§à¦‡à¦ªà¦®à§‡à¦¨à§à¦Ÿ", "à¦ªà§à¦°à§‹à¦Ÿà§‹à¦Ÿà¦¾à¦‡à¦ª à¦…à§à¦¯à¦¾à¦¸à§‡à¦®à§à¦¬à¦²à¦¿", "à¦²à§‹ à¦­à¦²à¦¿à¦‰à¦®", "à¦¹à¦¾à¦‡ à¦­à¦²à¦¿à¦‰à¦®", "à¦«à¦¾à¦¸à§à¦Ÿ à¦Ÿà¦¾à¦°à§à¦¨", "à¦Ÿà¦¾à¦°à§à¦¨à¦•à¦¿", "à¦ªà¦¾à¦°à§à¦¶à¦¿à¦¯à¦¼à¦¾à¦² à¦Ÿà¦¾à¦°à§à¦¨à¦•à¦¿", "FAQ"] },
    { title: "à¦•à§à¦¯à¦¾à¦ªà¦¾à¦¬à¦¿à¦²à¦¿à¦Ÿà¦¿", items: ["à¦°à¦¿à¦œà¦¿à¦¡ PCB", "SMT", "à¦®à§‡à¦Ÿà¦¾à¦² à¦•à§‹à¦°", "à¦«à§à¦²à§‡à¦•à§à¦¸ PCB", "à¦Ÿà§‡à¦¸à§à¦Ÿà¦¿à¦‚", "à¦•à§‹à¦¯à¦¼à¦¾à¦²à¦¿à¦Ÿà¦¿ à¦•à¦¨à§à¦Ÿà§à¦°à§‹à¦²"] },
    { title: "à¦­à§à¦¯à¦¾à¦²à§ à¦…à§à¦¯à¦¾à¦¡ à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸", items: ["à¦•à¦®à§à¦ªà§‹à¦¨à§‡à¦¨à§à¦Ÿ à¦¸à§‹à¦°à§à¦¸à¦¿à¦‚", "à¦•à§‡à¦¬à¦² à¦¹à¦¾à¦°à¦¨à§‡à¦¸", "à¦•à§‹à¦Ÿà¦¿à¦‚", "à¦ªà§à¦°à§‹à¦—à§à¦°à¦¾à¦®à¦¿à¦‚", "à¦¸à§à¦Ÿà§‡à¦¨à¦¸à¦¿à¦²"] },
    { title: "à¦¯à§‹à¦—à¦¾à¦¯à§‹à¦—", items: ["à¦¸à§‡à¦²à¦¸ à¦‡à¦¨à¦•à§‹à¦¯à¦¼à¦¾à¦°à¦¿", "à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ à¦Ÿà¦¿à¦®", "à¦…à¦«à¦¿à¦¸ à¦ à¦¿à¦•à¦¾à¦¨à¦¾"] },
  ],
  de: [
    { title: "Startseite", items: ["Willkommen", "Neuigkeiten", "Karriere"] },
    { title: "Ãœber FT", items: ["Unternehmensprofil", "Team", "Vorteile", "Service", "Warum wir", "Referenzen", "Branchen", "Datenschutz", "PCB Blog"] },
    { title: "Produkte", items: ["PCB Produkte", "PCBA Produkte"] },
    { title: "PCB Fertigung", items: ["Ãœberblick", "AusrÃ¼stung", "Material", "Impedanz PCB", "PrÃ¼fung", "Prototyp", "FAQ"] },
    { title: "PCB Montage", items: ["Ãœberblick", "AusrÃ¼stung", "Prototypenmontage", "Kleinserie", "GroÃŸserie", "Express", "Turnkey", "Teil-Turnkey", "FAQ"] },
    { title: "FÃ¤higkeiten", items: ["Starre PCB", "SMT", "Metallkern", "Flexible PCB", "PrÃ¼fung", "QualitÃ¤tskontrolle"] },
    { title: "Mehrwertservice", items: ["Bauteilbeschaffung", "Kabelbaum", "Beschichtung", "Programmierung", "Schablone"] },
    { title: "Kontakt", items: ["Vertrieb", "Support", "Adresse"] },
  ],
  ja: [
    { title: "ãƒ›ãƒ¼ãƒ ", items: ["ã‚ˆã†ã“ã", "ãƒ‹ãƒ¥ãƒ¼ã‚¹", "æŽ¡ç”¨æƒ…å ±"] },
    { title: "FT ã«ã¤ã„ã¦", items: ["ä¼šç¤¾æ¦‚è¦", "ãƒãƒ¼ãƒ ", "å¼·ã¿", "ã‚µãƒ¼ãƒ“ã‚¹", "é¸ã°ã‚Œã‚‹ç†ç”±", "ãŠå®¢æ§˜ã®å£°", "æ¥­ç•Œ", "ãƒ—ãƒ©ã‚¤ãƒã‚·ãƒ¼", "PCBãƒ–ãƒ­ã‚°"] },
    { title: "è£½å“", items: ["PCBè£½å“", "PCBAè£½å“"] },
    { title: "PCBè£½é€ ", items: ["æ¦‚è¦", "è¨­å‚™", "ææ–™", "ã‚¤ãƒ³ãƒ”ãƒ¼ãƒ€ãƒ³ã‚¹PCB", "æ¤œæŸ»", "è©¦ä½œ", "FAQ"] },
    { title: "PCBå®Ÿè£…", items: ["æ¦‚è¦", "è¨­å‚™", "è©¦ä½œå®Ÿè£…", "å°ãƒ­ãƒƒãƒˆ", "é‡ç”£", "çŸ­ç´æœŸ", "ã‚¿ãƒ¼ãƒ³ã‚­ãƒ¼", "éƒ¨åˆ†ã‚¿ãƒ¼ãƒ³ã‚­ãƒ¼", "FAQ"] },
    { title: "å¯¾å¿œèƒ½åŠ›", items: ["ãƒªã‚¸ãƒƒãƒ‰PCB", "SMT", "ãƒ¡ã‚¿ãƒ«ã‚³ã‚¢", "ãƒ•ãƒ¬ã‚­PCB", "æ¤œæŸ»", "å“è³ªç®¡ç†"] },
    { title: "ä»˜åŠ ä¾¡å€¤ã‚µãƒ¼ãƒ“ã‚¹", items: ["éƒ¨å“èª¿é”", "ã‚±ãƒ¼ãƒ–ãƒ«ãƒãƒ¼ãƒã‚¹", "ã‚³ãƒ¼ãƒ†ã‚£ãƒ³ã‚°", "æ›¸ãè¾¼ã¿", "ã‚¹ãƒ†ãƒ³ã‚·ãƒ«"] },
    { title: "ãŠå•ã„åˆã‚ã›", items: ["å–¶æ¥­ç›¸è«‡", "ã‚µãƒãƒ¼ãƒˆ", "æ‰€åœ¨åœ°"] },
  ],
  ko: [
    { title: "í™ˆ", items: ["í™˜ì˜", "ë‰´ìŠ¤", "ì±„ìš©"] },
    { title: "FT ì†Œê°œ", items: ["íšŒì‚¬ ì†Œê°œ", "íŒ€", "ìž¥ì ", "ì„œë¹„ìŠ¤", "ì„ íƒ ì´ìœ ", "ê³ ê° í›„ê¸°", "ì‚°ì—…", "ê°œì¸ì •ë³´", "PCB ë¸”ë¡œê·¸"] },
    { title: "ì œí’ˆ", items: ["PCB ì œí’ˆ", "PCBA ì œí’ˆ"] },
    { title: "PCB ì œì¡°", items: ["ê°œìš”", "ìž¥ë¹„", "ì†Œìž¬", "ìž„í”¼ë˜ìŠ¤ PCB", "ê²€ì‚¬", "ì‹œì œí’ˆ", "FAQ"] },
    { title: "PCB ì¡°ë¦½", items: ["ê°œìš”", "ìž¥ë¹„", "ì‹œì œí’ˆ ì¡°ë¦½", "ì†ŒëŸ‰", "ëŒ€ëŸ‰", "ë¹ ë¥¸ ë‚©ê¸°", "í„´í‚¤", "ë¶€ë¶„ í„´í‚¤", "FAQ"] },
    { title: "ì—­ëŸ‰", items: ["ë¦¬ì§€ë“œ PCB", "SMT", "ë©”íƒˆ ì½”ì–´", "í”Œë ‰ìŠ¤ PCB", "ê²€ì‚¬", "í’ˆì§ˆ ê´€ë¦¬"] },
    { title: "ë¶€ê°€ ì„œë¹„ìŠ¤", items: ["ë¶€í’ˆ ì†Œì‹±", "ì¼€ì´ë¸” í•˜ë„¤ìŠ¤", "ì½”íŒ…", "í”„ë¡œê·¸ëž˜ë°", "ìŠ¤í…ì‹¤"] },
    { title: "ë¬¸ì˜", items: ["ì˜ì—… ë¬¸ì˜", "ì§€ì›íŒ€", "ì£¼ì†Œ"] },
  ],
  hi: [
    { title: "à¤¹à¥‹à¤®", items: ["à¤¸à¥à¤µà¤¾à¤—à¤¤", "à¤¸à¤®à¤¾à¤šà¤¾à¤°", "à¤•à¤°à¤¿à¤¯à¤°"] },
    { title: "FT à¤•à¥‡ à¤¬à¤¾à¤°à¥‡ à¤®à¥‡à¤‚", items: ["à¤•à¤‚à¤ªà¤¨à¥€ à¤ªà¥à¤°à¥‹à¤«à¤¾à¤‡à¤²", "à¤Ÿà¥€à¤®", "à¤¹à¤®à¤¾à¤°à¥€ à¤¬à¤¢à¤¼à¤¤", "à¤¸à¥‡à¤µà¤¾", "à¤•à¥à¤¯à¥‹à¤‚ à¤šà¥à¤¨à¥‡à¤‚", "à¤ªà¥à¤°à¤¶à¤‚à¤¸à¤¾à¤ªà¤¤à¥à¤°", "à¤‰à¤¦à¥à¤¯à¥‹à¤—", "à¤—à¥‹à¤ªà¤¨à¥€à¤¯à¤¤à¤¾", "PCB à¤¬à¥à¤²à¥‰à¤—"] },
    { title: "à¤‰à¤¤à¥à¤ªà¤¾à¤¦", items: ["PCB à¤‰à¤¤à¥à¤ªà¤¾à¤¦", "PCBA à¤‰à¤¤à¥à¤ªà¤¾à¤¦"] },
    { title: "PCB à¤¨à¤¿à¤°à¥à¤®à¤¾à¤£", items: ["à¤…à¤µà¤²à¥‹à¤•à¤¨", "à¤‰à¤ªà¤•à¤°à¤£", "à¤¸à¤¾à¤®à¤—à¥à¤°à¥€", "à¤‡à¤®à¥à¤ªà¥€à¤¡à¥‡à¤‚à¤¸ PCB", "à¤Ÿà¥‡à¤¸à¥à¤Ÿà¤¿à¤‚à¤—", "à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤Ÿà¤¾à¤‡à¤ª", "FAQ"] },
    { title: "PCB à¤…à¤¸à¥‡à¤‚à¤¬à¤²à¥€", items: ["à¤…à¤µà¤²à¥‹à¤•à¤¨", "à¤‰à¤ªà¤•à¤°à¤£", "à¤ªà¥à¤°à¥‹à¤Ÿà¥‹à¤Ÿà¤¾à¤‡à¤ª à¤…à¤¸à¥‡à¤‚à¤¬à¤²à¥€", "à¤²à¥‹ à¤µà¥‰à¤²à¥à¤¯à¥‚à¤®", "à¤¹à¤¾à¤ˆ à¤µà¥‰à¤²à¥à¤¯à¥‚à¤®", "à¤«à¤¾à¤¸à¥à¤Ÿ à¤Ÿà¤°à¥à¤¨", "à¤Ÿà¤°à¥à¤¨à¤•à¥€", "à¤ªà¤¾à¤°à¥à¤¶à¤¿à¤¯à¤² à¤Ÿà¤°à¥à¤¨à¤•à¥€", "FAQ"] },
    { title: "à¤•à¥à¤·à¤®à¤¤à¤¾", items: ["à¤°à¤¿à¤œà¤¿à¤¡ PCB", "SMT", "à¤®à¥‡à¤Ÿà¤² à¤•à¥‹à¤°", "à¤«à¥à¤²à¥‡à¤•à¥à¤¸ PCB", "à¤Ÿà¥‡à¤¸à¥à¤Ÿà¤¿à¤‚à¤—", "à¤•à¥à¤µà¤¾à¤²à¤¿à¤Ÿà¥€ à¤•à¤‚à¤Ÿà¥à¤°à¥‹à¤²"] },
    { title: "à¤µà¥ˆà¤²à¥à¤¯à¥‚ à¤à¤¡ à¤¸à¥‡à¤µà¤¾", items: ["à¤•à¤‚à¤ªà¥‹à¤¨à¥‡à¤‚à¤Ÿ à¤¸à¥‹à¤°à¥à¤¸à¤¿à¤‚à¤—", "à¤•à¥‡à¤¬à¤² à¤¹à¤¾à¤°à¥à¤¨à¥‡à¤¸", "à¤•à¥‹à¤Ÿà¤¿à¤‚à¤—", "à¤ªà¥à¤°à¥‹à¤—à¥à¤°à¤¾à¤®à¤¿à¤‚à¤—", "à¤¸à¥à¤Ÿà¥‡à¤‚à¤¸à¤¿à¤²"] },
    { title: "à¤¸à¤‚à¤ªà¤°à¥à¤•", items: ["à¤¸à¥‡à¤²à¥à¤¸ à¤ªà¥‚à¤›à¤¤à¤¾à¤›", "à¤¸à¤ªà¥‹à¤°à¥à¤Ÿ à¤Ÿà¥€à¤®", "à¤‘à¤«à¤¿à¤¸ à¤ªà¤¤à¤¾"] },
  ],
  ur: sourceDictionary.navbar.navItems,
  fr: sourceDictionary.navbar.navItems,
  it: sourceDictionary.navbar.navItems,
  es: sourceDictionary.navbar.navItems,
  ru: sourceDictionary.navbar.navItems,
  pt: sourceDictionary.navbar.navItems,
  ar: sourceDictionary.navbar.navItems,
  tr: sourceDictionary.navbar.navItems,
  af: sourceDictionary.navbar.navItems,
};

const localeOverrides: Record<Exclude<Locale, "en">, PartialDictionary> = {
  zh: {
    navbar: {
      badge: "ç²¾å¯† PCB åˆä½œä¼™ä¼´",
      countries: "å›½å®¶",
      selectCountry: "é€‰æ‹©å›½å®¶",
      navigation: "å¯¼èˆª",
      explore: "æŽ¢ç´¢",
      login: "ç™»å½•",
      homePanelTitle: "å¿«é€Ÿäº†è§£æˆ‘ä»¬çš„å…¬å¸",
      homePanelDescription: "å¿«é€Ÿè®¿é—®å…¬å¸ä»‹ç»ã€æœ€æ–°åŠ¨æ€å’Œæ‹›è˜ä¿¡æ¯ã€‚",
      navItems: localizedNavItems.zh,
      homeHighlights: [
        { label: "æ¬¢è¿Ž", description: "ä»Žè¿™é‡Œäº†è§£æˆ‘ä»¬çš„å·¥åŽ‚å®žåŠ›ã€‚" },
        { label: "æ–°é—»åŠ¨æ€", description: "æŸ¥çœ‹æœ€æ–°å…¬å¸å’Œç”Ÿäº§èµ„è®¯ã€‚" },
        { label: "æ‹›è˜", description: "åŠ å…¥æˆ‘ä»¬çš„å·¥ç¨‹æ–‡åŒ–å¹¶å…±åŒæˆé•¿ã€‚" },
      ],
      theme: { toggle: "åˆ‡æ¢ä¸»é¢˜", light: "æµ…è‰²", dark: "æ·±è‰²", system: "ç³»ç»Ÿ" },
    },
    home: {
      title: "æ¬¢è¿Žè®¿é—®æˆ‘ä»¬çš„ç½‘ç«™",
      description: "ä»Žå¯¼èˆªæ é€‰æ‹©å›½å®¶ï¼Œå³å¯åˆ‡æ¢ç½‘ç«™è¯­è¨€ã€‚",
      selectedLanguage: "å½“å‰è¯­è¨€",
    },
    sections: {
      hero: { eyebrow: "ç²¾å¯† PCB ä¸Ž PCBA åˆ¶é€ åˆä½œä¼™ä¼´", title: "é¢å‘çŽ°ä»£ç”µå­çš„å¯é  PCB ç”Ÿäº§ã€‚", description: "æ­¦å¹³é£žå¤©ç”µå­ç§‘æŠ€æœ‰é™å…¬å¸ä¸ºå…¨çƒç”µå­å›¢é˜Ÿæä¾› PCB åˆ¶é€ ã€ç»„è£…ã€æµ‹è¯•å’Œå¢žå€¼ç”Ÿäº§æœåŠ¡ã€‚", quoteBtn: "èŽ·å–æŠ¥ä»·", productsBtn: "æŸ¥çœ‹äº§å“", badges: ["æ ·å“åˆ°é‡äº§", "PCB ä¸Ž PCBA", "è´¨é‡æ£€éªŒ"] },
      about: { eyebrow: "å…³äºŽæˆ‘ä»¬", title: "ä»ŽæŠ¥ä»·åˆ°å‡ºè´§çš„å·¥ç¨‹åŒ–æ”¯æŒ", description: "ä»¥ PCB åˆ¶é€ ã€PCBA ç»„è£…ã€é‡‡è´­å’Œæœ€ç»ˆæ£€éªŒä¸ºæ ¸å¿ƒï¼Œä¸ºå®¢æˆ·æä¾›åŠ¡å®žå¯é çš„ç”Ÿäº§æ”¯æŒã€‚", videoTitle: "å…¬å¸ä»‹ç»è§†é¢‘" },
      products: { eyebrow: "äº§å“", title: "PCB ä¸Ž PCBA äº§å“ç±»åˆ«", description: "å¿«é€Ÿå±•ç¤ºä¸»è¦äº§å“ç³»åˆ—ï¼Œå¹¶æä¾›å„ç±»æ¿åž‹å’Œç»„è£…æœåŠ¡çš„è§†è§‰ç¤ºä¾‹ã€‚", allLink: "å…¨éƒ¨äº§å“", videoTitle: "äº§å“å±•ç¤ºè§†é¢‘", items: sourceDictionary.sections.products.items },
      capability: { eyebrow: "èƒ½åŠ›", title: "ä¸ºç¨³å®šç»“æžœè€Œæ‰“é€ çš„ç”Ÿäº§èƒ½åŠ›", description: "å±•ç¤ºæŠ€æœ¯èƒ½åŠ›ã€è¿‡ç¨‹æŽ§åˆ¶ã€ææ–™é€‰æ‹©å’Œæµ‹è¯•è¦†ç›–ã€‚", videoTitle: "èƒ½åŠ›è§†é¢‘", items: sourceDictionary.sections.capability.items },
      assembly: { eyebrow: "PCB ç»„è£…", title: "æ”¯æŒæ ·å“ä¸Žé‡äº§è®¢å•çš„ç»„è£…æœåŠ¡", description: "è¯´æ˜Ž SMTã€DIPã€å…ƒä»¶é‡‡è´­ã€å¿«é€Ÿæ ·å“å’Œç”Ÿäº§ç»„è£…æ”¯æŒã€‚", videoTitle: "ç»„è£…æµç¨‹è§†é¢‘", items: sourceDictionary.sections.assembly.items },
      quality: { eyebrow: "è´¨é‡", title: "è´¯ç©¿ç”Ÿäº§æµç¨‹çš„æ£€éªŒèŠ‚ç‚¹", description: "è®©é‡‡è´­æ–¹æ¸…æ¥šäº†è§£å‡ºè´§å‰çš„è´¨é‡å®¡æ ¸æµç¨‹ã€‚", videoTitle: "è´¨é‡æŽ§åˆ¶è§†é¢‘", steps: sourceDictionary.sections.quality.steps },
      industries: { eyebrow: "è¡Œä¸š", title: "æœåŠ¡é«˜è¦æ±‚ç”µå­åº”ç”¨çš„ PCB èƒ½åŠ›", description: "å°†å·¥åŽ‚èƒ½åŠ›ä¸Žå®¢æˆ·å…³æ³¨çš„å¸‚åœºé¢†åŸŸè¿žæŽ¥èµ·æ¥ã€‚", videoTitle: "è¡Œä¸šåº”ç”¨è§†é¢‘", items: sourceDictionary.sections.industries.items },
      factory: { eyebrow: "å·¥åŽ‚", title: "å·¥åŽ‚ä¸Žè®¾å¤‡è§†è§‰å±•ç¤º", description: "é€šè¿‡ç”Ÿäº§çŽ°åœºã€è®¾å¤‡ã€æ“ä½œå‘˜å’Œæˆå“æ¿å±•ç¤ºå»ºç«‹ä¿¡ä»»ã€‚", videoTitle: "å·¥åŽ‚å‚è§‚è§†é¢‘" },
      contact: { eyebrow: "ç”³è¯·æŠ¥ä»·", title: "å‡†å¤‡è®¨è®º PCB æˆ– PCBA ç”Ÿäº§å—ï¼Ÿ", description: "æäº¤æŠ¥ä»·éœ€æ±‚ã€é”€å”®é‚®ç®±ã€WhatsApp æˆ– Gerber æ–‡ä»¶ä¸Šä¼ ï¼Œè®©å®¢æˆ·å¿«é€Ÿè¿›å…¥è¯¢ä»·ã€‚", salesBtn: "é”€å”®å’¨è¯¢", supportBtn: "æ”¯æŒå›¢é˜Ÿ", videoTitle: "å®¢æˆ·æ²Ÿé€šè§†é¢‘" },
    },
    footer: { description: "ä¸ºæ ·å“ã€å°æ‰¹é‡å’Œå¤§æ‰¹é‡ç”µå­ç”Ÿäº§æä¾›ç²¾å¯† PCB ä¸Ž PCBA åˆ¶é€ æœåŠ¡ã€‚", aboutTitle: "å…³äºŽæˆ‘ä»¬", productsTitle: "äº§å“", capabilitiesTitle: "èƒ½åŠ›", contactTitle: "è”ç³»æˆ‘ä»¬", addressLabel: "åœ°å€", addressVal: "ä¸­å›½ç¦å»ºçœé¾™å²©å¸‚æ­¦å¹³åŽ¿", phoneLabel: "ç”µè¯", emailLabel: "é‚®ç®±", copyright: "Â© 2026 æ­¦å¹³é£žå¤©ç”µå­ç§‘æŠ€æœ‰é™å…¬å¸ã€‚ä¿ç•™æ‰€æœ‰æƒåˆ©ã€‚" },
  },
  bn: {
    navbar: {
      badge: "à¦ªà§à¦°à¦¿à¦¸à¦¿à¦¶à¦¨ PCB à¦ªà¦¾à¦°à§à¦Ÿà¦¨à¦¾à¦°",
      countries: "à¦¦à§‡à¦¶à¦¸à¦®à§‚à¦¹",
      selectCountry: "à¦¦à§‡à¦¶ à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à§à¦¨",
      navigation: "à¦¨à§‡à¦­à¦¿à¦—à§‡à¦¶à¦¨",
      explore: "à¦à¦•à§à¦¸à¦ªà§à¦²à§‹à¦°",
      login: "à¦²à¦—à¦‡à¦¨",
      homePanelTitle: "à¦†à¦®à¦¾à¦¦à§‡à¦° à¦•à§‹à¦®à§à¦ªà¦¾à¦¨à¦¿ à¦à¦• à¦¨à¦œà¦°à§‡ à¦¦à§‡à¦–à§à¦¨",
      homePanelDescription: "à¦•à§‹à¦®à§à¦ªà¦¾à¦¨à¦¿ à¦ªà¦°à¦¿à¦šà¦¿à¦¤à¦¿, à¦†à¦ªà¦¡à§‡à¦Ÿ à¦“ à¦•à§à¦¯à¦¾à¦°à¦¿à¦¯à¦¼à¦¾à¦° à¦¦à§à¦°à§à¦¤ à¦¦à§‡à¦–à§à¦¨à¥¤",
      navItems: localizedNavItems.bn,
      homeHighlights: [
        { label: "à¦¸à§à¦¬à¦¾à¦—à¦¤à¦®", description: "à¦à¦–à¦¾à¦¨ à¦¥à§‡à¦•à§‡ à¦†à¦®à¦¾à¦¦à§‡à¦° à¦«à§à¦¯à¦¾à¦•à§à¦Ÿà¦°à¦¿à¦° à¦¶à¦•à§à¦¤à¦¿ à¦œà¦¾à¦¨à§à¦¨à¥¤" },
        { label: "à¦–à¦¬à¦° à¦“ à¦†à¦ªà¦¡à§‡à¦Ÿ", description: "à¦¸à¦°à§à¦¬à¦¶à§‡à¦· à¦•à§‹à¦®à§à¦ªà¦¾à¦¨à¦¿ à¦“ à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à¦¶à¦¨ à¦†à¦ªà¦¡à§‡à¦Ÿ à¦¦à§‡à¦–à§à¦¨à¥¤" },
        { label: "à¦•à§à¦¯à¦¾à¦°à¦¿à¦¯à¦¼à¦¾à¦°", description: "à¦†à¦®à¦¾à¦¦à§‡à¦° à¦‡à¦žà§à¦œà¦¿à¦¨à¦¿à¦¯à¦¼à¦¾à¦°à¦¿à¦‚ à¦•à¦¾à¦²à¦šà¦¾à¦°à§‡à¦° à¦¸à¦¾à¦¥à§‡ à¦à¦—à¦¿à¦¯à¦¼à§‡ à¦¯à¦¾à¦¨à¥¤" },
      ],
      theme: { toggle: "à¦¥à¦¿à¦® à¦ªà¦°à¦¿à¦¬à¦°à§à¦¤à¦¨", light: "à¦²à¦¾à¦‡à¦Ÿ", dark: "à¦¡à¦¾à¦°à§à¦•", system: "à¦¸à¦¿à¦¸à§à¦Ÿà§‡à¦®" },
    },
    home: {
      title: "à¦†à¦®à¦¾à¦¦à§‡à¦° à¦“à¦¯à¦¼à§‡à¦¬à¦¸à¦¾à¦‡à¦Ÿà§‡ à¦¸à§à¦¬à¦¾à¦—à¦¤à¦®",
      description: "à¦¨à¦¾à¦­à¦¬à¦¾à¦° à¦¥à§‡à¦•à§‡ à¦¦à§‡à¦¶ à¦¨à¦¿à¦°à§à¦¬à¦¾à¦šà¦¨ à¦•à¦°à¦²à§‡ à¦“à¦¯à¦¼à§‡à¦¬à¦¸à¦¾à¦‡à¦Ÿà§‡à¦° à¦Ÿà§‡à¦•à§à¦¸à¦Ÿ à¦¸à§‡à¦‡ à¦­à¦¾à¦·à¦¾à¦¯à¦¼ à¦¬à¦¦à¦²à§‡ à¦¯à¦¾à¦¬à§‡à¥¤",
      selectedLanguage: "à¦¬à¦°à§à¦¤à¦®à¦¾à¦¨ à¦­à¦¾à¦·à¦¾",
    },
    sections: {
      hero: { eyebrow: "à¦ªà§à¦°à¦¿à¦¸à¦¿à¦¶à¦¨ PCB à¦“ PCBA à¦®à§à¦¯à¦¾à¦¨à§à¦«à§à¦¯à¦¾à¦•à¦šà¦¾à¦°à¦¿à¦‚ à¦ªà¦¾à¦°à§à¦Ÿà¦¨à¦¾à¦°", title: "à¦®à¦¡à¦¾à¦°à§à¦¨ à¦‡à¦²à§‡à¦•à¦Ÿà§à¦°à¦¨à¦¿à¦•à§à¦¸à§‡à¦° à¦œà¦¨à§à¦¯ à¦¨à¦¿à¦°à§à¦­à¦°à¦¯à§‹à¦—à§à¦¯ PCB à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à¦¶à¦¨à¥¤", description: "Wuping Feitian Electronic Technology à¦¬à¦¿à¦¶à§à¦¬à¦¬à§à¦¯à¦¾à¦ªà§€ à¦‡à¦²à§‡à¦•à¦Ÿà§à¦°à¦¨à¦¿à¦•à§à¦¸ à¦Ÿà¦¿à¦®à§‡à¦° à¦œà¦¨à§à¦¯ PCB fabrication, assembly, testing à¦à¦¬à¦‚ value-added production à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ à¦¦à§‡à¦¯à¦¼à¥¤", quoteBtn: "à¦•à§‹à¦Ÿà§‡à¦¶à¦¨ à¦¨à¦¿à¦¨", productsBtn: "à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ à¦¦à§‡à¦–à§à¦¨", badges: ["à¦ªà§à¦°à§‹à¦Ÿà§‹à¦Ÿà¦¾à¦‡à¦ª à¦¥à§‡à¦•à§‡ à¦­à¦²à¦¿à¦‰à¦®", "PCB à¦“ PCBA", "à¦•à§‹à¦¯à¦¼à¦¾à¦²à¦¿à¦Ÿà¦¿ à¦‡à¦¨à§à¦¸à¦ªà§‡à¦•à¦¶à¦¨"] },
      about: { eyebrow: "à¦ªà¦°à¦¿à¦šà¦¿à¦¤à¦¿", title: "à¦•à§‹à¦Ÿà§‡à¦¶à¦¨ à¦¥à§‡à¦•à§‡ à¦¶à¦¿à¦ªà¦®à§‡à¦¨à§à¦Ÿ à¦ªà¦°à§à¦¯à¦¨à§à¦¤ à¦‡à¦žà§à¦œà¦¿à¦¨à¦¿à¦¯à¦¼à¦¾à¦°à¦¿à¦‚ à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ", description: "PCB fabrication, PCBA assembly, sourcing à¦à¦¬à¦‚ final inspection à¦à¦° à¦œà¦¨à§à¦¯ à¦¬à¦¾à¦¸à§à¦¤à¦¬à¦­à¦¿à¦¤à§à¦¤à¦¿à¦• à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à¦¶à¦¨ à¦ªà¦¾à¦°à§à¦Ÿà¦¨à¦¾à¦° à¦¹à¦¿à¦¸à§‡à¦¬à§‡ à¦•à§‹à¦®à§à¦ªà¦¾à¦¨à¦¿à¦•à§‡ à¦¤à§à¦²à§‡ à¦§à¦°à¦¾ à¦¯à¦¾à¦¯à¦¼à¥¤", videoTitle: "à¦•à§‹à¦®à§à¦ªà¦¾à¦¨à¦¿ à¦“à¦­à¦¾à¦°à¦­à¦¿à¦‰ à¦­à¦¿à¦¡à¦¿à¦“" },
      products: { eyebrow: "à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿà¦¸", title: "PCB à¦“ PCBA à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ à¦•à§à¦¯à¦¾à¦Ÿà¦¾à¦—à¦°à¦¿", description: "à¦ªà§à¦°à¦§à¦¾à¦¨ à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ à¦«à§à¦¯à¦¾à¦®à¦¿à¦²à¦¿ à¦¦à§à¦°à§à¦¤ à¦¦à§‡à¦–à¦¾à¦¨, à¦ªà§à¦°à¦¤à¦¿à¦Ÿà¦¿ board type à¦“ assembly service à¦à¦° visual example à¦¸à¦¹à¥¤", allLink: "à¦¸à¦¬ à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ", videoTitle: "à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿ à¦¶à§‹à¦•à§‡à¦¸ à¦­à¦¿à¦¡à¦¿à¦“", items: ["Rigid PCB", "Flex PCB", "Metal Core PCB", "HDI PCB", "Prototype PCB", "PCBA Products"] },
      capability: { eyebrow: "à¦•à§à¦¯à¦¾à¦ªà¦¾à¦¬à¦¿à¦²à¦¿à¦Ÿà¦¿", title: "à¦¨à¦¿à¦¯à¦¼à¦®à¦¿à¦¤ à¦­à¦¾à¦²à§‹ à¦°à§‡à¦œà¦¾à¦²à§à¦Ÿà§‡à¦° à¦œà¦¨à§à¦¯ à¦¤à§ˆà¦°à¦¿ à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à¦¶à¦¨ à¦•à§à¦·à¦®à¦¤à¦¾", description: "à¦à¦‡ à¦…à¦‚à¦¶à§‡ technical capacity, process control, material choices à¦à¦¬à¦‚ test coverage à¦¦à§‡à¦–à¦¾à¦¨à§‹ à¦¯à¦¾à¦¯à¦¼à¥¤", videoTitle: "à¦•à§à¦¯à¦¾à¦ªà¦¾à¦¬à¦¿à¦²à¦¿à¦Ÿà¦¿ à¦­à¦¿à¦¡à¦¿à¦“", items: ["Single à¦¥à§‡à¦•à§‡ multilayer PCB production", "Impedance control à¦“ material selection", "Prototype, low-volume à¦“ high-volume runs", "Reliable solderability à¦à¦° surface finishes", "Electrical test, AOI à¦“ final inspection", "Production à¦à¦° à¦†à¦—à§‡ engineering support"] },
      assembly: { eyebrow: "PCB à¦…à§à¦¯à¦¾à¦¸à§‡à¦®à§à¦¬à¦²à¦¿", title: "à¦ªà§à¦°à§‹à¦Ÿà§‹à¦Ÿà¦¾à¦‡à¦ª à¦“ à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à¦¶à¦¨ à¦…à¦°à§à¦¡à¦¾à¦°à§‡à¦° à¦œà¦¨à§à¦¯ à¦…à§à¦¯à¦¾à¦¸à§‡à¦®à§à¦¬à¦²à¦¿ à¦¸à¦¾à¦°à§à¦­à¦¿à¦¸", description: "SMT, DIP, component sourcing, fast-turn prototype à¦à¦¬à¦‚ production assembly support à¦à¦–à¦¾à¦¨à§‡ à¦¦à§‡à¦–à¦¾à¦¨à§‹ à¦¯à¦¾à¦¯à¦¼à¥¤", videoTitle: "à¦…à§à¦¯à¦¾à¦¸à§‡à¦®à§à¦¬à¦²à¦¿ à¦ªà§à¦°à¦¸à§‡à¦¸ à¦­à¦¿à¦¡à¦¿à¦“", items: ["SMT assembly", "DIP assembly", "Turnkey sourcing", "Prototype assembly", "Low-volume assembly", "High-volume assembly"] },
      quality: { eyebrow: "à¦•à§‹à¦¯à¦¼à¦¾à¦²à¦¿à¦Ÿà¦¿", title: "à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à¦¶à¦¨ à¦«à§à¦²à§‹ à¦œà§à¦¡à¦¼à§‡ à¦‡à¦¨à§à¦¸à¦ªà§‡à¦•à¦¶à¦¨ à¦šà§‡à¦•à¦ªà¦¯à¦¼à§‡à¦¨à§à¦Ÿ", description: "à¦¶à¦¿à¦ªà¦®à§‡à¦¨à§à¦Ÿà§‡à¦° à¦†à¦—à§‡ à¦¬à§‹à¦°à§à¦¡ à¦•à§€à¦­à¦¾à¦¬à§‡ à¦°à¦¿à¦­à¦¿à¦‰ à¦¹à¦¯à¦¼ à¦¤à¦¾ buyer à¦¦à§‡à¦° à¦ªà¦°à¦¿à¦·à§à¦•à¦¾à¦°à¦­à¦¾à¦¬à§‡ à¦¬à§à¦à¦¾à¦¯à¦¼à¥¤", videoTitle: "à¦•à§‹à¦¯à¦¼à¦¾à¦²à¦¿à¦Ÿà¦¿ à¦•à¦¨à§à¦Ÿà§à¦°à§‹à¦² à¦­à¦¿à¦¡à¦¿à¦“", steps: ["Incoming material check", "Process inspection", "AOI review", "Electrical testing", "Final visual inspection", "Packaging control"] },
      industries: { eyebrow: "à¦‡à¦¨à§à¦¡à¦¾à¦¸à§à¦Ÿà§à¦°à¦¿à¦œ", title: "à¦¡à¦¿à¦®à¦¾à¦¨à§à¦¡à¦¿à¦‚ à¦‡à¦²à§‡à¦•à¦Ÿà§à¦°à¦¨à¦¿à¦•à§à¦¸ à¦•à§à¦¯à¦¾à¦Ÿà¦¾à¦—à¦°à¦¿à¦° à¦œà¦¨à§à¦¯ PCB à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ", description: "Factory capability à¦•à§‡ customer à¦¦à§‡à¦° à¦—à§à¦°à§à¦¤à§à¦¬à¦ªà§‚à¦°à§à¦£ market category à¦à¦° à¦¸à¦¾à¦¥à§‡ connect à¦•à¦°à§‡à¥¤", videoTitle: "à¦‡à¦¨à§à¦¡à¦¾à¦¸à§à¦Ÿà§à¦°à¦¿ à¦…à§à¦¯à¦¾à¦ªà§à¦²à¦¿à¦•à§‡à¦¶à¦¨ à¦­à¦¿à¦¡à¦¿à¦“", items: ["Industrial control", "Consumer electronics", "Communication devices", "Automotive electronics", "Medical equipment", "LED and IoT products"] },
      factory: { eyebrow: "à¦«à§à¦¯à¦¾à¦•à§à¦Ÿà¦°à¦¿", title: "à¦«à§à¦¯à¦¾à¦•à§à¦Ÿà¦°à¦¿ à¦“ à¦‡à¦•à§à¦‡à¦ªà¦®à§‡à¦¨à§à¦Ÿ à¦­à¦¿à¦œà§à¦¯à§à¦¯à¦¼à¦¾à¦² à¦¶à§‹à¦•à§‡à¦¸", description: "Production scenes, machines, operators à¦à¦¬à¦‚ finished boards à¦¦à§‡à¦–à¦¿à¦¯à¦¼à§‡ buyer trust à¦¤à§ˆà¦°à¦¿ à¦•à¦°à§‡à¥¤", videoTitle: "à¦«à§à¦¯à¦¾à¦•à§à¦Ÿà¦°à¦¿ à¦Ÿà§à¦¯à§à¦° à¦­à¦¿à¦¡à¦¿à¦“" },
      contact: { eyebrow: "à¦•à§‹à¦Ÿà§‡à¦¶à¦¨ à¦°à¦¿à¦•à§‹à¦¯à¦¼à§‡à¦¸à§à¦Ÿ", title: "PCB à¦¬à¦¾ PCBA production à¦¨à¦¿à¦¯à¦¼à§‡ à¦•à¦¥à¦¾ à¦¬à¦²à¦¤à§‡ à¦ªà§à¦°à¦¸à§à¦¤à§à¦¤?", description: "Quote form, sales email, WhatsApp à¦…à¦¥à¦¬à¦¾ file upload workflow à¦à¦–à¦¾à¦¨à§‡ à¦°à¦¾à¦–à¦²à§‡ buyer browsing à¦¥à§‡à¦•à§‡ inquiry à¦¤à§‡ à¦¦à§à¦°à§à¦¤ à¦¯à§‡à¦¤à§‡ à¦ªà¦¾à¦°à§‡à¥¤", salesBtn: "à¦¸à§‡à¦²à¦¸ à¦‡à¦¨à¦•à§‹à¦¯à¦¼à¦¾à¦°à¦¿", supportBtn: "à¦¸à¦¾à¦ªà§‹à¦°à§à¦Ÿ à¦Ÿà¦¿à¦®", videoTitle: "à¦•à¦¾à¦¸à§à¦Ÿà¦®à¦¾à¦° à¦•à¦®à¦¿à¦‰à¦¨à¦¿à¦•à§‡à¦¶à¦¨ à¦­à¦¿à¦¡à¦¿à¦“" },
    },
    footer: { description: "Prototype, low-volume à¦à¦¬à¦‚ high-volume electronics production à¦à¦° à¦œà¦¨à§à¦¯ precision PCB à¦“ PCBA manufacturing partnerà¥¤", aboutTitle: "à¦†à¦®à¦¾à¦¦à§‡à¦° à¦¸à¦®à§à¦ªà¦°à§à¦•à§‡", productsTitle: "à¦ªà§à¦°à§‹à¦¡à¦¾à¦•à§à¦Ÿà¦¸", capabilitiesTitle: "à¦•à§à¦¯à¦¾à¦ªà¦¾à¦¬à¦¿à¦²à¦¿à¦Ÿà¦¿", contactTitle: "à¦¯à§‹à¦—à¦¾à¦¯à§‹à¦—", addressLabel: "à¦ à¦¿à¦•à¦¾à¦¨à¦¾", addressVal: "Wuping County, Longyan City, Fujian Province, China", phoneLabel: "à¦«à§‹à¦¨", emailLabel: "à¦‡à¦®à§‡à¦‡à¦²", copyright: "Â© 2026 Wuping Feitian Electronic Technology Company Limited. à¦¸à¦°à§à¦¬à¦¸à§à¦¬à¦¤à§à¦¬ à¦¸à¦‚à¦°à¦•à§à¦·à¦¿à¦¤à¥¤" },
  },
  de: { navbar: { selectCountry: "Land auswÃ¤hlen", navItems: localizedNavItems.de, theme: { toggle: "Design wechseln", light: "Hell", dark: "Dunkel", system: "System" } }, home: { title: "Willkommen auf unserer Website", description: "WÃ¤hlen Sie ein Land in der Navigation, um die Website-Sprache zu Ã¤ndern.", selectedLanguage: "Aktuelle Sprache" }, footer: { copyright: "Â© 2026 Wuping Feitian Electronic Technology Company Limited. Alle Rechte vorbehalten." } },
  ja: { navbar: { selectCountry: "å›½ã‚’é¸æŠž", navItems: localizedNavItems.ja, theme: { toggle: "ãƒ†ãƒ¼ãƒžåˆ‡æ›¿", light: "ãƒ©ã‚¤ãƒˆ", dark: "ãƒ€ãƒ¼ã‚¯", system: "ã‚·ã‚¹ãƒ†ãƒ " } }, home: { title: "å½“ç¤¾ã‚µã‚¤ãƒˆã¸ã‚ˆã†ã“ã", description: "ãƒŠãƒ“ã‚²ãƒ¼ã‚·ãƒ§ãƒ³ã§å›½ã‚’é¸ã¶ã¨ã€ã‚µã‚¤ãƒˆã®è¨€èªžãŒåˆ‡ã‚Šæ›¿ã‚ã‚Šã¾ã™ã€‚", selectedLanguage: "ç¾åœ¨ã®è¨€èªž" }, footer: { copyright: "Â© 2026 Wuping Feitian Electronic Technology Company Limited. All rights reserved." } },
  ko: { navbar: { selectCountry: "êµ­ê°€ ì„ íƒ", navItems: localizedNavItems.ko, theme: { toggle: "í…Œë§ˆ ì „í™˜", light: "ë¼ì´íŠ¸", dark: "ë‹¤í¬", system: "ì‹œìŠ¤í…œ" } }, home: { title: "ì›¹ì‚¬ì´íŠ¸ì— ì˜¤ì‹  ê²ƒì„ í™˜ì˜í•©ë‹ˆë‹¤", description: "ë‚´ë¹„ê²Œì´ì…˜ì—ì„œ êµ­ê°€ë¥¼ ì„ íƒí•˜ë©´ ì‚¬ì´íŠ¸ ì–¸ì–´ê°€ ë³€ê²½ë©ë‹ˆë‹¤.", selectedLanguage: "í˜„ìž¬ ì–¸ì–´" }, footer: { copyright: "Â© 2026 Wuping Feitian Electronic Technology Company Limited. All rights reserved." } },
  hi: { navbar: { selectCountry: "à¤¦à¥‡à¤¶ à¤šà¥à¤¨à¥‡à¤‚", navItems: localizedNavItems.hi, theme: { toggle: "à¤¥à¥€à¤® à¤¬à¤¦à¤²à¥‡à¤‚", light: "à¤²à¤¾à¤‡à¤Ÿ", dark: "à¤¡à¤¾à¤°à¥à¤•", system: "à¤¸à¤¿à¤¸à¥à¤Ÿà¤®" } }, home: { title: "à¤¹à¤®à¤¾à¤°à¥€ à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤®à¥‡à¤‚ à¤†à¤ªà¤•à¤¾ à¤¸à¥à¤µà¤¾à¤—à¤¤ à¤¹à¥ˆ", description: "à¤¨à¥‡à¤µà¤¬à¤¾à¤° à¤¸à¥‡ à¤¦à¥‡à¤¶ à¤šà¥à¤¨à¥‡à¤‚ à¤”à¤° à¤µà¥‡à¤¬à¤¸à¤¾à¤‡à¤Ÿ à¤•à¥€ à¤­à¤¾à¤·à¤¾ à¤¬à¤¦à¤²à¥‡à¤‚à¥¤", selectedLanguage: "à¤µà¤°à¥à¤¤à¤®à¤¾à¤¨ à¤­à¤¾à¤·à¤¾" }, footer: { copyright: "Â© 2026 Wuping Feitian Electronic Technology Company Limited. à¤¸à¤°à¥à¤µà¤¾à¤§à¤¿à¤•à¤¾à¤° à¤¸à¥à¤°à¤•à¥à¤·à¤¿à¤¤à¥¤" } },
  ur: { navbar: { selectCountry: "Ù…Ù„Ú© Ù…Ù†ØªØ®Ø¨ Ú©Ø±ÛŒÚº", navigation: "Ù†ÛŒÙˆÛŒÚ¯ÛŒØ´Ù†", login: "Ù„Ø§Ú¯ Ø§Ù†", theme: { toggle: "ØªÚ¾ÛŒÙ… Ø¨Ø¯Ù„ÛŒÚº", light: "Ù„Ø§Ø¦Ù¹", dark: "ÚˆØ§Ø±Ú©", system: "Ø³Ø³Ù¹Ù…" } }, home: { title: "ÛÙ…Ø§Ø±ÛŒ ÙˆÛŒØ¨ Ø³Ø§Ø¦Ù¹ Ù…ÛŒÚº Ø®ÙˆØ´ Ø¢Ù…Ø¯ÛŒØ¯", description: "Ù†ÛŒÙˆØ¨Ø§Ø± Ø³Û’ Ù…Ù„Ú© Ù…Ù†ØªØ®Ø¨ Ú©Ø±ÛŒÚº Ø§ÙˆØ± ÙˆÛŒØ¨ Ø³Ø§Ø¦Ù¹ Ú©ÛŒ Ø²Ø¨Ø§Ù† ØªØ¨Ø¯ÛŒÙ„ Ú©Ø±ÛŒÚºÛ”", selectedLanguage: "Ù…ÙˆØ¬ÙˆØ¯Û Ø²Ø¨Ø§Ù†" } },
  fr: { navbar: { selectCountry: "Choisir le pays", navigation: "Navigation", login: "Connexion", theme: { toggle: "Changer le thÃ¨me", light: "Clair", dark: "Sombre", system: "SystÃ¨me" } }, home: { title: "Bienvenue sur notre site", description: "Choisissez un pays dans la barre de navigation pour changer la langue du site.", selectedLanguage: "Langue actuelle" } },
  it: { navbar: { selectCountry: "Seleziona paese", navigation: "Navigazione", login: "Accedi", theme: { toggle: "Cambia tema", light: "Chiaro", dark: "Scuro", system: "Sistema" } }, home: { title: "Benvenuto nel nostro sito", description: "Scegli un paese dalla barra di navigazione per cambiare lingua.", selectedLanguage: "Lingua attuale" } },
  es: { navbar: { selectCountry: "Seleccionar paÃ­s", navigation: "NavegaciÃ³n", login: "Iniciar sesiÃ³n", theme: { toggle: "Cambiar tema", light: "Claro", dark: "Oscuro", system: "Sistema" } }, home: { title: "Bienvenido a nuestro sitio web", description: "Elige un paÃ­s en la barra de navegaciÃ³n para cambiar el idioma del sitio.", selectedLanguage: "Idioma actual" } },
  ru: { navbar: { selectCountry: "Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ ÑÑ‚Ñ€Ð°Ð½Ñƒ", navigation: "ÐÐ°Ð²Ð¸Ð³Ð°Ñ†Ð¸Ñ", login: "Ð’Ð¾Ð¹Ñ‚Ð¸", theme: { toggle: "Ð¡Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ Ñ‚ÐµÐ¼Ñƒ", light: "Ð¡Ð²ÐµÑ‚Ð»Ð°Ñ", dark: "Ð¢ÐµÐ¼Ð½Ð°Ñ", system: "Ð¡Ð¸ÑÑ‚ÐµÐ¼Ð°" } }, home: { title: "Ð”Ð¾Ð±Ñ€Ð¾ Ð¿Ð¾Ð¶Ð°Ð»Ð¾Ð²Ð°Ñ‚ÑŒ Ð½Ð° Ð½Ð°Ñˆ ÑÐ°Ð¹Ñ‚", description: "Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ ÑÑ‚Ñ€Ð°Ð½Ñƒ Ð² Ð½Ð°Ð²Ð¸Ð³Ð°Ñ†Ð¸Ð¸, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¸Ð·Ð¼ÐµÐ½Ð¸Ñ‚ÑŒ ÑÐ·Ñ‹Ðº ÑÐ°Ð¹Ñ‚Ð°.", selectedLanguage: "Ð¢ÐµÐºÑƒÑ‰Ð¸Ð¹ ÑÐ·Ñ‹Ðº" } },
  pt: { navbar: { selectCountry: "Selecionar paÃ­s", navigation: "NavegaÃ§Ã£o", login: "Entrar", theme: { toggle: "Alternar tema", light: "Claro", dark: "Escuro", system: "Sistema" } }, home: { title: "Bem-vindo ao nosso site", description: "Escolha um paÃ­s na navegaÃ§Ã£o para alterar o idioma do site.", selectedLanguage: "Idioma atual" } },
  ar: { navbar: { selectCountry: "Ø§Ø®ØªØ± Ø§Ù„Ø¯ÙˆÙ„Ø©", navigation: "Ø§Ù„ØªÙ†Ù‚Ù„", login: "ØªØ³Ø¬ÙŠÙ„ Ø§Ù„Ø¯Ø®ÙˆÙ„", theme: { toggle: "ØªØ¨Ø¯ÙŠÙ„ Ø§Ù„Ø³Ù…Ø©", light: "ÙØ§ØªØ­", dark: "Ø¯Ø§ÙƒÙ†", system: "Ø§Ù„Ù†Ø¸Ø§Ù…" } }, home: { title: "Ù…Ø±Ø­Ø¨Ù‹Ø§ Ø¨Ùƒ ÙÙŠ Ù…ÙˆÙ‚Ø¹Ù†Ø§", description: "Ø§Ø®ØªØ± Ø¯ÙˆÙ„Ø© Ù…Ù† Ø´Ø±ÙŠØ· Ø§Ù„ØªÙ†Ù‚Ù„ Ù„ØªØºÙŠÙŠØ± Ù„ØºØ© Ø§Ù„Ù…ÙˆÙ‚Ø¹.", selectedLanguage: "Ø§Ù„Ù„ØºØ© Ø§Ù„Ø­Ø§Ù„ÙŠØ©" } },
  tr: { navbar: { selectCountry: "Ãœlke seÃ§", navigation: "Gezinme", login: "GiriÅŸ", theme: { toggle: "Tema deÄŸiÅŸtir", light: "AÃ§Ä±k", dark: "Koyu", system: "Sistem" } }, home: { title: "Web sitemize hoÅŸ geldiniz", description: "Site dilini deÄŸiÅŸtirmek iÃ§in menÃ¼den Ã¼lke seÃ§in.", selectedLanguage: "GeÃ§erli dil" } },
  af: { navbar: { selectCountry: "Kies land", navigation: "Navigasie", login: "Teken in", theme: { toggle: "Verander tema", light: "Lig", dark: "Donker", system: "Stelsel" } }, home: { title: "Welkom by ons webwerf", description: "Kies 'n land in die navigasie om die webwerf se taal te verander.", selectedLanguage: "Huidige taal" } },
};

export function getDictionary(locale: Locale): Dictionary {
  if (locale === defaultLocale) {
    return sourceDictionary;
  }

  return mergeDictionary(sourceDictionary, localeOverrides[locale as Exclude<Locale, "en">]);
}


