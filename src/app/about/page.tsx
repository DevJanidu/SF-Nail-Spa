import Image from "next/image";
import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import ValueIcon from "@/components/ValueIcon";
import CtaBanner from "@/components/CtaBanner";
import CTAButton from "@/components/CTAButton";
import { about, business, photos } from "@/lib/data";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about SF Nail Spa — a luxury organic, non-toxic, cruelty-free nail salon in San Francisco's Outer Sunset. Our mission, vision, and the values behind our exceptional service.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      {/* Hero intro with salon photo */}
      <section className="section">
        <div className="container">
          <div className="split-grid" style={{ alignItems: "center" }}>
            <div>
              <SectionHeading eyebrow="About Us" title={`Welcome to ${business.name}`}>
                {about.intro}
              </SectionHeading>
              <CTAButton href="/booking">Book an Appointment</CTAButton>
            </div>
            <Reveal>
              <div
                style={{
                  position: "relative",
                  aspectRatio: "3/4",
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

      {/* Mission & Vision */}
      <section className="section section--alt">
        <div className="container">
          <div className="split-grid">
            <Reveal className="card">
              <div
                style={{
                  position: "relative",
                  height: "220px",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  marginBottom: "var(--space-3)",
                }}
              >
                <Image
                  src={photos.manicure}
                  alt={photos.manicureAlt}
                  fill
                  sizes="(max-width: 820px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="chip chip--clay">Our Mission</span>
              <h3 style={{ marginTop: "1rem" }}>Beauty that&apos;s kind to you and the planet</h3>
              <p className="text-muted" style={{ marginTop: "0.75rem" }}>
                {about.mission}
              </p>
            </Reveal>
            <Reveal className="card">
              <div
                style={{
                  position: "relative",
                  height: "220px",
                  borderRadius: "var(--radius-md)",
                  overflow: "hidden",
                  marginBottom: "var(--space-3)",
                }}
              >
                <Image
                  src={photos.organic}
                  alt={photos.organicAlt}
                  fill
                  sizes="(max-width: 820px) 100vw, 45vw"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <span className="chip chip--sage">Our Vision</span>
              <h3 style={{ marginTop: "1rem" }}>The Outer Sunset&apos;s home for organic beauty</h3>
              <p className="text-muted" style={{ marginTop: "0.75rem" }}>
                {about.vision}
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Team photo + organic callout */}
      <section className="section">
        <div className="container split-grid" style={{ alignItems: "center" }}>
          <div>
            <SectionHeading eyebrow="Our Team" title="Skilled hands, genuine care">
              Every technician at SF Nail Spa combines rigorous training with a real
              passion for their craft — and an unhurried, detail-first approach that
              shows in every finish.
            </SectionHeading>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "var(--space-3)" }}>
              {["Rigorously trained & continuously learning", "Attentive, personalized service every visit", "Wheelchair accessible with no steps", "A warm welcome for elderly & mobility-impaired guests"].map((pt) => (
                <div key={pt} style={{ display: "flex", gap: "0.75rem", alignItems: "center", fontSize: "var(--text-sm)" }}>
                  <span style={{ color: "var(--color-accent)", fontWeight: 700 }}>✦</span>
                  {pt}
                </div>
              ))}
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
                src={photos.aboutTeam}
                alt={photos.aboutTeamAlt}
                fill
                sizes="(max-width: 820px) 100vw, 48vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="section section--alt">
        <div className="container">
          <SectionHeading eyebrow="Core Values" title="What we stand for" center>
            The principles behind every appointment.
          </SectionHeading>
          <Reveal className="grid-auto" stagger>
            {about.values.map((v) => (
              <div className="card" key={v.title}>
                <ValueIcon name={v.icon} />
                <h3>{v.title}</h3>
                <p className="text-muted" style={{ marginTop: "0.5rem" }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Come experience the difference"
        text="Visit us in the Outer Sunset for organic, luxurious nail care. Book ahead or drop in."
      />
    </>
  );
}
