import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { business } from "@/lib/data";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${business.name} — how we collect, use, and protect information submitted through our website.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <section className="section">
      <div className="container prose">
        <SectionHeading eyebrow="Legal" title="Privacy Policy" brushstroke={false} />
        <p className="text-muted">Last updated: June 30, 2026</p>

        <p>
          {business.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your
          privacy. This policy explains what information we collect through our website and
          how we use it.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Information you provide:</strong> When you submit our booking or contact
            forms, we collect your name, phone number, email address, and any details you
            include (such as preferred service, date, time, or message).
          </li>
          <li>
            <strong>Usage data:</strong> We may collect standard analytics data (such as
            pages visited and device/browser type) via cookies and similar technologies to
            understand and improve site performance.
          </li>
        </ul>

        <h2>How we use your information</h2>
        <ul>
          <li>To respond to your booking requests and inquiries.</li>
          <li>To confirm and manage appointments.</li>
          <li>To improve our website, services, and customer experience.</li>
        </ul>

        <h2>Sharing</h2>
        <p>
          We do not sell your personal information. We only share it with service providers
          (for example, email or scheduling tools) as needed to operate our business, or
          where required by law.
        </p>

        <h2>Cookies</h2>
        <p>
          You can control cookies through your browser settings. Disabling cookies may
          affect some site functionality.
        </p>

        <h2>Your choices</h2>
        <p>
          To access, correct, or delete information you&apos;ve submitted, contact us at{" "}
          <a href={business.phoneHref}>{business.phoneDisplay}</a> or via our{" "}
          <a href="/contact">Contact page</a>.
        </p>

        <h2>Contact</h2>
        <p>
          {business.name}, {business.address.full}. Phone:{" "}
          <a href={business.phoneHref}>{business.phoneDisplay}</a>.
        </p>
      </div>
    </section>
  );
}
