import { ArrowUpRight, Star } from "lucide-react";

import { SITE } from "@/lib/site";

const reviews = [
  {
    name: "Zocky Spasovski",
    quote:
      "I had such a great experience with Dia! She was so lovely and made me feel really comfortable throughout the whole appointment.",
  },
  {
    name: "Saurabh Azad",
    quote: "Dia did an amazing job doing my make up and hairstyle for the party!",
  },
  {
    name: "Simone Beveridge",
    quote:
      "I had my hair and makeup done for my 40th birthday and couldn't have been happier with the result!",
  },
  {
    name: "Pratima Saini",
    quote:
      "I had such a lovely experience with Dia! She did my makeup so beautifully and exactly how I wanted it — very natural, fresh.",
  },
  {
    name: "Hirusha Madushani",
    quote: "Absolute perfection! Dia did my makeup for a formal event, and I was so impressed.",
  },
  {
    name: "A T",
    quote: "A beautiful experience, Dia & her team went above and beyond.",
  },
] as const;

function ReviewCard({
  name,
  quote,
  duplicate = false,
}: (typeof reviews)[number] & {
  duplicate?: boolean;
}) {
  return (
    <a
      href={SITE.googleReviewsUrl}
      target="_blank"
      rel="noreferrer"
      aria-label={`Google review from ${name}; open Glam by Dia on Google Maps`}
      tabIndex={duplicate ? -1 : undefined}
      className="flex h-[15.5rem] w-[min(84vw,22rem)] shrink-0 flex-col rounded-[1.6rem] border border-white/90 bg-white/80 p-5 text-left shadow-[0_18px_44px_-28px_rgba(120,58,82,0.5)] backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_46px_-24px_rgba(120,58,82,0.55)] sm:p-6"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-0.5" role="img" aria-label="5 out of 5 stars">
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              aria-hidden="true"
              className="h-4 w-4 fill-[#d7a94a] text-[#d7a94a]"
              strokeWidth={1.5}
            />
          ))}
        </div>
        <span className="text-[0.68rem] font-medium uppercase tracking-[0.16em] text-plum/60">
          Google review
        </span>
      </div>
      <p className="mt-4 flex-1 overflow-hidden text-sm leading-6 text-foreground/85">“{quote}”</p>
      <div className="mt-3 flex items-center justify-between gap-2 border-t border-primary/10 pt-3">
        <span className="min-w-0 truncate text-sm font-medium text-plum">{name}</span>
        <span className="flex shrink-0 items-center gap-1 text-xs text-primary">
          View on Maps
          <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
        </span>
      </div>
    </a>
  );
}

export function GoogleReviewsMarquee() {
  return (
    <article className="glass-panel overflow-hidden p-5 sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Google reviews</p>
          <h2 className="heading-display mt-2 text-2xl sm:text-3xl">Kind words from our clients</h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-foreground/75">
            A few real review excerpts, shared by Glam by Dia clients on Google.
          </p>
        </div>
        <a
          href={SITE.googleReviewsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-outline self-start sm:self-auto"
        >
          Read all on Google Maps
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </a>
      </div>

      <div
        className="review-marquee mt-6"
        role="region"
        aria-label="Google review excerpts; each card opens the Glam by Dia Google Maps listing"
        aria-live="off"
      >
        <div className="review-track">
          <div className="review-track-group">
            {reviews.map((review) => (
              <ReviewCard key={review.name} {...review} />
            ))}
          </div>
          <div className="review-track-group review-track-copy" aria-hidden="true">
            {reviews.map((review) => (
              <ReviewCard key={`${review.name}-copy`} {...review} duplicate />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        Hover, focus, or touch the reviews to pause the motion.
      </p>
    </article>
  );
}
