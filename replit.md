# Replit run guide

- Start the web preview with `bun run dev` on port 5000.
- The frontend is a Vite React SPA using React Router; page routes are listed in `src/App.tsx`.
- Local booking submissions use the Vite middleware for `/api/booking`. Vercel builds the same handler from `api/booking.ts`.
- Booking storage needs `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`; browser Supabase access needs `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`.
- The Replit Resend connection is used when `RESEND_API_KEY` is absent. For Vercel, configure `RESEND_API_KEY` and a verified `RESEND_FROM_EMAIL`.
