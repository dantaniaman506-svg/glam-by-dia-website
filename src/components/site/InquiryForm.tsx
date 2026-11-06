import { useState, type FormEvent } from "react";
import type { CountryCode } from "libphonenumber-js";
import type { BookingInput } from "@/lib/booking.types";
import { createEmailDraft } from "@/lib/email-draft";
import { InternationalPhoneInput } from "@/components/site/InternationalPhoneInput";
import { DEFAULT_PHONE_COUNTRY, getPhoneDetails } from "@/lib/phone";

const inputClass = "field-input";

export function InquiryForm() {
  const [form, setForm] = useState<Partial<BookingInput>>({
    formType: "message",
    phoneCountryCode: DEFAULT_PHONE_COUNTRY,
  });
  const [error, setError] = useState("");
  const [emailDraftUrl, setEmailDraftUrl] = useState("");

  const update = (values: Partial<BookingInput>) =>
    setForm((current) => ({ ...current, ...values }));

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
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
      setError("Please confirm that you understand the email step.");
      return;
    }
    const emailDraftUrl = createEmailDraft({
      formType: "message",
      fullName: form.fullName,
      ...phoneDetails,
      email: form.email,
      contactMethod: form.contactMethod,
      notes: form.notes,
      agreedTerms: form.agreedTerms,
    });
    setEmailDraftUrl(emailDraftUrl);
    window.location.href = emailDraftUrl;
  }

  if (emailDraftUrl) {
    return (
      <div className="glass-panel px-6 py-10 text-center sm:px-9" role="status" aria-live="polite">
        <h3 className="heading-display text-2xl">Your email draft is ready</h3>
        <p className="mt-3 text-sm leading-relaxed text-foreground/80">
          Your email app should open with your message addressed to Dia and all details filled in.
          Tap Send in your email app to finish.
        </p>
        <a className="btn-primary mt-5" href={emailDraftUrl}>
          Open email draft again
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel space-y-4 p-5 sm:p-8">
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
          I understand this form opens a prefilled email to Dia, and I must tap Send for her to
          receive my message.
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
      <button type="submit" className="btn-primary min-h-11 w-full">
        Open email app
      </button>
      <p className="text-center text-xs text-muted-foreground">
        Your information is used to respond to your enquiry.
      </p>
    </form>
  );
}
