import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import BookingForm from "@/components/BookingForm";
import HoursTable from "@/components/HoursTable";
import { business } from "@/lib/data";

export const metadata: Metadata = {
  title: "Book Appointment",
  description:
    "Request an appointment at Vain in San Francisco's Outer Sunset. Choose your service and preferred time, or call (415) 564-5581. Walk-ins always welcome.",
  alternates: { canonical: "/booking" },
};

export default function BookingPage() {
  return (
    <section className="section">
      <div className="container">
        <SectionHeading eyebrow="Book Appointment" title="Reserve your moment of calm">
          Send us a request and we&apos;ll confirm your time. Prefer to talk? Call{" "}
          <a href={business.phoneHref}>{business.phoneDisplay}</a> — and remember, walk-ins
          are always welcome.
        </SectionHeading>

        <div
          className="split-grid"
          style={{ alignItems: "start", marginTop: "var(--space-3)" }}
        >
          <div className="card">
            <BookingForm />
          </div>

          <div className="stack" style={{ gap: "var(--space-3)" }}>
            <div className="card">
              <h3>Prefer to call?</h3>
              <p className="text-muted" style={{ margin: "0.75rem 0" }}>
                We&apos;re happy to book you over the phone.
              </p>
              <a href={business.phoneHref} className="btn btn-primary" style={{ width: "100%" }}>
                Call {business.phoneDisplay}
              </a>
            </div>
            <div className="card">
              <h3>Hours</h3>
              <div style={{ marginTop: "0.75rem" }}>
                <HoursTable />
              </div>
            </div>
            <div className="card" style={{ background: "var(--color-secondary-soft)" }}>
              <span className="chip chip--sage">Good to know</span>
              <p className="text-muted" style={{ marginTop: "0.75rem", fontSize: "var(--text-sm)" }}>
                Walk-ins are welcome, but appointments guarantee your preferred time and
                technician — especially on weekends and for lash or nail-art services.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
