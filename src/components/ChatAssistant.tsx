"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { business } from "@/lib/data";

type Msg = { from: "bot" | "user"; text: string };

const QUICK_REPLIES = [
  "What are your hours?",
  "What services & pricing do you have?",
  "Where are you located?",
  "How do I book an appointment?",
] as const;

const FALLBACK_REPLY =
  "I'm having trouble connecting right now — please call us or try again in a moment.";

export default function ChatAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [
    {
      from: "bot",
      text: `Hi! Welcome to ${business.name}. How can I help you today?`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Animate the panel in, respecting reduced motion.
  useEffect(() => {
    if (!open || !panelRef.current) return;
    const motionOK = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (motionOK) {
      gsap.from(panelRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [open]);

  // Keep the message list scrolled to the newest message.
  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages, open, loading]);

  const send = async (raw: string) => {
    const text = raw.trim();
    if (!text || loading) return;

    const next: Msg[] = [...messages, { from: "user", text }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next.map((m) => ({
            role: m.from === "bot" ? "assistant" : "user",
            content: m.text,
          })),
        }),
      });
      const data = await res.json();
      setMessages((m) => [
        ...m,
        { from: "bot", text: res.ok ? data.reply : data.error || FALLBACK_REPLY },
      ]);
    } catch {
      setMessages((m) => [...m, { from: "bot", text: FALLBACK_REPLY }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat">
      {open && (
        <div
          ref={panelRef}
          className="chat-panel"
          role="dialog"
          aria-label={`${business.name} chat assistant`}
        >
          <div className="chat-header">
            <span className="chat-header-title">
              <span className="chat-dot" aria-hidden="true" />
              {business.name} Assistant
            </span>
            <button
              type="button"
              className="chat-close"
              aria-label="Close chat"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          <div className="chat-messages" ref={listRef}>
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble chat-bubble--${m.from}`}>
                <span className="chat-bubble-text">{m.text}</span>
              </div>
            ))}

            {loading && (
              <div className="chat-bubble chat-bubble--bot chat-bubble--typing" aria-live="polite">
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
                <span className="chat-typing-dot" />
              </div>
            )}

            {messages.length === 1 && (
              <div className="chat-quick">
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    type="button"
                    className="chat-chip"
                    onClick={() => send(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            className="chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about hours, services…"
              aria-label="Type your message"
              disabled={loading}
            />
            <button type="submit" aria-label="Send message" disabled={!input.trim() || loading}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <button
        type="button"
        className={`chat-launcher ${open ? "chat-launcher--open" : ""}`}
        aria-label={open ? "Close chat" : "Chat with us"}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        {open ? (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
