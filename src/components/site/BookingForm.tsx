import { useEffect, useState } from "react";
import { createBookingEmailDraft, type BookingInput } from "@/lib/booking.functions";
import { HeartIcon } from "@/components/site/icons";
import { SITE } from "@/lib/site";

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
    selectedService ? { service: selectedService } : {},
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [emailDraftUrl, setEmailDraftUrl] = useState("");

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
    if (!state.agreedTerms) {
      setError("Please agree to the terms so we can hold your booking.");
      return;
    }
    setBusy(true);
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
        phone: state.phone,
        email: state.email,
        contactMethod: state.contactMethod,
        hasSkinConditions: state.hasSkinConditions,
        skinDetails: state.skinDetails,
        notes: state.notes,
        agreedTerms: state.agreedTerms,
        wantsPromotions: state.wantsPromotions,
        skillsRequested: state.skillsRequested,
      };
      const draftUrl = createBookingEmailDraft(data);
      setEmailDraftUrl(draftUrl);
      setDone(true);
      window.location.href = draftUrl;
      window.scrollTo({ top: 0, behavior: "smooth" });
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    return (
      <div className="glass-panel mx-auto max-w-xl px-8 py-12 text-center">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blush text-primary">
          <HeartIcon className="h-9 w-9" />
        </span>
        <h2 className="heading-display mt-5 text-3xl">Your email draft is ready</h2>
        <p className="mt-4 text-sm leading-relaxed text-foreground/80">
          Your email app should open with your request addressed to Dia. Review it, then tap Send.
          If it didn't open, use the button below. Your request is not sent until you send that email.
        </p>
        <a className="btn-primary mt-6 inline-flex min-h-11 items-center justify-center px-6" href={emailDraftUrl}>
          Open email draft
        </a>
        <p className="mt-4 text-xs text-muted-foreground">
          Need help? Call <a className="font-medium text-primary" href="tel:+61478666466">0478 666 466</a>.
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
          <input
            type="tel"
            className={inputCls}
            placeholder="04xx xxx xxx"
            value={state.phone ?? ""}
            onChange={(e) => set({ phone: e.target.value })}
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
          <span className={labelCls}>Any allergies or skin sensitivities we should know about?</span>
          <Pills
            options={[
              { value: "no", label: "No" },
              { value: "yes", label: "Yes — I'll describe below" },
            ]}
            value={state.hasSkinConditions === true ? "yes" : state.hasSkinConditions === false ? "no" : ""}
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
          I agree to be contacted about my booking and understand the booking is confirmed once
          Glam by Dia confirms availability.
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

      <button type="submit" disabled={busy} className="btn-primary min-h-11 w-full disabled:opacity-60">
        {busy ? "Sending…" : "Send Booking Request"}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground">
        No payment now — we confirm availability with you first.
      </p>
    </form>
  );
}
