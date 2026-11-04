import { Link } from "react-router-dom";
import { SITE } from "@/lib/site";

const socials = [
  {
    label: "Instagram",
    href: SITE.instagram,
    path: (
      <>
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
      </>
    ),
  },
  {
    label: "TikTok",
    href: SITE.instagram,
    path: <path d="M14 4v9.5a3.5 3.5 0 1 1-3.5-3.5M14 4c.4 2.6 2.2 4.4 5 4.7" />,
  },
  {
    label: "Facebook",
    href: SITE.instagram,
    path: <path d="M14.5 8.5H17V5h-2.5A3.5 3.5 0 0 0 11 8.5V11H8v3.5h3V21h3.5v-6.5H17L17.5 11h-3V9.5a1 1 0 0 1 1-1Z" />,
  },
  {
    label: "Pinterest",
    href: SITE.instagram,
    path: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M10.5 20c.7-2.6 1.7-6.6 1.7-6.6" />
        <path d="M9.6 10.8A3 3 0 1 1 12.7 14c-1 0-1.9-.5-2.1-1.4" />
      </>
    ),
  },
  {
    label: "YouTube",
    href: SITE.instagram,
    path: (
      <>
        <rect x="3" y="6" width="18" height="12" rx="4" />
        <path d="m10.5 9.5 4.5 2.5-4.5 2.5Z" fill="currentColor" stroke="none" />
      </>
    ),
  },
];

function ContactRow({ icon, children, href }: { icon: React.ReactNode; children: React.ReactNode; href?: string }) {
  const content = (
    <span className="flex min-w-0 items-center gap-2.5">
      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">{icon}</span>
      <span className="truncate text-[0.86rem] text-plum/85">{children}</span>
    </span>
  );
  return href ? (
    <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="block hover:opacity-80">
      {content}
    </a>
  ) : (
    content
  );
}

export function Footer() {
  return (
    <footer className="mt-16 px-3 pb-10 sm:px-6">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-b from-blush/90 via-secondary/80 to-primary/30 shadow-[0_20px_50px_-24px_rgba(150,80,110,0.5)] ring-1 ring-white/60 backdrop-blur-sm">
        <div className="relative px-6 py-10 sm:px-10">
          {/* decorative hearts */}
          <span aria-hidden className="pointer-events-none absolute right-8 top-8 hidden text-primary/40 sm:block">
            <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="1.4">
              <path d="M12 20s-7.5-4.6-9.3-9A5 5 0 0 1 12 6.4 5 5 0 0 1 21.3 11c-1.8 4.4-9.3 9-9.3 9Z" />
            </svg>
          </span>

          <div className="grid gap-8 sm:grid-cols-[1fr_auto] sm:items-center">
            <div className="flex items-center justify-center sm:justify-start">
              <p className="text-script text-3xl sm:text-4xl">
                Let's Make
                <br />
                Your Day Special
              </p>
            </div>
            <div className="grid justify-items-center gap-2.5 sm:justify-items-start">
              <ContactRow
                href={SITE.phoneHref}
                icon={
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9Z" />
                  </svg>
                }
              >
                {SITE.phoneDisplay}
              </ContactRow>
              <ContactRow
                href={SITE.emailHref}
                icon={
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="m2 7 10 6L22 7" />
                  </svg>
                }
              >
                {SITE.email}
              </ContactRow>
              <ContactRow
                icon={
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                }
              >
                {SITE.address}
              </ContactRow>
              <ContactRow
                href={SITE.instagram}
                icon={
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                }
              >
                {SITE.instagramHandle}
              </ContactRow>
            </div>
          </div>

          <div className="mt-9 flex justify-center">
            <Link to="/book" className="btn-primary w-full max-w-md !py-3.5 sm:w-auto">
              <svg viewBox="0 0 24 24" className="h-4.5 w-4.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <rect x="3" y="5" width="18" height="16" rx="3" />
                <path d="M8 3v4M16 3v4M3 10h18" />
              </svg>
              Book Your Appointment
            </Link>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/30 bg-white/80 text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
                  {s.path}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-white/60 bg-white/55 px-6 py-6 text-center backdrop-blur-sm">
          <img src="/images/brand-logo.webp" alt="Glam by Dia" width={523} height={477} className="mx-auto h-[5.5rem] w-24 object-contain drop-shadow-sm" />
          <p className="mt-0.5 text-[0.72rem] tracking-wide text-muted-foreground">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
