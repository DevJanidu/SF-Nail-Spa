"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";

// Half-hour slots across a typical salon day.
const SLOTS = Array.from({ length: 22 }, (_, i) => {
  const totalMinutes = 9 * 60 + i * 30; // starts 9:00 AM
  const h24 = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  const period = h24 >= 12 ? "PM" : "AM";
  const h12 = h24 % 12 === 0 ? 12 : h24 % 12;
  return {
    value: `${String(h24).padStart(2, "0")}:${String(m).padStart(2, "0")}`,
    label: `${h12}:${String(m).padStart(2, "0")} ${period}`,
  };
});

function formatDisplay(value: string) {
  return SLOTS.find((s) => s.value === value)?.label ?? value;
}

export default function TimePicker({
  name,
  id,
  value,
  onChange,
}: {
  name: string;
  id?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <input type="hidden" name={name} value={value} />
      <Popover.Trigger asChild>
        <button type="button" id={id} className="ui-field-trigger">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ui-field-icon" aria-hidden="true">
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 3" />
          </svg>
          <span className={value ? "" : "ui-field-placeholder"}>
            {value ? formatDisplay(value) : "Select a time…"}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="ui-time-list" sideOffset={6} align="start">
          {SLOTS.map((slot) => (
            <button
              type="button"
              key={slot.value}
              onClick={() => {
                onChange(slot.value);
                setOpen(false);
              }}
              className={`ui-time-item${value === slot.value ? " ui-time-item--selected" : ""}`}
            >
              {slot.label}
            </button>
          ))}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
