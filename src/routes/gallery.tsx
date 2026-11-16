import { Instagram, Sparkles } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { BlankImageSlot } from "@/components/site/BlankImageSlot";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

export default function Gallery() {
  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero
          eyebrow="Glam by Dia"
          title="Our Work"
          script="Portfolio"
          subtitle="We’re refreshing this space with client-approved portfolio images."
        />
        <section className="px-4 sm:px-6">
          <Reveal className="glass-panel mx-auto flex max-w-3xl flex-col items-center px-6 py-12 text-center sm:px-10 sm:py-16">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
              <Sparkles aria-hidden="true" className="h-7 w-7" strokeWidth={1.5} />
            </span>
            <h2 className="heading-display mt-5 text-2xl sm:text-3xl">
              Real work, shared with care
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-foreground/75 sm:text-base">
              We’re removing generated images and will add genuine Glam by Dia work here once
              client-approved photos are available. For current posts, visit our Instagram profile.
            </p>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="btn-primary mt-6">
              <Instagram aria-hidden="true" className="h-4 w-4" />
              Follow {SITE.instagramHandle}
            </a>
          </Reveal>
          <div className="mx-auto mt-6 grid max-w-5xl grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {Array.from({ length: 6 }, (_, index) => (
              <BlankImageSlot
                key={index}
                label={`Reserved for client-approved portfolio photo ${index + 1}`}
                className="aspect-[4/5]"
              />
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
