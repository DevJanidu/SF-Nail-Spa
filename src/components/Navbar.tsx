"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { business, navLinks } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Navbar shrink/solidify after 60px scroll.
  useEffect(() => {
    const st = ScrollTrigger.create({
      start: "top -60",
      onUpdate: (self) => setScrolled(self.scroll() > 60),
    });
    return () => st.kill();
  }, []);

  // Close the mobile menu on route change.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  // Lock scroll + stagger links in when the overlay menu opens.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open && menuRef.current) {
      const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (motionOK) {
        gsap.from(menuRef.current.querySelectorAll(".mobile-link"), {
          y: 24,
          opacity: 0,
          duration: 0.4,
          stagger: 0.07,
          ease: "power2.out",
        });
      }
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar-inner">
        <Link href="/" className="brand" aria-label={`${business.name} home`}>
          <span className="brand-mark" aria-hidden="true">
            ✦
          </span>
          <span className="brand-name">{business.name}</span>
        </Link>

        <nav className="nav-desktop" aria-label="Primary">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-link ${pathname === link.href ? "nav-link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/booking" className="btn btn-primary nav-book">
            Book Appointment
          </Link>
          <button
            type="button"
            className="nav-burger"
            aria-label="Open menu"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile full-screen overlay */}
      <div
        ref={menuRef}
        className={`mobile-menu ${open ? "mobile-menu--open" : ""}`}
        aria-hidden={!open}
      >
        <button
          type="button"
          className="mobile-close"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          ✕
        </button>
        <nav className="mobile-nav" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`mobile-link ${pathname === link.href ? "nav-link--active" : ""}`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/booking" className="btn btn-primary mobile-link">
            Book Appointment
          </Link>
        </nav>
      </div>
    </header>
  );
}
