"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Signature hand-drawn brushstroke that "paints itself" on scroll.
 * Animates stroke-dashoffset (no paid DrawSVG plugin).
 */
export default function Brushstroke({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOK) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: { trigger: path, start: "top 85%" },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <svg
      className={`brushstroke ${className}`}
      viewBox="0 0 200 20"
      aria-hidden="true"
      focusable="false"
    >
      <path ref={pathRef} d="M2 14 Q 50 2, 100 12 T 198 8" />
    </svg>
  );
}
