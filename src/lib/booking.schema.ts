import { z } from "zod";
import { getPhoneDetails } from "./phone";

export const bookingSchema = z
  .object({
    formType: z.enum(["beauty", "henna", "class", "message"]),
    customerType: z.string().max(40).optional(),
    service: z.string().max(160).optional(),
    preferredDate: z.string().max(40).optional(),
    preferredTime: z.string().max(40).optional(),
    locationPreference: z.string().max(160).optional(),
    locationAddress: z.string().max(300).optional(),
    fullName: z.string().trim().min(1, "Please enter your name").max(120),
    phone: z
      .string()
      .trim()
      .regex(/^\+[1-9]\d{6,14}$/, "Please enter a valid international phone number"),
    phoneCountryCode: z
      .string()
      .trim()
      .regex(/^[A-Z]{2}$/, "Please choose a country"),
    phoneCallingCode: z
      .string()
      .trim()
      .regex(/^\+\d{1,4}$/, "Please choose a valid calling code"),
    email: z.string().trim().email("Please enter a valid email").max(255),
    contactMethod: z.enum(["Phone", "Email"]).optional(),
    hasSkinConditions: z.boolean().optional(),
    skinDetails: z.string().max(1000).optional(),
    notes: z.string().max(2000).optional(),
    agreedTerms: z.boolean().optional(),
    wantsPromotions: z.boolean().optional(),
    skillsRequested: z.string().max(2000).optional(),
    website: z.string().max(200).optional(),
  })
  .superRefine((data, context) => {
    const phoneDetails = getPhoneDetails(data.phone, data.phoneCountryCode);
    if (
      !phoneDetails ||
      phoneDetails.phone !== data.phone ||
      phoneDetails.phoneCountryCode !== data.phoneCountryCode ||
      phoneDetails.phoneCallingCode !== data.phoneCallingCode
    ) {
      context.addIssue({
        code: "custom",
        path: ["phone"],
        message: "Please enter a valid number for the selected country.",
      });
    }
  });

export type BookingInput = z.infer<typeof bookingSchema>;
