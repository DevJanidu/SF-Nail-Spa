"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { business } from "@/lib/data";
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
        .from(".hero-title", { y: 24, opacity: 0, duration: 0.7 }, "-=0.35")
        .from(".hero-subtitle", { y: 16, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(".hero-cta", { y: 12, opacity: 0, duration: 0.5 }, "-=0.35")
        .from(".hero-meta", { y: 12, opacity: 0, duration: 0.5 }, "-=0.35");
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section className="hero" ref={root}>
      <video
        className="hero-video-bg"
        poster="/video/hero.jpg"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      >
        <source src="/video/hero-mob.mp4" media="(max-width: 768px)" />
        <source src="/video/hero.mp4" />
      </video>
      <div className="hero-overlay" aria-hidden="true" />

      <div className="container hero-content">
        <p className="eyebrow hero-eyebrow">Outer Sunset · San Francisco</p>
        <h1 className="hero-title">
          Luxury Nail Care with Organic Beauty
          <Brushstroke className="brushstroke--center" />
        </h1>
        <p className="lead hero-subtitle">
          {business.slogan} A calm, fog-kissed retreat where clean, non-toxic products
          meet meticulous, unhurried craft.
        </p>
        <div className="hero-cta">
          <CTAButton href="/booking">Book Appointment</CTAButton>
          <a className="btn btn-secondary hero-btn-secondary" href="/services">
            Explore Services
          </a>
        </div>
        <div className="hero-meta">
          <span>
            Open today ·{" "}
            <a href={business.phoneHref}>{business.phoneDisplay}</a>
          </span>
          <span>
            <span className="chip chip--sage hero-badge">
              Organic · Non-Toxic · Cruelty-Free
            </span>
          </span>
        </div>
      </div>
    </section>
  );
}
