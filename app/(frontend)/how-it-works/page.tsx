import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalSource } from "@/components/seo/LegalSource";

import { Reveal } from "@/components/motion/Reveal";
import {
  ButtonLink,
  Disclosure,
  Rule,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { getCopy, hrefFor } from "@/content";

export const metadata: Metadata = {
  title: "How it works",
  alternates: { canonical: "/how-it-works" },
  description:
    "The planned path for an electronic notarization request: describe it, complete the checks, wait for review, appear live, sign, and receive the record.",
  openGraph: {
    title: "How electronic notarization works in the Philippines · eNotaryHub",
    description:
      "A plain-language walkthrough of the planned electronic-notarization process under A.M. No. 24-10-14-SC.",
    url: "/how-it-works",
  },
};

/**
 * How it works.
 *
 * A numbered ladder rather than a card grid. The steps are sequential and
 * gated — each has to complete before the next can start — so they are laid
 * out as a document's numbered clauses, not as parallel options.
 */
export default function HowItWorksPage() {
  const copy = getCopy();
  const { how } = copy;

  return (
    <>
      <BreadcrumbJsonLd name="How it works" path="/how-it-works" />
      <Section className="pt-36 pb-4 lg:pt-44">
        <Reveal>
          <p className="font-mono-label text-sun-ink">{how.eyebrow}</p>
          <h1 className="font-display mt-6 text-[length:var(--text-title)]">
            {how.title}
          </h1>
          <p className="text-narra-2 measure-wide mt-6 text-[length:var(--text-lead)]">
            {how.lead}
          </p>
        </Reveal>
        <LegalSource />
      </Section>

      <Rule />

      <Section>
        <ol className="border-mullion-soft border-t">
          {how.steps.map((step, i) => (
            <Reveal
              key={step.index}
              as="li"
              delay={i * 60}
              className="border-mullion-soft gather hover:bg-pearl-deep grid gap-4 border-b py-9 lg:grid-cols-[7rem_18rem_1fr] lg:gap-10"
            >
              <span className="font-mono-label text-sun-ink pt-1.5">
                {step.index}
              </span>
              <h2 className="font-display text-[1.5rem] leading-tight">
                {step.title}
              </h2>
              <p className="text-narra-2 text-small max-w-2xl">{step.body}</p>
            </Reveal>
          ))}
        </ol>
      </Section>

      <Rule />

      <Section>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[10rem_1fr]">
            <span className="font-mono-label text-sun-ink pt-2">Before you begin</span>

            <div>
              <h2 className="font-display text-[length:var(--text-heading)]">
                {how.prepareTitle}
              </h2>
              <p className="text-narra-2 measure-wide mt-4">{how.prepareIntro}</p>

              <ul className="mt-10 grid gap-px md:grid-cols-2">
                {how.prepare.map((item) => (
                  <li
                    key={item}
                    className="capiz-panel text-small flex items-start gap-4 p-6"
                  >
                    <span
                      aria-hidden="true"
                      className="bg-sun mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-24">
        <Reveal>
          <div className="capiz-panel p-10 lg:p-14">
            <h2 className="font-display text-[length:var(--text-heading)]">
              {how.ctaTitle}
            </h2>
            <p className="text-narra-2 measure-wide mt-4">{how.ctaBody}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <ButtonLink href={hrefFor("contact")}>
                {copy.common.contact}
              </ButtonLink>
              <ButtonLink href={hrefFor("business")} tone="quiet">
                {copy.nav.business}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>

      {/* Questions — moved here from the home page, which needs to ask for
          contact details rather than answer everything before the visitor gets
          that far. This is where someone reading the process would look for
          them anyway. */}
      <Section className="py-24 lg:py-32">
        <Reveal>
          <SectionHead
            kicker="Questions"
            title={copy.home.faqTitle}
            intro={copy.home.faqIntro}
          />
        </Reveal>

        {/* Capped: run full width and the toggle drifts so far from its
            question that the two stop reading as one row. */}
        <div className="mt-14 max-w-[52rem] lg:ml-[calc(10rem+3rem)]">
          {copy.home.faqs.map((faq) => (
            <Disclosure
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </Section>

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: copy.home.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.question,
              acceptedAnswer: { "@type": "Answer", text: faq.answer },
            })),
          },
        ]}
      />
    </>
  );
}
