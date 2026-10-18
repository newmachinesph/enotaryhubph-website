import { CapizHero } from "@/components/capiz/CapizHero";
import { ProcessLantern, Reveal } from "@/components/motion/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { LegalSource } from "@/components/seo/LegalSource";
import {
  ButtonLink,
  Rule,
  Section,
  SectionHead,
} from "@/components/ui/primitives";
import { getCopy, hrefFor } from "@/content";

export const metadata: Metadata = {
  title: "Electronic notarization for the Philippines",
  description:
    "Understand the planned electronic notarization process in the Philippines, learn what the 2025 Rules require, and join the eNotaryHub launch list.",
  alternates: { canonical: "/" },
};

/**
 * Home.
 *
 * The page runs dark, light, dark: the hero photograph, then the pearl process
 * sections, then the live-appearance section on night, then pearl again into
 * the footer. That rhythm is the two-temperature system — night is the
 * ceremony and the seal, day is the process and the people.
 */
export default function HomePage() {
  const copy = getCopy();
  const { home } = copy;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "@id": "https://enotaryhub.ph/#webpage",
            name: "Electronic notarization for the Philippines",
            description:
              "A plain-language guide to the planned electronic notarization process and eNotaryHub launch.",
            isPartOf: { "@id": "https://enotaryhub.ph/#website" },
            about: { "@id": "https://enotaryhub.ph/#service" },
            inLanguage: "en-PH",
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "@id": "https://enotaryhub.ph/#service",
            name: "eNotaryHub electronic notarization platform",
            serviceType: "Electronic notarization workflow platform",
            areaServed: { "@type": "Country", name: "Philippines" },
            provider: { "@id": "https://enotaryhub.ph/#organization" },
            audience: [
              { "@type": "Audience", audienceType: "Individuals" },
              { "@type": "BusinessAudience", audienceType: "Organizations" },
              { "@type": "Audience", audienceType: "Electronic Notaries Public" },
            ],
          },
          /* The FAQPage entry moved to /how-it-works with the questions
             themselves. Structured data has to describe content the page
             actually shows. */
        ]}
      />
      <CapizHero />

      {/* § 2.0 — the four guarded moments */}
      <Section className="pt-24 lg:pt-32">
        <Reveal>
          <SectionHead
            kicker={home.introKicker}
            title={home.introTitle}
            intro={home.introBody}
          />
        </Reveal>

        <div className="mt-16">
          <ProcessLantern steps={home.steps} states={home.stepStates} />
        </div>
      </Section>

      <Rule />

      {/* § 3.0 — the live appearance, on night */}
      <section className="bloom bloom--night bg-night text-vellum relative z-10 py-24 lg:py-32">
        <div className="mx-auto max-w-[104rem] px-[max(1.5rem,4vw)] xl:pl-[calc(var(--rail-width)+2rem)]">
          <Reveal>
            <div className="grid gap-12 lg:grid-cols-[10rem_1fr]">
              <div className="flex flex-col gap-1 pt-2">
                <span className="font-mono-label text-vellum-2">
                  {home.sessionKicker}
                </span>
              </div>

              <div>
                <h2 className="font-display text-[length:var(--text-title)]">
                  {home.sessionTitle}
                </h2>
                <p className="text-vellum-2 measure-wide mt-6 text-[length:var(--text-lead)]">
                  {home.sessionBody}
                </p>

                <ul className="mt-12 grid gap-px sm:grid-cols-2">
                  {home.sessionPoints.map((point) => (
                    <li
                      key={point}
                      className="capiz-panel capiz-panel--night flex items-center gap-4 p-6"
                    >
                      <span
                        aria-hidden="true"
                        className="bg-sun h-1.5 w-1.5 shrink-0 rounded-full"
                      />
                      <span className="text-small">{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Runs the full width of the grid above it. Held to `measure`
                    it stopped halfway across the panels and read as a column
                    that had lost its other half. */}
                <p className="text-vellum-2 mt-10 max-w-[80ch] text-[0.9rem] leading-relaxed opacity-80">
                  {home.sessionNote}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* § 4.0 — audiences */}
      <Section className="bloom pt-24 lg:pt-32">
        <Reveal>
          <SectionHead
            kicker="Who it is for"
            title={home.audienceTitle}
            intro={home.audienceBody}
          />
        </Reveal>

        <div className="mt-16 grid gap-px lg:grid-cols-3">
          {home.audiences.map((audience, i) => (
            <Reveal key={audience.title} delay={i * 90}>
              <article className="capiz-panel gather flex h-full flex-col justify-between p-8">
                <div>
                  <h3 className="font-display smallcaps text-[1.7rem] leading-tight">
                    {audience.title}
                  </h3>
                  <p className="text-narra-2 text-small mt-4">{audience.body}</p>
                </div>
                <p className="mt-10">
                  <ButtonLink href={hrefFor(audience.page)} tone="quiet">
                    {audience.cta}
                  </ButtonLink>
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </Section>

      <Rule />

      {/* The "what the rules require" section used to sit here. It restated the
          capability section above it — identity, location, live appearance and
          records appeared in both — so its two unique cards (accredited
          facility, notary review) moved into that section's point list and the
          section itself is gone. One less section, and the manifesto below
          already carries the "a platform cannot replace the notary" line that
          was its intro. */}

      {/* Manifesto — the one moment the page speaks at full display scale */}
      <Section className="pt-28 lg:pt-40">
        <Reveal>
          <blockquote className="border-sun border-l-2 pl-8 lg:pl-12">
            <p className="font-display text-[length:var(--text-title)]">
              {home.manifestoTitle}
            </p>
            <p className="text-narra-2 measure-wide mt-6 text-[length:var(--text-lead)]">
              {home.manifestoBody}
            </p>
          </blockquote>
        </Reveal>
      </Section>

      <Rule />

      {/* § 6.0 — direct launch-list conversion */}
      <section className="bg-sun-wash border-mullion-soft relative z-10 border-y py-24 lg:py-32" aria-labelledby="home-waitlist-title">
        <div className="mx-auto grid max-w-[104rem] gap-12 px-[max(1.5rem,4vw)] lg:grid-cols-[minmax(0,1fr)_minmax(20rem,32rem)] lg:items-start xl:pl-[calc(var(--rail-width)+2rem)]">
          <div>
            <p className="font-mono-label text-sun-ink">
              {home.waitlistKicker}
            </p>
            <h2
              id="home-waitlist-title"
              className="font-display mt-5 text-[length:var(--text-title)]"
            >
              {home.waitlistTitle}
            </h2>
            <p className="text-narra-2 measure-wide mt-6 text-[length:var(--text-lead)]">
              {home.waitlistBody}
            </p>
          </div>
          <div className="capiz-panel p-5 sm:p-9">
            <WaitlistForm />
          </div>
        </div>
      </section>

      {/* The FAQ block used to sit here. On a landing page it answered the
          visitor's questions well enough that they had no reason to leave their
          details, which is the one thing this page is for. The questions moved
          to /how-it-works, along with the FAQPage structured data, so the
          search value is kept rather than deleted. */}

      <Section className="pb-24 lg:pb-32">
        <LegalSource />
      </Section>
    </>
  );
}
import type { Metadata } from "next";

import { WaitlistForm } from "@/app/waitlist/WaitlistForm";
