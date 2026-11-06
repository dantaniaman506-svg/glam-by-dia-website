---
name: Website email submission
description: Form submissions open a prefilled email draft; the visitor must send it from their email app.
---

Booking, henna, class, and contact forms should validate locally and open a prefilled email draft to Dia. The visitor must tap Send; the site cannot know whether the message was sent. Do not add a backend, Google Sheets, Supabase, or another storage provider unless the user explicitly changes this requirement. Use percent-encoding for the subject and body rather than URLSearchParams so spaces appear as spaces, not plus signs, in common mobile email apps.

**Why:** The user asked to remove all APIs and the backend, preferring a simple mail-app handoff where they tap Send themselves. A prior Android Gmail draft displayed plus signs instead of spaces when the URL was incorrectly encoded.

**How to apply:** Keep all form submission logic in the Vite SPA, explicitly tell users that opening the draft does not send it, and do not claim that requests are received or saved before the visitor sends the message.
