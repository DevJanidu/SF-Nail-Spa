"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { galleryAlt, type GalleryCategory } from "@/lib/data";

export default function Gallery({
  categories,
  filterable = true,
}: {
  categories: GalleryCategory[];
  filterable?: boolean;
}) {
  const [active, setActive] = useState<string>("all");
  const [lightbox, setLightbox] = useState<GalleryCategory | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const filters = ["all", ...categories.map((c) => c.slug)];
  const shown =
    active === "all" ? categories : categories.filter((c) => c.slug === active);

  useEffect(() => {
    if (!lightbox || !cardRef.current) return;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motionOK) {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, scale: 0.92 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" }
      );
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  return (
    <div>
      {filterable && (
        <div
          role="group"
          aria-label="Filter gallery by category"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.6rem",
            marginBottom: "var(--space-3)",
          }}
        >
          {filters.map((f) => {
            const label =
              f === "all" ? "All" : categories.find((c) => c.slug === f)?.title ?? f;
            const isActive = active === f;
            return (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`chip ${isActive ? "chip--clay" : ""}`}
                aria-pressed={isActive}
                style={{
                  cursor: "pointer",
                  border: isActive
                    ? "1px solid transparent"
                    : "1px solid var(--color-border)",
                  background: isActive ? undefined : "transparent",
                  color: isActive ? undefined : "var(--color-text-muted)",
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
      )}

      <div className="gallery-grid">
        {shown.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            className="gallery-tile"
            onClick={() => setLightbox(cat)}
            aria-label={`View ${cat.title} example`}
          >
            <span className="gallery-tile-art">
              <Image
                src={cat.img}
                alt={galleryAlt(cat.title)}
                fill
                sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
              />
            </span>
            <span className="gallery-tile-caption">{cat.title}</span>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${lightbox.title} preview`}
          onClick={() => setLightbox(null)}
        >
          <div
            ref={cardRef}
            className="lightbox-card"
            onClick={(e) => e.stopPropagation()}
            style={{ overflow: "hidden" }}
          >
            <Image
              src={lightbox.img}
              alt={galleryAlt(lightbox.title)}
              fill
              sizes="(max-width: 768px) 92vw, 560px"
              style={{ objectFit: "cover" }}
            />
            <button
              type="button"
              className="lightbox-close"
              aria-label="Close preview"
              onClick={() => setLightbox(null)}
              style={{ zIndex: 1 }}
            >
              ✕
            </button>
            <span
              className="lightbox-caption"
              style={{
                position: "relative",
                zIndex: 1,
                textShadow: "0 2px 12px rgba(0,0,0,0.6)",
              }}
            >
              {lightbox.title}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
