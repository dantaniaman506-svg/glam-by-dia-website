import { describe, expect, it } from "vitest";
import {
  buildSheetRow,
  createNotificationEmails,
  createSheetAppend,
  saveBookingAndNotify,
  type ConnectorProxy,
} from "../../server/booking-service";
import type { BookingInput } from "./booking.schema";
import { getPhoneDetails } from "./phone";

const sample: BookingInput = {
  formType: "beauty",
  fullName: "Asha Patel",
  phone: "+61400123456",
  phoneCountryCode: "AU",
  phoneCallingCode: "+61",
  email: "asha@example.com",
  contactMethod: "Email",
  service: "Makeup with hair up",
  preferredDate: "2027-02-10",
  preferredTime: "Morning",
  locationPreference: "Mobile",
  locationAddress: "Clayton South",
  hasSkinConditions: true,
  skinDetails: "Sensitive skin",
  notes: "Please call after 5pm",
  agreedTerms: true,
};

describe("booking service", () => {
  it("normalizes national numbers with the selected country calling code", () => {
    expect(getPhoneDetails("0478 666 466", "AU")).toEqual({
      phone: "+61478666466",
      phoneCountryCode: "AU",
      phoneCallingCode: "+61",
    });
    expect(getPhoneDetails("not a phone number", "AU")).toBeNull();
  });

  it("maps each form type to its own spreadsheet tab", () => {
    expect(createSheetAppend(sample).path).toContain("Bridal%20Bookings");
    expect(createSheetAppend({ ...sample, formType: "henna" }).path).toContain("Henna%20Bookings");
    expect(createSheetAppend({ ...sample, formType: "class" }).path).toContain("Makeup%20Classes");
    expect(createSheetAppend({ ...sample, formType: "message" }).path).toContain(
      "Contact%20Enquiries",
    );
  });

  it("writes the shared sheet columns in the configured order", () => {
    const row = buildSheetRow(sample, new Date("2027-01-01T00:00:00.000Z"));

    expect(row).toHaveLength(21);
    expect(row[1]).toBe("New");
    expect(row[2]).toBe("Bridal Makeup & Hair");
    expect(row[3]).toBe("Asha Patel");
    expect(row[5]).toBe("+61400123456");
    expect(row[6]).toBe("Australia");
    expect(row[7]).toBe("+61");
    expect(row[8]).toBe("Email");
    expect(row[10]).toBe("");
    expect(row[14]).toBe("Clayton South");
    expect(row[15]).toBe("Yes");
    expect(row[16]).toBe("Sensitive skin");
    expect(row[19]).toBe("Yes");
    expect(createSheetAppend(sample).body.values).toHaveLength(1);
  });

  it("creates owner and customer notification messages", () => {
    const emails = createNotificationEmails(sample, "dantaniaman506@gmail.com");
    const owner = emails[0]!;
    const customer = emails[1]!;

    expect(owner.to).toBe("dantaniaman506@gmail.com");
    expect(owner.replyTo).toBe("asha@example.com");
    expect(owner.subject).toContain("New Booking Request from Asha Patel");
    expect(owner.body).toContain("Preferred contact method: Email");
    expect(owner.body).toContain("Skin allergies or conditions: Sensitive skin");
    expect(customer.to).toBe("asha@example.com");
    expect(customer.body).toContain("within 24–48 hours");
    expect(customer.body).toContain("Makeup with hair up");
  });

  it("does not send email when saving to Sheets fails", async () => {
    const calls: string[] = [];
    const proxy: ConnectorProxy = async (connector) => {
      calls.push(connector);
      return new Response("unavailable", { status: 503 });
    };

    const result = await saveBookingAndNotify(sample, proxy);

    expect(result).toEqual({ ok: false, stage: "sheet" });
    expect(calls).toEqual(["google-sheet"]);
  });

  it("appends the row then sends both emails", async () => {
    const calls: string[] = [];
    const proxy: ConnectorProxy = async (connector, path, init) => {
      calls.push(`${connector}:${path}`);
      if (connector === "google-sheet") {
        const body = JSON.parse(init.body ?? "{}") as { values: string[][] };
        expect(body.values[0]?.[3]).toBe("Asha Patel");
      }
      if (connector === "google-mail") {
        if (path.endsWith("/profile")) {
          return new Response(JSON.stringify({ emailAddress: "dantaniaman506@gmail.com" }), {
            status: 200,
          });
        }
        const body = JSON.parse(init.body ?? "{}") as { raw: string };
        expect(body.raw).toMatch(/^[A-Za-z0-9_-]+$/);
      }
      return new Response("{}", { status: 200 });
    };

    const result = await saveBookingAndNotify(sample, proxy);

    expect(result).toEqual({ ok: true, emailSent: true });
    expect(calls).toHaveLength(4);
    expect(calls[0]).toContain("google-sheet:");
    expect(calls.slice(1).every((call) => call.includes("google-mail:"))).toBe(true);
  });
});
