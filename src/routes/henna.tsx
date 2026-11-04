import { Link } from "react-router-dom";
import hennaHero from "@/assets/bridal-henna-hands.jpg";
import { BookingForm, type BookingFormConfig } from "@/components/site/BookingForm";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { ImagePageHero } from "@/components/site/ImagePageHero";
import { SectionTitle } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

const config: BookingFormConfig = {
  formType: "henna",
  services: [
    "Bridal Henna (Both hands & feet)",
    "Bridal Henna (Hands only)",
    "Guest / Party Henna (Per hand)",
  ],
  skinQuestion: true,
};

const styles = [
  ["Arabic", "Airy florals and flowing vines, with graceful open spaces."],
  ["Indian Traditional", "Detailed paisleys, fine lines and celebration-ready patterns."],
  ["Minimalist Indo-Western", "A lighter, modern design with delicate personal details."],
];

export default function Henna() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <ImagePageHero image={hennaHero} alt="Intricate bridal mehndi with rose details" eyebrow="Henna / Mehndi Artistry" title="Meaningful" script="Mehndi" subtitle="Personalised henna designs for the bride, family and friends — created for your celebration and styled to feel like you." />
        <section className="px-3 pt-12 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <SectionTitle eyebrow="A design for your story" title="Tradition, with a" script="personal touch" />
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {styles.map(([name, description], index) => (
                <Reveal key={name} delay={index * 70}>
                  <article className="glass-panel h-full p-6">
                    <span className="text-script text-3xl">{String(index + 1).padStart(2, "0")}</span>
                    <h2 className="heading-display mt-2 text-xl">{name}</h2>
                    <p className="mt-2 text-sm leading-relaxed text-foreground/80">{description}</p>
                  </article>
                </Reveal>
              ))}
            </div>
            <p className="mt-6 text-center font-display text-lg text-plum">Bridal and party henna from <span className="font-semibold">$50–$250 AUD</span>, depending on design and coverage.</p>
          </div>
        </section>
        <section className="px-3 pt-14 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <Reveal>
              <div>
                <p className="eyebrow">Your celebration, your way</p>
                <h2 className="heading-display mt-3 text-3xl">Tell us what you’re dreaming of</h2>
                <p className="mt-4 text-sm leading-relaxed text-foreground/80">Choose the coverage that suits you and share your date, location and inspiration. Dia will follow up with availability and a personalised quote.</p>
                <img src={hennaHero} alt="Bridal henna detail with soft blush styling" loading="lazy" className="mt-6 max-h-80 w-full rounded-[1.5rem] object-cover shadow-lg ring-4 ring-white/70" />
              </div>
            </Reveal>
            <Reveal delay={100}><BookingForm config={config} /></Reveal>
          </div>
          <p className="mx-auto mt-6 max-w-5xl text-center text-sm text-muted-foreground">Also interested in bridal makeup? <Link to="/book" className="font-medium text-primary underline-offset-4 hover:underline">Send a bridal beauty request</Link>.</p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
