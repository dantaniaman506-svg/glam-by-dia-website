import { Link } from "react-router-dom";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero, SectionTitle, CtaBanner } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight, HennaHandIcon, GraduationIcon } from "@/components/site/icons";
import { SERVICES, TESTIMONIALS } from "@/lib/site";

import serviceHairDown from "@/assets/service-hair-down.jpg";
import serviceHairUp from "@/assets/service-hair-up.jpg";
import serviceMakeupOnly from "@/assets/service-makeup-only.jpg";
import serviceHairstyleOnly from "@/assets/service-hairstyle-only.jpg";
import galleryBunVeil from "@/assets/gallery-bun-veil.jpg";
import galleryIndian from "@/assets/gallery-indian-bride.jpg";
import galleryVeil from "@/assets/gallery-veil-bride.jpg";

const SERVICE_IMAGES: Record<string, string | undefined> = {
  "hair-down": serviceHairDown,
  "hair-up": serviceHairUp,
  "makeup-only": serviceMakeupOnly,
  "hairstyle-only": serviceHairstyleOnly,
  "bridal-package": galleryBunVeil,
  "wedding-trial": galleryVeil,
  "groom-touchup": galleryIndian,
};

const EXTRAS = [
  {
    Icon: HennaHandIcon,
    title: "Henna Service",
    text: "Intricate bridal and guest mehndi, designed for your celebration — mobile across Melbourne.",
    to: "/henna",
  },
  {
    Icon: GraduationIcon,
    title: "Self-Makeup Class",
    text: "Learn to do your own makeup like a pro in a relaxed, hands-on one-on-one or group class.",
    to: "/self-makeup-class",
  },
];

export default function Services() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero
          eyebrow="Our Services"
          title="Bridal Beauty,"
          script="Tailored to You"
          subtitle="Mobile bridal hair and makeup across Melbourne, from soft romantic looks to full glam — plus trials, packages and groom touch-ups."
        />

        <section className="px-3 sm:px-6">
          <div className="mx-auto max-w-5xl space-y-5">
            {SERVICES.map((s, i) => {
              const img = SERVICE_IMAGES[s.slug];
              return (
                <Reveal key={s.slug} delay={Math.min(i * 60, 240)}>
                  <article className="glass-panel grid h-full overflow-hidden sm:grid-cols-[240px_1fr]">
                    <div className="relative h-44 sm:h-auto">
                      <img
                        src={img}
                        alt={s.title}
                        width={1024}
                        height={1024}
                        loading="lazy"
                        className="absolute inset-0 h-full w-full object-cover object-top"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/25 to-transparent sm:bg-gradient-to-r" />
                    </div>
                    <div className="flex flex-col p-6 sm:p-7">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="heading-display text-xl sm:text-2xl">{s.title}</h2>
                        <span className="rounded-full bg-secondary px-4 py-1 font-display text-lg font-semibold text-secondary-foreground shadow-sm">
                          {s.price}
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-relaxed text-foreground/80 sm:text-[0.95rem]">
                        {s.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between gap-3 sm:justify-start sm:gap-6">
                        <Link
                          to="/book"
                          className="btn-primary !px-5 !py-2.5 !text-[0.85rem]"
                        >
                          Book This Look
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                        <a href="tel:+61478666466" className="text-sm font-medium text-primary hover:underline">
                          Ask a question
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </section>

        <section className="px-3 pt-16 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="More Ways to Glow" title="Also From" script="Glam by Dia" />
            <div className="mt-9 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {EXTRAS.map(({ Icon, title, text, to }, i) => (
                <Reveal key={title} delay={i * 90}>
                  <Link to={to} className="glass-panel group flex h-full items-start gap-4 p-6 transition-transform hover:-translate-y-1">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-blush text-primary transition-transform group-hover:scale-105">
                      <Icon className="h-8 w-8" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-plum">
                        {title}
                        <ArrowRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-foreground/80">{text}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="px-3 pt-16 sm:px-6">
          <div className="glass-panel relative mx-auto max-w-3xl px-10 py-10 text-center sm:px-16">
            <p className="font-display text-[1.02rem] italic leading-relaxed text-plum sm:text-lg">
              "{TESTIMONIALS[1].quote}"
            </p>
            <p className="mt-4 text-sm font-medium text-foreground/85">— {TESTIMONIALS[1].author} —</p>
          </div>
        </section>

        <CtaBanner>Not sure which service fits your day? Call us — we'll help you build the perfect package.</CtaBanner>
      </main>
      <Footer />
    </div>
  );
}

