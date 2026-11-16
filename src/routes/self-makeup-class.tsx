import { Brush, Check, Sparkles } from "lucide-react";

import { BookingForm, type BookingFormConfig } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PageHero, SectionTitle } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

const config: BookingFormConfig = {
  formType: "class",
  services: [
    "1-on-1 Masterclass (2.5 hrs - $250)",
    "Duo Masterclass (Bring a friend - $400)",
    "Online Consultation (1 hr - $100)",
  ],
  skillsQuestion: "What specific skills or makeup looks do you want to learn?",
};

const lessons = [
  ["Skin prep", "Build a comfortable, lasting base that works with your skin and products."],
  ["Flawless base", "Find your foundation match and learn blending, concealing and setting."],
  ["Eye techniques", "Explore eye looks, liner and lashes that suit your features."],
  ["Day-to-night transition", "Turn a fresh everyday look into a polished evening look."],
  ["Product recommendations", "Make the most of the products you own and learn what is worth adding."],
];

export default function SelfMakeupClass() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero
          eyebrow="Learn at your own pace"
          title="Makeup, made"
          script="yours"
          subtitle="A relaxed one-on-one class to help you feel confident doing your own makeup, using the products you already have."
        />
        <section className="px-3 pt-2 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="Your lesson" title="A practical little" script="masterclass" />
            <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.map(([title, description], index) => (
                <Reveal key={title} delay={index * 55}>
                  <article className="glass-panel h-full p-5 sm:p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary font-display text-lg text-primary">
                      {index + 1}
                    </span>
                    <h2 className="heading-display mt-4 text-lg">{title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">{description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-5 text-center text-sm leading-relaxed text-foreground/80">
              Bring your makeup bag — there’s no need to buy a new kit before class.
            </p>
          </div>
        </section>
        <section className="px-3 pt-12 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <Reveal>
              <article className="glass-panel p-6 sm:p-8">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-secondary text-primary">
                  <Brush aria-hidden="true" className="h-6 w-6" />
                </span>
                <h2 className="heading-display mt-4 text-2xl">Learn with what you have</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                  Share your goals and the looks you want to learn. Dia will help shape a practical
                  lesson around your own features, routine and makeup bag.
                </p>
                <ul className="mt-5 space-y-2 text-sm text-foreground/80">
                  {["Personalised guidance", "Hands-on practice", "A simple routine to take home"].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <Check aria-hidden="true" className="h-4 w-4 text-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-primary">
                  <Sparkles aria-hidden="true" className="h-4 w-4" />
                  Bring your questions and favorite products.
                </div>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <div>
                <SectionTitle eyebrow="Reserve your lesson" title="Choose your" script="class" align="left" />
                <p className="mb-5 mt-4 text-sm leading-relaxed text-foreground/80">
                  Pick a private class, bring a friend or start with an online consultation. Share
                  what you’d like to learn and we’ll plan the session around you.
                </p>
                <BookingForm config={config} />
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
