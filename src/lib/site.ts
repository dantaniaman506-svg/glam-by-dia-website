export const SITE = {
  name: "Glam by Dia",
  tagline: "Mobile Bridal Hair & Makeup Artist",
  heroTagline: "Look Beautiful, Feel Unforgettable",
  phone: "0478666466",
  phoneDisplay: "0478 666 466",
  phoneHref: "tel:+61478666466",
  email: "glambydia.hmua@gmail.com",
  emailHref: "mailto:glambydia.hmua@gmail.com",
  address: "52 Oakes Avenue, Clayton South, 3169",
  instagram: "https://www.instagram.com/glam_bydia",
  instagramHandle: "www.instagram.com/glam_bydia",
  website: "www.glambydia.com",
  ownerEmail: "dantaniaman506@gmail.com",
} as const;

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/book", label: "Book Makeup & Hair" },
  { to: "/henna", label: "Henna Service" },
  { to: "/self-makeup-class", label: "Self-Makeup Class" },
  { to: "/contact", label: "Contact" },
] as const;

export const SERVICES = [
  {
    slug: "hair-down",
    title: "Makeup with hair down",
    price: "$170",
    description:
      "Soft, romantic makeup paired with voluminous waves worn down — perfect for brides who love an effortless, dreamy look.",
  },
  {
    slug: "hair-up",
    title: "Makeup with hair up",
    price: "$210",
    description:
      "Full glam makeup with an elegant updo — a timeless, sophisticated choice for your wedding day.",
  },
  {
    slug: "makeup-only",
    title: "Makeup only",
    price: "$100",
    description:
      "A flawless, long-lasting makeup look tailored to your features — from natural and soft glam to full glam.",
  },
  {
    slug: "hairstyle-only",
    title: "Hairstyle only",
    price: "$100",
    description:
      "Bridal-inspired hairstyling — elegant updos, soft waves and everything in between, finished to last all day.",
  },
  {
    slug: "bridal-package",
    title: "Complete Bridal Experience Package",
    price: "$300",
    description:
      "Our premium makeup and hair experience for the bride who wants everything perfected for the biggest day of her life.",
  },
  {
    slug: "wedding-trial",
    title: "Wedding Trial (Hair and Makeup)",
    price: "$200",
    description:
      "Try your complete wedding look before the big day, so you walk down the aisle feeling completely confident.",
  },
  {
    slug: "groom-touchup",
    title: "Groom's Wedding Touch-Up",
    price: "$150",
    description:
      "A polished, camera-ready finishing touch for the groom — subtle, refined and long-lasting.",
  },
] as const;

export const HENNA_SERVICES = [
  {
    title: "Bridal Henna",
    description:
      "Intricate, personalised bridal mehndi for hands and feet — designed around your story, outfit and jewellery.",
  },
  {
    title: "Bridal Party & Family Henna",
    description:
      "Beautiful designs for bridesmaids, mothers and guests — from minimal elegance to bold traditional patterns.",
  },
  {
    title: "Engagement & Mehndi Night",
    description:
      "Celebration-ready henna for your sangeet, mehndi night or engagement — done at your home or venue.",
  },
  {
    title: "Festive & Casual Henna",
    description:
      "Quick, graceful designs for festivals, baby showers, birthdays or just because — available year round.",
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
    description: "Send your date, venue and the looks you love — we reply with availability and a quote.",
  },
  {
    title: "Trial & Planning",
    description: "We design your look together at a relaxed trial, perfecting every detail before the big day.",
  },
  {
    title: "Your Day",
    description: "We arrive at your home, hotel or venue early, calm and fully prepared — you just enjoy it.",
  },
] as const;

export const FAQS = [
  {
    q: "Do you travel to my home or venue?",
    a: "Yes — we are a mobile team and travel across Melbourne and surrounding suburbs. Travel fees may apply for long distances.",
  },
  {
    q: "How far in advance should I book?",
    a: "For weekends and wedding season we recommend 3–6 months ahead, but always ask — we may still have your date.",
  },
  {
    q: "Which products do you use?",
    a: "We use professional, long-wear, skin-loving products and sanitised, hygienic kits for every booking.",
  },
  {
    q: "How long does bridal makeup and hair take?",
    a: "Around 2.5–3 hours for the bride, with the party booked in a timed schedule so everyone is ready on time.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "The team was absolutely amazing! My makeup and hair were perfect and lasted all day. Highly recommend Glam by Dia!",
    author: "Sarah M.",
  },
  {
    quote:
      "Dia made me feel like the most beautiful version of myself on my wedding day. So professional and so lovely to work with.",
    author: "Priya K.",
  },
  {
    quote:
      "From the trial to the big day, everything was seamless. My bridal look was exactly what I dreamed of.",
    author: "Emily R.",
  },
] as const;
