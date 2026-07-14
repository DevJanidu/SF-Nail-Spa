import Image from "next/image";
import Link from "next/link";
import HomeHero from "@/components/HomeHero";
import ChatAssistant from "@/components/ChatAssistant";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Gallery from "@/components/Gallery";
import Stars from "@/components/Stars";
import MapEmbed from "@/components/MapEmbed";
import HoursTable from "@/components/HoursTable";
import CtaBanner from "@/components/CtaBanner";
import ValueIcon from "@/components/ValueIcon";
import CTAButton from "@/components/CTAButton";
import {
  business,
  serviceCategories,
  testimonials,
  galleryCategories,
  about,
  photos,
} from "@/lib/data";

// Photos for featured services (Unsplash, free license)
const servicePhotos: Record<string, { src: string; alt: string }> = {
  manicure: {
    src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=600&q=80",
    alt: "Gel manicure close-up",
  },
  pedicure: {
    src: "https://images.unsplash.com/photo-1519014816548-bf5fe059798b?auto=format&fit=crop&w=600&q=80",
    alt: "Luxury spa pedicure",
  },
  "gel-nails": {
    src: "https://images.unsplash.com/photo-1587729927069-ef3b7a5ab9b4?auto=format&fit=crop&w=600&q=80",
    alt: "Gel nail colour application",
  },
  "nail-art": {
    src: "https://images.unsplash.com/photo-1610992015836-7c249d75782d?auto=format&fit=crop&w=600&q=80",
    alt: "Custom hand-painted nail art",
  },
  "eyelash-services": {
    src: "https://plus.unsplash.com/premium_photo-1661432806304-6d6cb7bfa4c1?auto=format&fit=crop&w=600&q=80",
    alt: "Eyelash extension application",
  },
  "waxing-services": {
    src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=600&q=80",
    alt: "Professional waxing service",
  },
};

export default function HomePage() {
  const featuredServices = serviceCategories.slice(0, 6);
  const previewGallery = galleryCategories.slice(0, 6);
  const featuredReviews = testimonials.slice(0, 3);

  return (
    <>
      <HomeHero />

      {/* Intro / why choose us */}
      <section className="section">
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "var(--space-5)",
              alignItems: "center",
            }}
            className="split-grid"
          >
            <div>
              <SectionHeading
                eyebrow="Welcome"
                title="A cleaner kind of luxury, in the Outer Sunset"
              >
                We&apos;re a nail and beauty salon built on organic, non-toxic,
                cruelty-free care — manicures, pedicures, gel, nail art, lashes, and
                waxing, all delivered with exceptional, personalized service.
              </SectionHeading>
              <Reveal className="stack" style={{ gap: "var(--space-2)", marginTop: "var(--space-3)" }}>
                {about.values.slice(0, 3).map((v) => (
                  <div
                    key={v.title}
                    style={{ display: "flex", gap: "1rem", alignItems: "flex-start" }}
                  >
                    <ValueIcon name={v.icon} />
                    <div>
                      <h3 style={{ fontSize: "var(--text-base)" }}>{v.title}</h3>
                      <p
                        className="text-muted"
                        style={{ marginTop: "0.25rem", fontSize: "var(--text-sm)" }}
                      >
                        {v.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </Reveal>
              <div style={{ marginTop: "var(--space-3)" }}>
                <Link href="/about" className="btn btn-secondary">
                  More About Us
                </Link>
              </div>
            </div>

            <Reveal>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "4/5",
                  borderRadius: "var(--radius-lg)",
                  overflow: "hidden",
                  boxShadow: "var(--shadow-lg)",
                }}
              >
                <Image
                  src={photos.salonInterior}
                  alt={photos.salonInteriorAlt}
                  fill
                  sizes="(max-width: 820px) 100vw, 48vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Services snapshot */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading eyebrow="Our Services" title="What we do">
            A full menu of nail and beauty care. Browse the highlights, then see the full
            list and pricing.
          </SectionHeading>
          <Reveal className="grid-auto" stagger>
            {featuredServices.map((s) => {
              const photo = servicePhotos[s.slug];
              return (
                <Link
                  href={`/services#${s.slug}`}
                  key={s.slug}
                  className="card"
                  style={{ color: "var(--color-text)", padding: 0, overflow: "hidden" }}
                >
                  {photo && (
                    <div
                      style={{
                        position: "relative",
                        height: "180px",
                        flexShrink: 0,
                      }}
                    >
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 600px) 100vw, 33vw"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  )}
                  <div style={{ padding: "var(--space-3)" }}>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {s.organic && (
                        <span className="chip chip--sage">Organic</span>
                      )}
                    </div>
                    <h3>{s.title}</h3>
                    <p
                      className="text-muted"
                      style={{ marginTop: "0.5rem", fontSize: "var(--text-sm)" }}
                    >
                      {s.blurb}
                    </p>
                  </div>
                </Link>
              );
            })}
          </Reveal>
          <div style={{ marginTop: "var(--space-4)" }}>
            <CTAButton href="/services">See All Services</CTAButton>
          </div>
        </div>
      </section>

      {/* Gallery preview */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Nail Art Gallery" title="A glimpse of our work">
            Cat eye, chrome, French, hand-painted art and more. Explore the full gallery
            by category.
          </SectionHeading>
          <Gallery categories={previewGallery} filterable={false} />
          <div style={{ marginTop: "var(--space-4)" }}>
            <Link href="/gallery" className="btn btn-secondary">
              View Full Gallery →
            </Link>
          </div>
        </div>
      </section>

      {/* Organic products highlight */}
      <section className="section section--alt">
        <div
          className="container split-grid"
          style={{ gap: "var(--space-5)" }}
        >
          <Reveal>
            <div
              style={{
                position: "relative",
                aspectRatio: "1/1",
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              <Image
                src={photos.organic}
                alt={photos.organicAlt}
                fill
                sizes="(max-width: 820px) 100vw, 48vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              eyebrow="Clean Beauty"
              title="Organic, non-toxic, cruelty-free — as standard"
            >
              We only use products that are safe for you, your nails, and the planet. No
              harsh chemicals, no compromises on the finish.
            </SectionHeading>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
                marginTop: "var(--space-3)",
              }}
            >
              {["Free from harsh solvents & formaldehyde", "Vegan & cruelty-free brands", "Gentle on sensitive skin & nails", "Sustainably chosen wherever possible"].map(
                (point) => (
                  <div
                    key={point}
                    style={{
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "flex-start",
                      fontSize: "var(--text-sm)",
                    }}
                  >
                    <span
                      style={{ color: "var(--color-secondary)", fontWeight: 700, flexShrink: 0, lineHeight: "1.6" }}
                    >
                      ✓
                    </span>
                    {point}
                  </div>
                )
              )}
            </div>
            <div style={{ marginTop: "var(--space-3)" }}>
              <CTAButton href="/about">Learn About Our Values</CTAButton>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="Loved by our neighbors">
            Five-star care, one happy client at a time.
          </SectionHeading>
          <Reveal className="grid-auto" stagger>
            {featuredReviews.map((t) => (
              <figure className="card" key={t.name} style={{ margin: 0 }}>
                <Stars rating={t.rating} />
                <blockquote
                  style={{ margin: "0.75rem 0 1rem", fontStyle: "italic" }}
                >
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <figcaption
                  className="text-muted"
                  style={{ fontSize: "var(--text-sm)" }}
                >
                  <strong style={{ color: "var(--color-text)" }}>{t.name}</strong> ·{" "}
                  {t.location}
                </figcaption>
              </figure>
            ))}
          </Reveal>
          <div style={{ marginTop: "var(--space-4)" }}>
            <Link href="/testimonials" className="btn btn-secondary">
              Read More Reviews →
            </Link>
          </div>
        </div>
      </section>

      {/* Location & hours */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading eyebrow="Visit Us" title="Find us in the fog">
            {business.address.full}
          </SectionHeading>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr",
              gap: "var(--space-4)",
              alignItems: "start",
            }}
            className="visit-grid"
          >
            <MapEmbed />
            <div className="card">
              <h3>Hours</h3>
              <div style={{ marginTop: "1rem" }}>
                <HoursTable />
              </div>
              <p
                className="text-muted"
                style={{ marginTop: "1rem", fontSize: "var(--text-sm)" }}
              >
                Call us:{" "}
                <a href={business.phoneHref} style={{ fontWeight: 600 }}>
                  {business.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner />

      <ChatAssistant />
    </>
  );
}
