"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Floating scroll-to-top button, shown after 125vh of scroll on any page. */
export default function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: () => `${window.innerHeight * 1.25}px top`,
      onEnter: () => setVisible(true),
      onLeaveBack: () => setVisible(false),
    });
    return () => st.kill();
  }, []);

  const scrollToTop = () => {
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: motionOK ? "smooth" : "auto" });
  };

  return (
    <button
      type="button"
      className={`scroll-top ${visible ? "scroll-top--visible" : ""}`}
      onClick={scrollToTop}
      aria-label="Scroll to top"
      tabIndex={visible ? 0 : -1}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
