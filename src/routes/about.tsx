import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero, SectionTitle, CtaBanner } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { HeartIcon, SparkleIcon, PinIcon, UsersIcon } from "@/components/site/icons";
import { FAQS, PROCESS_STEPS, SITE } from "@/lib/site";

import aboutBride from "@/assets/about-bride.jpg";
import galleryPearl from "@/assets/gallery-pearl-bride.jpg";
import galleryFlowerCrown from "@/assets/gallery-flower-crown.jpg";

const VALUES = [
  {
    Icon: HeartIcon,
    title: "Made for you",
    text: "Every look is designed around your features, your outfit and the way you want to feel.",
  },
  {
    Icon: SparkleIcon,
    title: "Calm & caring",
    text: "Wedding mornings should feel slow and happy. We bring the calm, the playlist vibes and the details.",
  },
  {
    Icon: PinIcon,
    title: "We come to you",
    text: "Home, hotel or venue — across Melbourne and surrounding suburbs, on your schedule.",
  },
  {
    Icon: UsersIcon,
    title: "The whole party",
    text: "From the bride to the bridesmaids and mums, everyone is timed, polished and photo-ready.",
  },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="glass-panel overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="font-display text-[1.02rem] font-medium text-plum">{q}</span>
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blush text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>
      </button>
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-foreground/80">{a}</p>
        </div>
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero
          eyebrow="About Glam by Dia"
          title="Meet the Artist Behind"
          script="the Glam"
          subtitle="A Melbourne bridal beauty team devoted to one thing — making you feel like the most beautiful, confident version of yourself."
        />

        <section className="px-3 pt-6 sm:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-2">
            <Reveal>
              <div className="relative">
                <div className="blush-blob absolute -inset-3 -z-0 -rotate-2 sm:-inset-5" />
                <img
                  src={aboutBride}
                  alt="Bride with elegant low bun and pink roses"
                  width={1024}
                  height={1024}
                  loading="lazy"
                  className="relative rounded-[2rem] object-cover shadow-[0_20px_50px_-24px_rgba(150,80,110,0.5)] ring-4 ring-white/70"
                />
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div>
                <SectionTitle eyebrow="Our Story" title="Where It" script="Began" align="left" />
                <p className="mt-5 text-sm leading-relaxed text-foreground/85 sm:text-[0.95rem]">
                  Glam by Dia began with a simple love of making people feel beautiful on the days
                  that matter most. What started as one artist with a kit and a dream has grown into
                  a trusted mobile bridal team, travelling across Melbourne for weddings, engagements
                  and every celebration in between.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-foreground/85 sm:text-[0.95rem]">
                  With a studio in Clayton South as our home base, we bring professional bridal hair,
                  makeup and henna straight to you — so your morning is relaxed, your photos are
                  stunning and your look lasts from first look to last dance.
                </p>
                <p className="text-script mt-5 text-3xl">Look Beautiful, Feel Unforgettable</p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-3 pt-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="Why Brides Choose Us" title="Little Things That Make a" script="Big Day" />
            <div className="mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {VALUES.map(({ Icon, title, text }, i) => (
                <Reveal key={title} delay={i * 80}>
                  <div className="glass-panel flex h-full items-start gap-4 p-6">
                    <span className="flex h-13 w-13 shrink-0 items-center justify-center rounded-full bg-blush text-primary">
                      <Icon className="h-7 w-7" />
                    </span>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-plum">{title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-3 pt-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="How It Works" title="Your Journey With" script="Us" />
            <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:gap-5">
              {PROCESS_STEPS.map((step, i) => (
                <Reveal key={step.title} delay={i * 100}>
                  <div className="glass-panel relative h-full p-6 text-center">
                    <span className="text-script mx-auto -mt-9 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[oklch(0.72_0.1_8)] to-[oklch(0.6_0.13_352)] text-2xl text-white shadow-lg">
                      {i + 1}
                    </span>
                    <h3 className="heading-display mt-4 text-xl">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">{step.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-3 pt-16 sm:px-6">
          <div className="mx-auto grid max-w-5xl items-center gap-10 sm:grid-cols-2">
            <Reveal className="order-2 sm:order-1">
              <div className="relative">
                <img
                  src={galleryPearl}
                  alt="Bride with soft glam makeup and pearl headpiece"
                  width={1056}
                  height={1408}
                  loading="lazy"
                  className="rounded-[2rem] object-cover shadow-[0_20px_50px_-24px_rgba(150,80,110,0.5)] ring-4 ring-white/70"
                />
                <div className="absolute -bottom-5 -right-3 rotate-2 rounded-2xl bg-white/85 px-5 py-3 shadow-lg backdrop-blur-sm sm:right-6">
                  <p className="text-script text-2xl">Every detail,</p>
                  <p className="text-script text-2xl">perfected.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={120} className="order-1 sm:order-2">
              <div>
                <SectionTitle eyebrow="Our Promise" title="Professional, Warm and" script="All Yours" align="left" />
                <ul className="mt-6 space-y-3">
                  {[
                    "Qualified, experienced bridal artists",
                    "Premium, long-wear products for every skin type",
                    "Hygienic kits and sanitised brushes, always",
                    "Punctual, organised and calm on your wedding morning",
                    "Mobile across Melbourne — we come to you",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-foreground/85 sm:text-[0.95rem]">
                      <span className="mt-0.5 flex h-5.5 w-5.5 shrink-0 items-center justify-center rounded-full bg-blush text-primary">
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                          <path d="m5 13 4 4 10-11" />
                        </svg>
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link to="/book" className="btn-primary mt-8">
                  Book Your Date
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="px-3 pt-16 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionTitle eyebrow="Good to Know" title="Frequently Asked" script="Questions" />
            <div className="mt-9 space-y-3">
              {FAQS.map((f, i) => (
                <Reveal key={f.q} delay={i * 60}>
                  <FaqItem q={f.q} a={f.a} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-3 pt-16 sm:px-6">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] shadow-[0_20px_50px_-24px_rgba(150,80,110,0.5)] ring-4 ring-white/70">
            <img
              src={galleryFlowerCrown}
              alt="Bride with pink rose and baby's breath hair piece"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-64 w-full object-cover object-top sm:h-80"
            />
          </div>
          <p className="text-script mt-6 text-center text-3xl">We can't wait to meet you</p>
          <p className="mt-2 text-center text-sm text-muted-foreground">
            Studio: {SITE.address} · Mobile across Melbourne
          </p>
        </section>

        <CtaBanner />
      </main>
      <Footer />
    </div>
  );
}

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Glam by Dia | Bridal Makeup & Hair Artist Melbourne" },
      {
        name: "description",
        content:
          "Meet Glam by Dia — a Melbourne-based mobile bridal hair, makeup and henna team with a studio in Clayton South. Our story, our promise and how we work with every bride.",
      },
      { property: "og:title", content: "About Glam by Dia | Bridal Makeup & Hair Artist Melbourne" },
      {
        property: "og:description",
        content: "A Melbourne bridal beauty team devoted to making you feel unforgettable on your wedding day.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: About,
});
