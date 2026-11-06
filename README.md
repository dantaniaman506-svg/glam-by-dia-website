# Glam by Dia

A responsive, static Vite + React bridal beauty website for Glam by Dia in Clayton South, Melbourne.

## Run locally

```sh
bun install
bun run dev
```

## Build and preview

```sh
bun run build
bun run preview
```

The site is a static single-page application. It builds into `dist/` and can be deployed to Vercel without a backend or server-side environment variables.

Vercel uses `vercel-install.sh` to replace Replit-only tarball URLs in its temporary build checkout with the corresponding public npm registry URLs, then installs from the frozen Bun lockfile.

## Pages

- `/` — Home
- `/about` — About Dia
- `/services` — Services and prices
- `/gallery` — Bridal gallery
- `/book` — Makeup and hair booking
- `/henna` — Henna and mehndi
- `/self-makeup-class` — Self-makeup lessons
- `/contact` — Studio details, directions, and enquiry form

## Booking and contact forms

Forms validate the entered details in the browser, then open the visitor's email app with the recipient, subject, and message prefilled. The visitor must tap **Send** in that email app; the website cannot send or confirm the email itself and does not save form submissions.
