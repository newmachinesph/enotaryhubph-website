import type { Metadata } from "next";

import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink, Rule, Section } from "@/components/ui/primitives";
import { getCopy, hrefFor } from "@/content";

export const metadata: Metadata = {
  title: "For notaries",
  alternates: { canonical: "/notaries" },
  description:
    "A planned work surface for commissioned Electronic Notaries Public: intake, eligibility review, session control, electronic execution, and notarial records.",
  openGraph: {
    title: "A planned workspace for Electronic Notaries Public · eNotaryHub",
    description:
      "See how eNotaryHub plans to support intake, eligibility review, live sessions, execution, and required records.",
    url: "/notaries",
  },
};

export default function NotariesPage() {
  const copy = getCopy();
  const { notaries } = copy;

  return (
    <>
      <BreadcrumbJsonLd name="For notaries" path="/notaries" />
      <Section className="pt-36 pb-4 lg:pt-44">
        <Reveal>
          <p className="font-mono-label text-sun-ink">{notaries.eyebrow}</p>
          <h1 className="font-display mt-6 text-[length:var(--text-title)]">
            {notaries.title}
          </h1>
          <p className="text-narra-2 measure-wide mt-6 text-[length:var(--text-lead)]">
            {notaries.lead}
          </p>
        </Reveal>
      </Section>

      <Rule />

      <Section>
        <Reveal>
          <div className="grid gap-12 lg:grid-cols-[10rem_1fr]">
            <span className="font-mono-label text-sun-ink pt-2">Planned tools</span>
            <div>
              <h2 className="font-display text-[length:var(--text-heading)]">
                {notaries.toolsTitle}
              </h2>
              <p className="text-narra-2 measure-wide mt-4">{notaries.toolsIntro}</p>
            </div>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-px md:grid-cols-2 xl:grid-cols-3">
          {notaries.tools.map((tool, i) => (
            <Reveal key={tool.title} delay={i * 60}>
              <div className="capiz-panel h-full p-7">
                <span className="font-mono-label text-sun-ink">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display mt-5 text-[1.35rem] leading-tight">
                  {tool.title}
                </h3>
                <p className="text-narra-2 text-small mt-3">{tool.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Rule />

      {/* The principle the whole page exists to state, given full weight. */}
      <Section>
        <Reveal>
          <blockquote className="border-sun border-l-2 pl-8 lg:pl-12">
            <p className="font-display text-[length:var(--text-title)]">
              {notaries.principle}
            </p>
            <footer className="font-mono-label text-narra-3 mt-6">
              {notaries.principleSource}
            </footer>
          </blockquote>
        </Reveal>
      </Section>

      <Section className="pt-24">
        <Reveal>
          <div className="capiz-panel p-10 lg:p-14">
            <h2 className="font-display text-[length:var(--text-heading)]">
              {notaries.ctaTitle}
            </h2>
            <p className="text-narra-2 measure-wide mt-4">{notaries.ctaBody}</p>
            <div className="mt-8">
              <ButtonLink href={hrefFor("contact")}>
                {copy.common.contact}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </Section>
    </>
  );
}
