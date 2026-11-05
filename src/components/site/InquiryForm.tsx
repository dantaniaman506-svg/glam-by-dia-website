import { useState, type FormEvent } from "react";
import { createBookingEmailDraft, type BookingInput } from "@/lib/booking.functions";

const inputClass = "field-input";

export function InquiryForm() {
  const [form, setForm] = useState<Partial<BookingInput>>({ formType: "message" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [emailDraftUrl, setEmailDraftUrl] = useState("");

  const update = (values: Partial<BookingInput>) => setForm((current) => ({ ...current, ...values }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (!form.fullName?.trim() || !form.phone?.trim() || !form.email?.trim() || !form.notes?.trim()) {
      setError("Please add your name, phone, email and message.");
      return;
    }
    setBusy(true);
    try {
      const draftUrl = createBookingEmailDraft({
        formType: "message",
        fullName: form.fullName,
        phone: form.phone,
        email: form.email,
        contactMethod: form.contactMethod,
        notes: form.notes,
      });
      setEmailDraftUrl(draftUrl);
      setSent(true);
      window.location.href = draftUrl;
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="glass-panel px-6 py-10 text-center sm:px-9">
        <h3 className="heading-display text-2xl">Your email draft is ready</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          Check your email app and tap Send to deliver your enquiry. The website cannot confirm
          delivery until you send it. If no app opened, use the button below.
        </p>
        <a className="btn-primary mt-5 inline-flex min-h-11 items-center justify-center px-6" href={emailDraftUrl}>
          Open email draft
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel space-y-4 p-5 sm:p-8">
      <div>
        <label className="field-label" htmlFor="inquiry-name">Your name *</label>
        <input id="inquiry-name" className={inputClass} autoComplete="name" value={form.fullName ?? ""} onChange={(event) => update({ fullName: event.target.value })} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="inquiry-phone">Phone *</label>
          <input id="inquiry-phone" className={inputClass} type="tel" autoComplete="tel" value={form.phone ?? ""} onChange={(event) => update({ phone: event.target.value })} />
        </div>
        <div>
          <label className="field-label" htmlFor="inquiry-email">Email *</label>
          <input id="inquiry-email" className={inputClass} type="email" autoComplete="email" value={form.email ?? ""} onChange={(event) => update({ email: event.target.value })} />
        </div>
      </div>
      <div>
        <span className="field-label">Best way to reach you?</span>
        <div className="flex flex-wrap gap-2">
          {(["Phone", "Email"] as const).map((method) => (
            <button key={method} type="button" data-checked={form.contactMethod === method} className="choice-pill" onClick={() => update({ contactMethod: method })}>
              {method === "Phone" ? "Phone call" : "Email"}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="inquiry-message">How can we help? *</label>
        <textarea id="inquiry-message" className="field-textarea" rows={5} value={form.notes ?? ""} onChange={(event) => update({ notes: event.target.value })} />
      </div>
      {error ? <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">{error}</p> : null}
      <button type="submit" disabled={busy} className="btn-primary min-h-11 w-full disabled:opacity-60">
        {busy ? "Opening email…" : "Continue to email"}
      </button>
      <p className="text-center text-xs text-muted-foreground">Your details are only used to respond to your enquiry.</p>
    </form>
  );
}
