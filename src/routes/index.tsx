import { Brush, Crown, Scissors, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

import { Footer } from "@/components/site/Footer";
import { GoogleReviewsMarquee } from "@/components/site/GoogleReviewsMarquee";
import { Header } from "@/components/site/Header";
import { ArrowRight, CarIcon, HeartIcon, PinIcon, ShieldIcon } from "@/components/site/icons";
import { BlankImageSlot } from "@/components/site/BlankImageSlot";
import { Reveal } from "@/components/site/Reveal";
import { BRIDAL_BOOKING_SERVICES, SERVICES, SITE } from "@/lib/site";

const QUICK_SERVICES = [
  { title: "Makeup with hair down", service: BRIDAL_BOOKING_SERVICES.hairDown },
  { title: "Makeup with hair up", service: BRIDAL_BOOKING_SERVICES.hairUp },
  { title: "Makeup only", service: BRIDAL_BOOKING_SERVICES.makeupOnly },
  { title: "Hairstyle only", service: BRIDAL_BOOKING_SERVICES.hairstyleOnly },
  { title: "Bridal Makeup & Hair", service: BRIDAL_BOOKING_SERVICES.bridalMakeupHair },
];

const FEATURES = [
  { Icon: CarIcon, title: "Mobile Service", sub: "Across Melbourne" },
  { Icon: PinIcon, title: "Studio", sub: "Clayton South" },
  { Icon: ShieldIcon, title: "Professional", sub: "Qualified Artists" },
  { Icon: HeartIcon, title: "Personalised", sub: "Beauty Looks" },
];

function Hero() {
  return (
    <section className="px-4 pb-6 pt-5 text-center sm:px-6 sm:pb-10 sm:pt-8">
      <BlankImageSlot
        label="Reserved for a client-approved hero photo"
        className="mx-auto aspect-[0.94] w-full max-w-[34rem] md:aspect-[2/1] md:max-w-5xl"
      />
      <div className="mx-auto mt-8 max-w-4xl">
        <p className="eyebrow">Melbourne bridal and special occasion beauty</p>
        <h1 className="heading-display mt-5 text-4xl sm:text-6xl">
          Glam by Dia
          <span className="text-script mt-1 block text-3xl sm:text-5xl">
            Makeup &amp; Hair, Made for You
          </span>
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-foreground/80 sm:text-lg">
          Look beautiful, feel unforgettable. Professional makeup and hairstyling for weddings,
          celebrations and the moments that matter.
        </p>
        <p className="mt-4 text-sm font-medium text-plum">
          Studio in Clayton South · Mobile across Melbourne
        </p>
      </div>
    </section>
  );
}

function QuickServiceStrip() {
  return (
    <section className="px-3 pt-3 sm:px-6">
      <div className="mx-auto max-w-5xl">
        <p className="eyebrow mb-3 text-center">Bridal &amp; Occasion Services</p>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 lg:gap-3">
          {QUICK_SERVICES.map(({ title, service }, index) => (
            <Link
              key={title}
              to={`/book?service=${encodeURIComponent(service)}`}
              aria-label={`View ${title} service`}
              className={`group overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/75 text-center shadow-[0_16px_38px_-25px_rgba(120,58,82,0.45)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_42px_-24px_rgba(120,58,82,0.5)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                index === QUICK_SERVICES.length - 1
                  ? "max-sm:col-span-2 max-sm:mx-auto max-sm:w-1/2"
                  : ""
              }`}
            >
              <BlankImageSlot
                label={`Reserved for ${title} photo`}
                tone="lightGrey"
                className="aspect-[1.55] w-full rounded-none border-0"
              />
              <span className="flex min-h-[3.5rem] items-center justify-center gap-1.5 px-2 py-2 lg:min-h-[4.25rem] lg:gap-2 lg:px-2 lg:py-3">
                <span className="text-[0.8rem] font-medium leading-snug text-foreground/90 lg:text-[0.8rem]">
                  {title}
                </span>
                <ArrowRight className="h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="px-4 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-[0.8fr_1.2fr] sm:items-center">
        <Reveal>
          <div className="glass-panel flex min-h-56 flex-col justify-center p-7 text-center sm:min-h-72 sm:p-10">
            <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
              <HeartIcon className="h-7 w-7" />
            </span>
            <p className="text-script mt-4 text-3xl sm:text-4xl">Feel like yourself</p>
            <p className="mt-2 text-sm text-muted-foreground">Just a little more unforgettable.</p>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div>
            <p className="eyebrow">About Us</p>
            <h2 className="heading-display mt-3 text-3xl sm:text-4xl">
              More Than Just
              <span className="text-script ml-2">Makeup &amp; Hair</span>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
              Glam by Dia is a Melbourne-based mobile bridal beauty team specialising in bridal
              makeup and hair. With a studio in Clayton South, we travel across Melbourne and
              surrounding suburbs to provide professional beauty services at your home, hotel or
              wedding venue.
            </p>
            <Link to="/about" className="btn-outline mt-6">
              Meet the team
              <ArrowRight />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesSection() {
  const services = SERVICES.filter((service) => service.bookingType === "direct");
  const icons = [Brush, Crown, Sparkles, Scissors];

  return (
    <section className="px-3 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <p className="eyebrow">Our Services</p>
          <h2 className="heading-display mt-2 text-3xl sm:text-4xl">
            Bridal &amp; Occasion Beauty
          </h2>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          {services.map((service, index) => {
            const Icon = icons[index] ?? Sparkles;
            return (
              <Reveal key={service.slug} delay={index * 60}>
                <Link
                  to={`/book?service=${encodeURIComponent(service.bookingService)}`}
                  className="glass-panel group flex h-full min-h-44 items-start gap-4 p-5 transition hover:-translate-y-1 sm:p-6"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-baseline justify-between gap-2">
                      <span className="heading-display text-lg">{service.title}</span>
                      <span className="font-display text-lg font-semibold text-primary">
                        {service.price}
                      </span>
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-foreground/75">
                      {service.description}
                    </span>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                      Choose service
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-7 flex justify-center">
          <Link to="/book" className="btn-primary min-w-48">
            Book Now
            <ArrowRight />
          </Link>
        </div>
        <p className="mt-3 text-center text-xs text-muted-foreground">
          Prices are in AUD. Bridal trials are $200; bridal makeup and hair starts from $300.
        </p>
      </div>
    </section>
  );
}

function FeaturesStrip() {
  return (
    <section className="px-3 pt-14 sm:px-6 sm:pt-20">
      <div className="glass-panel mx-auto grid max-w-5xl grid-cols-2 gap-y-5 p-5 sm:grid-cols-4 sm:p-7">
        {FEATURES.map(({ Icon, title, sub }, index) => (
          <div
            key={`${title}-${sub}`}
            className={`flex flex-col items-center gap-2 px-2 text-center ${
              index < 3 ? "sm:border-r sm:border-primary/15" : ""
            } ${index === 0 || index === 2 ? "max-sm:border-r max-sm:border-primary/15" : ""} ${
              index < 2 ? "max-sm:border-b max-sm:border-primary/15 max-sm:pb-4" : ""
            }`}
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <p className="text-sm font-medium leading-snug text-foreground/90">
              {title}
              <br />
              <span className="font-normal">{sub}</span>
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function ReviewsAndInstagram() {
  return (
    <section className="px-3 pt-14 sm:px-6 sm:pt-20">
      <div className="mx-auto max-w-5xl">
        <GoogleReviewsMarquee />
        <article className="glass-panel mt-4 p-6 text-center sm:p-8">
          <p className="eyebrow">Follow for the latest</p>
          <h2 className="heading-display mt-2 text-2xl">Glam by Dia on Instagram</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-relaxed text-foreground/75">
            Find the latest looks and updates directly on our Instagram profile.
          </p>
          <div className="mx-auto mt-5 grid w-full max-w-xs grid-cols-3 gap-1.5">
            {Array.from({ length: 6 }, (_, index) => (
              <BlankImageSlot
                key={index}
                label={`Reserved for Instagram post ${index + 1}`}
                className="aspect-square rounded-lg"
              />
            ))}
          </div>
          <a href={SITE.instagram} target="_blank" rel="noreferrer" className="btn-primary mt-5">
            Follow {SITE.instagramHandle}
            <ArrowRight />
          </a>
        </article>
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
        <FeaturesStrip />
        <ReviewsAndInstagram />
      </main>
      <Footer />
    </div>
  );
}
