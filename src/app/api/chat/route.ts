import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";

// Front-desk chat assistant, backed by Groq. Answers only from
// salon-chatbot-knowledge.md (see that file for the full system prompt).
// GROQ_API_KEY is server-only — never expose it with a NEXT_PUBLIC_ prefix.

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.3-70b-versatile";

type ChatMessage = { role: "user" | "assistant"; content: string };

let cachedSystemPrompt: string | null = null;

async function getSystemPrompt() {
  if (cachedSystemPrompt) return cachedSystemPrompt;
  const filePath = path.join(process.cwd(), "salon-chatbot-knowledge.md");
  cachedSystemPrompt = await readFile(filePath, "utf-8");
  return cachedSystemPrompt;
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured yet. Please call us instead." },
      { status: 503 }
    );
  }

  let body: { messages?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const history = Array.isArray(body.messages) ? body.messages : [];
  const trimmed = history
    .filter(
      (m): m is ChatMessage =>
        !!m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-20); // cap history sent per request

  if (trimmed.length === 0) {
    return NextResponse.json({ error: "No message provided." }, { status: 400 });
  }

  const systemPrompt = await getSystemPrompt();

  const groqRes = await fetch(GROQ_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: MODEL,
      messages: [{ role: "system", content: systemPrompt }, ...trimmed],
      temperature: 0.4,
      max_completion_tokens: 1024,
      top_p: 1,
      stream: false,
    }),
  });

  if (!groqRes.ok) {
    console.error("[chat] Groq API error", groqRes.status, await groqRes.text());
    return NextResponse.json(
      { error: "I'm having trouble connecting right now — please try again in a moment." },
      { status: 502 }
    );
  }

  const data = await groqRes.json();
  const reply: string =
    data?.choices?.[0]?.message?.content?.trim() ||
    "Sorry, I didn't quite catch that — could you try asking again?";

  return NextResponse.json({ reply });
}
