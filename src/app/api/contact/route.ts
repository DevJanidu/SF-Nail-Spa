import { NextResponse } from "next/server";

// General contact/inquiry handler (SRS FR-9.5).
export async function POST(request: Request) {
  let body: Record<string, string>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (body.company) {
    return NextResponse.json({ message: "Message received." });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in your name, email, and message." },
      { status: 400 }
    );
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  // TODO(integration): forward to the salon inbox via your email provider.
  console.info("[contact] New inquiry", { name, email, message });

  return NextResponse.json({
    message: "Thanks for reaching out — we'll get back to you within one business day.",
  });
}
