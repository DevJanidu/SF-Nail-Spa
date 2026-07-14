"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function toISO(d: Date) {
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
}

function formatDisplay(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return `${MONTHS[m - 1].slice(0, 3)} ${d}, ${y}`;
}

export default function DatePicker({
  name,
  id,
  value,
  onChange,
  min,
}: {
  name: string;
  id?: string;
  value: string;
  onChange: (iso: string) => void;
  min?: string;
}) {
  const today = new Date();
  const initial = value ? new Date(value + "T00:00:00") : today;
  const [open, setOpen] = useState(false);
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const minDate = min ? new Date(min + "T00:00:00") : null;
  const firstOfMonth = new Date(viewYear, viewMonth, 1);
  const startWeekday = firstOfMonth.getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const cells: (number | null)[] = [
    ...Array(startWeekday).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  const changeMonth = (delta: number) => {
    let m = viewMonth + delta;
    let y = viewYear;
    if (m < 0) { m = 11; y -= 1; }
    if (m > 11) { m = 0; y += 1; }
    setViewMonth(m);
    setViewYear(y);
  };

  const pick = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    onChange(toISO(d));
    setOpen(false);
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <input type="hidden" name={name} value={value} />
      <Popover.Trigger asChild>
        <button type="button" id={id} className="ui-field-trigger">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ui-field-icon" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M8 3v4M16 3v4M3 10h18" />
          </svg>
          <span className={value ? "" : "ui-field-placeholder"}>
            {value ? formatDisplay(value) : "mm/dd/yyyy"}
          </span>
        </button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content className="ui-calendar" sideOffset={6} align="start">
          <div className="ui-calendar-header">
            <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month" className="ui-calendar-nav">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <span className="ui-calendar-title">{MONTHS[viewMonth]} {viewYear}</span>
            <button type="button" onClick={() => changeMonth(1)} aria-label="Next month" className="ui-calendar-nav">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
          <div className="ui-calendar-weekdays">
            {WEEKDAYS.map((w, i) => (
              <span key={i}>{w}</span>
            ))}
          </div>
          <div className="ui-calendar-grid">
            {cells.map((day, i) => {
              if (day === null) return <span key={i} />;
              const cellDate = new Date(viewYear, viewMonth, day);
              const isPast = minDate ? cellDate < minDate : false;
              const isToday = toISO(cellDate) === toISO(today);
              const isSelected = value === toISO(cellDate);
              return (
                <button
                  type="button"
                  key={i}
                  disabled={isPast}
                  onClick={() => pick(day)}
                  className={`ui-calendar-day${isSelected ? " ui-calendar-day--selected" : ""}${isToday && !isSelected ? " ui-calendar-day--today" : ""}`}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
