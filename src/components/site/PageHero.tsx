import type { ReactNode } from "react";

/** Shared soft hero banner for inner pages. */
export function PageHero({
  eyebrow,
  title,
  script,
  subtitle,
}: {
  eyebrow: string;
  title: string;
  script?: string;
  subtitle?: string;
}) {
  return (
    <section className="px-3 pt-8 sm:px-6 sm:pt-12">
      <div className="mx-auto max-w-3xl rounded-[2rem] px-6 py-10 text-center sm:py-14">
        <div className="flex items-center justify-center gap-3">
          <span className="h-px w-10 bg-primary/40" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-10 bg-primary/40" />
        </div>
        <h1 className="heading-display mt-3 text-[2rem] leading-tight sm:text-5xl">
          {title}
          {script ? (
            <>
              {" "}
              <span className="text-script text-[2.2rem] sm:text-5xl">{script}</span>
            </>
          ) : null}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-foreground/80 sm:text-base">
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  script,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  script?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center" : "text-left"}>
      {eyebrow ? (
        <div className={`flex items-center gap-3 ${align === "center" ? "justify-center" : ""}`}>
          <span className="h-px w-8 bg-primary/40 sm:w-12" />
          <span className="eyebrow">{eyebrow}</span>
          <span className="h-px w-8 bg-primary/40 sm:w-12" />
        </div>
      ) : null}
      <h2 className="heading-display mt-2 text-[1.65rem] sm:text-4xl">
        {title}
        {script ? <span className="text-script sm:text-4xl"> {script}</span> : null}
      </h2>
    </div>
  );
}

export function CtaBanner({ children }: { children?: ReactNode }) {
  return (
    <section className="px-3 pt-14 sm:px-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-br from-secondary/90 via-blush/80 to-primary/25 px-6 py-12 text-center shadow-[0_20px_50px_-24px_rgba(150,80,110,0.5)] ring-1 ring-white/60 backdrop-blur-sm sm:py-14">
        <p className="text-script text-3xl leading-snug sm:text-4xl">Ready to feel unforgettable?</p>
        <p className="mt-3 text-sm text-foreground/80 sm:text-base">
          {children ?? "We'd love to be part of your day — check our availability and book your date."}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <a href="/book" className="btn-primary">
            Book Your Appointment
          </a>
          <a href="tel:+61478666466" className="btn-outline">
            Call 0478 666 466
          </a>
        </div>
      </div>
    </section>
  );
}
