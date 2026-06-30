import Link from "next/link";
import { business } from "@/lib/data";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container text-center" style={{ paddingBlock: "var(--space-5)" }}>
        <p className="eyebrow">404</p>
        <h1 style={{ marginTop: "0.5rem" }}>This page took a fog day</h1>
        <p className="lead" style={{ margin: "1rem auto 2rem", maxWidth: "48ch" }}>
          We couldn&apos;t find the page you were looking for. Let&apos;s get you back to
          something beautiful.
        </p>
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
          <a href={business.phoneHref} className="btn btn-secondary">
            Call {business.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
