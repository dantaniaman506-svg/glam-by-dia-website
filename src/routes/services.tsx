import { Brush, Crown, PackageCheck, Scissors, Sparkles, UsersRound } from "lucide-react";
import { Link } from "react-router-dom";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PageHero, SectionTitle, CtaBanner } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "@/components/site/icons";
import { SERVICES } from "@/lib/site";

const serviceIcons = [Brush, Crown, Sparkles, Scissors, Sparkles, Crown, UsersRound, PackageCheck];

export default function Services() {
  const directServices = SERVICES.filter((service) => service.bookingType === "direct");
  const enquiryServices = SERVICES.filter((service) => service.bookingType === "enquiry");

  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero
          eyebrow="Bridal and special occasions"
          title="Makeup & Hair"
          script="Made for You"
          subtitle="Professional makeup and hairstyling for weddings, parties and the moments you want to remember."
        />

        <section className="px-3 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="Book directly" title="Special Occasion" script="Services" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {directServices.map((service, index) => {
                const Icon = serviceIcons[index] ?? Sparkles;
                return (
                  <Reveal key={service.slug} delay={index * 70}>
                    <article className="glass-panel h-full p-5 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary ring-1 ring-primary/10 shadow-sm">
                          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                        </span>
                        <span className="font-display text-xl font-semibold text-plum">
                          {service.price}
                        </span>
                      </div>
                      <h2 className="heading-display mt-4 text-xl">{service.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                        {service.description}
                      </p>
                      <Link
                        to={`/book?service=${encodeURIComponent(service.bookingService)}`}
                        className="btn-outline mt-5"
                      >
                        Book this service
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </article>
                  </Reveal>
                );
              })}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Prices are in AUD. Travel fees may apply for mobile appointments.
            </p>
          </div>
        </section>

        <section className="px-3 pt-14 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionTitle
              eyebrow="Enquire for bridal bookings"
              title="Wedding Day"
              script="Services"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {enquiryServices.map((service, index) => {
                const Icon = serviceIcons[index + directServices.length] ?? Sparkles;
                return (
                  <Reveal key={service.slug} delay={index * 70}>
                    <article className="glass-panel h-full p-5 sm:p-7">
                      <div className="flex items-start justify-between gap-4">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary ring-1 ring-primary/10 shadow-sm">
                          <Icon aria-hidden="true" className="h-6 w-6" strokeWidth={1.8} />
                        </span>
                        <span className="font-display text-lg font-semibold text-plum">
                          {service.price}
                        </span>
                      </div>
                      <h2 className="heading-display mt-4 text-xl">{service.title}</h2>
                      <p className="mt-2 text-sm leading-relaxed text-foreground/80">
                        {service.description}
                      </p>
                      <Link
                        to={`/book?service=${encodeURIComponent(service.bookingService)}`}
                        className="btn-primary mt-5"
                      >
                        Send an enquiry
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </article>
                  </Reveal>
                );
              })}
            </div>
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Bridal services are quoted by enquiry. The team will confirm your date and
              personalised quote.
            </p>
          </div>
        </section>

        <CtaBanner>
          Booking for a group? Tell us how many people need makeup or hairstyling and we’ll plan the
          timing with you.
        </CtaBanner>
      </main>
      <Footer />
    </div>
  );
}
