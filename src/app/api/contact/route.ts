import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "@/lib/firebase-admin";
import { encryptContact, hashContactEmail } from "@/lib/contact-encryption";

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
    name.length >= 2 && name.length <= 150 &&
    /^[0-9+()\-\s]{7,}$/.test(phone) &&
    email.length <= 256 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    service.length > 0 && service.length <= 150 &&
    message.length >= 10 && message.length <= 5000;

  if (!valid) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    const encrypted = encryptContact(JSON.stringify({ name, phone, email, service, message }));
    await adminDb.collection("contact_submissions").add({
      ...encrypted,
      emailHash: hashContactEmail(email),
      createdAt: FieldValue.serverTimestamp(),
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to save contact submission:", error);
    return NextResponse.json(
      { ok: false, error: "We could not send your message right now. Please try again." },
      { status: 500 }
    );
  }
}
