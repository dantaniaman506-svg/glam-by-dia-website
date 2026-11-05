# Glam by Dia

A responsive bridal beauty website for Glam by Dia in Clayton South, Melbourne. The website is a Vite + React single-page application; a small Replit-hosted API saves enquiries to the connected Google Sheet and sends notifications through the connected Gmail account.

## Run locally

```sh
bun install
bun run api
```

In a second terminal, run `bun run dev`. Vite serves the site on port 5000 and proxies `/api/booking` to the API on port 8000.

## Build and preview

```sh
bun run build
bun run preview
```

The static site is built into `dist/` and deployed on Vercel. The booking API is a separate Replit Autoscale deployment because the Google Sheets and Gmail integrations are available to the Replit server, not to Vercel's static frontend. After the API is published, configure `VITE_BOOKING_API_BASE_URL` in the Vercel build environment to point to its public URL.

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

## Booking data and email

Booking requests are appended to the private “Glam by Dia — Website Enquiries” spreadsheet in separate tabs for bridal bookings, henna, makeup classes, and contact enquiries. The API sends one notification to Dia and one receipt to the customer through the connected Gmail account. Forms disclose the storage and contact use and require consent before submission.

Set `VITE_BOOKING_API_BASE_URL` in Vercel after the Replit API deployment is published. For custom website domains, set `BOOKING_ALLOWED_ORIGINS` on the Replit API to a comma-separated list of exact origins. Do not place integration credentials in the frontend or commit them to Git.
