export const SITE = {
  name: "Glam by Dia",
  tagline: "Mobile Bridal Hair & Makeup Artist",
  heroTagline: "Look Beautiful, Feel Unforgettable",
  phone: "0478666466",
  phoneDisplay: "0478 666 466",
  phoneHref: "tel:+61478666466",
  email: "glambydia.hmua@gmail.com",
  emailHref: "mailto:glambydia.hmua@gmail.com",
  address: "52 Oakes Avenue, Clayton South, 3169, Melbourne",
  instagram: "https://www.instagram.com/glam_bydia",
  instagramHandle: "@glam_bydia",
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=52+Oakes+Avenue%2C+Clayton+South+VIC+3169",
  googleReviewsUrl:
    "https://www.google.com/maps/search/?api=1&query=Glam+by+Dia+52+Oakes+Avenue+Clayton+South",
} as const;

export const BOOKING_OPTIONS_PATH = "/booking-options";

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/book", label: "Book Makeup & Hair" },
  { to: "/self-makeup-class", label: "Self-Makeup Class" },
  { to: "/gift-cards", label: "Gift Cards" },
  { to: "/contact", label: "Contact" },
] as const;

export const BRIDAL_BOOKING_SERVICES = {
  hairDown: "Makeup & Hair Down ($200)",
  hairUp: "Makeup with Hair Up ($220)",
  makeupOnly: "Makeup ($110)",
  hairstyleOnly: "Hairstyle ($100)",
  bridalTrial: "Bridal Trial ($200) — Enquiry",
  bridalMakeupHair: "Bridal Makeup and Hair (from $300) — Enquiry",
  groomTouchUp: "Groom’s Touch Up ($150) — Enquiry",
  touchUpKit: "Touch Up Kit ($100) — Enquiry",
} as const;

export const SERVICES = [
  {
    slug: "hair-down",
    title: "Makeup & Hair Down",
    price: "$200",
    description:
      "Professional makeup application with lashes and your choice of curls, waves, Hollywood waves or a half-updo. Lovely for wedding guests, graduations, baby showers, birthdays and other special occasions.",
    bookingService: BRIDAL_BOOKING_SERVICES.hairDown,
    bookingType: "direct",
  },
  {
    slug: "hair-up",
    title: "Makeup with Hair Up",
    price: "$220",
    description:
      "Professional makeup application with lashes and your choice of messy bun, low bun or elegant updo. Perfect for birthdays, anniversaries, weddings, formal occasions and special events.",
    bookingService: BRIDAL_BOOKING_SERVICES.hairUp,
    bookingType: "direct",
  },
  {
    slug: "makeup-only",
    title: "Makeup",
    price: "$110",
    description:
      "Professional makeup application tailored to your features and the occasion.",
    bookingService: BRIDAL_BOOKING_SERVICES.makeupOnly,
    bookingType: "direct",
  },
  {
    slug: "hairstyle-only",
    title: "Hairstyle",
    price: "$100",
    description:
      "Professional hairstyling, from soft waves and curls to polished buns and elegant updos.",
    bookingService: BRIDAL_BOOKING_SERVICES.hairstyleOnly,
    bookingType: "direct",
  },
  {
    slug: "bridal-trial",
    title: "Bridal Trial",
    price: "$200",
    description:
      "Plan and try your wedding look with an artist before the big day. Enquiry required.",
    bookingService: BRIDAL_BOOKING_SERVICES.bridalTrial,
    bookingType: "enquiry",
  },
  {
    slug: "bridal-makeup-hair",
    title: "Bridal Makeup and Hair",
    price: "From $300",
    description:
      "A personalised bridal makeup and hairstyling experience, with pricing starting from $300. Please send an enquiry for a tailored quote.",
    bookingService: BRIDAL_BOOKING_SERVICES.bridalMakeupHair,
    bookingType: "enquiry",
  },
  {
    slug: "groom-touchup",
    title: "Groom’s Touch Up",
    price: "$150",
    description:
      "A polished finishing touch for the groom. Enquiry required.",
    bookingService: BRIDAL_BOOKING_SERVICES.groomTouchUp,
    bookingType: "enquiry",
  },
  {
    slug: "touch-up-kit",
    title: "Touch Up Kit",
    price: "$100",
    description:
      "A touch-up kit for keeping your look fresh during the celebration. Enquiry required.",
    bookingService: BRIDAL_BOOKING_SERVICES.touchUpKit,
    bookingType: "enquiry",
  },
] as const;

export const CLASS_MODULES = [
  {
    title: "Skin Prep & Base",
    description:
      "Learn to prep, prime and match your foundation for a base that looks like skin and lasts all day.",
  },
  {
    title: "Eyes & Brows",
    description:
      "Everyday and glam eye looks, liner that suits your eye shape, and brows that frame your face.",
  },
  {
    title: "Blush, Bronze & Glow",
    description:
      "Where to place blush, bronzer and highlight for your face shape — the secret to lifted, radiant makeup.",
  },
  {
    title: "Lips & Finishing",
    description:
      "Lip shapes and colour choices, plus setting techniques so everything stays picture-perfect.",
  },
] as const;

export const PROCESS_STEPS = [
  {
    title: "Enquiry",
    description:
      "Send your date, venue and the looks you love — we reply with availability and a quote.",
  },
  {
    title: "Trial & Planning",
    description:
      "We design your look together at a relaxed trial, perfecting every detail before the big day.",
  },
  {
    title: "Your Day",
    description:
      "We arrive at your home, hotel or venue early, calm and fully prepared — you just enjoy it.",
  },
] as const;

export const FAQS = [
  {
    q: "How long does the service take?",
    a: "A single service, such as makeup or hairstyling, typically takes approximately 1 hour. If you book both makeup and hairstyling, allow at least 1.5–2 hours so we can perfect your look without rushing.",
  },
  {
    q: "What products does the Glam by Dia team use?",
    a: "The team uses professional brands including Dior, Armani, Charlotte Tilbury, MAC, Rare Beauty, Huda Beauty, Fenty Beauty, Too Faced and NARS.",
  },
  {
    q: "Is a bridal trial necessary, and how does it work?",
    a: "A bridal trial is not compulsory, but we highly recommend one to help you feel confident and prepared. You’ll meet your artist, discuss your preferred style, try your desired makeup and hairstyle, share inspiration and make adjustments. If you’re unsure what suits you, the team will recommend a look that complements your features, outfit and personal style.",
  },
  {
    q: "Do you offer touch-up services during the event?",
    a: "Yes. Touch-ups are available at an additional cost. If you would like your artist to stay at the event, tell us when enquiring. We’ll discuss your needs and provide a personalised quote.",
  },
  {
    q: "Do you offer mobile service or studio service?",
    a: "Both. The studio is in Clayton South, Melbourne, and the team can travel to your preferred location across Melbourne and surrounding areas. Travel arrangements are available for bookings elsewhere in Australia.",
  },
  {
    q: "How much is the travel fee?",
    a: "Travel within Melbourne is a flat $50 call-out fee, including the first 30 kilometres calculated from Melbourne CBD or the relevant regional hub. Additional distance is $2 per kilometre, plus GST. Rural or long-distance bookings may also require artist accommodation. All extra travel and accommodation costs will be discussed and confirmed before booking.",
  },
  {
    q: "Can I schedule a service at any time?",
    a: "The team operates 365 days a year. A $50 after-hours fee per artist applies to appointments before 7:00 AM or after 7:00 PM.",
  },
  {
    q: "Is there an early morning fee?",
    a: "Yes. A $50 early morning fee per artist applies to appointments before 6:00 AM. Applicable fees will be confirmed before booking.",
  },
  {
    q: "Do I need to pay a deposit?",
    a: "Yes. A deposit is required to secure your booking. Your appointment is officially confirmed once the deposit has been received. The remaining balance is due closer to your appointment, as outlined in your booking confirmation.",
  },
  {
    q: "Can you accommodate large bridal parties or group bookings?",
    a: "Absolutely. The team can accommodate bridal parties, wedding guests and special occasion groups. For larger bookings, contact us as early as possible so we can allocate artists, coordinate schedules and help everyone get ready on time.",
  },
  {
    q: "What is your cancellation policy?",
    a: "Your booking is confirmed once the deposit has been received. Deposits are non-refundable for cancellations made within 14 days of the appointment. The remaining balance must be paid at least 7 days before your booking date.",
  },
  {
    q: "Will lead artist Diya be at my booking?",
    a: "We always aim for lead artist Diya to attend. If she is unavailable, your booking may be assigned to one of the team’s experienced artists in consultation with you, with the same professional service and quality.",
  },
  {
    q: "Why should I choose Glam by Dia?",
    a: "Glam by Dia brings over 10 years of industry experience, personalised makeup and hairstyling, mobile convenience across Melbourne and Australia, consistent professional standards, a flexible team for individual or group bookings, and clear communication from your first enquiry to your special day. Our goal is to help you look beautiful, feel confident and enjoy every moment.",
  },
] as const;
