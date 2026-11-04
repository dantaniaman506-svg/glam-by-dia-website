import { Link } from "react-router-dom";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookingForm, type BookingFormConfig } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

const config: BookingFormConfig = {
  formType: "beauty",
  services: [
    "Makeup with hair down ($170)",
    "Makeup with hair up ($210)",
    "Makeup only ($130)",
    "Hairstyle only ($90)",
    "Bridal Trial ($150)",
  ],
  skinQuestion: true,
};

const faqs = [
  ["When is my appointment confirmed?", "We’ll contact you to confirm availability and send a quote. Your date is secured once the booking details and deposit are agreed."],
  ["Do you travel to my venue?", "Yes. Glam by Dia travels across Melbourne and surrounding suburbs. A travel fee may apply; share your location and Dia will include a quote."],
  ["What is the cancellation policy?", "A minimum deposit is required to secure your booking. The deposit is non-refundable for cancellations within 14 days, and the remaining balance is due 7 days before your booking."],
  ["Can I have a trial before my wedding?", "Absolutely. Choose Bridal Trial in the form and share your wedding date and inspiration in the notes."],
];

export default function Book() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero eyebrow="Your special day starts here" title="Book Your" script="Bridal Glam" subtitle="Share a few details about your date and the look you love. Dia will be in touch to check availability and plan your appointment." />
        <section className="px-3 pb-10 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <div className="space-y-5">
                <div className="glass-panel p-6 sm:p-7">
                  <p className="eyebrow">Bridal beauty pricing</p>
                  <ul className="mt-4 space-y-3 text-sm">
                    {config.services.map((service) => {
                      const [name, price] = service.split(" ($");
                      return <li key={service} className="flex justify-between gap-3 border-b border-primary/10 pb-3"><span>{name}</span><span className="shrink-0 font-medium text-primary">${price?.replace(")", "")}</span></li>;
                    })}
                  </ul>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Prices are in AUD. Travel fees may apply for mobile appointments.</p>
                </div>
                <div className="rounded-[1.5rem] border border-primary/15 bg-secondary/60 p-5 text-sm leading-relaxed text-foreground/80">
                  <p className="font-display text-lg font-semibold text-plum">A note about deposits</p>
                  <p className="mt-2">A minimum deposit is required to secure your booking. Deposits are non-refundable for cancellations within 14 days. The remaining balance is due 7 days before the appointment.</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}><BookingForm config={config} /></Reveal>
          </div>
        </section>
        <section className="px-3 pt-6 sm:px-6">
          <div className="mx-auto max-w-3xl">
            <SectionTitle eyebrow="Before you enquire" title="A few little" script="FAQs" />
            <Accordion type="single" collapsible className="mt-7 space-y-3">
              {faqs.map(([question, answer], index) => (
                <AccordionItem key={question} value={`faq-${index}`} className="glass-panel overflow-hidden border-0 px-5">
                  <AccordionTrigger className="min-h-12 text-left font-display text-base text-plum hover:no-underline">{question}</AccordionTrigger>
                  <AccordionContent className="pb-5 text-sm leading-relaxed text-foreground/80">{answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <p className="mt-6 text-center text-sm text-muted-foreground">Looking for another service? <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/services">See all services</Link>.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
