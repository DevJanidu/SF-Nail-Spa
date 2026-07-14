// Single source of truth — all business identity fields are driven by .env vars
// so the same codebase can be deployed for different salon clients.
// Change values in .env (or the hosting platform's env config) — never hardcode here.

const e = process.env;

// Resolve address parts first so we can build derived strings cleanly.
const _name     = e.NEXT_PUBLIC_COMPANY_NAME     ?? "Vain";
const _street   = e.NEXT_PUBLIC_ADDRESS_STREET   ?? "1324 Noriega Street";
const _city     = e.NEXT_PUBLIC_ADDRESS_CITY     ?? "San Francisco";
const _state    = e.NEXT_PUBLIC_ADDRESS_STATE    ?? "CA";
const _zip      = e.NEXT_PUBLIC_ADDRESS_ZIP      ?? "94122";

export const business = {
  name:         _name,
  logo:         e.NEXT_PUBLIC_COMPANY_LOGO        ?? "",
  slogan:       e.NEXT_PUBLIC_COMPANY_SLOGAN      ?? "Luxury Nail Care with Organic Beauty & Exceptional Service.",
  neighborhood: e.NEXT_PUBLIC_NEIGHBORHOOD        ?? "Outer Sunset",
  address: {
    street: _street,
    city:   _city,
    state:  _state,
    zip:    _zip,
    full:   `${_street}, ${_city}, ${_state} ${_zip}`,
  },
  phoneDisplay: e.NEXT_PUBLIC_PHONE_DISPLAY ?? "(415) 564-5581",
  phoneHref:    e.NEXT_PUBLIC_PHONE_HREF    ?? "tel:+14155645581",
  email:        e.NEXT_PUBLIC_COMPANY_EMAIL ?? "hello@sfnailspa.com",
  url:          e.NEXT_PUBLIC_COMPANY_URL   ?? "https://www.sfnailspa.com",
  // URL-encoded maps query built from address — no separate env var needed.
  mapsQuery: encodeURIComponent(
    `${_name}, ${_street}, ${_city}, ${_state} ${_zip}`
  ).replace(/%20/g, "+"),
  social: {
    instagram: e.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "",
    facebook:  e.NEXT_PUBLIC_SOCIAL_FACEBOOK  ?? "",
    yelp:      e.NEXT_PUBLIC_SOCIAL_YELP      ?? "",
  },
  categories: ["Nail Salon", "Beauty Salon", "Waxing Services", "Eyelash Services"],
};

export type DayHours = { day: string; hours: string; closed?: boolean };

function day(label: string, envVal: string | undefined, fallback: string): DayHours {
  const h = envVal ?? fallback;
  return { day: label, hours: h, ...(h.toLowerCase() === "closed" ? { closed: true } : {}) };
}

export const hours: DayHours[] = [
  day("Monday",    e.NEXT_PUBLIC_HOURS_MON, "Closed"),
  day("Tuesday",   e.NEXT_PUBLIC_HOURS_TUE, "10:00 AM – 7:00 PM"),
  day("Wednesday", e.NEXT_PUBLIC_HOURS_WED, "10:00 AM – 7:00 PM"),
  day("Thursday",  e.NEXT_PUBLIC_HOURS_THU, "10:00 AM – 7:00 PM"),
  day("Friday",    e.NEXT_PUBLIC_HOURS_FRI, "10:00 AM – 7:00 PM"),
  day("Saturday",  e.NEXT_PUBLIC_HOURS_SAT, "10:00 AM – 7:00 PM"),
  day("Sunday",    e.NEXT_PUBLIC_HOURS_SUN, "10:00 AM – 6:00 PM"),
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Pricing", href: "/pricing" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "FAQs", href: "/faqs" },
  { label: "Contact", href: "/contact" },
];

export const PRICING_DISCLAIMER =
  "Prices are starting points and may vary based on nail length, condition, and design complexity. Final pricing is confirmed in-salon.";

// ---------------- Services & Pricing ----------------

export type ServiceItem = { name: string; desc?: string; price: string };
export type ServiceCategory = {
  slug: string;
  title: string;
  blurb: string;
  organic?: boolean;
  items: ServiceItem[];
};

export const serviceCategories: ServiceCategory[] = [
  {
    slug: "manicure",
    title: "Manicure",
    blurb:
      "Meticulous shaping, cuticle care, and a relaxing hand massage to finish — the foundation of healthy, polished hands.",
    organic: true,
    items: [
      { name: "Classic Manicure", desc: "Shape, cuticle care, buff & polish.", price: "From $25" },
      { name: "Gel Manicure", desc: "Long-lasting, chip-resistant gel polish.", price: "From $40" },
      { name: "Deluxe Manicure", desc: "Classic + exfoliating scrub & mask.", price: "From $45" },
      { name: "French Manicure", desc: "Timeless natural pink with white tips.", price: "From $35" },
      { name: "Nail Strengthening", desc: "Treatment for brittle, peeling nails.", price: "From $15" },
      { name: "Nail Shaping", desc: "Precision filing to your preferred shape.", price: "From $10" },
      { name: "Cuticle Care", desc: "Gentle conditioning and tidy-up.", price: "From $12" },
      { name: "Hand Massage", desc: "Soothing add-on with organic lotion.", price: "From $12" },
    ],
  },
  {
    slug: "pedicure",
    title: "Pedicure",
    blurb:
      "From a quick refresh to a full spa ritual — exfoliation, callus care, and a warm massage that leaves you grounded.",
    organic: true,
    items: [
      { name: "Classic Pedicure", desc: "Soak, shape, cuticle care & polish.", price: "From $35" },
      { name: "Gel Pedicure", desc: "Glossy gel finish that lasts for weeks.", price: "From $50" },
      { name: "Spa Pedicure", desc: "Classic + scrub, mask & extended massage.", price: "From $55" },
      { name: "Deluxe Organic Pedicure", desc: "Botanical soak, sugar scrub & hot towels.", price: "From $65" },
      { name: "Callus Treatment", desc: "Smoothing care for heels & soles.", price: "From $15" },
      { name: "Polish Change", desc: "Fresh color, no soak.", price: "From $15" },
    ],
  },
  {
    slug: "gel-nails",
    title: "Gel Nails",
    blurb:
      "Durable, high-shine gel color and overlays applied with care. (We do not offer hard gel or artificial extensions.)",
    items: [
      { name: "Gel Color Application", desc: "Rich, long-wear gel polish.", price: "From $40" },
      { name: "Gel Overlay (Natural Nail)", desc: "Strength & shine over your own nail.", price: "From $45" },
      { name: "Gel Removal", desc: "Gentle soak-off that protects the nail.", price: "From $12" },
      { name: "Gel French", desc: "Crisp French finish in gel.", price: "From $50" },
    ],
  },
  {
    slug: "nail-art",
    title: "Nail Art",
    blurb:
      "Hand-painted detail, cat eye, chrome, and seasonal designs — tell us your inspiration and we'll create it.",
    items: [
      { name: "Cat Eye Nails", desc: "Magnetic shimmer with a feline gleam.", price: "From $10/nail" },
      { name: "Chrome Nails", desc: "Mirror-finish metallic chrome.", price: "From $10/nail" },
      { name: "Hand-Painted Art", desc: "Custom freehand designs.", price: "From $5/nail" },
      { name: "Rhinestones & Accents", desc: "Crystals, foils & charms.", price: "From $3/nail" },
      { name: "Ombré / Gradient", desc: "Soft blended color transitions.", price: "From $15" },
    ],
  },
  {
    slug: "eyelash-services",
    title: "Eyelash Services",
    blurb:
      "Wake-up-ready eyes with lash extensions and lifts, applied by a careful, detail-focused technician.",
    items: [
      { name: "Classic Lash Extensions", desc: "One extension per natural lash.", price: "From $90" },
      { name: "Hybrid Lash Extensions", desc: "Mix of classic & volume fans.", price: "From $120" },
      { name: "Volume Lash Extensions", desc: "Full, fluffy multi-lash fans.", price: "From $150" },
      { name: "Lash Fill (2–3 weeks)", desc: "Maintain your set.", price: "From $50" },
      { name: "Lash Lift & Tint", desc: "Curl & darken your own lashes.", price: "From $75" },
    ],
  },
  {
    slug: "waxing-services",
    title: "Waxing Services",
    blurb:
      "Clean, gentle waxing for face and brows using quality wax for smooth, lasting results.",
    items: [
      { name: "Eyebrow Wax & Shape", desc: "Tailored to your face.", price: "From $15" },
      { name: "Upper Lip", price: "From $10" },
      { name: "Chin", price: "From $10" },
      { name: "Full Face", price: "From $40" },
      { name: "Underarm", price: "From $20" },
    ],
  },
  {
    slug: "additional-services",
    title: "Additional Services",
    blurb: "Thoughtful add-ons and finishing touches to round out your visit.",
    organic: true,
    items: [
      { name: "Paraffin Wax Treatment", desc: "Warm, hydrating hand or foot dip.", price: "From $15" },
      { name: "Nail Repair", desc: "Fix a single broken or split nail.", price: "From $5" },
      { name: "Polish Change (Regular)", price: "From $12" },
      { name: "French Add-On", price: "From $10" },
      { name: "Kids' Mani (under 10)", price: "From $18" },
    ],
  },
];

// ---------------- Testimonials ----------------

export type Testimonial = { name: string; location: string; rating: number; quote: string };

export const testimonials: Testimonial[] = [
  {
    name: "Maya R.",
    location: "Outer Sunset, SF",
    rating: 5,
    quote:
      "Hands down the best gel manicure I've had in the city. The space is calm, spotless, and the organic products are so gentle on my sensitive skin.",
  },
  {
    name: "Jasmine T.",
    location: "Inner Richmond, SF",
    rating: 5,
    quote:
      "I came in for cat eye nails and left obsessed. The detail work is incredible and they really listen to what you want. My new go-to.",
  },
  {
    name: "Priya N.",
    location: "Sunset District, SF",
    rating: 5,
    quote:
      "The spa pedicure is pure relaxation — warm towels, the most soothing massage, and my feet have never looked better. Worth every minute.",
  },
  {
    name: "Elena G.",
    location: "Parkside, SF",
    rating: 5,
    quote:
      "Friendly, professional, and wheelchair accessible with no steps, which matters for my mom. They treated her with such patience and care.",
  },
  {
    name: "Sophie L.",
    location: "Outer Sunset, SF",
    rating: 5,
    quote:
      "My lash extensions look natural and full and lasted beautifully. You can tell they care about lash health, not just the look.",
  },
  {
    name: "Daniela M.",
    location: "Cole Valley, SF",
    rating: 5,
    quote:
      "Chrome nails done flawlessly. Clean salon, non-toxic products, and genuinely kind staff. I drive across the city for this place.",
  },
];

// ---------------- FAQs ----------------

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Do you accept walk-ins?",
    a: "Yes! Walk-ins are always welcome. That said, appointments are recommended — especially on weekends and for lash or nail-art services — so we can guarantee your preferred time with the right technician.",
  },
  {
    q: "Do I need an appointment?",
    a: "An appointment isn't required, but it's the best way to avoid a wait and reserve time with a specialist. You can book online through our Book Appointment page or call us at (415) 564-5581.",
  },
  {
    q: "Do you offer hard gel or artificial nail extensions?",
    a: "We do not offer hard gel or artificial nail extensions. We focus on the health of your natural nails with gel polish, gel overlays, manicures, pedicures, and nail art.",
  },
  {
    q: "Can you accommodate elderly clients?",
    a: "Absolutely. Our salon is wheelchair accessible with no steps, and our technicians are experienced in providing gentle, patient, and attentive care for elderly clients and those with mobility needs.",
  },
  {
    q: "What products do you use?",
    a: "We use organic, non-toxic, and cruelty-free products wherever possible, chosen to be gentler on your nails and skin and kinder to the environment — without compromising on a luxurious finish.",
  },
  {
    q: "Can you remove gel polish from another salon?",
    a: "Yes. We offer gentle gel polish removal that protects your natural nail. Let us know at check-in if you're arriving with existing gel so we can plan the time.",
  },
  {
    q: "Do you repair a single broken or damaged nail?",
    a: "We do. Our nail repair service fixes individual broken, split, or chipped nails so your set looks seamless again. Just mention it when you arrive.",
  },
];

// ---------------- About ----------------

export const about = {
  intro:
    "Welcome to Vain, a calm retreat in San Francisco's Outer Sunset where coastal quiet meets hand-finished luxury. We believe beautiful nails shouldn't come at the cost of your health or the planet — so we pair organic, non-toxic, cruelty-free products with the kind of meticulous, unhurried care that turns a quick appointment into a genuine escape.",
  mission:
    "To deliver luxury nail and beauty care that's as kind to your body and the environment as it is beautiful — using organic, non-toxic products and exceptional, personalized service in a welcoming, accessible space.",
  vision:
    "To be the Outer Sunset's most trusted destination for organic beauty: a salon where every guest feels relaxed, respected, and confident, and where clean, conscious care is simply the standard.",
  values: [
    { title: "Organic & Non-Toxic", desc: "Cleaner products that are gentler on your nails, skin, and the planet.", icon: "leaf" },
    { title: "Exceptional Service", desc: "Unhurried, personalized care from technicians who truly listen.", icon: "sparkle" },
    { title: "Cruelty-Free", desc: "Beauty without compromise — never tested on animals.", icon: "heart" },
    { title: "Cleanliness & Safety", desc: "Hospital-grade sanitation and freshly prepared tools for every guest.", icon: "shield" },
    { title: "Inclusive & Accessible", desc: "Wheelchair accessible with no steps, and a warm welcome for everyone.", icon: "accessible" },
    { title: "Lasting Results", desc: "Techniques and finishes designed to look beautiful well beyond your visit.", icon: "clock" },
  ],
};

// ---------------- Gallery ----------------

export type GalleryCategory = {
  slug: string;
  title: string;
  from: string;
  to: string;
  img: string;
};

// All images are from Unsplash (free to use, license: https://unsplash.com/license)
export const galleryCategories: GalleryCategory[] = [
  {
    slug: "manicure",
    title: "Manicure",
    from: "#F1DDD3",
    to: "#C2785F",
    img: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "pedicure",
    title: "Pedicure",
    from: "#E5EADF",
    to: "#7C8F6E",
    img: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=800&q=80",
  },
  {
    slug: "gel-nails",
    title: "Gel Nails",
    from: "#F1EAE0",
    to: "#AC6448",
    img: "https://images.unsplash.com/photo-1587729927069-ef3b7a5ab9b4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slug: "cat-eye-nails",
    title: "Cat Eye Nails",
    from: "#2C2720",
    to: "#C9A227",
    img: "https://images.unsplash.com/photo-1736434518489-0eb84070017f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slug: "chrome-nails",
    title: "Chrome Nails",
    from: "#E3DCD0",
    to: "#6B6258",
    img: "https://images.unsplash.com/photo-1610992015836-7c249d75782d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slug: "nail-art",
    title: "Nail Art",
    from: "#F1DDD3",
    to: "#7C8F6E",
    img: "https://images.unsplash.com/photo-1587729927069-ef3b7a5ab9b4?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    slug: "french-nails",
    title: "French Nails",
    from: "#FFFFFF",
    to: "#E3DCD0",
    img: "https://www.essie.com/-/media/project/loreal/brand-sites/essie/americas/us/articles/nail_art/how-to-do-french-tip-nails/essie-nail-polish-french-manicure-shiny-final-look-2-356x632.jpg?rev=83e7a34d36fe4a5fb0262bda696c61e3",
  },
  {
    slug: "eyelash-extensions",
    title: "Eyelash Extensions",
    from: "#2A2521",
    to: "#C2785F",
    img: "https://plus.unsplash.com/premium_photo-1661432806304-6d6cb7bfa4c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjV8fG5haWx8ZW58MHx8MHx8fDA%3D",
  },
  {
    slug: "before-after",
    title: "Before & After",
    from: "#7C8F6E",
    to: "#C2785F",
    img: "https://images.unsplash.com/photo-1610992015836-7c249d75782d?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export function galleryAlt(title: string) {
  return `${title} design at ${business.name}, ${business.neighborhood} San Francisco`;
}

// ---------------- Site-wide Photos ----------------
// All from Unsplash (free license). Replace with client photography when ready.
export const photos = {
  hero: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=85",
  heroAlt: "Close-up of a luxurious manicure at Vain in San Francisco",

  salonInterior: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  salonInteriorAlt: "Interior of Vain salon in San Francisco's Outer Sunset",

  aboutTeam: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
  aboutTeamAlt: "Nail technician at work at Vain, Outer Sunset San Francisco",

  manicure: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
  manicureAlt: "Gel manicure service at Vain San Francisco",

  pedicure: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80",
  pedicureAlt: "Luxury pedicure service at Vain San Francisco",

  nailArt: "https://images.unsplash.com/photo-1610992015836-7c249d75782d?auto=format&fit=crop&w=900&q=80",
  nailArtAlt: "Custom nail art design at Vain, Outer Sunset San Francisco",

  eyelash: "https://plus.unsplash.com/premium_photo-1661432806304-6d6cb7bfa4c1?auto=format&fit=crop&w=900&q=80",
  eyelashAlt: "Eyelash extension service at Vain San Francisco",

  organic: "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=900&q=80",
  organicAlt: "Organic nail care products used at Vain",
};
