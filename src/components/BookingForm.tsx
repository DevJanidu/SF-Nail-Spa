"use client";

import { useState } from "react";
import { serviceCategories } from "@/lib/data";
import Select from "@/components/ui/Select";
import DatePicker from "@/components/ui/DatePicker";
import TimePicker from "@/components/ui/TimePicker";

type Status = "idle" | "submitting" | "success" | "error";

function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().slice(0, 10);
}

const serviceOptions = serviceCategories.map((c) => ({ value: c.title, label: c.title }));

export default function BookingForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      setMessage(json.message);
      form.reset();
      setService("");
      setDate("");
      setTime("");
    } catch (err) {
      setStatus("error");
      setMessage(
        err instanceof Error ? err.message : "Could not send your request."
      );
    }
  }

  if (status === "success") {
    return (
      <div className="form-status form-status--success" role="status">
        <strong>Request received! </strong>
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="stack" style={{ gap: "var(--space-3)" }} noValidate>
      {/* Honeypot — bots fill this; humans never see it. */}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid-auto" style={{ gap: "var(--space-3)" }}>
        <div className="field">
          <label htmlFor="name">Full name *</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="field">
          <label htmlFor="phone">Phone *</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" />
        </div>
      </div>

      <div className="grid-auto" style={{ gap: "var(--space-3)" }}>
        <div className="field">
          <label htmlFor="email">Email *</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="field">
          <label htmlFor="service">Preferred service *</label>
          <Select
            id="service"
            name="service"
            placeholder="Select a service…"
            options={serviceOptions}
            required
            value={service}
            onValueChange={setService}
          />
        </div>
      </div>

      <div className="grid-auto" style={{ gap: "var(--space-3)" }}>
        <div className="field">
          <label htmlFor="date">Preferred date</label>
          <DatePicker id="date" name="date" value={date} onChange={setDate} min={todayISO()} />
        </div>
        <div className="field">
          <label htmlFor="time">Preferred time</label>
          <TimePicker id="time" name="time" value={time} onChange={setTime} />
        </div>
      </div>

      <div className="field">
        <label htmlFor="notes">Notes (optional)</label>
        <textarea
          id="notes"
          name="notes"
          placeholder="Anything we should know — inspiration, accessibility needs, etc."
        />
      </div>

      {status === "error" && (
        <div className="form-status form-status--error" role="alert">
          {message}
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Request Appointment"}
      </button>
      <p className="form-note">
        This sends a booking <em>request</em>. We&apos;ll confirm your time by phone or
        email. Walk-ins are always welcome too.
      </p>
    </form>
  );
}
