import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero, CtaBanner } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "@/components/site/icons";

import brideGarden from "@/assets/bride-garden-updo.jpg";
import makeupClass from "@/assets/makeup-class-session.jpg";
import bridalCloseup from "@/assets/bridal-softglam-closeup.jpg";
import hennaHands from "@/assets/bridal-henna-hands.jpg";
import floralUpdo from "@/assets/bride-floral-updo.jpg";
import veilBack from "@/assets/bride-veil-back.jpg";
import makeupArtist from "@/assets/makeup-artist-closeup.jpg";
import floralBun from "@/assets/bride-floral-bun-profile.jpg";
import indianBride from "@/assets/indian-bride-red.jpg";
import openHair from "@/assets/bridal-portrait-open-hair.jpg";
import hairDown from "@/assets/bridal-hair-down-back.jpg";
import roseBun from "@/assets/bride-rose-bun.jpg";
import veilCloseup from "@/assets/bride-veil-closeup.jpg";
import veilPortrait from "@/assets/bride-veil-portrait.jpg";

const PHOTOS = [
  { img: brideGarden, alt: "Bride with a floral updo in a garden" },
  { img: makeupClass, alt: "One-on-one makeup lesson in a blush studio" },
  { img: bridalCloseup, alt: "Soft glam bridal makeup with a rose bouquet" },
  { img: hennaHands, alt: "Intricate bridal henna with gold bangles" },
  { img: floralUpdo, alt: "Bridal makeup with a romantic floral updo" },
  { img: veilBack, alt: "Bride wearing a delicate veil over a low bun" },
  { img: makeupArtist, alt: "Close-up of a polished bridal makeup look" },
  { img: floralBun, alt: "Bridal bun accented with pink blossoms" },
  { img: indianBride, alt: "Indian bride in a red lehenga and gold jewellery" },
  { img: openHair, alt: "Bride wearing soft glam makeup and loose waves" },
  { img: hairDown, alt: "Long bridal waves finished with a pearl comb" },
  { img: roseBun, alt: "Romantic bridal bun with roses and soft makeup" },
  { img: veilCloseup, alt: "Close-up bridal portrait with veil and flowers" },
  { img: veilPortrait, alt: "Bride in an embroidered veil with luminous makeup" },
];

function Lightbox({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button aria-label="Close image" onClick={onClose} className="absolute inset-0 h-full w-full bg-plum/40 backdrop-blur-md" />
      <figure className="relative max-h-[88vh] max-w-[92vw]">
        <img src={src} alt={alt} className="max-h-[88vh] rounded-[1.5rem] object-contain shadow-2xl ring-4 ring-white/80" />
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute -top-3 -right-3 flex h-11 w-11 items-center justify-center rounded-full bg-white text-plum shadow-lg"
        >
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
        <figcaption className="mt-3 text-center text-sm text-white drop-shadow">{alt}</figcaption>
      </figure>
    </div>
  );
}

export default function Gallery() {
  const [open, setOpen] = useState<{ img: string; alt: string } | null>(null);

  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero
          eyebrow="Our Gallery"
          title="Real Brides."
          script="Real Magic."
          subtitle="A glimpse of the brides we've had the joy of glamming — tap any photo to take a closer look."
        />

        <section className="px-3 sm:px-6">
          <div className="mx-auto max-w-5xl columns-2 gap-3 space-y-3 sm:columns-3 sm:gap-4 sm:space-y-4">
            {PHOTOS.map((p, i) => (
              <Reveal key={p.alt} delay={Math.min((i % 3) * 70, 210)} className="break-inside-avoid">
                <button
                  onClick={() => setOpen({ img: p.img, alt: p.alt })}
                  className="group block w-full overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <img
                    src={p.img}
                    alt={p.alt}
                    width={1056}
                    height={1408}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </button>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="px-3 pt-14 sm:px-6">
          <div className="mx-auto flex max-w-5xl justify-center">
            <Link to="/book" className="btn-primary">
              Be Our Next Bride
              <ArrowRight />
            </Link>
          </div>
        </section>

        <CtaBanner>Your wedding morning deserves to look like this. Let's design your look together.</CtaBanner>
      </main>
      {open ? <Lightbox src={open.img} alt={open.alt} onClose={() => setOpen(null)} /> : null}
      <Footer />
    </div>
  );
}

