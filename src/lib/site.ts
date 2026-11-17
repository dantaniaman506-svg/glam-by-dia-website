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
  instagram: "https://www.instagram.com/glam_bydia?psln=MWV3ZGdtMDlnbDU1aA==",
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
    description: "Professional makeup application tailored to your features and the occasion.",
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
    description: "A polished finishing touch for the groom. Enquiry required.",
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
    a: "A single service, such as makeup or hairstyling, typically takes approximately 1 hour. If you're booking both makeup and hairstyling, we recommend allowing at least 1.5–2 hours to ensure we have enough time to perfect your look without rushing.",
  },
  {
    q: "What products do Glam by Dia artists use?",
    a: "The Glam by Dia team only use top-end professional brands such as Dior, Armani, Charlotte Tilbury, MAC, Rare Beauty, Huda Beauty, Fenty Beauty, Too Faced and NARS.",
  },
  {
    q: "Is a Bridal Trial Necessary & How Does It Work?",
    a: "While a bridal trial is not compulsory, we highly recommend it to help you feel confident and prepared for your wedding day.\n\nA trial gives you the opportunity to meet your artist, discuss your preferred style and try out your desired makeup and hairstyle before the big day. It's also the perfect time to share inspiration photos, discuss your preferences and make any adjustments to achieve your desired look.\n\nNot sure what style you want? No worries! Our experienced artists will guide you through the process, offer professional recommendations and help you find a look that complements your features, outfit and personal style.\n\nOur goal is to ensure you feel comfortable, confident and beautiful on your special day.",
  },
  {
    q: "Do you offer touch-up services during the event?",
    a: "Yes! We offer touch-up services at an additional cost. If you would like your artist to stay on-site throughout your event to maintain your makeup and hairstyle, please let us know when making your booking.\n\nWe can discuss your requirements and provide a personalised quote based on the duration and services required.",
  },
  {
    q: "Do you offer mobile service or studio service?",
    a: "Yes! We offer both mobile and studio appointments for your convenience. Our studio is located in Clayton South, Melbourne, and our team can travel to your preferred location.\n\nWe provide mobile beauty services across Melbourne and surrounding areas, with travel arrangements available for bookings anywhere across Australia.\n\nWhether you prefer visiting our studio or having our artists come to you, we're happy to accommodate your needs.",
  },
  {
    q: "How much is the travel fee?",
    a: "We charge a flat travel fee of $50 for bookings within Melbourne. The travel fee includes the initial call-out fee and the first 30 kilometres of travel, calculated from the Melbourne CBD or the relevant regional hub. Any additional distance is charged at $2 per kilometre, plus GST.\n\nFor rural or long-distance bookings where same-day travel is not practical, clients may also be required to cover the artist's accommodation expenses. Any additional travel and accommodation costs will be discussed and confirmed before booking.",
  },
  {
    q: "Can I schedule my service for any time day or night?",
    a: "We operate 365 days a year to deliver a 5-star hair and makeup experience from anywhere. If you wish to schedule one of our expert artists before 7 AM or after 7 PM, we require a $50 after-hours fee for our artist.",
  },
  {
    q: "Do You Charge an Early Morning Fee?",
    a: "Yes! An early morning fee of $50 per artist applies to appointments scheduled before 6:00 AM. This helps cover the additional arrangements required for early morning bookings.",
  },
  {
    q: "Do I Need to Pay a Deposit?",
    a: "Yes! A deposit is required to secure your booking. Your appointment will only be officially confirmed once the deposit has been received.\n\nThe remaining balance can be paid closer to your appointment, as outlined in your booking confirmation.",
  },
  {
    q: "Can Glam by Dia accommodate large bridal parties or group bookings?",
    a: "Absolutely! We welcome group bookings and can accommodate large bridal parties, wedding guests and special occasion groups.\n\nOur team of experienced makeup artists and hairstylists can work together to ensure everyone is ready on time.\n\nFor larger bookings, we recommend contacting us as early as possible so we can allocate the right number of artists, coordinate schedules and ensure a smooth and enjoyable experience for everyone.",
  },
  {
    q: "What Is Your Cancellation Policy?",
    a: "• Your booking is confirmed once the deposit has been received.\n• Deposits are non-refundable for cancellations made within 14 days of the appointment.\n• The remaining balance must be paid at least 7 days before your booking date.",
  },
  {
    q: "Will My Booking Be Covered by Lead Artist Diya?",
    a: "We always aim to have our lead artist, Diya, personally attend your booking. However, if she is unavailable, don't worry! Your booking will be assigned to one of our highly talented and experienced artists, in consultation with you, to ensure you receive the same professional service and quality you expect from Glam by Dia.",
  },
  {
    q: "Why Should I Choose Glam by Dia?",
    a: "At Glam by Dia, we combine professional expertise, creativity and personalised service to make every beauty experience special.\n\n• Experienced Artists: A talented team with over 10 years of industry experience.\n• Personalised Looks: Makeup and hairstyling tailored to your features, preferences and occasion.\n• Mobile Convenience: We travel to your preferred location across Melbourne and Australia.\n• Quality & Attention to Detail: We focus on delivering beautiful, polished and consistent results.\n• Flexible Team: Multiple artists are available to accommodate individual and large group bookings.\n• Client-Focused Service: From your first enquiry to your special day, we prioritise clear communication and a seamless experience.\n\nAt Glam by Dia, our goal is simple: to make you look beautiful, feel confident and enjoy every moment of your special occasion.",
  },
] as const;
