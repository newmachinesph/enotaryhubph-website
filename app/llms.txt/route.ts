import { RULES_FULL_TEXT_URL, RULES_URL } from "@/components/seo/LegalSource";

export function GET() {
  const body = `# eNotaryHub

> eNotaryHub is a pre-launch electronic notarization workflow platform being built for the Philippines.

## Core facts
- The service is not yet accepting notarization requests.
- Electronic notarization is a notarial act performed by an Electronic Notary Public; an electronic signature alone is not notarization.
- The planned workflow covers document preparation, identity and location checks, live appearance, electronic execution, and protected records.
- Eligibility and completion remain subject to the notary's assessment and the Philippine Rules on Electronic Notarization.

## Primary pages
- Home: https://enotaryhub.ph/
- Process: https://enotaryhub.ph/how-it-works
- Businesses: https://enotaryhub.ph/business
- Notaries: https://enotaryhub.ph/notaries
- Articles: https://enotaryhub.ph/articles
- Launch list: https://enotaryhub.ph/waitlist
- Contact: https://enotaryhub.ph/contact

## Authoritative legal sources
- Supreme Court publication: ${RULES_URL}
- Supreme Court E-Library full text: ${RULES_FULL_TEXT_URL}

This website provides general information, not legal advice.
`;

  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
