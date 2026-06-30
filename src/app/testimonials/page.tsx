import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import Stars from "@/components/Stars";
import CtaBanner from "@/components/CtaBanner";
import { testimonials } from "@/lib/data";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Read 5-star reviews from SF Nail Spa clients in San Francisco's Outer Sunset — on our gel manicures, pedicures, cat eye & chrome nail art, lashes, and welcoming, accessible service.",
  alternates: { canonical: "/testimonials" },
};

export default function TestimonialsPage() {
  const avg =
    testimonials.reduce((s, t) => s + t.rating, 0) / testimonials.length;
  return (
    <>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Testimonials" title="What our clients say" center>
            {avg.toFixed(1)} average from {testimonials.length}+ five-star reviews.
          </SectionHeading>
          <Reveal className="grid-auto" stagger>
            {testimonials.map((t) => (
              <figure className="card" key={t.name} style={{ margin: 0 }}>
                <Stars rating={t.rating} />
                <blockquote style={{ margin: "0.75rem 0 1rem", fontStyle: "italic" }}>
                  “{t.quote}”
                </blockquote>
                <figcaption className="text-muted" style={{ fontSize: "var(--text-sm)" }}>
                  <strong style={{ color: "var(--color-text)" }}>{t.name}</strong> · {t.location}
                </figcaption>
              </figure>
            ))}
          </Reveal>
        </div>
      </section>

      <CtaBanner
        title="Join our happy clients"
        text="Experience the organic luxury for yourself — book your appointment today."
      />
    </>
  );
}
