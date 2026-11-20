import { NextResponse } from "next/server";

type ContactPayload = {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  service?: unknown;
  message?: unknown;
};

function text(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let body: ContactPayload;

  try {
    body = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = text(body.name);
  const phone = text(body.phone);
  const email = text(body.email);
  const service = text(body.service);
  const message = text(body.message);
  const valid =
    name.length >= 2 &&
    /^[0-9+()\-\s]{7,}$/.test(phone) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    service.length > 0 &&
    message.length >= 10;

  if (!valid) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // TODO: send this enquiry by email.
  console.log("Contact enquiry", { name, phone, email, service, message });

  return NextResponse.json({ ok: true });
}
