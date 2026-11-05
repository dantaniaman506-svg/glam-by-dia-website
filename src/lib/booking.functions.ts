import type { BookingInput } from "@/lib/booking.schema";
import { SITE } from "@/lib/site";

export type { BookingInput } from "@/lib/booking.schema";

const FORM_LABELS: Record<BookingInput["formType"], string> = {
  beauty: "Bridal Makeup & Hair",
  henna: "Henna / Mehndi",
  class: "Self Makeup Class",
  message: "Contact Enquiry",
};

export function createBookingEmailDraft(data: BookingInput): string {
  const location =
    data.locationPreference === "Mobile"
      ? `Mobile at ${data.locationAddress || "address to be confirmed"}`
      : data.locationPreference === "Studio"
        ? "Studio in Clayton South"
        : data.locationPreference;

  const details = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Preferred contact method", data.contactMethod],
    ["Request type", FORM_LABELS[data.formType]],
    ["Service selected", data.service],
    ["Preferred date", data.preferredDate],
    ["Preferred time", data.preferredTime],
    ["Location", location],
    [
      "Skin allergies or conditions",
      data.hasSkinConditions === undefined
        ? undefined
        : data.hasSkinConditions
          ? data.skinDetails || "Yes"
          : "No",
    ],
    ["Skills to learn", data.skillsRequested],
    ["Notes or special requests", data.notes],
  ]
    .filter(([, value]) => value?.trim())
    .map(([label, value]) => `${label}: ${value}`);

  const subject =
    data.formType === "message"
      ? `Website enquiry from ${data.fullName}`
      : `Booking request from ${data.fullName} — ${data.service || FORM_LABELS[data.formType]}`;
  const body = [
    "Hello Dia,",
    "",
    "I'd like to enquire about the following:",
    "",
    ...details,
    "",
    "Please contact me to discuss availability and next steps.",
  ].join("\n");
  const params = new URLSearchParams({ subject, body });

  return `mailto:${SITE.ownerEmail}?${params.toString()}`;
}
