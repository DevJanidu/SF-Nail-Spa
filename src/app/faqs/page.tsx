import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Accordion from "@/components/Accordion";
import CtaBanner from "@/components/CtaBanner";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "Frequently asked questions about SF Nail Spa — walk-ins, appointments, hard gel policy, products we use, gel removal, nail repair, and accessibility for elderly clients.",
  alternates: { canonical: "/faqs" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function FaqsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: "820px" }}>
          <SectionHeading eyebrow="FAQs" title="Questions, answered">
            Everything you might want to know before your visit. Still curious? Just give
            us a call.
          </SectionHeading>
          <Accordion items={faqs} />
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
