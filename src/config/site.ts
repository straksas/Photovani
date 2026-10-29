// ============================================================================
// Site configuration — edit this file to update business information.
// No component code needs to change when you update values here.
// ============================================================================

export interface ServiceCategory {
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  price: string;
  image: string;
  alt: string;
}

export interface PortfolioImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface PortfolioCategory {
  slug: string;
  title: string;
  description: string;
  images: PortfolioImage[];
}

export const siteConfig = {
  // ---- Branding -------------------------------------------------------------
  businessName: "Photovani",
  tagline: "Photovani - Photography Services",
  photographerName: "Photovani",

  // ---- Domain (update to your production domain before deploy) -------------
  productionDomain: "https://www.example.com",

  // ---- Location / Service Area ----------------------------------------------
  // Update these to reflect the real city and areas you serve.
  primaryCity: "Your City",
  serviceAreas: ["Your City", "Surrounding Region"],
  stateRegion: "Your State",

  // ---- Contact --------------------------------------------------------------
  email: "info@photovani.com",
  phone: "", // Leave empty ("") if no phone number yet — it won't display
  instagram: "", // Optional social handle (without @), leave "" to hide
  instagramUrl: "", // Full URL if set, e.g. https://instagram.com/yourhandle
  facebookUrl: "", // Full URL, leave "" to hide

  // ---- SEO defaults ---------------------------------------------------------
  defaultLocale: "en",
  defaultOgImage: "/og-image.jpg", // Place a 1200×630 image in /public

  // ---- Intro copy (used on homepage) ----------------------------------------
  introHeading: "Capturing life's most tender moments",
    introParagraph:
      "I'm a professional photographer specializing in maternity, couples, family, and individual photography in {city}. My approach is relaxed and natural — I focus on genuine emotion, soft light, and the small details that make your story yours. Every session is tailored to you, so your photographs feel personal, timeless, and true.",
};

// ---- Services --------------------------------------------------------------

export const services: ServiceCategory[] = [
  {
    slug: "maternity",
    title: "Maternity Photography",
    shortDescription:
      "Celebrate the quiet wonder of pregnancy with soft, timeless maternity portraits in natural light.",
    price: "from $200",
    description:
      "Maternity photography is about honouring a fleeting, extraordinary chapter. Sessions are unhurried and comfortable, held in soft natural light at a location that feels meaningful to you — your home, a favourite park, a sunlit beach, or a serene studio. I guide you gently through poses so you feel at ease, and the result is a collection of warm, heartfelt images that celebrate the journey to parenthood. Whether you're expecting your first baby or growing your family, a professional maternity photoshoot captures the beauty of pregnancy with timeless elegance. Each session includes wardrobe guidance, a pre-session consultation to plan the look and location you love, and a curated gallery of heirloom-quality images you'll return to for years.",
    image: "/1920_short_edge_SC-4.webp",
    alt: "Expectant mother posing beside a palm tree on the beach in a blue dress",
  },
  {
    slug: "couples",
    title: "Couples Photography",
    shortDescription:
      "Authentic, emotive couples portraits that capture the connection you share.",
    price: "from $300",
    description:
      "Couples photography should feel like spending time together, not posing for a camera. Whether you're celebrating an engagement, an anniversary, or simply a season of life, sessions are relaxed and conversation-driven so your connection shows naturally. We'll choose a setting that fits you — golden-hour outdoors, a quiet urban corner, a windswept beach, or a cozy indoor scene — and create romantic images that feel like you. A professional couples photoshoot is the perfect way to mark a milestone or capture where you are right now: engagement photos, anniversary portraits, or just-because sessions that preserve your story in beautiful, natural light. You'll receive a thoughtfully edited gallery of timeless portraits you can print, share, and treasure.",
    image: "/1920_short_edge_SC-5.webp",
    alt: "A couple embracing during an outdoor portrait session in a lush garden",
  },
  {
    slug: "family",
    title: "Family Photography",
    shortDescription:
      "Warm, candid family portraits you'll treasure for generations.",
    price: "from $300",
    description:
      "Family photography is about capturing the way you are together right now — the laughter, the chaos, the tenderness. Sessions are playful and low-pressure, with plenty of room for kids to be kids. We'll pick an outdoor location or a comfortable at-home setting, and I'll focus on genuine interactions so your family portraits feel alive, not stiff. A professional family photoshoot preserves these years in beautiful, natural-light portraits you'll love looking back on — from multi-generational gatherings to everyday moments at home. Whether it's an annual family portrait session, a milestone celebration, or holiday photos you'll actually want to frame, every session is tailored to your family and delivered as a curated gallery of timeless, printable images.",
    image: "/1920x1280-1-2_(1).webp",
    alt: "A family sharing a joyful, candid moment together outdoors",
  },
];

// ---- Portfolio -------------------------------------------------------------

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "maternity",
    title: "Maternity",
    description:
      "Soft, natural maternity portraits celebrating the journey of pregnancy in beautiful, timeless light.",
    images: [
      {
        src: "/1920_short_edge_SC-4.webp",
        alt: "Expectant mother posing beside a palm tree on the beach in a blue dress",
        width: 1920,
        height: 2560,
      },
      {
        src: "https://images.pexels.com/photos/32270872/pexels-photo-32270872.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "Pregnant woman in a flowing green dress in soft outdoor sunlight",
        width: 1000,
        height: 1500,
      },
      {
        src: "https://images.pexels.com/photos/20607812/pexels-photo-20607812.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "Pregnant woman in a white dress smiling joyfully in a studio",
        width: 1000,
        height: 1500,
      },
      {
        src: "https://images.pexels.com/photos/16090165/pexels-photo-16090165.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "Black and white portrait of a pregnant woman standing in profile",
        width: 1000,
        height: 1500,
      },
      {
        src: "https://images.pexels.com/photos/31455005/pexels-photo-31455005.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "Black and white maternity portrait in a lace top highlighting maternal beauty",
        width: 1000,
        height: 1500,
      },
      {
        src: "https://images.pexels.com/photos/28296622/pexels-photo-28296622.jpeg?auto=compress&cs=tinysrgb&w=1000",
        alt: "Pregnant woman in a traditional dress capturing elegance and the maternity glow",
        width: 1000,
        height: 1250,
      },
    ],
  },
  {
    slug: "couples",
    title: "Couples",
    description:
      "Authentic, emotive couples portraits that capture the connection between two people in natural light.",
    images: [
      {
        src: "/1920_short_edge_SC-5.webp",
        alt: "A couple embracing during an outdoor portrait session in a lush garden",
        width: 1920,
        height: 2560,
      },
      {
        src: "https://images.pexels.com/photos/17704219/pexels-photo-17704219.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "A couple sharing a tender moment under a night sky",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/5760359/pexels-photo-5760359.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "A couple sharing a romantic kiss on a rocky seaside",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/39535856/pexels-photo-39535856.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "Romantic silhouette of a couple under a historic archway",
        width: 1200,
        height: 900,
      },
      {
        src: "https://images.pexels.com/photos/4014881/pexels-photo-4014881.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "A couple sharing a romantic moment on the beach at sunset",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/1824944/pexels-photo-1824944.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "Close-up of a couple embracing in a sunny outdoor setting",
        width: 1200,
        height: 800,
      },
    ],
  },
  {
    slug: "family",
    title: "Family",
    description:
      "Warm, candid family portraits full of laughter, connection, and real moments in natural light.",
    images: [
      {
        src: "/1920x1280-1-2_(1).webp",
        alt: "A family sharing a joyful, candid moment together outdoors",
        width: 1920,
        height: 1280,
      },
      {
        src: "https://images.pexels.com/photos/7025571/pexels-photo-7025571.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "A joyful family gathering outdoors reflecting togetherness and celebration",
        width: 1200,
        height: 872,
      },
      {
        src: "https://images.pexels.com/photos/14349726/pexels-photo-14349726.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "Smiling family in traditional dress enjoying a sunny day outdoors",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/37049848/pexels-photo-37049848.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "Joyful family bonding moment in a lush park capturing laughter and love",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/31106476/pexels-photo-31106476.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "Adorable family photo capturing joyful children in a candid moment",
        width: 1200,
        height: 800,
      },
      {
        src: "https://images.pexels.com/photos/39820782/pexels-photo-39820782.jpeg?auto=compress&cs=tinysrgb&w=1200",
        alt: "A family enjoying a tender moment outdoors during the fall season",
        width: 1200,
        height: 800,
      },
    ],
  },
];

// ---- Navigation ------------------------------------------------------------

export interface NavItem {
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { label: "Home", path: "/" },
  { label: "Contact", path: "/contact" },
];
