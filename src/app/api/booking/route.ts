import { NextResponse } from "next/server";

// Booking request handler (SRS FR-8.x). Validates input, rejects spam via a
// honeypot, and would notify salon staff. Wire EMAIL/SMS by reading the
// submission below and calling your provider (SendGrid, Twilio, etc.).
export async function POST(request: Request) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real users leave this empty.
  if (body.company) {
    return NextResponse.json({ message: "Request received." });
  }

  const name = body.name?.trim();
  const phone = body.phone?.trim();
  const email = body.email?.trim();
  const service = body.service?.trim();

  if (!name || !phone || !email || !service) {
    return NextResponse.json(
      { error: "Please fill in your name, phone, email, and a service." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  // TODO(integration): notify staff (email/SMS) and/or push to scheduler.
  console.info("[booking] New appointment request", {
    name,
    phone,
    email,
    service,
    date: body.date || "—",
    time: body.time || "—",
    notes: body.notes || "",
  });

  return NextResponse.json({
    message:
      "We'll reach out shortly to confirm your appointment. For anything urgent, call us at (415) 564-5581.",
  });
}
