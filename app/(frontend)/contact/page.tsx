import type { Metadata } from "next";

import { Reveal } from "@/components/motion/Reveal";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Section } from "@/components/ui/primitives";
import { getCopy } from "@/content";

import { ContactForm } from "@/app/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  alternates: { canonical: "/contact" },
  description:
    "Tell us how notarization requests move through your team today, or ask about the planned service. eNotaryHub is pre-launch and cannot accept notarization requests yet.",
  openGraph: {
    title: "Contact eNotaryHub",
    description:
      "Ask about the planned electronic-notarization service or describe how document requests move through your team.",
    url: "/contact",
  },
};

/**
 * Contact.
 *
 * A focused page with no competing conversion action: no launch-list form, no
 * secondary calls to action. The launch status sits directly above the form so
 * nobody submits under the impression that this is a notarization request.
 */
export default function ContactPage() {
  const copy = getCopy();

  return (
    <Section className="pt-36 lg:pt-44">
      <BreadcrumbJsonLd name="Contact" path="/contact" />
      <div className="grid gap-16 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-24">
        <Reveal>
          <div>
            <p className="font-mono-label text-sun-ink">
              {copy.contact.eyebrow}
            </p>
            <h1 className="font-display mt-6 text-[length:var(--text-title)]">
              {copy.contact.title}
            </h1>
            <p className="text-narra-2 measure-wide mt-6 text-[length:var(--text-lead)]">
              {copy.contact.lead}
            </p>

            <p className="border-sun text-narra-2 text-small mt-10 border-l-2 py-1 pl-5">
              {copy.contact.note}
            </p>
            <p className="text-narra-2 mt-7 text-small">
              Prefer email? Write to{" "}
              <a
                href="mailto:hello@enotaryhub.ph"
                className="gather text-sun-ink hover:text-narra underline underline-offset-4"
              >
                hello@enotaryhub.ph
              </a>
              .
            </p>
          </div>
        </Reveal>

        <Reveal delay={110}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
