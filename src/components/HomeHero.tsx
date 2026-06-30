"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { business, photos } from "@/lib/data";
import CTAButton from "./CTAButton";
import Brushstroke from "./Brushstroke";

export default function HomeHero() {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOK) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-eyebrow", { y: 16, opacity: 0, duration: 0.5 })
        .from(".hero-title", { y: 24, opacity: 0, duration: 0.7 }, "-=0.3")
        .from(".hero-subtitle", { y: 16, opacity: 0, duration: 0.6 }, "-=0.4")
        .from(".hero-cta", { y: 12, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-meta", { y: 12, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(".hero-image", { scale: 1.06, opacity: 0, duration: 1 }, "-=0.6");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root}>
      <div className="container hero-grid">
        <div>
          <p className="eyebrow hero-eyebrow">Outer Sunset · San Francisco</p>
          <h1 className="hero-title">
            Luxury Nail Care with Organic Beauty
            <Brushstroke />
          </h1>
          <p className="lead hero-subtitle" style={{ marginTop: "1rem" }}>
            {business.slogan} A calm, fog-kissed retreat where clean, non-toxic products
            meet meticulous, unhurried craft.
          </p>
          <div className="hero-cta">
            <CTAButton href="/booking">Book Appointment</CTAButton>
            <a className="btn btn-secondary" href="/services">
              Explore Services
            </a>
          </div>
          <div className="hero-meta">
            <span>
              Open today ·{" "}
              <a href={business.phoneHref}>{business.phoneDisplay}</a>
            </span>
            <span>
              <span className="chip chip--sage">Organic · Non-Toxic · Cruelty-Free</span>
            </span>
          </div>
        </div>

        <div className="hero-image">
          <Image
            src={photos.hero}
            alt={photos.heroAlt}
            fill
            sizes="(max-width: 860px) 100vw, 48vw"
            style={{ objectFit: "cover", borderRadius: "var(--radius-lg)" }}
            priority
          />
          <span
            className="hero-image-caption"
            style={{ position: "relative", zIndex: 1 }}
          >
            ✦ Hand-finished, every time
          </span>
        </div>
      </div>
    </section>
  );
}
