---
name: Website email submission
description: The site's booking and contact forms should use prefilled email drafts, not database or API submission.
---

For now, booking and contact forms should open the visitor's email app with a prefilled draft addressed to the business owner. Do not add Supabase or a server-side email provider to this flow unless the user changes this requirement. The page must make clear that the visitor still needs to press Send; it must not claim the message was delivered.

**Why:** The user explicitly asked to avoid Supabase and API setup and wants visitors to send the prefilled message from their own email account.

**How to apply:** Keep all form details in the draft body, prefill the owner as the recipient, and provide a usable fallback link if the email app does not open.
