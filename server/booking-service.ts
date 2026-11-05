import { Buffer } from "node:buffer";
import type { BookingInput } from "../src/lib/booking.schema";
import { SITE } from "../src/lib/site";
import { getPhoneCountryName } from "../src/lib/phone";

export const SPREADSHEET_ID = "1_l37PYGOH7HVl6mY68s4WscdUciFTbKHDlH7OUjKda4";

const FORM_LABELS: Record<BookingInput["formType"], string> = {
  beauty: "Bridal Makeup & Hair",
  henna: "Henna / Mehndi",
  class: "Self Makeup Class",
  message: "Contact Enquiry",
};

const SHEET_TABS: Record<BookingInput["formType"], string> = {
  beauty: "Bridal Bookings",
  henna: "Henna Bookings",
  class: "Makeup Classes",
  message: "Contact Enquiries",
};

export type ConnectorProxy = (
  connector: "google-sheet" | "google-mail",
  path: string,
  init: { method: string; headers: Record<string, string>; body?: string },
) => Promise<Response>;

function value(value: string | undefined): string {
  return value?.trim() ?? "";
}

export function buildSheetRow(data: BookingInput, receivedAt = new Date()): string[] {
  const timestamp = receivedAt.toLocaleString("en-AU", {
    timeZone: "Australia/Melbourne",
    dateStyle: "medium",
    timeStyle: "medium",
  });

  return [
    timestamp,
    "New",
    FORM_LABELS[data.formType],
    data.fullName,
    data.email,
    data.phone,
    getPhoneCountryName(data.phoneCountryCode),
    data.phoneCallingCode,
    value(data.contactMethod),
    value(data.service),
    value(data.customerType),
    value(data.preferredDate),
    value(data.preferredTime),
    value(data.locationPreference),
    value(data.locationAddress),
    data.hasSkinConditions === undefined ? "" : data.hasSkinConditions ? "Yes" : "No",
    value(data.skinDetails),
    value(data.skillsRequested),
    value(data.notes),
    data.agreedTerms ? "Yes" : "No",
    data.wantsPromotions ? "Yes" : "No",
  ];
}

export function createSheetAppend(data: BookingInput, receivedAt = new Date()) {
  const tab = SHEET_TABS[data.formType];
  const range = `'${tab}'!A:U`;
  return {
    path: `/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(range)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
    body: {
      range,
      majorDimension: "ROWS",
      values: [buildSheetRow(data, receivedAt)],
    },
  };
}

export function createNotificationEmails(data: BookingInput, ownerEmail: string) {
  const service = value(data.service) || FORM_LABELS[data.formType];
  const date = value(data.preferredDate) || "To be confirmed";
  const location =
    data.locationPreference === "Mobile"
      ? `Mobile — ${value(data.locationAddress) || "address to be confirmed"}`
      : value(data.locationPreference) || "To be confirmed";
  const allergyDetails =
    data.hasSkinConditions === undefined
      ? "Not answered"
      : data.hasSkinConditions
        ? value(data.skinDetails) || "Yes"
        : "No";
  const requestDetails = [
    `Request type: ${FORM_LABELS[data.formType]}`,
    `Service: ${service}`,
    `Customer type: ${value(data.customerType) || "Not provided"}`,
    `Preferred date: ${date}`,
    `Preferred time: ${value(data.preferredTime) || "To be confirmed"}`,
    `Location: ${location}`,
    `Skin allergies or conditions: ${allergyDetails}`,
    `Skills requested: ${value(data.skillsRequested) || "Not provided"}`,
    `Notes: ${value(data.notes) || "None"}`,
  ].join("\r\n");

  return [
    {
      to: ownerEmail,
      replyTo: data.email,
      subject:
        data.formType === "message"
          ? `✨ New Contact Enquiry from ${data.fullName} - Glam by Dia`
          : `✨ New Booking Request from ${data.fullName} - Glam by Dia`,
      body: [
        "A new request was submitted on the Glam by Dia website.",
        "",
        "CUSTOMER DETAILS",
        `Name: ${data.fullName}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Phone country: ${getPhoneCountryName(data.phoneCountryCode)} (${data.phoneCallingCode})`,
        `Preferred contact method: ${value(data.contactMethod) || "Not provided"}`,
        "",
        "REQUEST DETAILS",
        requestDetails,
      ].join("\r\n"),
    },
    {
      to: data.email,
      replyTo: SITE.email,
      subject:
        data.formType === "message"
          ? "Thank you for contacting Glam by Dia ✨"
          : "Thank you for choosing Glam by Dia! We've received your booking request ✨",
      body: [
        `Dear ${data.fullName},`,
        "",
        `Thank you for contacting Glam by Dia. We have received your request for ${service}${data.preferredDate ? ` on ${data.preferredDate}` : ""}.`,
        "",
        "Dia will contact you within 24–48 hours by phone or WhatsApp to discuss your request and confirm availability. Your appointment is confirmed once Dia has confirmed the details with you.",
        "",
        `Call: ${SITE.phoneDisplay}`,
        `Instagram: @glam_bydia`,
        "",
        "With love,",
        "Dia",
      ].join("\r\n"),
    },
  ];
}

function encodeMimeEmail(email: {
  to: string;
  replyTo: string;
  subject: string;
  body: string;
}): string {
  const encodedSubject = Buffer.from(email.subject, "utf8").toString("base64");
  const encodedBody = Buffer.from(email.body, "utf8")
    .toString("base64")
    .replace(/.{1,76}/g, "$&\r\n")
    .trim();
  const mime = [
    `To: ${email.to}`,
    `Reply-To: ${email.replyTo}`,
    `Subject: =?UTF-8?B?${encodedSubject}?=`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "Content-Transfer-Encoding: base64",
    "",
    encodedBody,
  ].join("\r\n");
  return Buffer.from(mime, "utf8").toString("base64url");
}

async function sendGmail(
  email: ReturnType<typeof createNotificationEmails>[number],
  proxy: ConnectorProxy,
): Promise<boolean> {
  const response = await proxy("google-mail", "/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ raw: encodeMimeEmail(email) }),
  });
  return response.ok;
}

export async function saveBookingAndNotify(
  data: BookingInput,
  proxy: ConnectorProxy,
): Promise<{ ok: true; emailSent: boolean } | { ok: false; stage: "sheet" }> {
  const append = createSheetAppend(data);
  const sheetResponse = await proxy("google-sheet", append.path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(append.body),
  });

  if (!sheetResponse.ok) return { ok: false, stage: "sheet" };

  let profile: { emailAddress?: string } | null = null;
  try {
    const profileResponse = await proxy("google-mail", "/gmail/v1/users/me/profile", {
      method: "GET",
      headers: {},
    });
    if (!profileResponse.ok) return { ok: true, emailSent: false };
    profile = (await profileResponse.json().catch(() => null)) as { emailAddress?: string } | null;
  } catch {
    return { ok: true, emailSent: false };
  }
  if (!profile?.emailAddress || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.emailAddress)) {
    return { ok: true, emailSent: false };
  }

  const emailResults = await Promise.allSettled(
    createNotificationEmails(data, profile.emailAddress).map((email) => sendGmail(email, proxy)),
  );
  const emailSent = emailResults.every((result) => result.status === "fulfilled" && result.value);

  return { ok: true, emailSent };
}
