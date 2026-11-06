import { describe, expect, it } from "vitest";
import { createEmailDraft } from "./email-draft";
import type { BookingInput } from "./booking.types";

const sample: BookingInput = {
  formType: "beauty",
  fullName: "Asha Patel",
  phone: "+61400123456",
  phoneCountryCode: "AU",
  phoneCallingCode: "+61",
  email: "asha@example.com",
  contactMethod: "Email",
  service: "Makeup with hair up ($210)",
  preferredDate: "2027-02-10",
  preferredTime: "Morning",
  locationPreference: "Mobile",
  locationAddress: "Clayton South",
  hasSkinConditions: true,
  skinDetails: "Sensitive skin",
  notes: "Please call after 5pm",
  agreedTerms: true,
  wantsPromotions: false,
};

function decodeMailtoPart(url: string, key: "subject" | "body"): string {
  const value = url.split(`${key}=`)[1]?.split("&")[0];
  return value ? decodeURIComponent(value) : "";
}

describe("email drafts", () => {
  it("prefills the business recipient and a readable booking email", () => {
    const url = createEmailDraft(sample);
    const body = decodeMailtoPart(url, "body");

    expect(url).toMatch(/^mailto:dantaniaman506@gmail\.com\?/);
    expect(decodeMailtoPart(url, "subject")).toContain("Booking request from Asha Patel");
    expect(body).toContain("Phone: +61400123456 — Australia (+61)");
    expect(body).toContain("Service selected: Makeup with hair up ($210)");
    expect(body).toContain("Skin allergies or conditions: Sensitive skin");
    expect(body).toContain("Special notes: Please call after 5pm");
    expect(url).not.toContain("+");
    expect(url).toContain("%20");
  });

  it("uses a contact-enquiry subject and message details", () => {
    const url = createEmailDraft({
      ...sample,
      formType: "message",
      service: undefined,
      notes: "Could you share your availability?",
    });

    expect(decodeMailtoPart(url, "subject")).toContain("Contact enquiry from Asha Patel");
    expect(decodeMailtoPart(url, "body")).toContain(
      "Special notes: Could you share your availability?",
    );
  });
});
