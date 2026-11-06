import type { BookingInput } from "./booking.types";
import { getPhoneCountryName } from "./phone";

const FORM_RECIPIENT = "dantaniaman506@gmail.com";

const FORM_LABELS: Record<BookingInput["formType"], string> = {
  beauty: "Bridal Makeup & Hair",
  henna: "Henna / Mehndi",
  class: "Self Makeup Class",
  message: "Contact Enquiry",
};

function value(text: string | undefined, fallback = "Not provided"): string {
  return text?.trim() || fallback;
}

export function createEmailDraft(data: BookingInput): string {
  const service = value(data.service, FORM_LABELS[data.formType]);
  const location =
    data.locationPreference === "Mobile"
      ? `Mobile — ${value(data.locationAddress, "address to be confirmed")}`
      : value(data.locationPreference);
  const skinDetails =
    data.hasSkinConditions === undefined
      ? "Not answered"
      : data.hasSkinConditions
        ? value(data.skinDetails, "Yes")
        : "No";

  const subject =
    data.formType === "message"
      ? `Contact enquiry from ${data.fullName} - Glam by Dia`
      : `Booking request from ${data.fullName} - ${service}`;
  const body = [
    "Hello Dia,",
    "",
    "I'd like to enquire about the following:",
    "",
    "CUSTOMER DETAILS",
    `Name: ${data.fullName}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone} — ${getPhoneCountryName(data.phoneCountryCode)} (${data.phoneCallingCode})`,
    `Preferred contact method: ${value(data.contactMethod)}`,
    "",
    "REQUEST DETAILS",
    `Request type: ${FORM_LABELS[data.formType]}`,
    `Service selected: ${service}`,
    `Preferred date: ${value(data.preferredDate)}`,
    `Preferred time: ${value(data.preferredTime)}`,
    `Location: ${location}`,
    `Skin allergies or conditions: ${skinDetails}`,
    `Skills to learn: ${value(data.skillsRequested)}`,
    `Special notes: ${value(data.notes)}`,
    `Offer updates: ${data.wantsPromotions ? "Yes" : "No"}`,
    "",
    "Please contact me to discuss availability and next steps.",
  ].join("\r\n");

  return `mailto:${FORM_RECIPIENT}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
