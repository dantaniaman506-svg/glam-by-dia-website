import { useEffect, useState } from "react";
import { submitBooking, type BookingInput } from "@/lib/booking.functions";
import { HeartIcon } from "@/components/site/icons";
import { InternationalPhoneInput } from "@/components/site/InternationalPhoneInput";
import { SITE } from "@/lib/site";
import { DEFAULT_PHONE_COUNTRY, getPhoneDetails } from "@/lib/phone";
import { prepareSuccessChime } from "@/lib/success-chime";

type Pill = { value: string; label: string };

export type BookingFormConfig = {
  formType: "beauty" | "henna" | "class";
  services: string[];
  customerTypes?: Pill[];
  skinQuestion?: boolean;
  skillsQuestion?: string;
};

const CONTACT_METHODS: Pill[] = [
  { value: "Phone", label: "Phone call" },
  { value: "Email", label: "Email" },
];

const LOCATIONS: Pill[] = [
  { value: "Mobile", label: "Mobile — at my location" },
  { value: "Studio", label: "Studio in Clayton South" },
];

const inputCls = "field-input";
const labelCls = "field-label";

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className={labelCls}>{label}</label>
      {children}
    </div>
  );
}

function Pills({
  options,
  value,
  onChange,
}: {
  options: readonly Pill[];
  value: string | undefined;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          data-checked={value === o.value}
          onClick={() => onChange(o.value)}
          className="choice-pill"
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function BookingForm({
  config,
  selectedService,
  onServiceChange,
}: {
  config: BookingFormConfig;
  selectedService?: string | undefined;
  onServiceChange?: (service: string) => void;
}) {
  const [state, setState] = useState<Partial<BookingInput>>(() =>
    selectedService
      ? { service: selectedService, phoneCountryCode: DEFAULT_PHONE_COUNTRY }
      : { phoneCountryCode: DEFAULT_PHONE_COUNTRY },
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  useEffect(() => {
    if (selectedService && config.services.includes(selectedService)) {
      setState((current) => ({ ...current, service: selectedService }));
    }
  }, [config.services, selectedService]);

  const set = (patch: Partial<BookingInput>) => setState((s) => ({ ...s, ...patch }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!state.fullName?.trim() || !state.phone?.trim() || !state.email?.trim()) {
      setError("Please fill in your name, phone and email so we can get back to you.");
      return;
    }
    const phoneDetails = getPhoneDetails(
      state.phone,
      state.phoneCountryCode ?? DEFAULT_PHONE_COUNTRY,
    );
    if (!phoneDetails) {
      setError("Please enter a valid phone number for your selected country.");
      return;
    }
    if (!state.agreedTerms) {
      setError("Please agree to the terms so we can hold your booking.");
      return;
    }
    setBusy(true);
    const chime = prepareSuccessChime();
    let playChime = false;
    try {
      const data: BookingInput = {
        formType: config.formType,
        service: state.service,
        customerType: state.customerType,
        preferredDate: state.preferredDate,
        preferredTime: state.preferredTime,
        locationPreference: state.locationPreference,
        locationAddress: state.locationAddress,
        fullName: state.fullName,
        ...phoneDetails,
        email: state.email,
        contactMethod: state.contactMethod,
        hasSkinConditions: state.hasSkinConditions,
        skinDetails: state.skinDetails,
        notes: state.notes,
        agreedTerms: state.agreedTerms,
        wantsPromotions: state.wantsPromotions,
        skillsRequested: state.skillsRequested,
        website: state.website,
      };
      const result = await submitBooking(data);
      if (!result.ok) {
        setError(result.message);
      } else {
        setEmailSent(result.emailSent);
        setDone(true);
        playChime = true;
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } finally {
      if (playChime) chime.play();
      else chime.cancel();
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div
        className="glass-panel mx-auto max-w-xl px-8 py-12 text-center"
        role="status"
        aria-live="polite"
      >
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush text-primary">
          <HeartIcon className="h-9 w-9" />
        </span>
        <h2 className="heading-display mt-5 text-3xl">Thank you — your request is with Dia</h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          We’ve received your appointment request. Dia will contact you soon to discuss your booking
          and confirm availability.
        </p>
        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {emailSent
            ? "A confirmation email has also been sent to you."
            : "Your request is saved. If you need a quick response, please call Dia."}
        </p>
        <p className="mt-4 text-xs text-muted-foreground">
          Need help? Call{" "}
          <a className="font-medium text-primary" href="tel:+61478666466">
            0478 666 466
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      id="booking-request-form"
      onSubmit={submit}
      className="glass-panel mx-auto max-w-2xl scroll-mt-28 px-5 py-8 sm:px-10 sm:py-10"
    >
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="booking-website">Leave this field blank</label>
        <input
          id="booking-website"
          tabIndex={-1}
          autoComplete="off"
          value={state.website ?? ""}
          onChange={(event) => set({ website: event.target.value })}
        />
      </div>
      {config.customerTypes ? (
        <div className="mb-5">
          <span className={labelCls}>Who is this for?</span>
          <Pills
            options={config.customerTypes}
            value={state.customerType}
            onChange={(v) => set({ customerType: v })}
          />
        </div>
      ) : null}

      {config.services.length > 0 ? (
        <Field label="Which service would you like?" className="mb-5">
          <select
            aria-label="Which service would you like?"
            className="field-select"
            value={state.service ?? ""}
            onChange={(e) => {
              set({ service: e.target.value });
              onServiceChange?.(e.target.value);
            }}
          >
            <option value="">Select a service…</option>
            {config.services.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      ) : null}

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Preferred date">
          <input
            type="date"
            className={inputCls}
            value={state.preferredDate ?? ""}
            onChange={(e) => set({ preferredDate: e.target.value })}
          />
        </Field>
        <Field label="Preferred time">
          <input
            type="time"
            className={inputCls}
            value={state.preferredTime ?? ""}
            onChange={(e) => set({ preferredTime: e.target.value })}
          />
        </Field>
      </div>

      <div className="mb-5">
        <span className={labelCls}>Where would you like your appointment?</span>
        <Pills
          options={LOCATIONS}
          value={state.locationPreference}
          onChange={(v) => set({ locationPreference: v })}
        />
        {state.locationPreference === "Mobile" ? (
          <input
            className={`${inputCls} mt-3`}
            placeholder="Your address or venue (suburb is fine)"
            value={state.locationAddress ?? ""}
            onChange={(e) => set({ locationAddress: e.target.value })}
          />
        ) : null}
      </div>

      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field label="Full name *">
          <input
            className={inputCls}
            placeholder="Your name"
            value={state.fullName ?? ""}
            onChange={(e) => set({ fullName: e.target.value })}
          />
        </Field>
        <Field label="Phone *">
          <InternationalPhoneInput
            id="booking-phone"
            countryCode={state.phoneCountryCode ?? DEFAULT_PHONE_COUNTRY}
            value={state.phone ?? ""}
            onCountryChange={(phoneCountryCode) => set({ phoneCountryCode })}
            onValueChange={(phone) => set({ phone })}
          />
        </Field>
      </div>

      <Field label="Email *" className="mb-5">
        <input
          type="email"
          className={inputCls}
          placeholder="you@example.com"
          value={state.email ?? ""}
          onChange={(e) => set({ email: e.target.value })}
        />
      </Field>

      <div className="mb-5">
        <span className={labelCls}>Best way to reach you?</span>
        <Pills
          options={CONTACT_METHODS}
          value={state.contactMethod}
          onChange={(v) => set({ contactMethod: v as "Phone" | "Email" })}
        />
      </div>

      {config.skinQuestion ? (
        <div className="mb-5">
          <span className={labelCls}>
            Any allergies or skin sensitivities we should know about?
          </span>
          <Pills
            options={[
              { value: "no", label: "No" },
              { value: "yes", label: "Yes — I'll describe below" },
            ]}
            value={
              state.hasSkinConditions === true
                ? "yes"
                : state.hasSkinConditions === false
                  ? "no"
                  : ""
            }
            onChange={(v) => set({ hasSkinConditions: v === "yes" })}
          />
          {state.hasSkinConditions ? (
            <textarea
              className={`${inputCls} field-textarea mt-3`}
              rows={3}
              placeholder="Tell us about any allergies or sensitive areas"
              value={state.skinDetails ?? ""}
              onChange={(e) => set({ skinDetails: e.target.value })}
            />
          ) : null}
        </div>
      ) : null}

      {config.skillsQuestion ? (
        <Field label={config.skillsQuestion} className="mb-5">
          <textarea
            className="field-textarea"
            rows={3}
            placeholder="e.g. everyday looks, eye makeup, contouring…"
            value={state.skillsRequested ?? ""}
            onChange={(e) => set({ skillsRequested: e.target.value })}
          />
        </Field>
      ) : null}

      <Field label="Anything else we should know?" className="mb-6">
        <textarea
          className="field-textarea"
          rows={3}
          placeholder="Wedding party size, timings, inspiration links…"
          value={state.notes ?? ""}
          onChange={(e) => set({ notes: e.target.value })}
        />
      </Field>

      <label className="mb-3 flex cursor-pointer items-start gap-3 text-sm text-foreground/85">
        <input
          type="checkbox"
          className="mt-0.5 h-4.5 w-4.5 accent-[var(--color-primary)]"
          checked={state.agreedTerms ?? false}
          onChange={(e) => set({ agreedTerms: e.target.checked })}
        />
        <span>
          I agree to be contacted about my booking. I understand my details will be securely stored
          in Glam by Dia's booking records, and the booking is confirmed once Dia confirms
          availability.
        </span>
      </label>
      <label className="mb-6 flex cursor-pointer items-start gap-3 text-sm text-foreground/85">
        <input
          type="checkbox"
          className="mt-0.5 h-4.5 w-4.5 accent-[var(--color-primary)]"
          checked={state.wantsPromotions ?? false}
          onChange={(e) => set({ wantsPromotions: e.target.checked })}
        />
        <span>Keep me posted about offers and updates (optional).</span>
      </label>

      {error ? (
        <p
          role="alert"
          className="mb-4 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
        >
          {error}{" "}
          <a className="font-semibold underline underline-offset-2" href={SITE.phoneHref}>
            Call {SITE.phoneDisplay}
          </a>{" "}
          or{" "}
          <a className="font-semibold underline underline-offset-2" href={SITE.emailHref}>
            email Dia
          </a>
        </p>
      ) : null}

      <button
        type="submit"
        disabled={busy}
        className="btn-primary min-h-11 w-full disabled:opacity-60"
      >
        {busy ? "Sending…" : "Send Booking Request"}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        No payment now — we confirm availability with you first.
      </p>
    </form>
  );
}
