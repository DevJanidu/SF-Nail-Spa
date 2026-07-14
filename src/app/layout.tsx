import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollTop from "@/components/ScrollTop";
import { business, hours } from "@/lib/data";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: `${business.name} | Organic Nail Salon in San Francisco's Outer Sunset`,
    template: `%s | ${business.name}`,
  },
  description:
    "Vain offers luxury, organic, non-toxic, and cruelty-free nail care in San Francisco's Outer Sunset — manicures, pedicures, gel nails, cat eye & chrome nail art, eyelash extensions, and waxing.",
  keywords: [
    "Nail Salon San Francisco",
    "Best Nail Salon Outer Sunset",
    "Organic Nail Salon",
    "Gel Manicure San Francisco",
    "Pedicure San Francisco",
    "Cat Eye Nails",
    "Chrome Nails",
    "Nail Art San Francisco",
    "Eyelash Extensions San Francisco",
    "Cruelty-Free Nail Salon",
    "Non-Toxic Nail Salon",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: business.name,
    title: `${business.name} | Luxury Organic Nail Care`,
    description:
      "Luxury nail care with organic beauty & exceptional service in the Outer Sunset, San Francisco.",
    url: business.url,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${business.name} | Luxury Organic Nail Care`,
    description:
      "Manicures, pedicures, gel & nail art, lashes and waxing — organic, non-toxic, cruelty-free.",
  },
  robots: { index: true, follow: true },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "NailSalon",
  name: business.name,
  description:
    "Luxury organic, non-toxic, cruelty-free nail and beauty salon in the Outer Sunset, San Francisco.",
  slogan: business.slogan,
  url: business.url,
  telephone: business.phoneDisplay,
  address: {
    "@type": "PostalAddress",
    streetAddress: business.address.street,
    addressLocality: business.address.city,
    addressRegion: business.address.state,
    postalCode: business.address.zip,
    addressCountry: "US",
  },
  areaServed: "San Francisco, CA",
  priceRange: "$$",
  openingHoursSpecification: hours
    .filter((h) => !h.closed)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.day === "Sunday" ? "10:00" : "10:00",
      closes: h.day === "Sunday" ? "18:00" : "19:00",
    })),
};

// Set the theme before paint to avoid a flash of the wrong theme.
const themeBoot = `
(function(){try{var t=localStorage.getItem('theme');
if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}
document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme='light';}})();
`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${poppins.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <div id="polish-wipe" aria-hidden="true">
          <span id="polish-wipe-brand">{business.name}</span>
        </div>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
        <ScrollTop />
      </body>
    </html>
  );
}
