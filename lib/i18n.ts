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
        title: "About SysPCB",
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
    emailVal: "sales@syspcb.com",
    copyright: "© 2026 Wuping Feitian Electronic Technology Company Limited. All rights reserved.",
  },
};
