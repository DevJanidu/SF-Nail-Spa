import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import CTAButton from "@/components/CTAButton";
import CtaBanner from "@/components/CtaBanner";
import { serviceCategories, PRICING_DISCLAIMER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Vain pricing for manicures, pedicures, gel nails, nail art, eyelash extensions, and waxing in San Francisco's Outer Sunset. Starting prices; final pricing confirmed in-salon.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Pricing" title="Transparent, fair pricing">
            Starting prices for every service. {PRICING_DISCLAIMER}
          </SectionHeading>

          <div
            className="card"
            style={{
              background: "var(--color-surface-alt)",
              marginBottom: "var(--space-4)",
              borderStyle: "dashed",
            }}
          >
            <p className="text-muted" style={{ fontSize: "var(--text-sm)" }}>
              <strong style={{ color: "var(--color-text)" }}>Please note:</strong>{" "}
              {PRICING_DISCLAIMER} Prices shown are starting points and pending final
              confirmation.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-5)" }}>
            {serviceCategories.map((cat) => (
              <div key={cat.slug} id={cat.slug} style={{ scrollMarginTop: "100px" }}>
                <SectionHeading title={cat.title} brushstroke />
                <div className="card" style={{ paddingBlock: "0.5rem" }}>
                  {cat.items.map((item) => (
                    <div className="price-row" key={item.name}>
                      <span className="price-name">
                        {item.name}
                        {item.desc && <span className="price-desc">{item.desc}</span>}
                      </span>
                      <span className="price-value">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "var(--space-4)" }}>
            <CTAButton href="/booking">Book an Appointment</CTAButton>
          </div>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
