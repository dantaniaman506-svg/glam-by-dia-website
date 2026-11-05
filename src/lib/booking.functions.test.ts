import { describe, expect, it } from "vitest";
import { createBookingEmailDraft } from "./booking.functions";

describe("createBookingEmailDraft", () => {
  it("opens a booking draft addressed to Dia with the submitted details", () => {
    const draft = new URL(createBookingEmailDraft({
      formType: "beauty",
      fullName: "Asha Patel",
      phone: "0400 123 456",
      email: "asha@example.com",
      service: "Makeup with hair up",
      preferredDate: "2027-02-10",
      preferredTime: "Morning",
      locationPreference: "Mobile",
      locationAddress: "Clayton South",
      hasSkinConditions: true,
      skinDetails: "Sensitive skin",
      notes: "Please call after 5pm",
    }));

    expect(draft.protocol).toBe("mailto:");
    expect(draft.pathname).toBe("dantaniaman506@gmail.com");
    expect(draft.searchParams.get("subject")).toContain("Asha Patel");
    expect(draft.searchParams.get("body")).toContain("asha@example.com");
    expect(draft.searchParams.get("body")).toContain("Makeup with hair up");
    expect(draft.searchParams.get("body")).toContain("Sensitive skin");
    expect(draft.searchParams.get("body")).toContain("Clayton South");
    expect(draft.searchParams.get("body")).toContain("REQUEST DETAILS\r\nRequest type:");
    expect(draft.searchParams.get("body")).toContain("\r\n\r\nCUSTOMER DETAILS");
    expect(draft.search).not.toContain("+");
    expect(draft.search).toContain("%20");
  });

  it("creates a contact enquiry draft with the message", () => {
    const draft = new URL(createBookingEmailDraft({
      formType: "message",
      fullName: "Mia Rose",
      phone: "0400 000 000",
      email: "mia@example.com",
      notes: "I would like to ask about availability.",
    }));

    expect(draft.searchParams.get("subject")).toContain("Contact enquiry");
    expect(draft.searchParams.get("body")).toContain("I would like to ask about availability.");
    expect(draft.searchParams.get("body")).toContain("ADDITIONAL INFORMATION");
  });
});
