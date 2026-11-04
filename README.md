# Glam by Dia

A responsive bridal beauty website for Glam by Dia in Clayton South, Melbourne. Built as a Vite + React single-page application with React Router, Tailwind CSS v4, Supabase bookings, and Resend email notifications.

## Run locally

```sh
bun install
bun run dev
```

Vite serves the site on port 5000. The local development server also provides the booking endpoint at `/api/booking`.

## Build and preview

```sh
bun run build
bun run preview
```

The static site is built into `dist/`. `vercel.json` configures Vercel to serve that build and route browser page URLs to the SPA while leaving `/api/booking` available as a serverless function.

Vercel uses `vercel-install.sh` to replace Replit-only tarball URLs in its temporary build checkout with the corresponding public npm registry URLs, then installs from the frozen Bun lockfile. The committed `bun.lock` remains unchanged for Replit.

## Pages

- `/` — Home
- `/about` — About Dia
- `/services` — Services and prices
- `/gallery` — Bridal gallery
- `/book` — Makeup and hair booking
- `/henna` — Henna and mehndi
- `/self-makeup-class` — Self-makeup lessons
- `/contact` — Studio details, map, and enquiry form

## Environment configuration

Set these values in the deployment environment. Do not commit secret values.

| Variable | Used by | Purpose |
| --- | --- | --- |
| `VITE_SUPABASE_URL` | Browser | Supabase project URL |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Browser | Supabase publishable key |
| `SUPABASE_URL` | Booking API | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Booking API | Private key for inserting booking requests |
| `RESEND_API_KEY` | Booking API on Vercel | Resend sending key |
| `RESEND_FROM_EMAIL` | Booking API | Sender address verified in Resend |

The Replit app can send through its connected Resend integration when `RESEND_API_KEY` is not configured. For Vercel, configure a Resend API key and a sender address from a verified domain. Email delivery failures are logged but do not undo a successfully saved booking.

The booking API saves submissions in the existing `booking_requests` Supabase table, then attempts an owner notification and customer confirmation email.
