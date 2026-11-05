import { Buffer } from "node:buffer";
import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { env } from "node:process";
import { ReplitConnectors } from "@replit/connectors-sdk";
import { bookingSchema } from "../src/lib/booking.schema";
import { saveBookingAndNotify, type ConnectorProxy } from "./booking-service";

const MAX_BODY_BYTES = 32_000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_REQUESTS = 12;
const requestCounts = new Map<string, { count: number; resetAt: number }>();
const connectors = new ReplitConnectors();
const proxy: ConnectorProxy = (connector, path, init) => connectors.proxy(connector, path, init);

function parseAllowedOrigins(): Set<string> {
  return new Set(
    (env["BOOKING_ALLOWED_ORIGINS"] ?? "")
      .split(",")
      .map((origin) => origin.trim())
      .filter(Boolean),
  );
}

function isAllowedOrigin(origin: string): boolean {
  const allowedOrigins = parseAllowedOrigins();
  if (allowedOrigins.has(origin)) return true;

  try {
    const url = new URL(origin);
    const host = url.hostname.toLowerCase();
    const local = host === "localhost" || host === "127.0.0.1";
    const replitPreview = host.endsWith(".replit.dev") || host.endsWith(".repl.co");
    const vercel = host === "vercel.app" || host.endsWith(".vercel.app");
    return url.protocol === "https:" ? replitPreview || vercel : local;
  } catch {
    return false;
  }
}

function sendJson(
  response: ServerResponse,
  statusCode: number,
  payload: Record<string, unknown>,
): void {
  response.statusCode = statusCode;
  response.setHeader("Content-Type", "application/json; charset=utf-8");
  response.end(JSON.stringify(payload));
}

function readJson(request: IncomingMessage): Promise<unknown> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    request.on("data", (chunk: Buffer | string) => {
      const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
      size += buffer.byteLength;
      if (size > MAX_BODY_BYTES) {
        reject(new Error("body_too_large"));
        request.destroy();
        return;
      }
      chunks.push(buffer);
    });
    request.on("end", () => {
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("invalid_json"));
      }
    });
    request.on("error", reject);
  });
}

function allowSubmission(request: IncomingMessage, response: ServerResponse): boolean {
  const now = Date.now();
  const forwardedFor = request.headers["x-forwarded-for"];
  const clientAddress =
    (typeof forwardedFor === "string" ? forwardedFor.split(",")[0]?.trim() : undefined) ||
    request.socket.remoteAddress ||
    "unknown";
  const current = requestCounts.get(clientAddress);

  if (!current || current.resetAt <= now) {
    requestCounts.set(clientAddress, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (current.count >= RATE_LIMIT_REQUESTS) {
    response.setHeader("Retry-After", String(Math.ceil((current.resetAt - now) / 1000)));
    sendJson(response, 429, { ok: false, message: "Too many requests. Please try again later." });
    return false;
  }
  current.count += 1;
  return true;
}

async function handleRequest(request: IncomingMessage, response: ServerResponse): Promise<void> {
  const origin = request.headers.origin;

  if (request.url === "/" && request.method === "GET") {
    sendJson(response, 200, { ok: true, service: "Glam by Dia booking API" });
    return;
  }

  if (origin) {
    if (!isAllowedOrigin(origin)) {
      sendJson(response, 403, {
        ok: false,
        message: "This website is not allowed to submit requests.",
      });
      return;
    }
    response.setHeader("Access-Control-Allow-Origin", origin);
    response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Content-Type");
    response.setHeader("Vary", "Origin");
  } else if (env["NODE_ENV"] === "production" && request.method !== "OPTIONS") {
    sendJson(response, 403, { ok: false, message: "A website origin is required." });
    return;
  }

  if (request.method === "OPTIONS") {
    response.statusCode = 204;
    response.end();
    return;
  }
  if (request.url !== "/api/booking" || request.method !== "POST") {
    sendJson(response, 404, { ok: false, message: "Not found." });
    return;
  }
  if (!allowSubmission(request, response)) return;
  if (!request.headers["content-type"]?.includes("application/json")) {
    sendJson(response, 415, { ok: false, message: "Please send the form as JSON." });
    return;
  }

  let raw: unknown;
  try {
    raw = await readJson(request);
  } catch (error) {
    const status = error instanceof Error && error.message === "body_too_large" ? 413 : 400;
    sendJson(response, status, { ok: false, message: "Please check the form and try again." });
    return;
  }

  const parsed = bookingSchema.safeParse(raw);
  if (!parsed.success || !parsed.data.agreedTerms) {
    sendJson(response, 400, {
      ok: false,
      message: "Please check your details and agree to the data notice before sending.",
    });
    return;
  }
  if (parsed.data.website?.trim()) {
    sendJson(response, 200, { ok: true, emailSent: false });
    return;
  }

  try {
    const result = await saveBookingAndNotify(parsed.data, proxy);
    if (!result.ok) {
      console.error("Booking request could not be saved to Google Sheets.");
      sendJson(response, 503, {
        ok: false,
        message: "We couldn't save your request right now. Please call Dia or try again shortly.",
      });
      return;
    }
    if (!result.emailSent) {
      console.error("Booking saved; one or more Gmail notifications failed.");
    }
    sendJson(response, 200, {
      ok: true,
      emailSent: result.emailSent,
      message: result.emailSent
        ? "Your request was saved and email notifications were sent."
        : "Your request was saved, but an email notification could not be sent.",
    });
  } catch {
    console.error("Booking provider request failed.");
    sendJson(response, 503, {
      ok: false,
      message: "We couldn't process your request right now. Please call Dia or try again shortly.",
    });
  }
}

const port = Number(env["PORT"] || 8000);
createServer((request, response) => {
  void handleRequest(request, response).catch(() => {
    if (!response.headersSent) {
      sendJson(response, 500, { ok: false, message: "Something went wrong. Please try again." });
    }
  });
}).listen(port, "0.0.0.0", () => {
  console.log(`Glam by Dia booking API listening on port ${port}`);
});
