"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      setStatus("success");
      setMessage(json.message);
      form.reset();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Could not send your message.");
    }
  }

  if (status === "success") {
    return (
      <div className="form-status form-status--success" role="status">
        <strong>Thank you! </strong>
        {message}
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="stack" style={{ gap: "var(--space-3)" }} noValidate>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="c-company">Company</label>
        <input id="c-company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="field">
        <label htmlFor="c-name">Name *</label>
        <input id="c-name" name="name" type="text" required autoComplete="name" />
      </div>
      <div className="field">
        <label htmlFor="c-email">Email *</label>
        <input id="c-email" name="email" type="email" required autoComplete="email" />
      </div>
      <div className="field">
        <label htmlFor="c-message">Message *</label>
        <textarea id="c-message" name="message" required />
      </div>

      {status === "error" && (
        <div className="form-status form-status--error" role="alert">
          {message}
        </div>
      )}

      <button type="submit" className="btn btn-primary" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send Message"}
      </button>
    </form>
  );
}
