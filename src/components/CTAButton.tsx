"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

type CTAButtonProps = {
  href: string;
  children: ReactNode;
  className?: string;
  /** Use a plain anchor (e.g. tel: links) instead of next/link. */
  external?: boolean;
};

/**
 * Primary CTA with the magnetic-hover "pull" — reserved for primary actions
 * only. Desktop pointer devices only; respects reduced motion.
 */
export default function CTAButton({
  href,
  children,
  className = "",
  external = false,
}: CTAButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const hoverOK = window.matchMedia("(hover: hover)").matches;
    if (!motionOK || !hoverOK) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.3, ease: "power2.out" });
    };
    const onLeave = () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.4)" });
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      gsap.killTweensOf(el);
    };
  }, []);

  const classes = `btn btn-primary ${className}`;

  if (external) {
    return (
      <a ref={ref} href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <Link ref={ref} href={href} className={classes}>
      {children}
    </Link>
  );
}
