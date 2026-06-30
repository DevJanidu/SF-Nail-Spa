import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";
import MapEmbed from "@/components/MapEmbed";
import HoursTable from "@/components/HoursTable";
import CTAButton from "@/components/CTAButton";
import { business } from "@/lib/data";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Contact SF Nail Spa at 1324 Noriega Street, San Francisco, CA 94122. Call (415) 564-5581, view hours and directions, or send us a message. Wheelchair accessible, no steps.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Contact" title="We’d love to see you">
          Find us in the Outer Sunset, give us a call, or drop a message below.
        </SectionHeading>

        <div className="split-grid" style={{ alignItems: "start" }}>
          <div className="stack" style={{ gap: "var(--space-3)" }}>
            <div className="card">
              <h3>Visit</h3>
              <p className="text-muted" style={{ marginTop: "0.75rem" }}>
                {business.address.street}
                <br />
                {business.address.city}, {business.address.state} {business.address.zip}
                <br />
                <span style={{ fontSize: "var(--text-sm)" }}>
                  {business.neighborhood} · Wheelchair accessible, no steps
                </span>
              </p>
              <div style={{ marginTop: "1rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <a href={business.phoneHref} className="btn btn-primary">
                  Call {business.phoneDisplay}
                </a>
                <CTAButton href="/booking">Book Appointment</CTAButton>
              </div>
            </div>

            <div className="card">
              <h3>Hours</h3>
              <div style={{ marginTop: "0.75rem" }}>
                <HoursTable />
              </div>
            </div>

            <MapEmbed />
          </div>

          <div className="card">
            <h3>Send a message</h3>
            <p className="text-muted" style={{ margin: "0.5rem 0 1.25rem", fontSize: "var(--text-sm)" }}>
              Questions about services, products, or accessibility? We&apos;ll reply within
              one business day.
            </p>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
