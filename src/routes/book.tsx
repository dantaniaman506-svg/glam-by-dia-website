import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BookingForm, type BookingFormConfig } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "@/components/site/icons";
import { PROCESS_STEPS, SERVICES } from "@/lib/site";

const services: string[] = SERVICES.map((service) => service.bookingService);

const config: BookingFormConfig = {
  formType: "beauty",
  services,
  skinQuestion: true,
  askAdditionalPeople: true,
};

const faqs = [
  [
    "When is my appointment confirmed?",
    "We’ll contact you to confirm availability. Your appointment is secured once the deposit has been received.",
  ],
  [
    "What is the cancellation policy?",
    "Deposits are non-refundable for cancellations made within 14 days of the appointment. The remaining balance is due at least 7 days before your booking.",
  ],
  [
    "Does the price include travel?",
    "Travel fees may apply for mobile appointments. We’ll discuss and confirm any travel or accommodation costs before the booking is confirmed.",
  ],
];

export default function Book() {
  const [searchParams] = useSearchParams();
  const requestedService = searchParams.get("service");
  const [selectedService, setSelectedService] = useState<string>();

  useEffect(() => {
    if (!requestedService || !services.includes(requestedService)) return;

    setSelectedService(requestedService);
    const frame = window.requestAnimationFrame(() => {
      document.getElementById("booking-request-form")?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
    return () => window.cancelAnimationFrame(frame);
  }, [requestedService]);

  const chooseService = (service: string) => {
    setSelectedService(service);
    document.getElementById("booking-request-form")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero
          eyebrow="Your special day starts here"
          title="Book Makeup"
          script="& Hair"
          subtitle="Choose a service and share your date, venue and the look you love. We’ll reply with availability and the next steps."
        />

        <section className="px-3 pb-10 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <Reveal>
              <div className="glass-panel p-5 sm:p-7">
                <p className="eyebrow">Prices in AUD</p>
                <h2 className="heading-display mt-2 text-2xl">Choose your service</h2>

                <h3 className="mt-6 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Book directly
                </h3>
                <ul className="mt-3 grid gap-2.5">
                  {SERVICES.filter((service) => service.bookingType === "direct").map((service) => (
                    <li key={service.slug}>
                      <button
                        type="button"
                        aria-label={`Choose ${service.bookingService}`}
                        aria-pressed={selectedService === service.bookingService}
                        onClick={() => chooseService(service.bookingService)}
                        className="flex min-h-16 w-full items-center gap-3 rounded-2xl border border-primary/15 bg-white/70 px-4 py-3 text-left transition hover:border-primary/40 data-[selected=true]:border-primary data-[selected=true]:bg-secondary"
                        data-selected={selectedService === service.bookingService}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-sm font-semibold text-plum">
                            {service.title}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            {service.description}
                          </span>
                        </span>
                        <span className="shrink-0 font-display text-base font-semibold text-primary">
                          {service.price}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>

                <h3 className="mt-7 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                  Bridal enquiries
                </h3>
                <ul className="mt-3 grid gap-2.5">
                  {SERVICES.filter((service) => service.bookingType === "enquiry").map((service) => (
                    <li key={service.slug}>
                      <button
                        type="button"
                        aria-label={`Choose ${service.bookingService}`}
                        aria-pressed={selectedService === service.bookingService}
                        onClick={() => chooseService(service.bookingService)}
                        className="flex min-h-16 w-full items-center gap-3 rounded-2xl border border-primary/15 bg-white/70 px-4 py-3 text-left transition hover:border-primary/40 data-[selected=true]:border-primary data-[selected=true]:bg-secondary"
                        data-selected={selectedService === service.bookingService}
                      >
                        <span className="min-w-0 flex-1">
                          <span className="block font-display text-sm font-semibold text-plum">
                            {service.title}
                          </span>
                          <span className="mt-1 block text-xs text-muted-foreground">
                            Enquiry form — the team will confirm availability and details.
                          </span>
                        </span>
                        <span className="shrink-0 text-right font-display text-sm font-semibold text-primary">
                          {service.price}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                  Mobile travel fees are quoted separately. No payment is taken on this website.
                </p>
              </div>
              <div className="mt-4 rounded-2xl border border-primary/15 bg-white/65 p-5 text-sm leading-relaxed text-foreground/80">
                <p className="font-display text-lg font-semibold text-plum">Deposits & cancellation</p>
                <p className="mt-2">
                  A deposit is required to secure your booking. Deposits are non-refundable for
                  cancellations within 14 days. The remaining balance is due at least 7 days before
                  your appointment.
                </p>
              </div>
            </Reveal>

            <div>
              <Reveal delay={100}>
                <BookingForm
                  config={config}
                  selectedService={selectedService}
                  onServiceChange={(service) => setSelectedService(service || undefined)}
                />
              </Reveal>
              <Reveal delay={160}>
                <section className="mt-10">
                  <SectionTitle eyebrow="How it works" title="Your Journey With" script="Us" />
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">
                    {PROCESS_STEPS.map((step, index) => (
                      <article key={step.title} className="glass-panel p-4">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary font-display font-semibold text-primary">
                          {index + 1}
                        </span>
                        <h3 className="heading-display mt-3 text-base">{step.title}</h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-foreground/75">
                          {step.description}
                        </p>
                      </article>
                    ))}
                  </div>
                </section>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="px-3 pt-4 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionTitle eyebrow="Before you enquire" title="Booking" script="FAQs" />
            <Accordion type="single" collapsible className="mt-6 space-y-3">
              {faqs.map(([question, answer], index) => (
                <AccordionItem
                  key={question}
                  value={`booking-faq-${index}`}
                  className="glass-panel overflow-hidden border-0 px-5"
                >
                  <AccordionTrigger className="min-h-12 text-left font-display text-base text-plum hover:no-underline">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-foreground/80">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Want to compare all services first?{" "}
              <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/services">
                Explore services <ArrowRight className="inline h-4 w-4" />
              </Link>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
