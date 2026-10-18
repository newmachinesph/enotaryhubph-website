import type { Metadata } from "next";

import { WaitlistForm } from "@/app/waitlist/WaitlistForm";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";
import { Reveal } from "@/components/motion/Reveal";
import { Section } from "@/components/ui/primitives";

export const metadata: Metadata = {
  title: "Join the launch list",
  description:
    "Get a note when eNotaryHub has a concrete release update for individuals, businesses, or notaries in the Philippines.",
  alternates: { canonical: "/waitlist" },
};

export default function WaitlistPage() {
  return (
    <Section className="pt-36 lg:pt-44">
      <BreadcrumbJsonLd name="Launch list" path="/waitlist" />
      <div className="grid gap-16 lg:grid-cols-[1fr_minmax(0,32rem)] lg:gap-24">
        <Reveal>
          <div>
            <p className="font-mono-label text-sun-ink">Launch list</p>
            <h1 className="font-display mt-6 text-[length:var(--text-title)]">
              One useful email when there is news.
            </h1>
            <p className="text-narra-2 measure-wide mt-6 text-[length:var(--text-lead)]">
              Join if you want to know when eNotaryHub opens access or publishes
              a substantial product update. No weekly filler.
            </p>
            <p className="border-sun text-narra-2 text-small mt-10 border-l-2 py-1 pl-5">
              This is a product waitlist, not a notarization request.
            </p>
          </div>
        </Reveal>
        <Reveal delay={110}>
          <WaitlistForm />
        </Reveal>
      </div>
    </Section>
  );
}
