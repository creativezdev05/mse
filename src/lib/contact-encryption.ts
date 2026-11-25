import { createCipheriv, createHash, randomBytes } from "node:crypto";

const ALGORITHM = "aes-256-gcm";

export function hashContactEmail(email: string) {
  return createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
}

export function encryptContact(data: string) {
  const keyHex = process.env.CONTACT_ENCRYPTION_KEY;
  if (!keyHex || !/^[\da-f]{64}$/i.test(keyHex)) {
    throw new Error("CONTACT_ENCRYPTION_KEY must be a 32-byte hex key.");
  }

  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, Buffer.from(keyHex, "hex"), iv);
  const ciphertext = Buffer.concat([cipher.update(data, "utf8"), cipher.final()]);

  return {
    ciphertext: ciphertext.toString("base64"),
    iv: iv.toString("base64"),
    authTag: cipher.getAuthTag().toString("base64"),
  };
}
