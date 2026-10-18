import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

import { BackToTop } from "@/components/chrome/BackToTop";
import { MarginaliaRail } from "@/components/chrome/MarginaliaRail";
import { MullionGrid } from "@/components/chrome/MullionGrid";
import { SiteFooter } from "@/components/chrome/SiteFooter";
import { SiteNav } from "@/components/chrome/SiteNav";
import { JsonLd } from "@/components/seo/JsonLd";
import { SLOGAN, getCopy } from "@/content";

import "../globals.css";

const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://enotaryhub.ph",
);
const isPublicRelease = process.env.NEXT_PUBLIC_SITE_INDEXABLE === "true";

/**
 * Fraunces carries the display voice. SOFT and WONK are requested explicitly
 * because next/font ships only the weight axis by default, and those two axes
 * are what make the face ours rather than a default serif.
 */
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: `eNotaryHub — ${SLOGAN.full}`,
    template: "%s · eNotaryHub",
  },
  description:
    "Electronic notarization being built for the Philippines under the Supreme Court's Rules on Electronic Notarization. Prepare the document, complete the checks, appear before an Electronic Notary Public, receive the record.",
  applicationName: "eNotaryHub",
  category: "legal technology",
  openGraph: {
    title: `eNotaryHub — ${SLOGAN.full}`,
    description:
      "Electronic notarization being built for the Philippines. Information only, not legal advice.",
    type: "website",
    locale: "en_PH",
    siteName: "eNotaryHub",
  },
  twitter: {
    card: "summary_large_image",
    title: `eNotaryHub — ${SLOGAN.full}`,
    description: "Electronic notarization being built for the Philippines.",
  },
  alternates: { canonical: "/" },
  robots: { index: isPublicRelease, follow: isPublicRelease },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  const copy = getCopy();

  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable} h-full`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd
          data={[
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "@id": `${siteUrl}#organization`,
              name: "eNotaryHub",
              url: siteUrl.toString(),
              areaServed: {
                "@type": "Country",
                name: "Philippines",
              },
              description:
                "A pre-launch electronic-notarization service for the Philippines.",
              knowsAbout: [
                "Electronic notarization in the Philippines",
                "A.M. No. 24-10-14-SC",
                "Rules on Electronic Notarization",
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "@id": `${siteUrl}#website`,
              name: "eNotaryHub",
              url: siteUrl.toString(),
              publisher: { "@id": `${siteUrl}#organization` },
              inLanguage: "en-PH",
            },
          ]}
        />
        <a
          href="#main"
          className="bg-narra text-pearl sr-only z-50 px-4 py-2 focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
        >
          {copy.common.skipToContent}
        </a>

        <MullionGrid />
        <MarginaliaRail status="Electronic notarization" />

        <SiteNav />

        <main id="main" className="relative z-10 flex-1">
          {children}
        </main>

        <BackToTop />
        <SiteFooter />
      </body>
    </html>
  );
}
