import { Brush, Flower2, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ArrowRight } from "@/components/site/icons";
import { PageHero } from "@/components/site/PageHero";
import { playBridalChime } from "@/lib/bridal-chime";

const bookingOptions = [
  {
    title: "Book Makeup & Hair",
    eyebrow: "Bridal beauty",
    description: "Bridal makeup, hairstyling and trials, tailored to your special day.",
    to: "/book",
    Icon: Brush,
  },
  {
    title: "Henna Service",
    eyebrow: "Henna & mehndi",
    description: "Traditional bridal and party henna, designed just for you.",
    to: "/henna",
    Icon: Flower2,
  },
  {
    title: "Self-Makeup Class",
    eyebrow: "Learn with Dia",
    description: "Personal makeup lessons to help you create looks with confidence.",
    to: "/self-makeup-class",
    Icon: GraduationCap,
  },
] as const;

export default function BookingOptions() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero
          eyebrow="Begin your booking"
          title="Choose your"
          script="beauty service"
          subtitle="Select what you’re looking for and we’ll take you to the right booking form."
        />

        <section className="px-3 pb-14 sm:px-6 sm:pb-20">
          <div className="mx-auto grid max-w-5xl gap-4 md:grid-cols-3">
            {bookingOptions.map(({ title, eyebrow, description, to, Icon }) => (
              <Link
                key={to}
                to={to}
                onClick={playBridalChime}
                className="group relative flex min-h-[230px] flex-col overflow-hidden rounded-[1.8rem] border border-white/80 bg-white/75 p-6 shadow-[0_18px_45px_-25px_rgba(150,80,110,0.38)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_-24px_rgba(150,80,110,0.48)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <span
                  aria-hidden="true"
                  className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl transition group-hover:bg-primary/15"
                />
                <span className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F35B85]/15 to-[#E23F72]/25 text-[#E23F72] ring-1 ring-white/80">
                  <Icon aria-hidden="true" className="h-7 w-7" strokeWidth={1.7} />
                </span>
                <span className="relative mt-6">
                  <span className="eyebrow">{eyebrow}</span>
                  <span className="heading-display mt-1 block text-2xl leading-tight text-plum">
                    {title}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-foreground/75">
                    {description}
                  </span>
                </span>
                <span className="relative mt-auto flex min-h-11 items-end justify-between pt-5 text-sm font-semibold text-primary">
                  Continue
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-center text-sm text-muted-foreground">
            Want to compare everything first?{" "}
            <Link
              to="/services"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Explore all services
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
