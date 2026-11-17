import { Link } from "react-router-dom";
import { CalendarDays, Instagram, Mail, MapPin, Phone } from "lucide-react";
import { BOOKING_OPTIONS_PATH, SITE } from "@/lib/site";

const quickLinks = [
  { label: "Instagram", href: SITE.instagram, Icon: Instagram, external: true },
  { label: "Location", href: SITE.directionsUrl, Icon: MapPin, external: true },
  { label: "Phone", href: SITE.phoneHref, Icon: Phone, external: false },
  { label: "Email", href: SITE.emailHref, Icon: Mail, external: false },
];

function ContactRow({
  icon,
  children,
  href,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
  href?: string;
}) {
  const content = (
    <span className="flex min-w-0 items-start gap-2.5">
      <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
        {icon}
      </span>
      <span className="min-w-0 flex-1 break-words pt-1 text-left text-[0.82rem] leading-5 text-plum/85 [overflow-wrap:anywhere]">
        {children}
      </span>
    </span>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noreferrer" : undefined}
      className="block min-w-0 rounded-xl px-2 py-1.5 transition hover:bg-white/50 hover:opacity-90"
    >
      {content}
    </a>
  ) : (
    content
  );
}

export function Footer() {
  return (
    <footer className="mt-12 px-3 pb-8 sm:mt-16 sm:px-6 sm:pb-10">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] bg-gradient-to-b from-blush/90 via-secondary/80 to-primary/30 shadow-[0_20px_50px_-24px_rgba(150,80,110,0.5)] ring-1 ring-white/60 backdrop-blur-sm">
        <div className="relative px-4 py-7 sm:px-10 sm:py-9">
          {/* decorative hearts */}
          <span
            aria-hidden
            className="pointer-events-none absolute right-8 top-8 hidden text-primary/40 sm:block"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-8 w-8"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M12 20s-7.5-4.6-9.3-9A5 5 0 0 1 12 6.4 5 5 0 0 1 21.3 11c-1.8 4.4-9.3 9-9.3 9Z" />
            </svg>
          </span>

          <div className="grid min-w-0 gap-5 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] sm:items-center sm:gap-7">
            <div className="flex items-center justify-center sm:justify-start">
              <p className="text-center text-script text-3xl sm:text-left sm:text-4xl">
                Let's Make
                <br />
                Your Day Special
              </p>
            </div>
            <div className="grid min-w-0 grid-cols-1 gap-1 min-[380px]:grid-cols-2 sm:gap-2">
              <ContactRow
                href={SITE.phoneHref}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.13.96.36 1.9.7 2.8a2 2 0 0 1-.45 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.45c.9.34 1.84.57 2.8.7A2 2 0 0 1 22 16.9Z" />
                  </svg>
                }
              >
                {SITE.phoneDisplay}
              </ContactRow>
              <ContactRow
                href={SITE.emailHref}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="4" width="20" height="16" rx="3" />
                    <path d="m2 7 10 6L22 7" />
                  </svg>
                }
              >
                {SITE.email}
              </ContactRow>
              <ContactRow
                href={SITE.directionsUrl}
                icon={
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
                  <svg
                    viewBox="0 0 24 24"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                  </svg>
                }
              >
                {SITE.instagramHandle}
              </ContactRow>
            </div>
          </div>

          <nav
            aria-label="Footer links"
            className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm sm:mt-7"
          >
            <Link className="text-plum/80 underline-offset-4 hover:underline" to="/services">
              Services
            </Link>
            <Link className="text-plum/80 underline-offset-4 hover:underline" to="/about#faqs">
              FAQs
            </Link>
          </nav>

          <div className="mt-6 flex justify-center sm:mt-8">
            <Link
              to={BOOKING_OPTIONS_PATH}
              className="btn-primary w-full max-w-md !py-3 sm:w-auto sm:!py-3.5"
            >
              <CalendarDays aria-hidden="true" className="h-4.5 w-4.5" />
              Book Your Appointment
            </Link>
          </div>

          <nav
            aria-label="Footer quick contact links"
            className="mt-5 flex justify-center gap-2.5 sm:mt-6 sm:gap-3"
          >
            {quickLinks.map(({ label, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                aria-label={`Footer ${label}`}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/25 bg-white/80 text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground sm:h-11 sm:w-11"
              >
                <Icon aria-hidden="true" className="h-4 w-4" strokeWidth={1.8} />
              </a>
            ))}
          </nav>
        </div>

        <div className="border-t border-white/60 bg-white/55 px-5 py-4 text-center backdrop-blur-sm sm:px-6 sm:py-5">
          <img
            src="/images/brand-logo.webp"
            alt="Glam by Dia"
            width={523}
            height={477}
            className="mx-auto h-[4.5rem] w-20 object-contain saturate-[0.7] drop-shadow-sm sm:h-[5rem] sm:w-24"
          />
          <p className="mt-1 text-[0.7rem] tracking-wide text-muted-foreground">{SITE.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
