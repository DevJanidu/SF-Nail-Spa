import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import { business } from "@/lib/data";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: `Terms & Conditions for using the ${business.name} website and booking services.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <section className="section">
      <div className="container prose">
        <SectionHeading eyebrow="Legal" title="Terms & Conditions" brushstroke={false} />
        <p className="text-muted">Last updated: June 30, 2026</p>

        <p>
          These Terms &amp; Conditions govern your use of the {business.name} website and
          our online appointment-request feature. By using this site, you agree to these
          terms.
        </p>

        <h2>Use of the website</h2>
        <p>
          You agree to use this website for lawful purposes only and not to misuse, disrupt,
          or attempt to gain unauthorized access to it.
        </p>

        <h2>Appointment requests</h2>
        <p>
          Submitting the booking form sends a <em>request</em> only; an appointment is not
          confirmed until we contact you by phone or email. Walk-ins are welcome subject to
          availability.
        </p>

        <h2>Cancellation policy</h2>
        <p>
          We kindly ask that you give us as much notice as possible if you need to cancel or
          reschedule. Our full cancellation and no-show policy is confirmed at the time of
          booking. <em>(Detailed cancellation terms pending final confirmation.)</em>
        </p>

        <h2>Service descriptions &amp; pricing</h2>
        <p>
          We aim to keep service descriptions and pricing accurate. Prices are starting
          points and may vary based on nail length, condition, and design complexity. Final
          pricing is confirmed in-salon.
        </p>

        <h2>Intellectual property</h2>
        <p>
          All content on this site, including text, images, and branding, is the property of{" "}
          {business.name} and may not be reproduced without permission.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          This website is provided &quot;as is.&quot; We are not liable for any indirect or
          incidental damages arising from its use.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about these terms? Reach us at{" "}
          <a href={business.phoneHref}>{business.phoneDisplay}</a> or via our{" "}
          <a href="/contact">Contact page</a>.
        </p>
      </div>
    </section>
  );
}
