"use client";

import { useRef, useState, useId } from "react";
import { gsap } from "gsap";
import type { Faq } from "@/lib/data";

function AccordionItem({ item }: { item: Faq }) {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const baseId = useId();

  const toggle = () => {
    const panel = panelRef.current;
    if (!panel) {
      setOpen((o) => !o);
      return;
    }
    const next = !open;
    setOpen(next);
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOK) {
      gsap.set(panel, { height: next ? "auto" : 0 });
      return;
    }
    gsap.to(panel, {
      height: next ? panel.scrollHeight : 0,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        if (next) gsap.set(panel, { height: "auto" });
      },
    });
  };

  return (
    <div className="accordion-item">
      <button
        type="button"
        className="accordion-trigger"
        aria-expanded={open}
        aria-controls={`${baseId}-panel`}
        id={`${baseId}-trigger`}
        onClick={toggle}
      >
        <span>{item.q}</span>
        <span
          className="accordion-icon"
          aria-hidden="true"
          style={{ transform: open ? "rotate(45deg)" : "rotate(0deg)" }}
        >
          +
        </span>
      </button>
      <div
        ref={panelRef}
        className="accordion-panel"
        id={`${baseId}-panel`}
        role="region"
        aria-labelledby={`${baseId}-trigger`}
      >
        <div className="accordion-panel-inner">{item.a}</div>
      </div>
    </div>
  );
}

export default function Accordion({ items }: { items: Faq[] }) {
  return (
    <div>
      {items.map((item) => (
        <AccordionItem key={item.q} item={item} />
      ))}
    </div>
  );
}
