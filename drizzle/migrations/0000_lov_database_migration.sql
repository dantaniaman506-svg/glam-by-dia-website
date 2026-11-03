CREATE TABLE public.booking_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  form_type text NOT NULL DEFAULT 'beauty',
  customer_type text,
  service text,
  preferred_date date,
  preferred_time text,
  location_preference text,
  location_address text,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL,
  contact_method text DEFAULT 'Phone',
  has_skin_conditions boolean,
  skin_details text,
  notes text,
  agreed_terms boolean,
  wants_promotions boolean,
  skills_requested text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.booking_requests TO service_role;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;