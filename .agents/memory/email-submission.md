---
name: Website email submission
description: Booking and contact forms save to Google Sheets and send transactional email through the Replit backend.
---

Booking, henna, class, and contact submissions should append to separate tabs in the connected Google Sheet and send owner/customer notifications through the connected Gmail account. Keep the frontend static on Vercel; integrations run through a separately published Replit API. Do not add Supabase or switch back to mailto drafts unless the user changes this requirement. Clearly disclose that request details are stored and require consent before submission.

**Why:** The user changed the previous email-draft flow and explicitly requested real-time Google Sheets storage plus automatic email notifications, without Supabase. Vercel's static frontend cannot access Replit integration credentials directly.

**How to apply:** Keep Google Sheets/Gmail connector calls server-side in the Replit API, route browser submissions to its published URL, and expose only a customer-facing privacy notice in the website.
