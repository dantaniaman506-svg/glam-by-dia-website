import { useState, type FormEvent } from "react";
import type { CountryCode } from "libphonenumber-js";
import { submitBooking, type BookingInput } from "@/lib/booking.functions";
import { InternationalPhoneInput } from "@/components/site/InternationalPhoneInput";
import { DEFAULT_PHONE_COUNTRY, getPhoneDetails } from "@/lib/phone";
import { prepareSuccessChime } from "@/lib/success-chime";

const inputClass = "field-input";

export function InquiryForm() {
  const [form, setForm] = useState<Partial<BookingInput>>({
    formType: "message",
    phoneCountryCode: DEFAULT_PHONE_COUNTRY,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const update = (values: Partial<BookingInput>) =>
    setForm((current) => ({ ...current, ...values }));

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    if (
      !form.fullName?.trim() ||
      !form.phone?.trim() ||
      !form.email?.trim() ||
      !form.notes?.trim()
    ) {
      setError("Please add your name, phone, email and message.");
      return;
    }
    const phoneDetails = getPhoneDetails(
      form.phone,
      form.phoneCountryCode ?? DEFAULT_PHONE_COUNTRY,
    );
    if (!phoneDetails) {
      setError("Please enter a valid phone number for your selected country.");
      return;
    }
    if (!form.agreedTerms) {
      setError("Please agree to the enquiry data notice before sending.");
      return;
    }
    setBusy(true);
    const chime = prepareSuccessChime();
    let playChime = false;
    try {
      const result = await submitBooking({
        formType: "message",
        fullName: form.fullName,
        ...phoneDetails,
        email: form.email,
        contactMethod: form.contactMethod,
        notes: form.notes,
        agreedTerms: form.agreedTerms,
        website: form.website,
      });
      if (!result.ok) setError(result.message);
      else {
        setEmailSent(result.emailSent);
        setSent(true);
        playChime = true;
      }
    } finally {
      if (playChime) chime.play();
      else chime.cancel();
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="glass-panel px-6 py-10 text-center sm:px-9" role="status" aria-live="polite">
        <h3 className="heading-display text-2xl">Thank you for reaching out</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          {emailSent
            ? "Dia has received your enquiry and a confirmation email has been sent. She will contact you soon."
            : "Your enquiry is saved. Dia will contact you soon; please call if you need a quick response."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel space-y-4 p-5 sm:p-8">
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="inquiry-website">Leave this field blank</label>
        <input
          id="inquiry-website"
          tabIndex={-1}
          autoComplete="off"
          value={form.website ?? ""}
          onChange={(event) => update({ website: event.target.value })}
        />
      </div>
      <div>
        <label className="field-label" htmlFor="inquiry-name">
          Your name *
        </label>
        <input
          id="inquiry-name"
          className={inputClass}
          autoComplete="name"
          value={form.fullName ?? ""}
          onChange={(event) => update({ fullName: event.target.value })}
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="field-label" htmlFor="inquiry-phone">
            Phone *
          </label>
          <InternationalPhoneInput
            id="inquiry-phone"
            countryCode={form.phoneCountryCode ?? DEFAULT_PHONE_COUNTRY}
            value={form.phone ?? ""}
            onCountryChange={(phoneCountryCode: CountryCode) => update({ phoneCountryCode })}
            onValueChange={(phone) => update({ phone })}
          />
        </div>
        <div>
          <label className="field-label" htmlFor="inquiry-email">
            Email *
          </label>
          <input
            id="inquiry-email"
            className={inputClass}
            type="email"
            autoComplete="email"
            value={form.email ?? ""}
            onChange={(event) => update({ email: event.target.value })}
          />
        </div>
      </div>
      <div>
        <span className="field-label">Best way to reach you?</span>
        <div className="flex flex-wrap gap-2">
          {(["Phone", "Email"] as const).map((method) => (
            <button
              key={method}
              type="button"
              data-checked={form.contactMethod === method}
              className="choice-pill"
              onClick={() => update({ contactMethod: method })}
            >
              {method === "Phone" ? "Phone call" : "Email"}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="field-label" htmlFor="inquiry-message">
          How can we help? *
        </label>
        <textarea
          id="inquiry-message"
          className="field-textarea"
          rows={5}
          value={form.notes ?? ""}
          onChange={(event) => update({ notes: event.target.value })}
        />
      </div>
      <label className="flex cursor-pointer items-start gap-3 text-sm text-foreground/85">
        <input
          type="checkbox"
          className="mt-0.5 h-4.5 w-4.5 accent-[var(--color-primary)]"
          checked={form.agreedTerms ?? false}
          onChange={(event) => update({ agreedTerms: event.target.checked })}
        />
        <span>
          I agree that my details and message can be emailed to Dia and securely stored in Glam by
          Dia's enquiry records so she can respond.
        </span>
      </label>
      {error ? (
        <p
          role="alert"
          className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={busy}
        className="btn-primary min-h-11 w-full disabled:opacity-60"
      >
        {busy ? "Sending…" : "Send your message"}
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Your information is used to respond to your enquiry.
      </p>
    </form>
  );
}
