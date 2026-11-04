import { Link } from "react-router-dom";
import { ArrowRight, PinIcon } from "@/components/site/icons";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { InquiryForm } from "@/components/site/InquiryForm";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

const directionsUrl = "https://www.google.com/maps/search/?api=1&query=52+Oakes+Avenue%2C+Clayton+South+VIC+3169";
const mapUrl = "https://maps.google.com/maps?q=52%20Oakes%20Avenue%2C%20Clayton%20South%20VIC%203169&output=embed";

export default function Contact() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero eyebrow="We’d love to hear from you" title="Let’s make" script="something beautiful" subtitle="Ask a question, share your plans or tell us about the look you have in mind. Dia will be happy to help." />
        <section className="px-3 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <div className="space-y-4">
                <div className="glass-panel p-6 sm:p-7">
                  <p className="eyebrow">Get in touch</p>
                  <h2 className="heading-display mt-2 text-2xl">Glam by Dia Studio</h2>
                  <div className="mt-5 space-y-4 text-sm">
                    <a className="flex min-h-11 items-center gap-3 rounded-xl px-2 hover:bg-blush/70" href="tel:+61478666466"><span className="text-primary">☎</span><span>{SITE.phoneDisplay}</span></a>
                    <a className="flex min-h-11 items-center gap-3 rounded-xl px-2 hover:bg-blush/70" href={`mailto:${SITE.email}`}><span className="text-primary">✉</span><span className="break-all">{SITE.email}</span></a>
                    <a className="flex min-h-11 items-center gap-3 rounded-xl px-2 hover:bg-blush/70" href={SITE.instagram} target="_blank" rel="noreferrer"><span className="text-primary">◎</span><span>@glam_bydia</span></a>
                    <a className="flex min-h-11 items-start gap-3 rounded-xl px-2 py-2 hover:bg-blush/70" href={directionsUrl} target="_blank" rel="noreferrer"><PinIcon className="mt-0.5 h-5 w-5 shrink-0" /><span>52 Oakes Avenue, Clayton South, 3169, Melbourne</span></a>
                  </div>
                  <a href={directionsUrl} target="_blank" rel="noreferrer" className="btn-outline mt-6 min-h-11 w-full">
                    Get directions <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
                <div className="overflow-hidden rounded-[1.6rem] border border-white/75 shadow-[0_18px_44px_-22px_rgba(150,80,110,0.28)]">
                  <iframe title="Map to Glam by Dia Studio in Clayton South" src={mapUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-64 w-full border-0 sm:h-72" />
                </div>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <p className="eyebrow">Send Dia a note</p>
                <h2 className="heading-display mb-5 mt-2 text-2xl">How can we help?</h2>
                <InquiryForm />
                <p className="mt-4 text-center text-sm text-muted-foreground">Ready to choose a date? <Link className="font-medium text-primary underline-offset-4 hover:underline" to="/book">Start a booking request</Link>.</p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
