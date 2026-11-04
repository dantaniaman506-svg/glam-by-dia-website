import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { NAV_LINKS, SITE } from "@/lib/site";

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </svg>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (to: string) => {
    setOpen(false);
    navigate(to);
  };

  return (
    <>
      <header className="sticky top-0 z-40 px-3 pt-3 sm:px-6 sm:pt-4">
        <div className="relative mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/70 bg-white/75 py-2 pl-4 pr-2 shadow-[0_10px_30px_-14px_rgba(150,80,110,0.35)] backdrop-blur-md sm:pl-6 sm:pr-3">
          {/* Menu */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="flex h-11 w-11 flex-col items-start justify-center gap-[5px] rounded-full px-2 transition-colors hover:bg-secondary sm:w-12"
          >
            <span className="h-[2px] w-5 rounded-full bg-primary/80" />
            <span className="h-[2px] w-3.5 rounded-full bg-primary/80" />
            <span className="h-[2px] w-4.5 rounded-full bg-primary/80" />
          </button>

          {/* Logo */}
          <Link to="/" aria-label="Glam by Dia home" className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
            <img
              src="/images/header-wordmark.webp"
              alt="Glam by Dia logo"
              width={370}
              height={315}
              className="h-[4.6rem] w-[5.5rem] rounded-xl border border-white/80 object-cover shadow-[0_8px_20px_-12px_rgba(226,63,114,0.55)] sm:h-[5.4rem] sm:w-[6.5rem]"
            />
          </Link>

          {/* Book now */}
          <Link to="/book" className="btn-primary !px-4 !py-2 !text-xs sm:!px-6 sm:!py-2.5 sm:!text-sm">
            Book Now
            <ArrowIcon className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      {/* Drawer */}
      <div
        className={`fixed inset-0 z-50 transition-opacity duration-300 ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <button
          aria-label="Close menu"
          onClick={() => setOpen(false)}
          className="absolute inset-0 h-full w-full bg-plum/25 backdrop-blur-sm"
        />
        <aside
          className={`absolute left-0 top-0 flex h-full w-[300px] max-w-[85vw] flex-col gap-1 overflow-y-auto rounded-r-3xl bg-white/95 p-6 pt-8 shadow-2xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-4 flex items-center justify-between">
            <img src="/images/header-wordmark.webp" alt="Glam by Dia" width={370} height={315} className="h-14 w-[68px] rounded-xl border border-white/70 object-cover" />
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-11 w-11 items-center justify-center rounded-full text-plum transition-colors hover:bg-secondary"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
          </div>
          {NAV_LINKS.map((link) => (
            <button
              key={link.to}
              onClick={() => go(link.to)}
              className="rounded-xl px-3 py-2.5 text-left font-display text-[1.05rem] text-plum transition-colors hover:bg-secondary"
            >
              {link.label}
            </button>
          ))}
          <div className="mt-6 border-t border-border pt-4 text-xs text-muted-foreground">
            <a href={SITE.phoneHref} className="block py-1">{SITE.phoneDisplay}</a>
            <a href={SITE.emailHref} className="block break-all py-1">{SITE.email}</a>
            <a href={SITE.instagram} target="_blank" rel="noreferrer" className="block py-1">{SITE.instagramHandle}</a>
          </div>
        </aside>
      </div>
    </>
  );
}
