import { useState } from "react";
import { Gift, Mail, Sparkles } from "lucide-react";

import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SITE } from "@/lib/site";

type GiftCardForm = {
  senderName: string;
  senderEmail: string;
  recipientName: string;
  preferredAmount: string;
  message: string;
};

const initialForm: GiftCardForm = {
  senderName: "",
  senderEmail: "",
  recipientName: "",
  preferredAmount: "",
  message: "",
};

export default function GiftCards() {
  const [form, setForm] = useState(initialForm);
  const [emailReady, setEmailReady] = useState(false);

  const update = (patch: Partial<GiftCardForm>) => setForm((current) => ({ ...current, ...patch }));

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Gift card enquiry from ${form.senderName.trim()}`);
    const body = [
      "Hello Dia,",
      "",
      "I’d like to enquire about a Glam by Dia gift card.",
      "",
      `From: ${form.senderName.trim()}`,
      `Email: ${form.senderEmail.trim()}`,
      `Recipient: ${form.recipientName.trim() || "Not provided"}`,
      `Preferred amount: ${form.preferredAmount.trim() || "Please advise"}`,
      `Gift message: ${form.message.trim() || "Not provided"}`,
      "",
      "Please contact me with the next steps.",
    ].join("\r\n");
    window.location.href = `mailto:${SITE.email}?subject=${subject}&body=${encodeURIComponent(body)}`;
    setEmailReady(true);
  };

  return (
    <div className="min-h-screen pb-6">
      <Header />
      <main>
        <PageHero
          eyebrow="A thoughtful gift"
          title="Give the Gift of"
          script="Glam"
          subtitle="A beauty experience for birthdays, celebrations and the people you love."
        />
        <section className="px-4 sm:px-6">
          <div className="mx-auto grid max-w-5xl gap-5 lg:grid-cols-[0.8fr_1.2fr]">
            <Reveal>
              <article className="glass-panel flex h-full flex-col justify-center p-6 text-center sm:p-8">
                <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
                  <Gift aria-hidden="true" className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <p className="eyebrow mt-5">Glam by Dia</p>
                <h2 className="heading-display mt-2 text-2xl">A little something special</h2>
                <p className="mt-3 text-sm leading-relaxed text-foreground/75">
                  Tell us who the gift is for and your preferred amount. Dia will reply to confirm
                  available gift card options.
                </p>
                <div className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Sparkles aria-hidden="true" className="h-4 w-4" />
                  No payment is taken on this website.
                </div>
              </article>
            </Reveal>
            <Reveal delay={100}>
              <form onSubmit={submit} className="glass-panel grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
                <label className="field-label">
                  Your name *
                  <input
                    className="field-input mt-1.5"
                    autoComplete="name"
                    required
                    value={form.senderName}
                    onChange={(event) => update({ senderName: event.target.value })}
                  />
                </label>
                <label className="field-label">
                  Your email *
                  <input
                    type="email"
                    className="field-input mt-1.5"
                    autoComplete="email"
                    required
                    value={form.senderEmail}
                    onChange={(event) => update({ senderEmail: event.target.value })}
                  />
                </label>
                <label className="field-label">
                  Recipient name
                  <input
                    className="field-input mt-1.5"
                    value={form.recipientName}
                    onChange={(event) => update({ recipientName: event.target.value })}
                  />
                </label>
                <label className="field-label">
                  Preferred amount
                  <input
                    className="field-input mt-1.5"
                    inputMode="decimal"
                    placeholder="For example, $100"
                    value={form.preferredAmount}
                    onChange={(event) => update({ preferredAmount: event.target.value })}
                  />
                </label>
                <label className="field-label sm:col-span-2">
                  Gift message
                  <textarea
                    className="field-textarea mt-1.5"
                    rows={3}
                    value={form.message}
                    onChange={(event) => update({ message: event.target.value })}
                  />
                </label>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-primary w-full">
                    <Mail aria-hidden="true" className="h-4 w-4" />
                    Continue to Email
                  </button>
                  {emailReady ? (
                    <p role="status" className="mt-3 text-center text-xs text-muted-foreground">
                      Your email app should open with the enquiry prepared. Tap Send to contact Dia.
                      <a className="ml-1 font-medium text-primary underline" href={SITE.emailHref}>
                        Open email instead
                      </a>
                    </p>
                  ) : (
                    <p className="mt-3 text-center text-xs text-muted-foreground">
                      This opens a prefilled email. Your request is sent when you tap Send.
                    </p>
                  )}
                </div>
              </form>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
