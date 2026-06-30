"use client";

import { useEffect, useState } from "react";
import { gsap } from "gsap";

/**
 * Pill theme toggle with the signature "polish wipe" — a brush of accent
 * color sweeping across the screen as light/dark swap. Persists to
 * localStorage; the no-flash boot script in the layout reads it on load.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Sync React state to the theme the no-flash boot script already applied.
    const current =
      (document.documentElement.dataset.theme as "light" | "dark") || "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTheme(current);
  }, []);

  const apply = (next: "light" | "dark") => {
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {
      /* ignore storage failures (private mode, etc.) */
    }
    setTheme(next);
  };

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    const wipe = document.getElementById("polish-wipe");
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!wipe || !motionOK) {
      apply(next);
      return;
    }

    gsap
      .timeline()
      .to(wipe, {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        duration: 0.45,
        ease: "power2.inOut",
      })
      .add(() => apply(next))
      .to(wipe, {
        clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
        duration: 0.45,
        ease: "power2.inOut",
      })
      .set(wipe, { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)" });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="theme-toggle"
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      aria-pressed={theme === "dark"}
    >
      <span className="toggle-track">
        <span className="toggle-thumb" />
      </span>
    </button>
  );
}
