import Link from "next/link";
import { business, hours, navLinks } from "@/lib/data";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link href="/" className="brand" aria-label={`${business.name} home`}>
              <span className="brand-mark" aria-hidden="true">
                ✦
              </span>
              <span className="brand-name">{business.name}</span>
            </Link>
            <p className="text-muted" style={{ marginTop: "1rem", maxWidth: "32ch" }}>
              {business.slogan}
            </p>
            <p className="text-muted" style={{ marginTop: "1rem", fontSize: "var(--text-sm)" }}>
              {business.address.full}
              <br />
              <a href={business.phoneHref} style={{ fontWeight: 600 }}>
                {business.phoneDisplay}
              </a>
            </p>
          </div>

          <div>
            <h4>Explore</h4>
            <ul className="footer-links">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href}>{l.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/booking">Book Appointment</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4>Hours</h4>
            <ul className="footer-links">
              {hours.map((h) => (
                <li key={h.day}>
                  <span className="text-muted" style={{ fontSize: "var(--text-sm)" }}>
                    {h.day}: {h.hours}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {year} {business.name}. All rights reserved.
          </span>
          <span style={{ display: "flex", gap: "1rem" }}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
