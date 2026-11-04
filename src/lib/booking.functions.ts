import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const bookingSchema = z.object({
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

export const submitBooking = createServerFn({ method: "POST" })
  .inputValidator((data) => bookingSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("booking_requests").insert({
      form_type: data.formType,
      customer_type: data.customerType,
      service: data.service,
      preferred_date: data.preferredDate || null,
      preferred_time: data.preferredTime,
      location_preference: data.locationPreference,
      location_address: data.locationAddress,
      full_name: data.fullName,
      phone: data.phone,
      email: data.email,
      contact_method: data.contactMethod,
      has_skin_conditions: data.hasSkinConditions,
      skin_details: data.skinDetails,
      notes: data.notes,
      agreed_terms: data.agreedTerms,
      wants_promotions: data.wantsPromotions,
      skills_requested: data.skillsRequested,
    });

    if (error) {
      console.error("booking_requests insert failed:", error.message);
      return {
        ok: false as const,
        message: "We couldn't save your booking request. Please try again, or call us directly.",
      };
    }

    return { ok: true as const };
  });
