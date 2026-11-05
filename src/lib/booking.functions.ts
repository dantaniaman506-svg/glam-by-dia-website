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

  const requestDetails: Array<[string, string | undefined]> = [
    ["Request type", FORM_LABELS[data.formType]],
    ["Service", data.service],
    ["Preferred date", data.preferredDate],
    ["Preferred time", data.preferredTime],
    ["Location", location],
  ];
  const customerDetails: Array<[string, string | undefined]> = [
    ["Name", data.fullName],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Preferred contact method", data.contactMethod],
  ];
  const additionalDetails: Array<[string, string | undefined]> = [
    [
      "Skin allergies or conditions",
      data.hasSkinConditions === undefined
        ? undefined
        : data.hasSkinConditions
          ? data.skinDetails || "Yes"
          : "No",
    ],
    ["Skills to learn", data.skillsRequested],
    ["Message or special requests", data.notes],
  ];
  const formatSection = (title: string, rows: Array<[string, string | undefined]>) => [
    title,
    ...rows
      .filter(([, value]) => value?.trim())
      .map(([label, value]) => `${label}: ${value}`),
  ];

  const subject =
    `Glam by Dia — ${data.formType === "message" ? "Contact enquiry" : "Booking request"} — ${data.fullName}`;
  const body = [
    "Hello Dia,",
    "",
    "I'd like to enquire about a Glam by Dia service.",
    "",
    ...formatSection("REQUEST DETAILS", requestDetails),
    "",
    ...formatSection("CUSTOMER DETAILS", customerDetails),
    "",
    ...formatSection("ADDITIONAL INFORMATION", additionalDetails),
    "",
    "Please contact me to discuss availability and next steps.",
  ].join("\r\n");
  const params = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return `mailto:${SITE.ownerEmail}?${params}`;
}
