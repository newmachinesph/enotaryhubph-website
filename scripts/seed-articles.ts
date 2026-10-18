import config from "@payload-config";
import { getPayload } from "payload";

const SC_RULES =
  "https://sc.judiciary.gov.ph/24-10-14-sc-rules-on-electronic-notarization/";
const SC_FAQS = "https://sc.judiciary.gov.ph/enotary-services/faqs/";
const SC_ANNOUNCEMENT =
  "https://sc.judiciary.gov.ph/sc-approves-rules-on-electronic-notarization-advancing-digital-innovation-and-access-to-justice/";
const SC_FULL_TEXT =
  "https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/11/98644";

function richText(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      children: paragraphs.map((text) => ({
        type: "paragraph",
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal",
            style: "",
            text,
            version: 1,
          },
        ],
        direction: "ltr",
        format: "" as const,
        indent: 0,
        textFormat: 0,
        textStyle: "",
        version: 1,
      })),
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      version: 1,
    },
  };
}

const publishedAt = new Date().toISOString();

const articles = [
  {
    title: "Electronic notarization in the Philippines: what it actually means",
    slug: "what-electronic-notarization-means-philippines",
    excerpt:
      "Electronic notarization covers electronic documents and specific notarial acts performed by a commissioned Electronic Notary Public through an accredited facility.",
    imageUrl:
      "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1600&q=82",
    imageAlt: "Law books and a brass scale on a desk",
    sourceName: "Supreme Court of the Philippines eNotary FAQs",
    sourceUrl: SC_FAQS,
    content: richText([
      "Electronic notarization is a notarial act involving an electronic document. A commissioned Electronic Notary Public performs it through an Electronic Notarization Facility accredited under the Rules.",
      "The Rules cover acknowledgment, affirmation or oath, jurat, and signature witnessing by electronic means. They don't turn every digital signature into a notarized signature, and they don't replace traditional notarization for paper documents.",
      "For someone preparing a request, the useful distinction is simple: signing belongs to the participant; notarizing belongs to the notary. The notary still checks identity, willingness, the document, and the act requested before deciding whether to proceed.",
    ]),
    sourceNote:
      "Primary source: Supreme Court of the Philippines, Electronic Notary Services FAQs. General information only; not legal advice.",
  },
  {
    title: "A digital signature is not the same as notarization",
    slug: "digital-signature-is-not-notarization",
    excerpt:
      "A person may sign an electronic document without completing a notarial act. The notary’s certificate, signature, and seal serve a different purpose.",
    imageUrl:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=82",
    imageAlt: "A person reviewing and signing documents at a desk",
    sourceName: "Rules on Electronic Notarization, A.M. No. 24-10-14-SC",
    sourceUrl: SC_FULL_TEXT,
    content: richText([
      "An electronic signature records a person’s act of signing. Notarization records a notary’s performance of a legally defined notarial act. Those events may happen in the same workflow, but they aren't interchangeable.",
      "Under the Rules, the Electronic Notary Public completes the applicable certificate and applies the required electronic signature and seal. The notary must also make the required record in the electronic notarial book.",
      "So a signed PDF isn't automatically notarized. If a document needs notarization, the signer must complete the appearance, identity checks, and other steps required for the requested act.",
    ]),
    sourceNote:
      "Primary source: Supreme Court E-Library full text of A.M. No. 24-10-14-SC. General information only; not legal advice.",
  },
  {
    title: "Remote appearance still happens live",
    slug: "remote-electronic-notarization-live-appearance",
    excerpt:
      "Remote electronic notarization uses live two-way audio and video. A recording sent ahead of time does not satisfy the appearance requirement.",
    imageUrl:
      "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?auto=format&fit=crop&w=1600&q=82",
    imageAlt: "A laptop showing people in a live video meeting",
    sourceName: "Supreme Court Rules on Electronic Notarization",
    sourceUrl: SC_RULES,
    content: richText([
      "Remote doesn't mean asynchronous. The participant and Electronic Notary Public must communicate through live, two-way audio and video while the notarial act takes place.",
      "That live session lets the notary observe the participant, ask questions, and assess whether the person appears willing and aware of the document’s general nature. Identity and location checks also form part of the process.",
      "For ordinary remote electronic notarization, participants must be in the Philippines. The Rules describe limited cases involving a principal inside a Philippine embassy, consular office, or honorary consul’s office abroad.",
    ]),
    sourceNote:
      "Primary source: Supreme Court of the Philippines publication of A.M. No. 24-10-14-SC. General information only; not legal advice.",
  },
  {
    title: "Why the new rules supplement paper notarization",
    slug: "electronic-notarization-supplements-paper-notarization",
    excerpt:
      "The 2025 Rules add an electronic route. Traditional notarization under the 2004 rules remains available for paper documents and handwritten signatures.",
    imageUrl:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=82",
    imageAlt: "Printed forms, a calculator, and a pen on a desk",
    sourceName: "Supreme Court announcement on electronic notarization",
    sourceUrl: SC_ANNOUNCEMENT,
    content: richText([
      "The Rules on Electronic Notarization create another lawful route for eligible electronic documents. They don't abolish the familiar paper process governed by the 2004 Rules on Notarial Practice.",
      "That distinction matters when choosing how to prepare a document. Paper documents carrying handwritten signatures or marks continue through traditional notarization, while an electronic request must meet the separate requirements for electronic documents, facilities, signatures, seals, and records.",
      "Document eligibility still depends on the Rules and the notary’s review. Notarial wills and deposition taking sit outside the electronic framework described in the Supreme Court’s public guidance.",
    ]),
    sourceNote:
      "Primary source: Supreme Court of the Philippines announcement dated March 9, 2025. General information only; not legal advice.",
  },
] as const;

const payload = await getPayload({ config });

for (const article of articles) {
  const existing = await payload.find({
    collection: "posts",
    where: { slug: { equals: article.slug } },
    limit: 1,
  });

  const data = { ...article, status: "published" as const, publishedAt };
  if (existing.docs[0]) {
    await payload.update({ collection: "posts", id: existing.docs[0].id, data });
  } else {
    await payload.create({ collection: "posts", data });
  }
}

console.log(`Seeded ${articles.length} published articles.`);
