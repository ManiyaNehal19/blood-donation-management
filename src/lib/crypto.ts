import crypto from "crypto";

const ALGORITHM = "aes-256-cbc";

// MUST be 32-byte key and 16-byte IV (in hex)
const SECRET_KEY = Buffer.from(process.env.CNIC_SECRET_KEY!, "hex");
const IV = Buffer.from(process.env.CNIC_IV!, "hex");

export function encrypt(text: string): string {
  const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, IV);
  let encrypted = cipher.update(text, "utf8", "base64");
  encrypted += cipher.final("base64");

  return encrypted.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}

export function decrypt(text: string): string {
  text = text.replace(/-/g, "+").replace(/_/g, "/");
  while (text.length % 4) text += "=";

  const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, IV);
  let decrypted = decipher.update(text, "base64", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
