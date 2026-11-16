import { useState } from "react";
import { Link } from "react-router-dom";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PageHero, SectionTitle, CtaBanner } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, HeartIcon, PinIcon, ShieldIcon, UsersIcon } from "@/components/site/icons";
import { FAQS, SITE } from "@/lib/site";

const REASONS = [
  "Experienced and professional beauty artists",
  "Convenient mobile makeup and hairstyling services",
  "Personalised beauty experiences",
  "Luxury service and attention to detail",
  "Friendly and responsive communication",
  "Reliable and organised booking processes",
  "Flexible artist availability",
  "Consistent quality and professional standards",
];

const VALUES = [
  { Icon: ShieldIcon, title: "Experienced", text: "Over 10 years of industry experience." },
  { Icon: HeartIcon, title: "Personalised", text: "Looks shaped around your features and preferences." },
  { Icon: PinIcon, title: "Mobile", text: "Convenient service at your home, hotel or venue." },
  { Icon: UsersIcon, title: "A flexible team", text: "Artists available for individual and group bookings." },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-panel overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-expanded={open}
        className="flex min-h-14 w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-display text-base font-medium text-plum sm:text-lg">{q}</span>
        <span
          aria-hidden="true"
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-primary transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          >
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div className="grid transition-[grid-template-rows] duration-300" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-foreground/80">{a}</p>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero
          eyebrow="About Glam by Dia"
          title="Beauty that celebrates"
          script="you"
          subtitle="A Melbourne beauty team bringing care, experience and a personal touch to every occasion."
        />

        <section className="px-4 sm:px-6">
          <Reveal className="glass-panel mx-auto max-w-4xl p-6 sm:p-10">
            <p className="eyebrow">About Us</p>
            <h2 className="heading-display mt-2 text-2xl sm:text-3xl">Welcome to Glam by Dia!</h2>
            <div className="mt-5 space-y-4 text-sm leading-relaxed text-foreground/80 sm:text-base">
              <p>
                I’m Diya, the founder of Glam by Dia, a Melbourne-based beauty business specialising
                in bridal and special occasion makeup and hairstyling.
              </p>
              <p>
                At Glam by Dia, we believe beauty is about more than just makeup. It’s about
                embracing your individuality, enhancing your natural features and feeling confident
                in your own skin.
              </p>
              <p>
                We are a team of highly qualified and talented makeup artists and hairstylists,
                bringing over 10 years of industry experience. Our passion lies in creating
                beautiful, personalised looks that make every client feel confident, elegant and
                their absolute best.
              </p>
              <p>
                Whether you’re preparing for your wedding day, a special celebration or an important
                milestone, we are committed to making your beauty experience enjoyable, seamless and
                memorable.
              </p>
            </div>
          </Reveal>
        </section>

        <section className="px-3 pt-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="Why choose us" title="Why Choose Glam by" script="Dia?" />
            <div className="mt-7 grid gap-3 sm:grid-cols-2">
              {VALUES.map(({ Icon, title, text }, index) => (
                <Reveal key={title} delay={index * 55}>
                  <article className="glass-panel flex h-full items-start gap-4 p-5">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="heading-display text-lg">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-foreground/75">{text}</p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
            <ul className="glass-panel mt-4 grid gap-2 p-5 text-sm text-foreground/80 sm:grid-cols-2 sm:p-7">
              {REASONS.map((reason) => (
                <li key={reason} className="flex items-start gap-2.5">
                  <span className="mt-1 text-primary" aria-hidden="true">•</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <p className="mx-auto mt-7 max-w-3xl text-center text-sm leading-relaxed text-foreground/80 sm:text-base">
              We are proud to have been part of thousands of special moments, helping clients look
              and feel their best. We look forward to being part of yours!
            </p>
          </div>
        </section>

        <section id="faqs" className="px-3 pt-14 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionTitle eyebrow="Helpful details" title="Frequently Asked" script="Questions" />
            <div className="mt-7 space-y-3">
              {FAQS.map((faq, index) => (
                <Reveal key={faq.q} delay={Math.min(index * 25, 180)}>
                  <FaqItem q={faq.q} a={faq.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-3 pt-14 sm:px-6">
          <div className="glass-panel mx-auto max-w-4xl p-6 text-center sm:p-8">
            <p className="eyebrow">Visit the studio</p>
            <h2 className="heading-display mt-2 text-2xl">Clayton South, Melbourne</h2>
            <a
              href={SITE.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-outline mt-5"
            >
              {SITE.address}
              <ArrowRight className="h-4 w-4" />
            </a>
            <p className="mt-3 text-xs text-muted-foreground">Tap the address for Google Maps directions.</p>
          </div>
        </section>

        <CtaBanner>
          We’d love to be part of your day. Share your plans and we’ll help you choose a look.
        </CtaBanner>
        <div className="flex justify-center px-3 pt-5">
          <Link to="/book" className="btn-primary">
            Send a booking enquiry
            <ArrowRight />
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}
