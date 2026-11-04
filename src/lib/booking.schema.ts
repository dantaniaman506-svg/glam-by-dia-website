import { z } from "zod";

export const bookingSchema = z.object({
  formType: z.enum(["beauty", "henna", "class", "message"]),
  customerType: z.string().max(40).optional(),
  service: z.string().max(160).optional(),
  preferredDate: z.string().max(40).optional(),
  preferredTime: z.string().max(40).optional(),
  locationPreference: z.string().max(160).optional(),
  locationAddress: z.string().max(300).optional(),
  fullName: z.string().trim().min(1, "Please enter your name").max(120),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(30),
  email: z.string().trim().email("Please enter a valid email").max(255),
  contactMethod: z.enum(["Phone", "Email"]).optional(),
  hasSkinConditions: z.boolean().optional(),
  skinDetails: z.string().max(1000).optional(),
  notes: z.string().max(2000).optional(),
  agreedTerms: z.boolean().optional(),
  wantsPromotions: z.boolean().optional(),
  skillsRequested: z.string().max(2000).optional(),
});

export type BookingInput = z.infer<typeof bookingSchema>;
