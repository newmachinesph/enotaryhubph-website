import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, Rule, Section } from "@/components/ui/primitives";
import { getCopy, hrefFor } from "@/content";

export const metadata: Metadata = {
  title: "For business",
  alternates: { canonical: "/business" },
  description:
    "A planned workspace for Philippine legal, HR, finance, operations, and administrative teams that coordinate notarization work.",
  openGraph: {
    title: "Electronic notarization for Philippine businesses · eNotaryHub",
    description:
      "See the planned request, review, participant, and records workflow for teams coordinating electronic notarization.",
    url: "/business",
  },
};

export default function BusinessPage() {
  const copy = getCopy();
  const { business } = copy;

  return (
    <>
      <BreadcrumbJsonLd name="For business" path="/business" />
      <Section className="pt-36 pb-4 lg:pt-44">
        <Reveal>
          <p className="font-mono-label text-sun-ink">{business.eyebrow}</p>
          <h1 className="font-display mt-6 text-[length:var(--text-title)]">
            {business.title}
          </h1>
          <p className="text-narra-2 measure-wide mt-6 text-[length:var(--text-lead)]">
            {business.lead}
          </p>
        </Reveal>
      </Section>

      <Rule />

      <Section>
        <div className="grid gap-px md:grid-cols-2">
          {business.pains.map((pain, i) => (
            <Reveal key={pain.title} delay={i * 70}>
              <div className="capiz-panel h-full p-8">
                <h2 className="font-display text-[1.5rem] leading-tight">
                  {pain.title}
                </h2>
                <p className="text-narra-2 text-small mt-4">{pain.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Rule />

      <Section>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[10rem_1fr]">
            <span className="font-mono-label text-sun-ink pt-2">Common requests</span>

            <div>
              <h2 className="font-display text-[length:var(--text-heading)]">
                {business.useTitle}
              </h2>
              <p className="text-narra-2 measure-wide mt-4">{business.useIntro}</p>

              <ul className="border-mullion-soft mt-10 border-t">
                {business.uses.map((use) => (
                  <li
                    key={use}
                    className="border-mullion-soft gather hover:text-sun-ink flex items-center gap-5 border-b py-4"
                  >
                    <span className="font-mono-label text-narra-3">—</span>
                    {use}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </Section>

      <Section className="pt-24">
        <Reveal>
          <div className="bloom bloom--night bg-night text-vellum p-10 lg:p-14">
            <h2 className="font-display text-[length:var(--text-heading)]">
              {business.ctaTitle}
            </h2>
            <p className="text-vellum-2 measure-wide mt-4">{business.ctaBody}</p>
            <div className="mt-8">
              <ButtonLink href={hrefFor("contact")} tone="dark">
                {copy.common.contact}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
