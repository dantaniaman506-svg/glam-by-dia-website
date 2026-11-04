import classHero from "@/assets/makeup-class-session.jpg";
import { BookingForm, type BookingFormConfig } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ImagePageHero } from "@/components/site/ImagePageHero";
import { SectionTitle } from "@/components/site/PageHero";
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
  ["Skin prep", "Build a comfortable, lasting base that works with your own skin and products."],
  ["Flawless base", "Find your foundation match and learn blending, concealing and setting."],
  ["Eye techniques", "Explore eye looks, liner and lashes that suit your features."],
  ["Day-to-night transition", "Turn a fresh everyday look into something ready for an evening out."],
  ["Product recommendations", "Make the most of the products you own and learn what is worth adding."],
];

export default function SelfMakeupClass() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <ImagePageHero image={classHero} alt="Personal makeup lesson in a bright blush studio" eyebrow="Learn at your own pace" title="Makeup, made" script="yours" subtitle="A relaxed one-on-one class to help you feel confident doing your own makeup, using the products you already have." />
        <section className="px-3 pt-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="Your lesson" title="A practical little" script="masterclass" />
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {lessons.map(([title, description], index) => (
                <Reveal key={title} delay={index * 55}>
                  <article className="glass-panel h-full p-5 sm:p-6">
                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blush font-display text-lg text-primary">{index + 1}</span>
                    <h2 className="heading-display mt-4 text-lg">{title}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">{description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center text-sm leading-relaxed text-foreground/80">Bring your makeup bag — there’s no need to buy a new kit before class.</p>
          </div>
        </section>
        <section className="px-3 pt-14 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <Reveal>
              <img src={classHero} alt="Makeup artist demonstrating a soft glam look" loading="lazy" className="h-full max-h-[540px] w-full rounded-[2rem] object-cover shadow-[0_20px_50px_-24px_rgba(150,80,110,0.5)] ring-4 ring-white/70" />
            </Reveal>
            <Reveal delay={100}>
              <div>
                <SectionTitle eyebrow="Reserve your lesson" title="Choose your" script="class" align="left" />
                <p className="mb-6 mt-4 text-sm leading-relaxed text-foreground/80">Pick a private class, bring a friend, or start with an online consultation. Share what you’d like to learn and Dia will help plan the session around you.</p>
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
