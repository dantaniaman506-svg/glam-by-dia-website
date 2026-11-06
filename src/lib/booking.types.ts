export type BookingFormType = "beauty" | "henna" | "class" | "message";

export type BookingInput = {
  formType: BookingFormType;
  customerType?: string | undefined;
  service?: string | undefined;
  preferredDate?: string | undefined;
  preferredTime?: string | undefined;
  locationPreference?: string | undefined;
  locationAddress?: string | undefined;
  fullName: string;
  phone: string;
  phoneCountryCode: string;
  phoneCallingCode: string;
  email: string;
  contactMethod?: "Phone" | "Email" | undefined;
  hasSkinConditions?: boolean | undefined;
  skinDetails?: string | undefined;
  notes?: string | undefined;
  agreedTerms?: boolean | undefined;
  wantsPromotions?: boolean | undefined;
  skillsRequested?: string | undefined;
};
