import type { SiteCopy } from "./types";

/**
 * English copy.
 *
 * Substance is inherited from the v1 site, which was written carefully against
 * A.M. No. 24-10-14-SC (the 2025 Rules on Electronic Notarization). Claims here
 * are deliberately conservative: the platform supports the process, the
 * Electronic Notary Public performs the act.
 *
 * Do not add a capability claim to this file without a source in the Rules.
 */
export const en: SiteCopy = {
  nav: {
    how: "How it works",
    business: "For business",
    notaries: "For notaries",
    articles: "Articles",
    contact: "Contact Us",
  },

  common: {
    waitlist: "Join the launch list",
    contact: "Send an inquiry",
    learn: "See every step",
    launchNote: "Preparing for launch in the Philippines.",
    official: "Supreme Court guidance",
    informationOnly: "Information only · Not legal advice",
    footerStatement: "A clearer way into a serious legal act.",
    compliance:
      "Availability, document eligibility, and each electronic notarial act depend on the Rules on Electronic Notarization, facility accreditation, and the Electronic Notary Public's assessment.",
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    commandHint: "Search",
    commandTitle: "Navigation",
    commandPlaceholder: "Type a page name",
    commandEmpty: "Nothing matches that.",
  },

  home: {
    eyebrow: "Electronic Notarization for the Philippines",
    lead: "Prepare the document, complete the required checks, appear before an Electronic Notary Public, then receive the finished record. eNotaryHub keeps the whole path visible.",
    launchStatus:
      "Disclaimer: eNotaryHub PH is in active development as we work toward full accreditation with the Supreme Court and the Electronic Notarization Administrator. Electronic notarization services with commissioned Electronic Notaries Public are not yet available. Thanks for being here as we build it, stay tuned!",
    scrollCue: "The process",

    introKicker: "The planned process",
    introTitle: "One Document. Four Guarded Moments.",
    introBody:
      "Electronic notarization is not a signature button. The document, the people, the identity checks, the location, the live appearance, and the records all have to line up before the notary can complete the act.",
    steps: [
      {
        title: "Prepare",
        body: "Upload the unsigned electronic document, name the required participants, and state what you need.",
      },
      {
        title: "Verify",
        body: "Complete the identity, credential, and location checks required before the notarial act.",
      },
      {
        title: "Appear and Sign",
        body: "Meet the notary in person at an accredited facility, or through a live remote session when allowed.",
      },
      {
        title: "Receive",
        body: "Get the electronically notarized document and the information needed to verify or reference the transaction.",
      },
    ],
    stepStates: ["Request", "Checks", "Live Act", "Record"],

    sessionKicker: "Remote appearance and signing",
    sessionTitle:
      "Sign Documents Anywhere in the Philippines, Through Remote Appearance and Signing.",
    sessionBody:
      "Appear before a commissioned Electronic Notary Public over live, two-way audio and video, without travelling to an office. Identity, credentials, location, and the record of the session are all handled in one place.",
    /* Six points, not four: this section absorbed the accredited-facility and
       notary-review cards when the separate rules section was merged in. */
    sessionPoints: [
      "Live two-way audio and video",
      "Identity and credential verification",
      "Location checks for remote acts",
      "Notary review before an act proceeds",
      "Acts performed through an accredited facility",
      "Session records kept under the Rules",
    ],
    sessionNote:
      "For ordinary remote electronic notarization, participants must be in the Philippines. The Rules describe limited exceptions for a principal inside a Philippine embassy, consular office, or honorary consul's office abroad.",

    audienceTitle: "Made for Lawyers, Firms, and Clients.",
    audienceBody:
      "The same Rules apply to everyone, but each party arrives with different needs. Every group gets a clear place to begin.",
    audiences: [
      {
        title: "For Clients",
        body: "Understand what to prepare, who must appear, and why a notary may need more information.",
        cta: "Read the process",
        page: "how",
      },
      {
        title: "For Law Firms",
        body: "Keep recurring requests, participants, and completed documents from getting lost across inboxes.",
        cta: "View business pages",
        page: "business",
      },
      {
        title: "For Commissioned Electronic Notaries Public",
        body: "Review a planned workspace for intake, sessions, electronic execution, and records.",
        cta: "View notary pages",
        page: "notaries",
      },
    ],

    manifestoTitle: "The Screen Changes. The Notary's Duty Doesn't.",
    manifestoBody:
      "Technology can make the route easier to follow. It cannot waive an identity check, replace a live appearance, or decide that a document should proceed.",

    waitlistKicker: "Launch list",
    waitlistTitle: "Know When eNotaryHub PH Goes Live.",
    waitlistBody:
      "eNotaryHub PH is in active development as we work toward full accreditation with the Supreme Court and the Electronic Notarization Administrator. Leave your details and we will tell you the moment electronic notarization becomes available.",

    faqTitle: "Questions People Ask First",
    faqIntro:
      "Short answers based on A.M. No. 24-10-14-SC. The commissioned notary still decides whether a request can proceed.",
    faqs: [
      {
        question: "Can I request a notarization now?",
        answer:
          "Not yet. eNotaryHub is preparing its public launch and is not currently accepting notarization requests.",
      },
      {
        question: "Is an electronic signature already notarized?",
        answer:
          "No. A signature and a notarial act are different. The notary must perform the required act and attach the proper electronic notarial certificate and seal.",
      },
      {
        question: "Can every document be electronically notarized?",
        answer:
          "No. The rules do not apply to certain acts and documents, including notarial wills, deposition taking, and paper documents with handwritten signatures or marks. Other eligibility questions depend on the document and the notary's review.",
      },
      {
        question: "Can I join a remote session from anywhere?",
        answer:
          "Do not assume so. For ordinary remote electronic notarization, participants must be in the Philippines. The rules describe limited cases for a principal inside a Philippine embassy, consular office, or honorary consul's office abroad.",
      },
    ],
  },

  how: {
    eyebrow: "How electronic notarization works",
    title: "Know the Next Step Before You Start.",
    lead: "The exact act varies by document. This is the planned path for a request handled through eNotaryHub.",
    steps: [
      {
        index: "1.0",
        title: "Describe the Request",
        body: "Choose the needed service, upload the unsigned electronic document, and add every principal and witness.",
      },
      {
        index: "2.0",
        title: "Complete the Checks",
        body: "Provide the required details and complete identity, credential, and location verification through the facility.",
      },
      {
        index: "3.0",
        title: "Wait for Review",
        body: "An Electronic Notary Public reviews the request, confirms whether it may proceed, and sets the session.",
      },
      {
        index: "4.0",
        title: "Appear Live",
        body: "Join the notary and other required people in a live session. Remote sessions use two-way audio and video and may be recorded.",
      },
      {
        index: "5.0",
        title: "Sign and Complete the Act",
        body: "Follow the notary's instructions for the required signature, oath, acknowledgment, or witnessing.",
      },
      {
        index: "6.0",
        title: "Receive the Record",
        body: "Receive the electronically notarized document. The notary completes the certificate, seal, and required record entries.",
      },
    ],
    prepareTitle: "Prepare These Before Requesting",
    prepareIntro:
      "Having these ready helps the notary review the request. It does not guarantee that the document is eligible.",
    prepare: [
      "A complete electronic document in an accepted format",
      "A current government-issued photo ID",
      "A camera-enabled device and stable internet for a remote session",
      "Every required principal and witness",
      "The receiving party's document and format requirements",
    ],
    ctaTitle: "Want a Note When Requests Open?",
    ctaBody:
      "Join the launch list, or tell us about a document process you handle often.",
  },

  business: {
    eyebrow: "For Philippine organizations",
    title: "Keep Requests Out of Scattered Inboxes.",
    lead: "A planned workspace for legal, HR, finance, operations, and administrative teams that coordinate notarization work.",
    pains: [
      {
        title: "One Request Record",
        body: "Keep the document, participants, status, and completed output tied to the same request.",
      },
      {
        title: "Clear Participant Tasks",
        body: "Show signatories and witnesses what they need to provide before a session can proceed.",
      },
      {
        title: "Access by Role",
        body: "Give requesters, reviewers, and records staff the access needed for their part of the work.",
      },
      {
        title: "Records You Can Find",
        body: "Organize completed documents and transaction details so the team can retrieve them later.",
      },
    ],
    useTitle: "Useful Across Everyday Business Work",
    useIntro:
      "Document eligibility depends on the rules and the notary's review. These are common workflows worth discussing during product planning.",
    uses: [
      "Corporate secretary and board documents",
      "Employment and HR declarations",
      "Vendor and commercial documents",
      "Affidavits and sworn statements",
      "Authorizations and powers of attorney",
      "Recurring client document requests",
    ],
    ctaTitle: "Tell Us How Your Team Handles It Today.",
    ctaBody:
      "Share the request volume, participants, and records your team has to coordinate. We'll use that context in the business release.",
  },

  notaries: {
    eyebrow: "For Electronic Notaries Public",
    title: "The Notary Stays in Charge of the Act.",
    lead: "eNotaryHub is being planned as a work surface for commissioned Electronic Notaries Public, not as a substitute for professional judgment or responsibility.",
    toolsTitle: "Support for the Work Around the Act",
    toolsIntro:
      "Each part should help the notary apply the rules, review the request, conduct the session, and keep the required record.",
    tools: [
      {
        title: "Request Intake",
        body: "Collect the electronic document, participant details, authority documents, and requested notarial act for review.",
      },
      {
        title: "Eligibility Review",
        body: "Keep the material needed to decide whether the request may proceed and what else must be supplied.",
      },
      {
        title: "Identity and Location Evidence",
        body: "Review the facility's identity, liveness, credential, and geolocation checks.",
      },
      {
        title: "Session Control",
        body: "Bring the required people into the live appearance and keep the document visible during execution.",
      },
      {
        title: "Electronic Execution",
        body: "Apply the required signatures, electronic notarial certificate, and electronic notarial seal through the facility.",
      },
      {
        title: "Notarial Records",
        body: "Maintain the Electronic Notarial Book, related recordings, and retained records according to the rules.",
      },
    ],
    principle:
      "Technology may support the notarial act. The Electronic Notary Public remains responsible for performing it properly.",
    principleSource:
      "Product principle drawn from the Rules on Electronic Notarization",
    ctaTitle: "Help Review the Notary Workflow.",
    ctaBody:
      "Practicing notaries can contact us about intake, session, recordkeeping, and facility requirements before onboarding opens.",
  },

  contact: {
    eyebrow: "Contact",
    title: "Bring Us the Messy Version.",
    lead: "Tell us how notarization requests move through your team today, or ask about the planned service. A real person will read it.",
    note: "eNotaryHub is still preparing for launch and cannot accept notarization requests yet.",
    nameLabel: "Your name",
    namePlaceholder: "Juan dela Cruz",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    orgLabel: "Organization",
    orgPlaceholder: "Optional",
    messageLabel: "What are you working with?",
    messagePlaceholder:
      "How documents reach you today, who has to sign, and where it slows down.",
    submit: "Send an inquiry",
    submitting: "Sending",
    success: "Received. A person will read this and reply by email.",
    errorRequired: "This field is required.",
    errorEmail: "Enter an email address we can reply to.",
    errorGeneric: "That didn't send. Try again in a moment.",
  },
};
