/**
 * Shape of a full site copy dictionary.
 *
 * Declared explicitly rather than inferred from `en` so that a missing key in
 * a translation is a compile error, and so the completeness test has something
 * concrete to assert against.
 */

export type Locale = "en" | "fil";

export type PageName =
  | "home"
  | "how"
  | "business"
  | "notaries"
  | "articles"
  | "waitlist"
  | "contact";

export interface NavCopy {
  how: string;
  business: string;
  notaries: string;
  articles: string;
  contact: string;
}

export interface CommonCopy {
  waitlist: string;
  contact: string;
  learn: string;
  launchNote: string;
  official: string;
  informationOnly: string;
  footerStatement: string;
  compliance: string;
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  commandHint: string;
  commandTitle: string;
  commandPlaceholder: string;
  commandEmpty: string;
}

/** A titled block of prose. The workhorse shape across the site. */
export interface Card {
  title: string;
  body: string;
}

/** A card that carries its own ordinal, e.g. the six-step request path. */
export interface NumberedStep extends Card {
  index: string;
}

export interface Audience extends Card {
  cta: string;
  page: PageName;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface HomeCopy {
  eyebrow: string;
  lead: string;
  launchStatus: string;
  scrollCue: string;
  introKicker: string;
  introTitle: string;
  introBody: string;
  steps: Card[];
  stepStates: string[];
  sessionKicker: string;
  sessionTitle: string;
  sessionBody: string;
  sessionPoints: string[];
  sessionNote: string;
  audienceTitle: string;
  audienceBody: string;
  audiences: Audience[];
  manifestoTitle: string;
  manifestoBody: string;
  waitlistKicker: string;
  waitlistTitle: string;
  waitlistBody: string;
  faqTitle: string;
  faqIntro: string;
  faqs: Faq[];
}

export interface HowCopy {
  eyebrow: string;
  title: string;
  lead: string;
  steps: NumberedStep[];
  prepareTitle: string;
  prepareIntro: string;
  prepare: string[];
  ctaTitle: string;
  ctaBody: string;
}

export interface BusinessCopy {
  eyebrow: string;
  title: string;
  lead: string;
  pains: Card[];
  useTitle: string;
  useIntro: string;
  uses: string[];
  ctaTitle: string;
  ctaBody: string;
}

export interface NotariesCopy {
  eyebrow: string;
  title: string;
  lead: string;
  toolsTitle: string;
  toolsIntro: string;
  tools: Card[];
  principle: string;
  principleSource: string;
  ctaTitle: string;
  ctaBody: string;
}

export interface ContactCopy {
  eyebrow: string;
  title: string;
  lead: string;
  note: string;
  nameLabel: string;
  namePlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  orgLabel: string;
  orgPlaceholder: string;
  messageLabel: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  success: string;
  errorRequired: string;
  errorEmail: string;
  errorGeneric: string;
}

export interface SiteCopy {
  nav: NavCopy;
  common: CommonCopy;
  home: HomeCopy;
  how: HowCopy;
  business: BusinessCopy;
  notaries: NotariesCopy;
  contact: ContactCopy;
}

/**
 * The slogan is brand, not translated copy. It stays in English across
 * locales, and is split into its three beats so each can carry different
 * type weight in the hero:
 *
 *   Trusted Signatures.   ink weight    — who performs the act
 *   Legally Sealed.       sun accent    — the seal, the one gold moment
 *   Instantly Done.       light weight  — the outcome
 */
export const SLOGAN = {
  beats: ["Trusted Signatures.", "Legally Sealed.", "Instantly Done."],
  full: "Trusted Signatures. Legally Sealed. Instantly Done.",
} as const;
