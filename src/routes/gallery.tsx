import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { PageHero, CtaBanner } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { ArrowRight } from "@/components/site/icons";

import galleryVeil from "@/assets/gallery-veil-bride.jpg";
import galleryIndian from "@/assets/gallery-indian-bride.jpg";
import galleryFlowerCrown from "@/assets/gallery-flower-crown.jpg";
import galleryBunVeil from "@/assets/gallery-bun-veil.jpg";
import galleryPearl from "@/assets/gallery-pearl-bride.jpg";
import galleryBraided from "@/assets/gallery-braided-updo.jpg";
import serviceHairDown from "@/assets/service-hair-down.jpg";
import serviceHairUp from "@/assets/service-hair-up.jpg";
import serviceMakeupOnly from "@/assets/service-makeup-only.jpg";
import serviceHairstyleOnly from "@/assets/service-hairstyle-only.jpg";

const PHOTOS = [
  { img: galleryVeil, alt: "Bride with crystal veil and soft glam makeup", tall: true },
  { img: galleryIndian, alt: "Indian bride in red lehenga with gold jewellery", tall: false },
  { img: galleryPearl, alt: "Bride with pearl headpiece and soft glam makeup", tall: true },
  { img: galleryBunVeil, alt: "Bridal low bun with veil and baby's breath", tall: false },
  { img: galleryBraided, alt: "Braided bridal updo with baby's breath flowers", tall: true },
  { img: galleryFlowerCrown, alt: "Bride with pink rose and baby's breath hair piece", tall: false },
  { img: serviceHairUp, alt: "Elegant bridal updo with full glam makeup", tall: false },
  { img: serviceHairDown, alt: "Bridal makeup with soft waves worn down", tall: true },
  { img: serviceMakeupOnly, alt: "Flawless soft glam bridal makeup", tall: false },
  { img: serviceHairstyleOnly, alt: "Side profile of an elegant bridal hairstyle", tall: true },
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
          className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white text-plum shadow-lg"
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

function Gallery() {
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
                  <span className="pointer-events-none absolute" />
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

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | Real Brides by Glam by Dia — Bridal Makeup & Hair Melbourne" },
      {
        name: "description",
        content:
          "Browse real bridal looks by Glam by Dia — soft glam makeup, elegant updos, veils, flower crowns and Indian bridal glamour. Mobile bridal beauty across Melbourne.",
      },
      { property: "og:title", content: "Gallery | Real Brides by Glam by Dia" },
      {
        property: "og:description",
        content: "Soft glam makeup, elegant updos, veils and Indian bridal glamour — real brides, real magic.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: Gallery,
});
