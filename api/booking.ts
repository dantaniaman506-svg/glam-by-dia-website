import type { IncomingMessage } from "node:http";

import { bookingSchema } from "../src/lib/booking.schema";
import { SITE } from "../src/lib/site";

type ApiRequest = IncomingMessage & { body?: unknown };
type ApiResponse = {
  status(code: number): { json(payload: unknown): void };
};

type EmailMessage = {
  from: string;
  to: string;
  subject: string;
  reply_to?: string;
  html: string;
  text: string;
};

const FORM_LABELS = {
  beauty: "Bridal Makeup & Hair",
  henna: "Henna / Mehndi",
  class: "Self Makeup Class",
  message: "Contact Enquiry",
} as const;

function escapeHtml(value: string | undefined): string {
  return (value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function textValue(value: string | undefined): string {
  return value?.trim() || "Not provided";
}

function emailRows(rows: Array<[string, string | undefined]>): string {
  return rows
    .map(
      ([label, value]) =>
        `<tr><th style="padding:12px 14px;border-bottom:1px solid #f0dfe4;text-align:left;color:#76515e;font-weight:500">${escapeHtml(label)}</th><td style="padding:12px 14px;border-bottom:1px solid #f0dfe4;color:#49353e">${escapeHtml(textValue(value))}</td></tr>`,
    )
    .join("");
}

function emailShell(title: string, content: string): string {
  return `<!doctype html><html><body style="margin:0;background:#fbf4f5;font-family:Arial,sans-serif;color:#49353e"><div style="max-width:640px;margin:32px auto;padding:28px 18px"><div style="background:#fff;border:1px solid #f1dfe5;border-radius:22px;padding:30px 24px"><p style="margin:0 0 10px;color:#a65371;font-size:12px;letter-spacing:3px;text-transform:uppercase">Glam by Dia</p><h1 style="margin:0 0 22px;color:#573847;font-family:Georgia,serif;font-size:28px;font-weight:500">${title}</h1>${content}<p style="margin:28px 0 0;color:#886e78;font-size:13px;line-height:1.7">Glam by Dia · Clayton South, Melbourne<br/><a href="tel:+61478666466" style="color:#a65371">0478 666 466</a> · <a href="https://www.instagram.com/glam_bydia" style="color:#a65371">@glam_bydia</a></p></div></div></body></html>`;
}

async function sendEmail(email: EmailMessage): Promise<void> {
  const apiKey = process.env["RESEND_API_KEY"];
  let response: Response;

  if (apiKey) {
    response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(email),
    });
  } else {
    const { ReplitConnectors } = await import("@replit/connectors-sdk");
    const connectors = new ReplitConnectors();
    response = await connectors.proxy("resend", "/emails", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(email),
    });
  }

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Resend returned ${response.status}: ${detail}`);
  }
}

async function readBody(request: ApiRequest): Promise<unknown> {
  if (request.body !== undefined) return request.body;
  const chunks: Buffer[] = [];
  for await (const chunk of request) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return JSON.parse(Buffer.concat(chunks).toString("utf8"));
}

export default async function bookingHandler(request: ApiRequest, response: ApiResponse) {
  if (request.method !== "POST") {
    response.status(405).json({ ok: false, message: "Method not allowed." });
    return;
  }

  let parsed;
  try {
    parsed = bookingSchema.safeParse(await readBody(request));
  } catch {
    response.status(400).json({ ok: false, message: "Please send a valid request." });
    return;
  }

  if (!parsed.success) {
    response.status(400).json({ ok: false, message: "Please check your details and try again." });
    return;
  }

  const data = parsed.data;
  try {
    const { supabaseAdmin } = await import("../src/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("booking_requests").insert({
      form_type: data.formType,
      customer_type: data.customerType ?? null,
      service: data.service ?? null,
      preferred_date: data.preferredDate || null,
      preferred_time: data.preferredTime ?? null,
      location_preference: data.locationPreference ?? null,
      location_address: data.locationAddress ?? null,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      contact_method: data.contactMethod ?? null,
      has_skin_conditions: data.hasSkinConditions ?? null,
      skin_details: data.skinDetails ?? null,
      notes: data.notes ?? null,
      agreed_terms: data.agreedTerms ?? null,
      wants_promotions: data.wantsPromotions ?? null,
      skills_requested: data.skillsRequested ?? null,
    });

    if (error) {
      console.error("booking_requests insert failed:", error.message);
      response.status(500).json({
        ok: false,
        message: "We couldn't save your request. Please try again or call us directly.",
      });
      return;
    }
  } catch (error) {
    console.error("Booking database connection failed:", error);
    response.status(500).json({
      ok: false,
      message: "We couldn't save your request. Please try again or call us directly.",
    });
    return;
  }

  const serviceLabel = textValue(data.service);
  const formLabel = FORM_LABELS[data.formType];
  const dateLabel = textValue(data.preferredDate);
  const safeNameForSubject = data.fullName.replace(/[\r\n]+/g, " ").trim();
  const from =
    process.env["RESEND_FROM_EMAIL"] ?? "Glam by Dia <onboarding@resend.dev>";
  const location =
    data.locationPreference === "Mobile"
      ? `Mobile at ${textValue(data.locationAddress)}`
      : data.locationPreference === "Studio"
        ? "Studio in Clayton South"
        : textValue(data.locationPreference);
  const ownerRows: Array<[string, string | undefined]> = [
    ["Customer name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Preferred contact method", data.contactMethod],
    ["Form type", formLabel],
    ["Service selected", data.service],
    ["Requested date", data.preferredDate],
    ["Requested time", data.preferredTime],
    ["Location preference", location],
    ["Skin allergies / conditions", data.hasSkinConditions ? data.skinDetails || "Yes" : data.hasSkinConditions === false ? "No" : "Not answered"],
    ["Special notes / requests", [data.notes, data.skillsRequested].filter(Boolean).join("\n") || undefined],
  ];
  const ownerHtml = emailShell(
    "A new request has arrived",
    `<p style="line-height:1.7">A new ${escapeHtml(formLabel.toLowerCase())} request was submitted through your website.</p><table style="width:100%;border-collapse:collapse;font-size:14px">${emailRows(ownerRows)}</table>`,
  );
  const isMessage = data.formType === "message";
  const customerHtml = emailShell(
    isMessage ? "Thank you for reaching out" : "Thank you for choosing Glam by Dia",
    `<p style="font-size:15px;line-height:1.8">Dear ${escapeHtml(data.fullName)},</p><p style="font-size:15px;line-height:1.8">Thank you for ${isMessage ? "getting in touch" : "choosing Glam by Dia"}. We have received your ${isMessage ? "message" : "booking request"} for <strong>${escapeHtml(serviceLabel)}</strong>${data.preferredDate ? ` on <strong>${escapeHtml(dateLabel)}</strong>` : ""}.</p><p style="font-size:15px;line-height:1.8">Dia will be in touch within 24–48 hours by phone or WhatsApp to discuss your request and confirm the details. Your appointment is confirmed once availability has been agreed with you.</p><p style="font-size:15px;line-height:1.8">With love,<br/>Dia</p>`,
  );
  const ownerSubject = isMessage
    ? `New Contact Enquiry from ${safeNameForSubject} - Glam by Dia`
    : `✨ New Booking Request from ${safeNameForSubject} - Glam by Dia`;
  const customerSubject = isMessage
    ? "Thank you for contacting Glam by Dia!"
    : "Thank you for choosing Glam by Dia! We've received your booking request ✨";

  const emailResults = await Promise.allSettled([
    sendEmail({
      from,
      to: SITE.ownerEmail,
      reply_to: data.email,
      subject: ownerSubject,
      html: ownerHtml,
      text: `New request from ${data.fullName}. ${formLabel} — ${serviceLabel}. Date: ${dateLabel}. Phone: ${data.phone}. Email: ${data.email}.`,
    }),
    sendEmail({
      from,
      to: data.email,
      subject: customerSubject,
      html: customerHtml,
      text: `Thank you, ${data.fullName}. We received your ${isMessage ? "message" : "booking request"} for ${serviceLabel}${data.preferredDate ? ` on ${dateLabel}` : ""}. Dia will be in touch within 24–48 hours. Call 0478 666 466 or find us on Instagram @glam_bydia.`,
    }),
  ]);

  emailResults.forEach((result, index) => {
    if (result.status === "rejected") {
      console.error(index === 0 ? "Owner email failed:" : "Customer confirmation email failed:", result.reason);
    }
  });

  response.status(200).json({ ok: true });
}
