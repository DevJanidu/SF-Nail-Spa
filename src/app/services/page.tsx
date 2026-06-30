import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import CTAButton from "@/components/CTAButton";
import CtaBanner from "@/components/CtaBanner";
import { serviceCategories } from "@/lib/data";

// Per-category cover photos (Unsplash, free license)
const categoryPhotos: Record<string, string> = {
  manicure: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=900&q=80",
  pedicure: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=900&q=80",
  "gel-nails": "https://images.unsplash.com/photo-1587729927069-ef3b7a5ab9b4?auto=format&fit=crop&w=900&q=80",
  "nail-art": "https://images.unsplash.com/photo-1610992015836-7c249d75782d?auto=format&fit=crop&w=900&q=80",
  "eyelash-services": "https://plus.unsplash.com/premium_photo-1661432806304-6d6cb7bfa4c1?auto=format&fit=crop&w=900&q=80",
  "waxing-services": "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=900&q=80",
  "additional-services": "https://images.unsplash.com/photo-1543362906-acfc16c67564?auto=format&fit=crop&w=900&q=80",
};

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore SF Nail Spa's services: manicures, pedicures, gel nails, nail art (cat eye, chrome, French), eyelash extensions, and waxing — organic and non-toxic, in San Francisco's Outer Sunset.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Services" title="Our full menu of care">
            Every service uses organic, non-toxic, cruelty-free products wherever possible.
            Pricing is on our{" "}
            <Link href="/pricing">Pricing page</Link>. Note: we do not offer hard gel or
            artificial nail extensions.
          </SectionHeading>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            {serviceCategories.map((cat) => (
              <div key={cat.slug} id={cat.slug} style={{ scrollMarginTop: "100px" }}>
                {categoryPhotos[cat.slug] && (
                  <div
                    style={{
                      position: "relative",
                      height: "280px",
                      borderRadius: "var(--radius-lg)",
                      overflow: "hidden",
                      marginBottom: "var(--space-3)",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    <Image
                      src={categoryPhotos[cat.slug]}
                      alt={`${cat.title} service at SF Nail Spa, San Francisco`}
                      fill
                      sizes="(max-width: 768px) 100vw, 1100px"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background:
                          "linear-gradient(to right, rgba(0,0,0,0.45) 0%, transparent 60%)",
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        padding: "var(--space-3)",
                      }}
                    >
                      {cat.organic && <span className="chip chip--sage" style={{ marginBottom: "0.5rem", width: "fit-content" }}>Organic</span>}
                      <h2 style={{ color: "#fff", margin: 0 }}>{cat.title}</h2>
                      <p style={{ color: "rgba(255,255,255,0.85)", marginTop: "0.5rem", maxWidth: "55ch", fontSize: "var(--text-sm)" }}>{cat.blurb}</p>
                    </div>
                  </div>
                )}
                {!categoryPhotos[cat.slug] && (
                  <div style={{ display: "flex", gap: "0.6rem", marginBottom: "0.5rem" }}>
                    {cat.organic && <span className="chip chip--sage">Organic</span>}
                  </div>
                )}
                {!categoryPhotos[cat.slug] && (
                  <SectionHeading title={cat.title} brushstroke>
                    {cat.blurb}
                  </SectionHeading>
                )}
                <Reveal className="grid-auto" stagger>
                  {cat.items.map((item) => (
                    <div className="card" key={item.name}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          gap: "0.75rem",
                          alignItems: "baseline",
                        }}
                      >
                        <h3 style={{ fontSize: "var(--text-lg)" }}>{item.name}</h3>
                        <span style={{ color: "var(--color-accent)", fontWeight: 600, whiteSpace: "nowrap" }}>
                          {item.price}
                        </span>
                      </div>
                      {item.desc && (
                        <p className="text-muted" style={{ marginTop: "0.5rem", fontSize: "var(--text-sm)" }}>
                          {item.desc}
                        </p>
                      )}
                    </div>
                  ))}
                </Reveal>
                <div style={{ marginTop: "var(--space-3)", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <CTAButton href="/booking">Book {cat.title}</CTAButton>
                  <Link href={`/pricing#${cat.slug}`} className="btn btn-secondary">
                    See Pricing
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
