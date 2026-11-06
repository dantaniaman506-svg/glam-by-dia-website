import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import {
  ArrowRight,
  CarIcon,
  ChevronLeft,
  ChevronRight,
  HeartIcon,
  PinIcon,
  ShieldIcon,
} from "@/components/site/icons";
import { BOOKING_OPTIONS_PATH, BRIDAL_BOOKING_SERVICES, SITE, TESTIMONIALS } from "@/lib/site";

import heroBride from "@/assets/hero-bride.webp";
import aboutBride from "@/assets/about-bride.jpg";
import serviceHairDown from "@/assets/service-hair-down.webp";
import serviceHairUp from "@/assets/service-hair-up.webp";
import serviceMakeupOnly from "@/assets/service-makeup-only.webp";
import serviceHairstyleOnly from "@/assets/service-hairstyle-only.webp";
import galleryIndian from "@/assets/gallery-indian-bride.jpg";
import galleryVeil from "@/assets/gallery-veil-bride.jpg";
import galleryBunVeil from "@/assets/gallery-bun-veil.jpg";
import galleryFlowerCrown from "@/assets/gallery-flower-crown.jpg";
import bridalPortrait from "@/assets/bridal-portrait-open-hair.webp";
import brideVeil from "@/assets/bride-veil-portrait.webp";

const HERO_SLIDES = [bridalPortrait, brideVeil, heroBride];
const MOBILE_HERO_SLIDES = [
  {
    src: "/images/hero-artwork.webp",
    alt: "Glam by Dia bridal makeup and hair artistry",
  },
  {
    src: "/images/hero-mobile-secondary.webp",
    alt: "Bride in pink bridal makeup with soft cherry blossom details",
  },
];
const QUICK_SERVICES = [
  {
    title: "Makeup with hair down",
    icon: "/images/service-icon-hair-down.webp",
    service: BRIDAL_BOOKING_SERVICES.hairDown,
  },
  {
    title: "Makeup with hair up",
    icon: "/images/service-icon-hair-up.webp",
    service: BRIDAL_BOOKING_SERVICES.hairUp,
  },
  {
    title: "Makeup only",
    icon: "/images/service-icon-makeup-only.webp",
    service: BRIDAL_BOOKING_SERVICES.makeupOnly,
  },
  {
    title: "Hairstyle only",
    icon: "/images/service-icon-hairstyle-only.webp",
    service: BRIDAL_BOOKING_SERVICES.hairstyleOnly,
  },
];

const SERVICE_CARDS = [
  {
    title: "Makeup with hair down",
    img: serviceHairDown,
    service: BRIDAL_BOOKING_SERVICES.hairDown,
  },
  { title: "Makeup with hair up", img: serviceHairUp, service: BRIDAL_BOOKING_SERVICES.hairUp },
  { title: "Makeup only", img: serviceMakeupOnly, service: BRIDAL_BOOKING_SERVICES.makeupOnly },
  {
    title: "Hairstyle only",
    img: serviceHairstyleOnly,
    service: BRIDAL_BOOKING_SERVICES.hairstyleOnly,
  },
];

const GALLERY_PREVIEW = [
  { img: galleryVeil, alt: "Bride with crystal veil and soft glam makeup" },
  { img: galleryIndian, alt: "Indian bride in red lehenga with gold jewellery" },
  { img: galleryFlowerCrown, alt: "Bride with pink rose and baby's breath hair piece" },
  { img: galleryBunVeil, alt: "Bridal low bun with veil and baby's breath" },
];

const FEATURES = [
  { Icon: CarIcon, title: "Mobile Service", sub: "Across Melbourne" },
  { Icon: PinIcon, title: "Studio in", sub: "Clayton South" },
  { Icon: ShieldIcon, title: "Professional &", sub: "Qualified Team" },
  { Icon: HeartIcon, title: "Personalised", sub: "Bridal Looks" },
];

function SectionHeading({
  eyebrow,
  title,
  align = "center",
}: {
  eyebrow: string;
  title: React.ReactNode;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
        <span className="h-px w-8 bg-primary/40 sm:w-12" />
        <span className="eyebrow">{eyebrow}</span>
        <span className="h-px w-8 bg-primary/40 sm:w-12" />
      </div>
      <h2 className="heading-display mt-2 text-[1.65rem] sm:text-4xl">{title}</h2>
    </div>
  );
}

function Hero() {
  const [slide, setSlide] = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 640px)");
    let timer: number | undefined;

    const syncCarousel = () => {
      if (desktop.matches) {
        if (timer === undefined) {
          timer = window.setInterval(
            () => setSlide((current) => (current + 1) % HERO_SLIDES.length),
            5000,
          );
        }
        return;
      }
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;
      setSlide(0);
    };

    syncCarousel();
    desktop.addEventListener("change", syncCarousel);
    return () => {
      if (timer !== undefined) window.clearInterval(timer);
      desktop.removeEventListener("change", syncCarousel);
    };
  }, []);

  useEffect(() => {
    const mobile = window.matchMedia("(max-width: 639px)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;

    const syncMobileCarousel = () => {
      if (timer !== undefined) window.clearInterval(timer);
      timer = undefined;

      if (mobile.matches && !reducedMotion.matches) {
        timer = window.setInterval(
          () => setMobileSlide((current) => (current + 1) % MOBILE_HERO_SLIDES.length),
          5200,
        );
      } else {
        setMobileSlide(0);
      }
    };

    syncMobileCarousel();
    mobile.addEventListener("change", syncMobileCarousel);
    reducedMotion.addEventListener("change", syncMobileCarousel);
    return () => {
      if (timer !== undefined) window.clearInterval(timer);
      mobile.removeEventListener("change", syncMobileCarousel);
      reducedMotion.removeEventListener("change", syncMobileCarousel);
    };
  }, []);

  return (
    <section className="px-3 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-[36rem] flex-col items-center sm:hidden">
        <div className="relative aspect-[841/915] w-full overflow-hidden rounded-[1.75rem]">
          {MOBILE_HERO_SLIDES.map((image, index) => (
            <img
              key={image.src}
              src={image.src}
              alt={mobileSlide === index ? image.alt : ""}
              aria-hidden={mobileSlide !== index}
              width={841}
              height={915}
              loading="lazy"
              fetchPriority={mobileSlide === index ? "high" : "low"}
              decoding="async"
              className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out motion-reduce:transition-none ${
                mobileSlide === index ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
        </div>
        <Link to={BOOKING_OPTIONS_PATH} className="btn-primary mt-5">
          Book Now
          <ArrowRight />
        </Link>
      </div>

      <div className="hidden sm:block">
        <div className="relative mx-auto min-h-[480px] max-w-5xl overflow-hidden rounded-[2rem] shadow-[0_24px_60px_-30px_rgba(150,80,110,0.45)] ring-1 ring-white/60">
          <div className="absolute inset-y-0 right-0 w-[62%]">
            {HERO_SLIDES.map((src, i) => (
              <img
                key={src}
                src={src}
                alt={i === slide ? "Glam by Dia bridal look" : ""}
                width={1024}
                height={1024}
                loading="lazy"
                fetchPriority={i === slide ? "high" : "low"}
                decoding="async"
                className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-1000 ${i === slide ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <div className="hero-image-overlay absolute inset-0" />
            <div className="absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[oklch(0.973_0.015_20)] to-transparent" />
          </div>

          <div className="relative z-10 px-6 py-14 sm:max-w-[55%] sm:px-12 sm:py-24">
            <p className="eyebrow">Mobile Bridal Hair &amp; Makeup Artist</p>
            <h1 className="mt-3 flex flex-wrap items-baseline gap-x-3">
              <span className="heading-display text-5xl sm:text-7xl">Glam</span>
              <span className="text-script text-5xl sm:text-6xl">by Dia</span>
            </h1>
            <p className="mt-4 font-display text-lg italic text-plum sm:text-2xl">
              {SITE.heroTagline}
            </p>
            <p className="mt-4 max-w-xs text-sm text-foreground/85 sm:max-w-none sm:text-base">
              Specialised in Bridal. Studio in Clayton South.
            </p>
            <Link to={BOOKING_OPTIONS_PATH} className="btn-primary mt-7">
              Book Now
              <ArrowRight />
            </Link>
          </div>

          <div className="absolute bottom-4 right-6 flex gap-2 sm:right-10">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Slide ${i + 1}`}
                onClick={() => setSlide(i)}
                className="flex h-11 w-11 items-center justify-center rounded-full"
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full transition-all ${i === slide ? "scale-110 bg-primary" : "bg-primary/35"}`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function QuickServiceStrip() {
  return (
    <section className="px-3 pt-8 sm:px-6">
      <div className="glass-panel mx-auto grid max-w-5xl grid-cols-2 gap-y-6 px-4 py-6 sm:grid-cols-4 sm:px-6 sm:py-7">
        {QUICK_SERVICES.map(({ title, icon, service }, i) => (
          <Link
            key={title}
            to={`/book?service=${encodeURIComponent(service)}`}
            className={`group flex flex-col items-center gap-2.5 px-2 text-center ${
              i % 2 === 0
                ? "border-r border-primary/15 sm:border-r"
                : "sm:border-r sm:border-primary/15 last:border-r-0"
            } ${i < 2 ? "max-sm:border-b max-sm:border-primary/15 max-sm:pb-5" : ""} ${i === 1 ? "max-sm:border-r-0" : ""}`}
          >
            <img
              src={icon}
              alt=""
              width={128}
              height={128}
              loading="lazy"
              decoding="async"
              className="h-16 w-16 rounded-full object-cover shadow-sm ring-2 ring-white transition-transform group-hover:scale-105"
            />
            <span className="text-[0.88rem] font-medium leading-snug text-foreground/90">
              {title}
            </span>
            <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="px-3 pt-16 sm:px-6">
      <div className="mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <span className="eyebrow">About Us</span>
            <span className="h-px w-12 bg-primary/40" />
          </div>
          <h2 className="heading-display mt-3 text-[2rem] sm:text-4xl">
            More Than Just
            <br />
            <span className="font-display italic text-script-rose">Makeup &amp; Hair</span>
          </h2>
          <p className="mt-5 text-sm leading-relaxed text-foreground/85 sm:text-[0.95rem]">
            Glam by Dia is a Melbourne-based mobile bridal beauty team specialising in bridal makeup
            and hair. With a studio in Clayton South, we travel across Melbourne and surrounding
            suburbs to provide professional beauty services at your home, hotel or wedding venue.
          </p>
          <Link to="/about" className="btn-outline mt-7">
            Our Story
            <ArrowRight />
          </Link>
        </div>

        <div className="relative">
          <div className="blush-blob absolute -inset-3 -z-0 rotate-3 sm:-inset-5" />
          <img
            src={aboutBride}
            alt="Bride with elegant low bun and pink roses"
            width={1024}
            height={1024}
            loading="lazy"
            className="relative rounded-[2rem] object-cover shadow-[0_20px_50px_-24px_rgba(150,80,110,0.5)] ring-4 ring-white/70"
          />
          <div className="absolute bottom-4 right-3 rounded-2xl bg-white/70 px-4 py-2 text-right backdrop-blur-sm">
            <p className="text-script text-xl sm:text-2xl">Your Dream</p>
            <p className="text-script text-xl sm:text-2xl">Look, Our Passion</p>
            <HeartIcon className="ml-auto h-5 w-5 text-primary" />
          </div>
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="px-3 pt-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Our Services" title="Bridal Beauty Services" />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
          {SERVICE_CARDS.map(({ title, img, service }) => (
            <Link
              key={title}
              to={`/book?service=${encodeURIComponent(service)}`}
              className="group glass-panel overflow-hidden !rounded-3xl pb-5 transition-transform hover:-translate-y-1"
            >
              <img
                src={img}
                alt={title}
                width={1024}
                height={1024}
                loading="lazy"
                decoding="async"
                className="h-36 w-full object-cover object-top sm:h-44"
              />
              <p className="mt-4 px-3 text-center text-[0.88rem] font-medium leading-snug text-foreground/90">
                {title}
              </p>
              <div className="mt-3 flex justify-center">
                <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="px-3 pt-16 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <SectionHeading eyebrow="Our Gallery" title="Real Brides. Beautiful Moments." />
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {GALLERY_PREVIEW.map(({ img, alt }) => (
            <Link key={alt} to="/gallery" className="group overflow-hidden rounded-2xl">
              <img
                src={img}
                alt={alt}
                width={1024}
                height={1024}
                loading="lazy"
                className="h-40 w-full object-cover object-top transition-transform duration-500 group-hover:scale-105 sm:h-52"
              />
            </Link>
          ))}
        </div>
        <div className="mt-8 flex justify-center">
          <Link to="/gallery" className="btn-outline">
            View Full Gallery
            <ArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}

function FeaturesStrip() {
  return (
    <section className="px-3 pt-14 sm:px-6">
      <div className="glass-panel mx-auto grid max-w-5xl grid-cols-2 gap-y-8 px-4 py-8 sm:grid-cols-4 sm:px-6">
        {FEATURES.map(({ Icon, title, sub }, i) => (
          <div
            key={title + sub}
            className={`flex flex-col items-center gap-2.5 text-center ${i % 2 === 0 ? "border-r border-primary/15" : ""} ${i === 1 ? "max-sm:border-r-0" : "sm:border-r sm:border-primary/15"} ${i < 2 ? "max-sm:border-b max-sm:border-primary/15 max-sm:pb-7" : ""} ${i === 2 ? "sm:border-r-0" : ""}`}
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-blush text-primary">
              <Icon className="h-7 w-7" />
            </span>
            <p className="text-[0.85rem] leading-snug text-foreground/90">
              {title}
              <br />
              <span className="text-foreground/95">{sub}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const [index, setIndex] = useState(0);
  const t = TESTIMONIALS[index] ?? TESTIMONIALS[0];

  return (
    <section className="px-3 pt-14 sm:px-6">
      <div className="glass-panel relative mx-auto max-w-3xl px-12 py-10 text-center sm:px-16">
        <button
          aria-label="Previous testimonial"
          onClick={() => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)}
          className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-primary transition-colors hover:bg-blush"
        >
          <ChevronLeft />
        </button>
        <button
          aria-label="Next testimonial"
          onClick={() => setIndex((i) => (i + 1) % TESTIMONIALS.length)}
          className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full text-primary transition-colors hover:bg-blush"
        >
          <ChevronRight />
        </button>
        <p className="font-display text-[1.02rem] italic leading-relaxed text-plum sm:text-lg">
          "{t.quote}"
        </p>
        <p className="mt-4 text-sm font-medium text-foreground/85">— {t.author} —</p>
        <div className="mt-5 flex justify-center gap-2">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              aria-label={`Testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className="flex h-11 w-11 items-center justify-center rounded-full"
            >
              <span
                className={`h-2 w-2 rounded-full transition-all ${i === index ? "scale-110 bg-primary" : "bg-primary/35"}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <Hero />
        <QuickServiceStrip />
        <AboutSection />
        <ServicesSection />
        <GallerySection />
        <FeaturesStrip />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
