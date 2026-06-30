"use client";

import { useLayoutEffect, useRef, type ElementType, type ReactNode } from "react";
import type React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  as?: ElementType;
  /** Stagger direct children (cards/tiles) instead of the wrapper itself. */
  stagger?: boolean;
};

/**
 * Calm, spa-like scroll reveal: fade-up only, slight stagger.
 * Uses useLayoutEffect so start-state is applied before paint (no flash),
 * and leaves content fully visible if motion is reduced or JS is unavailable.
 */
export default function Reveal({
  children,
  className = "",
  style,
  as,
  stagger = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const Tag = (as ?? "div") as ElementType;

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOK) return;

    const ctx = gsap.context(() => {
      const targets = stagger ? gsap.utils.toArray<HTMLElement>(el.children) : el;
      gsap.from(targets, {
        y: 32,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        stagger: stagger ? 0.12 : 0,
        scrollTrigger: { trigger: el, start: "top 80%" },
      });
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
