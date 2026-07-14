import type { Metadata } from "next";
import SectionHeading from "@/components/SectionHeading";
import Gallery from "@/components/Gallery";
import CtaBanner from "@/components/CtaBanner";
import { galleryCategories } from "@/lib/data";

export const metadata: Metadata = {
  title: "Nail Art Gallery",
  description:
    "Browse Vain's nail art gallery — cat eye, chrome, French, gel, hand-painted nail art, eyelash extensions, and before & after transformations in San Francisco's Outer Sunset.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <section className="section">
        <div className="container">
          <SectionHeading eyebrow="Nail Art Gallery" title="Our work, by category">
            Filter by category to see the styles we love — from subtle French to bold
            chrome and cat eye. Tap any tile for a closer look.
          </SectionHeading>
          <Gallery categories={galleryCategories} filterable />
          <p className="text-muted" style={{ marginTop: "var(--space-3)", fontSize: "var(--text-sm)" }}>
            Photography is being finalized — these category swatches are placeholders until
            our latest client galleries are published.
          </p>
        </div>
      </section>

      <CtaBanner
        title="Saw something you love?"
        text="Bring your inspiration in — we'll recreate it or design something new just for you."
      />
    </>
  );
}
