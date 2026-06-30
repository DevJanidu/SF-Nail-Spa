import { business } from "@/lib/data";
import CTAButton from "./CTAButton";

export default function CtaBanner({
  title = "Ready for your next appointment?",
  text = "Book online in under a minute, or call us — walk-ins are always welcome.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section section--alt">
      <div className="container text-center">
        <h2>{title}</h2>
        <p className="lead" style={{ margin: "1rem auto 1.75rem", maxWidth: "52ch" }}>
          {text}
        </p>
        <div
          style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <CTAButton href="/booking">Book Appointment</CTAButton>
          <a className="btn btn-secondary" href={business.phoneHref}>
            Call {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
